
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShieldAlert,
  CreditCard,
  KeyRound,
  PanelLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import Image from "next/image";


const sidebarNavItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Threat Monitor",
    href: "/dashboard/threat-monitor",
    icon: ShieldAlert,
  },
  {
    title: "Subscriptions",
    href: "/dashboard/subscriptions",
    icon: CreditCard,
  },
  {
    title: "API Keys",
    href: "/dashboard/api-keys",
    icon: KeyRound,
  },
];

const logoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlngvrGCuFgj7opXopps9UC96bQ78i89Vb7zwRQE3e4g&s=10";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navContent = (
    <nav className="flex flex-col gap-2">
      {sidebarNavItems.map((item) => (
        <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
          <Button
            variant={pathname === item.href ? "secondary" : "ghost"}
            className="w-full justify-start gap-2"
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </Button>
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="flex min-h-[calc(100vh-57px)]">
      <aside className="hidden md:flex w-64 flex-col border-r bg-card/80 backdrop-blur-sm p-4">
        <div className="flex items-center gap-2 mb-8">
            <Image src={logoUrl} alt="DentiSystems Logo" width={32} height={32} className="h-8 w-8" />
            <span className="font-headline text-lg font-bold">Dashboard</span>
        </div>
        {navContent}
      </aside>
      <div className="flex-1">
        <div className="md:hidden border-b p-2 flex items-center justify-between">
            <h1 className="font-headline text-lg font-bold">Dashboard</h1>
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <PanelLeft className="h-5 w-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <div className="flex items-center gap-2 mb-8">
                         <Image src={logoUrl} alt="DentiSystems Logo" width={32} height={32} className="h-8 w-8" />
                        <span className="font-headline text-lg font-bold">DentiSystems</span>
                    </div>
                    {navContent}
                </SheetContent>
            </Sheet>
        </div>
        <div className="p-4 md:p-8">
            {children}
        </div>
      </div>
    </div>
  );
}

    