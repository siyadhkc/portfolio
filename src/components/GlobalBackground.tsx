import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const GlobalBackground = () => {
  const location = useLocation();
  const isProjectDetail = location.pathname.startsWith('/projects/');
  
  // Track viewport dimensions for responsive displacement scaling
  const [windowWidth, setWindowWidth] = useState(1200);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setWindowWidth(window.innerWidth);
    
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsMobile(!mediaQuery.matches || window.innerWidth < 768);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsMobile(!mediaQuery.matches || window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mouse tracking for reactive spotlight
  const mouseX = useMotionValue(windowWidth / 2);
  const mouseY = useMotionValue(500);

  const springConfig = { damping: 55, stiffness: 50, mass: 2 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  // Parallax offsets (subtle drifting offset for desktop only)
  const deltaX = useTransform(mouseX, [0, windowWidth], [-15, 15]);
  const deltaY = useTransform(mouseY, [0, 2000], [-15, 15]);
  
  const parallaxX = useSpring(deltaX, springConfig);
  const parallaxY = useSpring(deltaY, springConfig);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY + window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, isMobile]);

  return (
    <div className="absolute inset-0 z-[-1] overflow-hidden bg-gradient-to-b from-[#F9F9FB] via-[#EDEFF3] to-[#F9F9FB] pointer-events-none">
      {/* 1. Subtle Clean Light Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.6] pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.012) 1px, transparent 1px)',
          backgroundSize: '64px 64px' 
        }} 
      />

      {/* 2. Base Layer: Drifting Soft Luxury Pastel Gradient Mesh Orbs */}
      {isMobile ? (
        // Mobile-Optimized: Single CSS radial-gradient mesh background. NO blurs, NO animation loops, NO GPU lag!
        <div 
          className="absolute inset-0 opacity-[0.65] pointer-events-none bg-[radial-gradient(circle_at_20%_20%,hsla(263,90%,94%,0.8)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,hsla(14,90%,94%,0.8)_0%,transparent_50%),radial-gradient(circle_at_85%_15%,hsla(174,70%,93%,0.7)_0%,transparent_40%),radial-gradient(circle_at_15%_75%,hsla(35,80%,94%,0.6)_0%,transparent_45%)]"
        />
      ) : (
        // Desktop version with premium CSS float animations + smooth parallax
        <motion.div 
          style={{ x: parallaxX, y: parallaxY }}
          className={`absolute inset-0 transition-opacity duration-1000 ${isProjectDetail ? 'opacity-[0.25]' : 'opacity-100'}`}
        >
          {/* Soft Lavender-Lilac Blob (Top Left) */}
          <div 
            className="absolute -top-[15%] -left-[10%] w-[65vw] h-[65vw] rounded-full bg-[radial-gradient(circle_at_center,hsla(263,90%,94%,0.5)_0%,hsla(263,90%,94%,0.15)_60%,transparent_100%)] blur-[110px] animate-blob-1 pointer-events-none"
          />

          {/* Soft Peach-Rose Blob (Bottom Right) */}
          <div 
            className="absolute -bottom-[15%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(circle_at_center,hsla(14,90%,94%,0.45)_0%,hsla(14,90%,94%,0.12)_60%,transparent_100%)] blur-[120px] animate-blob-2 pointer-events-none"
          />

          {/* Soft Mint-Teal Blob (Top Right) */}
          <div 
            className="absolute top-[10%] -right-[15%] w-[55vw] h-[55vw] rounded-full bg-[radial-gradient(circle_at_center,hsla(174,80%,93%,0.4)_0%,hsla(174,80%,93%,0.1)_60%,transparent_100%)] blur-[100px] animate-blob-3 pointer-events-none"
          />

          {/* Soft Champagne-Gold Shimmer (Center-Left) */}
          <div 
            className="absolute top-[40%] -left-[15%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle_at_center,hsla(35,80%,94%,0.35)_0%,hsla(35,80%,94%,0.08)_60%,transparent_100%)] blur-[90px] animate-blob-4 pointer-events-none"
          />
        </motion.div>
      )}

      {/* 3. Mouse-Following Reactive Spotlight Overlay (Ultra-Soft White Glow) - Desktop Only */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            style={{
              x: glowX,
              y: glowY,
              translateX: '-50%',
              translateY: '-50%',
            }}
            className={`absolute w-[40vw] h-[40vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4)_0%,rgba(168,85,247,0.02)_40%,transparent_100%)] blur-[90px] transition-opacity duration-1000 pointer-events-none ${isProjectDetail ? 'opacity-[0.15]' : 'opacity-100'}`}
          />
        </div>
      )}

      {/* 4. Fine Organic Vector Mesh Lines (Muted Soft Dark Gradients) - Optimized Opacity */}
      <div className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${isProjectDetail ? 'opacity-[0.03]' : 'opacity-[0.18]'}`}>
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="vector-grad-cyan" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38d9f5" stopOpacity="0" />
              <stop offset="50%" stopColor="#38d9f5" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#38d9f5" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="vector-grad-orange" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f47c54" stopOpacity="0" />
              <stop offset="50%" stopColor="#f47c54" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#f47c54" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="vector-grad-purple" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          <g className="animate-float-slow">
            <path d="M-100,250 C150,450 450,50 1100,550" fill="none" stroke="url(#vector-grad-cyan)" strokeWidth="0.8" />
            <path d="M-50,650 C250,350 750,850 1050,450" fill="none" stroke="url(#vector-grad-orange)" strokeWidth="0.6" strokeDasharray="5 10" />
            <path d="M150,-100 C350,250 50,650 550,1100" fill="none" stroke="url(#vector-grad-purple)" strokeWidth="0.5" />
          </g>
        </svg>
      </div>

      {/* 5. Premium Textured Grain Overlay */}
      <div
        className="absolute inset-0 mix-blend-overlay pointer-events-none opacity-[0.02]"
        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.95\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }}
      />
      
      {/* 6. Base Space Absorbing Gradient Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F9F9FB] pointer-events-none" />
    </div>
  );
};
