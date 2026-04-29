import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github } from 'lucide-react';

export const Hero = () => {
  // Stable callback
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div id="hero" role="banner" aria-label="Hero Section" className="relative pt-[110px] pb-16 lg:pt-[140px] lg:pb-20 overflow-hidden flex flex-col items-center min-h-[75vh]">

      {/* Background */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#F7F7F2]">
        <div className="absolute -top-[10%] -left-[30%] md:-top-[20%] md:-left-[10%] w-[150vw] h-[150vw] md:w-[70vw] md:h-[70vw] rounded-full bg-[#1D91A1]/10 blur-[80px] md:blur-[120px] mix-blend-multiply" />
        <div className="absolute top-[20%] -right-[40%] md:top-[10%] md:-right-[10%] w-[120vw] h-[120vw] md:w-[60vw] md:h-[60vw] rounded-full bg-[#E57A44]/15 blur-[80px] md:blur-[120px] mix-blend-multiply" />

        <svg
          className="absolute inset-0 w-[250%] sm:w-[150%] md:w-full h-full md:h-[150%] left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 opacity-40 pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M-50,60 Q50,40 150,80" fill="none" stroke="#2B302F" strokeWidth="0.05" />
          <path d="M-20,40 Q40,100 120,20" fill="none" stroke="#1D91A1" strokeWidth="0.05" />
          <path d="M-10,20 Q60,-10 100,50" fill="none" stroke="#E57A44" strokeWidth="0.05" />
        </svg>

        {/* Noise overlay */}
        <div
          className="absolute inset-0 opacity-[0.35] mix-blend-color-burn pointer-events-none"
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.85\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[900px] mx-auto px-6 text-center flex flex-col items-center mt-6 md:mt-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-[11px] md:text-[13px] tracking-[0.3em] text-[#8A8A85] uppercase mb-4"
        >
          Full-Stack Developer | Web & API Security Specialist
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-[2.8rem] sm:text-[3.8rem] md:text-[5.5rem] lg:text-[6.2rem] tracking-tight leading-[0.9] text-[#131313] mb-6"
        >
          siyadhkc<br />
          <span className="italic font-light opacity-60">Architecting scale.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#5B5F5D] font-sans text-base sm:text-lg md:text-[22px] mb-10 md:mb-12 max-w-[700px] leading-relaxed mx-auto text-balance px-4 opacity-80"
        >
          Building secure, high-performance backends. I bridge enterprise infrastructure with offensive security research to harden systems from the core.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto px-4 sm:px-0"
        >
          <motion.button
            onClick={() => scrollTo('projects')}
            whileHover={{ y: -2, backgroundColor: 'rgba(10,14,23,0.95)' }}
            whileTap={{ scale: 0.97 }}
            className="group flex items-center gap-4 bg-[#0A0E17]/90 backdrop-blur-xl hover:bg-black transition-all text-white px-8 sm:px-10 py-4 rounded-full font-sans text-[15px] sm:text-[16px] font-medium shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-white/10 w-full sm:w-auto justify-center relative overflow-hidden"
          >
            {/* CSS shimmer — runs on compositor thread, no JS repeat loop */}
            <span className="absolute inset-0 shimmer-sweep pointer-events-none" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10">View Work</span>
            <motion.div whileHover={{ x: 5 }} className="transition-transform relative z-10">
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </motion.button>

          <motion.a
            href="https://github.com/siyadhkc"
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -2, backgroundColor: 'rgba(255,255,255,0.8)' }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-4 bg-white/40 backdrop-blur-xl hover:bg-white/60 transition-all text-[#131313] px-8 sm:px-10 py-4 rounded-full font-sans text-[15px] sm:text-[16px] font-medium shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-white/40 w-full sm:w-auto justify-center"
          >
            <Github className="w-4 h-4" /> GitHub
          </motion.a>
        </motion.div>
      </div>

    </div>
  );
};
