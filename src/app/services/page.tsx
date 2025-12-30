import { services } from "@/lib/data";
import { client, urlFor } from "@/lib/sanity-client";
import { groq } from "next-sanity";
import { SecurityDivision } from "@/lib/types";
import ServicesClient from "./ServicesClient";

async function getDivisions(): Promise<SecurityDivision[]> {
  const query = groq`*[_type == "securityDivision"] | order(order asc) {
    _id,
    title,
    description,
    icon,
    mainImage,
    slug
  }`;
  return await client.fetch(query);
}

export default async function ServicesPage() {
  const sanityDivisions = await getDivisions();
  const displayServices = sanityDivisions && sanityDivisions.length > 0 ? sanityDivisions : services;

  // Process Sanity images for the client component if needed
  const processedServices = displayServices.map(service => {
    const isSanity = '_id' in service;
    const imageUrl = isSanity
      ? (service.mainImage ? urlFor(service.mainImage)?.url() : undefined)
      : (service as any).imageUrl;

    return {
      ...service,
      imageUrl // Ensure we pass the processed URL string
    };
  });

  return (
    <ServicesClient services={processedServices} />
  );
}
