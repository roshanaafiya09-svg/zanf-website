import Image from 'next/image'
import Aurora from './Aurora'
import Button from './Button'
import SectionRule from './SectionRule'
import { closing, media } from '@/content/site'

export default function CTABand({
  heading = closing.heading,
  body = closing.body,
  cta = closing.cta,
  href = '/contact-us/',
}: {
  heading?: string
  body?: string
  cta?: string
  href?: string
}) {
  return (
    <>
      <SectionRule />
      <section className="relative isolate overflow-hidden">
        {/* Heavily blurred plant-room photograph — atmosphere, not subject.
            Blurred in CSS so the browser reuses the already-cached image. */}
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Image
            src={media.installedUnit.src}
            alt=""
            fill
            sizes="100vw"
            className="scale-110 object-cover opacity-40 blur-2xl"
          />
          <div className="absolute inset-0 bg-[var(--scrim)]" />
        </div>

        <Aurora intensity="soft" />

        <div className="shell section relative">
          <h2 className="display max-w-4xl text-3xl md:text-[3.25rem]">
            {heading}
          </h2>
          <p className="mt-7 max-w-2xl text-base text-mid">{body}</p>
          <div className="mt-10">
            <Button href={href}>{cta}</Button>
          </div>
        </div>
      </section>
    </>
  )
}
