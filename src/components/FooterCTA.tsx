import React, { useCallback } from 'react';
import { Mail, Github, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SOCIAL = [
  { href: 'mailto:siyadhkc@gmail.com',       Icon: Mail,     label: 'Email' },
  { href: 'https://github.com/siyadhkc',      Icon: Github,   label: 'GitHub' },
  { href: 'https://linkedin.com/in/siyadhkc', Icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://x.com/siyadhkc',           Icon: Twitter,  label: 'X / Twitter' },
];

const NAV = [
  { label: 'About',    to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'Blog',     to: '/blog' },
];

export const FooterCTA = () => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <footer id="contact" className="w-full mt-24 bg-zinc-50 dark:bg-zinc-950/60 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-[1000px] mx-auto px-6 md:px-8">

        {/* ── Hero quote row ────────────────────────────────────────────── */}
        <div className="py-14 border-b border-zinc-200 dark:border-zinc-800">
          <p className="text-[1.05rem] sm:text-[1.2rem] font-light text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-[640px]">
            "The most dangerous software is the software{' '}
            <em className="not-italic font-medium text-zinc-800 dark:text-zinc-200">
              no one bothered to question.
            </em>
            "
          </p>
          <span className="block mt-3 text-sm text-zinc-400 dark:text-zinc-600">— Siyadh KC</span>
        </div>

        {/* ── 3-col grid ───────────────────────────────────────────────── */}
        <div className="py-10 grid grid-cols-1 sm:grid-cols-3 gap-10 border-b border-zinc-200 dark:border-zinc-800">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Siyadh KC</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-0.5">Backend Developer & Security Researcher</p>
            </div>
            <p className="text-[13px] text-zinc-400 dark:text-zinc-600 leading-relaxed max-w-[240px]">
              Building systems that are hard to break, and researching the ones that aren't.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-600">Navigation</p>
            <nav className="flex flex-col gap-2.5">
              {NAV.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-[14px] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-150 w-fit"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-600">Contact</p>
            <div className="flex flex-col gap-2.5">
              {SOCIAL.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noreferrer"
                  className="group flex items-center gap-2 text-[14px] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-150 w-fit"
                >
                  <Icon className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors duration-150 shrink-0" />
                  {label}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-0.5 transition-opacity duration-150 text-zinc-400" />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* ── Bottom bar ───────────────────────────────────────────────── */}
        <div className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-[12px] text-zinc-400 dark:text-zinc-600">
            © 2026 Siyadh KC. Crafted with care.
          </p>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-1.5 text-[12px] text-zinc-400 dark:text-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors duration-150"
          >
            Back to top
            <span className="inline-block group-hover:-translate-y-0.5 transition-transform duration-150 text-base leading-none">↑</span>
          </button>
        </div>

      </div>
    </footer>
  );
};

export default FooterCTA;
