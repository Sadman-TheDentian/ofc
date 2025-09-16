
'use client';

import React, { useRef, useEffect } from 'react';

const GalaxyAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const numParticles = 5000;
    const particles: Particle[] = [];
    const radius = 0.0;
    let angle = 0;

    class Particle {
      x: number;
      y: number;
      size: number;
      speed: number;
      angle: number;
      distance: number;
      baseAlpha: number;
      color: string;

      constructor() {
        const arm = Math.floor(Math.random() * 3);
        const armAngle = (arm * 2 * Math.PI) / 3;
        const armSpread = 0.8;
        this.distance = Math.random() * Math.min(width, height) * 0.45;
        const randomOffset = (Math.random() - 0.5) * armSpread * (this.distance / (Math.min(width, height) * 0.45));
        
        this.angle = armAngle + this.distance * 0.015 + randomOffset;
        
        this.x = width / 2 + Math.cos(this.angle) * this.distance;
        this.y = height / 2 + Math.sin(this.angle) * this.distance;
        this.size = Math.random() * 1.5 + 0.5;
        this.speed = (Math.random() * 0.005 + 0.001) / (this.distance * 0.005 + 1);
        this.baseAlpha = Math.random() * 0.5 + 0.2;
        
        const isCoreStar = Math.random() < 0.1 && this.distance < Math.min(width, height) * 0.1;
        if(isCoreStar) {
            this.color = `rgba(255, 255, 220, ${this.baseAlpha * 1.5})`;
            this.size *= 1.5;
        } else {
            this.color = `rgba(2, 248, 64, ${this.baseAlpha})`;
        }
      }

      update() {
        this.angle += this.speed;
        this.x = width / 2 + Math.cos(this.angle) * this.distance;
        this.y = height / 2 + Math.sin(this.angle) * this.distance;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        const dx = this.x - width / 2;
        const dy = this.y - height / 2;
        const distFromCenter = Math.sqrt(dx * dx + dy * dy);
        const maxDist = Math.min(width, height) * 0.45;
        const fade = 1 - (distFromCenter / maxDist);
        
        ctx.fillStyle = this.color.replace(/, [0-9\.]+\)/, `, ${this.baseAlpha * fade * fade})`);
        ctx.fill();
      }
    }

    function init() {
      particles.length = 0;
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Draw a subtle radial gradient for the galaxy core glow
      const coreGradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.min(width, height) * 0.2);
      coreGradient.addColorStop(0, 'rgba(2, 248, 64, 0.05)');
      coreGradient.addColorStop(0.5, 'rgba(2, 248, 64, 0.02)');
      coreGradient.addColorStop(1, 'rgba(2, 248, 64, 0)');
      ctx.fillStyle = coreGradient;
      ctx.fillRect(0, 0, width, height);
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animate);
    }
    
    function onResize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        init();
    }

    window.addEventListener('resize', onResize);
    
    init();
    animate();

    return () => {
        window.removeEventListener('resize', onResize);
    }

  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 -z-10 w-full h-full" />;
};

export default GalaxyAnimation;

