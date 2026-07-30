import Image from 'next/image'
import Button from '@/components/Button'
import CertStrip from '@/components/CertStrip'
import ClientWall from '@/components/ClientWall'
import CTABand from '@/components/CTABand'
import JsonLd from '@/components/JsonLd'
import PageHero from '@/components/PageHero'
import SectionHead from '@/components/SectionHead'
import StatBand from '@/components/StatBand'
import { aboutPage, principles, relationship } from '@/content/about'
import { dealerNotice, media } from '@/content/site'
import { breadcrumbSchema, pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'About — authorized Platino RECD dealer',
  description:
    'ZAN-F Power Systems: over 25 years in diesel generator services, authorized Platino RECD dealer, and the engineering partner that executes the install.',
  path: '/about/',
})

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about/' },
]

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <PageHero
        eyebrow={aboutPage.eyebrow}
        heading={aboutPage.heading}
        lede={aboutPage.lede}
        breadcrumbs={crumbs}
        aside={
          <div className="duotone relative overflow-hidden rounded-[8px] border border-hairline-dark">
            <Image
              src={media.installedUnit.src}
              alt={media.installedUnit.alt}
              width={1200}
              height={900}
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="h-full w-full object-cover"
            />
          </div>
        }
      />

      <CertStrip />
      <StatBand />

      <section className="section">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <SectionHead eyebrow="Who we are" heading="Twenty-five years on DG plant" />
            <div className="space-y-5">
              {aboutPage.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-[1.0625rem] leading-[1.7]">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The relationship, spelled out */}
      <section className="section-tight border-y border-steel-200 bg-white">
        <div className="shell">
          <SectionHead
            eyebrow={relationship.eyebrow}
            heading={relationship.heading}
            lede={relationship.lede}
          />
          <ol className="mt-12 grid gap-px overflow-hidden rounded-[8px] border border-steel-200 bg-[var(--steel-200)] lg:grid-cols-3">
            {relationship.chain.map((link) => (
              <li key={link.code} className="bg-white p-7">
                <p className="figure text-sm text-[var(--emission-700)]">
                  {link.code}
                </p>
                <h3 className="display mt-3 text-lg">{link.party}</h3>
                <p className="mono mt-2 text-[0.6875rem] uppercase tracking-[0.1em] text-ink-400">
                  {link.role}
                </p>
                <p className="mt-4 text-sm">{link.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 max-w-4xl text-xs leading-relaxed text-ink-400">
            {dealerNotice}
          </p>
          <p className="mt-3 text-xs text-ink-400">
            Our Platino dealer authorization is available on request — ask and we
            will send it, rather than expecting you to take the claim on trust.
          </p>
        </div>
      </section>

      {/* How we work */}
      <section className="section-tight">
        <div className="shell">
          <SectionHead
            eyebrow="How we work"
            heading="Four commitments that shape every job"
          />
          <ul className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {principles.map((principle) => (
              <li key={principle.title}>
                <h3 className="display text-lg">{principle.title}</h3>
                <p className="mt-3 text-sm">{principle.body}</p>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-wrap gap-3">
            <Button href="/services/" variant="outline">
              How we execute
            </Button>
            <Button href="/products/" variant="outline">
              What we supply
            </Button>
          </div>
        </div>
      </section>

      <ClientWall />

      <CTABand
        heading="Work with an engineering partner, not a box-shifter"
        body="Tell us the rating and the site. You will get a straight answer about what the job involves, including whether you need us at all."
        source="About page — CTA"
      />
    </>
  )
}
