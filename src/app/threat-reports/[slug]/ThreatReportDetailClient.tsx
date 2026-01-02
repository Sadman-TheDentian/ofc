
'use client';

import { ThreatReport, SanityImage } from "@/lib/types";
import { urlFor } from "@/lib/sanity-client";
import { PortableText } from "@portabletext/react";
import SafeImage from "@/components/SafeImage";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft, ShieldAlert, Activity, Target, Terminal, Calendar } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import RevealText from "@/components/RevealText";
import Magnetic from "@/components/Magnetic";
import GlitchText from "@/components/GlitchText";
import CyberGrid from "@/components/CyberGrid";

export default function ThreatReportDetailClient({ report }: { report: ThreatReport }) {
    const imageUrl = report.mainImage ? urlFor(report.mainImage as SanityImage)?.url() : undefined;

    return (
        <div className="min-h-screen bg-black pt-24 md:pt-40 pb-20 overflow-hidden relative">
            <CyberGrid />
            <div className="container px-4 relative z-10">
                {/* Tactical Header */}
                <div className="max-w-7xl mb-12 md:mb-32 relative">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <Link href="/threat-reports" className="group flex items-center gap-3 text-[10px] font-bold text-white/30 uppercase tracking-[0.4em] mb-12 md:mb-16 hover:text-red-500 transition-colors px-4">
                            <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-2 transition-transform" />
                            BAK_TO_THREAT_DATABASE
                        </Link>

                        <div className="flex items-center gap-8 mb-8 md:mb-12">
                            <div className="h-10 w-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                                <ShieldAlert className="h-5 w-5 text-red-500" />
                            </div>
                            <RevealText text="INTEL_UNIT // ADVISORY_NODE" className="text-[10px] font-bold tracking-[0.8em] text-red-500 uppercase" />
                        </div>

                        <h1 className="text-5xl md:text-8xl lg:text-9xl font-[900] tracking-tighter text-white uppercase italic leading-[0.7] mb-12 md:mb-16">
                            <GlitchText text={report.title} />
                        </h1>

                        <div className="flex flex-wrap gap-8 items-center border-t border-white/5 pt-12">
                            <div className="flex items-center gap-3">
                                <Calendar className="h-4 w-4 text-red-500/40" />
                                <span className="text-[10px] font-bold text-white/40 tracking-widest uppercase italic">
                                    {new Date(report.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Activity className="h-4 w-4 text-red-500/40" />
                                <span className="text-[10px] font-bold text-white/40 tracking-widest uppercase italic">STATUS: CRITICAL</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Target className="h-4 w-4 text-red-500/40" />
                                <span className="text-[10px] font-bold text-white/40 tracking-widest uppercase italic">HIGH_FIDELITY_INTEL</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-12 gap-20">
                    <div className="lg:col-span-8">
                        {/* Cinematic Hero Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5 }}
                            className="relative h-[500px] w-full mb-24 rounded-[4rem] overflow-hidden border border-white/10 group"
                        >
                            <SafeImage src={imageUrl} alt={report.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                            <div className="absolute bottom-12 left-12 flex items-center gap-6">
                                <div className="h-1 w-12 bg-red-500" />
                                <span className="text-[10px] font-black text-white tracking-[0.6em] uppercase">MISSION_ASSET_VALIDATED</span>
                            </div>
                        </motion.div>

                        {/* Content */}
                        <div className="prose prose-invert max-w-none prose-h2:text-4xl prose-h2:font-[900] prose-h2:italic prose-h2:uppercase prose-h2:tracking-tighter prose-h2:text-white prose-p:text-white/40 prose-p:text-xl prose-p:font-light prose-p:leading-relaxed prose-strong:text-white prose-strong:font-black prose-li:text-white/30 prose-li:font-light">
                            {report.summary && <PortableText value={report.summary} />}
                        </div>
                    </div>

                    <div className="lg:col-span-4 self-start sticky top-32">
                        {report.fileURL && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-12 backdrop-blur-3xl relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                                    <Download className="h-32 w-32 text-red-500" />
                                </div>

                                <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-8 leading-none">ACTIONABLE<br /><span className="text-white/20">PAYLOAD.</span></h2>
                                <p className="text-white/30 text-sm font-light italic leading-relaxed mb-12">
                                    Access the full-spectrum technical whitepaper including IOCs, remediation scripts, and architectural neutralization protocols.
                                </p>

                                <Magnetic className="w-full">
                                    <Button asChild size="lg" className="h-16 w-full rounded-full bg-white text-black font-black uppercase text-[10px] tracking-[0.3em] hover:bg-red-500 transition-all shadow-2xl group/btn">
                                        <a href={report.fileURL} download target="_blank" rel="noopener noreferrer" className="flex items-center gap-4">
                                            INITIALIZE_DOWNLOAD <Download className="h-4 w-4 group-hover/btn:translate-y-1 transition-transform" />
                                        </a>
                                    </Button>
                                </Magnetic>

                                <div className="mt-12 flex items-center gap-4">
                                    <div className="h-px flex-grow bg-white/5" />
                                    <span className="text-[8px] font-bold text-white/10 tracking-widest uppercase">ENCRYPTED_TRANSMISSION</span>
                                    <div className="h-px flex-grow bg-white/5" />
                                </div>
                            </motion.div>
                        )}

                        <div className="mt-12 p-10 bg-white/[0.01] border border-white/5 rounded-[2.5rem]">
                            <div className="flex items-center gap-3 mb-6">
                                <Terminal className="h-4 w-4 text-white/20" />
                                <span className="text-[8px] font-bold text-white/20 tracking-widest uppercase">KERNEL_NOTICE</span>
                            </div>
                            <p className="text-[10px] font-light text-white/30 italic leading-relaxed">
                                This intelligence report is strictly limited to sovereign node operators and verified intelligence cells. Unauthorized duplication will result in protocol termination.
                            </p>
                        </div>
                    </div>
                </div>

                {/* HUD Assurance */}
                <div className="mt-40 pt-12 border-t border-white/5 flex justify-between items-center opacity-10">
                    <div className="text-[8px] font-bold tracking-[0.5em] text-white uppercase font-mono">INTEL_NODE_STATE // SECURE_READ</div>
                    <p className="text-[8px] font-bold tracking-[0.4em] text-white uppercase italic">" PREDICTION IS THE ULTIMATE DEFENSE. "</p>
                </div>
            </div>
        </div>
    );
}
