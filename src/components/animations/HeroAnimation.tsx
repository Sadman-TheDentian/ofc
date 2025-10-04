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
    const shieldRadius = logoSize * 0.7;
    let shieldRotation = 0;
    let scanLine = { angle: 0, life: 0 };


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
      glitchFactor: number;

      constructor() {
        this.trailLength = Math.random() * 10 + 5;
        this.history = [];
        this.reset();
        this.color = 'red';
        this.phase = 'in';
        this.glitchFactor = Math.random() * 0.1 + 0.05;
      }

      reset(isOut = false) {
        const angle = Math.random() * Math.PI * 2;
        
        if (isOut) {
          // Emerge from the shield
          this.x = centerX + Math.cos(angle) * (shieldRadius + 1);
          this.y = centerY + Math.sin(angle) * (shieldRadius + 1);
          const outSpeed = Math.random() * 1 + 0.5;
          this.vx = Math.cos(angle) * outSpeed;
          this.vy = Math.sin(angle) * outSpeed;
          this.color = 'green';
          this.phase = 'out';
          this.life = this.initialLife = Math.random() * 250 + 200;

        } else {
            // Come from outside
            const radius = Math.max(width, height) / 2 + Math.random() * 100;
            this.x = centerX + Math.cos(angle) * radius;
            this.y = centerY + Math.sin(angle) * radius;
            const angleToCenter = Math.atan2(centerY - this.y, centerX - this.x);
            const speed = Math.random() * 1.5 + 0.5;
            this.vx = Math.cos(angleToCenter) * speed;
            this.vy = Math.sin(angleToCenter) * speed;
            this.color = 'red';
            this.phase = 'in';
            this.life = this.initialLife = Math.random() * 300 + 200;
        }
        
        this.history = [];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;

        // Add glitch effect for incoming red particles
        if (this.phase === 'in' && Math.random() < this.glitchFactor) {
            this.x += (Math.random() - 0.5) * 5;
            this.y += (Math.random() - 0.5) * 5;
        }
        
        this.history.push({ x: this.x, y: this.y });
        if (this.history.length > this.trailLength) {
          this.history.shift();
        }

        const dx = this.x - centerX;
        const dy = this.y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (this.phase === 'in' && dist < shieldRadius) {
            // Hit the shield, trigger scan and reset as an outgoing particle
            scanLine = { angle: Math.atan2(dy, dx), life: 30 };
            this.reset(true);
        }
        
        if (this.life <= 0 || this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
          this.reset();
        }
      }

      draw() {
        if (!ctx) return;
        
        ctx.beginPath();
        if(this.history.length > 1) {
            ctx.moveTo(this.history[0].x, this.history[0].y);
            for (let i = 1; i < this.history.length; i++) {
                const opacity = (i / this.history.length) * 0.8;
                const color = this.color === 'red' ? `rgba(255, 80, 80, ${opacity * 0.7})` : `rgba(0, 255, 136, ${opacity})`;
                ctx.strokeStyle = color;
                ctx.lineWidth = 1;
                ctx.lineTo(this.history[i].x, this.history[i].y);
            }
            ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = this.color === 'red' ? `rgb(255, 80, 80)` : `rgb(0, 255, 136)`;
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 5;
        ctx.fill();
        ctx.shadowBlur = 0;
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
      
      shieldRotation += 0.002;
      
      const drawHexagon = (radius: number, rotation: number, alpha: number, lineWidth: number) => {
        ctx.save();
        ctx.strokeStyle = `rgba(0, 255, 136, ${alpha})`;
        ctx.lineWidth = lineWidth;
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(0, 255, 136, 0.5)';
        
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i + rotation;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
      }

      drawHexagon(shieldRadius, shieldRotation, 0.5, 1.5);
      drawHexagon(shieldRadius * 0.8, -shieldRotation * 0.7, 0.3, 1);
      drawHexagon(shieldRadius * 1.2, shieldRotation * 0.5, 0.2, 0.5);

      // Draw scan line
      if (scanLine.life > 0) {
        const scanProgress = scanLine.life / 30;
        ctx.save();
        ctx.strokeStyle = `rgba(0, 255, 136, ${scanProgress * 0.8})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        const startAngle = scanLine.angle - Math.PI / 4;
        const endAngle = scanLine.angle + Math.PI / 4;
        ctx.arc(centerX, centerY, shieldRadius, startAngle, endAngle);
        ctx.stroke();
        ctx.restore();
        scanLine.life--;
      }
    }

    function render() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      drawShield();
      
      if (logoImage.current && logoImage.current.complete) {
        const pulse = (Math.sin(Date.now() * 0.002) + 1) / 2;
        ctx.globalAlpha = 0.8 + pulse * 0.2;
        ctx.shadowColor = 'rgba(0, 255, 136, 0.7)';
        ctx.shadowBlur = 15 + pulse * 10;
        ctx.drawImage(logoImage.current, centerX - logoSize / 2, centerY - logoSize / 2, logoSize, logoSize);
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
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
