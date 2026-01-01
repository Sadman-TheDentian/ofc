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
	const { scrollY } = useScroll();
	const y1 = useTransform(scrollY, [0, 500], [0, 150]);
	const opacity = useTransform(scrollY, [0, 400], [1, 0]);

	return (
		<section ref={containerRef} className="relative min-h-[110vh] w-full bg-black overflow-hidden flex items-center justify-center pt-24 md:pt-40 pb-20">
			<DigitalHorizon />

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

				<div className="mb-12 max-w-7xl w-full text-center">
					{typeof title === "string" ? (
						<motion.h1
							initial={{ y: 100, opacity: 0, filter: "blur(20px)" }}
							animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
							transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
							className="relative text-[10vw] md:text-[8vw] lg:text-[150px] font-[1000] tracking-[-0.08em] text-white uppercase leading-[0.8] mb-8"
							style={{ fontFamily: "'Outfit', sans-serif" }}
						>
							<div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-full w-full bg-white/[0.02] blur-3xl pointer-events-none -z-10" />
							{title.split(' ').map((word, i) => (
								<GlitchText
									key={i}
									text={word + (i < title.split(' ').length - 1 ? ' ' : '')}
									className={i % 2 !== 0 ? "text-white/20" : "text-white"}
								/>
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
					className="max-w-2xl mx-auto text-base md:text-xl text-white/40 mb-12 md:mb-16 font-light leading-relaxed text-center tracking-wide px-4"
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
						<Magnetic key={idx} strength={0.2}>
							<Button
								asChild
								size="lg"
								className={`h-22 px-16 rounded-full text-[13px] font-[1000] uppercase tracking-[0.3em] transition-all duration-700 border-0 ${btn.primary
									? "bg-white text-black hover:bg-[#00FF41] hover:text-black shadow-[0_20px_60px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_80px_rgba(0,255,65,0.4)]"
									: "bg-white/[0.03] border border-white/10 hover:bg-white/[0.1] text-white backdrop-blur-md"
									} relative overflow-hidden group/btn`}
							>
								<Link href={btn.href || "#"}>
									<span className="relative z-10 flex items-center">
										{btn.text}
										{btn.primary && (
											<ArrowRight className="ml-4 h-5 w-5 group-hover/btn:translate-x-3 transition-transform duration-500" />
										)}
									</span>
									<div className="absolute inset-0 bg-[#00FF41] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-700 pointer-events-none" />
								</Link>
							</Button>
						</Magnetic>
					))}
				</motion.div>

				{/* Tactical Status Stream - High-Fidelity HUD */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 2, delay: 1.5 }}
					className="mt-40 w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0"
				>
					{microDetails?.map((detail, idx) => (
						<motion.div
							key={idx}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 1.6 + (idx * 0.2), duration: 1 }}
							className="flex flex-col items-center md:items-start px-12 relative group"
						>
							{/* Horizontal Connector for Desktop */}
							{idx < microDetails.length - 1 && (
								<div className="absolute top-1/2 right-0 w-px h-10 bg-white/5 hidden md:block -translate-y-1/2" />
							)}

							<div className="flex items-center gap-6 mb-4">
								<div className="relative">
									<div className="h-2 w-2 rounded-full bg-[#00FF41] animate-pulse shadow-[0_0_10px_#00FF41]" />
									<div className="absolute inset-0 h-2 w-2 rounded-full bg-[#00FF41]/40 animate-ping" />
								</div>
								<span className="text-[11px] font-[1000] text-white tracking-[0.6em] uppercase italic group-hover:text-[#00FF41] transition-colors duration-700">
									{detail}
								</span>
							</div>

							<div className="flex items-center gap-4 w-full">
								<div className="h-[1px] flex-grow bg-white/5 group-hover:bg-[#00FF41]/20 transition-all duration-700"></div>
								<div className="flex items-center gap-3">
									<span className="text-[7px] font-mono text-white/10 uppercase tracking-widest group-hover:text-white/30 transition-colors">L-VAL: {0.982 + idx * 0.005}</span>
									<span className="text-[7px] font-mono text-[#00FF41]/40 uppercase tracking-widest italic font-black">NOMINAL</span>
								</div>
							</div>

							{/* Hover Background Accent */}
							<div className="absolute inset-0 bg-[#00FF41]/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-2xl -z-10" />
						</motion.div>
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
		</section >
	);
};

export default SyntheticHero;
