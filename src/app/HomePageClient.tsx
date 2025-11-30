
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { services } from '@/lib/data';
import PartnerSlider from '@/components/layout/PartnerSlider';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { securityAdvisories } from '@/lib/data';
import { client } from '@/lib/sanity';
import { type SanityDocument } from "next-sanity";
import type { CaseStudy, Partner } from "@/lib/types";
import imageUrlBuilder from '@sanity/image-url';
import React, { useState, useEffect, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import SyntheticHero from '@/components/layout/SyntheticHero';
import SafeImage from '@/components/SafeImage';

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

interface HomePageClientProps {
  blogPosts: (SanityDocument & { author?: { name: string }})[];
  caseStudies: CaseStudy[];
  partners: Partner[];
}

const Counter = ({ to, isMillion, isPercent }: { to: number, isMillion?: boolean, isPercent?: boolean }) => {
  const getFormattedCount = (value: number) => {
    if (isMillion) {
      return (value / 1000000).toFixed(1);
    } else if (isPercent) {
      return value.toFixed(1);
    } else {
      return Math.floor(value).toLocaleString();
    }
  };

  return <span>{getFormattedCount(to)}</span>;
};

const DonutChart = ({ value }: { value: number }) => {
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const progress = value / 100;
    const offset = circumference - progress * circumference;

    return (
        <div className="relative h-48 w-48 mx-auto">
            <svg className="w-full h-full" viewBox="0 0 200 200">
                <circle
                    className="text-secondary"
                    strokeWidth="12"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="100"
                    cy="100"
                />
                <circle
                    className={`text-primary`}
                    strokeWidth="12"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="100"
                    cy="100"
                    transform="rotate(-90 100 100)"
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-4xl font-bold font-headline text-primary">
                    {value.toFixed(1)}%
                </h3>
            </div>
        </div>
    );
};

const stats = [
  {
    value: 1800000,
    label: "Threats Analyzed Daily",
    description: "Proactively monitor, analyze and prevent sophisticated threats in real time with less complexity.",
    isMillion: true,
  },
  {
    type: 'chart',
    value: 99.8,
    label: "Breach Prevention Rate",
    description: "Proactive threat hunting and vulnerability management to secure your perimeter and prevent incidents."
  },
  {
    value: 90,
    suffix: '%',
    label: "Faster Incident Response",
    description: "Drastically reduce mean time to respond (MTTR) with our expert-led incident response services.",
    isPercent: true,
  }
];


export default function HomePageClient({ blogPosts = [], caseStudies = [], partners = [] }: HomePageClientProps) {
  const [plugins, setPlugins] = useState<any[]>([]);

  useEffect(() => {
    setPlugins([
      Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true }),
    ]);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
       <SyntheticHero 
          title="REDEFINE YOUR DEFENSE"
          description="Offensive security to fortify your digital defenses."
          badgeText="DentiSystems"
          badgeLabel="Cybersecurity"
          ctaButtons={[
            { text: 'Schedule Demo', href: '/contact', primary: true },
            { text: 'View Threat Report', href: '/threat-intelligence' },
          ]}
          microDetails={[
            "AI-Powered Threat Detection",
            "Offensive Security",
            "Resilient Infrastructure"
          ]}
       />

      <section id="services" className="py-20 md:py-32 bg-transparent">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-16 bg-background/50 backdrop-blur-sm p-8 rounded-xl border border-border/50">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
              Our Core Services
            </h2>
            <p className="max-w-3xl mx-auto text-muted-foreground md:text-xl">
              From proactive defense to incident response, our services provide a resilient security posture for your organization.
            </p>
          </div>
           <Carousel
              plugins={plugins}
              opts={{ align: 'start', loop: true }}
              className="w-full max-w-6xl mx-auto"
            >
              <CarouselContent className="-ml-4">
                {services.map((service, index) => (
                  <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 group bg-gradient-to-br from-card to-card/80 border-border/50">
                          <div className="relative h-48 w-full">
                              <SafeImage 
                                  src={service.imageUrl}
                                  alt={service.title}
                                  fill
                                  className="group-hover:scale-105 transition-transform"
                                  style={{ objectFit: 'cover' }}
                                  data-ai-hint={service.imageHint}
                              />
                          </div>
                          <CardHeader>
                             <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors">
                                {service.title}
                             </CardTitle>
                          </CardHeader>
                          <CardContent className="flex-grow flex flex-col p-6 pt-0">
                             <p className="text-muted-foreground flex-grow mb-4 text-sm">
                              {service.description}
                            </p>
                            <Button
                              variant="outline"
                              className="w-full mt-auto"
                              asChild
                            >
                              <Link href={`/services/${service.slug}`}>
                                Learn More{' '}
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                          </CardContent>
                        </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
        </div>
      </section>

      <section id="stats" className="py-20 md:py-32 bg-asymmetrical-gradient bg-background/50 border-y border-border/50">
        <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-16">
                 <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                  By the Numbers
                </h2>
                <p className="max-w-3xl mx-auto text-muted-foreground md:text-xl">
                    Our platform provides unparalleled visibility and real-time threat detection to secure your entire digital estate.
                </p>
            </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-start space-y-4"
              >
                {stat.type === 'chart' ? (
                  <DonutChart value={stat.value} />
                ) : (
                  <h3 className="text-5xl font-bold font-headline text-primary h-48 flex items-center justify-center">
                    <Counter to={stat.value} isMillion={stat.isMillion} isPercent={stat.isPercent} />
                    {stat.isMillion ? "M+" : (stat.suffix || '')}
                  </h3>
                )}
                
                <h4 className="font-semibold text-foreground text-xl">{stat.label}</h4>
                <p className="text-muted-foreground max-w-xs">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section
        id="threat-intelligence"
        className="py-20 md:py-32 border-b border-border/50 bg-asymmetrical-gradient bg-card/80 backdrop-blur-sm"
      >
        <div className="container px-4 md:px-6">
           <div className="text-center space-y-4 mb-16 bg-background/50 backdrop-blur-sm p-8 rounded-xl border border-border/50">
                <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                  Latest Threat Intelligence
                </h2>
                <p className="max-w-3xl mx-auto text-muted-foreground md:text-xl">
                  Stay ahead of adversaries with real-time alerts and research from the front lines of cybersecurity.
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <div className='space-y-4'>
                    <h3 className='font-headline text-2xl font-bold border-l-4 border-primary pl-4'>Security Advisories</h3>
                     <Carousel 
                        opts={{ align: 'start', loop: true }} 
                        plugins={plugins}
                        className="w-full"
                    >
                       <CarouselContent>
                          {securityAdvisories.map(advisory => (
                            <CarouselItem key={advisory.id}>
                                <Card className="bg-gradient-to-br from-card to-card/80 border-border/50 hover:border-primary/50 transition-colors">
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="font-headline text-lg">{advisory.title}</CardTitle>
                                                <p className='text-muted-foreground text-sm'>{advisory.id} • {advisory.date}</p>
                                            </div>
                                            <div className={`text-xs font-bold uppercase px-3 py-1 rounded-full text-white ${advisory.severityColor}`}>{advisory.severity}</div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground text-sm">{advisory.description}</p>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                     </Carousel>
                </div>
                 <div className='space-y-4'>
                    <h3 className='font-headline text-2xl font-bold border-l-4 border-primary pl-4'>From Our Research Blog</h3>
                      <Carousel 
                        opts={{ align: 'start', loop: true }} 
                        plugins={plugins}
                        className="w-full"
                      >
                         <CarouselContent>
                          {(blogPosts || []).slice(0,3).map(post => (
                            <CarouselItem key={post._id}>
                                <Link href={`/blog/${post.slug.current}`} className="group block">
                                    <Card className="h-full overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 rounded-xl bg-gradient-to-br from-card to-card/80 border-border/50">
                                        <div className="flex flex-col">
                                            <div className="relative h-40 w-full flex-shrink-0">
                                                <SafeImage src={post.mainImage ? urlFor(post.mainImage).width(400).height(250).url() : null} alt={post.title || ""} fill style={{ objectFit: 'cover' }} className="group-hover:scale-105 transition-transform" />
                                            </div>
                                            <div className="p-6">
                                                <CardTitle className="text-md font-headline group-hover:text-primary transition-colors">{post.title}</CardTitle>
                                                <p className="text-xs text-muted-foreground mt-2">{post.author?.name}</p>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                              </CarouselItem>
                          ))}
                        </CarouselContent>
                      </Carousel>
                </div>
            </div>
             <div className="text-center mt-12">
                <Button asChild size="lg" variant="secondary">
                    <Link href="/threat-intelligence">Visit Threat Intelligence Center</Link>
                </Button>
            </div>
        </div>
      </section>

      <section id="case-studies" className="py-20 md:py-32 bg-transparent">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-16 bg-background/50 backdrop-blur-sm p-8 rounded-xl border border-border/50">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
              Trusted by Industry Leaders
            </h2>
            <p className="max-w-3xl mx-auto text-muted-foreground md:text-xl">
              See how we've helped organizations like yours mitigate risks and
              fortify their digital defenses.
            </p>
          </div>
            {caseStudies.length > 0 && (
                 <Carousel
                    opts={{ align: 'start', loop: true }}
                    plugins={plugins}
                    className="w-full max-w-5xl mx-auto"
                >
                    <CarouselContent className="-ml-4">
                        {caseStudies.map((study) => (
                             <CarouselItem key={study._id} className="pl-4 md:basis-1/2 group">
                                <Link href={`/case-studies/${study.slug.current}`} className="block">
                                <Card className="overflow-hidden h-full flex flex-col border-border transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 rounded-xl hover:-translate-y-2 bg-gradient-to-br from-card to-card/80 border-border/50">
                                    <div className="relative h-48 w-full">
                                        <SafeImage
                                            src={study.mainImage ? urlFor(study.mainImage).width(600).height(400).url() : null}
                                            alt={study.title}
                                            fill
                                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    <CardHeader>
                                    <CardTitle className="font-headline text-lg group-hover:text-primary transition-colors">
                                        {study.title}
                                    </CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                    <p className="text-muted-foreground text-sm">
                                        {study.summary}
                                    </p>
                                    </CardContent>
                                </Card>
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:flex" />
                    <CarouselNext className="hidden md:flex" />
                </Carousel>
            )}
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/case-studies">View All Case Studies</Link>
            </Button>
          </div>
        </div>
      </section>

      <section
        id="partners"
        className="py-20 md:py-32 border-t border-border/50 bg-bottom-glow-gradient bg-background"
      >
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-16 bg-background/50 backdrop-blur-sm p-8 rounded-xl border border-border/50">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
              Powering the World's Most Secure Companies
            </h2>
          </div>
          <PartnerSlider partners={partners} />
        </div>
      </section>
    </div>
  );
}
