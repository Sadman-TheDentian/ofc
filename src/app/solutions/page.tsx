
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
    <div className="min-h-screen bg-black pt-24 md:pt-40 pb-20 overflow-hidden relative selection:bg-[#00FF41]/30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,65,0.02),transparent_70%)] pointer-events-none" />

      <div className="container px-4 relative z-10">
        <div className="max-w-7xl mb-12 md:mb-52 relative">
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-10 md:gap-16 mb-12 md:mb-16">
              <TechnicalIcon icon={Target} glowColor="#00FF41" className="scale-75 origin-left" />
              <RevealText text="STRATEGIC_SECTOR_MAPPING // V9.4_ACTIVE" className="text-[11px] font-[1000] tracking-[1.2em] text-[#00FF41] uppercase italic" />
            </div>
            <h1 className="text-5xl md:text-8xl lg:text-[180px] font-[1000] tracking-[-0.05em] text-white uppercase italic leading-[0.7] mb-12 md:mb-24">
              <GlitchText text="SECTOR" /> <br /> <span className="text-white/10 group-hover:text-white transition-colors duration-1000"><GlitchText text="PROTOCOLS." /></span>
            </h1>
            <p className="max-w-5xl text-white/40 text-xl md:text-5xl font-light italic leading-relaxed border-l border-white/10 pl-16 py-8 hover:border-[#00FF41]/40 transition-colors">
              "Tactical architectures engineered for the most demanding industrial risk profiles. Absolute digital sovereignty starts at the sector baseline."
            </p>
          </motion.div>

          {/* Background Layered Text */}
          <div className="absolute -bottom-40 -right-40 opacity-5 pointer-events-none select-none">
            <span className="text-[20vw] font-[1000] text-white italic tracking-tighter leading-none">STRAT_SYS</span>
          </div>
        </div>

        {/* Vertical Markets - Wide Experimental Strips */}
        <section className="mb-32 md:mb-[30vh] lg:mb-[40vh] relative">
          <div className="flex items-center gap-12 md:gap-20 mb-20 md:mb-40">
            <h2 className="text-[12px] font-[1000] tracking-[1.5em] text-[#00FF41] uppercase italic whitespace-nowrap">BLOCK_01 // INDUSTRIAL_VERTICALS</h2>
            <div className="h-[2px] flex-grow bg-gradient-to-r from-[#00FF41]/40 via-white/5 to-transparent" />
          </div>

          <div className="space-y-24 md:space-y-32">
            {verticalMarkets.map((item, idx) => (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                <Link href={`/solutions/vertical-markets/${item.slug}`} className="block relative">
                  <div className="bg-white/[0.01] border border-white/5 rounded-[4rem] md:rounded-[8rem] p-12 md:px-32 md:py-32 hover:bg-[#00FF41]/[0.02] hover:border-[#00FF41]/30 transition-all duration-1000 flex flex-col lg:flex-row gap-16 lg:gap-32 items-center justify-between relative overflow-hidden group/card shadow-[0_0_100px_rgba(0,0,0,1)]">

                    {/* HUD Corner Brackets */}
                    <div className="absolute top-16 left-16 w-16 h-16 border-t border-l border-white/5 group-hover/card:border-[#00FF41]/40 transition-colors" />

                    {/* Industrial ID Label */}
                    <div className="absolute top-16 right-32 flex flex-col items-end">
                      <span className="text-[10px] font-black text-white/5 uppercase tracking-[0.5em] group-hover/card:text-[#00FF41]/20 transition-colors">STRAT_NODE_ALPHA</span>
                      <span className="text-[12px] font-[1000] text-[#00FF41] tracking-[0.8em] italic">0{idx + 1}</span>
                    </div>

                    <div className="absolute top-1/2 right-1/4 -translate-y-1/2 opacity-[0.01] group-hover:opacity-[0.05] transition-opacity duration-1000 scale-150 rotate-12 blur-sm group-hover:blur-0 transform-gpu translate-x-32 group-hover:translate-x-0">
                      <item.icon className="h-[400px] w-[400px] text-white" />
                    </div>

                    <div className="flex flex-col lg:flex-row items-center gap-32 flex-grow relative z-10">
                      <div className="shrink-0 group-hover:rotate-12 transition-transform duration-1000 filter drop-shadow-[0_0_30px_rgba(0,255,65,0.2)]">
                        <TechnicalIcon icon={item.icon as any} glowColor="#00FF41" className="scale-[2.5]" />
                      </div>
                      <div className="max-w-4xl text-center lg:text-left">
                        <div className="flex items-center justify-center lg:justify-start gap-6 mb-10 overflow-hidden">
                          <div className="h-px w-10 bg-[#00FF41]/40 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-1000" />
                          <div className="text-[13px] font-[1000] tracking-[1em] text-[#00FF41] uppercase italic group-hover:translate-x-4 transition-transform duration-700">{item.tag}</div>
                        </div>
                        <h3 className="text-5xl md:text-[8vw] font-[1000] text-white italic uppercase tracking-tighter mb-12 group-hover:translate-x-16 transition-all duration-1000 leading-[0.85]">{item.name}</h3>
                        <p className="text-white/30 text-xl md:text-4xl font-light italic leading-relaxed max-w-3xl border-l border-white/5 pl-12 hover:border-[#00FF41]/20 transition-colors">{item.description}</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-center lg:items-end gap-24 shrink-0 relative z-10">
                      <div className="space-y-8">
                        {item.metrics.map((metric, i) => (
                          <div key={i} className="flex items-center gap-8 text-[12px] font-black text-white/10 tracking-[0.5em] uppercase italic group-hover:text-white/60 transition-all duration-1000 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" style={{ transitionDelay: `${i * 100}ms` }}>
                            <div className="h-1.5 w-8 bg-[#00FF41]/40" />
                            {metric}
                          </div>
                        ))}
                      </div>
                      <Magnetic strength={0.2}>
                        <div className="h-32 w-32 rounded-full border border-white/10 text-white flex items-center justify-center bg-white/[0.02] group-hover:bg-[#00FF41] group-hover:text-black transition-all group-hover:scale-110 shadow-2xl duration-700 relative overflow-hidden">
                          <ArrowRight className="h-12 w-12 group-hover:translate-x-4 transition-transform duration-500 relative z-10" />
                          <div className="absolute inset-0 bg-[#00FF41] translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
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
        <section className="mb-24 md:mb-[20vh] overflow-hidden relative">
          <div className="absolute -top-40 -left-60 w-[600px] h-[600px] bg-[#00FF41]/5 blur-[200px] rounded-full pointer-events-none" />
          <div className="grid lg:grid-cols-2 gap-16 md:gap-40 items-end mb-24 md:mb-60">
            <div className="relative z-10">
              <div className="flex items-center gap-10 mb-12">
                <TechnicalIcon icon={Network} glowColor="#00FF41" className="scale-75 origin-left" />
                <RevealText text="BLOCK_02 // OPERATIONAL_LOGIC_MESH" className="text-[12px] font-[1000] tracking-[1.5em] text-[#00FF41] mb-8 md:mb-12 block italic" />
              </div>
              <h2 className="text-5xl md:text-9xl lg:text-[180px] font-[1000] text-white uppercase italic tracking-tighter leading-[0.8] mb-8 md:mb-12">DEEP <br /> <span className="text-white/10 group-hover:text-white transition-colors duration-1000">UTILITY.</span></h2>
            </div>
            <p className="text-white/30 text-xl md:text-4xl font-light italic leading-relaxed max-w-2xl border-l border-white/10 pl-16 py-6 italic">
              "Advanced deployments that operate across different industrial silos to establish an absolute security baseline."
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-[5rem] overflow-hidden shadow-2xl relative z-10">
            {operationalCases.map((item, idx) => (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 1 }}
                className="group/case"
              >
                <Link href={`/solutions/operational-use-cases/${item.slug}`} className="block h-full bg-black hover:bg-[#00FF41]/[0.02] transition-colors duration-1000 relative overflow-hidden group">
                  <div className="p-12 md:p-20 h-full flex flex-col justify-between relative z-10">

                    <div className="absolute top-12 left-12 w-10 h-10 border-t border-l border-white/5 group-hover:border-[#00FF41]/20 transition-colors" />

                    <div className="absolute -top-10 -right-10 p-20 opacity-[0.01] group-hover:opacity-[0.05] transition-opacity duration-1000 scale-150 rotate-12 blur-sm group-hover:blur-0">
                      <item.icon className="h-60 w-60 text-white" />
                    </div>

                    <div className="relative z-10">
                      <div className="mb-20 flex justify-between items-center">
                        <div className="h-24 w-24 flex items-center justify-center p-6 bg-white/[0.01] border border-white/5 rounded-[2.5rem] group-hover:border-[#00FF41]/40 group-hover:bg-[#00FF41]/5 transition-all duration-700 shadow-xl overflow-hidden text-white/10 group-hover:text-[#00FF41]">
                          <item.icon className="h-10 w-10 transition-transform duration-1000 group-hover:scale-125" />
                        </div>
                        <span className="text-[11px] font-[1000] text-white/5 tracking-[0.6em] italic italic uppercase group-hover:text-[#00FF41]/20 transition-colors">v9.2</span>
                      </div>
                      <div className="text-[11px] font-[1000] text-[#00FF41]/40 tracking-[0.8em] mb-6 uppercase italic group-hover:text-[#00FF41] transition-colors">{item.tech}</div>
                      <h3 className="text-4xl md:text-5xl font-[1000] text-white italic uppercase tracking-tighter mb-10 group-hover:translate-x-8 transition-all duration-1000 leading-none">{item.name}</h3>
                      <p className="text-white/20 text-xl font-light italic leading-relaxed mb-16 border-l border-white/10 pl-10 group-hover:border-[#00FF41]/20 group-hover:text-white/40 transition-all duration-1000">{item.description}</p>
                    </div>

                    <div className="pt-16 border-t border-white/5 flex items-center justify-between group-hover:border-[#00FF41]/20 transition-colors opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-in slide-in-from-bottom-4">
                      <span className="text-[11px] font-[1000] text-[#00FF41] tracking-[0.4em] uppercase italic italic">VIEW_DECON_PROTOCOL</span>
                      <ArrowRight className="h-6 w-6 text-[#00FF41] animate-pulse" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Sector HUD Footer */}
        <div className="mt-40 md:mt-80 pt-24 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-16 md:gap-32 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#00FF41]/20 to-transparent shadow-[0_0_20px_#00FF41]" />
          <div className="text-[11px] font-[1000] tracking-[1.5em] text-white/20 uppercase italic transition-colors hover:text-[#00FF41]/40 cursor-default">SYST_SOVEREIGNTY // NODE_INDEX_v12.4_NOMINAL</div>
          <div className="flex items-center gap-10">
            <div className="h-px w-24 bg-white/5" />
            <div className="text-[12px] font-[1000] tracking-[2em] text-[#00FF41] uppercase italic text-center md:text-right blur-[0.5px] hover:blur-0 transition-all cursor-default">
              " ABSOLUTE_Sovereignty. "
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
