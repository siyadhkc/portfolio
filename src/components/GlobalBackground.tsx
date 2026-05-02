import React from 'react';
import { useLocation } from 'react-router-dom';

export const GlobalBackground = () => {
  const location = useLocation();
  const isProjectDetail = location.pathname.startsWith('/projects/');

  return (
    <div className="absolute inset-0 z-[-1] overflow-hidden bg-[#FAF9F6]">
      {/* 0. Top Color Injection - Always present but lighter on mobile */}
      <div className={`absolute top-0 left-0 right-0 h-[40vh] sm:h-[50vh] bg-gradient-to-b from-[#1D91A1]/[0.04] to-transparent pointer-events-none transition-opacity duration-500 ${isProjectDetail ? 'opacity-30' : 'opacity-100'}`} />

      {/* 1. Base Layer: Soft Mesh Gradient - Optimized for Mobile */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${isProjectDetail ? 'opacity-[0.18]' : 'opacity-60'}`}>
        {/* Simplified for Mobile (No blurs > 20px) - Increased opacity for visibility */}
        <div className="md:hidden absolute inset-0 bg-gradient-to-tr from-[#1D91A1]/[0.12] via-transparent to-[#E57A44]/[0.12] pointer-events-none" />
        
        {/* Full Effects for Desktop Only */}
        <div className="hidden md:block">
          <div className="absolute -top-[15%] -left-[5%] w-[80vw] h-[80vw] rounded-full bg-[#1D91A1]/[0.18] blur-[100px] animate-pulse" style={{ animationDuration: '15s' }} />
          <div className="absolute -bottom-[10%] -right-[5%] w-[85vw] h-[85vw] rounded-full bg-[#E57A44]/[0.22] blur-[120px] animate-pulse" style={{ animationDuration: '18s', animationDelay: '2s' }} />
          <div className="absolute top-[25%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-[#1D91A1]/[0.08] blur-[90px]" />
          <div className="absolute top-[55%] -left-[15%] w-[45vw] h-[45vw] rounded-full bg-[#E57A44]/[0.1] blur-[110px]" />
        </div>
      </div>

      {/* 2. Middle Layer: Fine Organic Lines - Desktop Only */}
      <div className={`hidden md:block absolute inset-0 transition-opacity duration-500 pointer-events-none ${isProjectDetail ? 'opacity-[0.12]' : 'opacity-40'}`}>
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="line-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1D91A1" stopOpacity="0" />
              <stop offset="50%" stopColor="#1D91A1" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#1D91A1" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="line-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E57A44" stopOpacity="0" />
              <stop offset="50%" stopColor="#E57A44" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#E57A44" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="line-grad-3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2B302F" stopOpacity="0" />
              <stop offset="50%" stopColor="#2B302F" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#2B302F" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          <g className="animate-float-slow">
            <path d="M-100,250 C150,450 450,50 1100,550" fill="none" stroke="url(#line-grad-1)" strokeWidth="0.8" />
            <path d="M-50,650 C250,350 750,850 1050,450" fill="none" stroke="url(#line-grad-2)" strokeWidth="0.5" strokeDasharray="4 8" />
            <path d="M150,-100 C350,250 50,650 550,1100" fill="none" stroke="url(#line-grad-3)" strokeWidth="0.3" />
          </g>
        </svg>
      </div>

      {/* 3. Top Layer: High-Frequency Tactile Noise (Grain) - Desktop Only */}
      <div
        className={`hidden md:block absolute inset-0 transition-opacity duration-700 mix-blend-overlay pointer-events-none ${isProjectDetail ? 'opacity-[0.05]' : 'opacity-[0.25]'}`}
        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.75\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }}
      />
      
      {/* 4. Bottom Vignette for Scroll Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FAF9F6]/80 pointer-events-none" />
    </div>
  );
};
