
'use client';

import { motion } from 'framer-motion';

export default function TacticalBackground() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
            {/* Heavy Grain Overlay */}
            <div
                className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0%200%20200%20200'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter%20id='noiseFilter'%3E%3CfeTurbulence%20type='fractalNoise'%20baseFrequency='0.65'%20numOctaves='3'%20stitchTiles='stitch'/%3E%3C/filter%3E%3Crect%20width='100%25'%20height='100%25'%20filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Grid Substrate */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                backgroundSize: '100px 100px'
            }} />

            {/* Atmospheric Light Leaks */}
            <motion.div
                animate={{
                    opacity: [0.1, 0.2, 0.1],
                    scale: [1, 1.1, 1],
                    x: [0, 50, 0]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-[#00FF41]/5 rounded-full blur-[160px]"
            />
            <motion.div
                animate={{
                    opacity: [0.05, 0.1, 0.05],
                    scale: [1, 1.2, 1],
                    x: [0, -50, 0]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 5 }}
                className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[160px]"
            />

            {/* Technical HUD Brackets (Corner Brackets for the whole screen) */}
            <div className="absolute top-10 left-10 w-20 h-20 border-t border-l border-white/5 opacity-20" />
            <div className="absolute top-10 right-10 w-20 h-20 border-t border-r border-white/5 opacity-20" />
            <div className="absolute bottom-10 left-10 w-20 h-20 border-b border-l border-white/5 opacity-20" />
            <div className="absolute bottom-10 right-10 w-20 h-20 border-b border-r border-white/5 opacity-20" />

            {/* Vertical Data Stream */}
            <div className="absolute left-20 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-20" />
            <div className="absolute right-20 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-20" />
        </div>
    );
}
