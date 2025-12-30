
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

export default function SolutionDetailClient({ category, slug }: { category: string, slug: string }) {
    const name = slug.replace(/-/g, ' ').toUpperCase();
    const categoryName = category.replace(/-/g, ' ').toUpperCase();

    return (
        <div className="flex flex-col bg-black min-h-screen pt-40 pb-20 overflow-hidden">
            <div className="container px-4">
                {/* Back Button */}
                <Link href="/solutions" className="group flex items-center gap-3 text-[10px] font-bold text-white/30 uppercase tracking-[0.4em] mb-16 hover:text-[#00FF41] transition-colors px-4">
                    <LucideIcons.ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-2 transition-transform" />
                    BAK_TO_STRATEGY
                </Link>

                {/* Hero Section */}
                <div className="max-w-5xl mb-32 px-4 relative">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="flex items-center gap-6 mb-8">
                            <div className="h-2 w-2 bg-[#00FF41] rounded-full animate-pulse shadow-[0_0_10px_#00FF41]" />
                            <span className="text-[10px] font-bold tracking-[0.8em] text-[#00FF41] uppercase">SOVEREIGN_SOLUTION // {categoryName}</span>
                        </div>
                        <h1 className="text-6xl md:text-9xl font-[900] tracking-tighter text-white uppercase italic leading-none mb-12">
                            {name.split(' ').map((word, i) => (
                                <span key={i} className={i % 2 !== 0 ? "text-white/20" : "text-white"}>{word} </span>
                            ))}
                        </h1>
                        <p className="max-w-2xl text-white/30 text-lg md:text-2xl font-light leading-relaxed">
                            Elite industrial security frameworks precision-engineered for the {name.toLowerCase()} sector. We deploy absolute digital sovereignty where it matters most.
                        </p>
                    </motion.div>
                </div>

                {/* Detail Content */}
                <div className="grid lg:grid-cols-12 gap-24 px-4 overflow-visible">
                    <aside className="lg:col-span-4 hidden lg:block sticky top-32 h-fit">
                        <div className="bg-white/[0.01] border border-white/5 rounded-[3rem] p-12 backdrop-blur-3xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                                <LucideIcons.ShieldAlert className="h-32 w-32 text-white" />
                            </div>
                            <h3 className="text-[10px] font-black tracking-[0.5em] text-[#00FF41] uppercase mb-8 italic">NODE_METRICS</h3>
                            <div className="space-y-8">
                                <div>
                                    <div className="text-[8px] font-bold text-white/10 tracking-[0.4em] uppercase mb-2">SECTOR_THREAT_LVL</div>
                                    <div className="text-2xl font-black text-red-500 italic uppercase">ELEVATED</div>
                                </div>
                                <div>
                                    <div className="text-[8px] font-bold text-white/10 tracking-[0.4em] uppercase mb-2">DEPLOYMENT_READY</div>
                                    <div className="text-2xl font-black text-[#00FF41] italic uppercase">ACTIVE</div>
                                </div>
                                <div>
                                    <div className="text-[8px] font-bold text-white/10 tracking-[0.4em] uppercase mb-2">COMPLIANCE_SYNC</div>
                                    <div className="text-2xl font-black text-white italic uppercase font-mono">99.9%_ACC</div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    <div className="lg:col-span-8">
                        <div className="prose prose-invert max-w-none prose-h2:text-4xl prose-h2:font-black prose-h2:italic prose-h2:uppercase prose-h2:tracking-tighter prose-h2:text-white prose-h2:mt-24 first:mt-0 prose-p:text-white/40 prose-p:text-lg prose-p:font-light prose-p:leading-relaxed prose-strong:text-white prose-strong:font-bold">
                            <h2>STRATEGIC_OBJECTIVE</h2>
                            <p>
                                The {name.toLowerCase()} landscape is currently undergoing a massive digital transformation, exposing critical infrastructure to sophisticated nation-state actors and organized cyber syndicates. Our objective is to establish an impenetrable digital perimeter that ensures continuity and data integrity.
                            </p>
                            <p>
                                DentiSystems provides a multi-layered security substrate that integrates directly into your existing operational technology (OT) and information technology (IT) environments.
                            </p>

                            <h2>CORE_PROTOCOL_STAGING</h2>
                            <p>
                                Every deployment follows a rigorous 4-phase sequence designed to minimize operational friction while maximizing tactical resilience.
                            </p>
                            <div className="grid md:grid-cols-2 gap-8 not-prose my-16">
                                {[
                                    { title: "PHASE_01", label: "RECONNAISSANCE", desc: "Deep environmental mapping and leak identification." },
                                    { title: "PHASE_02", label: "HARDENING", desc: "Implementation of sovereign encryption layers." },
                                    { title: "PHASE_03", label: "NEURAL_SYNC", desc: "Integration with global threat telemetry nodes." },
                                    { title: "PHASE_04", label: "VIGILANCE", desc: "Continuous 24/7 offensive monitoring." }
                                ].map((phase, idx) => (
                                    <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 hover:bg-white/[0.05] transition-colors group">
                                        <div className="text-[8px] font-bold text-[#00FF41]/40 tracking-widest mb-2">{phase.title}</div>
                                        <div className="text-xl font-black text-white uppercase italic mb-4 group-hover:text-[#00FF41] transition-colors">{phase.label}</div>
                                        <p className="text-white/20 text-xs font-light italic">{phase.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <h2>TECHNICAL_VALIDATION</h2>
                            <p>
                                All solutions are validated against international standards including ISO 27001, SOC2 Type II, and sector-specific mandates such as HIPAA or PCI-DSS. Our automated compliance engine ensures that your posture remains non-negotiable.
                            </p>
                        </div>

                        {/* Call to Action */}
                        <div className="mt-32 p-12 md:p-20 bg-[#00FF41]/5 border border-[#00FF41]/20 rounded-[3rem] relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#00FF41]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                            <div className="relative z-10">
                                <h3 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter mb-8 leading-none">
                                    READY_FOR_ <br /> <span className="text-[#00FF41]">ENVIRONMENT_SYNC?</span>
                                </h3>
                                <p className="max-w-md text-white/40 text-lg font-light mb-12 italic">
                                    Consult with our command unit to architect your sector-specific defense plan.
                                </p>
                                <Button size="lg" className="h-20 px-12 rounded-full bg-white text-black font-black uppercase tracking-[0.2em] text-[11px] hover:bg-[#00FF41] transition-all" asChild>
                                    <Link href="/contact">INITIALIZE_COMMAND_LINK <LucideIcons.ArrowRight className="ml-4 h-6 w-6" /></Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* HUD Assurance */}
                <div className="mt-40 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 opacity-10">
                    <div className="text-[8px] font-bold tracking-[0.5em] text-white uppercase font-mono">SOLUTION_NODE_ARCHIVE_v6.4 // ONLINE</div>
                    <div className="flex gap-12 text-[8px] font-bold tracking-[0.5em] text-white uppercase italic text-center md:text-right">
                        " ARCHITECTURE IS THE ULTIMATE ENCRYPTION. "
                    </div>
                </div>
            </div>
        </div>
    );
}
