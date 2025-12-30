
'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Download, Image as ImageIcon, Palette, Type, Layout, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import RevealText from "@/components/RevealText";
import Magnetic from "@/components/Magnetic";
import Image from "next/image";

const logoUrl = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEirwhyibjl-3Guf8S6G442OtQmAdOzHrTcxPAuK6QxCGcAJ2I88K7Ee9DN-k_SONDddf2FeB4SwHO8l29PZ9HvHHlxJxiPDnfgrY1DBS60HsVaYv0uOAi08fm6KyrwhM7HPQhbQhL5ufVU_efX268tXM4rR8Vwok_UqbSar_b-B4btAigP5BFaU12PCjUE/s320/DENTI.SYSTEMS%20PNJ.png";

export default function BrandAssetsPage() {
    return (
        <div className="min-h-screen bg-black pt-40 pb-20 overflow-hidden relative">
            {/* Background Architectural Grid */}
            <div className="absolute inset-0 z-0 opacity-[0.03]" style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '80px 80px'
            }} />

            <div className="container px-4 relative z-10">
                <div className="max-w-4xl mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <Link href="/about" className="group flex items-center gap-3 text-[10px] font-bold text-white/30 uppercase tracking-[0.4em] mb-16 hover:text-[#00FF41] transition-colors">
                            <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-2 transition-transform" />
                            BAK_TO_COLLECTIVE
                        </Link>

                        <div className="flex items-center gap-6 mb-8">
                            <div className="h-10 w-10 rounded-full bg-[#00FF41]/10 border border-[#00FF41]/20 flex items-center justify-center">
                                <Palette className="h-5 w-5 text-[#00FF41]" />
                            </div>
                            <span className="text-[10px] font-bold tracking-[0.8em] text-[#00FF41] uppercase">IDENTITY_GUIDELINES // ASSETS</span>
                        </div>

                        <h1 className="text-6xl md:text-9xl font-[900] tracking-tighter text-white uppercase italic leading-none mb-12">
                            BRAND <span className="text-white/20">ASSETS.</span>
                        </h1>

                        <p className="max-w-xl text-white/30 text-lg md:text-2xl font-light leading-relaxed">
                            Standardized visual identifiers for DentiSystems. This repository contains approved logos, typography, and color telemetry for sovereign use.
                        </p>
                    </motion.div>
                </div>

                {/* Logo Section */}
                <section className="mb-40">
                    <div className="flex items-center gap-6 mb-16">
                        <h2 className="text-[10px] font-black tracking-[0.6em] text-white uppercase italic whitespace-nowrap">PRIMARY_LOGOMARK</h2>
                        <div className="h-px flex-grow bg-white/5" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="bg-white/[0.01] border border-white/5 rounded-[4rem] p-16 flex flex-col items-center justify-center group hover:border-[#00FF41]/30 transition-all duration-700">
                            <div className="h-40 w-40 relative mb-12 group-hover:scale-110 transition-transform duration-700">
                                <Image src={logoUrl} alt="DentiSystems Logo" fill className="object-contain opacity-60 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="text-center">
                                <span className="text-[10px] font-bold text-white/20 tracking-[0.4em] uppercase block mb-8">SOVEREIGN_MARK_v1.0</span>
                                <Magnetic>
                                    <Button size="lg" className="h-16 px-10 rounded-full bg-white text-black font-black uppercase text-[10px] tracking-[0.3em] hover:bg-[#00FF41] transition-all">
                                        DOWNLOAD_PNG <Download className="ml-4 h-4 w-4" />
                                    </Button>
                                </Magnetic>
                            </div>
                        </div>
                        <div className="bg-white border-white/5 rounded-[4rem] p-16 flex flex-col items-center justify-center group hover:bg-[#00FF41] transition-all duration-700">
                            <div className="h-40 w-40 relative mb-12">
                                <Image src={logoUrl} alt="DentiSystems Logo" fill className="object-contain invert" />
                            </div>
                            <div className="text-center">
                                <span className="text-[10px] font-bold text-black/20 tracking-[0.4em] uppercase block mb-8">DARK_SUBSTRATE_MARK</span>
                                <Magnetic>
                                    <Button size="lg" className="h-16 px-10 rounded-full bg-black text-white font-black uppercase text-[10px] tracking-[0.3em] hover:bg-black/80 transition-all">
                                        DOWNLOAD_EPS <Download className="ml-4 h-4 w-4" />
                                    </Button>
                                </Magnetic>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Typography & Colors */}
                <div className="grid lg:grid-cols-2 gap-12 mb-40">
                    <div className="bg-white/[0.01] border border-white/5 rounded-[5rem] p-16 md:p-24 relative overflow-hidden">
                        <span className="text-[10px] font-black tracking-[1em] text-[#00FF41] mb-12 block uppercase">TYPOGRAPHY_SPEC</span>
                        <div className="space-y-12">
                            <div>
                                <h3 className="text-sm font-black text-white/20 tracking-[0.4em] uppercase mb-4">Headlines // Outfit</h3>
                                <p className="text-6xl md:text-8xl font-black text-white uppercase italic tracking-tighter leading-none">THE QUICK BROWN FOX</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-black text-white/20 tracking-[0.4em] uppercase mb-4">Tactical // Space Grotesk</h3>
                                <p className="text-4xl md:text-6xl font-bold text-white/40 tracking-tight">Jumps over the lazy dog.</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-black text-white/20 tracking-[0.4em] uppercase mb-4">Body // Manrope</h3>
                                <p className="text-xl font-light text-white/20 italic leading-relaxed">Providing high-fidelity intelligence for sovereign entities.</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white/[0.01] border border-white/5 rounded-[5rem] p-16 md:p-24">
                        <span className="text-[10px] font-black tracking-[1em] text-[#00FF41] mb-12 block uppercase">COLOR_TELEMETRY</span>
                        <div className="grid grid-cols-2 gap-8">
                            {[
                                { name: "Sovereign_Green", hex: "#00FF41", rgb: "0, 255, 65" },
                                { name: "Deep_Space", hex: "#000000", rgb: "0, 0, 0" },
                                { name: "Ghost_White", hex: "#FFFFFF", rgb: "255, 255, 255" },
                                { name: "Steel_Gray", hex: "#111111", rgb: "17, 17, 17" }
                            ].map(color => (
                                <div key={color.name} className="space-y-4">
                                    <div className="h-32 w-full rounded-2xl border border-white/10" style={{ backgroundColor: color.hex }} />
                                    <div className="text-left">
                                        <h4 className="text-sm font-black text-white uppercase italic tracking-tight">{color.name}</h4>
                                        <p className="text-[10px] font-bold text-white/20 tracking-widest uppercase">{color.hex}</p>
                                        <p className="text-[10px] font-bold text-white/20 tracking-widest uppercase">{color.rgb}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* HUD Assurance */}
                <div className="mt-40 pt-12 border-t border-white/5 flex justify-between items-center opacity-10">
                    <div className="text-[8px] font-bold tracking-[0.5em] text-white uppercase font-mono">BRAND_NODE_v1.0 // STANDBY</div>
                    <p className="text-[8px] font-bold tracking-[0.4em] text-white uppercase italic">" IDENTITY IS THE FIRST LINE OF DEFENSE. "</p>
                </div>
            </div>
        </div>
    );
}
