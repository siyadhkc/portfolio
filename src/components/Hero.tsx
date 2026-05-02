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
    <div id="hero" role="banner" aria-label="Hero Section" className="relative pt-[110px] pb-16 lg:pt-[140px] lg:pb-20 flex flex-col items-center min-h-[55vh]">

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
          {/* <span className="italic font-light opacity-60 font-serif">I break things to build them better.</span> */}
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
