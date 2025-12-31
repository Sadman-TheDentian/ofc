
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function DigitalHorizon() {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, 200]);
    const opacity = useTransform(scrollY, [0, 500], [0.3, 0]);

    return (
        <motion.div
            style={{ y, opacity }}
            className="absolute bottom-0 left-0 w-full h-[40vh] pointer-events-none z-10 overflow-hidden"
        >
            {/* Grid Floor */}
            <div className="absolute inset-0 [perspective:1000px]">
                <div
                    className="absolute inset-0 [transform:rotateX(60deg)] origin-bottom"
                    style={{
                        backgroundImage: `
              linear-gradient(to right, rgba(0, 255, 65, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 255, 65, 0.1) 1px, transparent 1px)
            `,
                        backgroundSize: '40px 40px',
                        maskImage: 'linear-gradient(to top, black, transparent)'
                    }}
                />
            </div>

            {/* Horizon Line */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00FF41]/30 to-transparent shadow-[0_0_20px_#00FF41]" />

            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-40 bg-gradient-to-t from-[#00FF41]/10 to-transparent blur-3xl pointer-events-none" />
        </motion.div>
    );
}
