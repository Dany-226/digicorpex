import type { Metadata } from 'next'
import HeroAuto from '@/components/automatisation/HeroAuto'
import AccrocheAuto from '@/components/automatisation/AccrocheAuto'
import CeQuOnChange from '@/components/automatisation/CeQuOnChange'
import TeasingAuto from '@/components/automatisation/TeasingAuto'
import CommentCaPasse from '@/components/automatisation/CommentCaPasse'
import TarifAuto from '@/components/automatisation/TarifAuto'
import CTAFinalAuto from '@/components/automatisation/CTAFinalAuto'

export const metadata: Metadata = {
  title: 'Automatisation IA - Systèmes intelligents pour PME | Digicorpex',
  description:
    'Digicorpex déploie des systèmes d\'automatisation IA pour les PME : traitement des appels, génération de documents, base de connaissance. Diagnostic gratuit 30 min.',
  alternates: {
    canonical: 'https://digicorpex.com/services/automatisation',
  },
  openGraph: {
    title: 'Automatisation IA pour PME - Digicorpex',
    description:
      'Des systèmes intelligents qui travaillent quand vous dormez. Diagnostic gratuit 30 min.',
    url: 'https://digicorpex.com/services/automatisation',
  },
}

export default function AutomatisationPage() {
  return (
    <>
      <HeroAuto />
      <AccrocheAuto />
      <CeQuOnChange />
      <TeasingAuto />
      <CommentCaPasse />
      <TarifAuto />
      <CTAFinalAuto />
    </>
  )
}
