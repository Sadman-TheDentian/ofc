
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
      <section className="relative min-h-screen flex items-center pt-40 pb-32">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container px-4 grid lg:grid-cols-2 gap-32 items-center z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-6 mb-12">
              <div className="h-0.5 w-16 bg-[#00FF41]" />
              <RevealText text="THE_ORIGIN_STORY" className="text-[10px] font-bold tracking-[1.2em] text-[#00FF41] uppercase" />
            </div>
            <h1 className="text-7xl md:text-[14vw] font-[900] tracking-[-0.05em] text-white uppercase italic leading-[0.7] mb-16">
              ALPHA <br /> <span className="text-white/20">UNITS.</span>
            </h1>
            <p className="max-w-2xl text-white/40 text-2xl md:text-3xl font-light italic leading-relaxed mb-16">
              We are the architecture behind the silence. A specialized collective of intelligence architects redesigning the boundaries of digital sovereignty.
            </p>
            <div className="flex flex-wrap gap-12">
              <Button size="lg" className="h-20 px-16 rounded-full bg-white text-black font-[900] uppercase text-[12px] tracking-[0.4em] hover:bg-[#00FF41] transition-all" asChild>
                <Link href="/contact">INITIATE_SYNC</Link>
              </Button>
              <div className="flex items-center gap-6 text-[10px] font-[900] text-white/20 tracking-[0.5em] uppercase italic">
                <TechnicalIcon icon={Activity} glowColor="#00FF41" className="scale-75" />
                NODE_ACTIVE_v4.2
              </div>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute -inset-20 bg-[#00FF41]/5 blur-[120px] rounded-full animate-pulse-slow" />
            <div className="relative aspect-square rounded-[6rem] overflow-hidden border border-white/5 bg-white/[0.02] rotate-3 hover:rotate-0 transition-transform duration-1000 p-3">
              <div className="h-full w-full rounded-[5.5rem] overflow-hidden">
                <SafeImage src="/images/about-hero.png" alt="DentiSystems Operations Center" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Background Layered Text */}
        <div className="absolute bottom-0 right-0 overflow-hidden pointer-events-none select-none opacity-[0.02]">
          <span className="text-[30vw] font-black text-white italic leading-none translate-y-1/4 inline-block">ARCHITECT</span>
        </div>
      </section>

      {/* 02 // MISSION BROADCAST - CINEMATIC FULL BLEED */}
      <section className="py-40 relative">
        <div className="container px-4">
          <div className="bg-white/[0.02] border border-white/5 rounded-[5rem] p-12 md:p-32 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00FF41]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
              <div>
                <h2 className="text-5xl md:text-8xl font-black text-white uppercase italic tracking-tighter leading-none mb-12">
                  THE <span className="text-[#00FF41]">MISSION</span> PROTOCOL
                </h2>
                <div className="space-y-8 text-white/40 text-xl font-light italic leading-relaxed">
                  <p>
                    In an era of hyper-escalated digital warfare, legacy defense is obsolete. DentiSystems was forged as a response to the fragmentation of global security.
                  </p>
                  <p className="text-white border-l-2 border-[#00FF41] pl-8 py-4 bg-white/[0.02] rounded-r-3xl">
                    "We re-engineer the foundational trust of the web, ensuring that every interaction is architecturally sound and fundamentally impenetrable."
                  </p>
                </div>
              </div>
              <div className="h-[400px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={statsData}>
                    <PolarGrid stroke="rgba(0,255,65,0.05)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 9, fontWeight: 900, letterSpacing: '0.2em' }} />
                    <Radar name="Unit_Capacity" dataKey="value" stroke="#00FF41" fill="#00FF41" fillOpacity={0.1} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                  <span className="text-[9px] font-bold text-white/20 tracking-widest uppercase">STABILITY_TARGET</span>
                  <div className="text-2xl font-black text-[#00FF41]">0.99</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 // CORE VALUES - GEOMETRIC OVERLAP */}
      <section className="py-60 md:py-80 bg-black relative border-t border-white/5">
        <div className="container px-4">
          <div className="max-w-3xl mb-32">
            <span className="text-[10px] font-bold tracking-[1.2em] text-[#00FF41] mb-12 block uppercase">FOUNDATIONAL_PILLARS</span>
            <h2 className="text-6xl md:text-[8vw] font-[900] text-white uppercase italic tracking-tighter leading-none">CORE VALUES</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-16">
            {[
              { icon: Cpu, title: "EXPERTISE_LEVEL", desc: "Decades of high-fidelity offensive intelligence and research.", color: "text-[#00FF41]" },
              { icon: ShieldPlus, title: "INTEGRITY_INDEX", desc: "Zero-compromise ethical standards in every mission-critical operation.", color: "text-[#00FF41]" },
              { icon: Globe2, title: "NETWORK_MESH", desc: "Continuous development of proprietary neural defensive protocols.", color: "text-[#00FF41]" }
            ].map((v, i) => (
              <div key={i} className="group relative pt-24">
                <div className="absolute top-0 left-0 text-9xl font-black text-white/[0.02] select-none italic tracking-tighter">0{i + 1}</div>
                <div className="bg-white/[0.02] border border-white/10 rounded-[5rem] p-16 hover:bg-white/[0.03] hover:border-[#00FF41]/30 transition-all duration-700 h-full relative z-10 flex flex-col">
                  <div className="mb-16">
                    <TechnicalIcon icon={v.icon as any} glowColor="#00FF41" />
                  </div>
                  <h3 className="text-4xl font-[900] text-white italic uppercase tracking-tighter mb-8 group-hover:translate-x-4 transition-transform duration-500 leading-none">{v.title}</h3>
                  <p className="text-white/30 text-xl font-light italic leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 // OPERATIONAL UNITS - HEX GRID / CLIPPED */}
      <section className="py-40 bg-white/[0.01] border-y border-white/5">
        <div className="container px-4 text-center mb-40">
          <span className="text-[10px] font-bold tracking-[1.2em] text-[#00FF41] mb-12 block uppercase">OPERATIONAL_CREW</span>
          <h2 className="text-6xl md:text-[8vw] font-[900] text-white underline decoration-[#00FF41]/20 underline-offset-[30px] uppercase italic tracking-tighter leading-none">THE COLLECTIVE</h2>
        </div>

        <div className="container px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-20 gap-y-32">
            {TeamMembers.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <div className="relative h-64 w-full mb-10 overflow-hidden clip-polygon group-hover:clip-polygon-none transition-all duration-700">
                  <div className="absolute inset-0 bg-[#00FF41]/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay" />
                  <SafeImage src={member.imageUrl} alt={member.name} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                </div>
                <div className="text-left px-4">
                  <h3 className="text-2xl font-black text-white uppercase italic mb-2 tracking-tighter">{member.name}</h3>
                  <div className="text-[10px] font-bold text-[#00FF41] tracking-[0.4em] uppercase mb-4 opacity-40">{member.title}</div>
                  <p className="text-white/20 text-sm italic font-light line-clamp-2">"{member.bio}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <style jsx>{`
            .clip-polygon {
                clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
            }
            .clip-polygon-none {
                clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 100%, 0% 100%);
            }
        `}</style>
      </section>

      {/* 05 // FINAL CTA - DEEP SKEUOMORPHIC BUTTON */}
      <section className="py-60 md:py-[20vh] bg-black relative border-t border-white/5">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
          <span className="text-[25vw] font-black text-white uppercase italic tracking-tighter">IDENTITY</span>
        </div>
        <div className="container px-4 text-center relative z-10">
          <h2 className="text-6xl md:text-[12vw] font-[900] text-white italic uppercase tracking-tighter leading-[0.8] mb-20">
            SEEKING <span className="text-[#00FF41]">ALPHA</span> TALENT.
          </h2>
          <p className="max-w-xl mx-auto text-white/40 text-xl font-light italic leading-relaxed mb-16 px-4">
            The collective is expanding. We are scouting for specialized intelligence units with zero-day research capabilities.
          </p>
          <div className="flex justify-center">
            <Button size="lg" className="h-24 px-20 rounded-full bg-[#00FF41] text-black font-black uppercase text-sm tracking-[0.5em] hover:scale-110 transition-all shadow-[0_0_50px_rgba(0,255,65,0.4)]" asChild>
              <Link href="/careers">SUBMIT_CREDENTIALS <Zap className="ml-4 h-6 w-6" /></Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}