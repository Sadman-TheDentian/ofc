
'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Activity, Server, Globe, ShieldCheck, Zap, AlertTriangle, RefreshCcw } from "lucide-react";
import TechnicalIcon from "@/components/TechnicalIcon";

const systems = [
  { name: "CORE_API", status: "Operational", uptime: "99.99%", latency: "14ms", color: "text-[#00FF41]" },
  { name: "DENTIGRID_NODES", status: "Operational", uptime: "100%", latency: "2ms", color: "text-[#00FF41]" },
  { name: "DARKCHECK_SYNC", status: "Operational", uptime: "99.95%", latency: "128ms", color: "text-[#00FF41]" },
  { name: "Sovereign_AUTH", status: "Degraded", uptime: "98.4%", latency: "450ms", color: "text-orange-500" },
  { name: "INTEL_STREAM", status: "Operational", uptime: "99.99%", latency: "8ms", color: "text-[#00FF41]" },
  { name: "LEAKSCAN_ENGINE", status: "Operational", uptime: "99.98%", latency: "34ms", color: "text-[#00FF41]" },
];

export default function StatusPage() {
  return (
    <div className="min-h-screen bg-black pt-40 pb-20 overflow-hidden">
      <div className="container px-4">
        <div className="max-w-7xl mb-60 relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <Link href="/" className="group flex items-center gap-3 text-[10px] font-black text-white/30 uppercase tracking-[0.5em] mb-16 hover:text-[#00FF41] transition-colors">
              <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-2 transition-transform" />
              BAK_TO_COLLECTIVE
            </Link>
            <div className="flex items-center gap-8 mb-12">
              <TechnicalIcon icon={Activity} glowColor="#00FF41" className="scale-75 origin-left" />
              <span className="text-[10px] font-black tracking-[1.2em] text-[#00FF41] uppercase">SYSTEM_STATE // REALTIME_TELEMETRY</span>
            </div>
            <h1 className="text-7xl md:text-[14vw] font-[900] tracking-[-0.05em] text-white uppercase italic leading-[0.7] mb-16">
              SERVICE <br /><span className="text-white/10">STATUS.</span>
            </h1>
            <div className="flex flex-wrap items-center gap-12">
              <div className="flex items-center gap-6">
                <div className="h-4 w-4 bg-[#00FF41] rounded-full animate-pulse shadow-[0_0_20px_#00FF41]" />
                <span className="text-xl font-[900] text-white tracking-[0.2em] uppercase italic">SYSTEM_OPERATIONAL_EFFICIENCY: 98.4%</span>
              </div>
              <div className="text-[11px] font-black text-white/20 tracking-[0.5em] uppercase bg-white/5 px-8 py-3 rounded-full border border-white/10 flex items-center gap-4">
                <RefreshCcw className="h-4 w-4 animate-spin-slow" />
                NEXT_SYNC_IN: 14s
              </div>
            </div>
          </motion.div>
        </div>

        {/* Status Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 px-4 mb-60">
          {systems.map((sys, idx) => (
            <motion.div
              key={sys.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white/[0.01] border border-white/10 rounded-[4rem] p-16 backdrop-blur-3xl group hover:bg-white/[0.03] hover:border-[#00FF41]/30 transition-all duration-700"
            >
              <div className="flex justify-between items-start mb-12">
                <div className="text-[10px] font-black tracking-[0.5em] text-white/30 uppercase group-hover:text-[#00FF41] transition-colors">{sys.name}</div>
                <div className={`text-[9px] font-black tracking-[0.4em] uppercase ${sys.color} border border-current px-4 py-1.5 rounded-full`}>{sys.status}</div>
              </div>
              <div className="grid grid-cols-2 gap-12">
                <div>
                  <div className="text-[9px] font-black text-white/10 tracking-[0.4em] uppercase mb-2">UPTIME</div>
                  <div className="text-3xl font-[900] text-white italic tracking-tighter">{sys.uptime}</div>
                </div>
                <div>
                  <div className="text-[9px] font-black text-white/10 tracking-[0.4em] uppercase mb-2">LATENCY</div>
                  <div className="text-3xl font-[900] text-white italic tracking-tighter">{sys.latency}</div>
                </div>
              </div>
              {/* Visual Telemetry Line */}
              <div className="h-1 w-full bg-white/5 mt-10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="h-full w-1/3 bg-gradient-to-r from-transparent via-[#00FF41]/20 to-transparent"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Incident Log */}
        <section className="px-4">
          <div className="flex items-center gap-6 mb-16">
            <h2 className="text-[10px] font-black tracking-[0.6em] text-white uppercase italic whitespace-nowrap">INCIDENT_LOGS</h2>
            <div className="h-px flex-grow bg-white/5" />
          </div>
          <div className="space-y-4">
            <div className="bg-white/[0.02] border-l-4 border-l-orange-500 p-10 rounded-[2rem] flex flex-col md:flex-row justify-between items-center gap-8 group">
              <div className="max-w-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  <span className="text-[10px] font-black tracking-widest text-orange-500 uppercase italic">DEGRADED_PERFORMANCE // Sovereign_AUTH</span>
                </div>
                <p className="text-white/30 text-sm font-light leading-relaxed font-mono">
                  Investigating increased latency in global authentication token validation. Our engineers are rerouting traffic to redundant clusters in SG-1.
                </p>
              </div>
              <div className="text-[9px] font-black text-white/10 tracking-widest uppercase group-hover:text-white/40 transition-colors">OCT_30_20:45_UTC</div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
