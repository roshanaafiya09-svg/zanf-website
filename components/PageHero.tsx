import Breadcrumbs from './Breadcrumbs'
import Eyebrow from './Eyebrow'
import GradientRule from './GradientRule'

/**
 * The carbon band every inner page opens with. Consistent shape across twenty
 * pages is what makes the site feel like one system rather than twenty designs.
 */
export default function PageHero({
  eyebrow,
  heading,
  lede,
  breadcrumbs,
  children,
  aside,
}: {
  eyebrow: string
  heading: string
  lede?: string
  breadcrumbs: { name: string; path: string }[]
  children?: React.ReactNode
  aside?: React.ReactNode
}) {
  return (
    <section className="on-carbon relative overflow-hidden bg-carbon">
      <div className="grid-lines absolute inset-0" aria-hidden="true" />

      <div className="shell relative pb-14 pt-10 md:pb-20 md:pt-14">
        <Breadcrumbs items={breadcrumbs} />

        <div
          className={
            aside
              ? 'mt-10 grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-end'
              : 'mt-10'
          }
        >
          <div className="max-w-3xl">
            <Eyebrow>{eyebrow}</Eyebrow>
            <GradientRule width="w-16" className="mt-4" />
            <h1 className="display mt-6 text-[2.1rem] sm:text-[2.75rem] lg:text-[3.4rem]">
              {heading}
            </h1>
            {lede && <p className="lede mt-6 max-w-2xl">{lede}</p>}
            {children && <div className="mt-8">{children}</div>}
          </div>
          {aside}
        </div>
      </div>
    </section>
  )
}
