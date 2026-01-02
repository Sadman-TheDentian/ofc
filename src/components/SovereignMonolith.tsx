
'use client';

import React, { useRef, useState, useMemo, useEffect } from 'react';
import { motion, useSpring, useTransform, AnimatePresence, useInView } from 'framer-motion';

const SovereignMonolith = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: false, amount: 0.3 });
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [systemState, setSystemState] = useState<'BOOT' | 'STABLE' | 'SCANNING' | 'INTERCEPTING'>('BOOT');
    const [intelligencePulse, setIntelligencePulse] = useState(0);

    // Simulated Intelligence Frequency
    useEffect(() => {
        const interval = setInterval(() => {
            setIntelligencePulse(prev => (prev + 1) % 100);
            if (Math.random() > 0.95) {
                setSystemState(prev => {
                    const states: ('STABLE' | 'SCANNING' | 'INTERCEPTING')[] = ['STABLE', 'SCANNING', 'INTERCEPTING'];
                    return states[Math.floor(Math.random() * states.length)];
                });
            }
        }, 150);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (isInView) {
            setSystemState('BOOT');
            const timer = setTimeout(() => setSystemState('STABLE'), 2000);
            return () => clearTimeout(timer);
        }
    }, [isInView]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePos({ x, y });
    };

    const rotateX = useSpring(mousePos.y * -25, { stiffness: 40, damping: 25 });
    const rotateY = useSpring(mousePos.x * 25, { stiffness: 40, damping: 25 });
    const glareX = useTransform(rotateY, [-25, 25], ["0%", "100%"]);
    const glareY = useTransform(rotateX, [-25, 25], ["0%", "100%"]);

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative w-full aspect-square flex items-center justify-center perspective-[3500px] cursor-none group overflow-hidden bg-[#020202]"
        >
            {/* Volumetric Depth Atmosphere */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.05)_0%,transparent_70%)] pointer-events-none" />

            {/* Dynamic Grid Foundation (Reactive to mouse) */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(#00FF41 0.5px, transparent 0.5px)',
                    backgroundSize: '32px 32px',
                    transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`
                }}
            />

            {/* Boot / State Overlays */}
            <AnimatePresence mode="wait">
                {systemState === 'BOOT' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.2 }}
                        className="absolute inset-0 z-[120] bg-black/95 flex flex-col items-center justify-center p-20"
                    >
                        <div className="space-y-6 w-full max-w-xs">
                            <div className="flex justify-between text-[8px] font-black text-[#00FF41] tracking-widest italic">
                                <span>INITIALIZING_SOVEREIGN_OS</span>
                                <span>{intelligencePulse}%</span>
                            </div>
                            <div className="h-[2px] w-full bg-white/5 overflow-hidden">
                                <motion.div
                                    initial={{ x: '-100%' }}
                                    animate={{ x: '0%' }}
                                    transition={{ duration: 1.8, ease: "circIn" }}
                                    className="h-full bg-[#00FF41]"
                                />
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                {[...Array(4)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ opacity: [0.1, 1, 0.1] }}
                                        transition={{ duration: 0.5, delay: i * 0.1, repeat: Infinity }}
                                        className="h-1 bg-[#00FF41]/20"
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* The Monolith Chassis */}
            <motion.div
                style={{ rotateX, rotateY, scale: systemState === 'BOOT' ? 0.9 : 1 }}
                className="relative w-72 h-[32rem] preserve-3d"
            >
                {/* 3D faces with high-density detail */}
                {[
                    { rot: 'translateZ(64px)', label: 'PRIMARY_LINK' },
                    { rot: 'rotateY(180deg) translateZ(64px)', label: 'SEC_BACKPLANE' },
                    { rot: 'rotateY(90deg) translateZ(36px)', label: 'NODE_EAST' },
                    { rot: 'rotateY(-90deg) translateZ(36px)', label: 'NODE_WEST' },
                    { rot: 'rotateX(90deg) translateZ(36px)', label: 'CORE_VENT' },
                ].map((face, i) => (
                    <div
                        key={i}
                        className="absolute inset-0 bg-[#050505] border border-white/10 overflow-hidden "
                        style={{ transform: face.rot }}
                    >
                        {/* Dynamic Glare Shell */}
                        <motion.div
                            style={{ background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.06) 0%, transparent 60%)` }}
                            className="absolute inset-0 pointer-events-none z-10"
                        />

                        {/* Internal Tech Schematics */}
                        <div className="absolute inset-x-4 top-10 bottom-10 border border-white/5 opacity-40">
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00FF41]" />
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00FF41]" />
                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00FF41]" />
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00FF41]" />

                            {/* Floating Code Fragments */}
                            <div className="p-4 opacity-5 uppercase font-mono text-[5px] leading-tight text-white space-y-4">
                                <p>_SYSTEM_AUTH_REQUIRED_ // _PN:{Math.random().toString(16).slice(2, 8)}</p>
                                <div className="grid grid-cols-6 gap-1">
                                    {[...Array(24)].map((_, j) => <div key={j} className="h-1 bg-white/20" />)}
                                </div>
                                <p className="text-[#00FF41]">_ENFORCEMENT_PROTOCOL_ACTIVE_</p>
                            </div>
                        </div>

                        {/* State-Dependent Visuals */}
                        <AnimatePresence>
                            {systemState === 'INTERCEPTING' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 bg-red-500/5 z-20 pointer-events-none"
                                />
                            )}
                        </AnimatePresence>

                        {/* Scanning Laser Beam */}
                        <motion.div
                            animate={{ y: ['-10%', '110%'] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: i * 0.3 }}
                            className="absolute inset-x-0 h-[1px] bg-[#00FF41]/40 shadow-[0_0_10px_#00FF41] z-30"
                        />
                    </div>
                ))}

                {/* Sub-Internal Intelligence Core (Floating inside) */}
                <motion.div
                    style={{ rotateX: rotateY, rotateY: rotateX, translateZ: 0 }}
                    className="absolute inset-x-12 top-24 bottom-24 border border-[#00FF41]/20 bg-black/60 flex items-center justify-center"
                >
                    <div className="relative w-16 h-16">
                        <motion.div
                            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 border border-[#00FF41]/40 rounded-full"
                        />
                        <motion.div
                            animate={{ rotate: -360, scale: [1.3, 1, 1.3] }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-minus-2 border border-[#00FF41]/20 rounded-full border-dashed"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className={`w-2 h-2 rounded-full shadow-[0_0_20px_#00FF41] transition-colors duration-500 ${systemState === 'INTERCEPTING' ? 'bg-red-500' : 'bg-[#00FF41]'}`} />
                        </div>
                    </div>
                </motion.div>

                {/* Floating Micro-Satellite Nodes */}
                {systemState !== 'BOOT' && [...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            rotateY: 360,
                            y: [0, -40, 0]
                        }}
                        transition={{
                            rotateY: { duration: 10 + i * 5, repeat: Infinity, ease: "linear" },
                            y: { duration: 4 + i, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="absolute inset-0 pointer-events-none"
                    >
                        <div className="absolute top-1/2 -right-8 w-1 h-1 bg-[#00FF41] shadow-[0_0_10px_#00FF41] rounded-full" />
                    </motion.div>
                ))}
            </motion.div>

            {/* High-Fidelity Static HUD (Screen Space) */}
            <div className="absolute inset-0 pointer-events-none z-[130] p-16 flex flex-col justify-between">
                <div className="flex justify-between items-start opacity-40">
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-[#00FF41] tracking-[0.6em] uppercase italic">SOV_CORE_V.01</span>
                            <span className="text-[6px] font-mono text-white/50 lowercase italic tracking-[0.2em]">firmware_lock: {systemState}</span>
                        </div>
                    </div>
                    <div className="text-right flex flex-col items-end">
                        <div className="flex gap-1 mb-2">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className={`h-1 w-1 rounded-sm ${i < 4 ? 'bg-[#00FF41]' : 'bg-white/10'}`} />
                            ))}
                        </div>
                        <span className="text-[7px] font-mono text-white/30 uppercase tracking-widest">ENCRYPTION_LAYER_88</span>
                    </div>
                </div>

                <div className="mt-auto flex justify-between items-end">
                    <div className="max-w-[120px] space-y-3">
                        <div className="h-[1px] w-full bg-white/10" />
                        <span className="text-[6px] font-mono text-white/20 uppercase leading-relaxed block italic">
                            System maintaining persistent neural mesh across 74 sovereign territories.
                        </span>
                    </div>
                    <div className="flex flex-col items-end">
                        <motion.div
                            animate={{ opacity: [0.3, 0.8, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="bg-[#00FF41]/10 px-3 py-1 border border-[#00FF41]/20 backdrop-blur-md mb-2"
                        >
                            <span className="text-[8px] font-black text-[#00FF41] tracking-[0.3em] uppercase italic">ACTIVE // L4_PROTECT</span>
                        </motion.div>
                        <span className="text-[9px] font-mono text-white/10 uppercase tracking-widest">NODE_SIGNAL: EXCELLENT</span>
                    </div>
                </div>
            </div>

            {/* Interactive Target Crosshair */}
            <motion.div
                animate={{ x: mousePos.x * 600, y: mousePos.y * 600 }}
                transition={{ type: "spring", stiffness: 400, damping: 40, mass: 0.5 }}
                className="absolute w-16 h-16 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[200] flex items-center justify-center"
            >
                <div className="absolute inset-0 border border-[#00FF41]/30 rounded-full" />
                <div className="absolute inset-4 border border-[#00FF41]/10 rounded-full animate-spin-slow" />
                <div className="w-1 h-1 bg-[#00FF41] shadow-[0_0_15px_#00FF41]" />

                {/* Crosshair Brackets */}
                <div className="absolute top-[-4px] left-1/2 -translate-x-1/2 w-4 h-[1px] bg-[#00FF41]" />
                <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-4 h-[1px] bg-[#00FF41]" />
                <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 h-4 w-[1px] bg-[#00FF41]" />
                <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 h-4 w-[1px] bg-[#00FF41]" />

                {/* Floating Local Data */}
                <div className="absolute top-10 left-10 flex flex-col gap-1 whitespace-nowrap">
                    <span className="text-[5px] font-mono text-[#00FF41]/60 uppercase italic tracking-widest leading-none">TARGET_LOCK: {(Math.random() * 10).toFixed(2)}ms</span>
                    <span className="text-[5px] font-mono text-[#00FF41]/60 uppercase italic tracking-widest leading-none">CORE_ID: X8-09</span>
                </div>
            </motion.div>

            {/* Occasional System Glitch Overlay */}
            {systemState === 'INTERCEPTING' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.4, 0] }}
                    transition={{ duration: 0.2, repeat: 3 }}
                    className="absolute inset-0 bg-[#00FF41]/5 mix-blend-screen pointer-events-none z-[250]"
                />
            )}
        </div>
    );
};

export default SovereignMonolith;
