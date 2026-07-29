import Image from 'next/image'
import Button from '@/components/Button'
import CertStrip from '@/components/CertStrip'
import ClientWall from '@/components/ClientWall'
import Counters from '@/components/Counters'
import CTABand from '@/components/CTABand'
import HeroVideo from '@/components/HeroVideo'
import Reveal from '@/components/Reveal'
import SectionRule from '@/components/SectionRule'
import TraceLine from '@/components/TraceLine'
import { iconMap } from '@/lib/icons'
import {
  about,
  features,
  media,
  services,
  site,
  specs,
  valueProps,
} from '@/content/site'

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------------- Hero
          The thesis: turbulent, high-particulate gas in; steady, clean gas out.
          Everything else on the page argues for that one line. */}
      <section className="relative isolate flex min-h-[100svh] flex-col">
        <HeroVideo />

        <div className="shell flex flex-1 flex-col justify-end pt-32">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-20">
            <div>
              <p
                className="eyebrow rise inline-flex items-center gap-2.5"
                style={{ animationDelay: '0.1s' }}
              >
                <span className="h-[5px] w-[5px] bg-accent" />
                {site.dealership}
              </p>

              <h1
                className="display rise mt-7 text-[15vw] leading-[0.94] sm:text-7xl lg:text-[6.5rem]"
                style={{ animationDelay: '0.2s' }}
              >
                Pure Power,
                <br />
                Pure Planet
              </h1>

              <p
                className="rise mt-8 max-w-md text-base text-mid"
                style={{ animationDelay: '0.32s' }}
              >
                Type-approved retrofit emission control for diesel generators —
                supplied, installed and serviced by engineers who have worked on
                DG plant for over 25 years.
              </p>

              <div
                className="rise mt-9 flex flex-wrap gap-3"
                style={{ animationDelay: '0.42s' }}
              >
                <Button href="/our-services/">Discover Now</Button>
                <Button href="/contact-us/" variant="ghost">
                  Get in Touch
                </Button>
              </div>
            </div>

            {/* Readings rail — the instrument panel beside the headline. */}
            <dl
              className="rise grid grid-cols-2 gap-x-10 gap-y-6 border-t border-hairline pt-7 lg:w-64 lg:grid-cols-1 lg:gap-y-5 lg:border-t-0 lg:pt-0"
              style={{ animationDelay: '0.52s' }}
            >
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="lg:flex lg:items-baseline lg:justify-between lg:gap-4 lg:border-b lg:border-hairline lg:pb-4"
                >
                  <dt className="eyebrow">{spec.label}</dt>
                  <dd className="reading mt-1.5 text-xl lg:mt-0 lg:text-base">
                    {spec.value}
                    <span className="text-xs text-lo">{spec.unit}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* The signature. */}
          <div className="mt-14 pb-10 md:mt-20 md:pb-14">
            <TraceLine delay={0.6} />
            <div className="flex items-start justify-between gap-6">
              <p className="eyebrow max-w-[9rem]">
                Inlet — turbulent, high PM
              </p>
              <p className="eyebrow max-w-[9rem] text-right text-hi">
                Outlet — steady, clean
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- Value props */}
      <SectionRule />
      <section>
        <div className="shell section">
          {/* Four boxes that pop in left to right, Sustainable Innovation
              through to Real-World Impact. */}
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {valueProps.map((prop, i) => {
              const Icon = iconMap[prop.icon]
              return (
                <Reveal
                  as="li"
                  key={prop.title}
                  variant="pop"
                  delay={i * 0.12}
                  className="group relative rounded-[2px] border border-hairline p-7 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-accent md:p-8"
                >
                  {/* Copper rule that lights along the top on hover. */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100"
                    style={{ boxShadow: 'var(--glow-accent)' }}
                  />
                  <span className="grid h-11 w-11 place-items-center rounded-[2px] border border-hairline text-accent transition-colors duration-300 group-hover:border-accent">
                    <Icon size={18} strokeWidth={1.5} />
                  </span>
                  <h2 className="display mt-6 text-lg">{prop.title}</h2>
                  <p className="mt-3 text-sm text-mid">{prop.body}</p>
                </Reveal>
              )
            })}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------------- About */}
      <SectionRule />
      <section>
        <div className="shell section grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-24">
          <Reveal>
            <p className="eyebrow">{about.eyebrow}</p>
            <h2 className="display mt-6 text-3xl md:text-[2.75rem]">
              {about.heading}
            </h2>
            <p className="mt-7 text-base text-mid">{about.intro}</p>

            <div className="mt-10 border-t border-hairline pt-8">
              <h3 className="display text-base">{about.expertise.heading}</h3>
              <p className="mt-2.5 text-sm text-mid">{about.expertise.body}</p>
            </div>

            <div className="mt-9">
              <Button href="/about-us/" variant="ghost">
                Discover Now
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative aspect-[5/4] overflow-hidden">
              <Image
                src={media.installedUnit.src}
                alt={media.installedUnit.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <Counters />

      {/* -------------------------------------------------- Working principle */}
      <SectionRule />
      <section>
        <div className="shell section grid gap-14 lg:grid-cols-[1fr_1.35fr] lg:items-center lg:gap-20">
          <Reveal>
            <p className="eyebrow">Working Principle</p>
            <h2 className="display mt-6 text-3xl md:text-[2.5rem]">
              Two catalysts. No moving parts.
            </h2>
            <p className="mt-7 text-base text-mid">
              Exhaust enters through a diffuser and passes into the Fuel
              Oxidation Catalyst, which converts carbon monoxide and
              hydrocarbons. The Catalytic Soot Trap then captures and removes
              particulate matter before cleaner gas leaves the outlet chamber.
            </p>

            <dl className="mt-10 border-t border-hairline">
              <div className="flex gap-6 border-b border-hairline py-4">
                <dt className="reading w-16 shrink-0 text-sm text-accent">
                  FOC
                </dt>
                <dd className="text-sm text-mid">
                  Converts harmful CO and HC gases.
                </dd>
              </div>
              <div className="flex gap-6 border-b border-hairline py-4">
                <dt className="reading w-16 shrink-0 text-sm text-accent">
                  CST
                </dt>
                <dd className="text-sm text-mid">
                  Traps and removes smoke particles (PM).
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.1}>
            <figure>
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={media.workingPrinciple.src}
                  alt={media.workingPrinciple.alt}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="eyebrow mt-4">
                Diffuser · FOC · CST · outlet chamber
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- Services */}
      <SectionRule />
      <section>
        <div className="shell section">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-end lg:gap-20">
            <Reveal>
              <p className="eyebrow">Our Services</p>
              <h2 className="display mt-6 text-3xl md:text-[2.75rem]">
                Everything a diesel generator needs to run clean.
              </h2>
              <p className="reading mt-7 text-sm text-lo">
                Covering {site.range}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={media.noxReducer.src}
                  alt={media.noxReducer.alt}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          <ul className="mt-16 grid gap-x-12 gap-y-11 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon]
              return (
                <Reveal as="li" key={service.title} delay={(i % 3) * 0.05}>
                  <Icon size={19} strokeWidth={1.5} className="text-accent" />
                  <h3 className="display mt-5 text-lg">{service.title}</h3>
                  <p className="mt-2.5 text-sm text-mid">{service.body}</p>
                </Reveal>
              )
            })}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------------- Features */}
      <SectionRule />
      <section>
        <div className="shell section grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:items-start lg:gap-20">
          <Reveal>
            <p className="eyebrow">{features.eyebrow}</p>
            <h2 className="display mt-6 text-3xl md:text-[2.5rem]">
              Engineered to add nothing but clean air.
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
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={media.crossSection.src}
                  alt={media.crossSection.alt}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="eyebrow mt-4">
                Inlet chamber · FOC · CST · outlet chamber, with pressure and
                temperature taps either side
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <ClientWall />
      <CertStrip />
      <CTABand />
    </>
  )
}
