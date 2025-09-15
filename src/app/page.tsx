

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement!.offsetWidth);
    let height = (canvas.height = canvas.parentElement!.offsetHeight);
    let dots: Dot[] = [];
    const DOTS_AMOUNT = 2000;
    const DOT_RADIUS = 1;
    let GLOBE_RADIUS = width * 0.7;
    let GLOBE_CENTER_Z = -GLOBE_RADIUS;
    let PROJECTION_CENTER_X = width / 2;
    let PROJECTION_CENTER_Y = height / 2;
    let FIELD_OF_VIEW = width * 0.8;
    const primaryColor = '0, 255, 136'; // #00FF88 in RGB

    let mouse = {
        x: 0,
        y: 0,
    };
    
    let packets: Packet[] = [];
    const PACKET_AMOUNT = 100;

    class Dot {
      x: number;
      y: number;
      z: number;
      theta: number;
      phi: number;
      projected: { x: number; y: number; scale: number; };

      constructor(i: number) {
        this.theta = Math.acos(-1 + (2 * i) / DOTS_AMOUNT);
        this.phi = Math.sqrt(DOTS_AMOUNT * Math.PI) * this.theta;
        this.x = GLOBE_RADIUS * Math.cos(this.phi) * Math.sin(this.theta);
        this.y = GLOBE_RADIUS * Math.sin(this.phi) * Math.sin(this.theta);
        this.z = GLOBE_RADIUS * Math.cos(this.theta);
        this.projected = { x: 0, y: 0, scale: 0 };
      }

      project(sinY: number, cosY: number, sinX: number, cosX: number) {
        
        const mouseRepulsion = 200;
        const dx = mouse.x - this.projected.x;
        const dy = mouse.y - this.projected.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        let repelX = 0;
        let repelY = 0;

        if (dist < mouseRepulsion) {
          const angle = Math.atan2(dy, dx);
          const force = (mouseRepulsion - dist) / mouseRepulsion;
          repelX = Math.cos(angle) * force * -20;
          repelY = Math.sin(angle) * force * -20;
        }


        const rotX = cosY * this.x + sinY * (this.z - GLOBE_CENTER_Z);
        const rotZ = -sinY * this.x + cosY * (this.z - GLOBE_CENTER_Z) + GLOBE_CENTER_Z;
        const rotY = cosX * this.y + sinX * rotZ;

        const scale = FIELD_OF_VIEW / (FIELD_OF_VIEW - rotZ);
        this.projected = {
            x: rotX * scale + PROJECTION_CENTER_X + repelX,
            y: rotY * scale + PROJECTION_CENTER_Y + repelY,
            scale: scale,
        };
      }

      draw(sinY: number, cosY: number, sinX: number, cosX: number) {
        if (!ctx) return;
        this.project(sinY, cosY, sinX, cosX);
        if (this.projected.x < 0 || this.projected.x > width || this.projected.y < 0 || this.projected.y > height) return;

        const dx = mouse.x - this.projected.x;
        const dy = mouse.y - this.projected.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const highlightRadius = 150;
        const opacity = Math.max(0, 1 - distance / highlightRadius);
        
        ctx.beginPath();
        const radius = DOT_RADIUS * this.projected.scale * (1 + opacity * 1.5);
        ctx.arc(this.projected.x, this.projected.y, radius, 0, 2 * Math.PI, false);

        if (opacity > 0) {
            const glow_opacity = Math.min(0.8, opacity);
            ctx.fillStyle = `rgba(${primaryColor}, ${glow_opacity})`;
        } else {
            ctx.fillStyle = `rgba(${primaryColor}, 0.2)`;
        }

        ctx.fill();
      }
    }

    class Packet {
      from: Dot;
      to: Dot;
      progress: number;
      speed: number;
      projected: { x: number, y: number, scale: number };

      constructor() {
          this.from = dots[Math.floor(Math.random() * dots.length)];
          this.to = dots[Math.floor(Math.random() * dots.length)];
          this.progress = 0;
          this.speed = Math.random() * 0.005 + 0.002;
          this.projected = { x: 0, y: 0, scale: 0 };
      }

      move() {
          this.progress += this.speed;
          if (this.progress >= 1) {
              this.from = dots[Math.floor(Math.random() * dots.length)];
              this.to = dots[Math.floor(Math.random() * dots.length)];
              this.progress = 0;
          }
      }

      draw() {
          const currentX = this.from.projected.x + (this.to.projected.x - this.from.projected.x) * this.progress;
          const currentY = this.from.projected.y + (this.to.projected.y - this.from.projected.y) * this.progress;
          const currentScale = this.from.projected.scale + (this.to.projected.scale - this.from.projected.scale) * this.progress;

          if (currentX < 0 || currentX > width || currentY < 0 || currentY > height || currentScale < 0) return;

          ctx.beginPath();
          ctx.arc(currentX, currentY, DOT_RADIUS * 1.5 * currentScale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${primaryColor}, 0.8)`;
          ctx.fill();
      }
    }

    function createDots() {
      dots = [];
      for (let i = 0; i < DOTS_AMOUNT; i++) {
        dots.push(new Dot(i));
      }
    }
    
    function createPackets() {
        packets = [];
        for (let i = 0; i < PACKET_AMOUNT; i++) {
            packets.push(new Packet());
        }
    }

    let targetRotationY = 0.001;
    let targetRotationX = 0;
    let currentRotationY = 0;
    let currentRotationX = 0;
    const LERP_FACTOR = 0.08;

    let animationFrameId: number;

    function render() {
        if (!ctx) return;
        ctx.clearRect(0, 0, width, height);
        
        targetRotationY += 0.0005;

        currentRotationY += (targetRotationY - currentRotationY) * LERP_FACTOR;
        currentRotationX += (targetRotationX - currentRotationX) * LERP_FACTOR;

        const sinY = Math.sin(currentRotationY);
        const cosY = Math.cos(currentRotationY);
        const sinX = Math.sin(currentRotationX);
        const cosX = Math.cos(currentRotationX);
        
        dots.forEach(dot => dot.project(sinY, cosY, sinX, cosX));
        dots.sort((a, b) => a.projected.scale - b.projected.scale);
        dots.forEach(dot => dot.draw(sinY, cosY, sinX, cosX));
        
        packets.forEach(p => p.move());
        packets.forEach(p => p.draw());

        animationFrameId = requestAnimationFrame(render);
    }
    
    function onMouseMove(e: MouseEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      
      targetRotationY = (mouse.x - PROJECTION_CENTER_X) * 0.0005;
      targetRotationX = (mouse.y - PROJECTION_CENTER_Y) * 0.0005;
    }

    function onResize() {
        if(canvas && canvas.parentElement){
            width = canvas.width = canvas.parentElement.offsetWidth;
            height = canvas.height = canvas.parentElement.offsetHeight;
            GLOBE_RADIUS = width * 0.6;
            GLOBE_CENTER_Z = -GLOBE_RADIUS;
            PROJECTION_CENTER_X = width / 2;
            PROJECTION_CENTER_Y = height / 2;
            FIELD_OF_VIEW = width * 0.8;
            createDots();
            createPackets();
        }
    }
    
    window.addEventListener('resize', onResize);
    document.addEventListener('mousemove', onMouseMove);
    createDots();
    createPackets();
    render();

    return () => {
        window.removeEventListener('resize', onResize);
        document.removeEventListener('mousemove', onMouseMove);
        cancelAnimationFrame(animationFrameId);
    }
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full opacity-50" />;
};


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full h-[100vh] min-h-[700px] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-background -z-20"/>
        <SphereAnimation />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-0" />
        
        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-6xl md:text-7xl text-foreground">
              Elite Cybersecurity &
              <br />
              Custom Web Engineering
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              High-risk vendor recon, breach monitoring, and secure development that reduces operational risk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
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
          <div className="text-center space-y-4 mb-16 animate-fade-in-up">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
              A Unified Security Platform
            </h2>
            <p className="max-w-3xl mx-auto text-muted-foreground md:text-xl">
              From proactive defense to incident response, our services create a resilient security posture for your organization.
            </p>
          </div>
          <div className="grid gap-12 md:grid-cols-3">
             {services.map((service, index) => (
              <div key={service.id} className="group relative animate-fade-in-up" style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-500"></div>
                <Link href={`/services/${service.slug}`}>
                  <Card className="relative overflow-hidden h-full flex flex-col bg-card border-border/50 transition-all rounded-xl">
                    <CardHeader className="flex flex-row items-center gap-4 p-6">
                      <service.icon className="w-8 h-8 text-primary shrink-0 transition-colors duration-300 group-hover:text-primary" />
                      <CardTitle className="font-headline text-xl transition-colors duration-300 group-hover:text-primary">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 pt-0 flex-grow flex flex-col">
                      <p className="text-muted-foreground mb-4 flex-grow">{service.description}</p>
                      <div className="self-start text-primary font-semibold flex items-center transition-colors duration-300 group-hover:underline">
                          Learn More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="tools" className="py-20 md:py-32 border-t border-border/50 bg-card">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
             <div className="space-y-4 animate-fade-in-up">
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
            <div className="grid gap-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {tools.slice(0, 3).map((tool) => (
                <Link href={`/tools/${tool.slug}`} key={tool.id} className="group">
                  <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-secondary/50 transition-colors">
                    <div className="p-3 bg-secondary rounded-lg">
                      <tool.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-headline text-lg font-semibold">{tool.title}</h3>
                      <p className="text-sm text-muted-foreground">{tool.description}</p>
                    </div>
                    <ArrowRight className="ml-auto h-5 w-5 text-muted-foreground shrink-0 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="case-studies" className="py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-16 animate-fade-in-up">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
              Trusted by Industry Leaders
            </h2>
            <p className="max-w-3xl mx-auto text-muted-foreground md:text-xl">
              See how we've helped organizations like yours mitigate risks and fortify their digital defenses.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {caseStudies.slice(0, 3).map((study, index) => (
              <Link href={`/case-studies`} key={study.id} className="group animate-fade-in-up" style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
                <Card className="overflow-hidden h-full flex flex-col bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 rounded-xl">
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
            ))}
          </div>
           <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <Button asChild size="lg">
                    <Link href="/case-studies">
                        View All Case Studies
                    </Link>
                </Button>
            </div>
        </div>
      </section>
    </div>
  );
}

    