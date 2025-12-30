
import { BlogPost } from "@/lib/types";
import { client } from "@/lib/sanity-client";
import { groq } from "next-sanity";
import BlogClient from "./BlogClient";

async function getPosts(): Promise<BlogPost[]> {
  const query = groq`*[_type == "post"] | order(publishedAt desc) {
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

export default async function BlogPage() {
  const posts = await getPosts();

  return <BlogClient posts={posts} />;
}
