
'use client';

import { cn } from '@/lib/utils';
import React, { useRef, useEffect, useState } from 'react';

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  className,
  delay = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      {
        threshold: 0.1,
        triggerOnce: true,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={cn(
        'transition-opacity duration-1000',
        isVisible ? 'opacity-100' : 'opacity-0',
        className
      )}
    >
      <div
        className={cn(
          'transition-transform duration-1000',
          isVisible ? 'translate-y-0' : 'translate-y-10'
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default RevealOnScroll;
