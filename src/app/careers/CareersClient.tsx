
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

export default function CareersClient() {
    return (
        <div className="min-h-screen bg-black pt-40 pb-20 overflow-hidden relative">
            <div className="container px-4 relative z-10">
                {/* Recruitment Header */}
                <div className="max-w-7xl mb-24 md:mb-60 relative">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Link href="/about" className="group flex items-center gap-4 text-[10px] font-black text-white/30 uppercase tracking-[0.5em] mb-12 md:mb-20 hover:text-[#00FF41] transition-colors px-4">
                            <ArrowLeft className="h-5 w-5 transform group-hover:-translate-x-3 transition-transform" />
                            BAK_TO_COLLECTIVE
                        </Link>

                        <div className="flex items-center gap-8 mb-12">
                            <TechnicalIcon icon={Briefcase} glowColor="#00FF41" className="scale-75 origin-left" />
                            <RevealText text="THE_COLLECTIVE_EXPANSION_v9.4" className="text-[10px] font-bold tracking-[1.2em] text-[#00FF41] uppercase" />
                        </div>

                        <h1 className="text-5xl md:text-8xl lg:text-[160px] font-[900] tracking-[-0.05em] text-white uppercase italic leading-[0.7] mb-12 md:mb-16">
                            JOIN THE <br /><span className="text-white/10">ELITE.</span>
                        </h1>

                        <p className="max-w-4xl text-white/40 text-2xl md:text-3xl font-light italic leading-relaxed">
                            "We are scouting for specialized intelligence units. DentiSystems is not just a company—it is a sovereign network of architects, researchers, and hunters."
                        </p>
                    </motion.div>
                </div>

                {/* Tactical Search HUD */}
                <div className="mb-32 flex flex-col md:flex-row items-center justify-between border-b border-white/5 pb-12 gap-8">
                    <div className="flex items-center gap-12">
                        <div className="flex items-center gap-4">
                            <Search className="h-4 w-4 text-[#00FF41]" />
                            <span className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase">FILTERING_ACTIVE</span>
                        </div>
                        {["OFFENSIVE", "DEFENSIVE", "INTEL", "INFRA"].map(tag => (
                            <div key={tag} className="text-[9px] font-bold text-white/10 tracking-widest uppercase hover:text-[#00FF41] transition-colors cursor-pointer hidden lg:block">#{tag}</div>
                        ))}
                    </div>
                    <div className="flex items-center gap-6">
                        <span className="text-[9px] font-bold text-white/20 tracking-widest uppercase italic font-mono">NODES_SCANNED: 4096</span>
                        <div className="h-1 w-24 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                animate={{ x: ["-100%", "100%"] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                className="h-full w-1/2 bg-[#00FF41]/40"
                            />
                        </div>
                    </div>
                </div>

                <section className="mb-32 md:mb-60 overflow-hidden">
                    <div className="space-y-8 md:space-y-12">
                        {roles.map((role, idx) => (
                            <motion.div
                                key={role.title}
                                initial={{ opacity: 0, scale: 0.98, y: 40 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <Link href="/contact" className="group block">
                                    <div className="bg-white/[0.01] border border-white/10 rounded-[3rem] md:rounded-[5rem] p-8 md:px-20 md:py-16 hover:bg-white/[0.04] hover:border-[#00FF41]/30 transition-all duration-1000 flex flex-col lg:flex-row items-center gap-12 lg:gap-16 justify-between relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-1000">
                                            <role.icon className="h-48 w-48 md:h-64 md:w-64 text-white" />
                                        </div>

                                        <div className="flex flex-col lg:flex-row items-center gap-16 flex-grow">
                                            <div className="relative">
                                                <TechnicalIcon icon={role.icon as any} glowColor="#00FF41" className="scale-110" />
                                                <div className="absolute -top-4 -right-4 h-8 w-8 rounded-full bg-black border border-white/10 flex items-center justify-center text-[8px] font-black text-[#00FF41]">
                                                    {role.code}
                                                </div>
                                            </div>
                                            <div className="max-w-2xl text-center lg:text-left">
                                                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 mb-8 uppercase tracking-[0.4em] text-[10px] font-black">
                                                    <span className="text-[#00FF41]">{role.unit}</span>
                                                    <div className="h-1 w-1 bg-white/10 rounded-full" />
                                                    <span className="text-white/20">{role.location}</span>
                                                    <div className="h-1 w-1 bg-white/10 rounded-full" />
                                                    <span className="text-white/10 italic">{role.type}</span>
                                                </div>
                                                <h3 className="text-5xl md:text-7xl font-[900] text-white italic uppercase tracking-tighter mb-8 group-hover:translate-x-6 transition-transform duration-700 leading-none">{role.title}</h3>
                                                <p className="text-white/30 text-xl font-light italic leading-relaxed">{role.description}</p>
                                            </div>
                                        </div>

                                        <div className="shrink-0">
                                            <Magnetic>
                                                <div className="h-28 w-28 rounded-full bg-white text-black flex flex-col items-center justify-center group-hover:bg-[#00FF41] transition-all group-hover:scale-110 shadow-[0_0_60px_rgba(255,255,255,0.05)] border-4 border-black">
                                                    <span className="text-[8px] font-black mb-1 opacity-40">PROTOCOL</span>
                                                    <ArrowRight className="h-8 w-8" />
                                                </div>
                                            </Magnetic>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section className="mb-32 md:mb-60 overflow-hidden">
                    <div className="bg-white/[0.02] border border-white/10 rounded-[3rem] md:rounded-[5rem] p-8 md:p-32 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#00FF41]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                        <div className="relative z-10">
                            <span className="text-[10px] font-black tracking-[1em] text-[#00FF41] mb-12 md:mb-16 block uppercase">SOVEREIGN_BENEFITS</span>
                            <h2 className="text-5xl md:text-8xl lg:text-[140px] font-[900] text-white uppercase italic tracking-tighter leading-[0.8] mb-16 md:mb-24">TACTICAL <br /><span className="text-white/20">SUPPORT.</span></h2>

                            <div className="grid md:grid-cols-2 gap-20">
                                {[
                                    { icon: Globe, title: "Geospatial Liberty", desc: "Operate from any node on the planet. We are a decentralized collective with no geometric boundaries." },
                                    { icon: Cpu, title: "High-Compute Access", desc: "Unlimited access to specialized GPU clusters and proprietary offensive research tooling." },
                                    { icon: Activity, title: "Proprietary Mesh", desc: "Direct entry into our DentiGrid ecosystem and sovereign intelligence streams." },
                                    { icon: Terminal, title: "Growth Acceleration", desc: "Constant certification and training modules to keep your operational capacity at the elite baseline." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-8 group/item">
                                        <item.icon className="h-8 w-8 text-[#00FF41]/40 group-hover/item:text-[#00FF41] transition-colors shrink-0" />
                                        <div className="space-y-4">
                                            <h4 className="text-2xl font-black text-white uppercase italic tracking-tight group-hover/item:text-white transition-colors">{item.title}</h4>
                                            <p className="text-white/30 text-lg font-light italic leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* HUD Footer */}
                <div className="mt-40 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 opacity-20">
                    <div className="text-[10px] font-black tracking-[0.8em] text-white uppercase font-mono italic">RECRUITMENT_NODE_v9.4 // STANDBY</div>
                    <div className="flex gap-16 text-[10px] font-black tracking-[0.8em] text-white uppercase italic text-center md:text-right">
                        " SOUVEREIGNTY IS BUILT ON TALENT. "
                    </div>
                </div>
            </div>
        </div>
    );
}
