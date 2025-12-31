
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight, Globe, Shield, Target, Activity, Zap, Box, Network, Building2, Droplets, Factory, Radio, ShieldAlert, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import RevealText from '@/components/RevealText';
import Magnetic from '@/components/Magnetic';
import TechnicalIcon from '@/components/TechnicalIcon';

const verticalMarkets = [
  {
    name: "Financial Institutions",
    slug: "financial-services",
    description: "Hardening high-frequency trading engines and sovereign banking substrates against algorithmic exploitation and nation-state traversal.",
    icon: Activity,
    tag: "FIN_TECH // SECURE_CORE",
    metrics: ["0.2ms Latency", "99.999% Sync"]
  },
  {
    name: "Health Telemetry",
    slug: "healthcare",
    description: "Absolute patient privacy enforced across distributed EMR mesh networks. HIPAA-Zero protocols for the modern medical industrial complex.",
    icon: Shield,
    tag: "BIO_INTEL // DATA_LOCK",
    metrics: ["AES-512 Enc", "HIPAA_V7"]
  },
  {
    name: "Sovereign Government",
    slug: "government",
    description: "Multi-layered defense for critical public infrastructure. Protective shielding for digital voting, tax substrates, and identity nodes.",
    icon: Target,
    tag: "CIVIC_SHIELD // PROTOCOL",
    metrics: ["GovCloud Sync", "FIPS_140-3"]
  },
  {
    name: "Critical Infrastructure",
    slug: "energy-utilities",
    description: "Deep-packet inspection and hardware-level isolation for SCADA systems, power grids, and water treatment substrates.",
    icon: Droplets,
    tag: "POWER_MESH // SCADA_HARD",
    metrics: ["Deep_DPI", "Grid_Lock"]
  },
  {
    name: "Tactical Manufacturing",
    slug: "manufacturing",
    description: "Protecting proprietary assembly logic and IoT sensor telemetry from industrial espionage and supply-chain poisoning.",
    icon: Factory,
    tag: "IND_BASE // LOGIC_GUARD",
    metrics: ["IoT_Shield", "Supply_Scan"]
  }
];

const operationalCases = [
  {
    name: "Zero Trust Mesh",
    slug: "zero-trust-architecture",
    description: "Moving beyond perimeters. Every node is an island. Every packet is interrogated. Real-time identity validation across the entire substrate.",
    icon: Network,
    tech: "ZTA_v9.2"
  },
  {
    name: "Sync Compliance",
    slug: "compliance",
    description: "Real-time, automated audit logs for GDPR, SOC2, and ISO certifications. Continuous verification instead of point-in-time assessments.",
    icon: Building2,
    tech: "AUTO_AUDIT"
  },
  {
    name: "Offensive Recon",
    slug: "threat-intelligence",
    description: "Proactive adversary hunting. We deploy simulated attack units to stress-test your defensive mesh before the real breach occurs.",
    icon: Zap,
    tech: "STRESS_HUNT"
  },
  {
    name: "Neural Defense",
    slug: "ai-security",
    description: "Adversarial AI mitigation. Protecting your large-language models from prompt injection and logical poisoning at scale.",
    icon: Cpu,
    tech: "AI_WARDEN"
  }
];

import GlitchText from '@/components/GlitchText';

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-black pt-24 md:pt-40 pb-20 overflow-hidden relative">
      <div className="container px-4 relative z-10">
        <div className="max-w-7xl mb-12 md:mb-32 relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center gap-10 md:gap-12 mb-8 md:mb-12">
              <TechnicalIcon icon={Target} glowColor="#00FF41" className="scale-75 origin-left" />
              <RevealText text="STRATEGIC_SECTOR_MAPPING // V9.4" className="text-[10px] font-bold tracking-[1.2em] text-[#00FF41] uppercase" />
            </div>
            <h1 className="text-5xl md:text-8xl lg:text-[160px] font-[900] tracking-[-0.05em] text-white uppercase italic leading-[0.7] mb-12 md:mb-16">
              <GlitchText text="SECTOR" /> <br /> <span className="text-white/10"><GlitchText text="PROTOCOLS." /></span>
            </h1>
            <p className="max-w-4xl text-white/40 text-xl md:text-3xl font-light italic leading-relaxed">
              "Tactical architectures engineered for the most demanding industrial risk profiles. Absolute digital sovereignty starts at the sector baseline."
            </p>
          </motion.div>
        </div>

        {/* Vertical Markets - Wide Experimental Strips */}
        <section className="mb-32 md:mb-60 lg:mb-80 overflow-hidden">
          <div className="flex items-center gap-8 md:gap-12 mb-16 md:mb-32">
            <h2 className="text-[10px] font-black tracking-[1em] text-[#00FF41] uppercase italic whitespace-nowrap">BLOCK_01 // INDUSTRIAL_VERTICALS</h2>
            <div className="h-px flex-grow bg-white/10" />
          </div>

          <div className="space-y-16">
            {verticalMarkets.map((item, idx) => (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href={`/solutions/vertical-markets/${item.slug}`} className="group block">
                  <div className="bg-white/[0.01] border border-white/5 rounded-[3rem] md:rounded-[6rem] p-10 md:px-24 md:py-24 hover:bg-white/[0.04] hover:border-[#00FF41]/40 transition-all duration-1000 flex flex-col lg:flex-row gap-12 lg:gap-24 items-center justify-between relative overflow-hidden group/card">
                    {/* Industrial ID Label */}
                    <div className="absolute top-10 right-20 text-[8px] font-black text-white/5 uppercase tracking-[0.5em] group-hover/card:text-[#00FF41]/20 transition-colors">
                      STRAT_NODE // 0{idx + 1}
                    </div>

                    <div className="absolute top-0 right-0 p-12 md:p-24 opacity-[0.02] group-hover:opacity-[0.08] transition-opacity duration-1000">
                      <item.icon className="h-64 w-64 md:h-96 md:w-96 text-white" />
                    </div>

                    <div className="flex flex-col lg:flex-row items-center gap-24 flex-grow relative z-10">
                      <div className="shrink-0">
                        <TechnicalIcon icon={item.icon as any} glowColor="#00FF41" className="scale-150" />
                      </div>
                      <div className="max-w-3xl text-center lg:text-left">
                        <div className="text-[11px] font-black tracking-[0.8em] text-[#00FF41] mb-8 uppercase italic group-hover:translate-x-6 transition-transform duration-700">{item.tag}</div>
                        <h3 className="text-5xl md:text-8xl font-[900] text-white italic uppercase tracking-tighter mb-10 group-hover:translate-x-10 transition-transform duration-1000 leading-none">{item.name}</h3>
                        <p className="text-white/30 text-xl md:text-2xl font-light italic leading-relaxed max-w-2xl">{item.description}</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-center lg:items-end gap-16 shrink-0 relative z-10">
                      <div className="space-y-6">
                        {item.metrics.map((metric, i) => (
                          <div key={i} className="flex items-center gap-6 text-[10px] font-black text-white/10 tracking-[0.4em] uppercase italic group-hover:text-[#00FF41]/60 transition-colors">
                            <div className="h-1.5 w-1.5 rounded-full bg-current" />
                            {metric}
                          </div>
                        ))}
                      </div>
                      <Magnetic>
                        <div className="h-28 w-28 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-[#00FF41] transition-all group-hover:scale-110 shadow-[0_20px_60px_rgba(255,255,255,0.1)] group-hover:shadow-[0_20px_80px_rgba(0,255,65,0.3)] duration-700">
                          <ArrowRight className="h-12 w-12" />
                        </div>
                      </Magnetic>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Operational Use Cases - Asymmetric Dashboard Modules */}
        <section className="mb-24 md:mb-60 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-16 md:gap-32 items-end mb-16 md:mb-40">
            <div>
              <RevealText text="BLOCK_02 // OPERATIONAL_LOGIC" className="text-[10px] font-black tracking-[1em] text-[#00FF41] mb-8 md:mb-12 block" />
              <h2 className="text-5xl md:text-8xl lg:text-[140px] font-[900] text-white uppercase italic tracking-tighter leading-[0.8] mb-8 md:mb-12">DEEP <br /> <span className="text-white/20">UTILITY.</span></h2>
            </div>
            <p className="text-white/30 text-xl md:text-2xl font-light italic leading-relaxed max-w-xl">
              "Advanced deployments that operate across different industrial silos to establish an absolute security baseline."
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {operationalCases.map((item, idx) => (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <Link href={`/solutions/operational-use-cases/${item.slug}`} className="block h-full">
                  <div className="bg-white/[0.01] border border-white/10 rounded-[3rem] md:rounded-[5rem] p-10 md:p-16 h-full flex flex-col justify-between hover:bg-white/[0.04] hover:border-[#00FF41]/40 transition-all duration-1000 relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 p-16 opacity-[0.01] group-hover:opacity-[0.05] transition-opacity duration-1000">
                      <item.icon className="h-40 w-40 md:h-48 md:w-48 text-white" />
                    </div>

                    <div className="relative z-10">
                      <div className="mb-16">
                        <TechnicalIcon icon={item.icon as any} glowColor="#00FF41" className="scale-110 origin-left" />
                      </div>
                      <div className="text-[9px] font-black text-white/10 tracking-[0.6em] mb-4 uppercase italic group-hover:text-[#00FF41] transition-colors">{item.tech}</div>
                      <h3 className="text-4xl font-[900] text-white italic uppercase tracking-tighter mb-8 group-hover:translate-x-4 transition-transform duration-700 leading-tight">{item.name}</h3>
                      <p className="text-white/30 text-lg font-light italic leading-relaxed mb-12">{item.description}</p>
                    </div>

                    <div className="pt-12 border-t border-white/5 flex items-center justify-between group-hover:border-[#00FF41]/20 transition-colors">
                      <span className="text-[10px] font-black text-white/10 tracking-[0.4em] uppercase group-hover:text-[#00FF41]/60 transition-colors">VIEW_DECON</span>
                      <ArrowRight className="h-5 w-5 text-white/10 group-hover:text-[#00FF41] transition-all transform group-hover:translate-x-2" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Sector HUD Footer */}
        <div className="mt-40 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 opacity-20">
          <div className="text-[10px] font-black tracking-[0.8em] text-white uppercase font-mono italic">SOLUTIONS_INDEX_v9.4 // POLLING_ACTIVE</div>
          <div className="flex gap-16 text-[10px] font-black tracking-[0.8em] text-white uppercase italic text-center md:text-right">
            " SOVEREIGNTY THROUGH STRATEGIC HARDENING. "
          </div>
        </div>
      </div>
    </div>
  );
}
