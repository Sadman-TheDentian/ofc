
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SafeImage from "@/components/SafeImage";
import { SanityImage, NewsArticle } from "@/lib/types";
import { client, urlFor } from "@/lib/sanity-client";
import { groq } from "next-sanity";


async function getNews(): Promise<NewsArticle[]> {
    const query = groq`*[_type == "news"] | order(publishedAt desc) {
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
    return await client.fetch(query);
}

export default async function NewsPage() {
  const newsItems = await getNews();

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
          const itemImageUrl = item.mainImage ? urlFor(item.mainImage as SanityImage)?.url() : undefined;
          const authorImageUrl = item.author?.image ? urlFor(item.author.image as SanityImage)?.url() : undefined;

          return (
            <Link href={`/news/${item.slug.current}`} key={item._id} className="group block">
              <Card className="flex flex-col overflow-hidden border-border/50 bg-gradient-to-br from-card to-card/80 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 rounded-xl hover:-translate-y-1">
                <div className="relative w-full aspect-video">
                  <SafeImage
                    src={itemImageUrl ?? undefined}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors mb-2">
                    {item.title}
                  </CardTitle>

                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    {item.author && (
                        <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                                <AvatarImage src={authorImageUrl} alt={item.author.name ?? undefined} />
                                <AvatarFallback>{item.author.name?.charAt(0) || 'D'}</AvatarFallback>
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
