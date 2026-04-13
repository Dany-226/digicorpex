import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllArticles, getArticleBySlug } from '@/lib/mdx'
import SocialSidebar from '@/components/blog/SocialSidebar'
import StatGrid, { StatItem } from '@/components/blog/StatGrid'
import { Calendar, Clock, ChevronRight, Award, ChevronsRight } from 'lucide-react'

/* ─────────────────────────────────────────────────
   MDX components — mapped to design system
───────────────────────────────────────────────── */
const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="font-headline text-3xl font-bold tracking-tight text-on-surface mt-16 mb-6"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="font-headline text-2xl font-bold text-on-surface mt-12 mb-4"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="text-lg leading-loose text-on-surface-variant mb-8"
      {...props}
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="bg-surface-container-low p-10 border-l-4 border-secondary my-12 not-italic"
      {...props}
    />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-bold text-on-surface" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-secondary hover:text-secondary-dim underline underline-offset-2 transition-colors"
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="space-y-2 mb-8 ml-4" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li
      className="text-lg text-on-surface-variant leading-relaxed list-disc list-outside"
      {...props}
    />
  ),
  /* Custom components available in MDX files */
  StatGrid,
  StatItem,
}

/* ─────────────────────────────────────────────────
   Static generation
───────────────────────────────────────────────── */
export async function generateStaticParams() {
  const articles = getAllArticles()
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const result = getArticleBySlug(params.slug)
  if (!result) return {}
  const { meta } = result
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: `${meta.title} | Digicorpex`,
      description: meta.description,
      type: 'article',
      publishedTime: meta.date,
    },
  }
}

/* ─────────────────────────────────────────────────
   Page
───────────────────────────────────────────────── */
export default function ArticlePage({
  params,
}: {
  params: { slug: string }
}) {
  const result = getArticleBySlug(params.slug)
  if (!result) notFound()

  const { meta, content } = result
  const allArticles = getAllArticles()
  const related = allArticles.filter((a) => a.slug !== meta.slug).slice(0, 2)

  /* Schema.org */
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    author: {
      '@type': 'Organization',
      name: 'Digicorpex',
      url: 'https://digicorpex.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Digicorpex',
    },
    url: `https://digicorpex.com/blog/${meta.slug}`,
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://digicorpex.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://digicorpex.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: meta.title,
        item: `https://digicorpex.com/blog/${meta.slug}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── Article header — max-w-4xl ────────────── */}
      <section className="pt-16 pb-12 px-8 bg-surface">
        <div className="max-w-4xl mx-auto">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs font-label uppercase tracking-widest text-on-surface-variant mb-10">
            <Link href="/blog" className="hover:text-on-surface transition-colors">
              Insights
            </Link>
            <ChevronRight size={12} className="opacity-40" />
            <span className="text-secondary">{meta.category}</span>
            <ChevronRight size={12} className="opacity-40" />
            <span className="text-on-surface-variant/60 truncate max-w-[200px]">
              {meta.title}
            </span>
          </nav>

          {/* H1 */}
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.1] text-on-surface mb-10">
            {meta.title}
          </h1>

          {/* Author + meta separator */}
          <div className="border-y border-outline-variant/15 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-container-high overflow-hidden shrink-0">
                <div
                  className="w-full h-full"
                  style={{
                    background: 'linear-gradient(135deg, #cadde9, #8fa0ac)',
                  }}
                />
              </div>
              <div>
                <p className="font-headline font-bold text-on-surface text-sm">
                  Équipe Digicorpex
                </p>
                <p className="text-[10px] font-label uppercase tracking-wider text-on-surface-variant">
                  Digital Strategy
                </p>
              </div>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-5 text-xs text-on-surface-variant">
              <span className="flex items-center gap-1.5">
                <Calendar size={13} />
                {meta.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} />
                {meta.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured image — max-w-7xl ────────────── */}
      <div className="px-8 mb-16 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="aspect-[21/9] w-full overflow-hidden rounded-sm bg-surface-container">
            <div
              className="w-full h-full"
              style={{
                background:
                  'linear-gradient(135deg, #ddeaf3 0%, #c0d4e4 35%, #a4b4be 70%, #8fa0ac 100%)',
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Article grid — 12 cols ────────────────── */}
      <section className="px-8 pb-24 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16">

            {/* Social sidebar — col-span-1 sticky */}
            <aside className="hidden lg:flex lg:col-span-1 justify-center">
              <div className="sticky top-24 border-r border-outline-variant/15 pr-4">
                <SocialSidebar />
              </div>
            </aside>

            {/* Article content — col-span-7 */}
            <article className="lg:col-span-7">
              {/* Lead paragraph override — first p gets special styling */}
              <div className="[&>p:first-child]:text-xl [&>p:first-child]:md:text-2xl [&>p:first-child]:font-light [&>p:first-child]:leading-relaxed [&>p:first-child]:text-on-surface/90 [&>p:first-child]:mb-12 [&>blockquote>p]:text-2xl [&>blockquote>p]:font-medium [&>blockquote>p]:italic [&>blockquote>p]:text-secondary [&>blockquote>p]:mb-0">
                <MDXRemote source={content} components={mdxComponents} />
              </div>
            </article>

            {/* Right sidebar — col-span-4 */}
            <aside className="lg:col-span-4 flex flex-col gap-8">

              {/* Expertise Badge block */}
              <div className="bg-tertiary-container p-8">
                <Award
                  size={28}
                  className="text-on-tertiary-container mb-4"
                  strokeWidth={1.5}
                />
                <h4 className="font-headline font-bold text-on-tertiary-container text-lg mb-2">
                  Architecture Certified
                </h4>
                <p className="text-sm text-on-tertiary-container/80 leading-relaxed">
                  Nos articles sont rédigés par des praticiens actifs — chaque
                  conseil est issu de projets réels.
                </p>
              </div>

              {/* Related articles */}
              {related.length > 0 && (
                <div>
                  <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant border-b border-outline-variant/20 pb-3 mb-4">
                    Articles connexes
                  </p>
                  <div className="flex flex-col gap-4">
                    {related.map((article) => (
                      <Link
                        key={article.slug}
                        href={`/blog/${article.slug}`}
                        className="group block"
                      >
                        <span className="text-[10px] font-label uppercase tracking-widest text-secondary block mb-1">
                          {article.category}
                        </span>
                        <h6 className="text-sm font-headline font-bold text-on-surface group-hover:text-secondary transition-colors duration-200 leading-snug">
                          {article.title}
                        </h6>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA audit */}
              <div className="bg-inverse-surface p-8">
                <p className="text-[10px] font-label uppercase tracking-widest text-inverse-on-surface mb-3">
                  Audit gratuit
                </p>
                <h4 className="font-headline font-bold text-surface text-lg mb-3 leading-snug">
                  Votre site performe-t-il vraiment ?
                </h4>
                <p className="text-sm text-inverse-on-surface leading-relaxed mb-6">
                  Analyse technique, SEO et UX en 48h. Sans engagement.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-surface-container-lowest text-on-surface px-5 py-2.5 rounded-sm text-sm font-headline font-bold hover:bg-surface transition-colors duration-300"
                >
                  Demander l&apos;audit
                  <ChevronsRight size={14} />
                </Link>
              </div>

            </aside>
          </div>
        </div>
      </section>

      {/* ── Author section — max-w-4xl ────────────── */}
      <section className="px-8 py-0 pb-24 bg-surface">
        <div className="max-w-4xl mx-auto">
          <div className="bg-surface-container-low p-12 flex flex-col sm:flex-row gap-8">

            {/* Avatar */}
            <div className="shrink-0">
              <div className="w-32 h-32 rounded-sm overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 bg-surface-container-high">
                <div
                  className="w-full h-full"
                  style={{
                    background: 'linear-gradient(135deg, #cadde9, #8fa0ac)',
                  }}
                />
              </div>
            </div>

            {/* Bio */}
            <div className="flex-1">
              <p className="font-headline font-bold text-on-surface text-xl mb-1">
                Équipe Digicorpex
              </p>
              <p className="text-xs font-label uppercase tracking-wider text-on-surface-variant mb-4">
                Agence Web &amp; Digital — Bordeaux
              </p>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                Nous accompagnons les entreprises dans la construction de leur
                présence digitale : développement web, design UX/UI et stratégie SEO.
                Chaque article est issu de nos retours terrain.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-label uppercase tracking-widest text-secondary hover:text-secondary-dim transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://digicorpex.com"
                  className="text-xs font-label uppercase tracking-widest text-secondary hover:text-secondary-dim transition-colors"
                >
                  Portfolio
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Lead Magnet — max-w-7xl ───────────────── */}
      <section className="px-8 pb-32 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="bg-secondary px-8 py-24 md:p-24 rounded-sm relative overflow-hidden">

            {/* Decorative band */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-1/2 pointer-events-none" />

            <div className="grid lg:grid-cols-2 gap-16 items-center relative">

              {/* Pitch */}
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-on-secondary/10 text-on-secondary text-xs font-label uppercase tracking-widest rounded-full mb-6">
                  Ressource gratuite
                </span>
                <h3 className="font-headline text-4xl md:text-5xl font-extrabold text-on-secondary tracking-tight leading-[1.1] mb-6">
                  Recevez notre guide
                  <br />
                  stratégie digitale 2026.
                </h3>
                <p className="text-on-secondary/80 text-lg leading-relaxed">
                  30 pages de frameworks actionnables pour bâtir une présence
                  digitale qui génère des leads qualifiés.
                </p>
              </div>

              {/* Form */}
              <div className="bg-white p-10 rounded-sm shadow-2xl">
                <h4 className="font-headline font-bold text-on-surface text-xl mb-6">
                  Accès immédiat
                </h4>

                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">
                      Adresse email
                    </label>
                    <input
                      type="email"
                      className="w-full bg-transparent border-0 border-b-2 border-primary-container focus:border-secondary rounded-none px-0 py-3 text-on-surface outline-none transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">
                      Votre secteur
                    </label>
                    <select className="w-full bg-transparent border-0 border-b-2 border-primary-container focus:border-secondary rounded-none px-0 py-3 text-on-surface outline-none transition-colors text-sm appearance-none">
                      <option value="">Sélectionner</option>
                      <option>Commerce & E-commerce</option>
                      <option>Services B2B</option>
                      <option>Santé & Bien-être</option>
                      <option>Autre</option>
                    </select>
                  </div>

                  <button className="w-full bg-secondary text-on-secondary py-3.5 rounded-sm font-headline font-bold text-sm uppercase tracking-widest hover:bg-secondary-dim transition-colors duration-300 mt-2">
                    Télécharger le guide
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}
