
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const LOG_LINES = [
    "DENTISYSTEMS_INITIALIZING...",
    "ESTABLISHING_SECURE_NODE",
    "INTEGRATING_CORE_ARCHITECTURE",
    "DECRYPTING_ASSETS_V6.4",
    "SYSTEM_STABLE"
];

const logoUrl = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEirwhyibjl-3Guf8S6G442OtQmAdOzHrTcxPAuK6QxCGcAJ2I88K7Ee9DN-k_SONDddf2FeB4SwHO8l29PZ9HvHHlxJxiPDnfgrY1DBS60HsVaYv0uOAi08fm6KyrwhM7HPQhbQhL5ufVU_efX268tXM4rR8Vwok_UqbSar_b-B4btAigP5BFaU12PCjUE/s320/DENTI.SYSTEMS%20PNJ.png';

export default function Preloader() {
    const [loading, setLoading] = useState(true);
    const [currentLine, setCurrentLine] = useState(0);

    useEffect(() => {
        const hasLoaded = sessionStorage.getItem('denti_loaded');
        if (hasLoaded) {
            setLoading(false);
            return;
        }

        const interval = setInterval(() => {
            setCurrentLine(prev => {
                if (prev >= LOG_LINES.length - 1) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setLoading(false);
                        sessionStorage.setItem('denti_loaded', 'true');
                    }, 500);
                    return prev;
                }
                return prev + 1;
            });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center overflow-hidden"
                >
                    {/* Background Subtle Lines */}
                    <div className="absolute inset-0 opacity-[0.02]" style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '100px 100px'
                    }} />

                    <div className="relative flex flex-col items-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="relative h-32 w-32 mb-16 flex items-center justify-center"
                        >
                            <div className="absolute inset-0 border border-white/5 rounded-full" />
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-[-10px] border border-dashed border-[#00FF41]/20 rounded-full"
                            />
                            <Image src={logoUrl} alt="Logo" width={40} height={40} className="opacity-80" />
                        </motion.div>

                        <div className="h-6 overflow-hidden relative w-64 flex justify-center">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={currentLine}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                    className="text-[10px] font-bold tracking-[0.6em] text-[#00FF41] uppercase text-center"
                                >
                                    {LOG_LINES[currentLine]}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="absolute bottom-20 flex flex-col items-center gap-6">
                        <div className="h-[2px] w-48 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${((currentLine + 1) / LOG_LINES.length) * 100}%` }}
                                className="h-full bg-[#00FF41]"
                            />
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-[8px] font-black tracking-[1em] text-white/10 uppercase italic">SOVEREIGN_ENGINEERING // V7.4</span>
                            <div className="flex gap-2">
                                {[1, 2, 3].map(i => (
                                    <motion.div
                                        key={i}
                                        animate={{ opacity: [0.1, 0.5, 0.1] }}
                                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                        className="h-0.5 w-4 bg-[#00FF41]/20"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
