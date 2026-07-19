import { Lightbulb, Code2, TrendingUp } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import ScrollReveal from '@/components/shared/ScrollReveal'

interface Service {
  icon: LucideIcon
  eyebrow: string
  title: string
  description: string
}

const services: Service[] = [
  {
    icon: Lightbulb,
    eyebrow: 'Aujourd\'hui',
    title: 'Automatisation one-shot',
    description:
      "Identifier la tâche la plus chronophage - appels, devis, relances - et déployer l'agent qui la prend en charge.",
  },
  {
    icon: Code2,
    eyebrow: 'Ce qui reste',
    title: "Wiki IA, la mémoire d'entreprise",
    description:
      'Process, contrats, décisions structurés dans une base consultée par les agents et gardée par l\'équipe.',
  },
  {
    icon: TrendingUp,
    eyebrow: 'La suite',
    title: "Une flotte d'agents qui grandit",
    description:
      "Suivi commercial, pilotage financier, conformité, recrutement : chaque agent s'ajoutant au précédent.",
  },
]

export default function ServicesGrid() {
  return (
    <section className="bg-surface-container-low py-24 md:py-32 px-8">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <ScrollReveal className="mb-16">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-on-surface mb-4">
            Une trajectoire, pas trois services
          </h2>
          <div className="w-20 h-1.5 bg-secondary rounded-sm" />
        </ScrollReveal>

        {/* Grid - shared borders technique */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-outline-variant/20">
          {services.map(({ icon: Icon, eyebrow, title, description }, i) => (
            <ScrollReveal key={title} delay={i * 0.1}>
              <div
                className="group bg-surface-container-lowest p-12 border-r border-b border-outline-variant/20 hover:bg-secondary hover:-translate-y-1 hover:shadow-sm transition-all duration-200 cursor-default h-full"
              >
                <Icon
                  size={40}
                  strokeWidth={1.5}
                  className="text-secondary group-hover:text-on-secondary transition-colors duration-500 mb-8"
                />
                <span className="block text-xs font-label uppercase tracking-widest text-secondary group-hover:text-on-secondary/80 transition-colors duration-500 mb-3">
                  {eyebrow}
                </span>
                <h3 className="font-headline font-bold text-2xl text-on-surface group-hover:text-on-secondary transition-colors duration-500 mb-4">
                  {title}
                </h3>
                <p className="text-on-surface-variant group-hover:text-on-secondary/80 leading-relaxed transition-colors duration-500 text-[15px]">
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
