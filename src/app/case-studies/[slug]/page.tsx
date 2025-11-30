
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SafeImage from "@/components/SafeImage";
import { CaseStudy, SanityImage } from "@/lib/types";
import { client, urlFor } from "@/lib/sanity-client";
import { groq } from "next-sanity";
import { PortableText } from "@portabletext/react";


async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
    const query = groq`*[_type == "caseStudy" && slug.current == $slug][0]`;
    return await client.fetch(query, { slug });
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
    const study = await getCaseStudy(params.slug);

    if (!study) {
        notFound();
    }

    const imageUrl = study.mainImage ? urlFor(study.mainImage as SanityImage)?.url() : undefined;

    return (
        <div className="container py-12 md:py-20">
            <div className="max-w-4xl mx-auto">
                 <header className="text-center mb-12">
                    <Badge className="mb-4">{study.industry}</Badge>
                    <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl">
                        {study.title}
                    </h1>
                </header>

                <div className="relative h-96 w-full mb-12">
                    <SafeImage 
                        src={imageUrl}
                        alt={study.title}
                        fill
                        className="object-cover rounded-xl shadow-lg"
                    />
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <div className="prose prose-invert max-w-none text-foreground/90 prose-lg prose-h2:font-headline prose-h2:text-primary prose-a:text-primary prose-strong:text-foreground">
                            {study.content && <PortableText value={study.content} />}
                        </div>
                    </div>
                     <aside>
                        <Card className="bg-gradient-to-br from-card to-card/80 border-border/50">
                            <CardHeader>
                                <CardTitle>Outcome</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{study.outcome}</p>
                            </CardContent>
                        </Card>
                    </aside>
                </div>

            </div>
        </div>
    );
}

export async function generateStaticParams() {
    const studies = await client.fetch<CaseStudy[]>(groq`*[_type == "caseStudy"]{"slug": slug.current}`);
    return studies.map(study => ({ slug: study.slug.current }));
}
