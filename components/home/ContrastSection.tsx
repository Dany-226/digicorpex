import { Building2, MessageSquareText, Compass } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import ScrollReveal from '@/components/shared/ScrollReveal'

interface Option {
  icon: LucideIcon
  eyebrow: string
  title: string
  description: string
  highlight?: boolean
}

const options: Option[] = [
  {
    icon: Building2,
    eyebrow: "L'option classique",
    title: 'Une agence web généraliste',
    description:
      "Un site soigné et une présence en ligne correcte, portés par une équipe qui connaît bien le web mais rarement le métier ni les process internes de l'entreprise.",
  },
  {
    icon: MessageSquareText,
    eyebrow: 'Le réflexe naturel',
    title: 'Le bricolage avec ChatGPT',
    description:
      "Une aide précieuse au coup par coup, sans mémoire d'une conversation à l'autre ni connexion aux outils métier - à reconstruire à chaque fois.",
  },
  {
    icon: Compass,
    eyebrow: 'Notre approche',
    title: 'Un agent dédié à l\'entreprise',
    description:
      "Conçu pour un métier et des process précis, connecté aux outils existants, avec une mémoire d'entreprise qui s'enrichit dans la durée.",
    highlight: true,
  },
]

export default function ContrastSection() {
  return (
    <section className="bg-surface py-24 md:py-32 px-8">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <ScrollReveal className="mb-16">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-on-surface mb-4">
            Deux réflexes, et l'approche qui manquait
          </h2>
          <div className="w-20 h-1.5 bg-secondary rounded-sm" />
        </ScrollReveal>

        {/* Grid - shared borders technique */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-outline-variant/20">
          {options.map(({ icon: Icon, eyebrow, title, description, highlight }, i) => (
            <ScrollReveal key={title} delay={i * 0.1}>
              <div
                className={`p-12 border-r border-b border-outline-variant/20 h-full transition-colors duration-500 ${
                  highlight
                    ? 'bg-secondary'
                    : 'bg-surface-container-lowest'
                }`}
              >
                <Icon
                  size={40}
                  strokeWidth={1.5}
                  className={`mb-8 ${highlight ? 'text-on-secondary' : 'text-secondary'}`}
                />
                <span
                  className={`block text-xs font-label uppercase tracking-widest mb-3 ${
                    highlight ? 'text-on-secondary/80' : 'text-secondary'
                  }`}
                >
                  {eyebrow}
                </span>
                <h3
                  className={`font-headline font-bold text-2xl mb-4 ${
                    highlight ? 'text-on-secondary' : 'text-on-surface'
                  }`}
                >
                  {title}
                </h3>
                <p
                  className={`leading-relaxed text-[15px] ${
                    highlight ? 'text-on-secondary/80' : 'text-on-surface-variant'
                  }`}
                >
                  {description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  )
}
