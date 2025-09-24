
'use client';

import React, { useState, useEffect, useRef } from 'react';

const HackerTextAnimation = () => {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const originalText = "Elite Cybersecurity &";
  const secondLineText = "Custom Web Engineering";

  useEffect(() => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const h1 = h1Ref.current;
    if (!h1) return;

    let interval: NodeJS.Timeout | null = null;
    let iteration = 0;

    const startAnimation = () => {
        if(!h1) return;
        h1.innerHTML = h1.innerText.split("")
          .map((letter, index) => {
            if(index < iteration) {
                if(index < originalText.length) {
                    return originalText[index];
                }
                return secondLineText[index - originalText.length - 1]; // Adjust for <br>
            }
            if (letter === ' ' || letter === '&') return letter;
            return letters[Math.floor(Math.random() * 26)];
          })
          .join("");

        if(iteration >= originalText.length + secondLineText.length + 1) {
            if(interval) clearInterval(interval);
        }

        iteration += 1/2;
    };
    
    setTimeout(() => {
        interval = setInterval(startAnimation, 30);
    }, 500);

    return () => {
        if(interval) clearInterval(interval);
    };
  }, []);

  return (
    <h1 ref={h1Ref} className="font-headline text-4xl font-bold tracking-tighter sm:text-6xl md:text-7xl text-foreground">
        {originalText}
        <br />
        {secondLineText}
    </h1>
  );
};

export default HackerTextAnimation;
