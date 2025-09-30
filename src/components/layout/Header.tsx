
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
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
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
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import React from 'react';
import { tools } from '@/lib/data';

const logoUrl =
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEirwhyibjl-3Guf8S6G442OtQmAdOzHrTcxPAuK6QxCGcAJ2I88K7Ee9DN-k_SONDddf2FeB4SwHO8l29PZ9HvHHlxJxiPDnfgrY1DBS60HsVaYv0uOAi08fm6KyrwhM7HPQhbQhL5ufVU_efX268tXM4rR8Vwok_UqbSar_b-B4btAigP5BFaU12PCjUE/s320/DENTI.SYSTEMS%20PNJ.png';

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

const products = {
    "Network Security": ["Firewall Solutions", "Threat Prevention", "Network Monitoring", "Cloud Firewall"],
    "Cloud Security": ["Cloud Security", "Container Security", "Cloud Compliance"],
    "Endpoint Protection": ["EDR Solutions", "Mobile Security", "Device Management"]
};

const solutions = {
    "By Industry": ["Financial Services", "Healthcare", "Government", "Retail"],
    "By Use Case": ["Zero Trust Architecture", "Compliance", "Threat Intelligence"]
};

const resources = ["Threat Reports", "White Papers", "Blog", "Webinars"];
const partners = ["Partner Program", "Become a Partner", "Partner Portal"];


export default function Header() {
  const pathname = usePathname();
  const { user, loading, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);


  const UserMenu = () => {
    if (loading) return null;

    if (user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={user.photoURL || undefined}
                  alt={user.displayName || user.email || ''}
                />
                <AvatarFallback>
                  {user.email?.[0].toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user.displayName || 'Operator'}
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
            <DropdownMenuItem onClick={signOut}>Log out</DropdownMenuItem>
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
          <Link href="/contact">Contact Sales</Link>
        </Button>
      </nav>
    );
  };

  const DesktopNav = () => (
    <NavigationMenu>
      <NavigationMenuList>
         <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[600px] gap-3 p-4 md:w-[700px] md:grid-cols-3 lg:w-[800px]">
              {Object.entries(products).map(([category, items]) => (
                <li key={category}>
                  <NavigationMenuLink asChild>
                     <h3 className="text-sm font-medium leading-none px-3 py-2 text-muted-foreground">{category}</h3>
                  </NavigationMenuLink>
                  <ul className="flex flex-col">
                    {items.map((item) => (
                      <ListItem key={item} href={`/products/${item.toLowerCase().replace(/\s+/g, '-')}`} title={item}>
                        {tools.find(t => t.title.toLowerCase() === item.toLowerCase())?.description}
                      </ListItem>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
          <NavigationMenuContent>
             <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {Object.entries(solutions).map(([category, items]) => (
                <li key={category}>
                   <NavigationMenuLink asChild>
                     <h3 className="text-sm font-medium leading-none px-3 py-2 text-muted-foreground">{category.replace(/([A-Z])/g, ' $1').trim()}</h3>
                  </NavigationMenuLink>
                   <ul className="flex flex-col">
                    {items.map((item) => (
                      <ListItem key={item} href={`/solutions/${category.toLowerCase().replace(/\s+/g, '-')}/${item.toLowerCase().replace(/\s+/g, '-')}`} title={item}>
                         {/* Add short descriptions later */}
                      </ListItem>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px] lg:grid-cols-2">
              {tools.map((tool) => (
                <ListItem
                  key={tool.id}
                  href={tool.url || `/tools/${tool.slug}`}
                  title={tool.title}
                >
                  {tool.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
         <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
             <ul className="grid w-[200px] gap-3 p-4 md:w-[250px]">
              {resources.map((item) => (
                <ListItem key={item} href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} title={item}>
                  {/* Add short descriptions later */}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
         <NavigationMenuItem>
          <NavigationMenuTrigger>Partners</NavigationMenuTrigger>
          <NavigationMenuContent>
             <ul className="grid w-[200px] gap-3 p-4 md:w-[250px]">
              {partners.map((item) => (
                <ListItem key={item} href={`/partners/${item.toLowerCase().replace(/\s+/g, '-')}`} title={item}>
                  {/* Add short descriptions later */}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
  
  const MobileNavLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <Link
        href={href}
        onClick={() => setMobileMenuOpen(false)}
        className={cn("block py-2 text-muted-foreground transition-colors hover:text-primary pl-8",
            pathname.startsWith(href) ? 'text-primary' : ''
        )}
    >
        {children}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="container flex h-14 items-center">
        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image
              src={logoUrl}
              alt="DentiSystems Logo"
              width={24}
              height={24}
              className="h-6 w-6"
            />
            <span className="hidden font-bold sm:inline-block font-headline">
              DentiSystems
            </span>
          </Link>
          <div className="hidden md:block">
            <DesktopNav />
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
           <div className="hidden md:flex">
            <UserMenu />
          </div>
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden ml-4">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <SheetHeader className="mb-6">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <Link href="/" className="flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
                <Image
                  src={logoUrl}
                  alt="DentiSystems Logo"
                  width={24}
                  height={24}
                  className="h-6 w-6"
                />
                <span className="font-bold font-headline">DentiSystems</span>
              </Link>
            </SheetHeader>
            <div className="flex flex-col space-y-3 mb-6">
                <Accordion type="multiple" className="w-full">
                    <AccordionItem value="products" className="border-b-0">
                        <AccordionTrigger className="text-lg text-muted-foreground hover:text-primary transition-colors hover:no-underline py-2 [&[data-state=open]>svg]:text-primary">
                            Products
                        </AccordionTrigger>
                        <AccordionContent>
                           {[...Object.values(products).flat(), ...tools.map(t => t.title)].map(item => (
                                <MobileNavLink key={item} href={`/tools/${item.toLowerCase().replace(/\s+/g, '-')}`}>{item}</MobileNavLink>
                           ))}
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="solutions" className="border-b-0">
                        <AccordionTrigger className="text-lg text-muted-foreground hover:text-primary transition-colors hover:no-underline py-2 [&[data-state=open]>svg]:text-primary">
                            Solutions
                        </AccordionTrigger>
                        <AccordionContent>
                           {Object.entries(solutions).map(([category, items]) => (
                                <React.Fragment key={category}>
                                     <h4 className="pl-8 pt-2 text-sm font-semibold text-muted-foreground/80">{category.replace(/([A-Z])/g, ' $1').trim()}</h4>
                                     {items.map(item => (
                                         <MobileNavLink key={item} href={`/solutions/${category.toLowerCase().replace(/\s+/g, '-')}/${item.toLowerCase().replace(/\s+/g, '-')}`}>{item}</MobileNavLink>
                                     ))}
                                </React.Fragment>
                           ))}
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="resources" className="border-b-0">
                        <AccordionTrigger className="text-lg text-muted-foreground hover:text-primary transition-colors hover:no-underline py-2 [&[data-state=open]>svg]:text-primary">
                           Resources
                        </AccordionTrigger>
                        <AccordionContent>
                           {resources.map(item => (
                                <MobileNavLink key={item} href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}>{item}</MobileNavLink>
                           ))}
                        </AccordionContent>
                    </AccordionItem>
                      <AccordionItem value="partners" className="border-b-0">
                        <AccordionTrigger className="text-lg text-muted-foreground hover:text-primary transition-colors hover:no-underline py-2 [&[data-state=open]>svg]:text-primary">
                           Partners
                        </AccordionTrigger>
                        <AccordionContent>
                           {partners.map(item => (
                                <MobileNavLink key={item} href={`/partners/${item.toLowerCase().replace(/\s+/g, '-')}`}>{item}</MobileNavLink>
                           ))}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            {user ? (
              <div className="flex flex-col space-y-2">
                <Button asChild onClick={() => setMobileMenuOpen(false)}>
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
                <Button variant="ghost" onClick={signOut}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                 <Button asChild onClick={() => setMobileMenuOpen(false)}>
                  <Link href="/auth">Login</Link>
                </Button>
                <Button variant="ghost" asChild onClick={() => setMobileMenuOpen(false)}>
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
