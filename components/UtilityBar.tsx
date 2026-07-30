import Link from 'next/link'
import { Mail, MessageCircle, Phone } from 'lucide-react'
import { contact, whatsappLink } from '@/content/site'

/**
 * The thin carbon strip above the header. It exists so a facility manager can
 * reach a human without scrolling, and so the future Client Portal has a
 * permanent home in the chrome before it exists.
 */
export default function UtilityBar() {
  return (
    <div className="on-carbon hidden bg-carbon text-[0.8125rem] lg:block">
      <div className="shell flex h-9 items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <a
            href={`tel:${contact.phoneHref}`}
            className="flex items-center gap-2 text-air-mid transition-colors hover:text-air-ink"
          >
            <Phone size={13} strokeWidth={1.75} aria-hidden="true" />
            <span className="mono">{contact.phoneDisplay}</span>
          </a>
          <a
            href={`mailto:${contact.emails[0]}`}
            className="flex items-center gap-2 text-air-mid transition-colors hover:text-air-ink"
          >
            <Mail size={13} strokeWidth={1.75} aria-hidden="true" />
            {contact.emails[0]}
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-air-mid transition-colors hover:text-air-ink"
          >
            <MessageCircle size={13} strokeWidth={1.75} aria-hidden="true" />
            WhatsApp
          </a>
        </div>

        <Link
          href="/portal/"
          className="flex items-center gap-2 text-air-mid transition-colors hover:text-air-ink"
        >
          Client Portal
          <span className="mono rounded-full bg-[var(--emission-tint)] px-2 py-0.5 text-[0.625rem] uppercase tracking-[0.12em] text-[var(--emission-300)]">
            Soon
          </span>
        </Link>
      </div>
    </div>
  )
}
