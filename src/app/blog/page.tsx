
import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { client } from "@/lib/sanity";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

const options = { next: { revalidate: 30 } };

export default async function BlogPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

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

      <ul className="max-w-3xl mx-auto flex flex-col gap-y-8">
        {posts.map((post) => (
          <li className="group" key={post._id}>
            <Link href={`/blog/${post.slug.current}`}>
              <h2 className="text-2xl font-semibold font-headline text-primary group-hover:underline">{post.title}</h2>
              <p className="text-muted-foreground mt-1">{new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
