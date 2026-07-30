import type { MetadataRoute } from 'next'
import { getInsights, getProjects } from '@/lib/content'
import { site } from '@/content/site'

/**
 * Static routes plus everything MDX-driven. Placeholder projects are excluded —
 * there is nothing on those pages worth indexing yet, and their metadata sets
 * `noindex` to match.
 */
const staticRoutes: { path: string; priority: number }[] = [
  { path: '/', priority: 1 },
  { path: '/products/', priority: 0.9 },
  { path: '/products/recd/', priority: 0.9 },
  { path: '/products/rats/', priority: 0.8 },
  { path: '/products/obd-monitoring/', priority: 0.7 },
  { path: '/services/', priority: 0.9 },
  { path: '/services/installation/', priority: 0.8 },
  { path: '/services/testing/', priority: 0.8 },
  { path: '/services/commissioning/', priority: 0.8 },
  { path: '/services/amc/', priority: 0.7 },
  { path: '/compliance/', priority: 0.9 },
  { path: '/projects/', priority: 0.6 },
  { path: '/insights/', priority: 0.7 },
  { path: '/about/', priority: 0.7 },
  { path: '/contact/', priority: 0.8 },
  { path: '/privacy-policy/', priority: 0.3 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const pages = staticRoutes.map((route) => ({
    url: `${site.url}${route.path}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: route.priority,
  }))

  const insights = getInsights().map((insight) => ({
    url: `${site.url}/insights/${insight.slug}/`,
    lastModified: insight.date ? new Date(insight.date) : lastModified,
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }))

  const projects = getProjects()
    .filter((project) => project.status === 'published')
    .map((project) => ({
      url: `${site.url}/projects/${project.slug}/`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    }))

  return [...pages, ...insights, ...projects]
}
