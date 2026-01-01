
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import SafeImage from '@/components/SafeImage';
import * as LucideIcons from 'lucide-react';
import { ArrowLeft, Check, Activity } from 'lucide-react';
import RevealText from '@/components/RevealText';
import Magnetic from '@/components/Magnetic';
import { useRef } from 'react';

const IconComponent = ({ name, className }: { name: string; className?: string }) => {
    const Icon = LucideIcons[name as keyof typeof LucideIcons] as LucideIcons.LucideIcon;
    if (!Icon) return <Activity className={className} />;
    return <Icon className={className} />;
};

interface AboutSubpageProps {
    title: string;
    subtitle: string;
    description: string;
    heroImage: string;
    icon: string;
    tag: string;
    mainPoints: string[];
    secondaryTitle: string;
    secondaryPoints: string[];
    secondaryIcon: string;
}

import GlitchText from '@/components/GlitchText';
import TechnicalIcon from '@/components/TechnicalIcon';

export default function AboutSubpageClient({
    title,
    subtitle,
    description,
    heroImage,
    icon: iconName,
    tag,
    mainPoints,
    secondaryTitle,
    secondaryPoints,
    secondaryIcon: secondaryIconName
}: AboutSubpageProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const imageOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.1]);

    return (
        <div ref={containerRef} className="min-h-screen bg-black pt-24 md:pt-40 pb-20 overflow-hidden relative">
            <div className="container px-4 relative z-10">
                {/* Header Section */}
                <div className="max-w-7xl mb-12 md:mb-40 relative">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Link href="/about" className="group flex items-center gap-4 text-[11px] font-black text-white/30 uppercase tracking-[0.5em] mb-16 hover:text-[#00FF41] transition-all">
                            <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-3 transition-transform" />
                            BAK_TO_COLLECTIVE
                        </Link>

                        <div className="flex items-center gap-10 mb-10 md:mb-16">
                            <TechnicalIcon icon={Activity} glowColor="#00FF41" className="scale-75 origin-left" />
                        </div>

                        <h1 className="text-5xl md:text-8xl lg:text-9xl font-[900] tracking-tighter text-white uppercase italic leading-[0.7] mb-12 md:mb-20">
                            <GlitchText text={title} /> <br /><span className="text-white/10"><GlitchText text={subtitle} /></span>
                        </h1>

                        <p className="max-w-3xl text-white/40 text-xl md:text-3xl font-light italic leading-relaxed border-l border-white/10 pl-10">
                            {description}
                        </p>
                    </motion.div>

                </div>

                {/* Hero Asset with Parallax */}
                <motion.div
                    style={{ opacity: imageOpacity }}
                    className="relative h-[60vh] w-full mb-40 rounded-[4rem] md:rounded-[6rem] overflow-hidden border border-white/5 bg-white/[0.01] group backdrop-blur-3xl shadow-2xl"
                >
                    <motion.div style={{ y: imageY }} className="absolute inset-0">
                        <SafeImage
                            src={heroImage}
                            alt={title}
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 opacity-40 group-hover:opacity-100"
                        />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                    {/* HUD Corner Brackets for image */}
                    <div className="absolute top-12 left-12 w-20 h-20 border-t-2 border-l-2 border-white/10 group-hover:border-[#00FF41]/40 transition-colors duration-1000" />
                    <div className="absolute bottom-12 right-12 w-20 h-20 border-b-2 border-r-2 border-white/10 group-hover:border-[#00FF41]/40 transition-colors duration-1000" />
                </motion.div>

                {/* Content Layout */}
                <div className="grid lg:grid-cols-2 gap-32 md:gap-48 items-start">
                    <div className="space-y-24">
                        <div className="relative">
                            <div className="absolute -left-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#00FF41] via-[#00FF41]/10 to-transparent" />
                            <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-12 leading-none">THE_CORE_PROTOCOL</h2>
                            <p className="text-white/30 text-xl md:text-2xl font-light italic leading-relaxed">
                                Our methodologies are refined through thousands of iterations. We do not accept standard benchmarks; we set the threshold for sovereign performance in every operational layer.
                            </p>
                        </div>

                        <div className="grid gap-12">
                            {mainPoints.map((point, idx) => (
                                <motion.div
                                    key={point}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1, duration: 1 }}
                                    className="flex items-center gap-8 group"
                                >
                                    <div className="h-16 w-16 rounded-[1.5rem] bg-white/[0.02] border border-white/5 flex items-center justify-center flex-shrink-0 group-hover:border-[#00FF41]/40 group-hover:bg-[#00FF41]/5 transition-all duration-700 shadow-2xl">
                                        <Check className="h-8 w-8 text-[#00FF41]/40 group-hover:text-[#00FF41] transition-colors" />
                                    </div>
                                    <span className="text-xl font-bold text-white/20 uppercase tracking-[0.2em] group-hover:text-white transition-colors group-hover:translate-x-4 transition-transform duration-500 italic">{point}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="sticky top-40">
                        <div className="bg-white/[0.01] border border-white/5 rounded-[4rem] p-16 md:p-24 backdrop-blur-3xl relative overflow-hidden group shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
                            {/* Scanning line animation */}
                            <motion.div
                                animate={{ y: ['-100%', '1000%'] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                className="absolute top-0 left-0 right-0 h-px bg-[#00FF41]/20 z-0"
                            />

                            <div className="absolute top-0 right-0 p-16 opacity-[0.03] scale-150 rotate-12 group-hover:opacity-[0.08] transition-opacity duration-1000">
                                <IconComponent name={secondaryIconName} className="h-64 w-64 text-white" />
                            </div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-6 mb-16">
                                    <TechnicalIcon icon={Activity} glowColor="#00FF41" className="scale-75" />
                                    <h2 className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tighter">{secondaryTitle}</h2>
                                </div>
                                <div className="space-y-12">
                                    {secondaryPoints.map((point, idx) => (
                                        <motion.div
                                            key={point}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.4 + (idx * 0.1), duration: 1 }}
                                            className="flex items-start gap-10 group/item"
                                        >
                                            <div className="h-[2px] w-8 bg-[#00FF41]/20 mt-4 flex-shrink-0 group-hover/item:w-16 group-hover/item:bg-[#00FF41] transition-all duration-700" />
                                            <span className="text-2xl font-light text-white/30 leading-relaxed italic group-hover/item:text-white/70 transition-colors">{point}</span>
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
