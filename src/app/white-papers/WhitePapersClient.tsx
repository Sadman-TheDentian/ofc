'use client';

import { ArrowRight, FileText, Newspaper, ShieldAlert, Mail, Activity, Target, Zap, Lock, Radio, Shield, ChevronRight, ChevronLeft } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SafeImage from "@/components/SafeImage";
import TechnicalIcon from "@/components/TechnicalIcon";
import { urlFor } from "@/lib/sanity-client";
import { WhitePaper, SanityImage } from "@/lib/types";
import RevealText from "@/components/RevealText";

export default function WhitePapersClient({ papers }: { papers: WhitePaper[] }) {
    return (
        <div className="min-h-screen bg-black pt-40 pb-20 overflow-hidden relative">
            <div className="container px-4 relative z-10">
                {/* Header Section */}
                <div className="max-w-7xl mb-60 relative">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="flex items-center gap-8 mb-12">
                            <TechnicalIcon icon={FileText} glowColor="#00FF41" className="scale-75 origin-left" />
                            <span className="text-[10px] font-black tracking-[1.2em] text-[#00FF41] uppercase">MISSION_CRITICAL_DOCUMENTATION</span>
                        </div>
                        <h1 className="text-7xl md:text-[14vw] font-[900] tracking-[-0.05em] text-white uppercase italic leading-[0.7] mb-16">
                            WHITE <br /><span className="text-white/10">PAPERS.</span>
                        </h1>
                        <p className="max-w-4xl text-white/40 text-2xl md:text-3xl font-light italic leading-relaxed">
                            Deep-dives into the substrate of proprietary defensive architectures and offensive neutralization research.
                        </p>
                    </motion.div>
                </div>

                {papers && papers.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {papers.map((paper, idx) => {
                            const imageUrl = paper.mainImage ? urlFor(paper.mainImage as SanityImage).url() : undefined;
                            return (
                                <motion.div
                                    key={paper._id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1, duration: 0.8 }}
                                    className="group"
                                >
                                    <Link href={`/white-papers/${paper.slug.current}`}>
                                        <div className="bg-white/[0.01] border border-white/5 rounded-[3.5rem] overflow-hidden hover:border-[#00FF41]/30 transition-all duration-700 h-full flex flex-col relative group/card">
                                            {/* Industrial Overlay */}
                                            <div className="absolute top-0 right-0 p-8 opacity-20">
                                                <span className="text-[10px] font-black text-white italic tracking-widest uppercase">MSN_{idx + 104}</span>
                                            </div>

                                            <div className="h-72 relative overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000">
                                                <SafeImage
                                                    src={imageUrl ?? undefined}
                                                    alt={paper.title}
                                                    fill
                                                    className="object-cover opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                                                {/* Doc Icon HUD */}
                                                <div className="absolute bottom-6 left-6 h-12 w-12 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center">
                                                    <FileText className="h-5 w-5 text-white/40 group-hover:text-[#00FF41] transition-colors" />
                                                </div>
                                            </div>

                                            <div className="p-12 flex flex-col flex-grow">
                                                <div className="flex items-center gap-4 mb-6">
                                                    <Activity className="h-3 w-3 text-[#00FF41]" />
                                                    <span className="text-[9px] font-bold text-white/20 tracking-[0.4em] uppercase">DOCUMENT_READY_v1.2</span>
                                                </div>
                                                <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter leading-tight group-hover:text-[#00FF41] transition-colors mb-8">
                                                    {paper.title}
                                                </h2>

                                                <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                                                    <div className="flex items-center gap-2 text-[10px] font-black text-white/20 group-hover:text-white tracking-widest uppercase transition-colors">
                                                        ACCESS_ASSET <ArrowRight className="h-4 w-4 transform group-hover:translate-x-2 transition-transform" />
                                                    </div>
                                                    <ChevronRight className="h-4 w-4 text-white/5 group-hover:text-[#00FF41] transition-colors" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="bg-white/[0.01] border border-dashed border-white/10 rounded-[4rem] p-40 text-center">
                        <RevealText text="NULL_RECEPTION" className="text-[10px] font-bold tracking-[1em] text-white/20 mb-8 block uppercase" />
                        <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter">NO_ASSETS_FOUND</h3>
                        <p className="text-white/20 text-lg font-light mt-4 italic">The archive frequency is currently clear. Check back for new tactical documentation.</p>
                    </div>
                )}
            </div>

            {/* Background Architectural Noise */}
            <div
                className="absolute inset-0 pointer-events-none z-0 opacity-[0.035] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0%200%20200%20200'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter%20id='noiseFilter'%3E%3CfeTurbulence%20type='fractalNoise'%20baseFrequency='0.65'%20numOctaves='3'%20stitchTiles='stitch'/%3E%3C/filter%3E%3Crect%20width='100%25'%20height='100%25'%20filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />
        </div>
    );
}
