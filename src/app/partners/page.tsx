
import { client } from "@/lib/sanity-client";
import { groq } from "next-sanity";
import PartnersClient from "./PartnersClient";

async function getPartners() {
  const query = groq`*[_type == "partner"]`;
  return await client.fetch(query);
}

export default async function PartnersPage() {
  const partners = await getPartners();
  return <PartnersClient partners={partners} />;
}
