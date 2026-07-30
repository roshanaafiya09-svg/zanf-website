import Button from './Button'
import CTABand from './CTABand'
import FAQAccordion from './FAQAccordion'
import JsonLd from './JsonLd'
import PageHero from './PageHero'
import SectionHead from './SectionHead'
import { breadcrumbSchema, serviceSchema } from '@/lib/seo'

type Content = {
  eyebrow: string
  heading: string
  lede: string
  sections: { heading: string; body: string }[]
  faqs: { q: string; a: string }[]
}

/**
 * The four ITC child pages share a shape: hero, three explanatory sections, an
 * optional deliverables list, FAQ, CTA. One component so the pages stay
 * consistent and the copy stays in `content/services.ts`.
 */
export default function ServiceChild({
  content,
  path,
  crumbName,
  deliverables,
  ctaHeading,
  ctaBody,
}: {
  content: Content
  path: string
  crumbName: string
  deliverables?: { heading: string; items: string[] }
  ctaHeading: string
  ctaBody: string
}) {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services/' },
    { name: crumbName, path },
  ]

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          serviceSchema({
            name: content.heading,
            description: content.lede,
            path,
          }),
        ]}
      />

      <PageHero
        eyebrow={content.eyebrow}
        heading={content.heading}
        lede={content.lede}
        breadcrumbs={crumbs}
      >
        <Button href="/contact/" variant="ghost">
          Book a site survey
        </Button>
      </PageHero>

      <section className="section">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <SectionHead eyebrow="Method" heading="How this stage is run" />

            <div className="space-y-10">
              {content.sections.map((section) => (
                <div key={section.heading}>
                  <h3 className="display text-xl">{section.heading}</h3>
                  <p className="mt-4 max-w-2xl text-[0.9375rem]">
                    {section.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {deliverables && (
        <section className="section-tight border-y border-steel-200 bg-white">
          <div className="shell">
            <SectionHead eyebrow="Deliverables" heading={deliverables.heading} />
            <ul className="mono mt-10 grid gap-px overflow-hidden rounded-[8px] border border-steel-200 bg-[var(--steel-200)] sm:grid-cols-2">
              {deliverables.items.map((item, i) => (
                <li key={item} className="flex gap-4 bg-white p-5 text-sm">
                  <span className="figure text-[var(--emission-700)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-sans">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section-tight">
        <div className="shell">
          <SectionHead eyebrow="FAQ" heading="What clients ask" />
          <div className="mt-10">
            <FAQAccordion faqs={content.faqs} />
          </div>
        </div>
      </section>

      <CTABand
        heading={ctaHeading}
        body={ctaBody}
        primaryLabel="Book a site survey"
        source={`${crumbName} page — CTA`}
      />
    </>
  )
}
