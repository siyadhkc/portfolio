import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { Mail, Download, X, Github, Linkedin, Twitter, BookOpen, Briefcase, User } from 'lucide-react';
import { motion, useScroll, AnimatePresence, useTransform } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import resumeFile from '../assets/Siyadhkc_Resume.pdf';
import { saveSection, clearAllScroll } from '../lib/scrollState';

// ── Static data — defined outside component so they are never recreated ──────
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

// ── Logo extracted to module scope — never recreated on Navigation re-render ──
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
        } else {
          // Navigating home: App.tsx will handle the reset
        }
      }}
      className="group relative flex items-center outline-none p-2"
      onMouseEnter={() => setTrigger(t => t + 1)}
      onTouchStart={() => setTrigger(t => t + 1)}
    >
      <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12">
        <svg viewBox="0 0 40 40" className="w-full h-full overflow-visible" fill="none">
          {/* Premium Drop Shadow */}
          <filter id="premium-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.15" />
          </filter>

          {/* Top Half of 'S' - Break, Spin & Fix */}
          <motion.path 
            key={`${trigger}-top`}
            d="M28 11 C28 4.5, 12 4.5, 12 13 C12 16.5, 15 18.5, 20 20"
            stroke="#333333" 
            strokeWidth="5.5" 
            strokeLinecap="round"
            // filter="url(#premium-shadow)"
            style={{ originX: "10px", originY: "10px" }}
            initial={{ pathLength: 1, y: 0, x: 0, rotate: 0 }}
            animate={{ 
              y: [0, -5, 0],
              x: [0, -5, 0],
              rotate: [0, 0, -360]
            }}
            transition={{ 
              duration: 0.8,
              times: [0, 0.25, 1],
              ease: "easeInOut"
            }}
          />

          {/* Bottom Half of 'S' - Break, Spin & Fix */}
          <motion.path 
            key={`${trigger}-bottom`}
            d="M20 20 C25 21.5, 28 23.5, 28 27 C28 35.5, 12 35.5, 12 29"
            stroke="#333333ff" 
            strokeWidth="5.5" 
            strokeLinecap="round"
            style={{ originX: "10px", originY: "10px" }}
            initial={{ pathLength: 1, y: 0, x: 0, rotate: 0 }}
            animate={{ 
              y: [0, 5, 0],
              x: [0, 5, 0],
              rotate: [0, 0, 360]
            }}
            transition={{ 
              duration: 0.8,
              times: [0, 0.25, 1],
              ease: "easeInOut"
            }}
          />
        </svg>

        {/* Click Feedback */}
        <AnimatePresence>
          {spinCount > 0 && (
            <motion.div
              key={spinCount}
              initial={{ scale: 0.8, opacity: 0.2 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 rounded-full bg-black/5 pointer-events-none"
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
  const [logoSpinCount, setLogoSpinCount] = useState(0);
  const [isDownloadSpinning, setIsDownloadSpinning] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  const navRef = React.useRef<HTMLDivElement>(null);

  // Stable callbacks — only recreated when deps change
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

  // Scroll transforms
  const topBg = useTransform(scrollY, [0, 50], ['rgba(250,249,246,0)', 'rgba(250,249,246,0.85)']);
  const blurValue = useTransform(scrollY, [0, 50], ['blur(0px)', 'blur(20px)']);
  const borderOp = useTransform(scrollY, [0, 50], ['rgba(255,255,255,0)', 'rgba(0,0,0,0.04)']);
  const shadowValue = useTransform(scrollY, [0, 50], ['none', '0 10px 40px -10px rgba(0,0,0,0.05)']);
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

  // Memoized nav items with active state — only recomputed when location/active changes
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

        {/* Center: Nav Pill */}
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-1 bg-black/[0.03] p-1.5 sm:p-1 rounded-full border border-black/[0.03] shadow-inner">
            {navItems.map((item) => {
              const LinkContent = (
                <>
                  <span className="flex sm:hidden items-center justify-center w-full h-full">{item.icon}</span>
                  <span className="hidden sm:inline">{item.label}</span>
                  <span className="sm:hidden sr-only">{item.label}</span>
                </>
              );

              return item.type === 'scroll' ? (
                <motion.button
                  key={item.id}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-center sm:gap-2 w-10 h-10 sm:w-auto sm:h-auto sm:px-5 sm:py-2 rounded-full text-[13px] font-medium transition-all duration-200 ${
                    item.isActive ? 'bg-white text-black shadow-sm' : 'text-[#606060] hover:text-black hover:bg-white hover:shadow-sm'
                  }`}
                >
                  {LinkContent}
                </motion.button>
              ) : (
                <motion.div key={item.id} whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to={item.id}
                    className={`flex items-center justify-center sm:gap-2 w-10 h-10 sm:w-auto sm:h-auto sm:px-5 sm:py-2 rounded-full text-[13px] font-medium transition-all duration-200 ${
                      item.isActive ? 'bg-white text-black shadow-sm' : 'text-[#606060] hover:text-black hover:bg-white hover:shadow-sm'
                    }`}
                  >
                    {LinkContent}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center justify-end gap-1 sm:gap-2 shrink-0">
          <motion.a
            href={resumeFile}
            download="SiyadhKc_CV.pdf"
            whileHover={{ y: -2, backgroundColor: 'rgba(225,239,235,0.9)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownloadSpin}
            className="flex items-center justify-center bg-[#E1EFEB]/70 backdrop-blur-md hover:bg-[#D1E6E4] text-[#1D91A1] p-3 sm:px-5 sm:py-2.5 rounded-full font-sans text-[13px] font-medium shadow-sm border border-white/40 transition-all"
          >
            <motion.div
              animate={{ rotate: isDownloadSpinning ? 360 : 0 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              onAnimationComplete={() => setIsDownloadSpinning(false)}
              className="flex items-center justify-center"
            >
              <Download className="w-5 h-5 sm:w-4 sm:h-4 sm:mr-2" />
            </motion.div>
            <span className="hidden lg:inline text-[12px]">Resume</span>
          </motion.a>

          <div className="h-4 w-px bg-black/10 mx-0.5 hidden sm:block" />

          <motion.button
            whileHover={{ scale: 1.02, y: -2, backgroundColor: 'rgba(43,48,47,0.95)' }}
            whileTap={{ scale: 0.96 }}
            onClick={toggleMenu}
            className={`hidden sm:flex relative items-center justify-center p-3 sm:px-6 sm:py-3 rounded-full font-sans text-[13px] font-semibold transition-all duration-300 min-w-[48px] lg:min-w-[145px] overflow-hidden border border-white/10 ${
              isMenuOpen ? 'bg-black text-white shadow-lg' : 'bg-[#2B302F]/90 backdrop-blur-md text-white shadow-sm'
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMenuOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
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
                  <Mail className="w-4 h-4" />
                  <span className="hidden lg:inline tracking-wide font-mono uppercase text-[11px]">Contact</span>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Dropdown */}
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
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                style={{ transformOrigin: 'top right', willChange: 'transform, opacity' }}
                className="absolute right-0 top-full mt-4 w-64 bg-white/95 backdrop-blur-3xl border border-black/[0.05] rounded-[2rem] p-4 shadow-2xl z-50 overflow-hidden perspective-[1000px] flex flex-col gap-4"
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
                      className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-black/[0.02] border border-transparent hover:border-[#1D91A1]/20 hover:bg-[#1D91A1]/5 text-[#606060] hover:text-[#1D91A1] transition-all group"
                      onClick={closeMenu}
                    >
                      <div className="p-2.5 rounded-xl bg-white shadow-sm transition-colors group-hover:bg-[#1D91A1]/10">
                        {link.icon}
                      </div>
                      <span className="text-[10px] font-medium tracking-wide font-mono uppercase opacity-60 group-hover:opacity-100">
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
    </div>
  );
};
