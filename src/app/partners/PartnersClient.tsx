
'use client';

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity-client";
import { SanityImage } from "@/lib/types";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import TechnicalIcon from "@/components/TechnicalIcon";

type Partner = {
    _id: string;
    name: string;
    website?: string;
    logo: SanityImage;
}

export default function PartnersClient({ partners }: { partners: Partner[] }) {
    return (
        <div className="min-h-screen bg-black pt-40 pb-20 overflow-hidden">
            <div className="container px-4">
                {/* Header Section */}
                <div className="max-w-7xl mb-60 relative">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="flex items-center gap-8 mb-12">
                            <TechnicalIcon icon={Globe} glowColor="#00FF41" className="scale-75 origin-left animate-pulse" />
                            <span className="text-[10px] font-black tracking-[1.2em] text-[#00FF41] uppercase">STRATEGIC_ALLIANCE // NETWORK</span>
                        </div>
                        <h1 className="text-7xl md:text-[14vw] font-[900] tracking-[-0.05em] text-white uppercase italic leading-[0.7] mb-16">
                            GLOBAL <span className="text-white/20">NETWORK</span>
                        </h1>
                        <p className="max-w-4xl text-white/40 text-2xl md:text-3xl font-light italic leading-relaxed">
                            Collaborative ecosystem of technology pioneers and security sovereigns. Together, we engineer the perimeter of tomorrow.
                        </p>
                    </motion.div>
                </div>

                {partners && partners.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-20">
                        {partners.map((partner, idx) => (
                            <motion.div
                                key={partner._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                            >
                                <Link href={partner.website || '#'} target="_blank" rel="noopener noreferrer" className="group h-full">
                                    <div className="bg-white/[0.01] border border-white/10 rounded-[4rem] p-16 flex items-center justify-center h-80 hover:bg-white/[0.03] hover:border-[#00FF41]/30 transition-all duration-700 backdrop-blur-3xl relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-12 opacity-[0.01] scale-150 rotate-12 group-hover:opacity-[0.04] transition-opacity">
                                            <Globe className="h-[400px] w-[400px] text-white" />
                                        </div>
                                        <div className="relative z-10 w-full flex flex-col items-center">
                                            <div className="mb-12">
                                                <Image
                                                    src={partner.logo ? urlFor(partner.logo)?.url() : ''}
                                                    alt={partner.name}
                                                    width={240}
                                                    height={80}
                                                    className="h-16 md:h-24 w-auto object-contain grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110"
                                                />
                                            </div>
                                            <div className="text-[10px] font-black text-white/10 tracking-[0.6em] uppercase group-hover:text-[#00FF41]/60 transition-colors">
                                                {partner.name} // AUTH_ALLIANCE
                                            </div>
                                        </div>
                                        {/* Hover Scan Line */}
                                        <div className="absolute left-0 right-0 h-[2px] bg-[#00FF41]/20 -top-full group-hover:top-full transition-all duration-[2000ms] ease-in-out" />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-40 bg-white/[0.01] border border-dashed border-white/10 rounded-[4rem] px-4">
                        <h3 className="text-2xl font-black text-white/20 uppercase italic tracking-widest mb-4">NO_NODES_FOUND</h3>
                        <p className="text-white/10 text-xs font-bold tracking-widest uppercase italic">Establishing connection to partner database...</p>
                    </div>
                )}

                {/* HUD Assurance */}
                <div className="mt-40 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 opacity-10">
                    <div className="text-[8px] font-bold tracking-[0.5em] text-white uppercase font-mono">NETWORK_NODES_v9.0 // LOADED</div>
                    <div className="flex gap-12 text-[8px] font-bold tracking-[0.5em] text-white uppercase italic">
                        " SOUVEREIGNTY THROUGH SYNERGY. "
                    </div>
                </div>
            </div>
        </div>
    );
}
