
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Shield, Star, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from 'react';
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
    <div className="min-h-screen bg-black pt-40 pb-20">
      <div className="container px-4">
        <div className="max-w-7xl mb-60 relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center gap-8 mb-12">
              <div className="h-0.5 w-16 bg-white/20" />
              <span className="text-[10px] font-[900] tracking-[1.2em] text-[#00FF41] block uppercase">FINANCIAL_MODEL // ECONOMICS</span>
            </div>
            <h1 className="text-7xl md:text-[14vw] font-[900] tracking-[-0.05em] text-white uppercase italic leading-[0.7] mb-16">
              SERVICE <br /><span className="text-white/10">ECONOMICS.</span>
            </h1>
            <p className="max-w-4xl text-white/40 text-2xl md:text-4xl font-light italic leading-relaxed">
              Precision engineering requires transparent resource allocation. Choose the protocol that aligns with your operational requirements.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-16 max-w-7xl mx-auto items-end mt-40">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="h-full"
            >
              <Card
                className={cn(
                  "flex flex-col h-full bg-white/[0.01] border-white/10 rounded-[5rem] p-16 hover:bg-white/[0.03] hover:border-[#00FF41]/30 transition-all duration-700 relative overflow-hidden group backdrop-blur-3xl",
                  plan.isFeatured && "bg-white/[0.02] border-[#00FF41]/40 shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
                )}
              >
                {plan.isFeatured && (
                  <div className="absolute top-0 right-0 p-12">
                    <div className="bg-[#00FF41] text-black text-[10px] font-[900] uppercase tracking-[0.3em] px-6 py-2 rounded-full shadow-[0_0_30px_rgba(0,255,65,0.4)]">
                      MOST_DEPLOYED
                    </div>
                  </div>
                )}

                <CardHeader className="p-0 mb-16">
                  <h3 className="text-[11px] font-[900] tracking-[0.5em] text-[#00FF41]/40 uppercase mb-8 group-hover:text-[#00FF41] transition-colors">{plan.name}</h3>
                  <div className="flex items-baseline gap-4 mb-8">
                    <span className="text-7xl font-[900] text-white italic tracking-tighter">{plan.price}</span>
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">{plan.period}</span>
                  </div>
                  <p className="text-white/40 text-xl font-light leading-relaxed italic line-clamp-2">
                    "{plan.description}"
                  </p>
                </CardHeader>

                <CardContent className="p-0 flex-grow mb-20">
                  <div className="h-px w-16 bg-white/10 mb-12" />
                  <ul className="space-y-8">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-6 group/item">
                        <div className="h-2 w-2 bg-[#00FF41]/40 rounded-full group-hover/item:scale-150 group-hover/item:bg-[#00FF41] transition-all shadow-[0_0_10px_rgba(0,255,65,0.2)]" />
                        <span className="text-sm font-black text-white/30 group-hover/item:text-white transition-colors uppercase italic tracking-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="p-0">
                  <Button asChild size="lg" className={cn(
                    "h-24 w-full rounded-full transition-all duration-500 font-[900] uppercase tracking-[0.5em] text-[12px] shadow-2xl",
                    plan.variant === 'primary'
                      ? "bg-white text-black hover:bg-[#00FF41]"
                      : "bg-white/5 text-white hover:bg-white/10"
                  )}>
                    <Link href={plan.href} className="flex items-center justify-center gap-4">
                      {plan.cta}
                      {plan.variant === 'primary' && <ArrowRight className="h-6 w-6" />}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* HUD Assurance Line */}
        <div className="mt-40 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 opacity-20">
          <div className="flex items-center gap-6 text-[8px] font-bold tracking-[0.6em] text-white uppercase">
            <span>ENCRYPTED_CHECKOUT // ACTIVE</span>
            <div className="h-1 w-1 bg-[#00FF41] rounded-full animate-pulse" />
          </div>
          <div className="flex gap-12 text-[8px] font-bold tracking-[0.5em] text-white uppercase italic">
            " Security is not a product, but a process. "
          </div>
        </div>
      </div>
    </div>
  );
}
