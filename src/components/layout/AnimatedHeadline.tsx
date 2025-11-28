
'use client';

import React, { useRef, useEffect } from 'react';

interface AnimatedHeadlineProps {
  text: string;
}

const AnimatedHeadline: React.FC<AnimatedHeadlineProps> = ({ text }) => {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const headline = ref.current;
    if (!headline) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = headline.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      
      headline.style.setProperty('--mouse-x', `${(x / width) * 100}%`);
      headline.style.setProperty('--mouse-y', `${(y / height) * 100}%`);
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <h1
      ref={ref}
      className="animated-headline-glare font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-foreground"
    >
      {text}
    </h1>
  );
};

export default AnimatedHeadline;
