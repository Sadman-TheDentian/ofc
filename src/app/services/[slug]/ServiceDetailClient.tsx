
'use client';

import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import * as LucideIcons from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import type { Service } from '@/lib/types';


const Icon = ({ name, ...props }: { name: string } & LucideIcons.LucideProps) => {
  const LucideIcon = LucideIcons[name as keyof typeof LucideIcons] as LucideIcons.LucideIcon;
  if (!LucideIcon) return null;
  return <LucideIcon {...props} />;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export default function ServiceDetailClient({ service }: { service: Service }) {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const challengeRef = useRef(null);
  const challengeInView = useInView(challengeRef, { once: true, amount: 0.3 });
  const capabilitiesRef = useRef(null);
  const capabilitiesInView = useInView(capabilitiesRef, { once: true, amount: 0.2 });
  const approachRef = useRef(null);
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.5 });
  
  const approachContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: approachContainerRef,
    offset: ['start center', 'end end'],
  });

  if (!service) {
    notFound();
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.title,
    name: service.title,
    description: service.longDescription,
    provider: {
      '@type': 'Organization',
      name: 'DentiSystems',
    },
    image: service.imageUrl,
    url: `https://www.denti.systems/services/${service.slug}`,
  };
  

  return (
    <div className="flex flex-col">
       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      
      {/* Hero Section */}
       <section ref={heroRef} className="relative w-full py-20 md:py-32 lg:py-40 bg-background overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={service.imageUrl}
            alt={service.title}
            fill
            className="object-cover w-full h-full"
            data-ai-hint={service.imageHint}
            priority
          />
           <motion.div 
            className="absolute inset-0 bg-background/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
           />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background" />
        </div>
         <motion.div 
            className="container relative z-10 text-center"
            variants={containerVariants}
            initial="hidden"
            animate={heroInView ? 'visible' : 'hidden'}
        >
          <motion.div variants={itemVariants}>
            <Badge className="mb-4 text-sm py-1 px-3">Our Services</Badge>
          </motion.div>
          <motion.h1 variants={itemVariants} className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl max-w-4xl mx-auto">
            {service.headline}
          </motion.h1>
          <motion.p variants={itemVariants} className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground md:text-xl">
            {service.description}
          </motion.p>
          <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">Schedule a Consultation</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>
      
      {/* The Challenge Section */}
       <section ref={challengeRef} className="py-20 md:py-32 border-t border-border/50">
        <motion.div 
            className="container px-4 md:px-6"
            variants={containerVariants}
            initial="hidden"
            animate={challengeInView ? "visible" : "hidden"}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
                {service.challenge.title}
              </h2>
              <p className="text-xl text-muted-foreground">
                {service.challenge.description}
              </p>
            </motion.div>
            {service.challenge.stat && (
              <motion.div variants={itemVariants} className="text-center lg:text-right">
                <p className="text-7xl lg:text-8xl font-bold text-primary">{service.challenge.stat}</p>
                <p className="text-lg text-muted-foreground">{service.challenge.statLabel}</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </section>

      {/* Key Capabilities Section */}
       <section ref={capabilitiesRef} className="py-20 md:py-32 bg-card/50 backdrop-blur-sm border-y border-border/50">
        <motion.div 
            className="container px-4 md:px-6"
            variants={containerVariants}
            initial="hidden"
            animate={capabilitiesInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="text-center space-y-4 mb-16">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
              Our Solution & Capabilities
            </h2>
            <p className="max-w-3xl mx-auto text-muted-foreground md:text-xl">
              We provide a multi-faceted approach to address your security challenges head-on.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.capabilities.map((cap, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                style={{ perspective: 800 }}
              >
                  <motion.div
                    className="h-full"
                     whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5 }}
                     transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <Card className="bg-gradient-to-br from-card to-card/80 border-border/50 text-center p-6 h-full transition-all duration-300">
                        <div className="mb-4 inline-block p-4 bg-secondary rounded-full">
                        <Icon name={cap.icon} className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="font-headline text-xl font-semibold mb-2">{cap.title}</h3>
                        <p className="text-muted-foreground text-sm">{cap.description}</p>
                    </Card>
                  </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Our Approach Section */}
       <section ref={approachRef} className="py-20 md:py-32">
         <div className="container px-4 md:px-6">
            <motion.div 
                className="text-center space-y-4 mb-24"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                    Our Methodical Approach
                </h2>
                <p className="max-w-3xl mx-auto text-muted-foreground md:text-xl">
                   Our process is transparent, structured, and designed for maximum impact and clear communication.
                </p>
            </motion.div>
            <div ref={approachContainerRef} className="relative max-w-5xl mx-auto" style={{ height: `${service.approach.length * 100}vh`}}>
                 <div className="sticky top-[20vh] h-screen overflow-hidden">
                    {service.approach.map((item, index) => {
                        const totalItems = service.approach.length;
                        const start = index / totalItems;
                        const end = (index + 1) / totalItems;
                        
                        const entranceStart = start + (0.1 / totalItems);
                        const exitEnd = end - (0.1 / totalItems);
                        
                        const opacity = useTransform(scrollYProgress, [start, entranceStart, exitEnd, end], [0, 1, 1, 0]);
                        const scale = useTransform(scrollYProgress, [start, entranceStart, exitEnd, end], [0.9, 1, 1, 0.9]);
                        const y = useTransform(scrollYProgress, [start, end], ["50%", "-50%"]);

                        return (
                            <motion.div 
                                key={item.step} 
                                style={{ opacity, scale, y }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <Card className={`w-full max-w-lg p-6 bg-gradient-to-br from-card to-card/80 border-border/50`}>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary border-2 border-primary/50 text-primary font-bold text-lg">
                                            {item.step}
                                        </div>
                                        <h3 className="font-headline text-xl font-bold text-primary">{item.title}</h3>
                                    </div>
                                    <p className="text-muted-foreground">{item.description}</p>
                                </Card>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
         </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 md:py-32 bg-secondary/30 border-y border-border/50">
        <div className="container px-4 md:px-6">
            <motion.div 
                className="max-w-3xl mx-auto text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
            >
                <p className="text-2xl font-medium italic text-foreground">
                    "{service.socialProof.quote}"
                </p>
                <p className="mt-6 font-semibold text-primary">{service.socialProof.author}</p>
                <p className="text-sm text-muted-foreground">{service.socialProof.company}</p>
            </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
       <section ref={ctaRef} className="py-20 md:py-32">
        <motion.div 
            className="container"
            initial="hidden"
            animate={ctaInView ? 'visible' : 'hidden'}
            variants={containerVariants}
        >
            <motion.div variants={itemVariants} className="max-w-3xl mx-auto text-center bg-card p-8 md:p-12 rounded-xl border border-primary/50 shadow-2xl shadow-primary/10">
                <h2 className="font-headline text-3xl font-bold mb-4">Ready to Fortify Your Defenses?</h2>
                <p className="text-muted-foreground mb-8">
                    Let's discuss how our {service.title} can be tailored to your organization's unique security needs.
                </p>
                <Button size="lg" asChild>
                    <Link href="/contact">Talk to an Expert</Link>
                </Button>
            </motion.div>
        </motion.div>
      </section>

    </div>
  );
}
