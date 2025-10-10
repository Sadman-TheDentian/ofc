
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check, Shield } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function PricingPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 bg-background/50 backdrop-blur-sm p-8 rounded-xl border border-border/50">
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
          Bespoke Security for the Modern Enterprise
        </h1>
        <p className="text-xl text-muted-foreground">
          DentiSystems provides custom security engagements, not off-the-shelf products. Contact us to architect a solution tailored to your organization's unique threat landscape and business objectives.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card className="border-primary border-2 shadow-lg shadow-primary/10 flex flex-col md:flex-row overflow-hidden bg-gradient-to-br from-card to-card/90">
           <div className="md:w-1/2 p-8 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4">
                <Shield className="h-8 w-8 text-primary" />
                <CardTitle className="font-headline text-2xl">Custom Enterprise Solutions</CardTitle>
            </div>
            <CardDescription className="pt-2 mb-6">
                Our pricing is determined by the scope, duration, and specific requirements of your engagement. We partner with you to deliver maximum value and ROI.
            </CardDescription>
             <ul className="space-y-4 text-muted-foreground mb-8">
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
             <Button className="w-full text-lg mt-auto" size="lg" asChild>
                <Link href="/contact">Contact Sales for Pricing</Link>
            </Button>
          </div>
          <div className="md:w-1/2 relative min-h-[300px] md:min-h-0">
             <Image 
                src="https://picsum.photos/seed/pricing-hero/800/1000"
                alt="Cybersecurity Professionals in a Security Operations Center"
                fill
                className="object-cover"
                data-ai-hint="security operations center"
             />
          </div>
        </Card>
      </div>
    </div>
  );
}
