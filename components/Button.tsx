import Link from 'next/link'
import type { ReactNode } from 'react'

/**
 * Squared to 4px, not pill-shaped: a pill reads consumer-soft, a near-square
 * corner reads like equipment. The solid fill uses emission-600 rather than the
 * brand emission-500 because white text on #0E8A5F measures 4.36:1 — under the
 * AA floor. #0A7350 measures 5.87:1 and is indistinguishable at a glance.
 */
const base =
  'group inline-flex items-center justify-center gap-2 rounded-[4px] px-6 py-3.5 text-sm font-medium leading-none transition-colors duration-200 whitespace-nowrap'

export const buttonVariants = {
  /** Primary action. One per view. */
  solid: 'bg-[var(--emission-600)] text-white hover:bg-[var(--emission-700)]',
  /** Secondary on light surfaces. */
  outline:
    'border border-hairline-strong text-ink hover:border-[var(--emission-600)] hover:text-[var(--emission-700)]',
  /** Secondary on carbon surfaces. */
  ghost:
    'border border-hairline-dark-strong text-air-ink hover:border-[var(--emission-300)] hover:text-[var(--emission-300)]',
  /** Inline text action with an arrow. */
  link: 'px-0 py-0 text-[var(--emission-700)] hover:text-ink',
} as const

export type ButtonVariant = keyof typeof buttonVariants

export default function Button({
  href,
  children,
  variant = 'solid',
  className = '',
  external = false,
}: {
  href: string
  children: ReactNode
  variant?: ButtonVariant
  className?: string
  external?: boolean
}) {
  const classes = `${base} ${buttonVariants[variant]} ${className}`

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
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
