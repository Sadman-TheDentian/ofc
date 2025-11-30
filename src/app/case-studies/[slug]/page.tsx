
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SafeImage from "@/components/SafeImage";
import { CaseStudy, SanityImage } from "@/lib/types";
import { urlFor } from "@/lib/sanity-client";

async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
    if (slug === 'example-case-study') {
        return {
            _id: '1',
            slug: { current: 'example-case-study' },
            title: "Example Case Study",
            summary: "This is an example case study summary.",
            industry: "Technology",
            outcome: "Achieved a 99% reduction in security incidents.",
            mainImage: "https://picsum.photos/seed/cs1/1200/800",
            content: [{ _type: 'block', children: [{ _type: 'span', text: 'This is sample content for the case study.' }] }],
        };
    }
    return null;
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
    const study = await getCaseStudy(params.slug);

    if (!study) {
        notFound();
    }

    const imageUrl = typeof study.mainImage === 'string' ? study.mainImage : study.mainImage ? urlFor(study.mainImage as SanityImage)?.url() : undefined;

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
                            {study.content && study.content[0] && study.content[0].children && study.content[0].children[0] && <p>{study.content[0].children[0].text}</p>}
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
    return [{ slug: 'example-case-study' }];
}
