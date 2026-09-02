import React from 'react';

interface JinnyLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'color' | 'white';
}

export const JinnyLogo: React.FC<JinnyLogoProps> = ({ 
  className = '', 
  size = 'md',
  variant = 'color'
}) => {
  const sizeMap = {
    sm: { height: 32, iconSize: 28, textJinny: 'text-lg', textLoan: 'text-lg', textSub: 'text-[9px]' },
    md: { height: 42, iconSize: 36, textJinny: 'text-2xl', textLoan: 'text-2xl', textSub: 'text-[11px]' },
    lg: { height: 52, iconSize: 46, textJinny: 'text-3xl', textLoan: 'text-3xl', textSub: 'text-xs' },
    xl: { height: 64, iconSize: 56, textJinny: 'text-4xl', textLoan: 'text-4xl', textSub: 'text-sm' },
  };

  const current = sizeMap[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* 3D Magenta/Pink Emblem with stylized ₹ / J symbol */}
      <svg
        width={current.iconSize}
        height={current.iconSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 drop-shadow-sm"
      >
        <defs>
          {/* Main 3D Sphere Gradient */}
          <radialGradient id="sphereGrad" cx="38%" cy="32%" r="62%">
            <stop offset="0%" stopColor="#ff70a6" />
            <stop offset="25%" stopColor="#f43f8e" />
            <stop offset="65%" stopColor="#e11d6e" />
            <stop offset="100%" stopColor="#a30948" />
          </radialGradient>

          {/* Outer crescent highlight */}
          <linearGradient id="crescentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffb3d1" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#f43f8e" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#880033" stopOpacity="0.9" />
          </linearGradient>

          {/* White Monogram Shadow */}
          <filter id="glyphShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#700228" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Outer subtle shadow/orbit ring */}
        <path
          d="M 18,72 C 10,50 20,25 45,15 C 72,5 92,25 90,52 C 89,68 76,86 52,90 C 35,93 22,86 18,72 Z"
          fill="url(#crescentGrad)"
          opacity="0.9"
        />

        {/* Main 3D Sphere */}
        <circle cx="48" cy="48" r="40" fill="url(#sphereGrad)" />

        {/* Glossy top-left reflection highlight */}
        <ellipse cx="38" cy="28" rx="22" ry="13" fill="#ffffff" opacity="0.3" transform="rotate(-20 38 28)" />

        {/* Stylized ₹ / J Monogram */}
        <g filter="url(#glyphShadow)">
          {/* Top horizontal Rupee bar */}
          <path
            d="M 30 29 L 70 29 C 72 29 73 31 72 33 L 70 37 C 69.5 38 68 38.5 66.5 38.5 L 34 38.5 C 32 38.5 31 37 31.5 35 L 32.5 31 C 32.8 29.8 33.8 29 35 29 Z"
            fill="#ffffff"
          />

          {/* Second horizontal bar (rupee stroke) */}
          <path
            d="M 30 43 L 69 43 C 70.8 43 71.8 44.6 71 46.2 L 69.5 49 C 69 50 67.8 50.5 66.5 50.5 L 34 50.5 C 32 50.5 31 49 31.5 47 L 32.5 44.5 C 32.8 43.5 33.8 43 35 43 Z"
            fill="#ffffff"
          />

          {/* Central Stem & Sweeping 'J' Tail */}
          <path
            d="M 50 30 L 59 30 L 59 62 C 59 72 50 78 36 78 C 24 78 18 72 17 68 C 16 64 21 62 25 64 C 28 66 31 68.5 36 68.5 C 43 68.5 47 64 47 57 L 47 30 Z"
            fill="#ffffff"
          />

          {/* Sweeping dynamic swoop around left/bottom */}
          <path
            d="M 12 55 C 10 72 24 88 46 88 C 68 88 84 75 87 58 C 88 52 82 50 80 54 C 77 66 65 77 46 77 C 30 77 19 66 19 54 C 19 50 13 49 12 55 Z"
            fill="#ffffff"
            opacity="0.85"
          />
        </g>
      </svg>

      {/* Brand Typography */}
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline font-black font-['Outfit',sans-serif] tracking-tight">
          <span className={variant === 'white' ? 'text-pink-400 ' + current.textJinny : 'text-[#E81E76] ' + current.textJinny}>
            Jinny
          </span>
          <span className={variant === 'white' ? 'text-white ' + current.textLoan : 'text-slate-800 ' + current.textLoan}>
            Loan
          </span>
        </div>
        <div className={`font-semibold tracking-wider text-center mt-0.5 ${current.textSub} ${
          variant === 'white' ? 'text-slate-300' : 'text-slate-600'
        }`}>
          — Loans Made Easy —
        </div>
      </div>
    </div>
  );
};
