'use client';

import { tools } from "@/lib/data";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import React from "react";
import Autoplay from "embla-carousel-autoplay";

type Props = {
  params: { slug: string };
};

// Note: generateMetadata is a server-only function, but Next.js allows it
// in a client component file. It will be handled correctly during the build.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = tools.find((t) => t.slug === params.slug);

  if (!tool) {
    return {
      title: "Tool Not Found",
    };
  }

  return {
    title: `${tool.title} | DentiSystems`,
    description: tool.description,
  };
}

export default function ToolDetailPage({ params }: Props) {
  const tool = tools.find((t) => t.slug === params.slug);
  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  if (!tool) {
    notFound();
  }

  const screenshots = tool.screenshots && tool.screenshots.length > 0 ? tool.screenshots : [];

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": tool.title,
    "description": tool.longDescription,
    "brand": {
      "@type": "Organization",
      "name": "DentiSystems"
    },
    "image": tool.imageUrl,
    "url": `https://www.denti.systems/tools/${tool.slug}`,
    "offers": {
        "@type": "Offer",
        "priceCurrency": "USD",
        "price": "0.00",
        "priceSpecification": [
            {
                "@type": "UnitPriceSpecification",
                "price": "0.00",
                "priceCurrency": "USD",
                "name": "Free Tier"
            },
            {
                "@type": "UnitPriceSpecification",
                "price": "99.00",
                "priceCurrency": "USD",
                "billingIncrement": "1",
                "unitText": "MONTH",
                "name": "PRO Plan"
            }
        ]
    }
  };

  return (
    <div className="container py-12 md:py-20">
       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-block p-4 bg-secondary rounded-xl">
            <Image src={tool.imageUrl} alt={tool.title} width={48} height={48} />
          </div>
          <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            {tool.title}
          </h1>
          <p className="text-xl text-muted-foreground">{tool.longDescription}</p>
        </div>
        
        {screenshots.length > 0 && (
            <div className="mb-16">
            <Carousel 
              plugins={[autoplayPlugin.current]}
              className="w-full"
              opts={{ loop: true }}
            >
                <CarouselContent>
                {screenshots.map((screenshot) => (
                    <CarouselItem key={screenshot.id}>
                    <Card className="overflow-hidden border-border/50 bg-gradient-to-br from-card to-card/80">
                        <CardContent className="p-0 aspect-video relative">
                        <Image 
                            src={screenshot.url} 
                            alt={screenshot.alt} 
                            fill 
                            className="object-cover w-full h-auto" 
                            data-ai-hint={screenshot.hint}
                        />
                        </CardContent>
                    </Card>
                    </CarouselItem>
                ))}
                </CarouselContent>
                {screenshots.length > 1 && (
                    <>
                        <CarouselPrevious className="hidden md:flex -left-12" />
                        <CarouselNext className="hidden md:flex -right-12" />
                    </>
                )}
            </Carousel>
            </div>
        )}

        <div className="text-center bg-secondary/50 p-8 rounded-xl">
            <h2 className="font-headline text-2xl font-bold text-center mb-4">
                Access This Tool
            </h2>
            <p className="text-muted-foreground mb-6">
                This tool is part of our standalone collection. An account is required to ensure a secure and integrated experience across all DentiSystems services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                    <Link href="/auth">Login to Access</Link>
                </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href={tool.url || '#'}>Proceed to Tool</Link>
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}
