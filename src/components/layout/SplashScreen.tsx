
'use client';

import { useState, useEffect } from 'react';
import { LogoIcon } from '../icons/Logo';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide the splash screen after the animation duration (3s fade out delay + 0.5s animation)
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="splash-screen fixed inset-0 z-[100] flex items-center justify-center bg-background"
    >
      <LogoIcon className="w-24 h-24 text-primary" />
    </div>
  );
}
