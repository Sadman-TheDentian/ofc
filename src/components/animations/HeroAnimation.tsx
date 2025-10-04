'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ScrambleTextAnimationProps {
  text: string;
  className?: string;
}

const ScrambleTextAnimation: React.FC<ScrambleTextAnimationProps> = ({ text, className }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = '!<>-_\\/[]{}—=+*^?#________';
  const animationFrame = useRef<number>();
  const animationTimeout = useRef<NodeJS.Timeout>();

  const scramble = () => {
    let counter = 0;
    const next = () => {
      if (counter > 20 + text.length) {
        setDisplayText(text); // Ensure final text is correct
        // Schedule next scramble
        animationTimeout.current = setTimeout(scramble, 5000); // Wait 5 seconds before next scramble
        return;
      }

      const newText = text.split('').map((char, i) => {
          if (char === ' ' || Math.random() < 0.2 && counter < 10) {
            return char;
          }
          const randomChar = chars[Math.floor(Math.random() * chars.length)];
          if (counter / 2 > i) {
            return text[i];
          }
          return randomChar;
        }).join('');

      setDisplayText(newText);
      counter += 0.5;
      animationFrame.current = requestAnimationFrame(next);
    };

    next();
  };

  useEffect(() => {
    animationTimeout.current = setTimeout(scramble, 1000); // Initial delay

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      if (animationTimeout.current) {
        clearTimeout(animationTimeout.current);
      }
    };
  }, [text]);

  return (
    <h1
      className={cn(
        'font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-foreground whitespace-pre-line',
        className
      )}
    >
      {displayText}
    </h1>
  );
};

export default ScrambleTextAnimation;
