
'use client';

import React from 'react';
import Image from 'next/image';

const logoUrl =
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEirwhyibjl-3Guf8S6G442OtQmAdOzHrTcxPAuK6QxCGcAJ2I88K7Ee9DN-k_SONDddf2FeB4SwHO8l29PZ9HvHHlxJxiPDnfgrY1DBS60HsVaYv0uOAi08fm6KyrwhM7HPQhbQhL5ufVU_efX268tXM4rR8Vwok_UqbSar_b-B4btAigP5BFaU12PCjUE/s320/DENTI.SYSTEMS%20PNJ.png';

const LogoLoader = () => {
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-background z-50 pointer-events-none"
      style={{
        animation: 'logo-fade-out 0.5s ease-out 2.5s forwards',
      }}
    >
      <div className="relative w-32 h-32 animate-pulse">
        <Image
          src={logoUrl}
          alt="DentiSystems Logo"
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
    </div>
  );
};

export default LogoLoader;
