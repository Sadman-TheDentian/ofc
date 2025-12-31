
'use client';

import React, { useEffect, useRef } from 'react';

export default function InteractiveSubstrate() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        let mouseX = width / 2;
        let mouseY = height / 2;

        const setSize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        window.addEventListener('resize', setSize);
        window.addEventListener('mousemove', handleMouseMove);
        setSize();

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            const gridSize = 80;
            const dotSize = 1;

            ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';

            for (let x = 0; x < width; x += gridSize) {
                for (let y = 0; y < height; y += gridSize) {
                    const dx = x - mouseX;
                    const dy = y - mouseY;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    const maxDist = 300;
                    const opacity = Math.max(0.02, 0.15 * (1 - dist / maxDist));

                    ctx.fillStyle = `rgba(0, 255, 65, ${opacity})`;

                    const offset = Math.max(0, 4 * (1 - dist / maxDist));
                    ctx.beginPath();
                    ctx.arc(x, y, dotSize, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', setSize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0 opacity-40 mix-blend-screen"
        />
    );
}
