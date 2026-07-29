import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
import Aurora from './Aurora'
import { contact, media, nav, site, social } from '@/content/site'

const icons = { facebook: Facebook, x: Twitter, linkedin: Linkedin, instagram: Instagram }

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-hairline">
      {/* Blurred plant-room atmosphere behind the footer. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src={media.noxReducer.src}
          alt=""
          fill
          sizes="100vw"
          className="scale-110 object-cover opacity-30 blur-3xl"
        />
        <div className="absolute inset-0 bg-[var(--scrim)]" />
      </div>

      <Aurora intensity="soft" />

      <div className="shell relative pb-32 pt-20 md:pb-24 md:pt-28">
        {/* The wordmark, at the scale it deserves. */}
        <p className="display text-5xl tracking-[-0.05em] md:text-7xl">
          {site.name}
        </p>
        <p className="display mt-6 max-w-2xl text-3xl text-mid md:text-5xl">
          {site.tagline}
        </p>

        {/* Animated: a copper glint sweeps the rule, and the node breathes. */}
        <div className="relative mt-20 h-px overflow-hidden bg-hairline">
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-24 bg-accent"
            style={{
              boxShadow: 'var(--glow-accent)',
              animation: 'sweep 7s cubic-bezier(0.6,0,0.4,1) infinite',
            }}
          />
        </div>

        <div className="grid gap-12 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="eyebrow">Quick Links</p>
            <ul className="mt-5 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-mid transition-colors duration-200 hover:text-hi"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Company</p>
            <ul className="mt-5 space-y-2.5 text-sm text-mid">
              <li>{site.dealership}</li>
              {site.productLines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Get in Touch</p>
            <address className="mt-5 space-y-2.5 text-sm not-italic text-mid">
              <p>
                {contact.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              {contact.emails.map((email) => (
                <a
                  key={email}
                  href={`mailto:${email}`}
                  className="block transition-colors duration-200 hover:text-hi"
                >
                  {email}
                </a>
              ))}
              <a
                href={`tel:${contact.phoneHref}`}
                className="figure block text-sm transition-colors duration-200 hover:text-accent"
              >
                {contact.phoneDisplay}
              </a>
            </address>
          </div>

          <div>
            <p className="eyebrow">Hours</p>
            <ul className="mt-5 space-y-3 text-sm text-mid">
              {contact.hours.map((h) => (
                <li key={h.days}>
                  <span className="block">{h.days}</span>
                  <span className="figure block text-xs text-lo">{h.time}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex gap-2">
              {social.map((s) => {
                const Icon = icons[s.icon]
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="grid h-9 w-9 place-items-center rounded-[2px] border border-hairline text-mid transition-colors duration-200 hover:border-accent hover:text-hi"
                  >
                    <Icon size={15} strokeWidth={1.5} />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-hairline pt-6 text-xs text-lo sm:flex-row sm:items-center sm:justify-between">
          <p>
            Copyright © {new Date().getFullYear()} {site.copyrightHolder}, All
            Rights Reserved.
          </p>
          <p>{site.credit}</p>
        </div>
      </div>
    </footer>
  )
}
