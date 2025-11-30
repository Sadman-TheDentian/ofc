
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
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1], 
    [0, 1, 0]
    );

  return (
    <motion.section
      id={id}
      ref={ref}
      style={{ opacity }}
      className={cn(className)}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;
