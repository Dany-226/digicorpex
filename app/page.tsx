import type { Metadata } from 'next'
import HomeNavigation from '@/components/refonte/HomeNavigation'
import SculpturalHero from '@/components/refonte/SculpturalHero'
import UseCases from '@/components/refonte/UseCases'
import Integrations from '@/components/refonte/Integrations'
import Method from '@/components/refonte/Method'
import DiagnosticCTA from '@/components/refonte/DiagnosticCTA'
import HomeFooter from '@/components/refonte/HomeFooter'
import MotionController from '@/components/refonte/MotionController'
import '@/components/refonte/refonte.css'

export const metadata: Metadata = {
  title: { absolute: 'Digicorpex - Agents IA & Automatisation pour PME | Bordeaux' },
  description: 'Vos opérations, automatisées. Digicorpex connecte téléphone, CRM, planning et outils métier pour les PME. Sans ressaisie, sans changer vos outils.',
  alternates: { canonical: 'https://www.digicorpex.com' },
  openGraph: {
    title: 'Digicorpex - Vos opérations, automatisées.',
    description: 'Des agents IA pour des problèmes qui existent vraiment. Sans ressaisie. Sans rupture. Sans changer vos outils.',
    url: 'https://www.digicorpex.com',
    images: [{ url: '/refonte/opengraph.jpg', width: 1200, height: 630 }],
  },
}

export default function Home() {
  return <div className="refonte">
    <a href="#main-content" className="skip-link">Aller au contenu</a>
    <HomeNavigation />
    <MotionController />
    <main id="main-content" tabIndex={-1}>
      <SculpturalHero /><UseCases /><Integrations /><Method /><DiagnosticCTA />
    </main>
    <HomeFooter />
  </div>
}
