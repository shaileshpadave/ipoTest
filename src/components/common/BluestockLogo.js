import React from 'react';

const BluestockLogo = ({ size = 'md', showText = true }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className="flex items-center space-x-3">
      {/* Logo Icon - Based on the purple gradient bars design */}
      <div className={`${sizeClasses[size]} relative`}>
        <svg viewBox="0 0 32 32" className="w-full h-full">
          {/* Three ascending bars with gradient */}
          <defs>
            <linearGradient id="bluestockGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6B46C1" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#A855F7" />
            </linearGradient>
          </defs>
          
          {/* First bar (shortest) */}
          <rect x="2" y="20" width="6" height="10" rx="2" fill="url(#bluestockGradient)" />
          
          {/* Second bar (medium) */}
          <rect x="10" y="12" width="6" height="18" rx="2" fill="url(#bluestockGradient)" />
          
          {/* Third bar (tallest) */}
          <rect x="18" y="6" width="6" height="24" rx="2" fill="url(#bluestockGradient)" />
          
          {/* Growth arrow/line */}
          <path 
            d="M4 24 L14 16 L22 8 L28 4" 
            stroke="#F97316" 
            strokeWidth="2" 
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Arrow tip */}
          <circle cx="28" cy="4" r="2" fill="#F97316" />
        </svg>
      </div>

      {/* Text */}
      {showText && (
        <span className={`font-semibold text-gray-800 ${textSizeClasses[size]}`}>
          Bluestock
        </span>
      )}
    </div>
  );
};

export default BluestockLogo;