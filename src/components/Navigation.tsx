import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { Mail, Download, X, Github, Linkedin, Twitter, BookOpen, Briefcase, User } from 'lucide-react';
import { motion, useScroll, AnimatePresence, useTransform } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import resumeFile from '../assets/Siyadhkc_Resume.pdf';
import { saveSection, clearAllScroll } from '../lib/scrollState';

// ── Static data ─────────────────────────────────────────────────────────────
const CONTACT_LINKS = [
  { icon: <Mail className="w-4 h-4" />, label: 'Email', href: 'mailto:siyadhkc@gmail.com' },
  { icon: <Github className="w-4 h-4" />, label: 'GitHub', href: 'https://github.com/siyadhkc' },
  { icon: <Linkedin className="w-4 h-4" />, label: 'LinkedIn', href: 'https://linkedin.com/in/siyadhkc' },
  { icon: <Twitter className="w-4 h-4" />, label: 'Twitter', href: 'https://x.com/siyadhkc' },
];

const MENU_ITEMS = [
  { label: 'About', id: '/about', type: 'link', icon: <User className="w-[18px] h-[18px] sm:w-4 sm:h-4" /> },
  { label: 'Projects', id: 'projects', type: 'scroll', icon: <Briefcase className="w-[18px] h-[18px] sm:w-4 sm:h-4" /> },
  { label: 'Articles', id: '/articles', type: 'link', icon: <BookOpen className="w-[18px] h-[18px] sm:w-4 sm:h-4" /> },
] as const;

// ── Logo Component with gradient definition ──────────────────────────────────
interface LogoProps {
  spinCount: number;
  onSpin: () => void;
  pathname: string;
}

const Logo = memo(({ spinCount, onSpin, pathname }: LogoProps) => {
  const [trigger, setTrigger] = useState(0);

  return (
    <Link
      to="/"
      onClick={(e) => {
        onSpin();
        setTrigger(t => t + 1);
        clearAllScroll(); // Force clear any saved restoration state
        
        // If on Home page, just scroll up
        if (pathname === '/') {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }}
      className="group relative flex items-center outline-none p-2"
      onMouseEnter={() => setTrigger(t => t + 1)}
      onTouchStart={() => setTrigger(t => t + 1)}
    >
      <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12">
        <svg viewBox="0 0 40 40" className="w-full h-full overflow-visible" fill="none">
          <defs>
            <linearGradient id="logo-glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#141414" />
              <stop offset="50%" stopColor= "#511ec0" />
              <stop offset="100%" stopColor="#e19251" />
            </linearGradient>
          </defs>

          <motion.path 
            key={`${trigger}-top`}
            d="M28 11 C28 4.5, 12 4.5, 12 13 C12 16.5, 15 18.5, 20 20"
            stroke="url(#logo-glow-grad)" 
            strokeWidth="5.5" 
            strokeLinecap="round"
            style={{ originX: "10px", originY: "10px" }}
            initial={{ pathLength: 1, y: 0, x: 0, rotate: 0 }}
            animate={{ 
              y: [0, -4, 0],
              x: [0, -4, 0],
              rotate: [0, 0, -360]
            }}
            transition={{ 
              duration: 0.8,
              times: [0, 0.25, 1],
              ease: "easeInOut"
            }}
          />

          <motion.path 
            key={`${trigger}-bottom`}
            d="M20 20 C25 21.5, 28 23.5, 28 27 C28 35.5, 12 35.5, 12 29"
            stroke="url(#logo-glow-grad)" 
            strokeWidth="5.5" 
            strokeLinecap="round"
            style={{ originX: "10px", originY: "10px" }}
            initial={{ pathLength: 1, y: 0, x: 0, rotate: 0 }}
            animate={{ 
              y: [0, 4, 0],
              x: [0, 4, 0],
              rotate: [0, 0, 360]
            }}
            transition={{ 
              duration: 0.8,
              times: [0, 0.25, 1],
              ease: "easeInOut"
            }}
          />
        </svg>

        <AnimatePresence>
          {spinCount > 0 && (
            <motion.div
              key={spinCount}
              initial={{ scale: 0.8, opacity: 0.3 }}
              animate={{ scale: 1.6, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 rounded-full bg-[#9F75E3]/10 pointer-events-none"
            />
          )}
        </AnimatePresence>
      </div>
    </Link>
  );
});
Logo.displayName = 'Logo';

// ── Main Navigation component ─────────────────────────────────────────────────
export const Navigation = () => {
  const { scrollY } = useScroll();
  const location = useLocation();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logoSpinCount, setLogoSpinCount] = useState(0);
  const [isDownloadSpinning, setIsDownloadSpinning] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  const navRef = React.useRef<HTMLDivElement>(null);

  const handleLogoSpin = useCallback(() => setLogoSpinCount((c) => c + 1), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const toggleMenu = useCallback(() => setIsMenuOpen((v) => !v), []);
  const handleDownloadSpin = useCallback(() => setIsDownloadSpinning(true), []);

  const handleNavClick = useCallback(
    (id: string) => {
      setIsMenuOpen(false);
      if (location.pathname !== '/') {
        saveSection(id);
        navigate('/');
        return;
      }
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    },
    [location.pathname, navigate],
  );

  // Outside-click handler
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Scroll transforms for smooth premium off-white dock transition
  const topBg = useTransform(scrollY, [0, 50], ['rgba(250,249,246,0)', 'rgba(255,255,255,0.72)']);
  const blurValue = useTransform(scrollY, [0, 50], ['blur(0px)', 'blur(24px)']);
  const borderOp = useTransform(scrollY, [0, 50], ['rgba(0,0,0,0)', 'rgba(0,0,0,0.05)']);
  const shadowValue = useTransform(scrollY, [0, 50], ['none', '0 10px 30px -10px rgba(0,0,0,0.03)']);
  const navWidth = useTransform(scrollY, [0, 100], ['100%', '98%']);
  const navY = useTransform(scrollY, [0, 50], ['0px', '4px']);

  // Section observer
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3, rootMargin: '-10% 0px -70% 0px' },
    );
    const projectSection = document.getElementById('projects');
    const aboutSection = document.getElementById('about');
    if (projectSection) observer.observe(projectSection);
    if (aboutSection) observer.observe(aboutSection);
    return () => observer.disconnect();
  }, [location.pathname]);

  const navItems = useMemo(
    () =>
      MENU_ITEMS.map((item) => ({
        ...item,
        isActive: item.type === 'link' ? location.pathname === item.id : activeSection === item.id,
      })),
    [location.pathname, activeSection],
  );

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-1 sm:px-4 pt-4 md:pt-6 pointer-events-none">
      <motion.nav
        ref={navRef}
        aria-label="Main navigation"
        style={{
          backgroundColor: topBg,
          backdropFilter: blurValue,
          borderColor: borderOp,
          boxShadow: shadowValue,
          width: navWidth,
          y: navY,
        }}
        className="pointer-events-auto relative grid grid-cols-3 items-center px-3 sm:px-4 py-2.5 sm:py-2 w-full max-w-[1000px] rounded-full border border-transparent transition-all duration-300"
      >
        {/* Left: Logo */}
        <div className="flex items-center justify-start overflow-hidden">
          <Logo
            spinCount={logoSpinCount}
            onSpin={handleLogoSpin}
            pathname={location.pathname}
          />
        </div>

        {/* Center: Soft Glass Nav Pill with sliding layout transition */}
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-1 bg-black/[0.02] p-1.5 sm:p-1.5 rounded-full border border-black/[0.03] shadow-inner">
            {navItems.map((item) => {
              const LinkContent = (
                <span className="relative z-10 flex items-center justify-center w-full h-full gap-2 font-medium tracking-wide">
                  <span className="flex sm:hidden items-center justify-center">{item.icon}</span>
                  <span className="hidden sm:inline">{item.label}</span>
                  <span className="sm:hidden sr-only">{item.label}</span>
                </span>
              );

              return (
                <div key={item.id} className="relative">
                  {item.type === 'scroll' ? (
                    <motion.button
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleNavClick(item.id)}
                      className={`relative flex items-center justify-center w-10 h-10 sm:w-auto sm:h-auto sm:px-5 sm:py-2.5 rounded-full text-[13px] transition-colors duration-300 ${
                        item.isActive ? 'text-[#9F75E3] font-bold' : 'text-slate-500 hover:text-slate-900 font-semibold'
                      }`}
                    >
                      {item.isActive && (
                        <motion.div
                          layoutId="activeNavPill"
                          className="absolute inset-0 bg-white rounded-full border border-black/[0.04] shadow-[0_2px_12px_rgba(159,117,227,0.04)]"
                          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                        />
                      )}
                      {LinkContent}
                    </motion.button>
                  ) : (
                    <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        to={item.id}
                        className={`relative flex items-center justify-center w-10 h-10 sm:w-auto sm:h-auto sm:px-5 sm:py-2.5 rounded-full text-[13px] transition-colors duration-300 ${
                          item.isActive ? 'text-[#9F75E3] font-bold' : 'text-slate-500 hover:text-slate-900 font-semibold'
                        }`}
                      >
                        {item.isActive && (
                          <motion.div
                            layoutId="activeNavPill"
                            className="absolute inset-0 bg-white rounded-full border border-black/[0.04] shadow-[0_2px_12px_rgba(159,117,227,0.04)]"
                            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                          />
                        )}
                        {LinkContent}
                      </Link>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center justify-end gap-1.5 sm:gap-3 shrink-0">
          <motion.button
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center bg-black/[0.02] hover:bg-black/[0.05] text-slate-800 p-3 sm:px-5 sm:py-2.5 rounded-full font-sans text-[13px] font-semibold shadow-[0_4px_12px_rgba(0,0,0,0.01)] border border-black/[0.04] transition-all pointer-events-auto hover:border-[#9F75E3]/30"
          >
            <motion.div
              animate={{ rotate: isDownloadSpinning ? 360 : 0 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              onAnimationComplete={() => setIsDownloadSpinning(false)}
              className="flex items-center justify-center"
            >
              <Download className="w-5 h-5 sm:w-4 sm:h-4 sm:mr-2 text-[#9F75E3]" />
            </motion.div>
            <span className="hidden lg:inline text-[12px] tracking-wider uppercase font-semibold">RESUME</span>
          </motion.button>

          <div className="h-4 w-px bg-black/10 mx-0.5 hidden sm:block" />

          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={toggleMenu}
            className={`hidden sm:flex relative items-center justify-center p-3 sm:px-6 sm:py-3 rounded-full font-sans text-[13px] font-semibold transition-all duration-300 min-w-[48px] lg:min-w-[145px] overflow-hidden border ${
              isMenuOpen 
                ? 'bg-gradient-to-r from-[#F6B794] via-[#D4B8FC] to-[#8CD4F5] text-white border-transparent shadow-[0_4px_16px_rgba(159,117,227,0.18)]' 
                : 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm border-transparent'
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMenuOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  className="flex items-center justify-center gap-2 w-full"
                >
                  <X className="w-4 h-4" />
                  <span className="hidden lg:inline tracking-wide font-mono uppercase text-[11px]">Close</span>
                </motion.span>
              ) : (
                <motion.span
                  key="contact"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="flex items-center justify-center gap-2 w-full"
                >
                  <Mail className="w-4 h-4 text-white" />
                  <span className="hidden lg:inline tracking-wider font-mono uppercase text-[11px]">Contact</span>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Dropdown Menu (Premium off-white glass dropdown) */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeMenu}
                className="fixed inset-0 bg-transparent z-10 pointer-events-auto"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10, rotateX: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10, rotateX: -10 }}
                transition={{ duration: 0.25, ease: "circOut" }}
                style={{ transformOrigin: 'top right', willChange: 'transform, opacity' }}
                className="absolute right-0 top-full mt-4 w-64 bg-white/95 backdrop-blur-3xl border border-black/[0.05] rounded-[2rem] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.06)] z-50 overflow-hidden perspective-[1000px] flex flex-col gap-4"
              >
                <div className="grid grid-cols-2 gap-2">
                  {CONTACT_LINKS.map((link, i) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: i * 0.04, ease: 'easeOut' }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-black/[0.01] border border-transparent hover:border-[#9F75E3]/10 hover:bg-[#9F75E3]/[0.02] text-slate-500 hover:text-[#9F75E3] transition-all group"
                      onClick={closeMenu}
                    >
                      <div className="p-2.5 rounded-xl bg-black/[0.02] border border-black/[0.03] shadow-sm transition-all group-hover:bg-[#9F75E3]/10">
                        {link.icon}
                      </div>
                      <span className="text-[10px] font-semibold tracking-wide font-mono uppercase opacity-75 group-hover:opacity-100">
                        {link.label}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Premium Download Modal (Light theme) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center p-6 pb-20 sm:pb-12 pointer-events-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-[4px]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 40 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[340px] bg-white rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-black/[0.06] flex flex-col items-center"
            >
              <div className="text-center mb-8">
                <h3 className="text-[1.35rem] font-bold text-slate-800 tracking-tight mb-1.5">Download Resume?</h3>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500 opacity-80">Last updated: May 2026</span>
              </div>
              
              <div className="flex flex-col w-full gap-2">
                <a
                  href={resumeFile}
                  download="SiyadhKc_CV.pdf"
                  onClick={() => {
                    handleDownloadSpin();
                    setIsModalOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-[#F6B794] via-[#D4B8FC] to-[#8CD4F5] hover:shadow-[0_4px_16px_rgba(159,117,227,0.18)] text-white py-3.5 rounded-xl font-bold text-[13px] transition-all flex items-center justify-center"
                >
                  Download
                </a>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-full py-3.5 text-slate-500 font-semibold text-[13px] hover:text-slate-800 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default Navigation;
