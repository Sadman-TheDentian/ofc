
import StructuredData from "@/components/StructuredData";
import { client, urlFor } from "@/lib/sanity-client";
import { SanityImage, NewsArticle } from "@/lib/types";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import NewsDetailClient from "./NewsDetailClient";

const getNewsArticle = async (slug: string): Promise<NewsArticle | null> => {
  const query = groq`*[_type == "news" && slug.current == $slug][0]{
        _id,
        _updatedAt,
        title,
        slug,
        publishedAt,
        mainImage,
        excerpt,
        body,
        author->{
            name,
            image
        }
    }`;
  return await client.fetch(query, { slug });
};

export default async function NewsPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getNewsArticle(params.slug);

  if (!post) {
    notFound();
  }

  const postImageUrl = post.mainImage ? urlFor(post.mainImage as SanityImage)?.url() : undefined;

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
      <NewsDetailClient post={post} />
    </>
  );
}

export async function generateStaticParams() {
  const news = await client.fetch<NewsArticle[]>(groq`*[_type == "news"]{"slug": slug.current}`);
  return news.map(item => ({ slug: item.slug.current }));
}
