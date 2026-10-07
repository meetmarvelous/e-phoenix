import React from 'react';

interface PhoenixLogoProps {
  variant?: 'light' | 'dark' | 'purple' | 'gold' | 'white-bg';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
  horizontal?: boolean;
}

export const PhoenixLogo: React.FC<PhoenixLogoProps> = ({
  variant = 'purple',
  size = 'md',
  showSubtitle = true,
  className = '',
  horizontal = true,
}) => {
  const iconSizes = {
    sm: 'w-8 h-8 sm:w-9 sm:h-9',
    md: 'w-11 h-11 sm:w-12 sm:h-12',
    lg: 'w-14 h-14 sm:w-16 sm:h-16',
    xl: 'w-20 h-20 sm:w-24 sm:h-24',
  };

  const textSizes = {
    sm: { title: 'text-xs sm:text-sm tracking-[0.16em]', sub: 'text-[9px] sm:text-[10px] tracking-[0.22em]' },
    md: { title: 'text-sm sm:text-base tracking-[0.18em]', sub: 'text-[10px] sm:text-[11px] tracking-[0.25em]' },
    lg: { title: 'text-lg sm:text-xl tracking-[0.2em]', sub: 'text-xs tracking-[0.28em]' },
    xl: { title: 'text-2xl sm:text-3xl tracking-[0.25em]', sub: 'text-sm tracking-[0.3em]' },
  };

  const titleColor = variant === 'light' ? 'text-white' : 'text-[#2a1745]';
  const subColor = variant === 'light' ? 'text-purple-200' : 'text-[#6e2b9c]';

  return (
    <div className={`flex ${horizontal ? 'flex-row items-center gap-2.5 sm:gap-3 text-left' : 'flex-col items-center text-center'} select-none ${className}`}>
      {/* Official Circular E-Phoenix Crest from ephoenix.jpg */}
      <div className={`relative ${iconSizes[size]} shrink-0 rounded-full overflow-hidden border-2 border-[#4e1e7a]/30 shadow-xs bg-white p-0.5`}>
        <img
          src="/images/logo.jpg"
          alt="E-Phoenix Hotel Logo"
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      {/* Brand Typography */}
      <div>
        <div className={`font-cinzel font-bold ${titleColor} ${textSizes[size].title} leading-tight`}>
          E-PHOENIX HOTEL
        </div>
        {showSubtitle && (
          <div className={`font-sans font-semibold uppercase ${subColor} ${textSizes[size].sub} mt-0.5 flex items-center gap-1.5`}>
            <span>ILORIN</span>
            <span className="w-1 h-1 rounded-full bg-[#c49b55]" />
            <span>EST. 1981</span>
          </div>
        )}
      </div>
    </div>
  );
};
