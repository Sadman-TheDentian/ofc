
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Shield, Star, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from 'react';
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "Forever",
    description: "For individuals and developers starting to explore our security tools.",
    features: [
      "Access to AI Code Scanner",
      "Access to AI Leak Detector",
      "Limited daily usage",
      "Community support",
    ],
    cta: "Get Started",
    href: "/auth",
    variant: "secondary"
  },
  {
    name: "Pro",
    price: "$2.99",
    period: "/ month",
    description: "For professionals and teams who need unlimited access and advanced features.",
    features: [
      "Everything in Free, plus:",
      "Access to all 5 security tools",
      "Unlimited usage",
      "Continuous monitoring & alerts",
      "API access for automation",
      "Priority support",
    ],
    cta: "Upgrade to Pro",
    href: "/dashboard/subscriptions",
    variant: "default",
    isFeatured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For organizations requiring bespoke security solutions and dedicated support.",
    features: [
      "Everything in Pro, plus:",
      "Custom tool integrations",
      "On-premise deployment options",
      "Dedicated security engineer",
      "Team & user management",
      "Custom SLAs",
    ],
    cta: "Contact Sales",
    href: "/contact",
    variant: "secondary"
  }
];

export default function PricingPage() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');

  return (
    <div className="container py-12 md:py-20">
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 bg-background/50 backdrop-blur-sm p-8 rounded-xl border border-border/50">
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
          Find the Right Plan for You
        </h1>
        <p className="text-xl text-muted-foreground">
          From individual developers to large enterprises, we have a plan that fits your security needs.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {plans.map((plan) => (
          <Card 
            key={plan.name}
            className={cn(
                "flex flex-col bg-gradient-to-br from-card to-card/80 border-border/50",
                plan.isFeatured && "border-primary/80 border-2 shadow-2xl shadow-primary/10"
            )}
          >
            <CardHeader className="p-8">
              <div className="flex justify-between items-center">
                <CardTitle className="font-headline text-2xl">{plan.name}</CardTitle>
                {plan.isFeatured && <div className="bg-primary text-primary-foreground text-xs font-bold uppercase px-3 py-1 rounded-full">Most Popular</div>}
              </div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0 flex-grow">
              <div className="mb-8">
                <span className="text-5xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
              </div>
              <ul className="space-y-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-1 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="p-8">
              <Button asChild size="lg" className="w-full" variant={plan.variant as any}>
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
