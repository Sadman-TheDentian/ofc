import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SafeImage from "@/components/SafeImage";

const staticPosts = [
    {
        _id: '1',
        title: "Deconstructing the Latest Social Engineering Scams",
        slug: { current: "deconstructing-scams" },
        publishedAt: new Date().toISOString(),
        mainImage: "https://images.unsplash.com/photo-1555949963-ff9898a73a73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxwZXJzb24lMjB0aGlua2luZyUyMHNlY3VyaXR5fGVufDB8fHx8MTc1ODYwMzgyOHww&ixlib=rb-4.1.0&q=80&w=1080",
        excerpt: "A deep dive into the psychological tactics used by modern phishers and how to build resilient human firewalls.",
        author: { name: "Jane Doe, Principal Researcher", image: null }
    },
    {
        _id: '2',
        title: "Securing Your Cloud: Beyond the Basics",
        slug: { current: "securing-your-cloud" },
        publishedAt: new Date().toISOString(),
        mainImage: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxzZWN1cmUlMjBjbG91ZCUyMGRhdGF8ZW58MHx8fHwxNzU4NjAzODI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
        excerpt: "Moving beyond default configurations to harden your AWS, Azure, or GCP environments against sophisticated threats.",
        author: { name: "John Smith, Cloud Security Expert", image: null }
    },
    {
        _id: '3',
        title: "The Future of Zero Trust Architecture",
        slug: { current: "zero-trust-future" },
        publishedAt: new Date().toISOString(),
        mainImage: "https://images.unsplash.com/photo-1518434779774-d94213f80c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxuZXR3b3JrJTIwYXJjaGl0ZWN0dXJlJTIwZGlhZ3JhbXxlbnwwfHx8fDE3NTg2MDM4MTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
        excerpt: "Exploring the evolution of 'never trust, always verify' and how it applies to modern, distributed workforces.",
        author: { name: "Alex Johnson, Network Architect", image: null }
    }
];

export default async function BlogPage() {
  const posts = staticPosts;

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
          const postImageUrl = post.mainImage;
          const authorImageUrl = post.author?.image;

          return (
            <Link href={`/blog/${post.slug.current}`} key={post._id} className="group block">
              <Card className="flex flex-col overflow-hidden border-border/50 bg-gradient-to-br from-card to-card/80 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 rounded-xl hover:-translate-y-1">
                <div className="relative w-full aspect-video">
                  <SafeImage
                    src={postImageUrl ?? undefined}
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
                                <AvatarImage src={authorImageUrl ?? undefined} alt={post.author.name ?? undefined} />
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
