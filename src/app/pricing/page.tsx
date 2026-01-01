
'use client';

import { Button } from "@/components/ui/button";
import { Check, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import GlitchText from "@/components/GlitchText";
import RevealText from "@/components/RevealText";
import TechnicalIcon from "@/components/TechnicalIcon";

const plans = [
  {
    name: "PROTOCOL_ALPHA",
    price: "$0",
    period: "FOREVER",
    description: "Foundational access for independent researchers and digital pioneers.",
    features: [
      "AI Code Vector Scan",
      "Leak Detection Suite",
      "Standard Node Integration",
      "Community Intelligence Access",
    ],
    cta: "INITIALIZE_ALPHA",
    href: "/auth",
    variant: "outline"
  },
  {
    name: "PROTOCOL_ELITE",
    price: "$2.99",
    period: "PER_MONTH",
    description: "Full-spectrum offensive intelligence for high-stakes digital operations.",
    features: [
      "Access to all 5 Core Systems",
      "Infinite Throughput Protocol",
      "Real-time Neural Monitoring",
      "Priority API Deployment",
      "L1 Command Support",
    ],
    cta: "ACTIVATE_ELITE",
    href: "/dashboard/subscriptions",
    variant: "primary",
    isFeatured: true,
  },
  {
    name: "SOVEREIGN_REACH",
    price: "CUSTOM",
    period: "BESPOKE",
    description: "Bespoke architectural security for sovereign-level entities and global infrastructures.",
    features: [
      "Custom Neural Integrations",
      "On-Premise Isolated Nodes",
      "Dedicated Task Force Engineer",
      "Multi-Entity Management",
      "Sovereign-Grade SLAs",
    ],
    cta: "CONTACT_COMMAND",
    href: "/contact",
    variant: "outline"
  }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black pt-24 md:pt-40 pb-20 overflow-hidden relative">
      <div className="container px-4 relative z-10">
        <div className="max-w-7xl mb-12 md:mb-32 relative">
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -top-40 -left-60 w-96 h-96 bg-[#00FF41]/5 blur-[120px] rounded-full pointer-events-none"
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center gap-10 mb-10 md:mb-16">
              <TechnicalIcon icon={Shield} glowColor="#00FF41" className="scale-75 origin-left" />
              <RevealText text="FINANCIAL_LAYER // PROTOCOL_ECONOMICS" className="text-[10px] font-black tracking-[1.2em] text-[#00FF41] uppercase italic" />
            </div>
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-[1000] tracking-tighter text-white uppercase italic leading-[0.85] mb-12">
              SERVICE <br /><span className="text-white/20">ECONOMICS.</span>
            </h1>
            <p className="max-w-4xl text-white/60 text-lg md:text-2xl font-medium italic leading-relaxed border-l border-white/20 pl-10 py-4 mb-20">
              "Precision engineering requires transparent resource allocation. Select the protocol architecture that aligns with your operational threshold."
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-[5rem] overflow-hidden max-w-7xl mx-auto items-stretch mt-40 shadow-2xl">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="h-full bg-black group relative flex flex-col p-12 md:p-16 border-white/5"
            >
              {/* HUD Hover Corners */}
              <div className="absolute inset-0 p-12 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                <div className="absolute top-12 left-12 w-12 h-12 border-t border-l border-[#00FF41]/40" />
                <div className="absolute top-12 right-12 w-12 h-12 border-t border-r border-[#00FF41]/40" />
                <div className="absolute bottom-12 left-12 w-12 h-12 border-b border-l border-[#00FF41]/40" />
                <div className="absolute bottom-12 right-12 w-12 h-12 border-b border-r border-[#00FF41]/40" />
              </div>

              {plan.isFeatured && (
                <div className="absolute top-0 right-0 p-12 z-20">
                  <div className="bg-[#00FF41] text-black text-[9px] font-black uppercase tracking-[0.3em] px-6 py-2 rounded-full shadow-[0_0_30px_rgba(0,255,65,0.4)] animate-pulse">
                    MOST_DEPLOYED
                  </div>
                </div>
              )}

              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-16">
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-[11px] font-black tracking-[0.6em] text-[#00FF41] uppercase italic">{plan.name}</span>
                    <div className="h-px flex-grow bg-white/10" />
                  </div>
                  <div className="flex items-baseline gap-4 mb-6">
                    <span className="text-6xl md:text-8xl font-[1000] text-white italic tracking-tighter group-hover:scale-105 transition-transform duration-700">{plan.price}</span>
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">{plan.period}</span>
                  </div>
                  <p className="text-white/40 text-xl font-light leading-relaxed italic border-l border-[#00FF41]/20 pl-6">
                    "{plan.description}"
                  </p>
                </div>

                <div className="flex-grow mb-20 space-y-8">
                  <div className="text-[9px] font-black text-white/20 tracking-[0.5em] uppercase mb-8 italic">SYSTEM_CAPABILITIES //</div>
                  <ul className="space-y-8">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-6 group/item">
                        <div className="h-4 w-4 shrink-0 rounded-sm border border-white/20 flex items-center justify-center mt-1 group-hover/item:border-[#00FF41]/60 transition-colors">
                          <Check className="h-2 w-2 text-[#00FF41] opacity-40 group-hover/item:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-sm md:text-base font-black text-white/40 group-hover/item:text-white transition-colors uppercase italic tracking-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-12 border-t border-white/5">
                  <Button asChild className={cn(
                    "h-24 w-full rounded-full transition-all duration-700 font-black uppercase tracking-[0.5em] text-[12px] group/btn overflow-hidden relative",
                    plan.isFeatured
                      ? "bg-white text-black hover:bg-[#00FF41]"
                      : "bg-white/5 text-white hover:bg-white/10 hover:text-white border border-white/10 hover:border-white/20"
                  )}>
                    <Link href={plan.href} className="flex items-center justify-center gap-6 relative z-10">
                      {plan.cta}
                      <ArrowRight className="h-6 w-6 transform group-hover/btn:translate-x-4 transition-transform duration-500" />
                    </Link>
                  </Button>

                  <div className="flex justify-between mt-8 opacity-10 group-hover:opacity-40 transition-opacity">
                    <span className="text-[7px] font-black tracking-widest uppercase">SECURE_TRANS_v4.2</span>
                    <span className="text-[7px] font-black tracking-widest uppercase">STH_LINK_AL_00{idx + 1}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* HUD Assurance Line */}
        <div className="mt-40 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-8 text-[10px] font-black tracking-[0.8em] text-white/20 uppercase">
            <span className="flex items-center gap-4"><div className="h-2 w-2 bg-[#00FF41] rounded-full animate-pulse" /> ENCRYPTED_CHECKOUT // ACTIVE</span>
            <div className="h-px w-20 bg-white/10" />
            <span>AES_256_GCM_VERIFIED</span>
          </div>
          <div className="flex gap-12 text-[10px] font-black tracking-[0.6em] text-[#00FF41]/40 uppercase italic">
            " SOVEREIGN_GRADE SECURITY FOR DISTRIBUTED ENTITIES. "
          </div>
        </div>
      </div>
    </div>
  );
}
