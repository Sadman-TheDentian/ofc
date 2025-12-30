
'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShieldAlert, ArrowRight, Zap } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden text-center px-4">
            {/* Background HUD Grid */}
            <div className="absolute inset-0 z-0 opacity-[0.05]" style={{
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
                backgroundSize: '100px 100px'
            }} />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative z-10"
            >
                <div className="h-24 w-24 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-12 shadow-[0_0_50px_rgba(239,68,68,0.2)]">
                    <ShieldAlert className="h-10 w-10 text-red-500 animate-pulse" />
                </div>

                <div className="space-y-4 mb-12">
                    <span className="text-[10px] font-bold tracking-[1em] text-red-500 uppercase">ERROR_404 // NODE_NOT_FOUND</span>
                    <h1 className="text-7xl md:text-9xl font-black text-white italic uppercase tracking-tighter leading-none">
                        LINK <span className="text-white/20">SEVERED.</span>
                    </h1>
                    <p className="max-w-md mx-auto text-white/30 text-lg md:text-xl font-light italic leading-relaxed">
                        The requested data node does not exist in our sovereign archive. The path may have been neutralized or moved.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Button size="lg" className="h-16 px-12 rounded-full bg-white text-black font-black uppercase text-[10px] tracking-[0.3em] hover:bg-[#00FF41] transition-all" asChild>
                        <Link href="/">RETURN_TO_BASE</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="h-16 px-12 rounded-full border-white/10 text-white font-black uppercase text-[10px] tracking-[0.3em] hover:bg-white/5 transition-all" asChild>
                        <Link href="/contact">SECURITY_SUPPORT <Zap className="ml-4 h-4 w-4" /></Link>
                    </Button>
                </div>
            </motion.div>

            {/* Decorative Binary Rain (Subtle) */}
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-red-500/5 to-transparent pointer-events-none" />
        </div>
    );
}
