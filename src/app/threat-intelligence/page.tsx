'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, FileText, Newspaper, ShieldAlert, Mail, Activity, Target, Zap, Lock, Radio, Shield } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SafeImage from "@/components/SafeImage";
import TechnicalIcon from "@/components/TechnicalIcon";
import GlitchText from "@/components/GlitchText";
import CyberGrid from "@/components/CyberGrid";

const threatReports = [
    {
        title: "The Rise of AI-Powered Phishing",
        date: "October 2024",
        description: "An in-depth analysis of how attackers are leveraging generative AI to create highly convincing phishing campaigns at scale.",
        imageUrl: "https://images.unsplash.com/photo-1677756119517-756a188d2d94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMEFJJTIwbmV0d29ya3xlbnwwfHx8fDE3NTg2MDM4MTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
        title: "Supply Chain Attacks on the Rise",
        date: "September 2024",
        description: "Examining recent high-profile supply chain compromises and outlining defensive strategies for modern enterprises.",
        imageUrl: "https://images.unsplash.com/photo-1639149503191-1f3c3d4a6a8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxnbG9iYWwlMjBzdXBwbHklMjBjaGFpbnxlbnwwfHx8fDE3NTg2MDQ3MDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
];

const securityAdvisories = [
    {
        id: "DS-2024-003",
        title: "Critical RCE in 'ConnectSphere' Library",
        severity: "Critical",
        severityColor: "text-red-500",
        date: "Oct 26, 2024",
        description: "A remote code execution vulnerability has been discovered in a popular third-party library used by the 'ConnectSphere' SaaS platform."
    },
    {
        id: "DS-2024-002",
        title: "Active Exploitation of 'DataWeave' Framework",
        severity: "High",
        severityColor: "text-orange-500",
        date: "Oct 22, 2024",
        description: "Threat actors are actively exploiting a zero-day vulnerability in the 'DataWeave' enterprise data framework."
    },
];

export default function ThreatIntelligencePage() {
    return (
        <div className="min-h-screen bg-black pt-24 md:pt-40 pb-20 overflow-hidden relative">
            <CyberGrid />
            {/* Background Architectural Grid */}
            <div className="absolute inset-0 z-0 opacity-[0.03]" style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '80px 80px'
            }} />
            <div className="container px-4 relative z-10">
                {/* Header Section */}
                <div className="max-w-7xl mb-12 md:mb-32 relative">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="flex items-center gap-8 mb-8 md:mb-12">
                            <TechnicalIcon icon={Radio} glowColor="#FF3131" className="scale-75 origin-left animate-pulse" />
                            <span className="text-[10px] font-black tracking-[1.2em] text-[#FF3131] uppercase">THREAT_INTEL // COMMAND_CENTER</span>
                        </div>
                        <h1 className="text-5xl md:text-8xl lg:text-9xl font-[900] tracking-tighter text-white uppercase italic leading-[0.7] mb-12 md:mb-16">
                            <GlitchText text="EARLY WARNING." />
                        </h1>
                        <p className="max-w-4xl text-white/40 text-xl md:text-3xl font-light italic leading-relaxed">
                            Aggregated telemetry from the dark web, sovereign networks, and offensive research cells. Actionable intelligence for proactive defense.
                        </p>
                    </motion.div>
                </div>

                {/* Threat Reports Grid */}
                <section className="mb-40">
                    <div className="flex items-center gap-6 mb-16 px-4">
                        <h2 className="text-[10px] font-black tracking-[0.6em] text-white uppercase italic whitespace-nowrap">MISSION_REPORTS</h2>
                        <div className="h-px flex-grow bg-white/5" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 px-4">
                        {threatReports.map((report, idx) => (
                            <Link href={`/news`} key={idx} className="group">
                                <div className="bg-white/[0.01] border border-white/5 rounded-[4rem] overflow-hidden hover:border-[#00FF41]/30 transition-all duration-700 backdrop-blur-3xl relative h-full flex flex-col">
                                    <div className="relative h-72 w-full overflow-hidden shrink-0">
                                        <SafeImage src={report.imageUrl} alt={report.title} fill className="object-cover grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                                        <div className="absolute top-8 left-8">
                                            <div className="px-6 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-[9px] font-bold text-white tracking-widest uppercase">
                                                ARCHIVE
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-12 flex flex-col flex-grow">
                                        <span className="text-[8px] font-bold text-[#00FF41]/60 tracking-[0.4em] mb-4 uppercase">{report.date}</span>
                                        <h3 className="text-3xl font-black text-white italic uppercase tracking-tight mb-6 group-hover:translate-x-2 transition-transform duration-500">{report.title}</h3>
                                        <p className="text-white/20 text-base font-light leading-relaxed mb-10 flex-grow">{report.description}</p>
                                        <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between text-[10px] font-bold text-white/20 tracking-[0.3em] uppercase group-hover:text-[#00FF41] transition-colors">
                                            DOWNLOAD_INTEL
                                            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-2 transition-transform duration-500" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Security Advisories - Terminal Style */}
                <section className="mb-40">
                    <div className="flex items-center gap-6 mb-16 px-4">
                        <h2 className="text-[10px] font-black tracking-[0.6em] text-red-500 uppercase italic whitespace-nowrap">LIVE_ADVISORIES</h2>
                        <div className="h-px flex-grow bg-white/5" />
                    </div>

                    <div className="space-y-6 px-4">
                        {securityAdvisories.map((advisory, idx) => (
                            <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 md:p-14 hover:border-red-500/30 transition-all duration-700 backdrop-blur-3xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-12 opacity-[0.02] scale-150 rotate-12 group-hover:opacity-[0.05] transition-opacity">
                                    <ShieldAlert className="h-32 w-32 text-red-500" />
                                </div>
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
                                    <div className="max-w-2xl">
                                        <div className="flex items-center gap-4 mb-6">
                                            <span className={`text-[9px] font-bold tracking-widest uppercase ${advisory.severityColor} border border-current px-4 py-1 rounded-full`}>
                                                SEVERITY: {advisory.severity}
                                            </span>
                                            <span className="text-[9px] font-bold text-white/20 tracking-widest uppercase">{advisory.id} // {advisory.date}</span>
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-black text-white uppercase italic tracking-tight mb-4">{advisory.title}</h3>
                                        <p className="text-white/30 text-sm font-light leading-relaxed font-mono">{advisory.description}</p>
                                    </div>
                                    <Button size="lg" variant="outline" className="h-16 px-10 rounded-full border-white/10 text-white/40 hover:text-red-500 hover:border-red-500/50 hover:bg-red-500/5 transition-all text-[11px] font-bold tracking-widest uppercase">
                                        ACCESS_REPORTS
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Subscription Blueprint */}
                <section className="mt-60">
                    <div className="bg-white/[0.01] border border-white/5 rounded-[4rem] p-16 md:p-32 text-center relative overflow-hidden group">
                        <div className="absolute -inset-20 bg-[#00FF41]/5 rounded-full blur-[120px] pointer-events-none opacity-20" />
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <div className="h-12 w-12 rounded-full border border-[#00FF41]/20 flex items-center justify-center text-[#00FF41] mx-auto mb-10">
                                <Mail className="h-5 w-5" />
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-none mb-12">
                                NEURAL INTELLIGENCE <span className="text-white/10">SUBSCRIPTION</span>
                            </h2>
                            <p className="text-white/30 text-lg font-light leading-relaxed mb-16">
                                Receive encrypted high-fidelity briefings on emerging zero-day vulnerabilities and global threat actor telemetry directly in your secure inbox.
                            </p>
                            <form className="flex flex-col md:flex-row gap-6 max-w-xl mx-auto">
                                <input
                                    type="email"
                                    placeholder="OPERATOR_SIGNAL_EMAIL"
                                    className="flex-grow h-20 px-10 rounded-full bg-black border border-white/10 text-white focus:outline-none focus:border-[#00FF41]/50 text-sm font-bold tracking-widest uppercase"
                                />
                                <Button size="lg" className="h-20 px-12 rounded-full bg-white text-black font-black uppercase text-xs tracking-[0.3em] hover:bg-[#00FF41] transition-all">
                                    INITIATE_SYNC
                                </Button>
                            </form>
                        </div>
                    </div>
                </section>

                {/* HUD Assurance */}
                <div className="mt-40 pt-12 border-t border-white/5 flex justify-between items-center opacity-10">
                    <div className="text-[8px] font-bold tracking-[0.5em] text-white uppercase font-mono">INTEL_NODE_STATE // ACTIVE</div>
                    <div className="flex gap-4">
                        {[1, 2, 3].map(i => <div key={i} className="h-1 w-8 bg-white" />)}
                    </div>
                </div>
            </div>
        </div>
    );
}