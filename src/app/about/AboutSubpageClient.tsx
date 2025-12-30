
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import SafeImage from '@/components/SafeImage';
import { ArrowLeft, Check, LucideIcon, Activity } from 'lucide-react';
import RevealText from '@/components/RevealText';
import Magnetic from '@/components/Magnetic';
import { useRef } from 'react';

interface AboutSubpageProps {
    title: string;
    subtitle: string;
    description: string;
    heroImage: string;
    icon: LucideIcon;
    tag: string;
    mainPoints: string[];
    secondaryTitle: string;
    secondaryPoints: string[];
    secondaryIcon: LucideIcon;
}

export default function AboutSubpageClient({
    title,
    subtitle,
    description,
    heroImage,
    icon: Icon,
    tag,
    mainPoints,
    secondaryTitle,
    secondaryPoints,
    secondaryIcon: SecondaryIcon
}: AboutSubpageProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const imageOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.2]);

    return (
        <div ref={containerRef} className="min-h-screen bg-black pt-40 pb-20 overflow-hidden">
            <div className="container px-4">
                {/* Header Section */}
                <div className="max-w-6xl mb-40 relative">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Link href="/about" className="group flex items-center gap-3 text-[10px] font-bold text-white/30 uppercase tracking-[0.4em] mb-16 hover:text-[#00FF41] transition-colors">
                            <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-2 transition-transform" />
                            BAK_TO_COLLECTIVE
                        </Link>

                        <div className="flex items-center gap-6 mb-8">
                            <div className="h-12 w-12 rounded-3xl bg-[#00FF41]/10 border border-[#00FF41]/20 flex items-center justify-center">
                                <Icon className="h-6 w-6 text-[#00FF41]" />
                            </div>
                            <RevealText text={tag} className="text-[10px] font-bold tracking-[0.8em] text-[#00FF41] uppercase" />
                        </div>

                        <h1 className="text-7xl md:text-[12vw] font-[900] tracking-tighter text-white uppercase italic leading-[0.8] mb-12">
                            {title} <br /><span className="text-white/10">{subtitle}</span>
                        </h1>

                        <p className="max-w-2xl text-white/30 text-xl md:text-3xl font-light italic leading-relaxed">
                            {description}
                        </p>
                    </motion.div>

                    {/* Background Ghost Text */}
                    <div className="absolute -top-20 -right-40 text-[20vw] font-black text-white/[0.02] italic tracking-tighter select-none pointer-events-none uppercase">
                        {subtitle}
                    </div>
                </div>

                {/* Hero Asset with Parallax */}
                <motion.div
                    style={{ opacity: imageOpacity }}
                    className="relative h-[60vh] w-full mb-40 rounded-[4rem] overflow-hidden border border-white/10 bg-white/[0.02] group"
                >
                    <motion.div style={{ y: imageY }} className="absolute inset-0">
                        <SafeImage
                            src={heroImage}
                            alt={title}
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 opacity-60 group-hover:opacity-100"
                        />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                </motion.div>

                {/* Content Layout */}
                <div className="grid lg:grid-cols-2 gap-32 items-start">
                    <div className="space-y-20">
                        <div className="relative">
                            <div className="absolute -left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00FF41] to-transparent" />
                            <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-10 leading-none">THE_CORE_PROTOCOL</h2>
                            <p className="text-white/40 text-xl font-light italic leading-relaxed">
                                Our methodologies are refined through thousands of iterations. We do not accept standard benchmarks; we set the threshold for sovereign performance.
                            </p>
                        </div>

                        <div className="grid gap-8">
                            {mainPoints.map((point, idx) => (
                                <motion.div
                                    key={point}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex items-center gap-8 group"
                                >
                                    <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-[#00FF41]/40 transition-all duration-500">
                                        <Check className="h-6 w-6 text-[#00FF41]" />
                                    </div>
                                    <span className="text-lg font-bold text-white/30 uppercase tracking-widest group-hover:text-white transition-colors">{point}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="sticky top-40">
                        <div className="bg-white/[0.02] border border-white/10 rounded-[4rem] p-16 md:p-20 backdrop-blur-3xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-12 opacity-[0.03] scale-150 rotate-12">
                                <SecondaryIcon className="h-64 w-64 text-[#00FF41]" />
                            </div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-12">
                                    <Activity className="h-6 w-6 text-[#00FF41]" />
                                    <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">{secondaryTitle}</h2>
                                </div>
                                <div className="space-y-10">
                                    {secondaryPoints.map((point, idx) => (
                                        <motion.div
                                            key={point}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.3 + (idx * 0.1) }}
                                            className="flex items-start gap-6 group/item"
                                        >
                                            <div className="h-1.5 w-6 bg-[#00FF41]/30 mt-3 flex-shrink-0 group-hover/item:w-12 transition-all duration-500" />
                                            <span className="text-xl font-light text-white/40 leading-relaxed italic group-hover/item:text-white/70 transition-colors">{point}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
