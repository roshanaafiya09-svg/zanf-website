import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import CTABand from '@/components/CTABand'
import JsonLd from '@/components/JsonLd'
import PageHero from '@/components/PageHero'
import Prose, { mdxComponents } from '@/components/Prose'
import { getProject, getProjects } from '@/lib/content'
import { breadcrumbSchema, pageMeta } from '@/lib/seo'

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}

  return {
    ...pageMeta({
      title: project.title,
      description:
        project.outcome ||
        'Project details will be published once released by ZAN-F.',
      path: `/projects/${slug}/`,
    }),
    // A placeholder has nothing to offer a search engine yet.
    robots: project.status === 'published' ? undefined : { index: false },
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects/' },
    { name: project.title, path: `/projects/${slug}/` },
  ]

  const facts = [
    { label: 'Sector', value: project.sector },
    { label: 'Location', value: project.location },
    { label: 'DG rating', value: project.dgRating },
    { label: 'Scope', value: project.scope },
    { label: 'Product', value: project.product },
  ]

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <PageHero
        eyebrow={project.status === 'published' ? project.sector : 'Placeholder'}
        heading={project.title}
        lede={
          project.status === 'published'
            ? project.outcome
            : 'This case study has not been published. The fields below stay empty until ZAN-F releases the project details — nothing has been written in the meantime.'
        }
        breadcrumbs={crumbs}
      />

      <section className="section">
        <div className="shell">
          <dl className="grid gap-px overflow-hidden rounded-[8px] border border-steel-200 bg-[var(--steel-200)] sm:grid-cols-3 lg:grid-cols-5">
            {facts.map((fact) => (
              <div key={fact.label} className="bg-white p-6">
                <dt className="mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-400">
                  {fact.label}
                </dt>
                <dd className="figure mt-2 text-sm">{fact.value || '—'}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-12">
            <Prose>
              <MDXRemote source={project.body} components={mdxComponents} />
            </Prose>
          </div>
        </div>
      </section>

      <CTABand
        heading="Similar plant to bring into compliance?"
        body="Send us the rating and the location. A survey turns it into a scope with a number attached."
        source={`Project — ${project.title}`}
      />
    </>
  )
}
