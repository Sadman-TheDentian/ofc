
import { client } from "@/lib/sanity";
import type { SanityDocument } from "next-sanity";
import { notFound } from "next/navigation";
import imageUrlBuilder from '@sanity/image-url';
import { PortableText } from '@portabletext/react';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import SafeImage from "@/components/SafeImage";

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

async function getWhitePaper(slug: string) {
    const query = `*[_type == "whitePaper" && slug.current == $slug][0]{
      ...,
      "fileURL": documentFile.asset->url
    }`;
    const paper = await client.fetch(query, { slug });
    return paper;
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
                        src={urlFor(paper.mainImage)?.width(1200).height(800).url()}
                        alt={paper.title}
                        fill
                        className="object-cover rounded-xl shadow-lg"
                    />
                </div>
                
                <div className="prose prose-invert max-w-none text-foreground/90 prose-lg prose-h2:font-headline prose-h2:text-primary prose-a:text-primary prose-strong:text-foreground mb-12">
                    {paper.summary && <PortableText value={paper.summary} />}
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
  const papers = await client.fetch<SanityDocument[]>(`*[_type == "whitePaper" && defined(slug.current)]{"slug": slug.current}`);
  return papers
    .filter(paper => paper.slug?.current)
    .map(paper => ({ slug: paper.slug.current }));
}
