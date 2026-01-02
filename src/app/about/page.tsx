'use client';

import { Button } from "@/components/ui/button";
import { Users, Award, Handshake, BrainCircuit, ArrowRight, ShieldCheck, Activity, Target, Zap, Cpu, ShieldPlus, Globe2 } from "lucide-react";
import Link from "next/link";
import { TeamMembers } from "@/lib/placeholder-images";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import React, { useRef } from "react";
import SafeImage from "@/components/SafeImage";
import { motion, useScroll, useTransform } from "framer-motion";
import RevealText from "@/components/RevealText";
import TechnicalIcon from "@/components/TechnicalIcon";
import Magnetic from "@/components/Magnetic";
import GlitchText from "@/components/GlitchText";
import HUDSection from "@/components/HUDSection";
import CyberGrid from "@/components/CyberGrid";

const statsData = [
  { subject: 'Encryption Depth', value: 120, displayValue: "AES-256" },
  { subject: 'Threat Intelligence', value: 140, displayValue: "99.9%" },
  { subject: 'Verification Nodes', value: 100, displayValue: "4k+" },
  { subject: 'Protocol Latency', value: 130, displayValue: "0.02ms" },
  { subject: 'Substrate Health', value: 110, displayValue: "OPTIMAL" },
];

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [40, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 1.05]);

  return (
    <div ref={containerRef} className="min-h-screen bg-black overflow-hidden selection:bg-[#00FF41]/30 relative">
      <CyberGrid />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,65,0.02),transparent_70%)] pointer-events-none" />

      {/* 01 // CINEMATIC HERO - ASYMMETRIC SPLIT */}
      <section className="relative min-h-screen flex items-center pt-40 pb-32">
        <motion.div style={{ y: heroY, opacity: heroOpacity, scale: heroScale }} className="container px-4 grid lg:grid-cols-2 gap-32 items-center z-10">
          <div className="max-w-5xl">
            <div className="flex items-center gap-10 mb-12 md:mb-16">
              <TechnicalIcon icon={Activity} glowColor="#00FF41" className="scale-75 origin-left" />
              <RevealText text="THE_ORIGIN_STORY // ALPHA_NODE" className="text-[11px] font-black tracking-[1.2em] text-[#00FF41] uppercase italic" />
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-[1000] tracking-tighter text-white uppercase italic leading-[0.85] mb-12">
              <GlitchText text="ALPHA UNITS." />
            </h1>
            <p className="max-w-3xl text-white/60 text-lg md:text-2xl font-medium italic leading-relaxed mb-16 md:mb-20 border-l border-white/20 pl-10 py-4">
              We are the architecture behind the silence. A specialized collective of intelligence architects redesigning the boundaries of digital sovereignty since inception.
            </p>
            <div className="flex flex-wrap gap-12 items-center">
              <Magnetic strength={0.2}>
                <Button size="lg" className="h-28 px-20 border border-white/10 rounded-full bg-white text-black font-[1000] uppercase text-[13px] tracking-[0.5em] hover:bg-[#00FF41] transition-all shadow-2xl relative group/btn overflow-hidden" asChild>
                  <Link href="/contact" className="flex items-center gap-6">
                    <span className="relative z-10 flex items-center gap-6">
                      INITIATE_SYNC_LINK <ArrowRight className="h-6 w-6 group-hover/btn:translate-x-6 transition-transform duration-500" />
                    </span>
                    <div className="absolute inset-0 bg-[#00FF41] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-700 pointer-events-none" />
                  </Link>
                </Button>
              </Magnetic>
              <div className="flex items-center gap-10">
                <div className="flex flex-col">
                  <span className="text-[11px] font-[1000] text-white/10 tracking-[0.6em] uppercase italic mb-2">NODE_ACTIVE</span>
                  <span className="text-[10px] font-black text-[#00FF41] tracking-[0.8em] uppercase italic group animate-pulse">LIVE_CONNECTED</span>
                </div>
                <div className="h-px w-20 bg-gradient-to-r from-[#00FF41]/40 to-transparent" />
              </div>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute -inset-40 bg-[#00FF41]/5 blur-[200px] rounded-full animate-pulse-slow" />
            <div className="relative aspect-square rounded-[8rem] overflow-hidden border border-white/5 bg-white/[0.01] rotate-3 hover:rotate-0 transition-all duration-1000 p-8 shadow-[0_0_100px_rgba(0,0,0,1)] group/img">
              <div className="absolute inset-x-[-40px] inset-y-[-40px] pointer-events-none opacity-0 group-hover/img:opacity-100 transition-opacity duration-1000 z-10">
                <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-[#00FF41]/40" />
                <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-[#00FF41]/40" />
              </div>
              <div className="h-full w-full rounded-[6rem] overflow-hidden relative">
                <SafeImage src="/images/about-hero.png" alt="DentiSystems Operations Center" fill className="object-cover grayscale brightness-50 group-hover/img:grayscale-0 group-hover/img:brightness-100 group-hover/img:scale-110 transition-all duration-1000 opacity-60 group-hover/img:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

                {/* HUD Data Overlay */}
                <div className="absolute top-12 left-12 flex flex-col gap-2 opacity-0 group-hover/img:opacity-100 transition-all duration-700 translate-y-8 group-hover/img:translate-y-0">
                  <span className="text-[9px] font-black text-[#00FF41] tracking-[0.5em] uppercase italic">STREAMING_OPS_CAM_01</span>
                  <div className="h-1 w-32 bg-white/5 relative overflow-hidden rounded-full">
                    <motion.div animate={{ x: ['-100%', '100%'] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute inset-0 bg-[#00FF41]/40" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Background Layered Text */}
        <div className="absolute bottom-0 right-0 overflow-hidden pointer-events-none select-none opacity-[0.015]">
          <span className="text-[40vw] font-[1000] text-white italic leading-none translate-y-1/4 inline-block tracking-tighter">ARCHITECT</span>
        </div>
      </section>

      {/* 02 // MISSION BROADCAST - CINEMATIC FULL BLEED */}
      <HUDSection label="MISSION_PROTOCOL // CORE_DIRECTIVE" className="m-4 md:m-24 p-12 md:p-40 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-5 scale-150 rotate-12 pointer-events-none">
          <ShieldCheck className="h-80 w-80 text-[#00FF41]" />
        </div>
        <div className="grid lg:grid-cols-2 gap-32 md:gap-60 items-center relative z-10">
          <div>
            <div className="flex items-center gap-8 mb-12">
              <div className="h-[2px] w-16 bg-[#00FF41]" />
              <span className="text-[12px] font-[1000] tracking-[1.2em] text-[#00FF41] uppercase italic">THE_MISSION_ASSET</span>
            </div>
            <h2 className="text-6xl md:text-[9vw] font-[1000] text-white uppercase italic tracking-tighter leading-[0.8] mb-16 group">
              THE <br /><span className="text-[#00FF41] group-hover:text-white transition-colors duration-1000">PROTOCOL.</span>
            </h2>
            <div className="space-y-16 text-white/30 text-2xl md:text-3xl font-light italic leading-relaxed">
              <p className="border-l border-white/5 pl-12 hover:border-[#00FF41]/20 transition-colors">
                In an era of hyper-escalated digital warfare, legacy defense is obsolete. DentiSystems was forged as a response to the fragmentation of global security landscapes.
              </p>
              <div className="text-white border-l-2 border-[#00FF41] pl-16 py-12 bg-white/[0.01] rounded-[4rem] relative overflow-hidden group/quote shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00FF41]/5 to-transparent opacity-0 group-hover/quote:opacity-100 transition-opacity duration-1000" />
                <span className="relative z-10 block text-3xl md:text-5xl font-light italic leading-tight tracking-tight">
                  "We re-engineer the foundational trust of the web, ensuring that every interaction is architecturally sound and fundamentally impenetrable."
                </span>
                <div className="mt-12 flex items-center gap-6 opacity-20">
                  <div className="h-px w-20 bg-white" />
                  <span className="text-[10px] font-black tracking-[0.5em] uppercase italic">VERIFIED_DIRECTIVE</span>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[600px] w-full relative bg-black/50 border border-white/5 rounded-[5rem] p-12 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] group/radar">
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            {/* HUD Bracket */}
            <div className="absolute top-12 left-12 w-16 h-16 border-t border-l border-[#00FF41]/20 group-hover/radar:border-[#00FF41]/60 transition-colors" />

            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={statsData}>
                <PolarGrid stroke="rgba(0,255,65,0.05)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 11, fontWeight: 900, letterSpacing: '0.4em' }} />
                <Radar name="Unit_Capacity" dataKey="value" stroke="#00FF41" fill="#00FF41" fillOpacity={0.05} strokeWidth={2} className="group-hover/radar:fill-opacity-20 transition-all duration-1000" />
              </RadarChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
              <span className="text-[11px] font-[1000] text-white/5 tracking-widest uppercase italic group-hover/radar:text-[#00FF41]/20 transition-colors">STABILITY_REACH</span>
              <div className="text-6xl md:text-8xl font-[1000] text-[#00FF41] italic tracking-tighter filter hue-rotate-15">0.99</div>
              <div className="flex gap-4 justify-center mt-4">
                {[1, 2, 3].map(i => <div key={i} className="h-2 w-2 bg-[#00FF41] rounded-full animate-pulse opacity-40" style={{ animationDelay: `${i * 0.4}s` }} />)}
              </div>
            </div>
          </div>
        </div>
      </HUDSection>

      {/* 03 // CORE VALUES - GEOMETRIC OVERLAP */}
      <section className="py-60 md:py-[20vh] bg-black relative">
        <div className="container px-4">
          <div className="max-w-6xl mb-48 md:mb-64 relative">
            <div className="absolute -top-40 -left-60 w-96 h-96 bg-[#00FF41]/5 blur-[200px] rounded-full pointer-events-none" />
            <div className="flex items-center gap-10 mb-16 md:mb-24">
              <TechnicalIcon icon={Activity} glowColor="#00FF41" className="scale-75 origin-left" />
              <span className="text-[12px] font-[1000] tracking-[1.5em] text-[#00FF41] block uppercase italic italic">CORE_INTELLIGENCE // PILLARS</span>
            </div>
            <h2 className="text-7xl md:text-[12vw] font-[1000] text-white uppercase italic tracking-tighter leading-none mb-4 group">
              CORE_<span className="text-white/10 group-hover:text-[#00FF41] transition-colors duration-1000">VALUES.</span>
            </h2>
            <div className="h-[2px] w-full bg-gradient-to-r from-[#00FF41]/60 via-white/5 to-transparent" />
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-[5rem] overflow-hidden shadow-2xl">
            {[
              { icon: Cpu, title: "EXPERTISE_LEVEL", desc: "Decades of high-fidelity offensive intelligence and research focused on sovereign asset protection.", id: "PROTO_01" },
              { icon: ShieldPlus, title: "INTEGRITY_INDEX", desc: "Zero-compromise ethical standards in every mission-critical operation and vendor engagement.", id: "PROTO_02" },
              { icon: Globe2, title: "NETWORK_MESH", desc: "Continuous development of proprietary neural defensive protocols across global telemetric grids.", id: "PROTO_03" }
            ].map((v, i) => (
              <div key={i} className="group bg-black p-12 md:p-24 relative overflow-hidden">
                <div className="absolute top-12 left-12 w-10 h-10 border-t border-l border-white/5 group-hover:border-[#00FF41]/20 transition-colors" />
                <div className="absolute top-0 right-0 p-20 opacity-[0.01] group-hover:opacity-[0.05] transition-opacity scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-1000">
                  <v.icon className="h-60 w-60 text-white" />
                </div>

                <div className="mb-20 flex justify-between items-center relative z-10">
                  <div className="h-24 w-24 flex items-center justify-center p-6 bg-white/[0.01] border border-white/5 rounded-[2.5rem] group-hover:border-[#00FF41]/40 group-hover:bg-[#00FF41]/5 transition-all duration-700 shadow-xl overflow-hidden text-white/20 group-hover:text-[#00FF41]">
                    <v.icon className="h-10 w-10 transition-transform duration-700 group-hover:scale-125" />
                  </div>
                  <span className="text-[11px] font-black text-white/5 tracking-[0.5em] italic italic group-hover:text-[#00FF41]/20 transition-colors uppercase">{v.id}</span>
                </div>

                <div className="relative z-10">
                  <h3 className="text-4xl md:text-5xl font-[1000] text-white italic uppercase tracking-tighter mb-10 group-hover:translate-x-8 transition-all duration-700 leading-none">
                    {v.title}
                  </h3>
                  <p className="text-white/20 text-xl font-light italic leading-relaxed border-l border-white/10 pl-10 group-hover:border-[#00FF41]/30 group-hover:text-white/40 transition-all duration-700">"{v.desc}"</p>
                </div>

                <div className="mt-20 pt-12 border-t border-white/5 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-1000 relative z-10 text-[9px] font-black tracking-[0.6em] text-[#00FF41] uppercase italic italic">
                  STATUS_NOMINAL
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }} className="h-2 w-2 bg-[#00FF41] rounded-full shadow-[0_0_10px_#00FF41]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03.5 // SECTOR PRESENCE - INDUSTRIAL BLUEPRINT */}
      <section className="py-40 md:py-[20vh] bg-black relative border-y border-white/5 overflow-hidden">
        <div className="container px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-40 md:gap-72 items-center">
            <div className="relative aspect-square scale-90 md:scale-100 group/presence">
              <div className="absolute inset-x-[-60px] inset-y-[-60px] pointer-events-none opacity-0 group-hover/presence:opacity-100 transition-opacity duration-1000 z-0">
                <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-[#00FF41]/20" />
                <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-[#00FF41]/20" />
              </div>
              <div className="absolute -inset-10 bg-[#00FF41]/5 blur-[200px] rounded-full animate-pulse pointer-events-none" />
              <div className="absolute inset-0 border border-white/5 rounded-[8rem] backdrop-blur-3xl overflow-hidden group shadow-[0_0_150px_rgba(0,0,0,1)] group-hover/presence:border-[#00FF41]/20 transition-all duration-1000">
                <div className="absolute inset-0 bg-white/[0.01] group-hover:bg-[#00FF41]/[0.02] transition-colors duration-1000" />
                <div className="p-16 md:p-32 h-full flex flex-col justify-between relative z-10">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-4">
                      <span className="text-[12px] font-[1000] tracking-[1em] text-[#00FF41] uppercase italic">NODE_TELEMETRY_STATUS</span>
                      <div className="flex items-center gap-4">
                        <span className="h-2 w-2 bg-[#00FF41] rounded-full animate-pulse shadow-[0_0_15px_#00FF41]" />
                        <span className="text-[11px] font-black text-white/20 tracking-widest uppercase italic italic">COMMAND_SYNC_OK</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-16">
                    {[
                      { node: "ALPHA_UNIT", loc: "Singapore_Sector", health: "98%", stat: "ACTIVE" },
                      { node: "DELTA_UNIT", loc: "Berlin_Substrate", health: "99%", stat: "NOMINAL" },
                      { node: "EPSILON_UNIT", loc: "New_York_Vertex", health: "97%", stat: "SYNCED" }
                    ].map((n, i) => (
                      <div key={i} className="flex items-center justify-between group/node">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-4 mb-2">
                            <span className="text-[10px] font-black text-[#00FF41] tracking-[0.3em] uppercase italic italic italic">{n.stat}</span>
                            <span className="text-[10px] font-black text-white/5 tracking-[0.5em] uppercase italic italic transition-colors group-hover/node:text-white/20">{n.node}</span>
                          </div>
                          <span className="text-4xl md:text-5xl font-[1000] text-white italic tracking-tighter uppercase group-hover/node:translate-x-12 transition-all duration-1000 leading-none">{n.loc}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[13px] font-[1000] text-[#00FF41] block mb-4 group-hover/node:scale-125 transition-transform">{n.health}</span>
                          <div className="h-1 w-48 bg-white/5 rounded-full overflow-hidden shadow-2xl relative">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: n.health }}
                              transition={{ duration: 2.5, delay: i * 0.3, ease: [0.16, 1, 0.3, 1] }}
                              className="h-full bg-gradient-to-r from-transparent via-[#00FF41] to-[#00FF41] shadow-[0_0_15px_#00FF41]"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:pl-10">
              <div className="flex items-center gap-10 mb-16 md:mb-24">
                <TechnicalIcon icon={Globe2} glowColor="#00FF41" className="scale-75 origin-left" />
                <span className="text-[12px] font-[1000] tracking-[1.5em] text-[#00FF41] block uppercase italic italic">GEOSPATIAL_SUBSTRATE_GRID</span>
              </div>
              <h2 className="text-7xl md:text-[10vw] font-[1000] text-white italic uppercase tracking-tighter leading-[0.8] mb-16">
                <GlitchText text="SECTOR" /> <br /> <span className="text-white/10"><GlitchText text="PRESENCE." /></span>
              </h2>
              <p className="text-white/40 text-2xl md:text-4xl font-light italic leading-relaxed mb-20 md:mb-32 max-w-xl border-l border-white/10 pl-16 py-4 hover:border-[#00FF41]/40 transition-colors">
                Digital sovereignty knows no borders. Our collective is distributed across planetary sectors to ensure sub-ms response times and regulatory alignment in every jurisdiction.
              </p>
              <div className="pt-20 border-t border-white/5">
                <Magnetic strength={0.2} className="w-fit">
                  <div className="flex items-center gap-12 group cursor-pointer">
                    <div className="h-24 w-24 rounded-full border border-white/10 flex items-center justify-center p-6 bg-white/[0.01] group-hover:border-[#00FF41]/60 group-hover:bg-[#00FF41]/5 transition-all duration-700 shadow-2xl relative overflow-hidden">
                      <TechnicalIcon icon={Globe2} glowColor="#00FF41" className="scale-75 translate-y-2 relative z-10" />
                      <div className="absolute inset-0 bg-gradient-to-br from-[#00FF41]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[12px] font-[1000] text-white/10 tracking-[1em] uppercase group-hover:text-[#00FF41] transition-all italic">VIEW_OPERATIONAL_MAP</span>
                      <div className="mt-4 text-xl font-[1000] text-white italic opacity-0 group-hover:opacity-100 group-hover:translate-x-12 transition-all duration-1000 tracking-tighter">74_LIVE_NODES // 03_COMMAND_CENTERS</div>
                    </div>
                  </div>
                </Magnetic>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 // THE COLLECTIVE - GRID TILES */}
      <section className="py-60 md:py-80 bg-white/[0.01] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-px bg-gradient-to-r from-transparent via-[#00FF41]/40 to-transparent shadow-[0_0_20px_#00FF41]" />

        <div className="container px-4 text-center mb-48 md:mb-80 relative z-10">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex flex-col items-center">
            <span className="text-[12px] font-[1000] tracking-[2em] text-[#00FF41] mb-12 block uppercase italic italic">OPERATIONAL_CREW_ARCHIVE</span>
            <h2 className="text-7xl md:text-[12vw] font-[1000] text-white uppercase italic tracking-tighter leading-none group">
              <GlitchText text="THE" />_<span className="text-white/10 group-hover:text-white transition-colors duration-1000 italic">COLLECTIVE.</span>
            </h2>
          </motion.div>
        </div>

        <div className="container px-4 relative z-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-24 gap-y-60 md:gap-y-80">
            {TeamMembers.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="group/member flex flex-col"
              >
                <div className="relative aspect-[3/4] w-full mb-16 overflow-hidden clip-polygon group-hover/member:clip-polygon-none transition-all duration-1000 shadow-[0_0_120px_rgba(0,0,0,1)] bg-black/50 border border-white/5">
                  <div className="absolute inset-x-[-20px] inset-y-[-20px] pointer-events-none opacity-0 group-hover/member:opacity-100 transition-opacity duration-1000 z-20">
                    <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#00FF41]/60" />
                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#00FF41]/60" />
                  </div>
                  <div className="absolute inset-0 bg-[#00FF41]/10 opacity-0 group-hover/member:opacity-100 transition-opacity z-10 mix-blend-overlay" />
                  <SafeImage src={member.imageUrl} alt={member.name} fill className="object-cover grayscale brightness-50 group-hover/member:grayscale-0 group-hover/member:brightness-100 group-hover/member:scale-120 transition-all duration-2000 opacity-60 group-hover/member:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-0" />

                  {/* Technical Metadata on image hover */}
                  <div className="absolute bottom-12 left-12 right-12 z-20 translate-y-16 opacity-0 group-hover/member:translate-y-0 group-hover/member:opacity-100 transition-all duration-1000 delay-100">
                    <div className="flex items-center gap-6 mb-4">
                      <div className="h-2 w-2 bg-[#00FF41] rounded-full animate-pulse shadow-[0_0_10px_#00FF41]" />
                      <span className="text-[11px] font-[1000] text-[#00FF41] tracking-[0.5em] uppercase italic italic">SYSTEM_OPERATOR_SYNC_OK</span>
                    </div>
                    <span className="text-[10px] font-black text-white/40 tracking-[0.4em] uppercase whitespace-nowrap overflow-hidden text-ellipsis block italic">
                      VERIFIED_OPERATOR
                    </span>
                  </div>
                </div>
                <div className="text-center md:text-left px-8 relative z-10">
                  <h3 className="text-4xl md:text-5xl font-[1000] text-white uppercase italic mb-4 tracking-tighter group-hover/member:text-[#00FF41] group-hover/member:translate-x-8 transition-all duration-1000 leading-none">
                    {member.name}
                  </h3>
                  <div className="text-[12px] font-[1000] text-[#00FF41] tracking-[0.8em] uppercase mb-12 opacity-40 group-hover/member:opacity-100 transition-opacity italic">
                    {member.title}
                  </div>
                  <p className="text-white/20 text-xl italic font-light leading-relaxed line-clamp-3 group-hover/member:text-white/60 transition-all duration-1000 border-l border-white/5 pl-8 hover:border-[#00FF41]/20">
                    "{member.bio}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <style jsx>{`
            .clip-polygon {
                clip-path: polygon(15% 0%, 100% 0%, 100% 85%, 85% 100%, 0% 100%, 0% 15%);
            }
            .clip-polygon-none {
                clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 100%, 0% 100%);
            }
        `}</style>
      </section>

      {/* 05 // FINAL CTA - DEEP SKEUOMORPHIC BUTTON */}
      <section className="py-60 md:py-[40vh] bg-black relative border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.01] select-none pointer-events-none group">
          <span className="text-[35vw] font-[1000] text-white uppercase italic tracking-tighter leading-none group-hover:scale-110 transition-transform duration-2000">IDENTITY</span>
        </div>
        <div className="container px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }}>
            <span className="text-[12px] font-[1000] tracking-[2em] text-[#00FF41] mb-16 block uppercase italic italic">TALENT_ACQUISITION_PROTOCOL</span>
            <h2 className="text-7xl md:text-[12vw] font-[1000] text-white italic uppercase tracking-tighter leading-[0.7] mb-24">
              SEEKING <span className="text-white/20 group-hover:text-white transition-colors duration-1000"><GlitchText text="ALPHA" /></span> <br /> TALENT.
            </h2>
            <p className="max-w-4xl mx-auto text-white/30 text-2xl md:text-5xl font-light italic leading-relaxed mb-24 md:mb-32 px-12 py-10 border-x border-white/5 italic">
              The collective is expanding. We are scouting for specialized intelligence units with zero-day research capabilities and a mastery of the digital substrate.
            </p>
            <div className="flex justify-center">
              <Magnetic strength={0.3}>
                <Button size="lg" className="h-32 px-24 rounded-full bg-[#00FF41] text-black font-[1000] uppercase text-lg tracking-[0.8em] transition-all shadow-[0_40px_150px_rgba(0,255,65,0.4)] group/final overflow-hidden relative" asChild>
                  <Link href="/careers" className="flex items-center gap-6">
                    <span className="relative z-10 flex items-center gap-6">
                      SUBMIT_CREDENTIALS <Zap className="h-10 w-10 group-hover/final:rotate-12 group-hover/final:scale-125 transition-transform duration-500" />
                    </span>
                    <div className="absolute inset-0 bg-white translate-y-full group-hover/final:translate-y-0 transition-transform duration-700 pointer-events-none" />
                  </Link>
                </Button>
              </Magnetic>
            </div>

            <div className="mt-32 flex flex-col items-center gap-6 opacity-5 italic">
              <span className="text-[10px] font-black tracking-[1em] uppercase italic">RECRUITMENT_STATION</span>
              <div className="flex gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <div key={i} className="h-1 w-8 bg-[#00FF41] rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />)}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
