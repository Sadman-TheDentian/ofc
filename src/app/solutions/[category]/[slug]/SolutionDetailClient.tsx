'use client';

import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import React from 'react';
import { motion } from 'framer-motion';
import GlitchText from '@/components/GlitchText';
import HUDSection from '@/components/HUDSection';
import Magnetic from '@/components/Magnetic';

export default function SolutionDetailClient({ category, slug }: { category: string, slug: string }) {
    const name = slug.replace(/-/g, ' ').toUpperCase();
    const categoryName = category.replace(/-/g, ' ').toUpperCase();

    return (
        <div className="flex flex-col bg-black min-h-screen pt-24 md:pt-40 pb-20 overflow-hidden relative selection:bg-[#00FF41]/30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,65,0.02),transparent_70%)] pointer-events-none" />

            <div className="container px-4 relative z-10">
                {/* Back Button */}
                <Magnetic strength={0.2} className="w-fit">
                    <Link href="/solutions" className="group flex items-center gap-6 text-[11px] font-[1000] text-white/20 uppercase tracking-[0.6em] mb-16 md:mb-24 hover:text-[#00FF41] transition-all px-4 italic">
                        <LucideIcons.ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-4 transition-transform text-[#00FF41]" />
                        BAK_TO_STRATEGY_NODE
                    </Link>
                </Magnetic>

                {/* Hero Section */}
                <div className="max-w-7xl mb-12 md:mb-52 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="flex items-center gap-10 mb-12 md:mb-16">
                            <LucideIcons.Activity className="h- tags w-10 text-[#00FF41] animate-pulse" />
                            <span className="text-[12px] font-[1000] tracking-[1em] text-[#00FF41] uppercase italic">SOVEREIGN_SOLUTION // {categoryName}_v9.4</span>
                        </div>
                        <h1 className="text-5xl md:text-8xl lg:text-[180px] font-[1000] tracking-[-0.05em] text-white uppercase italic leading-[0.7] mb-12 md:mb-24">
                            {name.split(' ').map((word, i) => (
                                <GlitchText key={i} text={word + ' '} className={i % 2 !== 0 ? "text-white/10" : "text-white"} />
                            ))}
                        </h1>
                        <p className="max-w-5xl text-white/40 text-xl md:text-5xl font-light italic leading-relaxed border-l border-white/10 pl-16 py-8 hover:border-[#00FF41]/40 transition-colors">
                            Elite industrial security frameworks precision-engineered for the <span className="text-white/60">{name.toLowerCase()}</span> sector. We deploy absolute digital sovereignty where it matters most.
                        </p>
                    </motion.div>

                    {/* Background ID */}
                    <div className="absolute -bottom-40 -right-40 opacity-5 pointer-events-none select-none">
                        <span className="text-[25vw] font-[1000] text-white italic tracking-tighter leading-none">STRAT_0x{Math.random().toString(16).substring(2, 6).toUpperCase()}</span>
                    </div>
                </div>

                {/* Detail Content */}
                <div className="grid lg:grid-cols-12 gap-32 px-4 overflow-visible relative">
                    <aside className="lg:col-span-4 hidden lg:block sticky top-40 h-fit">
                        <div className="bg-white/[0.01] border border-white/5 rounded-[4rem] p-16 backdrop-blur-3xl relative overflow-hidden group/sidebar shadow-[0_0_100px_rgba(0,0,0,1)]">
                            {/* Scanning Line Effect */}
                            <div className="absolute inset-x-0 h-px bg-[#00FF41]/20 z-20 pointer-events-none overflow-hidden">
                                <motion.div
                                    animate={{ top: ['0%', '100%', '0%'] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-x-0 h-40 bg-gradient-to-b from-transparent via-[#00FF41]/20 to-transparent"
                                />
                            </div>

                            {/* Corner Accents */}
                            <div className="absolute top-10 left-10 w-12 h-12 border-t-2 border-l-2 border-[#00FF41]/30" />
                            <div className="absolute bottom-10 right-10 w-12 h-12 border-b-2 border-r-2 border-[#00FF41]/30" />

                            <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover/sidebar:opacity-[0.1] transition-opacity duration-1000">
                                <LucideIcons.ShieldAlert className="h-48 w-48 text-white" />
                            </div>

                            <div className="mb-16 flex items-center gap-4">
                                <div className="h-2 w-2 bg-[#00FF41] rounded-full animate-pulse shadow-[0_0_10px_#00FF41]" />
                                <h3 className="text-[12px] font-[1000] tracking-[0.6em] text-[#00FF41] uppercase italic">NODE_METRICS_v9.4</h3>
                            </div>

                            <div className="space-y-16">
                                <div className="group/metric border-l border-white/5 pl-10 hover:border-[#00FF41]/40 transition-colors">
                                    <div className="text-[10px] font-black text-white/5 tracking-[0.4em] uppercase mb-4 group-hover/metric:text-[#00FF41] transition-colors">SECTOR_THREAT_LVL</div>
                                    <div className="text-4xl font-[1000] text-red-500 italic uppercase tracking-tighter group-hover/metric:translate-x-6 transition-transform origin-left">CRITICAL_EVATED</div>
                                </div>
                                <div className="group/metric border-l border-white/5 pl-10 hover:border-[#00FF41]/40 transition-colors">
                                    <div className="text-[10px] font-black text-white/5 tracking-[0.4em] uppercase mb-4 group-hover/metric:text-[#00FF41] transition-colors">DEPLOYMENT_READY</div>
                                    <div className="text-4xl font-[1000] text-[#00FF41] italic uppercase tracking-tighter group-hover/metric:translate-x-6 transition-transform origin-left">READY_SYNCED</div>
                                </div>
                                <div className="group/metric border-l border-white/5 pl-10 hover:border-[#00FF41]/40 transition-colors">
                                    <div className="text-[10px] font-black text-white/5 tracking-[0.4em] uppercase mb-4 group-hover/metric:text-[#00FF41] transition-colors">COMPLIANCE_SYNC</div>
                                    <div className="text-4xl font-[1000] text-white italic uppercase font-mono tracking-tighter group-hover/metric:translate-x-6 transition-transform origin-left">99.98%_ACC</div>
                                </div>
                            </div>

                            <div className="mt-24 pt-16 border-t border-white/5 relative">
                                <div className="text-[9px] font-mono text-white/20 uppercase tracking-[0.3em] leading-relaxed italic">
                                    " MONITORING_STATION_01: ACTIVE <br />
                                    " ENCRYPTION_SUBSTRATE: NOMINAL <br />
                                    " PRIVACY_PROTOCOL: HARDENED
                                </div>
                                <motion.div animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-4 right-4 h-2 w-2 bg-[#00FF41] rounded-full shadow-[0_0_15px_#00FF41]" />
                            </div>
                        </div>
                    </aside>

                    <div className="lg:col-span-8 space-y-24 md:space-y-40">
                        <HUDSection label="STRATEGIC_OBJECTIVE // CORE_INTEL">
                            <div className="prose prose-invert max-w-none prose-p:text-white/40 prose-p:text-2xl prose-p:md:text-4xl prose-p:font-light prose-p:italic prose-p:leading-relaxed prose-strong:text-white">
                                <p className="border-l border-white/10 pl-12 py-4 hover:border-[#00FF41]/40 transition-colors">
                                    The <span className="text-white italic">{name.toLowerCase()}</span> landscape is currently undergoing a massive digital transformation, exposing critical infrastructure to sophisticated nation-state actors and organized cyber syndicates. Our objective is to establish an impenetrable digital perimeter that ensures continuity and data integrity.
                                </p>
                                <p className="border-l border-white/10 pl-12 py-4 hover:border-[#00FF41]/40 transition-colors">
                                    DentiSystems provides a multi-layered security substrate that integrates directly into your existing operational technology (OT) and information technology (IT) environments.
                                </p>
                            </div>
                        </HUDSection>

                        <HUDSection label="CORE_PROTOCOL_STAGING // v9.4">
                            <p className="text-white/40 text-xl md:text-3xl font-light mb-20 italic border-l border-white/10 pl-10">
                                Every deployment follows a rigorous 4-phase sequence designed to minimize operational friction while maximizing tactical resilience.
                            </p>
                            <div className="grid md:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-[4rem] overflow-hidden shadow-2xl">
                                {[
                                    { title: "PHASE_01", label: "RECONNAISSANCE", desc: "Deep environmental mapping and leak identification.", icon: LucideIcons.Search },
                                    { title: "PHASE_02", label: "HARDENING", desc: "Implementation of sovereign encryption layers.", icon: LucideIcons.ShieldPlus },
                                    { title: "PHASE_03", label: "NEURAL_SYNC", desc: "Integration with global threat telemetry nodes.", icon: LucideIcons.Zap },
                                    { title: "PHASE_04", label: "VIGILANCE", desc: "Continuous 24/7 offensive monitoring.", icon: LucideIcons.Activity }
                                ].map((phase, idx) => (
                                    <div key={idx} className="bg-black p-12 md:p-20 hover:bg-[#00FF41]/[0.02] transition-colors duration-1000 group/p relative overflow-hidden">
                                        <div className="absolute top-12 left-12 w-10 h-10 border-t border-l border-white/5 group-hover/p:border-[#00FF41]/40 transition-colors" />
                                        <div className="absolute top-0 right-0 p-12 opacity-[0.01] group-hover/p:opacity-[0.05] transition-opacity scale-150 rotate-12 blur-sm group-hover/p:rotate-0 transition-transform duration-1000">
                                            <phase.icon className="h-40 w-40 text-[#00FF41]" />
                                        </div>
                                        <div className="flex justify-between items-start mb-10 relative z-10">
                                            <div className="h-20 w-20 flex items-center justify-center p-4 bg-white/[0.01] border border-white/5 rounded-[1.5rem] group-hover/p:border-[#00FF41]/40 group-hover/p:bg-[#00FF41]/5 transition-all duration-700 text-white/10 group-hover/p:text-[#00FF41]">
                                                <phase.icon className="h-8 w-8" />
                                            </div>
                                            <div className="text-[11px] font-[1000] text-[#00FF41]/40 tracking-[0.6em] italic italic">{phase.title}</div>
                                        </div>
                                        <div className="text-3xl md:text-5xl font-[1000] text-white uppercase italic mb-8 group-hover/p:translate-x-8 transition-all duration-1000 tracking-tighter leading-none">{phase.label}</div>
                                        <p className="text-white/20 text-xl font-light italic leading-relaxed group-hover/p:text-white/40 transition-all duration-1000 border-l border-white/10 pl-8">{phase.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </HUDSection>

                        <HUDSection label="TECHNICAL_VALIDATION // REGULATORY_MESH">
                            <div className="prose prose-invert max-w-none prose-p:text-white/40 prose-p:text-xl md:text-3xl prose-p:font-light prose-p:italic prose-p:leading-relaxed">
                                <p className="border-l border-white/10 pl-16 py-6 hover:border-[#00FF41]/40 transition-colors bg-white/[0.01] rounded-[3rem] shadow-2xl">
                                    All solutions are validated against international standards including <span className="text-white border-b border-white/10">ISO 27001</span>, <span className="text-white border-b border-white/10">SOC2 Type II</span>, and sector-specific mandates such as <span className="text-white border-b border-white/10">HIPAA</span> or <span className="text-white border-b border-white/10">PCI-DSS</span>. Our automated compliance engine ensures that your posture remains non-negotiable.
                                </p>
                            </div>
                        </HUDSection>

                        {/* Call to Action */}
                        <div className="mt-32 p-16 md:p-40 bg-white/[0.01] border border-white/5 rounded-[5rem] relative overflow-hidden group/cta shadow-[0_0_150px_rgba(0,0,0,1)]">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,65,0.05),transparent_70%)] opacity-0 group-hover/cta:opacity-100 transition-opacity duration-1500" />

                            {/* HUD Corners */}
                            <div className="absolute top-16 left-16 w-24 h-24 border-t-2 border-l-2 border-[#00FF41]/20" />
                            <div className="absolute bottom-16 right-16 w-24 h-24 border-b-2 border-r-2 border-[#00FF41]/20" />

                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-24">
                                <div className="max-w-3xl text-center md:text-left">
                                    <div className="flex items-center justify-center md:justify-start gap-10 mb-12">
                                        <LucideIcons.Radio className="h-8 w-8 text-[#00FF41] animate-pulse" />
                                        <span className="text-[12px] font-[1000] tracking-[1.5em] text-[#00FF41] uppercase italic">COMMAND_CENTER_SYNC</span>
                                    </div>
                                    <h3 className="text-6xl md:text-[10vw] font-[1000] text-white italic uppercase tracking-tighter mb-12 leading-[0.75]">
                                        READY_FOR_ <br /> <span className="text-[#00FF41] group-hover:text-white transition-colors duration-1000">ENVIRONMENT_SYNC?</span>
                                    </h3>
                                    <p className="text-white/40 text-2xl md:text-5xl font-light italic leading-tight border-l border-white/10 pl-12 py-4">
                                        Consult with our command unit to architect your sector-specific defense plan.
                                    </p>
                                </div>
                                <Magnetic strength={0.3}>
                                    <Button size="lg" className="h-32 px-24 rounded-full bg-[#00FF41] text-black font-[1000] uppercase tracking-[0.8em] text-lg hover:bg-white transition-all shadow-[0_40px_150px_rgba(0,255,65,0.4)] relative overflow-hidden group/btn" asChild>
                                        <Link href="/contact" className="flex items-center gap-6">
                                            <span className="relative z-10 flex items-center gap-6">
                                                INITIALIZE_SYNC
                                                <LucideIcons.ArrowRight className="h-10 w-10 group-hover/btn:translate-x-6 transition-transform duration-500" />
                                            </span>
                                            <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-700 pointer-events-none" />
                                        </Link>
                                    </Button>
                                </Magnetic>
                            </div>

                            {/* Metadata Footer */}
                            <div className="mt-32 flex flex-col md:flex-row justify-between items-center gap-12 opacity-5 italic border-t border-white/10 pt-16">
                                <div className="text-[10px] font-black tracking-[1em] uppercase italic italic">SYNC_STATION_v14.4_SECURE</div>
                                <div className="flex gap-4">
                                    {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-1 w-10 bg-[#00FF41] rounded-full animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* HUD Assurance */}
                <div className="mt-40 md:mt-80 pt-24 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-16 md:gap-32 relative overflow-hidden opacity-20">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#00FF41]/40 to-transparent" />
                    <div className="text-[11px] font-[1000] tracking-[1em] text-white uppercase font-mono italic">SOLUTION_NODE_ARCHIVE_v7.4 // ONLINE</div>
                    <div className="flex gap-16 text-[11px] font-[1000] tracking-[1.5em] text-[#00FF41] uppercase italic text-center md:text-right">
                        " ARCHITECTURE IS THE ULTIMATE ENCRYPTION. "
                    </div>
                </div>
            </div>
        </div>
    );
}
