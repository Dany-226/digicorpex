import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight, Search, FileText, CheckCircle } from 'lucide-react'
import ScrollReveal from '@/components/shared/ScrollReveal'
import UseCaseLogPanel from './UseCaseLogPanel'

const MINT = '#5eca8a'
const MINT_BG = 'rgba(94, 202, 138, 0.14)'

interface LargeUseCase {
  size: 'large'
  title: string
  description: string
  processLines: string[]
  resultLine: string
  lineStagger?: number
  initialDelay?: number
}

type MockupVariant = 'reminder' | 'search' | 'checklist' | 'document'

interface SmallUseCase {
  size: 'small'
  title: string
  description: string
  variant: MockupVariant
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
      'Photos jointes analysées...',
      'Mise en forme selon vos gabarits...',
      'Relecture requise...',
    ],
    resultLine: '✓ Brouillon prêt',
    lineStagger: 260,
    initialDelay: 1800,
  },
  {
    size: 'small',
    title: 'Relancer au bon moment',
    description:
      'Il repère ce qui attend une réponse, applique vos règles et prépare la relance adaptée.',
    variant: 'reminder',
  },
  {
    size: 'small',
    title: 'Retrouver l\'information dans vos outils',
    description:
      'Il interroge uniquement les sources autorisées et indique les documents utilisés dans sa réponse.',
    variant: 'search',
  },
  {
    size: 'small',
    title: 'Tenir le suivi à jour',
    description:
      'Il synthétise les échanges, complète la fiche et prépare l\'étape suivante.',
    variant: 'checklist',
  },
  {
    size: 'small',
    title: 'Documenter la livraison',
    description:
      "Chaque automatisation livrée est accompagnée d'une documentation claire, pour garder la maîtrise de vos outils.",
    variant: 'document',
  },
]

function MintBadge({ children }: { children: ReactNode }) {
  return (
    <span
      className="text-[10px] font-bold px-2 py-1 rounded-sm w-fit"
      style={{ backgroundColor: MINT_BG, color: MINT }}
    >
      {children}
    </span>
  )
}

function ReminderMockup() {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-[10px] text-on-surface-variant/50 line-through decoration-on-surface-variant/40 truncate">
        Devis #204 - envoyé le 12/08
      </span>
      <div className="flex items-center justify-between gap-2">
        <MintBadge>Relance prête</MintBadge>
        <ArrowRight size={13} style={{ color: MINT }} className="shrink-0" />
      </div>
    </div>
  )
}

function SearchMockup() {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-1.5 bg-surface-container-high rounded-sm px-2 py-1.5">
        <Search size={11} className="text-on-surface-variant/60 shrink-0" />
        <span className="text-[10px] text-on-surface-variant/50 truncate">facture client...</span>
      </div>
      <div className="flex items-center gap-1.5">
        <FileText size={13} className="text-on-surface-variant shrink-0" />
        <MintBadge>Trouvé dans Drive</MintBadge>
      </div>
    </div>
  )
}

function ChecklistMockup() {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5">
        <CheckCircle size={12} style={{ color: MINT }} className="shrink-0" />
        <span className="text-[10px] text-on-surface-variant/60 line-through decoration-on-surface-variant/40 truncate">
          Appel de suivi effectué
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <CheckCircle size={12} style={{ color: MINT }} className="shrink-0" />
        <span className="text-[10px] text-on-surface-variant/60 line-through decoration-on-surface-variant/40 truncate">
          Fiche mise à jour
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full shrink-0 animate-pulse" style={{ backgroundColor: MINT }} />
        <span className="text-[10px] text-on-surface-variant truncate">
          Prochaine étape planifiée
        </span>
      </div>
    </div>
  )
}

function DocumentMockup() {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-1.5">
        <FileText size={13} className="text-on-surface-variant shrink-0" />
        <span className="text-[10px] text-on-surface-variant/70 truncate">Documentation.pdf</span>
      </div>
      <MintBadge>Prêt à partager</MintBadge>
    </div>
  )
}

const mockupsByVariant: Record<MockupVariant, () => ReactNode> = {
  reminder: ReminderMockup,
  search: SearchMockup,
  checklist: ChecklistMockup,
  document: DocumentMockup,
}

function MockupPanel({ variant }: { variant: MockupVariant }) {
  const Mockup = mockupsByVariant[variant]
  return (
    <div className="h-40 bg-surface-container-high px-6 flex items-center justify-center">
      <div className="w-full max-w-[220px] bg-surface-container-lowest rounded-sm editorial-shadow p-3.5">
        <Mockup />
      </div>
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
          <UseCaseLogPanel
            processLines={useCase.processLines}
            resultLine={useCase.resultLine}
            lineStagger={useCase.lineStagger}
            initialDelay={useCase.initialDelay}
          />
        ) : (
          <MockupPanel variant={useCase.variant} />
        )}

        <div className="p-6 flex flex-col gap-2 flex-1">
          <h3 className="font-display text-xl font-medium text-on-surface">
            {useCase.title}
          </h3>
          <p className="font-headline text-sm text-on-surface-variant leading-relaxed flex-1">
            {useCase.description}
          </p>
          <Link
            href="/contact"
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
