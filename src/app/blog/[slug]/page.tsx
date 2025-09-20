
import { client } from "@/lib/sanity";
import type { BlogPost } from "@/lib/types";
import { notFound } from "next/navigation";
import Image from "next/image";
import imageUrlBuilder from '@sanity/image-url'
import { PortableText } from '@portabletext/react'
import { Badge } from "@/components/ui/badge";

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
  return builder.image(source)
}

async function getBlogPost(slug: string): Promise<BlogPost> {
    const query = `*[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        mainImage,
        publishedAt,
        body,
        author->{
            name,
            image
        }
    }`;
    const post = await client.fetch(query, { slug });
    return post;
}

const ptComponents = {
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <div className="relative my-8">
            <Image
                src={urlFor(value).width(1200).height(800).fit('max').auto('format').url()}
                width={1200}
                height={800}
                alt={value.alt || ' '}
                loading="lazy"
                className="rounded-lg"
            />
        </div>
      )
    }
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
            <header className="text-center mb-12">
                 <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl mb-4">
                    {post.title}
                </h1>
                <div className="flex justify-center items-center gap-4 text-muted-foreground">
                    {post.author.image && (
                         <Image 
                            src={urlFor(post.author.image).width(40).height(40).url()}
                            alt={post.author.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                    )}
                    <span>By {post.author.name}</span>
                    <span>&bull;</span>
                     <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                </div>
            </header>
            
            {post.mainImage && (
                <div className="relative h-96 w-full mb-12">
                    <Image 
                        src={urlFor(post.mainImage).width(1200).height(800).url()}
                        alt={post.title}
                        fill
                        className="object-cover rounded-xl shadow-lg"
                        priority
                    />
                </div>
            )}

            <div className="prose prose-invert max-w-none text-foreground/90 prose-lg prose-h2:font-headline prose-h2:text-primary prose-a:text-primary prose-strong:text-foreground">
                 <PortableText value={post.body} components={ptComponents} />
            </div>
        </div>
    </article>
  );
}

export async function generateStaticParams() {
  const posts = await client.fetch<BlogPost[]>(`*[_type == "post"]{"slug": slug.current}`);
  return posts.map(post => ({ slug: post.slug }));
}
