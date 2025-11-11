
import { client } from '@/lib/sanity';
import type { SanityDocument } from 'next-sanity';

// The publisher name
const PUBLISHER_NAME = 'DentiSystems';
// The website's base URL
const BASE_URL = 'https://www.denti.systems';

/**
 * Escapes special characters in a string for use in XML.
 * @param str The string to escape.
 * @returns The escaped string.
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Generates the Google News sitemap.
 * This is a server-side route that fetches news articles and returns an XML sitemap.
 */
export async function GET() {
  try {
    // Fetch all news articles from Sanity, ordering by most recently published
    const newsItems = await client.fetch<SanityDocument[]>(`
      *[_type == "news" && defined(slug.current) && defined(publishedAt)] | order(publishedAt desc) {
        "slug": slug.current,
        title,
        publishedAt
      }
    `);

    // Start building the XML string
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">`;

    // Add each news article to the sitemap
    for (const item of newsItems) {
      if (!item.title || !item.publishedAt || !item.slug) {
        continue; // Skip items with missing required fields
      }

      const loc = `${BASE_URL}/news/${item.slug}`;
      const pubDate = new Date(item.publishedAt).toISOString();
      const title = escapeXml(item.title);

      xml += `
  <url>
    <loc>${loc}</loc>
    <news:news>
      <news:publication>
        <news:name>${PUBLISHER_NAME}</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${title}</news:title>
    </news:news>
  </url>`;
    }

    xml += `
</urlset>`;

    // Return the XML as a response with the correct content type
    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('Error generating news sitemap:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
}
