
'use client';

import Link from "next/link";
import { Github, Twitter, Linkedin, Youtube, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/lib/auth";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ThreadsIcon, TiktokIcon, DiscordIcon, ClutchIcon, ProductHuntIcon, CrunchbaseIcon, G2Icon, F6sIcon, WellfoundIcon, TrustpilotIcon, TrustedReviewsIcon } from "../icons/Socials";

const logoUrl = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEirwhyibjl-3Guf8S6G442OtQmAdOzHrTcxPAuK6QxCGcAJ2I88K7Ee9DN-k_SONDddf2FeB4SwHO8l29PZ9HvHHlxJxiPDnfgrY1DBS60HsVaYv0uOAi08fm6KyrwhM7HPQhbQhL5ufVU_efX268tXM4rR8Vwok_UqbSar_b-B4btAigP5BFaU12PCjUE/s320/DENTI.SYSTEMS%20PNJ.png";

const footerLinks = {
    Products: [
        { title: "Firewall Solutions", href: "/products/firewall-solutions"},
        { title: "Cloud Security", href: "/products/cloud-security"},
        { title: "Endpoint Protection", href: "/products/endpoint-protection"},
        { title: "Threat Intelligence", href: "/threat-intelligence"},
        { title: "Our Tools", href: "/tools"},
    ],
    Resources: [
        { title: "Threat Reports", href: "/threat-reports"},
        { title: "White Papers", href: "/white-papers"},
        { title: "Blog", href: "/blog"},
        { title: "News", href: "/news"},
        { title: "Webinars", href: "/webinars"},
        { title: "Documentation", href: "/docs"},
    ],
    Company: [
        { title: "About Us", href: "/about"},
        { title: "Careers", href: "/contact"},
        { title: "Partners", href: "/partners"},
        { title: "Contact", href: "/contact"},
        { title: "Pricing", href: "/pricing"},
    ],
    Support: [
        { title: "Help Center", href: "/contact"},
        { title: "Service Status", href: "/status"},
        { title: "Contact Support", href: "/contact"},
        { title: "Training", href: "/training"},
    ]
}

const socials = [
    { name: "LinkedIn", href: "https://www.linkedin.com/company/dentisystems/", icon: Linkedin },
    { name: "Twitter", href: "https://x.com/dentisystemsofc", icon: Twitter },
    { name: "GitHub", href: "#", icon: Github },
    { name: "YouTube", href: "https://www.youtube.com/@denti.systems", icon: Youtube },
    { name: "Threads", href: "#", icon: ThreadsIcon },
    { name: "TikTok", href: "#", icon: TiktokIcon },
    { name: "Discord", href: "#", icon: DiscordIcon },
    { name: "Crunchbase", href: "https://www.crunchbase.com/organization/dentisystems", icon: CrunchbaseIcon },
    { name: "Trustpilot", href: "https://www.trustpilot.com/review/denti.systems", icon: TrustpilotIcon },
];

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  
  return (
    <footer className="border-t border-border/40 z-10 bg-background/80 backdrop-blur-sm">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          
          <div className="col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image src={logoUrl} alt="DentiSystems Logo" width={32} height={32} className="h-8 w-8" />
              <span className="font-bold text-lg font-headline">
                DentiSystems
              </span>
            </Link>
             <p className="text-sm text-muted-foreground mb-6">
              AI-Powered Cybersecurity for Modern Threats.
            </p>
             <h4 className="font-headline font-medium mb-4">Subscribe to security updates</h4>
             <form className="flex gap-2">
                <Input type="email" placeholder="Enter your email" className="bg-secondary/50" />
                <Button size="icon"><ArrowRight /></Button>
             </form>
          </div>
          
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="col-span-1">
                <h4 className="font-headline font-medium mb-4">{title}</h4>
                <ul className="space-y-2 text-sm">
                    {links.map(link => (
                        <li key={link.title}>
                            <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                                {link.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
          ))}

        </div>
        <div className="mt-12 border-t border-border/40 pt-8 flex flex-col-reverse gap-6 md:flex-row justify-between items-center">
            {currentYear && (
                <p className="text-sm text-muted-foreground">
                    &copy; {currentYear} DentiSystems. All rights reserved.
                </p>
            )}
            <div className="flex items-center gap-4 flex-wrap justify-center">
                 <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
                 <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
                 <Link href="/refund-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Refund Policy</Link>
                 <div className="flex items-center gap-4 flex-wrap">
                    {socials.map(social => (
                        <Link key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                            <social.icon className="h-5 w-5" />
                            <span className="sr-only">{social.name}</span>
                        </Link>
                    ))}
                 </div>
            </div>
        </div>
      </div>
    </footer>
  );
}
