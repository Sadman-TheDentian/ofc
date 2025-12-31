
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
        <div className="min-h-screen bg-black pt-40 pb-20 overflow-hidden">
            <div className="container px-4">
                {/* Intelligence Table Header */}
                <div className="max-w-7xl mb-32 relative">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="flex items-center gap-8 mb-12">
                            <div className="h-0.5 w-16 bg-[#00FF41]" />
                            <RevealText text="MISSION_REPORTS // DECLASSIFIED" className="text-[10px] font-bold tracking-[1.2em] text-[#00FF41] uppercase" />
                        </div>
                        <h1 className="text-7xl md:text-[14vw] font-[900] tracking-[-0.05em] text-white uppercase italic leading-[0.7] mb-16">
                            THE <br /><span className="text-white/10">ARCHIVES.</span>
                        </h1>
                        <p className="max-w-3xl text-white/40 text-2xl md:text-3xl font-light italic leading-relaxed">
                            Documented neutralizations of high-fidelity threats and the re-architecture of resilient digital perimeters.
                        </p>
                    </motion.div>
                </div>

                {/* Filter HUD */}
                <div className="mb-24 flex flex-col md:flex-row gap-12 items-end justify-between border-b border-white/5 pb-16">
                    <div className="w-full md:w-96">
                        <span className="text-[10px] font-black tracking-[0.4em] text-white/20 uppercase mb-4 block italic">SEARCH_QUERY // KEYWORD</span>
                        <input
                            type="text"
                            placeholder="QUERY_CORE_ARCHIVE..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/10 rounded-2xl h-16 px-8 text-white font-black tracking-widest uppercase text-xs focus:border-[#00FF41]/50 outline-none transition-all"
                        />
                    </div>
                    <div className="flex flex-wrap gap-4">
                        {industries.map(industry => (
                            <button
                                key={industry}
                                onClick={() => setActiveFilter(industry)}
                                className={`px-8 py-3 rounded-full border text-[10px] font-black tracking-[0.3em] uppercase transition-all ${activeFilter === industry
                                        ? "bg-[#00FF41] border-[#00FF41] text-black"
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
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <Link href={`/case-studies/${study.slug.current}`} className="group block">
                                    <div className="bg-white/[0.01] border border-white/10 rounded-[5rem] p-12 md:px-24 md:py-16 hover:bg-white/[0.03] hover:border-[#00FF41]/30 transition-all duration-700 flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden">
                                        {/* Mission ID HUD */}
                                        <div className="flex flex-col items-center lg:items-start shrink-0">
                                            <span className="text-[10px] font-[900] text-[#00FF41] tracking-[0.6em] uppercase mb-8 opacity-40">MSN_v{idx + 1}</span>
                                            <div>
                                                <TechnicalIcon icon={FileText} glowColor="#00FF41" className="scale-110" />
                                            </div>
                                        </div>

                                        {/* Content Body */}
                                        <div className="flex-grow text-center lg:text-left">
                                            <div className="flex items-center justify-center lg:justify-start gap-6 mb-8">
                                                <div className="flex items-center gap-3">
                                                    <Target className="h-4 w-4 text-[#00FF41]" />
                                                    <span className="text-[10px] font-black text-white/20 tracking-[0.4em] uppercase italic">NEUTRALIZED_v6</span>
                                                </div>
                                                <div className="h-1.5 w-1.5 bg-white/10 rounded-full" />
                                                <div className="flex items-center gap-3">
                                                    <Shield className="h-4 w-4 text-[#00FF41]" />
                                                    <span className="text-[10px] font-black text-white/20 tracking-[0.4em] uppercase italic">HARDENED</span>
                                                </div>
                                            </div>
                                            <h3 className="text-4xl md:text-7xl font-[900] text-white italic uppercase tracking-tighter leading-none group-hover:translate-x-8 transition-transform duration-700">{study.title}</h3>
                                            <p className="text-white/30 text-xl font-light italic mt-10 max-w-3xl line-clamp-2">{study.summary}</p>
                                        </div>

                                        {/* Large Hover Preview */}
                                        <div className="hidden lg:block w-96 aspect-video relative rounded-[3rem] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000 opacity-20 group-hover:opacity-100 border border-white/10 group-hover:scale-105">
                                            <SafeImage src={imageUrl} alt={study.title} fill className="object-cover" />
                                        </div>

                                        {/* Action */}
                                        <Magnetic>
                                            <div className="h-24 w-24 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-[#00FF41] transition-all group-hover:scale-110 shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                                                <ArrowRight className="h-10 w-10" />
                                            </div>
                                        </Magnetic>
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
