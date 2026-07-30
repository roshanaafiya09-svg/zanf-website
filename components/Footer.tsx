import Link from 'next/link'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import GradientRule from './GradientRule'
import Logo from './Logo'
import {
  certifications,
  contact,
  dealerNotice,
  footerNav,
  site,
  social,
  whatsappLink,
} from '@/content/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="on-carbon relative overflow-hidden bg-carbon pb-16 lg:pb-0">
      <div className="grid-lines absolute inset-0" aria-hidden="true" />

      <div className="shell relative">
        <GradientRule />

        <div className="grid gap-12 py-14 md:py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10">
          <div>
            <Logo tone="dark" />
            <p className="mt-5 max-w-sm text-sm text-air-mid">
              {site.description}
            </p>

            <div className="mt-7 space-y-3 text-sm">
              <a
                href={`tel:${contact.phoneHref}`}
                className="flex items-center gap-3 text-air-mid transition-colors hover:text-air-ink"
              >
                <Phone size={15} strokeWidth={1.75} aria-hidden="true" />
                <span className="mono">{contact.phoneDisplay}</span>
              </a>
              {contact.emails.map((email) => (
                <a
                  key={email}
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 text-air-mid transition-colors hover:text-air-ink"
                >
                  <Mail size={15} strokeWidth={1.75} aria-hidden="true" />
                  {email}
                </a>
              ))}
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-air-mid transition-colors hover:text-air-ink"
              >
                <MessageCircle size={15} strokeWidth={1.75} aria-hidden="true" />
                WhatsApp an engineer
              </a>
              <p className="flex items-start gap-3 text-air-mid">
                <MapPin
                  size={15}
                  strokeWidth={1.75}
                  aria-hidden="true"
                  className="mt-1 shrink-0"
                />
                <span>
                  {contact.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </p>
            </div>
          </div>

          {footerNav.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <p className="eyebrow">{group.heading}</p>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-air-mid transition-colors hover:text-air-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-hairline-dark py-6">
          <p className="eyebrow">Certified</p>
          {certifications.map((cert) => (
            <p key={cert.short} className="text-sm text-air-mid">
              <span className="figure mr-2 text-[0.8125rem]">{cert.short}</span>
              <span className="text-air-lo">{cert.full}</span>
            </p>
          ))}
        </div>

        <div className="border-t border-hairline-dark py-6">
          <p className="max-w-4xl text-xs leading-relaxed text-air-lo">
            {dealerNotice}
          </p>
        </div>

        <div className="flex flex-col gap-4 border-t border-hairline-dark py-6 text-xs text-air-lo sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/privacy-policy/" className="hover:text-air-ink">
              Privacy policy
            </Link>
            <Link href="/portal/" className="hover:text-air-ink">
              Client Portal
            </Link>
            {social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-air-ink"
              >
                {s.label}
              </a>
            ))}
            <span>{site.credit}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
