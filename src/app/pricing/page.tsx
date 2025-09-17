
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

const freeFeatures = [
  "Monitor 1 domain with DarkCheck",
  "Manual password checks",
  "Run PhishRisk campaigns for up to 25 employees",
  "Basic reporting",
];

const proFeatures = [
  "Monitor up to 50 domains",
  "Real-time alerts & API access",
  "Full access to all tool libraries and templates",
  "Detailed analytics and user-level tracking",
  "Priority support",
  "Integration with LMS for automated training"
];


export default function PricingPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
          Find the Right Plan for Your Team
        </h1>
        <p className="text-xl text-muted-foreground">
          Start for free and scale up as you grow. Our pricing is simple and transparent.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Free</CardTitle>
            <CardDescription>For individuals and small teams getting started with security.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-4">
            <p><span className="text-4xl font-bold">$0</span> / month</p>
            <ul className="space-y-3">
              {freeFeatures.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-1 shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
                <Link href="/auth">Get Started</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="border-primary border-2 shadow-lg shadow-primary/10 flex flex-col">
           <CardHeader>
            <CardTitle className="font-headline text-2xl">PRO</CardTitle>
            <CardDescription>For businesses that need advanced security and full API access.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-4">
             <p><span className="text-4xl font-bold">$99</span> / month</p>
             <ul className="space-y-3">
              {proFeatures.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-1 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
                <Link href="/dashboard/subscriptions">Upgrade to PRO</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="text-center max-w-3xl mx-auto bg-card p-8 rounded-xl border border-border">
          <h2 className="font-headline text-2xl font-bold mb-4">Enterprise Solutions</h2>
          <p className="text-muted-foreground mb-6">
            Need a custom plan for your large organization? We offer bespoke solutions including dedicated support, custom integrations, and on-premise deployments.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact">Contact Sales</Link>
          </Button>
      </div>
    </div>
  );
}
