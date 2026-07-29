/**
 * Section boundary as a tap point: a hairline with a small copper node at the
 * content's left edge. A quiet echo of the sensor taps in the hero trace, so
 * the page reads as one instrumented line rather than a stack of bands.
 */
export default function SectionRule() {
  return (
    <div className="relative border-t border-hairline">
      <span
        aria-hidden="true"
        className="shell pointer-events-none absolute inset-x-0 top-0 block"
      >
        <span
          className="block h-[5px] w-[5px] -translate-y-1/2 bg-accent"
          style={{ boxShadow: 'var(--glow-accent)' }}
        />
      </span>
    </div>
  )
}
