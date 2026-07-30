'use client'

import { MessageCircle, Phone, SquarePen } from 'lucide-react'
import { useQuote } from './Quote'
import { contact, whatsappLink } from '@/content/site'

/**
 * Call · WhatsApp · Quote, pinned to the bottom on phones only.
 *
 * The desktop WhatsApp float is hidden below `lg` for exactly this reason —
 * two floating actions on a 360px screen is one too many.
 */
export default function MobileStickyCTA() {
  const { open } = useQuote()

  const item =
    'flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[0.6875rem] font-medium'

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-steel-200 bg-air/95 backdrop-blur-md lg:hidden">
      <div className="flex items-stretch divide-x divide-[var(--steel-200)] pb-[env(safe-area-inset-bottom)]">
        <a href={`tel:${contact.phoneHref}`} className={`${item} text-ink`}>
          <Phone size={17} strokeWidth={1.75} aria-hidden="true" />
          Call
        </a>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className={`${item} text-ink`}
        >
          <MessageCircle size={17} strokeWidth={1.75} aria-hidden="true" />
          WhatsApp
        </a>
        <button
          type="button"
          onClick={() => open('Mobile sticky bar — Quote')}
          className={`${item} bg-[var(--emission-600)] text-white`}
        >
          <SquarePen size={17} strokeWidth={1.75} aria-hidden="true" />
          Get a quote
        </button>
      </div>
    </div>
  )
}
