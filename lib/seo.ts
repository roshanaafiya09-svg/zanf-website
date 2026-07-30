import type { Metadata } from 'next'
import { contact, site } from '@/content/site'

/**
 * Metadata and JSON-LD builders.
 *
 * Title pattern is fixed by the brief:
 * `{Page} | ZAN-F — Authorized Platino RECD Dealer & SITC Partner`
 * The template lives in the root layout; pages supply the leading segment.
 */
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
      title: `${title} | ${site.name} — ${site.positioning}`,
      description,
      siteName: site.name,
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${site.name}`,
      description,
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
 * Product schema. No price, rating or review count is emitted — ZAN-F has not
 * published any, and inventing them to win a rich result is exactly the kind of
 * claim this site does not make.
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
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: site.legalName },
      url: `${site.url}/contact/`,
    },
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
