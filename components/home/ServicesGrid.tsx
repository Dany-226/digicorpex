import { Lightbulb, Code2, TrendingUp } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Service {
  icon: LucideIcon
  title: string
  description: string
}

const services: Service[] = [
  {
    icon: Lightbulb,
    title: 'Consulting Stratégique',
    description:
      'Audit de votre présence digitale, définition de la roadmap et accompagnement dans vos décisions technologiques pour maximiser votre ROI.',
  },
  {
    icon: Code2,
    title: 'Ingénierie Produit',
    description:
      "Conception et développement de sites web performants, d'applications sur-mesure et d'interfaces utilisateur qui convertissent.",
  },
  {
    icon: TrendingUp,
    title: 'Analytics Digital',
    description:
      'Mise en place de tableaux de bord, tracking avancé et interprétation des données pour piloter votre croissance avec précision.',
  },
]

export default function ServicesGrid() {
  return (
    <section className="bg-surface-container-low py-24 md:py-32 px-8">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="mb-16">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-on-surface mb-4">
            Notre expertise
          </h2>
          <div className="w-20 h-1.5 bg-secondary rounded-sm" />
        </div>

        {/* Grid - shared borders technique */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-outline-variant/20">
          {services.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group bg-surface-container-lowest p-12 border-r border-b border-outline-variant/20 hover:bg-secondary transition-colors duration-500 cursor-default"
            >
              <Icon
                size={40}
                strokeWidth={1.5}
                className="text-secondary group-hover:text-on-secondary transition-colors duration-500 mb-8"
              />
              <h3 className="font-headline font-bold text-2xl text-on-surface group-hover:text-on-secondary transition-colors duration-500 mb-4">
                {title}
              </h3>
              <p className="text-on-surface-variant group-hover:text-on-secondary/80 leading-relaxed transition-colors duration-500 text-[15px]">
                {description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
