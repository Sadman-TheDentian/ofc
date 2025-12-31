
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

export default function ServicesClient({ services }: ServicesClientProps) {
    return (
        <div className="min-h-screen bg-black pt-24 md:pt-40 pb-20 overflow-hidden">
            <div className="container px-4">
                <div className="max-w-7xl mb-24 md:mb-60 relative">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="flex items-center gap-8 mb-12">
                            <div className="h-2 w-2 bg-[#00FF41] rounded-full animate-pulse shadow-[0_0_15px_#00FF41]" />
                            <RevealText text="CAPABILITY_RECON // CORE_V6.4" className="text-[10px] font-bold tracking-[1.2em] text-[#00FF41] uppercase" />
                        </div>
                        <h1 className="text-5xl md:text-8xl lg:text-[160px] font-[900] tracking-[-0.05em] text-white uppercase italic leading-[0.7] mb-12 md:mb-16" style={{ fontFamily: "'Outfit', sans-serif" }}>
                            ELITE <br /><span className="text-white/20">PROTOCOLS</span>
                        </h1>
                        <p className="max-w-4xl text-white/40 text-xl md:text-4xl font-light leading-relaxed mb-12 md:mb-20 italic">
                            "Proprietary offensive and defensive methodologies engineered back-to-zero for absolute digital sovereignty."
                        </p>

                        <div className="flex flex-wrap gap-16 items-center border-t border-white/5 pt-12">
                            {[
                                { label: "ACTIVE_CAPABILITIES", value: "04" },
                                { label: "MEAN_RESPONSE_TIME", value: "1.2ms" },
                                { label: "ISO_SYNC_STATUS", value: "NOMINAL" }
                            ].map((stat, i) => (
                                <div key={i} className="flex flex-col gap-4 border-l-2 border-[#00FF41]/20 pl-8">
                                    <span className="text-[10px] font-black tracking-[0.5em] text-[#00FF41] uppercase">{stat.label}</span>
                                    <span className="text-2xl font-black text-white italic lowercase tracking-tighter">[{stat.value}]</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <div className="space-y-[40vh] pb-[20vh]">
                    {services.map((service, index) => {
                        const isSanity = '_id' in service;
                        const imageUrl = isSanity
                            ? (service.mainImage ? service.mainImage : undefined) // Note: actual URL derived in detail
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

    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const rotate = useTransform(scrollYProgress, [0, 1], [isEven ? -2 : 2, isEven ? 2 : -2]);

    return (
        <motion.div
            ref={ref}
            className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-24 items-center`}
        >
            <div className="w-full lg:w-1/2 space-y-12">
                <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="flex items-center gap-4 mb-8">
                        <span className="text-[10px] font-black tracking-[0.4em] text-[#00FF41] uppercase">UN_0{index + 1}</span>
                        <div className="h-px w-12 bg-[#00FF41]/40" />
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none mb-8">
                        {service.title.split(' ').map((word: string, i: number) => (
                            <span key={i} className={i % 2 !== 0 ? "text-white/20" : ""}>{word} </span>
                        ))}
                    </h2>
                    <p className="text-white/40 text-xl font-light italic leading-relaxed max-w-xl mb-12">
                        {service.description}
                    </p>

                    <div className="grid grid-cols-2 gap-8 mb-12">
                        <div className="border-l-2 border-white/5 pl-6 group cursor-default">
                            <div className="text-[9px] font-bold text-white/20 tracking-widest uppercase mb-2">Priority_Index</div>
                            <div className="text-xl font-black text-white group-hover:text-[#00FF41] transition-colors uppercase italic">ALPHA_9</div>
                        </div>
                        <div className="border-l-2 border-white/5 pl-6 group cursor-default">
                            <div className="text-[9px] font-bold text-white/20 tracking-widest uppercase mb-2">Response_Vect</div>
                            <div className="text-xl font-black text-white group-hover:text-[#00FF41] transition-colors uppercase italic">HYPER_SYNC</div>
                        </div>
                    </div>

                    <Button size="lg" className="h-16 px-12 rounded-full bg-white text-black font-black uppercase text-[10px] tracking-[0.3em] hover:bg-[#00FF41] transition-all group" asChild>
                        <Link href={`/services/${slug}`}>
                            ENGAGE_PROTOCOL <ArrowRight className="ml-4 h-4 w-4 transform group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </Button>
                </motion.div>
            </div>

            <motion.div
                style={{ y, rotate }}
                className="w-full lg:w-1/2 relative aspect-square"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00FF41]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-3xl rounded-full" />
                <div className="relative h-full w-full rounded-[4rem] overflow-hidden border border-white/10 p-4 bg-white/[0.02]">
                    <div className="relative h-full w-full rounded-[3.5rem] overflow-hidden">
                        <SafeImage src={typeof imageUrl === 'string' ? imageUrl : undefined} alt={service.title} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                        {/* Interactive HUD overlay on image */}
                        <div className="absolute bottom-16 left-16 right-16 flex justify-between items-end">
                            <div className="scale-125">
                                <TechnicalIcon icon={Activity} glowColor="#00FF41" />
                            </div>
                            <div className="h-32 w-px bg-gradient-to-t from-[#00FF41]/60 to-transparent" />
                        </div>
                    </div>
                </div>

                {/* Asymmetric data points */}
                <div className="absolute -top-6 -left-6 h-12 w-12 rounded-full bg-[#00FF41]/10 backdrop-blur-3xl border border-[#00FF41]/20 hidden md:flex items-center justify-center text-[#00FF41]">
                    <Target className="h-5 w-5" />
                </div>
            </motion.div>
        </motion.div>
    );
}
