'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

const motionTags = {
  div: motion.div,
  li: motion.li,
  section: motion.section,
} as const

/**
 * Scroll-entry motion, once.
 *
 * `rise` — fade + 10px lift. The quiet default used across the site.
 * `pop`  — scales up on a spring with a touch of overshoot. Reserved for the
 *          value-prop boxes, where the stagger should read as a sequence.
 */
export default function Reveal({
  children,
  delay = 0,
  className = '',
  as = 'div',
  variant = 'rise',
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: keyof typeof motionTags
  variant?: 'rise' | 'pop'
}) {
  const reduced = useReducedMotion()

  // whileInView leaves an element at opacity 0 forever if IntersectionObserver
  // never fires. Where it is unavailable, render the content plainly rather
  // than risk hiding it.
  const canObserve =
    typeof window === 'undefined' || 'IntersectionObserver' in window

  if (reduced || !canObserve) {
    const Static = as
    return <Static className={className}>{children}</Static>
  }

  const Component = motionTags[as]
  const pop = variant === 'pop'

  return (
    <Component
      className={className}
      initial={pop ? { opacity: 0, scale: 0.9, y: 16 } : { opacity: 0, y: 10 }}
      whileInView={pop ? { opacity: 1, scale: 1, y: 0 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={
        pop
          ? { type: 'spring', stiffness: 320, damping: 18, mass: 0.7, delay }
          : { duration: 0.35, delay, ease: [0.16, 1, 0.3, 1] }
      }
    >
      {children}
    </Component>
  )
}
