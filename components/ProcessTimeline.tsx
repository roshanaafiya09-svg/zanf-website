import Link from 'next/link'
import { getIcon } from '@/lib/icons'
import type { Stage } from '@/content/services'

const node =
  'grid h-[3.2rem] w-[3.2rem] shrink-0 place-items-center rounded-full border border-steel-200 bg-[var(--air-white)] text-[var(--emission-700)] [.on-carbon_&]:border-hairline-dark [.on-carbon_&]:bg-carbon [.on-carbon_&]:text-[var(--emission-300)]'

const accent =
  'mono text-[0.6875rem] uppercase tracking-[0.1em] text-[var(--emission-700)] [.on-carbon_&]:text-[var(--emission-300)]'

const stageLink =
  'inline-block text-sm text-[var(--emission-700)] underline-offset-4 hover:underline [.on-carbon_&]:text-[var(--emission-300)]'

/**
 * The four ITC stages, riding the Clean-Air Gradient Rule.
 *
 * The rule is the progress spine: carbon at survey, clean air at handover, so
 * the signature device carries meaning rather than just decorating. Horizontal
 * on desktop, vertical on phones — the same data, laid out the way each screen
 * can actually read it.
 */
export default function ProcessTimeline({
  stages,
  variant = 'compact',
  linkStages = true,
}: {
  stages: Stage[]
  variant?: 'compact' | 'detailed'
  linkStages?: boolean
}) {
  const detail = (stage: Stage) =>
    variant === 'detailed' ? (
      <ul className="mt-5 space-y-2 text-sm">
        {stage.work.slice(0, 4).map((item) => (
          <li key={item} className="flex gap-2.5">
            <span aria-hidden="true" className="mono opacity-40">
              —
            </span>
            {item}
          </li>
        ))}
      </ul>
    ) : null

  return (
    <div>
      {/* Desktop — stages sit on the rule */}
      <ol className="relative hidden lg:grid lg:grid-cols-4 lg:gap-8">
        <div
          aria-hidden="true"
          className="rule-clean absolute left-0 right-0 top-[1.6rem]"
        />
        {stages.map((stage) => {
          const Icon = getIcon(stage.icon)
          return (
            <li key={stage.code} className="relative">
              <div className="flex items-center gap-3">
                <span className={node}>
                  <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <span className="figure text-sm">{stage.code}</span>
              </div>

              <h3 className="display mt-6 text-lg">{stage.title}</h3>
              <p className="mt-3 text-sm">{stage.summary}</p>
              {stage.duration && (
                <p className={`${accent} mt-4`}>{stage.duration}</p>
              )}
              {detail(stage)}
              {linkStages && (
                <Link
                  href={`/services/${stage.slug}/`}
                  className={`${stageLink} mt-5`}
                >
                  {stage.short} detail →
                </Link>
              )}
            </li>
          )
        })}
      </ol>

      {/* Phone and tablet — the same rule, turned on its side */}
      <ol className="relative space-y-10 lg:hidden">
        <div
          aria-hidden="true"
          className="absolute bottom-2 left-[1.6rem] top-2 w-[2px] bg-[linear-gradient(180deg,var(--carbon-800),var(--emission-500)_55%,var(--emission-300))]"
        />
        {stages.map((stage) => {
          const Icon = getIcon(stage.icon)
          return (
            <li key={stage.code} className="relative flex gap-5">
              <span className={`${node} relative z-10`}>
                <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <div className="pt-1">
                <span className="figure text-sm">{stage.code}</span>
                <h3 className="display mt-2 text-lg">{stage.title}</h3>
                <p className="mt-3 text-sm">{stage.summary}</p>
                {stage.duration && (
                  <p className={`${accent} mt-3`}>{stage.duration}</p>
                )}
                {detail(stage)}
                {linkStages && (
                  <Link
                    href={`/services/${stage.slug}/`}
                    className={`${stageLink} mt-4`}
                  >
                    {stage.short} detail →
                  </Link>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
