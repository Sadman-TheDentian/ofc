
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu, ArrowRight, Shield, Command, Radio } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/auth';
import Image from 'next/image';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import React, { useState, useEffect } from 'react';
import Magnetic from '@/components/Magnetic';

const logoUrl =
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEirwhyibjl-3Guf8S6G442OtQmAdOzHrTcxPAuK6QxCGcAJ2I88K7Ee9DN-k_SONDddf2FeB4SwHO8l29PZ9HvHHlxJxiPDnfgrY1DBS60HsVaYv0uOAi08fm6KyrwhM7HPQhbQhL5ufVU_efX268tXM4rR8Vwok_UqbSar_b-B4btAigP5BFaU12PCjUE/s320/DENTI.SYSTEMS%20PNJ.png';

export default function Header(): JSX.Element {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-[100] pt-6 md:pt-10 flex justify-center px-4 md:px-8 pointer-events-none"
    >
      <div
        className={cn(
          "w-full max-w-7xl flex items-center justify-between pointer-events-auto h-16 md:h-20 px-6 md:px-8 transition-all duration-700 relative overflow-hidden",
          scrolled
            ? "bg-black/60 backdrop-blur-3xl border border-white/10 rounded-full shadow-2xl"
            : "bg-transparent border-b border-white/5"
        )}
      >
        <div className="flex items-center gap-24 relative z-10">
          <Link href="/" className="flex items-center gap-6 group/logo">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="h-16 w-16 bg-white/[0.03] border border-white/10 rounded-[1.5rem] flex items-center justify-center group-hover/logo:border-[#00FF41]/50 transition-all duration-700"
            >
              <Image src={logoUrl} alt="Logo" width={40} height={40} className="opacity-80 group-hover:opacity-100" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-2xl font-[900] tracking-tighter text-white uppercase italic leading-none">
                <GlitchText text="DENTI SYSTEMS" />
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-2">
            {[
              { label: 'Services', href: '/services' },
              { label: 'Solutions', href: '/solutions' },
              { label: 'System_Assets', href: '/products' },
              { label: 'Intel_Archive', href: '/blog' }
            ].map((item) => (
              <Magnetic key={item.label} strength={0.2}>
                <Link
                  href={item.href}
                  className={cn(
                    "text-[10px] font-bold tracking-[0.3em] uppercase px-5 py-2 rounded-full transition-all relative overflow-hidden group/nav",
                    pathname === item.href ? "text-white" : "text-white/40 hover:text-white"
                  )}
                >
                  <span className="relative z-10">{item.label}</span>
                  <div className={cn(
                    "absolute inset-0 bg-white/5 opacity-0 group-hover/nav:opacity-100 transition-opacity",
                    pathname === item.href && "opacity-100"
                  )} />
                </Link>
              </Magnetic>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-6 relative z-10">
          <div className="hidden md:flex items-center gap-8">
            <Link href="/auth" className="flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase text-white/30 hover:text-white transition-colors group">
              <Command className="h-3 w-3 group-hover:text-[#00FF41] transition-colors" />
              Sign_In
            </Link>
            <Link href="/contact">
              <Magnetic strength={0.25}>
                <Button className="h-12 px-10 rounded-full bg-white text-black font-black uppercase text-[10px] tracking-[0.3em] hover:bg-[#00FF41] transition-all duration-500 shadow-xl group">
                  Establish_Link <Radio className="ml-3 h-4 w-4 animate-pulse" />
                </Button>
              </Magnetic>
            </Link>
          </div>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="lg:hidden h-12 w-12 rounded-full border border-white/10 bg-white/5 hover:border-[#00FF41]/40 transition-colors">
                <Menu className="h-5 w-5 text-white" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="h-[100dvh] bg-black border-0 p-8 md:p-12 flex flex-col justify-between items-center overflow-hidden">
              {/* Neural Mesh Background for Mobile Menu */}
              <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
                <div className="absolute inset-0" style={{
                  backgroundImage: `linear-gradient(rgba(0, 255, 65, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 65, 0.2) 1px, transparent 1px)`,
                  backgroundSize: '40px 40px',
                }} />
              </div>

              <div className="w-full h-full flex flex-col justify-between relative z-10">
                <div className="pt-20 flex flex-col gap-6 md:gap-8 items-center text-center">
                  {[
                    { label: 'Services', href: '/services' },
                    { label: 'Solutions', href: '/solutions' },
                    { label: 'System_Assets', href: '/products' },
                    { label: 'Intel_Archive', href: '/blog' },
                    { label: 'Mission_Briefs', href: '/case-studies' },
                    { label: 'Establish_Link', href: '/contact' }
                  ].map((item, idx) => (
                    <motion.div
                      key={item.label}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.05 + 0.2 }}
                    >
                      <Link
                        href={item.href}
                        className="text-4xl md:text-7xl font-black italic uppercase text-white/10 hover:text-[#00FF41] transition-all hover:scale-105"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="pb-10 flex flex-col items-center gap-12">
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 w-1.5 bg-[#00FF41] rounded-full animate-pulse" />
                      <span className="text-[10px] font-bold tracking-[0.6em] text-white/20 uppercase">SYSTEM_STABLE // 1.2MS_LAT</span>
                    </div>
                  </div>
                  <div className="flex gap-8">
                    {['TW', 'LI', 'GH'].map((soc, i) => (
                      <Link key={i} href="#" className="text-[10px] font-bold tracking-widest text-white/10 hover:text-[#00FF41] transition-colors">{soc}</Link>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
