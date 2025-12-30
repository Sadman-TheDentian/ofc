
'use client';

import Link from "next/link";
import { Github, Twitter, Linkedin, Youtube, ArrowRight, ShieldCheck, Cpu, Globe, Lock, Mail, Anchor } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { motion } from "framer-motion";
import Magnetic from "../Magnetic";

const logoUrl = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEirwhyibjl-3Guf8S6G442OtQmAdOzHrTcxPAuK6QxCGcAJ2I88K7Ee9DN-k_SONDddf2FeB4SwHO8l29PZ9HvHHlxJxiPDnfgrY1DBS60HsVaYv0uOAi08fm6KyrwhM7HPQhbQhL5ufVU_efX268tXM4rR8Vwok_UqbSar_b-B4btAigP5BFaU12PCjUE/s320/DENTI.SYSTEMS%20PNJ.png";

const footerLinks = {
  Infrastructure: [
    { label: "Firewall_v6", href: "/services" },
    { label: "Cloud_Substrate", href: "/services" },
    { label: "Endpoint_Nodes", href: "/services" },
    { label: "Zero_Day_Lab", href: "/threat-intelligence" }
  ],
  Knowledge: [
    { label: "The_Substrate", href: "/technology" },
    { label: "System_Manuals", href: "/docs" },
    { label: "Intel_Academy", href: "/training" },
    { label: "Mission_Archive", href: "/news" },
    { label: "System_Health", href: "/status" }
  ],
  Organization: [
    { label: "The_Collective", href: "/about" },
    { label: "Collective_Expansion", href: "/careers" },
    { label: "Global_Alliances", href: "/partners" },
    { label: "Sovereign_Compliance", href: "/compliance" },
    { label: "Brand_Assets", href: "/brand" },
    { label: "Asset_Registry", href: "/products" },
    { label: "Command_Link", href: "/contact" }
  ],
};

export default function Footer() {
  const [currentYear] = useState(new Date().getFullYear());

  return (
    <footer className="bg-black border-t border-white/5 pt-40 pb-40 relative overflow-hidden">
      {/* Background Architectural Grid (Selective) */}
      <div className="absolute bottom-0 left-0 right-0 h-[800px] opacity-[0.03] pointer-events-none overflow-hidden select-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          maskImage: 'linear-gradient(to top, black, transparent)'
        }} />
      </div>

      <div className="container px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-32 lg:gap-16 mb-60">

          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex flex-col mb-16 group">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center group-hover:border-[#00FF41]/50 transition-all duration-700">
                  <Image src={logoUrl} alt="Logo" width={32} height={32} className="opacity-60 group-hover:opacity-100" />
                </div>
                <span className="text-3xl font-[900] italic text-white uppercase tracking-tighter">DENTI<span className="text-white/20">SYSTEMS</span></span>
              </div>
              <div className="flex items-center gap-2 mt-4 ml-14">
                <div className="h-px w-8 bg-[#00FF41]/40" />
                <span className="text-[7px] font-bold tracking-[0.6em] text-white/20 uppercase">Parent_Entity // Sovereign_Control</span>
              </div>
            </Link>
            <p className="max-w-sm text-white/30 text-lg font-light leading-relaxed mb-12 italic">
              Architecting absolute digital sovereignty through proprietary offensive research and high-fidelity defensive substrates.
            </p>

            {/* Newsletter Segment */}
            <div className="max-w-md bg-white/[0.02] border border-white/5 rounded-3xl p-8 mb-12 group/intel">
              <div className="flex items-center gap-4 mb-6">
                <Mail className="h-4 w-4 text-[#00FF41]" />
                <span className="text-[10px] font-bold tracking-[0.4em] text-white/40 uppercase">SUBSCRIBE_TO_INTEL</span>
              </div>
              <div className="flex gap-4">
                <Input className="bg-transparent border-white/10 rounded-full h-12 px-6 text-[11px] focus-visible:ring-[#00FF41]" placeholder="RECIPIENT_ADDRESS..." />
                <Button className="h-12 w-12 rounded-full bg-white text-black p-0 shrink-0 hover:bg-[#00FF41] transition-colors">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-6">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <Magnetic key={i} strength={0.2}>
                  <Link href="#" className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center text-white/20 hover:text-white hover:border-[#00FF41] transition-all bg-white/[0.02]">
                    <Icon className="h-4 w-4" />
                  </Link>
                </Magnetic>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-12 lg:pl-20">
            {Object.entries(footerLinks).map(([title, links], idx) => (
              <div key={title} className="flex flex-col">
                <div className="flex items-center gap-4 mb-10">
                  <span className="text-[9px] font-bold text-[#00FF41] opacity-40">0{idx + 1}</span>
                  <h4 className="text-[10px] font-bold tracking-[0.6em] text-white uppercase italic">{title}</h4>
                </div>
                <ul className="space-y-6">
                  {links.map(link => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-[11px] font-medium tracking-widest text-white/30 hover:text-white transition-all group/link flex items-center gap-3">
                        <div className="h-px w-0 bg-[#00FF41] group-hover/link:w-4 transition-all" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/5">
          <div className="flex items-center gap-12 text-[9px] font-bold tracking-[0.4em] text-white/10 uppercase">
            <span>&copy; {currentYear} DENTISYSTEMS_INTL // ALL_RIGHTS_RESERVED</span>
          </div>
          <div className="flex gap-12 text-[9px] font-bold tracking-[0.5em] text-white/10 uppercase">
            <Link href="/privacy" className="hover:text-white transition-colors relative overflow-hidden group/leg">
              Privacy_Protocol
              <div className="absolute bottom-0 left-0 w-full h-px bg-[#00FF41] scale-x-0 group-hover/leg:scale-x-100 transition-transform origin-right" />
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors relative overflow-hidden group/leg">
              Terms_of_Sync
              <div className="absolute bottom-0 left-0 w-full h-px bg-[#00FF41] scale-x-0 group-hover/leg:scale-x-100 transition-transform origin-right" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
