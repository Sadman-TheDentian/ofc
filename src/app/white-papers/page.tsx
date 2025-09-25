
import { client } from "@/lib/sanity";
import type { SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PAPERS_QUERY = `*[_type == "whitePaper" && defined(slug.current)]|order(publishedAt desc){
  _id,
  title,
  slug,
  mainImage,
  "fileURL": documentFile.asset->url
}`;

const { projectId, dataset } = client.config();
const urlFor = (source: any) =>
  projectId && dataset ? imageUrlBuilder({ projectId, dataset }).image(source) : null;

export default async function WhitePapersPage() {
  const papers = await client.fetch<SanityDocument[]>(PAPERS_QUERY);

  return (
    <div className="container py-12 md:py-20">
      <div className="text-center space-y-4 mb-12 bg-background/50 backdrop-blur-sm p-8 rounded-xl border border-border/50">
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
          White Papers
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl">
          Download our detailed reports on security architecture, compliance, and industry best practices.
        </p>
      </div>

       {papers && papers.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {papers.map(paper => (
                 <Link key={paper._id} href={`/white-papers/${paper.slug.current}`} className="group">
                  <Card className="overflow-hidden h-full flex flex-col border-border transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 rounded-xl hover:-translate-y-2 bg-gradient-to-br from-card to-card/80 border-border/50">
                     {paper.mainImage && (
                        <div className="relative h-48 w-full">
                            <Image
                            src={urlFor(paper.mainImage).width(600).height(400).url()}
                            alt={paper.title}
                            fill
                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                     )}
                    <CardHeader>
                      <CardTitle className="font-headline text-lg group-hover:text-primary transition-colors">
                        {paper.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground text-sm">
                        Click to view details and download the document.
                      </p>
                    </CardContent>
                  </Card>
                </Link>
            ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed rounded-lg">
          <h3 className="font-headline text-xl font-semibold">No White Papers Found</h3>
          <p className="text-muted-foreground mt-2">Content is being managed in Sanity.io. Publish new white papers in the Studio.</p>
           <Button asChild variant="secondary" className="mt-4">
                <Link href="/studio">Go to Studio</Link>
           </Button>
        </div>
      )}
    </div>
  );
}
