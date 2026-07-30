import Link from 'next/link'
import { Check } from 'lucide-react'
import Button from '@/components/Button'
import CTABand from '@/components/CTABand'
import IndustryGrid from '@/components/IndustryGrid'
import JsonLd from '@/components/JsonLd'
import PageHero from '@/components/PageHero'
import ProcessTimeline from '@/components/ProcessTimeline'
import SectionHead from '@/components/SectionHead'
import Testimonials from '@/components/Testimonials'
import { getIcon } from '@/lib/icons'
import { capabilities, handoverPack, servicesIntro, stages } from '@/content/services'
import { breadcrumbSchema, pageMeta, serviceSchema } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Installation, Testing & Commissioning (SITC) for RECD',
  description:
    'Turnkey RECD installation, testing, commissioning and AMC for diesel generators. Site survey, back-pressure calculation, mechanical erection, verification under load and a documented compliance handover.',
  path: '/services/',
})

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services/' },
]

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          serviceSchema({
            name: 'RECD Installation, Testing & Commissioning',
            description:
              'Turnkey SITC execution for retrofit emission control devices on diesel generator sets: survey, sizing, installation, testing, commissioning, documentation and AMC.',
            path: '/services/',
          }),
        ]}
      />

      <PageHero
        eyebrow={servicesIntro.eyebrow}
        heading={servicesIntro.heading}
        lede={servicesIntro.lede}
        breadcrumbs={crumbs}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/contact/" variant="ghost">
            Book a site survey
          </Button>
          <Button href="/products/" variant="ghost">
            See the hardware
          </Button>
        </div>
      </PageHero>

      {/* The four stages */}
      <section className="section">
        <div className="shell">
          <SectionHead
            eyebrow="The process"
            heading="From site survey to compliance handover"
            lede="Each stage lists what is done, what is measured and what is handed over. If a stage cannot produce a document, it has not been completed."
          />
          <div className="mt-14">
            <ProcessTimeline stages={stages} variant="detailed" />
          </div>
        </div>
      </section>

      {/* What is measured, by stage */}
      <section className="section-tight border-y border-steel-200 bg-white">
        <div className="shell">
          <SectionHead
            eyebrow="Measured"
            heading="Numbers, not assurances"
            lede="Every stage produces readings that go into the record. This is what turns an installation into something you can defend."
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded-[8px] border border-steel-200 bg-[var(--steel-200)] sm:grid-cols-2 lg:grid-cols-4">
            {stages.map((stage) => (
              <div key={stage.code} className="bg-white p-7">
                <p className="figure text-sm text-[var(--emission-700)]">
                  {stage.code}
                </p>
                <h3 className="display mt-3 text-base">{stage.short}</h3>
                <dl className="mt-5 space-y-3">
                  {stage.measured.map((m) => (
                    <div key={m.label}>
                      <dt className="text-sm">{m.label}</dt>
                      <dd className="mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-400">
                        {m.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Handover pack */}
      <section className="section-tight">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            <SectionHead
              eyebrow="Handover"
              heading={handoverPack.heading}
              lede={handoverPack.body}
            >
              <Button
                href="/services/commissioning/"
                variant="outline"
                className="mt-8"
              >
                Commissioning detail
              </Button>
            </SectionHead>

            <ul className="rounded-[8px] border border-steel-200 bg-white p-7">
              {handoverPack.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 border-b border-steel-200 py-3.5 text-sm last:border-0"
                >
                  <Check
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-[var(--emission-700)]"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Wider capability */}
      <section className="section-tight border-y border-steel-200 bg-white">
        <div className="shell">
          <SectionHead
            eyebrow="Wider capability"
            heading="The rest of what we do on DG plant"
            lede="RECD work sits inside a generator-services business, which is why the exhaust modification, the panel and the AMC do not have to be subcontracted out of our control."
          />
          <ul className="mt-12 grid gap-px overflow-hidden rounded-[8px] border border-steel-200 bg-[var(--steel-200)] sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((capability) => {
              const Icon = getIcon(capability.icon)
              return (
                <li key={capability.title} className="bg-white p-7">
                  <Icon
                    size={19}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="text-[var(--emission-700)]"
                  />
                  <h3 className="display mt-5 text-base">{capability.title}</h3>
                  <p className="mt-3 text-sm">{capability.body}</p>
                  {capability.href && (
                    <Link
                      href={capability.href}
                      className="mt-4 inline-block text-sm text-[var(--emission-700)] underline-offset-4 hover:underline"
                    >
                      Read more →
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* Who we serve */}
      <section className="section-tight">
        <div className="shell">
          <SectionHead
            eyebrow="Who we serve"
            heading="Sites where the generator is not optional"
          />
          <div className="mt-12">
            <IndustryGrid />
          </div>
          <div className="mt-12">
            <Testimonials />
          </div>
        </div>
      </section>

      <CTABand
        heading="Book a site survey"
        body="Half a day on site establishes the device, the mounting, the sequence and the outage each stage needs — and gives you a firm scope instead of an estimate."
        source="Services landing — CTA"
      />
    </>
  )
}
