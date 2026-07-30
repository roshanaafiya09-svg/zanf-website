import CTABand from '@/components/CTABand'
import JsonLd from '@/components/JsonLd'
import PageHero from '@/components/PageHero'
import ProjectCards from '@/components/ProjectCards'
import SectionHead from '@/components/SectionHead'
import { getProjects } from '@/lib/content'
import { breadcrumbSchema, pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Projects — RECD installations',
  description:
    'ZAN-F RECD installation case studies: sector, DG rating, scope, product and measured outcome. Published as project details are released.',
  path: '/projects/',
})

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects/' },
]

export default function ProjectsPage() {
  const projects = getProjects()
  const published = projects.filter((p) => p.status === 'published')

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <PageHero
        eyebrow="Projects"
        heading="Installations"
        lede="Every case study here will carry a sector, a location, a DG rating, a scope and a measured outcome. Until ZAN-F releases those details, the slots stay visibly empty — an invented project is worth less than an honest gap."
        breadcrumbs={crumbs}
      />

      <section className="section" aria-labelledby="all-projects">
        <div className="shell">
          {/* The cards are h3. Without this the document jumps h1 → h3. */}
          <h2 id="all-projects" className="sr-only">
            All installations
          </h2>
          {published.length === 0 && (
            <div className="mb-10 rounded-[8px] border border-steel-200 bg-white p-7">
              <p className="mono text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--signal-ink)]">
                Why this page is empty
              </p>
              <p className="mt-3 max-w-2xl text-sm">
                We publish a case study only once the client has agreed to
                release the details — sector, location, DG rating, scope,
                measured outcome and photographs of their own plant. None have
                been cleared for publication yet, so rather than fill the page
                with generic copy we have left the slots as they are. If you
                want to speak to a reference site, ask us and we will see who is
                willing.
              </p>
            </div>
          )}

          <ProjectCards projects={projects} />
        </div>
      </section>

      <section className="section-tight border-t border-steel-200 bg-white">
        <div className="shell">
          <SectionHead
            eyebrow="What a case study will contain"
            heading="The same fields, every time"
            lede="Sector and client where permission allows. Location. DG rating and count. Scope — supply, SITC or AMC. Product installed. What was measured at commissioning. What the site was left holding. Photographs of the actual installation, not a stock plant room."
          />
        </div>
      </section>

      <CTABand
        heading="Want to talk to a reference site?"
        body="Ask us. Where a client is willing, we will put you in touch rather than paraphrase them on a web page."
        primaryLabel="Ask an engineer"
        source="Projects index — CTA"
      />
    </>
  )
}
