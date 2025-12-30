
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity-client";
import { groq } from "next-sanity";
import { ThreatReport } from "@/lib/types";
import ThreatReportDetailClient from "./ThreatReportDetailClient";

async function getReport(slug: string): Promise<ThreatReport | null> {
    const query = groq`*[_type == "threatReport" && slug.current == $slug][0]`;
    const report = await client.fetch(query, { slug });
    if (report && report.fileURL) {
        // The fileURL is an object with an asset ref, we need to build the actual URL
        const fileAsset = await client.fetch(groq`*[_id == $ref][0]`, { ref: report.fileURL.asset._ref });
        report.fileURL = fileAsset.url;
    }
    return report;
}

export default async function ThreatReportPage({ params }: { params: { slug: string } }) {
    const report = await getReport(params.slug);

    if (!report) {
        notFound();
    }

    return <ThreatReportDetailClient report={report} />;
}

export async function generateStaticParams() {
    const reports = await client.fetch<ThreatReport[]>(groq`*[_type == "threatReport"]{"slug": slug.current}`);
    return reports.map(report => ({ slug: report.slug.current }));
}
