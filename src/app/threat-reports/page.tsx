
import { client } from "@/lib/sanity-client";
import { groq } from "next-sanity";
import { ThreatReport } from "@/lib/types";
import ThreatReportsClient from "./ThreatReportsClient";

async function getReports(): Promise<ThreatReport[]> {
  const query = groq`*[_type == "threatReport"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        mainImage,
    }`;
  return await client.fetch(query, {}, { next: { revalidate: 60 } });
}

export default async function ThreatReportsPage() {
  const reports = await getReports();

  return <ThreatReportsClient reports={reports} />;
}
