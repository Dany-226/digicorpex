import Link from 'next/link'
import { ArrowRight, ChevronsRight } from 'lucide-react'
import AgentAnimation from './AgentAnimation'

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 px-8">
      {/* Decorative band -top right */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-surface-container-low -z-10 opacity-50" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-8 items-center">

          {/* ── Left column -text ──────────────────── */}
          <div className="lg:col-span-7 flex flex-col gap-8">

            {/* Expertise Badge */}
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-tertiary-container text-on-tertiary-container text-xs font-label uppercase tracking-widest rounded-full">
                Automatisation IA - Bordeaux
              </span>
            </div>

            {/* H1 */}
            <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-on-surface">
              Vos opérations,
              <br />
              <span className="text-secondary">automatisées.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-on-surface-variant max-w-xl leading-relaxed font-body">
              Nous déployons des agents IA qui traitent vos appels, génèrent vos devis et
              organisent votre mémoire d'entreprise - pendant que vous vous concentrez sur ce
              qui compte.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-secondary text-on-secondary px-8 py-4 rounded-sm font-headline font-bold text-sm hover:bg-secondary-dim transition-all duration-150 active:scale-95"
              >
                Démarrer votre projet
                <ChevronsRight size={16} />
              </Link>
              <Link
                href="/agents"
                className="inline-flex items-center gap-2 bg-surface-container-high text-on-surface px-8 py-4 rounded-sm font-headline font-bold text-sm hover:bg-surface-container transition-all duration-150 active:scale-95"
              >
                Voir notre expertise
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* ── Right column -visual ────────────────── */}
          <div className="lg:col-span-5 relative">
            <AgentAnimation />
          </div>

        </div>
      </div>
    </section>
  )
}
