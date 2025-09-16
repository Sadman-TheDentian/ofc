
'use client';

import { useRef, useEffect } from 'react';

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
    const DOTS_AMOUNT = 4000;
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
    const PACKET_AMOUNT = 200;

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
      isThreat: boolean;

      constructor() {
          this.from = dots[Math.floor(Math.random() * dots.length)];
          this.to = dots[Math.floor(Math.random() * dots.length)];
          this.progress = 0;
          this.speed = Math.random() * 0.005 + 0.002;
          this.isThreat = Math.random() < 0.05;
      }
      
      reset() {
        this.from = dots[Math.floor(Math.random() * dots.length)];
        this.to = dots[Math.floor(Math.random() * dots.length)];
        this.progress = 0;
        this.speed = Math.random() * 0.005 + 0.002;
        this.isThreat = Math.random() < 0.05;
      }

      move() {
          this.progress += this.speed;
          if (this.progress >= 1) {
              this.reset();
          }
      }

      draw() {
          if (!ctx || !this.from || !this.to) {
              if(dots.length > 0) this.reset();
              return;
          }
          const currentX = this.from.projected.x + (this.to.projected.x - this.from.projected.x) * this.progress;
          const currentY = this.from.projected.y + (this.to.projected.y - this.from.projected.y) * this.progress;
          const currentScale = this.from.projected.scale + (this.to.projected.scale - this.from.projected.scale) * this.progress;
          
          if (currentX < 0 || currentX > width || currentY < 0 || currentY > height || currentScale < 0) {
              this.reset();
              return;
          }
          
          const dx = mouse.x - currentX;
          const dy = mouse.y - currentY;
          const distance = Math.sqrt(dx*dx+dy*dy);
          
          if(this.isThreat && distance < 20) {
              this.isThreat = false;
          }

          ctx.beginPath();
          ctx.arc(currentX, currentY, DOT_RADIUS * 1.5 * currentScale, 0, Math.PI * 2);
          ctx.fillStyle = this.isThreat ? `rgba(255, 0, 0, 0.8)` : `rgba(${primaryColor}, 0.8)`;
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
    let currentRotationY = 0.001;
    let currentRotationX = 0;
    const LERP_FACTOR = 0.08;

    let animationFrameId: number;

    function render() {
        if (!ctx) return;
        ctx.clearRect(0, 0, width, height);
        
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
        if(animationFrameId) cancelAnimationFrame(animationFrameId);
    }
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full opacity-50" />;
};

export default SphereAnimation;
