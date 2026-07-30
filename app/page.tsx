import Link from 'next/link'
import { ArrowRight, TriangleAlert } from 'lucide-react'
import Button from '@/components/Button'
import CertStrip from '@/components/CertStrip'
import ClientWall from '@/components/ClientWall'
import CTABand from '@/components/CTABand'
import DifferenceGrid from '@/components/DifferenceGrid'
import Hero from '@/components/Hero'
import IndustryGrid from '@/components/IndustryGrid'
import InsightCards from '@/components/InsightCards'
import ProcessTimeline from '@/components/ProcessTimeline'
import ProductCards from '@/components/ProductCards'
import ProjectCards from '@/components/ProjectCards'
import RecdDiagram from '@/components/RecdDiagram'
import Reveal from '@/components/Reveal'
import SectionHead from '@/components/SectionHead'
import SplitBusiness from '@/components/SplitBusiness'
import StatBand from '@/components/StatBand'
import Testimonials from '@/components/Testimonials'
import { getInsights, getProjects } from '@/lib/content'
import { closing, workingPrinciple } from '@/content/site'
import { productsIntro } from '@/content/products'
import { servicesIntro, stages } from '@/content/services'

export default function HomePage() {
  const insights = getInsights()
  const projects = getProjects()

  return (
    <>
      <Hero />
      <CertStrip />
      <StatBand />

      {/* Why ZAN-F */}
      <section className="section">
        <div className="shell">
          <SectionHead
            eyebrow="The ZAN-F difference"
            heading="A dealership is the start of the relationship, not the whole of it"
            lede="Anyone can forward an order to a manufacturer. What decides whether your generator passes an inspection two years from now is who sized it, who installed it, and who wrote down what they measured."
          />
          <div className="mt-12">
            <DifferenceGrid />
          </div>
        </div>
      </section>

      {/* Two businesses */}
      <section className="section-tight">
        <div className="shell">
          <SectionHead
            eyebrow="What ZAN-F does"
            heading="Two businesses, one accountability"
            lede="Certified hardware from Platino, and the engineering that turns it into compliance. You can buy either. Most sites are better off buying both from the same people."
          />
          <div className="mt-12">
            <SplitBusiness />
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section-tight">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead
              eyebrow="Products"
              heading={productsIntro.heading}
              className="max-w-2xl"
            />
            <Button href="/products/" variant="outline">
              All products
              <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
            </Button>
          </div>
          <div className="mt-12">
            <ProductCards />
          </div>
        </div>
      </section>

      {/* How a RECD works */}
      <section className="section border-y border-steel-200 bg-white">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            <div>
              <SectionHead
                eyebrow={workingPrinciple.eyebrow}
                heading={workingPrinciple.heading}
                lede={workingPrinciple.body}
              />
              <Button href="/products/recd/" variant="outline" className="mt-8">
                RECD technical detail
                <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
              </Button>
            </div>

            <div>
              <RecdDiagram />
              <ol className="mt-8 grid gap-6 sm:grid-cols-2">
                {workingPrinciple.stages.map((stage) => (
                  <li key={stage.code}>
                    <p className="figure text-sm text-[var(--emission-700)]">
                      {stage.code}
                    </p>
                    <h3 className="display mt-2 text-base">{stage.title}</h3>
                    <p className="mt-2 text-sm">{stage.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ITC process — carbon */}
      <section className="on-carbon relative overflow-hidden bg-carbon">
        <div className="grid-lines absolute inset-0" aria-hidden="true" />
        <div className="shell section relative">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead
              eyebrow={servicesIntro.eyebrow}
              heading="From site survey to compliance handover"
              lede="Four stages, each with something measured and something handed over. This is the half of the job that decides whether the device you bought does what its certificate says."
              className="max-w-2xl"
            />
            <Button href="/services/" variant="ghost">
              ITC services
              <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
            </Button>
          </div>

          <div className="mt-14">
            <ProcessTimeline stages={stages} />
          </div>
        </div>
      </section>

      {/* Who we serve */}
      <section className="section">
        <div className="shell">
          <SectionHead
            eyebrow="Who we serve"
            heading="Sites where the generator is not optional"
            lede="Standby plant that has to start, run clean and survive an audit — across sectors where an outage is measured in more than inconvenience."
          />
          <div className="mt-12">
            <IndustryGrid />
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="section-tight border-y border-steel-200 bg-white">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead
              eyebrow="Projects"
              heading="Installations"
              lede="Real projects are published here as ZAN-F releases the details. Until then the slots stay visibly empty — no invented client, no invented number."
              className="max-w-2xl"
            />
            <Button href="/projects/" variant="outline">
              All projects
              <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
            </Button>
          </div>
          <div className="mt-12">
            <ProjectCards projects={projects} limit={3} />
          </div>
        </div>
      </section>

      {/* Compliance — the one amber moment on the page */}
      <section className="section-tight">
        <div className="shell">
          <Reveal>
            <div className="grid gap-10 rounded-[8px] border border-steel-200 bg-[var(--signal-tint)] p-8 md:p-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div>
                <p className="mono flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--signal-ink)]">
                  <TriangleAlert size={14} strokeWidth={2} aria-hidden="true" />
                  Compliance
                </p>
                <h2 className="display display-lg mt-5 text-[1.7rem] sm:text-[2.1rem]">
                  Read the notification, not somebody’s summary of it
                </h2>
                <p className="mt-5 max-w-xl text-[0.9375rem]">
                  What applies to your generator depends on its rating, its
                  location and when it was installed. We link the six official
                  CPCB and state board notifications in full and explain the
                  mechanism around them — without inventing a deadline or a
                  penalty figure.
                </p>
              </div>
              <div className="lg:justify-self-end">
                <Link
                  href="/compliance/"
                  className="group inline-flex items-center gap-2 rounded-[4px] bg-carbon px-6 py-3.5 text-sm font-medium leading-none text-air-ink transition-colors duration-200 hover:bg-[var(--carbon-800)]"
                >
                  Understand the requirements
                  <ArrowRight
                    size={15}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <ClientWall />

      <Testimonials />

      {/* Insights */}
      {insights.length > 0 && (
        <section className="section-tight">
          <div className="shell">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHead
                eyebrow="Insights"
                heading="Technical notes"
                lede="Written for the person who has to make the decision and defend it afterwards."
                className="max-w-2xl"
              />
              <Button href="/insights/" variant="outline">
                All insights
                <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
              </Button>
            </div>
            <div className="mt-12">
              <InsightCards insights={insights} limit={3} />
            </div>
          </div>
        </section>
      )}

      <CTABand
        heading={closing.heading}
        body={closing.body}
        source="Homepage — closing CTA"
      />
    </>
  )
}
