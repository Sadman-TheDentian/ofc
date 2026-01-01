
'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Download, Palette, Type, Shield, Zap, Globe, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import RevealText from "@/components/RevealText";
import Magnetic from "@/components/Magnetic";
import Image from "next/image";
import TechnicalIcon from "@/components/TechnicalIcon";
import GlitchText from "@/components/GlitchText";

const logoUrl = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEirwhyibjl-3Guf8S6G442OtQmAdOzHrTcxPAuK6QxCGcAJ2I88K7Ee9DN-k_SONDddf2FeB4SwHO8l29PZ9HvHHlxJxiPDnfgrY1DBS60HsVaYv0uOAi08fm6KyrwhM7HPQhbQhL5ufVU_efX268tXM4rR8Vwok_UqbSar_b-B4btAigP5BFaU12PCjUE/s320/DENTI.SYSTEMS%20PNJ.png";

export default function BrandAssetsPage() {
    return (
        <div className="min-h-screen bg-black pt-24 md:pt-40 pb-20 overflow-hidden relative">
            <div className="container px-4 relative z-10">
                <div className="max-w-7xl mb-12 md:mb-32 relative">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <Link href="/about" className="group flex items-center gap-3 text-[10px] font-bold text-white/30 uppercase tracking-[0.4em] mb-12 md:mb-16 hover:text-[#00FF41] transition-colors px-4">
                            <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-2 transition-transform" />
                            BAK_TO_COLLECTIVE
                        </Link>

                        <div className="flex items-center gap-8 mb-8 md:mb-12">
                            <TechnicalIcon icon={Palette} glowColor="#00FF41" className="scale-75 origin-left" />
                            <RevealText text="IDENTITY_GUIDELINES // ASSETS" className="text-[10px] font-bold tracking-[1em] text-[#00FF41] uppercase" />
                        </div>

                        <h1 className="text-5xl md:text-8xl lg:text-9xl font-[900] tracking-tighter text-white uppercase italic leading-[0.7] mb-12 md:mb-16">
                            <GlitchText text="BRAND ASSETS." />
                        </h1>

                        <p className="max-w-4xl text-white/40 text-xl md:text-3xl font-light italic leading-relaxed">
                            "Standardized visual identifiers for DentiSystems. Approved logos, typography, and color telemetry for sovereign use."
                        </p>
                    </motion.div>
                </div>

                {/* Logoshaping Section */}
                <section className="mb-32 md:mb-60 overflow-hidden">
                    <div className="flex items-center gap-8 mb-16 md:mb-24">
                        <div className="h-px flex-grow bg-white/10" />
                        <h2 className="text-[10px] font-black tracking-[0.8em] text-[#00FF41] uppercase italic">LOGO_CONSTRUCTION</h2>
                        <div className="h-px flex-grow bg-white/10" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white/[0.01] border border-white/10 rounded-[3rem] md:rounded-[4rem] p-8 md:p-16 lg:p-24 flex flex-col items-center justify-center group hover:bg-white/[0.03] hover:border-[#00FF41]/30 transition-all duration-700 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 text-[8px] font-mono text-white/5 uppercase tracking-[0.4em]">SPEC: LIGHT_SUBSTRATE</div>
                            <div className="h-40 w-40 md:h-64 md:w-64 relative mb-12 md:mb-20 group-hover:scale-110 transition-transform duration-1000">
                                <div className="absolute -inset-10 bg-[#00FF41]/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                <Image src={logoUrl} alt="DentiSystems Logo" fill className="object-contain opacity-40 group-hover:opacity-100 transition-all" />
                            </div>
                            <div className="flex flex-col items-center gap-8 w-full">
                                <span className="text-[9px] font-bold text-white/10 tracking-[0.5em] uppercase">M_ID: SOVEREIGN_PRIMARY</span>
                                <Magnetic>
                                    <Button size="lg" className="h-16 md:h-20 px-10 md:px-12 rounded-full bg-white text-black font-[900] uppercase text-[11px] tracking-[0.4em] hover:bg-[#00FF41] transition-all">
                                        DL_PACK_PNG <Download className="ml-4 h-5 w-5" />
                                    </Button>
                                </Magnetic>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-[3rem] md:rounded-[4rem] p-8 md:p-16 lg:p-24 flex flex-col items-center justify-center group hover:bg-[#00FF41] transition-all duration-1000 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 text-[8px] font-mono text-black/5 uppercase tracking-[0.4em]">SPEC: DARK_INVERSION</div>
                            <div className="h-40 w-40 md:h-64 md:w-64 relative mb-12 md:mb-20 group-hover:scale-110 transition-transform duration-1000">
                                <Image src={logoUrl} alt="DentiSystems Logo" fill className="object-contain invert" />
                            </div>
                            <div className="flex flex-col items-center gap-8 w-full">
                                <span className="text-[9px] font-bold text-black/20 tracking-[0.5em] uppercase">M_ID: MONOCHROME_INVERT</span>
                                <Magnetic>
                                    <Button size="lg" className="h-16 md:h-20 px-10 md:px-12 rounded-full bg-black text-white font-[900] uppercase text-[11px] tracking-[0.4em] hover:bg-black/80 transition-all">
                                        DL_PACK_EPS <Download className="ml-4 h-5 w-5" />
                                    </Button>
                                </Magnetic>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Typography Engine */}
                <div className="grid lg:grid-cols-12 gap-8 md:gap-12 mb-32 md:mb-60 overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-8 bg-white/[0.01] border border-white/10 rounded-[3rem] md:rounded-[5rem] p-8 md:p-16 lg:p-32 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-20 opacity-[0.02]">
                            <Type className="h-40 w-40 md:h-80 md:w-80 text-white" />
                        </div>
                        <span className="text-[10px] font-black tracking-[1em] text-[#00FF41] mb-12 md:mb-20 block uppercase">TYPOGRAPHY_CORE</span>
                        <div className="space-y-16 md:space-y-24">
                            <div className="group/spec">
                                <div className="flex items-center gap-6 mb-6 md:mb-8">
                                    <h3 className="text-[9px] font-black text-white/20 tracking-[0.6em] uppercase">SYSTEM_HEADLINE // OUTFIT</h3>
                                    <div className="h-px flex-grow bg-white/5 group-hover/spec:bg-[#00FF41]/20 transition-colors" />
                                </div>
                                <p className="text-4xl sm:text-6xl md:text-9xl font-[900] text-white uppercase italic tracking-tighter leading-none">AB / 012345</p>
                            </div>
                            <div className="group/spec">
                                <div className="flex items-center gap-6 mb-6 md:mb-8">
                                    <h3 className="text-[9px] font-black text-white/20 tracking-[0.6em] uppercase">TAKE_INTEL // SPACE_GROTESK</h3>
                                    <div className="h-px flex-grow bg-white/5 group-hover/spec:bg-[#00FF41]/20 transition-colors" />
                                </div>
                                <p className="text-2xl sm:text-4xl md:text-6xl font-bold text-white/40 tracking-tight leading-none italic uppercase">Hyper-Synchronous Intelligence 2024</p>
                            </div>
                            <div className="group/spec">
                                <div className="flex items-center gap-6 mb-6 md:mb-8">
                                    <h3 className="text-[9px] font-black text-white/20 tracking-[0.6em] uppercase">BODY_SUBSTRATE // MANROPE</h3>
                                    <div className="h-px flex-grow bg-white/5 group-hover/spec:bg-[#00FF41]/20 transition-colors" />
                                </div>
                                <p className="text-xl md:text-2xl font-light text-white/20 italic leading-relaxed max-w-2xl">
                                    Proprietary intelligence modules engineered for high-fidelity asset protection and sovereign data integrity audits.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-4 bg-white/[0.01] border border-white/10 rounded-[3rem] md:rounded-[5rem] p-8 md:p-16 lg:p-24 flex flex-col"
                    >
                        <span className="text-[10px] font-black tracking-[1em] text-[#00FF41] mb-12 md:mb-20 block uppercase font-mono">COLOR_TELEMETRY</span>
                        <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
                            {[
                                { name: "Sovereign_Green", hex: "#00FF41", rgb: "0, 255, 65", use: "PRIMARY_ACTION" },
                                { name: "Deep_Substrate", hex: "#000000", rgb: "0, 0, 0", use: "ENVIRONMENT_BASE" },
                                { name: "Neutral_White", hex: "#FFFFFF", rgb: "255, 255, 255", use: "TACTICAL_TEXT" },
                                { name: "Hard_Iron", hex: "#111111", rgb: "17, 17, 17", use: "UI_COMPONENT" }
                            ].map((color, idx) => (
                                <div key={idx} className="flex gap-6 md:gap-8 group/color">
                                    <div className="h-16 w-16 md:h-20 md:w-20 rounded-2xl border border-white/10 group-hover/color:scale-110 transition-transform duration-500 shrink-0" style={{ backgroundColor: color.hex }} />
                                    <div className="flex flex-col justify-center">
                                        <h4 className="text-sm font-black text-white uppercase italic tracking-tight mb-2 group-hover/color:text-[#00FF41] transition-colors">{color.name}</h4>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[8px] font-bold text-white/20 tracking-widest uppercase">
                                            <span>{color.hex}</span>
                                            <div className="h-1 w-1 bg-white/10 rounded-full" />
                                            <span>{color.use}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* HUD Assurance */}
                <div className="mt-40 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 opacity-20">
                    <div className="text-[10px] font-black tracking-[0.8em] text-white uppercase font-mono">BRAND_NODE // LOADED</div>
                    <div className="flex gap-16 text-[10px] font-black tracking-[0.8em] text-white uppercase italic text-center md:text-right">
                        " IDENTITY IS THE FIRST LINE OF THE PERIMETER. "
                    </div>
                </div>
            </div>
        </div>
    );
}
