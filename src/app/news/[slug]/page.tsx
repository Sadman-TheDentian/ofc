
import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/lib/sanity";
import Link from "next/link";
import { Author } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StructuredData from "@/components/StructuredData";
import SafeImage from "@/components/SafeImage";

const NEWS_POST_QUERY = `*[_type == "news" && slug.current == $slug][0]{
  ...,
  "excerpt": pt::text(body),
  author->{
    _id,
    name,
    image
  }
}`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } }; // Revalidate every 30 seconds

export default async function NewsPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await client.fetch<SanityDocument & { author?: Author, excerpt?: string }>(NEWS_POST_QUERY, params, options);
  const postImageUrl = post.mainImage
    ? urlFor(post.mainImage)?.width(800).height(450).url() ?? null
    : null;
    
  const authorImageUrl = post.author?.image ? urlFor(post.author.image)?.width(40).height(40).url() : null;

  // Structured Data for Google News
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.denti.systems/news/${post.slug.current}`,
    },
    headline: post.title,
    image: postImageUrl ? [postImageUrl] : [],
    datePublished: new Date(post.publishedAt).toISOString(),
    dateModified: new Date(post._updatedAt).toISOString(),
    author: post.author ? {
      '@type': 'Person',
      name: post.author.name,
    } : {
      '@type': 'Organization',
      name: 'DentiSystems',
    },
    publisher: {
      '@type': 'Organization',
      name: 'DentiSystems',
      logo: {
        '@type': 'ImageObject',
        url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEirwhyibjl-3Guf8S6G442OtQmAdOzHrTcxPAuK6QxCGcAJ2I88K7Ee9DN-k_SONDddf2FeB4SwHO8l29PZ9HvHHlxJxiPDnfgrY1DBS60HsVaYv0uOAi08fm6KyrwhM7HPQhbQhL5ufVU_efX268tXM4rR8Vwok_UqbSar_b-B4btAigP5BFaU12PCjUE/s320/DENTI.SYSTEMS%20PNJ.png',
      },
    },
    description: post.excerpt,
  };


  return (
    <>
      <StructuredData data={jsonLd} />
      <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-8">
        <Link href="/news" className="text-primary hover:underline">
          ← Back to News
        </Link>
        <article>
          <h1 className="text-4xl font-bold font-headline mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 mb-8">
              {post.author && (
                  <div className="flex items-center gap-3">
                      <Avatar>
                          {authorImageUrl && <AvatarImage src={authorImageUrl} alt={post.author.name || ""} />}
                          <AvatarFallback>{post.author.name?.charAt(0) || 'A'}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-muted-foreground">{post.author.name}</span>
                  </div>
              )}
              <p className="text-muted-foreground">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
          </div>


          <div className="relative w-full aspect-video mb-8">
              <SafeImage
                  src={postImageUrl}
                  alt={post.title || ""}
                  fill
                  className="rounded-xl object-cover"
              />
          </div>
          
          <div className="prose prose-invert max-w-none text-foreground/90 prose-lg prose-h2:font-headline prose-h2:text-primary prose-a:text-primary prose-strong:text-foreground">
            {Array.isArray(post.body) && <PortableText value={post.body} />}
          </div>
        </article>
      </main>
    </>
  );
}

export async function generateStaticParams() {
  const posts = await client.fetch<SanityDocument[]>(`*[_type == "news" && defined(slug.current)]{"slug": slug.current}`);
  return posts
    .filter(post => post.slug && post.slug.current) // Filter out items with no slug
    .map(post => ({ slug: post.slug.current }));
}
