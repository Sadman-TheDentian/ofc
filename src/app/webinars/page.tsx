
'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Radio, ArrowLeft, Zap, ShieldAlert, Timer, Activity, Database, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import RevealText from "@/components/RevealText";
import Magnetic from "@/components/Magnetic";

export default function WebinarsPage() {
  const [timeLeft, setTimeLeft] = useState({ h: 24, m: 59, s: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { h: prev.h, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black pt-40 pb-20 overflow-hidden relative">
      {/* Background HUD Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
        backgroundSize: '80px 80px'
      }} />

      <div className="container px-4 relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl text-center"
        >
          <div className="flex items-center justify-center gap-6 mb-12">
            <div className="h-px w-20 bg-white/10" />
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
              <RevealText text="FREQUENCY_RECON // V7.4" className="text-[10px] font-bold tracking-[0.8em] text-white/30 uppercase" />
            </div>
            <div className="h-px w-20 bg-white/10" />
          </div>

          <h1 className="text-7xl md:text-[12vw] font-[900] tracking-tighter text-white uppercase italic leading-[0.75] mb-12">
            RECEPTION <br /><span className="text-white/20">PENDING.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-white/30 text-xl md:text-3xl font-light italic leading-relaxed mb-20">
            Scanning for upcoming tactical drills and executive deep-dives. We are currently stabilizing the broadcast frequency.
          </p>

          {/* Tactical Countdown HUD */}
          <div className="max-w-xl mx-auto mb-20 bg-white/[0.01] border border-white/5 rounded-[4rem] p-12 md:p-16 backdrop-blur-3xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-orange-500/20 group-hover:bg-orange-500/40 transition-colors" />
            <div className="flex justify-around items-center gap-8 mb-10">
              <div className="flex flex-col">
                <span className="text-6xl md:text-8xl font-black text-white italic tracking-tighter">{timeLeft.h.toString().padStart(2, '0')}</span>
                <span className="text-[10px] font-black text-white/20 tracking-widest mt-2 uppercase">HOURS</span>
              </div>
              <div className="text-4xl md:text-6xl font-black text-white/10 mb-8">:</div>
              <div className="flex flex-col">
                <span className="text-6xl md:text-8xl font-black text-white italic tracking-tighter">{timeLeft.m.toString().padStart(2, '0')}</span>
                <span className="text-[10px] font-black text-white/20 tracking-widest mt-2 uppercase">MINS</span>
              </div>
              <div className="text-4xl md:text-6xl font-black text-white/10 mb-8">:</div>
              <div className="flex flex-col">
                <span className="text-6xl md:text-8xl font-black text-[#00FF41] italic tracking-tighter">{timeLeft.s.toString().padStart(2, '0')}</span>
                <span className="text-[10px] font-black text-white/20 tracking-widest mt-2 uppercase">SECS</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 text-[9px] font-black text-[#00FF41] tracking-[0.5em] uppercase">
              <Activity className="h-3 w-3 animate-pulse" />
              NEXT_SIGNAL_LOCK_v4.0
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <Magnetic>
              <Button size="lg" className="h-20 px-16 rounded-full bg-white text-black font-black uppercase text-xs tracking-[0.4em] hover:bg-[#00FF41] transition-all shadow-2xl" asChild>
                <Link href="/">RETURN_TO_BASE</Link>
              </Button>
            </Magnetic>
            <div className="flex items-center gap-4 text-[9px] font-bold text-white/20 tracking-widest uppercase border-l border-white/10 pl-8 h-12">
              <Radio className="h-4 w-4 animate-pulse text-orange-500" />
              OFFLINE_MODE_ACTIVE
            </div>
          </div>
        </motion.div>

        {/* HUD Data Feed */}
        <div className="mt-40 grid md:grid-cols-3 gap-12 w-full max-w-5xl px-4 opacity-40">
          <div className="flex flex-col gap-4 border-l border-white/10 pl-10">
            <div className="flex items-center gap-3">
              <Terminal className="h-4 w-4" />
              <span className="text-[10px] font-black tracking-widest text-[#00FF41] uppercase">TRANS_ID</span>
            </div>
            <span className="text-sm font-black text-white italic tracking-tight lowercase">[TR_982_X_SYNC]</span>
          </div>
          <div className="flex flex-col gap-4 border-l border-white/10 pl-10">
            <div className="flex items-center gap-3">
              <Database className="h-4 w-4" />
              <span className="text-[10px] font-black tracking-widest text-[#00FF41] uppercase">CACHE_STATE</span>
            </div>
            <span className="text-sm font-black text-white italic tracking-tight lowercase">[ENCRYPTED_99.1%]</span>
          </div>
          <div className="flex flex-col gap-4 border-l border-white/10 pl-10">
            <div className="flex items-center gap-3">
              <ShieldAlert className="h-4 w-4" />
              <span className="text-[10px] font-black tracking-widest text-[#00FF41] uppercase">LINK_INTEGRITY</span>
            </div>
            <span className="text-sm font-black text-white italic tracking-tight lowercase">[NOMINAL]</span>
          </div>
        </div>
      </div>

      {/* Visual Fluff */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-10">
        <span className="text-[9px] font-bold tracking-[1em] text-white uppercase italic">SOVEREIGN_LINK_ESTABLISHED</span>
      </div>
    </div>
  );
}
