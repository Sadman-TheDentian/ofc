
import HomePageClient from './HomePageClient';
import StructuredData from '@/components/StructuredData';
import { client } from '@/lib/sanity-client';
import { BlogPost, SecurityDivision } from '@/lib/types';
import { groq } from 'next-sanity';


async function getData(): Promise<{ posts: BlogPost[], divisions: SecurityDivision[] }> {
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
      }
    }`;
    return await client.fetch(query);
}


export default async function Home() {
  const { posts, divisions } = await getData();

  return (
    <>
      <StructuredData />
      <HomePageClient blogPosts={posts} securityDivisions={divisions} />
    </>
  );
}
