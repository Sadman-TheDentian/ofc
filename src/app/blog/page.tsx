
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { client, urlFor } from "@/lib/sanity";
import type { BlogPost } from "@/lib/types";

async function getBlogPosts(): Promise<BlogPost[]> {
    const query = `*[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        "slug": slug.current,
        mainImage,
        excerpt,
        "author": author->{name, image},
        publishedAt
    }`;
    const posts = await client.fetch(query);
    return posts;
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

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
      
      {/* Featured Post */}
      {featuredPost && (
        <div className="mb-16">
          <Link href={`/blog/${featuredPost.slug}`} className="group block">
            <Card className="grid md:grid-cols-2 overflow-hidden hover:border-primary/50 transition-colors bg-gradient-to-br from-card to-card/80 border-border/50">
              <div className="relative h-64 md:h-auto">
                {featuredPost.mainImage && (
                  <Image
                    src={urlFor(featuredPost.mainImage).url()}
                    alt={featuredPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                )}
              </div>
              <div className="p-8 flex flex-col justify-center">
                <Badge variant="outline" className="mb-4 self-start">Featured</Badge>
                <h2 className="font-headline text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-muted-foreground mb-4">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-4 text-sm">
                  {featuredPost.author?.image && (
                    <Image
                      src={urlFor(featuredPost.author.image).width(40).height(40).url()}
                      alt={featuredPost.author.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  )}
                  <div>
                    <p className="font-semibold">{featuredPost.author?.name}</p>
                    <p className="text-muted-foreground">{new Date(featuredPost.publishedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      )}
      
      {/* Other Posts */}
      <h2 className="font-headline text-2xl font-bold tracking-tighter mb-8 border-l-4 border-primary pl-4">
        All Posts
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post._id} className="group">
            <Card className="h-full flex flex-col overflow-hidden hover:border-primary/50 transition-colors bg-gradient-to-br from-card to-card/80 border-border/50">
              <div className="relative h-48">
                {post.mainImage && (
                  <Image
                    src={urlFor(post.mainImage).url()}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                )}
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-lg group-hover:text-primary transition-colors">{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <p className="text-muted-foreground text-sm flex-grow mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{post.author?.name}</span>
                  <span>•</span>
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
