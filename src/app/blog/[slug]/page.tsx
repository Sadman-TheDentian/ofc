
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { client, urlFor } from "@/lib/sanity";
import type { BlogPost } from "@/lib/types";
import { PortableText } from "@portabletext/react";

type Props = {
  params: { slug: string };
};

async function getPost(slug: string): Promise<BlogPost | null> {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    mainImage,
    "author": author->{name, image},
    publishedAt,
    excerpt,
    body
  }`;
  const post = await client.fetch(query, { slug });
  return post;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);

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

const portableTextComponents = {
  types: {
    image: ({ value }: { value: any }) => (
      <div className="relative my-6">
        <Image 
          src={urlFor(value).url()} 
          alt={value.alt || 'Blog post image'} 
          width={800} 
          height={600}
          className="rounded-lg shadow-lg"
        />
      </div>
    ),
  },
  block: {
    h2: ({ children }: any) => <h2 className="text-2xl font-bold font-headline mt-8 mb-4 text-primary">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-bold font-headline mt-6 mb-4 text-primary/90">{children}</h3>,
    blockquote: ({ children }: any) => <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-muted-foreground">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-inside space-y-2 my-6">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-inside space-y-2 my-6">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <a href={value.href} rel={rel} className="text-primary hover:underline">
          {children}
        </a>
      )
    },
  },
};


export default async function BlogPostPage({ params }: Props) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }
  
  const otherPostsQuery = `*[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0...2]{
    _id,
    title,
    "slug": slug.current,
    mainImage,
    publishedAt
  }`;
  const otherPosts: BlogPost[] = await client.fetch(otherPostsQuery, { slug: params.slug });

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
              {post.author.image && (
                <Image
                    src={urlFor(post.author.image).width(40).height(40).url()}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                />
              )}
              <div>
                <p className="font-semibold text-foreground">{post.author.name}</p>
                <p className="text-sm">{new Date(post.publishedAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          {post.mainImage && (
            <div className="mb-8 relative aspect-video">
                <Image
                src={urlFor(post.mainImage).url()}
                alt={post.title}
                fill
                className="rounded-lg shadow-lg object-cover"
                />
            </div>
          )}
          {post.body && (
            <div className="prose prose-invert max-w-none text-foreground/90">
                <PortableText value={post.body} components={portableTextComponents} />
            </div>
           )}
        </article>
        <aside className="lg:col-span-1 space-y-8 lg:sticky top-24 self-start">
             <h3 className="font-headline text-xl font-semibold border-l-4 border-primary pl-4">
                Recent Posts
            </h3>
            <div className="space-y-6">
                {otherPosts.map(other => (
                     <Link href={`/blog/${other.slug}`} key={other._id} className="group block">
                        <Card className="flex items-start gap-4 p-4 hover:border-primary/50 transition-colors">
                             <div className="w-24 h-16 relative shrink-0">
                                {other.mainImage && (
                                    <Image 
                                        src={urlFor(other.mainImage).width(96).height(64).url()}
                                        alt={other.title} 
                                        fill 
                                        className="rounded-md object-cover"
                                    />
                                )}
                            </div>
                            <div>
                                <h4 className="font-semibold leading-tight group-hover:text-primary transition-colors">{other.title}</h4>
                                <p className="text-xs text-muted-foreground mt-1">{new Date(other.publishedAt).toLocaleDateString()}</p>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </aside>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const posts = await client.fetch<BlogPost[]>(`*[_type == "post"]{"slug": slug.current}`);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
