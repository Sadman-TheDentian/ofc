'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';

export default function GlitchText({ text, className = "" }: { text: string, className?: string }) {
    const [isHovered, setIsHovered] = useState(false);
    const [glitchText, setGlitchText] = useState(text);
    const [isGlitching, setIsGlitching] = useState(false);

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>[]{}/_';

    const triggerGlitch = useCallback((duration = 300) => {
        setIsGlitching(true);
        const startTime = Date.now();

        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            if (elapsed >= duration) {
                setGlitchText(text);
                setIsGlitching(false);
                clearInterval(interval);
                return;
            }

            setGlitchText(prev =>
                text.split('').map((char, i) => {
                    if (Math.random() > 0.8) {
                        return chars[Math.floor(Math.random() * chars.length)];
                    }
                    return char;
                }).join('')
            );
        }, 40);

        return () => clearInterval(interval);
    }, [text]);

    // Autonomous subtle glitches
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!isHovered && !isGlitching) {
                triggerGlitch(200);
            }
        }, Math.random() * 5000 + 3000);

        return () => clearTimeout(timeout);
    }, [isHovered, isGlitching, triggerGlitch]);

    // Hover trigger
    useEffect(() => {
        if (isHovered) {
            triggerGlitch(400);
        }
    }, [isHovered, triggerGlitch]);

    return (
        <div
            className={`relative inline-block cursor-default ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span className="relative z-10 transition-all duration-300">
                {glitchText.split('').map((char, i) => (
                    <motion.span
                        key={`${i}-${char}`}
                        initial={isGlitching ? { opacity: 0.5 } : { opacity: 1 }}
                        animate={{ opacity: 1 }}
                        className="inline-block"
                    >
                        {char}
                    </motion.span>
                ))}
            </span>

            {/* Premium Sophisticated Shimmer */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ left: '-100%' }}
                        animate={{ left: '200%' }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0 z-20 pointer-events-none w-1/3 bg-gradient-to-r from-transparent via-[#00FF41]/20 to-transparent skew-x-12"
                    />
                )}
            </AnimatePresence>

            {/* Subtle Glow Overlay */}
            <div className={`absolute inset-0 bg-[#00FF41]/0 blur-lg transition-all duration-700 ${isHovered ? 'bg-[#00FF41]/10' : ''}`} />

            {/* Technical Brackets (Sovereign Detail) */}
            <AnimatePresence>
                {isHovered && (
                    <>
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="absolute -left-6 top-1/2 -translate-y-1/2 text-[10px] text-[#00FF41] font-mono opacity-40"
                        >
                            [
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="absolute -right-6 top-1/2 -translate-y-1/2 text-[10px] text-[#00FF41] font-mono opacity-40"
                        >
                            ]
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
