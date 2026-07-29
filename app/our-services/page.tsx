import type { Metadata } from 'next'
import Image from 'next/image'
import CertStrip from '@/components/CertStrip'
import CTABand from '@/components/CTABand'
import PageHeader from '@/components/PageHeader'
import Reveal from '@/components/Reveal'
import SectionRule from '@/components/SectionRule'
import VideoBlock from '@/components/VideoBlock'
import { iconMap } from '@/lib/icons'
import { features, media, services, site } from '@/content/site'

export const metadata: Metadata = {
  title: 'Our Services',
  description: `Type approved RECD and RATS, DG sets, parts and service, AMC and overhauling, electrical panel boards, DG set rental with RECD, and silencers — for generators from ${site.range}.`,
}

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Services"
        title="Type approved emission control, and the DG expertise behind it."
        lead={`Six service lines covering diesel generators from ${site.range} — from the retrofit device itself through to the panels, silencers and maintenance that keep the installation running.`}
      />

      <SectionRule />
      <section>
        <div className="shell section">
          <Reveal>
            <VideoBlock
              src={media.explainer.src}
              poster={media.explainer.poster}
              label={media.explainer.label}
              alt={media.workingPrinciple.alt}
            />
          </Reveal>

          <ul className="mt-20 grid gap-x-14 gap-y-12 md:grid-cols-2">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon]
              return (
                <Reveal as="li" key={service.title} delay={(i % 2) * 0.05}>
                  <Icon size={19} strokeWidth={1.5} className="text-accent" />
                  <h2 className="display mt-5 text-xl">{service.title}</h2>
                  <p className="mt-3 text-sm text-mid">{service.body}</p>
                </Reveal>
              )
            })}
          </ul>
        </div>
      </section>

      <SectionRule />
      <section>
        <div className="shell section grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20">
          <Reveal>
            <p className="eyebrow">{features.eyebrow}</p>
            <h2 className="display mt-6 text-3xl md:text-[2.5rem]">
              Seven reasons it stays out of your way.
            </h2>
            <ul className="mt-10 border-t border-hairline">
              {features.items.map((item) => (
                <li
                  key={item.title}
                  className="flex items-baseline justify-between gap-6 border-b border-hairline py-4"
                >
                  <span className="text-base text-hi">{item.title}</span>
                  {item.note && (
                    <span className="eyebrow shrink-0 text-right">
                      {item.note}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={media.noxReducer.src}
                alt={media.noxReducer.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <CertStrip />
      <CTABand />
    </>
  )
}
