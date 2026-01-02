
'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const SovereignMonolith = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePos({ x, y });
    };

    // Spring animations for smooth, heavy movement
    const rotateX = useSpring(mousePos.y * -30, { stiffness: 50, damping: 20 });
    const rotateY = useSpring(mousePos.x * 30, { stiffness: 50, damping: 20 });

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative w-full aspect-square flex items-center justify-center perspective-[2000px] cursor-none"
        >
            {/* Deep Atmospheric Glow */}
            <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.03),transparent_70%)] transition-opacity duration-1000 ${isHovered ? 'opacity-100' : 'opacity-40'}`} />

            {/* The Monolith Chassis */}
            <motion.div
                style={{ rotateX, rotateY }}
                className="relative w-48 h-80 preserve-3d group"
            >
                {/* Monolith Sides (Obsidian) */}
                {[
                    'translateZ(40px)', // Front
                    'translateZ(-40px) rotateY(180deg)', // Back
                    'rotateY(90deg) translateZ(24px)', // Right
                    'rotateY(-90deg) translateZ(24px)', // Left
                ].map((transform, i) => (
                    <div
                        key={i}
                        className="absolute inset-0 bg-[#050505] border border-white/5 overflow-hidden"
                        style={{ transform }}
                    >
                        {/* Internal Scanning Light */}
                        <motion.div
                            animate={{ y: ['-100%', '100%'] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-x-0 h-20 bg-gradient-to-b from-transparent via-[#00FF41]/10 to-transparent opacity-30"
                        />

                        {/* Edge Glint */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                    </div>
                ))}

                {/* The Core Emission (Behind the glass) */}
                <div className="absolute inset-x-4 top-1/4 bottom-1/4 bg-[#00FF41]/20 blur-3xl rounded-full mix-blend-screen animate-pulse" />

                {/* Technical "Nerve" Lines (Appearing on Hover) */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-minus-20 pointer-events-none"
                        >
                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute bg-[#00FF41]/40"
                                    style={{
                                        width: Math.random() > 0.5 ? '1px' : '40px',
                                        height: Math.random() > 0.5 ? '40px' : '1px',
                                        left: `${Math.random() * 100}%`,
                                        top: `${Math.random() * 100}%`,
                                        boxShadow: '0 0 10px rgba(0, 255, 65, 0.5)'
                                    }}
                                />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Float HUD Elements around Monolith */}
            <div className="absolute inset-0 pointer-events-none z-50">
                <div className="absolute top-1/2 left-0 w-full h-px bg-white/[0.02]" />
                <div className="absolute left-1/2 top-0 w-px h-full bg-white/[0.02]" />

                {/* Minimal Text Markers */}
                <div className="absolute top-1/4 left-1/4">
                    <span className="text-[7px] font-black text-[#00FF41]/40 tracking-widest uppercase italic">SOV_LINK_L4</span>
                </div>
                <div className="absolute bottom-1/4 right-1/4">
                    <span className="text-[7px] font-black text-white/10 tracking-widest uppercase italic">ACTIVE_CORE_ISOLATION</span>
                </div>
            </div>

            {/* Custom Monolith Pointer */}
            <motion.div
                animate={{ x: mousePos.x * 500, y: mousePos.y * 500 }}
                className="absolute w-4 h-4 border border-[#00FF41] rounded-full flex items-center justify-center pointer-events-none"
            >
                <div className="w-0.5 h-0.5 bg-[#00FF41]" />
            </motion.div>
        </div>
    );
};

import { AnimatePresence } from 'framer-motion';

export default SovereignMonolith;
