import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin } from 'lucide-react';

export const FooterCTA = () => {
  return (
    <div id="contact" className="w-full bg-[#F7F7F2] pb-6 pt-6 md:pt-10 px-2 sm:px-4 md:px-8 relative rounded-b-3xl md:rounded-b-[4rem]">

      {/* The main cinematic dark container */}
      <div className="relative w-full rounded-2xl md:rounded-[3rem] overflow-hidden bg-[#0A0D14] py-16 md:py-32 flex flex-col items-center justify-center shadow-[0_30px_100px_rgba(0,0,0,0.5)] border border-white/10">

        {/* High-End Cosmic Background (Elite Layered CSS) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#020408]">
          {/* Base Cinematic Gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_#0D1B3E_0%,_#020408_100%)] opacity-90"></div>

          {/* Central CSS Glass Sphere (Comet Anchor) focal point */}
          <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.1, 0.15, 0.1]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_#1D91A144_0%,_transparent_70%)] blur-[40px]"
            ></motion.div>
            <div className="absolute inset-[25%] rounded-full border border-white/5 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-[2px] shadow-[inset_0_0_40px_rgba(255,255,255,0.02)]"></div>
          </div>

          {/* Dynamic Vibrant Nebulas */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.6, 0.4],
              rotate: [0, 10, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[10%] -left-[20%] w-[120vw] h-[120vw] rounded-full bg-[radial-gradient(circle,_#1D91A122_0%,_transparent_70%)] blur-[100px]"
          ></motion.div>

          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
              rotate: [0, -15, 0]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-[20%] -right-[10%] w-[100vw] h-[100vw] rounded-full bg-[radial-gradient(circle,_#E57A4411_0%,_transparent_70%)] blur-[120px]"
          ></motion.div>

          <motion.div
            animate={{
              opacity: [0.1, 0.3, 0.1],
              x: [-50, 50, -50]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-0 w-full h-[400px] bg-[radial-gradient(ellipse_at_center,_#7C4DFF08_0%,_transparent_70%)] blur-[80px]"
          ></motion.div>

          {/* Architectural Volumetric Light Leaks */}
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,rgba(29,145,161,0.05)_0%,transparent_50%,rgba(229,122,68,0.03)_100%)]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-[#1D91A1]/10 to-transparent blur-sm"></div>

          {/* Elite Twinkling Starfield (CSS Particles) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="stars-container absolute inset-0 opacity-60">
              <div className="absolute inset-0"
                style={{
                  backgroundImage: `
                    radial-gradient(1.5px 1.5px at 10% 10%, #fff, rgba(0,0,0,0)),
                    radial-gradient(1px 1px at 20% 35%, #fff, rgba(0,0,0,0)),
                    radial-gradient(2px 2px at 30% 20%, #B0E0E6, rgba(0,0,0,0)),
                    radial-gradient(1.2px 1.2px at 45% 70%, #fff, rgba(0,0,0,0)),
                    radial-gradient(1px 1px at 55% 40%, #E57A44, rgba(0,0,0,0)),
                    radial-gradient(1.5px 1.5px at 70% 30%, #fff, rgba(0,0,0,0)),
                    radial-gradient(2px 2px at 85% 65%, #1D91A1, rgba(0,0,0,0)),
                    radial-gradient(1px 1px at 95% 15%, #fff, rgba(0,0,0,0))
                  `,
                  backgroundSize: '500px 500px',
                  animation: 'twinkle 4s infinite ease-in-out'
                }}
              ></div>
              <div className="absolute inset-0 opacity-40 scale-150 rotate-45"
                style={{
                  backgroundImage: `
                    radial-gradient(1px 1px at 15% 15%, #fff, rgba(0,0,0,0)),
                    radial-gradient(2px 2px at 40% 40%, #B0E0E6, rgba(0,0,0,0)),
                    radial-gradient(1.5px 1.5px at 60% 80%, #fff, rgba(0,0,0,0)),
                    radial-gradient(1px 1px at 85% 25%, #E57A44, rgba(0,0,0,0))
                  `,
                  backgroundSize: '400px 400px',
                  animation: 'twinkle 7s infinite ease-in-out reverse'
                }}
              ></div>
            </div>

            <style dangerouslySetInnerHTML={{
              __html: `
              @keyframes twinkle {
                0%, 100% { opacity: 0.3; transform: translateY(0); }
                50% { opacity: 1; transform: translateY(-5px); }
              }
            `}} />
          </div>

          {/* Luxury Film Grain Overlay */}
          <div className="absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }}></div>
        </div>

        {/* Content overlapping space background */}
        <div className="relative z-10 w-full max-w-[800px] mx-auto px-4 sm:px-6 flex flex-col items-center">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center mb-10 md:mb-16"
          >
            <h2 className="font-serif text-[3.5rem] sm:text-[5rem] md:text-[7rem] text-white tracking-[-0.03em] leading-[1] mb-8 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">Get in touch</h2>
            <p className="text-[#A1A1A1] font-sans text-base md:text-xl px-4 max-w-[500px] leading-relaxed">Available for architecture auditing and high-scale systems consulting.</p>
          </motion.div>

          {/* Contact Layout Container */}
          <div className="w-full">
            {/* Professional Desktop/Tablet Grid */}
            <div className="hidden sm:grid grid-cols-2 gap-px bg-white/10 rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden border border-white/10">
              <div className="relative group/email">
                <a href="mailto:siyadhkc@gmail.com"
                  className="bg-[#0A0D14]/80 hover:bg-[#111621]/90 transition-all duration-700 p-8 md:p-12 flex flex-col items-start gap-4 group h-full">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center relative group-hover/email:border-[#1D91A1]/40 group-hover/email:bg-[#1D91A1]/10 transition-all duration-500 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1D91A1]/20 to-transparent opacity-0 group-hover/email:opacity-100 transition-opacity duration-500"></div>
                    <Mail className="w-5 h-5 text-[#1D91A1] relative z-10 group-hover/email:scale-110 group-hover/email:text-white transition-all duration-500" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-[#8A8A85] uppercase">Direct Email</span>
                    <span className="text-white text-lg md:text-xl font-medium tracking-tight">siyadhkc@gmail.com</span>
                  </div>
                  <p className="text-[#5B5F5D] text-sm font-sans mt-2 opacity-40 group-hover/email:opacity-100 transition-opacity duration-500 leading-relaxed max-w-[200px]">Available for architecture & scale consulting.</p>
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText('siyadhkc@gmail.com');
                    const toast = document.getElementById('copy-toast');
                    if (toast) {
                      toast.innerText = 'Email copied!';
                      toast.classList.remove('opacity-0');
                      setTimeout(() => toast.classList.add('opacity-0'), 2000);
                    }
                  }}
                  className="absolute top-6 right-6 text-[#8A8A85] hover:text-[#1D91A1] transition-colors p-2"
                  title="Copy to clipboard"
                >
                  <div id="copy-toast" className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1D91A1] text-white text-[10px] px-2 py-1 rounded opacity-0 transition-opacity whitespace-nowrap pointer-events-none text-center min-w-[80px]"></div>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                  </svg>
                </button>
              </div>

              <a href="https://github.com/siyadhkc" target="_blank" rel="me noreferrer"
                className="bg-[#0A0D14]/80 hover:bg-[#111621]/90 transition-all duration-700 p-8 md:p-12 flex flex-col items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center relative group-hover:border-[#1D91A1]/40 group-hover:bg-[#1D91A1]/10 transition-all duration-500 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1D91A1]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Github className="w-5 h-5 text-[#1D91A1] relative z-10 group-hover:scale-110 group-hover:text-white transition-all duration-500" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[#8A8A85] uppercase">Source Code</span>
                  <span className="text-white text-lg md:text-xl font-medium tracking-tight">github.com/siyadhkc</span>
                </div>
                <p className="text-[#5B5F5D] text-sm font-sans mt-2 opacity-40 group-hover:opacity-100 transition-opacity duration-500 leading-relaxed max-w-[200px]">Explore core projects and open source.</p>
              </a>

              <a href="https://linkedin.com/in/siyadhkc" target="_blank" rel="me noreferrer"
                className="bg-[#0A0D14]/80 hover:bg-[#111621]/90 transition-all duration-700 p-8 md:p-12 flex flex-col items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center relative group-hover:border-[#1D91A1]/40 group-hover:bg-[#1D91A1]/10 transition-all duration-500 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1D91A1]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Linkedin className="w-5 h-5 text-[#1D91A1] relative z-10 group-hover:scale-110 group-hover:text-white transition-all duration-500" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[#8A8A85] uppercase">Professional</span>
                  <span className="text-white text-lg md:text-xl font-medium tracking-tight">linkedin.com/in/siyadhkc</span>
                </div>
                <p className="text-[#5B5F5D] text-sm font-sans mt-2 opacity-40 group-hover:opacity-100 transition-opacity duration-500 leading-relaxed max-w-[200px]">Connect for professional opportunities.</p>
              </a>

              <a href="https://x.com/siyadhkc" target="_blank" rel="noreferrer"
                className="bg-[#0A0D14]/80 hover:bg-[#111621]/90 transition-all duration-700 p-8 md:p-12 flex flex-col items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center relative group-hover:border-[#1D91A1]/40 group-hover:bg-[#1D91A1]/10 transition-all duration-500 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1D91A1]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <svg className="w-5 h-5 text-[#1D91A1] relative z-10 group-hover:scale-110 group-hover:text-white transition-all duration-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[#8A8A85] uppercase">Network</span>
                  <span className="text-white text-lg md:text-xl font-medium tracking-tight">@siyadhkc</span>
                </div>
                <p className="text-[#5B5F5D] text-sm font-sans mt-2 opacity-40 group-hover:opacity-100 transition-opacity duration-500 leading-relaxed max-w-[200px]">Following the latest in systems & scale.</p>
              </a>
            </div>

            {/* Mobile Vertical Link List (Perplexity/Comet Style) */}
            <div className="flex flex-col items-center sm:hidden w-full gap-10 mt-4 px-4 text-center">
              <div className="flex flex-col items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 mb-2">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <p className="font-mono text-[11px] tracking-[0.2em] text-[#8A8A85] uppercase">Connect With Me</p>
              </div>

              <div className="flex flex-col items-start w-full gap-5 pl-10">
                <a href="mailto:siyadhkc@gmail.com" className="font-mono text-[18px] tracking-[0.15em] text-white hover:text-[#1D91A1] transition-colors flex items-center gap-3">
                  EMAIL <span className="text-[14px] opacity-40">↗</span>
                </a>
                <a href="https://github.com/siyadhkc" target="_blank" rel="me noreferrer" className="font-mono text-[18px] tracking-[0.15em] text-white hover:text-[#1D91A1] transition-colors flex items-center gap-3">
                  GITHUB <span className="text-[14px] opacity-40">↗</span>
                </a>
                <a href="https://linkedin.com/in/siyadhkc" target="_blank" rel="me noreferrer" className="font-mono text-[18px] tracking-[0.15em] text-white hover:text-[#1D91A1] transition-colors flex items-center gap-3">
                  LINKEDIN <span className="text-[14px] opacity-40">↗</span>
                </a>
                <a href="https://x.com/siyadhkc" target="_blank" rel="noreferrer" className="font-mono text-[18px] tracking-[0.15em] text-white hover:text-[#1D91A1] transition-colors flex items-center gap-3">
                  TWITTER <span className="text-[14px] opacity-40">↗</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Mini Footer - World Class Architectural Style */}
      <footer className="w-full max-w-[1200px] mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-[#00000008] mt-12 overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-6 text-[#8A8A85] font-mono text-[10px] tracking-[0.4em] uppercase">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D91A1] animate-pulse"></span>
            @2026 SIYADHKC
          </span>
          <span className="hidden md:block w-px h-3 bg-[#00000015]"></span>
          <span className="text-[#5B5F5D]/60 tracking-[0.2em]">Systems Architect</span>
        </div>

        <div className="flex items-center gap-10 text-[#8A8A85] font-mono text-[10px] tracking-[0.4em] uppercase">
          <span className="text-[#5B5F5D]/60 tracking-[0.2em]">Kerala, IN</span>
          <span className="hidden md:block w-px h-3 bg-[#00000015]"></span>
          <a href="#" className="hover:text-[#1D91A1] transition-colors">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
};
