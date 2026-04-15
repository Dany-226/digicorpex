import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Target, Zap, Eye, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'À propos - Digicorpex',
  description:
    'Digicorpex est une agence web & digital fondée à Bordeaux. Nous concevons des présences digitales qui génèrent une croissance mesurable.',
  alternates: {
    canonical: 'https://digicorpex.com/about',
  },
  openGraph: {
    title: 'À propos - Digicorpex, agence web Bordeaux',
    description:
      'Digicorpex est une agence web & digital fondée à Bordeaux. Développement web, design UX/UI et stratégie SEO.',
    url: 'https://digicorpex.com/about',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Digicorpex',
  url: 'https://digicorpex.com',
  email: 'contact@digicorpex.com',
  telephone: '+33674058657',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bordeaux',
    addressRegion: 'Nouvelle-Aquitaine',
    postalCode: '33000',
    addressCountry: 'FR',
  },
  description:
    'Agence web & digital spécialisée en développement web, design UX/UI et stratégie SEO. Bordeaux.',
}

const values = [
  {
    icon: Target,
    title: 'Précision architecturale',
    description:
      'Chaque décision technique et créative est motivée par un objectif business précis. Nous ne construisons pas pour construire - nous construisons pour performer.',
  },
  {
    icon: Eye,
    title: 'Transparence radicale',
    description:
      "Pas de jargon inutile, pas de promesses vagues. Vous savez exactement ce que nous faisons, pourquoi, et comment le mesurer.",
  },
  {
    icon: Zap,
    title: 'Impact mesurable',
    description:
      "La qualité d'un site se juge dans les données - trafic organique, taux de conversion, temps de chargement. Nous définissons les indicateurs avant de commencer.",
  },
  {
    icon: Users,
    title: 'Partenariat long terme',
    description:
      "Nous refusons les projets one-shot. Notre modèle est celui de l'architecte - nous construisons avec vous, pas pour vous, sur la durée.",
  },
]

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* ── Hero ────────────────────────────────── */}
      <section className="py-24 md:py-32 px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">

            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-tertiary-container text-on-tertiary-container text-[10px] font-label uppercase tracking-[0.2em] rounded-full mb-8">
              Notre Histoire
            </span>

            <h1 className="font-headline text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] text-on-surface mb-6">
              Bâtir des
              <br />
              <span className="text-secondary">Marques Digitales.</span>
            </h1>

            <p className="text-lg text-on-surface-variant max-w-xl leading-relaxed font-body">
              Fondée à Bordeaux, Digicorpex réunit des experts du développement
              web, du design et du référencement autour d'une conviction commune :
              le digital doit produire des résultats tangibles.
            </p>
          </div>
        </div>
      </section>

      {/* ── Histoire ────────────────────────────── */}
      <section className="py-24 px-8 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-center">

            {/* Visual */}
            <div className="lg:col-span-5">
              <div className="aspect-square bg-surface-container-low p-2">
                <div className="relative w-full h-full grayscale hover:grayscale-0 transition-all duration-700 overflow-hidden rounded-sm">
                  <Image
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                    alt="Équipe Digicorpex - agence web Bordeaux"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                  />
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="lg:col-span-7">
              <h2 className="font-headline text-3xl font-bold tracking-tight text-on-surface mb-4">
                Pourquoi Digicorpex
              </h2>
              <div className="w-20 h-1.5 bg-secondary rounded-sm mb-8" />

              <div className="space-y-5 text-on-surface-variant leading-relaxed font-body">
                <p>
                  Digicorpex est née d'un constat simple : trop de projets web
                  échouent non pas à cause d'un manque de talent technique, mais
                  à cause d'un manque d'alignement stratégique. Des équipes brillantes
                  qui construisent la mauvaise chose, dans le mauvais ordre, pour
                  les mauvaises raisons.
                </p>
                <p>
                  Nous sommes basés à Bordeaux et nous travaillons avec des entreprises
                  qui veulent faire de leur présence digitale un avantage
                  concurrentiel réel - pas une case à cocher. E-commerce, SaaS,
                  cabinets de conseil, professionnels de santé : nos clients ont
                  des secteurs différents, mais un besoin commun.
                </p>
                <p>
                  Notre approche est celle de l'architecte numérique : comprendre
                  l'existant, définir les fondations, puis construire avec rigueur.
                  Chaque projet démarre par un audit, chaque livraison est
                  accompagnée de métriques de référence.
                </p>
              </div>

              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 font-headline font-bold text-secondary hover:text-secondary-dim transition-colors mt-8"
              >
                Démarrer votre projet
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── Valeurs ─────────────────────────────── */}
      <section className="py-24 md:py-32 px-8 bg-surface">
        <div className="max-w-7xl mx-auto">

          <div className="mb-16">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-on-surface mb-4">
              Ce en quoi nous croyons
            </h2>
            <div className="w-20 h-1.5 bg-secondary rounded-sm" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-surface-container-lowest p-8 editorial-shadow"
              >
                <Icon
                  size={28}
                  strokeWidth={1.5}
                  className="text-secondary mb-6"
                />
                <h3 className="font-headline font-bold text-on-surface mb-3 text-lg leading-snug">
                  {title}
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA ─────────────────────────────────── */}
      <section className="bg-secondary py-24 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-on-secondary tracking-tight">
              Travaillons ensemble.
            </h2>
            <p className="text-on-secondary/80 mt-2 font-body">
              Un projet en tête ? Un premier call suffit.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-surface text-on-surface px-10 py-4 rounded-sm font-headline font-bold uppercase tracking-widest text-sm hover:bg-surface-container-low transition-colors duration-300 shrink-0"
          >
            Prendre contact
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
