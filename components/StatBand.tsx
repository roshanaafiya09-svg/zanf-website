'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { stats } from '@/content/site'

/**
 * The figures band.
 *
 * Tiles whose value is `null` are dropped entirely — the old site rendered
 * unfilled counters as "0+", which reads worse than not claiming anything at
 * all. Count-up only runs on figures that are actually numeric, and never when
 * the visitor has asked for reduced motion.
 */
function useCountUp(target: number, run: boolean, duration = 1100) {
  const [value, setValue] = useState(run ? 0 : target)

  useEffect(() => {
    if (!run) {
      setValue(target)
      return
    }
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      // easeOutCubic — fast, then settles, like a needle arriving
      setValue(target * (1 - Math.pow(1 - t, 3)))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, run, duration])

  return value
}

function Figure({
  value,
  animate,
}: {
  value: string
  animate: boolean
}) {
  // "25" counts. "25–10,000" and ">90" do not — they are ranges and bounds,
  // and animating them would be theatre rather than information.
  const numeric = /^\d+(\.\d+)?$/.test(value)
  const decimals = numeric && value.includes('.') ? 1 : 0
  const count = useCountUp(numeric ? Number(value) : 0, numeric && animate)

  if (!numeric) return <>{value}</>
  return <>{count.toFixed(decimals)}</>
}

export default function StatBand() {
  const shown = stats.filter((s) => s.value !== null)
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '-80px' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const animate = inView && !reduced

  return (
    <section className="on-carbon relative overflow-hidden bg-carbon-800">
      <div className="grid-lines absolute inset-0" aria-hidden="true" />

      <div ref={ref} className="shell relative py-12 md:py-16">
        <dl className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {shown.map((stat) => (
            <div key={stat.label}>
              <dd className="figure text-[2.6rem] leading-none tracking-[-0.03em] sm:text-[3.1rem]">
                <Figure value={stat.value as string} animate={animate} />
                {stat.suffix && (
                  <span className="text-[var(--emission-300)]">
                    {stat.suffix}
                  </span>
                )}
              </dd>
              <dt className="mt-4 text-sm text-air-ink">{stat.label}</dt>
              {stat.note && (
                <p className="mono mt-1.5 text-[0.6875rem] uppercase tracking-[0.1em] text-air-lo">
                  {stat.note}
                </p>
              )}
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
