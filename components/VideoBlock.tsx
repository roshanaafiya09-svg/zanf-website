'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'

/**
 * Click-to-play only. `preload="none"` means nothing is fetched until the
 * visitor asks for it — this clip is 8.4 MB and must never autoplay.
 */
export default function VideoBlock({
  src,
  poster,
  label,
  alt,
}: {
  src: string
  poster: string
  label: string
  alt: string
}) {
  const [started, setStarted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  function start() {
    setStarted(true)
    requestAnimationFrame(() => videoRef.current?.play())
  }

  return (
    <figure className="relative border border-hairline">
      <div className="relative aspect-video">
        {started ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src={src}
            poster={poster}
            controls
            playsInline
            preload="none"
          />
        ) : (
          <>
            <Image
              src={poster}
              alt={alt}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
            />
            <button
              type="button"
              onClick={start}
              className="group absolute inset-0 grid place-items-center bg-[var(--media-veil)] transition-colors duration-200 hover:bg-transparent"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-hi/40 bg-[var(--scrim)] text-hi backdrop-blur-sm transition-colors duration-200 group-hover:border-accent group-hover:text-accent">
                <Play size={17} strokeWidth={1.5} fill="currentColor" />
              </span>
              <span className="sr-only">Play — {label}</span>
            </button>
          </>
        )}
      </div>
      <figcaption className="eyebrow border-t border-hairline px-5 py-3.5">
        {label}
      </figcaption>
    </figure>
  )
}
