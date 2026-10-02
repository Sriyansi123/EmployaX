import React from 'react';

interface AbstractBackgroundProps {
  className?: string;
  variant?: 'light' | 'dark' | 'soft';
}

export const AbstractBackground: React.FC<AbstractBackgroundProps> = ({
  className = '',
  variant = 'light',
}) => {
  if (variant === 'dark') {
    return (
      <div
        className={`fixed inset-0 pointer-events-none overflow-hidden z-0 select-none ${className}`}
        aria-hidden="true"
      >
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-cyan-500/15 via-blue-600/10 to-transparent blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-[650px] h-[650px] rounded-full bg-gradient-to-bl from-purple-600/15 via-blue-600/10 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 left-1/4 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-blue-700/15 via-cyan-500/10 to-transparent blur-3xl" />

        {/* Ambient Grid Accent */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #38BDF8 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>
    );
  }

  // Exact reproduction of the provided UI.jpeg artwork:
  // - Clean white-to-light-blue gradient canvas
  // - Elegant translucent flowing waves in royal blue and soft cyan
  // - Subtle white curved contour highlights
  // - Floating soft blue gradient spheres
  // - Dot matrix grids in corners
  return (
    <div
      className={`fixed inset-0 pointer-events-none overflow-hidden z-0 select-none ${className}`}
      aria-hidden="true"
    >
      {/* Base Canvas Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F8FAFC] via-[#F0F6FF] to-[#E6F0FD]" />

      {/* SVG Fluid Waves and Curves inspired by UI.jpeg */}
      <svg
        className="absolute inset-0 w-full h-full preserve-3d"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <linearGradient id="ui-wave-top-left" x1="0" y1="0" x2="600" y2="400" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.55" />
            <stop offset="50%" stopColor="#BFDBFE" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#DBEAFE" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="ui-wave-top-right" x1="1600" y1="0" x2="1100" y2="500" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#93C5FD" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#EFF6FF" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="ui-wave-bottom" x1="0" y1="900" x2="1600" y2="600" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.45" />
            <stop offset="35%" stopColor="#60A5FA" stopOpacity="0.35" />
            <stop offset="70%" stopColor="#93C5FD" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.5" />
          </linearGradient>

          <linearGradient id="ui-orb-grad-1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#93C5FD" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>

          <linearGradient id="ui-orb-grad-2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>

          <pattern id="ui-dot-grid" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="1.5" fill="#3B82F6" fillOpacity="0.28" />
          </pattern>
        </defs>

        {/* Top-Left Gentle Curving Wave */}
        <path
          d="M -100 -50 Q 200 120 400 60 T 700 -50 L 700 -100 L -100 -100 Z"
          fill="url(#ui-wave-top-left)"
        />
        <path
          d="M -50 40 C 180 180 320 40 550 90"
          stroke="rgba(255, 255, 255, 0.85)"
          strokeWidth="2"
        />

        {/* Top-Right Soft Wave & Contour */}
        <circle cx="1500" cy="100" r="320" fill="url(#ui-wave-top-right)" />
        <circle cx="1500" cy="100" r="280" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="1.5" fill="none" />

        {/* Bottom Flowing Waves Layer 1 */}
        <path
          d="M -100 700 C 250 620 450 820 850 780 C 1200 740 1400 860 1700 720 L 1700 1000 L -100 1000 Z"
          fill="url(#ui-wave-bottom)"
        />

        {/* Bottom Flowing Wave Layer 2 (Lighter Crest) */}
        <path
          d="M -100 760 C 280 720 520 850 900 810 C 1250 770 1450 840 1700 790 L 1700 1000 L -100 1000 Z"
          fill="#60A5FA"
          fillOpacity="0.25"
        />

        {/* Elegant Wave Contour White Highlight Lines */}
        <path
          d="M -50 710 C 260 630 460 830 860 790 C 1210 750 1410 870 1700 730"
          stroke="rgba(255, 255, 255, 0.9)"
          strokeWidth="2.5"
        />
        <path
          d="M 500 830 C 800 770 1100 820 1500 720"
          stroke="rgba(255, 255, 255, 0.6)"
          strokeWidth="1.5"
        />

        {/* Circular Ambient Accent (Bottom-Left) */}
        <circle cx="120" cy="850" r="220" fill="#3B82F6" fillOpacity="0.2" />
        <circle cx="120" cy="850" r="280" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="2" fill="none" />

        {/* Floating Accent Sphere (Mid-Left) */}
        <circle cx="210" cy="520" r="28" fill="url(#ui-orb-grad-1)" fillOpacity="0.75" />

        {/* Floating Accent Sphere (Mid-Right) */}
        <circle cx="1420" cy="280" r="26" fill="url(#ui-orb-grad-2)" fillOpacity="0.65" />

        {/* Dot Matrix Grids (Left & Right) as seen in UI.jpeg */}
        <rect x="50" y="220" width="130" height="150" fill="url(#ui-dot-grid)" />
        <rect x="1440" y="360" width="130" height="130" fill="url(#ui-dot-grid)" />
      </svg>
    </div>
  );
};
