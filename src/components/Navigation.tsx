import React, { useState, useEffect } from 'react';
import { Mail, Download, Menu, X, Github, Linkedin, Twitter, BookOpen, ExternalLink, Briefcase, FileText } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import resumeFile from '../assets/Siyadhkc_Resume.pdf';

const Logo = () => (
  <Link
    to="/"
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    className="group relative flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-black/[0.03] transition-all duration-300"
  >
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative z-10"
    >
      <span className="font-serif text-lg md:text-xl font-bold text-black tracking-tighter">
        <span className="hidden sm:inline">siyadhkc</span>
        <span className="sm:hidden">s</span>
      </span>
    </motion.div>
    <div className="w-1 h-1 rounded-full bg-[#1D91A1] group-hover:scale-150 transition-transform"></div>
  </Link>
);

export const Navigation = () => {
  const { scrollY } = useScroll();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const topBg = useTransform(scrollY, [0, 50], ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.7)']);
  const blurValue = useTransform(scrollY, [0, 50], ['blur(0px)', 'blur(20px)']);
  const borderOp = useTransform(scrollY, [0, 50], ['rgba(255,255,255,0)', 'rgba(0,0,0,0.04)']);
  const shadowValue = useTransform(scrollY, [0, 50], ['none', '0 10px 40px -10px rgba(0,0,0,0.05)']);
  const navWidth = useTransform(scrollY, [0, 100], ['100%', '98%']);
  const navY = useTransform(scrollY, [0, 50], ['0px', '4px']);

  const handleNavClick = (id: string) => {
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (location.hash && location.pathname === '/') {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  const menuItems = [
    { label: 'Projects', id: 'projects', type: 'scroll', icon: <Briefcase className="w-4 h-4" /> },
    { label: 'Articles', id: '/articles', type: 'link', icon: <BookOpen className="w-4 h-4" /> },
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
        aria-label="Main navigation"
        style={{
          backgroundColor: topBg,
          backdropFilter: blurValue,
          borderColor: borderOp,
          boxShadow: shadowValue,
          width: navWidth,
          y: navY,
        }}
        className="pointer-events-auto relative flex items-center justify-between px-2 sm:px-4 py-1.5 w-full max-w-[1000px] rounded-full border border-transparent transition-all duration-300"
      >
        <div className="flex items-center gap-1 sm:gap-2">
          <Logo />
        </div>

        {/* Global Menu - Shown on all screens */}
        <div className="flex items-center gap-0.5 sm:gap-1 bg-black/[0.03] p-1 rounded-full border border-black/[0.03]">
          {menuItems.map((item) => (
            item.type === 'scroll' ? (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="flex items-center gap-2 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-[13px] font-medium text-[#606060] hover:text-black hover:bg-white transition-all duration-200"
              >
                <span className="md:hidden">{item.icon}</span>
                <span className="hidden md:inline">{item.label}</span>
                <span className="md:hidden sr-only">{item.label}</span>
              </button>
            ) : (
              <Link
                key={item.id}
                to={item.id}
                className={`flex items-center gap-2 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-[13px] font-medium transition-all duration-200 ${
                  location.pathname === item.id 
                    ? 'bg-white text-black shadow-sm' 
                    : 'text-[#606060] hover:text-black hover:bg-white'
                }`}
              >
                <span className="md:hidden">{item.icon}</span>
                <span className="hidden md:inline">{item.label}</span>
                <span className="md:hidden sr-only">{item.label}</span>
              </Link>
            )
          ))}
        </div>

        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Resume Icon/Button */}
          <a
            href={resumeFile}
            download="SiyadhKc_CV.pdf"
            title="Download Resume"
            className="flex items-center justify-center bg-[#E1EFEB]/80 hover:bg-[#D1E6E4] text-[#1D91A1] p-2 sm:px-4 sm:py-2.5 rounded-full font-sans text-[13px] font-medium transition-all hover:scale-[1.05]"
          >
            <Download className="w-4 h-4 sm:mr-2" />
            <span className="hidden lg:inline text-[12px]">CV</span>
          </a>

          <div className="h-4 w-px bg-black/10 mx-0.5 hidden sm:block"></div>

          {/* Contact Menu Trigger */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`relative flex items-center justify-center p-2 sm:px-4 sm:py-2.5 rounded-full font-sans text-[13px] font-medium shadow-md transition-all ${
              isMenuOpen ? 'bg-black text-white' : 'bg-[#2B302F] hover:bg-black text-white'
            }`}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center"
                >
                  <X className="w-4 h-4" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center"
                >
                   <Mail className="w-4 h-4 sm:mr-2" />
                   <span className="hidden lg:inline text-[12px]">Reach Out</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Contact Dropdown Only */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 10, rotateX: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 10, rotateX: -10 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              style={{ transformOrigin: "top right" }}
              className="absolute right-0 top-full mt-4 w-64 bg-white/95 backdrop-blur-3xl border border-black/[0.05] rounded-[2rem] p-4 shadow-2xl z-50 overflow-hidden perspective-[1000px]"
            >
              <div className="grid grid-cols-2 gap-2">
                {contactLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-black/[0.02] hover:bg-[#1D91A1]/10 text-[#606060] hover:text-[#1D91A1] transition-all group"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="p-2 rounded-lg bg-white shadow-sm transition-colors">
                      {link.icon}
                    </div>
                    <span className="text-[10px] font-medium tracking-wide font-mono uppercase opacity-60 group-hover:opacity-100">{link.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};
