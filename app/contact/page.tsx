import type { Metadata } from 'next'
import Link from 'next/link'
import { Building2, ArrowRight, MapPin } from 'lucide-react'
import ContactForm from '@/components/shared/ContactForm'

export const metadata: Metadata = {
  title: 'Contact — Initier un Partenariat',
  description:
    'Décrivez votre projet en 5 minutes. Digicorpex vous répond avec une proposition personnalisée sous 48h. Bordeaux.',
  openGraph: {
    title: 'Contact Digicorpex — Initier un Partenariat',
    description:
      'Décrivez votre projet en 5 minutes. Réponse personnalisée sous 48h.',
  },
}

export default function ContactPage() {
  return (
    <section className="py-24 md:py-32 px-8 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16">

          {/* ── Colonne gauche — lg:col-span-5 ─────── */}
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
                  href="mailto:contact@digicorpex.com"
                  className="text-sm text-secondary hover:text-secondary-dim transition-colors mt-1 block"
                >
                  contact@digicorpex.com
                </a>
              </div>
            </div>

            {/* Bloc consultation expédiée */}
            <div className="bg-surface-container-low p-8 border-l-4 border-secondary">
              <p className="font-headline font-bold text-on-surface mb-2">
                Consultation expédiée
              </p>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                Vous préférez un échange direct ? Réservez un créneau de
                30 minutes pour présenter votre projet.
              </p>
              <Link
                href="mailto:contact@digicorpex.com"
                className="group inline-flex items-center gap-2 text-sm font-headline font-bold text-secondary hover:text-secondary-dim transition-colors"
              >
                Prendre rendez-vous
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </Link>
            </div>

            {/* Map section */}
            <div>
              <div className="h-[300px] overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-700 bg-surface-container relative">
                {/* Map placeholder */}
                <div
                  className="w-full h-full"
                  style={{
                    background:
                      'linear-gradient(160deg, #eef4fa 0%, #ddeaf3 30%, #cadde9 60%, #a4b4be 100%)',
                  }}
                />
                {/* Grid overlay for map feel */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      'linear-gradient(#6e7d86 1px, transparent 1px), linear-gradient(90deg, #6e7d86 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }}
                />
                {/* Animated pin */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
                  <div className="relative">
                    <div className="w-4 h-4 rounded-full bg-secondary animate-pulse" />
                    <div className="absolute inset-0 w-4 h-4 rounded-full bg-secondary/30 animate-ping" />
                  </div>
                  <div className="w-px h-4 bg-secondary/60" />
                </div>
                {/* Label */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                  <div className="bg-surface-container-lowest px-3 py-1.5 rounded-sm flex items-center gap-1.5">
                    <MapPin size={12} className="text-secondary" />
                    <span className="text-xs font-label font-bold text-on-surface">
                      Bordeaux
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ── Colonne droite — lg:col-span-7 ─────── */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

        </div>
      </div>
    </section>
  )
}
