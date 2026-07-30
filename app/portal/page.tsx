import { Lock } from 'lucide-react'
import JsonLd from '@/components/JsonLd'
import PageHero from '@/components/PageHero'
import SectionHead from '@/components/SectionHead'
import { contact } from '@/content/site'
import { breadcrumbSchema, pageMeta } from '@/lib/seo'

export const metadata = {
  ...pageMeta({
    title: 'Client Portal — RECD Tracker',
    description:
      'Track installation status, compliance documents, RECD health and service history from one dashboard. In development.',
    path: '/portal/',
  }),
  robots: { index: false, follow: true },
}

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Client Portal', path: '/portal/' },
]

const capabilities = [
  {
    title: 'Installation status',
    body: 'Where each set is in the sequence — surveyed, installed, tested, commissioned.',
  },
  {
    title: 'Compliance documents',
    body: 'Certificates, test readings and handover packs in one place, not in an inbox.',
  },
  {
    title: 'RECD health',
    body: 'Differential pressure trended against the commissioning baseline, per device.',
  },
  {
    title: 'Maintenance schedule',
    body: 'What is due, on which set, and when it was last attended.',
  },
  {
    title: 'Service history',
    body: 'Every visit, every reading, dated — the record an auditor asks for.',
  },
]

export default function PortalPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <PageHero
        eyebrow="Client Portal"
        heading="RECD Tracker — coming soon"
        lede="One dashboard for installation status, compliance documents, RECD health, maintenance and service history. It is in development; nothing here is live yet."
        breadcrumbs={crumbs}
      >
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled
            className="inline-flex cursor-not-allowed items-center gap-2 rounded-[4px] border border-hairline-dark-strong px-6 py-3.5 text-sm font-medium leading-none text-air-lo"
          >
            <Lock size={15} strokeWidth={1.75} aria-hidden="true" />
            Sign in — coming soon
          </button>
          <a
            href={`mailto:${contact.emails[0]}?subject=${encodeURIComponent(
              'Notify me when the ZAN-F Client Portal launches'
            )}`}
            className="inline-flex items-center gap-2 rounded-[4px] bg-[var(--emission-600)] px-6 py-3.5 text-sm font-medium leading-none text-white transition-colors hover:bg-[var(--emission-700)]"
          >
            Email us to be notified
          </a>
        </div>
      </PageHero>

      <section className="section">
        <div className="shell">
          <SectionHead
            eyebrow="Planned"
            heading="What it will do"
            lede="Built on what commissioning already produces. The readings, certificates and photographs exist from day one — the portal is where they stop living in a folder."
          />
          <ul className="mt-12 grid gap-px overflow-hidden rounded-[8px] border border-steel-200 bg-[var(--steel-200)] sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((item) => (
              <li key={item.title} className="bg-white p-7">
                <h3 className="display text-base">{item.title}</h3>
                <p className="mt-3 text-sm">{item.body}</p>
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-2xl text-sm text-ink-400">
            No sign-up form is offered here because there is nothing yet to sign
            up to. Email us and we will tell you when there is.
          </p>
        </div>
      </section>
    </>
  )
}
