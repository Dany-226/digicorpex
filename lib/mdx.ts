import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface ArticleMeta {
  title: string
  description: string
  date: string
  readTime: string
  category: string
  slug: string
  coverImage?: string
}


/** Canonical display labels prevent typographic variants splitting category counts. */
export function normalizeCategory(category: string): string {
  const cleaned = category.normalize('NFC').trim().replace(/[’‘ʼ]/g, "'").replace(/\s+/g, ' ')
  const key = cleaned.toLocaleLowerCase('fr')
  const labels: Record<string, string> = {
    "cas d'usage": 'Cas d’usage',
    'stratégie': 'Stratégie',
    'seo': 'SEO',
    'seo local': 'SEO local',
  }
  return labels[key] ?? key.charAt(0).toLocaleUpperCase('fr') + key.slice(1)
}

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

// En dessous de ce seuil, un article est considéré comme un brouillon
// placeholder (ex: "Contenu à venir.") plutôt qu'un article publié - il
// n'apparaît ni dans les listes, ni dans le sitemap, ni dans les pages
// statiques générées (generateStaticParams), tant qu'il n'est pas rédigé.
const MIN_PUBLISHED_CONTENT_LENGTH = 100

export function getAllArticles(): ArticleMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'))

  const articles = files
    .map((filename) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8')
      const { data, content } = matter(raw)
      return { meta: data as ArticleMeta, content }
    })
    .filter(({ content }) => content.trim().length >= MIN_PUBLISHED_CONTENT_LENGTH)
    .map(({ meta }) => ({ ...meta, category: normalizeCategory(meta.category) }))

  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getArticleBySlug(slug: string): { meta: ArticleMeta; content: string } | null {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  if (content.trim().length < MIN_PUBLISHED_CONTENT_LENGTH) return null
  return { meta: { ...data, category: normalizeCategory(data.category) } as ArticleMeta, content }
}
