import { blogPosts } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: `${post.title} | DentiSystems Blog`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }
  
  const otherPosts = blogPosts.filter(p => p.slug !== params.slug).slice(0, 2);

  return (
    <div className="container py-12 md:py-20">
        <div className="mb-8">
            <Link href="/blog" className="flex items-center text-primary hover:underline mb-8">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to all posts
            </Link>
        </div>
      <div className="grid lg:grid-cols-4 gap-12">
        <article className="lg:col-span-3">
          <div className="mb-8">
            <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <Image
                src={post.author.imageUrl}
                alt={post.author.name}
                width={40}
                height={40}
                className="rounded-full"
                data-ai-hint={post.author.imageHint}
              />
              <div>
                <p className="font-semibold text-foreground">{post.author.name}</p>
                <p className="text-sm">{post.date}</p>
              </div>
            </div>
          </div>
          <div className="mb-8 relative h-96">
            <Image
              src={post.imageUrl}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-lg"
              data-ai-hint={post.imageHint}
            />
          </div>
          <div
            className="prose prose-invert max-w-none text-foreground/90 prose-h3:font-headline prose-h3:text-primary prose-a:text-primary prose-strong:text-foreground"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
        <aside className="lg:col-span-1 space-y-8">
             <h3 className="font-headline text-xl font-semibold border-l-4 border-primary pl-4">
                Recent Posts
            </h3>
            <div className="space-y-6">
                {otherPosts.map(other => (
                     <Link href={`/blog/${other.slug}`} key={other.id} className="group block">
                        <div className="flex items-start gap-4">
                             <div className="w-24 h-16 relative shrink-0">
                                <Image 
                                    src={other.imageUrl} 
                                    alt={other.title} 
                                    layout="fill" 
                                    objectFit="cover"
                                    className="rounded-md"
                                    data-ai-hint={other.imageHint}
                                />
                            </div>
                            <div>
                                <h4 className="font-semibold leading-tight group-hover:text-primary transition-colors">{other.title}</h4>
                                <p className="text-xs text-muted-foreground mt-1">{other.date}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </aside>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}
