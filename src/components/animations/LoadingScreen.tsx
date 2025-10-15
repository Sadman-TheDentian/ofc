'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const logoUrl =
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEirwhyibjl-3Guf8S6G442OtQmAdOzHrTcxPAuK6QxCGcAJ2I88K7Ee9DN-k_SONDddf2FeB4SwHO8l29PZ9HvHHlxJxiPDnfgrY1DBS60HsVaYv0uOAi08fm6KyrwhM7HPQhbQhL5ufVU_efX268tXM4rR8Vwok_UqbSar_b-B4btAigP5BFaU12PCjUE/s320/DENTI.SYSTEMS%20PNJ.png';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // This function will be called when the page is fully loaded
    const handleLoad = () => {
      // Start fading out after a short delay
      setTimeout(() => {
        setFading(true);
        // Set component to be removed from DOM after fade out completes
        setTimeout(() => {
          setVisible(false);
        }, 500); // This duration should match the fade-out transition
      }, 2500); // Keep loader on screen for 2.5s for the animation
    };

    // The 'load' event fires when the whole page has loaded, including all dependent resources.
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.5s ease-out',
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      <div className="animate-pulse-and-fade">
        <Image src={logoUrl} alt="DentiSystems Logo" width={80} height={80} priority />
      </div>
      <style jsx>{`
        @keyframes pulse-and-fade {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.7;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-pulse-and-fade {
          animation: pulse-and-fade 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
