
'use client';

import { motion } from "framer-motion";
import { Cpu, Zap, Shield, Database, Network, Activity, Container, Terminal, Code2, BrainCircuit, ArrowLeft } from "lucide-react";
import RevealText from "@/components/RevealText";
import Link from "next/link";
import TechnicalIcon from "@/components/TechnicalIcon";

export default function TechnologyPage() {
    return (
        <div className="min-h-screen bg-black pt-40 pb-20 overflow-hidden relative">
            {/* Background Architectural Grid */}
            <div className="absolute inset-0 z-0 opacity-[0.03]" style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '80px 80px'
            }} />

            <div className="container px-4 relative z-10">
                {/* Tech Header */}
                <div className="max-w-7xl mb-60 relative">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Link href="/" className="group flex items-center gap-4 text-[10px] font-black text-white/30 uppercase tracking-[0.5em] mb-20 hover:text-[#00FF41] transition-colors">
                            <ArrowLeft className="h-5 w-5 transform group-hover:-translate-x-3 transition-transform" />
                            BAK_TO_COLLECTIVE
                        </Link>

                        <div className="flex items-center gap-8 mb-12">
                            <div className="h-0.5 w-16 bg-[#00FF41]" />
                            <RevealText text="CORE_SUBSTRATE // ENGINEERING_SPEC" className="text-[10px] font-bold tracking-[1.2em] text-[#00FF41] uppercase" />
                        </div>

                        <h1 className="text-7xl md:text-[14vw] font-[900] tracking-[-0.05em] text-white uppercase italic leading-[0.7] mb-16">
                            THE <br /><span className="text-white/10">SUBSTRATE.</span>
                        </h1>

                        <p className="max-w-4xl text-white/40 text-2xl md:text-4xl font-light italic leading-relaxed">
                            DentiSystems operates on a proprietary technological foundation engineered back-to-zero for absolute digital sovereignty.
                        </p>
                    </motion.div>
                </div>

                {/* Tech Stack Modules */}
                <div className="grid lg:grid-cols-2 gap-20 mb-60">
                    {[
                        {
                            title: "Neural Defense Mesh",
                            tag: "AI_LOGIC_LAYER",
                            desc: "Predictive behavioral models that identify adversarial intent before code execution. Our neural mesh operates at the edge, reducing latency to <2ms.",
                            icon: BrainCircuit
                        },
                        {
                            title: "Distributed Intel Grid",
                            tag: "DATA_SUBSTRATE",
                            desc: "A globally distributed ledger of threat vectors, synchronized via encrypted high-throughput telemetry channels.",
                            icon: Network
                        },
                        {
                            title: "Hardened Core V2",
                            tag: "ARCH_STABILITY",
                            desc: "Custom-built OS kernel and hypervisor layers designed to eliminate entire classes of hardware-level vulnerabilities.",
                            icon: Shield
                        },
                        {
                            title: "Zero-Trust Protocol",
                            tag: "AUTH_TELEMETRY",
                            desc: "Every packet is verified. Every node is authenticated. Our sovereign auth sequence ensures zero identity leakage.",
                            icon: Cpu
                        }
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 1 }}
                            className="bg-white/[0.01] border border-white/10 rounded-[6rem] p-16 md:p-24 hover:bg-white/[0.03] hover:border-[#00FF41]/20 transition-all duration-700 relative overflow-hidden group"
                        >
                            <div className="absolute bottom-0 right-0 p-20 opacity-[0.02] group-hover:scale-110 transition-transform">
                                <item.icon className="h-[400px] w-[400px] text-white" />
                            </div>
                            <div className="relative z-10">
                                <div className="mb-12">
                                    <TechnicalIcon icon={item.icon as any} glowColor="#00FF41" className="scale-110 origin-left" />
                                </div>
                                <span className="text-[10px] font-black tracking-[0.5em] text-[#00FF41] mb-12 block uppercase">{item.tag}</span>
                                <h3 className="text-4xl md:text-7xl font-[900] text-white italic uppercase tracking-tighter mb-12 leading-[0.8]">{item.title}</h3>
                                <p className="text-white/30 text-2xl font-light italic leading-relaxed max-w-lg">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Technical Specification HUD */}
                <section className="py-40 md:py-[20vh] border-t border-white/5">
                    <div className="bg-white/[0.01] border border-white/10 rounded-[6rem] p-16 md:p-32 relative overflow-hidden backdrop-blur-3xl">
                        <div className="grid md:grid-cols-3 gap-24 text-center md:text-left">
                            <div className="flex flex-col items-center md:items-start group">
                                <div className="mb-12">
                                    <TechnicalIcon icon={Terminal} glowColor="#00FF41" />
                                </div>
                                <span className="text-[10px] font-black tracking-[0.5em] text-[#00FF41] mb-12 uppercase">DEVELOPER_INTERFACE</span>
                                <ul className="space-y-6 text-sm font-[900] text-white tracking-[0.2em] uppercase italic">
                                    <li className="flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-500"><div className="h-2 w-2 bg-[#00FF41] rounded-full" /> gRPC Telemetry</li>
                                    <li className="flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-500"><div className="h-2 w-2 bg-[#00FF41] rounded-full" /> Rust Bindings</li>
                                    <li className="flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-500"><div className="h-2 w-2 bg-[#00FF41] rounded-full" /> WASM Runtime</li>
                                </ul>
                            </div>
                            <div className="flex flex-col items-center md:items-start group">
                                <div className="mb-12">
                                    <TechnicalIcon icon={Database} glowColor="#00FF41" />
                                </div>
                                <span className="text-[10px] font-black tracking-[0.5em] text-[#00FF41] mb-12 uppercase">DATA_ORCHESTRATION</span>
                                <ul className="space-y-6 text-sm font-[900] text-white tracking-[0.2em] uppercase italic">
                                    <li className="flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-500"><div className="h-2 w-2 bg-[#00FF41] rounded-full" /> Sharded Ledger</li>
                                    <li className="flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-500"><div className="h-2 w-2 bg-[#00FF41] rounded-full" /> Vector Embeddings</li>
                                    <li className="flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-500"><div className="h-2 w-2 bg-[#00FF41] rounded-full" /> Real-time Sync</li>
                                </ul>
                            </div>
                            <div className="flex flex-col items-center md:items-start group">
                                <div className="mb-12">
                                    <TechnicalIcon icon={Shield} glowColor="#00FF41" />
                                </div>
                                <span className="text-[10px] font-black tracking-[0.5em] text-[#00FF41] mb-12 uppercase">COMPLIANCE_HARDENING</span>
                                <ul className="space-y-6 text-sm font-[900] text-white tracking-[0.2em] uppercase italic">
                                    <li className="flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-500"><div className="h-2 w-2 bg-[#00FF41] rounded-full" /> ISO 27001 Native</li>
                                    <li className="flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-500"><div className="h-2 w-2 bg-[#00FF41] rounded-full" /> SOC2 Sync Hub</li>
                                    <li className="flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-500"><div className="h-2 w-2 bg-[#00FF41] rounded-full" /> GDPR Sovereign</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* HUD Assurance */}
                <div className="mt-40 pt-12 border-t border-white/5 flex justify-between items-center opacity-10">
                    <div className="text-[8px] font-bold tracking-[0.5em] text-white uppercase font-mono">SPEC_FILE_v12.4 // LOADED</div>
                    <p className="text-[8px] font-bold tracking-[0.4em] text-white uppercase italic">" COMPLEXITY IS THE ENEMY OF SECURITY. "</p>
                </div>
            </div>
        </div>
    );
}
