
'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { Book, Code2, Terminal, Shield, Search, ArrowRight, CornerDownRight, Box, Cpu } from "lucide-react";
import TechnicalIcon from "@/components/TechnicalIcon";
import { Button } from "@/components/ui/button";
import RevealText from "@/components/RevealText";
import Magnetic from "@/components/Magnetic";

const docCategories = [
  {
    title: "Integration SDK",
    count: "12 ARTICLES",
    description: "Deep technical documentation for integrating DentiGrid hooks into your proprietary infrastructure.",
    icon: Code2,
    tag: "DEV_KIT"
  },
  {
    title: "API Reference",
    count: "45 ENDPOINTS",
    description: "Full specifications for our RESTful and gRPC telemetry streams. High-throughput performance guides.",
    icon: Terminal,
    tag: "SPEC_HUB"
  },
  {
    title: "Security Protocols",
    count: "08 MANUALS",
    description: "Standard operating procedures for response containment and offensive neutralization maneuvers.",
    icon: Shield,
    tag: "OP_MANUAL"
  }
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-black pt-24 md:pt-40 pb-20 overflow-hidden relative">
      <div className="container px-4 relative z-10">
        {/* Technical Header */}
        <div className="max-w-7xl mb-12 md:mb-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center gap-8 mb-8 md:mb-12">
              <div className="h-0.5 w-16 bg-white/20" />
              <RevealText text="SYSTEM_SPECIFICATION" className="text-[10px] font-bold tracking-[1.2em] text-white/40 uppercase" />
            </div>
            <h1 className="text-5xl md:text-8xl lg:text-[160px] font-[900] tracking-[-0.05em] text-white uppercase italic leading-[0.7] mb-12 md:mb-16">
              SYSTEM <br /><span className="text-white/10">MANUALS.</span>
            </h1>
            <p className="max-w-4xl text-white/40 text-xl md:text-3xl font-light italic leading-relaxed">
              Proprietary documentation for operators deploying and maintaining DentiSystems sovereign architectures.
            </p>
          </motion.div>
        </div>

        {/* Search Command HUD */}
        <div className="max-w-5xl mx-auto mb-32 group">
          <div className="relative border-b-2 border-white/5 focus-within:border-[#00FF41]/50 transition-all py-10">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-8 text-white/10 group-focus-within:text-[#00FF41] transition-colors" />
            <input
              type="text"
              placeholder="INITIATE_KNOWLEDGE_QUERY..."
              className="w-full bg-transparent pl-16 pr-20 text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-white placeholder:text-white/5 focus:outline-none"
            />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:block">
              <span className="text-[10px] font-black tracking-[0.4em] text-white/10 group-focus-within:text-[#00FF41] transition-colors">PRESS [ENTER] TO SEARCH</span>
            </div>
          </div>
        </div>

        {/* Technical Modules List */}
        <div className="grid gap-px bg-white/5 border border-white/5 rounded-[4rem] overflow-hidden">
          {docCategories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link href={`/docs/${cat.title.toLowerCase().replace(/\s+/g, '-')}`} className="group block">
                <div className="bg-black p-16 md:px-24 md:py-20 hover:bg-white/[0.02] transition-all flex flex-col md:flex-row items-center gap-16 justify-between">
                  <div className="flex items-center gap-16 flex-grow">
                    <div className="scale-110">
                      <TechnicalIcon icon={cat.icon as any} glowColor="#00FF41" />
                    </div>
                    <div className="max-w-xl">
                      <div className="flex items-center gap-6 mb-4">
                        <span className="text-[10px] font-black text-[#00FF41] tracking-[0.5em] uppercase">{cat.tag}</span>
                        <div className="h-1.5 w-1.5 bg-white/10 rounded-full" />
                        <span className="text-[10px] font-black text-white/20 tracking-[0.5em] uppercase">{cat.count}</span>
                      </div>
                      <h3 className="text-4xl md:text-5xl font-[900] text-white italic uppercase tracking-tighter group-hover:translate-x-8 transition-transform duration-700 leading-none">{cat.title}</h3>
                      <p className="text-white/30 text-xl font-light italic mt-6">{cat.description}</p>
                    </div>
                  </div>
                  <Magnetic>
                    <div className="h-16 w-16 rounded-full border border-white/10 flex items-center justify-center text-white/20 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all">
                      <ArrowRight className="h-6 w-6" />
                    </div>
                  </Magnetic>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
