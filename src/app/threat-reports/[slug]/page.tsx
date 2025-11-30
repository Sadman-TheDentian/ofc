import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import SafeImage from "@/components/SafeImage";

async function getReport(slug: string) {
    if (slug === 'example-report') {
        return {
            title: "Example Threat Report",
            publishedAt: new Date().toISOString(),
            mainImage: "https://picsum.photos/seed/report1/1200/800",
            summary: [
                { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'This is a summary of the example threat report. Full content would be here.' }] }
            ],
            fileURL: "#" // Placeholder link
        };
    }
    return null;
}

export default async function ThreatReportPage({ params }: { params: { slug: string } }) {
    const report = await getReport(params.slug);

    if (!report) {
        notFound();
    }

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
                        src={report.mainImage}
                        alt={report.title}
                        fill
                        className="object-cover rounded-xl shadow-lg"
                    />
                </div>
                
                <div className="prose prose-invert max-w-none text-foreground/90 prose-lg prose-h2:font-headline prose-h2:text-primary prose-a:text-primary prose-strong:text-foreground mb-12">
                    {report.summary && <p>{report.summary[0].children[0].text}</p>}
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
  return [{ slug: 'example-report' }];
}
