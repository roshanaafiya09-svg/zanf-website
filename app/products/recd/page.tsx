import Image from 'next/image'
import Button from '@/components/Button'
import CTABand from '@/components/CTABand'
import FAQAccordion from '@/components/FAQAccordion'
import FeatureGrid from '@/components/FeatureGrid'
import JsonLd from '@/components/JsonLd'
import PageHero from '@/components/PageHero'
import RecdDiagram from '@/components/RecdDiagram'
import SectionHead from '@/components/SectionHead'
import SpecTable from '@/components/SpecTable'
import VideoBlock from '@/components/VideoBlock'
import { certifications, dealerNotice, media, testNote } from '@/content/site'
import { recd } from '@/content/products'
import { breadcrumbSchema, pageMeta, productSchema } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Platino RECD for DG sets — 25 to 1000 kVA',
  description:
    'CPCB type-approved Retrofit Emission Control Device for diesel generators from 25 to 1000 kVA. FOC + CST catalytic treatment, zero added back pressure per ARAI test report, no moving parts and no consumables.',
  path: '/products/recd/',
})

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products/' },
  { name: 'RECD', path: '/products/recd/' },
]

export default function RecdPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          productSchema({
            name: 'Platino RECD — Retrofit Emission Control Device',
            description:
              'Two-stage catalytic retrofit emission control device for diesel generators from 25 to 1000 kVA. CPCB type-approved, tested by ARAI and ICAT under the ISO 8178 5-mode D2 cycle.',
            path: '/products/recd/',
            image: media.installedUnit.src,
          }),
        ]}
      />

      <PageHero
        eyebrow={recd.hero.eyebrow}
        heading={recd.hero.heading}
        lede={recd.hero.lede}
        breadcrumbs={crumbs}
        aside={
          <div className="duotone relative overflow-hidden rounded-[8px] border border-hairline-dark">
            <Image
              src={media.installedUnit.src}
              alt={media.installedUnit.alt}
              width={1200}
              height={900}
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="h-full w-full object-cover"
            />
          </div>
        }
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/contact/" variant="ghost">
            Book a site assessment
          </Button>
          <Button href="/services/" variant="ghost">
            How we install it
          </Button>
        </div>
      </PageHero>

      {/* Overview */}
      <section className="section">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <SectionHead
              eyebrow="How it works"
              heading="Two catalysts in series, in the exhaust line"
              lede="Exhaust enters through a diffuser that spreads it evenly across the catalyst face. The Fuel Oxidation Catalyst converts carbon monoxide and hydrocarbons. The Catalytic Soot Trap captures particulate matter and burns it off during normal running. Treated gas leaves through the outlet chamber, with pressure and temperature taps either side so performance can be measured rather than assumed."
            />
            <RecdDiagram />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-tight border-y border-steel-200 bg-white">
        <div className="shell">
          <SectionHead
            eyebrow="Technical features"
            heading="Engineered to add nothing but clean air"
            lede={testNote}
          />
          <div className="mt-12">
            <FeatureGrid features={recd.features} />
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="section-tight">
        <div className="shell">
          <SectionHead
            eyebrow="Specifications"
            heading="The numbers, and where they come from"
          />
          <div className="mt-10">
            <SpecTable
              caption={recd.specs.caption}
              rows={recd.specs.rows}
              footnote={recd.specs.footnote}
            />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-tight border-y border-steel-200 bg-white">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <SectionHead
                eyebrow="Benefits"
                heading="What it means on your site"
              />
              <ul className="mt-10 space-y-8">
                {recd.benefits.map((benefit) => (
                  <li key={benefit.title}>
                    <h3 className="display text-lg">{benefit.title}</h3>
                    <p className="mt-2 text-sm">{benefit.body}</p>
                  </li>
                ))}
              </ul>
            </div>

            <VideoBlock
              src={media.explainer.src}
              poster={media.explainer.poster}
              label={media.explainer.label}
            />
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-tight">
        <div className="shell">
          <SectionHead
            eyebrow="Certification"
            heading="Type approval, and who tested it"
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
            TODO: add the type-approval certificate scans and their reference
            numbers once ZAN-F supplies them, so each claim on this page can be
            traced to its source document.
          </p>
        </div>
      </section>

      {/* Installation */}
      <section className="section-tight border-y border-steel-200 bg-white">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <SectionHead
              eyebrow="Installation"
              heading={recd.installation.heading}
              lede={recd.installation.body}
            >
              <Button
                href={recd.installation.cta.href}
                variant="outline"
                className="mt-8"
              >
                {recd.installation.cta.label}
              </Button>
            </SectionHead>

            <ol className="space-y-px overflow-hidden rounded-[8px] border border-steel-200 bg-[var(--steel-200)]">
              {recd.installation.steps.map((step, i) => (
                <li key={step} className="flex gap-4 bg-white p-5">
                  <span className="figure text-sm text-[var(--emission-700)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-tight">
        <div className="shell">
          <SectionHead eyebrow="FAQ" heading="Questions we are asked at survey" />
          <div className="mt-10">
            <FAQAccordion faqs={recd.faqs} />
          </div>
          <p className="mt-8 max-w-4xl text-xs leading-relaxed text-ink-400">
            {dealerNotice}
          </p>
        </div>
      </section>

      <CTABand
        heading="Ready to size a RECD for your set?"
        body="A half-day survey establishes the device, the mounting and the sequence — and gives you a firm number instead of an estimate."
        source="RECD page — CTA"
      />
    </>
  )
}
