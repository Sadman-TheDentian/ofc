
'use client';

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SafeImage from "@/components/SafeImage";

interface ServiceCardProps {
    service: any;
    imageUrl?: string;
    slug: string;
    index: number;
}

export default function ServiceCard({ service, imageUrl, slug, index }: ServiceCardProps) {
    return (
        <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
            whileHover={{ y: -8 }}
            className="h-full"
        >
            <Link href={`/services/${slug}`} className="group block h-full">
                <Card className="flex flex-col h-full overflow-hidden transition-all duration-1000 bg-white/[0.01] border border-white/5 hover:border-[#00FF41]/30 group rounded-[3.5rem] relative backdrop-blur-3xl shadow-none hover:shadow-[0_40px_80px_rgba(0,0,0,0.8)]">
                    <div className="relative h-80 w-full overflow-hidden">
                        <SafeImage
                            src={imageUrl}
                            alt={service.title}
                            fill
                            className="transition-transform duration-[2000ms] group-hover:scale-110 opacity-30 grayscale group-hover:grayscale-0 group-hover:opacity-100"
                            style={{ objectFit: "cover" }}
                            data-ai-hint={(service as any).imageHint}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

                        {/* Architectural Line Decoration */}
                        <div className="absolute top-10 right-10 flex flex-col items-end gap-2">
                            <div className="h-[1px] w-0 bg-[#00FF41]/60 group-hover:w-16 transition-all duration-1000" />
                            <span className="text-[7px] font-black text-white/10 tracking-[0.4em] uppercase group-hover:text-[#00FF41]/40 transition-colors">v7.2 // OPS</span>
                        </div>
                    </div>

                    <CardHeader className="p-12 pb-4 relative z-10">
                        <CardTitle className="text-4xl md:text-5xl font-black text-white group-hover:text-[#00FF41] transition-colors duration-700 uppercase italic tracking-tighter leading-[0.85]">
                            {service.title.split(' ').map((word: string, i: number) => (
                                <span key={i} className="block">{word}</span>
                            ))}
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="p-12 pt-4 flex-grow flex flex-col relative z-10">
                        <p className="text-white/20 text-sm md:text-base font-light leading-relaxed line-clamp-3 flex-grow mb-12 group-hover:text-white/40 transition-colors duration-700 italic">
                            {service.description}
                        </p>
                        <div className="flex items-center justify-between mt-auto">
                            <span className="text-[8px] font-black uppercase tracking-[0.5em] text-white/5 group-hover:text-white/20 transition-colors duration-700">PROTO_ESTABLISHED</span>
                            <div className="h-14 w-14 rounded-full border border-white/10 flex items-center justify-center text-white/20 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-700 transform group-hover:rotate-[-45deg]">
                                <ArrowRight className="h-6 w-6" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </motion.div>
    );
}
