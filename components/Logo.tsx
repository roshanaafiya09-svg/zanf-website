import Link from 'next/link'

/**
 * The ZAN-F lock-up: traced sigma monogram, wordmark, strapline.
 *
 * The monogram is `public/media/zanf-monogram.svg`, traced out of the client's
 * logo render by `scripts/trace-monogram.mjs` and filled flat in the recovered
 * brand colours. Flat is what survives at 32px and what works on a light
 * header — the supplied render is a dark-panel mockup and cannot do either.
 *
 * The wordmark is real text, not part of the image: it is the accessible name
 * for the home link, it stays sharp at any zoom, and it matches the display face
 * used everywhere else on the site.
 *
 * TODO: swap the traced SVG for the client's own vector when it arrives. The
 * trace is faithful in shape but its edges carry a slight organic wobble that
 * would show if the mark were ever set large.
 */
export default function Logo({
  tone = 'light',
  className = '',
}: {
  tone?: 'light' | 'dark'
  className?: string
}) {
  const dark = tone === 'dark'

  return (
    <Link
      href="/"
      aria-label="ZAN-F Power Systems — home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- a static SVG
          needs no optimisation, and next/image would require dangerouslyAllowSVG */}
      <img
        src="/media/zanf-monogram.svg"
        alt=""
        width={32}
        height={38}
        className="h-8 w-auto shrink-0 sm:h-9"
      />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.2rem] font-extrabold tracking-[-0.03em] sm:text-[1.35rem] ${
            dark ? 'text-air-ink' : 'text-ink'
          }`}
        >
          ZAN
          <span
            className={
              dark ? 'text-[var(--emission-300)]' : 'text-[var(--emission-700)]'
            }
          >
            -
          </span>
          F
        </span>
        <span
          className={`mono mt-1 text-[0.5625rem] uppercase tracking-[0.18em] sm:text-[0.625rem] ${
            dark ? 'text-[var(--brand-blue-300)]' : 'text-[var(--brand-blue)]'
          }`}
        >
          Power Systems
        </span>
      </span>
    </Link>
  )
}
