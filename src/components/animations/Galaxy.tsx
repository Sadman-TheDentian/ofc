
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

    const numParticles = 1500;
    const particles: Particle[] = [];
    
    let mouse = {
        x: width / 2,
        y: height / 2,
        radius: 120
    };
    
    const colors = [
        '#02f840', // brand green
        '#06b6d4', // cyan
        '#ffffff',
        '#94a3b8',
    ]

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseX: number;
      baseY: number;
      density: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = 0;
        this.vy = 0;
        this.size = Math.random() * 2 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let dist = Math.sqrt(dx*dx + dy*dy);
        let forceDirectionX = dx / dist;
        let forceDirectionY = dy / dist;
        let maxDistance = mouse.radius;
        let force = (maxDistance - dist) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (dist < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
        } else {
            if (this.x !== this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx/10;
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy/10;
            }
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.size, this.size);
      }
    }

    function createParticles() {
        particles.length = 0;
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }
    }
    
    let animationFrameId: number;

    function render() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
          p.update();
          p.draw();
      });

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

