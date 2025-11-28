
import { SVGProps } from 'react';

export function LogoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g className="logo-fill" fill="hsl(var(--primary))">
        <path className="logo-draw-path" d="M50,5 L95,27.5 L95,72.5 L50,95 L5,72.5 L5,27.5 Z" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" />
        <path d="M50,50 L95,27.5" stroke="hsl(var(--primary))" strokeWidth="1.5" className="logo-draw-path" style={{ animationDelay: '1s' }} />
        <path d="M50,50 L95,72.5" stroke="hsl(var(--primary))" strokeWidth="1.5" className="logo-draw-path" style={{ animationDelay: '1.2s' }} />
        <path d="M50,50 L5,72.5" stroke="hsl(var(--primary))" strokeWidth="1.5" className="logo-draw-path" style={{ animationDelay: '1.4s' }} />
        <path d="M50,50 L5,27.5" stroke="hsl(var(--primary))" strokeWidth="1.5" className="logo-draw-path" style={{ animationDelay: '1.6s' }} />
        <path d="M50,50 L50,95" stroke="hsl(var(--primary))" strokeWidth="1.5" className="logo-draw-path" style={{ animationDelay: '1.8s' }} />
        <circle cx="50" cy="50" r="10" fill="hsl(var(--primary))" />
      </g>
    </svg>
  );
}
