
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

export default function BlogClient({ posts }: { posts: BlogPost[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <div ref={containerRef} className="min-h-screen bg-black pt-40 pb-20 overflow-hidden">
            <div className="container px-4">
                {/* Academic / Research Header */}
                <div className="max-w-7xl mb-60 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute -top-40 -left-40 w-80 h-80 bg-[#00FF41]/5 blur-[120px] rounded-full pointer-events-none"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="flex items-center gap-8 mb-12">
                            <div className="h-0.5 w-16 bg-white/20" />
                            <RevealText text="TECHNICAL_LOG_ARCHIVE" className="text-[10px] font-bold tracking-[1.2em] text-white/40 uppercase" />
                        </div>
                        <h1 className="text-7xl md:text-[14vw] font-[900] tracking-[-0.05em] text-white uppercase italic leading-[0.7] mb-16">
                            THE <br /><span className="text-[#00FF41]">LOGS.</span>
                        </h1>
                        <p className="max-w-4xl text-white/40 text-2xl md:text-3xl font-light italic leading-relaxed">
                            Research, methodologies, and technical deep-dives into the substrate of sovereign security.
                        </p>
                    </motion.div>
                </div>

                {/* Feature Grid / Repository Style */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1px bg-white/5 border border-white/5 overflow-hidden rounded-[4rem]">
                    {posts.map((post, idx) => {
                        const postImageUrl = post.mainImage ? urlFor(post.mainImage as SanityImage)?.url() : undefined;
                        return (
                            <motion.div
                                key={post._id}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-black group relative overflow-hidden flex flex-col h-[600px]"
                            >
                                <div className="relative h-2/3 overflow-hidden">
                                    <SafeImage
                                        src={postImageUrl}
                                        alt={post.title}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 opacity-40 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />

                                    <div className="absolute top-12 left-12">
                                        <TechnicalIcon icon={Terminal} glowColor="#00FF41" className="scale-75" />
                                    </div>

                                    <div className="absolute top-12 left-28 flex items-center gap-3 bg-black/40 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all">
                                        <span className="text-[9px] font-[900] text-white tracking-[0.3em] uppercase">{post.author?.name || 'ROOT'}</span>
                                    </div>
                                </div>

                                <div className="p-16 flex flex-col flex-grow relative z-10">
                                    <div className="flex items-center justify-between mb-8">
                                        <span className="text-[10px] font-black tracking-[0.5em] text-[#00FF41]/40 uppercase">{new Date(post.publishedAt).toLocaleDateString()}</span>
                                        <div className="h-1.5 w-1.5 bg-[#00FF41] rounded-full group-hover:scale-[12] transition-transform duration-700 shadow-[0_0_15px_#00FF41]" />
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-black text-white italic uppercase tracking-tighter leading-tight mb-6 group-hover:text-[#00FF41] transition-colors">
                                        {post.title}
                                    </h2>
                                    <div className="mt-auto flex items-center justify-between opacity-40 group-hover:opacity-100 transition-opacity">
                                        <div className="flex items-center gap-3">
                                            <Link href={`/blog/${post.slug.current}`} className="text-[10px] font-bold tracking-[0.3em] text-white uppercase hover:text-[#00FF41] transition-colors">
                                                INITIALIZE_READ
                                            </Link>
                                            <CornerDownRight className="h-3 w-3 text-[#00FF41]" />
                                        </div>
                                        <Share2 className="h-4 w-4 text-white hover:text-[#00FF41] transition-colors cursor-pointer" />
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
