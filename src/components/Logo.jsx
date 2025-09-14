import React from "react";

function Logo({ width = "120px", height = "auto", className = "" }) {
  // Ensure logo text scales with width
  const logoWidth = parseInt(width);
  const titleSize =
    logoWidth < 60
      ? "text-sm"
      : logoWidth < 90
      ? "text-lg"
      : logoWidth < 120
      ? "text-xl"
      : "text-2xl";
  const taglineSize =
    logoWidth < 60 ? "text-xs" : logoWidth < 90 ? "text-sm" : "text-base";

  return (
    <div className={`flex items-center ${className}`} style={{ width }}>
      <svg
        viewBox="0 0 220 70"
        style={{ width, height }}
        className="transition-all duration-300 hover:scale-110 cursor-pointer filter drop-shadow-xl"
      >
        {/* Outer Circle with Gradient */}
        <circle
          cx="35"
          cy="35"
          r="30"
          fill="url(#gradient1)"
          className="drop-shadow-2xl"
          stroke="url(#gradient2)"
          strokeWidth="3"
        />

        {/* Inner Glow Circle */}
        <circle
          cx="35"
          cy="35"
          r="25"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
        />

        {/* Blog Icon */}
        <g transform="translate(22, 22)">
          <rect
            x="0"
            y="0"
            width="26"
            height="26"
            rx="3"
            fill="rgba(255,255,255,0.15)"
          />
          <rect x="4" y="6" width="18" height="3" rx="1" fill="white" />
          <rect x="4" y="11" width="18" height="3" rx="1" fill="white" />
          <rect x="4" y="16" width="14" height="3" rx="1" fill="white" />
          <rect x="18" y="6" width="4" height="3" rx="1" fill="#fbbf24" />
        </g>

        {/* Logo Text */}
        <text
          x="75"
          y="30"
          className={`fill-white font-black ${titleSize}`}
          style={{
            fontFamily:
              "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            letterSpacing: "-0.5px",
          }}
          strokeWidth="0.5"
          stroke="rgba(0,0,0,0.2)"
        >
          Blogify
        </text>
        <text
          x="75"
          y="48"
          className={`fill-gray-100 font-bold ${taglineSize}`}
          style={{
            fontFamily:
              "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            textShadow: "1px 1px 2px rgba(0,0,0,0.7)",
            letterSpacing: "0.5px",
          }}
          strokeWidth="0.3"
          stroke="rgba(0,0,0,0.3)"
        >
          Share Your Stories
        </text>

        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#fbbf24", stopOpacity: 1 }}
            />
            <stop
              offset="50%"
              style={{ stopColor: "#f59e0b", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#d97706", stopOpacity: 1 }}
            />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#ffffff", stopOpacity: 0.4 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#fbbf24", stopOpacity: 0.8 }}
            />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default Logo;
