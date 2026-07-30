import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import Button from './Button'
import Eyebrow from './Eyebrow'
import GradientRule from './GradientRule'
import { QuoteButton } from './Quote'
import { certifications, hero, media, site } from '@/content/site'

/**
 * The hero.
 *
 * A photograph of an installed unit rather than the hero video: the clip that
 * exists is 752 × 400 and was being upscaled roughly 1.9×, which no amount of
 * scrim hides on a large screen. The still is sharp, and the annotations do
 * what the video was there to do — say "this is real hardware on real plant".
 *
 * The headline arrives one line at a time from behind its own baseline, the
 * rule draws itself left to right, and that is the entire load sequence.
 */
export default function Hero() {
  return (
    <section className="on-carbon relative overflow-hidden bg-carbon">
      <div className="grid-lines absolute inset-0" aria-hidden="true" />

      <div className="shell relative grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24">
        <div>
          <Eyebrow className="rise" >{hero.eyebrow}</Eyebrow>

          <h1 className="display mt-6 text-[2.35rem] sm:text-[3.1rem] lg:text-[3.9rem]">
            {hero.headline.map((line, i) => (
              <span key={line} className="line-mask">
                <span style={{ animationDelay: `${0.08 + i * 0.09}s` }}>
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <GradientRule width="w-full max-w-md" className="mt-8" draw />

          <p className="lede rise mt-8 max-w-xl" style={{ animationDelay: '0.4s' }}>
            {hero.sub}
          </p>

          <div
            className="rise mt-9 flex flex-wrap gap-3"
            style={{ animationDelay: '0.48s' }}
          >
            <QuoteButton source="Hero — Get a site assessment">
              {hero.primary.label}
              <ArrowRight
                size={15}
                strokeWidth={2}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </QuoteButton>
            <Button href={hero.secondary.href} variant="ghost">
              {hero.secondary.label}
            </Button>
          </div>

          <ul
            className="rise mt-10 flex flex-wrap items-center gap-x-3 gap-y-2"
            style={{ animationDelay: '0.56s' }}
          >
            {certifications.map((cert) => (
              <li
                key={cert.short}
                className="mono rounded-[4px] border border-hairline-dark bg-carbon-800 px-3 py-2 text-[0.6875rem] uppercase tracking-[0.12em] text-air-mid"
              >
                <span className="text-[var(--emission-300)]">{cert.short}</span>
                <span className="mx-2 opacity-30">·</span>
                {cert.note}
              </li>
            ))}
          </ul>
        </div>

        {/* Hardware, annotated. */}
        <div className="rise relative" style={{ animationDelay: '0.3s' }}>
          <div className="duotone relative overflow-hidden rounded-[8px] border border-hairline-dark">
            <Image
              src={media.installedUnit.src}
              alt={media.installedUnit.alt}
              width={1200}
              height={900}
              priority
              sizes="(min-width: 1024px) 44vw, 100vw"
              className="h-full w-full object-cover"
            />
          </div>

          <dl className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-px overflow-hidden rounded-[6px] border border-hairline-dark bg-[var(--hairline-dark)] backdrop-blur-sm">
            {[
              { k: 'Range', v: site.recdRange },
              { k: 'Back pressure', v: '0.0 kPa' },
              { k: 'Cycle', v: 'ISO 8178 D2' },
            ].map((item) => (
              <div key={item.k} className="bg-[rgb(14_21_18/0.86)] px-3 py-3">
                <dt className="mono text-[0.625rem] uppercase tracking-[0.12em] text-air-lo">
                  {item.k}
                </dt>
                <dd className="figure mt-1 text-[0.8125rem]">{item.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
