import type { Metadata } from 'next'
import Link from 'next/link'
import { Building2, ArrowRight } from 'lucide-react'
import ContactForm from '@/components/shared/ContactForm'

export const metadata: Metadata = {
  title: 'Contact - Initier un Partenariat',
  description:
    'Décrivez votre projet en 5 minutes. Digicorpex vous répond avec une proposition personnalisée sous 48h. Bordeaux.',
  alternates: {
    canonical: 'https://www.digicorpex.com/contact',
  },
  openGraph: {
    title: 'Contact Digicorpex -Initier un Partenariat',
    description:
      'Décrivez votre projet en 5 minutes. Réponse personnalisée sous 48h.',
    url: 'https://www.digicorpex.com/contact',
  },
}

export default function ContactPage() {
  return (
    <section className="py-24 md:py-32 px-8 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16">

          {/* ── Colonne gauche -lg:col-span-5 ─────── */}
          <div className="lg:col-span-5 flex flex-col gap-10">

            {/* Label + H1 */}
            <div>
              <span className="text-xs font-label uppercase tracking-widest text-secondary block mb-5">
                Initier un Partenariat
              </span>
              <h1 className="font-headline text-5xl font-extrabold tracking-tighter text-on-surface leading-[1.1] mb-4">
                Construisons votre
                <br />
                <span className="text-secondary">Digital Future.</span>
              </h1>
              <p className="text-lg text-on-surface-variant max-w-md leading-relaxed font-body">
                Décrivez-nous votre contexte en quelques minutes. Nous vous
                répondons avec une proposition personnalisée sous 48h ouvrées.
              </p>
            </div>

            {/* Localisation */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-surface-container rounded-sm flex items-center justify-center shrink-0">
                <Building2 size={20} className="text-on-surface-variant" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-headline font-bold text-on-surface text-sm mb-1">
                  Digicorpex
                </p>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Bordeaux, Nouvelle-Aquitaine
                  <br />
                  France
                </p>
                <a
                  href="mailto:danielrollin@digicorpex.com"
                  className="text-sm text-secondary hover:text-secondary-dim transition-colors mt-1 block"
                >
                  danielrollin@digicorpex.com
                </a>
              </div>
            </div>

            {/* Bloc consultation expédiée */}
            <div className="bg-surface-container-low p-8 border-l-4 border-secondary">
              <p className="font-headline font-bold text-on-surface mb-2">
                Besoin d&apos;en parler de vive voix ?
              </p>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                Réservez un créneau de 30 minutes pour présenter votre projet.
              </p>
              <Link
                href="https://calendar.app.google/dazfTvR3EVEvZknQA"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm font-headline font-bold text-secondary hover:text-secondary-dim transition-colors"
              >
                Prendre rendez-vous
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </Link>
            </div>

          </div>

          {/* ── Colonne droite -lg:col-span-7 ─────── */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

        </div>
      </div>
    </section>
  )
}
