
'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedHeadlineProps {
  text: string;
}

const AnimatedHeadline: React.FC<AnimatedHeadlineProps> = ({ text }) => {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="font-headline text-5xl font-black tracking-tighter sm:text-6xl md:text-8xl text-white uppercase leading-none"
    >
      {text}
    </motion.h1>
  );
};

export default AnimatedHeadline;