
'use client';

import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import * as LucideIcons from 'lucide-react';
import React from 'react';
import { motion } from 'framer-motion';
import SafeImage from '@/components/SafeImage';

const Icon = ({ name, ...props }: { name: string } & LucideIcons.LucideProps) => {
    const LucideIcon = LucideIcons[name as keyof typeof LucideIcons] as LucideIcons.LucideIcon;
    if (!LucideIcon) return null;
    return <LucideIcon {...props} />;
};

import GlitchText from '@/components/GlitchText';
import HUDSection from '@/components/HUDSection';

export default function SolutionDetailClient({ category, slug }: { category: string, slug: string }) {
    const name = slug.replace(/-/g, ' ').toUpperCase();
    const categoryName = category.replace(/-/g, ' ').toUpperCase();

    return (
        <div className="flex flex-col bg-black min-h-screen pt-24 md:pt-40 pb-20 overflow-hidden relative">
            <div className="container px-4 relative z-10">
                {/* Back Button */}
                <Link href="/solutions" className="group flex items-center gap-3 text-[10px] font-bold text-white/30 uppercase tracking-[0.4em] mb-12 md:mb-16 hover:text-[#00FF41] transition-colors px-4">
                    <LucideIcons.ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-2 transition-transform" />
                    BAK_TO_STRATEGY
                </Link>

                {/* Hero Section */}
                <div className="max-w-7xl mb-12 md:mb-32 relative">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="flex items-center gap-8 mb-8 md:mb-12">
                            <div className="h-2 w-2 bg-[#00FF41] rounded-full animate-pulse shadow-[0_0_10px_#00FF41]" />
                            <span className="text-[10px] font-bold tracking-[0.8em] text-[#00FF41] uppercase">SOVEREIGN_SOLUTION // {categoryName}</span>
                        </div>
                        <h1 className="text-5xl md:text-8xl lg:text-[140px] font-[900] tracking-[-0.05em] text-white uppercase italic leading-[0.7] mb-12 md:mb-16">
                            {name.split(' ').map((word, i) => (
                                <GlitchText key={i} text={word + ' '} className={i % 2 !== 0 ? "text-white/20" : "text-white"} />
                            ))}
                        </h1>
                        <p className="max-w-4xl text-white/40 text-xl md:text-3xl font-light italic leading-relaxed">
                            Elite industrial security frameworks precision-engineered for the {name.toLowerCase()} sector. We deploy absolute digital sovereignty where it matters most.
                        </p>
                    </motion.div>
                </div>

                {/* Detail Content */}
                <div className="grid lg:grid-cols-12 gap-24 px-4 overflow-visible">
                    <aside className="lg:col-span-4 hidden lg:block sticky top-32 h-fit">
                        <div className="bg-white/[0.01] border border-white/10 rounded-[3rem] p-12 backdrop-blur-3xl relative overflow-hidden group">
                            {/* Scanning Line Effect */}
                            <div className="absolute inset-x-0 h-px bg-[#00FF41]/20 z-20 pointer-events-none overflow-hidden">
                                <motion.div
                                    animate={{ top: ['0%', '100%', '0%'] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-x-0 h-20 bg-gradient-to-b from-transparent via-[#00FF41]/10 to-transparent"
                                />
                            </div>

                            <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                                <LucideIcons.ShieldAlert className="h-32 w-32 text-white" />
                            </div>
                            <h3 className="text-[10px] font-black tracking-[0.5em] text-[#00FF41] uppercase mb-12 italic">NODE_METRICS_v4.2</h3>
                            <div className="space-y-10">
                                <div className="group/metric">
                                    <div className="text-[8px] font-bold text-white/10 tracking-[0.4em] uppercase mb-3 group-hover/metric:text-white/30 transition-colors">SECTOR_THREAT_LVL</div>
                                    <div className="text-3xl font-black text-red-500 italic uppercase tracking-tighter group-hover/metric:scale-105 transition-transform origin-left">ELEVATED</div>
                                </div>
                                <div className="group/metric">
                                    <div className="text-[8px] font-bold text-white/10 tracking-[0.4em] uppercase mb-3 group-hover/metric:text-white/30 transition-colors">DEPLOYMENT_READY</div>
                                    <div className="text-3xl font-black text-[#00FF41] italic uppercase tracking-tighter group-hover/metric:scale-105 transition-transform origin-left">ACTIVE</div>
                                </div>
                                <div className="group/metric">
                                    <div className="text-[8px] font-bold text-white/10 tracking-[0.4em] uppercase mb-3 group-hover/metric:text-white/30 transition-colors">COMPLIANCE_SYNC</div>
                                    <div className="text-3xl font-black text-white italic uppercase font-mono tracking-tighter group-hover/metric:scale-105 transition-transform origin-left">99.9%_ACC</div>
                                </div>
                            </div>

                            <div className="mt-16 pt-10 border-t border-white/5 opacity-20">
                                <div className="text-[7px] font-mono text-white/40 uppercase tracking-[0.2em] leading-relaxed">
                                    " CONTINUOUS_MONITORING_ACTIVE <br />
                                    " ENCRYPTION_LAYER_L4_VERIFIED <br />
                                    " ZERO_TRUST_PROTOCOLS_ENGAGED
                                </div>
                            </div>
                        </div>
                    </aside>

                    <div className="lg:col-span-8 space-y-12">
                        <HUDSection label="STRATEGIC_OBJECTIVE">
                            <div className="prose prose-invert max-w-none prose-p:text-white/40 prose-p:text-xl prose-p:font-light prose-p:leading-relaxed prose-strong:text-white">
                                <p>
                                    The {name.toLowerCase()} landscape is currently undergoing a massive digital transformation, exposing critical infrastructure to sophisticated nation-state actors and organized cyber syndicates. Our objective is to establish an impenetrable digital perimeter that ensures continuity and data integrity.
                                </p>
                                <p>
                                    DentiSystems provides a multi-layered security substrate that integrates directly into your existing operational technology (OT) and information technology (IT) environments.
                                </p>
                            </div>
                        </HUDSection>

                        <HUDSection label="CORE_PROTOCOL_STAGING">
                            <p className="text-white/40 text-lg font-light mb-12 italic">
                                Every deployment follows a rigorous 4-phase sequence designed to minimize operational friction while maximizing tactical resilience.
                            </p>
                            <div className="grid md:grid-cols-2 gap-8">
                                {[
                                    { title: "PHASE_01", label: "RECONNAISSANCE", desc: "Deep environmental mapping and leak identification." },
                                    { title: "PHASE_02", label: "HARDENING", desc: "Implementation of sovereign encryption layers." },
                                    { title: "PHASE_03", label: "NEURAL_SYNC", desc: "Integration with global threat telemetry nodes." },
                                    { title: "PHASE_04", label: "VIGILANCE", desc: "Continuous 24/7 offensive monitoring." }
                                ].map((phase, idx) => (
                                    <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 hover:bg-white/[0.05] transition-all group/p relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-8 opacity-0 group-hover/p:opacity-5 transition-opacity">
                                            <LucideIcons.Lock className="h-16 w-16 text-[#00FF41]" />
                                        </div>
                                        <div className="text-[8px] font-bold text-[#00FF41]/40 tracking-[0.4em] mb-4">{phase.title}</div>
                                        <div className="text-2xl font-black text-white uppercase italic mb-6 group-hover:text-[#00FF41] transition-colors tracking-tight">{phase.label}</div>
                                        <p className="text-white/20 text-sm font-light italic leading-relaxed">{phase.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </HUDSection>

                        <HUDSection label="TECHNICAL_VALIDATION">
                            <div className="prose prose-invert max-w-none prose-p:text-white/40 prose-p:text-lg prose-p:font-light prose-p:leading-relaxed">
                                <p>
                                    All solutions are validated against international standards including ISO 27001, SOC2 Type II, and sector-specific mandates such as HIPAA or PCI-DSS. Our automated compliance engine ensures that your posture remains non-negotiable.
                                </p>
                            </div>
                        </HUDSection>

                        {/* Call to Action */}
                        <div className="mt-32 p-12 md:p-24 bg-[#00FF41]/5 border border-[#00FF41]/20 rounded-[4rem] relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#00FF41]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                                <div className="max-w-xl">
                                    <h3 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter mb-8 leading-[0.85]">
                                        READY_FOR_ <br /> <span className="text-[#00FF41]">ENVIRONMENT_SYNC?</span>
                                    </h3>
                                    <p className="text-white/40 text-xl font-light italic">
                                        Consult with our command unit to architect your sector-specific defense plan.
                                    </p>
                                </div>
                                <Button size="lg" className="h-24 px-16 rounded-full bg-white text-black font-black uppercase tracking-[0.4em] text-[13px] hover:bg-[#00FF41] transition-all shadow-[0_20px_60px_rgba(255,255,255,0.1)] group-hover:shadow-[0_20px_80px_rgba(0,255,65,0.3)]" asChild>
                                    <Link href="/contact">INITIALIZE_COMMAND_LINK <LucideIcons.ArrowRight className="ml-6 h-8 w-8" /></Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* HUD Assurance */}
                <div className="mt-40 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 opacity-20">
                    <div className="text-[10px] font-black tracking-[0.8em] text-white uppercase font-mono italic">SOLUTION_NODE_ARCHIVE_v7.4 // ONLINE</div>
                    <div className="flex gap-16 text-[10px] font-black tracking-[0.8em] text-white uppercase italic text-center md:text-right">
                        " ARCHITECTURE IS THE ULTIMATE ENCRYPTION. "
                    </div>
                </div>
            </div>
        </div>
    );
}
