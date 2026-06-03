import React from 'react';
import { ArrowRight, Github } from 'lucide-react';

export const Hero = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      role="banner" 
      aria-label="Hero Section" 
      className="relative pt-[140px] pb-16 lg:pt-[180px] lg:pb-24 flex flex-col items-center min-h-[70vh] justify-center overflow-hidden bg-transparent"
    >
      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[800px] mx-auto px-6 text-center flex flex-col items-center">
        
        {/* Role labels - Clean technical layout */}
        <div className="flex items-center gap-3 mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-500 uppercase font-semibold">
          <span>[ Python Developer ]</span>
          <span className="text-zinc-700">·</span>
          <span>[ Security Researcher ]</span>
        </div>

        {/* Clean, high-contrast headline with premium metallic gradient */}
        <h1 className="font-sans font-extrabold uppercase text-[3.2rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[7rem] tracking-tight leading-[0.95] mb-6 bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent selection:bg-zinc-800">
          Siyadh kc
        </h1>

        {/* Technical descriptor */}
        <p className="text-zinc-400 font-sans text-base sm:text-lg md:text-[19px] mb-10 max-w-[600px] leading-relaxed mx-auto">
          I build high-performance backend systems and research web vulnerabilities.
          <span className="block mt-2 font-mono text-zinc-500 text-sm">Focusing on zero-trust architectures and API security.</span>
        </p>

        {/* Action CTAs - Fast and minimal flat design */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center">
          {/* Primary Button */}
          <button
            onClick={() => scrollTo('projects')}
            className="w-full sm:w-auto group flex items-center justify-center gap-3 bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-400 hover:to-cyan-400 text-zinc-950 px-8 py-3.5 rounded-lg font-mono text-[12px] uppercase tracking-wider font-bold shadow-[0_0_15px_rgba(139,92,246,0.15)] hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300"
          >
            <span>View Work</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          {/* Secondary Button */}
          <a
            href="https://github.com/siyadhkc"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 px-8 py-3.5 rounded-lg font-mono text-[12px] uppercase tracking-wider font-bold transition-colors"
          >
            <Github className="w-4 h-4 text-cyan-400" />
            <span>GitHub</span>
          </a>
        </div>
      </div>

      {/* Smooth Scroll Indicator (Quiet static layout) */}
      <div className="absolute bottom-8 flex flex-col items-center gap-2 select-none pointer-events-none opacity-40">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Scroll Down</span>
        <div className="w-[1px] h-6 bg-zinc-800" />
      </div>
    </section>
  );
};

export default Hero;
