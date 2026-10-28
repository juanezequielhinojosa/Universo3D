import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  theme?: 'dark' | 'light';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', theme = 'dark' }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center gap-2.5 font-display tracking-tight select-none ${className}`}>
      <div className={`relative ${iconSizes[size]} flex items-center justify-center`}>
        {/* Outer glowing halo */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 via-indigo-600 to-amber-400 rounded-lg blur-[6px] opacity-60 animate-pulse-subtle" />
        
        {/* Core 3D Wireframe geometric icon */}
        <svg
          viewBox="0 0 40 40"
          className="relative w-full h-full text-white"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Isometric Cube Edges */}
          <path
            d="M20 4L34 12V28L20 36L6 28V12L20 4Z"
            stroke="url(#cube-gradient)"
            strokeWidth="2"
            strokeLinejoin="round"
            className="drop-shadow"
          />
          <path
            d="M20 4V20M20 20L34 12M20 20L6 12M20 20V36"
            stroke="url(#cube-gradient-inner)"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* Planetary Orbital Ring representing Universe */}
          <ellipse
            cx="20"
            cy="20"
            rx="18"
            ry="7"
            transform="rotate(-25 20 20)"
            stroke="url(#ring-gradient)"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />
          {/* 3D Extruder Nozzle glowing core */}
          <circle cx="20" cy="20" r="3.2" fill="#06b6d4" className="filter drop-shadow-[0_0_8px_#06b6d4]" />
          <circle cx="20" cy="20" r="1.4" fill="#ffffff" />

          <defs>
            <linearGradient id="cube-gradient" x1="6" y1="4" x2="34" y2="36" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38bdf8" />
              <stop offset="0.5" stopColor="#818cf8" />
              <stop offset="1" stopColor="#f59e0b" />
            </linearGradient>
            <linearGradient id="cube-gradient-inner" x1="20" y1="4" x2="20" y2="36" gradientUnits="userSpaceOnUse">
              <stop stopColor="#67e8f9" />
              <stop offset="1" stopColor="#6366f1" />
            </linearGradient>
            <linearGradient id="ring-gradient" x1="2" y1="20" x2="38" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#22d3ee" stopOpacity="0.8" />
              <stop offset="1" stopColor="#a855f7" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <span className={`font-bold font-display tracking-wide ${theme === 'dark' ? 'text-white' : 'text-slate-950 font-extrabold'} flex items-center gap-1.5 ${textSizes[size]}`}>
          UNIVERSO <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500 font-extrabold">3D</span>
        </span>
        <span className={`text-[10px] uppercase tracking-[0.2em] font-bold font-mono ${theme === 'dark' ? 'text-cyan-400/80' : 'text-cyan-700'}`}>
          Impresión & Maker
        </span>
      </div>
    </div>
  );
};
