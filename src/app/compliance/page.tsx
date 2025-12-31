
'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, FileText, Lock, Database, Activity, Target, ShieldAlert, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import RevealText from "@/components/RevealText";
import Magnetic from "@/components/Magnetic";
import TechnicalIcon from "@/components/TechnicalIcon";

const frameworks = [
    {
        name: "SOC2 TYPE II",
        status: "CERTIFIED",
        description: "Rigorous operational audit for security, availability, and confidentiality of our DentiGrid nodes.",
        color: "#00FF41",
        icon: ShieldCheck
    },
    {
        name: "ISO 27001:2022",
        status: "COMPLIANT",
        description: "International standard for managing information security systems across the DentiSystems collective.",
        color: "#00FF41",
        icon: Target
    },
    {
        name: "GDPR // SOVEREIGN",
        status: "ENFORCED",
        description: "Advanced data privacy protocols engineered for the strict European Union regulatory substrate.",
        color: "#0066FF",
        icon: Lock
    },
    {
        name: "HIPAA // HEALTH_LOCK",
        status: "VALIDATED",
        description: "Specialized hardening for healthcare telemetry ensuring absolute patient data integrity.",
        color: "#9333ea",
        icon: Database
    }
];

export default function CompliancePage() {
    return (
        <div className="min-h-screen bg-black pt-24 md:pt-40 pb-20 overflow-hidden relative">
            <div className="container px-4 relative z-10">
                <div className="max-w-7xl mb-24 md:mb-60 relative">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Link href="/about" className="group flex items-center gap-3 text-[10px] font-bold text-white/30 uppercase tracking-[0.4em] mb-12 md:mb-16 hover:text-[#00FF41] transition-colors px-4">
                            <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-2 transition-transform" />
                            BAK_TO_COLLECTIVE
                        </Link>

                        <div className="flex items-center gap-8 mb-12">
                            <TechnicalIcon icon={ShieldCheck} glowColor="#00FF41" className="scale-75 origin-left" />
                            <RevealText text="SOVEREIGN_COMPLIANCE // TRUST_LAYER" className="text-[10px] font-bold tracking-[1em] text-[#00FF41] uppercase" />
                        </div>

                        <h1 className="text-5xl md:text-8xl lg:text-[160px] font-[900] tracking-[-0.05em] text-white uppercase italic leading-[0.7] mb-12 md:mb-16">
                            TRUST <br /><span className="text-white/20">MODULES.</span>
                        </h1>

                        <p className="max-w-4xl text-white/40 text-xl md:text-3xl font-light italic leading-relaxed">
                            "Operating at the intersection of offensive research and institutional compliance. Our protocols are architected to exceed global security benchmarks."
                        </p>
                    </motion.div>
                </div>

                {/* Compliance Frameworks Grid */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-32 md:mb-60">
                    {frameworks.map((fw, idx) => (
                        <motion.div
                            key={fw.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.8 }}
                            className="bg-white/[0.01] border border-white/10 rounded-[3rem] md:rounded-[4rem] p-8 md:p-16 hover:bg-white/[0.04] hover:border-[#00FF41]/30 transition-all duration-700 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-16 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                                <fw.icon className="h-64 w-64 text-white" />
                            </div>

                            <div className="flex items-center gap-8 mb-16">
                                <TechnicalIcon icon={fw.icon} glowColor={fw.color} />
                                <div>
                                    <div className="flex items-center gap-4 mb-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-[#00FF41] animate-pulse" />
                                        <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white/40">{fw.status}</span>
                                    </div>
                                    <h3 className="text-3xl font-[900] text-white uppercase italic tracking-tighter">{fw.name}</h3>
                                </div>
                            </div>

                            <p className="text-white/30 text-xl font-light italic leading-relaxed mb-16 relative z-10">
                                {fw.description}
                            </p>

                            <div className="flex items-center justify-between border-t border-white/5 pt-12">
                                <div className="text-[10px] font-black tracking-[0.5em] text-white/10 group-hover:text-white/40 transition-colors uppercase">VERIFICATION_STAMP_9.4</div>
                                <ShieldAlert className="h-5 w-5 text-white/10 group-hover:text-[#00FF41]/40 transition-colors" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Secure Lifecycle Section */}
                <section className="mb-32 md:mb-60 overflow-hidden">
                    <div className="bg-white/[0.02] border border-white/10 rounded-[3rem] md:rounded-[5rem] p-8 md:p-16 lg:p-32 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#00FF41]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        <div className="relative z-10">
                            <div className="flex flex-col items-center text-center mb-16 md:mb-32">
                                <RevealText text="CONTINUOUS_MONITORING" className="text-[10px] font-black tracking-[1em] text-[#00FF41] mb-8 md:mb-12 block" />
                                <h2 className="text-5xl md:text-8xl lg:text-[140px] font-[900] text-white italic uppercase tracking-tighter leading-[0.85] mb-12 md:mb-16">
                                    THE SECURE <br /><span className="text-white/20">LIFECYCLE.</span>
                                </h2>
                            </div>

                            <div className="grid md:grid-cols-3 gap-20">
                                {[
                                    {
                                        icon: Lock,
                                        title: "Sync Encryption",
                                        desc: "AES-256 for data at rest. TLS 1.3 with Perfect Forward Secrecy for all data in transit across the DentiGrid mesh.",
                                        tag: "CRYPTO_SUBSTRATE"
                                    },
                                    {
                                        icon: Cpu,
                                        title: "Asset Isolation",
                                        desc: "Logical and physical isolation of sovereign data nodes to prevent cross-contamination and horizontal traversal.",
                                        tag: "HARDWARE_ENFORCE"
                                    },
                                    {
                                        icon: Activity,
                                        title: "Autonomic Watch",
                                        desc: "Automated telemetry alerting and manual intelligence audit logs active across 100% of our infrastructure substrate.",
                                        tag: "SENTINEL_STREAM"
                                    }
                                ].map((item, i) => (
                                    <div key={i} className="space-y-10 group/item">
                                        <div className="relative">
                                            <TechnicalIcon icon={item.icon} glowColor="#00FF41" />
                                            <div className="absolute top-0 right-0 text-[8px] font-black text-white/10 tracking-widest">{item.tag}</div>
                                        </div>
                                        <div className="space-y-6">
                                            <h4 className="text-3xl font-[900] text-white uppercase italic tracking-tighter group-hover/item:text-[#00FF41] transition-colors">{item.title}</h4>
                                            <p className="text-white/30 text-lg font-light leading-relaxed italic">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <div className="flex flex-col items-center py-24 md:py-40 bg-white/[0.01] border border-white/5 rounded-[3rem] md:rounded-[5rem] text-center px-8">
                    <p className="text-white/20 text-xl md:text-2xl font-light italic mb-12 md:mb-16 max-w-2xl">
                        "Institutional trust is built through technical absolute. Verify our architecture."
                    </p>
                    <Magnetic>
                        <Button size="lg" className="h-20 md:h-24 px-12 md:px-16 rounded-full bg-[#00FF41] text-black font-[900] uppercase text-[10px] md:text-[12px] tracking-[0.5em] hover:brightness-110 transition-all shadow-[0_0_60px_rgba(0,255,65,0.2)]" asChild>
                            <Link href="/contact">REQUEST_DOC_PACK <FileText className="ml-4 h-6 w-6" /></Link>
                        </Button>
                    </Magnetic>
                </div>

                {/* HUD Footer */}
                <div className="mt-40 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 opacity-20">
                    <div className="text-[10px] font-black tracking-[0.8em] text-white uppercase font-mono">TRUST_NODE_v6.4 // ONLINE</div>
                    <div className="flex gap-16 text-[10px] font-black tracking-[0.8em] text-white uppercase italic">
                        " ARCHITECTURE IS THE ULTIMATE PROOF. "
                    </div>
                </div>
            </div>
        </div>
    );
}
