import Link from 'next/link'
import { MessageCircle, Phone } from 'lucide-react'
import { contact } from '@/content/site'

/** Call · WhatsApp · Quote. Mobile only — the header carries these on desktop. */
export default function MobileStickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-[var(--scrim)] backdrop-blur-xl sm:hidden">
      <div className="grid grid-cols-3">
        <a
          href={`tel:${contact.phoneHref}`}
          className="flex items-center justify-center gap-2 py-3.5 text-sm text-mid"
        >
          <Phone size={15} strokeWidth={1.5} />
          Call
        </a>
        <a
          href={`https://wa.me/${contact.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 border-x border-hairline py-3.5 text-sm text-mid"
        >
          <MessageCircle size={15} strokeWidth={1.5} />
          WhatsApp
        </a>
        <Link
          href="/contact-us/"
          className="flex items-center justify-center py-3.5 text-sm font-medium text-hi"
        >
          Get a Quote
        </Link>
      </div>
    </div>
  )
}
