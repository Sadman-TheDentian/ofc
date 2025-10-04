
'use client';

import React, { useRef, useEffect, useCallback } from 'react';

const HeroAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoImage = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    // This code now runs only on the client, avoiding the SSR error.
    const image = new Image();
    image.src = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEirwhyibjl-3Guf8S6G442OtQmAdOzHrTcxPAuK6QxCGcAJ2I88K7Ee9DN-k_SONDddf2FeB4SwHO8l29PZ9HvHHlxJxiPDnfgrY1DBS60HsVaYv0uOAi08fm6KyrwhM7HPQhbQhL5ufVU_efX268tXM4rR8Vwok_UqbSar_b-B4btAigP5BFaU12PCjUE/s320/DENTI.SYSTEMS%20PNJ.png';
    logoImage.current = image;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let particles: Particle[] = [];
    const numParticles = 200;
    const logoSize = 100;
    const centerX = width / 2;
    const centerY = height / 2;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      initialLife: number;
      color: 'red' | 'green';
      phase: 'in' | 'out';

      constructor() {
        this.reset();
        this.color = 'red';
        this.phase = 'in';
      }

      reset() {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * (Math.max(width, height) / 2) + 100;
        this.x = centerX + Math.cos(angle) * radius;
        this.y = centerY + Math.sin(angle) * radius;

        const angleToCenter = Math.atan2(centerY - this.y, centerX - this.x);
        const speed = Math.random() * 2 + 1;
        this.vx = Math.cos(angleToCenter) * speed;
        this.vy = Math.sin(angleToCenter) * speed;
        
        this.life = this.initialLife = Math.random() * 200 + 100;
        this.phase = 'in';
        this.color = 'red';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;

        const dx = this.x - centerX;
        const dy = this.y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (this.phase === 'in' && dist < logoSize / 2) {
          this.phase = 'out';
          this.color = 'green';

          const outAngle = Math.random() * Math.PI * 2;
          const outSpeed = Math.random() * 2 + 1;
          this.vx = Math.cos(outAngle) * outSpeed;
          this.vy = Math.sin(outAngle) * outSpeed;
          this.life = this.initialLife;
        }

        if (this.life <= 0) {
          this.reset();
        }
      }

      draw() {
        if (!ctx) return;
        const opacity = this.life / this.initialLife;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = this.color === 'red' ? `rgba(255, 80, 80, ${opacity})` : `rgba(0, 255, 102, ${opacity})`;
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

      // Draw logo
      if (logoImage.current && logoImage.current.complete) {
        ctx.globalAlpha = 0.5;
        ctx.drawImage(logoImage.current, centerX - logoSize / 2, centerY - logoSize / 2, logoSize, logoSize);
        ctx.globalAlpha = 1;
      }
      
      // Draw grid lines
      ctx.strokeStyle = 'rgba(0, 255, 102, 0.1)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 30; i++) {
        const x = i * width / 30;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let i = 0; i < 20; i++) {
        const y = i * height / 20;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(render);
    }
    
    function onResize() {
        if(canvas){
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            particles = [];
            createParticles();
        }
    }

    window.addEventListener('resize', onResize);
    createParticles();
    render();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const cleanup = draw();
    return cleanup;
  }, [draw]);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 -z-10 bg-background" />;
};

export default HeroAnimation;
