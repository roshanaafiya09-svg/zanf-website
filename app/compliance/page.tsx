import { ArrowUpRight, TriangleAlert } from 'lucide-react'
import CTABand from '@/components/CTABand'
import FAQAccordion from '@/components/FAQAccordion'
import JsonLd from '@/components/JsonLd'
import PageHero from '@/components/PageHero'
import SectionHead from '@/components/SectionHead'
import { certifications, testNote } from '@/content/site'
import {
  complianceFaqs,
  compliancePage,
  complianceSteps,
  explainers,
  notifications,
} from '@/content/compliance'
import { breadcrumbSchema, pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'CPCB & state RECD compliance for DG sets',
  description:
    'What a RECD is, what CPCB type approval means, what a compliant installation consists of and what evidence to hold — with direct links to the official CPCB and state pollution control board notifications.',
  path: '/compliance/',
})

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Compliance', path: '/compliance/' },
]

export default function CompliancePage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <PageHero
        eyebrow={compliancePage.eyebrow}
        heading={compliancePage.heading}
        lede={compliancePage.lede}
        breadcrumbs={crumbs}
      />

      {/* The honest disclaimer, given prominence rather than hidden */}
      <section className="border-b border-steel-200 bg-[var(--signal-tint)]">
        <div className="shell py-6">
          <p className="flex items-start gap-3 text-sm">
            <TriangleAlert
              size={17}
              strokeWidth={2}
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-[var(--signal-ink)]"
            />
            <span>
              <strong className="font-medium text-ink">
                No deadline, penalty figure or applicability threshold is stated
                on this page.
              </strong>{' '}
              Requirements differ by state and change without notice. The
              official notifications linked below are the authority — read the
              source before making a decision, or{' '}
              <a
                href="/contact/"
                className="text-[var(--signal-ink)] underline underline-offset-4"
              >
                ask us which one applies to your site
              </a>
              .
            </span>
          </p>
        </div>
      </section>

      {/* Explainers */}
      <section className="section">
        <div className="shell">
          <SectionHead
            eyebrow="The mechanism"
            heading="How DG emission compliance actually works"
          />
          <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {explainers.map((item) => (
              <div key={item.q}>
                <h3 className="display text-lg">{item.q}</h3>
                <p className="mt-3 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Four steps */}
      <section className="section-tight border-y border-steel-200 bg-white">
        <div className="shell">
          <SectionHead
            eyebrow="Getting compliant"
            heading="Four things that have to be true"
          />
          <ol className="mt-12 grid gap-px overflow-hidden rounded-[8px] border border-steel-200 bg-[var(--steel-200)] sm:grid-cols-2 lg:grid-cols-4">
            {complianceSteps.map((step) => (
              <li key={step.code} className="bg-white p-7">
                <p className="figure text-sm text-[var(--emission-700)]">
                  {step.code}
                </p>
                <h3 className="display mt-3 text-base">{step.title}</h3>
                <p className="mt-3 text-sm">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Official notifications */}
      <section className="section-tight">
        <div className="shell">
          <SectionHead
            eyebrow="Official notifications"
            heading="Read the source"
            lede="Six links, each opening on the issuing authority’s own site. These are the documents an inspector works from."
          />
          <ul className="mt-12 grid gap-px overflow-hidden rounded-[8px] border border-steel-200 bg-[var(--steel-200)] md:grid-cols-2">
            {notifications.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full items-start justify-between gap-4 bg-white p-6 transition-colors duration-200 hover:bg-[var(--steel-100)]"
                >
                  <span>
                    <span className="mono text-[0.6875rem] uppercase tracking-[0.12em] text-[var(--emission-700)]">
                      {item.short} · {item.scope}
                    </span>
                    <span className="display mt-2 block text-base">
                      {item.label}
                    </span>
                    <span className="mt-1 block text-sm text-ink-400">
                      {item.note}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={17}
                    strokeWidth={1.75}
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-ink-400"
                  />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-ink-400">
            State boards reissue and relocate these documents without notice. If
            a link has moved, tell us and we will trace the current version.
          </p>
        </div>
      </section>

      {/* Certification */}
      <section className="section-tight border-y border-steel-200 bg-white">
        <div className="shell">
          <SectionHead
            eyebrow="Certification"
            heading="Who tests, and who approves"
            lede={testNote}
          />
          <ul className="mt-10 grid gap-px overflow-hidden rounded-[8px] border border-steel-200 bg-[var(--steel-200)] sm:grid-cols-3">
            {certifications.map((cert) => (
              <li key={cert.short} className="bg-white p-7">
                <p className="figure text-2xl">{cert.short}</p>
                <p className="mt-3 text-sm text-ink">{cert.full}</p>
                <p className="mono mt-2 text-[0.6875rem] uppercase tracking-[0.1em] text-ink-400">
                  {cert.note}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-ink-400">
            The type-approval certificate for the device we propose is available
            on request, and forms part of the compliance pack you are handed at
            commissioning.
          </p>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell">
          <SectionHead eyebrow="FAQ" heading="Compliance questions" />
          <div className="mt-10">
            <FAQAccordion faqs={complianceFaqs} />
          </div>
        </div>
      </section>

      <CTABand
        heading="Not sure what applies to your site?"
        body="Send us the rating, the location and the year the set was installed. We will point you at the relevant notification — and tell you plainly if nothing applies."
        primaryLabel="Ask an engineer"
        source="Compliance page — CTA"
      />
    </>
  )
}
