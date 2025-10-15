
'use client';

const LogoLoader = () => {
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-background z-50 pointer-events-none"
      style={{
        animation: 'logo-fade-out 0.5s ease-out 2.5s forwards',
      }}
    >
      <svg 
        width="100" 
        height="100" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg" 
        className="transform-gpu"
      >
        {/* Corrected path to match the DentiSystems logo */}
        <path
          d="M12 2L2 7v10l10 5 10-5V7L12 2zM7 9l5 2.5V19l-5-2.5V9zm10 7.5L12 19V11.5L17 9v7.5zM12 4.5l7.5 3.75L12 12 4.5 8.25 12 4.5z"
          stroke="hsl(var(--primary))"
          strokeWidth="0.5"
          fill="none"
          style={{
            strokeDasharray: 100,
            strokeDashoffset: 100,
            animation: 'logo-draw 2s ease-in-out forwards',
          }}
        />
      </svg>
    </div>
  );
};

export default LogoLoader;
