import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface ParallaxTiltProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // Maximum tilt angle in degrees
  perspective?: number; // Perspective distance in pixels
}

export const ParallaxTilt: React.FC<ParallaxTiltProps> = ({
  children,
  className = '',
  maxTilt = 8, // Sophisticated, non-aggressive subtle luxury tilt
  perspective = 1000,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Detect hardware mouse pointer capability (fine input device) vs touch screens
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsMobile(!mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(!e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Normalised motion values tracking mouse coordinates relative to card (-0.5 to 0.5)
  const rotateXValue = useMotionValue(0);
  const rotateYValue = useMotionValue(0);

  // Ultra-responsive, smooth springs mimicking weight and physical inertia
  const springConfig = { damping: 26, stiffness: 220, mass: 0.65 };
  const springRotateX = useSpring(rotateXValue, springConfig);
  const springRotateY = useSpring(rotateYValue, springConfig);

  // Map normal offsets into rotation degrees
  const rotateX = useTransform(springRotateX, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(springRotateY, [-0.5, 0.5], [-maxTilt, maxTilt]);

  // Shiny Glare Overlay Position coordinates (0 to 100)
  const glareXValue = useMotionValue(50);
  const glareYValue = useMotionValue(50);
  const springGlareX = useSpring(glareXValue, springConfig);
  const springGlareY = useSpring(glareYValue, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Track mouse offset from left/top of card
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Map to normalised offsets
    rotateXValue.set((mouseY / height) - 0.5);
    rotateYValue.set((mouseX / width) - 0.5);

    // Set interactive glare target coordinates
    glareXValue.set((mouseX / width) * 100);
    glareYValue.set((mouseY / height) * 100);
  };

  const handleMouseEnter = () => {
    if (isMobile) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Smoothly snap back card tilt and glare to center
    rotateXValue.set(0);
    rotateYValue.set(0);
    glareXValue.set(50);
    glareYValue.set(50);
  };

  // Convert glare spring percent coordinate into dynamic radial-gradient overlay
  const glareBackground = useTransform(
    [springGlareX, springGlareY],
    ([x, y]) => `radial-gradient(400px circle at ${x}% ${y}%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 40%, transparent 65%)`
  );

  // Return flat layout on touch screens to conserve CPU and preserve standard responsive scroll
  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        perspective: `${perspective}px`,
      }}
      className={`relative ${className}`}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="w-full h-full relative"
      >
        {/* Silky light glare sweep following cursor on card top layer */}
        <motion.div
          style={{
            background: glareBackground,
            opacity: isHovered ? 1 : 0,
            pointerEvents: 'none',
            borderRadius: 'inherit',
            zIndex: 35,
          }}
          className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
        />
        
        {children}
      </motion.div>
    </motion.div>
  );
};

export default ParallaxTilt;
