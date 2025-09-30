
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  ShieldAlert,
  KeyRound,
  PanelLeft,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAuth } from '@/lib/auth';

const sidebarNavItems = [
  {
    title: 'Overview',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Threat Monitor',
    href: '/dashboard/threat-monitor',
    icon: ShieldAlert,
  },
  {
    title: 'API Keys',
    href: '/dashboard/api-keys',
    icon: KeyRound,
  },
];

const logoUrl =
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEirwhyibjl-3Guf8S6G442OtQmAdOzHrTcxPAuK6QxCGcAJ2I88K7Ee9DN-k_SONDddf2FeB4SwHO8l29PZ9HvHHlxJxiPDnfgrY1DBS60HsVaYv0uOAi08fm6KyrwhM7HPQhbQhL5ufVU_efX268tXM4rR8Vwok_UqbSar_b-B4btAigP5BFaU12PCjUE/s320/DENTI.SYSTEMS%20PNJ.png';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

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
    <nav className="flex flex-col gap-2">
      {sidebarNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => setMobileMenuOpen(false)}
        >
          <Button
            variant={pathname === item.href ? 'secondary' : 'ghost'}
            className="w-full justify-start gap-2"
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </Button>
        </Link>
      ))}
    </nav>
  );
  
  if (authLoading || isRedirecting) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">
            {isRedirecting ? 'Redirecting...' : 'Verifying access...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-57px)]">
      <aside className="hidden md:flex w-64 flex-col border-r bg-card/80 backdrop-blur-sm p-4">
        <div className="flex items-center gap-2 mb-8">
          <Image
            src={logoUrl}
            alt="DentiSystems Logo"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="font-headline text-lg font-bold">Dashboard</span>
        </div>
        {navContent}
      </aside>
      <div className="flex-1">
        <header className="md:hidden border-b p-2 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-sm z-30">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <PanelLeft className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-4">
              <div className="flex items-center gap-2 mb-8">
                <Image
                  src={logoUrl}
                  alt="DentiSystems Logo"
                  width={32}
                  height={32}
                  className="h-8 w-8"
                />
                <span className="font-headline text-lg font-bold">
                  DentiSystems
                </span>
              </div>
              {navContent}
            </SheetContent>
          </Sheet>
          <h1 className="font-headline text-lg font-bold">
            {currentPage?.title || 'Dashboard'}
          </h1>
          {/* Empty div for spacing */}
          <div className="w-9 h-9" />
        </header>
        <div className="p-4 md:p-8">{children}</div>
      </div>
    </div>
  );
}
