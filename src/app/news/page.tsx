
import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { client } from "@/lib/sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image from "next/image";
import { Author } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const NEWS_QUERY = `*[
  _type == "news"
  && defined(slug.current)
]|order(publishedAt desc){
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  excerpt,
  author->{
    name,
    image
  }
}`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } }; // Revalidate every 30 seconds

export default async function NewsPage() {
  const newsItems = await client.fetch<(SanityDocument & { author?: Author, excerpt?: string })[]>(NEWS_QUERY, {}, options);

  return (
    <div className="container py-12 md:py-20">
      <div className="text-center space-y-4 mb-12 bg-background/50 backdrop-blur-sm p-8 rounded-xl border border-border/50">
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
          DentiSystems Newsroom
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl">
          The latest announcements, media coverage, and updates from DentiSystems.
        </p>
      </div>

      <div className="max-w-3xl mx-auto grid gap-12">
        {newsItems.map((item) => {
          const itemImageUrl = item.mainImage
            ? urlFor(item.mainImage)?.width(800).height(450).url()
            : null;
          const authorImageUrl = item.author?.image ? urlFor(item.author.image)?.width(40).height(40).url() : null;

          return (
            <Link href={`/news/${item.slug.current}`} key={item._id} className="group block">
              <Card className="flex flex-col overflow-hidden border-border/50 bg-gradient-to-br from-card to-card/80 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 rounded-xl hover:-translate-y-1">
                {itemImageUrl && (
                  <div className="relative w-full aspect-video">
                    <Image
                      src={itemImageUrl}
                      alt={item.title || ""}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                )}
                <div className="flex flex-col flex-1 p-6">
                  <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors mb-2">
                    {item.title}
                  </CardTitle>

                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    {item.author && (
                        <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                                {authorImageUrl && <AvatarImage src={authorImageUrl} alt={item.author.name || ""} />}
                                <AvatarFallback>{item.author.name?.charAt(0) || 'A'}</AvatarFallback>
                            </Avatar>
                            <span>{item.author.name}</span>
                        </div>
                    )}
                     <p>
                        {new Date(item.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>

                  {item.excerpt && (
                    <p className="text-muted-foreground text-sm flex-grow">
                      {item.excerpt}
                    </p>
                  )}
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
