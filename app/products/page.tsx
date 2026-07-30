import CTABand from '@/components/CTABand'
import JsonLd from '@/components/JsonLd'
import PageHero from '@/components/PageHero'
import ProductCards from '@/components/ProductCards'
import SectionHead from '@/components/SectionHead'
import { dealerNotice, testNote } from '@/content/site'
import { productsIntro } from '@/content/products'
import { breadcrumbSchema, pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Products — Platino RECD, RATS® and OBD monitoring',
  description:
    'CPCB type-approved Platino RECD for 25–1000 kVA generators, RATS® for engines above 1000 kVA, and OBD monitoring — supplied and installed by ZAN-F.',
  path: '/products/',
})

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products/' },
]

export default function ProductsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <PageHero
        eyebrow="Products"
        heading={productsIntro.heading}
        lede={productsIntro.lede}
        breadcrumbs={crumbs}
      />

      <section className="section" aria-labelledby="all-products">
        <div className="shell">
          {/* The cards are h3. Without this the document jumps h1 → h3. */}
          <h2 id="all-products" className="sr-only">
            The three product lines
          </h2>
          <ProductCards />

          <div className="mt-12 rounded-[8px] border border-steel-200 bg-white p-7">
            <p className="text-sm">{testNote}</p>
            <p className="mt-4 text-xs leading-relaxed text-ink-400">
              {dealerNotice}
            </p>
          </div>
        </div>
      </section>

      <section className="section-tight border-t border-steel-200 bg-white">
        <div className="shell">
          <SectionHead
            eyebrow="Choosing between them"
            heading="Rating decides the family. The site decides the unit."
            lede="Generators from 25 to 1000 kVA take a RECD. Above 1000 kVA it is the RATS® after-treatment system, built to the duct run. Within either, the deciding factors are exhaust volume, routing and the space you actually have — which is what the site survey establishes before anything is quoted."
          />
        </div>
      </section>

      <CTABand
        heading="Not sure which device your set needs?"
        body="Send us the rating and a photograph of the exhaust run. An engineer will tell you what applies before anyone visits."
        primaryLabel="Ask an engineer"
        source="Products landing — CTA"
      />
    </>
  )
}
