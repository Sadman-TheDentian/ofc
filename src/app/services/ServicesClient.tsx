
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import SafeImage from '@/components/SafeImage';
import RevealText from '@/components/RevealText';
import { ArrowRight, ChevronRight, Activity, Shield, Zap, Target } from 'lucide-react';
import { Button } from "@/components/ui/button";
import TechnicalIcon from '@/components/TechnicalIcon';

interface ServicesClientProps {
    services: any[];
}

import GlitchText from '@/components/GlitchText';

export default function ServicesClient({ services }: ServicesClientProps) {
    return (
        <div className="min-h-screen bg-black pt-24 md:pt-40 pb-20 overflow-hidden relative">
            <div className="container px-4 relative z-10">
                <div className="max-w-7xl mb-12 md:mb-40 relative">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="flex items-center gap-10 mb-10 md:mb-16">
                            <TechnicalIcon icon={Activity} glowColor="#00FF41" className="scale-75 origin-left" />
                            <RevealText text="CAPABILITY_RECON // CORE_V6.4" className="text-[10px] font-bold tracking-[1.2em] text-[#00FF41] uppercase" />
                        </div>
                        <h1 className="text-5xl md:text-8xl lg:text-[140px] font-[900] tracking-[-0.05em] text-white uppercase italic leading-[0.7] mb-12 md:mb-20">
                            <GlitchText text="ELITE" /> <br /><span className="text-white/20"><GlitchText text="PROTOCOLS." /></span>
                        </h1>
                        <p className="max-w-4xl text-white/40 text-xl md:text-4xl font-light italic leading-relaxed mb-16 md:mb-24">
                            "Proprietary offensive and defensive methodologies engineered back-to-zero for absolute digital sovereignty."
                        </p>

                        <div className="flex flex-wrap gap-12 md:gap-24 items-center border-t border-white/5 pt-16">
                            {[
                                { label: "ACTIVE_CAPABILITIES", value: "04" },
                                { label: "MEAN_RESPONSE_TIME", value: "1.2ms" },
                                { label: "ISO_SYNC_STATUS", value: "NOMINAL" }
                            ].map((stat, i) => (
                                <div key={i} className="flex flex-col gap-6 border-l border-[#00FF41]/20 pl-10 group">
                                    <span className="text-[10px] font-black tracking-[0.6em] text-[#00FF41]/40 group-hover:text-[#00FF41] transition-colors uppercase">{stat.label}</span>
                                    <span className="text-3xl md:text-4xl font-black text-white italic lowercase tracking-tighter group-hover:scale-105 transition-transform origin-left">[{stat.value}]</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <div className="space-y-[30vh] md:space-y-[50vh] pb-[20vh]">
                    {services.map((service, index) => {
                        const isSanity = '_id' in service;
                        const imageUrl = isSanity
                            ? (service.mainImage ? service.mainImage : undefined)
                            : (service as any).imageUrl;
                        const slug = isSanity ? (service as any).slug.current : (service as any).slug;

                        return (
                            <ServiceLayer key={index} service={service} index={index} slug={slug} imageUrl={imageUrl} />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

function ServiceLayer({ service, index, slug, imageUrl }: { service: any, index: number, slug: string, imageUrl: any }) {
    const isEven = index % 2 === 0;
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const rotate = useTransform(scrollYProgress, [0, 1], [isEven ? -3 : 3, isEven ? 3 : -3]);

    return (
        <motion.div
            ref={ref}
            className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-24 md:gap-40 items-center`}
        >
            <div className="w-full lg:w-1/2 space-y-16">
                <motion.div
                    initial={{ opacity: 0, x: isEven ? -60 : 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="flex items-center gap-6 mb-10">
                        <span className="text-[11px] font-black tracking-[0.8em] text-[#00FF41] uppercase">UN_0{index + 1}</span>
                        <div className="h-px w-20 bg-[#00FF41]/20" />
                    </div>
                    <h2 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-none mb-12 group-hover:translate-x-4 transition-transform duration-700">
                        {service.title.split(' ').map((word: string, i: number) => (
                            <span key={i} className={i % 2 !== 0 ? "text-white/10" : "text-white"}>{word} </span>
                        ))}
                    </h2>
                    <p className="text-white/30 text-xl md:text-2xl font-light italic leading-relaxed max-w-xl mb-16">
                        {service.description}
                    </p>

                    <div className="grid grid-cols-2 gap-12 mb-16 border-l border-white/5 pl-10">
                        <div className="group cursor-default">
                            <div className="text-[9px] font-bold text-white/10 tracking-[0.6em] uppercase mb-4">Priority_Index</div>
                            <div className="text-2xl font-black text-white group-hover:text-[#00FF41] transition-colors uppercase italic tracking-tighter">ALPHA_9</div>
                        </div>
                        <div className="group cursor-default">
                            <div className="text-[9px] font-bold text-white/10 tracking-[0.6em] uppercase mb-4">Response_Vect</div>
                            <div className="text-2xl font-black text-white group-hover:text-[#00FF41] transition-colors uppercase italic tracking-tighter">HYPER_SYNC</div>
                        </div>
                    </div>

                    <Button size="lg" className="h-20 px-16 rounded-full bg-white text-black font-black uppercase text-[12px] tracking-[0.4em] hover:bg-[#00FF41] transition-all group shadow-[0_20px_60px_rgba(255,255,255,0.1)] hover:shadow-[0_20px_80px_rgba(0,255,65,0.3)]" asChild>
                        <Link href={`/services/${slug}`}>
                            ENGAGE_PROTOCOL <ArrowRight className="ml-6 h-6 w-6 transform group-hover:translate-x-4 transition-transform" />
                        </Link>
                    </Button>
                </motion.div>
            </div>

            <motion.div
                style={{ y, rotate }}
                className="w-full lg:w-1/2 relative aspect-square group/image"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00FF41]/30 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-1000 blur-[100px] rounded-full" />
                <div className="relative h-full w-full rounded-[4rem] md:rounded-[6rem] overflow-hidden border border-white/5 p-6 bg-white/[0.01] backdrop-blur-3xl shadow-2xl">
                    <div className="relative h-full w-full rounded-[3rem] md:rounded-[5rem] overflow-hidden">
                        <SafeImage src={typeof imageUrl === 'string' ? imageUrl : undefined} alt={service.title} fill className="object-cover grayscale group-hover/image:grayscale-0 group-hover/image:scale-110 transition-all duration-1000" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        {/* Interactive HUD overlay on image */}
                        <div className="absolute top-12 left-12 flex items-center gap-4 opacity-0 group-hover/image:opacity-100 transition-all duration-700">
                            <div className="h-1.5 w-1.5 bg-[#00FF41] rounded-full animate-pulse" />
                            <span className="text-[8px] font-black text-[#00FF41] tracking-[0.5em] uppercase">LINK_ACTIVE</span>
                        </div>

                        <div className="absolute bottom-16 left-16 right-16 flex justify-between items-end group-hover/image:translate-y-[-20px] transition-transform duration-700">
                            <div className="scale-150 origin-bottom-left">
                                <TechnicalIcon icon={Activity} glowColor="#00FF41" />
                            </div>
                            <div className="flex flex-col items-end gap-2 text-right">
                                <div className="text-[7px] font-mono text-white/40 tracking-widest uppercase mb-2">TELEMETRY_STREAM</div>
                                <div className="h-0.5 w-32 bg-white/10 relative overflow-hidden">
                                    <motion.div
                                        animate={{ x: ['-100%', '100%'] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 bg-[#00FF41]/40"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Asymmetric data points */}
                <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-10 -left-10 h-20 w-20 rounded-full bg-black border border-[#00FF41]/20 flex items-center justify-center text-[#00FF41] shadow-[0_0_40px_rgba(0,255,65,0.1)] z-20"
                >
                    <Target className="h-8 w-8" />
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
