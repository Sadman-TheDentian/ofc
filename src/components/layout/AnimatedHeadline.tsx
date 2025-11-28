
'use client';

import React from 'react';

interface AnimatedHeadlineProps {
  text: string;
}

const AnimatedHeadline: React.FC<AnimatedHeadlineProps> = ({ text }) => {
  return (
    <h1
      className="animated-headline-glitch font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-foreground"
    >
      {text}
    </h1>
  );
};

export default AnimatedHeadline;
