import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { client, urlFor } from "@/lib/sanity";
import type { CaseStudy } from "@/lib/types";

async function getCaseStudies(): Promise<CaseStudy[]> {
  const query = `*[_type == "caseStudy"]{
    _id,
    title,
    "slug": slug.current,
    summary,
    industry,
    outcome,
    mainImage
  }`;
  const studies = await client.fetch(query);
  return studies;
}

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();

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

      {caseStudies.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <Link href={`/case-studies/${study.slug}`} key={study._id} className="group">
              <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-2 bg-gradient-to-br from-card to-card/80 border-border/50">
                {study.mainImage && (
                    <div className="relative w-full h-48 object-cover">
                        <Image
                            src={urlFor(study.mainImage).url()}
                            alt={study.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                )}
                <CardHeader>
                  <CardTitle className="font-headline text-lg group-hover:text-primary transition-colors">
                    {study.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <p className="text-muted-foreground text-sm mb-4">
                    {study.summary}
                  </p>
                  <div className="flex gap-2">
                    {study.industry && <span className="text-xs font-medium bg-secondary text-secondary-foreground px-2 py-1 rounded-full">{study.industry}</span>}
                    {study.outcome && <span className="text-xs font-medium bg-secondary text-secondary-foreground px-2 py-1 rounded-full">{study.outcome}</span>}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed rounded-lg">
          <h3 className="font-headline text-xl font-semibold">No Case Studies Found</h3>
          <p className="text-muted-foreground mt-2">Check back soon for updates.</p>
        </div>
      )}
    </div>
  );
}
