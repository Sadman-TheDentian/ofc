
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import SafeImage from "@/components/SafeImage";
import { client, urlFor } from "@/lib/sanity-client";
import { groq } from "next-sanity";
import { PortableText } from "@portabletext/react";
import { SanityImage, ThreatReport } from "@/lib/types";

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
    
    const imageUrl = report.mainImage ? urlFor(report.mainImage as SanityImage).url() : undefined;


    return (
        <div className="container py-12 md:py-20">
            <div className="max-w-4xl mx-auto">
                 <header className="text-center mb-12">
                    <p className="text-primary font-semibold mb-2">Threat Report</p>
                    <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl">
                        {report.title}
                    </h1>
                     <p className="mt-4 text-lg text-muted-foreground">
                        Published on {new Date(report.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </header>

                <div className="relative h-96 w-full mb-12">
                    <SafeImage 
                        src={imageUrl}
                        alt={report.title}
                        fill
                        className="object-cover rounded-xl shadow-lg"
                    />
                </div>
                
                <div className="prose prose-invert max-w-none text-foreground/90 prose-lg prose-h2:font-headline prose-h2:text-primary prose-a:text-primary prose-strong:text-foreground mb-12">
                    {report.summary && <PortableText value={report.summary} />}
                </div>

                {report.fileURL && (
                    <div className="text-center bg-secondary/50 p-8 rounded-xl">
                        <h2 className="font-headline text-2xl font-bold mb-4">Download the Full Report</h2>
                        <Button asChild size="lg">
                            <a href={report.fileURL} download target="_blank" rel="noopener noreferrer">
                                <Download className="mr-2 h-5 w-5" />
                                Download PDF
                            </a>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export async function generateStaticParams() {
    const reports = await client.fetch<ThreatReport[]>(groq`*[_type == "threatReport"]{"slug": slug.current}`);
    return reports.map(report => ({ slug: report.slug.current }));
}
