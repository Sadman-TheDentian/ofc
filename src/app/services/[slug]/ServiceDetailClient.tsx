
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
    <div ref={containerRef} className="flex flex-col bg-black min-h-screen">
      {/* Cinematic Hero */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <SafeImage
            src={service.imageUrl}
            alt={service.title}
            fill
            className="object-cover opacity-20 grayscale"
            data-ai-hint={service.imageHint}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />

          {/* Neural lines/particles would go here */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }} />
        </div>

        <div className="container relative z-10 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <span className="text-[10px] font-bold tracking-[0.6em] text-[#00FF41] uppercase block mb-6">
              SERVICE_PROTOCOL // ARCHIVE_v4.2
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-9xl font-[900] tracking-[-0.06em] text-white uppercase leading-[0.8] mb-12 max-w-6xl mx-auto"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {service.title.split(' ').map((word, i) => (
              <span key={i} className={i % 2 !== 0 ? "text-white/20" : "text-white"}>{word} </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="max-w-2xl mx-auto text-white/40 text-lg md:text-xl font-light italic leading-relaxed"
          >
            "{service.description}"
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-16 flex flex-wrap gap-8 justify-center"
          >
            <Button size="lg" className="h-16 px-12 rounded-full bg-white text-black font-black uppercase tracking-[0.2em] text-[11px] hover:bg-[#00FF41] transition-all shadow-2xl" asChild>
              <Link href="/contact">INITIATE DEPLOYMENT</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-16 px-12 rounded-full border-white/10 text-white/60 hover:text-white hover:bg-white/5 tracking-[0.2em] text-[11px] uppercase backdrop-blur-3xl" asChild>
              <Link href="/contact">ACQUIRE SPECIFICATIONS</Link>
            </Button>
          </motion.div>
        </div>

        {/* HUD Line */}
        <div className="absolute bottom-0 left-0 right-0 hud-line opacity-20" />
      </section>

      {/* Challenge Section - Instrumental Minimalism */}
      <section className="py-40 bg-black border-b border-white/5">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <span className="text-[10px] font-bold tracking-[0.5em] text-[#00FF41] mb-8 block uppercase">01 // THE_CHALLENGE</span>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic leading-tight mb-8">
                {service.challenge.title}
              </h2>
              <p className="text-white/30 text-xl font-light leading-relaxed max-w-xl">
                {service.challenge.description}
              </p>
            </motion.div>

            {service.challenge.stat && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative group h-full flex items-center justify-center lg:justify-end"
              >
                <div className="absolute -inset-20 bg-[#00FF41]/5 rounded-full blur-[100px] pointer-events-none group-hover:opacity-100 opacity-0 transition-opacity duration-1000" />
                <div className="text-right">
                  <div className="text-[140px] md:text-[200px] font-black leading-none text-white/5 group-hover:text-white transition-colors duration-1000 tracking-tighter cursor-default">
                    {service.challenge.stat}
                  </div>
                  <p className="text-[10px] font-bold text-white/20 tracking-[0.6em] uppercase mt-4 mr-4 italic">{service.challenge.statLabel}</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Capabilities Section - High-Fidelity Grid */}
      <section className="py-40 bg-black">
        <div className="container px-4">
          <div className="max-w-3xl mb-32">
            <span className="text-[10px] font-bold tracking-[0.5em] text-[#00FF41] mb-8 block uppercase">02 // CAPABILITIES</span>
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic leading-none mb-12">
              TACTICAL <span className="text-white/20">SOLUTIONS</span>
            </h2>
            <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {service.capabilities.map((cap, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white/[0.01] border-white/5 rounded-[2.5rem] p-12 h-full hover:border-[#00FF41]/30 transition-all duration-700 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8">
                    <Icon name={cap.icon} className="h-12 w-12 text-white/5 group-hover:text-[#00FF41] transition-colors duration-700" />
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-6 mt-12 group-hover:translate-x-2 transition-transform duration-500">{cap.title}</h3>
                  <p className="text-white/30 text-base font-light leading-relaxed group-hover:text-white/50 transition-colors duration-500">{cap.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytical Process Section */}
      <section className="py-40 bg-black border-y border-white/5 overflow-hidden">
        <div className="container px-4">
          <div className="flex flex-col lg:flex-row gap-24 items-start">
            <div className="lg:w-1/3 sticky top-32">
              <span className="text-[10px] font-bold tracking-[0.5em] text-[#00FF41] mb-8 block uppercase">03 // ARCHITECTURE</span>
              <h2 className="text-5xl font-black text-white uppercase italic leading-tight mb-8">
                THE <span className="text-white/20">PROCESS</span>
              </h2>
              <p className="text-white/30 text-lg font-light leading-relaxed">
                A rigorous, multi-layered methodology engineered for mission success.
              </p>
            </div>

            <div className="lg:w-2/3 space-y-12">
              {service.approach.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-12 group"
                >
                  <div className="flex-shrink-0 w-24 h-24 rounded-full border border-white/10 flex items-center justify-center text-4xl font-black text-white/10 group-hover:text-[#00FF41] group-hover:border-[#00FF41] transition-all duration-700">
                    {item.step}
                  </div>
                  <div className="pt-4">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4 group-hover:translate-x-2 transition-transform">{item.title}</h3>
                    <p className="text-white/30 text-lg font-light leading-relaxed">{item.description}</p>
                    <div className="h-[1px] w-full bg-white/5 mt-12 group-hover:bg-white/10 transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof - Atmospheric */}
      <motion.section
        className="py-40 bg-black relative flex items-center justify-center text-center"
      >
        <div className="container px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <span className="text-[40px] md:text-[60px] font-black text-white/10 absolute -top-12 left-0 tracking-tighter leading-none italic select-none">TRUST_TELEMETRY</span>
            <p className="text-2xl md:text-4xl font-light italic text-white/80 leading-relaxed mb-16">
              "{service.socialProof.quote}"
            </p>
            <div className="flex flex-col items-center">
              <h4 className="text-[11px] font-bold tracking-[0.5em] text-[#00FF41] uppercase mb-2">{service.socialProof.author}</h4>
              <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{service.socialProof.company} // SECTOR_COMMAND</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Final Deployment CTA */}
      <section className="py-40 bg-black border-t border-white/5">
        <div className="container px-4">
          <div className="bg-[#00FF41]/5 border border-[#00FF41]/20 rounded-[3rem] p-16 md:p-32 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00FF41]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h2 className="text-5xl md:text-7xl font-[900] text-white uppercase tracking-tighter mb-8 leading-none">
                READY_FOR <br /> <span className="text-[#00FF41]">DEPLOYMENT?</span>
              </h2>
              <p className="text-white/40 text-xl font-light mb-16 italic">
                Establish your digital perimeter with our elite security protocols.
              </p>
              <Button size="lg" className="h-20 px-16 rounded-full bg-white text-black font-black uppercase tracking-[0.3em] text-[13px] hover:bg-[#00FF41] transition-all" asChild>
                <Link href="/contact">TALK_TO_COMMAND <LucideIcons.ArrowRight className="ml-4 h-6 w-6" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
