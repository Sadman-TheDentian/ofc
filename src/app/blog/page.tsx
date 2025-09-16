
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { blogPosts } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function BlogPage() {
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <div className="container py-12 md:py-20">
      <div className="text-center space-y-4 mb-12">
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
          The DentiSystems Blog
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl">
          Insights on cybersecurity, web engineering, and the evolving threat landscape.
        </p>
      </div>
      
      {/* Featured Post */}
      <div className="mb-16">
        <Link href={`/blog/${featuredPost.slug}`} className="group block">
          <Card className="grid md:grid-cols-2 overflow-hidden hover:border-primary/50 transition-colors bg-gradient-to-br from-card to-card/80">
            <div className="relative h-64 md:h-auto">
              <Image
                src={featuredPost.imageUrl}
                alt={featuredPost.title}
                fill
                objectFit="cover"
                className="group-hover:scale-105 transition-transform"
                data-ai-hint={featuredPost.imageHint}
              />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <Badge variant="outline" className="mb-4 self-start">Featured</Badge>
              <h2 className="font-headline text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                {featuredPost.title}
              </h2>
              <p className="text-muted-foreground mb-4">{featuredPost.excerpt}</p>
              <div className="flex items-center gap-4 text-sm">
                <Image
                  src={featuredPost.author.imageUrl}
                  alt={featuredPost.author.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                  data-ai-hint={featuredPost.author.imageHint}
                />
                <div>
                  <p className="font-semibold">{featuredPost.author.name}</p>
                  <p className="text-muted-foreground">{featuredPost.date}</p>
                </div>
              </div>
            </div>
          </Card>
        </Link>
      </div>
      
      {/* Other Posts */}
      <h2 className="font-headline text-2xl font-bold tracking-tighter mb-8 border-l-4 border-primary pl-4">
        All Posts
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.id} className="group">
            <Card className="h-full flex flex-col overflow-hidden hover:border-primary/50 transition-colors bg-gradient-to-br from-card to-card/80">
              <div className="relative h-48">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  objectFit="cover"
                  className="group-hover:scale-105 transition-transform"
                  data-ai-hint={post.imageHint}
                />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-lg group-hover:text-primary transition-colors">{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <p className="text-muted-foreground text-sm flex-grow mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{post.author.name}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
