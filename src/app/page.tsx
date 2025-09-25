
'use client';

import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BrainCircuit, CheckCircle, Fingerprint, ShieldCheck, Siren } from 'lucide-react';
import Link from 'next/link';
import { caseStudies, productShowcase, securityAdvisories, blogPosts } from '@/lib/data';
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
              From proactive defense to incident response, our platform provides a resilient security posture for your organization.
            </p>
          </div>
           <div className="grid md:grid-cols-3 gap-8">
              {productShowcase.map((product, index) => (
                <RevealOnScroll key={index} delay={index * 150}>
                  <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 group bg-gradient-to-br from-card to-card/80 border-border/50">
                      <CardHeader className="flex flex-row items-center gap-4">
                        <div className="p-3 bg-secondary rounded-lg">
                            <product.icon className="h-6 w-6 text-primary" />
                        </div>
                         <CardTitle className="font-headline text-xl">
                            {product.title}
                         </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow flex flex-col p-6 pt-0">
                         <p className="text-muted-foreground flex-grow mb-4 text-sm">
                          {product.description}
                        </p>
                        <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                            {product.features.map(feature => (
                                <li key={feature} className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-primary" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <Button
                          variant="outline"
                          className="w-full mt-auto"
                          asChild
                        >
                          <Link href="#">
                            {product.cta}{' '}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                </RevealOnScroll>
              ))}
          </div>
        </div>
      </section>

      <section
        id="threat-intelligence"
        className="py-20 md:py-32 border-t border-border/50 bg-card/80 backdrop-blur-sm"
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
            <div className="grid md:grid-cols-2 gap-8">
                <div className='space-y-4'>
                    <h3 className='font-headline text-2xl font-bold border-l-4 border-primary pl-4'>Security Advisories</h3>
                     {securityAdvisories.map(advisory => (
                        <Card key={advisory.id} className="bg-gradient-to-br from-card to-card/80 border-border/50 hover:border-primary/50 transition-colors">
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
                    ))}
                </div>
                 <div className='space-y-4'>
                    <h3 className='font-headline text-2xl font-bold border-l-4 border-primary pl-4'>From Our Research Blog</h3>
                      {blogPosts.slice(0,2).map(post => (
                        <Link href={post.url} key={post.title} className="group block">
                            <Card className="h-full overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 rounded-xl bg-gradient-to-br from-card to-card/80 border-border/50">
                                <div className="flex flex-col md:flex-row">
                                    <div className="relative h-40 md:h-auto md:w-48 flex-shrink-0">
                                        <Image src={post.imageUrl} alt={post.title} fill style={{ objectFit: 'cover' }} className="group-hover:scale-105 transition-transform" data-ai-hint={post.imageHint} />
                                    </div>
                                    <div className="p-6">
                                        <CardTitle className="text-md font-headline group-hover:text-primary transition-colors">{post.title}</CardTitle>
                                        <p className="text-xs text-muted-foreground mt-2">{post.author}</p>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
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
