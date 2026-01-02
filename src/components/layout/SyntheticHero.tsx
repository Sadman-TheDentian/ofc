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
}: HeroProps) => {
	const containerRef = useRef<HTMLElement | null>(null);

	return (
		<section ref={containerRef} className="relative h-screen min-h-[700px] w-full bg-black overflow-hidden flex items-center justify-center p-4">
			<DigitalHorizon />

			{/* Subtle Architectural Lighting */}
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.03),transparent_60%)]" />
				<motion.div
					initial={{ y: "-200%" }}
					animate={{ y: "200%" }}
					transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
					className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00FF41]/10 to-transparent z-0 opacity-10 pointer-events-none blur-sm"
				/>
			</div>

			<div className="container relative z-20 flex flex-col items-center">
				<div className="max-w-[1400px] w-full text-center">
					<motion.h1
						initial={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
						animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
						transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
						className="relative text-[10vw] lg:text-[140px] font-black tracking-[-0.06em] leading-[0.8] mb-12 uppercase italic"
						style={{ fontFamily: "'Outfit', sans-serif" }}
					>
						<GlitchText text={typeof title === 'string' ? title : "DIGITAL SOVEREIGNTY"} />
					</motion.h1>
				</div>

				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, delay: 0.4 }}
					className="max-w-2xl mx-auto text-base md:text-xl text-white/40 mb-12 font-light leading-relaxed text-center italic"
				>
					{description}
				</motion.p>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, delay: 0.6 }}
					className="flex flex-col sm:flex-row gap-10 justify-center items-center"
				>
					{ctaButtons?.map((btn, idx) => (
						<Magnetic key={idx} strength={0.2}>
							<Button
								asChild
								size="lg"
								className={`h-20 px-16 rounded-full text-xs font-black uppercase tracking-[0.4em] transition-all duration-500 ${btn.primary
									? "bg-white text-black hover:bg-[#00FF41]"
									: "bg-white/[0.02] border border-white/5 hover:bg-white/10 text-white"
									}`}
							>
								<Link href={btn.href || "#"}>
									{btn.text}
									{btn.primary && <ArrowRight className="ml-4 h-4 w-4" />}
								</Link>
							</Button>
						</Magnetic>
					))}
				</motion.div>

			</div>

		</section>
	);
};

export default SyntheticHero;
