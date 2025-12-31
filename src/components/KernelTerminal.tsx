
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Activity, Cpu, Shield } from 'lucide-react';

const LOG_MESSAGES = [
    "INITIALIZING_SOVEREIGN_LINK...",
    "NODE_SYNC_v7.4_ACTIVE",
    "DECRYPTING_PACKET_STREAM...",
    "ZERO_TRUST_LAYER_ENGAGED",
    "THREAT_NEUTRALIZED_BY_SENTINEL",
    "NEURAL_MESH_RECONFIGURING...",
    "DATA_INTEGRITY_VERIFIED_SHA256",
    "SUBSTRATE_HEALTH: NOMINAL",
    "LATENCY: 0.02ms_OPTIMIZED",
    "ENCRYPTION_AESGCM_ACTIVE"
];

export default function KernelTerminal() {
    const [logs, setLogs] = useState<string[]>([]);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            const newLog = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
            setLogs(prev => [...prev.slice(-4), `> ${newLog}`]);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="fixed bottom-12 right-12 z-[90] hidden lg:block"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="absolute bottom-20 right-0 w-80 bg-black/80 backdrop-blur-3xl border border-white/10 rounded-2xl p-6 shadow-2xl overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#00FF41]/5 to-transparent pointer-events-none" />
                        <div className="flex items-center gap-3 mb-4 border-b border-white/5 pb-4">
                            <Terminal className="h-3 w-3 text-[#00FF41]" />
                            <span className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase">CORE_KERNEL_v1.2</span>
                        </div>
                        <div className="space-y-2 font-mono text-[9px] uppercase tracking-widest leading-relaxed">
                            {logs.map((log, idx) => (
                                <div key={idx} className={idx === logs.length - 1 ? "text-[#00FF41]" : "text-white/20"}>
                                    {log}
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 flex justify-between items-center opacity-20">
                            <div className="flex gap-1">
                                {[1, 2, 3].map(i => <div key={i} className="h-0.5 w-3 bg-white" />)}
                            </div>
                            <Activity className="h-3 w-3 text-white" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="h-14 w-14 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center backdrop-blur-xl group hover:border-[#00FF41]/40 transition-all"
            >
                <div className="relative">
                    <div className="absolute inset-0 bg-[#00FF41] blur-xl opacity-0 group-hover:opacity-20 transition-opacity" />
                    <Cpu className="h-5 w-5 text-white/40 group-hover:text-[#00FF41] transition-colors" />
                </div>
            </motion.button>
        </div>
    );
}
