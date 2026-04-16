import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { ArticleMeta } from '@/lib/mdx'

interface BlogPreviewProps {
  articles: ArticleMeta[]
}

export default function BlogPreview({ articles }: BlogPreviewProps) {
  if (articles.length === 0) return null

  const [featured, ...rest] = articles
  const sideArticles = rest.slice(0, 3)

  return (
    <section className="py-24 md:py-32 px-8 bg-surface">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <h2 className="font-headline text-3xl font-bold tracking-tight text-on-surface mb-4">
              Insights & Stratégie
            </h2>
            <div className="w-20 h-1.5 bg-secondary rounded-sm" />
          </div>
          <Link
            href="/blog"
            className="hidden md:flex items-center gap-2 text-xs font-label uppercase tracking-widest text-secondary hover:text-secondary-dim transition-colors"
          >
            Tous les articles
            <ArrowRight size={12} />
          </Link>
        </div>

        {/* Asymmetric grid 8/4 */}
        <div className="grid lg:grid-cols-12 gap-16">

          {/* Featured article -col-span-8 */}
          <article className="lg:col-span-8">
            <Link href={`/blog/${featured.slug}`} className="block group">
              {/* Image */}
              <div className="relative aspect-[16/9] overflow-hidden rounded-sm mb-8">
                <img src="/images/graphs.jpg" alt="Data & performance" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-700/30 to-blue-900/10" />
              </div>

              {/* Meta */}
              <span className="text-[11px] font-label uppercase tracking-widest text-secondary">
                {featured.category}
              </span>

              {/* Title */}
              <h3 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-on-surface mt-3 mb-4 group-hover:text-secondary transition-colors duration-300">
                {featured.title}
              </h3>

              {/* Excerpt */}
              <p className="text-lg text-on-surface-variant leading-relaxed mb-6 max-w-2xl">
                {featured.description}
              </p>

              {/* Read link */}
              <span className="inline-flex items-center gap-2 text-sm font-label font-semibold text-secondary uppercase tracking-widest group-hover:gap-3 transition-all duration-300">
                Lire l'article
                <ArrowRight size={14} />
              </span>
            </Link>
          </article>

          {/* Sidebar -col-span-4 */}
          <aside className="lg:col-span-4">
            <div className="flex flex-col">
              {sideArticles.map((article, i) => (
                <div key={article.slug}>
                  <Link href={`/blog/${article.slug}`} className="group block py-6">
                    <span className="text-[11px] font-label uppercase tracking-widest text-secondary block mb-2">
                      {article.category}
                    </span>
                    <h4 className="font-headline font-bold text-on-surface group-hover:text-secondary transition-colors duration-300 leading-snug">
                      {article.title}
                    </h4>
                  </Link>
                  {i < sideArticles.length - 1 && (
                    <div className="h-px bg-outline-variant/30" />
                  )}
                </div>
              ))}
            </div>

            {/* Mobile -"Tous les articles" */}
            <Link
              href="/blog"
              className="md:hidden mt-8 inline-flex items-center gap-2 text-xs font-label uppercase tracking-widest text-secondary"
            >
              Tous les articles
              <ArrowRight size={12} />
            </Link>
          </aside>

        </div>
      </div>
    </section>
  )
}
