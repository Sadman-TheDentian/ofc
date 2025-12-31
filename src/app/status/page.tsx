
'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Activity, Server, Globe, ShieldCheck, Zap, AlertTriangle, RefreshCcw, Network, Cpu, ShieldAlert, Wifi } from "lucide-react";
import TechnicalIcon from "@/components/TechnicalIcon";
import RevealText from "@/components/RevealText";

const systems = [
  { name: "CORE_API", status: "Operational", uptime: "99.99%", latency: "14ms", color: "#00FF41", icon: Cpu },
  { name: "DENTIGRID_NODES", status: "Operational", uptime: "100%", latency: "2ms", color: "#00FF41", icon: Network },
  { name: "DARKCHECK_SYNC", status: "Operational", uptime: "99.95%", latency: "128ms", color: "#00FF41", icon: ShieldCheck },
  { name: "Sovereign_AUTH", status: "Degraded", uptime: "98.4%", latency: "450ms", color: "#f97316", icon: ShieldAlert },
  { name: "INTEL_STREAM", status: "Operational", uptime: "99.99%", latency: "8ms", color: "#00FF41", icon: Wifi },
  { name: "LEAKSCAN_ENGINE", status: "Operational", uptime: "99.98%", latency: "34ms", color: "#00FF41", icon: Server },
];

export default function StatusPage() {
  return (
    <div className="min-h-screen bg-black pt-24 md:pt-40 pb-20 overflow-hidden relative">
      <div className="container px-4 relative z-10">
        <div className="max-w-7xl mb-24 md:mb-60 relative">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="/" className="group flex items-center gap-3 text-[10px] font-black text-white/30 uppercase tracking-[0.5em] mb-16 hover:text-[#00FF41] transition-colors px-4">
              <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-2 transition-transform" />
              BAK_TO_COLLECTIVE
            </Link>

            <div className="flex items-center gap-8 mb-12">
              <TechnicalIcon icon={Activity} glowColor="#00FF41" className="scale-75 origin-left" />
              <RevealText text="SYSTEM_STATE // REALTIME_TELEMETRY" className="text-[10px] font-black tracking-[1.2em] text-[#00FF41] uppercase" />
            </div>

            <h1 className="text-5xl md:text-8xl lg:text-[160px] font-[900] tracking-[-0.05em] text-white uppercase italic leading-[0.7] mb-12 md:mb-16">
              SERVICE <br /><span className="text-white/10">STATUS.</span>
            </h1>

            <div className="flex flex-wrap items-center gap-8 md:gap-16 border-t border-white/5 pt-12">
              <div className="flex items-center gap-6 md:gap-8 group">
                <div className="h-3 w-3 bg-[#00FF41] rounded-full animate-pulse shadow-[0_0_20px_#00FF41]" />
                <div>
                  <div className="text-[8px] font-black text-white/20 tracking-widest uppercase mb-1">AGGREGATE_EFFICIENCY</div>
                  <div className="text-xl md:text-2xl font-[900] text-white tracking-[0.1em] uppercase italic group-hover:text-[#00FF41] transition-colors">98.4%_NOMINAL</div>
                </div>
              </div>
              <div className="text-[11px] font-black text-white/20 tracking-[0.5em] uppercase bg-white/[0.03] px-10 py-4 rounded-full border border-white/10 flex items-center gap-6 hover:border-[#00FF41]/30 transition-all cursor-crosshair">
                <RefreshCcw className="h-4 w-4 animate-spin-slow text-[#00FF41]" />
                RECON_SYNC_IN: 14s
              </div>
            </div>
          </motion.div>
        </div>

        {/* Status Grid - Advanced Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-32 md:mb-60">
          {systems.map((sys, idx) => (
            <motion.div
              key={sys.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.8 }}
              className="bg-white/[0.01] border border-white/10 rounded-[3rem] md:rounded-[4rem] p-8 md:p-16 backdrop-blur-3xl group hover:bg-white/[0.04] hover:border-[#00FF41]/30 transition-all duration-700 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                <sys.icon className="h-32 w-32 text-white" />
              </div>

              <div className="flex justify-between items-start mb-16 relative z-10">
                <div className="space-y-2">
                  <span className="text-[8px] font-black text-white/10 tracking-[0.4em] uppercase">SYSTEM_NODE</span>
                  <div className="text-xl font-black tracking-[0.3em] text-white/60 uppercase group-hover:text-white transition-colors italic">{sys.name}</div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="h-1.5 w-8 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      className="h-full bg-current"
                      style={{ color: sys.color }}
                    />
                  </div>
                  <span className="text-[9px] font-black tracking-widest uppercase italic" style={{ color: sys.color }}>{sys.status}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-12 relative z-10">
                <div className="space-y-3">
                  <div className="text-[9px] font-black text-white/10 tracking-[0.5em] uppercase">UPTIME</div>
                  <div className="text-4xl font-[900] text-white italic tracking-tighter group-hover:text-[#00FF41] transition-colors">{sys.uptime}</div>
                </div>
                <div className="space-y-3">
                  <div className="text-[9px] font-black text-white/10 tracking-[0.5em] uppercase">LATENCY</div>
                  <div className="text-4xl font-[900] text-white italic tracking-tighter group-hover:text-[#00FF41] transition-colors">{sys.latency}</div>
                </div>
              </div>

              {/* Data Pulse Line */}
              <div className="h-px w-full bg-white/5 mt-16 relative overflow-hidden">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, ease: "linear" }}
                  className="h-full w-24 bg-gradient-to-r from-transparent via-[#00FF41]/40 to-transparent"
                />
              </div>
            </motion.div>
          ))}
        </div>

        <section className="mb-32 md:mb-60 overflow-hidden">
          <div className="flex items-center gap-8 mb-16 md:mb-24">
            <h2 className="text-[10px] font-black tracking-[1em] text-white/20 uppercase italic whitespace-nowrap">INCIDENT_ARCHIVE</h2>
            <div className="h-px flex-grow bg-white/5" />
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-white/[0.02] border border-white/10 border-l-4 border-l-orange-500/50 p-8 md:p-16 lg:p-20 rounded-r-[3rem] flex flex-col lg:flex-row justify-between items-center gap-12 group hover:bg-white/[0.04] transition-all overflow-hidden"
            >
              <div className="max-w-3xl">
                <div className="flex items-center gap-6 mb-8">
                  <AlertTriangle className="h-6 w-6 text-orange-500 animate-pulse" />
                  <div>
                    <span className="text-[10px] font-black tracking-[0.4em] text-orange-500 uppercase italic">DEGRADED_PERFORMANCE // Sovereign_AUTH</span>
                    <div className="h-px w-full bg-orange-500/20 mt-2" />
                  </div>
                </div>
                <p className="text-white/40 text-lg md:text-xl font-light italic leading-relaxed font-mono">
                  "Investigating periodic latency spikes in global authentication token validation clusters. Engineering units are rerouting primary traffic through SHARD_04 (Singapore) to mitigate downstream impact on DentiGrid node synchronization."
                </p>
              </div>
              <div className="shrink-0 text-center lg:text-right">
                <div className="text-xl md:text-2xl font-black text-white/10 tracking-tighter mb-2 group-hover:text-white/20 transition-colors">20:45_UTC</div>
                <div className="text-[9px] font-bold text-white/5 tracking-[0.5em] uppercase italic">STAMP: 2024-10-30</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* HUD Footnote */}
        <div className="mt-40 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 opacity-20">
          <div className="text-[10px] font-black tracking-[0.8em] text-white uppercase font-mono italic">SYSTEM_TELEMETRY_v9.4 // POLLING_ACTIVE</div>
          <div className="flex gap-16 text-[10px] font-black tracking-[0.8em] text-white uppercase italic text-center md:text-right">
            " CONSTANT VIGILANCE IS THE ONLY UPTIME. "
          </div>
        </div>
      </div>
    </div>
  );
}
