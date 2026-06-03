import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Mail, Download, X, Github, Linkedin, Twitter, BookOpen, Briefcase, User, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import resumeFile from '../assets/Siyadhkc_Resume.pdf';
import { clearAllScroll } from '../lib/scrollState';

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
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#09090b]/90 backdrop-blur-md border-b border-zinc-800/80">
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
              className="font-mono text-[13px] tracking-[0.25em] text-zinc-100 hover:text-white uppercase font-bold transition-colors"
            >
              siyadhkc
            </Link>
          </div>

          {/* Center Navigation links - hidden on mobile, visible on md and up */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const baseClass = "px-3 py-1.5 rounded text-[12px] font-mono transition-colors relative duration-150";
              const activeClass = "text-cyan-400 font-bold bg-zinc-900 border border-zinc-800";
              const inactiveClass = "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50";
              
              return (
                <Link
                  key={item.id}
                  to={item.id}
                  className={`${baseClass} ${item.isActive ? activeClass : inactiveClass}`}
                >
                  {item.isActive ? `[ ${item.label} ]` : item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Resume button - hidden on small mobile, visible on sm and up */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="hidden sm:flex items-center justify-center bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 px-4 py-1.5 rounded text-[11px] font-mono uppercase tracking-wider font-semibold transition-colors"
            >
              <Download className="w-3.5 h-3.5 mr-2 text-cyan-400" />
              <span>Resume</span>
            </button>

            {/* Desktop contact button - hidden on mobile, visible on sm and up */}
            <button
              onClick={toggleMenu}
              className={`hidden sm:flex items-center justify-center p-2 rounded border transition-colors ${
                isMenuOpen 
                  ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' 
                  : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-200'
              }`}
              aria-label="Toggle contact menu"
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
            </button>

            {/* Mobile hamburger menu button - visible on mobile, hidden on md and up */}
            <button
              onClick={toggleMobileMenu}
              className={`flex md:hidden items-center justify-center p-2 rounded border transition-colors ${
                isMobileMenuOpen 
                  ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' 
                  : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-200'
              }`}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

          {/* Dropdown Menu (Clean layout matching dark technical theme) */}
          {isMenuOpen && (
            <>
              <div
                onClick={closeMenu}
                className="fixed inset-0 bg-black/40 z-40"
              />
              <div
                className="absolute right-6 top-full mt-2 w-56 bg-zinc-950 border border-zinc-800 rounded-xl p-3 shadow-2xl z-50 flex flex-col gap-1"
              >
                <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest px-2.5 py-1.5 border-b border-zinc-900 mb-1">Links / Contact</span>
                {CONTACT_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:text-cyan-400 hover:bg-zinc-900 transition-colors group"
                    onClick={closeMenu}
                  >
                    <span className="text-zinc-500 group-hover:text-cyan-400 transition-colors">{link.icon}</span>
                    <span className="text-[12px] font-mono">{link.label}</span>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <>
          <div
            onClick={closeMobileMenu}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          />
          <div
            ref={drawerRef}
            className="fixed right-0 top-0 bottom-0 w-[280px] bg-zinc-950 border-l border-zinc-900 p-6 z-50 flex flex-col gap-6 shadow-2xl md:hidden animate-in slide-in-from-right duration-200"
          >
            {/* Header / Logo inside drawer */}
            <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
              <span className="font-mono text-xs tracking-[0.2em] text-zinc-400 font-bold">MENU</span>
              <button
                onClick={closeMobileMenu}
                className="p-1 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation links inside drawer */}
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.id}
                  onClick={closeMobileMenu}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-mono transition-colors ${
                    item.isActive
                      ? 'text-cyan-400 font-bold bg-zinc-900 border border-zinc-850'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Actions inside drawer */}
            <div className="border-t border-zinc-900 pt-6 flex flex-col gap-4">
              <button
                onClick={() => {
                  closeMobileMenu();
                  setIsModalOpen(true);
                }}
                className="w-full flex items-center justify-center bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-850 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold transition-colors"
              >
                <Download className="w-4 h-4 mr-2 text-cyan-400" />
                Resume
              </button>
            </div>

            {/* Social / Contact Links inside drawer */}
            <div className="mt-auto border-t border-zinc-900 pt-4 flex flex-col gap-1.5">
              <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest px-2 pb-1.5 border-b border-zinc-900/50 mb-1">Connect</span>
              {CONTACT_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-3 px-2 py-1.5 text-zinc-400 hover:text-cyan-400 transition-colors group"
                  onClick={closeMobileMenu}
                >
                  <span className="text-zinc-500 group-hover:text-cyan-400 transition-colors">{link.icon}</span>
                  <span className="text-[11px] font-mono">{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Clean Technical Download Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            onClick={() => setIsModalOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-[340px] bg-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-2xl flex flex-col items-center">
            <div className="text-center mb-6 w-full border-b border-zinc-900 pb-4">
              <h3 className="text-[14px] font-mono font-bold text-zinc-100 tracking-wider mb-1">DOWNLOAD_CV.PDF</h3>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500">Last updated: May 2026</span>
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
