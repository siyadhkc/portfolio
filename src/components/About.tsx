import React, { memo } from 'react';
import { Github, Mail, Linkedin, Twitter, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const About = memo(() => {
  return (
    <section
      id="about"
      className="pt-28 pb-16 px-6 w-full max-w-[1000px] mx-auto flex flex-col gap-12 bg-transparent text-left font-sans"
    >
      {/* ── Identity block ─────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 border-b border-zinc-200 dark:border-zinc-900 pb-10">
        <p className="font-mono text-[10px] tracking-[0.25em] text-zinc-500 dark:text-zinc-600 uppercase font-bold">
          siyadhkc.dev&nbsp;&nbsp;//&nbsp;&nbsp;Backend · Security
        </p>
        <h1 className="font-sans font-extrabold text-[2.6rem] sm:text-[3.4rem] md:text-[4.2rem] leading-[0.95] tracking-tight bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-500 dark:from-white dark:via-zinc-200 dark:to-zinc-500 bg-clip-text text-transparent uppercase">
          Siyadh KC
        </h1>
        <p className="font-sans text-base sm:text-[17px] text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-[680px]">
          I build backend systems that feel reliable in everyday use, then harden them
          against the ways people push them past their limits. My experience in network
          and infrastructure work helps me keep APIs, data flows, and deployments practical
          as well as secure.
        </p>

        {/* Action row */}
        <div className="flex flex-wrap items-center gap-3 mt-2">
          <Link
            to="/projects"
            className="group flex items-center gap-2 bg-gradient-to-r from-[#6F735D] to-[#1D91A1] hover:from-[#5F644E] hover:to-[#167A88] text-white px-5 py-2 rounded font-mono text-[11px] uppercase tracking-wider font-bold shadow-[0_0_15px_rgba(111,115,93,0.18)] hover:shadow-[0_0_20px_rgba(29,145,161,0.28)] transition-all duration-300"
          >
            <span>View Projects</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <a
            href="https://github.com/siyadhkc"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-300 px-5 py-2 rounded font-mono text-[11px] uppercase tracking-wider font-bold transition-colors"
          >
            <Github className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            GitHub
          </a>

          <Link
            to="/blog"
            className="flex items-center gap-2 text-zinc-500 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 px-5 py-2 rounded font-mono text-[11px] uppercase tracking-wider font-bold transition-colors border border-zinc-200 dark:border-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-700"
          >
            Writing
          </Link>
        </div>
      </div>

      {/* ── Core Philosophy ────────────────────────────────────────────── */}
      <div className="space-y-3">
        <h2 className="font-mono text-[10px] tracking-[0.25em] text-zinc-500 dark:text-zinc-600 uppercase font-bold">
          [ 01 // Core Philosophy ]
        </h2>
        <p className="font-sans text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-[720px]">
          I design systems with the assumption that every request is untrusted and every
          dependency can fail. That means clear APIs, thoughtful validation, and small,
          self-contained services that are easier to inspect and protect as they grow.
        </p>
      </div>

      {/* ── Engineering Focus Areas ─────────────────────────────────────── */}
      <div className="space-y-6 border-t border-zinc-200 dark:border-zinc-900 pt-10">
        <h2 className="font-mono text-[10px] tracking-[0.25em] text-zinc-500 dark:text-zinc-600 uppercase font-bold">
          [ 02 // Engineering &amp; Vulnerability Research ]
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-7 text-[14px]">
          <div className="space-y-1.5">
            <h3 className="font-bold text-zinc-800 dark:text-zinc-200 text-[13px]">Runtime Security &amp; Kernels</h3>
            <p className="text-zinc-600 dark:text-zinc-500 leading-relaxed">
              I use eBPF to trace how container runtimes behave in the wild, spotting unsafe
              syscall activity and hardening the boundary before issues reach production.
            </p>
          </div>
          <div className="space-y-1.5">
            <h3 className="font-bold text-zinc-800 dark:text-zinc-200 text-[13px]">Stateful Protocol Fuzzing</h3>
            <p className="text-zinc-600 dark:text-zinc-500 leading-relaxed">
              I build fuzzers that follow real API flows and catch logic gaps in JWT handling,
              GraphQL, gRPC, and REST services.
            </p>
          </div>
          <div className="space-y-1.5">
            <h3 className="font-bold text-zinc-800 dark:text-zinc-200 text-[13px]">High-Performance Gateways</h3>
            <p className="text-zinc-600 dark:text-zinc-500 leading-relaxed">
              I write gateway code and request routing that stays fast under load while
              keeping error paths visible and easy to debug.
            </p>
          </div>
          <div className="space-y-1.5">
            <h3 className="font-bold text-zinc-800 dark:text-zinc-200 text-[13px]">Application Sandboxing</h3>
            <p className="text-zinc-600 dark:text-zinc-500 leading-relaxed">
              I rely on container isolation and policy-based controls so service boundaries are
              clear and behaviour is easier to reason about.
            </p>
          </div>
        </div>
      </div>

      {/* ── Capabilities Matrix ─────────────────────────────────────────── */}
      <div className="space-y-5 border-t border-zinc-200 dark:border-zinc-900 pt-10">
        <h2 className="font-mono text-[10px] tracking-[0.25em] text-zinc-500 dark:text-zinc-600 uppercase font-bold">
          [ 03 // Capabilities Matrix ]
        </h2>
        <div className="space-y-0 font-mono text-[11px] text-zinc-600 dark:text-zinc-400">
          {[
            ['LANGUAGES',        'Python (CPython internals), Go, C, WebAssembly, Rust, Shell'],
            ['FRAMEWORKS',       'Django, Django REST Framework, FastAPI, Celery, libbpf, bcc'],
            ['DATASTORES',       'PostgreSQL (query opt, replication), Redis (caching, Lua scripting)'],
            ['INFRA & ROUTING',  'Docker, Envoy Proxy, Nginx, WAF filtering, seccomp / syscall filters'],
            ['SECURITY TOOLS',   'Burp Suite, OWASP ZAP, Metasploit, Nmap, Wireshark, custom fuzzers'],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 border-b border-zinc-200 dark:border-zinc-900/50 py-2.5"
            >
              <span className="w-36 text-zinc-500 dark:text-zinc-600 font-bold shrink-0">{label}:</span>
              <span className="text-zinc-700 dark:text-zinc-400">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Contact strip ────────────────────────────────────────────────── */}
      <div className="border-t border-zinc-200 dark:border-zinc-900 pt-8 flex flex-col gap-5">

        {/* Message */}
        <div className="flex flex-col gap-2">
          <p className="text-[13px] text-zinc-500 dark:text-zinc-500 max-w-[520px] leading-relaxed">
            I’m available for backend architecture work, security reviews, and practical
            engineering collaborations. I usually respond within a day.
          </p>
        </div>

        {/* All platform links */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            {
              href: 'mailto:siyadhkc@gmail.com',
              label: 'Email',
              icon: <Mail className="w-3.5 h-3.5" />,
            },
            {
              href: 'https://github.com/siyadhkc',
              label: 'GitHub',
              icon: <Github className="w-3.5 h-3.5" />,
            },
            {
              href: 'https://linkedin.com/in/siyadhkc',
              label: 'LinkedIn',
              icon: <Linkedin className="w-3.5 h-3.5" />,
            },
            {
              href: 'https://x.com/siyadhkc',
              label: 'X',
              icon: (
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              ),
            },
            {
              href: 'https://app.hackthebox.com/profile/siyadhkc',
              label: 'HackTheBox',
              icon: (
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.996 0L2 5.785v12.43L11.996 24 22 18.215V5.785L11.996 0zm-1.037 3.09l1.037-.6 1.037.6v1.2l-1.037.6-1.037-.6V3.09zM4.118 7.14l1.037-.6 1.037.6v1.2l-1.037.6-1.037-.6V7.14zm0 9.72l1.037-.6 1.037.6v1.2l-1.037.6-1.037-.6v-1.2zm7.878 3.95l-1.037.6-1.037-.6v-1.2l1.037-.6 1.037.6v1.2zm1.44-3.61v-5.6l-1.44-.83-1.44.83v5.6l1.44.83 1.44-.83zm4.446-.34l-1.037.6-1.037-.6v-1.2l1.037-.6 1.037.6v1.2zm0-9.72l-1.037.6-1.037-.6V7.14l1.037-.6 1.037.6v1.14zm-2.597-.99l-1.44.83v2.8l-3.845-2.22-3.845 2.22V12.6l3.845 2.22 3.845-2.22v-2.8l1.44-.83V6.14z" />
                </svg>
              ),
            },
            {
              href: 'https://tryhackme.com/p/siyadhkc',
              label: 'TryHackMe',
              icon: (
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10.705 0C7.54 0 4.932 2.306 4.51 5.354a4.583 4.583 0 0 0-.617-.042C1.742 5.312 0 7.054 0 9.197s1.742 3.885 3.893 3.885h6.812V10.82H3.893C2.87 10.82 2.04 9.99 2.04 8.966s.83-1.854 1.853-1.854c.211 0 .415.035.608.1l1.06.36.094-1.107C5.86 3.835 8.055 2.04 10.705 2.04c2.889 0 5.237 2.348 5.237 5.237 0 .05 0 .1-.003.148l-.05 1.174 1.17.083c1.364.097 2.43 1.24 2.43 2.612 0 1.44-1.172 2.612-2.612 2.612H14.38v2.261h2.498c2.603 0 4.72-2.117 4.72-4.72a4.724 4.724 0 0 0-3.97-4.659C17.08 2.834 14.176 0 10.705 0zm-.022 9.406L8.05 12.04h1.632v6.552h2.001V12.04h1.632l-2.632-2.634z" />
                </svg>
              ),
            },
            {
              href: 'https://siyadhkc.substack.com',
              label: 'Substack',
              icon: (
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
                </svg>
              ),
            },
            {
              href: 'https://dev.to/siyadhkc',
              label: 'Dev.to',
              icon: (
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.88-.31h1.64v1.29zm4.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.32-.32-.45-.63-.82-2.08l-.9-3.39-.45-1.67h.76c.4 0 .75.02.75.05 0 .06 1.16 4.54 1.26 4.83.04.15.32-.7.73-2.3l.62-2.52.74-.04c.4-.02.73 0 .73.04 0 .14-1.67 6.38-1.8 6.68z" />
                </svg>
              ),
            },
            {
              href: 'https://hackerone.com/siyadhkc',
              label: 'HackerOne',
              icon: (
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.207 0c-.43 0-.778.348-.778.778v22.444c0 .43.348.778.778.778h3.016a.778.778 0 0 0 .778-.778v-8.749c0-.318.085-.623.247-.889l1.318-2.197a1.037 1.037 0 0 1 1.791 0l1.318 2.197c.162.266.247.571.247.889v8.749c0 .43.348.778.778.778h3.016a.778.778 0 0 0 .778-.778V.778A.778.778 0 0 0 19.716 0h-3.016a.778.778 0 0 0-.778.778v7.907a.259.259 0 0 1-.448.178L12.09 5.187a.518.518 0 0 0-.777 0L7.95 8.863a.259.259 0 0 1-.448-.178V.778A.778.778 0 0 0 7.207 0H7.207z" />
                </svg>
              ),
            },
            {
              href: 'https://bugcrowd.com/siyadhkc',
              label: 'Bugcrowd',
              icon: (
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-.05 4.78c1.74 0 3.15 1.41 3.15 3.15S13.69 11.08 11.95 11.08 8.8 9.67 8.8 7.93s1.41-3.15 3.15-3.15zm5.62 13.25c0 .46-.37.83-.83.83H7.26a.83.83 0 0 1-.83-.83v-1.16c0-2.65 2.09-4.8 4.72-4.89h1.7c2.63.09 4.72 2.24 4.72 4.89v1.16z" />
                </svg>
              ),
            },
          ].map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noreferrer"
              className="group flex items-center gap-2 px-3 py-1.5 rounded border border-zinc-200 dark:border-zinc-800 bg-[#FBFBF7]/70 dark:bg-zinc-900/40 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-300 dark:hover:border-zinc-700 text-[12px] font-medium transition-all duration-150"
            >
              <span className="text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors duration-150">
                {icon}
              </span>
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
});

About.displayName = 'About';
export default About;
