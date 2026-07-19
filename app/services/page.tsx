import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, ArrowRight, ChevronsRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Création de Site Web à Bordeaux | Digicorpex - Agents IA',
  description:
    "Digicorpex est avant tout spécialisé en agents IA et automatisation pour PME et TPE. Nous concevons aussi des sites web sur-mesure (développement, design UX/UI, SEO) à Bordeaux, la fondation technique sur laquelle vos agents s'appuient.",
  alternates: {
    canonical: 'https://www.digicorpex.com/services',
  },
  openGraph: {
    title: 'Création de Site Web à Bordeaux - Digicorpex',
    description:
      "Digicorpex est avant tout spécialisé en agents IA et automatisation. Développement web, design UX/UI et SEO restent une prestation à part entière, à Bordeaux.",
    url: 'https://www.digicorpex.com/services',
  },
}

/* ─────────────────────────────────────────────────
   Data
───────────────────────────────────────────────── */

interface Service {
  number: string
  title: string
  description: string
  items: string[]
  ctaLabel: string
  ctaHref: string
  reversed: boolean
  image: string
  imageAlt: string
}

const services: Service[] = [
  {
    number: '01',
    title: 'Développement Web',
    description:
      "Un site rapide, accessible et facile à maintenir, construit avec des technologies modernes (Next.js, React). C'est la base technique nécessaire avant d'y connecter des agents ou des automatisations.",
    items: [
      'Sites web rapides et accessibles (Next.js, React)',
      'Applications web sur-mesure',
      'Intégrations API & CMS headless',
      'Optimisation technique (Core Web Vitals)',
      'Déploiement et hébergement',
    ],
    ctaLabel: 'Démarrer votre projet',
    ctaHref: '/contact',
    reversed: false,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Développement web Next.js et React - MacBook avec code',
  },
  {
    number: '02',
    title: 'Design UX/UI',
    description:
      "Une interface pensée pour être comprise et utilisée sans effort, pas seulement pour plaire. Nous partons des parcours réels de vos utilisateurs plutôt que des tendances graphiques du moment.",
    items: [
      'Audit UX & cartographie des parcours',
      'Wireframing & prototypage Figma',
      'Design system cohérent',
      'Design responsive mobile-first',
      'Tests utilisateurs & itérations',
    ],
    ctaLabel: 'Voir notre approche design',
    ctaHref: '/contact',
    reversed: true,
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Design UX/UI et prototypage - interface numérique',
  },
  {
    number: '03',
    title: 'Stratégie SEO',
    description:
      "Un référencement pensé comme une infrastructure plutôt qu'une tactique ponctuelle : structure technique propre, contenu pertinent, visibilité qui se construit dans la durée plutôt qu'un pic isolé.",
    items: [
      'Audit SEO technique complet',
      'Stratégie de contenu éditoriale',
      'Optimisation on-page & sémantique',
      'Netlinking et construction d\'autorité',
      'Suivi et ajustements réguliers',
    ],
    ctaLabel: 'Auditer mon site',
    ctaHref: '/contact',
    reversed: false,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Stratégie SEO et analytics - tableau de bord de données',
  },
]

/* ─────────────────────────────────────────────────
   Page
───────────────────────────────────────────────── */

export default function ServicesPage() {
  return (
    <>
      {/* ── 3.1 Hero ──────────────────────────────── */}
      <section className="py-24 md:py-32 px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">

            {/* Badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-tertiary-container text-on-tertiary-container text-[10px] font-label uppercase tracking-[0.2em] rounded-full mb-8">
              La fondation technique
            </span>

            {/* H1 */}
            <h1 className="font-headline text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] text-on-surface mb-6">
              La base sur laquelle
              <br />
              <span className="text-secondary">vos agents s'appuient.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-on-surface-variant max-w-xl leading-relaxed font-body">
              Digicorpex est avant tout spécialisé en agents IA et
              automatisation. Mais avant d'automatiser quoi que ce soit, encore
              faut-il un site qui tient la route : développement web, design
              UX/UI et SEO restent une prestation à part entière, la base
              technique sur laquelle nous construisons ensuite vos agents.
            </p>

          </div>
        </div>
      </section>

      {/* ── 3.2 Services alternés ─────────────────── */}
      <section className="py-24 px-8 bg-surface">
        <div className="max-w-7xl mx-auto space-y-32">

          {services.map((service) => (
            <div
              key={service.number}
              className="grid md:grid-cols-12 gap-12 md:gap-16 items-center"
            >

              {/* Image block */}
              <div
                className={cn(
                  'md:col-span-7',
                  service.reversed ? 'order-1 md:order-2' : ''
                )}
              >
                <div className="bg-surface-container-low p-2">
                  <div className="aspect-video relative overflow-hidden rounded-sm">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 58vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-600/20 to-blue-900/10" />
                  </div>
                </div>
              </div>

              {/* Content block */}
              <div
                className={cn(
                  'md:col-span-5',
                  service.reversed ? 'order-2 md:order-1' : ''
                )}
              >
                {/* Number */}
                <span className="font-headline font-extrabold text-surface-dim text-8xl block mb-4 leading-none select-none">
                  {service.number}
                </span>

                {/* Title */}
                <h2 className="font-headline text-4xl font-bold text-on-surface tracking-tight mb-4">
                  {service.title}
                </h2>

                {/* Description */}
                <p className="text-on-surface-variant leading-relaxed mb-8 font-body">
                  {service.description}
                </p>

                {/* Checklist */}
                <ul className="space-y-3 mb-10">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2
                        size={16}
                        className="text-secondary shrink-0 mt-0.5"
                        strokeWidth={2}
                      />
                      <span className="text-sm font-medium text-on-surface">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA inline */}
                <Link
                  href={service.ctaHref}
                  className="group inline-flex items-center gap-2 font-headline font-bold text-secondary hover:text-secondary-dim transition-colors duration-300"
                >
                  {service.ctaLabel}
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </Link>
              </div>

            </div>
          ))}

        </div>
      </section>

      {/* ── 3.3 CTA finale ────────────────────────── */}
      <section className="bg-secondary py-32 px-8">
        <div className="max-w-7xl mx-auto text-center">

          <h2 className="font-headline text-5xl font-extrabold text-on-secondary tracking-tight mb-6 leading-[1.1]">
            Un site solide,
            <br />
            avant tout le reste.
          </h2>

          <p className="text-on-secondary/80 text-lg max-w-lg mx-auto leading-relaxed mb-12 font-body">
            Refonte, nouveau site ou passerelle vers vos futurs agents : un
            premier échange suffit pour cadrer le projet.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">

            {/* Primary button */}
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-surface text-on-surface px-10 py-4 rounded-sm font-headline font-bold uppercase tracking-widest text-sm hover:bg-surface-container-low transition-colors duration-300"
            >
              Obtenir un devis
              <ChevronsRight size={16} />
            </Link>

            {/* Text link button */}
            <Link
              href="/blog"
              className="text-on-secondary border-b border-on-secondary/30 pb-1 font-headline font-bold text-sm hover:border-on-secondary/60 transition-colors duration-300"
            >
              Lire nos articles →
            </Link>

          </div>
        </div>
      </section>
    </>
  )
}
