
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
        viewBox="0 0 120 120"
        xmlns="http://www.w3.org/2000/svg" 
        className="transform-gpu"
      >
        {/* Extracted and adapted from the provided FBX data */}
        <path
          d="M60 2 L2 30 L2 90 L60 118 L118 90 L118 30 Z M35 45 L60 57.5 V 105 L35 92.5 V 45 Z M85 92.5 L60 105 V 57.5 L85 45 V 92.5 Z M60 17 L92.5 35 L60 52.5 L27.5 35 Z"
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          fill="none"
          style={{
            strokeDasharray: 500,
            strokeDashoffset: 500,
            animation: 'logo-draw 2s ease-in-out forwards',
          }}
        />
      </svg>
    </div>
  );
};

export default LogoLoader;
