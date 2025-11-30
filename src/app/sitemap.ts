
import { MetadataRoute } from 'next'
import { services } from '@/lib/data'
import { client } from './lib/sanity-client';
import { groq } from 'next-sanity';

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
    const baseUrl = 'https://www.denti.systems';

    const postUrls = await client.fetch(groq`*[_type == "post"]{"slug": slug.current, "lastModified": _updatedAt}`).then((res) => (
        res.map(({slug, lastModified}: {slug: string, lastModified: Date}) => ({
            url: `${baseUrl}/blog/${slug}`,
            lastModified: lastModified,
        }))
    ));
    
    const caseStudyUrls = await client.fetch(groq`*[_type == "caseStudy"]{"slug": slug.current, "lastModified": _updatedAt}`).then((res) => (
        res.map(({slug, lastModified}: {slug: string, lastModified: Date}) => ({
            url: `${baseUrl}/case-studies/${slug}`,
            lastModified: lastModified,
        }))
    ));
    
    const newsUrls = await client.fetch(groq`*[_type == "news"]{"slug": slug.current, "lastModified": _updatedAt}`).then((res) => (
        res.map(({slug, lastModified}: {slug: string, lastModified: Date}) => ({
            url: `${baseUrl}/news/${slug}`,
            lastModified: lastModified,
        }))
    ));

    const serviceUrls = services.map(service => ({
        url: `${baseUrl}/services/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as 'monthly',
        priority: 0.7
    }))

  return [
    ...staticRoutes,
    ...postUrls,
    ...caseStudyUrls,
    ...newsUrls,
    ...serviceUrls,
  ]
}
