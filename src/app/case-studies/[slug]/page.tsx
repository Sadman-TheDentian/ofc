import { client } from "@/lib/sanity-client";
import type { CaseStudy } from "@/lib/types";
import { notFound } from "next/navigation";
import imageUrlBuilder from '@sanity/image-url';
import { PortableText } from '@portabletext/react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SafeImage from "@/components/SafeImage";
import type { SanityImageSource } from 'sanity';
import type { ImageUrlBuilder } from '@sanity/image-url';

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImageSource): ImageUrlBuilder {
  return builder.image(source);
}

async function getCaseStudy(slug: string): Promise<CaseStudy> {
    const query = `*[_type == "caseStudy" && slug.current == $slug][0]`;
    const study = await client.fetch(query, { slug });
    return study;
}


const ptComponents = {
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <div className="relative my-8">
            <SafeImage
                src={urlFor(value).width(1200).height(800).fit('max').auto('format').url()}
                width={1200}
                height={800}
                alt={value.alt || ' '}
                className="rounded-lg"
            />
        </div>
      )
    }
  }
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
                        src={urlFor(study.mainImage).width(1200).height(800).url()}
                        alt={study.title}
                        fill
                        className="object-cover rounded-xl shadow-lg"
                    />
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <div className="prose prose-invert max-w-none text-foreground/90 prose-lg prose-h2:font-headline prose-h2:text-primary prose-a:text-primary prose-strong:text-foreground">
                            {study.content && <PortableText value={study.content} components={ptComponents} />}
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
  const studies = await client.fetch<CaseStudy[]>(`*[_type == "caseStudy" && defined(slug.current)]{"slug": slug.current}`);
  return studies
    .filter(study => study.slug && study.slug.current) // Filter out items with no slug
    .map(study => ({ slug: study.slug.current }));
}
