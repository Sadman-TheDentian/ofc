
'use client';

const LogoLoader = () => {
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
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
        <path
          d="M12 2L2 7l10 5 10-5L12 2zm0 0v10l-5 2.5V7L12 2zM12 12v10l5-2.5V9.5L12 12z"
          stroke="hsl(var(--primary))"
          strokeWidth="0.5"
          fill="none"
          style={{
            strokeDasharray: 1,
            strokeDashoffset: 1,
            animation: 'logo-draw 2s ease-in-out forwards',
          }}
        />
      </svg>
    </div>
  );
};

export default LogoLoader;
