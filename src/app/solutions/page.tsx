
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight, Globe, Shield, Target, Activity, Zap, Box, Network } from 'lucide-react';
import { motion } from 'framer-motion';
import RevealText from '@/components/RevealText';
import Magnetic from '@/components/Magnetic';
import TechnicalIcon from '@/components/TechnicalIcon';

const solutions = {
  "VERTICAL_MARKETS": [
    { name: "Financial Services", slug: "financial-services", description: "Secure banking platforms, trading applications, and customer data with our specialized fintech security solutions.", icon: Activity },
    { name: "Healthcare", slug: "healthcare", description: "Ensure HIPAA compliance and protect sensitive patient data with resilient security for EMR systems and telehealth platforms.", icon: Shield },
    { name: "Government", slug: "government", description: "Fortify public sector infrastructure against nation-state threats with our hardened security and compliance frameworks.", icon: Target },
    { name: "Retail", slug: "retail", description: "Protect e-commerce platforms and customer payment information from breaches and fraud with PCI-DSS compliant solutions.", icon: Box }
  ],
  "OPERATIONAL_USE_CASES": [
    { name: "Zero Trust Architecture", slug: "zero-trust-architecture", description: "Implement a modern security model that verifies every user and device, drastically reducing the attack surface.", icon: Network },
    { name: "Compliance Automation", slug: "compliance", description: "Streamline adherence to regulations like GDPR, HIPAA, and PCI-DSS with our automated compliance and reporting tools.", icon: Shield },
    { name: "Threat Intelligence", slug: "threat-intelligence", description: "Integrate real-time threat feeds and proactive threat hunting into your security operations for an attacker's advantage.", icon: Zap }
  ]
};

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-black pt-40 pb-20 overflow-hidden">
      <div className="container px-4">
        {/* Sector Map Header */}
        <div className="max-w-7xl mb-60 relative">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-8 mb-12">
              <div className="h-0.5 w-16 bg-[#00FF41]" />
              <RevealText text="STRATEGIC_SECTOR_HARDENING" className="text-[10px] font-bold tracking-[1.2em] text-[#00FF41] uppercase" />
            </div>
            <h1 className="text-7xl md:text-[14vw] font-[900] tracking-[-0.05em] text-white uppercase italic leading-[0.7] mb-16">
              SECTOR <br /> <span className="text-white/10">MAPPING.</span>
            </h1>
            <p className="max-w-3xl text-white/40 text-2xl md:text-3xl font-light italic leading-relaxed">
              Tailored offense and defense architectures engineered for specific industrial risk-profiles.
            </p>
          </motion.div>
        </div>

        {/* Vertical Markets - Wide Experimental Strips */}
        <section className="mb-60">
          <div className="flex items-center gap-8 mb-20">
            <span className="text-[10px] font-black tracking-[0.5em] text-[#00FF41] uppercase">UN_01 // VERTICAL_PROTOCOLS</span>
            <div className="h-px flex-grow bg-white/5" />
          </div>

          <div className="grid gap-12">
            {solutions.VERTICAL_MARKETS.map((item, idx) => (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link href={`/solutions/vertical-markets/${item.slug}`} className="group block">
                  <div className="bg-white/[0.01] border border-white/10 rounded-[5rem] p-12 md:px-24 md:py-20 hover:bg-white/[0.03] hover:border-[#00FF41]/30 transition-all duration-700 flex flex-col md:flex-row gap-16 items-center justify-between">
                    <div className="flex items-center gap-16 flex-grow">
                      <div>
                        <TechnicalIcon icon={item.icon as any} glowColor="#00FF41" className="scale-110" />
                      </div>
                      <div className="max-w-2xl">
                        <h3 className="text-5xl font-[900] text-white italic uppercase tracking-tighter mb-6 group-hover:translate-x-6 transition-transform duration-500 leading-none">{item.name}</h3>
                        <p className="text-white/30 text-xl font-light italic leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                    <Magnetic>
                      <div className="h-20 w-20 rounded-full border border-white/10 flex items-center justify-center text-white/20 group-hover:text-black group-hover:bg-[#00FF41] transition-all group-hover:border-[#00FF41] group-hover:scale-110">
                        <ArrowRight className="h-8 w-8" />
                      </div>
                    </Magnetic>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Operational Use Cases - Asymmetric Dashboard Modules */}
        <section className="mb-40">
          <div className="grid lg:grid-cols-2 gap-20 items-end mb-24">
            <div>
              <span className="text-[10px] font-black tracking-[0.5em] text-[#00FF41] uppercase mb-8 block">UN_02 // CROSS_DOMAIN_CAPACITY</span>
              <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none">OPERATIONAL <br /> <span className="text-white/20">LOGIC</span></h2>
            </div>
            <p className="text-white/30 text-lg font-light italic leading-relaxed">
              Advanced deployments that operate across different industrial silos to establish a universal security baseline.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {solutions.OPERATIONAL_USE_CASES.map((item, idx) => (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group lg:odd:mt-32 lg:even:mb-32"
              >
                <Link href={`/solutions/operational-use-cases/${item.slug}`} className="block h-full">
                  <div className="bg-white/[0.02] border border-white/10 rounded-[6rem] p-16 h-full flex flex-col justify-between hover:bg-white/[0.05] hover:border-[#00FF41]/30 transition-all duration-700 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-16 opacity-[0.02] group-hover:opacity-[0.08] transition-opacity">
                      <item.icon className="h-40 w-40" />
                    </div>
                    <div className="mb-16">
                      <div className="mb-12">
                        <TechnicalIcon icon={item.icon as any} glowColor="#00FF41" className="scale-90 origin-left" />
                      </div>
                      <h3 className="text-4xl font-[900] text-white italic uppercase tracking-tighter mb-8 group-hover:translate-x-4 transition-transform duration-500 leading-tight">{item.name}</h3>
                      <p className="text-white/30 text-lg font-light italic leading-relaxed">{item.description}</p>
                    </div>
                    <div className="pt-12 border-t border-white/10 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <span className="text-[10px] font-black text-[#00FF41] tracking-[0.5em] uppercase">VIEW_FRAMEWORK</span>
                      <ArrowRight className="h-6 w-6" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
