
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

import GlitchText from '@/components/GlitchText';
import HUDSection from '@/components/HUDSection';

export default function ServiceDetailClient({ service }: { service: Service }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  if (!service) {
    notFound();
  }

  return (
    <div ref={containerRef} className="flex flex-col bg-black min-h-screen relative overflow-hidden">
      {/* Cinematic Hero */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-40">
        <div className="absolute inset-0 z-0">
          <SafeImage
            src={service.imageUrl}
            alt={service.title}
            fill
            className="object-cover opacity-15 grayscale scale-110"
            data-ai-hint={service.imageHint}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black" />

          {/* Background Architectural Grid */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }} />
        </div>

        <div className="container relative z-10 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 md:mb-32"
          >
            <div className="flex items-center justify-center gap-10 mb-12 md:mb-16">
              <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-[#00FF41]" />
              <span className="text-[11px] font-black tracking-[1em] text-[#00FF41] uppercase">
                CAPABILITY_NODE // v7.4
              </span>
              <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-[#00FF41]" />
            </div>

            <h1 className="text-5xl md:text-8xl lg:text-[140px] font-[900] tracking-[-0.05em] text-white uppercase italic leading-[0.7] mb-12 md:mb-20">
              {service.title.split(' ').map((word, i) => (
                <GlitchText key={i} text={word + ' '} className={i % 2 !== 0 ? "text-white/20" : "text-white"} />
              ))}
            </h1>

            <p className="max-w-4xl mx-auto text-white/40 text-xl md:text-4xl font-light italic leading-relaxed mb-16 md:mb-24 px-4">
              "{service.description}"
            </p>

            <div className="flex flex-wrap gap-10 justify-center">
              <Button size="lg" className="h-24 px-16 rounded-full bg-white text-black font-black uppercase text-[12px] tracking-[0.4em] hover:bg-[#00FF41] transition-all shadow-[0_20px_80px_rgba(255,255,255,0.15)] hover:shadow-[0_20px_100px_rgba(0,255,65,0.4)]" asChild>
                <Link href="/contact">INITIATE_DEPLOYMENT <LucideIcons.ArrowRight className="ml-6 h-6 w-6" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="h-24 px-16 rounded-full border-white/10 text-white/40 hover:text-white hover:bg-white/5 uppercase text-[12px] tracking-[0.4em] backdrop-blur-3xl transition-all" asChild>
                <Link href="/contact">ACQUIRE_SPECS</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* HUD Line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00FF41]/40 to-transparent" />
      </section>

      {/* Challenge Section - Instrumental Minimalism */}
      <section className="py-40 md:py-60 bg-black relative border-b border-white/5">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-32 md:gap-48 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-6 mb-10">
                <span className="text-[10px] font-black tracking-[0.5em] text-[#00FF41] uppercase">01 // THE_CHALLENGE</span>
                <div className="h-px flex-grow bg-white/5" />
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic leading-[0.85] mb-12 tracking-tighter">
                {service.challenge.title}
              </h2>
              <p className="text-white/30 text-xl md:text-2xl font-light italic leading-relaxed max-w-xl">
                {service.challenge.description}
              </p>
            </motion.div>

            {service.challenge.stat && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative group h-full flex items-center justify-center lg:justify-end"
              >
                <div className="absolute -inset-20 bg-[#00FF41]/10 rounded-full blur-[120px] pointer-events-none group-hover:opacity-100 opacity-0 transition-opacity duration-1000" />
                <div className="text-right flex flex-col items-end">
                  <div className="flex items-center gap-4 mb-4 opacity-40">
                    <div className="h-px w-10 bg-white" />
                    <span className="text-[10px] font-black tracking-[0.4em] uppercase">CRITICAL_METRIC</span>
                  </div>
                  <div className="text-[140px] md:text-[240px] font-black leading-none text-white/5 group-hover:text-white transition-all duration-1000 tracking-tighter cursor-default italic">
                    {service.challenge.stat}
                  </div>
                  <p className="text-[12px] font-black text-white/10 tracking-[0.8em] uppercase mt-8 italic group-hover:text-[#00FF41] transition-colors">{service.challenge.statLabel}</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Capabilities Section - High-Fidelity Grid */}
      <section className="py-40 md:py-60 bg-black">
        <div className="container px-4">
          <div className="max-w-4xl mb-32 md:mb-48">
            <span className="text-[10px] font-black tracking-[0.6em] text-[#00FF41] mb-10 block uppercase">02 // CAPABILITIES</span>
            <h2 className="text-5xl md:text-8xl font-black text-white uppercase italic leading-none mb-12 tracking-tighter">
              TACTICAL <span className="text-white/20">SOLUTIONS</span>
            </h2>
            <div className="h-px w-full bg-gradient-to-r from-[#00FF41]/40 via-white/5 to-transparent" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
            {service.capabilities.map((cap, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="bg-white/[0.01] border border-white/5 rounded-[3.5rem] p-12 md:p-16 h-full hover:bg-white/[0.03] hover:border-[#00FF41]/30 transition-all duration-700 relative overflow-hidden group">
                  {/* Subtle technical background */}
                  <div className="absolute inset-0 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#00FF41 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }} />
                  </div>

                  <div className="absolute top-0 right-0 p-10 md:p-12">
                    <Icon name={cap.icon} className="h-16 w-16 text-white/5 group-hover:text-[#00FF41] transition-colors duration-700" />
                  </div>
                  <div className="text-[9px] font-black text-[#00FF41]/40 group-hover:text-[#00FF41] transition-colors uppercase tracking-[0.5em] mb-12">NODE_ALPHA_{index + 1}</div>
                  <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-8 group-hover:translate-x-4 transition-transform duration-700 italic">{cap.title}</h3>
                  <p className="text-white/20 text-lg font-light italic leading-relaxed group-hover:text-white/60 transition-colors duration-700">{cap.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytical Process Section */}
      <section className="py-40 md:py-60 bg-black border-y border-white/5 overflow-hidden">
        <div className="container px-4">
          <div className="flex flex-col lg:flex-row gap-24 md:gap-40 items-start">
            <div className="lg:w-1/3 sticky top-32">
              <span className="text-[10px] font-black tracking-[0.6em] text-[#00FF41] mb-10 block uppercase">03 // ARCHITECTURE</span>
              <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic leading-[0.85] mb-12 tracking-tighter">
                THE <span className="text-white/20">PROCESS.</span>
              </h2>
              <p className="text-white/30 text-xl font-light italic leading-relaxed max-w-sm">
                "A rigorous, multi-layered methodology engineered for mission success in the most hostile digital environments."
              </p>

              <div className="mt-20 flex items-center gap-6 opacity-20">
                <div className="h-px w-20 bg-white" />
                <span className="text-[8px] font-black tracking-[0.5em] uppercase italic">VERIFIED_PROTOCOL</span>
              </div>
            </div>

            <div className="lg:w-2/3 space-y-16 md:space-y-24">
              {service.approach.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col md:flex-row gap-12 md:gap-20 group"
                >
                  <div className="flex-shrink-0 w-28 h-28 rounded-full border border-white/5 bg-white/[0.01] flex items-center justify-center text-4xl font-black text-white/5 group-hover:text-[#00FF41] group-hover:border-[#00FF41]/30 transition-all duration-700 italic shadow-2xl">
                    {item.step}
                  </div>
                  <div className="pt-4 flex-grow">
                    <h3 className="text-4xl font-black text-white uppercase tracking-tighter mb-8 group-hover:translate-x-6 transition-transform duration-700 italic">{item.title}</h3>
                    <p className="text-white/30 text-xl font-light italic leading-relaxed mb-12 max-w-2xl">{item.description}</p>
                    <div className="h-[1px] w-full bg-white/5 group-hover:bg-[#00FF41]/20 transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof - Atmospheric HUD Wrapper */}
      <HUDSection label="TRUST_TELEMETRY" className="my-40 md:my-60 py-40 md:py-60 flex items-center justify-center text-center mx-4">
        <div className="max-w-5xl mx-auto px-4">
          <div className="mb-12 opacity-10">
            <LucideIcons.Quote className="h-20 w-20 mx-auto transform rotate-180" />
          </div>
          <p className="text-3xl md:text-5xl font-light italic text-white/80 leading-relaxed mb-20 tracking-tight">
            "{service.socialProof.quote}"
          </p>
          <div className="flex flex-col items-center">
            <h4 className="text-[12px] font-black tracking-[0.8em] text-[#00FF41] uppercase mb-4 italic">{service.socialProof.author}</h4>
            <div className="flex items-center gap-6 text-[10px] font-black text-white/20 uppercase tracking-[0.4em] italic">
              <div className="h-px w-8 bg-white/10" />
              {service.socialProof.company} // SECTOR_COMMAND
              <div className="h-px w-8 bg-white/10" />
            </div>
          </div>
        </div>
      </HUDSection>

      {/* Final Deployment CTA */}
      <section className="py-40 md:py-60 bg-black border-t border-white/5">
        <div className="container px-4">
          <div className="bg-[#00FF41]/5 border border-[#00FF41]/20 rounded-[4rem] p-16 md:p-40 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00FF41]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="relative z-10 text-center max-w-4xl mx-auto">
              <span className="text-[10px] font-black tracking-[1em] text-[#00FF41] mb-12 block uppercase">MISSION_CONTROL</span>
              <h2 className="text-6xl md:text-9xl font-[900] text-white uppercase italic tracking-tighter mb-16 leading-[0.8] transition-transform duration-700 group-hover:scale-105">
                READY_FOR <br /> <span className="text-[#00FF41]">DEPLOYMENT?</span>
              </h2>
              <p className="text-white/40 text-xl md:text-3xl font-light mb-20 italic max-w-2xl mx-auto">
                "Establish your digital perimeter with our elite security protocols. Absolute sovereignty is non-negotiable."
              </p>
              <Button size="lg" className="h-28 px-20 rounded-full bg-white text-black font-black uppercase tracking-[0.5em] text-[15px] hover:bg-[#00FF41] transition-all shadow-[0_20px_80px_rgba(255,255,255,0.1)] hover:shadow-[0_20px_100px_rgba(0,255,65,0.4)]" asChild>
                <Link href="/contact">TALK_TO_COMMAND <LucideIcons.ArrowRight className="ml-8 h-8 w-8" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
