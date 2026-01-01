
'use client';

import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import { CaseStudy, SanityImage } from "@/lib/types";
import { urlFor } from "@/lib/sanity-client";
import { ArrowRight, FileText, Target, Shield, MapPin, Eye } from "lucide-react";
import { motion } from "framer-motion";
import RevealText from "@/components/RevealText";
import Magnetic from "@/components/Magnetic";
import TechnicalIcon from "@/components/TechnicalIcon";

import { useState, useMemo } from "react";

import GlitchText from "@/components/GlitchText";

export default function CaseStudiesClient({ studies }: { studies: CaseStudy[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("ALL");

    const industries = ["ALL", ...Array.from(new Set(studies.map(s => s.industry).filter(Boolean)))];

    const filteredStudies = useMemo(() => {
        return studies.filter(study => {
            const matchesSearch = study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                study.summary.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilter = activeFilter === "ALL" || study.industry === activeFilter;
            return matchesSearch && matchesFilter;
        });
    }, [studies, searchQuery, activeFilter]);

    return (
        <div className="min-h-screen bg-black pt-24 md:pt-40 pb-20 overflow-hidden relative">
            <div className="container px-4 relative z-10">
                {/* Intelligence Table Header */}
                <div className="max-w-7xl mb-12 md:mb-32 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute -top-40 -left-60 w-96 h-96 bg-[#00FF41]/5 blur-[120px] rounded-full pointer-events-none"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="flex items-center gap-10 mb-10 md:mb-16">
                            <TechnicalIcon icon={Target} glowColor="#00FF41" className="scale-75 origin-left" />
                            <RevealText text="MISSION_REPORTS // ARCHIVAL_DECLASSIFICATION" className="text-[10px] font-black tracking-[1.2em] text-[#00FF41] uppercase italic" />
                        </div>
                        <h1 className="text-5xl md:text-8xl lg:text-[160px] font-[900] tracking-[-0.05em] text-white uppercase italic leading-[0.7] mb-12 md:mb-16">
                            <GlitchText text="THE" /> <br /><span className="text-white/10"><GlitchText text="ARCHIVES." /></span>
                        </h1>
                        <p className="max-w-4xl text-white/40 text-xl md:text-3xl font-light italic leading-relaxed border-l border-white/10 pl-10">
                            "Documented neutralizations of high-fidelity threats and the re-architecture of resilient digital substrates across global infrastructures."
                        </p>
                    </motion.div>
                </div>

                {/* Filter HUD */}
                <div className="mb-24 flex flex-col md:flex-row gap-12 items-end justify-between border-b border-white/5 pb-16">
                    <div className="w-full md:w-96 group/search">
                        <span className="text-[10px] font-black tracking-[0.4em] text-[#00FF41]/40 uppercase mb-4 block italic group-hover/search:text-[#00FF41] transition-colors">SEARCH_QUERY // ENGINE</span>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="QUERY_CORE_ARCHIVE..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/[0.02] border border-white/10 rounded-2xl h-16 px-8 text-white font-black tracking-widest uppercase text-xs focus:border-[#00FF41]/50 outline-none transition-all placeholder:text-white/10"
                            />
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-20 group-hover/search:opacity-100 transition-opacity">
                                <Eye className="h-5 w-5 text-white" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        {industries.map(industry => (
                            <button
                                key={industry}
                                onClick={() => setActiveFilter(industry)}
                                className={`px-10 py-4 rounded-full border text-[10px] font-black tracking-[0.4em] uppercase transition-all duration-500 scale-90 hover:scale-100 ${activeFilter === industry
                                    ? "bg-[#00FF41] border-[#00FF41] text-black shadow-[0_0_30px_rgba(0,255,65,0.3)]"
                                    : "bg-transparent border-white/10 text-white/20 hover:border-white/30 hover:text-white"
                                    }`}
                            >
                                {industry}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Intelligence Strip Layout */}
                <div className="space-y-12">
                    {filteredStudies.map((study, idx) => {
                        const imageUrl = study.mainImage ? urlFor(study.mainImage as SanityImage)?.url() : undefined;
                        return (
                            <motion.div
                                key={study._id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <Link href={`/case-studies/${study.slug.current}`} className="group block">
                                    <div className="bg-white/[0.01] border border-white/5 rounded-[5rem] p-12 md:px-24 md:py-20 hover:bg-white/[0.03] hover:border-[#00FF41]/30 transition-all duration-1000 flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden group/card shadow-2xl">

                                        {/* HUD Hover Corners */}
                                        <div className="absolute inset-0 p-12 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                                            <div className="w-full h-full border border-[#00FF41]/10 rounded-[4rem]" />
                                            <div className="absolute top-12 left-12 w-12 h-12 border-t border-l border-[#00FF41]/40" />
                                            <div className="absolute top-12 right-12 w-12 h-12 border-t border-r border-[#00FF41]/40" />
                                            <div className="absolute bottom-12 left-12 w-12 h-12 border-b border-l border-[#00FF41]/40" />
                                            <div className="absolute bottom-12 right-12 w-12 h-12 border-b border-r border-[#00FF41]/40" />
                                        </div>

                                        {/* Mission ID HUD */}
                                        <div className="flex flex-col items-center lg:items-center shrink-0 min-w-40">
                                            <span className="text-[12px] font-black text-[#00FF41] tracking-[0.5em] uppercase mb-10 italic group-hover:scale-110 transition-transform">ID_{idx + 101}</span>
                                            <div className="relative">
                                                <div className="absolute -inset-4 bg-[#00FF41]/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <TechnicalIcon icon={FileText} glowColor="#00FF41" className="scale-125" />
                                            </div>
                                            <span className="text-[8px] font-black text-white/10 tracking-[0.3em] uppercase mt-12 italic">DEPLOY_v9</span>
                                        </div>

                                        {/* Content Body */}
                                        <div className="flex-grow text-center lg:text-left relative z-10">
                                            <div className="flex items-center justify-center lg:justify-start gap-8 mb-10">
                                                <div className="flex items-center gap-4 group/item">
                                                    <Target className="h-5 w-5 text-[#00FF41] group-hover/card:animate-pulse" />
                                                    <span className="text-[11px] font-black text-white/20 tracking-[0.4em] uppercase italic group-hover/card:text-white/60 transition-colors">{study.industry || 'CORE_SECTOR'}</span>
                                                </div>
                                                <div className="h-1.5 w-1.5 bg-white/20 rounded-full" />
                                                <div className="flex items-center gap-4">
                                                    <Shield className="h-5 w-5 text-[#00FF41]" />
                                                    <span className="text-[11px] font-black text-[#00FF41]/40 tracking-[0.4em] uppercase italic">HARDENED_LINK</span>
                                                </div>
                                            </div>
                                            <h3 className="text-4xl md:text-7xl font-[1000] text-white italic uppercase tracking-tighter leading-[0.85] group-hover:translate-x-10 transition-transform duration-1000 mb-10">
                                                {study.title}
                                            </h3>
                                            <p className="text-white/30 text-xl font-light italic max-w-4xl line-clamp-2 border-l border-white/5 pl-8 group-hover:border-[#00FF41]/20 transition-colors">
                                                {study.summary}
                                            </p>
                                        </div>

                                        {/* Large Hover Preview */}
                                        <div className="hidden lg:block w-[400px] aspect-video relative rounded-[3rem] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000 opacity-20 group-hover:opacity-100 border border-white/5 group-hover:border-[#00FF41]/20 shadow-2xl">
                                            <SafeImage src={imageUrl} alt={study.title} fill className="object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                                            <div className="absolute bottom-6 left-8">
                                                <span className="text-[9px] font-black text-[#00FF41] tracking-[0.4em] uppercase italic">VISUAL_INTEL</span>
                                            </div>
                                        </div>

                                        {/* Action */}
                                        <div className="shrink-0 flex flex-col items-center gap-6">
                                            <Magnetic>
                                                <div className="h-28 w-28 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-[#00FF41] transition-all duration-700 group-hover:scale-110 group-hover:rotate-12 shadow-[0_0_80px_rgba(0,255,65,0.2)]">
                                                    <ArrowRight className="h-12 w-12" />
                                                </div>
                                            </Magnetic>
                                            <span className="text-[8px] font-black tracking-[0.6em] text-white/10 uppercase vertical-text hidden lg:block group-hover:text-[#00FF41] transition-colors">INIT_DECON</span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}
