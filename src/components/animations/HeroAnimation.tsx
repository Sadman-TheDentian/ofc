'use client';

import React, { useRef, useEffect, useCallback } from 'react';

const HeroAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoImage = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
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
    let animationFrameId: number;

    const particles: Particle[] = [];
    const numParticles = 100;
    const logoSize = 100;
    const centerX = width / 2;
    const centerY = height / 2;
    const shieldRadius = logoSize * 0.7;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      initialLife: number;
      color: 'red' | 'green';
      phase: 'in' | 'out' | 'scanning';
      history: { x: number; y: number }[];
      trailLength: number;
      scanAngle: number;
      scanStartTime: number;

      constructor() {
        this.trailLength = 8;
        this.history = [];
        this.reset();
        this.color = 'red';
        this.phase = 'in';
        this.scanAngle = 0;
        this.scanStartTime = 0;
      }

      reset() {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * (Math.max(width, height) / 2) + shieldRadius * 2;
        this.x = centerX + Math.cos(angle) * radius;
        this.y = centerY + Math.sin(angle) * radius;
        this.history = [];

        const angleToCenter = Math.atan2(centerY - this.y, centerX - this.x);
        const speed = Math.random() * 1.5 + 0.5;
        this.vx = Math.cos(angleToCenter) * speed;
        this.vy = Math.sin(angleToCenter) * speed;
        
        this.life = this.initialLife = Math.random() * 200 + 150;
        this.phase = 'in';
        this.color = 'red';
        this.scanStartTime = 0;
      }

      update() {
        if (this.phase === 'scanning') {
          this.scanAngle += 0.1;
          this.x = centerX + Math.cos(this.scanAngle) * shieldRadius;
          this.y = centerY + Math.sin(this.scanAngle) * shieldRadius;
          if (Date.now() - this.scanStartTime > 1000) {
            this.phase = 'out';
            this.color = 'green';
            this.life = this.initialLife;
            const outAngle = this.scanAngle + (Math.random() - 0.5) * 0.5;
            const outSpeed = Math.random() * 1.5 + 0.5;
            this.vx = Math.cos(outAngle) * outSpeed;
            this.vy = Math.sin(outAngle) * outSpeed;
          }
        } else {
          this.x += this.vx;
          this.y += this.vy;
          this.life--;
        }
        
        this.history.push({ x: this.x, y: this.y });
        if (this.history.length > this.trailLength) {
          this.history.shift();
        }

        const dx = this.x - centerX;
        const dy = this.y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (this.phase === 'in' && dist < shieldRadius) {
          this.phase = 'scanning';
          this.scanAngle = Math.atan2(dy, dx);
          this.scanStartTime = Date.now();
        }
        
        if (this.life <= 0 || this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
          this.reset();
        }
      }

      draw() {
        if (!ctx) return;
        
        ctx.beginPath();
        ctx.moveTo(this.history[0]?.x, this.history[0]?.y);
        for (let i = 1; i < this.history.length; i++) {
          const opacity = (i / this.history.length);
          const color = this.color === 'red' ? `rgba(255, 80, 80, ${opacity * 0.5})` : `rgba(0, 255, 136, ${opacity})`;
          ctx.strokeStyle = color;
          ctx.lineWidth = 1;
          ctx.lineTo(this.history[i].x, this.history[i].y);
        }
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = this.color === 'red' ? `rgb(255, 80, 80)` : `rgb(0, 255, 136)`;
        ctx.fill();
      }
    }

    function createParticles() {
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    }
    
    function drawShield() {
      if(!ctx) return;
      const time = Date.now() * 0.001;
      const pulse = (Math.sin(time) + 1) / 2; // 0 to 1
      
      ctx.save();
      ctx.strokeStyle = `rgba(0, 255, 136, ${0.3 + pulse * 0.3})`;
      ctx.lineWidth = 1 + pulse;
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'rgba(0, 255, 136, 0.5)';
      
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i + time * 0.1;
        const x = centerX + Math.cos(angle) * shieldRadius;
        const y = centerY + Math.sin(angle) * shieldRadius;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    }

    function render() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      drawShield();
      
      if (logoImage.current && logoImage.current.complete) {
        const pulse = (Math.sin(Date.now() * 0.001) + 1) / 2;
        ctx.globalAlpha = 0.8 + pulse * 0.2;
        ctx.drawImage(logoImage.current, centerX - logoSize / 2, centerY - logoSize / 2, logoSize, logoSize);
        ctx.globalAlpha = 1;
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
            particles.length = 0;
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
