
'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Zap, Target, Cpu, Shield, Users, Briefcase, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import RevealText from "@/components/RevealText";
import Magnetic from "@/components/Magnetic";
import TechnicalIcon from "@/components/TechnicalIcon";
import { Activity } from "lucide-react";

const roles = [
    {
        title: "Security Researcher (Zero-Day)",
        unit: "OFFENSIVE_INTEL_UNIT",
        location: "REMOTE // DISTRIBUTED",
        type: "FULL_TIME",
        description: "Hunt for unpatched vulnerabilities in critical infrastructure and secure software stacks. High-finesse exploit development required.",
        icon: Target
    },
    {
        title: "Sovereign Infrastructure Architect",
        unit: "CORE_NODES_DIVISION",
        location: "SINGAPORE // HYBRID",
        type: "CONTRACT",
        description: "Design and implement resilient, encrypted network architectures that operate outside standard cloud vulnerabilities.",
        icon: Cpu
    },
    {
        title: "AI Adversarial Lead",
        unit: "NEURAL_DEFENSE_LABS",
        location: "LONDON // GLOBAL",
        type: "FULL_TIME",
        description: "Lead our research into machine-learning driven attack vectors and predictive neutralization protocols.",
        icon: Zap
    },
    {
        title: "Global Intelligence Liaison",
        unit: "STRATEGIC_ALLIANCE_CELL",
        location: "NEW YORK // REMOTE",
        type: "PART_TIME",
        description: "Coordinate with sovereign entities and private sectors to establish secure information-sharing perimeters.",
        icon: Globe
    }
];

export default function CareersClient() {
    return (
        <div className="min-h-screen bg-black pt-40 pb-20 overflow-hidden relative">
            {/* Background Architectural Grid */}
            <div className="absolute inset-0 z-0 opacity-[0.03]" style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '80px 80px'
            }} />

            <div className="container px-4 relative z-10">
                {/* Recruitment Header */}
                <div className="max-w-7xl mb-60 relative">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Link href="/about" className="group flex items-center gap-4 text-[10px] font-black text-white/30 uppercase tracking-[0.5em] mb-20 hover:text-[#00FF41] transition-colors">
                            <ArrowLeft className="h-5 w-5 transform group-hover:-translate-x-3 transition-transform" />
                            BAK_TO_COLLECTIVE
                        </Link>

                        <div className="flex items-center gap-8 mb-12">
                            <div className="h-0.5 w-16 bg-[#00FF41]" />
                            <RevealText text="THE_COLLECTIVE_EXPANSION_v9.0" className="text-[10px] font-bold tracking-[1.2em] text-[#00FF41] uppercase" />
                        </div>

                        <h1 className="text-7xl md:text-[14vw] font-[900] tracking-[-0.05em] text-white uppercase italic leading-[0.7] mb-16">
                            JOIN THE <br /><span className="text-white/10">ELITE.</span>
                        </h1>

                        <p className="max-w-4xl text-white/40 text-2xl md:text-4xl font-light italic leading-relaxed">
                            We are scouting for specialized intelligence units. DentiSystems is not just a company—it is a sovereign network of architects, researchers, and hunters.
                        </p>
                    </motion.div>
                </div>

                {/* Roles List */}
                <section className="py-40 md:py-[20vh] border-t border-white/5">
                    <div className="flex items-center gap-12 mb-32 px-4">
                        <span className="text-[10px] font-[900] tracking-[0.8em] text-[#00FF41] uppercase">ACTIVE_OPENINGS // RECRUITMENT_MODE</span>
                        <div className="h-[1px] flex-grow bg-white/10" />
                    </div>

                    <div className="space-y-12">
                        {roles.map((role, idx) => (
                            <motion.div
                                key={role.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <Link href="/contact" className="group block">
                                    <div className="bg-white/[0.01] border border-white/10 rounded-[6rem] p-12 md:px-24 md:py-16 hover:bg-white/[0.04] hover:border-[#00FF41]/30 transition-all duration-700 flex flex-col md:flex-row items-center gap-16 justify-between relative overflow-hidden">
                                        <div className="flex items-center gap-16 flex-grow">
                                            <div>
                                                <TechnicalIcon icon={role.icon as any} glowColor="#00FF41" className="scale-110" />
                                            </div>
                                            <div className="max-w-2xl text-center md:text-left">
                                                <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 mb-8 uppercase tracking-widest text-[10px] font-black">
                                                    <span className="text-[#00FF41] bg-[#00FF41]/5 px-4 py-2 rounded-full border border-[#00FF41]/10">{role.unit}</span>
                                                    <div className="h-1.5 w-1.5 bg-white/20 rounded-full" />
                                                    <span className="text-white/20">{role.location}</span>
                                                </div>
                                                <h3 className="text-4xl md:text-6xl font-[900] text-white italic uppercase tracking-tighter mb-8 group-hover:translate-x-8 transition-transform duration-500 leading-none">{role.title}</h3>
                                                <p className="text-white/30 text-xl font-light italic leading-relaxed">{role.description}</p>
                                            </div>
                                        </div>
                                        <Magnetic>
                                            <div className="h-24 w-24 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-[#00FF41] transition-all group-hover:scale-110 shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                                                <ArrowRight className="h-10 w-10" />
                                            </div>
                                        </Magnetic>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="mb-40">
                    <div className="bg-white/[0.01] border border-white/5 rounded-[5rem] p-16 md:p-32 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-20 opacity-[0.02] scale-150 rotate-12">
                            <Users className="h-[400px] w-[400px] text-white" />
                        </div>

                        <div className="relative z-10 max-w-4xl">
                            <span className="text-[10px] font-black tracking-[1em] text-[#00FF41] mb-12 block uppercase">SOVEREIGN_BENEFITS</span>
                            <h2 className="text-5xl md:text-8xl font-black text-white uppercase italic tracking-tighter leading-none mb-16">EQUIPMENT FOR THE <br /><span className="text-white/20">FRONT LINE.</span></h2>

                            <div className="grid md:grid-cols-2 gap-16">
                                <div className="border-l border-white/10 pl-10">
                                    <h4 className="text-xl font-black text-white uppercase italic mb-4 tracking-tight">Geospatial Liberty</h4>
                                    <p className="text-white/30 text-base font-light italic leading-relaxed">Operate from any node on the planet. We are a decentralized collective with no geometric boundaries.</p>
                                </div>
                                <div className="border-l border-white/10 pl-10">
                                    <h4 className="text-xl font-black text-white uppercase italic mb-4 tracking-tight">High-Compute Access</h4>
                                    <p className="text-white/30 text-base font-light italic leading-relaxed">Unlimited access to specialized GPU clusters and proprietary offensive research tooling.</p>
                                </div>
                                <div className="border-l border-white/10 pl-10">
                                    <h4 className="text-xl font-black text-white uppercase italic mb-4 tracking-tight">Proprietary Mesh</h4>
                                    <p className="text-white/30 text-base font-light italic leading-relaxed">Direct entry into our DentiGrid ecosystem and sovereign intelligence streams.</p>
                                </div>
                                <div className="border-l border-white/10 pl-10">
                                    <h4 className="text-xl font-black text-white uppercase italic mb-4 tracking-tight">Growth Acceleration</h4>
                                    <p className="text-white/30 text-base font-light italic leading-relaxed">Constant certification and training modules to keep your operational capacity at the elite baseline.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* HUD Assurance */}
                <div className="mt-40 pt-12 border-t border-white/5 flex justify-between items-center opacity-10">
                    <div className="text-[8px] font-bold tracking-[0.5em] text-white uppercase font-mono">RECRUITMENT_NODE_v9.0 // STANDBY</div>
                    <p className="text-[8px] font-bold tracking-[0.4em] text-white uppercase italic">" TALENT IS THE CURRENCY OF SOVEREIGNTY. "</p>
                </div>
            </div>
        </div>
    );
}
