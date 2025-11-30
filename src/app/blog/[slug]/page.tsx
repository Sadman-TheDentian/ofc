
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SafeImage from '@/components/SafeImage';
import { BlogPost } from "@/lib/types";

// In a real app, this would fetch from a CMS. For now, we use a placeholder.
const getPost = async (slug: string): Promise<BlogPost | null> => {
    return {
        _id: '1',
        title: "Example Blog Post",
        slug: { current: slug },
        publishedAt: new Date().toISOString(),
        mainImage: "https://picsum.photos/seed/blog1/1200/800",
        excerpt: 'This is a placeholder excerpt.',
        body: [{_type: 'block', children: [{_type: 'span', text: 'This is sample content for the blog post.'}]}],
        author: {
            name: "The DentiSystems Team",
            image: "https://picsum.photos/seed/author1/100/100"
        }
    };
};

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  if (!post) {
     return (
      <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-8">
         <Link href="/blog" className="text-primary hover:underline">
          ← Back to posts
        </Link>
        <p>Post not found.</p>
      </main>
    )
  }

  const postImageUrl = post.mainImage as string;
  const authorImageUrl = post.author?.image as string | undefined;


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
          {post.body && post.body[0] && post.body[0].children && post.body[0].children[0] && <p>{post.body[0].children[0].text}</p>}
        </div>
      </article>
    </main>
  );
}

export async function generateStaticParams() {
  return [{ slug: 'example-post' }];
}
