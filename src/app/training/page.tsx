
'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { GraduationCap, Zap, ShieldCheck, Cpu, ArrowLeft, ArrowRight, MousePointer2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import RevealText from "@/components/RevealText";
import Magnetic from "@/components/Magnetic";
import TechnicalIcon from "@/components/TechnicalIcon";
import CyberGrid from "@/components/CyberGrid";

const trainingModules = [
  {
    title: "Offensive Operations Analyst",
    level: "L1 // BASIC",
    duration: "40 HOURS",
    description: "Foundational training in adversary simulation, reconnaissance methodologies, and exploit delivery systems.",
    icon: Zap,
    color: "#00FF41"
  },
  {
    title: "Sovereign Systems Architect",
    level: "L2 // ADVANCED",
    duration: "60 HOURS",
    description: "Architecting zero-trust environments and defensive substrate layers for critical national infrastructure.",
    icon: ShieldCheck,
    color: "#0066FF"
  },
  {
    title: "Neural-Threat Researcher",
    level: "L3 // ELITE",
    duration: "120 HOURS",
    description: "Deep research into AI-driven phishing, automated malware evolution, and predictive threat modeling.",
    icon: Cpu,
    color: "#FF3300"
  }
];

export default function TrainingPage() {
  return (
    <div className="min-h-screen bg-black pt-24 md:pt-40 pb-20 overflow-hidden relative">
      <CyberGrid />
      <div className="container px-4 relative z-10">
        {/* Academic Header */}
        <div className="max-w-7xl mb-12 md:mb-32 relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center gap-8 mb-8 md:mb-12">
              <div className="h-0.5 w-16 bg-[#00FF41]" />
              <RevealText text="CAPACITY_BUILDING_NODE" className="text-[10px] font-bold tracking-[1.2em] text-[#00FF41] uppercase" />
            </div>
            <h1 className="text-5xl md:text-8xl lg:text-[160px] font-[900] tracking-[-0.05em] text-white uppercase italic leading-[0.7] mb-12 md:mb-16">
              FORGE <br /><span className="text-white/10">OPERATORS.</span>
            </h1>
            <p className="max-w-4xl text-white/40 text-xl md:text-3xl font-light italic leading-relaxed">
              Certification protocols engineered to elevate defensive and offensive capacity at scale.
            </p>
          </motion.div>
        </div>

        {/* Immersive Module Grid */}
        <div className="grid lg:grid-cols-12 gap-16 md:gap-32">
          {trainingModules.map((module, idx) => (
            <motion.div
              key={module.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className={`lg:col-span-${idx === 2 ? '12' : '6'} group`}
            >
              <div className="bg-white/[0.01] border border-white/10 rounded-[3rem] md:rounded-[6rem] p-8 md:p-16 lg:p-24 flex flex-col h-full hover:bg-white/[0.03] hover:border-[#00FF41]/20 transition-all duration-700 relative overflow-hidden">
                <div className="flex flex-col md:flex-row gap-16 items-start justify-between relative z-10 mb-16">
                  <div className="scale-125">
                    <TechnicalIcon icon={module.icon as any} glowColor={module.color} />
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_12px_rgba(239,68,68,0.8)]" />
                      <span className="text-[10px] font-black text-red-500 tracking-[0.5em] uppercase">LIMITED_SLOTS</span>
                    </div>
                    <div className="text-[11px] font-black text-[#00FF41] tracking-[0.5em] uppercase mb-4">{module.level}</div>
                    <div className="text-[10px] font-black text-white/20 tracking-[0.5em] uppercase">{module.duration} // MANDATORY</div>
                  </div>
                </div>

                <div className="relative z-10">
                  <h2 className="text-4xl md:text-7xl font-[900] text-white italic uppercase tracking-tighter mb-12 leading-[0.8] group-hover:translate-x-8 transition-transform duration-700">
                    {module.title}
                  </h2>
                  <p className="max-w-xl text-white/30 text-xl font-light italic leading-relaxed mb-20">
                    {module.description}
                  </p>
                </div>

                <div className="mt-auto relative z-10">
                  <Magnetic>
                    <Button size="lg" className="h-20 md:h-24 px-12 md:px-16 rounded-full bg-white text-black font-[900] uppercase text-[10px] md:text-[12px] tracking-[0.5em] hover:bg-[#00FF41] transition-all group-hover:shadow-[0_0_50px_rgba(0,255,65,0.2)]">
                      INITIATE_MODULE <ArrowRight className="ml-6 h-4 w-4 md:h-6 md:w-6" />
                    </Button>
                  </Magnetic>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
