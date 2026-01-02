
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Shield, KeyRound, Siren, Code, Activity, Target, Zap, Globe, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const tools = [
  {
    title: 'DarkCheck',
    description: 'Deep-web intelligence module. Scans global data breaches for compromised identities.',
    logo: '/images/tools/darkcheck.svg',
    href: 'https://darkcheck.denti.systems',
    tag: 'INTEL_NODE'
  },
  {
    title: 'LeakScan',
    description: 'Automated exposure analysis. Identifies misconfigured assets and leakage points.',
    logo: '/images/tools/leakscan.svg',
    href: 'https://leakscan.denti.systems',
    tag: 'SURFACE_RECON'
  },
  {
    title: 'PhishRisk',
    description: 'Domain integrity assessment. Generates high-fidelity risk scores for external targets.',
    logo: '/images/tools/phishrisk.svg',
    href: 'https://phishrisk.denti.systems',
    tag: 'VALIDATION_UNIT'
  },
  {
    title: 'Password Leaker',
    description: 'Credential validation service. Checks for leaked password hashes in the sovereign collective.',
    logo: '/images/tools/passwordleaker.svg',
    href: 'https://passwordleaker.denti.systems',
    tag: 'CRYPT_VALID'
  }
];

const stats = [
  { label: 'NODES_CONNECTED', value: '04', delta: '+1', color: 'text-[#00FF41]' },
  { label: 'INTEL_QUERIES', value: '1,284', delta: '+12%', color: 'text-white' },
  { label: 'THREAT_SCORE', value: 'LOW', delta: 'STABLE', color: 'text-[#00FF41]' },
];

import GlitchText from '@/components/GlitchText';
import HUDSection from '@/components/HUDSection';
import TechnicalIcon from '@/components/TechnicalIcon';
import CyberGrid from '@/components/CyberGrid';

export default function DashboardOverviewPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-32 md:space-y-48 pb-20 relative">
      <CyberGrid />
      <div className="relative z-10 space-y-32 md:space-y-48">
        {/* Hero Welcome */}
        <div className="max-w-5xl relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-6 mb-10">
              <TechnicalIcon icon={Activity} glowColor="#00FF41" className="scale-50 origin-left" />
              <span className="text-[10px] font-black tracking-[1em] text-[#00FF41] uppercase">OVERVIEW // COMMAND_DIRECTIVE</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-[900] tracking-tighter text-white uppercase italic leading-[0.8] mb-12">
              <GlitchText text="WELCOME_BACK" /> <br /> <span className="text-white/10"><GlitchText text={user?.displayName?.split(' ')[0] || 'OPERATOR'} /></span>
            </h1>
            <p className="max-w-2xl text-white/30 text-xl md:text-2xl font-light leading-relaxed italic border-l border-white/5 pl-10">
              "Your digital perimeter is currently under active monitoring. Tactical assets are fully synchronized and ready for command deployment."
            </p>
          </motion.div>
        </div>

        {/* Stats HUD */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/[0.01] border border-white/5 rounded-[3rem] p-12 backdrop-blur-3xl relative overflow-hidden group hover:border-[#00FF41]/30 transition-all duration-700"
            >
              <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity duration-700">
                <Activity className="h-24 w-24 text-white" />
              </div>
              <div className="text-[9px] font-black tracking-[0.8em] text-white/20 uppercase mb-8 group-hover:text-[#00FF41] transition-colors">{stat.label}</div>
              <div className="flex items-baseline gap-6 relative z-10">
                <div className={`text-5xl md:text-6xl font-black italic tracking-tighter uppercase ${stat.color} group-hover:scale-105 transition-transform origin-left`}>
                  {stat.value}
                </div>
                <div className="text-[11px] font-black text-[#00FF41] tracking-widest bg-[#00FF41]/10 px-3 py-1 rounded-full">{stat.delta}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 24/7 Telemetry Visualization */}
        <HUDSection label="LIVE_TELEMETRY // SOVEREIGN_MESH" className="mx-0 p-0 md:p-0 border-none bg-transparent rounded-none">
          <div className="bg-white/[0.01] border border-white/5 rounded-[5rem] p-12 md:p-24 relative overflow-hidden h-[500px] md:h-[600px]">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0, 255, 65, 0.2) 1px, transparent 0)`,
                backgroundSize: '50px 50px'
              }} />
            </div>

            <div className="relative h-full w-full flex items-center justify-center">
              {/* Pulsing Core */}
              <div className="h-40 w-40 rounded-full bg-[#00FF41]/5 border border-[#00FF41]/10 flex items-center justify-center relative">
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full bg-[#00FF41]/10 blur-2xl"
                />
                <TechnicalIcon icon={Activity} glowColor="#00FF41" className="scale-125" />
              </div>

              {/* Orbital Nodes with Parallax-like Depth */}
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <motion.div
                  key={i}
                  initial={{ rotate: angle }}
                  animate={{ rotate: angle + 360 }}
                  transition={{ duration: 40 + i * 10, repeat: Infinity, ease: "linear" }}
                  className="absolute h-[350px] w-[350px] md:h-[450px] md:w-[450px] pointer-events-none"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 group">
                    <div className="h-3 w-3 rounded-full bg-white/10 group-hover:bg-[#00FF41] transition-colors" />
                    <motion.div
                      animate={{ height: [30, 60, 30] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.7 }}
                      className="w-px bg-gradient-to-b from-white/20 via-transparent to-transparent mx-auto mt-4"
                    />
                  </div>
                </motion.div>
              ))}

              <div className="absolute bottom-12 left-12 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="h-2 w-2 bg-[#00FF41] rounded-full animate-pulse shadow-[0_0_10px_#00FF41]" />
                  <span className="text-[11px] font-black text-white/40 tracking-[0.5em] uppercase italic">SYSTEM_STABLE</span>
                </div>
                <div className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase leading-none">
                  <GlitchText text="NO_THREATS_DETECTED" />
                </div>
              </div>

              <div className="absolute top-12 right-12 text-right hidden md:block">
                <div className="text-[9px] font-black text-white/10 tracking-[1.2em] uppercase mb-4">LATENCY_CORE</div>
                <div className="text-3xl font-black text-[#00FF41] italic tracking-tighter">1.2ms</div>
              </div>
            </div>
          </div>
        </HUDSection>

        {/* Tool Arsenal */}
        <div className="space-y-20">
          <div className="flex items-center gap-10 px-4">
            <TechnicalIcon icon={Zap} glowColor="#00FF41" className="scale-50 origin-left" />
            <h2 className="text-[11px] font-black tracking-[1em] text-white uppercase italic whitespace-nowrap">TACTICAL_ARSENAL</h2>
            <div className="h-px flex-grow bg-white/5" />
          </div>

          <div className="grid gap-12 sm:grid-cols-2">
            {tools.map((tool, idx) => (
              <motion.a
                href={tool.href}
                key={tool.title}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
                className="group"
              >
                <div className="bg-white/[0.01] border border-white/5 rounded-[4rem] p-16 h-full hover:bg-white/[0.03] hover:border-[#00FF41]/30 transition-all duration-700 backdrop-blur-3xl relative overflow-hidden flex flex-col items-start text-left shadow-2xl">
                  <div className="absolute top-0 right-0 p-16 opacity-[0.02] scale-[2] rotate-12 group-hover:opacity-[0.06] transition-all duration-1000">
                    <Image src={tool.logo} alt={tool.title} width={128} height={128} className="grayscale" />
                  </div>

                  <div className="mb-12 flex items-center justify-between w-full relative z-10">
                    <div className="h-24 w-24 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center p-6 group-hover:border-[#00FF41]/40 transition-all duration-700 overflow-hidden shadow-2xl">
                      <Image src={tool.logo} alt={tool.title} width={64} height={64} className="grayscale brightness-200 group-hover:grayscale-0 transition-all duration-1000" />
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-[10px] font-black text-[#00FF41] tracking-[0.5em] uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                        LINK_ESTABLISHED
                      </span>
                      <span className="text-[9px] font-black text-white/5 tracking-[0.6em] uppercase group-hover:text-white/20 transition-colors">
                        {tool.tag} // VALIDATED
                      </span>
                    </div>
                  </div>

                  <h3 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter mb-8 group-hover:translate-x-6 transition-transform duration-700 relative z-10">
                    {tool.title}
                  </h3>
                  <p className="text-white/30 text-xl font-light leading-relaxed italic mb-12 group-hover:text-white/50 transition-colors duration-700 relative z-10 max-w-md">
                    "{tool.description}"
                  </p>

                  <div className="mt-auto flex items-center gap-6 text-[12px] font-black text-[#00FF41]/40 tracking-[0.6em] uppercase group-hover:text-[#00FF41] transition-all relative z-10">
                    INITIALIZE_SCAN
                    <ArrowRight className="h-6 w-6 transform group-hover:translate-x-6 transition-transform duration-700" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Activity Log - Minimal HUD */}
        <div className="pt-20">
          <div className="flex items-center gap-10 mb-16 px-4">
            <TechnicalIcon icon={Activity} glowColor="#00FF41" className="scale-50 origin-left" />
            <h2 className="text-[11px] font-black tracking-[1em] text-white uppercase italic whitespace-nowrap">ACTIVITY_LOGS</h2>
            <div className="h-px flex-grow bg-white/5" />
          </div>
          <div className="space-y-6 font-mono text-[11px] text-white/10 uppercase tracking-[0.3em] px-4 max-w-4xl">
            <div className="flex justify-between items-center py-4 border-b border-white/[0.03] group hover:text-[#00FF41] transition-all cursor-default">
              <span className="flex items-center gap-4">
                <div className="h-1 w-1 bg-white/20 group-hover:bg-[#00FF41] rounded-full" />
                Establishing encrypted handshake with Southern_Grid_Node...
              </span>
              <span className="font-black">[SUCCESS]</span>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-white/[0.03] group hover:text-[#00FF41] transition-all cursor-default">
              <span className="flex items-center gap-4">
                <div className="h-1 w-1 bg-white/20 group-hover:bg-[#00FF41] rounded-full" />
                Polling global data breach telemetry via LeakScan_API...
              </span>
              <span className="font-black text-[#00FF41]">[NOMINAL]</span>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-white/[0.03] group hover:text-[#00FF41] transition-all cursor-default">
              <span className="flex items-center gap-4">
                <div className="h-1 w-1 bg-white/20 group-hover:bg-[#00FF41] rounded-full" />
                Broadcasting sovereign mesh sync across 4 local points...
              </span>
              <span className="font-black">1.2ms_LATENCY</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
