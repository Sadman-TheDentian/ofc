
'use client';

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Shield, Zap, Globe, Lock, Cpu, Database, LayoutPanelTop, Box, Terminal, Activity } from "lucide-react";
import SafeImage from "@/components/SafeImage";
import Magnetic from "@/components/Magnetic";
import RevealText from "@/components/RevealText";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import TechnicalIcon from "@/components/TechnicalIcon";
import Image from "next/image";

const products = [
    {
        name: "DENTIGRID",
        slug: "dentigrid",
        description: "Our flagship command and control ecosystem. A high-fidelity node-based security grid for real-time threat interception and infrastructure hardening.",
        logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgC1T9VEOh8KS203i5YYu12JL6YCG05OG9sx842IhkPl2jtLXNmkHmsl3aesCEWEvmrx1pOIb7Lof2YW-aYHZ-1Ccs4wbr6jxIbKqOVHIPYyHf4p8r6plyAsfrY7Kork98eFxZLQgT8teoUefQiukF_o8xI51HdNJYkavpZtjFzuP9NpbLjxvaEc_pjEKU/s1600/DentiScan.png", // DentiGrid uses DentiScan branding
        tag: "CORE_FLIGHT_CONTROL",
        href: "/dashboard",
        color: "#00FF41"
    },
    {
        name: "DARKCHECK",
        slug: "darkcheck",
        description: "Deep-web intelligence module. Scans global data breaches and underground markets for compromised identities and corporate secrets.",
        icon: Lock,
        logo: "/images/tools/darkcheck.svg",
        tag: "INTELLIGENCE_LAYER",
        href: "https://darkcheck.denti.systems",
        color: "#0066FF"
    },
    {
        name: "LEAKSCAN",
        slug: "leakscan",
        description: "Automated exposure analysis. Identifies misconfigured assets, sensitive file leaks, and broad attack surfaces before adversaries do.",
        icon: Globe,
        logo: "/images/tools/leakscan.svg",
        tag: "SURFACE_RECON",
        href: "https://leakscan.denti.systems",
        color: "#FF3300"
    },
    {
        name: "PHISHRISK",
        slug: "phishrisk",
        description: "Domain integrity assessment. Generates high-fidelity risk scores based on registration metadata and SSL technical telemetry.",
        icon: Shield,
        logo: "/images/tools/phishrisk.svg",
        tag: "VALIDATION_UNIT",
        href: "https://phishrisk.denti.systems",
        color: "#FFCC00"
    }
];

import GlitchText from "@/components/GlitchText";
import HUDSection from "@/components/HUDSection";

export default function ProductsPage() {
    return (
        <div className="min-h-screen bg-black pt-24 md:pt-40 pb-20 overflow-hidden relative">
            <div className="container px-4 relative z-10">
                {/* Header Section - Visionary/Corporate Entity Style */}
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
                            <TechnicalIcon icon={Activity} glowColor="#00FF41" className="scale-75 origin-left" />
                            <RevealText text="THE_INSTRUMENT_COLLECTION // ASSET_SUBSTRATE" className="text-[10px] font-black tracking-[1.2em] text-[#00FF41] uppercase italic" />
                        </div>
                        <h1 className="text-5xl md:text-8xl lg:text-9xl font-[1000] tracking-tighter text-white uppercase italic leading-[0.85] mb-12">
                            <GlitchText text="SYSTEM ASSETS." />
                        </h1>
                        <p className="max-w-4xl text-white/60 text-lg md:text-2xl font-medium italic leading-relaxed border-l border-white/20 pl-10 py-4 mb-16">
                            "A suite of proprietary security instruments engineered by DentiSystems to establish total digital sovereignty in high-fidelity environments."
                        </p>
                    </motion.div>
                </div>

                {/* Main Showcase: DENTIGRID (Full Width Immersive) */}
                <section className="mb-32 md:mb-60 overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative bg-white/[0.01] border border-white/5 rounded-[5rem] overflow-hidden group min-h-[600px] md:min-h-[800px] flex items-center shadow-2xl"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#00FF41]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        <div className="absolute top-0 right-0 p-20 opacity-[0.02] scale-150 group-hover:scale-175 transition-transform duration-1000">
                            <LayoutPanelTop className="h-[600px] w-[600px] text-[#00FF41]" />
                        </div>

                        {/* HUD Corners */}
                        <div className="absolute inset-0 p-16 pointer-events-none opacity-20 transition-opacity group-hover:opacity-40">
                            <div className="w-full h-full border border-white/10 rounded-[4rem]" />
                            <div className="absolute top-16 left-16 w-16 h-16 border-t font-black border-l border-[#00FF41]/40" />
                            <div className="absolute top-16 right-16 w-16 h-16 border-t border-r border-[#00FF41]/40" />
                        </div>

                        <div className="container px-8 md:px-32 grid lg:grid-cols-12 gap-16 md:gap-32 items-center z-10 py-16">
                            <div className="lg:col-span-6">
                                <div className="mb-12">
                                    <div className="relative">
                                        <div className="absolute -inset-10 bg-[#00FF41]/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <TechnicalIcon icon={LayoutPanelTop} glowColor="#00FF41" className="scale-150 rotate-[-12deg] group-hover:rotate-0 transition-transform duration-1000" />
                                    </div>
                                </div>
                                <div className="inline-flex items-center gap-6 px-10 py-3 rounded-full border border-[#00FF41]/30 bg-[#00FF41]/10 text-[#00FF41] text-[11px] font-black tracking-[0.4em] uppercase mb-12 italic">
                                    FLAGSHIP_COMMAND_v12
                                </div>
                                <h2 className="text-5xl md:text-[8vw] font-[1000] text-white italic uppercase tracking-tighter leading-none mb-10 group-hover:translate-x-6 transition-transform duration-1000">DENTIGRID</h2>
                                <p className="text-white/40 text-xl md:text-3xl font-light italic leading-relaxed mb-16 max-w-xl border-l border-white/10 pl-10">
                                    The definitive operating environment for high-stakes infrastructure defense and real-time neural monitoring.
                                </p>
                                <div className="grid md:grid-cols-2 gap-10 mb-20 px-4">
                                    <div className="flex items-center gap-6 text-white/40 group/item">
                                        <div className="h-12 w-12 rounded-xl border border-white/5 flex items-center justify-center bg-black/40 group-hover/item:border-[#00FF41]/40 transition-colors">
                                            <Activity className="h-5 w-5 text-[#00FF41]" />
                                        </div>
                                        <span className="text-[10px] font-black tracking-[0.5em] uppercase italic">LIVE_TELEMETRIC_SCAN</span>
                                    </div>
                                    <div className="flex items-center gap-6 text-white/40 group/item">
                                        <div className="h-12 w-12 rounded-xl border border-white/5 flex items-center justify-center bg-black/40 group-hover/item:border-[#00FF41]/40 transition-colors">
                                            <Terminal className="h-5 w-5 text-[#00FF41]" />
                                        </div>
                                        <span className="text-[10px] font-black tracking-[0.5em] uppercase italic">AUTONOMIC_HARDENING</span>
                                    </div>
                                </div>
                                <Magnetic>
                                    <Button size="lg" className="h-24 px-20 border border-white/10 rounded-full bg-white text-black font-black uppercase text-[12px] tracking-[0.5em] hover:bg-[#00FF41] transition-all shadow-2xl group/btn" asChild>
                                        <Link href="/dashboard" className="flex items-center gap-6">
                                            ACCESS_COMMAND_SYST
                                            <ArrowRight className="h-6 w-6 group-hover/btn:translate-x-4 transition-transform" />
                                        </Link>
                                    </Button>
                                </Magnetic>
                            </div>
                            <div className="lg:col-span-6 relative group/img">
                                <div className="absolute -inset-20 bg-[#00FF41]/5 blur-[120px] rounded-full opacity-50 animate-pulse" />
                                <div className="relative aspect-video rounded-[3rem] overflow-hidden border border-white/5 shadow-[0_0_100px_rgba(0,0,0,1)] skew-y-2 group-hover/img:skew-y-0 translate-x-12 group-hover:translate-x-0 transition-all duration-1000">
                                    <SafeImage src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgC1T9VEOh8KS203i5YYu12JL6YCG05OG9sx842IhkPl2jtLXNmkHmsl3aesCEWEvmrx1pOIb7Lof2YW-aYHZ-1Ccs4wbr6jxIbKqOVHIPYyHf4p8r6plyAsfrY7Kork98eFxZLQgT8teoUefQiukF_o8xI51HdNJYkavpZtjFzuP9NpbLjxvaEc_pjEKU/s1600/DentiScan.png" alt="DentiGrid" fill className="object-cover grayscale brightness-50 group-hover/img:grayscale-0 group-hover/img:brightness-100 transition-all duration-1000 scale-110 group-hover:scale-100" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                                    <div className="absolute bottom-10 left-12 flex items-center gap-4">
                                        <Box className="h-4 w-4 text-[#00FF41]" />
                                        <span className="text-[10px] font-black text-white/40 tracking-[0.4em] uppercase italic">VERIFIED_BUILD_v9.4</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Sub-Products Grid - Diversified Layouts */}
                <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-[5rem] overflow-hidden shadow-2xl">
                    {products.slice(1).map((product, idx) => (
                        <motion.div
                            key={product.name}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 1 }}
                            className="group bg-black h-full flex flex-col p-12 md:p-20 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-20 opacity-[0.02] group-hover:opacity-[0.1] transition-opacity scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-1000 blur-sm group-hover:blur-0">
                                <Image src={product.logo as string} alt={product.name} width={300} height={300} className="grayscale brightness-200" />
                            </div>

                            {/* HUD Brackets */}
                            <div className="absolute top-12 left-12 w-10 h-10 border-t border-l border-white/5 group-hover:border-[#00FF41]/20 transition-colors" />

                            <div className="mb-16 flex items-center justify-between relative z-10">
                                <div className="h-24 w-24 flex items-center justify-center p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] group-hover:border-[#00FF41]/40 group-hover:bg-[#00FF41]/5 transition-all duration-700 shadow-xl overflow-hidden">
                                    <Image src={product.logo as string} alt={product.name} width={80} height={80} className="grayscale brightness-[3] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 scale-125 group-hover:scale-100" />
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] font-black text-white/10 tracking-[0.3em] uppercase italic">UNIT_ID</span>
                                    <span className="text-[11px] font-black text-[#00FF41] tracking-[0.5em] uppercase italic group-hover:scale-110 transition-transform">#00{idx + 1}</span>
                                </div>
                            </div>

                            <div className="mb-12 relative z-10">
                                <span className="text-[11px] font-black text-white/30 tracking-[0.5em] uppercase group-hover:text-[#00FF41] transition-colors italic">
                                    {product.tag}
                                </span>
                            </div>

                            <div className="flex-grow relative z-10">
                                <h3 className="text-4xl md:text-5xl font-[1000] text-white italic uppercase tracking-tighter mb-10 group-hover:translate-x-6 transition-transform duration-700 leading-none">
                                    {product.name}
                                </h3>
                                <p className="text-white/30 text-xl font-light italic leading-relaxed mb-16 border-l border-white/10 pl-8 group-hover:border-[#00FF41]/20 transition-colors">
                                    {product.description}
                                </p>
                            </div>

                            <div className="pt-16 border-t border-white/5 relative z-10">
                                <Link href={product.href} target="_blank" className="flex items-center justify-between text-[11px] font-black text-white group-hover:text-[#00FF41] tracking-[0.5em] uppercase transition-all">
                                    LAUNCH_DEPLOYMENT
                                    <div className="h-14 w-14 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#00FF41] group-hover:bg-[#00FF41] group-hover:text-black transition-all duration-500 scale-90 group-hover:scale-100">
                                        <ArrowRight className="h-6 w-6 " />
                                    </div>
                                </Link>
                                <div className="mt-8 flex justify-between opacity-10">
                                    <span className="text-[7px] font-black tracking-widest uppercase">ENCRYPT_v7.4</span>
                                    <span className="text-[7px] font-black tracking-widest uppercase italic">SOVEREIGN_LINK</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* PRO vs FREE Comparison Substrate */}
                <section className="mt-32 md:mt-80 py-24 md:py-40 bg-black border-t border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-40 opacity-[0.02] pointer-events-none">
                        <Database className="h-[600px] w-[600px] text-white" />
                    </div>
                    <div className="max-w-4xl mx-auto text-center mb-16 md:mb-40 px-4">
                        <RevealText text="SERVICE_CAPACITY_MATRIX" className="text-[11px] font-black tracking-[1em] text-[#00FF41] mb-8 md:mb-12 block uppercase italic" />
                        <h2 className="text-5xl md:text-8xl lg:text-[140px] font-[1000] text-white italic uppercase tracking-tighter leading-none mb-12 md:mb-16">
                            SOVEREIGN <br /><span className="text-white/20">TIERS.</span>
                        </h2>
                    </div>

                    <div className="max-w-5xl mx-auto px-4 overflow-x-auto relative z-10">
                        <div className="bg-white/[0.01] border border-white/5 rounded-[4rem] md:rounded-[5rem] overflow-hidden backdrop-blur-3xl min-w-[800px] shadow-2xl">
                            <div className="absolute inset-0 p-12 pointer-events-none opacity-10">
                                <div className="w-full h-full border border-white/10 rounded-[4rem]" />
                            </div>
                            <table className="w-full text-left font-mono relative z-10">
                                <thead>
                                    <tr className="border-b border-white/10 text-[11px] font-black tracking-[0.5em] text-white/30 uppercase italic">
                                        <th className="p-12 pl-24">PROTOCOL_SPECIFICATION</th>
                                        <th className="p-12 text-center bg-white/[0.02]">BASE_LINK</th>
                                        <th className="p-12 text-center text-[#00FF41] bg-[#00FF41]/[0.05]">SOVEREIGN_v.ULTRA</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm font-light text-white/40">
                                    {[
                                        { feature: "Neural Scan Depth", free: "Standard_L1", pro: "Deep-Intelligence_L4" },
                                        { feature: "Throughput Latency", free: "Standard_Sync", pro: "Sub-10ms_gRPC" },
                                        { feature: "Autonomic Recovery", free: "Manual_Override", pro: "Full_Neural_Mesh" },
                                        { feature: "Intelligence Access", free: "Public_Records", pro: "Sovereign_Class_Intel" },
                                        { feature: "Node Distribution", free: "Shared_Core", pro: "Isolated_Bare_Metal" },
                                        { feature: "Technical Support", free: "Community_Log", pro: "Direct_Tactical_Link" }
                                    ].map((row, i) => (
                                        <tr key={i} className="border-b border-white/5 group/row hover:bg-white/[0.02] transition-colors">
                                            <td className="p-10 pl-24 font-black text-white/60 tracking-widest uppercase italic group-hover/row:text-white transition-colors">{row.feature}</td>
                                            <td className="p-10 text-center italic font-medium bg-white/[0.01]">{row.free}</td>
                                            <td className="p-10 text-center font-black text-[#00FF41] italic bg-[#00FF41]/[0.02] tracking-widest">{row.pro}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="p-16 flex flex-col md:flex-row justify-center gap-10 md:gap-16 border-t border-white/5 bg-black/40">
                                <Button className="h-20 px-16 rounded-full bg-white/5 text-white/40 font-black uppercase text-[10px] tracking-[0.5em] border border-white/10 hover:bg-white/10 hover:text-white transition-all">STAY_FOUNDATIONAL</Button>
                                <Button className="h-20 px-24 rounded-full bg-white text-black font-black uppercase text-[10px] tracking-[0.5em] hover:bg-[#00FF41] transition-all shadow-2xl">UPGRADE_TO_SOVEREIGN</Button>
                            </div>
                        </div>

                        <div className="mt-16 flex justify-between items-center opacity-10">
                            <span className="text-[10px] font-black tracking-[1em] text-white italic uppercase">SECURE_TRANSMISSION_PROTOCOL // ACTIVE</span>
                            <div className="flex gap-10">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="h-1.5 w-1.5 bg-[#00FF41] rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
