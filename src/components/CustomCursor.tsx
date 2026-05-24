import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor = () => {
  const [isMobile, setIsMobile] = useState(true);
  const [hoverLabel, setHoverLabel] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const originalCursor = useRef<string | null>(null);

  // DOM Refs
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  // Coordinates for smooth interpolation
  const mouseCoords = useRef({ x: -100, y: -100 });
  const ringCoords = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsMobile(!mediaQuery.matches);

    const handleMediaChange = (event: MediaQueryListEvent) => {
      setIsMobile(!event.matches);
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  useEffect(() => {
    if (isMobile) return;

    // Track mouse coordinates directly on window mousemove
    const handleMouseMove = (event: MouseEvent) => {
      mouseCoords.current.x = event.clientX;
      mouseCoords.current.y = event.clientY;
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => {
      setIsHovering(false);
      setHoverLabel('');
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest('a, button, [role="button"], input, select, textarea, [data-cursor-label]') as HTMLElement | null;
      if (interactive) {
        setIsHovering(true);
        setHoverLabel(interactive.dataset.cursorLabel ?? '');
      }
    };

    const handleMouseOut = (event: MouseEvent) => {
      const related = event.relatedTarget as HTMLElement | null;
      if (!related || !related.closest('a, button, [role="button"], input, select, textarea, [data-cursor-label]')) {
        setIsHovering(false);
        setHoverLabel('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Bypassing React render cycle for position tracking using requestAnimationFrame (RAF)
    let animationFrameId: number;
    const updateCursor = () => {
      const { x: mX, y: mY } = mouseCoords.current;
      const { x: rX, y: rY } = ringCoords.current;

      // 1. Instantly update inner dot position (0 latency tracking)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mX}px, ${mY}px, 0) translate3d(-50%, -50%, 0)`;
      }

      // 2. Smoothly interpolate outer ring position (luxury damping effect)
      const ease = 0.18; 
      const nextX = rX + (mX - rX) * ease;
      const nextY = rY + (mY - rY) * ease;
      ringCoords.current.x = nextX;
      ringCoords.current.y = nextY;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${nextX}px, ${nextY}px, 0) translate3d(-50%, -50%, 0)`;
      }

      // 3. Keep label positioned right above mouse cursor
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${mX}px, ${mY}px, 0) translate3d(-50%, -160%, 0)`;
      }

      animationFrameId = requestAnimationFrame(updateCursor);
    };

    // Initialize coordinate positions to prevent sudden snap from -100
    const handleFirstMove = (e: MouseEvent) => {
      mouseCoords.current.x = e.clientX;
      mouseCoords.current.y = e.clientY;
      ringCoords.current.x = e.clientX;
      ringCoords.current.y = e.clientY;
      window.removeEventListener('mousemove', handleFirstMove);
      // Start the RAF loop
      animationFrameId = requestAnimationFrame(updateCursor);
    };
    window.addEventListener('mousemove', handleFirstMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleFirstMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  // Hide system cursor
  useEffect(() => {
    if (isMobile) return;
    originalCursor.current = document.body.style.cursor;
    document.body.style.cursor = 'none';

    return () => {
      if (originalCursor.current !== null) {
        document.body.style.cursor = originalCursor.current;
      }
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* 1. Inner dot - instant response */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-slate-900 pointer-events-none transition-transform duration-100 ease-out will-change-transform"
        style={{
          transform: 'translate3d(-100px, -100px, 0)',
          scale: isClicking ? 0.7 : isHovering ? 0.4 : 1,
          opacity: isHovering && hoverLabel ? 0.15 : 1,
        }}
      />

      {/* 2. Outer Ring - smooth damping outline */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-slate-900/30 bg-slate-900/[0.02] pointer-events-none transition-transform duration-200 ease-out will-change-transform flex items-center justify-center"
        style={{
          transform: 'translate3d(-100px, -100px, 0)',
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
          borderColor: isHovering ? 'rgba(159, 117, 227, 0.45)' : 'rgba(15, 23, 42, 0.25)',
          backgroundColor: isHovering ? 'rgba(159, 117, 227, 0.06)' : 'rgba(15, 23, 42, 0.01)',
        }}
      />

      {/* 3. Text label for interactive elements */}
      {hoverLabel && (
        <span
          ref={labelRef}
          className="fixed top-0 left-0 z-20 px-3 py-1 rounded-full bg-slate-900 text-white text-[9px] font-bold tracking-[0.24em] uppercase shadow-[0_8px_24px_rgba(15,23,42,0.15)] pointer-events-none transition-opacity duration-200 ease-out"
          style={{
            transform: 'translate3d(-100px, -100px, 0)',
            opacity: hoverLabel ? 1 : 0,
          }}
        >
          {hoverLabel}
        </span>
      )}
    </div>
  );
};

export default CustomCursor;
