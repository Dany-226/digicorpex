import type { Metadata } from 'next'
import { getAllArticles } from '@/lib/mdx'
import Hero from '@/components/home/Hero'
import ServicesGrid from '@/components/home/ServicesGrid'
import ContrastSection from '@/components/home/ContrastSection'
import BlogPreview from '@/components/home/BlogPreview'
import CTASection from '@/components/home/CTASection'

export const metadata: Metadata = {
  title: 'Digicorpex - Agents IA & Automatisation pour PME | Bordeaux',
  description:
    'Digicorpex conçoit des agents IA sur mesure pour les PME et TPE : automatisation des appels et des devis, wiki IA / mémoire d\'entreprise. Bordeaux.',
  alternates: {
    canonical: 'https://www.digicorpex.com',
  },
  openGraph: {
    title: 'Digicorpex - Agents IA & Automatisation pour PME | Bordeaux',
    description:
      'Digicorpex conçoit des agents IA sur mesure pour les PME et TPE : automatisation des appels et des devis, wiki IA / mémoire d\'entreprise. Bordeaux.',
    url: 'https://www.digicorpex.com',
  },
}

export default function Home() {
  const articles = getAllArticles()

  return (
    <>
      <Hero />
      <ServicesGrid />
      <ContrastSection />
      <BlogPreview articles={articles} />
      <CTASection />
    </>
  )
}
