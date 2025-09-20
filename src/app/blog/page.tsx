
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { client } from "@/lib/sanity";
import type { BlogPost } from "@/lib/types";
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
  return builder.image(source)
}


async function getBlogPosts(): Promise<BlogPost[]> {
    const query = `*[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        mainImage,
        publishedAt,
        author->{
            name
        }
    }`;
    const data = await client.fetch(query);
    return data;
}


export default async function BlogPage() {
  const posts = await getBlogPosts();

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
      
      {posts && posts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
                <Link key={post._id} href={`/blog/${post.slug}`} className="group">
                    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-2 bg-gradient-to-br from-card to-card/80 border-border/50">
                        {post.mainImage && (
                            <div className="relative h-56 w-full">
                                <Image 
                                    src={urlFor(post.mainImage).width(800).height(600).url()}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform"
                                />
                            </div>
                        )}
                        <CardHeader>
                            <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors">{post.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col">
                            <p className="text-muted-foreground text-sm flex-grow">{post.excerpt}</p>
                            <div className="flex items-center justify-between mt-4">
                                <Badge variant="outline">{new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</Badge>
                                <p className="text-xs text-muted-foreground">by {post.author.name}</p>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed rounded-lg">
          <h3 className="font-headline text-xl font-semibold">No Blog Posts Found</h3>
          <p className="text-muted-foreground mt-2">Content is being managed in Sanity.io. Publish new posts in the Studio.</p>
           <Button asChild variant="secondary" className="mt-4">
                <Link href="/studio">Go to Studio</Link>
           </Button>
        </div>
      )}
    </div>
  );
}
