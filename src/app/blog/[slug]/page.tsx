
import { type SanityDocument } from "next-sanity";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/lib/sanity";
import Link from "next/link";
import Image from "next/image";
import { Author } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  ...,
  author->{
    _id,
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

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await client.fetch<SanityDocument & { author?: Author }>(POST_QUERY, params, options);
  const postImageUrl = post.mainImage
    ? urlFor(post.mainImage)?.width(800).height(450).url()
    : null;
    
  const authorImageUrl = post.author?.image ? urlFor(post.author.image)?.width(40).height(40).url() : null;

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-8">
      <Link href="/blog" className="text-primary hover:underline">
        ← Back to posts
      </Link>
      <article>
        <h1 className="text-4xl font-bold font-headline mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 mb-8">
            {post.author && (
                <div className="flex items-center gap-3">
                    <Avatar>
                        {authorImageUrl && <AvatarImage src={authorImageUrl} alt={post.author.name} />}
                        <AvatarFallback>{post.author.name?.charAt(0) || 'A'}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-muted-foreground">{post.author.name}</span>
                </div>
            )}
            <p className="text-muted-foreground">
                {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
        </div>


        {postImageUrl && (
            <div className="relative w-full aspect-video mb-8">
                <Image
                    src={postImageUrl}
                    alt={post.title}
                    fill
                    className="rounded-xl object-cover"
                />
            </div>
        )}
        
        <div className="prose prose-invert max-w-none text-foreground/90 prose-lg prose-h2:font-headline prose-h2:text-primary prose-a:text-primary prose-strong:text-foreground">
          {Array.isArray(post.body) && <PortableText value={post.body} />}
        </div>
      </article>
    </main>
  );
}

export async function generateStaticParams() {
  const posts = await client.fetch<SanityDocument[]>(`*[_type == "post" && defined(slug.current)]{"slug": slug.current}`);
  return posts
    .filter(post => post.slug && post.slug.current) // Filter out items with no slug
    .map(post => ({ slug: post.slug.current }));
}
