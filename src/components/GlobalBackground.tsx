import React from 'react';
import { useTheme } from './ThemeContext';

export const GlobalBackground = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      className="fixed inset-0 z-[-1] pointer-events-none select-none overflow-hidden"
      style={{ backgroundColor: isDark ? '#0a0a0f' : '#FCFDF6' }}
      aria-hidden="true"
    >
      {isDark ? (
        <>
          {/* Very subtle top-left warm glow */}
          <div style={{
            position: 'absolute',
            top: '-30%', left: '-20%',
            width: '70%', height: '70%',
            background: 'radial-gradient(ellipse at 35% 35%, rgba(120,100,200,0.05) 0%, transparent 70%)',
            filter: 'blur(80px)',
            willChange: 'transform',
            transform: 'translateZ(0)',
          }} />
          {/* Very subtle bottom-right cool glow */}
          <div style={{
            position: 'absolute',
            bottom: '-20%', right: '-20%',
            width: '65%', height: '65%',
            background: 'radial-gradient(ellipse at 70% 70%, rgba(80,120,180,0.04) 0%, transparent 70%)',
            filter: 'blur(90px)',
            willChange: 'transform',
            transform: 'translateZ(0)',
          }} />
        </>
      ) : (
        <>
          {/* Very subtle cool-neutral top glow */}
          <div style={{
            position: 'absolute',
            top: '-20%', left: '-10%',
            width: '65%', height: '65%',
            background: 'radial-gradient(ellipse at 35% 35%, rgba(251,251,247,0.78) 0%, transparent 70%)',
            filter: 'blur(90px)',
            willChange: 'transform',
            transform: 'translateZ(0)',
          }} />
          {/* Very subtle warm-neutral bottom-right glow */}
          <div style={{
            position: 'absolute',
            bottom: '-20%', right: '-10%',
            width: '60%', height: '60%',
            background: 'radial-gradient(ellipse at 70% 70%, rgba(252,253,246,0.7) 0%, transparent 70%)',
            filter: 'blur(90px)',
            willChange: 'transform',
            transform: 'translateZ(0)',
          }} />
        </>
      )}
    </div>
  );
};

export default GlobalBackground;
