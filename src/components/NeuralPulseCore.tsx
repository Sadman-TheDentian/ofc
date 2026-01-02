
'use client';

import React, { useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const NeuralPulseCore = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Create a set of data points for the "Neural Mesh"
    const points = useMemo(() => {
        return Array.from({ length: 24 }).map((_, i) => ({
            id: i,
            angle: (i / 24) * Math.PI * 2,
            distance: 40 + Math.random() * 40, // percentage from center
            size: 2 + Math.random() * 4,
            speed: 15 + Math.random() * 20,
            offset: Math.random() * Math.PI * 2
        }));
    }, []);

    const connections = useMemo(() => {
        const pairs: [number, number][] = [];
        for (let i = 0; i < points.length; i++) {
            // Connect to nearest neighbors to form a mesh
            pairs.push([i, (i + 1) % points.length]);
            if (i % 3 === 0) pairs.push([i, (i + 5) % points.length]);
        }
        return pairs;
    }, [points]);

    return (
        <div ref={containerRef} className="relative w-full aspect-square flex items-center justify-center p-20">
            {/* Atmospheric Depth Gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.08),transparent_70%)] animate-pulse" />

            {/* Inner Core Glow */}
            <motion.div
                animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute h-32 w-32 bg-[#00FF41]/20 blur-3xl rounded-full"
            />

            <svg className="w-full h-full relative z-10 overflow-visible" viewBox="0 0 100 100">
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="50%" stopColor="#00FF41" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                </defs>

                {/* Connecting Mesh Lines */}
                {connections.map(([p1, p2], idx) => (
                    <NeuralLink key={`link-${idx}`} p1={points[p1]} p2={points[p2]} />
                ))}

                {/* Pulsing Nodes */}
                {points.map((point) => (
                    <NeuralNode key={point.id} point={point} />
                ))}

                {/* Central Data Relay */}
                <circle cx="50" cy="50" r="1.5" fill="#00FF41" filter="url(#glow)" />
                <circle cx="50" cy="50" r="8" stroke="#00FF41" strokeWidth="0.1" fill="none" opacity="0.2" />
                <circle cx="50" cy="50" r="12" stroke="#00FF41" strokeWidth="0.05" fill="none" opacity="0.1" />
            </svg>

            {/* Orbiting Tech Rings */}
            <div className="absolute inset-4 border border-white/5 rounded-full" />
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute inset-10 border border-dashed border-[#00FF41]/10 rounded-full"
            />

            {/* Digital Data Markers */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="h-10 w-px bg-gradient-to-t from-[#00FF41] to-transparent" />
                <span className="text-[7px] font-black text-[#00FF41]/40 tracking-widest mt-2">CORE_SYNC</span>
            </div>

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <span className="text-[7px] font-black text-[#00FF41]/40 tracking-widest mb-2">TELEMETRY_TX</span>
                <div className="h-10 w-px bg-gradient-to-b from-[#00FF41] to-transparent" />
            </div>
        </div>
    );
};

const NeuralNode = ({ point }: { point: any }) => {
    return (
        <motion.circle
            cx={50 + Math.cos(point.angle) * point.distance * 0.45}
            cy={50 + Math.sin(point.angle) * point.distance * 0.45}
            r={0.4}
            fill="#00FF41"
            filter="url(#glow)"
            animate={{
                opacity: [0.2, 1, 0.2],
                r: [0.3, 0.6, 0.3]
            }}
            transition={{
                duration: point.speed / 5,
                repeat: Infinity,
                delay: point.offset
            }}
        />
    );
};

const NeuralLink = ({ p1, p2 }: { p1: any, p2: any }) => {
    const x1 = 50 + Math.cos(p1.angle) * p1.distance * 0.45;
    const y1 = 50 + Math.sin(p1.angle) * p1.distance * 0.45;
    const x2 = 50 + Math.cos(p2.angle) * p2.distance * 0.45;
    const y2 = 50 + Math.sin(p2.angle) * p2.distance * 0.45;

    return (
        <motion.line
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#00FF41"
            strokeWidth="0.05"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.05, 0.15, 0.05] }}
            transition={{
                duration: 5,
                repeat: Infinity,
                delay: p1.offset % 2
            }}
        />
    );
};

export default NeuralPulseCore;
