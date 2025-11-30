import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StructuredData from "@/components/StructuredData";
import SafeImage from "@/components/SafeImage";
import { urlFor } from "@/lib/sanity-client";
import { SanityImage } from "@/lib/types";

// In a real app, you would fetch post data based on the slug.
const post = {
    title: "Example News Article",
    author: { name: "DentiSystems News", image: null as SanityImage | null },
    publishedAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    mainImage: "https://picsum.photos/seed/news1/800/450",
    slug: { current: 'example-news' },
    excerpt: "This is a sample news article. In a production environment, this content would be fetched dynamically from a CMS.",
    body: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'This is sample content for the news article.' }] }
    ]
  };

export default async function NewsPostPage({
  params,
}: {
  params: { slug: string };
}) {

  const postImageUrl = post.mainImage;
  const authorImageUrl: string | undefined = post.author?.image ? urlFor(post.author.image).url() : undefined;


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
                          <AvatarImage src={authorImageUrl} alt={post.author.name ?? undefined} />
                          <AvatarFallback>{post.author.name?.charAt(0) || 'D'}</AvatarFallback>
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
                  src={postImageUrl ?? undefined}
                  alt={post.title}
                  fill
                  className="rounded-xl object-cover"
              />
          </div>
          
          <div className="prose prose-invert max-w-none text-foreground/90 prose-lg prose-h2:font-headline prose-h2:text-primary prose-a:text-primary prose-strong:text-foreground">
            {post.body && post.body[0] && post.body[0].children && post.body[0].children[0] && <p>{post.body[0].children[0].text}</p>}
          </div>
        </article>
      </main>
    </>
  );
}

export async function generateStaticParams() {
  return [{ slug: 'example-news' }];
}
