
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

const products = [
    {
        name: "DENTIGRID",
        slug: "dentigrid",
        description: "Our flagship command and control ecosystem. A high-fidelity node-based security grid for real-time threat interception and infrastructure hardening.",
        icon: LayoutPanelTop,
        tag: "CORE_FLIGHT_CONTROL",
        href: "/dashboard",
        color: "#00FF41"
    },
    {
        name: "DARKCHECK",
        slug: "darkcheck",
        description: "Deep-web intelligence module. Scans global data breaches and underground markets for compromised identities and corporate secrets.",
        icon: Lock,
        tag: "INTELLIGENCE_LAYER",
        href: "https://darkcheck.denti.systems",
        color: "#0066FF"
    },
    {
        name: "LEAKSCAN",
        slug: "leakscan",
        description: "Automated exposure analysis. Identifies misconfigured assets, sensitive file leaks, and broad attack surfaces before adversaries do.",
        icon: Globe,
        tag: "SURFACE_RECON",
        href: "https://leakscan.denti.systems",
        color: "#FF3300"
    },
    {
        name: "PHISHRISK",
        slug: "phishrisk",
        description: "Domain integrity assessment. Generates high-fidelity risk scores based on registration metadata and SSL technical telemetry.",
        icon: Shield,
        tag: "VALIDATION_UNIT",
        href: "https://phishrisk.denti.systems",
        color: "#FFCC00"
    }
];

export default function ProductsPage() {
    return (
        <div className="min-h-screen bg-black pt-40 pb-20 overflow-hidden">
            <div className="container px-4">
                {/* Header Section - Visionary/Corporate Entity Style */}
                <div className="max-w-7xl mb-60 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="flex items-center gap-8 mb-12">
                            <div className="h-0.5 w-16 bg-white/20" />
                            <RevealText text="THE_INSTRUMENT_COLLECTION" className="text-[10px] font-bold tracking-[1.2em] text-white/40 uppercase" />
                        </div>
                        <h1 className="text-7xl md:text-[14vw] font-[900] tracking-[-0.05em] text-white uppercase italic leading-[0.7] mb-16">
                            SYSTEM <br /><span className="text-white/10">ASSETS.</span>
                        </h1>
                        <p className="max-w-4xl text-white/40 text-2xl md:text-4xl font-light italic leading-relaxed">
                            A suite of proprietary security instruments engineered by DentiSystems to establish total digital sovereignty.
                        </p>
                    </motion.div>
                </div>

                {/* Main Showcase: DENTIGRID (Full Width Immersive) */}
                <section className="mb-40">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative bg-white/[0.01] border border-white/10 rounded-[5rem] overflow-hidden group min-h-[800px] flex items-center"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#00FF41]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        <div className="absolute top-0 right-0 p-20 opacity-[0.02] scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-1000">
                            <LayoutPanelTop className="h-[600px] w-[600px] text-[#00FF41]" />
                        </div>

                        <div className="container px-8 md:px-32 grid lg:grid-cols-2 gap-32 items-center z-10">
                            <div>
                                <div className="mb-12">
                                    <TechnicalIcon icon={LayoutPanelTop} glowColor="#00FF41" className="scale-125" />
                                </div>
                                <div className="inline-flex items-center gap-6 px-8 py-3 rounded-full border border-[#00FF41]/30 bg-[#00FF41]/5 text-[#00FF41] text-[10px] font-[900] tracking-[0.4em] uppercase mb-12">
                                    FLAGSHIP_COMMAND
                                </div>
                                <h2 className="text-6xl md:text-[8vw] font-[900] text-white italic uppercase tracking-tighter leading-none mb-10">DENTIGRID</h2>
                                <p className="text-white/40 text-2xl md:text-3xl font-light italic leading-relaxed mb-16 max-w-xl">
                                    The definitive operating environment for high-stakes infrastructure defense. Real-time neural interception at scale.
                                </p>
                                <div className="flex flex-col gap-10 mb-20 px-4 border-l-2 border-white/5">
                                    <div className="flex items-center gap-6 text-white/40">
                                        <Activity className="h-6 w-6 text-[#00FF41]" />
                                        <span className="text-[10px] font-black tracking-[0.5em] uppercase italic">REAL-TIME_TELEMETRY</span>
                                    </div>
                                    <div className="flex items-center gap-6 text-white/40">
                                        <Terminal className="h-6 w-6 text-[#00FF41]" />
                                        <span className="text-[10px] font-black tracking-[0.5em] uppercase italic">AUTOMATED_HARDENING</span>
                                    </div>
                                </div>
                                <Magnetic>
                                    <Button size="lg" className="h-24 px-16 rounded-full bg-white text-black font-[900] uppercase text-[12px] tracking-[0.5em] hover:bg-[#00FF41] transition-all shadow-[0_0_60px_rgba(255,255,255,0.1)]" asChild>
                                        <Link href="/dashboard">ACCESS_COMMAND_v1.0</Link>
                                    </Button>
                                </Magnetic>
                            </div>
                            <div className="relative group/img">
                                <div className="absolute -inset-10 bg-[#00FF41]/10 blur-3xl rounded-full opacity-50 animate-pulse" />
                                <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl skew-y-2 group-hover/img:skew-y-0 transition-transform duration-1000">
                                    <SafeImage src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgC1T9VEOh8KS203i5YYu12JL6YCG05OG9sx842IhkPl2jtLXNmkHmsl3aesCEWEvmrx1pOIb7Lof2YW-aYHZ-1Ccs4wbr6jxIbKqOVHIPYyHf4p8r6plyAsfrY7Kork98eFxZLQgT8teoUefQiukF_o8xI51HdNJYkavpZtjFzuP9NpbLjxvaEc_pjEKU/s1600/DentiScan.png" alt="DentiGrid" fill className="object-cover grayscale group-hover/img:grayscale-0 transition-all duration-1000" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Sub-Products Grid - Diversified Layouts */}
                <div className="grid md:grid-cols-3 gap-12 mt-40">
                    {products.slice(1).map((product, idx) => (
                        <motion.div
                            key={product.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group h-full"
                        >
                            <Link href={product.href} target="_blank" className="block h-full">
                                <div className="bg-white/[0.01] border border-white/10 rounded-[5rem] p-16 hover:bg-white/[0.03] hover:border-[#00FF41]/30 transition-all duration-700 h-full relative overflow-hidden flex flex-col">
                                    <div className="absolute top-0 right-0 p-16 opacity-[0.02] group-hover:opacity-[0.08] transition-opacity">
                                        <product.icon className="h-48 w-48 text-white" />
                                    </div>
                                    <div className="mb-12">
                                        <TechnicalIcon icon={product.icon as any} glowColor="#00FF41" className="scale-90 origin-left" />
                                    </div>
                                    <div className="mb-12">
                                        <span className="text-[10px] font-black text-[#00FF41]/40 tracking-[0.5em] uppercase group-hover:text-[#00FF41] transition-colors">
                                            {product.tag}
                                        </span>
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="text-4xl md:text-5xl font-[900] text-white italic uppercase tracking-tighter mb-8 group-hover:translate-x-4 transition-transform duration-500 leading-tight">
                                            {product.name}
                                        </h3>
                                        <p className="text-white/30 text-xl font-light italic leading-relaxed mb-16">
                                            {product.description}
                                        </p>
                                    </div>
                                    <div className="pt-12 border-t border-white/10 flex items-center justify-between text-[11px] font-[900] text-[#00FF41] tracking-[0.5em] uppercase">
                                        LAUNCH_UNIT
                                        <ArrowRight className="h-6 w-6 transform group-hover:translate-x-4 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
}
