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

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export function getAllArticles(): ArticleMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'))

  const articles = files.map((filename) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8')
    const { data } = matter(raw)
    return data as ArticleMeta
  })

  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getArticleBySlug(slug: string): { meta: ArticleMeta; content: string } | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return { meta: data as ArticleMeta, content }
}
