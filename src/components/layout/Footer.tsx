
"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin, Instagram, Facebook, Youtube } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/lib/auth";
import { ThreadsIcon, TiktokIcon, DiscordIcon, ClutchIcon, ProductHuntIcon, GoodFirmsIcon, CrunchbaseIcon, G2Icon, F6sIcon, WellfoundIcon, TrustpilotIcon, TrustedReviewsIcon } from "@/components/icons/Socials";
import { useState, useEffect } from "react";

const logoUrl = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEirwhyibjl-3Guf8S6G442OtQmAdOzHrTcxPAuK6QxCGcAJ2I88K7Ee9DN-k_SONDddf2FeB4SwHO8l29PZ9HvHHlxJxiPDnfgrY1DBS60HsVaYv0uOAi08fm6KyrwhM7HPQhbQhL5ufVU_efX268tXM4rR8Vwok_UqbSar_b-B4btAigP5BFaU12PCjUE/s320/DENTI.SYSTEMS%20PNJ.png";

const socials = [
    { name: "X", href: "https://x.com/dentisystemsofc", icon: Twitter },
    { name: "Instagram", href: "https://www.instagram.com/denti.systems/", icon: Instagram },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/dentisystems/", icon: Linkedin },
    { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61573782310257", icon: Facebook },
    { name: "Threads", href: "https://www.threads.net/@denti.systems", icon: ThreadsIcon },
    { name: "YouTube", href: "https://www.youtube.com/@denti.systems", icon: Youtube },
    { name: "TikTok", href: "https://www.tiktok.com/@dentisystems", icon: TiktokIcon },
];

const companyProfiles = [
    { name: "Discord", href: "https://discord.gg/bxuDWS9V", icon: DiscordIcon },
    { name: "Clutch", href: "https://clutch.co/profile/dentisystems", icon: ClutchIcon },
    { name: "Product Hunt", href: "https://www.producthunt.com/@denti_systems/", icon: ProductHuntIcon },
    { name: "Goodfirms", href: "https://www.goodfirms.co/company/dentisystems", icon: GoodFirmsIcon },
    { name: "Crunchbase", href: "https://www.crunchbase.com/organization/dentisystems", icon: CrunchbaseIcon },
    { name: "G2", href: "https://www.g2.com/products/dentisystems/reviews", icon: G2Icon },
    { name: "F6S", href: "https://www.f6s.com/dentisystems", icon: F6sIcon },
    { name: "Wellfound", href: "https://wellfound.com/company/dentisystems", icon: WellfoundIcon },
];

const reviews = [
    { name: "Trustpilot", href: "https://www.trustpilot.com/review/denti.systems", icon: TrustpilotIcon },
    { name: "Trusted Reviews", href: "https://trustedrevie.ws/reviews/denti.systems", icon: TrustedReviewsIcon },
];


export default function Footer() {
  const { user } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return (
    <footer className="border-t border-border/40 z-10 bg-background/80 backdrop-blur-sm">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          <div className="md:col-span-3">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image src={logoUrl} alt="DentiSystems Logo" width={32} height={32} className="h-8 w-8" />
              <span className="font-bold text-lg font-headline">
                DentiSystems
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Elite Cybersecurity & Custom Web Engineering.
            </p>
             <p className="text-sm text-muted-foreground mt-4">
                Contact: <a href="mailto:help@denti.systems" className="text-primary hover:underline">help@denti.systems</a>
            </p>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="font-headline font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/case-studies" className="text-muted-foreground hover:text-primary transition-colors">Case Studies</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
               {user && (
                <li><Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">Dashboard</Link></li>
              )}
            </ul>
          </div>

          <div className="md:col-span-4">
             <h4 className="font-headline font-medium mb-4">Community & Profiles</h4>
             <div className="grid grid-cols-2 gap-y-2 text-sm">
                {[...companyProfiles, ...reviews].map((profile) => (
                     <Link key={profile.name} href={profile.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                        <profile.icon className="h-4 w-4" />
                        {profile.name}
                    </Link>
                ))}
             </div>
          </div>
          
          <div className="md:col-span-3">
            <h4 className="font-headline font-medium mb-4">Follow Us</h4>
            <div className="flex flex-wrap gap-4">
              {socials.map((social) => (
                <Link key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <social.icon className="h-6 w-6" />
                    <span className="sr-only">{social.name}</span>
                </Link>
              ))}
            </div>
             <h4 className="font-headline font-medium mb-4 mt-8">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border/40 pt-8 flex flex-col gap-8 md:flex-row justify-between items-center text-sm text-muted-foreground">
          {/* TrustBox widget - Micro Star */}
          {isClient && (
            <div
              className="trustpilot-widget"
              data-locale="en-US"
              data-template-id="54e6e6b90d53a601b46d5def"
              data-businessunit-id="67d29a402aa368cdff23342e"
              data-style-height="24px"
              data-style-width="100%"
              data-theme="dark"
            >
              <a href="https://www.trustpilot.com/review/denti.systems" target="_blank" rel="noopener">Trustpilot</a>
            </div>
          )}
          {/* End TrustBox widget */}
          {isClient && <p className="flex-shrink-0">&copy; {new Date().getFullYear()} DentiSystems. All rights reserved.</p>}
        </div>
      </div>
    </footer>
  );
}
