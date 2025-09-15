
'use client';

import { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { services, tools, caseStudies } from '@/lib/data';
import Image from 'next/image';

const SphereAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement!.offsetWidth);
    let height = (canvas.height = canvas.parentElement!.offsetHeight);
    let dots: any[] = [];

    const DOTS_AMOUNT = 1000;
    const DOT_RADIUS = 1.2;
    let GLOBE_RADIUS = width * 0.3;
    let GLOBE_CENTER_Z = -GLOBE_RADIUS;
    let PROJECTION_CENTER_X = width / 2;
    let PROJECTION_CENTER_Y = height / 2;
    let FIELD_OF_VIEW = width * 0.8;

    class Dot {
      x: number;
      y: number;
      z: number;
      radius: number;
      theta: number;
      phi: number;

      constructor(i: number) {
        this.theta = Math.acos(-1 + (2 * i) / DOTS_AMOUNT);
        this.phi = Math.sqrt(DOTS_AMOUNT * Math.PI) * this.theta;
        this.x = GLOBE_RADIUS * Math.cos(this.phi) * Math.sin(this.theta);
        this.y = GLOBE_RADIUS * Math.sin(this.phi) * Math.sin(this.theta);
        this.z = GLOBE_RADIUS * Math.cos(this.theta);
        this.radius = DOT_RADIUS;
      }

      project(sinY: number, cosY: number, sinX: number, cosX: number) {
        const rotX = cosY * this.x + sinY * (this.z - GLOBE_CENTER_Z);
        const rotZ = -sinY * this.x + cosY * (this.z - GLOBE_CENTER_Z) + GLOBE_CENTER_Z;
        const rotY = cosX * this.y + sinX * rotZ;

        const scale = FIELD_OF_VIEW / (FIELD_OF_VIEW - rotZ);
        const projX = rotX * scale + PROJECTION_CENTER_X;
        const projY = rotY * scale + PROJECTION_CENTER_Y;
        const projRadius = this.radius * scale;

        return { x: projX, y: projY, r: projRadius };
      }

      draw(sinY: number, cosY: number, sinX: number, cosX: number) {
        if (!ctx) return;
        const { x, y, r } = this.project(sinY, cosY, sinX, cosX);
        if (x < 0 || x > width || y < 0 || y > height) return;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI, false);
        const opacity = 0.5 + this.z / GLOBE_RADIUS;
        ctx.fillStyle = `rgba(0, 255, 0, ${opacity})`;
        ctx.fill();
      }
    }

    function createDots() {
      dots = [];
      for (let i = 0; i < DOTS_AMOUNT; i++) {
        dots.push(new Dot(i));
      }
    }

    let baseRotationY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;
    let currentRotationY = 0;
    let currentRotationX = 0;
    const LERP_FACTOR = 0.05; // Smoothing factor


    function render() {
        if (!ctx) return;
        ctx.clearRect(0, 0, width, height);

        baseRotationY += 0.001;

        currentRotationY += (targetRotationY - currentRotationY) * LERP_FACTOR;
        currentRotationX += (targetRotationX - currentRotationX) * LERP_FACTOR;

        const finalRotationY = baseRotationY + currentRotationY;
        const finalRotationX = currentRotationX;

        const sinY = Math.sin(finalRotationY);
        const cosY = Math.cos(finalRotationY);
        const sinX = Math.sin(finalRotationX);
        const cosX = Math.cos(finalRotationX);

        dots.sort((a, b) => a.z - b.z).forEach(dot => dot.draw(sinY, cosY, sinX, cosX));
        requestAnimationFrame(render);
    }

    function onMouseMove(e: MouseEvent) {
        const interactiveRotationY = (e.clientX - PROJECTION_CENTER_X) * 0.0003;
        const interactiveRotationX = (e.clientY - PROJECTION_CENTER_Y) * 0.0003;

        targetRotationY = interactiveRotationY * 0.7;
        targetRotationX = interactiveRotationX * 0.7;
    }

    function onResize() {
        if(canvas && canvas.parentElement){
            width = canvas.width = canvas.parentElement.offsetWidth;
            height = canvas.height = canvas.parentElement.offsetHeight;
            GLOBE_RADIUS = width * 0.3;
            GLOBE_CENTER_Z = -GLOBE_RADIUS;
            PROJECTION_CENTER_X = width / 2;
            PROJECTION_CENTER_Y = height / 2;
            FIELD_OF_VIEW = width * 0.8;
            createDots();
        }
    }

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);
    createDots();
    render();

    return () => {
        window.removeEventListener('resize', onResize);
        window.removeEventListener('mousemove', onMouseMove);
    }
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full opacity-50" />;
};


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-background -z-20"/>
        <SphereAnimation />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-0" />
        
        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-4">
             <Image src="/logo.svg" alt="DentiSystems Logo" width={96} height={96} className="mx-auto" />
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-6xl md:text-7xl text-foreground">
              Elite Cybersecurity &
              <br />
              Custom Web Engineering
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              High-risk vendor recon, breach monitoring, and secure web
              development that reduces operational risk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild>
                <Link href="/dashboard">Access Dashboard</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Request Risk Audit</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 md:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
              Our Core Services
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl">
              From penetrating the impenetrable to building resilient web
              platforms, we are your digital shield.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
             {services.map((service) => (
              <Link href={`/services/${service.slug}`} key={service.id} className="group">
                <Card className="overflow-hidden h-full flex flex-col bg-secondary/30 hover:bg-secondary/60 border-border/50 hover:border-primary/50 transition-all">
                   <Image
                    src={service.imageUrl}
                    alt={service.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    data-ai-hint={service.imageHint}
                  />
                  <CardHeader className="flex flex-row items-center gap-4">
                    <service.icon className="w-8 h-8 text-primary" />
                    <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col">
                    <p className="text-muted-foreground mb-4 flex-grow">{service.description}</p>
                    <div className="self-start text-primary font-medium flex items-center group-hover:underline">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="tools" className="py-20 md:py-32 border-y border-border/50">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
             <div className="inline-block bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-sm font-medium">
                Our Arsenal
            </div>
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
              Cutting-Edge Security Tools
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl">
              Explore our suite of proprietary tools designed to give you the upper hand in the digital battlefield.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {tools.slice(0, 3).map((tool) => (
              <Card key={tool.id} className="bg-card hover:border-primary/50 transition-colors">
                <CardHeader className="flex flex-row items-center gap-4">
                  <tool.icon className="w-8 h-8 text-primary" />
                  <CardTitle className="font-headline text-xl">{tool.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{tool.description}</p>
                   <Button variant="link" asChild className="p-0 h-auto text-primary">
                    <Link href={`/tools/${tool.slug}`}>
                      Explore Tool <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="case-studies" className="py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
              Proven Success Stories
            </h2>
            <p className="maxw-2xl mx-auto text-muted-foreground md:text-xl">
              See how we've helped organizations like yours mitigate risks and
              fortify their defenses.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.slice(0, 3).map((study) => (
              <Link href={`/case-studies`} key={study.id} className="group">
                <Card className="overflow-hidden h-full flex flex-col bg-secondary/30 hover:bg-secondary/60 border-border/50 hover:border-primary/50 transition-all">
                  <Image
                    src={study.imageUrl}
                    alt={study.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
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
            ))}
          </div>
           <div className="text-center mt-12">
                <Button asChild>
                    <Link href="/case-studies">
                        Explore All Case Studies <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
      </section>
    </div>
  );
}

    