
import HomePageClient from './HomePageClient';
import StructuredData from '@/components/StructuredData';
import { client } from '@/lib/sanity-client';
import { BlogPost, NewsArticle, SecurityDivision } from '@/lib/types';
import { groq } from 'next-sanity';


async function getData(): Promise<{ posts: BlogPost[], divisions: SecurityDivision[], news: NewsArticle[] }> {
    const query = groq`{
      "posts": *[_type == "post"] | order(publishedAt desc) [0...5] {
        _id,
        title,
        slug,
        publishedAt,
        mainImage,
        excerpt,
        author->{
          name,
          image
        }
      },
      "divisions": *[_type == "securityDivision"] | order(order asc) {
        _id,
        title,
        description,
        icon,
        slug
      },
      "news": *[_type == "news"] | order(publishedAt desc) [0...5] {
        _id,
        title,
        slug,
        publishedAt,
        mainImage,
        author->{
          name,
          image
        }
      }
    }`;
    return await client.fetch(query);
}


export default async function Home() {
  const { posts, divisions, news } = await getData();

  return (
    <>
      <StructuredData />
      <HomePageClient blogPosts={posts} securityDivisions={divisions} newsArticles={news} />
    </>
  );
}
