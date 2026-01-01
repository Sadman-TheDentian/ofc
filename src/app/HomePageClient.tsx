
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
          microDetails={[
            "OFFENSIVE_RESEARCH",
            "SECURE_ARCHITECTURE",
            "INTELLIGENCE_MINING",
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
            {/* HUD Corner Brackets */}
            <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-[#00FF41]/20 rounded-tl-3xl group-hover/hud:border-[#00FF41]/50 transition-all duration-700" />
            <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-[#00FF41]/20 rounded-tr-3xl group-hover/hud:border-[#00FF41]/50 transition-all duration-700" />
            <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-[#00FF41]/20 rounded-bl-3xl group-hover/hud:border-[#00FF41]/50 transition-all duration-700" />
            <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-[#00FF41]/20 rounded-br-3xl group-hover/hud:border-[#00FF41]/50 transition-all duration-700" />

            {/* Technical Background Details */}
            <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none select-none overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[1px] bg-white rotate-45 transform origin-center" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[1px] bg-white -rotate-45 transform origin-center" />
            </div>

            <div className="absolute top-0 right-0 p-40 bg-blue-500/5 blur-[120px] rounded-full" />

            <div className="grid lg:grid-cols-2 gap-20 md:gap-32 items-center relative z-10">
              <div>
                <div className="flex items-center gap-4 mb-12">
                  <div className="h-2 w-2 rounded-full bg-[#00FF41] animate-pulse" />
                  <span className="text-[9px] font-bold tracking-[1em] text-[#00FF41] uppercase">LIVE_TELEMETRY // UP_LINK_ACTIVE</span>
                </div>

                <h2 className="text-4xl md:text-8xl font-black text-white italic uppercase tracking-tighter mb-12 md:mb-16 leading-[0.85] relative">
                  GLOBAL_COMMAND<br /><span className="text-[#00FF41]">_LINK.</span>
                  <div className="absolute -bottom-4 left-0 w-32 h-1 bg-gradient-to-r from-[#00FF41] to-transparent" />
                </h2>

                <p className="text-white/30 text-xl font-light leading-relaxed mb-16 italic max-w-xl">
                  Active nodes across 74 sovereign territories maintaining 99.99% core sync latency. Our predictive architecture identifies threats 450ms before edge infiltration.
                </p>

                <div className="grid grid-cols-2 gap-6 md:gap-10">
                  <div className="p-8 md:p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 group/metric hover:bg-white/[0.05] transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl font-[900] text-white italic uppercase tracking-tighter">ELITE</div>
                      <ShieldCheck className="h-5 w-5 text-[#00FF41] opacity-20 group-hover/metric:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-[9px] font-bold text-white/20 tracking-[0.5em] uppercase">CLUSTER_DEPLOYMENT</div>
                  </div>
                  <div className="p-8 md:p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 group/metric hover:bg-white/[0.05] transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl font-[900] text-[#00FF41] italic uppercase tracking-tighter">SUB-MS</div>
                      <Zap className="h-5 w-5 text-[#00FF41] opacity-20 group-hover/metric:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-[9px] font-bold text-white/20 tracking-[0.5em] uppercase">SYNC_LATENCY</div>
                  </div>
                </div>
              </div>
              <div className="relative aspect-square flex items-center justify-center p-10 md:p-20">
                {/* Orbital Hub HUD */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#00FF41]/10 to-blue-500/10 rounded-full blur-[100px] animate-pulse" />

                {/* Outer Rotating Marks */}
                <div className="absolute inset-0 border border-dashed border-white/10 rounded-full animate-spin-slow" />
                <div className="absolute inset-4 border border-white/5 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '20s' }} />

                {/* Orbiting Tech Nodes */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute h-8 w-8 md:h-12 md:w-12 bg-black/80 border border-white/10 rounded-xl flex items-center justify-center z-20 group/node"
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 15 + i * 5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      transformOrigin: `50% ${140 + i * 20}px`, // Adjusted for mobile/desktop orbit
                      top: '50%',
                      marginTop: `-${140 + i * 20}px`,
                    }}
                  >
                    <div className="relative">
                      <div className="absolute -inset-2 bg-[#00FF41]/20 blur-sm rounded-full opacity-0 group-hover/node:opacity-100 transition-opacity" />
                      <Network className="h-3 w-3 md:h-4 md:w-4 text-white/40 group-hover/node:text-[#00FF41] transition-colors" />
                    </div>
                    {/* Floating Node Label */}
                    <div className="absolute -bottom-8 whitespace-nowrap opacity-0 group-hover/node:opacity-100 transition-opacity hidden md:block">
                      <span className="text-[7px] font-bold text-[#00FF41] tracking-[0.3em] uppercase">NODE_0{i + 1}_SYNC</span>
                    </div>
                  </motion.div>
                ))}

                {/* Central Intelligence Core */}
                <div className="absolute h-[70%] w-[70%] border border-white/10 rounded-full flex items-center justify-center bg-black/60 backdrop-blur-3xl shadow-[0_0_80px_rgba(0,255,65,0.05)] overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-white" />
                    <div className="absolute left-1/2 top-0 w-px h-full bg-white" />
                  </div>

                  {/* Radar Sweep Effect */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-[#00FF41]/20 to-transparent origin-center rounded-full pointer-events-none"
                    style={{ clipPath: 'conic-gradient(from 0deg, black, transparent 90deg)' }}
                  />

                  <div className="relative z-10 flex flex-col items-center gap-4">
                    <TechnicalIcon icon={Activity} glowColor="#00FF41" className="scale-150" />
                    <div className="flex flex-col items-center mt-6">
                      <span className="text-[10px] font-black text-[#00FF41] tracking-[0.4em] uppercase">ACTIVE_LINK</span>
                      <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest mt-1">LAT: 40.71 / LON: -74.01</span>
                    </div>
                  </div>
                </div>

                {/* Technical Specification HUD (Overlaid on Radar) */}
                <div className="absolute top-0 right-0 md:-right-10 bg-black/80 border border-white/10 rounded-2xl p-4 md:p-6 backdrop-blur-xl z-30 hidden md:block group-hover/hud:-translate-y-2 transition-transform">
                  <div className="text-[8px] font-black text-[#00FF41] tracking-[0.3em] uppercase mb-3">SYSTEM_SPEC_HUD</div>
                  <ul className="space-y-2 text-[7px] font-mono text-white/40 uppercase tracking-widest leading-none">
                    <li className="flex justify-between gap-8 italic"><span>CORE:</span> <span className="text-white">RESONANCE_74</span></li>
                    <li className="flex justify-between gap-8 italic"><span>ENCRYPT:</span> <span className="text-[#00FF41]">AES_256_GCM</span></li>
                    <li className="flex justify-between gap-8 italic"><span>NODES:</span> <span className="text-white">ACTIVE_182</span></li>
                  </ul>
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

                  <p className="text-white/30 text-xl font-light italic leading-relaxed mb-16 max-w-sm border-l border-white/10 pl-10">
                    A proprietary defense substrate operating at the edge of machine intelligence and human intuition.
                  </p>

                  <div className="space-y-10 border-t border-white/5 pt-16">
                    {[
                      { label: "PROTOCOL", val: "RESONANCE_v7.4" },
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
                              <span className="text-[8px] font-black text-white/60 tracking-widest uppercase italic">NODE_IMG_v{idx + 1}</span>
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
                <p className="text-[10px] font-black tracking-[0.3em] uppercase opacity-40 group-hover:opacity-100 transition-opacity">CONNECTION_PROTOCOL_v4.2</p>
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
                      CORE_LINK_v7.2 // {tool.slug.toUpperCase()}
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
              <span className="text-[10px] font-bold tracking-[0.8em] text-white/20 mb-6 md:mb-8 block font-mono">ARCHIVE_QUERY // SUCCESS_STORIES</span>
              <h2 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-none">MISSION_LOGS</h2>
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

                      {/* HUD Metadata Overlay */}
                      <div className="absolute top-8 left-8 flex flex-col items-start gap-2 opacity-0 group-hover/log:opacity-100 transition-opacity duration-700">
                        <span className="px-3 py-1 bg-black/80 border border-white/10 rounded-full text-[7px] font-black text-white/40 tracking-widest uppercase italic">MISSION_ID: S-{idx + 104}</span>
                        <span className="px-3 py-1 bg-[#00FF41]/10 border border-[#00FF41]/20 rounded-full text-[7px] font-black text-[#00FF41] tracking-widest uppercase italic">STATUS: ARCHIVED</span>
                      </div>

                      <div className="absolute inset-0 p-12 flex flex-col justify-end">
                        <div className="flex items-center gap-4 mb-4">
                          <ShieldCheck className="h-4 w-4 text-[#00FF41]" />
                          <span className="text-[9px] font-bold text-white/30 tracking-[0.4em] uppercase">{study.industry}</span>
                        </div>
                        <h3 className="text-3xl font-black text-white italic uppercase leading-tight mb-8 group-hover:translate-x-2 transition-transform duration-500">{study.title}</h3>
                        <div className="h-px w-full bg-white/5 mb-8" />
                        <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <span className="text-[9px] font-black text-[#00FF41] tracking-[0.3em] uppercase">VIEW_REPORT_v{idx + 1}</span>
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
              <RevealText text="RESEARCH_SUBSYSTEM" className="text-[10px] font-bold tracking-[1em] text-[#00FF41] mb-6 md:mb-8 block" />
              <h2 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-none">INTEL_ARCHIVE</h2>
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
                <span className="text-[10px] font-bold tracking-[1em] text-[#00FF41] mb-8 block">INTEL_STREAM</span>
                <h2 className="text-6xl font-black text-white italic uppercase tracking-tighter leading-none mb-12">LATEST BROADCASTS</h2>
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
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="h-px w-12 bg-[#00FF41]/20" />
              <RevealText text="STRATEGIC_ALLIANCE_NETWORK" className="text-[11px] font-[1000] tracking-[1em] text-[#00FF41] uppercase italic" />
              <div className="h-px w-12 bg-[#00FF41]/20" />
            </div>
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
              <div className="absolute -inset-20 bg-[#00FF41]/10 blur-[100px] rounded-full animate-pulse" />
              <Cpu className="h-32 w-32 md:h-64 md:h-64 text-white opacity-10 group-hover:opacity-20 transition-opacity duration-1000 rotate-12 group-hover:rotate-0" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
