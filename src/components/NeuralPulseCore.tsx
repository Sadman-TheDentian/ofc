
'use client';

import React, { useMemo, useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NeuralPulseCore = () => {
    const [activeSector, setActiveSector] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    // Sector switching simulation
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSector(prev => (prev + 1) % 4);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Generate high-density data network
    const { nodes, connections, sectors } = useMemo(() => {
        const nodes = Array.from({ length: 42 }).map((_, i) => ({
            id: i,
            sector: i % 4,
            x: 50 + Math.cos((i / 42) * Math.PI * 2) * (30 + (i % 3) * 5),
            y: 50 + Math.sin((i / 42) * Math.PI * 2) * (30 + (i % 3) * 5),
            size: 0.5 + Math.random() * 1.5,
            pulseDelay: Math.random() * 5,
            type: Math.random() > 0.8 ? 'CENTRAL' : 'EDGE'
        }));

        const connections: [number, number][] = [];
        nodes.forEach((n, i) => {
            // Connect to neighbors in same sector
            const neighbors = nodes.filter(other => other.sector === n.sector && other.id !== n.id);
            neighbors.slice(0, 2).forEach(nb => connections.push([n.id, nb.id]));
            // Bridge to next sector
            if (i % 10 === 0) connections.push([n.id, (n.id + 10) % 42]);
        });

        const sectors = [
            { id: 0, name: 'NORTH_GRID', coords: '40.7128° N' },
            { id: 1, name: 'EAST_HUB', coords: '74.0060° W' },
            { id: 2, name: 'SOUTH_VAL', coords: '34.0522° N' },
            { id: 3, name: 'WEST_NODE', coords: '118.2437° W' },
        ];

        return { nodes, connections, sectors };
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100
        });
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative w-full aspect-square flex items-center justify-center cursor-crosshair"
        >
            {/* Background Depth Layers */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.05),transparent_70%)]" />

            {/* Rotating HUD Coordinates */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 opacity-10"
            >
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#00FF41] to-transparent"
                        style={{ transform: `translate(-50%, -50%) rotate(${i * 22.5}deg)` }}
                    />
                ))}
            </motion.div>

            {/* Radar Sweep Arc */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[10%] border border-[#00FF41]/20 rounded-full z-10"
                style={{
                    background: 'conic-gradient(from 0deg, transparent, rgba(0, 255, 65, 0.1) 60deg, transparent 90deg)',
                    maskImage: 'radial-gradient(circle at center, transparent 40%, black 100%)'
                }}
            />

            <svg viewBox="0 0 100 100" className="w-full h-full relative z-20 overflow-visible drop-shadow-[0_0_15px_rgba(0,255,65,0.3)]">
                <defs>
                    <filter id="chromatic">
                        <feOffset in="SourceGraphic" dx="0.2" dy="0" result="cyan" />
                        <feOffset in="SourceGraphic" dx="-0.2" dy="0" result="red" />
                        <feBlend in="cyan" in2="red" mode="screen" />
                    </filter>
                    <linearGradient id="streamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00FF41" stopOpacity="0" />
                        <stop offset="50%" stopColor="#00FF41" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#00FF41" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Grid Mesh Connections */}
                {connections.map(([p1, p2], idx) => {
                    const node1 = nodes[p1];
                    const node2 = nodes[p2];
                    const isActive = node1.sector === activeSector || node2.sector === activeSector;

                    return (
                        <motion.line
                            key={`link-${idx}`}
                            x1={node1.x} y1={node1.y} x2={node2.x} y2={node2.y}
                            stroke={isActive ? "#00FF41" : "rgba(255,255,255,0.05)"}
                            strokeWidth={isActive ? 0.15 : 0.05}
                            animate={{ opacity: isActive ? [0.2, 0.5, 0.2] : 0.1 }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                    );
                })}

                {/* Active Data Stream Packets */}
                <AnimatePresence>
                    {connections.filter((_, i) => i % 5 === 0 && Math.random() > 0.5).map((link, idx) => (
                        <motion.circle
                            key={`packet-${idx}`}
                            r="0.3"
                            fill="#00FF41"
                            initial={{ cx: nodes[link[0]].x, cy: nodes[link[0]].y }}
                            animate={{ cx: nodes[link[1]].x, cy: nodes[link[1]].y, opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                    ))}
                </AnimatePresence>

                {/* Nodes */}
                {nodes.map((node) => {
                    const isActive = node.sector === activeSector;
                    const isHovered = Math.hypot(node.x - mousePos.x, node.y - mousePos.y) < 5;

                    return (
                        <g key={node.id}>
                            <motion.circle
                                cx={node.x} cy={node.y}
                                r={isActive ? node.size * 1.2 : node.size}
                                fill={isActive ? "#00FF41" : "rgba(255,255,255,0.2)"}
                                opacity={isActive ? 1 : 0.3}
                                initial={false}
                                animate={{
                                    r: isHovered ? node.size * 3 : (isActive ? [node.size, node.size * 1.5, node.size] : node.size),
                                    fill: isHovered ? "#FFF" : (isActive ? "#00FF41" : "rgba(255,255,255,0.2)")
                                }}
                            />
                            {isActive && node.type === 'CENTRAL' && (
                                <circle cx={node.x} cy={node.y} r={node.size * 3} stroke="#00FF41" strokeWidth="0.05" opacity="0.2" fill="none">
                                    <animate attributeName="r" from={node.size} to={node.size * 5} dur="2s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite" />
                                </circle>
                            )}
                        </g>
                    );
                })}
            </svg>

            {/* Floating Telemetry Info */}
            <div className="absolute top-10 left-10 pointer-events-none">
                <div className="flex flex-col gap-1 border-l border-[#00FF41] pl-4">
                    <span className="text-[10px] font-black text-[#00FF41] tracking-[0.2em] italic uppercase">ACTIVE_SECTOR</span>
                    <motion.span
                        key={activeSector}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-2xl font-[1000] text-white italic tracking-tighter"
                    >
                        {sectors[activeSector].name}
                    </motion.span>
                    <span className="text-[8px] font-mono text-white/30 tracking-widest">{sectors[activeSector].coords}</span>
                </div>
            </div>

            {/* Digital Crosshair / Mouse Tracker */}
            <motion.div
                animate={{ x: `${mousePos.x}%`, y: `${mousePos.y}%` }}
                transition={{ type: "spring", damping: 20, stiffness: 300, mass: 0.5 }}
                className="absolute top-0 left-0 w-24 h-24 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden md:block"
            >
                <div className="absolute inset-0 border border-[#00FF41]/30 rounded-full" />
                <div className="absolute top-1/2 left-0 w-full h-px bg-[#00FF41]/20" />
                <div className="absolute left-1/2 top-0 w-px h-full bg-[#00FF41]/20" />
                <div className="absolute top-0 right-0 p-2">
                    <span className="text-[6px] font-mono text-[#00FF41] opacity-50">LOCK_REQ</span>
                </div>
            </motion.div>

            {/* Bottom Status Feed */}
            <div className="absolute bottom-10 right-10 flex flex-col items-end gap-2 text-right pointer-events-none">
                <div className="flex gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className={`h-1 w-8 rounded-full transition-colors duration-500 ${i === activeSector ? 'bg-[#00FF41]' : 'bg-white/10'}`} />
                    ))}
                </div>
                <span className="text-[7px] font-black text-white/20 tracking-[0.4em] uppercase">SYSTEM_STABILITY_99.99%</span>
            </div>

            {/* Orbital Rings */}
            <div className="absolute inset-4 rounded-full border border-white/5 pointer-events-none" />
            <div className="absolute inset-20 rounded-full border border-[#00FF41]/5 border-dashed animate-spin-slow pointer-events-none" />
        </div>
    );
};

export default NeuralPulseCore;
