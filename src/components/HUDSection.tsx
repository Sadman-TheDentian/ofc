
'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface HUDSectionProps {
    children: ReactNode;
    label?: string;
    className?: string;
}

export default function HUDSection({ children, label, className = "" }: HUDSectionProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`relative p-8 md:p-16 border border-white/5 bg-white/[0.01] rounded-[3rem] group overflow-hidden ${className}`}
        >
            {/* HUD Brackets */}
            <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-white/10 group-hover:border-[#00FF41]/30 transition-all duration-700" />
            <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-white/10 group-hover:border-[#00FF41]/30 transition-all duration-700" />
            <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-white/10 group-hover:border-[#00FF41]/30 transition-all duration-700" />
            <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-white/10 group-hover:border-[#00FF41]/30 transition-all duration-700" />

            {/* Metadata */}
            {label && (
                <div className="absolute top-8 left-20 flex items-center gap-4 opacity-20 group-hover:opacity-100 transition-opacity">
                    <div className="h-px w-8 bg-[#00FF41]" />
                    <span className="text-[10px] font-black tracking-[0.5em] text-[#00FF41] uppercase">{label}</span>
                </div>
            )}

            {/* Grid Background */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none group-hover:opacity-[0.04] transition-opacity">
                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>

            <div className="relative z-10">
                {children}
            </div>
        </motion.section>
    );
}
