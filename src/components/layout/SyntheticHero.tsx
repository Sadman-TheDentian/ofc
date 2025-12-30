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
	const { scrollY } = useScroll();
	const y1 = useTransform(scrollY, [0, 500], [0, 150]);
	const opacity = useTransform(scrollY, [0, 400], [1, 0]);

	return (
		<section ref={containerRef} className="relative min-h-[110vh] w-full bg-black overflow-hidden flex items-center justify-center pt-32 pb-20">
			{/* Architectural Lighting */}
			<motion.div
				style={{ y: y1, opacity }}
				className="absolute inset-0 z-0"
			>
				<div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-[#00FF41]/5 via-transparent to-transparent blur-[120px] pointer-events-none"></div>
				<div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none"></div>
				<div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#00FF41]/5 rounded-full blur-[140px] pointer-events-none"></div>

				{/* Neural Particles / Data Streams */}
				{[...Array(50)].map((_, i) => (
					<motion.div
						key={i}
						animate={{
							opacity: [0, 0.4, 0],
							scale: [0, 1.2, 0],
							y: [0, -100 - Math.random() * 200]
						}}
						transition={{
							duration: 10 + Math.random() * 20,
							repeat: Infinity,
							delay: Math.random() * 10,
							ease: "linear"
						}}
						className="absolute h-[1px] w-[1px] bg-[#00FF41]/40 rounded-full"
						style={{
							left: `${Math.random() * 100}%`,
							top: `${70 + Math.random() * 30}%`
						}}
					/>
				))}

				{/* Architectural Specifications (Visual Depth) */}
				{[
					"DENTI_SYNC_PROTOCOL_v7.4",
					"CORE_SUBSTRATE_VERIFIED",
					"NEURAL_MESH_ACTIVE",
					"ZERO_TRUST_ENFORCEMENT",
					"MISSION_CRITICAL_HUD",
					"Sovereign_Link_Active"
				].map((label, i) => (
					<motion.div
						key={`code-${i}`}
						initial={{ opacity: 0 }}
						animate={{ opacity: [0, 0.05, 0], x: [0, 30, 0] }}
						transition={{ duration: 15, repeat: Infinity, delay: i * 2 }}
						className="absolute text-[8px] font-black tracking-[0.3em] text-[#00FF41]/40 select-none pointer-events-none uppercase italic"
						style={{
							left: `${10 + (i * 15) % 80}%`,
							top: `${20 + (i * 12) % 65}%`
						}}
					>
						{label}
					</motion.div>
				))}
			</motion.div>

			<div className="container relative z-20 px-4 flex flex-col items-center">

				<div className="space-y-6 mb-12 max-w-7xl w-full text-center">
					{typeof title === "string" ? (
						<motion.h1
							initial={{ y: 100, opacity: 0, filter: "blur(20px)" }}
							animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
							transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
							className="text-[14vw] sm:text-[12vw] lg:text-[180px] font-[900] tracking-[-0.07em] text-white uppercase leading-[0.7] mix-blend-difference"
							style={{ fontFamily: "'Outfit', sans-serif" }}
						>
							{title.split(' ').map((word, i) => (
								<span key={i} className={i % 2 !== 0 ? "text-white/10" : "text-white"}>{word} </span>
							))}
						</motion.h1>
					) : (
						title
					)}
				</div>

				<motion.p
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 1, delay: 0.7 }}
					className="max-w-2xl mx-auto text-lg md:text-xl text-white/40 mb-16 font-light leading-relaxed text-center tracking-wide"
				>
					{description}
				</motion.p>

				<motion.div
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 1, delay: 0.9 }}
					className="flex flex-col sm:flex-row gap-10 justify-center items-center"
				>
					{ctaButtons?.map((btn, idx) => (
						<motion.div
							key={idx}
							whileHover={{ scale: 1.05, y: -2 }}
							whileTap={{ scale: 0.98 }}
						>
							<Button
								asChild
								size="lg"
								className={`h-16 px-14 rounded-full text-[13px] font-bold uppercase tracking-[0.2em] transition-all duration-500 border-0 ${btn.primary
									? "bg-white text-black hover:bg-[#00FF41] hover:text-black shadow-[0_20px_40px_rgba(255,255,255,0.1)] hover:shadow-[0_20px_60px_rgba(0,255,65,0.3)]"
									: "bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] text-white backdrop-blur-md"
									}`}
							>
								<Link href={btn.href || "#"}>
									{btn.text}
									{btn.primary && (
										<ArrowRight className="ml-3 h-5 w-5" />
									)}
								</Link>
							</Button>
						</motion.div>
					))}
				</motion.div>

				{/* Micro-Details / Status Stream */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 2, delay: 1.5 }}
					className="mt-32 flex flex-wrap justify-center gap-x-20 gap-y-10"
				>
					{microDetails?.map((detail, idx) => (
						<div key={idx} className="flex flex-col items-center gap-3 group">
							<span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 group-hover:text-[#00FF41] transition-colors duration-500">
								{detail}
							</span>
							<div className="h-[1px] w-8 bg-white/10 group-hover:bg-[#00FF41] transition-all duration-500"></div>
						</div>
					))}
				</motion.div>
			</div>

			{/* Architectural Shadows */}
			<div className="absolute bottom-0 left-0 right-0 h-[30vh] bg-gradient-to-t from-black via-black/90 to-transparent z-20"></div>
			<div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-30 opacity-20">
				<span className="text-[8px] tracking-[0.8em] font-bold text-white uppercase translate-x-1">SCROLL_TO_EXPLORE</span>
				<motion.div
					animate={{ y: [0, 10, 0] }}
					transition={{ repeat: Infinity, duration: 2 }}
					className="h-12 w-[1px] bg-gradient-to-b from-white to-transparent"
				/>
			</div>
		</section>
	);
};

export default SyntheticHero;
