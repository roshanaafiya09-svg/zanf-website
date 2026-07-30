/**
 * The Clean-Air Gradient Rule — carbon → emission → air.
 *
 * The one memorable device on the site: exhaust entering dirty and leaving
 * clean, drawn as a 2px line. It sits under the H1, divides sections, and forms
 * the spine of the ITC process timeline. Everything around it stays disciplined
 * so that this reads as a signature rather than as decoration.
 */
export default function GradientRule({
  className = '',
  width = 'w-full',
  draw = false,
}: {
  className?: string
  /** Tailwind width utility — the hero uses a fixed 8rem, dividers run full. */
  width?: string
  /** Draw itself left to right on mount. Reserved for the hero. */
  draw?: boolean
}) {
  return (
    <div
      aria-hidden="true"
      className={`rule-clean ${width} ${draw ? 'rule-draw' : ''} ${className}`}
    />
  )
}
