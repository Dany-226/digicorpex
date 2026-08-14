import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Mentions légales | Digicorpex',
  description:
    "Mentions légales du site Digicorpex : éditeur, directeur de la publication, hébergement, propriété intellectuelle et données personnelles.",
  alternates: {
    canonical: 'https://www.digicorpex.com/mentions-legales',
  },
}

export default function MentionsLegalesPage() {
  return (
    <>
      {/* ── Hero ────────────────────────────────── */}
      <section className="py-24 md:py-32 px-8 bg-surface">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05] text-on-surface">
            Mentions légales
          </h1>
        </div>
      </section>

      {/* ── Contenu ─────────────────────────────── */}
      <section className="pb-24 md:pb-32 px-8 bg-surface">
        <div className="max-w-3xl mx-auto space-y-16 font-body">

          {/* Éditeur du site */}
          <div>
            <h2 className="font-headline text-2xl font-bold tracking-tight text-on-surface mb-4">
              Éditeur du site
            </h2>
            <p className="text-on-surface-variant leading-relaxed mb-6">
              Le site www.digicorpex.com est édité par la société DIGICORPEX,
              société par actions simplifiée unipersonnelle (SASU) au capital
              social de 500 euros.
            </p>
            <ul className="space-y-2 text-on-surface-variant leading-relaxed">
              <li>
                <span className="font-medium text-on-surface">Siège social : </span>
                226 rue Camille Godard, 33000 Bordeaux
              </li>
              <li>
                <span className="font-medium text-on-surface">SIREN : </span>
                940 521 719
              </li>
              <li>
                <span className="font-medium text-on-surface">SIRET (siège) : </span>
                940 521 719 00010
              </li>
              <li>
                <span className="font-medium text-on-surface">RCS Bordeaux : </span>
                940 521 719
              </li>
              <li>
                <span className="font-medium text-on-surface">Numéro de TVA intracommunautaire : </span>
                FR69940521719
              </li>
              <li>
                <span className="font-medium text-on-surface">Président : </span>
                Daniel Rollin
              </li>
            </ul>
          </div>

          {/* Directeur de la publication */}
          <div>
            <h2 className="font-headline text-2xl font-bold tracking-tight text-on-surface mb-4">
              Directeur de la publication
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              Daniel Rollin, en qualité de Président de DIGICORPEX.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h2 className="font-headline text-2xl font-bold tracking-tight text-on-surface mb-4">
              Contact
            </h2>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:danielrollin@digicorpex.com"
                  className="flex items-center gap-2.5 text-on-surface-variant hover:text-on-surface transition-colors duration-200 w-fit"
                >
                  <Mail size={16} className="shrink-0 text-secondary" />
                  danielrollin@digicorpex.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+33674058657"
                  className="flex items-center gap-2.5 text-on-surface-variant hover:text-on-surface transition-colors duration-200 w-fit"
                >
                  <Phone size={16} className="shrink-0 text-secondary" />
                  +33 6 74 05 86 57
                </a>
              </li>
            </ul>
          </div>

          {/* Hébergement */}
          <div>
            <h2 className="font-headline text-2xl font-bold tracking-tight text-on-surface mb-4">
              Hébergement
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              Le site est hébergé par Cloudflare, Inc., 101 Townsend Street,
              San Francisco, CA 94107, États-Unis.
            </p>
          </div>

          {/* Propriété intellectuelle */}
          <div>
            <h2 className="font-headline text-2xl font-bold tracking-tight text-on-surface mb-4">
              Propriété intellectuelle
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              L'ensemble des contenus présents sur ce site (textes, images,
              logos, structure) est la propriété exclusive de DIGICORPEX, sauf
              mention contraire. Toute reproduction, représentation ou
              diffusion, totale ou partielle, sans autorisation préalable est
              interdite.
            </p>
          </div>

          {/* Données personnelles */}
          <div>
            <h2 className="font-headline text-2xl font-bold tracking-tight text-on-surface mb-4">
              Données personnelles
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              Le traitement des données personnelles collectées via ce site
              est détaillé dans notre{' '}
              <Link
                href="/confidentialite"
                className="text-secondary hover:text-secondary-dim underline underline-offset-4 transition-colors duration-200"
              >
                Politique de confidentialité
              </Link>
              .
            </p>
          </div>

        </div>
      </section>
    </>
  )
}
