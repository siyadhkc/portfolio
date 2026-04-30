import React, { memo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin } from 'lucide-react';


// ── Copy Button — isolated state so toast never re-renders the whole footer ──
const CopyButton = memo(() => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText('siyadhkc@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <button
      onClick={handleCopy}
      className="absolute top-6 right-6 text-[#8A8A85] hover:text-[#1D91A1] transition-colors p-2"
      title="Copy to clipboard"
    >
      {copied && (
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1D91A1] text-white text-[10px] px-2 py-1 rounded whitespace-nowrap pointer-events-none text-center min-w-[80px]">
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
    <div id="contact" className="w-full bg-gradient-to-b from-[#F7F7F2] to-[#F2F2EC] pb-6 pt-6 md:pt-10 px-2 sm:px-4 md:px-8 relative rounded-b-3xl md:rounded-b-[4rem]">

      {/* The main cinematic dark container */}
      <div className="relative w-full rounded-2xl md:rounded-[3rem] overflow-hidden bg-gradient-to-br from-[#0A0D14] to-[#05070A] py-16 md:py-32 flex flex-col items-center justify-center shadow-[0_30px_100px_rgba(0,0,0,0.5)] border border-white/10">

        {/* Space Background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#02040A]">
          <div className="absolute inset-0 bg-[#02040A]" />

          {/* Aurora bands — only animate while in viewport */}
          <motion.div
            animate={{ opacity: [0.2, 0.4, 0.2], rotate: [-3, 3, -3], y: ['-5%', '5%', '-5%'] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
            viewport={{ once: false, amount: 0.1 }}
            className="absolute top-[-10%] left-[-20%] w-[140%] h-[70%] bg-[radial-gradient(ellipse_at_center,_rgba(29,145,161,0.2)_0%,_rgba(29,145,161,0.05)_40%,_transparent_80%)] z-0"
            style={{ willChange: 'transform, opacity' }}
          />
          <motion.div
            animate={{ opacity: [0.15, 0.35, 0.15], rotate: [3, -3, 3], x: ['5%', '-5%', '5%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
            viewport={{ once: false, amount: 0.1 }}
            className="absolute bottom-[-10%] right-[-20%] w-[150%] h-[80%] bg-[radial-gradient(ellipse_at_center,_rgba(229,122,68,0.15)_0%,_rgba(229,122,68,0.05)_40%,_transparent_80%)] z-0"
            style={{ willChange: 'transform, opacity' }}
          />
          <motion.div
            animate={{ opacity: [0.1, 0.3, 0.1], scaleY: [1, 1.2, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            viewport={{ once: false, amount: 0.1 }}
            className="absolute top-[10%] left-[10%] w-[80%] h-[120%] bg-[radial-gradient(ellipse_at_center,_rgba(124,77,255,0.15)_0%,_rgba(124,77,255,0.05)_40%,_transparent_70%)] z-0"
            style={{ willChange: 'transform, opacity' }}
          />

          {/* Starfield */}
          <motion.div
            animate={{ y: ['0%', '-30%'] }}
            transition={{ duration: 180, repeat: Infinity, ease: 'linear' }}
            className="absolute top-0 left-0 w-full h-[200%] z-0 opacity-80"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='400' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='40' cy='50' r='1.5' fill='%23ffffff' opacity='0.3'/%3E%3Ccircle cx='180' cy='120' r='1' fill='%23ffffff' opacity='0.4'/%3E%3Ccircle cx='320' cy='80' r='2' fill='%23ffffff' opacity='0.3'/%3E%3Ccircle cx='100' cy='250' r='1.5' fill='%231D91A1' opacity='0.5'/%3E%3Ccircle cx='250' cy='320' r='1' fill='%23ffffff' opacity='0.3'/%3E%3Ccircle cx='50' cy='380' r='2' fill='%23E57A44' opacity='0.4'/%3E%3C/svg%3E")`,
              backgroundSize: '400px 400px',
            }}
          />

          {/* Edge fades */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_60%,#02040A_100%)] z-10 pointer-events-none opacity-80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_#02040A_100%)] z-10 pointer-events-none opacity-60" />

          {/* Grain textures */}
          <div className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay opacity-[0.35]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.85\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }} />
          <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.1]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"1.5\" numOctaves=\"2\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }} />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-[800px] mx-auto px-4 sm:px-6 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="flex flex-col items-center text-center mb-10 md:mb-16"
          >
            <h2 className="font-serif text-[3.5rem] sm:text-[5rem] md:text-[7rem] text-white tracking-[-0.03em] leading-[1] mb-8 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">Get in touch</h2>
            <p className="text-[#A1A1A1] font-sans text-base md:text-xl px-4 max-w-[500px] leading-relaxed">Available for architecture auditing and high-scale systems consulting.</p>
          </motion.div>

          <div className="w-full">
            {/* Desktop Grid */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="hidden sm:grid grid-cols-2 gap-px bg-white/10 rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden border border-white/10"
            >
              <motion.div variants={itemVariants} className="relative group/email">
                <motion.a 
                  href="mailto:siyadhkc@gmail.com" 
                  whileHover={{ backgroundColor: 'rgba(17, 22, 33, 0.95)', transition: { duration: 0.3 } }}
                className="bg-[#0A0D14]/80 transition-colors p-8 md:p-12 flex flex-col items-start gap-4 group h-full"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center relative group-hover/email:border-[#1D91A1]/40 group-hover/email:bg-[#1D91A1]/10 transition-all duration-500 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1D91A1]/20 to-transparent opacity-0 group-hover/email:opacity-100 transition-opacity duration-500" />
                    <Mail className="w-5 h-5 text-[#1D91A1] relative z-10 group-hover/email:scale-110 group-hover/email:text-white transition-all duration-500" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-[#8A8A85] uppercase">Direct Email</span>
                    <span className="text-white text-lg md:text-xl font-medium tracking-tight">siyadhkc@gmail.com</span>
                  </div>
                  <p className="text-[#5B5F5D] text-sm font-sans mt-2 opacity-40 group-hover/email:opacity-100 transition-opacity duration-500 leading-relaxed max-w-[200px]">Available for architecture &amp; scale consulting.</p>
                </motion.a>
                <CopyButton />
              </motion.div>

              <motion.a 
                variants={itemVariants} 
                href="https://github.com/siyadhkc" 
                target="_blank" 
                rel="me noreferrer" 
                whileHover={{ backgroundColor: 'rgba(17, 22, 33, 0.95)', transition: { duration: 0.3 } }}
                className="bg-[#0A0D14]/80 transition-colors p-8 md:p-12 flex flex-col items-start gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center relative group-hover:border-[#1D91A1]/40 group-hover:bg-[#1D91A1]/10 transition-all duration-500 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1D91A1]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Github className="w-5 h-5 text-[#1D91A1] relative z-10 group-hover:scale-110 group-hover:text-white transition-all duration-500" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[#8A8A85] uppercase">Source Code</span>
                  <span className="text-white text-lg md:text-xl font-medium tracking-tight">github.com/siyadhkc</span>
                </div>
                <p className="text-[#5B5F5D] text-sm font-sans mt-2 opacity-40 group-hover:opacity-100 transition-opacity duration-500 leading-relaxed max-w-[200px]">Explore core projects and open source.</p>
              </motion.a>

              <motion.a 
                variants={itemVariants} 
                href="https://linkedin.com/in/siyadhkc" 
                target="_blank" 
                rel="me noreferrer" 
                whileHover={{ backgroundColor: 'rgba(17, 22, 33, 0.95)', transition: { duration: 0.3 } }}
                className="bg-[#0A0D14]/80 transition-colors p-8 md:p-12 flex flex-col items-start gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center relative group-hover:border-[#1D91A1]/40 group-hover:bg-[#1D91A1]/10 transition-all duration-500 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1D91A1]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Linkedin className="w-5 h-5 text-[#1D91A1] relative z-10 group-hover:scale-110 group-hover:text-white transition-all duration-500" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[#8A8A85] uppercase">Professional</span>
                  <span className="text-white text-lg md:text-xl font-medium tracking-tight">linkedin.com/in/siyadhkc</span>
                </div>
                <p className="text-[#5B5F5D] text-sm font-sans mt-2 opacity-40 group-hover:opacity-100 transition-opacity duration-500 leading-relaxed max-w-[200px]">Connect for professional opportunities.</p>
              </motion.a>

              <motion.a 
                variants={itemVariants} 
                href="https://x.com/siyadhkc" 
                target="_blank" 
                rel="noreferrer" 
                whileHover={{ backgroundColor: 'rgba(17, 22, 33, 0.95)', transition: { duration: 0.3 } }}
                className="bg-[#0A0D14]/80 transition-colors p-8 md:p-12 flex flex-col items-start gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center relative group-hover:border-[#1D91A1]/40 group-hover:bg-[#1D91A1]/10 transition-all duration-500 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1D91A1]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <svg className="w-5 h-5 text-[#1D91A1] relative z-10 group-hover:scale-110 group-hover:text-white transition-all duration-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[#8A8A85] uppercase">Network</span>
                  <span className="text-white text-lg md:text-xl font-medium tracking-tight">@siyadhkc</span>
                </div>
                <p className="text-[#5B5F5D] text-sm font-sans mt-2 opacity-40 group-hover:opacity-100 transition-opacity duration-500 leading-relaxed max-w-[200px]">Following the latest in systems &amp; scale.</p>
              </motion.a>
            </motion.div>

            {/* Mobile List */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col items-center sm:hidden w-full gap-10 mt-4 px-4 text-center"
            >
              <motion.div variants={itemVariants} className="flex flex-col items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 mb-2">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <p className="font-mono text-[11px] tracking-[0.2em] text-[#8A8A85] uppercase">Connect With Me</p>
              </motion.div>
              <motion.div variants={itemVariants} className="flex flex-col items-start w-full gap-5 pl-10">
                <a href="mailto:siyadhkc@gmail.com" className="font-mono text-[18px] tracking-[0.15em] text-white hover:text-[#1D91A1] transition-colors flex items-center gap-3">EMAIL <span className="text-[14px] opacity-40">↗</span></a>
                <a href="https://github.com/siyadhkc" target="_blank" rel="me noreferrer" className="font-mono text-[18px] tracking-[0.15em] text-white hover:text-[#1D91A1] transition-colors flex items-center gap-3">GITHUB <span className="text-[14px] opacity-40">↗</span></a>
                <a href="https://linkedin.com/in/siyadhkc" target="_blank" rel="me noreferrer" className="font-mono text-[18px] tracking-[0.15em] text-white hover:text-[#1D91A1] transition-colors flex items-center gap-3">LINKEDIN <span className="text-[14px] opacity-40">↗</span></a>
                <a href="https://x.com/siyadhkc" target="_blank" rel="noreferrer" className="font-mono text-[18px] tracking-[0.15em] text-white hover:text-[#1D91A1] transition-colors flex items-center gap-3">TWITTER <span className="text-[14px] opacity-40">↗</span></a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mini Footer */}
      <footer className="w-full max-w-[1200px] mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-[#00000008] mt-12 overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-6 text-[#8A8A85] font-mono text-[10px] tracking-[0.4em] uppercase">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D91A1] animate-pulse" />
            @2026 SIYADH.KC
          </span>
          <span className="hidden md:block w-px h-3 bg-black/10" />
          <span className="text-[#5B5F5D] tracking-[0.25em]">Full-Stack Developer | Web & API Security</span>
        </div>
        <div className="flex items-center gap-10 text-[#8A8A85] font-mono text-[10px] tracking-[0.4em] uppercase">
          <span className="text-[#5B5F5D]/60 tracking-[0.2em]">Kerala, India</span>
          <span className="hidden md:block w-px h-3 bg-black/10" />
          <button onClick={scrollToTop} className="hover:text-[#1D91A1] transition-all hover:-translate-y-0.5">
            Back to top ↑
          </button>
        </div>
      </footer>
    </div>
  );
};
