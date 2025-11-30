
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className, id }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'], // Animate from when the section starts entering the viewport until it fully leaves
  });

  // Fade out as it scrolls out of view (from middle to top of screen)
  const opacity = useTransform(
    scrollYProgress,
    [0.25, 0.5], // Start fading at 25% of scroll progress, fully faded at 50%
    [1, 0]
  );
  
  // You can add more effects, like a slight scale down
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5],
    [1, 0.95]
  );

  return (
    <motion.section
      id={id}
      ref={ref}
      style={{ opacity, scale }}
      className={cn(className)}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;
