
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { services, tools, caseStudies } from '@/lib/data';
import Image from 'next/image';
import SphereAnimation from '@/components/animations/Sphere';
import PartnerSlider from '@/components/layout/PartnerSlider';
import RevealOnScroll from '@/components/animations/RevealOnScroll';


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full h-[100vh] min-h-[700px] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-background -z-20"/>
        <SphereAnimation />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-0" />
        
        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-6xl md:text-7xl text-foreground animate-fade-in-up">
              Elite Cybersecurity &
              <br />
              Custom Web Engineering
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              High-risk vendor recon, breach monitoring, and secure development that reduces operational risk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <Button size="lg" asChild>
                <Link href="/contact">Request Risk Audit</Link>
              </Button>
               <Button size="lg" variant="secondary" asChild>
                <Link href="/services">Explore Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 md:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
              A Unified Security Platform
            </h2>
            <p className="max-w-3xl mx-auto text-muted-foreground md:text-xl">
              From proactive defense to incident response, our services create a resilient security posture for your organization.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
             {services.map((service, index) => (
               <RevealOnScroll key={service.id} delay={index * 150}>
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-500"></div>
                  <Link href={`/services/${service.slug}`}>
                    <Card className="relative overflow-hidden h-full flex flex-col bg-gradient-to-br from-card to-card/80 border-border/50 transition-all duration-300 rounded-xl group-hover:shadow-2xl group-hover:shadow-primary/10 group-hover:-translate-y-2">
                      <div className="relative h-48 w-full">
                          <Image
                            src={service.imageUrl}
                            alt={service.title}
                            layout="fill"
                            objectFit="cover"
                            className="transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint={service.imageHint}
                          />
                      </div>
                      <CardHeader className="p-6">
                        <div className="p-4 bg-secondary self-start rounded-lg mb-4 mt-[-40px] relative z-10 border-4 border-card">
                          <service.icon className="w-8 h-8 text-primary shrink-0 transition-transform duration-300 group-hover:scale-110" />
                        </div>
                        <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-6 pt-0 flex-grow flex flex-col">
                        <p className="text-muted-foreground mb-4 flex-grow">{service.description}</p>
                        <div className="self-start text-primary font-semibold flex items-center group-hover:underline">
                            Learn More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section id="tools" className="py-20 md:py-32 border-t border-border/50 bg-card">
        <div className="container px-4 md:px-6">
          <RevealOnScroll>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                  <div className="inline-block bg-secondary text-primary px-4 py-1 rounded-full text-sm font-bold">
                      OUR ARSENAL
                  </div>
                  <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                    Proprietary Security Tools
                  </h2>
                  <p className="text-muted-foreground md:text-xl">
                    Explore our suite of tools designed to give you the upper hand in the digital battlefield. From dark web monitoring to phishing simulation.
                  </p>
                  <Button variant="outline" asChild>
                      <Link href="/tools">
                          Explore All Tools <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                  </Button>
              </div>
              <div className="grid gap-6">
                {tools.slice(0, 3).map((tool) => (
                  <Link href={`/tools/${tool.slug}`} key={tool.id} className="group">
                    <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-gradient-to-br from-secondary/50 to-secondary/30 transition-colors">
                      <div className="p-3 bg-secondary rounded-lg">
                        <tool.icon className="w-6 h-6 text-primary"/>
                      </div>
                      <div>
                        <h3 className="font-headline text-lg font-semibold group-hover:text-primary transition-colors">{tool.title}</h3>
                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                      </div>
                      <ArrowRight className="ml-auto h-5 w-5 text-muted-foreground shrink-0 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section id="case-studies" className="py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
              Trusted by Industry Leaders
            </h2>
            <p className="max-w-3xl mx-auto text-muted-foreground md:text-xl">
              See how we've helped organizations like yours mitigate risks and fortify their digital defenses.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {caseStudies.slice(0, 3).map((study, index) => (
              <RevealOnScroll key={study.id} delay={index * 150}>
                <Link href={`/case-studies`} className="group">
                  <Card className="overflow-hidden h-full flex flex-col bg-gradient-to-br from-card to-card/80 border-border transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 rounded-xl hover:-translate-y-2">
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
                    <Link href="/case-studies">
                        View All Case Studies
                    </Link>
                </Button>
            </div>
        </div>
      </section>

      <section id="partners" className="py-20 md:py-32 border-t border-border/50 bg-background">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-16">
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
