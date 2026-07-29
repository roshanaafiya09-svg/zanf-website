import type { Metadata } from 'next'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import ContactForm from '@/components/ContactForm'
import PageHeader from '@/components/PageHeader'
import Reveal from '@/components/Reveal'
import { contact } from '@/content/site'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: `Talk to ZAN-F about retrofit emission control for your diesel generators. ${contact.addressLines.join(' ')} — ${contact.phoneDisplay}.`,
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact Us"
        title="Get in Touch"
        lead="Tell us the DG rating and where the set is installed, and we will come back with the right emission control solution."
      />

      <section>
        <div className="shell section grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="border border-hairline bg-surface-1 p-8">
              <dl className="space-y-8">
                <div className="flex gap-4">
                  <MapPin
                    size={18}
                    strokeWidth={1.5}
                    className="mt-0.5 shrink-0 text-accent"
                  />
                  <div>
                    <dt className="eyebrow">Address</dt>
                    <dd className="mt-2 text-sm text-hi">
                      {contact.addressLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </dd>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Mail
                    size={18}
                    strokeWidth={1.5}
                    className="mt-0.5 shrink-0 text-accent"
                  />
                  <div>
                    <dt className="eyebrow">Email</dt>
                    <dd className="mt-2 space-y-1 text-sm">
                      {contact.emails.map((email) => (
                        <a
                          key={email}
                          href={`mailto:${email}`}
                          className="block text-hi transition-opacity duration-200 hover:opacity-70"
                        >
                          {email}
                        </a>
                      ))}
                    </dd>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone
                    size={18}
                    strokeWidth={1.5}
                    className="mt-0.5 shrink-0 text-accent"
                  />
                  <div>
                    <dt className="eyebrow">Phone</dt>
                    <dd className="mt-2">
                      <a
                        href={`tel:${contact.phoneHref}`}
                        className="figure text-sm text-hi transition-opacity duration-200 hover:opacity-70"
                      >
                        {contact.phoneDisplay}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MessageCircle
                    size={18}
                    strokeWidth={1.5}
                    className="mt-0.5 shrink-0 text-accent"
                  />
                  <div>
                    <dt className="eyebrow">Office Hours</dt>
                    <dd className="mt-2 space-y-1 text-sm text-hi">
                      {contact.hours.map((h) => (
                        <span key={h.days} className="block">
                          {h.days}{' '}
                          <span className="figure text-lo">{h.time}</span>
                        </span>
                      ))}
                    </dd>
                  </div>
                </div>
              </dl>

              <a
                href={`https://wa.me/${contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 flex items-center justify-center gap-2 rounded-[2px] border border-hairline-strong px-6 py-3.5 text-sm text-hi transition-colors duration-200 hover:border-hi"
              >
                <MessageCircle size={15} strokeWidth={1.5} />
                Message us on WhatsApp
              </a>
            </div>

            {/* TODO: replace with the client's exact Google Maps place embed. */}
            <div className="mt-6 overflow-hidden border border-hairline">
              <iframe
                title="ZAN-F location — Pallavaram, Chennai"
                src="https://www.google.com/maps?q=Pallavaram,%20Chennai,%20Tamil%20Nadu%20600043&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-64 w-full border-0 grayscale"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
