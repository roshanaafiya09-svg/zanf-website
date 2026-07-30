import CTABand from '@/components/CTABand'
import InsightCards from '@/components/InsightCards'
import JsonLd from '@/components/JsonLd'
import PageHero from '@/components/PageHero'
import { getInsights } from '@/lib/content'
import { breadcrumbSchema, pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Insights — RECD compliance, execution and cost',
  description:
    'Technical notes on retrofit emission control for diesel generators: the compliance guide, what happens during commissioning, and what actually drives RECD cost of ownership.',
  path: '/insights/',
})

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Insights', path: '/insights/' },
]

export default function InsightsPage() {
  const insights = getInsights()

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <PageHero
        eyebrow="Insights"
        heading="Technical notes"
        lede="Written for the person who has to make the decision and defend it afterwards. No deadlines we cannot source, no figures we cannot attribute."
        breadcrumbs={crumbs}
      />

      <section className="section">
        <div className="shell">
          <InsightCards insights={insights} />
        </div>
      </section>

      <CTABand
        heading="Question this did not answer?"
        body="Send it to an engineer. If it is worth writing up, it becomes the next note here."
        primaryLabel="Ask an engineer"
        source="Insights index — CTA"
      />
    </>
  )
}
