import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const manrope = localFont({ src: './fonts/manrope.woff2', variable: '--font-manrope', weight: '200 800', display: 'swap' })
const inter = localFont({ src: './fonts/inter.woff2', variable: '--font-inter', weight: '100 900', display: 'swap' })
const dmSans = localFont({ src: './fonts/dm-sans.woff2', variable: '--font-dm-sans', weight: '100 1000', display: 'swap' })

export const metadata: Metadata = {
  title: {
    template: '%s | Digicorpex',
    default: 'Digicorpex - Agents IA & automatisation',
  },
  description:
    'Digicorpex relie vos outils et automatise vos opérations avec des agents IA sur mesure pour les PME et TPE. Bordeaux.',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    images: [{ url: '/refonte/opengraph.jpg', width: 1200, height: 630, alt: 'Digicorpex - Vos opérations, automatisées.' }],
    siteName: 'Digicorpex',
    title: 'Digicorpex - Agents IA & automatisation',
    description:
      'Digicorpex relie vos outils et automatise vos opérations avec des agents IA sur mesure pour les PME et TPE. Bordeaux.',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/refonte/opengraph.jpg'],
    title: 'Digicorpex - Agents IA & automatisation',
    description:
      'Digicorpex relie vos outils et automatise vos opérations avec des agents IA sur mesure pour les PME et TPE.',
  },
  metadataBase: new URL('https://www.digicorpex.com'),
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Digicorpex',
  logo: 'https://www.digicorpex.com/brand/digicorpex-horizontal.svg',
  url: 'https://www.digicorpex.com',
  email: 'danielrollin@digicorpex.com',
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
    <html lang="fr" className={`${manrope.variable} ${inter.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema).replace(/</g, '\\u003c') }}
        />
      </head>
      <body className="bg-surface text-on-surface font-body min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  )
}
