import Link from 'next/link'
import Button from '@/components/Button'
import CTABand from '@/components/CTABand'
import FAQAccordion from '@/components/FAQAccordion'
import FeatureGrid from '@/components/FeatureGrid'
import JsonLd from '@/components/JsonLd'
import PageHero from '@/components/PageHero'
import SectionHead from '@/components/SectionHead'
import SpecTable from '@/components/SpecTable'
import { dealerNotice } from '@/content/site'
import { obd } from '@/content/products'
import { breadcrumbSchema, pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'OBD & emission monitoring for RECD',
  description:
    'Differential pressure and temperature sensing either side of the device, wired to an OBD panel and calibrated at commissioning.',
  path: '/products/obd-monitoring/',
})

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products/' },
  { name: 'OBD & monitoring', path: '/products/obd-monitoring/' },
]

export default function ObdPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <PageHero
        eyebrow={obd.hero.eyebrow}
        heading={obd.hero.heading}
        lede={obd.hero.lede}
        breadcrumbs={crumbs}
      >
        <Button href="/contact/" variant="ghost">
          Ask about monitoring
        </Button>
      </PageHero>

      <section className="section">
        <div className="shell">
          <SectionHead
            eyebrow="What it does"
            heading="Instrumentation, not indication"
            lede="Differential pressure across the substrate is the single most useful health figure a RECD produces. Recorded at commissioning as a baseline and watched afterwards, it tells you a device is drifting long before anybody notices a performance change."
          />
          <div className="mt-12">
            <FeatureGrid features={obd.features} />
          </div>
        </div>
      </section>

      <section className="section-tight border-y border-steel-200 bg-white">
        <div className="shell">
          <SectionHead eyebrow="Measured" heading="What the panel reads" />
          <div className="mt-10">
            <SpecTable
              caption={obd.specs.caption}
              rows={obd.specs.rows}
              footnote={obd.specs.footnote}
            />
          </div>
        </div>
      </section>

      {/* Bridge to the future portal */}
      <section className="section-tight">
        <div className="shell">
          <div className="rounded-[8px] border border-steel-200 bg-white p-8 md:p-10">
            <p className="mono text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--emission-700)]">
              Coming
            </p>
            <h2 className="display mt-4 max-w-2xl text-[1.6rem] sm:text-[2rem]">
              {obd.portalNote}
            </h2>
            <Link
              href="/portal/"
              className="mt-6 inline-block text-sm text-[var(--emission-700)] underline-offset-4 hover:underline"
            >
              About the ZAN-F Client Portal →
            </Link>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell">
          <SectionHead eyebrow="FAQ" heading="Common questions" />
          <div className="mt-10">
            <FAQAccordion faqs={obd.faqs} />
          </div>
          <p className="mt-8 max-w-4xl text-xs leading-relaxed text-ink-400">
            {dealerNotice}
          </p>
        </div>
      </section>

      <CTABand
        heading="Want your devices instrumented properly?"
        body="Sensing can be added to an existing installation where the taps allow it. A short visit establishes what is possible on your set."
        primaryLabel="Ask an engineer"
        source="OBD page — CTA"
      />
    </>
  )
}
