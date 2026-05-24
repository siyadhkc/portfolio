import React, { memo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin } from 'lucide-react';
import { ParallaxTilt } from './ParallaxTilt';

// ── Copy Button Component ───────────────────────────────────────────────────
interface CopyButtonProps {
  email: string;
}

const CopyButton = memo(({ email }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback((e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to email link when clicking copy
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [email]);

  return (
    <button
      onClick={handleCopy}
      style={{ transform: 'translateZ(30px)' }}
      className="absolute top-6 right-6 text-slate-400 transition-colors p-2.5 z-30 bg-black/[0.02] hover:bg-black/[0.06] border border-black/5 rounded-xl animate-pulse"
      title="Copy to clipboard"
    >
      {copied && (
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[10px] px-2.5 py-1 rounded font-bold whitespace-nowrap pointer-events-none text-center shadow-lg">
          Email copied!
        </span>
      )}
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
      </svg>
    </button>
  );
});
CopyButton.displayName = 'CopyButton';

// ── High performance Spotlight Hover Tracker ─────────────────────────────────
const handleSpotlightMouseMove = (e: React.MouseEvent<HTMLElement>) => {
  const { currentTarget, clientX, clientY } = e;
  const rect = currentTarget.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  currentTarget.style.setProperty('--mouse-x', `${x}px`);
  currentTarget.style.setProperty('--mouse-y', `${y}px`);
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  }
};

export const FooterCTA = () => {

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div id="contact" style={{ scrollSnapAlign: 'end' }} className="w-full bg-transparent pb-6 pt-6 md:pt-10 px-2 sm:px-4 md:px-8 relative rounded-b-[2.5rem]">

      {/* Cinematic Showcase Container - Glassmorphic Upgrade */}
      <div className="relative w-full rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-white/40 via-white/20 to-white/10 backdrop-blur-md py-16 md:py-28 flex flex-col items-center justify-center shadow-[0_20px_60px_rgba(0,0,0,0.015)] border border-white/50">

        {/* Ambient space background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-transparent" />

          {/* Drifting glowing cosmic light bands */}
          <motion.div
            animate={{ opacity: [0.12, 0.28, 0.12], rotate: [-2, 2, -2], y: ['-5%', '5%', '-5%'] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[-10%] left-[-20%] w-[140%] h-[70%] bg-[radial-gradient(ellipse_at_center,_rgba(246,183,148,0.12)_0%,_transparent_85%)] z-0"
          />
          <motion.div
            animate={{ opacity: [0.1, 0.25, 0.1], rotate: [2, -2, 2], x: ['5%', '-5%', '5%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-[-10%] right-[-20%] w-[150%] h-[80%] bg-[radial-gradient(ellipse_at_center,_rgba(212,184,252,0.1)_0%,_transparent_85%)] z-0"
          />

          {/* Starfields overlay (faint champagne sparkles) */}
          <motion.div
            animate={{ y: ['0%', '-20%'] }}
            transition={{ duration: 180, repeat: Infinity, ease: 'linear' }}
            className="absolute top-0 left-0 w-full h-[150%] z-0 opacity-[0.08]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='400' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='40' cy='50' r='1' fill='%23D4B8FC' opacity='0.35'/%3E%3Ccircle cx='180' cy='120' r='0.8' fill='%23F6B794' opacity='0.45'/%3E%3Ccircle cx='320' cy='80' r='1.2' fill='%23D4B8FC' opacity='0.35'/%3E%3Ccircle cx='100' cy='250' r='1' fill='%23F6B794' opacity='0.45'/%3E%3Ccircle cx='250' cy='320' r='0.8' fill='%23D4B8FC' opacity='0.35'/%3E%3Ccircle cx='50' cy='380' r='1.2' fill='%23F6B794' opacity='0.45'/%3E%3C/svg%3E")`,
              backgroundSize: '400px 400px',
            }}
          />

          {/* Dark absorbing gradients */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_60%,#FAF9F6_100%)] z-10 pointer-events-none opacity-20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_#FAF9F6_100%)] z-10 pointer-events-none opacity-25" />
        </div>

        {/* Content Box */}
        <div className="relative z-10 w-full max-w-[800px] mx-auto px-4 sm:px-6 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center mb-12 md:mb-16 select-none"
          >
            <h2 className="font-hero font-black text-[3.2rem] sm:text-[4.5rem] md:text-[6rem] text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-500 tracking-tight leading-[1] mb-6 uppercase">Get in touch</h2>
            <p className="hidden sm:block text-slate-600 font-sans text-base md:text-xl px-4 max-w-[500px] leading-relaxed font-semibold">Open for security audits, interesting projects, or just a technical chat.</p>
          </motion.div>

          <div className="w-full">
            {/* Desktop Contact Grid: Standalone Spotlight Cards with Gaps to prevent overlapping backgrounds */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="hidden sm:grid grid-cols-2 gap-6 w-full"
            >
              {/* Card 1: Email */}
              <ParallaxTilt maxTilt={5} className="w-full h-full">
                <motion.a 
                  variants={itemVariants} 
                  href="mailto:siyadhkc@gmail.com"
                  onMouseMove={handleSpotlightMouseMove}
                  whileHover={{ scale: 1.015 }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="relative bg-gradient-to-br from-white/30 via-white/20 to-white/10 backdrop-blur-md p-8 md:p-12 flex flex-col items-start gap-4 rounded-[2.2rem] border border-white/50 hover:border-[#F6B794]/45 transition-all duration-300 spotlight-card group/email cursor-pointer z-10 shadow-[0_8px_30px_rgba(0,0,0,0.01)] overflow-hidden w-full h-full"
                >
                  {/* Specific colored glow behind card cell on hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover/email:opacity-100 transition-opacity duration-500 pointer-events-none z-0" 
                    style={{
                      background: 'radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(246, 183, 148, 0.12), transparent 55%)'
                    }}
                  />
                  
                  <div style={{ transform: 'translateZ(25px)' }} className="w-12 h-12 rounded-xl bg-white/20 border border-white/35 flex items-center justify-center relative overflow-hidden transition-all duration-500 shadow-sm group-hover/email:border-[#F6B794]/40 group-hover/email:bg-[#F6B794]/15 z-10">
                    <Mail className="w-5 h-5 text-[#F6B794] transition-transform duration-500 group-hover/email:scale-110" />
                  </div>
                  <div style={{ transform: 'translateZ(20px)' }} className="flex flex-col gap-1 z-10">
                    <span className="font-mono text-[9px] tracking-[0.25em] text-slate-400 uppercase font-bold group-hover/email:text-[#F6B794] transition-colors">Email</span>
                    <span className="text-slate-800 text-lg md:text-xl font-bold tracking-tight">siyadhkc@gmail.com</span>
                  </div>
                  <p style={{ transform: 'translateZ(15px)' }} className="text-slate-600 text-sm font-sans mt-2 font-semibold leading-relaxed max-w-[220px] z-10">The fastest way to reach me for anything technical.</p>
                  <CopyButton email="siyadhkc@gmail.com" />
                </motion.a>
              </ParallaxTilt>

              {/* Card 2: GitHub */}
              <ParallaxTilt maxTilt={5} className="w-full h-full">
                <motion.a 
                  variants={itemVariants} 
                  href="https://github.com/siyadhkc" 
                  target="_blank" 
                  rel="me noreferrer" 
                  onMouseMove={handleSpotlightMouseMove}
                  whileHover={{ scale: 1.015 }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="relative bg-gradient-to-br from-white/30 via-white/20 to-white/10 backdrop-blur-md p-8 md:p-12 flex flex-col items-start gap-4 rounded-[2.2rem] border border-white/50 hover:border-[#D4B8FC]/45 transition-all duration-300 spotlight-card group/github cursor-pointer z-10 shadow-[0_8px_30px_rgba(0,0,0,0.01)] overflow-hidden w-full h-full"
                >
                  <div 
                    className="absolute inset-0 opacity-0 group-hover/github:opacity-100 transition-opacity duration-500 pointer-events-none z-0" 
                    style={{
                      background: 'radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(212, 184, 252, 0.12), transparent 55%)'
                    }}
                  />

                  <div style={{ transform: 'translateZ(25px)' }} className="w-12 h-12 rounded-xl bg-white/20 border border-white/35 flex items-center justify-center relative overflow-hidden transition-all duration-500 shadow-sm group-hover/github:border-[#D4B8FC]/40 group-hover/github:bg-[#D4B8FC]/15 z-10">
                    <Github className="w-5 h-5 text-[#D4B8FC] transition-transform duration-500 group-hover/github:scale-110" />
                  </div>
                  <div style={{ transform: 'translateZ(20px)' }} className="flex flex-col gap-1 z-10">
                    <span className="font-mono text-[9px] tracking-[0.25em] text-slate-400 uppercase font-bold group-hover/github:text-[#D4B8FC] transition-colors">Code</span>
                    <span className="text-slate-800 text-lg md:text-xl font-bold tracking-tight">github.com/siyadhkc</span>
                  </div>
                  <p style={{ transform: 'translateZ(15px)' }} className="text-slate-600 text-sm font-sans mt-2 font-semibold leading-relaxed max-w-[220px] z-10">Where I push my projects and security research.</p>
                </motion.a>
              </ParallaxTilt>

              {/* Card 3: LinkedIn */}
              <ParallaxTilt maxTilt={5} className="w-full h-full">
                <motion.a 
                  variants={itemVariants} 
                  href="https://linkedin.com/in/siyadhkc" 
                  target="_blank" 
                  rel="me noreferrer" 
                  onMouseMove={handleSpotlightMouseMove}
                  whileHover={{ scale: 1.015 }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="relative bg-gradient-to-br from-white/30 via-white/20 to-white/10 backdrop-blur-md p-8 md:p-12 flex flex-col items-start gap-4 rounded-[2.2rem] border border-white/50 hover:border-[#8CD4F5]/45 transition-all duration-300 spotlight-card group/linkedin cursor-pointer z-10 shadow-[0_8px_30px_rgba(0,0,0,0.01)] overflow-hidden w-full h-full"
                >
                  <div 
                    className="absolute inset-0 opacity-0 group-hover/linkedin:opacity-100 transition-opacity duration-500 pointer-events-none z-0" 
                    style={{
                      background: 'radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(140, 212, 245, 0.12), transparent 55%)'
                    }}
                  />

                  <div style={{ transform: 'translateZ(25px)' }} className="w-12 h-12 rounded-xl bg-white/20 border border-white/35 flex items-center justify-center relative overflow-hidden transition-all duration-500 shadow-sm group-hover/linkedin:border-[#8CD4F5]/40 group-hover/linkedin:bg-[#8CD4F5]/15 z-10">
                    <Linkedin className="w-5 h-5 text-[#8CD4F5] transition-transform duration-500 group-hover/linkedin:scale-110" />
                  </div>
                  <div style={{ transform: 'translateZ(20px)' }} className="flex flex-col gap-1 z-10">
                    <span className="font-mono text-[9px] tracking-[0.25em] text-slate-400 uppercase font-bold group-hover/linkedin:text-[#8CD4F5] transition-colors">LinkedIn</span>
                    <span className="text-slate-800 text-lg md:text-xl font-bold tracking-tight">linkedin.com/in/siyadhkc</span>
                  </div>
                  <p style={{ transform: 'translateZ(15px)' }} className="text-slate-600 text-sm font-sans mt-2 font-semibold leading-relaxed max-w-[220px] z-10">Connecting with other engineers and security researchers.</p>
                </motion.a>
              </ParallaxTilt>

              {/* Card 4: Twitter */}
              <ParallaxTilt maxTilt={5} className="w-full h-full">
                <motion.a 
                  variants={itemVariants} 
                  href="https://x.com/siyadhkc" 
                  target="_blank" 
                  rel="noreferrer" 
                  onMouseMove={handleSpotlightMouseMove}
                  whileHover={{ scale: 1.015 }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="relative bg-gradient-to-br from-white/30 via-white/20 to-white/10 backdrop-blur-md p-8 md:p-12 flex flex-col items-start gap-4 rounded-[2.2rem] border border-white/50 hover:border-[#F6B794]/45 transition-all duration-300 spotlight-card group/twitter cursor-pointer z-10 shadow-[0_8px_30px_rgba(0,0,0,0.01)] overflow-hidden w-full h-full"
                >
                  <div 
                    className="absolute inset-0 opacity-0 group-hover/twitter:opacity-100 transition-opacity duration-500 pointer-events-none z-0" 
                    style={{
                      background: 'radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(246, 183, 148, 0.12), transparent 55%)'
                    }}
                  />

                  <div style={{ transform: 'translateZ(25px)' }} className="w-12 h-12 rounded-xl bg-white/20 border border-white/35 flex items-center justify-center relative overflow-hidden transition-all duration-500 shadow-sm group-hover/twitter:border-[#F6B794]/40 group-hover/twitter:bg-[#F6B794]/15 z-10">
                    <svg className="w-5 h-5 text-[#F6B794] transition-transform duration-500 group-hover/twitter:scale-110" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </div>
                  <div style={{ transform: 'translateZ(20px)' }} className="flex flex-col gap-1 z-10">
                    <span className="font-mono text-[9px] tracking-[0.25em] text-slate-400 uppercase font-bold group-hover/twitter:text-[#F6B794] transition-colors">Twitter</span>
                    <span className="text-slate-800 text-lg md:text-xl font-bold tracking-tight">@siyadhkc</span>
                  </div>
                  <p style={{ transform: 'translateZ(15px)' }} className="text-slate-600 text-sm font-sans mt-2 font-semibold leading-relaxed max-w-[220px] z-10">Talking about Python, security, and dev workflows.</p>
                </motion.a>
              </ParallaxTilt>
            </motion.div>

            {/* Mobile Contact Grid - High-end Cards matching desktop but scaled for smaller screen */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4 sm:hidden w-full mt-4 px-2 z-10 relative"
            >
              {/* Card 1: Email */}
              <motion.a 
                variants={itemVariants} 
                href="mailto:siyadhkc@gmail.com"
                whileTap={{ scale: 0.98 }}
                className="relative bg-gradient-to-br from-white/30 via-white/20 to-white/10 backdrop-blur-md p-5 flex flex-col items-start gap-3 rounded-3xl border border-white/50 active:border-[#F6B794]/45 transition-all duration-300 z-10 shadow-[0_4px_16px_rgba(0,0,0,0.01)] overflow-hidden w-full"
              >
                <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/35 flex items-center justify-center shadow-sm text-[#F6B794]">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col gap-0.5 text-left">
                  <span className="font-mono text-[8px] tracking-[0.2em] text-slate-400 uppercase font-bold">Email</span>
                  <span className="text-slate-800 text-[13px] font-bold tracking-tight truncate max-w-[125px]">siyadhkc@gmail.com</span>
                </div>
              </motion.a>

              {/* Card 2: GitHub */}
              <motion.a 
                variants={itemVariants} 
                href="https://github.com/siyadhkc" 
                target="_blank" 
                rel="me noreferrer" 
                whileTap={{ scale: 0.98 }}
                className="relative bg-gradient-to-br from-white/30 via-white/20 to-white/10 backdrop-blur-md p-5 flex flex-col items-start gap-3 rounded-3xl border border-white/50 active:border-[#D4B8FC]/45 transition-all duration-300 z-10 shadow-[0_4px_16px_rgba(0,0,0,0.01)] overflow-hidden w-full"
              >
                <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/35 flex items-center justify-center shadow-sm text-[#D4B8FC]">
                  <Github className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col gap-0.5 text-left">
                  <span className="font-mono text-[8px] tracking-[0.2em] text-slate-400 uppercase font-bold">Code</span>
                  <span className="text-slate-800 text-[13px] font-bold tracking-tight truncate max-w-[125px]">github.com/siyadhkc</span>
                </div>
              </motion.a>

              {/* Card 3: LinkedIn */}
              <motion.a 
                variants={itemVariants} 
                href="https://linkedin.com/in/siyadhkc" 
                target="_blank" 
                rel="me noreferrer" 
                whileTap={{ scale: 0.98 }}
                className="relative bg-gradient-to-br from-white/30 via-white/20 to-white/10 backdrop-blur-md p-5 flex flex-col items-start gap-3 rounded-3xl border border-white/50 active:border-[#8CD4F5]/45 transition-all duration-300 z-10 shadow-[0_4px_16px_rgba(0,0,0,0.01)] overflow-hidden w-full"
              >
                <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/35 flex items-center justify-center shadow-sm text-[#8CD4F5]">
                  <Linkedin className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col gap-0.5 text-left">
                  <span className="font-mono text-[8px] tracking-[0.2em] text-slate-400 uppercase font-bold">LinkedIn</span>
                  <span className="text-slate-800 text-[13px] font-bold tracking-tight truncate max-w-[125px]">linkedin.com/in/siyadhkc</span>
                </div>
              </motion.a>

              {/* Card 4: Twitter */}
              <motion.a 
                variants={itemVariants} 
                href="https://x.com/siyadhkc" 
                target="_blank" 
                rel="noreferrer" 
                whileTap={{ scale: 0.98 }}
                className="relative bg-gradient-to-br from-white/30 via-white/20 to-white/10 backdrop-blur-md p-5 flex flex-col items-start gap-3 rounded-3xl border border-white/50 active:border-[#F6B794]/45 transition-all duration-300 z-10 shadow-[0_4px_16px_rgba(0,0,0,0.01)] overflow-hidden w-full"
              >
                <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/35 flex items-center justify-center shadow-sm text-[#F6B794]">
                  <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <div className="flex flex-col gap-0.5 text-left">
                  <span className="font-mono text-[8px] tracking-[0.2em] text-slate-400 uppercase font-bold">Twitter</span>
                  <span className="text-slate-800 text-[13px] font-bold tracking-tight truncate max-w-[125px]">@siyadhkc</span>
                </div>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mini Footer */}
      <footer className="w-full max-w-[1200px] mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-black/[0.06] mt-12 overflow-hidden z-10 relative">
        <div className="flex flex-col md:flex-row items-center gap-6 text-slate-400 font-mono text-[10px] tracking-[0.4em] uppercase font-bold">
          <span className="flex items-center gap-2 hover:text-slate-800 transition-colors duration-200">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse" />
            @2026 SIYADH.KC
          </span>
          <span className="hidden md:block w-px h-3 bg-black/10" />
          <span className="tracking-[0.25em]">Security Researcher</span>
        </div>
        <div className="flex items-center gap-10 text-slate-400 font-mono text-[10px] tracking-[0.4em] uppercase font-bold">
          <span className="tracking-[0.2em] opacity-80">Kerala, India</span>
          <span className="hidden md:block w-px h-3 bg-black/10" />
          <button onClick={scrollToTop} className="hover:text-slate-800 transition-all hover:-translate-y-0.5">
            Back to top ↑
          </button>
        </div>
      </footer>
    </div>
  );
};
export default FooterCTA;
