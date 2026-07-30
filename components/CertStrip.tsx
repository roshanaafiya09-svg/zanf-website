import { BadgeCheck } from 'lucide-react'
import { credentials, testNote } from '@/content/site'

/**
 * The credential strip, immediately under the hero. Only claims that can be
 * verified: an authorized dealership, a type approval, two test agencies and a
 * coverage range. Nothing here is a number ZAN-F has not published.
 */
export default function CertStrip() {
  return (
    <section className="border-b border-steel-200 bg-white">
      <div className="shell py-6">
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-4">
          {credentials.map((item) => (
            <li key={item.label} className="flex items-center gap-2.5">
              <BadgeCheck
                size={16}
                strokeWidth={1.75}
                aria-hidden="true"
                className="shrink-0 text-[var(--emission-600)]"
              />
              <span className="text-sm text-ink">{item.label}</span>
              {item.mono && (
                <span className="mono rounded-[4px] bg-steel-100 px-2 py-1 text-[0.6875rem] uppercase tracking-[0.08em] text-ink-600">
                  {item.mono}
                </span>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-ink-400">{testNote}</p>
      </div>
    </section>
  )
}
