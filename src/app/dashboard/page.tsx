
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
import { motion } from 'framer-motion';

const tools = [
  {
    title: 'DarkCheck',
    description: 'Deep-web intelligence module. Scans global data breaches for compromised identities.',
    icon: KeyRound,
    href: 'https://darkcheck.denti.systems',
    tag: 'INTEL_NODE'
  },
  {
    title: 'LeakScan',
    description: 'Automated exposure analysis. Identifies misconfigured assets and leakage points.',
    icon: Shield,
    href: 'https://leakscan.denti.systems',
    tag: 'SURFACE_RECON'
  },
  {
    title: 'PhishRisk',
    description: 'Domain integrity assessment. Generates high-fidelity risk scores for external targets.',
    icon: Siren,
    href: 'https://phishrisk.denti.systems',
    tag: 'VALIDATION_UNIT'
  },
  {
    title: 'Password Leaker',
    description: 'Credential validation service. Checks for leaked password hashes in the sovereign collective.',
    icon: Code,
    href: 'https://passwordleaker.denti.systems',
    tag: 'CRYPT_VALID'
  }
];

const stats = [
  { label: 'NODES_CONNECTED', value: '04', delta: '+1', color: 'text-[#00FF41]' },
  { label: 'INTEL_QUERIES', value: '1,284', delta: '+12%', color: 'text-white' },
  { label: 'THREAT_SCORE', value: 'LOW', delta: 'STABLE', color: 'text-[#00FF41]' },
];

export default function DashboardOverviewPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-20">
      {/* Hero Welcome */}
      <div className="max-w-4xl relative">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="h-1.5 w-1.5 bg-[#00FF41] rounded-full animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.8em] text-[#00FF41] uppercase">OVERVIEW // COMMAND_DIRECTIVE</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-[900] tracking-tighter text-white uppercase italic leading-none mb-8">
            WELCOME_BACK <br /> <span className="text-white/20">{user?.displayName?.split(' ')[0] || 'OPERATOR'}</span>
          </h1>
          <p className="max-w-xl text-white/30 text-lg font-light leading-relaxed italic">
            "Your digital perimeter is currently under active monitoring. Tactical assets are ready for deployment."
          </p>
        </motion.div>
      </div>

      {/* Stats HUD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/[0.01] border border-white/5 rounded-[2.5rem] p-10 backdrop-blur-3xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-[0.02]">
              <Activity className="h-20 w-20 text-white" />
            </div>
            <div className="text-[8px] font-black tracking-[0.6em] text-white/10 uppercase mb-4">{stat.label}</div>
            <div className="flex items-baseline gap-4">
              <div className={`text-4xl md:text-5xl font-black italic tracking-tighter uppercase ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-[10px] font-bold text-[#00FF41] tracking-widest">{stat.delta}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tool Arsenal */}
      <div>
        <div className="flex items-center gap-6 mb-16 px-4">
          <h2 className="text-[10px] font-black tracking-[0.6em] text-white uppercase italic whitespace-nowrap">TACTICAL_ARSENAL</h2>
          <div className="h-px flex-grow bg-white/5" />
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {tools.map((tool, idx) => (
            <motion.a
              href={tool.href}
              key={tool.title}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div className="bg-white/[0.01] border border-white/5 rounded-[3.5rem] p-12 h-full hover:border-[#00FF41]/30 transition-all duration-700 backdrop-blur-3xl relative overflow-hidden flex flex-col items-start text-left">
                <div className="absolute top-0 right-0 p-12 opacity-[0.02] scale-150 rotate-12 group-hover:opacity-[0.05] transition-opacity">
                  <tool.icon className="h-32 w-32 text-white" />
                </div>

                <div className="mb-10 flex items-center justify-between w-full relative z-10">
                  <div className="h-16 w-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-white/30 group-hover:text-[#00FF41] group-hover:border-[#00FF41]/30 transition-all duration-500">
                    <tool.icon className="h-8 w-8" />
                  </div>
                  <span className="text-[8px] font-black text-white/5 tracking-[0.5em] uppercase group-hover:text-[#00FF41]/30 transition-colors">
                    {tool.tag} // READY
                  </span>
                </div>

                <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-6 group-hover:translate-x-2 transition-transform duration-500 relative z-10">
                  {tool.title}
                </h3>
                <p className="text-white/20 text-sm font-light leading-relaxed italic mb-10 group-hover:text-white/40 transition-colors duration-500 relative z-10">
                  "{tool.description}"
                </p>

                <div className="mt-8 flex items-center gap-4 text-[10px] font-black text-[#00FF41]/40 tracking-[0.4em] uppercase group-hover:text-[#00FF41] transition-all relative z-10">
                  INITIALIZE_SCAN
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-2 transition-transform duration-500" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Activity Log - Minimal HUD */}
      <div className="pt-20">
        <div className="flex items-center gap-6 mb-16 px-4">
          <h2 className="text-[10px] font-black tracking-[0.6em] text-white uppercase italic whitespace-nowrap">ACTIVITY_LOGS</h2>
          <div className="h-px flex-grow bg-white/5" />
        </div>
        <div className="space-y-4 font-mono text-[10px] text-white/10 uppercase tracking-widest px-4">
          <div className="flex justify-between items-center py-2 border-b border-white/[0.02] group hover:text-white/30 transition-colors">
            <span>Establishing connection to Sovereign_Intell_Unit...</span>
            <span className="font-bold">[SUCCESS]</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-white/[0.02] group hover:text-white/30 transition-colors">
            <span>Checking credential leak database for global entities...</span>
            <span className="font-bold text-[#00FF41]">[NOMINAL]</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-white/[0.02] group hover:text-white/30 transition-colors">
            <span>Synchronizing local node encrypted telemetry...</span>
            <span className="font-bold">2.4ms_LAT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
