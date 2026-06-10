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
    <footer id="contact" className="w-full mt-16 sm:mt-24 bg-[#FBFBF7] dark:bg-zinc-950/60 border-t border-[#E6E7DC] dark:border-zinc-800">
      <div className="max-w-[1000px] mx-auto px-5 sm:px-6 md:px-8">

        {/* ── Hero quote row ────────────────────────────────────────────── */}
        <div className="py-10 sm:py-14 border-b border-[#E6E7DC] dark:border-zinc-800 text-center sm:text-left">
          <p className="mx-auto sm:mx-0 text-[1rem] sm:text-[1.2rem] font-light text-[#6F6F64] dark:text-zinc-400 leading-relaxed max-w-[640px]">
            "The most dangerous software is the software{' '}
            <em className="not-italic font-medium text-[#25251F] dark:text-zinc-200">
              no one bothered to question.
            </em>
            "
          </p>
          <span className="block mt-3 text-sm text-[#8A897D] dark:text-zinc-600">— Siyadh KC</span>
        </div>

        {/* ── 3-col grid ───────────────────────────────────────────────── */}
        <div className="py-8 sm:py-10 grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10 border-b border-[#E6E7DC] dark:border-zinc-800">

          {/* Brand */}
          <div className="flex flex-col items-center text-center min-[420px]:col-span-2 sm:col-span-1 sm:items-start sm:text-left gap-4">
            <div>
              <p className="text-xl font-bold text-[#25251F] dark:text-zinc-100 tracking-tight">Siyadh KC</p>
              <p className="text-sm text-[#6F6F64] dark:text-zinc-500 mt-0.5">Backend Developer & Security Researcher</p>
            </div>
            <p className="text-[13px] text-[#8A897D] dark:text-zinc-600 leading-relaxed max-w-[280px] sm:max-w-[240px]">
              Building systems that are hard to break, and researching the ones that aren't.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col items-center sm:items-start gap-4">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#8A897D] dark:text-zinc-600">Navigation</p>
            <nav className="flex flex-col items-center sm:items-start gap-1.5 w-full">
              {NAV.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="group inline-flex min-h-9 items-center rounded-md px-2.5 text-[14px] text-[#5F5F54] dark:text-zinc-400 hover:text-[#25251F] dark:hover:text-zinc-100 hover:bg-[#F2F4EA] dark:hover:bg-zinc-900/70 transition-all duration-200 w-fit"
                >
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">{label}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center sm:items-start gap-4">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#8A897D] dark:text-zinc-600">Contact</p>
            <div className="flex flex-col items-center sm:items-start gap-1.5 w-full">
              {SOCIAL.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noreferrer"
                  className="group inline-flex min-h-9 items-center gap-2 rounded-md px-2.5 text-[14px] text-[#5F5F54] dark:text-zinc-400 hover:text-[#25251F] dark:hover:text-zinc-100 hover:bg-[#F2F4EA] dark:hover:bg-zinc-900/70 transition-all duration-200 w-fit"
                >
                  <Icon className="w-3.5 h-3.5 text-[#8A897D] dark:text-zinc-600 group-hover:text-[#1D91A1] dark:group-hover:text-[#7ED6E1] transition-colors duration-200 shrink-0" />
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">{label}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-0.5 transition-all duration-200 text-[#1D91A1] dark:text-[#7ED6E1] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* ── Bottom bar ───────────────────────────────────────────────── */}
        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-[12px] text-[#8A897D] dark:text-zinc-600">
            © 2026 Siyadh KC. Crafted with care.
          </p>
          <button
            onClick={scrollToTop}
            className="group flex min-h-9 items-center gap-1.5 rounded-md px-2.5 text-[12px] text-[#8A897D] dark:text-zinc-600 hover:text-[#4C4C42] dark:hover:text-zinc-300 hover:bg-[#F2F4EA] dark:hover:bg-zinc-900/70 transition-all duration-200"
          >
            Back to top
            <span className="inline-block group-hover:-translate-y-0.5 transition-transform duration-200 text-base leading-none">↑</span>
          </button>
        </div>

      </div>
    </footer>
  );
};

export default FooterCTA;
