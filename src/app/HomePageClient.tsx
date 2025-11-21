
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BrainCircuit, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';
import { services } from '@/lib/data';
import Image from 'next/image';
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
import imageUrlBuilder from '@sanity/image-url'
import React, { useState, useEffect, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { useInView } from 'react-intersection-observer';

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
  return builder.image(source)
}

interface HomePageClientProps {
  blogPosts: (SanityDocument & { author?: { name: string }})[];
  caseStudies: CaseStudy[];
  partners: Partner[];
}

const Counter = ({ to, isMillion, isPercent }: { to: number, isMillion?: boolean, isPercent?: boolean }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = to;
      const duration = 2000;
      let startTime: number | null = null;
      
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        let percentage = Math.min(progress / duration, 1);
        
        // Ease-out function
        const easedPercentage = 1 - Math.pow(1 - percentage, 4);
        const currentCount = easedPercentage * end;

        setCount(currentCount);

        if (progress < duration) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      animationFrameRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [inView, to]);

  let formattedCount: string;
  if(isMillion) {
    formattedCount = (count / 1000000).toFixed(1);
  } else if (isPercent) {
    formattedCount = count.toFixed(1);
  } else {
    formattedCount = Math.floor(count).toLocaleString();
  }

  return <span ref={ref}>{formattedCount}</span>;
};

const DonutChart = ({ value }: { value: number }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    return (
        <div ref={ref} className="relative h-48 w-48 mx-auto">
            <svg className="w-full h-full" viewBox="0 0 200 200">
                {/* Background circle */}
                <circle
                    className="text-secondary"
                    strokeWidth="12"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="100"
                    cy="100"
                />
                {/* Foreground circle */}
                <circle
                    className={`text-primary animate-progress ${inView ? 'in-view' : ''}`}
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
                    <Counter to={value} isPercent />%
                </h3>
            </div>
        </div>
    );
};

const stats = [
  {
    value: 1800000,
    label: "Threats Analyzed Daily",
    description: "Proactively monitor, analyze and prevent sophisticated threats in real time with less complexity."
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
    description: "Drastically reduce mean time to respond (MTTR) with our expert-led incident response services."
  }
];


export default function HomePageClient({ blogPosts, caseStudies, partners }: HomePageClientProps) {
  const servicesAutoplayPlugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true }));
  const advisoriesAutoplayPlugin = useRef(Autoplay({ delay: 3500, stopOnInteraction: true, stopOnMouseEnter: true }));
  const blogAutoplayPlugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true }));
  const caseStudiesAutoplayPlugin = useRef(Autoplay({ delay: 4500, stopOnInteraction: true, stopOnMouseEnter: true }));

  const heroHeadline = "Elite Cybersecurity & Custom Web Engineering";
  
  const heroRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!h1Ref.current) return;
      const rect = h1Ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      h1Ref.current.style.setProperty("--mouseX", `${x}px`);
      h1Ref.current.style.setProperty("--mouseY", `${y}px`);
    };
    
    const currentHeroRef = heroRef.current;
    currentHeroRef?.addEventListener('mousemove', handleMouseMove);

    return () => {
      currentHeroRef?.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);


  return (
    <div className="flex flex-col min-h-screen">
       <section ref={heroRef} className="glint-container relative w-full h-[90vh] min-h-[600px] flex items-center justify-center text-center overflow-hidden bg-hero-gradient bg-background/50 backdrop-blur-sm border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-0" />

        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-4xl mx-auto space-y-6 p-8 rounded-xl">
             <h1 
                ref={h1Ref}
                className="glint-headline font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-foreground"
                style={{ '--text': `"${heroHeadline}"` } as React.CSSProperties}
              >
                {heroHeadline}
              </h1>
             <p
                className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in"
                style={{ animationDelay: '0.5s', animationFillMode: 'backwards' }}
              >
                Advanced threat detection and prevention for enterprises.
              </p>
               <div 
                className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fade-in"
                style={{ animationDelay: '0.7s', animationFillMode: 'backwards' }}
              >
                <Button size="lg" asChild>
                  <Link href="/contact">Schedule Demo</Link>
                </Button>
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/threat-intelligence">View Threat Report</Link>
                </Button>
              </div>
          </div>
        </div>
      </section>

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
              plugins={[servicesAutoplayPlugin.current]}
              opts={{ align: 'start', loop: true }}
              className="w-full max-w-6xl mx-auto"
            >
              <CarouselContent className="-ml-4">
                {services.map((service, index) => (
                  <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 group bg-gradient-to-br from-card to-card/80 border-border/50">
                          <div className="relative h-48 w-full">
                              <Image 
                                  src={service.imageUrl}
                                  alt={service.title}
                                  fill
                                  style={{ objectFit: 'cover' }}
                                  className="group-hover:scale-105 transition-transform"
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

      <section id="stats" className="py-20 md:py-32 bg-grid-gradient bg-background/50 border-y border-border/50">
        <div ref={statsRef} className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-16">
                 <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                  By the Numbers
                </h2>
                <p className="max-w-3xl mx-auto text-muted-foreground md:text-xl">
                    Our platform provides unparalleled visibility and real-time threat detection to secure your entire digital estate.
                </p>
            </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => {
              return (
                <div key={index} className={`flex flex-col items-center justify-start space-y-4 transition-all duration-500 delay-${index * 150} ${statsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  
                  {stat.type === 'chart' ? (
                      <DonutChart value={stat.value} />
                  ) : (
                      <h3 className="text-5xl font-bold font-headline text-primary h-48 flex items-center justify-center">
                        <Counter to={stat.value} isMillion={stat.label.includes('Threats')} />
                         {stat.label.includes("Threats") ? "M+" : stat.suffix}
                      </h3>
                  )}
                  
                  <h4 className="font-semibold text-foreground text-xl">{stat.label}</h4>
                  <p className="text-muted-foreground max-w-xs">{stat.description}</p>
                </div>
              )
            })}
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
                        plugins={[advisoriesAutoplayPlugin.current]} 
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
                        plugins={[blogAutoplayPlugin.current]}
                        className="w-full"
                      >
                         <CarouselContent>
                          {blogPosts.slice(0,3).map(post => (
                            <CarouselItem key={post._id}>
                                <Link href={`/blog/${post.slug.current}`} className="group block">
                                    <Card className="h-full overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 rounded-xl bg-gradient-to-br from-card to-card/80 border-border/50">
                                        <div className="flex flex-col">
                                            {post.mainImage && (
                                                <div className="relative h-40 w-full flex-shrink-0">
                                                    <Image src={urlFor(post.mainImage).width(400).height(250).url()} alt={post.title} fill style={{ objectFit: 'cover' }} className="group-hover:scale-105 transition-transform" />
                                                </div>
                                            )}
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
                    plugins={[caseStudiesAutoplayPlugin.current]}
                    className="w-full max-w-5xl mx-auto"
                >
                    <CarouselContent className="-ml-4">
                        {caseStudies.map((study) => (
                             <CarouselItem key={study._id} className="pl-4 md:basis-1/2 group">
                                <Link href={`/case-studies/${study.slug}`} className="block">
                                <Card className="overflow-hidden h-full flex flex-col border-border transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 rounded-xl hover:-translate-y-2 bg-gradient-to-br from-card to-card/80 border-border/50">
                                    {study.mainImage && (
                                        <div className="relative h-48 w-full">
                                            <Image
                                                src={urlFor(study.mainImage).width(600).height(400).url()}
                                                alt={study.title}
                                                fill
                                                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                    )}
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
