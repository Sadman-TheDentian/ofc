
'use client';

import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import { SanityImage, NewsArticle } from "@/lib/types";
import { urlFor } from "@/lib/sanity-client";
import { ArrowRight, Calendar, User, Radio, Activity, Target } from "lucide-react";
import { motion } from "framer-motion";
import RevealText from "@/components/RevealText";
import Magnetic from "@/components/Magnetic";
import TechnicalIcon from "@/components/TechnicalIcon";

export default function NewsClient({ newsItems }: { newsItems: NewsArticle[] }) {
    return (
        <div className="min-h-screen bg-black pt-24 md:pt-40 pb-20 overflow-hidden relative">
            <div className="container px-4 relative z-10">
                {/* Cinematic Header */}
                <div className="max-w-7xl mb-12 md:mb-32 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="flex items-center gap-8 mb-8 md:mb-12">
                            <TechnicalIcon icon={Radio} glowColor="#00FF41" className="scale-75 origin-left animate-pulse" />
                            <RevealText text="INTEL_STREAM_v6.4" className="text-[10px] font-bold tracking-[1.2em] text-[#00FF41] uppercase" />
                        </div>
                        <h1 className="text-5xl md:text-8xl lg:text-[160px] font-[900] tracking-[-0.05em] text-white uppercase italic leading-[0.7] mb-12 md:mb-16">
                            REAL-TIME <br /><span className="text-white/10">INTELLIGENCE.</span>
                        </h1>
                        <p className="max-w-4xl text-white/40 text-xl md:text-4xl font-light italic leading-relaxed">
                            Declassified transmissions from our global operations center and tactical units.
                        </p>
                    </motion.div>
                </div>

                {/* Featured Pulse Article */}
                {newsItems.length > 0 && (() => {
                    const featured = newsItems[0];
                    const featuredImageUrl = featured.mainImage ? urlFor(featured.mainImage as SanityImage)?.url() : undefined;

                    return (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="mb-40"
                        >
                            <Link href={`/news/${featured.slug.current}`} className="group block">
                                <div className="relative aspect-[21/9] rounded-[4rem] overflow-hidden border border-white/10 group-hover:border-[#00FF41]/30 transition-all duration-700">
                                    <SafeImage
                                        src={featuredImageUrl}
                                        alt={featured.title}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 opacity-40 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                                    <div className="absolute bottom-0 left-0 p-12 md:p-20 z-10 w-full">
                                        <div className="flex items-center gap-4 mb-8">
                                            <span className="px-3 py-1 bg-[#00FF41] text-black text-[9px] font-black uppercase tracking-widest">FLASH_REPORT</span>
                                            <span className="text-[9px] font-bold text-white/40 uppercase tracking-[0.4em]">{new Date(featured.publishedAt).toLocaleDateString()}</span>
                                        </div>
                                        <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none mb-8 max-w-4xl group-hover:translate-x-4 transition-transform duration-700">
                                            {featured.title}
                                        </h2>
                                        <div className="flex items-center gap-6">
                                            <Magnetic>
                                                <div className="h-16 w-16 rounded-full bg-white text-black flex items-center justify-center">
                                                    <ArrowRight className="h-6 w-6" />
                                                </div>
                                            </Magnetic>
                                            <span className="text-[10px] font-bold text-[#00FF41] tracking-[0.4em] uppercase">ACCESS_FULL_INTEL</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    );
                })()}

                {/* Tactical Feed List */}
                <div className="grid lg:grid-cols-12 gap-32">
                    <div className="lg:col-span-8 space-y-24">
                        {newsItems.slice(1).map((item, idx) => {
                            const itemImageUrl = item.mainImage ? urlFor(item.mainImage as SanityImage)?.url() : undefined;
                            return (
                                <motion.div
                                    key={item._id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <Link href={`/news/${item.slug.current}`} className="group block">
                                        <div className="flex flex-col md:flex-row gap-16 items-center border-b border-white/10 pb-20 group-hover:border-[#00FF41]/30 transition-colors">
                                            <div className="w-full md:w-80 aspect-video relative rounded-[2.5rem] overflow-hidden shrink-0 border border-white/10">
                                                <SafeImage
                                                    src={itemImageUrl}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-40 group-hover:opacity-100"
                                                />
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex items-center gap-6 mb-6">
                                                    <span className="text-[10px] font-black tracking-[0.5em] text-[#00FF41] uppercase">UN_0{idx + 2}</span>
                                                    <div className="h-px w-12 bg-white/20" />
                                                    <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.6em]">{new Date(item.publishedAt).toLocaleDateString()}</span>
                                                </div>
                                                <h3 className="text-3xl md:text-5xl font-[900] text-white italic uppercase tracking-tighter mb-8 group-hover:text-[#00FF41] transition-colors leading-none">
                                                    {item.title}
                                                </h3>
                                                {item.excerpt && (
                                                    <p className="text-white/40 text-xl font-light italic leading-relaxed line-clamp-2 mb-10">
                                                        {item.excerpt}
                                                    </p>
                                                )}
                                                <div className="flex items-center gap-4 text-[10px] font-[900] text-white/30 uppercase tracking-[0.4em]">
                                                    <TechnicalIcon icon={Target} glowColor="#00FF41" className="scale-50 origin-left" />
                                                    {item.author?.name || 'FIELD_OPERATOR'}
                                                </div>
                                            </div>
                                            <ArrowRight className="h-10 w-10 text-white/10 group-hover:text-[#00FF41] group-hover:translate-x-4 transition-all shrink-0" />
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Tactical Sidebar */}
                    <aside className="lg:col-span-4 space-y-24">
                        <div className="bg-white/[0.01] border border-white/10 rounded-[4rem] p-16 sticky top-40">
                            <div className="flex items-center gap-6 mb-12">
                                <TechnicalIcon icon={Activity} glowColor="#00FF41" className="scale-75 origin-left" />
                                <span className="text-[10px] font-black tracking-[0.6em] text-white uppercase italic">INTEL_FEED_v6.4</span>
                            </div>
                            <div className="pt-12 border-t border-white/10">
                                <p className="text-lg font-light text-white/20 italic leading-relaxed">
                                    All transmissions within this feed are officially cleared for sovereign protocol distribution. Recurrent field operators should maintain active session sync for real-time intel modules.
                                </p>
                            </div>
                        </div>
                    </aside>
                </div>

            </div>
        </div>
    );
}
