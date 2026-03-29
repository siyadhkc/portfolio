import React, { useState } from 'react';
import { Mail, Download, Menu, X, Github, Linkedin, Twitter } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import resumeFile from '../assets/Siyadhkc_Resume.pdf';

export const Navigation = () => {
  const { scrollY } = useScroll();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Modern floating pill effect calculations
  const topBg = useTransform(scrollY, [0, 50], ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.8)']);
  const blurValue = useTransform(scrollY, [0, 50], ['blur(0px)', 'blur(16px)']);
  const borderOp = useTransform(scrollY, [0, 50], ['rgba(255,255,255,0)', 'rgba(0,0,0,0.06)']);
  const shadowValue = useTransform(scrollY, [0, 50], ['none', '0 10px 40px -10px rgba(0,0,0,0.08)']);
  const paddingY = useTransform(scrollY, [0, 50], ['16px', '10px']);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const contactLinks = [
    { icon: <Mail className="w-4 h-4" />, label: 'Email', href: 'mailto:siyadhkc@gmail.com' },
    { icon: <Github className="w-4 h-4" />, label: 'GitHub', href: 'https://github.com/siyadhkc' },
    { icon: <Linkedin className="w-4 h-4" />, label: 'LinkedIn', href: 'https://linkedin.com/in/siyadhkc' },
    { icon: <Twitter className="w-4 h-4" />, label: 'Twitter', href: 'https://x.com/siyadhkc' },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:pt-6 pointer-events-none">
      <motion.nav
        aria-label="Main navigation"
        style={{
          backgroundColor: topBg,
          backdropFilter: blurValue,
          borderWidth: 1,
          borderColor: borderOp,
          boxShadow: shadowValue,
          paddingTop: paddingY,
          paddingBottom: paddingY
        }}
        className="pointer-events-auto relative flex items-center justify-between px-5 sm:px-6 w-full max-w-[900px] rounded-full transition-all duration-300"
      >
        <button
          onClick={() => scrollTo('hero')}
          aria-label="Go to home"
          className="cursor-pointer font-serif text-xl lg:text-2xl font-bold text-black tracking-tight shrink-0 bg-transparent border-none p-0 hover:opacity-80 transition-opacity"
        >
          siyadhkc
        </button>

        <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          <button onClick={() => scrollTo('stack')} aria-label="Go to technical stack section" className="text-[#606060] hover:text-[#1D91A1] transition-colors text-[14px] font-medium tracking-wide">Stack</button>
          <button onClick={() => scrollTo('projects')} aria-label="Go to projects section" className="text-[#606060] hover:text-[#1D91A1] transition-colors text-[14px] font-medium tracking-wide">Projects</button>
          <button onClick={() => scrollTo('contact')} aria-label="Go to contact section" className="text-[#606060] hover:text-[#1D91A1] transition-colors text-[14px] font-medium tracking-wide">Contact</button>
        </div>

        <div className="flex items-center gap-2 lg:gap-3 shrink-0">
          <a
            href={resumeFile}
            download="SiyadhKc_CV.pdf"
            className="flex items-center justify-center bg-[#E1EFEB]/80 hover:bg-[#D1E6E4] text-[#1D91A1] transition-colors w-9 h-9 lg:w-auto lg:h-auto lg:px-4 lg:py-2.5 rounded-full font-sans text-[13px] lg:text-[14px] font-medium shadow-sm border border-[#1D91A1]/10 shrink-0"
          >
            <Download className="w-4 h-4" />
            <span className="hidden lg:inline lg:ml-2">Download CV</span>
          </a>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close contact menu" : "Open contact menu"}
            aria-expanded={isMenuOpen}
            className="flex items-center justify-center bg-[#2B302F] hover:bg-black transition-colors text-white w-9 h-9 lg:w-auto lg:h-auto lg:px-4 lg:py-2.5 rounded-full font-sans text-[13px] lg:text-[14px] font-medium shadow-md shrink-0 focus:outline-none"
          >
            {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4 lg:hidden" />}
            {!isMenuOpen && <Mail className="hidden lg:block w-4 h-4" />}
            <span className="hidden lg:inline lg:ml-2">{isMenuOpen ? 'Close' : 'Get in touch'}</span>
          </button>
        </div>

        {/* Floating Contact List Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute right-0 top-full mt-4 w-56 bg-white/90 backdrop-blur-2xl border border-black/5 rounded-3xl p-3 shadow-2xl flex flex-col gap-1 z-50 pointer-events-auto"
            >
              {contactLinks.map((link, i) => {
                const isExternalLink = link.label !== 'Email';
                const relValue = link.label === 'GitHub' || link.label === 'LinkedIn' ? 'me noreferrer' : isExternalLink ? 'noreferrer' : undefined;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={isExternalLink ? "_blank" : undefined}
                    rel={relValue}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    aria-label={link.label}
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-[#1D91A1]/10 text-[#606060] hover:text-[#1D91A1] transition-all group"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="transition-transform group-hover:scale-110">
                      {link.icon}
                    </span>
                    <span className="text-[14px] font-medium tracking-wide">{link.label}</span>
                  </motion.a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};
