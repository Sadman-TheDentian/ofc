
'use client';

import React, { useState, useEffect } from 'react';

const D_PATH = "M28.3,9.8c-0.1,0-0.1,0-0.2,0c-1.9-0.1-3.6,0.3-5.2,1.2c-1.5,0.9-2.7,2.2-3.6,3.8c-0.9,1.6-1.4,3.5-1.4,5.4c0,2,0.5,3.9,1.4,5.5c0.9,1.6,2.1,2.9,3.6,3.8c1.6,0.9,3.3,1.4,5.3,1.3c0.1,0,0.1,0,0.2,0c2.1,0,4-0.5,5.7-1.5c1.7-1,3.1-2.4,4.1-4.2c1-1.8,1.5-3.8,1.5-6c0-2.2-0.5-4.2-1.5-6C41.1,12.3,39.7,10.9,38,10c-1.7-0.8-3.5-1.3-5.4-1.3C31.2,8.8,29.7,9.2,28.3,9.8z M32.6,25.9c-0.9,0.5-2,0.8-3.1,0.8c-1.1,0-2.1-0.3-3-0.8c-0.9-0.5-1.7-1.3-2.2-2.3c-0.5-1-0.8-2.1-0.8-3.3c0-1.2,0.3-2.3,0.8-3.3c0.5-1,1.3-1.8,2.2-2.3c0.9-0.5,2-0.8,3-0.8c1.1,0,2.1,0.3,3.1,0.8c0.9,0.5,1.7,1.3,2.3,2.3c0.5,1,0.8,2.1,0.8,3.3c0,1.2-0.3,2.3-0.8,3.3C34.3,24.7,33.5,25.4,32.6,25.9z";

const LoadingScreen = () => {
  const [visible, setVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Start fade-out after the drawing animation is roughly complete
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 2500); // Animation duration is 2s, plus a small buffer

    // Hide component completely after fade-out
    const visibilityTimer = setTimeout(() => {
      setVisible(false);
    }, 3000); // 2.5s animation + 0.5s fade

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(visibilityTimer);
    };
  }, []);

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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isFading ? 0 : 1,
        transition: 'opacity 0.5s ease-out',
      }}
    >
      <svg
        width="100"
        height="100"
        viewBox="0 0 50 40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>
          {`
            .logo-path {
              stroke-dasharray: 400;
              stroke-dashoffset: 400;
              animation: draw 2s ease-in-out forwards;
            }

            @keyframes draw {
              to {
                stroke-dashoffset: 0;
              }
            }
          `}
        </style>
        <path
          className="logo-path"
          d={D_PATH}
          fill="none"
          stroke="hsl(135, 94%, 45%)"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
};

export default LoadingScreen;
