import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className={`inline-flex items-center gap-1.5 font-black tracking-tight select-none ${textSizes[size]} ${className}`}>
      <span className="text-slate-900 font-extrabold tracking-tight">SB</span>
      <span className="text-orange-600 font-extrabold tracking-tight">PAINTS</span>
    </div>
  );
};
