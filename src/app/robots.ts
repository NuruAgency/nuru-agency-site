import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/admin/'], // On cache l'espace d'administration
    },
    sitemap: 'https://nuruagency.com/sitemap.xml',
  }
}