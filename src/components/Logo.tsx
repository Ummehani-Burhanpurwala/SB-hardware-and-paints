import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
}) => {
  const iconDimensions = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const titleSizes = {
    sm: 'text-base font-black',
    md: 'text-lg sm:text-xl font-black leading-tight',
    lg: 'text-2xl sm:text-3xl font-black leading-tight',
  };

  const subSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px] sm:text-[11px]',
    lg: 'text-xs',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Vibrant Brand Icon Badge */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconDimensions[size]}`}>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-orange-600 via-pink-600 to-indigo-600 p-[1.5px] shadow-sm">
          <div className="w-full h-full rounded-[10px] bg-white flex items-center justify-center">
            {/* Custom SVG combining paint bucket/droplet & hardware motif */}
            <svg viewBox="0 0 36 36" fill="none" className="w-6 h-6">
              <defs>
                <linearGradient id="sbGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#EA580C" />
                  <stop offset="0.5" stopColor="#DB2777" />
                  <stop offset="1" stopColor="#4F46E5" />
                </linearGradient>
              </defs>
              {/* Paint bucket / brush stylized mark */}
              <path
                d="M8 12C8 10.8954 8.89543 10 10 10H26C27.1046 10 28 10.8954 28 12V14C28 14.5523 27.5523 15 27 15H9C8.44772 15 8 14.5523 8 14V12Z"
                fill="url(#sbGrad)"
              />
              <path
                d="M10 16H26L24.2 28.5C24.08 29.35 23.35 30 22.5 30H13.5C12.65 30 11.92 29.35 11.8 28.5L10 16Z"
                fill="#0F172A"
                fillOpacity="0.9"
              />
              {/* Paint Splash / Wave inside bucket */}
              <path
                d="M12 20C14 18 16 22 18 20C20 18 22 21 24 19.5V23C23 24 21 24 18 23C15 22 13 23 12 23V20Z"
                fill="url(#sbGrad)"
              />
              {/* Handle */}
              <path
                d="M11 11C11 7.13401 14.134 4 18 4C21.866 4 25 7.13401 25 11"
                stroke="url(#sbGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Typography */}
      <div className="flex flex-col text-left">
        <div className={`tracking-tight flex items-center gap-1.5 ${titleSizes[size]}`}>
          <span className="text-slate-900 font-extrabold">SB</span>
          <span className="bg-gradient-to-r from-orange-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent font-black tracking-tight">
            HARDWARE & PAINTS
          </span>
        </div>
        {showSubtitle && (
          <div className={`text-slate-500 font-medium tracking-normal ${subSizes[size]}`}>
            Trusted Local Paints & Hardware • Pulgaon
          </div>
        )}
      </div>
    </div>
  );
};
