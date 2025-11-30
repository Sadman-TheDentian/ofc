
'use client';

import React from 'react';

interface AnimatedHeadlineProps {
  text: string;
}

const AnimatedHeadline: React.FC<AnimatedHeadlineProps> = ({ text }) => {
  return (
    <h1
      className="animated-headline-glitch font-headline text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl text-white"
      data-text={text}
    >
      {text}
    </h1>
  );
};

export default AnimatedHeadline;

    