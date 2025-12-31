
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SafeImage from '@/components/SafeImage';
import { BlogPost, SanityImage } from "@/lib/types";
import { client, urlFor } from "@/lib/sanity-client";
import { PortableText } from "@portabletext/react";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User, Terminal, Share2, Clock } from "lucide-react";

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
    <div className="min-h-screen bg-black pt-24 md:pt-40 pb-20 overflow-hidden relative">
      <div className="container px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Link href="/blog" className="group flex items-center gap-3 text-[10px] font-bold text-white/30 uppercase tracking-[0.4em] mb-12 md:mb-16 hover:text-[#00FF41] transition-colors px-4">
            <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-2 transition-transform" />
            BAK_TO_TERMINAL
          </Link>

          <header className="mb-12 md:mb-32">
            <div className="flex items-center gap-8 mb-8 md:mb-12">
              <div className="flex items-center gap-4 text-[9px] font-bold text-[#00FF41] uppercase tracking-[0.6em]">
                <Calendar className="h-3 w-3" />
                {new Date(post.publishedAt).toLocaleDateString()}
              </div>
              <div className="h-0.5 w-8 bg-white/10" />
              <div className="flex items-center gap-4 text-[9px] font-bold text-[#00FF41] uppercase tracking-[0.6em]">
                <Clock className="h-3 w-3" />
                6_MIN_READ
              </div>
            </div>

            <h1 className="text-5xl md:text-8xl lg:text-[160px] font-[900] tracking-[-0.05em] text-white uppercase italic leading-[0.7] mb-12 md:mb-16">
              {post.title}
            </h1>

            <div className="flex items-center justify-between py-10 border-y border-white/5">
              {post.author && (
                <div className="flex items-center gap-8">
                  <div className="h-16 w-16 rounded-full border border-white/10 p-1 bg-white/[0.02]">
                    <SafeImage src={authorImageUrl} alt={post.author.name} className="h-full w-full rounded-full object-cover grayscale" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">{post.author.name}</span>
                    <span className="text-[8px] font-bold text-[#00FF41]/40 uppercase tracking-[0.2em] mt-1">LEAD_RESEARCHER</span>
                  </div>
                </div>
              )}
              <div className="flex gap-4">
                <button className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center text-white/20 hover:text-[#00FF41] hover:border-[#00FF41]/30 transition-all group/share">
                  <Share2 className="h-4 w-4 transform group-hover:rotate-12 transition-transform" />
                </button>
              </div>
            </div>
          </header>

          <div className="relative w-full aspect-[21/9] mb-24 rounded-[3rem] overflow-hidden border border-white/5 bg-white/[0.02]">
            <SafeImage
              src={postImageUrl}
              alt={post.title}
              fill
              className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>

          <article className="max-w-3xl mx-auto">
            <div className="prose prose-invert prose-lg max-w-none 
                prose-p:text-white/40 prose-p:font-light prose-p:leading-relaxed 
                prose-h2:text-4xl prose-h2:font-black prose-h2:italic prose-h2:uppercase prose-h2:tracking-tighter prose-h2:text-white prose-h2:mt-24 prose-h2:mb-8
                prose-h3:text-2xl prose-h3:font-black prose-h3:text-white/80 prose-h3:mt-16
                prose-strong:text-white prose-strong:font-bold
                prose-blockquote:border-l-[#00FF41] prose-blockquote:bg-white/[0.02] prose-blockquote:p-8 prose-blockquote:rounded-r-3xl prose-blockquote:italic
                prose-code:text-[#00FF41] prose-code:bg-[#00FF41]/5 prose-code:px-2 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                prose-a:text-[#00FF41] prose-a:no-underline hover:prose-a:underline
             ">
              {post.body && <PortableText value={post.body} />}
            </div>
          </article>

          {/* Footer Metadata */}
          <div className="mt-40 pt-20 border-t border-white/5 flex flex-col items-center text-center">
            <span className="text-[10px] font-bold tracking-[0.8em] text-white/10 uppercase mb-8">END_OF_TRANSMISSION</span>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#00FF41]/40 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const posts = await client.fetch<BlogPost[]>(groq`*[_type == "post"]{"slug": slug.current}`);
  return posts.map(post => ({ slug: post.slug.current }));
}
