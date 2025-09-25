
'use client';

import { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BrainCircuit, CheckCircle, Fingerprint, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { services, tools, caseStudies } from '@/lib/data';
import Image from 'next/image';
import PartnerSlider from '@/components/layout/PartnerSlider';
import RevealOnScroll from '@/components/animations/RevealOnScroll';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const servicesAutoplayPlugin = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  const toolsAutoplayPlugin = useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  return (
    <div className="flex flex-col min-h-screen">
       <section className="relative w-full h-[100vh] min-h-[700px] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 -z-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-0" />

        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-6xl md:text-7xl text-foreground whitespace-pre-line">
              AI-Powered Cybersecurity for Modern Threats
            </h1>
            <p
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Advanced threat detection and prevention for enterprises.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild>
                <Link href="/contact">Schedule Demo</Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/threat-intelligence">View Threat Report</Link>
              </Button>
            </div>
             <div className="pt-8 flex flex-col items-center gap-6">
                <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm font-medium text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <BrainCircuit className="h-4 w-4 text-primary" />
                        <span>Real-time Threat Intelligence</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Fingerprint className="h-4 w-4 text-primary" />
                        <span>Zero Trust Architecture</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-primary" />
                        <span>Cloud-Native Security</span>
                    </div>
                </div>
                 <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground/80">
                    <span>Gartner Recognized</span>
                    <span className="hidden md:inline">•</span>
                    <span>ISO 27001 Certified</span>
                    <span className="hidden md:inline">•</span>
                    <span>1000+ Enterprises Protected</span>
                </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 md:py-32 bg-transparent">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-16 bg-background/50 backdrop-blur-sm p-8 rounded-xl border border-border/50">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
              A Unified Security Platform
            </h2>
            <p className="max-w-3xl mx-auto text-muted-foreground md:text-xl">
              From proactive defense to incident response, our services create a
              resilient security posture for your organization.
            </p>
          </div>
          <Carousel
            plugins={[servicesAutoplayPlugin.current]}
            className="w-full"
            opts={{
              align: 'start',
              loop: true,
            }}
          >
            <CarouselContent className="-ml-4">
              {services.map((service, index) => (
                <CarouselItem
                  key={service.id}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1">
                    <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 group bg-gradient-to-br from-card to-card/80 border-border/50">
                       <CardHeader className="p-0">
                         <div className="relative h-48 w-full">
                            <Image
                            src={service.imageUrl}
                            alt={service.title}
                            fill
                            style={{objectFit: "cover"}}
                            className="group-hover:scale-105 transition-transform duration-300"
                            data-ai-hint={service.imageHint}
                            />
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow flex flex-col p-6">
                         <CardTitle className="font-headline text-xl mb-4">
                            {service.title}
                         </CardTitle>
                        <p className="text-muted-foreground flex-grow mb-4">
                          {service.description}
                        </p>
                        <Button
                          variant="link"
                          className="p-0 self-start"
                          asChild
                        >
                          <Link href={`/services/${service.slug}`}>
                            Learn More{' '}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </section>

      <section
        id="tools"
        className="py-20 md:py-32 border-t border-border/50 bg-card/80 backdrop-blur-sm"
      >
        <div className="container px-4 md:px-6">
          <RevealOnScroll>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-4 bg-background/50 backdrop-blur-sm p-8 rounded-xl border border-border/50">
                <div className="inline-block bg-secondary text-primary px-4 py-1 rounded-full text-sm font-bold">
                  OUR ARSENAL
                </div>
                <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                  Proprietary Security Tools
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  Explore our suite of tools designed to give you the upper
                  hand in the digital battlefield. From dark web monitoring to
                  phishing simulation.
                </p>
                <Button variant="outline" asChild>
                  <Link href="/tools">
                    Explore All Tools <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="space-y-4">
                 <Carousel
                    plugins={[toolsAutoplayPlugin.current]}
                    className="w-full"
                    opts={{
                    align: 'start',
                    loop: true,
                    }}
                 >
                    <CarouselContent className="-ml-4">
                        {tools.map((tool) => (
                            <CarouselItem key={tool.id} className="pl-4">
                                <div className="p-1">
                                <Link href={tool.url || `/tools/${tool.slug}`} className="group">
                                    <Card className="flex items-center gap-4 p-4 transition-colors hover:bg-secondary/30 bg-gradient-to-br from-card to-card/80 border-border/50">
                                        <div className="p-2 bg-secondary rounded-lg w-16 h-12 flex items-center justify-center shrink-0">
                                            <Image src={tool.imageUrl} alt={tool.title} width={40} height={40} className="w-auto h-auto max-w-full max-h-full" />
                                        </div>
                                        <div>
                                            <h3 className="font-headline text-lg font-semibold group-hover:text-primary transition-colors">
                                            {tool.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                            {tool.description}
                                            </p>
                                        </div>
                                        <ArrowRight className="ml-auto h-5 w-5 text-muted-foreground shrink-0 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                                    </Card>
                                </Link>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                 </Carousel>
              </div>
            </div>
          </RevealOnScroll>
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
          <div className="grid gap-8 md:grid-cols-3">
            {caseStudies.slice(0, 3).map((study, index) => (
              <RevealOnScroll key={study.id} delay={index * 150}>
                <Link href={`/case-studies`} className="group">
                  <Card className="overflow-hidden h-full flex flex-col border-border transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 rounded-xl hover:-translate-y-2 bg-gradient-to-br from-card to-card/80 border-border/50">
                    <Image
                      src={study.imageUrl}
                      alt={study.title}
                      width={600}
                      height={400}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={study.imageHint}
                    />
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
              </RevealOnScroll>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/case-studies">View All Case Studies</Link>
            </Button>
          </div>
        </div>
      </section>

      <section
        id="partners"
        className="py-20 md:py-32 border-t border-border/50 bg-background"
      >
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-16 bg-background/50 backdrop-blur-sm p-8 rounded-xl border border-border/50">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
              Powering the World's Most Secure Companies
            </h2>
          </div>
          <PartnerSlider />
        </div>
      </section>
    </div>
  );
}
