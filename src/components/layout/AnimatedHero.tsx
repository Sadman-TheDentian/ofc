
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedHeroProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const AnimatedHero: React.FC<AnimatedHeroProps> = ({ children, className, id }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // This hook tracks the scroll progress of the target element (ref)
  // relative to the viewport.
  const { scrollYProgress } = useScroll({
    target: ref,
    // "start start" means the animation starts when the top of the element hits the top of the viewport.
    // "end start" means the animation ends when the bottom of the element hits the top of the viewport.
    offset: ["start start", "end start"],
  });

  // We transform the scroll progress (a value from 0 to 1) into an opacity value.
  // As scrollYProgress goes from 0 to 0.8 (80% of the element's scroll height), opacity will go from 1 (fully visible) to 0 (fully faded out).
  // This makes the fade-out much slower.
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <motion.div
      id={id}
      ref={ref}
      style={{ opacity }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedHero;
