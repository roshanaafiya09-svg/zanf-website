/**
 * Section label — IBM Plex Mono, uppercase, prefixed with `//`.
 *
 * The slashes are a code comment: this line annotates the section rather than
 * being part of it. Used identically everywhere so the eye learns it.
 */
export default function Eyebrow({
  children,
  as: Tag = 'p',
  className = '',
}: {
  children: React.ReactNode
  as?: 'p' | 'span' | 'h2'
  className?: string
}) {
  return (
    <Tag className={`eyebrow ${className}`}>
      <span aria-hidden="true" className="opacity-50">
        //{' '}
      </span>
      {children}
    </Tag>
  )
}
