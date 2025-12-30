
import { client } from "@/lib/sanity-client";
import { groq } from "next-sanity";
import { WhitePaper } from "@/lib/types";
import WhitePapersClient from "./WhitePapersClient";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Intel Assets | White Papers | DentiSystems",
  description: "Proprietary research and technical validation reports engineered for architectural auditing and sovereign compliance.",
};

async function getWhitePapers(): Promise<WhitePaper[]> {
  const query = groq`*[_type == "whitePaper"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        mainImage
    }`;
  return await client.fetch(query);
}

export default async function WhitePapersPage() {
  const papers = await getWhitePapers();
  return <WhitePapersClient papers={papers} />;
}
