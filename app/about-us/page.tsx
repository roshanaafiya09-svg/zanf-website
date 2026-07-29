import type { Metadata } from 'next'
import Image from 'next/image'
import CTABand from '@/components/CTABand'
import PageHeader from '@/components/PageHeader'
import Reveal from '@/components/Reveal'
import SectionRule from '@/components/SectionRule'
import { about, media, site } from '@/content/site'

export const metadata: Metadata = {
  title: 'About Us',
  description: about.intro,
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow={about.eyebrow}
        title={about.heading}
        lead={about.intro}
      />

      <SectionRule />
      <section>
        <div className="shell section grid gap-14 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={media.installedUnit.src}
                alt={media.installedUnit.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:pt-10">
            <p className="display text-7xl md:text-[7rem]">
              <span className="figure">25</span>
              <span className="figure text-3xl text-accent">+</span>
            </p>
            <p className="eyebrow mt-4">Years in DG set services</p>

            <p className="mt-12 border-t border-hairline pt-10 text-base text-mid">
              {about.expertise.body}
            </p>

            {about.personnel.map((para) => (
              <p key={para} className="mt-6 text-base text-mid">
                {para}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      <SectionRule />
      <section>
        <div className="shell section">
          <Reveal>
            <p className="eyebrow">Expertise in Emission Control</p>
            <h2 className="display mt-6 max-w-3xl text-3xl md:text-[2.75rem]">
              {about.lead.heading}
            </h2>
            <p className="mt-7 max-w-2xl text-base text-mid">{about.lead.body}</p>

            <dl className="mt-16 grid gap-x-12 gap-y-10 border-t border-hairline pt-10 sm:grid-cols-3">
              <div>
                <dt className="eyebrow">Dealership</dt>
                <dd className="display mt-3 text-lg">{site.dealership}</dd>
              </div>
              {site.productLines.map((line) => (
                <div key={line}>
                  <dt className="eyebrow">Product line</dt>
                  <dd className="display mt-3 text-lg">{line}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  )
}
