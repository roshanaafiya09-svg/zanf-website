import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

/**
 * MDX content layer for Insights and Projects.
 *
 * Files on disk, frontmatter parsed at build time, everything static. No CMS in
 * v1 — but the shape here is deliberately the shape a headless CMS would
 * return, so swapping the source later touches this file and nothing else.
 */

const root = path.join(process.cwd(), 'content')

export type Insight = {
  slug: string
  title: string
  description: string
  date: string
  readingTime: string
  topic: string
  body: string
}

export type Project = {
  slug: string
  title: string
  sector: string
  location: string
  dgRating: string
  scope: string
  product: string
  outcome: string
  /** `pending` renders the card visibly marked as awaiting client release. */
  status: 'pending' | 'published'
  image: string | null
  body: string
}

function readCollection(dir: string) {
  const full = path.join(root, dir)
  if (!fs.existsSync(full)) return []

  return fs
    .readdirSync(full)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(full, file), 'utf8')
      const { data, content } = matter(raw)
      return { slug: file.replace(/\.mdx$/, ''), data, body: content }
    })
}

export function getInsights(): Insight[] {
  return readCollection('insights')
    .map(({ slug, data, body }) => ({
      slug,
      title: String(data.title ?? slug),
      description: String(data.description ?? ''),
      date: String(data.date ?? ''),
      readingTime: String(data.readingTime ?? ''),
      topic: String(data.topic ?? 'Technical'),
      body,
    }))
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getInsight(slug: string): Insight | undefined {
  return getInsights().find((item) => item.slug === slug)
}

export function getProjects(): Project[] {
  return readCollection('projects').map(({ slug, data, body }) => ({
    slug,
    title: String(data.title ?? slug),
    sector: String(data.sector ?? ''),
    location: String(data.location ?? ''),
    dgRating: String(data.dgRating ?? ''),
    scope: String(data.scope ?? ''),
    product: String(data.product ?? ''),
    outcome: String(data.outcome ?? ''),
    status: data.status === 'published' ? 'published' : 'pending',
    image: data.image ? String(data.image) : null,
    body,
  }))
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((item) => item.slug === slug)
}

export function formatDate(iso: string) {
  if (!iso) return ''
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
