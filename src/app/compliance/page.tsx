
'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Gavel, FileText, CheckCircle2, ShieldAlert, Lock, Zap, Database, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import RevealText from "@/components/RevealText";
import Magnetic from "@/components/Magnetic";

const frameworks = [
    {
        name: "SOC2 TYPE II",
        status: "CERTIFIED",
        description: "Rigorous operational audit for security, availability, and confidentiality of our DentiGrid nodes.",
        color: "text-[#00FF41]"
    },
    {
        name: "ISO 27001:2022",
        status: "COMPLIANT",
        description: "International standard for managing information security systems across the DentiSystems collective.",
        color: "text-[#00FF41]"
    },
    {
        name: "GDPR // SOVEREIGN",
        status: "ENFORCED",
        description: "Advanced data privacy protocols engineered for the strict European Union regulatory substrate.",
        color: "text-blue-500"
    },
    {
        name: "HIPAA // HEALTH_LOCK",
        status: "VALIDATED",
        description: "Specialized hardening for healthcare telemetry ensuring absolute patient data integrity.",
        color: "text-purple-500"
    }
];

export default function CompliancePage() {
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
                                <ShieldCheck className="h-5 w-5 text-[#00FF41]" />
                            </div>
                            <span className="text-[10px] font-bold tracking-[0.8em] text-[#00FF41] uppercase">SOVEREIGN_COMPLIANCE // TRUST_LAYER</span>
                        </div>

                        <h1 className="text-6xl md:text-9xl font-[900] tracking-tighter text-white uppercase italic leading-none mb-12">
                            TRUST <span className="text-white/20">MODULES.</span>
                        </h1>

                        <p className="max-w-xl text-white/30 text-lg md:text-2xl font-light leading-relaxed">
                            We operate at the intersection of offensive research and institutional compliance. Our protocols are architected to meet and exceed global security benchmarks.
                        </p>
                    </motion.div>
                </div>

                {/* Compliance Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-40">
                    {frameworks.map((fw, idx) => (
                        <motion.div
                            key={fw.name}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white/[0.01] border border-white/5 rounded-[4rem] p-12 md:p-16 hover:bg-white/[0.03] hover:border-[#00FF41]/30 transition-all duration-700 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-12 opacity-10">
                                <span className="text-[10px] font-black text-white italic tracking-widest uppercase">NODE_v{idx + 10}</span>
                            </div>

                            <div className="flex items-center gap-6 mb-10">
                                <div className={`h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${fw.color}`}>
                                    <ShieldCheck className="h-6 w-6" />
                                </div>
                                <div>
                                    <span className={`text-[10px] font-black tracking-widest uppercase ${fw.color}`}>{fw.status}</span>
                                    <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">{fw.name}</h3>
                                </div>
                            </div>

                            <p className="text-white/30 text-lg font-light italic leading-relaxed mb-12 italic">
                                "{fw.description}"
                            </p>

                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ x: "-100%" }}
                                    animate={{ x: "0%" }}
                                    transition={{ duration: 1.5, delay: idx * 0.2 }}
                                    className={`h-full w-full bg-gradient-to-r from-transparent via-[#00FF41]/40 to-transparent`}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Security Posture Section */}
                <section className="mb-40">
                    <div className="bg-white/[0.01] border border-white/5 rounded-[5rem] p-16 md:p-32 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#00FF41]/5 to-transparent pointer-events-none" />
                        <div className="relative z-10 max-w-4xl mx-auto">
                            <RevealText text="CONTINUOUS_MONITORING" className="text-[10px] font-black tracking-[1em] text-[#00FF41] mb-12 block uppercase" />
                            <h2 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-none mb-16">
                                A SECURE <span className="text-white/20">LIFECYCLE.</span>
                            </h2>

                            <div className="grid md:grid-cols-3 gap-16 text-left">
                                <div className="space-y-6">
                                    <div className="h-12 w-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-[#00FF41]">
                                        <Lock className="h-5 w-5" />
                                    </div>
                                    <h4 className="text-xl font-black text-white uppercase italic tracking-tight">Data Encryption</h4>
                                    <p className="text-white/30 text-base font-light italic">AES-256 for data at rest. TLS 1.3 with Perfect Forward Secrecy for all data in transit across the DentiGrid mesh.</p>
                                </div>
                                <div className="space-y-6">
                                    <div className="h-12 w-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-[#00FF41]">
                                        <Database className="h-5 w-5" />
                                    </div>
                                    <h4 className="text-xl font-black text-white uppercase italic tracking-tight">Asset Isolation</h4>
                                    <p className="text-white/30 text-base font-light italic">Logical and physical isolation of sovereign data nodes to prevent cross-contamination and horizontal traversal.</p>
                                </div>
                                <div className="space-y-6">
                                    <div className="h-12 w-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-[#00FF41]">
                                        <Activity className="h-5 w-5" />
                                    </div>
                                    <h4 className="text-xl font-black text-white uppercase italic tracking-tight">24/7 Monitoring</h4>
                                    <p className="text-white/30 text-base font-light italic">Automated telemetry alerting and manual intelligence audit logs active across 100% of our infrastructure substrate.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <div className="text-center">
                    <p className="text-white/20 text-lg font-light italic mb-12">Need to verify our compliance with your institutional requirements?</p>
                    <div className="flex justify-center">
                        <Magnetic>
                            <Button size="lg" className="h-20 px-16 rounded-full bg-white text-black font-black uppercase text-xs tracking-[0.4em] hover:bg-[#00FF41] transition-all shadow-2xl" asChild>
                                <Link href="/contact">REQUEST_DOC_PACK <FileText className="ml-4 h-5 w-5" /></Link>
                            </Button>
                        </Magnetic>
                    </div>
                </div>

                {/* HUD Assurance */}
                <div className="mt-40 pt-12 border-t border-white/5 flex justify-between items-center opacity-10">
                    <div className="text-[8px] font-bold tracking-[0.5em] text-white uppercase font-mono">TRUST_NODE_v4.2 // ONLINE</div>
                    <p className="text-[8px] font-bold tracking-[0.4em] text-white uppercase italic">" TRANSPARENCY IS THE ROOT OF STABILITY. "</p>
                </div>
            </div>
        </div>
    );
}
