'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'

/**
 * Click to play. `preload="none"` and the `<video>` element is not mounted at
 * all until the poster is clicked, so the 8.4 MB explainer costs zero bytes to
 * anybody who does not ask for it.
 */
export default function VideoBlock({
  src,
  poster,
  label,
}: {
  src: string
  poster: string
  label: string
}) {
  const [playing, setPlaying] = useState(false)

  return (
    <figure className="overflow-hidden rounded-[8px] border border-steel-200 bg-white">
      {playing ? (
        <video
          src={src}
          poster={poster}
          controls
          autoPlay
          playsInline
          preload="none"
          className="aspect-video w-full bg-carbon"
        >
          <track kind="captions" />
        </video>
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group relative block aspect-video w-full overflow-hidden"
          aria-label={`Play: ${label}`}
        >
          <Image
            src={poster}
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <span className="absolute inset-0 bg-[rgb(14_21_18/0.35)] transition-colors duration-200 group-hover:bg-[rgb(14_21_18/0.2)]" />
          <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[var(--emission-600)] text-white transition-transform duration-200 group-hover:scale-105">
            <Play size={22} strokeWidth={2} fill="currentColor" aria-hidden="true" />
          </span>
        </button>
      )}
      <figcaption className="mono border-t border-steel-200 px-5 py-3 text-[0.6875rem] uppercase tracking-[0.12em] text-ink-400">
        {label}
      </figcaption>
    </figure>
  )
}
