
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SafeImage from '@/components/SafeImage';
import { BlogPost, SanityImage } from "@/lib/types";
import { client, urlFor } from "@/lib/sanity-client";
import { PortableText } from "@portabletext/react";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";

// In a real app, this would fetch from a CMS. For now, we use a placeholder.
const getPost = async (slug: string): Promise<BlogPost | null> => {
    const query = groq`*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      publishedAt,
      mainImage,
      excerpt,
      body,
      author->{
        name,
        image
      }
    }`;
    return await client.fetch(query, { slug });
};

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  if (!post) {
     notFound();
  }

  const postImageUrl = post.mainImage ? urlFor(post.mainImage as SanityImage)?.url() : undefined;
  const authorImageUrl = post.author?.image ? urlFor(post.author.image as SanityImage)?.url() : undefined;


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
                        <AvatarImage src={authorImageUrl} alt={post.author.name ?? undefined} />
                        <AvatarFallback>{post.author.name?.charAt(0) || 'A'}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-muted-foreground">{post.author.name}</span>
                </div>
            )}
            <p className="text-muted-foreground">
                {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
        </div>


        <div className="relative w-full aspect-video mb-8">
          <SafeImage
            src={postImageUrl}
            alt={post.title}
            fill
            className="rounded-xl object-cover"
          />
        </div>
        
        <div className="prose prose-invert max-w-none text-foreground/90 prose-lg prose-h2:font-headline prose-h2:text-primary prose-a:text-primary prose-strong:text-foreground">
          {post.body && <PortableText value={post.body} />}
        </div>
      </article>
    </main>
  );
}

export async function generateStaticParams() {
    const posts = await client.fetch<BlogPost[]>(groq`*[_type == "post"]{"slug": slug.current}`);
    return posts.map(post => ({ slug: post.slug.current }));
}
