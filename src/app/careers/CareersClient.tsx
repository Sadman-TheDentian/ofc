
'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Zap, Target, Cpu, Shield, Users, Briefcase, Globe, Activity, Terminal, Crosshair, Fingerprint, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import RevealText from "@/components/RevealText";
import Magnetic from "@/components/Magnetic";
import TechnicalIcon from "@/components/TechnicalIcon";

const roles = [
    {
        title: "Security Researcher (Zero-Day)",
        unit: "OFFENSIVE_INTEL_UNIT",
        location: "REMOTE // DISTRIBUTED",
        type: "FULL_TIME",
        description: "Hunt for unpatched vulnerabilities in critical infrastructure and secure software stacks. High-finesse exploit development required.",
        icon: Target,
        code: "ZR_DY_88"
    },
    {
        title: "Sovereign Infrastructure Architect",
        unit: "CORE_NODES_DIVISION",
        location: "SINGAPORE // HYBRID",
        type: "CONTRACT",
        description: "Design and implement resilient, encrypted network architectures that operate outside standard cloud vulnerabilities.",
        icon: Cpu,
        code: "INF_ARC_44"
    },
    {
        title: "AI Adversarial Lead",
        unit: "NEURAL_DEFENSE_LABS",
        location: "LONDON // GLOBAL",
        type: "FULL_TIME",
        description: "Lead our research into machine-learning driven attack vectors and predictive neutralization protocols.",
        icon: Zap,
        code: "NR_DEF_12"
    },
    {
        title: "Global Intelligence Liaison",
        unit: "STRATEGIC_CELL",
        location: "NEW YORK // REMOTE",
        type: "PART_TIME",
        description: "Coordinate with sovereign entities and private sectors to establish secure information-sharing perimeters.",
        icon: Globe,
        code: "GLB_INT_09"
    }
];

import GlitchText from "@/components/GlitchText";
import HUDSection from "@/components/HUDSection";

export default function CareersClient() {
    return (
        <div className="min-h-screen bg-black pt-24 md:pt-40 pb-20 overflow-hidden relative selection:bg-[#00FF41]/30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,65,0.02),transparent_70%)] pointer-events-none" />

            <div className="container px-4 relative z-10">
                {/* Recruitment Header */}
                <div className="max-w-7xl mb-12 md:mb-52 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Magnetic strength={0.2} className="w-fit">
                            <Link href="/about" className="group flex items-center gap-10 text-[11px] font-[1000] text-white/20 uppercase tracking-[0.8em] mb-16 md:mb-24 hover:text-[#00FF41] transition-all px-4 italic">
                                <ArrowLeft className="h-5 w-5 transform group-hover:-translate-x-6 transition-transform text-[#00FF41]" />
                                BAK_TO_COLLECTIVE_ARCHIVE
                            </Link>
                        </Magnetic>

                        <div className="flex items-center gap-10 md:gap-16 mb-12 md:mb-16">
                            <TechnicalIcon icon={Briefcase} glowColor="#00FF41" className="scale-75 origin-left" />
                            <RevealText text="THE_COLLECTIVE_EXPANSION_v12.4_READY" className="text-[11px] font-[1000] tracking-[1.5em] text-[#00FF41] uppercase italic" />
                        </div>

                        <h1 className="text-5xl md:text-8xl lg:text-9xl font-[1000] tracking-tighter text-white uppercase italic leading-[0.85] mb-12">
                            JOIN THE <br /><span className="text-white/20">ELITE.</span>
                        </h1>

                        <p className="max-w-4xl text-white/60 text-lg md:text-2xl font-medium italic leading-relaxed border-l border-white/20 pl-10 py-4 mb-20">
                            "We are scouting for specialized intelligence units. DentiSystems is not just a company—it is a sovereign network of architects, researchers, and hunters."
                        </p>
                    </motion.div>

                    {/* Simplified Background Element */}
                    <div className="absolute -bottom-20 -right-20 opacity-[0.03] pointer-events-none select-none hidden lg:block">
                        <span className="text-[15vw] font-black text-white italic tracking-tighter leading-none uppercase">RECRUIT_SYS</span>
                    </div>
                </div>

                {/* Tactical Search HUD */}
                <div className="mb-24 md:mb-40 flex flex-col md:flex-row items-center justify-between border-b border-white/5 pb-16 gap-12 relative overflow-hidden group">
                    <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-[#00FF41]/40 via-white/10 to-transparent" />

                    <div className="flex items-center gap-12 md:gap-20">
                        <div className="flex items-center gap-6">
                            <div className="h-2 w-2 bg-[#00FF41] rounded-full animate-pulse shadow-[0_0_10px_#00FF41]" />
                            <Search className="h-5 w-5 text-[#00FF41]" />
                            <span className="text-[12px] font-[1000] tracking-[0.5em] text-white/60 uppercase italic">FILTERING_ACTIVE</span>
                        </div>
                        <div className="flex gap-12">
                            {["OFFENSIVE", "DEFENSIVE", "INTEL", "INFRA"].map((tag, idx) => (
                                <motion.div
                                    key={tag}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + idx * 0.1 }}
                                    className="text-[11px] font-[1000] text-white/10 tracking-[0.4em] uppercase hover:text-[#00FF41] transition-all cursor-pointer hidden lg:block border-b border-transparent hover:border-[#00FF41] pb-2 italic"
                                >
                                    #{tag}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-10">
                        <div className="flex flex-col items-end gap-2">
                            <span className="text-[10px] font-black text-white/20 tracking-[0.8em] uppercase italic font-mono">NODES_SCANNED</span>
                            <span className="text-[18px] font-black text-[#00FF41] tracking-[0.2em] font-mono">0x1000_SYNC</span>
                        </div>
                        <div className="h-10 w-48 bg-white/5 rounded-2xl overflow-hidden relative border border-white/5">
                            <motion.div
                                animate={{ x: ["-100%", "100%"] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-[#00FF41]/40 to-transparent"
                            />
                            <div className="absolute inset-0 flex items-center justify-between px-4">
                                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <div key={i} className="h-1 w-1 bg-white/20 rounded-full" />)}
                            </div>
                        </div>
                    </div>
                </div>

                <section className="mb-32 md:mb-60 lg:mb-80 overflow-hidden relative">
                    <div className="space-y-24 md:space-y-32">
                        {roles.map((role, idx) => (
                            <motion.div
                                key={role.title}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                className="group"
                            >
                                <Link href="/contact" className="block relative">
                                    <div className="bg-white/[0.01] border border-white/5 rounded-[4rem] md:rounded-[8rem] p-12 md:px-32 md:py-24 hover:bg-[#00FF41]/[0.02] hover:border-[#00FF41]/30 transition-all duration-1000 flex flex-col lg:flex-row items-center gap-16 lg:gap-32 justify-between relative overflow-hidden group/card shadow-[0_0_100px_rgba(0,0,0,1)]">

                                        {/* HUD Brackets */}
                                        <div className="absolute top-16 left-16 w-16 h-16 border-t border-l border-white/5 group-hover:border-[#00FF41]/20 transition-colors" />

                                        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 opacity-[0.01] group-hover:opacity-[0.05] transition-opacity duration-1500 scale-150 rotate-12 blur-sm group-hover:blur-0 transform-gpu translate-x-32 group-hover:translate-x-0">
                                            <role.icon className="h-[400px] w-[400px] text-white" />
                                        </div>

                                        <div className="flex flex-col lg:flex-row items-center gap-24 flex-grow relative z-10">
                                            <div className="relative group/hex shrink-0 scale-125 md:scale-150 filter drop-shadow-[0_0_30px_rgba(0,255,65,0.2)]">
                                                <div className="h-32 w-32 bg-white/[0.02] border border-white/5 rounded-full flex items-center justify-center group-hover:border-[#00FF41]/40 transition-all duration-700">
                                                    <role.icon className="h-12 w-12 text-[#00FF41] group-hover:scale-110 transition-transform duration-700" />
                                                </div>
                                                <div className="absolute -top-4 -right-4 h-14 w-14 rounded-full bg-black border border-[#00FF41] flex items-center justify-center text-[12px] font-[1000] text-[#00FF41] shadow-[0_0_30px_rgba(0,255,65,0.4)] italic">
                                                    {role.code}
                                                </div>
                                            </div>

                                            <div className="max-w-4xl text-center lg:text-left">
                                                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-10 mb-12 uppercase tracking-[0.8em] text-[12px] font-[1000]">
                                                    <span className="text-[#00FF41] italic">{role.unit}</span>
                                                    <div className="h-2 w-2 bg-white/10 rounded-full animate-pulse" />
                                                    <span className="text-white/30 italic">{role.location}</span>
                                                    <div className="h-2 w-2 bg-white/10 rounded-full" />
                                                    <span className="text-white/20 italic font-light">{role.type}</span>
                                                </div>
                                                <h3 className="text-5xl md:text-[7vw] font-[1000] text-white italic uppercase tracking-tighter mb-12 group-hover:translate-x-16 transition-all duration-1000 leading-[0.85]">{role.title}</h3>
                                                <p className="text-white/30 text-xl md:text-4xl font-light italic leading-relaxed border-l border-white/10 pl-12 group-hover:border-[#00FF41]/20 transition-colors">{role.description}</p>
                                            </div>
                                        </div>

                                        <div className="shrink-0 relative z-10">
                                            <Magnetic strength={0.3}>
                                                <div className="h-40 w-40 rounded-full border border-white/10 text-white flex flex-col items-center justify-center bg-white/[0.02] group-hover:bg-[#00FF41] group-hover:text-black transition-all group-hover:scale-110 shadow-2xl duration-700 relative overflow-hidden group/btn">
                                                    <div className="absolute inset-0 bg-[#00FF41] translate-y-full group-hover:translate-y-0 transition-transform duration-700 pointer-events-none" />
                                                    <span className="text-[12px] font-[1000] mb-3 opacity-40 group-hover:opacity-100 transition-all relative z-10 tracking-[0.4em] italic">ENGAGE</span>
                                                    <ArrowRight className="h-12 w-12 group-hover:translate-x-4 transition-transform duration-500 relative z-10" />
                                                </div>
                                            </Magnetic>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <HUDSection label="SOVEREIGN_BENEFITS // PERS_HARDENING" className="mb-32 md:mb-60">
                    <div className="grid lg:grid-cols-2 gap-24 items-end mb-24 md:mb-40">
                        <h2 className="text-5xl md:text-9xl lg:text-[180px] font-[1000] text-white uppercase italic tracking-tighter leading-[0.8]">TACTICAL <br /><span className="text-white/10 group-hover:text-white transition-colors duration-1000">SUPPORT.</span></h2>
                        <p className="text-white/30 text-xl md:text-4xl font-light italic leading-relaxed max-w-2xl border-l border-white/10 pl-16 py-6 italic">
                            Elite operational advantages designed for high-substrate intelligence units. Digital survival is a shared metric.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-[5rem] overflow-hidden shadow-2xl">
                        {[
                            { icon: Globe, title: "Geospatial Liberty", desc: "Operate from any node on the planet. We are a decentralized collective with no geometric boundaries." },
                            { icon: Cpu, title: "High-Compute Access", desc: "Unlimited access to specialized GPU clusters and proprietary offensive research tooling." },
                            { icon: Activity, title: "Proprietary Mesh", desc: "Direct entry into our DentiGrid ecosystem and sovereign intelligence streams." },
                            { icon: Terminal, title: "Growth Acceleration", desc: "Constant certification and training modules to keep your operational capacity at the elite baseline." }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-12 group/item bg-black p-12 md:p-20 hover:bg-[#00FF41]/[0.02] transition-colors duration-1000 relative">
                                <div className="absolute top-12 left-12 w-10 h-10 border-t border-l border-white/5 group-hover:border-[#00FF41]/20 transition-colors" />
                                <div className="shrink-0 pt-4">
                                    <div className="h-20 w-20 flex items-center justify-center p-4 bg-white/[0.01] border border-white/5 rounded-[1.5rem] group-hover/item:border-[#00FF41]/40 group-hover/item:bg-[#00FF41]/5 transition-all duration-700 text-white/10 group-hover/item:text-[#00FF41]">
                                        <item.icon className="h-10 w-10 transition-transform duration-1000 group-hover:scale-125" />
                                    </div>
                                </div>
                                <div className="space-y-8 py-4">
                                    <h4 className="text-4xl font-[1000] text-white uppercase italic tracking-tighter group-hover:translate-x-12 transition-all duration-1000 leading-none">{item.title}</h4>
                                    <p className="text-white/20 text-xl font-light italic leading-relaxed group-hover/item:text-white/40 border-l border-white/10 pl-12 transition-all duration-1000">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </HUDSection>

                {/* HUD Footer */}
                <div className="mt-40 md:mt-80 pt-24 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-16 md:gap-32 relative overflow-hidden opacity-20">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#00FF41]/40 to-transparent shadow-[0_0_20px_#00FF41]" />
                    <div className="text-[11px] font-[1000] tracking-[1.5em] text-white uppercase font-mono italic">RECRUITMENT_NODE_v12.4 // STATUS_NOMINAL</div>
                    <div className="flex gap-16 text-[11px] font-[1000] tracking-[2em] text-[#00FF41] uppercase italic text-center md:text-right blur-[0.5px] hover:blur-0 transition-all cursor-default">
                        " SOVEREIGNTY BUILT BY ELITE. "
                    </div>
                </div>
            </div>
        </div>
    );
}
