import CTABand from '@/components/CTABand'
import InsightCards from '@/components/InsightCards'
import JsonLd from '@/components/JsonLd'
import PageHero from '@/components/PageHero'
import { getInsights } from '@/lib/content'
import { breadcrumbSchema, pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Insights — RECD compliance, execution and cost',
  description:
    'Technical notes on retrofit emission control for diesel generators: the compliance guide, commissioning walkthrough, and what drives RECD cost.',
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

      <section className="section" aria-labelledby="all-insights">
        <div className="shell">
          {/* The cards are h3. Without this the document jumps h1 → h3. */}
          <h2 id="all-insights" className="sr-only">
            All technical notes
          </h2>
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
