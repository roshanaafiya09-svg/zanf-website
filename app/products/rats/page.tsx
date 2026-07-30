import Image from 'next/image'
import Button from '@/components/Button'
import CTABand from '@/components/CTABand'
import FAQAccordion from '@/components/FAQAccordion'
import FeatureGrid from '@/components/FeatureGrid'
import JsonLd from '@/components/JsonLd'
import PageHero from '@/components/PageHero'
import SectionHead from '@/components/SectionHead'
import SpecTable from '@/components/SpecTable'
import { dealerNotice, media, testNote } from '@/content/site'
import { rats } from '@/content/products'
import { breadcrumbSchema, pageMeta, productSchema } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Platino RATS® — after-treatment for engines above 1000 kVA',
  description:
    'Retrofit After Treatment System for high-horsepower diesel engines above 1000 kVA. PM, HC and CO in one in-line unit, oriented and sized to the duct run that exists.',
  path: '/products/rats/',
})

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products/' },
  { name: 'RATS®', path: '/products/rats/' },
]

export default function RatsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          productSchema({
            name: 'Platino RATS® — Retrofit After Treatment System',
            description:
              'Retrofit after-treatment system for high-horsepower diesel engines above 1000 kVA, treating particulate matter, hydrocarbons and carbon monoxide in a single in-line unit.',
            path: '/products/rats/',
            image: media.noxReducer.src,
          }),
        ]}
      />

      <PageHero
        eyebrow={rats.hero.eyebrow}
        heading={rats.hero.heading}
        lede={rats.hero.lede}
        breadcrumbs={crumbs}
        aside={
          <div className="duotone relative overflow-hidden rounded-[8px] border border-hairline-dark">
            <Image
              src={media.noxReducer.src}
              alt={media.noxReducer.alt}
              width={1200}
              height={900}
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="h-full w-full object-cover"
            />
          </div>
        }
      >
        <Button href="/contact/" variant="ghost">
          Book a site assessment
        </Button>
      </PageHero>

      <section className="section">
        <div className="shell">
          <SectionHead
            eyebrow="Technical features"
            heading="Same principle, built around the plant room"
            lede={testNote}
          />
          <div className="mt-12">
            <FeatureGrid features={rats.features} />
          </div>
        </div>
      </section>

      <section className="section-tight border-y border-steel-200 bg-white">
        <div className="shell">
          <SectionHead eyebrow="Specifications" heading="Technical summary" />
          <div className="mt-10">
            <SpecTable
              caption={rats.specs.caption}
              rows={rats.specs.rows}
              footnote={rats.specs.footnote}
            />
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell">
          <SectionHead eyebrow="FAQ" heading="Questions at this scale" />
          <div className="mt-10">
            <FAQAccordion faqs={rats.faqs} />
          </div>
          <p className="mt-8 max-w-4xl text-xs leading-relaxed text-ink-400">
            {dealerNotice}
          </p>
        </div>
      </section>

      <CTABand
        heading="High-horsepower plant to bring into line?"
        body="Large installations are sequenced around agreed outage windows, one set at a time. The survey establishes what each stage needs before anything is committed."
        source="RATS page — CTA"
      />
    </>
  )
}
