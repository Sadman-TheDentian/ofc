import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SafeImage from "@/components/SafeImage";

// In a real app, this would be fetched from a CMS
const getCaseStudy = async (slug: string) => {
    if (slug === 'example-case-study') {
        return {
            title: "Securing a Global Financial Network",
            industry: "Financial Services",
            mainImage: "https://picsum.photos/seed/cs1/1200/800",
            outcome: "Reduced critical vulnerabilities by 95% and achieved 100% compliance with industry regulations.",
            content: [
                { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'This is a sample case study. In a real application, this content would be fetched from a CMS like Sanity.io and rendered as rich text.' }] }
            ]
        };
    }
    return null;
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
    const study = await getCaseStudy(params.slug);

    if (!study) {
        notFound();
    }

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
                        src={study.mainImage}
                        alt={study.title}
                        fill
                        className="object-cover rounded-xl shadow-lg"
                    />
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <div className="prose prose-invert max-w-none text-foreground/90 prose-lg prose-h2:font-headline prose-h2:text-primary prose-a:text-primary prose-strong:text-foreground">
                            {study.content && <p>{study.content[0].children[0].text}</p>}
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
