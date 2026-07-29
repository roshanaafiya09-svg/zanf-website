'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { media } from '@/content/site'

/**
 * The looping hero background.
 *
 * Only mounts the video when the viewport is >= md AND the visitor has not
 * asked for reduced motion. Everywhere else it stays a still image, so phones
 * on mobile data never download it.
 */
export default function HeroVideo() {
  const [playVideo, setPlayVideo] = useState(false)

  useEffect(() => {
    const wide = window.matchMedia('(min-width: 768px)')
    const still = window.matchMedia('(prefers-reduced-motion: reduce)')

    const decide = () => setPlayVideo(wide.matches && !still.matches)
    decide()

    wide.addEventListener('change', decide)
    still.addEventListener('change', decide)
    return () => {
      wide.removeEventListener('change', decide)
      still.removeEventListener('change', decide)
    }
  }, [])

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
      {playVideo ? (
        <video
          className="h-full w-full object-cover"
          src={media.heroLoop.src}
          poster={media.heroLoop.poster}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      ) : (
        <Image
          src={media.heroLoop.poster}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}

      {/* Veil + vertical scrim so the headline always clears its background. */}
      <div className="absolute inset-0 bg-[var(--media-veil)]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, var(--canvas) 0%, transparent 38%, transparent 55%, var(--canvas) 100%)',
        }}
      />
    </div>
  )
}
