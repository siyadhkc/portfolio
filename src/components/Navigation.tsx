import React, { useState, useEffect } from 'react';
import { Mail, Download, X, Github, Linkedin, Twitter, BookOpen, Briefcase } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLenis } from 'lenis/react';
import resumeFile from '../assets/Siyadhkc_Resume.pdf';
import { setScrollTarget } from '../lib/scrollTarget';

export const Navigation = () => {
  const { scrollY } = useScroll();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoSpinning, setIsLogoSpinning] = useState(false);
  const [isDownloadSpinning, setIsDownloadSpinning] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  const navRef = React.useRef<HTMLDivElement>(null);

  // Logo component inside to access state
  const Logo = () => (
    <Link
      to="/"
      onClick={(e) => {
        setIsLogoSpinning(true);
        if (location.pathname === '/') {
          e.preventDefault();
          if (lenis) {
            lenis.scrollTo(0, { duration: 1.2 });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }
      }}
      className="group relative flex items-center gap-3 px-4 py-2 rounded-full transition-all duration-500"
    >
      {/* High-End Branding Logic */}
      <div className="relative flex items-center overflow-visible">
        {/* The Aperture (Mobile Only) */}
        <div className="sm:hidden relative w-12 h-12 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
            <motion.circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="4, 4"
              className="text-black/20"
              animate={{ rotate: isLogoSpinning ? 360 : 0 }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            />
            <motion.circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="#1D91A1"
              strokeWidth="1"
              strokeDasharray="20, 120"
              strokeLinecap="round"
              animate={{ rotate: isLogoSpinning ? 720 : 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </svg>
          
          <motion.span 
            animate={{ rotate: isLogoSpinning ? 360 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            onAnimationComplete={() => setIsLogoSpinning(false)}
            className="text-2xl font-serif font-bold text-black relative z-10"
          >
            s
          </motion.span>
        </div>

        {/* Desktop Branding (siyadhkc) */}
        <div className="hidden sm:flex items-start gap-1">
          <div className="relative overflow-hidden group/text">
            <span className="font-serif text-[22px] font-bold text-black tracking-[-0.05em] leading-none block">
              siyadhkc
            </span>
            
            {/* Liquid Light Sweep */}
            <motion.div
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-y-0 w-full bg-gradient-to-r from-transparent via-[#1D91A1]/20 to-transparent skew-x-12"
            />
          </div>
          
        </div>
      </div>
    </Link>
  );

  // Robust Outside Click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Cinematic transitions
  const topBg = useTransform(scrollY, [0, 50], ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.7)']);
  const blurValue = useTransform(scrollY, [0, 50], ['blur(0px)', 'blur(20px)']);
  const borderOp = useTransform(scrollY, [0, 50], ['rgba(255,255,255,0)', 'rgba(0,0,0,0.04)']);
  const shadowValue = useTransform(scrollY, [0, 50], ['none', '0 10px 40px -10px rgba(0,0,0,0.05)']);
  const navWidth = useTransform(scrollY, [0, 100], ['100%', '98%']);
  const navY = useTransform(scrollY, [0, 50], ['0px', '4px']);

  // Section Observer for scroll highlighting
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-10% 0px -70% 0px" }
    );

    const projectSection = document.getElementById('projects');
    if (projectSection) observer.observe(projectSection);

    return () => observer.disconnect();
  }, [location.pathname]);

  const lenis = useLenis();

  const handleNavClick = (id: string) => {
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      // Set target BEFORE navigate so ScrollToTop skips the reset
      setScrollTarget(id);
      navigate('/');
      return;
    }
    // Already on home — just smooth scroll to section
    const el = document.getElementById(id);
    if (el) {
      if (lenis) {
        lenis.scrollTo(el, { offset: -120, duration: 1, immediate: false });
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const menuItems = [
    { label: 'Projects', id: 'projects', type: 'scroll', icon: <Briefcase className="w-5 h-5 sm:w-4 sm:h-4" /> },
    { label: 'Articles', id: '/articles', type: 'link', icon: <BookOpen className="w-5 h-5 sm:w-4 sm:h-4" /> },
  ];

  const contactLinks = [
    { icon: <Mail className="w-4 h-4" />, label: 'Email', href: 'mailto:siyadhkc@gmail.com' },
    { icon: <Github className="w-4 h-4" />, label: 'GitHub', href: 'https://github.com/siyadhkc' },
    { icon: <Linkedin className="w-4 h-4" />, label: 'LinkedIn', href: 'https://linkedin.com/in/siyadhkc' },
    { icon: <Twitter className="w-4 h-4" />, label: 'Twitter', href: 'https://x.com/siyadhkc' },
  ];

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
        {/* Left Section: Logo (Left Aligned) */}
        <div className="flex items-center justify-start overflow-hidden">
          <Logo />
        </div>

        {/* Center Section: Navigation Pill (Mathematically Centered) */}
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-1 sm:gap-1 bg-black/[0.03] p-1.5 sm:p-1 rounded-full border border-black/[0.03] shadow-inner">
            {menuItems.map((item) => {
              const isActive = item.type === 'link' 
                ? location.pathname === item.id 
                : activeSection === item.id;

              const LinkContent = (
                <>
                  <span className="md:hidden">{item.icon}</span>
                  <span className="hidden md:inline">{item.label}</span>
                  <span className="md:hidden sr-only">{item.label}</span>
                </>
              );

              return item.type === 'scroll' ? (
                <motion.button
                  key={item.id}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2 rounded-full text-[13px] sm:text-[13px] font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-white text-black shadow-sm' 
                      : 'text-[#606060] hover:text-black hover:bg-white hover:shadow-sm'
                  }`}
                >
                  {LinkContent}
                </motion.button>
              ) : (
                <motion.div key={item.id} whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to={item.id}
                    className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2 rounded-full text-[13px] sm:text-[13px] font-medium transition-all duration-200 ${
                      isActive 
                        ? 'bg-white text-black shadow-sm' 
                        : 'text-[#606060] hover:text-black hover:bg-white hover:shadow-sm'
                    }`}
                  >
                    {LinkContent}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Section: Actions (Right Aligned) */}
        <div className="flex items-center justify-end gap-1 sm:gap-2 shrink-0">
          <motion.a
            href={resumeFile}
            download="SiyadhKc_CV.pdf"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsDownloadSpinning(true)}
            className="flex items-center justify-center bg-[#E1EFEB]/80 hover:bg-[#D1E6E4] text-[#1D91A1] p-3 sm:px-5 sm:py-2.5 rounded-full font-sans text-[13px] font-medium shadow-sm transition-all"
          >
            <motion.div
              animate={{ rotate: isDownloadSpinning ? 360 : 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              onAnimationComplete={() => setIsDownloadSpinning(false)}
              className="flex items-center justify-center"
            >
              <Download className="w-5 h-5 sm:w-4 sm:h-4 sm:mr-2" />
            </motion.div>
            <span className="hidden lg:inline text-[12px]">Resume</span>
          </motion.a>

          <div className="h-4 w-px bg-black/10 mx-0.5 hidden sm:block"></div>

          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`relative flex items-center justify-center p-3 sm:px-6 sm:py-3 rounded-full font-sans text-[13px] font-semibold transition-colors duration-300 min-w-[48px] lg:min-w-[145px] overflow-hidden ${
              isMenuOpen ? 'bg-black text-white' : 'bg-[#2B302F] hover:bg-[#1A1F1E] text-white'
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

        {/* Snappy 3D Dropdown Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Production-Ready Global Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 bg-transparent z-10 pointer-events-auto"
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10, rotateX: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10, rotateX: -10 }}
                transition={{ 
                  duration: 0.3, 
                  ease: [0.23, 1, 0.32, 1],
                }}
                style={{ transformOrigin: "top right", willChange: "transform, opacity" }}
                className="absolute right-0 top-full mt-4 w-64 bg-white/95 backdrop-blur-3xl border border-black/[0.05] rounded-[2rem] p-4 shadow-2xl z-50 overflow-hidden perspective-[1000px] flex flex-col gap-4"
              >
                <div className="grid grid-cols-2 gap-2">
                  {contactLinks.map((link, i) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: i * 0.04, ease: "easeOut" }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-black/[0.02] border border-transparent hover:border-[#1D91A1]/20 hover:bg-[#1D91A1]/5 text-[#606060] hover:text-[#1D91A1] transition-all group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="p-2.5 rounded-xl bg-white shadow-sm transition-colors group-hover:bg-[#1D91A1]/10">
                        {link.icon}
                      </div>
                      <span className="text-[10px] font-medium tracking-wide font-mono uppercase opacity-60 group-hover:opacity-100">{link.label}</span>
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
