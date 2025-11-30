import { client } from '@/lib/sanity-client';
import type { SanityDocument } from "sanity";
import type { CaseStudy, Partner } from "@/lib/types";
import HomePageClient from './HomePageClient';
import StructuredData from '@/components/StructuredData';

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...3]{
  _id,
  title,
  slug,
  mainImage,
  author->{ name }
}`;

const CASE_STUDIES_QUERY = `*[_type == "caseStudy" && defined(slug.current)] {
  _id,
  title,
  "slug": slug.current,
  summary,
  mainImage
}`;

const PARTNERS_QUERY = `*[_type == "partner"]{
  _id,
  name,
  website,
  logo
}`;

export default async function Home() {
  const [blogPosts, caseStudies, partners] = await Promise.all([
      client.fetch<(SanityDocument & { author?: { name: string }})[]>(POSTS_QUERY),
      client.fetch<CaseStudy[]>(CASE_STUDIES_QUERY),
      client.fetch<Partner[]>(PARTNERS_QUERY)
  ]);

  return (
    <>
      <StructuredData />
      <HomePageClient
        blogPosts={blogPosts}
        caseStudies={caseStudies}
        partners={partners}
      />
    </>
  );
}
