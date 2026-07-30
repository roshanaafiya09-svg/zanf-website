import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import CTABand from '@/components/CTABand'
import GradientRule from '@/components/GradientRule'
import InsightCards from '@/components/InsightCards'
import JsonLd from '@/components/JsonLd'
import PageHero from '@/components/PageHero'
import Prose, { mdxComponents } from '@/components/Prose'
import SectionHead from '@/components/SectionHead'
import { formatDate, getInsight, getInsights } from '@/lib/content'
import { site } from '@/content/site'
import { breadcrumbSchema, pageMeta } from '@/lib/seo'

export function generateStaticParams() {
  return getInsights().map((insight) => ({ slug: insight.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const insight = getInsight(slug)
  if (!insight) return {}

  return pageMeta({
    title: insight.title,
    description: insight.description,
    path: `/insights/${slug}/`,
  })
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const insight = getInsight(slug)
  if (!insight) notFound()

  const related = getInsights().filter((item) => item.slug !== slug)

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Insights', path: '/insights/' },
    { name: insight.title, path: `/insights/${slug}/` },
  ]

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: insight.title,
    description: insight.description,
    datePublished: insight.date,
    author: { '@type': 'Organization', name: site.legalName },
    publisher: { '@id': `${site.url}/#organization` },
    mainEntityOfPage: `${site.url}/insights/${slug}/`,
  }

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), articleSchema]} />

      <PageHero
        eyebrow={insight.topic}
        heading={insight.title}
        lede={insight.description}
        breadcrumbs={crumbs}
      >
        <p className="mono text-[0.6875rem] uppercase tracking-[0.12em] text-air-lo">
          {formatDate(insight.date)}
          {insight.readingTime && ` · ${insight.readingTime}`}
        </p>
      </PageHero>

      <article className="section">
        <div className="shell">
          <Prose>
            <MDXRemote source={insight.body} components={mdxComponents} />
          </Prose>

          <GradientRule width="w-full max-w-[68ch]" className="mt-14" />
          <p className="mt-6 max-w-[68ch] text-sm text-ink-400">
            Written by the ZAN-F engineering team. Where this note touches
            regulation it describes the mechanism only — the{' '}
            <a
              href="/compliance/"
              className="text-[var(--emission-700)] underline underline-offset-4"
            >
              official notifications
            </a>{' '}
            are the authority on what applies to your site.
          </p>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section-tight border-t border-steel-200 bg-white">
          <div className="shell">
            <SectionHead eyebrow="More" heading="Related notes" />
            <div className="mt-10">
              <InsightCards insights={related} limit={2} />
            </div>
          </div>
        </section>
      )}

      <CTABand
        heading="Need this applied to your own site?"
        body="A site assessment turns general guidance into a specific scope, with a number attached."
        source={`Insight — ${insight.title}`}
      />
    </>
  )
}
