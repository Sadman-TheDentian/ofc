
'use client';

import { motion } from "framer-motion";
import { Cpu, Zap, Shield, Database, Network, Activity, Container, Terminal, Code2, BrainCircuit, ArrowLeft } from "lucide-react";
import RevealText from "@/components/RevealText";
import Link from "next/link";
import TechnicalIcon from "@/components/TechnicalIcon";
import MeshVisualizer from "@/components/MeshVisualizer";

export default function TechnologyPage() {
    return (
        <div className="min-h-screen bg-black pt-24 md:pt-40 pb-20 overflow-hidden relative">
            {/* Background Architectural Grid */}
            <div className="absolute inset-0 z-0 opacity-[0.03]" style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '80px 80px'
            }} />

            <div className="container px-4 relative z-10">
                {/* Tech Header */}
                <div className="max-w-7xl mb-12 md:mb-32 relative">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <Link href="/" className="group flex items-center gap-4 text-[10px] font-black text-white/30 uppercase tracking-[0.5em] mb-12 md:mb-16 hover:text-[#00FF41] transition-colors">
                            <ArrowLeft className="h-5 w-5 transform group-hover:-translate-x-3 transition-transform" />
                            BAK_TO_COLLECTIVE
                        </Link>

                        <div className="flex items-center gap-8 mb-8 md:mb-12">
                            <div className="h-0.5 w-16 bg-[#00FF41]" />
                            <RevealText text="CORE_SUBSTRATE // ENGINEERING_SPEC" className="text-[10px] font-bold tracking-[1.2em] text-[#00FF41] uppercase" />
                        </div>

                        <h1 className="text-5xl md:text-8xl lg:text-[160px] font-[900] tracking-[-0.05em] text-white uppercase italic leading-[0.7] mb-12 md:mb-16">
                            THE <br /><span className="text-white/10">SUBSTRATE.</span>
                        </h1>

                        <p className="max-w-4xl text-white/40 text-xl md:text-3xl font-light italic leading-relaxed">
                            DentiSystems operates on a proprietary technological foundation engineered back-to-zero for absolute digital sovereignty.
                        </p>
                    </motion.div>
                </div>

                {/* Tech Stack Modules */}
                <div className="grid lg:grid-cols-2 gap-8 md:gap-20 mb-32 md:mb-60 overflow-hidden">
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
                            className="bg-white/[0.01] border border-white/10 rounded-[3rem] md:rounded-[6rem] p-8 md:p-16 lg:p-24 hover:bg-white/[0.03] hover:border-[#00FF41]/20 transition-all duration-700 relative overflow-hidden group"
                        >
                            <div className="absolute bottom-0 right-0 p-12 md:p-20 opacity-[0.02] group-hover:scale-110 transition-transform">
                                <item.icon className="h-[200px] w-[200px] md:h-[400px] md:w-[400px] text-white" />
                            </div>
                            <div className="relative z-10">
                                <div className="mb-8 md:mb-12">
                                    <TechnicalIcon icon={item.icon as any} glowColor="#00FF41" className="scale-110 origin-left" />
                                </div>
                                <span className="text-[10px] font-black tracking-[0.5em] text-[#00FF41] mb-8 md:mb-12 block uppercase">{item.tag}</span>
                                <h3 className="text-4xl md:text-7xl font-[900] text-white italic uppercase tracking-tighter mb-8 md:mb-12 leading-[0.8]">{item.title}</h3>
                                <p className="text-white/30 text-xl md:text-2xl font-light italic leading-relaxed max-w-lg">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Sovereign Mesh Visualization Section */}
                <section className="mb-32 md:mb-60 relative overflow-hidden">
                    <div className="bg-white/[0.01] border border-white/10 rounded-[3rem] md:rounded-[6rem] p-8 md:p-32 overflow-hidden relative min-h-[600px] flex items-center">
                        <div className="absolute inset-0 z-0">
                            <MeshVisualizer />
                        </div>

                        <div className="relative z-10 grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
                            <div>
                                <span className="text-[10px] font-black tracking-[1em] text-[#00FF41] mb-8 md:mb-12 block uppercase">KINETIC_ARCHITECTURE</span>
                                <h2 className="text-5xl md:text-8xl lg:text-[140px] font-[900] text-white italic uppercase tracking-tighter leading-[0.85] mb-12 md:mb-16">
                                    THE <span className="text-white/20">SOVEREIGN</span> <br />MESH.
                                </h2>
                                <p className="text-white/30 text-xl md:text-2xl font-light italic leading-relaxed max-w-xl">
                                    Our global network is a self-healing, encrypted mesh substrate. Every node is an autonomous intelligence unit, synchronized via sub-ms latency gRPC tunnels.
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-6 md:gap-8">
                                <div className="p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl group">
                                    <div className="text-3xl md:text-4xl font-black text-white italic mb-4">99.99%</div>
                                    <div className="text-[9px] font-bold text-[#00FF41] tracking-[0.5em] uppercase">UPTIME_SOVEREIGNTY</div>
                                </div>
                                <div className="p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl group">
                                    <div className="text-3xl md:text-4xl font-black text-white italic mb-4">&lt;1.2ms</div>
                                    <div className="text-[9px] font-bold text-[#00FF41] tracking-[0.5em] uppercase">CORE_LATENCY</div>
                                </div>
                                <div className="p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl group">
                                    <div className="text-3xl md:text-4xl font-black text-white italic mb-4">74+</div>
                                    <div className="text-[9px] font-bold text-[#00FF41] tracking-[0.5em] uppercase">GLOBAL_NODES</div>
                                </div>
                                <div className="p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] bg-[#00FF41] group cursor-pointer">
                                    <div className="text-3xl md:text-4xl font-black text-black italic mb-4">∞</div>
                                    <div className="text-[9px] font-bold text-black/40 tracking-[0.5em] uppercase">ENCRYPTION_LAYERS</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Technical Specification HUD */}
                <section className="py-24 md:py-[20vh] border-t border-white/5 overflow-hidden">
                    <div className="bg-white/[0.01] border border-white/10 rounded-[3rem] md:rounded-[6rem] p-10 md:p-32 relative overflow-hidden backdrop-blur-3xl">
                        <div className="grid md:grid-cols-3 gap-16 md:gap-24 text-center md:text-left">
                            <div className="flex flex-col items-center md:items-start group">
                                <div className="mb-8 md:mb-12">
                                    <TechnicalIcon icon={Terminal} glowColor="#00FF41" />
                                </div>
                                <span className="text-[10px] font-black tracking-[0.5em] text-[#00FF41] mb-8 md:mb-12 uppercase">DEVELOPER_INTERFACE</span>
                                <ul className="space-y-6 text-sm font-[900] text-white tracking-[0.2em] uppercase italic">
                                    <li className="flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-500"><div className="h-2 w-2 bg-[#00FF41] rounded-full" /> gRPC Telemetry</li>
                                    <li className="flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-500"><div className="h-2 w-2 bg-[#00FF41] rounded-full" /> Rust Bindings</li>
                                    <li className="flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-500"><div className="h-2 w-2 bg-[#00FF41] rounded-full" /> WASM Runtime</li>
                                </ul>
                            </div>
                            <div className="flex flex-col items-center md:items-start group">
                                <div className="mb-8 md:mb-12">
                                    <TechnicalIcon icon={Database} glowColor="#00FF41" />
                                </div>
                                <span className="text-[10px] font-black tracking-[0.5em] text-[#00FF41] mb-8 md:mb-12 uppercase">DATA_ORCHESTRATION</span>
                                <ul className="space-y-6 text-sm font-[900] text-white tracking-[0.2em] uppercase italic">
                                    <li className="flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-500"><div className="h-2 w-2 bg-[#00FF41] rounded-full" /> Sharded Ledger</li>
                                    <li className="flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-500"><div className="h-2 w-2 bg-[#00FF41] rounded-full" /> Vector Embeddings</li>
                                    <li className="flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-500"><div className="h-2 w-2 bg-[#00FF41] rounded-full" /> Real-time Sync</li>
                                </ul>
                            </div>
                            <div className="flex flex-col items-center md:items-start group">
                                <div className="mb-8 md:mb-12">
                                    <TechnicalIcon icon={Shield} glowColor="#00FF41" />
                                </div>
                                <span className="text-[10px] font-black tracking-[0.5em] text-[#00FF41] mb-8 md:mb-12 uppercase">COMPLIANCE_HARDENING</span>
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
