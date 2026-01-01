
'use client';

import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import { ThreatReport, SanityImage } from "@/lib/types";
import { urlFor } from "@/lib/sanity-client";
import { ArrowRight, FileText, Target, Shield, MapPin, Eye, Activity, Terminal, Radio, Lock } from "lucide-react";
import { motion } from "framer-motion";
import RevealText from "@/components/RevealText";
import Magnetic from "@/components/Magnetic";
import TechnicalIcon from "@/components/TechnicalIcon";
import GlitchText from "@/components/GlitchText";

export default function ThreatReportsClient({ reports }: { reports: ThreatReport[] }) {
    return (
        <div className="min-h-screen bg-black pt-24 md:pt-40 pb-20 overflow-hidden relative">
            <div className="container px-4 relative z-10">
                {/* Header Section */}
                <div className="max-w-7xl mb-12 md:mb-32 relative">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="flex items-center gap-8 mb-8 md:mb-12">
                            <TechnicalIcon icon={Target} glowColor="#FF3131" className="scale-75 origin-left" />
                        </div>
                        <h1 className="text-5xl md:text-8xl lg:text-9xl font-[900] tracking-tighter text-white uppercase italic leading-[0.7] mb-12 md:mb-16">
                            <GlitchText text="THE THREATS." />
                        </h1>
                        <p className="max-w-4xl text-white/40 text-xl md:text-3xl font-light italic leading-relaxed">
                            Granular analysis of active exploit chains and adversarial methodologies identified within sovereign perimeters.
                        </p>
                    </motion.div>
                </div>

                {/* Intelligence Strip Layout */}
                <div className="space-y-4">
                    {reports && reports.length > 0 ? (
                        reports.map((report, idx) => {
                            const imageUrl = report.mainImage ? urlFor(report.mainImage as SanityImage)?.url() : undefined;
                            return (
                                <motion.div
                                    key={report._id}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <Link href={`/threat-reports/${report.slug.current}`} className="group block">
                                        <div className="bg-white/[0.01] border border-white/5 rounded-[4rem] p-12 md:px-16 md:py-12 hover:bg-white/[0.03] hover:border-red-500/30 transition-all duration-700 flex flex-col lg:flex-row items-center gap-12">
                                            {/* Report ID HUD */}
                                            <div className="flex flex-col items-center lg:items-start shrink-0">
                                                <span className="text-[10px] font-black text-red-500 tracking-[0.4em] uppercase mb-4 opacity-40">REP_v{idx + 1}</span>
                                                <div className="h-20 w-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20 group-hover:text-red-500 transition-all group-hover:rotate-12">
                                                    <Terminal className="h-10 w-10 shrink-0" />
                                                </div>
                                            </div>

                                            {/* Content Body */}
                                            <div className="flex-grow text-center lg:text-left">
                                                <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                                                    <div className="flex items-center gap-2">
                                                        <Activity className="h-3 w-3 text-red-500" />
                                                        <span className="text-[8px] font-bold text-white/20 tracking-widest uppercase italic">ACTIVE_THREAT</span>
                                                    </div>
                                                    <div className="h-1 w-1 bg-white/10 rounded-full" />
                                                    <div className="flex items-center gap-2">
                                                        <Target className="h-3 w-3 text-red-500" />
                                                        <span className="text-[8px] font-bold text-white/20 tracking-widest uppercase italic">HIGH_SEVERITY</span>
                                                    </div>
                                                </div>
                                                <h3 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none group-hover:translate-x-4 transition-transform duration-700">{report.title}</h3>
                                                <p className="text-white/30 text-base font-light italic mt-6 max-w-2xl line-clamp-1">In-depth technical analysis of emerging vectors and neutralization strategies.</p>
                                            </div>

                                            {/* Large Hover Preview */}
                                            <div className="hidden lg:block w-72 aspect-video relative rounded-3xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000 opacity-20 group-hover:opacity-100 border border-white/10">
                                                <SafeImage src={imageUrl} alt={report.title} fill className="object-cover" />
                                            </div>

                                            {/* Action */}
                                            <Magnetic>
                                                <div className="h-20 w-20 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-red-500 transition-all">
                                                    <ArrowRight className="h-8 w-8" />
                                                </div>
                                            </Magnetic>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })
                    ) : (
                        <div className="text-center py-40 bg-white/[0.01] border border-white/5 rounded-[4rem]">
                            <span className="text-[10px] font-black tracking-[1em] text-white/10 uppercase mb-4 block">STATUS_LOG // EMPTY</span>
                            <h3 className="text-4xl font-black text-white/20 uppercase italic tracking-tighter">NO_ACTIVE_REPORTS</h3>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
