'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { counters } from '@/content/site'

function Counter({ value, label }: { value: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduced = useReducedMotion()
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setShown(value)
      return
    }

    const duration = 1200
    const start = performance.now()
    let frame = 0

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      // Ease-out so the number settles rather than stopping dead.
      setShown(Math.round(value * (1 - Math.pow(1 - t, 3))))
      if (t < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, reduced, value])

  return (
    <div ref={ref}>
      <p className="display text-4xl md:text-5xl">
        <span className="figure">{shown}</span>
        <span className="figure text-2xl text-lo">+</span>
      </p>
      <p className="eyebrow mt-3">{label}</p>
    </div>
  )
}

/**
 * Renders nothing until every counter has a real number in content/site.ts.
 * The live site ships these as "0+"; showing an invented figure would be worse
 * than showing none.
 */
export default function Counters() {
  const ready = counters.every((c) => typeof c.value === 'number')
  if (!ready) return null

  return (
    <section className="border-b border-hairline">
      <div className="shell py-16 md:py-24">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
          {counters.map((c) => (
            <Counter key={c.label} value={c.value as number} label={c.label} />
          ))}
        </dl>
      </div>
    </section>
  )
}
