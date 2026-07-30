import Image from 'next/image'
import Link from 'next/link'
import type { Project } from '@/lib/content'

/**
 * Project cards.
 *
 * A `pending` entry does not pretend to be a project. It renders as an
 * unmistakable placeholder — dashed border, "awaiting client release" chip,
 * empty fields — because a plausible-looking invented case study is the single
 * most damaging thing this site could contain. The wording is aimed at a
 * visitor rather than at us; the internal checklist lives in HANDOVER.md.
 */
export default function ProjectCards({
  projects,
  limit,
}: {
  projects: Project[]
  limit?: number
}) {
  const shown = limit ? projects.slice(0, limit) : projects

  return (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {shown.map((project) =>
        project.status === 'published' ? (
          <li key={project.slug}>
            <Link
              href={`/projects/${project.slug}/`}
              className="card group flex h-full flex-col overflow-hidden"
            >
              {project.image && (
                <div className="duotone relative aspect-[16/10] overflow-hidden border-b border-steel-200">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <p className="mono text-[0.6875rem] uppercase tracking-[0.12em] text-[var(--emission-700)]">
                  {project.sector} · {project.location}
                </p>
                <h3 className="display mt-3 text-lg">{project.title}</h3>
                <dl className="mono mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-[0.6875rem] uppercase tracking-[0.08em] text-ink-400">
                  <div>
                    <dt className="sr-only">DG rating</dt>
                    <dd className="text-ink">{project.dgRating}</dd>
                  </div>
                  <div>
                    <dt className="sr-only">Scope</dt>
                    <dd className="text-ink">{project.scope}</dd>
                  </div>
                </dl>
                <p className="mt-4 text-sm">{project.outcome}</p>
              </div>
            </Link>
          </li>
        ) : (
          <li
            key={project.slug}
            className="flex flex-col rounded-[8px] border border-dashed border-[var(--hairline-strong)] bg-[var(--steel-100)] p-6"
          >
            <p className="mono inline-flex w-fit items-center rounded-[4px] bg-[var(--signal-tint)] px-2.5 py-1 text-[0.625rem] uppercase tracking-[0.14em] text-[var(--signal-ink)]">
              Awaiting client release
            </p>
            <h3 className="display mt-5 text-lg text-ink-600">{project.title}</h3>
            <p className="mt-3 text-sm text-ink-400">
              Sector, location, DG rating, scope, product, outcome and site
              photographs are published here once the client agrees to release
              them. We would rather leave the slot visibly empty than write a
              case study nobody signed off.
            </p>
            <dl className="mono mt-6 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-steel-200 pt-5 text-[0.6875rem] uppercase tracking-[0.08em] text-ink-400">
              {['Sector', 'Location', 'DG rating', 'Scope'].map((field) => (
                <div key={field}>
                  <dt>{field}</dt>
                  <dd className="text-ink-600">—</dd>
                </div>
              ))}
            </dl>
          </li>
        )
      )}
    </ul>
  )
}
