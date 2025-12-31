
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import SafeImage from "@/components/SafeImage";
import { client, urlFor } from "@/lib/sanity-client";
import { groq } from "next-sanity";
import { PortableText } from "@portabletext/react";
import { SanityImage, WhitePaper } from "@/lib/types";

import WhitePaperDetailClient from "./WhitePaperDetailClient";

async function getWhitePaper(slug: string): Promise<WhitePaper | null> {
    const query = groq`*[_type == "whitePaper" && slug.current == $slug][0]`;
    const paper = await client.fetch(query, { slug });

    if (paper && paper.fileURL && paper.fileURL.asset) {
        const fileAsset = await client.fetch(groq`*[_id == $ref][0]`, { ref: paper.fileURL.asset._ref });
        paper.fileURL = fileAsset.url;
    }
    return paper;
}

export default async function WhitePaperPage({ params }: { params: { slug: string } }) {
    const paper = await getWhitePaper(params.slug);

    if (!paper) {
        notFound();
    }

    return (
        <WhitePaperDetailClient paper={paper} />
    );
}

export async function generateStaticParams() {
    const papers = await client.fetch<WhitePaper[]>(groq`*[_type == "whitePaper"]{"slug": slug.current}`);
    return papers.map(paper => ({ slug: paper.slug.current }));
}
