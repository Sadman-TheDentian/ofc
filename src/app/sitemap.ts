import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity-client'
import { services } from '@/lib/data'
import { SanityDocument } from 'sanity'

type SanitySlug = {
    _id: string;
    slug: {
        current: string;
    },
    publishedAt: string;
    _type: string;
}

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

    const sanityQuery = `*[_type in ["post", "caseStudy", "threatReport", "whitePaper", "news"] && defined(slug.current)]{
        "slug": slug.current,
        _id,
        _type,
        publishedAt
    }`;
    const sanitySlugs = await client.fetch<SanitySlug[]>(sanityQuery);

    const dynamicUrls = sanitySlugs.map(item => {
        let route = '';
        switch(item._type) {
            case 'post': route = '/blog'; break;
            case 'caseStudy': route = '/case-studies'; break;
            case 'news': route = '/news'; break;
            default: route = `/${item._type}s`; break;
        }
        return {
            url: `https://www.denti.systems${route}/${item.slug}`,
            lastModified: new Date(item.publishedAt),
            changeFrequency: 'yearly' as 'yearly',
            priority: 0.6
        }
    })

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
