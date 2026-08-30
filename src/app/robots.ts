import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://awesome-ai-tools.dev'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/router/config', '/api/v1/'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
