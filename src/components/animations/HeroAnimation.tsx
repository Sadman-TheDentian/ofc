
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
    const numParticles = 150;
    const logoSize = 100;
    const centerX = width / 2;
    const centerY = height / 2;
    let gridOffset = 0;

    const shockwaves: Shockwave[] = [];

    class Shockwave {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      life: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.maxRadius = 150;
        this.life = 1;
      }

      update() {
        this.radius += (this.maxRadius - this.radius) * 0.1;
        this.life -= 0.03;
      }

      draw() {
        if (!ctx || this.life <= 0) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 255, 102, ${this.life * 0.5})`;
        ctx.lineWidth = 3;
        ctx.stroke();
      }
    }
    
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      initialLife: number;
      color: 'red' | 'green';
      phase: 'in' | 'out';
      history: { x: number; y: number }[];
      trailLength: number;

      constructor() {
        this.trailLength = 5;
        this.history = [];
        this.reset();
        this.color = 'red';
        this.phase = 'in';
      }

      reset() {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * (Math.max(width, height) / 1.5) + 150;
        this.x = centerX + Math.cos(angle) * radius;
        this.y = centerY + Math.sin(angle) * radius;
        this.history = [];

        const angleToCenter = Math.atan2(centerY - this.y, centerX - this.x);
        const speed = Math.random() * 2 + 1.5;
        this.vx = Math.cos(angleToCenter) * speed;
        this.vy = Math.sin(angleToCenter) * speed;
        
        this.life = this.initialLife = Math.random() * 150 + 100;
        this.phase = 'in';
        this.color = 'red';
      }

      update() {
        this.history.push({ x: this.x, y: this.y });
        if (this.history.length > this.trailLength) {
          this.history.shift();
        }

        this.x += this.vx;
        this.y += this.vy;
        this.life--;

        const dx = this.x - centerX;
        const dy = this.y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (this.phase === 'in' && dist < logoSize / 2) {
          this.phase = 'out';
          this.color = 'green';
          
          if (shockwaves.length < 5) {
            shockwaves.push(new Shockwave(centerX, centerY));
          }

          const outAngle = Math.atan2(dy, dx) + (Math.random() - 0.5);
          const outSpeed = Math.random() * 2 + 1;
          this.vx = Math.cos(outAngle) * outSpeed;
          this.vy = Math.sin(outAngle) * outSpeed;
          this.life = this.initialLife;
        }

        if (this.life <= 0 || this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
          this.reset();
        }
      }

      draw() {
        if (!ctx) return;
        
        // Draw trail
        if (this.history.length > 1) {
          ctx.beginPath();
          ctx.moveTo(this.history[0].x, this.history[0].y);
          for (let i = 1; i < this.history.length; i++) {
            const opacity = (i / this.history.length) * (this.life / this.initialLife);
            const color = this.color === 'red' ? `rgba(255, 80, 80, ${opacity * 0.7})` : `rgba(0, 255, 102, ${opacity})`;
            ctx.strokeStyle = color;
            ctx.lineWidth = 1.5;
            ctx.lineTo(this.history[i].x, this.history[i].y);
            ctx.stroke();
          }
        }
        
        // Draw head particle
        const opacity = this.life / this.initialLife;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color === 'red' ? `rgba(255, 80, 80, ${opacity})` : `rgba(0, 255, 102, ${opacity})`;
        ctx.fill();
      }
    }

    function createParticles() {
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    }

    function drawGrid() {
        if (!ctx) return;
        const gridSize = 50;
        const pulse = Math.sin(Date.now() * 0.0005);
        const baseOpacity = 0.05;
        const pulseOpacity = baseOpacity + (pulse * baseOpacity);
        
        ctx.strokeStyle = `rgba(0, 255, 102, ${pulseOpacity})`;
        ctx.lineWidth = 0.5;

        for (let i = gridOffset % gridSize; i < width; i += gridSize) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, height);
            ctx.stroke();
        }
        for (let i = gridOffset % gridSize; i < height; i += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(width, i);
            ctx.stroke();
        }
        gridOffset += 0.1;
    }

    function render() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      drawGrid();
      
      if (logoImage.current && logoImage.current.complete) {
        ctx.globalAlpha = 0.6 + Math.sin(Date.now() * 0.001) * 0.1;
        ctx.drawImage(logoImage.current, centerX - logoSize / 2, centerY - logoSize / 2, logoSize, logoSize);
        ctx.globalAlpha = 1;
      }

      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      shockwaves.forEach((sw, index) => {
        sw.update();
        sw.draw();
        if (sw.life <= 0) {
          shockwaves.splice(index, 1);
        }
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
