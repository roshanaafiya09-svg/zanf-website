import { ArrowRight, MessageCircle } from 'lucide-react'
import GradientRule from './GradientRule'
import { QuoteButton } from './Quote'
import { whatsappLink } from '@/content/site'

/**
 * The closing carbon band. Two actions only: a form for people who plan, and
 * WhatsApp for people who want an answer in the next ten minutes.
 */
export default function CTABand({
  heading,
  body,
  primaryLabel = 'Book a site assessment',
  source,
}: {
  heading: string
  body: string
  primaryLabel?: string
  source: string
}) {
  return (
    <section className="on-carbon relative overflow-hidden bg-carbon">
      <div className="grid-lines absolute inset-0" aria-hidden="true" />

      <div className="shell relative section-tight">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <GradientRule width="w-16" />
            <h2 className="display display-lg mt-6 text-[1.9rem] sm:text-[2.4rem] lg:text-[2.9rem]">
              {heading}
            </h2>
            <p className="lede mt-5 max-w-xl">{body}</p>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            <QuoteButton source={source}>
              {primaryLabel}
              <ArrowRight
                size={15}
                strokeWidth={2}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </QuoteButton>
            <a
              href={whatsappLink(
                'Hello ZAN-F — I would like to speak to an engineer about RECD compliance for our DG set.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-[4px] border border-hairline-dark-strong px-6 py-3.5 text-sm font-medium leading-none text-air-ink transition-colors duration-200 hover:border-[var(--emission-300)] hover:text-[var(--emission-300)]"
            >
              <MessageCircle size={15} strokeWidth={1.75} aria-hidden="true" />
              WhatsApp an engineer
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
