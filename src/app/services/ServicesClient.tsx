
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import SafeImage from '@/components/SafeImage';
import RevealText from '@/components/RevealText';
import { ArrowRight, ChevronRight, Activity, Shield, Zap, Target } from 'lucide-react';
import { Button } from "@/components/ui/button";
import TechnicalIcon from '@/components/TechnicalIcon';

import Magnetic from '@/components/Magnetic';
import GlitchText from '@/components/GlitchText';

interface ServicesClientProps {
    services: any[];
}

export default function ServicesClient({ services }: ServicesClientProps) {
    return (
        <div className="min-h-screen bg-black pt-24 md:pt-40 pb-20 overflow-hidden relative">
            <div className="container px-4 relative z-10">
                <div className="max-w-7xl mb-12 md:mb-52 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute -top-40 -left-60 w-96 h-96 bg-[#00FF41]/5 blur-[120px] rounded-full pointer-events-none"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="flex items-center gap-10 mb-10 md:mb-16">
                            <TechnicalIcon icon={Activity} glowColor="#00FF41" className="scale-75 origin-left" />
                            <RevealText text="CAPABILITY_RECON // CORE_V6.4_ASSET_SUBSTRATE" className="text-[10px] font-black tracking-[1.2em] text-[#00FF41] uppercase italic" />
                        </div>
                        <h1 className="text-5xl md:text-8xl lg:text-9xl font-[1000] tracking-tighter text-white uppercase italic leading-[0.85] mb-12">
                            ELITE <br /><span className="text-white/20">PROTOCOLS.</span>
                        </h1>
                        <p className="max-w-4xl text-white/60 text-lg md:text-2xl font-medium italic leading-relaxed mb-16 md:mb-20 border-l border-white/20 pl-10 py-4">
                            "Proprietary offensive and defensive methodologies engineered from the zero-point for absolute digital sovereignty in high-fidelity environments."
                        </p>

                        <div className="flex flex-wrap gap-12 md:gap-32 items-center border-t border-white/5 pt-20">
                            {[
                                { label: "ACTIVE_CAPABILITIES", value: "04" },
                                { label: "MEAN_RESPONSE_TIME", value: "1.2ms" },
                                { label: "ISO_SYNC_STATUS", value: "NOMINAL" }
                            ].map((stat, i) => (
                                <div key={i} className="flex flex-col gap-8 border-l border-[#00FF41]/20 pl-12 group transition-all hover:translate-x-4">
                                    <span className="text-[11px] font-black tracking-[0.6em] text-[#00FF41]/40 group-hover:text-[#00FF41] transition-colors uppercase italic">{stat.label}</span>
                                    <span className="text-3xl md:text-5xl font-[1000] text-white italic lowercase tracking-tighter group-hover:scale-105 transition-transform origin-left">[{stat.value}]</span>
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

    const y = useTransform(scrollYProgress, [0, 1], [50, -150]);
    const rotate = useTransform(scrollYProgress, [0, 1], [isEven ? -5 : 5, isEven ? 5 : -5]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <motion.div
            ref={ref}
            style={{ opacity }}
            className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-24 md:gap-48 items-center group/layer`}
        >
            <div className="w-full lg:w-1/2 space-y-16">
                <motion.div
                    initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="flex items-center gap-10 mb-12">
                        <div className="flex flex-col">
                            <span className="text-[12px] font-black tracking-[0.8em] text-[#00FF41] uppercase italic">UN_0{index + 1}</span>
                            <span className="text-[8px] font-black text-white/10 tracking-[0.5em] mt-2 italic">SECURE_ID_ARCHIVE_{100 + index}</span>
                        </div>
                        <div className="h-px w-32 bg-gradient-to-r from-[#00FF41]/40 to-transparent" />
                    </div>
                    <h2 className="text-5xl md:text-[7vw] font-[1000] text-white italic uppercase tracking-tighter leading-none mb-16 transition-all duration-1000 group-hover/layer:translate-x-12">
                        {service.title.split(' ').map((word: string, i: number) => (
                            <span key={i} className={i % 2 !== 0 ? "text-white/10" : "text-white"}>{word} </span>
                        ))}
                    </h2>
                    <p className="text-white/30 text-xl md:text-3xl font-light italic leading-relaxed max-w-xl mb-20 border-l border-white/10 pl-12 group-hover/layer:border-[#00FF41]/40 transition-colors">
                        {service.description}
                    </p>

                    <div className="grid grid-cols-2 gap-16 mb-20 px-4">
                        <div className="group cursor-default">
                            <div className="text-[10px] font-black text-white/10 tracking-[0.6em] uppercase mb-6 italic group-hover:text-[#00FF41]/40 transition-colors">PRIORITY_INDEX</div>
                            <div className="text-3xl font-[1000] text-white group-hover:text-[#00FF41] transition-all uppercase italic tracking-tighter group-hover:translate-x-4">ALPHA_9</div>
                        </div>
                        <div className="group cursor-default">
                            <div className="text-[10px] font-black text-white/10 tracking-[0.6em] uppercase mb-6 italic group-hover:text-[#00FF41]/40 transition-colors">RESPONSE_VECT</div>
                            <div className="text-3xl font-[1000] text-white group-hover:text-[#00FF41] transition-all uppercase italic tracking-tighter group-hover:translate-x-4">HYPER_SYNC</div>
                        </div>
                    </div>

                    <Magnetic strength={0.2}>
                        <Button size="lg" className="h-24 px-20 border border-white/10 rounded-full bg-white text-black font-[1000] uppercase text-[13px] tracking-[0.5em] hover:bg-[#00FF41] transition-all group/btn shadow-2xl relative overflow-hidden" asChild>
                            <Link href={`/services/${slug}`} className="flex items-center gap-8">
                                <span className="relative z-10 flex items-center gap-8">
                                    ENGAGE_PROTOCOL <ArrowRight className="h-6 w-6 transform group-hover/btn:translate-x-6 transition-transform duration-500" />
                                </span>
                                <div className="absolute inset-0 bg-[#00FF41] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-700" />
                            </Link>
                        </Button>
                    </Magnetic>
                </motion.div>
            </div>

            <motion.div
                style={{ y, rotate }}
                className="w-full lg:w-1/2 relative aspect-square group/image"
            >
                <div className="absolute inset-0 bg-[#00FF41]/20 blur-[150px] rounded-full opacity-0 group-hover/image:opacity-100 transition-opacity duration-1000" />

                {/* HUD Corners */}
                <div className="absolute inset-x-[-40px] inset-y-[-40px] pointer-events-none opacity-0 group-hover/image:opacity-100 transition-opacity duration-700 z-10">
                    <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#00FF41]/60" />
                    <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-[#00FF41]/60" />
                    <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-[#00FF41]/60" />
                    <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#00FF41]/60" />
                </div>

                <div className="relative h-full w-full rounded-[5rem] md:rounded-[8rem] overflow-hidden border border-white/5 p-8 bg-white/[0.01] backdrop-blur-3xl shadow-[0_0_120px_rgba(0,0,0,1)] group-hover/image:border-[#00FF41]/20 transition-all duration-1000">
                    <div className="relative h-full w-full rounded-[4rem] md:rounded-[6rem] overflow-hidden">
                        <SafeImage src={typeof imageUrl === 'string' ? imageUrl : undefined} alt={service.title} fill className="object-cover grayscale brightness-50 group-hover/image:grayscale-0 group-hover/image:brightness-100 group-hover/image:scale-110 transition-all duration-1000" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

                        {/* Interactive HUD overlay on image */}
                        <div className="absolute top-16 left-16 flex items-center gap-6 opacity-0 group-hover/image:opacity-100 transition-all duration-1000 translate-y-8 group-hover/image:translate-y-0">
                            <div className="h-2 w-2 bg-[#00FF41] rounded-full animate-pulse shadow-[0_0_15px_#00FF41]" />
                            <span className="text-[10px] font-black text-[#00FF41] tracking-[0.8em] uppercase italic">STREAM_LINK_STABLE</span>
                        </div>

                        <div className="absolute bottom-20 left-20 right-20 flex justify-between items-end opacity-0 group-hover/image:opacity-100 transition-all duration-1000 translate-y-8 group-hover/image:translate-y-0">
                            <div className="scale-150 origin-bottom-left">
                                <TechnicalIcon icon={Activity} glowColor="#00FF41" className="animate-pulse" />
                            </div>
                            <div className="flex flex-col items-end gap-4 text-right">
                                <div className="text-[9px] font-black text-white/40 tracking-[0.5em] uppercase mb-2 italic">TELEM_V3_MATRIX</div>
                                <div className="h-1 w-48 bg-white/5 relative overflow-hidden rounded-full">
                                    <motion.div
                                        animate={{ x: ['-100%', '100%'] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00FF41] to-transparent shadow-[0_0_20px_#00FF41]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Asymmetric data points */}
                <motion.div
                    animate={{ y: [0, -30, 0], rotate: [0, 45, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-16 -left-16 h-28 w-28 rounded-full bg-black border border-[#00FF41]/20 flex items-center justify-center text-[#00FF41] shadow-[0_0_80px_rgba(0,255,65,0.2)] z-20 group-hover/image:scale-125 transition-transform duration-1000"
                >
                    <Target className="h-12 w-12" />
                    <div className="absolute inset-0 border border-[#00FF41]/40 rounded-full animate-ping opacity-20" />
                </motion.div>

                <div className="absolute -bottom-10 -right-10 px-8 py-3 bg-white text-black font-black text-[9px] tracking-[0.5em] uppercase italic italic shadow-2xl skew-x-[-12deg] z-20 opacity-0 group-hover/image:opacity-100 transition-opacity">
                    RECON_VISUAL_0{index + 1}
                </div>
            </motion.div>
        </motion.div>
    );
}
