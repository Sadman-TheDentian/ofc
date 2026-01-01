
'use client';

import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import { SanityImage, BlogPost } from "@/lib/types";
import { urlFor } from "@/lib/sanity-client";
import { ArrowRight, Calendar, Terminal, BookOpen, Share2, CornerDownRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import RevealText from "@/components/RevealText";
import Magnetic from "@/components/Magnetic";
import { useRef } from "react";
import TechnicalIcon from "@/components/TechnicalIcon";

import GlitchText from "@/components/GlitchText";

export default function BlogClient({ posts }: { posts: BlogPost[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <div ref={containerRef} className="min-h-screen bg-black pt-24 md:pt-40 pb-20 overflow-hidden relative">
            <div className="container px-4 relative z-10">
                {/* Academic / Research Header */}
                <div className="max-w-7xl mb-12 md:mb-32 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute -top-40 -left-40 w-80 h-80 bg-[#00FF41]/5 blur-[120px] rounded-full pointer-events-none"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="flex items-center gap-10 mb-10 md:mb-16">
                            <TechnicalIcon icon={Terminal} glowColor="#00FF41" className="scale-75 origin-left" />
                            <RevealText text="TECHNICAL_LOG_ARCHIVE // DATA_SUBSTRATE" className="text-[10px] font-black tracking-[1.2em] text-[#00FF41] uppercase italic" />
                        </div>
                        <h1 className="text-5xl md:text-8xl lg:text-[160px] font-[900] tracking-[-0.05em] text-white uppercase italic leading-[0.7] mb-12 md:mb-16">
                            <GlitchText text="THE" /> <br /><span className="text-white/10"><GlitchText text="LOGS." /></span>
                        </h1>
                        <p className="max-w-4xl text-white/40 text-xl md:text-3xl font-light italic leading-relaxed border-l border-white/10 pl-10">
                            Research, methodologies, and technical deep-dives into the substrate of sovereign security architectures.
                        </p>
                    </motion.div>
                </div>

                {/* Feature Grid / Repository Style */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5 overflow-hidden rounded-[4rem] shadow-2xl">
                    {posts.map((post, idx) => {
                        const postImageUrl = post.mainImage ? urlFor(post.mainImage as SanityImage)?.url() : undefined;
                        return (
                            <motion.div
                                key={post._id}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05, duration: 1 }}
                                className="bg-black group relative overflow-hidden flex flex-col h-[650px] border-white/5"
                            >
                                <div className="relative h-2/3 overflow-hidden">
                                    <SafeImage
                                        src={postImageUrl}
                                        alt={post.title}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 opacity-40 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                                    <div className="absolute top-12 left-12">
                                        <TechnicalIcon icon={Terminal} glowColor="#00FF41" className="scale-75" />
                                    </div>

                                    <div className="absolute top-12 right-12 flex items-center gap-3 bg-black/60 backdrop-blur-xl px-6 py-2 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                                        <div className="h-1.5 w-1.5 bg-[#00FF41] rounded-full animate-pulse" />
                                        <span className="text-[9px] font-black text-white tracking-[0.3em] uppercase italic">ENCRYPTED_STREAM</span>
                                    </div>

                                    {/* HUD Hover Corners */}
                                    <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                        <div className="flex justify-between">
                                            <div className="w-12 h-12 border-t border-l border-[#00FF41]/40" />
                                            <div className="w-12 h-12 border-t border-r border-[#00FF41]/40" />
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="w-12 h-12 border-b border-l border-[#00FF41]/40" />
                                            <div className="w-12 h-12 border-b border-r border-[#00FF41]/40" />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-16 flex flex-col flex-grow relative z-10">
                                    <div className="flex items-center justify-between mb-10">
                                        <span className="text-[11px] font-black tracking-[0.4em] text-white/20 uppercase italic group-hover:text-[#00FF41]/40 transition-colors">
                                            {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}
                                        </span>
                                        <div className="flex gap-1.5">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="h-1 w-3 bg-white/5 rounded-full overflow-hidden">
                                                    <motion.div
                                                        animate={{ opacity: [0.2, 0.6, 0.2] }}
                                                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                                                        className="h-full bg-[#00FF41]"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <h2 className="text-3xl md:text-3xl font-[900] text-white italic uppercase tracking-tighter leading-tight mb-8 group-hover:text-[#00FF41] transition-colors duration-500">
                                        {post.title}
                                    </h2>
                                    <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-10">
                                        <div className="flex flex-col">
                                            <span className="text-[8px] font-black text-white/10 tracking-[0.3em] uppercase mb-1">AUTHOR_ID</span>
                                            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{post.author?.name || 'ROOT_CMD'}</span>
                                        </div>
                                        <Magnetic>
                                            <Link href={`/blog/${post.slug.current}`} className="group/link flex items-center justify-center h-14 w-14 rounded-full border border-white/10 hover:border-[#00FF41] hover:bg-[#00FF41] transition-all duration-500">
                                                <ArrowRight className="h-5 w-5 text-white group-hover/link:text-black transition-colors" />
                                            </Link>
                                        </Magnetic>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
