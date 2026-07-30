import { MessageCircle } from 'lucide-react'
import { whatsappLink } from '@/content/site'

/**
 * Desktop only — on phones the same action lives in the sticky bottom bar.
 * Carbon rather than the usual WhatsApp green: the accent budget on this site
 * belongs to emission green, and a third brand colour would break it.
 */
export default function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink(
        'Hello ZAN-F — I would like to talk about an RECD for our DG set.'
      )}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-6 right-6 z-40 hidden items-center gap-3 rounded-full border border-hairline-dark-strong bg-carbon py-3 pl-3 pr-4 text-sm text-air-ink shadow-[0_8px_28px_-10px_rgb(16_32_26/0.5)] transition-colors duration-200 hover:border-[var(--emission-300)] lg:inline-flex"
    >
      <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--emission-600)]">
        <MessageCircle size={16} strokeWidth={2} aria-hidden="true" />
      </span>
      WhatsApp an engineer
    </a>
  )
}
