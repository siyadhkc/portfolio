import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Mail, Download, X, Github, Linkedin, Twitter, BookOpen, Briefcase, User, Menu, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import resumeFile from '../assets/Siyadhkc_Resume.pdf';
import { clearAllScroll } from '../lib/scrollState';
import { useTheme } from './ThemeContext';

const CONTACT_LINKS = [
  { icon: <Mail className="w-4 h-4" />,    label: 'Email',    href: 'mailto:siyadhkc@gmail.com' },
  { icon: <Github className="w-4 h-4" />,  label: 'GitHub',   href: 'https://github.com/siyadhkc' },
  { icon: <Linkedin className="w-4 h-4" />,label: 'LinkedIn', href: 'https://linkedin.com/in/siyadhkc' },
  { icon: <Twitter className="w-4 h-4" />, label: 'X',        href: 'https://x.com/siyadhkc' },
];

const MENU_ITEMS = [
  { label: 'About',    id: '/',        type: 'link', icon: <User className="w-4 h-4" /> },
  { label: 'Projects', id: '/projects', type: 'link', icon: <Briefcase className="w-4 h-4" /> },
  { label: 'Blog',     id: '/blog',    type: 'link', icon: <BookOpen className="w-4 h-4" /> },
] as const;

export const Navigation = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const [isMenuOpen, setIsMenuOpen]         = useState(false);
  const [isModalOpen, setIsModalOpen]       = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navRef    = React.useRef<HTMLDivElement>(null);
  const drawerRef = React.useRef<HTMLDivElement>(null);

  const closeMenu       = useCallback(() => setIsMenuOpen(false), []);
  const toggleMenu      = useCallback(() => setIsMenuOpen(v => !v), []);
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);
  const toggleMobileMenu = useCallback(() => setIsMobileMenuOpen(v => !v), []);

  // Outside-click handler
  useEffect(() => {
    if (!isMenuOpen && !isMobileMenuOpen) return;
    const handler = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!navRef.current?.contains(t) && !drawerRef.current?.contains(t)) {
        setIsMenuOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isMenuOpen, isMobileMenuOpen]);

  const navItems = useMemo(() =>
    MENU_ITEMS.map(item => {
      const isActive =
        item.id === '/'        ? location.pathname === '/' :
        item.id === '/projects' ? location.pathname.startsWith('/projects') :
        location.pathname === item.id;
      return { ...item, isActive };
    }),
  [location.pathname]);

  // ── shared button base ──────────────────────────────────────────────
  const btnBase =
    'flex items-center justify-center p-2 rounded-lg border transition-all duration-200 ' +
    'border-[#E6E7DC] dark:border-zinc-700/60 ' +
    'bg-[#FBFBF7] dark:bg-zinc-900 ' +
    'text-[#5F5F54] dark:text-zinc-300 ' +
    'hover:bg-[#F2F4EA] dark:hover:bg-zinc-800 ' +
    'hover:border-[#D6D8CB] dark:hover:border-zinc-600 ' +
    'hover:-translate-y-0.5 hover:shadow-sm hover:shadow-[#E7E8DD]/70 dark:hover:shadow-black/30';

  return (
    <>
      {/* ── Header ──────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FBFBF7]/95 dark:bg-zinc-950/90 backdrop-blur-md border-b border-[#E6E7DC] dark:border-zinc-800 transition-colors duration-200">
        <div
          ref={navRef}
          className="mx-auto flex items-center justify-between px-6 py-4 max-w-[1000px] w-full"
        >
          {/* Logo */}
          <Link
            to="/"
            onClick={() => {
              clearAllScroll();
              if (location.pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-mono text-[13px] tracking-[0.25em] uppercase font-bold text-[#25251F] dark:text-zinc-100 hover:text-[#1D91A1] dark:hover:text-[#7ED6E1] transition-colors duration-200"
          >
            siyadhkc
          </Link>

          {/* Center nav — desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <Link
                key={item.id}
                to={item.id}
                className={
                  'px-3 py-1.5 rounded-lg text-[12px] font-mono transition-all duration-200 ' +
                  (item.isActive
                    ? 'bg-[#F2F4EA] dark:bg-zinc-800 text-[#25251F] dark:text-zinc-100 font-semibold'
                    : 'text-[#6F6F64] dark:text-zinc-400 hover:text-[#25251F] dark:hover:text-zinc-100 hover:bg-[#F2F4EA] dark:hover:bg-zinc-800/60 hover:-translate-y-0.5')
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className={btnBase}
              aria-label="Toggle dark/light mode"
            >
              {theme === 'dark'
                ? <Sun className="w-4 h-4 text-amber-400" />
                : <Moon className="w-4 h-4 text-[#6F6F64]" />}
            </button>

            {/* Resume — hidden on xs */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-lg border transition-all duration-200 border-[#E6E7DC] dark:border-zinc-700/60 bg-[#FBFBF7] dark:bg-zinc-900 hover:bg-[#F2F4EA] dark:hover:bg-zinc-800 text-[#4C4C42] dark:text-zinc-200 text-[11px] font-mono uppercase tracking-wider font-semibold hover:-translate-y-0.5 hover:border-[#D6D8CB] hover:shadow-sm hover:shadow-[#E7E8DD]/70 dark:hover:shadow-black/30"
            >
              <Download className="w-3.5 h-3.5 text-[#77776B] dark:text-zinc-400" />
              Resume
            </button>

            {/* Mail — desktop only */}
            <button
              onClick={toggleMenu}
              className={
                'hidden sm:flex items-center justify-center p-2 rounded-lg border transition-all duration-200 ' +
                (isMenuOpen
                  ? 'bg-[#F2F4EA] dark:bg-zinc-800 border-[#D6D8CB] dark:border-zinc-600 text-[#25251F] dark:text-zinc-100'
                  : 'border-[#E6E7DC] dark:border-zinc-700/60 bg-[#FBFBF7] dark:bg-zinc-900 hover:bg-[#F2F4EA] dark:hover:bg-zinc-800 text-[#5F5F54] dark:text-zinc-300 hover:-translate-y-0.5 hover:border-[#D6D8CB] hover:shadow-sm hover:shadow-[#E7E8DD]/70 dark:hover:shadow-black/30')
              }
              aria-label="Toggle contact menu"
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
            </button>

            {/* Hamburger — mobile only */}
            <button
              onClick={toggleMobileMenu}
              className={
                'flex md:hidden items-center justify-center p-2 rounded-lg border transition-all duration-200 ' +
                (isMobileMenuOpen
                  ? 'bg-[#F2F4EA] dark:bg-zinc-800 border-[#D6D8CB] dark:border-zinc-600 text-[#25251F] dark:text-zinc-100'
                  : 'border-[#E6E7DC] dark:border-zinc-700/60 bg-[#FBFBF7] dark:bg-zinc-900 hover:bg-[#F2F4EA] dark:hover:bg-zinc-800 text-[#5F5F54] dark:text-zinc-300 hover:-translate-y-0.5 hover:border-[#D6D8CB] hover:shadow-sm hover:shadow-[#E7E8DD]/70 dark:hover:shadow-black/30')
              }
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

          {/* Contact dropdown */}
          {isMenuOpen && (
            <>
              <div onClick={closeMenu} className="fixed inset-0 z-40" />
              <div className="absolute right-6 top-full mt-2 w-52 bg-[#FBFBF7] dark:bg-zinc-900 border border-[#E6E7DC] dark:border-zinc-800 rounded-xl p-2 shadow-lg shadow-[#E7E8DD]/70 dark:shadow-black/40 z-50 flex flex-col gap-0.5">
                <span className="font-mono text-[9px] text-[#8A897D] dark:text-zinc-500 uppercase tracking-widest px-2.5 py-1.5 border-b border-[#ECEDE3] dark:border-zinc-800 mb-1">
                  Links / Contact
                </span>
                {CONTACT_LINKS.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={closeMenu}
                    className="group flex items-center gap-3 px-3 py-2 rounded-lg text-[#5F5F54] dark:text-zinc-400 hover:text-[#25251F] dark:hover:text-zinc-100 hover:bg-[#F2F4EA] dark:hover:bg-zinc-800 transition-all duration-200"
                  >
                    <span className="text-[#8A897D] dark:text-zinc-500">{link.icon}</span>
                    <span className="text-[12px] font-mono transition-transform duration-200 group-hover:translate-x-0.5">{link.label}</span>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </header>

      {/* ── Mobile dropdown ─────────────────────────────────────────── */}
      {isMobileMenuOpen && (
        <>
          <div onClick={closeMobileMenu} className="fixed inset-0 z-40 md:hidden" />
          <div
            ref={drawerRef}
            className="fixed top-[61px] left-0 right-0 z-50 md:hidden bg-[#FBFBF7] dark:bg-zinc-950 border-b border-[#E6E7DC] dark:border-zinc-800 shadow-sm shadow-[#E7E8DD] dark:shadow-none"
          >
            {/* Nav links */}
            <nav className="flex flex-col px-4 py-2">
              {navItems.map(item => (
                <Link
                  key={item.id}
                  to={item.id}
                  onClick={closeMobileMenu}
                  className={
                    'group flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-mono transition-all duration-200 ' +
                    (item.isActive
                      ? 'bg-[#F2F4EA] dark:bg-zinc-800 text-[#25251F] dark:text-zinc-100 font-semibold'
                      : 'text-[#6F6F64] dark:text-zinc-400 hover:text-[#25251F] dark:hover:text-zinc-100 hover:bg-[#F2F4EA] dark:hover:bg-zinc-800/50')
                  }
                >
                  <span className={item.isActive ? 'text-[#5F5F54] dark:text-zinc-300' : 'text-[#8A897D] dark:text-zinc-600'}>
                    {item.icon}
                  </span>
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">{item.label}</span>
                  {item.isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#B0B1A3] dark:bg-zinc-500" />}
                </Link>
              ))}
            </nav>

            {/* Bottom row — social + resume */}
            <div className="border-t border-[#ECEDE3] dark:border-zinc-800 px-4 py-3 flex items-center gap-2">
              {CONTACT_LINKS.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={closeMobileMenu}
                  title={link.label}
                  className="flex items-center justify-center w-8 h-8 rounded-lg text-[#8A897D] dark:text-zinc-500 hover:text-[#1D91A1] dark:hover:text-[#7ED6E1] hover:bg-[#F2F4EA] dark:hover:bg-zinc-800 transition-all duration-200 hover:-translate-y-0.5"
                >
                  {link.icon}
                </a>
              ))}
              <button
                onClick={() => { closeMobileMenu(); setIsModalOpen(true); }}
                className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E6E7DC] dark:border-zinc-700 bg-[#FBFBF7] dark:bg-zinc-900 text-[#4C4C42] dark:text-zinc-200 text-[11px] font-mono uppercase tracking-wider hover:bg-[#F2F4EA] dark:hover:bg-zinc-800 hover:border-[#D6D8CB] transition-all duration-200 hover:-translate-y-0.5"
              >
                <Download className="w-3 h-3" />
                Resume
              </button>
            </div>
          </div>
        </>
      )}

      {/* ── Resume modal ────────────────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            onClick={() => setIsModalOpen(false)}
            className="absolute inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-[340px] bg-[#FBFBF7] dark:bg-zinc-900 border border-[#E6E7DC] dark:border-zinc-800 rounded-2xl p-6 shadow-2xl shadow-[#E7E8DD]/70 dark:shadow-black/60 flex flex-col items-center">
            <div className="text-center mb-6 w-full border-b border-[#ECEDE3] dark:border-zinc-800 pb-4">
              <h3 className="text-[14px] font-mono font-bold text-[#25251F] dark:text-zinc-100 tracking-wider mb-1">
                DOWNLOAD_CV.PDF
              </h3>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#8A897D] dark:text-zinc-500">
                Last updated: June 2026
              </span>
            </div>
            <div className="flex flex-col w-full gap-2">
              <a
                href={resumeFile}
                download="SiyadhKc_CV.pdf"
                onClick={() => setIsModalOpen(false)}
                className="w-full bg-gradient-to-r from-[#6F735D] to-[#1D91A1] hover:from-[#5F644E] hover:to-[#167A88] text-white font-bold py-2.5 rounded-lg text-[12px] font-mono uppercase tracking-wider text-center transition-all duration-200 block"
              >
                Confirm Download
              </a>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full py-2.5 text-[#6F6F64] dark:text-zinc-400 hover:text-[#25251F] dark:hover:text-zinc-200 font-mono text-[11px] transition-colors uppercase tracking-wider"
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
