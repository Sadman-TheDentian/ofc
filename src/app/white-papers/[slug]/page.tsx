import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import SafeImage from "@/components/SafeImage";

async function getWhitePaper(slug: string) {
    if (slug === 'example-white-paper') {
        return {
            title: "Anatomy of a Zero-Day Exploit",
            publishedAt: new Date().toISOString(),
            mainImage: "https://picsum.photos/seed/wp1/1200/800",
            summary: [
                { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'This is a sample white paper summary. Full content would be here.' }] }
            ],
            fileURL: "#"
        };
    }
    return null;
}

export default async function WhitePaperPage({ params }: { params: { slug: string } }) {
    const paper = await getWhitePaper(params.slug);

    if (!paper) {
        notFound();
    }

    return (
        <div className="container py-12 md:py-20">
            <div className="max-w-4xl mx-auto">
                 <header className="text-center mb-12">
                    <p className="text-primary font-semibold mb-2">White Paper</p>
                    <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl">
                        {paper.title}
                    </h1>
                     <p className="mt-4 text-lg text-muted-foreground">
                        Published on {new Date(paper.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </header>

                <div className="relative h-96 w-full mb-12">
                    <SafeImage 
                        src={paper.mainImage}
                        alt={paper.title}
                        fill
                        className="object-cover rounded-xl shadow-lg"
                    />
                </div>
                
                <div className="prose prose-invert max-w-none text-foreground/90 prose-lg prose-h2:font-headline prose-h2:text-primary prose-a:text-primary prose-strong:text-foreground mb-12">
                    {paper.summary && <p>{paper.summary[0].children[0].text}</p>}
                </div>

                {paper.fileURL && (
                    <div className="text-center bg-secondary/50 p-8 rounded-xl">
                        <h2 className="font-headline text-2xl font-bold mb-4">Download the Full Document</h2>
                        <Button asChild size="lg">
                            <a href={paper.fileURL} download target="_blank" rel="noopener noreferrer">
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
  return [{ slug: 'example-white-paper' }];
}
