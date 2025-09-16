
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Image from "next/image";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/tools", label: "Tools" },
  { href: "/pricing", label: "Pricing" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/blog", label: "Blog" },
];

const logoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlngvrGCuFgj7opXopps9UC96bQ78i89Vb7zwRQE3e4g&s=10";

export default function Header() {
  const pathname = usePathname();
  const { user, loading, signOut } = useAuth();

  const UserMenu = () => {
    if (loading) return null;

    if (user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.photoURL || undefined} alt={user.displayName || user.email || ""} />
                <AvatarFallback>
                  {user.email?.[0].toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user.displayName || "Operator"}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard">Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/subscriptions">Billing</Link>
            </DropdownMenuItem>
             <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOut}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <nav className="hidden md:flex items-center space-x-2">
        <Button variant="ghost" asChild>
          <Link href="/auth">Login</Link>
        </Button>
        <Button asChild>
          <Link href="/contact">Request Risk Audit</Link>
        </Button>
      </nav>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src={logoUrl} alt="DentiSystems Logo" width={24} height={24} className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block font-headline">
              DentiSystems
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-primary",
                  pathname.startsWith(link.href)
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="md:hidden">
            <Link href="/" className="mr-6 flex items-center space-x-2">
               <Image src={logoUrl} alt="DentiSystems Logo" width={24} height={24} className="h-6 w-6" />
              <span className="font-bold sm:inline-block font-headline">
                DentiSystems
              </span>
            </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Can be used for a command menu later */}
          </div>
          <div className="hidden md:flex">
            <UserMenu />
          </div>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden ml-4">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <SheetHeader className="mb-6">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                 <Link href="/" className="flex items-center space-x-2">
                     <Image src={logoUrl} alt="DentiSystems Logo" width={24} height={24} className="h-6 w-6" />
                    <span className="font-bold font-headline">DentiSystems</span>
                </Link>
            </SheetHeader>
            <div className="flex flex-col space-y-3 mb-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "transition-colors hover:text-primary text-lg",
                    pathname.startsWith(link.href)
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            {user ? (
                 <div className="flex flex-col space-y-2">
                    <Button asChild>
                        <Link href="/dashboard">Go to Dashboard</Link>
                    </Button>
                    <Button variant="ghost" onClick={signOut}>
                        Logout
                    </Button>
                </div>
            ) : (
                <div className="flex flex-col space-y-2">
                    <Button asChild>
                        <Link href="/contact">Request Risk Audit</Link>
                    </Button>
                    <Button variant="ghost" asChild>
                        <Link href="/auth">Login</Link>
                    </Button>
                </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
