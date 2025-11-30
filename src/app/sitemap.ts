import { MetadataRoute } from 'next'
import { services } from '@/lib/data'

const staticRoutes: MetadataRoute.Sitemap = [
    { url: 'https://www.denti.systems', lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: 'https://www.denti.systems/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://www.denti.systems/contact', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: 'https://www.denti.systems/blog', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: 'https://www.denti.systems/news', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: 'https://www.denti.systems/case-studies', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://www.denti.systems/services', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://www.denti.systems/tools', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://www.denti.systems/pricing', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://www.denti.systems/privacy', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: 'https://www.denti.systems/terms', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: 'https://www.denti.systems/refund-policy', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
]
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    // In a real app, slugs would be fetched from a CMS
    const dynamicUrls: MetadataRoute.Sitemap = [
      { url: 'https://www.denti.systems/blog/example-post', lastModified: new Date(), priority: 0.6 },
      { url: 'https://www.denti.systems/case-studies/example-case-study', lastModified: new Date(), priority: 0.6 },
      { url: 'https://www.denti.systems/news/example-news', lastModified: new Date(), priority: 0.6 },
    ];

    const serviceUrls = services.map(service => ({
        url: `https://www.denti.systems/services/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as 'monthly',
        priority: 0.7
    }))

  return [
    ...staticRoutes,
    ...dynamicUrls,
    ...serviceUrls,
  ]
}
