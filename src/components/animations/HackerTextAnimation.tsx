
'use client';

import React, { useState, useEffect, useRef } from 'react';

const HackerTextAnimation = () => {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const originalText = "Elite Cybersecurity &";
  const secondLineText = "Custom Web Engineering";
  const fullText = `${originalText}\n${secondLineText}`;

  useEffect(() => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const h1 = h1Ref.current;
    if (!h1) return;

    let interval: NodeJS.Timeout | null = null;
    let iteration = 0;
    
    // Set initial text
    h1.innerText = fullText;

    const startAnimation = () => {
      if(!h1) return;
      
      h1.innerText = fullText
        .split("")
        .map((letter, index) => {
          if(index < iteration) {
            return fullText[index];
          }
          if (letter === '\n' || letter === ' ') return letter;
          
          return letters[Math.floor(Math.random() * 26)]
        })
        .join("");
      
      if(iteration >= fullText.length){
        if (interval) clearInterval(interval);
      }
      
      iteration += 1 / 2;
    };
    
    const timeout = setTimeout(() => {
        interval = setInterval(startAnimation, 30);
    }, 800); // Delay before starting the animation

    return () => {
      if (interval) clearInterval(interval);
      if (timeout) clearTimeout(timeout);
    };
  }, [fullText]);

  return (
    <h1 ref={h1Ref} className="font-headline text-4xl font-bold tracking-tighter sm:text-6xl md:text-7xl text-foreground whitespace-pre-line">
        {fullText}
    </h1>
  );
};

export default HackerTextAnimation;
