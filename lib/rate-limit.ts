/**
 * A fixed-window rate limiter held in process memory.
 *
 * Honest about what this is: on a serverless host each instance keeps its own
 * counter, so a determined attacker spread across cold starts can exceed the
 * limit. It stops the ordinary cases — a stuck retry loop, a script hammering
 * the endpoint from one address — at zero cost and with no external dependency.
 *
 * If enquiry spam ever becomes a real problem, replace the Map with Vercel KV
 * or Upstash Redis; the call signature does not need to change.
 */

type Window = { count: number; resetAt: number }

const windows = new Map<string, Window>()

/** Drop expired entries so the Map cannot grow without bound. */
function sweep(now: number) {
  if (windows.size < 500) return
  for (const [key, window] of windows) {
    if (window.resetAt <= now) windows.delete(key)
  }
}

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number }
): { ok: boolean; remaining: number; retryAfterSeconds: number } {
  const now = Date.now()
  sweep(now)

  const existing = windows.get(key)

  if (!existing || existing.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs })
    return { ok: true, remaining: limit - 1, retryAfterSeconds: 0 }
  }

  existing.count += 1
  const retryAfterSeconds = Math.ceil((existing.resetAt - now) / 1000)

  return {
    ok: existing.count <= limit,
    remaining: Math.max(0, limit - existing.count),
    retryAfterSeconds,
  }
}

/**
 * Best-effort client address. `x-forwarded-for` is set by the proxy in front of
 * the app; it is spoofable in principle, which is another reason this limiter is
 * a speed bump rather than a security control.
 */
export function clientKey(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip') ?? 'unknown'
}
