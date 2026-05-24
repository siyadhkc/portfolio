import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Github } from 'lucide-react';

// ── Magnetic Button wrapper using spring physics for ultra-premium hover ──
interface MagneticProps {
  children: React.ReactNode;
  className?: string;
}

const Magnetic = ({ children }: MagneticProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for magnetic pull
  const springX = useSpring(x, { stiffness: 120, damping: 12 });
  const springY = useSpring(y, { stiffness: 120, damping: 12 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.35);
    y.set((clientY - centerY) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="relative"
    >
      {children}
    </motion.div>
  );
};

const TechParticle = ({ className, delay = 0, color = "#9F75E3", isHovered, type = 'circle' }: { className: string, delay?: number, color?: string, isHovered: boolean, type?: 'circle' | 'square' | 'cross' }) => (
  <motion.div
    className={`absolute pointer-events-none z-0 ${className}`}
    initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
    animate={isHovered ? { 
      scale: 1.2, 
      opacity: 0.5, 
      x: (Math.random() - 0.5) * 60, 
      y: (Math.random() - 0.5) * 60,
      rotate: 45 
    } : { scale: 0, opacity: 0, x: 0, y: 0 }}
    transition={{ type: "spring", stiffness: 100, damping: 10, delay }}
  >
    <svg viewBox="0 0 24 24" className="w-full h-full animate-spin-slow" fill="none" stroke={color} strokeWidth="1.5">
      {type === 'circle' && <circle cx="12" cy="12" r="8" />}
      {type === 'square' && <rect x="6" y="6" width="12" height="12" />}
      {type === 'cross' && (
        <>
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </>
      )}
    </svg>
  </motion.div>
);

export const Hero = () => {
  const [hoveredButton, setHoveredButton] = React.useState<string | null>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div id="hero" role="banner" aria-label="Hero Section" style={{ scrollSnapAlign: 'start' }} className="relative pt-[120px] pb-16 lg:pt-[150px] lg:pb-24 flex flex-col items-center min-h-[75vh] justify-center overflow-hidden">
      
      {/* Dynamic ambient backdrop light */}
      <div className="absolute top-[20%] w-[350px] h-[350px] rounded-full bg-purple-600/5 blur-[100px] pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[900px] mx-auto px-6 text-center flex flex-col items-center">
        
        {/* Role label — simple & clean */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2.5 mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#F6B794] inline-block" />
          <span className="font-mono text-[11px] md:text-[12px] tracking-[0.3em] text-slate-500 uppercase font-semibold">Python Developer</span>
          <span className="text-black/10 text-xs">·</span>
          <span className="font-mono text-[11px] md:text-[12px] tracking-[0.3em] text-slate-500 uppercase font-semibold">Security Researcher</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#8CD4F5] inline-block" />
        </motion.div>

        {/* Big Premium Glowing Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-hero font-black uppercase text-[3.8rem] sm:text-[4.5rem] md:text-[6rem] lg:text-[8rem] tracking-tight leading-[0.9] mb-8 select-none"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-slate-900 via-slate-800 to-slate-500">Siyadh kc</span>
        </motion.h1>

        {/* Smooth descriptive tag */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-slate-600 font-sans text-base sm:text-lg md:text-[21px] mb-12 max-w-[650px] leading-relaxed mx-auto text-balance px-4"
        >
          <span className="italic font-light font-serif text-slate-700">I break things to build them better.</span>
        </motion.p>

        {/* Action CTAs (Magnetic wrapper included) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-row items-center gap-4 sm:gap-6 w-full max-w-[420px] sm:max-w-none sm:w-auto px-4 sm:px-0 justify-center"
        >
          {/* Primary View Work Button */}
          <Magnetic>
            <div className="relative flex items-center justify-center">
              {/* Tech Particles */}
              <div className="hidden md:block">
                <TechParticle isHovered={hoveredButton === 'work'} className="-top-10 -left-6 w-6 h-6" type="circle" delay={0.05} color="#F6B794" />
                <TechParticle isHovered={hoveredButton === 'work'} className="-top-12 right-0 w-5 h-5" type="cross" delay={0.15} color="#D4B8FC" />
                <TechParticle isHovered={hoveredButton === 'work'} className="-bottom-8 left-2 w-4 h-4" type="circle" delay={0.2} color="#8CD4F5" />
              </div>
              
              <motion.button
                onMouseEnter={() => setHoveredButton('work')}
                onMouseLeave={() => setHoveredButton(null)}
                onTouchStart={() => setHoveredButton('work')}
                onTouchEnd={() => setHoveredButton(null)}
                onClick={() => scrollTo('projects')}
                whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(15,23,42,0.12)' }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-3 bg-slate-900 text-white transition-all px-6 sm:px-10 py-4 sm:py-4.5 rounded-full font-sans text-[14px] sm:text-[15px] font-bold shadow-[0_8px_32px_rgba(15,23,42,0.1)] justify-center relative overflow-hidden z-10 min-w-[150px] border border-transparent hover:bg-slate-800"
              >
                <span className="absolute inset-0 shimmer-sweep pointer-events-none" aria-hidden="true" />
                <span className="relative z-10 whitespace-nowrap">View Work</span>
                <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </div>
          </Magnetic>

          {/* Secondary GitHub Button */}
          <Magnetic>
            <div className="relative flex items-center justify-center">
              {/* Tech Particles */}
              <div className="hidden md:block">
                <TechParticle isHovered={hoveredButton === 'github'} className="-top-10 -right-6 w-6 h-6" type="square" delay={0.1} color="#8CD4F5" />
                <TechParticle isHovered={hoveredButton === 'github'} className="-bottom-10 right-2 w-5 h-5" type="circle" delay={0.25} color="#D4B8FC" />
                <TechParticle isHovered={hoveredButton === 'github'} className="-bottom-8 left-0 w-4 h-4" type="square" delay={0.15} color="#F6B794" />
              </div>

              <motion.a
                onMouseEnter={() => setHoveredButton('github')}
                onMouseLeave={() => setHoveredButton(null)}
                onTouchStart={() => setHoveredButton('github')}
                onTouchEnd={() => setHoveredButton(null)}
                href="https://github.com/siyadhkc"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.03, boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-3 bg-black/[0.02] hover:bg-black/[0.05] transition-all text-slate-800 px-6 sm:px-10 py-4 sm:py-4.5 rounded-full font-sans text-[14px] sm:text-[15px] font-bold shadow-[0_4px_12px_rgba(0,0,0,0.01)] border border-black/[0.08] hover:border-[#9F75E3]/30 justify-center whitespace-nowrap z-10 min-w-[150px]"
              >
                <Github className="w-4 h-4 text-[#9F75E3]" /> GitHub
              </motion.a>
            </div>
          </Magnetic>
        </motion.div>
      </div>

      {/* Smooth Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.7, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-6 flex flex-col items-center gap-1.5 cursor-pointer pointer-events-none select-none"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-slate-400 font-bold">Scroll</span>
        <div className="w-[1.5px] h-8 bg-gradient-to-b from-[#F6B794] via-[#D4B8FC] to-transparent" />
      </motion.div>
    </div>
  );
};
