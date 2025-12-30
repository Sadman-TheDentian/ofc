
'use client';

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface RevealTextProps {
    text: string;
    className?: string;
    delay?: number;
}

export default function RevealText({ text, className = "", delay = 0 }: RevealTextProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: delay,
            },
        },
    };

    const item = {
        hidden: { y: "100%", opacity: 0 },
        show: { y: "0%", opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
    };

    return (
        <motion.span
            ref={ref}
            variants={container}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className={`inline-block overflow-hidden ${className}`}
        >
            {text.split("").map((char, index) => (
                <motion.span
                    key={index}
                    variants={item}
                    className="inline-block whitespace-pre"
                >
                    {char}
                </motion.span>
            ))}
        </motion.span>
    );
}
