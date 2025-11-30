import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SafeImage from "@/components/SafeImage";

const staticPapers = [
    {
        _id: "1",
        title: "Anatomy of a Zero-Day Exploit",
        slug: { current: 'zero-day-exploit' },
        mainImage: "https://picsum.photos/seed/wp1/600/400",
        fileURL: "#"
    }
];


export default async function WhitePapersPage() {
  const papers = staticPapers;

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
            {papers.map(paper => {
                 const imageUrl = paper.mainImage;
                return (
                 <Link key={paper._id} href={`/white-papers/${paper.slug.current}`} className="group">
                  <Card className="overflow-hidden h-full flex flex-col border-border transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 rounded-xl hover:-translate-y-2 bg-gradient-to-br from-card to-card/80 border-border/50">
                     <div className="relative h-48 w-full">
                        <SafeImage
                          src={imageUrl ?? undefined}
                          alt={paper.title}
                          fill
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                     </div>
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
                )
            })}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed rounded-lg">
          <h3 className="font-headline text-xl font-semibold">No White Papers Found</h3>
          <p className="text-muted-foreground mt-2">Check back soon for new white papers.</p>
        </div>
      )}
    </div>
  );
}
