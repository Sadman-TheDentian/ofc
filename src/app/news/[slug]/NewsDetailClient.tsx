
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { PortableText } from '@portabletext/react';
import { NewsArticle, SanityImage } from '@/lib/types';
import { urlFor } from '@/lib/sanity-client';
import Link from 'next/link';
import SafeImage from '@/components/SafeImage';
import { ArrowLeft, Calendar, User, Share2, ShieldAlert, Cpu, Activity } from 'lucide-react';
import Magnetic from '@/components/Magnetic';
import RevealText from '@/components/RevealText';
import { useRef } from 'react';

export default function NewsDetailClient({ post }: { post: NewsArticle }) {
    const postImageUrl = post.mainImage ? urlFor(post.mainImage as SanityImage)?.url() : undefined;
    const scrollRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start start", "end end"]
    });

    const headerScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
    const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3]);

    return (
        <div ref={scrollRef} className="min-h-screen bg-black pt-40 pb-20 overflow-hidden">
            <div className="container px-4">
                <div className="max-w-5xl mx-auto">
                    {/* Floating HUD Metadata */}
                    <div className="fixed top-40 right-12 hidden lg:flex flex-col gap-8 z-40">
                        <motion.div
                            style={{ opacity: scrollYProgress }}
                            className="bg-white/[0.02] border border-white/5 backdrop-blur-xl rounded-full p-4 flex flex-col items-center gap-6"
                        >
                            <Magnetic><Share2 className="h-4 w-4 text-white/40 hover:text-[#00FF41] cursor-pointer transition-colors" /></Magnetic>
                            <div className="h-px w-4 bg-white/10" />
                            <div className="flex flex-col items-center gap-2">
                                <span className="text-[7px] font-black text-white/20 uppercase vertical-text">SCROLL</span>
                                <div className="h-20 w-px bg-white/5 relative overflow-hidden">
                                    <motion.div
                                        style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
                                        className="w-full bg-[#00FF41]"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Back Link */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Link href="/news" className="group flex items-center gap-3 text-[10px] font-bold text-white/30 uppercase tracking-[0.4em] mb-16 hover:text-[#00FF41] transition-colors">
                            <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-2 transition-transform" />
                            BAK_TO_FEED
                        </Link>
                    </motion.div>

                    {/* Header */}
                    <motion.header
                        style={{ scale: headerScale, opacity: headerOpacity }}
                        className="mb-32"
                    >
                        <div className="flex items-center gap-6 mb-8">
                            <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                            <RevealText text="INTEL_BROADCAST // DECLASSIFIED" className="text-[10px] font-bold tracking-[0.8em] text-red-500 uppercase" />
                        </div>

                        <h1 className="text-6xl md:text-8xl font-[900] tracking-tighter text-white uppercase italic leading-none mb-12">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-12 py-10 border-y border-white/5">
                            <div className="flex items-center gap-4">
                                <Calendar className="h-4 w-4 text-[#00FF41]" />
                                <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em]">{new Date(post.publishedAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <User className="h-4 w-4 text-[#00FF41]" />
                                <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em]">{post.author?.name || 'FIELD_AGENT'}</span>
                            </div>
                            <div className="flex items-center gap-4 ml-auto">
                                <Activity className="h-4 w-4 text-[#00FF41]" />
                                <span className="text-[10px] font-bold text-[#00FF41] tracking-[0.3em] uppercase">VERIFIED_INTEL</span>
                            </div>
                        </div>
                    </motion.header>

                    {/* Hero Asset */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative aspect-[21/9] rounded-[4.5rem] overflow-hidden border border-white/10 mb-32 group"
                    >
                        <SafeImage
                            src={postImageUrl}
                            alt={post.title}
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                    </motion.div>

                    {/* Content Body */}
                    <article className="max-w-3xl mx-auto mb-40">
                        <div className="prose prose-invert prose-2xl max-w-none 
                            prose-p:text-white/40 prose-p:font-light prose-p:leading-relaxed prose-p:italic
                            prose-h2:text-4xl prose-h2:font-black prose-h2:italic prose-h2:uppercase prose-h2:tracking-tighter prose-h2:text-white prose-h2:mt-32
                            prose-h3:text-2xl prose-h3:font-black prose-h3:italic prose-h3:uppercase prose-h3:text-white
                            prose-strong:text-white prose-strong:font-bold
                            prose-blockquote:border-l-[#00FF41]/40 prose-blockquote:bg-white/[0.02] prose-blockquote:p-12 prose-blockquote:rounded-[3rem] prose-blockquote:italic prose-blockquote:text-white/60
                            prose-a:text-[#00FF41] prose-a:no-underline hover:prose-a:underline
                         ">
                            {post.body && <PortableText value={post.body} />}
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
}
