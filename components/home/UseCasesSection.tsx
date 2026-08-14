import Link from 'next/link'
import { ArrowRight, Clock, Search, ClipboardList, FileCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import ScrollReveal from '@/components/shared/ScrollReveal'
import UseCaseLogPanel from './UseCaseLogPanel'

const MINT = '#5eca8a'

interface LargeUseCase {
  size: 'large'
  title: string
  description: string
  processLines: string[]
  resultLine: string
}

interface SmallUseCase {
  size: 'small'
  title: string
  description: string
  icon: LucideIcon
}

type UseCase = LargeUseCase | SmallUseCase

const useCases: UseCase[] = [
  {
    size: 'large',
    title: 'Qualifier chaque demande entrante',
    description:
      "Il rassemble le contexte, repère les informations manquantes et prépare la transmission à la bonne personne.",
    processLines: [
      'Nouvelle demande reçue...',
      'Contexte rassemblé...',
      'Informations manquantes détectées...',
      'Transmission préparée...',
    ],
    resultLine: '✓ Demande structurée',
  },
  {
    size: 'large',
    title: 'Préparer un document avant validation',
    description:
      'Notes, messages ou données brutes sont mis en forme selon vos gabarits. Votre équipe relit et valide avant tout envoi.',
    processLines: [
      'Notes et messages reçus...',
      'Mise en forme selon vos gabarits...',
      'Relecture requise...',
    ],
    resultLine: '✓ Brouillon prêt',
  },
  {
    size: 'small',
    title: 'Relancer au bon moment',
    description:
      'Il repère ce qui attend une réponse, applique vos règles et prépare la relance adaptée.',
    icon: Clock,
  },
  {
    size: 'small',
    title: 'Retrouver l\'information dans vos outils',
    description:
      'Il interroge uniquement les sources autorisées et indique les documents utilisés dans sa réponse.',
    icon: Search,
  },
  {
    size: 'small',
    title: 'Tenir le suivi à jour',
    description:
      'Il synthétise les échanges, complète la fiche et prépare l\'étape suivante.',
    icon: ClipboardList,
  },
  {
    size: 'small',
    title: 'Documenter la livraison',
    description:
      "Chaque automatisation livrée est accompagnée d'une documentation claire, pour garder la maîtrise de vos outils.",
    icon: FileCheck,
  },
]

function MockupPanel({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="h-40 bg-surface-container-high px-6 flex flex-col justify-center gap-3">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-md bg-surface-container-lowest flex items-center justify-center shrink-0">
          <Icon size={16} className="text-on-surface-variant" strokeWidth={1.75} />
        </div>
        <span className="w-2 h-2 rounded-full ml-auto shrink-0" style={{ backgroundColor: MINT }} />
      </div>
      <div className="h-2 bg-surface-container-highest rounded-sm w-full" />
      <div className="h-2 bg-surface-container-highest rounded-sm w-3/5" />
    </div>
  )
}

function UseCaseCard({ useCase, index }: { useCase: UseCase; index: number }) {
  const isLarge = useCase.size === 'large'

  return (
    <ScrollReveal
      delay={index * 0.09}
      y={28}
      className={`h-full ${isLarge ? 'md:col-span-2' : ''}`}
    >
      <div className="group h-full flex flex-col bg-surface-container-lowest rounded-sm overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-editorial">
        {useCase.size === 'large' ? (
          <UseCaseLogPanel processLines={useCase.processLines} resultLine={useCase.resultLine} />
        ) : (
          <MockupPanel icon={useCase.icon} />
        )}

        <div className="p-6 flex flex-col gap-2 flex-1">
          <h3 className="font-display text-xl font-medium text-on-surface">
            {useCase.title}
          </h3>
          <p className="font-headline text-sm text-on-surface-variant leading-relaxed flex-1">
            {useCase.description}
          </p>
          <Link
            href="/agents"
            className="group/link inline-flex items-center gap-1.5 text-sm font-bold text-secondary hover:text-secondary-dim transition-colors duration-200 mt-2 w-fit"
          >
            En savoir plus
            <ArrowRight size={14} className="transition-transform duration-200 group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </ScrollReveal>
  )
}

export default function UseCasesSection() {
  return (
    <section className="bg-surface py-24 md:py-32 px-8">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <ScrollReveal className="mb-16">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-on-surface mb-4">
            Ce que vos agents prennent en charge
          </h2>
          <div className="w-20 h-1.5 bg-secondary rounded-sm" />
        </ScrollReveal>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase, i) => (
            <UseCaseCard key={useCase.title} useCase={useCase} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
