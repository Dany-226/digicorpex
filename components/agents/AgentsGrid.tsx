import { Phone, FileText, Calculator, Brain, TrendingUp, BarChart3 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AgentCard {
  icon: LucideIcon
  title: string
  text: string
  status: 'production' | 'bientot'
}

const AGENTS: AgentCard[] = [
  {
    icon: Phone,
    title: "Agent réception d'appels",
    text: 'Qualification, transcription, création fiche CRM et devis pré-rempli en moins de 3 minutes. Disponible 24h/24.',
    status: 'production',
  },
  {
    icon: FileText,
    title: 'Agent génération de devis',
    text: 'Brief de 5 minutes en entrée. Devis personnalisé, mis en forme et prêt à envoyer en sortie.',
    status: 'production',
  },
  {
    icon: Calculator,
    title: 'Agent rapprochement comptable',
    text: 'Devis, factures, règlements - réconciliés automatiquement. Alertes sur les écarts uniquement.',
    status: 'production',
  },
  {
    icon: Brain,
    title: "Mémoire d'entreprise",
    text: 'Toute la connaissance de votre structure, alimentée en continu, interrogeable en langage naturel.',
    status: 'production',
  },
  {
    icon: TrendingUp,
    title: 'Suivi commercial automatisé',
    text: "Relances contextualisées, scoring des prospects, alertes sur les signaux d'achat faibles.",
    status: 'bientot',
  },
  {
    icon: BarChart3,
    title: 'Pilotage financier',
    text: 'Situation de trésorerie, projection à 90 jours, alertes dérives - chaque lundi matin sans intervention humaine.',
    status: 'bientot',
  },
]

export default function AgentsGrid() {
  return (
    <section className="bg-white py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-headline text-3xl font-bold tracking-tight text-on-surface mb-16">
          Ce qu&apos;on déploie
        </h2>

        <div className="grid sm:grid-cols-2 gap-6">
          {AGENTS.map(({ icon: Icon, title, text, status }) => (
            <div
              key={title}
              className="bg-white border border-slate-100 rounded-sm p-8 hover:-translate-y-1 transition-all duration-200"
            >
              <Icon size={32} strokeWidth={1.5} className="text-secondary mb-6" />

              <h3 className="font-headline font-bold text-lg text-on-surface mb-3">
                {title}
              </h3>

              <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                {text}
              </p>

              <span
                className={cn(
                  'inline-block text-xs px-2 py-1 rounded-sm font-label uppercase tracking-widest',
                  status === 'production' ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-500'
                )}
              >
                {status === 'production' ? 'En production' : 'Bientôt'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
