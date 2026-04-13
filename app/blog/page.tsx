import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllArticles } from '@/lib/mdx'
import { ArrowRight, ChevronRight, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog — Insights & Stratégie Digitale',
  description:
    'Articles sur le développement web, le design UX/UI et la stratégie SEO. Ressources éditoriales par Digicorpex, Bordeaux.',
  openGraph: {
    title: 'Blog Digicorpex — Insights & Stratégie Digitale',
    description:
      'Articles sur le développement web, le design UX/UI et la stratégie SEO.',
  },
}

export default function BlogPage() {
  const articles = getAllArticles()
  const [featured, second, third, ...rest] = articles

  /* Category counts */
  const categoryCounts = articles.reduce<Record<string, number>>((acc, a) => {
    acc[a.category] = (acc[a.category] ?? 0) + 1
    return acc
  }, {})

  return (
    <>
      {/* ── Editorial header ─────────────────────── */}
      <section className="py-24 md:py-32 px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">

            {/* Left — badge + H1 */}
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-tertiary-container text-on-tertiary-container text-xs font-label uppercase tracking-widest rounded-full mb-6 block w-fit">
                Insights &amp; Strategy
              </span>
              <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.1] text-on-surface">
                The Digital
                <br />
                <span className="text-secondary">Perspective.</span>
              </h1>
            </div>

            {/* Right — search */}
            <div className="md:pb-3 w-full md:w-72">
              <label
                htmlFor="search"
                className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2"
              >
                Rechercher
              </label>
              <input
                id="search"
                type="search"
                placeholder=""
                className="w-full bg-surface-container-high border-0 border-b-2 border-primary-container focus:border-secondary rounded-none px-0 py-3 text-on-surface outline-none transition-colors text-sm font-body placeholder:text-on-surface-variant/40"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Main grid ────────────────────────────── */}
      <section className="pb-32 px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16">

            {/* ── Articles col-span-8 ─────────────── */}
            <div className="lg:col-span-8 flex flex-col gap-16">

              {/* Featured article */}
              {featured && (
                <article>
                  <Link href={`/blog/${featured.slug}`} className="group block">
                    {/* Image */}
                    <div className="aspect-[16/9] overflow-hidden rounded-sm bg-surface-container mb-8 grayscale hover:grayscale-0 transition-all duration-700">
                      <div
                        className="w-full h-full group-hover:scale-105 transition-transform duration-700"
                        style={{
                          background:
                            'linear-gradient(135deg, #ddeaf3 0%, #cadde9 50%, #a4b4be 100%)',
                        }}
                      />
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-[11px] font-label uppercase tracking-widest text-secondary">
                        {featured.category}
                      </span>
                      <span className="text-[11px] text-on-surface-variant/50">
                        {featured.date}
                      </span>
                      <span className="text-[11px] text-on-surface-variant/50">
                        {featured.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-on-surface mb-4 group-hover:text-secondary transition-colors duration-300">
                      {featured.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-lg text-on-surface-variant leading-relaxed mb-6 max-w-xl">
                      {featured.description}
                    </p>

                    {/* Read link */}
                    <span className="inline-flex items-center gap-2 text-sm font-label font-semibold text-secondary uppercase tracking-widest group-hover:gap-3 transition-all duration-300">
                      Lire l&apos;article
                      <ArrowRight size={14} />
                    </span>
                  </Link>
                </article>
              )}

              {/* 2-col grid */}
              {(second || third) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  {[second, third].filter(Boolean).map((article) => (
                    <article key={article!.slug}>
                      <Link
                        href={`/blog/${article!.slug}`}
                        className="group block"
                      >
                        {/* Image aspect-square */}
                        <div className="aspect-square overflow-hidden rounded-sm bg-surface-container mb-5 grayscale hover:grayscale-0 transition-all duration-700">
                          <div
                            className="w-full h-full group-hover:scale-105 transition-transform duration-700"
                            style={{
                              background:
                                'linear-gradient(135deg, #e5eff7 0%, #cadde9 50%, #a4b4be 100%)',
                            }}
                          />
                        </div>

                        <span className="text-[11px] font-label uppercase tracking-widest text-secondary block mb-2">
                          {article!.category}
                        </span>

                        <h3 className="font-headline font-bold text-on-surface group-hover:text-secondary transition-colors duration-300 mb-3 leading-snug">
                          {article!.title}
                        </h3>

                        <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-3">
                          {article!.description}
                        </p>
                      </Link>
                    </article>
                  ))}
                </div>
              )}

              {/* Pagination */}
              <div className="flex items-center gap-6 pt-4">
                <div className="w-12 h-[1px] bg-secondary" />
                <button className="text-sm font-headline font-bold text-on-surface w-8 h-8 flex items-center justify-center">
                  1
                </button>
                <button className="text-sm font-headline text-on-surface-variant hover:text-on-surface transition-colors w-8 h-8 flex items-center justify-center">
                  2
                </button>
                <button className="flex items-center gap-1.5 text-sm font-label text-on-surface-variant hover:text-on-surface transition-colors ml-2">
                  Next <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* ── Sidebar col-span-4 ──────────────── */}
            <aside className="lg:col-span-4 flex flex-col gap-10">

              {/* Lead gen form */}
              <div className="bg-surface-container-low p-10">
                <h3 className="font-headline font-bold text-xl text-on-surface mb-2">
                  La stratégie digitale,
                  <br />
                  sans le jargon.
                </h3>
                <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
                  Recevez nos analyses chaque mois. Pas de spam, désabonnement en un clic.
                </p>

                <div className="mb-4">
                  <label className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">
                    Adresse email
                  </label>
                  <input
                    type="email"
                    className="w-full bg-transparent border-0 border-b-2 border-primary-container focus:border-secondary rounded-none px-0 py-3 text-on-surface outline-none transition-colors text-sm"
                  />
                </div>

                <button className="w-full bg-on-surface text-surface-container-lowest py-3 rounded-sm font-headline font-bold text-sm uppercase tracking-widest hover:bg-primary transition-colors duration-300 mt-2">
                  S&apos;abonner
                </button>
              </div>

              {/* Categories */}
              <div>
                <p className="text-[10px] font-label uppercase tracking-[0.2em] text-on-surface-variant border-b border-surface-container-high pb-3 mb-4">
                  Catégories
                </p>
                <ul className="space-y-3">
                  {Object.entries(categoryCounts).map(([cat, count]) => (
                    <li key={cat} className="flex items-center justify-between">
                      <Link
                        href={`/blog?category=${encodeURIComponent(cat)}`}
                        className="text-sm text-on-surface hover:text-secondary transition-colors duration-200 font-body"
                      >
                        {cat}
                      </Link>
                      <span className="text-[10px] text-outline-variant font-label">
                        {count}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Expertise badge block */}
              <div className="bg-tertiary-container/30 border border-tertiary-container/50 p-8">
                <Award
                  size={24}
                  className="text-on-tertiary-container mb-4"
                  strokeWidth={1.5}
                />
                <h4 className="font-headline font-bold text-on-tertiary-container mb-2">
                  Architecture Certified
                </h4>
                <p className="text-sm text-on-tertiary-container/80 leading-relaxed">
                  Nos stratégies sont construites sur des données réelles et
                  des retours d'expérience terrain — pas des frameworks théoriques.
                </p>
              </div>

            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
