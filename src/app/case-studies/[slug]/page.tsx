
import { notFound } from "next/navigation";

export default function CaseStudyPage() {
    // This page is disabled because Sanity is not configured.
    notFound();
}

export async function generateStaticParams() {
  // Return an empty array because we don't want to generate any static pages for this route.
  return [];
}
