'use client';

import React, { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

const Scene = dynamic(() => import('@/components/animations/Scene'), {
  ssr: false,
  loading: () => <div className="flex h-full w-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>,
});

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  const handleAnimationComplete = () => {
    setFading(true);
    setTimeout(() => {
      setVisible(false);
    }, 500); // Match fade-out duration
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#0a0a0a',
        zIndex: 9999,
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.5s ease-out',
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      <Suspense fallback={<div className="flex h-full w-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}>
        <Scene onAnimationComplete={handleAnimationComplete} />
      </Suspense>
    </div>
  );
}
