import Link from 'next/link'
import type { ReactNode } from 'react'

/**
 * Squared, not pill-shaped. Pills read soft and SaaS; a 2px corner reads like
 * equipment. The primary fill is bone/carbon rather than the copper accent —
 * the accent is reserved for instrumentation, never for chrome.
 */
const base =
  'group inline-flex items-center justify-center gap-2.5 rounded-[2px] px-6 py-3.5 text-sm font-medium transition-colors duration-200 whitespace-nowrap'

const variants = {
  solid: 'bg-cta text-cta-ink hover:bg-accent hover:text-[#1a0f06]',
  ghost: 'border border-hairline-strong text-hi hover:border-accent',
} as const

export default function Button({
  href,
  children,
  variant = 'solid',
  className = '',
  external = false,
}: {
  href: string
  children: ReactNode
  variant?: keyof typeof variants
  className?: string
  external?: boolean
}) {
  const classes = `${base} ${variants[variant]} ${className}`

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  )
}
