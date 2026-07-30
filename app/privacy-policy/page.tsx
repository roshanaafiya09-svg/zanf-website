import JsonLd from '@/components/JsonLd'
import PageHero from '@/components/PageHero'
import Prose from '@/components/Prose'
import { contact, site } from '@/content/site'
import { breadcrumbSchema, pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Privacy policy',
  description:
    'How ZAN-F Power Systems handles the details you send through this website.',
  path: '/privacy-policy/',
})

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Privacy policy', path: '/privacy-policy/' },
]

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <PageHero
        eyebrow="Privacy"
        heading="Privacy policy"
        lede="Short, because this website collects very little."
        breadcrumbs={crumbs}
      />

      <section className="section">
        <div className="shell">
          <Prose>
            <h2 className="display text-[1.6rem]">What we collect</h2>
            <p className="mt-5 text-[1.0625rem] leading-[1.7]">
              Only what you type into the enquiry form: your name, company,
              phone number, email address, DG rating, requirement type, state
              and message. We also record which page the enquiry was sent from,
              so we know what you were reading when you asked.
            </p>

            <h2 className="display mt-12 text-[1.6rem]">Why we collect it</h2>
            <p className="mt-5 text-[1.0625rem] leading-[1.7]">
              To answer your enquiry. That is the only purpose. We do not sell
              or share these details with anyone, and we do not use them for
              marketing you have not asked for.
            </p>

            <h2 className="display mt-12 text-[1.6rem]">Where it goes</h2>
            <p className="mt-5 text-[1.0625rem] leading-[1.7]">
              Enquiries are delivered by email to{' '}
              {contact.emails.join(' and ')} through a transactional email
              service. If you choose the WhatsApp option instead, the message is
              handed to WhatsApp on your device and is subject to their terms,
              not ours.
            </p>

            <h2 className="display mt-12 text-[1.6rem]">Cookies</h2>
            <p className="mt-5 text-[1.0625rem] leading-[1.7]">
              This website sets no tracking or advertising cookies. The Google
              Maps embed on the contact page is served by Google and is subject
              to Google’s own privacy policy.
            </p>

            <h2 className="display mt-12 text-[1.6rem]">Your details</h2>
            <p className="mt-5 text-[1.0625rem] leading-[1.7]">
              Write to {contact.emails[0]} and we will tell you what we hold
              about you, correct it, or delete it.
            </p>

            <p className="mt-12 text-sm text-ink-400">
              TODO: {site.legalName} to review this policy against its actual
              internal practice — retention period, who has access, and any
              analytics added later — before publication.
            </p>
          </Prose>
        </div>
      </section>
    </>
  )
}
