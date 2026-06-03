import React, { memo, useState, useCallback } from 'react';
import { Mail, Github, Linkedin, Clipboard } from 'lucide-react';

// ── Copy Button Component ────────────────────────────────────────────────────
const CopyButton = memo(({ email }: { email: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [email]);

  return (
    <button
      onClick={handleCopy}
      className="absolute top-4 right-4 text-zinc-600 hover:text-zinc-300 p-1.5 bg-zinc-900 border border-zinc-800 rounded transition-colors flex items-center gap-1.5"
      title="Copy email"
    >
      {copied && (
        <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-800 text-cyan-400 text-[10px] px-2.5 py-1 rounded font-mono font-bold whitespace-nowrap shadow-lg">
          COPIED
        </span>
      )}
      <Clipboard className="w-3 h-3" />
    </button>
  );
});
CopyButton.displayName = 'CopyButton';

// ── Contact card data ────────────────────────────────────────────────────────
const CONTACTS = [
  {
    key: 'email',
    icon: <Mail className="w-4 h-4" />,
    label: 'EMAIL',
    value: 'siyadhkc@gmail.com',
    href: 'mailto:siyadhkc@gmail.com',
    sub: 'Direct inquiries — fastest response',
    copyEmail: 'siyadhkc@gmail.com',
  },
  {
    key: 'github',
    icon: <Github className="w-4 h-4" />,
    label: 'CODE',
    value: 'github.com/siyadhkc',
    href: 'https://github.com/siyadhkc',
    sub: 'Projects and security research',
  },
  {
    key: 'linkedin',
    icon: <Linkedin className="w-4 h-4" />,
    label: 'LINKEDIN',
    value: 'linkedin.com/in/siyadhkc',
    href: 'https://linkedin.com/in/siyadhkc',
    sub: 'Professional background',
  },
  {
    key: 'twitter',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    label: 'X / TWITTER',
    value: '@siyadhkc',
    href: 'https://x.com/siyadhkc',
    sub: 'Python, Linux, dev notes',
  },
];

// ── FooterCTA ────────────────────────────────────────────────────────────────
export const FooterCTA = () => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div id="contact" className="w-full px-4 md:px-6 pb-6 pt-10">
      {/* Contact section */}
      <div className="w-full max-w-[1000px] mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-600 font-bold">
            [ Contact ]
          </span>
          <div className="flex-1 h-px bg-zinc-900" />
        </div>

        {/* Contact grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CONTACTS.map(({ key, icon, label, value, href, sub, copyEmail }) => {
            const inner = (
              <>
                <div className="flex items-start justify-between gap-3">
                  <div className="w-8 h-8 rounded border border-zinc-800 bg-zinc-900 flex items-center justify-center text-cyan-400 shrink-0">
                    {icon}
                  </div>
                  {copyEmail && <CopyButton email={copyEmail} />}
                </div>
                <div className="flex flex-col gap-0.5 mt-3">
                  <span className="font-mono text-[9px] tracking-[0.2em] text-zinc-600 uppercase font-bold">
                    {label}
                  </span>
                  <span className="font-mono text-[13px] text-zinc-200 font-bold leading-snug group-hover:text-cyan-400 transition-colors">
                    {value}
                  </span>
                  <span className="text-[11px] text-zinc-600 font-sans mt-0.5">{sub}</span>
                </div>
              </>
            );

            const cls =
              'relative group flex flex-col bg-zinc-950/30 border border-zinc-800/80 hover:border-zinc-700 rounded-xl p-5 transition-colors duration-150';

            return href.startsWith('mailto') ? (
              <a key={key} href={href} className={cls}>
                {inner}
              </a>
            ) : (
              <a key={key} href={href} target="_blank" rel="noreferrer" className={cls}>
                {inner}
              </a>
            );
          })}
        </div>
      </div>

      {/* Minimal footer bar */}
      <footer className="w-full max-w-[1000px] mx-auto px-2 pt-10 pb-4 mt-10 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[9px] tracking-[0.2em] uppercase text-zinc-700">
        <div className="flex items-center gap-3">
          <span>© 2026 SIYADHKC</span>
          <span className="text-zinc-800">|</span>
          <span>BACKEND_DEVELOPER_PORTFOLIO</span>
        </div>
        <button onClick={scrollToTop} className="hover:text-zinc-400 transition-colors">
          ↑ Back to top
        </button>
      </footer>
    </div>
  );
};
export default FooterCTA;
