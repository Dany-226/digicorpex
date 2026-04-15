import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ChevronsRight } from 'lucide-react'

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
                Première Agence Digitale
              </span>
            </div>

            {/* H1 */}
            <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.1] text-on-surface">
              Architecturez votre
              <br />
              <span className="text-secondary">Présence Digitale.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-on-surface-variant max-w-xl leading-relaxed font-body">
              Nous concevons des sites web à haute performance et des stratégies digitales
              qui transforment votre visibilité en croissance mesurable.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-secondary text-on-secondary px-8 py-4 rounded-sm font-headline font-bold text-sm hover:bg-secondary-dim transition-all duration-300"
              >
                Démarrer votre projet
                <ChevronsRight size={16} />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 bg-surface-container-high text-on-surface px-8 py-4 rounded-sm font-headline font-bold text-sm hover:bg-surface-container transition-all duration-300"
              >
                Voir notre expertise
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* ── Right column -visual ────────────────── */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-square">

              <div className="w-full h-full rounded-sm overflow-hidden relative">
                <Image
                  src="/images/hero-seascape.png"
                  alt="Paysage marin - Digicorpex agence digitale Bordeaux"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  priority
                />
                {/* Gradient bleu-gris design system : surface → secondary */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(238,244,250,0.45) 0%, rgba(71,97,124,0.55) 60%, rgba(38,52,61,0.70) 100%)',
                  }}
                />
              </div>

              {/* Float stat card */}
              <div className="absolute -bottom-6 -left-6 bg-surface-container-lowest p-8 editorial-shadow">
                <span className="block font-headline text-5xl font-extrabold text-on-surface leading-none">
                  98%
                </span>
                <p className="text-sm text-on-surface-variant mt-2 font-label uppercase tracking-widest">
                  Satisfaction client
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
