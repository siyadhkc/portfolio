import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github } from 'lucide-react';

const TechParticle = ({ className, delay = 0, color = "#1D91A1", isHovered, type = 'circle' }: { className: string, delay?: number, color?: string, isHovered: boolean, type?: 'circle' | 'square' | 'cross' }) => (
  <motion.div
    className={`absolute pointer-events-none z-0 ${className}`}
    initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
    animate={isHovered ? { 
      scale: 1, 
      opacity: 0.4, 
      x: (Math.random() - 0.5) * 40, 
      y: (Math.random() - 0.5) * 40,
      rotate: 45 
    } : { scale: 0, opacity: 0, x: 0, y: 0 }}
    transition={{ type: "spring", stiffness: 80, damping: 12, delay }}
  >
    <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" stroke={color} strokeWidth="1.5">
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

  // Stable callback
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div id="hero" role="banner" aria-label="Hero Section" style={{ scrollSnapAlign: 'start' }} className="relative pt-[110px] pb-16 lg:pt-[140px] lg:pb-20 flex flex-col items-center min-h-[65vh]">

      {/* Content */}
      <div className="relative z-10 w-full max-w-[900px] mx-auto px-6 text-center flex flex-col items-center mt-6 md:mt-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-[11px] md:text-[13px] tracking-[0.3em] text-[#8A8A85] uppercase mb-4"
        >
          Python Developer & Security Researcher
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-hero font-black uppercase text-[3.8rem] sm:text-[3.8rem] md:text-[5.5rem] lg:text-[8.2rem] tracking-tight leading-[0.9] text-[#333333] mb-6"
        >
          Siyadh kc<br />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#5B5F5D] font-sans text-base sm:text-lg md:text-[22px] mb-10 md:mb-12 max-w-[700px] leading-relaxed mx-auto text-balance px-4 opacity-80"
        >
         <span className="italic font-light opacity-90 font-serif">I break things to build them better.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-row items-center gap-3 sm:gap-6 w-full max-w-[420px] sm:max-w-none sm:w-auto px-4 sm:px-0"
        >
          <div className="relative flex-1 sm:flex-none flex items-center justify-center">
            {/* Tech Particles for Primary Button - Hidden on Mobile for Performance */}
            <div className="hidden md:block">
              <TechParticle isHovered={hoveredButton === 'work'} className="-top-6 -left-4 w-6 h-6 sm:w-8 sm:h-8" type="circle" delay={0.05} color="#1D91A1" />
              <TechParticle isHovered={hoveredButton === 'work'} className="-top-10 right-0 w-5 h-5 sm:w-6 sm:h-6" type="cross" delay={0.15} color="#1D91A1" />
              <TechParticle isHovered={hoveredButton === 'work'} className="-bottom-6 left-2 w-4 h-4 sm:w-5 sm:h-5" type="circle" delay={0.2} color="#1D91A1" />
            </div>
            
            <motion.button
              onMouseEnter={() => setHoveredButton('work')}
              onMouseLeave={() => setHoveredButton(null)}
              onTouchStart={() => setHoveredButton('work')}
              onTouchEnd={() => setHoveredButton(null)}
              onClick={() => scrollTo('projects')}
              whileHover={{ y: -5, scale: 1.02, transition: { type: "spring", stiffness: 400, damping: 10 } }}
              whileTap={{ scale: 0.96 }}
              className="group flex-1 sm:flex-none flex items-center gap-2 sm:gap-4 bg-[#0A0E17] transition-colors text-white px-5 sm:px-10 py-4 sm:py-5 rounded-full font-sans text-[14px] sm:text-[16px] font-semibold shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 justify-center relative overflow-hidden z-10"
            >
              <span className="absolute inset-0 shimmer-sweep pointer-events-none" aria-hidden="true" />
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 whitespace-nowrap">View Work</span>
              <ArrowRight className="w-4 h-4 relative z-10 hidden xs:block transition-transform group-hover:translate-x-1" />
            </motion.button>
          </div>

          <div className="relative flex-1 sm:flex-none flex items-center justify-center">
            {/* Tech Particles for GitHub Button - Hidden on Mobile for Performance */}
            <div className="hidden md:block">
              <TechParticle isHovered={hoveredButton === 'github'} className="-top-8 -right-4 w-6 h-6 sm:w-7 sm:h-7" type="square" delay={0.1} color="#E57A44" />
              <TechParticle isHovered={hoveredButton === 'github'} className="-bottom-6 right-2 w-5 h-5 sm:w-6 sm:h-6" type="circle" delay={0.25} color="#E57A44" />
              <TechParticle isHovered={hoveredButton === 'github'} className="-bottom-8 left-0 w-4 h-4 sm:w-5 sm:h-5" type="square" delay={0.15} color="#E57A44" />
            </div>

            <motion.a
              onMouseEnter={() => setHoveredButton('github')}
              onMouseLeave={() => setHoveredButton(null)}
              onTouchStart={() => setHoveredButton('github')}
              onTouchEnd={() => setHoveredButton(null)}
              href="https://github.com/siyadhkc"
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -5, scale: 1.02, transition: { type: "spring", stiffness: 400, damping: 10 } }}
              whileTap={{ scale: 0.96 }}
              className="flex-1 sm:flex-none flex items-center gap-2 sm:gap-4 bg-white/60 backdrop-blur-xl hover:bg-white/80 transition-all text-[#131313] px-5 sm:px-10 py-4 sm:py-5 rounded-full font-sans text-[14px] sm:text-[16px] font-semibold shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-white/60 justify-center whitespace-nowrap z-10"
            >
              <Github className="w-4 h-4" /> GitHub
            </motion.a>
          </div>
        </motion.div>
      </div>

    </div>
  );
};
