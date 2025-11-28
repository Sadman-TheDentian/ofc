
'use client';

import React, { useState, useEffect, useRef } from 'react';

interface AnimatedHeadlineProps {
  text: string;
}

const chars = "!<>-_\\/[]{}—=+*^?#________";

const AnimatedHeadline: React.FC<AnimatedHeadlineProps> = ({ text }) => {
  const [displayText, setDisplayText] = useState(text);
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let frameRequest: number;
    let frame = 0;
    let queue: { from: string; to: string; start: number; end: number }[] = [];
    let resolve: (value: unknown) => void;

    const promise = new Promise((res) => (resolve = res));

    const update = () => {
      let output = '';
      let complete = 0;
      for (let i = 0, n = queue.length; i < n; i++) {
        let { from, to, start, end, char } = queue[i];
        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = chars[Math.floor(Math.random() * chars.length)];
            queue[i].char = char;
          }
          output += `<span class="text-primary/50">${char}</span>`;
        } else {
          output += from;
        }
      }
      if (ref.current) {
        ref.current.innerHTML = output;
      }
      if (complete === queue.length) {
        resolve(true);
      } else {
        frameRequest = requestAnimationFrame(update);
        frame++;
      }
    };

    const setText = (newText: string) => {
      const oldText = displayText;
      const length = Math.max(oldText.length, newText.length);
      queue = [];
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        queue.push({ from, to, start, end, char: '' });
      }
      cancelAnimationFrame(frameRequest);
      frame = 0;
      update();
      return promise;
    };

    setText(text);

    return () => cancelAnimationFrame(frameRequest);
  }, [text]);

  return (
    <h1
      ref={ref}
      className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-foreground"
    >
      {displayText}
    </h1>
  );
};

export default AnimatedHeadline;
