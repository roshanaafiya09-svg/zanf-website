import { Check } from 'lucide-react'
import Reveal from './Reveal'

/**
 * Product feature cards. The `note` is set in mono and treated as a
 * qualification rather than a headline — "as per ARAI test report" is the part
 * an engineer reads first.
 */
export default function FeatureGrid({
  features,
}: {
  features: { title: string; note?: string | null; body: string }[]
}) {
  return (
    <ul className="grid gap-px overflow-hidden rounded-[8px] border border-steel-200 bg-[var(--steel-200)] sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, i) => (
        <Reveal as="li" key={feature.title} delay={(i % 3) * 0.05}>
          <div className="h-full bg-white p-7">
            <div className="flex items-start gap-3">
              <Check
                size={17}
                strokeWidth={2}
                aria-hidden="true"
                className="mt-1 shrink-0 text-[var(--emission-700)]"
              />
              <div>
                <h3 className="display text-base">{feature.title}</h3>
                {feature.note && (
                  <p className="mono mt-1.5 text-[0.6875rem] uppercase tracking-[0.1em] text-ink-400">
                    {feature.note}
                  </p>
                )}
              </div>
            </div>
            <p className="mt-4 text-sm">{feature.body}</p>
          </div>
        </Reveal>
      ))}
    </ul>
  )
}
