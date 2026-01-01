"use client";

import { ReactNode, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

interface HeroProps {
	title: string | ReactNode;
	description: string;
	ctaButtons?: Array<{ text: string; href?: string; primary?: boolean }>;
	microDetails?: Array<string>;
}

import GlitchText from "../GlitchText";
import DigitalHorizon from "./DigitalHorizon";
import Magnetic from "../Magnetic";

const SyntheticHero = ({
	title = "DIGITAL SOVEREIGNTY",
	description = "Elite offensive security and predictive intelligence for the world's most critical infrastructures.",
	ctaButtons = [
		{ text: "INITIATE PROTOCOL", href: "/contact", primary: true },
		{ text: "CAPABILITIES", href: "/services" },
	],
	microDetails = [
		"OFFENSIVE_RESEARCH",
		"SECURE_ARCHITECTURE",
		"INTELLIGENCE_MINING",
	],
}: HeroProps) => {
	const containerRef = useRef<HTMLElement | null>(null);

	return (
		<section ref={containerRef} className="relative min-h-screen w-full bg-black flex flex-col items-center justify-center py-20">
			<DigitalHorizon />

			<div className="container relative z-20 px-4 flex flex-col items-center justify-center flex-grow">
				<div className="max-w-5xl w-full text-center mb-8">
					<motion.h1
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
						className="text-6xl md:text-8xl lg:text-[100px] font-black tracking-tighter text-white uppercase leading-tight"
						style={{ fontFamily: "'Outfit', sans-serif" }}
					>
						{title}
					</motion.h1>
				</div>

				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
					className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 mb-12 font-medium leading-relaxed text-center"
				>
					{description}
				</motion.p>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.3 }}
					className="flex flex-col sm:flex-row gap-6 justify-center items-center"
				>
					{ctaButtons?.map((btn, idx) => (
						<Button
							key={idx}
							asChild
							size="lg"
							className={`h-14 px-10 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 ${btn.primary
								? "bg-white text-black hover:bg-[#00FF41]"
								: "bg-transparent border border-white/20 hover:bg-white/5 text-white"
								}`}
						>
							<Link href={btn.href || "#"}>
								{btn.text}
								{btn.primary && <ArrowRight className="ml-3 h-4 w-4" />}
							</Link>
						</Button>
					))}
				</motion.div>

				{/* Professional Status Stream */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1, delay: 0.5 }}
					className="mt-20 w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-8"
				>
					{microDetails?.map((detail, idx) => (
						<div key={idx} className="flex flex-col items-center sm:items-start border-l border-white/10 pl-6">
							<div className="flex items-center gap-3 mb-2">
								<div className="h-1.5 w-1.5 rounded-full bg-[#00FF41]" />
								<span className="text-[10px] font-bold text-white/80 tracking-widest uppercase">
									{detail}
								</span>
							</div>
							<span className="text-[9px] font-mono text-white/30 tracking-widest uppercase">STATUS: NOMINAL</span>
						</div>
					))}
				</motion.div>
			</div>

			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30 opacity-30">
				<span className="text-[9px] tracking-widest font-bold text-white uppercase">SCROLL</span>
				<div className="h-8 w-[1px] bg-white/40" />
			</div>
		</section>
	);
};

export default SyntheticHero;
