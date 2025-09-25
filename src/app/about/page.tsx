
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Award, Handshake, BrainCircuit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TeamMembers } from "@/lib/placeholder-images";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import React from "react";

const statsData = [
  { subject: 'Threats Analyzed', value: 120, fullMark: 150, displayValue: "1.2M+" },
  { subject: 'Enterprises Secured', value: 100, fullMark: 150, displayValue: "150+" },
  { subject: 'Ransomware Resilience', value: 99.8, fullMark: 100, displayValue: "99.8%" },
];

const values = [
    {
        icon: Award,
        title: "Expertise",
        description: "Our team comprises industry veterans with decades of combined experience in offensive security, threat intelligence, and secure software development."
    },
    {
        icon: Handshake,
        title: "Integrity",
        description: "We operate with the highest ethical standards, prioritizing our clients' trust and confidentiality above all else. Your security is our bond."
    },
    {
        icon: BrainCircuit,
        title: "Innovation",
        description: "The threat landscape is always evolving, and so are we. We are committed to continuous research and development to stay ahead of adversaries."
    }
];

const resources = [
    {
        title: "Whitepaper: The Anatomy of a Zero-Day Exploit",
        description: "A deep dive into how zero-day vulnerabilities are discovered, weaponized, and deployed by advanced persistent threat actors.",
        imageUrl: "https://picsum.photos/seed/res1/600/400",
        imageHint: "abstract code security"
    },
    {
        title: "Report: 2024 Global Threat Landscape",
        description: "Our annual report analyzing the year's most significant cyber threats, attack vectors, and defensive trends across industries.",
        imageUrl: "https://picsum.photos/seed/res2/600/400",
        imageHint: "digital world map"
    },
    {
        title: "Guide: Building a Resilient Security Culture",
        description: "Actionable steps for fostering a security-first mindset within your organization to combat social engineering and insider threats.",
        imageUrl: "https://picsum.photos/seed/res3/600/400",
        imageHint: "team collaboration security"
    }
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card/80 p-2 border border-border/50 rounded-lg">
        <p className="font-bold text-primary">{`${data.subject}`}</p>
        <p className="text-sm text-foreground">{`Value: ${data.displayValue}`}</p>
      </div>
    );
  }

  return null;
};


export default function AboutPage() {
    const resourcesAutoplayPlugin = React.useRef(
        Autoplay({
          delay: 4000,
          stopOnInteraction: true,
          stopOnMouseEnter: true,
        })
    );
  return (
    <div className="container py-12 md:py-20">
      <div className="text-center max-w-3xl mx-auto mb-16 bg-background/50 backdrop-blur-sm p-8 rounded-xl border border-border/50">
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
          About DentiSystems
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          We are a collective of elite security researchers, ethical hackers, and
          web engineers dedicated to fortifying the digital world.
        </p>
      </div>

      <section className="mb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <Card className="bg-gradient-to-br from-card to-card/80 border-border/50 p-6 space-y-6">
            <h2 className="font-headline text-2xl font-bold border-l-4 border-primary pl-4">
              Our Mission
            </h2>
            <p className="text-muted-foreground">
              In a world of escalating digital threats, passive defense is no
              longer enough. Our mission is to provide organizations with an
              attacker&apos;s advantage. We combine deep offensive security expertise
              with secure development practices to build digital experiences
              that are not just functional, but fundamentally resilient.
            </p>
            <p className="text-muted-foreground">
              We don&apos;t just patch vulnerabilities; we re-engineer the very
              foundation of your web presence to eliminate entire classes of
              risk, ensuring your operations, data, and reputation are secure
              from the ground up.
            </p>
          </Card>
          <Card className="bg-gradient-to-br from-card to-card/80 border-border/50">
             <CardHeader>
                <CardTitle>By the Numbers</CardTitle>
                <CardDescription>A testament to our impact and expertise.</CardDescription>
             </CardHeader>
              <CardContent>
                 <ResponsiveContainer width="100%" height={250}>
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={statsData}>
                        <defs>
                            <radialGradient id="radarGradient">
                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                            </radialGradient>
                        </defs>
                        <PolarGrid stroke="hsl(var(--border) / 0.5)" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                        <Radar name="DentiSystems" dataKey="value" stroke="hsl(var(--primary))" fill="url(#radarGradient)" fillOpacity={0.8} />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: "3 3" }} />
                    </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
        </div>
      </section>
      
      <section className="mb-20">
        <h2 className="font-headline text-3xl font-bold tracking-tighter text-center mb-12">
            Our Core Values
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {values.map((value) => (
                <Card key={value.title} className="bg-gradient-to-br from-card to-card/80 border-border/50 text-center p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
                     <div className="mb-4 inline-block p-3 bg-secondary rounded-full">
                        <value.icon className="h-8 w-8 text-primary" />
                     </div>
                     <h3 className="font-headline text-xl font-semibold mb-2">{value.title}</h3>
                     <p className="text-muted-foreground text-sm">{value.description}</p>
                </Card>
            ))}
        </div>
      </section>
      
       <section className="mb-20">
        <h2 className="font-headline text-3xl font-bold tracking-tighter text-center mb-12">
            From Our Research Desk
        </h2>
        <Carousel
            plugins={[resourcesAutoplayPlugin.current]}
            className="w-full max-w-5xl mx-auto"
            opts={{
                align: 'start',
                loop: true,
            }}
        >
            <CarouselContent className="-ml-4">
                {resources.map((resource) => (
                    <CarouselItem key={resource.title} className="pl-4 md:basis-1/2 group">
                        <Card className="overflow-hidden h-full flex flex-col border-border transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 rounded-xl hover:-translate-y-2 bg-gradient-to-br from-card to-card/80 border-border/50">
                            <CardHeader className="p-0">
                                <div className="relative h-48 w-full">
                                    <Image
                                        src={resource.imageUrl}
                                        alt={resource.title}
                                        fill
                                        objectFit="cover"
                                        className="group-hover:scale-105 transition-transform duration-300"
                                        data-ai-hint={resource.imageHint}
                                    />
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 flex-grow flex flex-col">
                                <h3 className="font-headline text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{resource.title}</h3>
                                <p className="text-muted-foreground text-sm mb-4 flex-grow">{resource.description}</p>
                                <Button variant="link" className="p-0 self-start">Read More</Button>
                            </CardContent>
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>
             <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
        </Carousel>
      </section>

      <section className="text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tighter mb-12">
          Meet the Experts
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-12">
          {TeamMembers.map((member, index) => (
            <Card key={index} className="bg-gradient-to-br from-card to-card/80 border-border/50 text-center">
              <CardContent className="p-6">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  width={120}
                  height={120}
                  className="rounded-full mx-auto mb-4 border-2 border-primary/50 object-cover w-32 h-32"
                  data-ai-hint={member.imageHint}
                />
                <h3 className="font-headline text-xl font-semibold">
                  {member.name}
                </h3>
                <p className="text-primary text-sm font-medium mb-2">
                  {member.title}
                </p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="bg-secondary/50 rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="font-headline text-2xl font-bold mb-3">Join Our Mission</h3>
            <p className="text-muted-foreground mb-6">We are always looking for exceptional talent to join our ranks. If you live and breathe cybersecurity and want to make a real-world impact, we want to hear from you.</p>
            <Button size="lg" asChild>
                <Link href="/contact">View Open Positions</Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
