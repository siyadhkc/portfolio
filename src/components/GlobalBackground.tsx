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
          top: '-15%',
          left: '-15%',
          width: '75%',
          height: '75%',
          background: 'radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.28) 0%, rgba(99, 102, 241, 0.14) 50%, transparent 80%)',
          filter: 'blur(45px)',
        }}
      />

      {/* ── Layer 2: Cyan glow — bottom-right anchor ── */}
      <div
        className="absolute"
        style={{
          bottom: '-15%',
          right: '-15%',
          width: '75%',
          height: '75%',
          background: 'radial-gradient(circle at 70% 70%, rgba(6, 182, 212, 0.26) 0%, rgba(8, 145, 178, 0.12) 50%, transparent 80%)',
          filter: 'blur(45px)',
        }}
      />

      {/* ── Layer 3: Subtle centre fuchsia haze — ties the two ends together ── */}
      <div
        className="absolute"
        style={{
          top: '25%',
          left: '25%',
          width: '50%',
          height: '50%',
          background: 'radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.14) 0%, rgba(219, 39, 119, 0.06) 50%, transparent 80%)',
          filter: 'blur(55px)',
        }}
      />

      {/* ── Layer 4: Pink/rose glow — bottom-left anchor ── */}
      <div
        className="absolute"
        style={{
          bottom: '-10%',
          left: '-10%',
          width: '50%',
          height: '50%',
          background: 'radial-gradient(circle at 20% 80%, rgba(244, 63, 94, 0.12) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      {/* ── Grain texture — static SVG noise for tactile depth ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: '200px 200px',
          opacity: 0.095,
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  );
};

export default GlobalBackground;
