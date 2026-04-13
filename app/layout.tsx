import type { Metadata } from 'next'
import { Manrope, Inter, Geist } from 'next/font/google'
import './globals.css'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
    'Digicorpex est une agence web & digital spécialisée en développement web, design UX/UI et stratégie SEO.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={cn(manrope.variable, inter.variable, "font-sans", geist.variable)}>
      <body className="bg-surface text-on-surface font-body min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  )
}
