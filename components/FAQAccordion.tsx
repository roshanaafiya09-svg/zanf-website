import { Plus } from 'lucide-react'
import JsonLd from './JsonLd'
import { faqSchema } from '@/lib/seo'

/**
 * Native `<details>` — keyboard and screen-reader behaviour for free, no
 * JavaScript, and it still works if hydration never happens. The matching
 * FAQPage JSON-LD is emitted alongside so the answers can surface in search.
 */
export default function FAQAccordion({
  faqs,
  schema = true,
}: {
  faqs: { q: string; a: string }[]
  schema?: boolean
}) {
  return (
    <div className="divide-y divide-[var(--steel-200)] border-y border-steel-200">
      {schema && <JsonLd data={faqSchema(faqs)} />}
      {faqs.map((faq) => (
        <details key={faq.q} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left marker:hidden [&::-webkit-details-marker]:hidden">
            <span className="display text-[1.0625rem] leading-snug sm:text-lg">
              {faq.q}
            </span>
            <span
              aria-hidden="true"
              className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-steel-200 text-ink-600 transition-transform duration-200 group-open:rotate-45"
            >
              <Plus size={14} strokeWidth={1.75} />
            </span>
          </summary>
          <p className="max-w-3xl pb-6 pr-12 text-[0.9375rem]">{faq.a}</p>
        </details>
      ))}
    </div>
  )
}
