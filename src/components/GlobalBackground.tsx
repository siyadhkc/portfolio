import React from 'react';

export const GlobalBackground = () => {
  return (
    <div
      className="fixed inset-0 z-[-1] pointer-events-none select-none overflow-hidden"
      style={{ backgroundColor: '#08080e' }}
      aria-hidden="true"
    >
      {/* ── Layer 1: Primary indigo/violet glow — top-left anchor ── */}
      <div
        className="absolute"
        style={{
          top: '-10%',
          left: '-10%',
          width: '70%',
          height: '70%',
          background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.22) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* ── Layer 2: Cyan glow — bottom-right anchor ── */}
      <div
        className="absolute"
        style={{
          bottom: '-10%',
          right: '-10%',
          width: '70%',
          height: '70%',
          background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.20) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* ── Layer 3: Subtle centre fuchsia haze — ties the two ends together ── */}
      <div
        className="absolute"
        style={{
          top: '30%',
          left: '30%',
          width: '40%',
          height: '40%',
          background: 'radial-gradient(ellipse at center, rgba(236, 72, 153, 0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* ── Grain texture — static SVG noise for tactile depth ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: '200px 200px',
          opacity: 0.045,
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  );
};

export default GlobalBackground;
