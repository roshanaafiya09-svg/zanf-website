import type { Metadata, Viewport } from 'next'
import { Archivo, IBM_Plex_Mono, Inter } from 'next/font/google'
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

/** Display: engineered and confident. Body: legible. Data: instrument label. */
const archivo = Archivo({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-archivo',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
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
    template: `%s | ${site.name} — ${site.positioning}`,
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
      className={`${archivo.variable} ${inter.variable} ${plexMono.variable}`}
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
