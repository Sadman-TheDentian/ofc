
'use client';

import React from 'react';
import { motion } from 'framer-motion';

const CyberGrid = () => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 bg-black">
            {/* Primary Grid Layout */}
            <div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                    backgroundImage: `
            linear-gradient(to right, rgba(0, 255, 65, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 255, 65, 0.2) 1px, transparent 1px)
          `,
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Secondary Accent Grid */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
                    backgroundSize: '200px 200px',
                }}
            />

            {/* Radial Mask for Depth */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.8) 80%, black 100%)'
                }}
            />

            {/* Moving Data Scanlines */}
            <motion.div
                initial={{ y: "-100%" }}
                animate={{ y: "100%" }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-full h-1/4 bg-gradient-to-b from-transparent via-[#00FF41]/5 to-transparent blur-3xl opacity-20"
            />

            {/* Glitchy Data Particles */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        x: Math.random() * 100 + "%",
                        y: "-10%",
                        opacity: 0
                    }}
                    animate={{
                        y: "110%",
                        opacity: [0, 0.5, 0]
                    }}
                    transition={{
                        duration: 5 + Math.random() * 10,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 10
                    }}
                    className="absolute w-px h-20 bg-[#00FF41] blur-[1px]"
                />
            ))}
        </div>
    );
};

export default CyberGrid;
