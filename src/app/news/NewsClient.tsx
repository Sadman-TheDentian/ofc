
'use client';

import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import { SanityImage, NewsArticle } from "@/lib/types";
import { urlFor } from "@/lib/sanity-client";
import { ArrowRight, Calendar, User, Radio, Activity, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import RevealText from "@/components/RevealText";
import Magnetic from "@/components/Magnetic";
import TechnicalIcon from "@/components/TechnicalIcon";

import GlitchText from "@/components/GlitchText";
import HUDSection from "@/components/HUDSection";
import CyberGrid from "@/components/CyberGrid";

export default function NewsClient({ newsItems }: { newsItems: NewsArticle[] }) {
    return (
        <div className="min-h-screen bg-black pt-24 md:pt-40 pb-20 overflow-hidden relative">
            <CyberGrid />
            <div className="container px-4 relative z-10">
                {/* Cinematic Header */}
                <div className="max-w-7xl mb-12 md:mb-32 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute -top-40 -left-20 w-[600px] h-[600px] bg-[#00FF41]/5 blur-[120px] rounded-full pointer-events-none"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="flex items-center gap-10 mb-10 md:mb-16">
                            <TechnicalIcon icon={Radio} glowColor="#00FF41" className="scale-75 origin-left animate-pulse" />
                        </div>
                        <h1 className="text-5xl md:text-8xl lg:text-9xl font-[900] tracking-tighter text-white uppercase italic leading-[0.7] mb-12 md:mb-16">
                            <GlitchText text="REAL-TIME INTELLIGENCE." />
                        </h1>
                        <p className="max-w-4xl text-white/40 text-xl md:text-3xl font-light italic leading-relaxed border-l border-[#00FF41]/20 pl-10">
                            "Declassified transmissions from our global operations center and specialized tactical units deployed across the digital substrate."
                        </p>
                    </motion.div>
                </div>

                {/* Featured Pulse Article */}
                {newsItems.length > 0 && (() => {
                    const featured = newsItems[0];
                    const featuredImageUrl = featured.mainImage ? urlFor(featured.mainImage as SanityImage)?.url() : undefined;

                    return (
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="mb-40 md:mb-60"
                        >
                            <Link href={`/news/${featured.slug.current}`} className="group block">
                                <div className="relative aspect-[21/9] rounded-[4rem] overflow-hidden border border-white/5 group-hover:border-[#00FF41]/40 transition-all duration-1000 shadow-[0_0_80px_rgba(0,0,0,1)]">
                                    <SafeImage
                                        src={featuredImageUrl}
                                        alt={featured.title}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 opacity-40 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

                                    <div className="absolute top-12 left-12 md:top-20 md:left-20 flex items-center gap-4">
                                        <div className="h-2 w-2 bg-[#00FF41] rounded-full animate-ping" />
                                        <span className="text-[10px] font-black text-[#00FF41] tracking-[0.4em] uppercase italic">LIVE_FEED_ACTIVE</span>
                                    </div>

                                    <div className="absolute bottom-0 left-0 p-12 md:p-24 z-10 w-full">
                                        <div className="flex items-center gap-6 mb-10">
                                            <span className="px-5 py-2 bg-[#00FF41] text-black text-[10px] font-black uppercase tracking-[0.3em]">FLASH_REPORT</span>
                                            <div className="h-px w-20 bg-white/20" />
                                            <span className="text-[10px] font-[900] text-white/40 uppercase tracking-[0.5em]">{new Date(featured.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase()}</span>
                                        </div>
                                        <h2 className="text-4xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-[0.85] mb-12 max-w-5xl group-hover:translate-x-6 transition-transform duration-1000">
                                            {featured.title}
                                        </h2>
                                        <div className="flex items-center gap-8">
                                            <Magnetic>
                                                <div className="h-20 w-20 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-[#00FF41] transition-all duration-500 shadow-2xl">
                                                    <ArrowRight className="h-8 w-8" />
                                                </div>
                                            </Magnetic>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-black text-[#00FF41] tracking-[0.6em] uppercase">ACCESS_FULL_INTEL</span>
                                                <span className="text-[8px] font-black text-white/20 tracking-[0.4em] uppercase mt-1 italic">SECURE_LINK // VERIFIED_SOURCE</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* HUD Borders */}
                                    <div className="absolute inset-0 p-10 pointer-events-none opacity-20">
                                        <div className="w-full h-full border border-white/5 rounded-[3.5rem]" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    );
                })()}

                {/* Tactical Feed List */}
                <div className="grid lg:grid-cols-12 gap-32">
                    <div className="lg:col-span-8 space-y-32">
                        {newsItems.slice(1).map((item, idx) => {
                            const itemImageUrl = item.mainImage ? urlFor(item.mainImage as SanityImage)?.url() : undefined;
                            return (
                                <motion.div
                                    key={item._id}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <Link href={`/news/${item.slug.current}`} className="group block">
                                        <div className="flex flex-col md:flex-row gap-16 items-start border-b border-white/5 pb-24 group-hover:border-[#00FF41]/40 transition-colors duration-700">
                                            <div className="w-full md:w-96 aspect-video relative rounded-[3rem] overflow-hidden shrink-0 border border-white/5 shadow-xl">
                                                <SafeImage
                                                    src={itemImageUrl}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 opacity-30 group-hover:opacity-100 scale-110 group-hover:scale-100"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
                                            </div>
                                            <div className="flex-grow pt-4">
                                                <div className="flex items-center gap-6 mb-8">
                                                    <span className="text-[11px] font-black tracking-[0.5em] text-[#00FF41] uppercase italic">NODE_SYNC_VALIDATED</span>
                                                    <div className="h-1 w-1 bg-white/20 rounded-full" />
                                                    <span className="text-[11px] font-black text-white/20 uppercase tracking-[0.4em]">{new Date(item.publishedAt).toLocaleDateString()}</span>
                                                </div>
                                                <h3 className="text-3xl md:text-5xl font-[900] text-white italic uppercase tracking-tighter leading-[0.9] mb-8 group-hover:text-[#00FF41] transition-colors duration-500">
                                                    {item.title}
                                                </h3>
                                                {item.excerpt && (
                                                    <p className="text-white/30 text-xl font-light italic leading-relaxed line-clamp-2 mb-10 border-l border-white/5 pl-8">
                                                        {item.excerpt}
                                                    </p>
                                                )}
                                                <div className="flex items-center gap-6 text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">
                                                    <TechnicalIcon icon={Target} glowColor="#00FF41" className="scale-50 origin-left" />
                                                    {item.author?.name || 'FIELD_OPERATOR'}
                                                </div>
                                            </div>
                                            <div className="hidden md:flex flex-col items-center gap-4 self-center pr-8 opacity-10 group-hover:opacity-100 transition-opacity">
                                                <ArrowRight className="h-10 w-10 text-white group-hover:text-[#00FF41] group-hover:translate-x-4 transition-all" />
                                                <span className="text-[8px] font-black tracking-widest text-white/20 uppercase vertical-text">SECURE_LINK</span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Tactical Sidebar */}
                    <aside className="lg:col-span-4 space-y-24">
                        <HUDSection label="UNIT_CAPABILITIES" className="sticky top-40">
                            <div className="space-y-12">
                                <div className="space-y-6">
                                    <span className="text-[11px] font-black tracking-[0.5em] text-[#00FF41] uppercase block">NODE_FEED_STATUS</span>
                                    <div className="flex items-center justify-between pb-6 border-b border-white/5">
                                        <span className="text-[10px] font-black text-white/30 tracking-[0.3em] uppercase">LINK_INTEGRITY</span>
                                        <span className="text-[10px] font-black text-[#00FF41] tracking-[0.3em]">99.8%</span>
                                    </div>
                                    <div className="flex items-center justify-between pb-6 border-b border-white/5">
                                        <span className="text-[10px] font-black text-white/30 tracking-[0.3em] uppercase">SYNC_LATENCY</span>
                                        <span className="text-[10px] font-black text-white/60 tracking-[0.3em]">12MS</span>
                                    </div>
                                </div>
                                <div className="p-10 bg-white/[0.02] border border-white/5 rounded-3xl">
                                    <p className="text-base md:text-lg font-light text-white/20 italic leading-relaxed">
                                        All transmissions within this feed are officially cleared for sovereign protocol distribution. Field operators should maintain active session sync for real-time intel modules.
                                    </p>
                                </div>
                                <Button className="w-full h-16 rounded-full bg-white text-black font-black uppercase text-[10px] tracking-[0.4em] hover:bg-[#00FF41] transition-all">
                                    INITIATE_SYNC
                                </Button>
                            </div>
                        </HUDSection>
                    </aside>
                </div>

            </div>
        </div>
    );
}
