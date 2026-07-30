'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

const motionTags = {
  div: motion.div,
  li: motion.li,
  section: motion.section,
  article: motion.article,
} as const

/**
 * Scroll-entry motion: fade and an 8px rise, once, 350ms. That is the whole
 * motion vocabulary outside the hero — the site is meant to feel engineered,
 * which means restrained.
 */
export default function Reveal({
  children,
  delay = 0,
  className = '',
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: keyof typeof motionTags
}) {
  const reduced = useReducedMotion()

  // whileInView leaves an element at opacity 0 forever if IntersectionObserver
  // never fires. Where it is unavailable, render plainly rather than risk
  // hiding content.
  const canObserve =
    typeof window === 'undefined' || 'IntersectionObserver' in window

  if (reduced || !canObserve) {
    const Static = as
    return <Static className={className}>{children}</Static>
  }

  const Component = motionTags[as]

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.35, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  )
}
