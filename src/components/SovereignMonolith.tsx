
'use client';

import React, { useRef, useState, useMemo, useEffect } from 'react';
import { motion, useSpring, useTransform, AnimatePresence, useScroll, useInView } from 'framer-motion';

const SovereignMonolith = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: false, amount: 0.3 });
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isBooted, setIsBooted] = useState(false);

    useEffect(() => {
        if (isInView) {
            const timer = setTimeout(() => setIsBooted(true), 1200);
            return () => clearTimeout(timer);
        } else {
            setIsBooted(false);
        }
    }, [isInView]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePos({ x, y });
    };

    const rotateX = useSpring(mousePos.y * -20, { stiffness: 40, damping: 25 });
    const rotateY = useSpring(mousePos.x * 20, { stiffness: 40, damping: 25 });
    const glareX = useTransform(rotateY, [-20, 20], ["0%", "100%"]);
    const glareY = useTransform(rotateX, [-20, 20], ["0%", "100%"]);

    const bits = useMemo(() => Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        duration: 3 + Math.random() * 5,
        delay: Math.random() * 5
    })), []);

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative w-full aspect-square flex items-center justify-center perspective-[3000px] cursor-none group overflow-hidden"
        >
            {/* Volumetric Light Beams (Pseudo-3D) */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-[#00FF41]/10 to-transparent rotate-[30deg] scale-y-150 blur-xl" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-[#00FF41]/10 to-transparent -rotate-[30deg] scale-y-150 blur-xl" />
            </div>

            {/* Boot Sequence Overlay */}
            <AnimatePresence>
                {!isBooted && (
                    <motion.div
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="absolute inset-0 z-[110] bg-black flex flex-col items-center justify-center gap-4 border border-white/5"
                    >
                        <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ x: '-100%' }}
                                animate={{ x: '100%' }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-full h-full bg-[#00FF41]"
                            />
                        </div>
                        <span className="text-[8px] font-black text-[#00FF41] tracking-[0.5em] uppercase italic animate-pulse">INITIATING_CORE_LINK</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Orbiting Tech Shards */}
            {isBooted && Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                    key={i}
                    style={{ rotateX, rotateY }}
                    animate={{ rotateZ: 360 }}
                    transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-32 border border-white/5 rounded-full pointer-events-none"
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-[1px] bg-[#00FF41]/40" />
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[1px] h-4 bg-[#00FF41]/40" />
                </motion.div>
            ))}

            {/* The Main 3D Monolith Structure */}
            <motion.div
                style={{ rotateX, rotateY, scale: isBooted ? 1 : 0.8 }}
                transition={{ type: 'spring', damping: 20 }}
                className="relative w-64 h-[28rem] preserve-3d"
            >
                {/* 3D Primaryfaces */}
                {[
                    { rot: 'rotateY(0deg) translateZ(56px)', side: 'FRONT' },
                    { rot: 'rotateY(180deg) translateZ(56px)', side: 'BACK' },
                    { rot: 'rotateY(90deg) translateZ(32px)', side: 'RIGHT' },
                    { rot: 'rotateY(-90deg) translateZ(32px)', side: 'LEFT' },
                    { rot: 'rotateX(90deg) translateZ(32px)', side: 'TOP' },
                ].map((face, i) => (
                    <div
                        key={i}
                        className="absolute inset-0 bg-[#080808]/90 backdrop-blur-md border border-white/10 overflow-hidden"
                        style={{ transform: face.rot }}
                    >
                        {/* Hardware Intricacies (Serial, Ports, Patterns) */}
                        <div className="absolute inset-0 opacity-[0.03] select-none pointer-events-none flex flex-col p-4 gap-4">
                            <div className="flex justify-between border-b border-white pb-2">
                                <span className="text-[6px] font-mono">MODEL_V.09.74</span>
                                <span className="text-[6px] font-mono">PN: 83F4-5417</span>
                            </div>
                            <div className="grid grid-cols-4 gap-2 h-32">
                                {Array.from({ length: 12 }).map((_, j) => (
                                    <div key={j} className="border border-white/20 rounded-sm" />
                                ))}
                            </div>
                            <div className="mt-auto flex gap-2">
                                <div className="w-1/2 h-4 border border-white/20" />
                                <div className="w-1/4 h-4 border border-white/20" />
                                <div className="w-1/4 h-4 border border-white/20" />
                            </div>
                        </div>

                        {/* Dynamic Glare */}
                        <motion.div
                            style={{
                                background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.08) 0%, transparent 50%)`
                            }}
                            className="absolute inset-0 pointer-events-none"
                        />

                        {/* Matrix Grid Data */}
                        <div className="absolute inset-0 opacity-10 p-4 font-mono text-[4px] leading-tight text-[#00FF41] uppercase overflow-hidden whitespace-nowrap">
                            {Array.from({ length: 40 }).map((_, line) => (
                                <motion.div
                                    key={line}
                                    animate={{ x: [0, -50, 0] }}
                                    transition={{ duration: 10 + Math.random() * 5, repeat: Infinity, ease: 'linear' }}
                                >
                                    {Array(10).fill(`PROTOCOL_SEC_LAYER_0${i}_ACTIVE_VERIFYING_`).join('')}
                                </motion.div>
                            ))}
                        </div>

                        {/* Interactive Scan Line */}
                        <motion.div
                            animate={{ y: ['-10%', '110%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
                            className="absolute inset-x-0 h-1 bg-[#00FF41]/20 shadow-[0_0_15px_#00FF41] z-10"
                        />
                    </div>
                ))}

                {/* Internal Pulsing Core Hub */}
                <div className="absolute inset-x-8 top-16 bottom-16 bg-[#000] border border-[#00FF41]/30 flex items-center justify-center overflow-hidden">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                        transition={{ duration: 10, repeat: Infinity }}
                        className="w-16 h-16 border border-[#00FF41]/40 rotate-45 flex items-center justify-center"
                    >
                        <div className="w-8 h-8 border border-[#00FF41]/60 flex items-center justify-center">
                            <div className="w-1 h-1 bg-[#00FF41] shadow-[0_0_20px_#00FF41]" />
                        </div>
                    </motion.div>

                    {/* Core Depth Gradients */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.2),transparent_80%)] mix-blend-screen" />
                </div>

                {/* Particle Debris */}
                {isBooted && bits.map((bit) => (
                    <motion.div
                        key={bit.id}
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: [0, 1, 0],
                            y: [-50, 50],
                            translateZ: [0, 100],
                            scale: [0.5, 1, 0.5]
                        }}
                        transition={{
                            duration: bit.duration,
                            repeat: Infinity,
                            delay: bit.delay,
                            ease: "easeInOut"
                        }}
                        className="absolute w-[2px] h-[2px] bg-[#00FF41] shadow-[0_0_8px_#00FF41]"
                        style={{ top: bit.top, left: bit.left }}
                    />
                ))}
            </motion.div>

            {/* Hyper-Detailed HUD (Perspective Locked) */}
            <motion.div
                style={{ rotateX, rotateY, translateZ: 150 }}
                className="absolute w-[500px] h-full pointer-events-none hidden md:block"
            >
                {/* Left Side Telemetry */}
                <div className="absolute top-1/4 -left-12 flex flex-col gap-2">
                    <div className="p-3 bg-black/80 border border-white/10 backdrop-blur-xl">
                        <span className="text-[6px] font-mono text-[#00FF41]/40 block mb-1">CORE_THERMAL_SCAN</span>
                        <div className="flex gap-1">
                            {[0.4, 0.7, 0.9, 0.5, 0.3].map((v, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ opacity: [0.2, 0.8, 0.2] }}
                                    transition={{ duration: 1 + i * 0.2, repeat: Infinity }}
                                    className="w-1 h-4 bg-[#00FF41]/40"
                                    style={{ height: `${v * 20}px` }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side Telemetry */}
                <div className="absolute bottom-1/4 -right-12 flex flex-col gap-2 items-end">
                    <div className="p-3 bg-black/80 border border-white/10 backdrop-blur-xl">
                        <span className="text-[6px] font-mono text-[#00FF41]/40 block mb-1 text-right">BIT_STREAM_LOCK</span>
                        <div className="flex flex-col gap-[1px]">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex gap-1">
                                    {Array(8).fill(0).map((_, j) => (
                                        <div key={j} className={`w-1 h-1 ${Math.random() > 0.5 ? 'bg-[#00FF41]' : 'bg-white/10'}`} />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Global Interface Overlay (Non-perspective) */}
            <div className="absolute inset-0 p-16 flex flex-col pointer-events-none z-[120]">
                {/* Top Labels */}
                <div className="flex justify-between items-start opacity-40">
                    <div className="flex flex-col gap-1">
                        <span className="text-[8px] font-black tracking-[0.5em] text-[#00FF41] uppercase">SYSTEM_BASE: MONOLITH</span>
                        <span className="text-[6px] font-mono text-white/50">SEC_LEVEL: BLACK_OPS // RESTRICTED</span>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <div className="flex gap-2">
                            <div className="h-1 w-8 bg-[#00FF41]" />
                            <div className="h-1 w-2 bg-white/20" />
                            <div className="h-1 w-2 bg-white/20" />
                        </div>
                        <span className="text-[6px] font-mono text-white/50 tracking-widest text-right">SYNC_STATUS: 100%_NOMINAL</span>
                    </div>
                </div>

                {/* Bottom Redacted Feed */}
                <div className="mt-auto max-w-xs border-l border-[#00FF41]/20 pl-6 pb-4">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={Math.floor(Date.now() / 3000)}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="space-y-2"
                        >
                            <span className="text-[7px] font-black text-[#00FF41] italic tracking-widest block">LATEST_COMMAND_EXEC:</span>
                            <p className="text-[7px] font-mono text-white/30 leading-tight uppercase italic">
                                {["> ISOLATING_NODE_BLOCK_74...", "> ENCRYPTING_LAYER_SUBSTRATE...", "> BRIDGING_NEURAL_LINK...", "> DEPLOYING_SOVEREIGN_AGENT..."][Math.floor(Math.random() * 4)]}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Precision Interactive Cursor */}
            <motion.div
                animate={{ x: mousePos.x * 650, y: mousePos.y * 650 }}
                transition={{ type: "spring", damping: 30, stiffness: 500, mass: 0.4 }}
                className="absolute w-12 h-12 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-[200]"
            >
                <div className="absolute inset-0 border border-[#00FF41]/40 rounded-full" />
                <div className="w-1 h-1 bg-[#00FF41] shadow-[0_0_10px_#00FF41]" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-2 w-[1px] bg-[#00FF41]" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-2 w-[1px] bg-[#00FF41]" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-[#00FF41]" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-[#00FF41]" />

                <div className="absolute top-[-15px] left-[-15px] text-[5px] font-mono text-[#00FF41] opacity-50 italic">REL:{(mousePos.x * 100).toFixed(0)}:{(mousePos.y * 100).toFixed(0)}</div>
            </motion.div>
        </div>
    );
};

export default SovereignMonolith;
