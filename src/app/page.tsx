
import HomePageClient from './HomePageClient';
import StructuredData from '@/components/StructuredData';
import { client } from '@/lib/sanity-client';
import { BlogPost } from '@/lib/types';
import { groq } from 'next-sanity';


async function getPosts(): Promise<BlogPost[]> {
    const query = groq`*[_type == "post"] | order(publishedAt desc) [0...5] {
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
    }`;
    return await client.fetch(query);
}


export default async function Home() {
  const posts = await getPosts();

  return (
    <>
      <StructuredData />
      <HomePageClient blogPosts={posts} />
    </>
  );
}
