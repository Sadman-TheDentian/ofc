
import { client } from "@/lib/sanity";
import type { CaseStudy } from "@/lib/types";
import imageUrlBuilder from '@sanity/image-url'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
  return builder.image(source)
}

async function getCaseStudies(): Promise<CaseStudy[]> {
  const query = `*[_type == "caseStudy" && defined(slug.current)] {
    _id,
    title,
    "slug": slug.current,
    summary,
    mainImage
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function CaseStudiesPage() {
  const studies = await getCaseStudies();
  
  return (
    <div className="container py-12 md:py-20">
      <div className="text-center space-y-4 mb-12 bg-background/50 backdrop-blur-sm p-8 rounded-xl border border-border/50">
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
          Case Studies
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl">
          Explore our successful partnerships and discover how we solve complex
          security challenges.
        </p>
      </div>

      {studies && studies.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {studies.map(study => (
                 <Link key={study._id} href={`/case-studies/${study.slug}`} className="group">
                  <Card className="overflow-hidden h-full flex flex-col border-border transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 rounded-xl hover:-translate-y-2 bg-gradient-to-br from-card to-card/80 border-border/50">
                     {study.mainImage && (
                        <div className="relative h-48 w-full">
                            <Image
                            src={urlFor(study.mainImage).width(600).height(400).url()}
                            alt={study.title}
                            fill
                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                     )}
                    <CardHeader>
                      <CardTitle className="font-headline text-lg group-hover:text-primary transition-colors">
                        {study.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground text-sm">
                        {study.summary}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
            ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed rounded-lg">
          <h3 className="font-headline text-xl font-semibold">No Case Studies Found</h3>
          <p className="text-muted-foreground mt-2">Content is being managed in Sanity.io. Publish new case studies in the Studio.</p>
           <Button asChild variant="secondary" className="mt-4">
                <Link href="/studio">Go to Studio</Link>
           </Button>
        </div>
      )}
    </div>
  );
}
