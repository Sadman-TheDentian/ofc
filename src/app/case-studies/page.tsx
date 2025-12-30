
import { CaseStudy } from "@/lib/types";
import { client } from "@/lib/sanity-client";
import { groq } from "next-sanity";
import CaseStudiesClient from "./CaseStudiesClient";

async function getCaseStudies(): Promise<CaseStudy[]> {
  const query = groq`*[_type == "caseStudy"]{
        _id,
        title,
        slug,
        summary,
        mainImage
    }`;
  return await client.fetch(query);
}

export default async function CaseStudiesPage() {
  const studies = await getCaseStudies();

  return <CaseStudiesClient studies={studies} />;
}
