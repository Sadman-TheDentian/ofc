
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { services } from '@/lib/data';
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
import { securityAdvisories } from '@/lib/data';
import { client } from '@/lib/sanity';
import { type SanityDocument } from "next-sanity";
import type { CaseStudy } from "@/lib/types";
import imageUrlBuilder from '@sanity/image-url'
import React, { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
  return builder.image(source)
}

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...3]{
  _id,
  title,
  slug,
  mainImage,
  author->{ name }
}`;

const CASE_STUDIES_QUERY = `*[_type == "caseStudy" && defined(slug.current)] {
  _id,
  title,
  "slug": slug.current,
  summary,
  mainImage
}`;


export default function Home() {
  const [blogPosts, setBlogPosts] = useState<(SanityDocument & { author?: { name: string }})[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  
  const servicesAutoplay = React.useRef(Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true }));
  const advisoriesAutoplay = React.useRef(Autoplay({ delay: 3500, stopOnInteraction: true, stopOnMouseEnter: true }));
  const blogAutoplay = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true }));
  const caseStudiesAutoplay = React.useRef(Autoplay({ delay: 4500, stopOnInteraction: true, stopOnMouseEnter: true }));


  useEffect(() => {
    async function fetchData() {
      try {
        const posts = await client.fetch<(SanityDocument & { author?: { name: string }})[]>(POSTS_QUERY);
        const studies = await client.fetch<CaseStudy[]>(CASE_STUDIES_QUERY);
        setBlogPosts(posts);
        setCaseStudies(studies);
      } catch (error) {
        console.error("Failed to fetch Sanity data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
       <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 -z-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-0" />

        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-foreground whitespace-pre-line">
              Elite Cybersecurity & Custom Web Engineering
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
              plugins={[servicesAutoplay.current]}
              opts={{ align: 'start', loop: true }}
              className="w-full max-w-6xl mx-auto"
            >
              <CarouselContent className="-ml-4">
                {services.map((service, index) => (
                  <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <RevealOnScroll delay={index * 150}>
                      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 group bg-gradient-to-br from-card to-card/80 border-border/50">
                          <CardHeader className="flex flex-row items-center gap-4 p-6">
                            <div className="p-3 bg-secondary rounded-lg">
                                <service.icon className="h-6 w-6 text-primary" />
                            </div>
                             <CardTitle className="font-headline text-xl">
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
                    </RevealOnScroll>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
        </div>
      </section>

      <section
        id="threat-intelligence"
        className="py-20 md:py-32 border-y border-border/50 bg-card/80 backdrop-blur-sm"
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
                     <Carousel opts={{ align: 'start', loop: true }} plugins={[advisoriesAutoplay.current]} className="w-full">
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
                      <Carousel opts={{ align: 'start', loop: true }} plugins={[blogAutoplay.current]} className="w-full">
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
                    plugins={[caseStudiesAutoplay.current]}
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
