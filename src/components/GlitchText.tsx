
'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function GlitchText({ text, className = "" }: { text: string, className?: string }) {
    const [isHovered, setIsHovered] = useState(false);
    const [glitchText, setGlitchText] = useState(text);

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';

    useEffect(() => {
        if (!isHovered) {
            setGlitchText(text);
            return;
        }

        const interval = setInterval(() => {
            setGlitchText(prev =>
                text.split('').map((char, i) => {
                    if (Math.random() > 0.9) {
                        return chars[Math.floor(Math.random() * chars.length)];
                    }
                    return char;
                }).join('')
            );
        }, 50);

        return () => clearInterval(interval);
    }, [isHovered, text]);

    return (
        <div
            className={`relative inline-block ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span className="relative z-10">{glitchText}</span>
            {isHovered && (
                <>
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5, x: [-2, 2, -1], y: [1, -1, 1] }}
                        className="absolute top-0 left-0 text-red-500 z-0 select-none pointer-events-none mix-blend-screen"
                    >
                        {text}
                    </motion.span>
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5, x: [1, -2, 2], y: [-1, 1, -1] }}
                        className="absolute top-0 left-0 text-blue-500 z-0 select-none pointer-events-none mix-blend-screen"
                    >
                        {text}
                    </motion.span>
                </>
            )}
        </div>
    );
}
