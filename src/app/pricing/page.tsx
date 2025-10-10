
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Check, Shield, Code } from "lucide-react";
import Link from "next/link";


export default function PricingPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 bg-background/50 backdrop-blur-sm p-8 rounded-xl border border-border/50">
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
          Tailored Security Solutions
        </h1>
        <p className="text-xl text-muted-foreground">
          DentiSystems provides bespoke security engagements. Contact us to discuss a solution tailored to your organization's unique needs.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Enterprise Solutions Card */}
        <Card className="border-primary border-2 shadow-lg shadow-primary/10 flex flex-col bg-gradient-to-br from-card to-card/90">
           <CardHeader>
            <div className="flex items-center gap-4">
                <Shield className="h-8 w-8 text-primary" />
                <CardTitle className="font-headline text-2xl">Custom Enterprise Solutions</CardTitle>
            </div>
            <CardDescription className="pt-2">For businesses requiring comprehensive security services and architecture.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-4">
             <p className="text-muted-foreground">
                Our core services are not off-the-shelf products. We provide high-touch, bespoke engagements tailored to the unique complexities and threat models of your organization. Pricing is determined by the scope, duration, and specific requirements of the engagement.
             </p>
             <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-1 shrink-0" />
                  <span>High-Risk Vendor Reconnaissance</span>
                </li>
                 <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-1 shrink-0" />
                  <span>Assurance Services & Penetration Testing</span>
                </li>
                 <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-1 shrink-0" />
                  <span>Secure Web Development & Architecture</span>
                </li>
                 <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-1 shrink-0" />
                  <span>Incident Response & Digital Forensics</span>
                </li>
            </ul>
          </CardContent>
          <div className="p-6 pt-0">
            <Button className="w-full text-lg" size="lg" asChild>
                <Link href="/contact">Contact Sales for Pricing</Link>
            </Button>
          </div>
        </Card>
        
        {/* Developer Tools Card */}
        <Card className="flex flex-col bg-gradient-to-br from-card to-card/80 border-border/50">
          <CardHeader>
             <div className="flex items-center gap-4">
                <Code className="h-8 w-8 text-primary" />
                <CardTitle className="font-headline text-2xl">Developer Tools</CardTitle>
            </div>
            <CardDescription className="pt-2">For individuals and developers using our free security utilities.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-4">
            <p className="text-muted-foreground">
                Access our suite of free, client-side security tools designed for quick analysis and insights. No account needed for basic use, or sign up to access more features.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary mt-1 shrink-0" />
                <span>AI Code Vulnerability Scanner</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary mt-1 shrink-0" />
                <span>AI Code Leak Detector</span>
              </li>
            </ul>
          </CardContent>
          <div className="p-6 pt-0 mt-auto">
             <Button variant="secondary" className="w-full" asChild>
                <Link href="/dashboard">Get Started Free</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
