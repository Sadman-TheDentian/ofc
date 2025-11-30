
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

  // Start fading out when the section is halfway through the viewport, and be fully faded by the time it leaves.
  const opacity = useTransform(
    scrollYProgress,
    [0.4, 0.6], // Start fading at 40% of scroll progress, fully faded at 60%
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
