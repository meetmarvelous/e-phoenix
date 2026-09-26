import React from 'react';

interface PhoenixLogoProps {
  variant?: 'light' | 'dark' | 'gold' | 'white-bg';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
}

export const PhoenixLogo: React.FC<PhoenixLogoProps> = ({
  variant = 'gold',
  size = 'md',
  showSubtitle = true,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const textSizes = {
    sm: { title: 'text-xs tracking-[0.2em]', sub: 'text-[9px] tracking-[0.25em]' },
    md: { title: 'text-sm sm:text-base tracking-[0.22em]', sub: 'text-[10px] tracking-[0.3em]' },
    lg: { title: 'text-xl tracking-[0.25em]', sub: 'text-xs tracking-[0.35em]' },
    xl: { title: 'text-2xl tracking-[0.3em]', sub: 'text-sm tracking-[0.4em]' },
  };

  const isDarkCard = variant === 'dark' || variant === 'gold';
  const strokeColor = variant === 'white-bg' ? '#9f7e52' : '#c5a880';
  const textColor = variant === 'white-bg' ? 'text-[#2a241e]' : 'text-neutral-100';
  const subColor = variant === 'white-bg' ? 'text-[#8c7457]' : 'text-[#c5a880]';

  return (
    <div className={`flex flex-col items-center select-none text-center ${className}`}>
      {/* Majestic Phoenix Crest & Architectural Arch */}
      <div className={`relative ${iconSizes[size]} mb-1.5 flex items-center justify-center`}>
        <svg
          viewBox="0 0 100 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Classical Dome Arch with Columns motif */}
          <path
            d="M10 75C10 38 27.9 10 50 10C72.1 10 90 38 90 75"
            stroke={strokeColor}
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Outer fine halo */}
          <path
            d="M16 75C16 43 31.2 18 50 18C68.8 18 84 43 84 75"
            stroke={strokeColor}
            strokeWidth="1.2"
            strokeDasharray="2 3"
          />
          {/* Vertical architectural colonnade arches */}
          <path d="M26 75V44C26 38 31 33 38 33V75" stroke={strokeColor} strokeWidth="2" />
          <path d="M74 75V44C74 38 69 33 62 33V75" stroke={strokeColor} strokeWidth="2" />
          <path d="M42 75V25C42 21 45.5 18 50 18C54.5 18 58 21 58 25V75" stroke={strokeColor} strokeWidth="2.5" />
          
          {/* Rising Phoenix Crest in the center */}
          <path
            d="M50 24L53 31L61 32L55 37L57 45L50 41L43 45L45 37L39 32L47 31L50 24Z"
            fill={strokeColor}
          />
          {/* Base pedestal line */}
          <line x1="6" y1="75" x2="94" y2="75" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
          <line x1="14" y1="81" x2="86" y2="81" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col items-center">
        <span className={`font-serif font-bold ${textSizes[size].title} ${textColor} uppercase transition-colors`}>
          E-Phoenix Hotel
        </span>
        {showSubtitle && (
          <span className={`font-cinzel font-medium ${textSizes[size].sub} ${subColor} uppercase mt-0.5`}>
            HOTEL • ILORIN
          </span>
        )}
      </div>
    </div>
  );
};
