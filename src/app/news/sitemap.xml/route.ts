
const PUBLISHER_NAME = 'DentiSystems';
const BASE_URL = 'https://www.denti.systems';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  // In a real app, this would fetch from a CMS.
  const newsItems = [
    {
      slug: 'dentisystems-launches-ai-platform',
      title: 'DentiSystems Launches New AI-Powered Threat Intelligence Platform',
      publishedAt: new Date().toISOString(),
    }
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">`;

  for (const item of newsItems) {
    if (!item.title || !item.publishedAt || !item.slug) {
      continue;
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

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
