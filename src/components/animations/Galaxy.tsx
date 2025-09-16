
'use client';

import { useRef, useEffect } from 'react';

const GalaxyAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const numParticles = 10000;
    const particles: Particle[] = [];
    const galaxyRadius = Math.min(width, height) * 0.8;
    const galaxyArms = 5;
    const armTwist = 0.5;
    const armSpread = 0.4;
    const coreRadius = 80;

    let rotation = 0;
    
    let mouse = {
        x: width / 2,
        y: height / 2,
        radius: 150
    };

    class Particle {
      x: number;
      y: number;
      z: number;
      size: number;
      baseColor: string;
      color: string;
      projected: { x: number; y: number; scale: number; };

      constructor() {
        const angle = Math.random() * Math.PI * 2 * galaxyArms;
        const radius = Math.sqrt(Math.random()) * galaxyRadius;
        const armIndex = Math.floor(angle / (Math.PI * 2));
        const armAngle = (angle % (Math.PI * 2)) / armTwist;
        
        const r = Math.pow(Math.random(), 2) * galaxyRadius;

        this.x = Math.cos(armAngle) * r + (Math.random() - 0.5) * armSpread * r;
        this.y = Math.sin(armAngle) * r + (Math.random() - 0.5) * armSpread * r;
        this.z = (Math.random() - 0.5) * 50 * (1 - r/galaxyRadius);
        
        this.size = (Math.random() * 1.5 + 0.5) * (1 - r/galaxyRadius + 0.2);
        
        const greenValue = Math.floor(150 + Math.random() * 105);
        this.baseColor = `rgba(2, ${greenValue}, 64, ${Math.random() * 0.5 + 0.5})`;
        this.color = this.baseColor;
        this.projected = { x: 0, y: 0, scale: 0 };
      }

      project() {
        const rotatedX = this.x * Math.cos(rotation) - this.y * Math.sin(rotation);
        const rotatedY = this.x * Math.sin(rotation) + this.y * Math.cos(rotation);
        
        let dx = rotatedX - (mouse.x - width / 2);
        let dy = rotatedY - (mouse.y - height / 2);
        let dist = Math.sqrt(dx * dx + dy * dy);
        
        let finalX = rotatedX;
        let finalY = rotatedY;
        
        if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            finalX += Math.cos(angle) * force * -80 * (this.z / 50 + 1);
            finalY += Math.sin(angle) * force * -80 * (this.z / 50 + 1);
        }

        const perspective = 1000 / (1000 + this.z);
        this.projected = {
            x: finalX * perspective + width / 2,
            y: finalY * perspective + height / 2,
            scale: perspective,
        };
      }

      draw() {
        if (!ctx) return;
        this.project();

        if (this.projected.x < 0 || this.projected.x > width || this.projected.y < 0 || this.projected.y > height) return;
        
        ctx.beginPath();
        ctx.arc(this.projected.x, this.projected.y, this.size * this.projected.scale, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    function createParticles() {
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    }
    
    let animationFrameId: number;

    function render() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      rotation += 0.0003;
      
      particles.sort((a,b) => a.z - b.z);

      particles.forEach(p => p.draw());

      animationFrameId = requestAnimationFrame(render);
    }

    function onMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
    
    function onResize() {
        if(canvas){
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            particles.length = 0;
            createParticles();
        }
    }
    
    window.addEventListener('resize', onResize);
    document.addEventListener('mousemove', onMouseMove);
    createParticles();
    render();

    return () => {
      window.removeEventListener('resize', onResize);
      document.removeEventListener('mousemove', onMouseMove);
      if(animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 -z-10 bg-transparent" />;
};

export default GalaxyAnimation;
