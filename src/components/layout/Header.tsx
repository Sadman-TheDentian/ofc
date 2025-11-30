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
import { tools, services } from '@/lib/data';

const logoUrl =
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEirwhyibjl-3Guf8S6G442OtQmAdOzHrTcxPAuK6QxCGcAJ2I88K7Ee9DN-k_SONDddf2FeB4SwHO8l29PZ9HvHHlxJxiPDnfgrY1DBS60HsVaYv0uOAi08fm6KyrwhM7HPQhbQhL5ufVU_efX268tXM4rR8Vwok_UqbSar_b-B4btAigP5BFaU12PCjUE/s320/DENTI.SYSTEMS%20PNJ.png';

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & { imageUrl?: string }
>(({ className, title, children, imageUrl, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'flex gap-4 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          {imageUrl && (
            <div className="relative w-16 h-16 flex-shrink-0">
              <Image src={imageUrl} alt={title || ''} fill className="rounded-md object-cover" />
            </div>
          )}
          <div className='flex flex-col'>
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

const products = [
  { name: "Firewall Solutions", imageUrl: "https://blogger.googleusercontent.com/img/a/AVvXsEjYp1ojHDNjLnxQsHDXjR_fBWc53dSazp5VoGlaRF13ARlfJyIsmCHFobjiB8xfJMgVFNDvGt1XT5zrMv7E0qEMYf5NIm-04Mkj3ORNLvbDaRqyvpP_Fk35PcIkTL-t6nJlw8bALj1UHHm1lN12dXBPRehtkgSBOtn2MW_dVVHsOlVca-TyYaJJNDtYFXI=w586-h327" },
  { name: "Threat Prevention", imageUrl: "https://blogger.googleusercontent.com/img/a/AVvXsEgvl06XH85YacLI85JzX5adfHI7idNOYQz-S68rMtIrvNRSYekvJ8g6OOX-s58Kci11jyAxyVWAKrK0BDTZBvNGEDJMqc-kt9ETkaWolpq0XcItm_kbGsgxUoPA7PYNfP5aqiww_hUje3FJq5oxWqal7FpRzMjhTmPnehUHOfcpfkpD-RDwj8zQeOHlHGE=w662-h370" },
  { name: "Network Monitoring", imageUrl: "https://blogger.googleusercontent.com/img/a/AVvXsEgeuU6Fz70AynwotNkHf0exWxplO-xW0QqHRbrTJotWP-XeTcI1q0GvpYTgEXGjd9PeiErACs0B1rNX3_jNkGtu5fMqqpGuNcMeyH0XCMquridgQQLBi_0AgqDWRpxVmZTTatO3yWJ9OdhgnIkBqc2aFKTgvZbQ-6ITW-qK6bPeYvakxF2njCuJqqOyn7I=w617-h345" },
  { name: "Cloud Firewall", imageUrl: "https://blogger.googleusercontent.com/img/a/AVvXsEhyOz0oNPQ9yGZdDWg64FToWfQ4dit8NZOuZbcvxkDXu5mhf5yU5PgUljt8EawA-RuCUVq6hbVP5TWinD5c6vrMz3sgmGI7uwq6bt9tKECh7tX-DwLDz9lQNR4OOUOmsPtZ_qXuWEHL6rXDwQMYHfDTlU3xz9nN6c-rwKYqYcvpRBDN1aKl5KjtIK4Wd_o=w584-h327" },
  { name: "Cloud Security", imageUrl: "https://blogger.googleusercontent.com/img/a/AVvXsEiOQq4LaQRWGEnZmCY6l3XnZQNaO6xy6VgRzjqV9lseL3bUGKsY14sCQjpQDef8QG987NhlVcy_zYaLQUc4AKcBNR0UtgTLQhAHo4tJHuQJt9zHF8grb2wmt_YEQNkDyFPCqlrHRXza_nYh1Jvnq2oC-LXehuFiNC03kjC7jeqibyXfd0YJLymSDrtyHWQ=w591-h331" },
  { name: "Container Security", imageUrl: "https://blogger.googleusercontent.com/img/a/AVvXsEhEu8R00euqaZJ-3xO571RN6FBOMbn6yLjTJCrarEMJIY6SVaKeM2zdqkE9XMbNqYukeYGgGuF1yM4pNvossck0Btj4ZU6vMeLTI4xjH1cRWAhQlkPOPoid64lshbjyVCR-8ODsITxn3wOAbg49UODPeCTW-CxWkty5bxW4W8TfE088jl8Z56HsqUhXBPA=w599-h335" },
  { name: "Cloud Compliance", imageUrl: "https://blogger.googleusercontent.com/img/a/AVvXsEgHyJmWTseAnMAc6iem8wEm3U5TT4qlp-WuSyXlwL2CClxLhCE62JeIzG_Ij5bx9t-EWwh44IHcDQeDKVnoIH5cSCCkxXU-CxeF48uJwE2qa7Lv7a09rUg_CU6qqjhRBLjrtdldf8UoPjI063kO9OJzMQTdESmUGN76uOl8rPIxhuDebNNiizBDlQVg-vk=w568-h318" },
  { name: "EDR Solutions", imageUrl: "https://blogger.googleusercontent.com/img/a/AVvXsEitN4-75kscNVRoWcoQDF44XAoiuN9-gmFBq69Q4Dt2oTS6vbIF5Is1kzqAcuAA3uS2sHdY2lNHl8VSKSAhN9QRGCQK6JnSkq6RHS59yHtJuxgNC6JPxV3t8OfpfAHvaWivd77QsjLmam7TG29STdRNbYLwSS8C4WoaG1Dh7FLkC7BSzN4FfNTlxkKDJ50=w572-h320" },
  { name: "Mobile Security", imageUrl: "https://blogger.googleusercontent.com/img/a/AVvXsEjSPZscN3TQssaOmeM41JblOXVh4rzUKR_5GTphC6FIMJUossq7W0EkNaOMaSPIaRe_M1bmBCpkYGDRHUhOefH1Hgbe_HbzRYZfJQqp0mPa310jnN3tAqGkq4L0tD6xGw6ZkKd78qtKr1MKVkpQjGeDsMyCUABPN01fdzK1I2HrKC-b1_C4-O1p4AaspBg=w621-h347" },
  { name: "Device Management", imageUrl: "https://blogger.googleusercontent.com/img/a/AVvXsEhPb2URzAUs0oMr4A0yW6caFzSTBOT1J4pAdAmbhsMa0nFHEjtjcJnzZSCiuctHh99SBD2VV7r1FM1WpSY6tAtEy46QdmbuBe2Gr4yJiBsKuUnPly5njNb-RMRaM0zM1jC8Ps-3FJ5Kj6D92GK8ABcr_EVwIh8a7-RmJyNVBj2PX0Zg5Z7XSYa5HZ3xi8U=w603-h337" }
];

const solutions = {
  "By Industry": [
    { name: "Financial Services", slug: "financial-services", imageUrl: "https://blogger.googleusercontent.com/img/a/AVvXsEifSneKRPa-Itv-iYkMNjaXPo3RWZFqs1FHvxX2YmsO2nhhrT_uetnI9TJGeq5NirutTBqzKT4HgIQL76qkti3Ev_oT-XsxWwY11OGFfGz9jzAy3RJdsVhU4GR9QW6rlGM6PntLr2gA77lYb9Ve79hFsGgMnXnPtFU4PkS71nCSwx_Ep9nK3i9Z6s0Qmp0=w616-h345" },
    { name: "Healthcare", slug: "healthcare", imageUrl: "https://blogger.googleusercontent.com/img/a/AVvXsEg2_4AliXT5j3q5k41ZD1zlsDMvxAHvcvofugsxqwKbuKlWzPGtSIJqodphF64b3g1BMGcMsi8UJzVs_Tvv3ZSydZJcfdJHSwvmedjeHe-JNQwSaL3CgijJioP_Nm00hJuHFG2XTtCcbygmXT7aSeQmrk-yhvWiuiUOTuD_5Y5CmoFb3zoyLLjYvjCr05w=w623-h348" },
    { name: "Government", slug: "government", imageUrl: "https://blogger.googleusercontent.com/img/a/AVvXsEh4HFbVg1MOFuoQmtI2NIO8RZZo0bw1iEeaEMvqv-bGb6WasrGWgwlmz6NKkLjbvpBZCR2M35HKwUK-nCvXKKXATmm3-399-SbFld4lltU6BAw7w1WzanNrRjj_BPdWc-_CDnoWt8l3wxsnIhRIhl6vWveXD-_No4yefsParstjslgnV34AVCjZo7iSEBA=w631-h353" },
    { name: "Retail", slug: "retail", imageUrl: "https://blogger.googleusercontent.com/img/a/AVvXsEiVh-bJCEZb7t4XthHnTgy0CGM55nEVIOLkjWYilXmCMPiCx2_wejn7keRBs8HQ1-LT1iKCjGmz1_AMH0zbZV5W8LHNICIiaeFonJ1RH6G_V6APUfIf__vyNtDzLs7hfU3WXvvBRhhmJceWJaBzZpVUJH6HxuMgzgGBffwEJvl3j1QXoJWmiWgmS1bl7_c=w622-h348" }
  ],
  "By Use Case": [
    { name: "Zero Trust Architecture", slug: "zero-trust-architecture", imageUrl: "https://blogger.googleusercontent.com/img/a/AVvXsEgxTxk_wpMkIZL9ne9bNlD-C_qBqTNGIAzEFLqeL3brGMJDIVg5ZJSjKZlW5mWRzkRpU90AyI4dOfy95nBgpKZ7ws_soQy1dN5h4xDlliRu9Qw4ldJJDX3pcL2JeF3l4TyUupAiofSGKd9W_zPMJbshoDNVRHnB8eiP8y1vz2ntHxuo0t3sVGKhnwOgcVo=w627-h351" },
    { name: "Compliance", slug: "compliance", imageUrl: "https://blogger.googleusercontent.com/img/a/AVvXsEgMrYUfzC51eBL574lfpXg6-irxaM_qnr054NUM3G8i05MbQ_PnW0rV23wIPTivNVVO2ce3qg42avcdCOCTNG_othjg62dzpdfw24V-HPBOgIAHRCNBLQ5oGSXgmNnWwL2AhgW2addsXUYPZDc5Ou0MSQYBNUZ_KkxHitAQT247G2mm1tKsIt2phuQprxU=w608-h340" },
    { name: "Threat Intelligence", slug: "threat-intelligence", imageUrl: "https://blogger.googleusercontent.com/img/a/AVvXsEi98G9QlUgbIuHQXB0CACf3Xelz45Fg0-7ci5O_YffnEG-DokLQOgJrpI0DpzX_BCKNuncfxdeRdafgT0YEhkQTmNuHLxCEhIcvuVvsWk9GrBjo7WkfKOVFFdKspBnHhIlYVLvOD_JBC8uQyrZyzyTwVfUAGila5PNerY3y6SFPPQBQ-LKTSxOhmSJTpYc=w622-h348" }
  ]
};

const resources = [
  { name: "Threat Reports", imageUrl: "https://blogger.googleusercontent.com/img/a/AVvXsEivPRYoNIXdbeEQzKxKB23w7fTyPf_Y8YrLXL_D1CbzKOCo86E-6eWGRnIyJZuwrokdUozF6PmN2VgnA0AY3Aocfbqb68tTD24WN0nI1SIAb0XRkhg6npAU-zCI5kKYYgqJHuMt8yYgAe3OZfX5l5sF5hkGvf062Ct5rDCy7i2CfF9OIHQ591unTdWHkaA=w646-h361" },
  { name: "White Papers", imageUrl: "https://blogger.googleusercontent.com/img/a/AVvXsEikdAKqVriWCV24ziK41rqkYKk9ROYX1V88Gb9s6J3fZ_10fXeiSE142zJNfTE1V3IqM8YKeHywiR2Wsf7-T7JYjlOvqX9Rss_6yKxPzJTiL3nBU6AbxsLiE8pv4jkmD-1MkoDwAnQNHPCAmOzd49M5BE6wBzsS-i3FrFxDEikTb8uGrBQYYYCL65mtTXo=w638-h357" },
  { name: "Blog", imageUrl: "https://blogger.googleusercontent.com/img/a/AVvXsEjHV19DcjvcdQJJbRLVlmcnp3i5D-S4pf1LRwFyYhAPF-_wMxWfuisleEjhKXu3VelRaXUitFcJE1XdBCicoXrEbPDWMZehs8tMkGiQFutET7ueJ_Af-ijil7GMSPFWoiNhBqyysFQ_9XrqTQP-wakpsyy-Mj8rHXfy-jDM8zaeIOfdmuKw0Gobd-OH9OU=w613-h343" },
  { name: "News", imageUrl: "https://blogger.googleusercontent.com/img/a/AVvXsEhGNBzpGbRtOuBLt1ZIVrt1j4KGNEZJYtyn9OmhB79a0AJkZX7_QhXXox7Cmji-HQ3FRgLKYR1EaKOMvMXHO7_I0PcNDEafQkFnjPpb984TXQGX6yYXJxSEtvuX2gxCbSfQNWuE6B16R5Ido-RpHqKQsm5HbOgb8yrh7ukWO48xqZJqoyqXgX_g2aVAC8k=w613-h343" },
  { name: "Webinars", imageUrl: "" },
];


export default function Header(): JSX.Element {
  const pathname = usePathname();
  const { user, loading, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const UserMenu = () => {
    if (loading) {
      return (
        <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
      );
    }

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
        <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" asChild>
            <Link href="/auth">Login</Link>
            </Button>
            <Button asChild>
            <Link href="/contact">Contact Sales</Link>
            </Button>
        </div>
    );
  };

  const DesktopNav = () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px] lg:grid-cols-2">
                {services.map((service) => (
                  <ListItem
                    key={service.id}
                    href={`/services/${service.slug}`}
                    title={service.title}
                    imageUrl={service.imageUrl}
                  >
                    {service.description}
                  </ListItem>
                ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
         <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px] lg:grid-cols-2">
              {products.map((item) => (
                <ListItem
                  key={item.name}
                  href={`/products/${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                  title={item.name}
                  imageUrl={item.imageUrl}
                >
                  {tools.find(t => t.title.toLowerCase() === item.name.toLowerCase())?.description}
                </ListItem>
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
                      <ListItem 
                        key={item.name} 
                        href={`/solutions/${category.toLowerCase().replace(/\s+/g, '-')}/${item.slug}`} 
                        title={item.name}
                        imageUrl={item.imageUrl}
                       >
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
                  imageUrl={tool.imageUrl}
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
             <ul className="grid w-[400px] gap-3 p-4 md:w-[500px]">
              {resources.map((item) => (
                <ListItem 
                  key={item.name} 
                  href={`/${item.name.toLowerCase().replace(/\s+/g, '-')}`} 
                  title={item.name}
                  imageUrl={item.imageUrl}
                >
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
            <NavigationMenuLink asChild>
                <Link href="/about" className={navigationMenuTriggerStyle()}>
                About Us
                </Link>
            </NavigationMenuLink>
        </NavigationMenuItem>
         <NavigationMenuItem>
            <NavigationMenuLink asChild>
                <Link href="/contact" className={navigationMenuTriggerStyle()}>
                Contact
                </Link>
            </NavigationMenuLink>
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
            <UserMenu />
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
                    <AccordionItem value="services" className="border-b-0">
                        <AccordionTrigger className="text-lg text-muted-foreground hover:text-primary transition-colors hover:no-underline py-2 [&[data-state=open]>svg]:text-primary">
                            Services
                        </AccordionTrigger>
                        <AccordionContent>
                           {services.map(item => (
                                <MobileNavLink key={item.id} href={`/services/${item.slug}`}>{item.title}</MobileNavLink>
                           ))}
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="products" className="border-b-0">
                        <AccordionTrigger className="text-lg text-muted-foreground hover:text-primary transition-colors hover:no-underline py-2 [&[data-state=open]>svg]:text-primary">
                            Products
                        </AccordionTrigger>
                        <AccordionContent>
                           {products.map(item => (
                                <MobileNavLink key={item.name} href={`/products/${item.name.toLowerCase().replace(/\s+/g, '-')}`}>{item.name}</MobileNavLink>
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
                                         <MobileNavLink key={item.name} href={`/solutions/${category.toLowerCase().replace(/\s+/g, '-')}/${item.slug}`}>{item.name}</MobileNavLink>
                                     ))}
                                </React.Fragment>
                           ))}
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="tools" className="border-b-0">
                        <AccordionTrigger className="text-lg text-muted-foreground hover:text-primary transition-colors hover:no-underline py-2 [&[data-state=open]>svg]:text-primary">
                           Tools
                        </AccordionTrigger>
                        <AccordionContent>
                           {tools.map(tool => (
                                <MobileNavLink key={tool.id} href={tool.url || `/tools/${tool.slug}`}>{tool.title}</MobileNavLink>
                           ))}
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="resources" className="border-b-0">
                        <AccordionTrigger className="text-lg text-muted-foreground hover:text-primary transition-colors hover:no-underline py-2 [&[data-state=open]>svg]:text-primary">
                           Resources
                        </AccordionTrigger>
                        <AccordionContent>
                           {resources.map(item => (
                                <MobileNavLink key={item.name} href={`/${item.name.toLowerCase().replace(/\s+/g, '-')}`}>{item.name}</MobileNavLink>
                           ))}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <Link
                    href="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn("text-lg text-muted-foreground transition-colors hover:text-primary py-2",
                        pathname === '/about' ? 'text-primary' : ''
                    )}
                >
                    About Us
                </Link>
                 <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn("text-lg text-muted-foreground transition-colors hover:text-primary py-2",
                        pathname === '/contact' ? 'text-primary' : ''
                    )}
                >
                    Contact
                </Link>
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