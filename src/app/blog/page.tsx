
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SafeImage from "@/components/SafeImage";
import { BlogPost, SanityImage } from "@/lib/types";
import { urlFor } from "@/lib/sanity-client";


async function getPosts(): Promise<BlogPost[]> {
    return [
        {
            _id: '1',
            title: "Example Blog Post",
            slug: { current: 'example-post' },
            publishedAt: new Date().toISOString(),
            mainImage: "https://picsum.photos/seed/blog1/1200/800",
            excerpt: 'This is a placeholder excerpt for an example blog post. Content would be dynamically fetched from a CMS in a real application.',
            body: [],
            author: {
                name: "The DentiSystems Team",
                image: "https://picsum.photos/seed/author1/100/100"
            }
        }
    ];
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="container py-12 md:py-20">
      <div className="text-center space-y-4 mb-12 bg-background/50 backdrop-blur-sm p-8 rounded-xl border border-border/50">
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
          The DentiSystems Blog
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl">
          Insights on cybersecurity, web engineering, and the evolving threat landscape.
        </p>
      </div>

      <div className="max-w-3xl mx-auto grid gap-12">
        {posts.map((post) => {
          const postImageUrl = typeof post.mainImage === 'string' ? post.mainImage : post.mainImage ? urlFor(post.mainImage as SanityImage)?.url() : undefined;
          const authorImageUrl = typeof post.author?.image === 'string' ? post.author.image : post.author?.image ? urlFor(post.author.image as SanityImage)?.url() : undefined;

          return (
            <Link href={`/blog/${post.slug.current}`} key={post._id} className="group block">
              <Card className="flex flex-col overflow-hidden border-border/50 bg-gradient-to-br from-card to-card/80 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 rounded-xl hover:-translate-y-1">
                <div className="relative w-full aspect-video">
                  <SafeImage
                    src={postImageUrl}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors mb-2">
                    {post.title}
                  </CardTitle>

                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    {post.author && (
                        <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                                <AvatarImage src={authorImageUrl} alt={post.author.name ?? undefined} />
                                <AvatarFallback>{post.author.name?.charAt(0) || 'A'}</AvatarFallback>
                            </Avatar>
                            <span>{post.author.name}</span>
                        </div>
                    )}
                     <p>
                        {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>

                  {post.excerpt && (
                    <p className="text-muted-foreground text-sm flex-grow">
                      {post.excerpt}
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
