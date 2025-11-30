"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const DUST_COUNT = 5000;

function DustParticles() {
  const { size } = useThree();
  const dustMesh = useRef<THREE.Points>(null!);

  const particles = useMemo(() => {
    const p = new Float32Array(DUST_COUNT * 3);
    for (let i = 0; i < DUST_COUNT; i++) {
      const i3 = i * 3;
      p[i3 + 0] = (Math.random() - 0.5) * 15;
      p[i3 + 1] = (Math.random() - 0.5) * 15;
      p[i3 + 2] = (Math.random() - 0.5) * 10;
    }
    return p;
  }, []);

  const dustMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.005,
        color: "#4d4d4d",
      }),
    []
  );

  useFrame((state) => {
    const { clock } = state;
    if (dustMesh.current) {
      dustMesh.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={dustMesh} material={dustMaterial}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
    </points>
  );
}

function Ground() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color="#1a1a1a" />
        </mesh>
    );
}


export default function SyntheticHero({ title, description, badgeText, cta1, cta2 }: { title: string, description: string, badgeText?: string, cta1: { text: string, href: string }, cta2?: { text: string, href: string }}) {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
     if(!heroRef.current) return;
    gsap.fromTo(heroRef.current.querySelectorAll("[data-animate]"), 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.2, delay: 0.5 }
    );
  }, { scope: heroRef });

  return (
    <section className="relative w-full py-20 md:py-32 lg:py-40 bg-background overflow-hidden h-[80vh] min-h-[600px] flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 1, 5], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <DustParticles />
          <Ground />
        </Canvas>
      </div>
      <div 
        ref={heroRef}
        className="container relative z-10 text-center"
      >
        {badgeText && (
          <div data-animate>
             <Badge className="mb-4 text-sm py-1 px-3">{badgeText}</Badge>
          </div>
        )}
        <h1 
          data-animate
          className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl max-w-4xl mx-auto"
        >
          {title}
        </h1>
        <p 
          data-animate
          className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground md:text-xl"
        >
          {description}
        </p>
        <div 
          data-animate
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button size="lg" asChild>
            <a href={cta1.href}>{cta1.text}</a>
          </Button>
          {cta2 && (
            <Button size="lg" variant="secondary" asChild>
              <a href={cta2.href}>{cta2.text}</a>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
