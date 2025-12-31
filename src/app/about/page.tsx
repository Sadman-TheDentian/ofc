
'use client';

import { Button } from "@/components/ui/button";
import { Users, Award, Handshake, BrainCircuit, ArrowRight, ShieldCheck, Activity, Target, Zap } from "lucide-react";
import Link from "next/link";
import { TeamMembers } from "@/lib/placeholder-images";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import React, { useRef } from "react";
import SafeImage from "@/components/SafeImage";
import { motion, useScroll, useTransform } from "framer-motion";
import RevealText from "@/components/RevealText";
import TechnicalIcon from "@/components/TechnicalIcon";
import { Cpu, ShieldPlus, Globe2 } from "lucide-react";

const statsData = [
  { subject: 'Encryption Depth', value: 120, displayValue: "AES-256" },
  { subject: 'Threat Intelligence', value: 140, displayValue: "99.9%" },
  { subject: 'Verification Nodes', value: 100, displayValue: "4k+" },
  { subject: 'Protocol Latency', value: 130, displayValue: "0.02ms" },
  { subject: 'Substrate Health', value: 110, displayValue: "OPTIMAL" },
];

import GlitchText from "@/components/GlitchText";
import HUDSection from "@/components/HUDSection";

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-black overflow-hidden selection:bg-[#00FF41]/30">

      {/* 01 // CINEMATIC HERO - ASYMMETRIC SPLIT */}
      <section className="relative min-h-[90vh] flex items-center pt-40 pb-32">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container px-4 grid lg:grid-cols-2 gap-32 items-center z-10">
          <div className="max-w-5xl">
            <div className="flex items-center gap-6 mb-12">
              <TechnicalIcon icon={Activity} glowColor="#00FF41" className="scale-50 origin-left" />
              <RevealText text="THE_ORIGIN_STORY // ALPHA_NODES" className="text-[10px] font-black tracking-[1.2em] text-[#00FF41] uppercase" />
            </div>
            <h1 className="text-7xl md:text-[14vw] font-[900] tracking-[-0.05em] text-white uppercase italic leading-[0.7] mb-16">
              <GlitchText text="ALPHA" /> <br /> <span className="text-white/20"><GlitchText text="UNITS." /></span>
            </h1>
            <p className="max-w-3xl text-white/40 text-2xl md:text-3xl font-light italic leading-relaxed mb-20 border-l border-white/10 pl-10">
              We are the architecture behind the silence. A specialized collective of intelligence architects redesigning the boundaries of digital sovereignty since inception.
            </p>
            <div className="flex flex-wrap gap-12 items-center">
              <Button size="lg" className="h-24 px-20 rounded-full bg-white text-black font-black uppercase text-sm tracking-[0.5em] hover:bg-[#00FF41] transition-all shadow-2xl relative group overflow-hidden" asChild>
                <Link href="/contact">
                  <span className="relative z-10">INITIATE_SYNC</span>
                  <div className="absolute inset-0 bg-[#00FF41] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </Link>
              </Button>
              <div className="flex items-center gap-8 text-[11px] font-black text-white/20 tracking-[0.6em] uppercase italic group">
                <TechnicalIcon icon={Activity} glowColor="#00FF41" className="scale-75 group-hover:scale-110 transition-transform duration-700" />
                NODE_ACTIVE_v7.2 // LIVE
              </div>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute -inset-20 bg-[#00FF41]/5 blur-[160px] rounded-full animate-pulse-slow" />
            <div className="relative aspect-square rounded-[6rem] overflow-hidden border border-white/5 bg-white/[0.01] rotate-3 hover:rotate-0 transition-all duration-1000 p-4 shadow-2xl group">
              <div className="h-full w-full rounded-[5rem] overflow-hidden relative">
                <SafeImage src="/images/about-hero.png" alt="DentiSystems Operations Center" fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 opacity-40 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                {/* HUD Brackets inside image frame */}
                <div className="absolute top-10 left-10 w-16 h-16 border-t-2 border-l-2 border-[#00FF41]/30" />
                <div className="absolute bottom-10 right-10 w-16 h-16 border-b-2 border-r-2 border-[#00FF41]/30" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Background Layered Text */}
        <div className="absolute bottom-0 right-0 overflow-hidden pointer-events-none select-none opacity-[0.015]">
          <span className="text-[35vw] font-black text-white italic leading-none translate-y-1/4 inline-block tracking-tighter">ARCHITECT</span>
        </div>
      </section>

      {/* 02 // MISSION BROADCAST - CINEMATIC FULL BLEED */}
      <HUDSection label="MISSION_PROTOCOL // CORE_DIRECTIVE" className="m-4 md:m-20 p-12 md:p-32">
        <div className="grid lg:grid-cols-2 gap-32 items-center relative z-10">
          <div>
            <h2 className="text-6xl md:text-9xl font-black text-white uppercase italic tracking-tighter leading-[0.8] mb-16">
              THE <span className="text-[#00FF41]">MISSION</span> <br /> PROTOCOL
            </h2>
            <div className="space-y-12 text-white/30 text-2xl font-light italic leading-relaxed">
              <p>
                In an era of hyper-escalated digital warfare, legacy defense is obsolete. DentiSystems was forged as a response to the fragmentation of global security landscapes.
              </p>
              <div className="text-white border-l border-[#00FF41] pl-10 py-8 bg-white/[0.02] rounded-r-[3rem] relative overflow-hidden group/quote">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00FF41]/5 to-transparent opacity-0 group-hover/quote:opacity-100 transition-opacity" />
                <span className="relative z-10 block text-3xl font-light italic leading-tight">
                  "We re-engineer the foundational trust of the web, ensuring that every interaction is architecturally sound and fundamentally impenetrable."
                </span>
              </div>
            </div>
          </div>
          <div className="h-[500px] w-full relative bg-white/[0.01] border border-white/5 rounded-[4rem] p-8 overflow-hidden">
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={statsData}>
                <PolarGrid stroke="rgba(0,255,65,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 900, letterSpacing: '0.2em' }} />
                <Radar name="Unit_Capacity" dataKey="value" stroke="#00FF41" fill="#00FF41" fillOpacity={0.15} strokeWidth={3} />
              </RadarChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none group">
              <span className="text-[10px] font-black text-white/20 tracking-widest uppercase group-hover:text-[#00FF41]/40 transition-colors">STABILITY_TARGET</span>
              <div className="text-4xl font-black text-[#00FF41] italic tracking-tighter">0.99</div>
            </div>
          </div>
        </div>
      </HUDSection>

      {/* 03 // CORE VALUES - GEOMETRIC OVERLAP */}
      <section className="py-60 md:py-80 bg-black relative">
        <div className="container px-4">
          <div className="max-w-4xl mb-40">
            <div className="flex items-center gap-6 mb-12">
              <TechnicalIcon icon={Activity} glowColor="#00FF41" className="scale-50 origin-left" />
              <span className="text-[11px] font-black tracking-[1.2em] text-[#00FF41] block uppercase italic">FOUNDATIONAL_PILLARS</span>
            </div>
            <h2 className="text-7xl md:text-[10vw] font-[900] text-white uppercase italic tracking-tighter leading-none">
              <GlitchText text="CORE_VALUES" />
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-20">
            {[
              { icon: Cpu, title: "EXPERTISE_LEVEL", desc: "Decades of high-fidelity offensive intelligence and research focused on sovereign asset protection.", color: "text-[#00FF41]" },
              { icon: ShieldPlus, title: "INTEGRITY_INDEX", desc: "Zero-compromise ethical standards in every mission-critical operation and vendor engagement.", color: "text-[#00FF41]" },
              { icon: Globe2, title: "NETWORK_MESH", desc: "Continuous development of proprietary neural defensive protocols across global telemetric grids.", color: "text-[#00FF41]" }
            ].map((v, i) => (
              <div key={i} className="group relative pt-32">
                <div className="absolute top-0 left-0 text-[12rem] font-black text-white/[0.015] select-none italic tracking-tighter leading-none pointer-events-none">0{i + 1}</div>
                <div className="bg-white/[0.01] border border-white/5 rounded-[5rem] p-16 hover:bg-white/[0.03] hover:border-[#00FF41]/30 transition-all duration-1000 h-full relative z-10 flex flex-col backdrop-blur-3xl shadow-2xl">
                  <div className="mb-16">
                    <TechnicalIcon icon={v.icon as any} glowColor="#00FF41" />
                  </div>
                  <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-8 group-hover:translate-x-6 transition-transform duration-700 leading-none">
                    {v.title}
                  </h3>
                  <p className="text-white/30 text-xl font-light italic leading-relaxed group-hover:text-white/50 transition-colors duration-700">"{v.desc}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03.5 // SECTOR PRESENCE - INDUSTRIAL BLUEPRINT */}
      <section className="py-40 md:py-80 bg-black relative border-y border-white/5 overflow-hidden">
        <div className="container px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-40 items-center">
            <div className="relative aspect-square scale-90 md:scale-100">
              <div className="absolute -inset-10 bg-[#00FF41]/5 blur-[160px] rounded-full animate-pulse" />
              <div className="absolute inset-0 border border-white/5 rounded-[6rem] backdrop-blur-3xl overflow-hidden group shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                <div className="absolute inset-0 bg-white/[0.01] group-hover:bg-[#00FF41]/[0.02] transition-colors duration-1000" />
                <div className="p-16 md:p-24 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-2">
                      <span className="text-[11px] font-black tracking-[0.8em] text-[#00FF41] uppercase italic">NODE_STATUS</span>
                      <span className="text-[10px] font-black text-white/20 tracking-widest uppercase">ACTIVE // v10.4</span>
                    </div>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4].map(i => (
                        <motion.div
                          key={i}
                          animate={{ opacity: [0.1, 0.4, 0.1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                          className="h-1 w-6 bg-[#00FF41]"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-12">
                    {[
                      { node: "ALPHA_UNIT", loc: "Singapore_Sector", health: "98%" },
                      { node: "DELTA_UNIT", loc: "Berlin_Substrate", health: "99%" },
                      { node: "EPSILON_UNIT", loc: "New_York_Vertex", health: "97%" }
                    ].map((n, i) => (
                      <div key={i} className="flex items-center justify-between group/node">
                        <div className="flex flex-col">
                          <span className="text-[9px] font-black text-white/10 tracking-[0.5em] uppercase mb-2 group-hover/node:text-[#00FF41]/40 transition-colors">{n.node}</span>
                          <span className="text-3xl font-black text-white italic tracking-tighter uppercase group-hover/node:translate-x-4 transition-transform duration-500">{n.loc}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[11px] font-black text-[#00FF41] block mb-2">{n.health}</span>
                          <div className="h-1.5 w-32 bg-white/5 rounded-full overflow-hidden shadow-inner">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: n.health }}
                              transition={{ duration: 2.5, delay: i * 0.3, ease: [0.16, 1, 0.3, 1] }}
                              className="h-full bg-gradient-to-r from-[#00FF41]/40 to-[#00FF41]"
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
              <span className="text-[11px] font-black tracking-[1.2em] text-[#00FF41] mb-12 block uppercase italic">GEOSPATIAL_SUBSTRATE</span>
              <h2 className="text-7xl md:text-[10vw] font-[900] text-white italic uppercase tracking-tighter leading-[0.8] mb-16">
                <GlitchText text="SECTOR" /> <br /> <span className="text-white/20"><GlitchText text="PRESENCE." /></span>
              </h2>
              <p className="text-white/30 text-2xl md:text-3xl font-light italic leading-relaxed mb-16 max-w-xl border-l border-white/5 pl-10">
                Digital sovereignty knows no borders. Our collective is distributed across planetary sectors to ensure sub-ms response times and regulatory alignment in every jurisdiction.
              </p>
              <div className="pt-16 border-t border-white/5">
                <div className="flex items-center gap-10 group cursor-pointer">
                  <TechnicalIcon icon={Globe2} glowColor="#00FF41" className="scale-75 translate-y-2" />
                  <div>
                    <span className="text-[11px] font-black text-white/20 tracking-[0.6em] uppercase group-hover:text-[#00FF41] transition-all">VIEW_OPERATIONAL_MAP</span>
                    <div className="mt-3 text-lg font-black text-white italic opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-700">74_LIVE_NODES // 03_COMMAND_CENTERS</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 // THE COLLECTIVE - GRID TILES */}
      <section className="py-60 bg-white/[0.01] border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-px bg-gradient-to-r from-transparent via-[#00FF41]/20 to-transparent" />
        <div className="container px-4 text-center mb-48">
          <span className="text-[11px] font-black tracking-[1.5em] text-[#00FF41] mb-12 block uppercase italic">OPERATIONAL_CREW</span>
          <h2 className="text-7xl md:text-[10vw] font-[900] text-white uppercase italic tracking-tighter leading-none">
            <GlitchText text="THE_COLLECTIVE" />
          </h2>
        </div>

        <div className="container px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-24 gap-y-40">
            {TeamMembers.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                <div className="relative h-[450px] w-full mb-12 overflow-hidden clip-polygon group-hover:clip-polygon-none transition-all duration-1000 shadow-2xl bg-white/[0.01] border border-white/5">
                  <div className="absolute inset-0 bg-[#00FF41]/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay" />
                  <SafeImage src={member.imageUrl} alt={member.name} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 opacity-60 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/40 to-transparent z-0 opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Technical Metadata on image hover */}
                  <div className="absolute bottom-8 left-8 right-8 z-20 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="h-1 w-1 bg-[#00FF41] rounded-full animate-pulse" />
                      <span className="text-[9px] font-black text-[#00FF41] tracking-[0.4em] uppercase">SYSTEM_OPERATOR</span>
                    </div>
                    <span className="text-[8px] font-black text-white/30 tracking-[0.2em] uppercase whitespace-nowrap overflow-hidden text-ellipsis block">
                      HASH_ID: {Math.random().toString(16).substring(2, 10).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="text-center md:text-left px-4">
                  <h3 className="text-3xl font-black text-white uppercase italic mb-3 tracking-tighter group-hover:text-[#00FF41] transition-colors">
                    {member.name}
                  </h3>
                  <div className="text-[11px] font-black text-[#00FF41] tracking-[0.5em] uppercase mb-8 opacity-40 group-hover:opacity-100 transition-opacity">
                    {member.title}
                  </div>
                  <p className="text-white/30 text-xl italic font-light leading-relaxed line-clamp-2 group-hover:text-white/60 transition-colors">
                    "{member.bio}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <style jsx>{`
            .clip-polygon {
                clip-path: polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%);
            }
            .clip-polygon-none {
                clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 100%, 0% 100%);
            }
        `}</style>
      </section>

      {/* 05 // FINAL CTA - DEEP SKEUOMORPHIC BUTTON */}
      <section className="py-60 md:py-[30vh] bg-black relative border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.015] select-none pointer-events-none">
          <span className="text-[30vw] font-black text-white uppercase italic tracking-tighter leading-none">IDENTITY</span>
        </div>
        <div className="container px-4 text-center relative z-10">
          <h2 className="text-7xl md:text-[12vw] font-[900] text-white italic uppercase tracking-tighter leading-[0.7] mb-24">
            SEEKING <span className="text-[#00FF41]"><GlitchText text="ALPHA" /></span> <br /> TALENT.
          </h2>
          <p className="max-w-2xl mx-auto text-white/30 text-2xl md:text-3xl font-light italic leading-relaxed mb-20 px-8">
            The collective is expanding. We are scouting for specialized intelligence units with zero-day research capabilities and a master of the digital substrate.
          </p>
          <div className="flex justify-center">
            <Button size="lg" className="h-28 px-24 rounded-full bg-[#00FF41] text-black font-black uppercase text-base tracking-[0.6em] hover:scale-110 transition-all shadow-[0_0_100px_rgba(0,255,65,0.4)] group overflow-hidden" asChild>
              <Link href="/careers">
                <span className="relative z-10 flex items-center gap-4">
                  SUBMIT_CREDENTIALS <Zap className="h-8 w-8 group-hover:rotate-12 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
