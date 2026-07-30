import type { Metadata } from 'next'
import { contact, site } from '@/content/site'

/**
 * Metadata and JSON-LD builders.
 *
 * Title pattern is fixed by the brief:
 * `{Page} | ZAN-F — Authorized Platino RECD Dealer & SITC Partner`
 * The template lives in the root layout; pages supply the leading segment.
 */
/**
 * The shared link-preview card, stated explicitly.
 *
 * Next only inherits the root `opengraph-image` route into pages that do not
 * declare `openGraph` themselves. Every page here does, so without this the
 * inner pages shipped with no preview image at all — and a bare card is exactly
 * what a WhatsApp share of a product page would have shown.
 */
const ogImage = {
  url: '/opengraph-image/',
  width: 1200,
  height: 630,
  alt: `${site.name} — ${site.positioning}`,
}

export function pageMeta({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      url: path,
      // The brand suffix is dropped here: a social card already shows the site
      // name, and 100+ characters of title is what gets truncated everywhere.
      title,
      description,
      siteName: site.name,
      locale: 'en_IN',
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage.url],
    },
  }
}

const address = {
  '@type': 'PostalAddress',
  streetAddress: 'Pallavaram',
  addressLocality: contact.addressLocality,
  addressRegion: contact.addressRegion,
  postalCode: contact.postalCode,
  addressCountry: 'IN',
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${site.url}/#organization`,
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  description: site.description,
  slogan: site.tagline,
  logo: `${site.url}/media/zanf-logo-plate.png`,
  image: `${site.url}/media/zanf-logo-plate.png`,
  address,
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: contact.phoneDisplay,
      email: contact.emails[0],
      contactType: 'sales',
      areaServed: 'IN',
      availableLanguage: ['en', 'ta'],
    },
  ],
}

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${site.url}/#localbusiness`,
  name: site.legalName,
  url: site.url,
  description: site.description,
  telephone: contact.phoneDisplay,
  email: contact.emails[0],
  image: `${site.url}/media/zanf-logo-plate.png`,
  address,
  areaServed: { '@type': 'Country', name: 'India' },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '19:00',
    },
  ],
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  }
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }
}

/**
 * Product schema.
 *
 * No price, rating or review count: ZAN-F publishes none, and inventing them to
 * win a rich result is exactly the kind of claim this site does not make. The
 * `offers` block was removed for the same reason — an Offer without a price is a
 * structured-data *error* in Search Console, whereas a Product with no offers is
 * only a warning. Neither is eligible for a rich result, so the honest one wins.
 */
export function productSchema({
  name,
  description,
  path,
  image,
}: {
  name: string
  description: string
  path: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    url: `${site.url}${path}`,
    ...(image ? { image: `${site.url}${image}` } : {}),
    brand: { '@type': 'Brand', name: 'Platino' },
    manufacturer: { '@type': 'Organization', name: site.manufacturer },
    category: 'Retrofit Emission Control Device',
  }
}

export function serviceSchema({
  name,
  description,
  path,
}: {
  name: string
  description: string
  path: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `${site.url}${path}`,
    serviceType: name,
    provider: { '@id': `${site.url}/#organization` },
    areaServed: { '@type': 'Country', name: 'India' },
  }
}
