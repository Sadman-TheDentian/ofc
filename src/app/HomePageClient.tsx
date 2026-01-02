
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, ShieldAlert, Zap, Globe, Lock, ExternalLink, Activity, Network, Box, ShieldCheck, Cpu, KeyRound, ShieldHalf, Siren, Code } from 'lucide-react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { services, securityAdvisories, tools, blogPosts as staticBlogPosts } from '@/lib/data';
import PartnerSlider from '@/components/layout/PartnerSlider';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import SovereignMonolith from '@/components/SovereignMonolith';
import React, { useState, useRef } from "react";
import Image from 'next/image';
import SafeImage from '@/components/SafeImage';
import SyntheticHero from '@/components/layout/SyntheticHero';
import RevealText from '@/components/RevealText';
import Autoplay from "embla-carousel-autoplay";
import { BlogPost, SanityImage, SecurityDivision, NewsArticle, Partner as SanityPartner, CaseStudy } from '@/lib/types';
import { urlFor } from '@/lib/sanity-client';
import ServiceCard from '@/components/ServiceCard';
import Magnetic from '@/components/Magnetic';
import TechnicalIcon from '@/components/TechnicalIcon';
import GlitchText from '@/components/GlitchText';
import CyberGrid from '@/components/CyberGrid';

const iconMap = {
  KeyRound,
  ShieldHalf,
  Siren,
  Code
};


export default function HomePageClient({ blogPosts, securityDivisions, newsArticles, partners, caseStudies }: { blogPosts: BlogPost[], securityDivisions: SecurityDivision[], newsArticles: NewsArticle[], partners: SanityPartner[], caseStudies: CaseStudy[] }): JSX.Element {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);

  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  const archRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress: archScrollProgress } = useScroll({
    target: archRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(archScrollProgress, [0, 1], ["0%", "-56%"]);

  return (
    <div className="flex flex-col min-h-screen bg-black relative overflow-visible">
      <motion.div style={{ scale, opacity }}>
        <SyntheticHero
          title="DIGITAL SOVEREIGNTY"
          description="Elite offensive security and predictive intelligence for the world's most critical infrastructures."
          ctaButtons={[
            { text: "INITIATE PROTOCOL", href: "/contact", primary: true },
            { text: "CAPABILITIES", href: "/services" },
          ]}
        />
      </motion.div>


      <section className="py-24 md:py-48 bg-black relative overflow-hidden border-y border-white/5">
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0%200%20200%20200'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter%20id='noiseFilter'%3E%3CfeTurbulence%20type='fractalNoise'%20baseFrequency='0.65'%20numOctaves='3'%20stitchTiles='stitch'/%3E%3C/filter%3E%3Crect%20width='100%25'%20height='100%25'%20filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="container px-4 relative z-10">
          <div className="bg-white/[0.01] border border-white/10 rounded-[3rem] md:rounded-[4rem] p-8 md:p-24 overflow-hidden relative group/hud">
            {/* Background Architectural Grid (Subtle) */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none select-none">
              <div className="absolute inset-0" style={{
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
                backgroundSize: '100px 100px',
              }} />
            </div>

            <div className="absolute top-0 right-0 p-40 bg-[#00FF41]/5 blur-[120px] rounded-full" />

            <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center relative z-10 px-4 md:px-12">
              <div className="lg:col-span-5 space-y-12">
                <div className="p-10 bg-black/40 border-l border-[#00FF41]/20 backdrop-blur-3xl group/panel hover:border-[#00FF41] transition-all duration-700 relative overflow-hidden rounded-r-3xl">
                  <div className="absolute top-0 right-0 p-8 opacity-20 group-hover/panel:opacity-100 transition-opacity">
                    <ShieldAlert className="h-4 w-4 text-[#00FF41] animate-pulse" />
                  </div>
                  <div className="flex items-center gap-4 mb-10">
                    <div className="h-[1px] w-6 bg-[#00FF41]/40" />
                    <span className="text-[10px] font-[1000] text-white tracking-[0.5em] uppercase italic">THREAT_INTEL_STREAM</span>
                  </div>
                  <div className="space-y-8 text-left">
                    {[
                      { label: 'SOVEREIGN_NODE_ALPHA', value: 'STABLE // L4_ENFORCED', status: 'OK' },
                      { label: 'NETWORK_LATENCY', value: '0.42MS // SUB_PLANCK', status: 'ACTIVE' },
                      { label: 'ENCRYPTION_HASH', value: 'SHA3_512 // ISO_READY', status: 'LOCK' }
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col gap-2 relative">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[7px] font-mono text-white/30 uppercase tracking-[0.2em]">{item.label}</span>
                          <span className="text-[6px] font-mono text-[#00FF41]/40 italic">{item.status}</span>
                        </div>
                        <span className="text-sm font-black text-white italic group-hover/panel:text-[#00FF41] transition-colors tracking-tight">{item.value}</span>
                        <div className="h-[1px] w-full bg-white/5" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-12 flex justify-between items-center bg-white/5 p-4 border border-white/5">
                    <div className="flex gap-1.5">
                      {[...Array(4)].map((_, i) => <div key={i} className="h-1 w-1 bg-[#00FF41]/60 rounded-full animate-pulse" />)}
                    </div>
                    <span className="text-[7px] font-mono text-white/20 uppercase tracking-[0.4em]">SYNC_RESONANCE_ACTIVE</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-8 bg-white/[0.02] border border-white/10 group/metric hover:bg-[#00FF41]/5 transition-all duration-500 rounded-3xl">
                    <Zap className="h-4 w-4 text-[#00FF41] mb-6 opacity-30 group-hover/metric:opacity-100 transition-opacity" />
                    <div className="text-3xl font-[1000] text-white italic tracking-tighter mb-2 leading-none">0.45<span className="text-[#00FF41] font-mono">ms</span></div>
                    <span className="text-[7px] font-black text-white/20 tracking-[0.3em] uppercase block italic">LATENCY_PROTOCOL</span>
                  </div>
                  <div className="p-8 bg-white/[0.02] border border-white/10 group/metric hover:bg-[#00FF41]/5 transition-all duration-500 rounded-3xl text-right">
                    <Activity className="h-4 w-4 text-[#00FF41] mb-6 opacity-30 group-hover/metric:opacity-100 transition-opacity ml-auto" />
                    <div className="text-3xl font-[1000] text-white italic tracking-tighter mb-2 leading-none">100<span className="text-[#00FF41] font-mono">%</span></div>
                    <span className="text-[7px] font-black text-white/20 tracking-[0.3em] uppercase block italic">UPTIME_AVAIL</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 relative">
                <div className="relative group/monolith overflow-hidden rounded-[4rem] border border-white/10 bg-[#050505] shadow-[0_0_150px_rgba(0,255,65,0.08)]">
                  {/* Industrial Machine Trim (Static Overlays) */}
                  <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-white/10 to-transparent flex items-center px-12 justify-between z-50 pointer-events-none opacity-40">
                    <div className="flex gap-10 items-center">
                      <span className="text-[8px] font-mono tracking-widest text-[#00FF41]/60 uppercase">DENTIGRID_SERVER_NODE_83F4</span>
                      <div className="h-1 w-1 bg-[#00FF41]/40 rounded-full" />
                      <span className="text-[8px] font-mono tracking-widest text-white/40 uppercase">CORE: SOVEREIGN_OS_01</span>
                    </div>
                    <div className="flex gap-3">
                      {[...Array(8)].map((_, i) => <div key={i} className="w-1.5 h-3 bg-white/5 border-x border-white/5" />)}
                    </div>
                  </div>

                  <SovereignMonolith />

                  {/* Integrated HUD Modules (Fixed to Glass Shell) */}
                  <div className="absolute bottom-12 left-12 right-12 z-50 grid grid-cols-3 gap-8 pointer-events-none">
                    <div className="col-span-2 p-10 bg-black/95 border border-white/10 backdrop-blur-3xl relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FF41]/40 to-transparent" />
                      <div className="flex items-center gap-4 mb-6">
                        <div className="h-2 w-2 rounded-full bg-[#00FF41] animate-pulse shadow-[0_0_100px_#00FF41]" />
                        <span className="text-[9px] font-[1000] text-white tracking-[0.5em] uppercase italic text-left">LIVE_INTERCEPT_AVAILABILITY</span>
                      </div>
                      <div className="flex items-end gap-2 h-20">
                        {[0.2, 0.7, 0.4, 0.9, 0.5, 0.3, 0.8, 0.6, 0.4, 0.9, 0.2, 0.6, 0.8, 0.4].map((h, i) => (
                          <motion.div
                            key={i}
                            animate={{ height: [`${h * 100}%`, `${(h - 0.2) * 100}%`, `${h * 100}%`] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
                            className="flex-grow bg-[#00FF41]/10 group-hover/monolith:bg-[#00FF41]/30 transition-colors"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="p-10 bg-black/95 border border-white/10 backdrop-blur-3xl flex flex-col justify-center">
                      <div className="text-[8px] font-black text-white/20 tracking-[0.4em] uppercase mb-3 italic text-left">RESILIENCE_INDEX</div>
                      <div className="text-4xl font-[1000] text-white italic tracking-tighter leading-none text-left">99.99<span className="text-[#00FF41] font-mono">9</span></div>
                      <div className="flex gap-2 mt-4">
                        <span className="text-[7px] font-mono text-[#00FF41]/40 tracking-widest uppercase">STABLE</span>
                        <span className="text-[7px] font-mono text-white/10 tracking-widest uppercase italic border-l border-white/5 pl-2">ISOLATED</span>
                      </div>
                    </div>
                  </div>

                  {/* Volumetric Depth Identity Pulse */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] pointer-events-none">
                    <motion.div
                      animate={{ scale: [1, 1.4, 1], opacity: [0.03, 0.08, 0.03] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      className="w-[40rem] h-[40rem] rounded-full border border-[#00FF41]/5 flex items-center justify-center"
                    >
                      <div className="w-[30rem] h-[30rem] rounded-full border border-[#00FF41]/10 border-dashed" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 // ARCHITECTURAL RESONANCE STACK - Restore Pinned/Scrolling Design */}
      <section ref={archRef} className="relative h-[300vh] bg-black border-t border-white/5" id="resonance-stack">
        <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
          <div className="container px-4">
            <div className="grid lg:grid-cols-12 gap-20 md:gap-32 items-center">

              {/* Left Column: Pinned Technical specifications */}
              <div className="lg:col-span-5 relative z-10">
                <motion.div>
                  <div className="flex items-center gap-6 mb-12">
                    <div className="h-px w-12 bg-[#00FF41]/30" />
                    <span className="text-[10px] font-black tracking-[1em] text-[#00FF41] uppercase italic">SYSTEM_ARCHITECTURE</span>
                  </div>

                  <h2 className="text-6xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-[0.85] mb-12">
                    <GlitchText text="THE RESONANCE STACK." />
                  </h2>

                  <p className="text-white/30 text-xl font-light italic leading-relaxed mb-16 max-sm border-l border-white/10 pl-10">
                    A proprietary defense substrate operating at the edge of machine intelligence and human intuition.
                  </p>

                  <div className="space-y-10 border-t border-white/5 pt-16">
                    {[
                      { label: "PROTOCOL", val: "RESONANCE" },
                      { label: "SUBSTRATE", val: "NEURAL_DEEP_MESH" },
                      { label: "ENFORCEMENT", val: "ZERO_TRUST_L4", color: "text-[#00FF41]" }
                    ].map((m, i) => (
                      <div key={i} className="flex items-center justify-between group">
                        <span className="text-[9px] font-black tracking-[0.4em] text-white/10 uppercase group-hover:text-white/40 transition-colors">{m.label}</span>
                        <span className={`text-[11px] font-black italic tracking-widest uppercase ${m.color || 'text-white'}`}>{m.val}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right Column: High-Fidelity Scrolling Cards */}
              <div className="lg:col-span-7 relative h-[70vh] flex items-start overflow-visible pt-10">
                <motion.div
                  style={{ y }}
                  className="flex flex-col gap-16 w-full"
                >
                  {(securityDivisions && securityDivisions.length > 0 ? securityDivisions : services).slice(0, 4).map((service, idx) => {
                    const isSanity = 'mainImage' in service;
                    const imageUrl = isSanity
                      ? (service.mainImage ? urlFor(service.mainImage)?.url() : undefined)
                      : (service as any).imageUrl;
                    const slug = isSanity ? (service as any).slug.current : (service as any).slug;

                    return (
                      <Link href={`/services/${slug}`} key={idx} className="group/item">
                        <div className="bg-white/[0.01] border border-white/5 rounded-[4rem] p-12 hover:bg-white/[0.03] hover:border-[#00FF41]/20 transition-all duration-700 relative overflow-hidden flex flex-col h-[520px]">
                          <div className="h-56 relative rounded-3xl overflow-hidden mb-10 border border-white/5 bg-black">
                            <SafeImage src={imageUrl} alt={service.title} fill className="object-cover grayscale group-hover/item:grayscale-0 group-hover/item:scale-105 transition-all duration-1000 opacity-40 group-hover/item:opacity-100" />
                            <div className="absolute inset-x-8 bottom-8 flex items-center justify-between opacity-0 group-hover/item:opacity-100 transition-all">
                              <span className="text-[8px] font-black text-white/60 tracking-widest uppercase italic">NODE_ARCHIVE</span>
                              <div className="h-1 w-1 bg-[#00FF41] rounded-full animate-pulse" />
                            </div>
                          </div>
                          <div className="mt-auto">
                            <h3 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter mb-6 group-hover/item:translate-x-6 transition-transform duration-700">
                              <GlitchText text={service.title} />
                            </h3>
                            <p className="text-white/30 text-lg font-light italic leading-relaxed mb-10 line-clamp-2">{service.description}</p>
                            <div className="flex items-center justify-between pt-10 border-t border-white/5">
                              <span className="text-[9px] font-black text-white/20 group-hover/item:text-[#00FF41] tracking-[0.6em] transition-colors">ENGAGE_SUBSYSTEM</span>
                              <ArrowRight className="h-5 w-5 text-[#00FF41] group-hover/item:translate-x-4 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </motion.div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className="py-32 md:py-60 bg-black relative border-t border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 p-40 opacity-[0.02] filter blur-3xl rounded-full bg-[#00FF41] pointer-events-none" />
        <div className="container px-4">
          <div className="grid lg:grid-cols-12 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="lg:col-span-7 bg-white/[0.02] border border-white/10 rounded-[3rem] md:rounded-[4rem] p-8 md:p-32 relative overflow-hidden group/card"
            >
              <div className="absolute -top-12 -right-12 text-[150px] md:text-[300px] font-black text-white/[0.01] leading-none select-none tracking-tighter group-hover/card:text-[#00FF41]/[0.02] transition-colors duration-1000">SOV_99</div>
              <div className="relative z-10">
                <div className="mb-12 md:mb-16">
                  <TechnicalIcon icon={ShieldAlert} glowColor="#00FF41" />
                </div>
                <h2 className="text-6xl md:text-[10vw] lg:text-[140px] font-[900] text-white italic uppercase tracking-tighter leading-none mb-4 md:mb-10">99.8%</h2>
                <h3 className="text-lg md:text-2xl font-bold text-white tracking-[0.4em] uppercase mb-8 md:mb-10">PREVENTION_RECORDS</h3>
                <p className="max-w-md text-white/30 text-lg md:text-2xl font-light leading-relaxed italic">
                  Our sovereign nodes have established a domain of absolute denial against zero-day exploits. No unauthorized packet has breached our secondary layer in 740+ days.
                </p>
              </div>
            </motion.div>

            <div className="lg:col-span-5 grid grid-rows-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-white/[0.02] border border-white/10 rounded-[4rem] p-12 flex flex-col justify-end"
              >
                <div className="flex items-center gap-6 mb-8">
                  <div className="h-px flex-grow bg-white/10" />
                  <Activity className="h-8 w-8 text-[#00FF41]" />
                </div>
                <div className="text-5xl font-black text-white italic tracking-tighter uppercase mb-2">1,842,901+</div>
                <div className="text-[10px] font-bold text-[#00FF41] tracking-[0.5em] uppercase">Vulnerabilities_Neutralized</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-[#00FF41] rounded-[4rem] p-12 flex flex-col items-center justify-center text-black text-center group cursor-pointer"
              >
                <div className="mb-4 h-1 w-12 bg-black/20 rounded-full" />
                <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-4 leading-none">ESTABLISH_LINK</h3>
                <p className="text-[10px] font-black tracking-[0.3em] uppercase opacity-40 group-hover:opacity-100 transition-opacity">CONNECTION_PROTOCOL</p>
                <ArrowRight className="h-6 w-6 mt-8 transform group-hover:translate-x-4 transition-transform duration-500" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-60 relative border-t border-white/5 overflow-hidden">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-24 items-end mb-16 md:mb-32">
            <div>
              <RevealText text="UTILITY_CORE" className="text-[10px] font-bold tracking-[1.2em] text-[#00FF41] mb-8 md:mb-12 block" />
              <h2 className="text-5xl md:text-8xl lg:text-[120px] font-[900] text-white italic uppercase tracking-tighter leading-none">RECON_TOOLS</h2>
            </div>
            <p className="max-w-md text-white/30 text-xl md:text-2xl font-light italic leading-relaxed pb-2 md:pb-4 border-l-2 border-[#00FF41]/10 pl-8">
              Proprietary reconnaissance modules deployed for immediate threat surfaced analysis and architectural auditing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {tools.map((tool, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group cursor-pointer"
              >
                <Link href={tool.url} target="_blank">
                  <div className="bg-white/[0.01] border border-white/10 rounded-[3rem] p-10 h-full hover:bg-white/[0.03] hover:border-[#00FF41]/30 transition-all duration-700 flex flex-col items-center text-center relative overflow-hidden group/card">
                    {/* Corner HUD Brackets */}
                    <div className="absolute top-6 left-6 w-6 h-6 border-t border-l border-white/10 group-hover/card:border-[#00FF41]/30 transition-all" />
                    <div className="absolute top-6 right-6 w-6 h-6 border-t border-r border-white/10 group-hover/card:border-[#00FF41]/30 transition-all" />


                    <div className="mb-10 text-[7px] font-black text-white/20 tracking-[0.4em] uppercase opacity-0 group-hover/card:opacity-100 transition-opacity">
                      CORE_LINK // {tool.slug.toUpperCase()}
                    </div>

                    <div className="mb-12 h-24 w-24 flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-[#00FF41]/10 blur-2xl rounded-full group-hover:bg-[#00FF41]/30 transition-all duration-700" />
                      <Image src={tool.imageUrl} alt={tool.title} width={80} height={80} className="relative z-10 grayscale brightness-[3] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" />
                    </div>

                    <h3 className="text-3xl font-[900] text-white italic uppercase tracking-tight mb-4 group-hover:text-[#00FF41] transition-colors">{tool.title}</h3>
                    <p className="text-white/30 text-sm font-light leading-relaxed mb-10 italic px-4">{tool.description}</p>

                    <div className="mt-auto w-full">
                      <div className="h-px w-full bg-white/5 group-hover/card:bg-[#00FF41]/20 transition-colors mb-10" />
                      <div className="flex items-center justify-center gap-4">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#00FF41] animate-pulse" />
                        <span className="text-[9px] font-black text-white/10 group-hover:text-white tracking-[0.6em] uppercase transition-colors">INITIALIZE_SESSION</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-60 border-t border-white/5 overflow-hidden">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-8">
            <div>
              <h2 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-none"><GlitchText text="MISSION LOGS." /></h2>
            </div>
            <Button variant="outline" className="h-14 md:h-16 px-10 md:px-12 rounded-full border-white/5 bg-white/[0.02] text-white/40 hover:text-[#00FF41] transition-all text-[10px] font-black tracking-widest uppercase" asChild>
              <Link href="/case-studies">EXPORT_ALL_REPORTS</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {caseStudies && caseStudies.slice(0, 3).map((study, idx) => {
              const imageUrl = study.mainImage ? urlFor(study.mainImage as SanityImage)?.url() : undefined;
              return (
                <motion.div
                  key={study._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group"
                >
                  <Link href={`/case-studies/${study.slug.current}`}>
                    <div className="relative h-[600px] w-full rounded-[4rem] overflow-hidden border border-white/5 bg-white/[0.02] group/log">

                      <SafeImage src={imageUrl} alt={study.title} fill className="object-cover grayscale opacity-20 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />


                      <div className="absolute inset-0 p-12 flex flex-col justify-end">
                        <div className="flex items-center gap-4 mb-4">
                          <ShieldCheck className="h-4 w-4 text-[#00FF41]" />
                          <span className="text-[9px] font-bold text-white/30 tracking-[0.4em] uppercase">{study.industry}</span>
                        </div>
                        <h3 className="text-3xl font-black text-white italic uppercase leading-tight mb-8 group-hover:translate-x-2 transition-transform duration-500">{study.title}</h3>
                        <div className="h-px w-full bg-white/5 mb-8" />
                        <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <span className="text-[9px] font-black text-[#00FF41] tracking-[0.3em] uppercase">VIEW_REPORT</span>
                          <ExternalLink className="h-4 w-4 text-white/40" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-60 bg-white/[0.01] border-y border-white/5 overflow-hidden">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-8">
            <div>
              <h2 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-none"><GlitchText text="INTEL ARCHIVE." /></h2>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {(blogPosts && blogPosts.length > 0 ? blogPosts : staticBlogPosts).slice(0, 3).map((post, idx) => {
              const imageUrl = (post as any).mainImage ? urlFor((post as any).mainImage)?.url() : (post as any).imageUrl;
              const slug = (post as any).slug?.current || (post as any).url?.split('/').pop();

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group"
                >
                  <Link href={`/blog/${slug}`}>
                    <div className="bg-white/[0.02] border border-white/5 rounded-[4rem] overflow-hidden hover:border-[#00FF41]/20 transition-all duration-700 h-full flex flex-col">
                      <div className="h-64 relative overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000">
                        <SafeImage src={imageUrl} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                      </div>
                      <div className="p-12 flex flex-col flex-grow">
                        <span className="text-[9px] font-bold text-[#00FF41] tracking-[0.5em] uppercase mb-6 block">
                          {typeof (post as any).author === 'object'
                            ? (post as any).author?.name
                            : ((post as any).author || "RESEARCH_UNIT")}
                        </span>
                        <h4 className="text-3xl font-black text-white italic uppercase tracking-tight leading-tight group-hover:text-[#00FF41] transition-colors mb-8">{post.title}</h4>
                        <div className="mt-auto flex justify-between items-center text-[10px] font-black text-white/20 group-hover:text-white tracking-widest uppercase transition-colors">
                          READ_ARCHIVE <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Intelligence Bento Feed */}
      <section className="py-40 md:py-60 bg-white/[0.01] border-y border-white/5 overflow-hidden">
        <div className="container px-4">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="sticky top-40">
                <h2 className="text-6xl font-black text-white italic uppercase tracking-tighter leading-none mb-12"><GlitchText text="LATEST BROADCASTS." /></h2>
                <p className="text-white/30 text-lg font-light leading-relaxed mb-12 italic">
                  Real-time telemetry and research directly from our global intelligence mining units.
                </p>

                {/* Security Advisories List */}
                <div className="space-y-6 mb-12">
                  <div className="text-[9px] font-black tracking-[0.3em] text-white/10 uppercase mb-6 flex items-center gap-4">
                    ACTIVE_ADVISORIES <div className="h-1 w-1 bg-red-500 rounded-full animate-pulse" />
                  </div>
                  {securityAdvisories.map((advisory, idx) => (
                    <div key={idx} className="bg-white/[0.02] border-l-2 border-red-500/50 p-6 group hover:bg-white/[0.05] transition-colors cursor-pointer">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[8px] font-bold text-red-500 tracking-widest">{advisory.id}</span>
                        <span className="text-[8px] font-bold text-white/20">{advisory.date}</span>
                      </div>
                      <h5 className="text-xs font-black text-white uppercase italic group-hover:text-red-500 transition-colors">{advisory.title}</h5>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-4">
                  <Button asChild variant="outline" className="h-16 w-fit px-12 rounded-full border-white/10 hover:border-[#00FF41] hover:bg-[#00FF41] hover:text-black transition-all font-black text-[10px] tracking-widest uppercase">
                    <Link href="/news">ACCESS_FULL_STREAM</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 grid md:grid-cols-2 gap-8">
              {newsArticles && newsArticles.slice(0, 4).map((post, idx) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group"
                >
                  <Link href={`/news/${post.slug.current}`}>
                    <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 h-full hover:bg-white/[0.05] transition-all duration-500 relative flex flex-col justify-between">
                      <div className="flex justify-between items-start mb-12">
                        <div className="text-[9px] font-bold text-white/20 uppercase tracking-[0.3em]">{new Date(post.publishedAt).toLocaleDateString()}</div>
                        <Network className="h-5 w-5 text-[#00FF41]/40" />
                      </div>
                      <h4 className="text-2xl font-black text-white uppercase italic group-hover:text-[#00FF41] transition-colors leading-tight mb-8">{post.title}</h4>
                      <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <span className="text-[9px] font-black text-white tracking-[0.5em] uppercase italic">READ_TRANSMISSION</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Refined Global Network Section */}
      <section className="py-40 md:py-60 bg-black relative border-t border-white/5 overflow-hidden">
        <div className="container px-4">
          <div className="text-center mb-24 md:mb-40">
            <h2 className="text-4xl md:text-7xl lg:text-9xl font-[1000] text-white italic uppercase tracking-tighter leading-none">
              <GlitchText text="VERIFIED EQUILIBRIUM." />
            </h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white/[0.01] border border-white/5 rounded-[4rem] md:rounded-[5rem] p-12 md:p-32 backdrop-blur-3xl relative group/network"
          >
            {/* HUD Corner Brackets */}
            <div className="absolute top-12 left-12 w-16 h-16 border-t border-l border-white/10 group-hover/network:border-[#00FF41]/30 transition-all duration-700" />
            <div className="absolute bottom-12 right-12 w-16 h-16 border-b border-r border-white/10 group-hover/network:border-[#00FF41]/30 transition-all duration-700" />

            <PartnerSlider partners={partners} />

            <div className="mt-20 flex justify-center items-center gap-10 opacity-20">
              <span className="text-[8px] font-black tracking-[0.5em] text-white uppercase italic">ALL_NODES_VERIFIED</span>
              <div className="h-1 w-1 bg-[#00FF41] rounded-full" />
              <span className="text-[8px] font-black tracking-[0.5em] text-white uppercase italic">ENCRYPTED_SYNC_ACTIVE</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Substrate Teaser */}
      <section className="py-24 md:py-40 bg-black relative overflow-hidden border-t border-white/5">
        <CyberGrid />
        <div className="absolute inset-0 z-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }} />
        <div className="container px-4 relative z-10">
          <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] md:rounded-[5rem] p-8 md:p-32 flex flex-col md:flex-row items-center justify-between gap-16 group">
            <div className="max-w-2xl text-center md:text-left">
              <span className="text-[10px] font-black tracking-[1em] text-[#00FF41] mb-8 md:mb-12 block uppercase">SYSTEM_SUBSTRATE</span>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white italic uppercase tracking-tighter leading-none mb-8 md:mb-12">
                <GlitchText text="ENGINEERED FOR SOVEREIGNTY." />
              </h2>
              <p className="text-white/30 text-xl font-light italic leading-relaxed mb-12 md:mb-16">
                Deep technical specifications of the DentiSystems neural mesh and distributed intelligence substrate. Absolute digital authority, back-to-zero.
              </p>
              <Magnetic>
                <Button asChild size="lg" className="h-16 md:h-20 px-10 md:px-16 rounded-full bg-white text-black font-black uppercase text-[10px] tracking-[0.4em] hover:bg-[#00FF41] transition-all">
                  <Link href="/technology">EXPLORE_THE_SUBSTRATE <ArrowRight className="ml-4 h-5 w-5" /></Link>
                </Button>
              </Magnetic>
            </div>
            <div className="relative pointer-events-none">
              <div className="absolute -inset-20 bg-white/5 blur-[100px] rounded-full" />
              <Cpu className="h-32 w-32 md:h-64 text-white opacity-5 group-hover:opacity-10 transition-opacity duration-1000 rotate-12 group-hover:rotate-0" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
