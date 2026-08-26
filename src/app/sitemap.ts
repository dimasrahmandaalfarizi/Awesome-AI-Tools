import { MetadataRoute } from 'next'
import { TOOLS, CATEGORIES, AI_AGENTS } from '@/data/mock'
import { routing } from '@/i18n/routing'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://awesome-ai-tools.dev'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = []

  const staticPages = [
    '',
    '/categories',
    '/skills',
    '/agents',
    '/apis',
    '/router',
    '/chat',
    '/compare',
    '/stack',
    '/docs',
    '/search'
  ]

  routing.locales.forEach((locale) => {
    // 1. Static Pages
    staticPages.forEach((page) => {
      routes.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1.0 : 0.8,
      })
    })

    // 2. Categories
    CATEGORIES.forEach((cat) => {
      routes.push({
        url: `${BASE_URL}/${locale}/categories/${cat.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    })

    // 3. Tools
    TOOLS.forEach((tool) => {
      routes.push({
        url: `${BASE_URL}/${locale}/tools/${tool.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    })

    // 4. Subagents
    AI_AGENTS.forEach((agent) => {
      routes.push({
        url: `${BASE_URL}/${locale}/agents/${agent.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    })
  })

  return routes
}
