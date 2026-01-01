
'use client';

import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import * as LucideIcons from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import React, { useRef } from 'react';
import type { Service } from '@/lib/types';
import { motion, useScroll, useTransform } from 'framer-motion';
import SafeImage from '@/components/SafeImage';

const Icon = ({ name, ...props }: { name: string } & LucideIcons.LucideProps) => {
  const LucideIcon = LucideIcons[name as keyof typeof LucideIcons] as LucideIcons.LucideIcon;
  if (!LucideIcon) return null;
  return <LucideIcon {...props} />;
};

import Magnetic from '@/components/Magnetic';
import TechnicalIcon from '@/components/TechnicalIcon';
import RevealText from '@/components/RevealText';
import GlitchText from '@/components/GlitchText';
import HUDSection from '@/components/HUDSection';

export default function ServiceDetailClient({ service }: { service: Service }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  if (!service) {
    notFound();
  }

  return (
    <div ref={containerRef} className="flex flex-col bg-black min-h-screen relative overflow-hidden">
      {/* Cinematic Hero */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-40">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="absolute inset-0 z-0">
          <SafeImage
            src={service.imageUrl}
            alt={service.title}
            fill
            className="object-cover opacity-15 grayscale scale-110 brightness-50"
            data-ai-hint={service.imageHint}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />

          {/* Background Architectural Grid */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }} />
        </motion.div>

        <div className="container relative z-10 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 md:mb-32"
          >
            <div className="flex items-center justify-center gap-12 mb-16 md:mb-24">
              <div className="h-[1px] w-32 bg-gradient-to-r from-transparent to-[#00FF41]/40" />
              <div className="flex flex-col items-center">
                <RevealText text="CAPABILITY_NODE // v7.4_SYNC_ACTIVE" className="text-[11px] font-black tracking-[1.2em] text-[#00FF41] uppercase italic" />
                <span className="text-[8px] font-black text-white/10 tracking-[0.5em] mt-3 uppercase italic">SECURE_LINK_STATION_ALPHA</span>
              </div>
              <div className="h-[1px] w-32 bg-gradient-to-l from-transparent to-[#00FF41]/40" />
            </div>

            <h1 className="text-5xl md:text-8xl lg:text-9xl font-[1000] tracking-tighter text-white uppercase italic leading-[0.85] mb-12">
              {service.title}
            </h1>

            <p className="max-w-4xl mx-auto text-white/60 text-lg md:text-2xl font-medium italic leading-relaxed mb-20 md:mb-24 border-l border-white/20 pl-10 py-4">
              "{service.description}"
            </p>

            <div className="flex flex-wrap gap-12 justify-center items-center">
              <Magnetic strength={0.2}>
                <Button size="lg" className="h-28 px-20 border border-white/10 rounded-full bg-white text-black font-[1000] uppercase text-[13px] tracking-[0.5em] hover:bg-[#00FF41] transition-all shadow-[0_40px_100px_rgba(0,0,0,1)] group/btn relative overflow-hidden" asChild>
                  <Link href="/contact" className="flex items-center gap-8">
                    <span className="relative z-10 flex items-center gap-8">
                      INITIATE_DEPLOYMENT <LucideIcons.ArrowRight className="h-6 w-6 group-hover/btn:translate-x-6 transition-transform duration-500" />
                    </span>
                    <div className="absolute inset-0 bg-[#00FF41] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-700 pointer-events-none" />
                  </Link>
                </Button>
              </Magnetic>

              <Magnetic strength={0.1}>
                <Button size="lg" variant="outline" className="h-28 px-20 rounded-full border-white/5 bg-white/[0.02] text-white/40 hover:text-white hover:bg-white/5 hover:border-[#00FF41]/40 uppercase text-[12px] font-black tracking-[0.5em] backdrop-blur-3xl transition-all" asChild>
                  <Link href="/contact">ACQUIRE_SPECS_v9</Link>
                </Button>
              </Magnetic>
            </div>
          </motion.div>
        </div>

        {/* HUD Elements */}
        <div className="absolute bottom-20 left-20 hidden md:flex flex-col gap-4">
          <div className="h-px w-40 bg-gradient-to-r from-[#00FF41]/40 to-transparent" />
          <span className="text-[8px] font-black text-[#00FF41]/40 tracking-[0.8em] uppercase italic">STREAMING_LIVE_DATA</span>
        </div>

        <div className="absolute bottom-20 right-20 hidden md:flex flex-col items-end gap-4 text-right">
          <span className="text-[8px] font-black text-white/10 tracking-[0.8em] uppercase italic italic">ENCRYPTION_v12.4_AES_256</span>
          <div className="h-px w-60 bg-gradient-to-l from-white/10 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00FF41]/20 to-transparent" />
      </section>

      {/* Challenge Section - Instrumental Minimalism */}
      <section className="py-40 md:py-80 bg-black relative border-b border-white/5">
        <div className="container px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-32 md:gap-60 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-10 mb-12">
                <TechnicalIcon icon={LucideIcons.Activity} glowColor="#00FF41" className="scale-75 origin-left" />
                <span className="text-[11px] font-black tracking-[0.8em] text-[#00FF41] uppercase italic">01 // THE_CHALLENGE_ARCHIVE</span>
                <div className="h-px flex-grow bg-white/5" />
              </div>
              <h2 className="text-5xl md:text-9xl font-[1000] text-white uppercase italic leading-[0.85] mb-16 tracking-tighter">
                {service.challenge.title}
              </h2>
              <p className="text-white/30 text-xl md:text-3xl font-light italic leading-relaxed max-w-xl border-l border-white/10 pl-12 group-hover:border-[#00FF41]/20 transition-colors">
                {service.challenge.description}
              </p>
            </motion.div>

            {service.challenge.stat && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2 }}
                className="relative group h-full flex items-center justify-center lg:justify-end"
              >
                <div className="absolute -inset-40 bg-[#00FF41]/5 rounded-full blur-[150px] pointer-events-none group-hover:opacity-100 opacity-0 transition-opacity duration-1000" />
                <div className="text-right flex flex-col items-end">
                  <div className="flex items-center gap-6 mb-8 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="h-px w-20 bg-[#00FF41]" />
                    <span className="text-[11px] font-black tracking-[0.5em] text-[#00FF41] uppercase italic">CRITICAL_METRIC</span>
                  </div>
                  <div className="text-[140px] md:text-[24vw] font-[1000] leading-none text-white/5 group-hover:text-white transition-all duration-1000 tracking-tighter cursor-default italic shadow-2xl">
                    {service.challenge.stat}
                  </div>
                  <p className="text-[14px] font-[1000] text-white/10 tracking-[1em] uppercase mt-12 italic group-hover:text-[#00FF41] group-hover:translate-x-[-20px] transition-all duration-1000">{service.challenge.statLabel}</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Capabilities Section - High-Fidelity Grid */}
      <section className="py-40 md:py-80 bg-black">
        <div className="container px-4">
          <div className="max-w-6xl mb-32 md:mb-60 relative">
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#00FF41]/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="flex items-center gap-10 mb-12">
              <TechnicalIcon icon={LucideIcons.Shield} glowColor="#00FF41" className="scale-75 origin-left" />
              <span className="text-[11px] font-black tracking-[1em] text-[#00FF41] mb-10 block uppercase italic">02 // STRATEGIC_CAPABILITIES</span>
            </div>
            <h2 className="text-5xl md:text-[8vw] font-[1000] text-white uppercase italic leading-[0.85] mb-16 tracking-tighter">
              <GlitchText text="TACTICAL SOLUTIONS." />
            </h2>
            <div className="h-[2px] w-full bg-gradient-to-r from-[#00FF41]/60 via-white/10 to-transparent" />
            <div className="mt-10 flex justify-between opacity-10">
              <span className="text-[8px] font-black tracking-widest uppercase italic">BUILD_v10.4.5</span>
              <span className="text-[8px] font-black tracking-widest uppercase italic">SOVEREIGN_CLASS_INTEL</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-[5rem] overflow-hidden shadow-2xl">
            {service.capabilities.map((cap, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 1 }}
                className="group bg-black flex flex-col p-12 md:p-20 relative overflow-hidden"
              >
                {/* HUD Corners */}
                <div className="absolute top-12 left-12 w-10 h-10 border-t border-l border-white/5 group-hover:border-[#00FF41]/20 transition-colors" />

                <div className="absolute top-0 right-0 p-16 opacity-[0.02] group-hover:opacity-[0.1] transition-opacity scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-1000 blur-sm group-hover:blur-0">
                  <Icon name={cap.icon} className="h-40 w-40 text-white" />
                </div>

                <div className="mb-16 flex items-center justify-between relative z-10">
                  <div className="h-24 w-24 flex items-center justify-center p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] group-hover:border-[#00FF41]/40 group-hover:bg-[#00FF41]/5 transition-all duration-700 shadow-xl overflow-hidden text-white/20 group-hover:text-[#00FF41]">
                    <Icon name={cap.icon} className="h-10 w-10 transition-transform duration-700 group-hover:scale-125" />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black text-white/5 tracking-[0.3em] uppercase italic">PROTOCOL_ID</span>
                    <span className="text-[11px] font-black text-[#00FF41] tracking-[0.5em] uppercase italic group-hover:scale-110 transition-transform">00{index + 1}</span>
                  </div>
                </div>

                <div className="mb-10 relative z-10">
                  <span className="text-[11px] font-black text-white/20 tracking-[0.5em] uppercase group-hover:text-[#00FF41] transition-colors italic italic">NODE_ALPHA_{index + 1}</span>
                </div>

                <div className="flex-grow relative z-10">
                  <h3 className="text-4xl md:text-5xl font-[1000] text-white uppercase tracking-tighter mb-10 group-hover:translate-x-8 transition-all duration-700 italic leading-none">{cap.title}</h3>
                  <p className="text-white/20 text-xl font-light italic leading-relaxed mb-16 border-l border-white/10 pl-10 group-hover:border-[#00FF41]/20 group-hover:text-white/40 transition-all duration-700">{cap.description}</p>
                </div>

                <div className="pt-16 border-t border-white/5 relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 flex justify-between items-center text-[10px] font-black text-[#00FF41] tracking-[0.5em] uppercase italic italic">
                  SYNC_CONNECTED
                  <LucideIcons.Check className="h-4 w-4 animate-pulse" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytical Process Section */}
      <section className="py-40 md:py-80 bg-black border-y border-white/5 overflow-hidden">
        <div className="container px-4 relative z-10">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-24 md:gap-40 items-start">
            <div className="lg:col-span-5 sticky top-40">
              <motion.div
                initial={{ opacity: 0, scale: 1.1 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5 }}
                className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#00FF41]/5 blur-[200px] rounded-full pointer-events-none"
              />
              <span className="text-[11px] font-black tracking-[0.8em] text-[#00FF41] mb-12 block uppercase italic">03 // ARCHITECTURAL_PIPELINE</span>
              <h2 className="text-5xl md:text-[8vw] font-[1000] text-white uppercase italic leading-[0.85] mb-16 tracking-tighter">
                <GlitchText text="THE PROCESS." />
              </h2>
              <p className="text-white/30 text-xl md:text-4xl font-light italic leading-relaxed max-w-xl border-l border-white/10 pl-12 mb-20 italic">
                "A rigorous, multi-layered methodology engineered for mission success in the most hostile digital environments."
              </p>

              <div className="flex items-center gap-8 group/badge cursor-default">
                <div className="h-px w-24 bg-[#00FF41]/40 group-hover:w-40 transition-all duration-1000" />
                <span className="text-[10px] font-[1000] tracking-[1em] text-white uppercase italic group-hover:text-[#00FF41] transition-colors">VERIFIED_PROTOCOL_v4</span>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-24 md:space-y-40">
              {service.approach.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col md:flex-row gap-12 md:gap-24 group/step"
                >
                  <div className="flex-shrink-0 w-32 h-32 rounded-[2.5rem] border border-white/10 bg-white/[0.01] flex items-center justify-center text-5xl font-[1000] text-white/5 group-hover/step:text-[#00FF41] group-hover/step:border-[#00FF41]/40 group-hover/step:bg-[#00FF41]/5 transition-all duration-1000 italic shadow-[0_0_50px_rgba(0,0,0,1)] relative overflow-hidden">
                    {item.step}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00FF41]/10 to-transparent opacity-0 group-hover/step:opacity-100 transition-opacity" />
                  </div>
                  <div className="pt-6 flex-grow ">
                    <div className="flex items-center gap-6 mb-8 group-hover/step:translate-x-8 transition-transform duration-1000">
                      <div className="h-[2px] w-12 bg-[#00FF41]/40" />
                      <h3 className="text-4xl md:text-5xl font-[1000] text-white uppercase tracking-tighter italic">{item.title}</h3>
                    </div>
                    <p className="text-white/30 text-xl md:text-2xl font-light italic leading-relaxed mb-16 max-w-2xl border-l border-white/5 pl-12 group-hover/step:border-[#00FF41]/20 group-hover/step:text-white/60 transition-all duration-1000">{item.description}</p>
                    <div className="flex justify-between items-center text-[8px] font-black text-white/5 tracking-[0.5em] uppercase italic">
                      <span>PIPELINE_STATION_0{index + 1}</span>
                      <span>CHECKPOINT_OK</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof - Atmospheric HUD Wrapper */}
      <HUDSection label="INTELLIGENCE_VALIDATION" className="my-40 md:my-80 py-40 md:py-80 flex items-center justify-center text-center mx-4 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.05 }}
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#00FF41 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="mb-20 opacity-10 scale-150 group-hover:opacity-40 transition-opacity">
            <LucideIcons.MessageSquare className="h-32 w-32 mx-auto text-[#00FF41]" />
          </div>
          <p className="text-3xl md:text-6xl font-[100] italic text-white/80 leading-tight mb-24 tracking-tight border-x border-white/5 px-12 italic">
            "{service.socialProof.quote}"
          </p>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-8 mb-8 scale-110">
              <div className="h-[2px] w-16 bg-[#00FF41]/40" />
              <h4 className="text-[14px] font-[1000] tracking-[1em] text-[#00FF41] uppercase italic">{service.socialProof.author}</h4>
              <div className="h-[2px] w-16 bg-[#00FF41]/40" />
            </div>
            <div className="flex items-center gap-10 text-[11px] font-black text-white/20 uppercase tracking-[0.6em] italic italic">
              {service.socialProof.company} <span className="text-[#00FF41]/20">//</span> SECTOR_COMMAND_v12
            </div>
          </div>
        </div>
      </HUDSection>

      {/* Final Deployment CTA */}
      <section className="py-40 md:py-80 bg-black border-t border-white/5 relative overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#00FF41]/10 blur-[200px] rounded-full pointer-events-none"
        />
        <div className="container px-4 relative z-10">
          <div className="bg-white/[0.01] border border-white/5 rounded-[5rem] p-16 md:p-60 relative overflow-hidden group shadow-[0_0_150px_rgba(0,0,0,1)]">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00FF41]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#00FF41]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            {/* HUD Bracket Corners */}
            <div className="absolute inset-12 pointer-events-none opacity-20">
              <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-[#00FF41]" />
              <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-[#00FF41]" />
            </div>

            <div className="relative z-10 text-center max-w-5xl mx-auto">
              <span className="text-[12px] font-[1000] tracking-[1.5em] text-[#00FF41] mb-16 block uppercase italic italic">MISSION_CONTROL // FINAL_SYNC</span>
              <h2 className="text-6xl md:text-[12vw] font-[1000] text-white uppercase italic tracking-tighter mb-20 leading-[0.8] transition-all duration-1000 group-hover:scale-105 group-hover:rotate-[-2deg]">
                READY_FOR <br /> <span className="text-white/10 group-hover:text-[#00FF41] transition-colors duration-1000">DEPLOYMENT?</span>
              </h2>
              <p className="text-white/40 text-xl md:text-4xl font-light mb-32 italic max-w-3xl mx-auto border-y border-white/5 py-12 italic">
                "Establish your digital perimeter with our elite security protocols. Absolute sovereignty is non-negotiable in high-stakes environments."
              </p>

              <Magnetic strength={0.3}>
                <Button size="lg" className="h-32 px-24 rounded-full bg-white text-black font-[1000] uppercase tracking-[0.6em] text-[16px] hover:bg-[#00FF41] transition-all shadow-[0_40px_100px_rgba(255,255,255,0.15)] group/cta relative overflow-hidden" asChild>
                  <Link href="/contact" className="flex items-center gap-10">
                    <span className="relative z-10 flex items-center gap-10">
                      TALK_TO_COMMAND <LucideIcons.ArrowRight className="h-8 w-8 group-hover/cta:translate-x-8 transition-transform duration-500" />
                    </span>
                    <div className="absolute inset-0 bg-[#00FF41] translate-y-full group-hover/cta:translate-y-0 transition-transform duration-700 pointer-events-none" />
                  </Link>
                </Button>
              </Magnetic>

              <div className="mt-20 flex flex-col items-center gap-4 opacity-5 italic">
                <span className="text-[9px] font-black tracking-widest uppercase">ENCRYPT_LINK_ESTABLISHED_RSA_2048</span>
                <div className="flex gap-12">
                  {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-2 w-2 bg-[#00FF41] rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
