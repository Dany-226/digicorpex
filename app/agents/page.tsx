import type { Metadata } from 'next'
import AgentsHero from '@/components/agents/AgentsHero'
import AgentsGrid from '@/components/agents/AgentsGrid'
import CommentCaPasse from '@/components/automatisation/CommentCaPasse'
import TarifAuto from '@/components/automatisation/TarifAuto'
import AgentsCTA from '@/components/agents/AgentsCTA'

export const metadata: Metadata = {
  title: 'Agents IA pour PME - Digicorpex | Bordeaux',
  description:
    "Digicorpex déploie des agents IA dans les PME et TPE : réception d'appels, génération de devis, rapprochement comptable, wiki interne. Bordeaux.",
  alternates: {
    canonical: 'https://digicorpex.com/agents',
  },
  openGraph: {
    title: 'Agents IA pour PME - Digicorpex',
    description:
      "Digicorpex déploie des agents IA dans les PME et TPE : réception d'appels, génération de devis, rapprochement comptable, wiki interne.",
    url: 'https://digicorpex.com/agents',
  },
}

export default function AgentsPage() {
  return (
    <>
      <AgentsHero />
      <AgentsGrid />
      <CommentCaPasse />
      <TarifAuto />
      <AgentsCTA />
    </>
  )
}
