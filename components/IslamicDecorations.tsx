
import React from 'react';

// Added style prop to support inline styles like animation-delay
export const CrescentMoon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = "", style }) => (
  <svg className={className} style={style} viewBox="0 0 100 100" fill="currentColor">
    <path d="M50 5C30 5 13 22 13 45s17 40 37 40c6 0 12-1 17-4-20-8-33-27-33-49 0-10 3-19 8-27-3-1-6-1-9 0h17z" />
  </svg>
);

// Added style prop to support inline styles like animation-delay
export const Lantern: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = "", style }) => (
  <svg className={className} style={style} viewBox="0 0 60 100" fill="currentColor">
    <path d="M30 0L25 8H35L30 0ZM25 8V12H35V8H25ZM20 12C15 12 10 20 10 35V65C10 75 18 85 30 85S50 75 50 65V35C50 20 45 12 40 12H20ZM25 25H35V70H25V25Z" />
    <circle cx="30" cy="45" r="5" fill="#f8f1e7" opacity="0.5" />
  </svg>
);

// Added style prop to support inline styles like animation-delay
export const Divider: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = "", style }) => (
  <div className={`flex items-center justify-center gap-4 ${className}`} style={style}>
    <div className="h-px w-16 bg-gradient-to-l from-[#d4af37] to-transparent opacity-50" />
    <span className="text-[#d4af37] text-xl">✦</span>
    <div className="h-px w-16 bg-gradient-to-r from-[#d4af37] to-transparent opacity-50" />
  </div>
);

export const Stars: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
        }}
      />
    ))}
  </div>
);
