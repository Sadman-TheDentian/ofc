
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  CreditCard,
  PanelLeft,
  Loader2,
  MailWarning,
  LogOut,
  Settings,
  Shield,
  Activity,
  User as UserIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAuth } from '@/lib/auth';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import CyberGrid from '@/components/CyberGrid';

const sidebarNavItems = [
  {
    title: 'OVERVIEW',
    href: '/dashboard',
    icon: LayoutDashboard,
    tag: 'CTRL'
  },
  {
    title: 'SUBSCRIPTIONS',
    href: '/dashboard/subscriptions',
    icon: CreditCard,
    tag: 'ECON'
  },
];

const logoUrl =
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEirwhyibjl-3Guf8S6G442OtQmAdOzHrTcxPAuK6QxCGcAJ2I88K7Ee9DN-k_SONDddf2FeB4SwHO8l29PZ9HvHHlxJxiPDnfgrY1DBS60HsVaYv0uOAi08fm6KyrwhM7HPQhbQhL5ufVU_efX268tXM4rR8Vwok_UqbSar_b-B4btAigP5BFaU12PCjUE/s320/DENTI.SYSTEMS%20PNJ.png';

const VerificationNotice = () => {
  const { user, resendVerificationEmail } = useAuth();
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);

  if (user?.emailVerified) {
    return null;
  }

  const handleResend = async () => {
    setIsSending(true);
    try {
      await resendVerificationEmail();
      toast({
        title: "TELEMETRY SENT",
        description: "Verification link transmitted to your secure inbox.",
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: "COMM_FAILURE",
        description: "Failed to transmit verification signal.",
      });
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="px-8 pb-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl"
      >
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
            <MailWarning className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-[10px] font-black tracking-widest text-red-500 uppercase">IDENT_VERIFICATION_REQUIRED</h4>
            <p className="text-white/30 text-xs font-light italic">Your digital footprint is not yet verified. Limited access protocols engaged.</p>
          </div>
        </div>
        <Button
          variant="outline"
          className="h-10 px-6 rounded-full border-red-500/30 text-red-500 hover:bg-red-500/10 transition-all text-[9px] font-black tracking-widest uppercase"
          onClick={handleResend}
          disabled={isSending}
        >
          {isSending ? 'TRANSMITTING...' : 'RESEND_SIGNAL'}
        </Button>
      </motion.div>
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading: authLoading, signOut } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(true);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user) {
      router.push('/auth');
    } else {
      setIsRedirecting(false);
    }

  }, [authLoading, user, router]);


  const currentPage = sidebarNavItems.find((item) => item.href === pathname);

  const navContent = (
    <div className="flex flex-col h-full">
      <div className="space-y-2 flex-grow">
        {sidebarNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className={`
                flex items-center justify-between h-14 px-6 rounded-2xl transition-all duration-500 group relative overflow-hidden
                ${isActive ? 'bg-white/5 border border-white/10' : 'hover:bg-white/[0.02]'}
              `}>
                <div className="flex items-center gap-4 relative z-10">
                  <item.icon className={`h-4 w-4 transition-colors duration-500 ${isActive ? 'text-[#00FF41]' : 'text-white/20 group-hover:text-white'}`} />
                  <span className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-colors duration-500 ${isActive ? 'text-white' : 'text-white/30 group-hover:text-white/60'}`}>
                    {item.title}
                  </span>
                </div>
                <span className={`text-[7px] font-black tracking-widest text-white/10 transition-colors ${isActive ? 'text-[#00FF41]/40' : ''}`}>
                  {item.tag}
                </span>

                {isActive && (
                  <motion.div
                    layoutId="sidebar-accent"
                    className="absolute left-0 top-1/4 bottom-1/4 w-[2px] bg-[#00FF41] shadow-[0_0_10px_#00FF41]"
                  />
                )}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="pt-8 mt-8 border-t border-white/5 space-y-4">
        <div className="px-6 py-4 rounded-2xl bg-white/[0.01] border border-white/5 flex items-center gap-4">
          <div className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center overflow-hidden">
            {user?.photoURL ? (
              <Image src={user.photoURL} alt="Avatar" width={40} height={40} />
            ) : (
              <UserIcon className="h-4 w-4 text-white/20" />
            )}
          </div>
          <div className="flex-grow">
            <div className="text-[10px] font-black text-white uppercase tracking-tighter truncate max-w-[120px]">
              {user?.displayName || 'OPERATOR'}
            </div>
            <div className="text-[7px] font-bold text-[#00FF41] tracking-widest uppercase">
              NODE_ACTIVE
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full h-12 justify-start gap-4 text-white/20 hover:text-red-500 hover:bg-red-500/5 transition-all text-[9px] font-black tracking-[0.3em] uppercase"
          onClick={() => {
            signOut();
            router.push('/');
          }}
        >
          <LogOut className="h-4 w-4" />
          DISCONNECT
        </Button>
      </div>
    </div>
  );

  if (authLoading || isRedirecting) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black">
        <div className="text-center relative">
          <div className="absolute inset-0 bg-[#00FF41]/20 blur-[60px] animate-pulse" />
          <Loader2 className="h-12 w-12 animate-spin text-[#00FF41] mx-auto mb-8 relative z-10" />
          <p className="text-[10px] font-black tracking-[0.5em] text-white/30 uppercase animate-pulse relative z-10">
            {isRedirecting ? 'REDIRECTING_SEQUENCE...' : 'VERIFYING_CREDENTIALS...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-black relative">
      <CyberGrid />
      {/* Structural Grain Overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.035] mix-blend-overlay z-[9999]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0%200%20200%20200'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter%20id='noiseFilter'%3E%3CfeTurbulence%20type='fractalNoise'%20baseFrequency='0.65'%20numOctaves='3'%20stitchTiles='stitch'/%3E%3C/filter%3E%3Crect%20width='100%25'%20height='100%25'%20filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Main Sidebar */}
      <aside className="hidden md:flex w-80 flex-col border-r border-white/5 bg-black/40 backdrop-blur-3xl p-8 sticky top-0 h-screen overflow-hidden">
        <div className="flex items-center gap-4 mb-20">
          <div className="h-12 w-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center">
            <Image
              src={logoUrl}
              alt="Logo"
              width={24}
              height={24}
              className="invert opacity-60"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl text-white uppercase italic tracking-tighter">DENTI<span className="text-white/20">GRID</span></span>
            <span className="text-[7px] font-bold text-white/10 tracking-[0.4em] uppercase">CONTROL_SUBSTRATE</span>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto no-scrollbar">
          {navContent}
        </div>

        <div className="mt-12 flex flex-col gap-4">
          <div className="flex justify-between items-center text-[8px] font-bold text-white/10 tracking-[0.5em] uppercase">
            <span>SYSTEM_HEALTH</span>
            <span className="text-[#00FF41]">NOMINAL</span>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: ["90%", "95%", "92%"] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="h-full bg-[#00FF41]/40"
            />
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden border-b border-white/5 p-6 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-3xl z-40">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full border border-white/10 bg-white/5">
                <PanelLeft className="h-5 w-5 text-white" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-8 bg-black border-r border-white/5 w-80">
              <div className="flex items-center gap-4 mb-16 px-4">
                <Image
                  src={logoUrl}
                  alt="Logo"
                  width={24}
                  height={24}
                  className="invert opacity-60"
                />
                <span className="font-black text-xl text-white uppercase italic tracking-tighter">
                  DENTI<span className="text-white/20">GRID</span>
                </span>
              </div>
              {navContent}
            </SheetContent>
          </Sheet>
          <div className="flex flex-col items-center">
            <h1 className="font-black text-xs text-white uppercase tracking-widest italic">
              {currentPage?.title || 'OVERVIEW'}
            </h1>
          </div>
          <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
            <Activity className="h-4 w-4 text-[#00FF41]" />
          </div>
        </header>

        <main className="flex-1 py-12 md:py-20 relative">
          {/* Ambient Lighting Background */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00FF41]/5 blur-[120px] pointer-events-none rounded-full" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#00FF41]/5 blur-[100px] pointer-events-none rounded-full" />

          <div className="relative z-10">
            <VerificationNotice />
            <div className="px-8 md:px-12">{children}</div>
          </div>
        </main>

        <footer className="px-12 py-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 opacity-30 group hover:opacity-100 transition-opacity duration-700">
          <div className="flex items-center gap-6">
            <div className="text-[8px] font-bold text-white/20 tracking-[0.5em] uppercase">SYSTEM_STATE: <span className="text-[#00FF41]">OPERATIONAL</span></div>
            <div className="h-4 w-px bg-white/5" />
            <div className="flex items-center gap-3 overflow-hidden w-64">
              <motion.div
                animate={{ x: ["100%", "-100%"] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="text-[8px] font-mono text-white/10 uppercase whitespace-nowrap tracking-widest"
              >
                KERNEL_STREAM: INITIALIZING_NODE_SYNC... DEPLOYING_ZERO_TRUST_LAYER... ENCRYPTING_BIDIRECTIONAL_TUNNELS...
              </motion.div>
            </div>
          </div>
          <div className="flex gap-12 text-[8px] font-bold text-white/20 tracking-[0.4em] uppercase italic">
            " SECURE // VERIFIED // SOVEREIGN "
          </div>
        </footer>
      </div>
    </div>
  );
}
