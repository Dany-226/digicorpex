import type { Metadata } from 'next'
import { Manrope, Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Digicorpex',
    default: 'Digicorpex — Agence Web & Digital',
  },
  description:
    'Digicorpex est une agence web & digital spécialisée en développement web, design UX/UI et stratégie SEO. Bordeaux.',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Digicorpex',
    title: 'Digicorpex — Agence Web & Digital',
    description:
      'Digicorpex est une agence web & digital spécialisée en développement web, design UX/UI et stratégie SEO. Bordeaux.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digicorpex — Agence Web & Digital',
    description:
      'Digicorpex est une agence web & digital spécialisée en développement web, design UX/UI et stratégie SEO.',
  },
  metadataBase: new URL('https://digicorpex.com'),
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Digicorpex',
  url: 'https://digicorpex.com',
  email: 'contact@digicorpex.com',
  telephone: '+33674058657',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bordeaux',
    addressRegion: 'Nouvelle-Aquitaine',
    postalCode: '33000',
    addressCountry: 'FR',
  },
  sameAs: [],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${manrope.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="bg-surface text-on-surface font-body min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
