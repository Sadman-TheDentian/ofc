'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, RefreshCcw, Shield, Lock, FileText } from 'lucide-react';
import TechnicalIcon from "@/components/TechnicalIcon";
import CyberGrid from "@/components/CyberGrid";

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-black pt-24 md:pt-40 pb-20 overflow-hidden relative">
      <CyberGrid />
      <div className="container px-4 relative z-10">
        <div className="max-w-7xl mb-12 md:mb-32 relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <Link href="/" className="group flex items-center gap-3 text-[10px] font-black text-white/30 uppercase tracking-[0.5em] mb-12 md:mb-16 hover:text-[#00FF41] transition-colors px-4">
              <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-2 transition-transform" />
              BAK_TO_COLLECTIVE
            </Link>
            <div className="flex items-center gap-8 mb-8 md:mb-12">
              <TechnicalIcon icon={RefreshCcw} glowColor="#00FF41" className="scale-75 origin-left" />
              <span className="text-[10px] font-black tracking-[1.2em] text-[#00FF41] uppercase">FISCAL_PROTOCOL // REVERSION</span>
            </div>
            <h1 className="text-5xl md:text-8xl lg:text-[160px] font-[900] tracking-[-0.05em] text-white uppercase italic leading-[0.7] mb-12 md:mb-16">
              REFUND <br /><span className="text-white/10">MANUAL.</span>
            </h1>
            <p className="max-w-4xl text-white/40 text-xl md:text-3xl font-light italic leading-relaxed">
              Rules of engagement for financial reversal requests. Our commitment is transparency in every transaction.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-12 gap-24 px-4 overflow-visible">
          <aside className="lg:col-span-4 hidden lg:block sticky top-32 h-fit">
            <nav className="space-y-6">
              {["1. ELIGIBILITY", "2. SERVICE_UNITS", "3. PROCESSING", "4. DISPUTES"].map((item, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <div className="h-[1px] w-8 bg-white/10 group-hover:w-full group-hover:bg-[#00FF41] transition-all duration-700 mb-4" />
                  <span className="text-[10px] font-black tracking-[0.5em] text-white/20 group-hover:text-white transition-colors">{item}</span>
                </div>
              ))}
            </nav>
          </aside>

          <div className="lg:col-span-8 prose prose-invert max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:italic prose-headings:tracking-tighter prose-p:text-white/40 prose-p:font-light prose-p:leading-relaxed prose-li:text-white/40 prose-li:font-light prose-strong:text-white prose-strong:font-black">
            <section id="eligibility" className="mb-24">
              <h2 className="text-4xl mb-10 flex items-center gap-6">
                <span className="text-white/10">01</span> ELIGIBILITY_BOUNDARIES
              </h2>
              <p>
                Reversion of digital service fees is strictly governed by the following operational boundaries. Due to the high-compute nature of DentiSystems' offensive recon, some units are non-reversible once deployment is initiated.
              </p>
              <ul>
                <li>Initial subscription activation is 100% reversible within 24 hours if no intelligence queries have been executed.</li>
                <li>Sovereign-level custom deployments are subject to the terms of the specific MSA (Master Service Agreement).</li>
                <li>Pay-per-scan modules are non-refundable once the scanning node has established connection with the target.</li>
              </ul>
            </section>

            <section id="service_units" className="mb-24">
              <h2 className="text-4xl mb-10 flex items-center gap-6">
                <span className="text-white/10">02</span> SERVICE_UNIT_AUDIT
              </h2>
              <p>
                Every refund request triggers a mandatory telemetry audit. We will review the system logs to determine if the resources allocated (compute time, proxy nodes, decryption attempts) have been substantially utilized.
              </p>
              <div className="bg-white/[0.02] border border-white/5 p-10 rounded-[2.5rem] my-12 backdrop-blur-3xl italic">
                "If the intelligence has been delivered and viewed, the service unit is considered consumed. Refunding delivered intelligence is structurally impossible."
              </div>
            </section>

            <section id="processing" className="mb-24">
              <h2 className="text-4xl mb-10 flex items-center gap-6">
                <span className="text-white/10">03</span> PROCESSING_PHASES
              </h2>
              <p>
                Once a request is validated, processing follows these time-locked phases:
              </p>
              <ol>
                <li>Validation Audit (24-48 Hours)</li>
                <li>Finance Unit Trigger (12 Hours)</li>
                <li>Gateway Sync (3-7 Business Days)</li>
              </ol>
            </section>

            <section id="disputes" className="pb-40">
              <h2 className="text-4xl mb-10 flex items-center gap-6">
                <span className="text-white/10">04</span> DISPUTE_CHANNELS
              </h2>
              <p>
                All financial disputes should be channeled directly to our Legal Unit at <strong>billing@denti.systems</strong>. Bypassing this protocol with external chargebacks will result in immediate and permanent termination of all sovereign node access.
              </p>
            </section>
          </div>
        </div>

        {/* HUD Assurance */}
        <div className="mt-40 pt-12 border-t border-white/5 flex justify-between items-center opacity-10">
          <div className="text-[8px] font-bold tracking-[0.5em] text-white uppercase font-mono">FISCAL_UNIT_LOGS // READY</div>
          <p className="text-[8px] font-bold tracking-[0.4em] text-white uppercase italic">" TRANSPARENCY IS THE ROOT OF STABILITY. "</p>
        </div>
      </div>
    </div>
  );
}
