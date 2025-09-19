
'use client';

import { useRef, useEffect, useCallback } from 'react';

const GalaxyAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    let particles: Particle[] = [];
    const numParticles = 800;
    const numDustParticles = 2000;
    let centerX = width / 2;
    let centerY = height / 2;

    // Target rotation based on mouse, and current rotation for easing
    let targetRotationX = 0.2;
    let targetRotationY = 0.2;
    let currentRotationX = 0;
    let currentRotationY = 0;
    let baseRotationX = 0.0001;
    let baseRotationY = 0.0001;


    let mouse = {
        x: width / 2,
        y: height / 2,
        radius: 100,
        interactionRadius: 200,
    };

    const colors = [
        '#02f840', // Primary Green
        '#ffffff', // White
    ];

    class Particle {
      x: number;
      y: number;
      z: number;
      xProjected: number;
      yProjected: number;
      scaleProjected: number;
      color: string;
      size: number;
      isDust: boolean;

      constructor(isDust = false) {
        this.isDust = isDust;
        const angle = Math.random() * Math.PI * 2;
        const baseRadius = isDust ? Math.random() * width * 0.7 : Math.random() * Math.random() * width * 0.5;
        const spread = isDust ? 1.5 : 1;
        const radius = baseRadius * spread;
        
        this.x = Math.cos(angle) * radius;
        this.y = Math.sin(angle) * radius;
        this.z = (Math.random() - 0.5) * 3000;
        
        this.size = isDust ? Math.random() * 0.8 : Math.random() * 2 + 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        this.xProjected = 0;
        this.yProjected = 0;
        this.scaleProjected = 0;
      }

      project() {
        const rotationX = currentRotationX;
        const rotationY = currentRotationY;

        const rotatedX = this.x * Math.cos(rotationY) - this.z * Math.sin(rotationY);
        let rotatedZ = this.x * Math.sin(rotationY) + this.z * Math.cos(rotationY);

        const rotatedY = this.y * Math.cos(rotationX) - rotatedZ * Math.sin(rotationX);
        rotatedZ = this.y * Math.sin(rotationX) + rotatedZ * Math.cos(rotationX);

        const perspective = 300 / (300 + rotatedZ);
        this.xProjected = (rotatedX * perspective) + centerX;
        this.yProjected = (rotatedY * perspective) + centerY;
        this.scaleProjected = perspective * this.size;
      }

      draw() {
        if (!ctx || this.xProjected < 0 || this.xProjected > width || this.yProjected < 0 || this.yProjected > height) return;
        
        const alpha = this.isDust ? this.scaleProjected * 1.5 : this.scaleProjected * 2;
        ctx.globalAlpha = Math.min(1, alpha);
        ctx.fillStyle = this.color;
        ctx.fillRect(this.xProjected - this.scaleProjected/2, this.yProjected - this.scaleProjected/2, this.scaleProjected, this.scaleProjected);
      }
    }

    function createParticles() {
      particles = [];
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(false));
      }
      for (let i = 0; i < numDustParticles; i++) {
        particles.push(new Particle(true));
      }
      particles.sort((a,b) => a.z - b.z);
    }

    let animationFrameId: number;

    function render() {
      if(!ctx) return;
      ctx.clearRect(0, 0, width, height);

      currentRotationX += baseRotationX;
      currentRotationY += baseRotationY;
      
      // Ease current rotation towards target rotation
      const easing = 0.05;
      currentRotationX += (targetRotationX - currentRotationX) * easing;
      currentRotationY += (targetRotationY - currentRotationY) * easing;

      particles.forEach(p => {
        p.project();
        p.draw();
      });
      
      // Draw lines from cursor to nearby particles
      ctx.strokeStyle = "rgba(2, 248, 64, 0.2)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      particles.forEach(p => {
          if(!p.isDust) {
              const dx = mouse.x - p.xProjected;
              const dy = mouse.y - p.yProjected;
              const dist = Math.sqrt(dx * dx + dy * dy);

              if (dist < mouse.interactionRadius) {
                  const opacity = 1 - (dist / mouse.interactionRadius);
                  ctx.strokeStyle = `rgba(2, 248, 64, ${opacity * 0.2})`;
                  ctx.moveTo(mouse.x, mouse.y);
                  ctx.lineTo(p.xProjected, p.yProjected);
              }
          }
      });
      ctx.stroke();

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    }
    
    function onMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Update target rotation based on mouse position from center
      targetRotationY = (mouse.x - centerX) * 0.0005; // Tilt left/right
      targetRotationX = (mouse.y - centerY) * -0.0005; // Tilt up/down
    }

    function onResize() {
        if(canvas){
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            centerX = window.innerWidth / 2;
            centerY = window.innerHeight / 2;
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

  useEffect(() => {
    const cleanup = draw();
    return cleanup;
  }, [draw]);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 -z-10 bg-transparent" />;
};

export default GalaxyAnimation;
