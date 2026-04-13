import type { Metadata } from 'next'
import { getAllArticles } from '@/lib/mdx'
import Hero from '@/components/home/Hero'
import ServicesGrid from '@/components/home/ServicesGrid'
import BlogPreview from '@/components/home/BlogPreview'
import CTASection from '@/components/home/CTASection'

export const metadata: Metadata = {
  title: 'Digicorpex — Agence Web & Digital à Bordeaux',
  description:
    'Digicorpex conçoit des sites web performants et des stratégies digitales qui transforment votre visibilité en croissance. Bordeaux.',
  openGraph: {
    title: 'Digicorpex — Agence Web & Digital à Bordeaux',
    description:
      'Digicorpex conçoit des sites web performants et des stratégies digitales qui transforment votre visibilité en croissance.',
  },
}

export default function Home() {
  const articles = getAllArticles()

  return (
    <>
      <Hero />
      <ServicesGrid />
      <BlogPreview articles={articles} />
      <CTASection />
    </>
  )
}
