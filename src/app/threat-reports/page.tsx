
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SafeImage from "@/components/SafeImage";
import { client, urlFor } from "@/lib/sanity-client";
import { groq } from "next-sanity";
import { ThreatReport, SanityImage } from "@/lib/types";

async function getReports(): Promise<ThreatReport[]> {
    const query = groq`*[_type == "threatReport"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        mainImage,
    }`;
    return await client.fetch(query);
}


export default async function ThreatReportsPage() {
  const reports = await getReports();

  return (
    <div className="container py-12 md:py-20">
      <div className="text-center space-y-4 mb-12 bg-background/50 backdrop-blur-sm p-8 rounded-xl border border-border/50">
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
          Threat Reports
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl">
          In-depth analysis of emerging cyber threats and attack vectors from the DentiSystems research team.
        </p>
      </div>

       {reports && reports.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reports.map(report => {
                 const imageUrl = report.mainImage ? urlFor(report.mainImage as SanityImage).url() : undefined;
                return (
                 <Link key={report._id} href={`/threat-reports/${report.slug.current}`} className="group">
                  <Card className="overflow-hidden h-full flex flex-col border-border transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 rounded-xl hover:-translate-y-2 bg-gradient-to-br from-card to-card/80 border-border/50">
                     <div className="relative h-48 w-full">
                        <SafeImage
                          src={imageUrl ?? undefined}
                          alt={report.title}
                          fill
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                     </div>
                    <CardHeader>
                      <CardTitle className="font-headline text-lg group-hover:text-primary transition-colors">
                        {report.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground text-sm">
                        Click to view details and download the report.
                      </p>
                    </CardContent>
                  </Card>
                </Link>
                )
            })}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed rounded-lg">
          <h3 className="font-headline text-xl font-semibold">No Threat Reports Found</h3>
          <p className="text-muted-foreground mt-2">Check back soon for new reports.</p>
        </div>
      )}
    </div>
  );
}
