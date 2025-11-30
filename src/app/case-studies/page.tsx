import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import { client, urlFor } from "@/lib/sanity-client";
import { CaseStudy } from "@/lib/types";

async function getCaseStudies(): Promise<CaseStudy[]> {
  const query = `*[_type == "caseStudy"]{
    _id,
    title,
    slug,
    summary,
    mainImage
  }`;
  try {
    const studies = await client.fetch<CaseStudy[]>(query);
    return studies;
  } catch (error) {
    console.error("Failed to fetch case studies:", error);
    return [];
  }
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {studies.map(study => {
                const imageUrl = study.mainImage ? urlFor(study.mainImage)?.url() : undefined;
                return (
                 <Link key={study._id} href={`/case-studies/${study.slug.current}`} className="group">
                  <Card className="overflow-hidden h-full flex flex-col border-border transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 rounded-xl hover:-translate-y-2 bg-gradient-to-br from-card to-card/80 border-border/50">
                     <div className="relative h-48 w-full">
                        <SafeImage
                          src={imageUrl}
                          alt={study.title}
                          fill
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                     </div>
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
            )})}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed rounded-lg">
          <h3 className="font-headline text-xl font-semibold">No Case Studies Found</h3>
          <p className="text-muted-foreground mt-2">Content is being managed in Sanity.io. Publish new case studies in the Studio.</p>
        </div>
      )}
    </div>
  );
}
