
import { NewsArticle } from "@/lib/types";
import { client } from "@/lib/sanity-client";
import { groq } from "next-sanity";
import NewsClient from "./NewsClient";

async function getNews(): Promise<NewsArticle[]> {
  const query = groq`*[_type == "news"] | order(publishedAt desc) {
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

export default async function NewsPage() {
  const newsItems = await getNews();

  return <NewsClient newsItems={newsItems} />;
}
