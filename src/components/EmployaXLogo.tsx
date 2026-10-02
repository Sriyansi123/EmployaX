import React from 'react';

interface LogoProps {
  variant?: 'icon' | 'splash' | 'nav' | 'full' | 'mark';
  className?: string;
  size?: number;
  inverted?: boolean;
}

export const EmployaXLogo: React.FC<LogoProps> = ({
  variant = 'nav',
  className = '',
  size,
  inverted = false,
}) => {
  // SVG Graphic of the Official EmployaX Emblem matching "EmployaX Neon Career Icon.png":
  // - Stylized 3D glowing "E" in cyan/blue
  // - Graduation cap on top of the "E"
  // - Upward-pointing arrow forming the diagonal of "X"
  // - 4-pointed sparkle star at the arrow tip
  // - Vibrant purple-to-pink lower diagonal leg of the "X"
  const EmblemGraphic = ({ width = 100, height = 100 }: { width?: number; height?: number }) => (
    <svg
      viewBox="0 0 200 200"
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-lg"
    >
      <defs>
        {/* Gradients for E Ribbon */}
        <linearGradient id="empx-e-ribbon" x1="40" y1="60" x2="110" y2="150" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00F0FF" />
          <stop offset="35%" stopColor="#38BDF8" />
          <stop offset="70%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#4F46E5" />
        </linearGradient>

        {/* Gradient for Upward Arrow (X-upper arm) */}
        <linearGradient id="empx-arrow" x1="70" y1="140" x2="160" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="40%" stopColor="#06B6D4" />
          <stop offset="80%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>

        {/* Gradient for Lower Right Leg of X */}
        <linearGradient id="empx-x-leg" x1="110" y1="100" x2="155" y2="155" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="40%" stopColor="#8B5CF6" />
          <stop offset="80%" stopColor="#C026D3" />
          <stop offset="100%" stopColor="#F43F5E" />
        </linearGradient>

        {/* Gradient for Graduation Cap */}
        <linearGradient id="empx-grad-cap" x1="50" y1="30" x2="110" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#818CF8" />
          <stop offset="50%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#312E81" />
        </linearGradient>

        {/* Gradient for Star Sparkle */}
        <linearGradient id="empx-star" x1="150" y1="30" x2="175" y2="55" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F472B6" />
          <stop offset="50%" stopColor="#E879F9" />
          <stop offset="100%" stopColor="#C084FC" />
        </linearGradient>

        {/* Glow Filters */}
        <filter id="empx-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Graduation Cap atop the 'E' */}
      <g id="grad-cap">
        {/* Skull Cap Base */}
        <path
          d="M 68 56 C 68 56 68 64 80 64 C 92 64 92 56 92 56 Z"
          fill="#312E81"
          opacity="0.8"
        />
        {/* Mortarboard Diamond Top */}
        <polygon
          points="80,34 112,47 80,60 48,47"
          fill="url(#empx-grad-cap)"
          stroke="#C7D2FE"
          strokeWidth="1.2"
        />
        {/* Center Cap Button */}
        <circle cx="80" cy="47" r="2.5" fill="#E0E7FF" />
        {/* Hanging Tassel */}
        <path
          d="M 80 47 Q 96 50 96 61"
          stroke="#C7D2FE"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="96" cy="62" r="2" fill="#E0E7FF" />
        <path d="M 95 64 L 97 64 L 98 70 L 94 70 Z" fill="#E0E7FF" />
      </g>

      {/* Stylized 'E' Ribbon Form */}
      <g id="e-ribbon">
        {/* Upper horizontal loop under the cap */}
        <path
          d="M 45 74 C 40 70 46 64 56 64 L 98 64 C 104 64 108 68 108 73 C 108 78 104 82 98 82 L 68 82 C 60 82 54 86 54 94 C 54 102 60 106 68 106 L 92 106 C 97 106 102 110 102 115 C 102 120 97 124 92 124 L 72 124 C 52 124 42 114 42 96 C 42 84 46 76 56 70 Z"
          fill="url(#empx-e-ribbon)"
          filter="url(#empx-glow)"
        />

        {/* Soft 3D lighting crest along the E */}
        <path
          d="M 52 68 L 96 68 C 100 68 102 70 102 73"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M 64 110 L 92 110"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </g>

      {/* Upward Diagonal Rocket Arrow forming the 'X' */}
      <g id="upward-arrow">
        {/* Curved stem of the arrow connecting from bottom of E up to the arrow tip */}
        <path
          d="M 46 112 C 42 128 56 148 84 148 C 108 148 128 132 144 102 L 152 76"
          stroke="url(#empx-arrow)"
          strokeWidth="16"
          strokeLinecap="round"
          filter="url(#empx-glow)"
        />

        {/* Arrowhead */}
        <polygon
          points="155,50 162,82 140,73 125,76"
          fill="#38BDF8"
        />
        <polygon
          points="155,50 162,82 140,73"
          fill="#00F0FF"
        />
        <path
          d="M 155 50 L 140 73"
          stroke="#FFFFFF"
          strokeWidth="1"
        />
      </g>

      {/* Lower Right Leg of the 'X' */}
      <g id="x-lower-leg">
        <path
          d="M 112 110 L 152 150 C 156 154 162 154 165 150 C 168 146 168 140 164 136 L 126 98 Z"
          fill="url(#empx-x-leg)"
          filter="url(#empx-glow)"
        />
        {/* Soft specular highlight on leg */}
        <path
          d="M 120 114 L 154 148"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>

      {/* 4-Pointed Sparkle Star at Arrow Tip */}
      <g id="sparkle-star">
        <path
          d="M 166 32 Q 166 43 177 43 Q 166 43 166 54 Q 166 43 155 43 Q 166 43 166 32 Z"
          fill="url(#empx-star)"
          filter="url(#empx-glow)"
        />
        <circle cx="166" cy="43" r="1.5" fill="#FFFFFF" />
      </g>
    </svg>
  );

  // Squircle App Icon Variant (matching "EmployaX Neon Career Icon.png" 1:1)
  const SquircleAppIcon = ({ iconSize = 120 }: { iconSize?: number }) => (
    <div
      style={{ width: iconSize, height: iconSize }}
      className="relative rounded-[26%] bg-gradient-to-br from-[#0A1338] via-[#050C26] to-[#020617] p-2.5 flex flex-col items-center justify-between shadow-2xl border border-cyan-500/30 overflow-hidden group select-none"
    >
      {/* Outer Glow & Inner Highlight Rim */}
      <div className="absolute inset-0 rounded-[26%] border border-cyan-400/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] pointer-events-none" />
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-cyan-500/20 rounded-full blur-xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-purple-600/20 rounded-full blur-xl pointer-events-none" />

      {/* Center Emblem */}
      <div className="flex-1 flex items-center justify-center -mt-1">
        <EmblemGraphic width={iconSize * 0.72} height={iconSize * 0.72} />
      </div>

      {/* Wordmark below icon */}
      <div className="pb-1.5 flex items-center justify-center leading-none">
        <span className="font-heading font-extrabold text-white tracking-tight" style={{ fontSize: iconSize * 0.14 }}>
          Employa
        </span>
        <span
          className="font-heading font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent"
          style={{ fontSize: iconSize * 0.14 }}
        >
          X
        </span>
      </div>
    </div>
  );

  // Variant: Standalone Squircle Icon
  if (variant === 'icon') {
    return <SquircleAppIcon iconSize={size || 110} />;
  }

  // Variant: Splash Screen
  if (variant === 'splash') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <div className="relative mb-5 transform transition-transform hover:scale-105 duration-300">
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/30 via-blue-600/30 to-purple-600/30 rounded-[32%] blur-2xl animate-pulse" />
          <SquircleAppIcon iconSize={140} />
        </div>
        <p className="mt-3 text-cyan-200 font-semibold text-sm sm:text-base tracking-wide">
          “Your AI-Powered Career Copilot”
        </p>
        <p className="mt-1 text-xs text-slate-400 tracking-widest uppercase">
          Discover · Prepare · Prove · Get Hired
        </p>
      </div>
    );
  }

  // Variant: Standalone Mark
  if (variant === 'mark') {
    return <EmblemGraphic width={size || 40} height={size || 40} />;
  }

  // Variant: Full Brand Lockup
  if (variant === 'full') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#0A1338] to-[#040718] border border-cyan-500/30 flex items-center justify-center p-1 shadow-md shrink-0">
          <EmblemGraphic width={34} height={34} />
        </div>
        <div className="flex flex-col leading-none">
          <div className="flex items-center">
            <span
              className={`font-heading font-extrabold text-2xl tracking-tight ${
                inverted ? 'text-white' : 'text-slate-900'
              }`}
            >
              Employa
            </span>
            <span className="font-heading font-extrabold text-2xl tracking-tight bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              X
            </span>
          </div>
          <span className="text-[10px] font-semibold text-cyan-600 font-sans tracking-tight mt-0.5">
            Your AI-Powered Career Copilot
          </span>
        </div>
      </div>
    );
  }

  // Default: 'nav' variant (Emblem Icon + Wordmark)
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0A1338] to-[#040718] border border-cyan-500/30 flex items-center justify-center p-1 shadow-md shrink-0">
        <EmblemGraphic width={28} height={28} />
      </div>
      <div className="flex flex-col leading-none">
        <div className="flex items-center">
          <span
            className={`font-heading font-extrabold text-xl tracking-tight ${
              inverted ? 'text-white' : 'text-slate-900'
            }`}
          >
            Employa
          </span>
          <span className="font-heading font-extrabold text-xl tracking-tight bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            X
          </span>
        </div>
        <span className="text-[9px] font-bold text-slate-400 tracking-wider uppercase mt-0.5">
          Career Copilot
        </span>
      </div>
    </div>
  );
};
