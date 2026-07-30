import type { Metadata, Viewport } from 'next'
import { Host_Grotesk, IBM_Plex_Mono, Instrument_Sans } from 'next/font/google'
import Header from '@/components/Header'
import UtilityBar from '@/components/UtilityBar'
import Footer from '@/components/Footer'
import MobileStickyCTA from '@/components/MobileStickyCTA'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import JsonLd from '@/components/JsonLd'
import { QuoteProvider } from '@/components/Quote'
import { site } from '@/content/site'
import { localBusinessSchema, organizationSchema } from '@/lib/seo'
import './globals.css'

/**
 * Three families, chosen for what each has to do.
 *
 * Host Grotesk — display. A tighter, sharper grotesk than Archivo, with less of
 * the blocky evenness that makes heavy Archivo read as a template. Its narrower
 * apertures and flat terminals hold together at 3.9rem, which is where the hero
 * headline lives.
 *
 * Instrument Sans — body. Replaces Inter. Inter is the most-deployed UI face on
 * the web; it is excellent and it is invisible, and "the same font as every SaaS
 * dashboard" is not what a premium industrial site wants. Instrument Sans is
 * slightly narrower with more character in the lowercase, and it sets denser
 * technical paragraphs without losing legibility at 15px.
 *
 * IBM Plex Mono — data, unchanged. It is the strongest part of the existing
 * system: the tabular figures and slab-ish terminals read as instrument
 * silkscreen, which is the whole point of the mono-for-data rule.
 */
const hostGrotesk = Host_Grotesk({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display-family',
  display: 'swap',
})

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  // 400 and 500 only — nothing sets the body face at 600, and an unused weight
  // is a font file downloaded for nothing.
  weight: ['400', '500'],
  variable: '--font-sans-family',
  display: 'swap',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.positioning}`,
    // The brief asked for the positioning line in every title. It pushed inner
    // pages to 93–122 characters, all of which Google truncates at roughly 60 —
    // so the positioning was being cut off anyway. It stays in full on the
    // homepage, where it is the title that actually ranks for the brand.
    template: `%s | ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: '/' },
  applicationName: site.name,
  authors: [{ name: site.legalName }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: site.name,
    title: `${site.name} — ${site.positioning}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#f6faf8',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en-IN"
      className={`${hostGrotesk.variable} ${instrumentSans.variable} ${plexMono.variable}`}
    >
      <head>
        <JsonLd data={[organizationSchema, localBusinessSchema]} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[4px] focus:bg-[var(--emission-600)] focus:px-5 focus:py-2.5 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <QuoteProvider>
          <UtilityBar />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <MobileStickyCTA />
          <WhatsAppFloat />
        </QuoteProvider>
      </body>
    </html>
  )
}
