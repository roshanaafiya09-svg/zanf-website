import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import EnquiryForm from '@/components/EnquiryForm'
import GradientRule from '@/components/GradientRule'
import JsonLd from '@/components/JsonLd'
import PageHero from '@/components/PageHero'
import { contact, whatsappLink } from '@/content/site'
import { breadcrumbSchema, pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Contact ZAN-F — book a RECD site assessment',
  description:
    'Talk to an engineer about RECD supply, installation, testing, commissioning or AMC for your diesel generator. Phone, WhatsApp, email, or send the details of your set.',
  path: '/contact/',
})

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Contact', path: '/contact/' },
]

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <PageHero
        eyebrow="Contact"
        heading="Tell us about the set"
        lede="Rating, location and what you need. An engineer replies with what the job actually involves — not a brochure."
        breadcrumbs={crumbs}
      />

      <section className="section">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            {/* Form */}
            <div>
              <h2 className="display text-2xl">Send an enquiry</h2>
              <GradientRule width="w-14" className="mt-4" />
              <div className="mt-8">
                <EnquiryForm variant="full" source="Contact page" />
              </div>
            </div>

            {/* Direct channels */}
            <div>
              <h2 className="display text-2xl">Or reach us directly</h2>
              <GradientRule width="w-14" className="mt-4" />

              <ul className="mt-8 space-y-px overflow-hidden rounded-[8px] border border-steel-200 bg-[var(--steel-200)]">
                <li>
                  <a
                    href={`tel:${contact.phoneHref}`}
                    className="flex items-center gap-4 bg-white p-5 transition-colors hover:bg-[var(--steel-100)]"
                  >
                    <Phone
                      size={18}
                      strokeWidth={1.5}
                      aria-hidden="true"
                      className="text-[var(--emission-700)]"
                    />
                    <span>
                      <span className="mono block text-[0.6875rem] uppercase tracking-[0.12em] text-ink-400">
                        Phone
                      </span>
                      <span className="figure text-[0.9375rem]">
                        {contact.phoneDisplay}
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={whatsappLink(
                      'Hello ZAN-F — I would like to talk about an RECD for our DG set.'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 bg-white p-5 transition-colors hover:bg-[var(--steel-100)]"
                  >
                    <MessageCircle
                      size={18}
                      strokeWidth={1.5}
                      aria-hidden="true"
                      className="text-[var(--emission-700)]"
                    />
                    <span>
                      <span className="mono block text-[0.6875rem] uppercase tracking-[0.12em] text-ink-400">
                        WhatsApp
                      </span>
                      <span className="text-[0.9375rem] text-ink">
                        Message an engineer
                      </span>
                    </span>
                  </a>
                </li>
                {contact.emails.map((email) => (
                  <li key={email}>
                    <a
                      href={`mailto:${email}`}
                      className="flex items-center gap-4 bg-white p-5 transition-colors hover:bg-[var(--steel-100)]"
                    >
                      <Mail
                        size={18}
                        strokeWidth={1.5}
                        aria-hidden="true"
                        className="text-[var(--emission-700)]"
                      />
                      <span>
                        <span className="mono block text-[0.6875rem] uppercase tracking-[0.12em] text-ink-400">
                          Email
                        </span>
                        <span className="text-[0.9375rem] text-ink">{email}</span>
                      </span>
                    </a>
                  </li>
                ))}
                <li className="flex items-start gap-4 bg-white p-5">
                  <MapPin
                    size={18}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="mt-1 text-[var(--emission-700)]"
                  />
                  <span>
                    <span className="mono block text-[0.6875rem] uppercase tracking-[0.12em] text-ink-400">
                      Office
                    </span>
                    {contact.addressLines.map((line) => (
                      <span key={line} className="block text-[0.9375rem] text-ink">
                        {line}
                      </span>
                    ))}
                  </span>
                </li>
                <li className="flex items-start gap-4 bg-white p-5">
                  <Clock
                    size={18}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="mt-1 text-[var(--emission-700)]"
                  />
                  <span>
                    <span className="mono block text-[0.6875rem] uppercase tracking-[0.12em] text-ink-400">
                      Hours
                    </span>
                    {contact.hours.map((h) => (
                      <span key={h.days} className="block text-[0.9375rem] text-ink">
                        {h.days} · <span className="figure">{h.time}</span>
                      </span>
                    ))}
                  </span>
                </li>
              </ul>

              <p className="mt-6 text-sm">{contact.coverageNote}</p>

              {/* TODO: replace with the client's exact Google Maps place link. */}
              <div className="mt-8 overflow-hidden rounded-[8px] border border-steel-200">
                <iframe
                  title="ZAN-F office location, Pallavaram, Chennai"
                  src="https://www.google.com/maps?q=Pallavaram,+Chennai,+Tamil+Nadu+600043&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-72 w-full border-0"
                />
              </div>
              <p className="mt-3 text-xs text-ink-400">
                TODO: replace this generic Pallavaram embed with ZAN-F’s exact
                Google Maps place link.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
