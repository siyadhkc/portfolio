import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Mail, Download, X, Github, Linkedin, Twitter, BookOpen, Briefcase, User, Menu, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import resumeFile from '../assets/Siyadhkc_Resume.pdf';
import { clearAllScroll } from '../lib/scrollState';
import { useTheme } from './ThemeContext';

const CONTACT_LINKS = [
  { icon: <Mail className="w-4 h-4" />, label: 'Email', href: 'mailto:siyadhkc@gmail.com' },
  { icon: <Github className="w-4 h-4" />, label: 'GitHub', href: 'https://github.com/siyadhkc' },
  { icon: <Linkedin className="w-4 h-4" />, label: 'LinkedIn', href: 'https://linkedin.com/in/siyadhkc' },
  { icon: <Twitter className="w-4 h-4" />, label: 'Twitter', href: 'https://x.com/siyadhkc' },
];

const MENU_ITEMS = [
  { label: 'About', id: '/', type: 'link', icon: <User className="w-4 h-4" /> },
  { label: 'Projects', id: '/projects', type: 'link', icon: <Briefcase className="w-4 h-4" /> },
  { label: 'Blog', id: '/blog', type: 'link', icon: <BookOpen className="w-4 h-4" /> },
] as const;

export const Navigation = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navRef = React.useRef<HTMLDivElement>(null);
  const drawerRef = React.useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const toggleMenu = useCallback(() => setIsMenuOpen((v) => !v), []);
  
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);
  const toggleMobileMenu = useCallback(() => setIsMobileMenuOpen((v) => !v), []);

  // Outside-click handler
  useEffect(() => {
    if (!isMenuOpen && !isMobileMenuOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isInsideNav = navRef.current?.contains(target);
      const isInsideDrawer = drawerRef.current?.contains(target);
      
      if (!isInsideNav && !isInsideDrawer) {
        setIsMenuOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen, isMobileMenuOpen]);



  const navItems = useMemo(
    () =>
      MENU_ITEMS.map((item) => {
        let isActive = false;
        if (item.id === '/') {
          isActive = location.pathname === '/';
        } else if (item.id === '/projects') {
          isActive = location.pathname.startsWith('/projects');
        } else {
          isActive = location.pathname === item.id;
        }
        return {
          ...item,
          isActive,
        };
      }),
    [location.pathname],
  );

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#09090b]/90 backdrop-blur-md border-b border-zinc-200/60 dark:border-zinc-800/60 shadow-sm shadow-violet-100/20 dark:shadow-none transition-colors duration-200">
        <div 
          ref={navRef}
          className="mx-auto flex items-center justify-between px-6 py-4 max-w-[1000px] w-full"
        >
          {/* Logo */}
          <div className="flex items-center justify-start">
            <Link
              to="/"
              onClick={() => {
                clearAllScroll();
                if (location.pathname === '/') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="font-mono text-[13px] tracking-[0.25em] text-zinc-900 dark:text-zinc-100 hover:text-violet-700 dark:hover:text-violet-300 uppercase font-bold transition-colors"
            >
              siyadhkc
            </Link>
          </div>

          {/* Center Navigation links - hidden on mobile, visible on md and up */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const baseClass = "px-3 py-1.5 rounded-lg text-[12px] font-mono transition-colors duration-150";
              const activeClass = "text-violet-700 dark:text-violet-300 font-bold bg-violet-50 dark:bg-violet-950/40 border border-violet-200/60 dark:border-violet-800/40";
              const inactiveClass = "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100/60 dark:hover:bg-white/5";
              
              return (
                <Link
                  key={item.id}
                  to={item.id}
                  className={`${baseClass} ${item.isActive ? activeClass : inactiveClass}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center p-2 rounded-lg border bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 border-zinc-200/60 dark:border-zinc-700/50 text-zinc-600 dark:text-zinc-300 transition-colors duration-150"
              aria-label="Toggle dark/light mode"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            {/* Resume button - hidden on small mobile, visible on sm and up */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="hidden sm:flex items-center justify-center bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 text-zinc-700 dark:text-zinc-200 border border-zinc-200/60 dark:border-zinc-700/50 px-4 py-1.5 rounded-lg text-[11px] font-mono uppercase tracking-wider font-semibold transition-colors duration-150"
            >
              <Download className="w-3.5 h-3.5 mr-2 text-cyan-600 dark:text-cyan-400" />
              <span>Resume</span>
            </button>

            {/* Desktop contact button - hidden on mobile, visible on sm and up */}
            <button
              onClick={toggleMenu}
              className={`hidden sm:flex items-center justify-center p-2 rounded-lg border transition-colors duration-150 ${
                isMenuOpen 
                  ? 'bg-violet-50 dark:bg-violet-950/30 border-violet-300/60 dark:border-violet-700/40 text-violet-700 dark:text-violet-300' 
                  : 'bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 border-zinc-200/60 dark:border-zinc-700/50 text-zinc-600 dark:text-zinc-300'
              }`}
              aria-label="Toggle contact menu"
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
            </button>

            {/* Mobile hamburger menu button - visible on mobile, hidden on md and up */}
            <button
              onClick={toggleMobileMenu}
              className={`flex md:hidden items-center justify-center p-2 rounded-lg border transition-colors duration-150 ${
                isMobileMenuOpen 
                  ? 'bg-violet-50 dark:bg-violet-950/30 border-violet-300/60 dark:border-violet-700/40 text-violet-700 dark:text-violet-300' 
                  : 'bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 border-zinc-200/60 dark:border-zinc-700/50 text-zinc-600 dark:text-zinc-300'
              }`}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

          {/* Dropdown Menu (Clean layout matching dark/light technical theme) */}
          {isMenuOpen && (
            <>
              <div
                onClick={closeMenu}
                className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40"
              />
              <div
                className="absolute right-6 top-full mt-2 w-56 bg-white/95 dark:bg-[#09090b]/98 backdrop-blur-md border border-zinc-200/60 dark:border-zinc-800/60 rounded-xl p-3 shadow-lg z-50 flex flex-col gap-1"
              >
                <span className="font-mono text-[9px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest px-2.5 py-1.5 border-b border-zinc-100 dark:border-zinc-900 mb-1">Links / Contact</span>
                {CONTACT_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-violet-700 dark:hover:text-violet-300 hover:bg-violet-50/50 dark:hover:bg-violet-950/20 transition-colors duration-150 group"
                    onClick={closeMenu}
                  >
                    <span className="text-zinc-400 dark:text-zinc-500 group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">{link.icon}</span>
                    <span className="text-[12px] font-mono">{link.label}</span>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </header>

      {/* Mobile Menu — simple compact dropdown */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={closeMobileMenu}
            className="fixed inset-0 z-40 md:hidden"
          />

          {/* Dropdown panel — sits just below the header */}
          <div
            ref={drawerRef}
            className="fixed top-[61px] left-0 right-0 z-50 md:hidden bg-white/95 dark:bg-[#0a0a0f]/97 backdrop-blur-md border-b border-zinc-200/60 dark:border-zinc-800/50 shadow-sm"
          >
            {/* Nav links */}
            <nav className="flex flex-col px-4 py-2">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.id}
                  onClick={closeMobileMenu}
                  className={`flex items-center gap-3 px-3 py-2.5 text-[13px] font-mono transition-colors duration-150 ${
                    item.isActive
                      ? 'text-zinc-900 dark:text-zinc-100 font-semibold'
                      : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
                  }`}
                >
                  <span className={item.isActive ? 'text-zinc-700 dark:text-zinc-300' : 'text-zinc-400 dark:text-zinc-600'}>
                    {item.icon}
                  </span>
                  {item.label}
                  {item.isActive && <span className="ml-auto w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-500" />}
                </Link>
              ))}
            </nav>

            {/* Divider + actions */}
            <div className="border-t border-zinc-100 dark:border-zinc-800/60 px-4 py-3 flex items-center gap-2">
              {CONTACT_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={closeMobileMenu}
                  title={link.label}
                  className="flex items-center justify-center w-8 h-8 rounded-lg text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors duration-150"
                >
                  {link.icon}
                </a>
              ))}
              <button
                onClick={() => { closeMobileMenu(); setIsModalOpen(true); }}
                className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200/70 dark:border-zinc-700/50 text-zinc-600 dark:text-zinc-300 text-[11px] font-mono uppercase tracking-wider hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors duration-150"
              >
                <Download className="w-3 h-3" />
                Resume
              </button>
            </div>
          </div>
        </>
      )}

      {/* Clean Technical Download Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            onClick={() => setIsModalOpen(false)}
            className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-[340px] bg-white/95 dark:bg-[#09090b]/98 backdrop-blur-xl border border-white/80 dark:border-zinc-800/60 rounded-2xl p-6 shadow-2xl shadow-violet-200/20 dark:shadow-black/60 flex flex-col items-center">
            <div className="text-center mb-6 w-full border-b border-zinc-100 dark:border-zinc-900 pb-4">
              <h3 className="text-[14px] font-mono font-bold text-zinc-900 dark:text-zinc-100 tracking-wider mb-1">DOWNLOAD_CV.PDF</h3>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">Last updated: May 2026</span>
            </div>
            
            <div className="flex flex-col w-full gap-2">
              <a
                href={resumeFile}
                download="SiyadhKc_CV.pdf"
                onClick={() => setIsModalOpen(false)}
                className="w-full bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-400 hover:to-cyan-400 text-zinc-950 font-bold py-2.5 rounded-lg text-[12px] font-mono uppercase tracking-wider text-center shadow-[0_0_15px_rgba(139,92,246,0.15)] hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300 block"
              >
                Confirm Download
              </a>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full py-2.5 text-zinc-500 font-mono text-[11px] hover:text-zinc-300 transition-colors uppercase tracking-wider"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Navigation;
