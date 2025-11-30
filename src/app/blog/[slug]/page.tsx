import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SafeImage from '@/components/SafeImage';

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = {
    title: "Example Blog Post",
    author: { name: "Jane Doe" },
    publishedAt: new Date().toISOString(),
    mainImage: "https://picsum.photos/seed/blog1/800/450",
    body: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'This is a sample blog post. Content would be fetched from a CMS in a real application.' }] }
    ]
  };
  const postImageUrl = post.mainImage;
  const authorImageUrl = undefined;

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
                        <AvatarImage src={authorImageUrl ?? undefined} alt={post.author.name ?? undefined} />
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
            src={postImageUrl ?? undefined}
            alt={post.title}
            fill
            className="rounded-xl object-cover"
          />
        </div>
        
        <div className="prose prose-invert max-w-none text-foreground/90 prose-lg prose-h2:font-headline prose-h2:text-primary prose-a:text-primary prose-strong:text-foreground">
          {post.body && <p>{post.body[0].children[0].text}</p>}
        </div>
      </article>
    </main>
  );
}

export async function generateStaticParams() {
  // In a real app, this would fetch slugs from a CMS.
  // For now, we return a sample slug.
  return [{ slug: 'example-post' }];
}
