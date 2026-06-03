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
      <div className="flex flex-col gap-4 border-b border-zinc-900 pb-10">
        <p className="font-mono text-[10px] tracking-[0.25em] text-zinc-600 uppercase font-bold">
          siyadhkc.dev&nbsp;&nbsp;//&nbsp;&nbsp;Backend · Security
        </p>
        <h1 className="font-sans font-extrabold text-[2.6rem] sm:text-[3.4rem] md:text-[4.2rem] leading-[0.95] tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent uppercase">
          Siyadh KC
        </h1>
        <p className="font-sans text-base sm:text-[17px] text-zinc-400 leading-relaxed max-w-[680px]">
          I build high-performance backend systems and research web vulnerabilities.
          Software development and cybersecurity are tightly bound — you cannot construct
          resilient interfaces unless you understand how they break.
        </p>

        {/* Action row */}
        <div className="flex flex-wrap items-center gap-3 mt-2">
          <Link
            to="/projects"
            className="group flex items-center gap-2 bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-400 hover:to-cyan-400 text-zinc-950 px-5 py-2 rounded font-mono text-[11px] uppercase tracking-wider font-bold shadow-[0_0_15px_rgba(139,92,246,0.15)] hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300"
          >
            <span>View Projects</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <a
            href="https://github.com/siyadhkc"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 px-5 py-2 rounded font-mono text-[11px] uppercase tracking-wider font-bold transition-colors"
          >
            <Github className="w-3.5 h-3.5 text-cyan-400" />
            GitHub
          </a>

          <Link
            to="/blog"
            className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 px-5 py-2 rounded font-mono text-[11px] uppercase tracking-wider font-bold transition-colors border border-zinc-900 hover:border-zinc-700"
          >
            Writing
          </Link>
        </div>
      </div>

      {/* ── Core Philosophy ────────────────────────────────────────────── */}
      <div className="space-y-3">
        <h2 className="font-mono text-[10px] tracking-[0.25em] text-zinc-600 uppercase font-bold">
          [ 01 // Core Philosophy ]
        </h2>
        <p className="font-sans text-[15px] text-zinc-400 leading-relaxed max-w-[720px]">
          I approach system architecture from a defensive security-first perspective. Modern
          distributed backends should not rely on perimeter security — zero-trust validation,
          kernel-level execution filtering, and active traffic containment must be built
          directly into the codebase.
        </p>
      </div>

      {/* ── Engineering Focus Areas ─────────────────────────────────────── */}
      <div className="space-y-6 border-t border-zinc-900 pt-10">
        <h2 className="font-mono text-[10px] tracking-[0.25em] text-zinc-600 uppercase font-bold">
          [ 02 // Engineering &amp; Vulnerability Research ]
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-7 text-[14px]">
          <div className="space-y-1.5">
            <h3 className="font-bold text-zinc-200 text-[13px]">Runtime Security &amp; Kernels</h3>
            <p className="text-zinc-500 leading-relaxed">
              eBPF instrumentation injected into the Linux kernel to trace syscalls in
              container runtimes. Mitigating RCE and code-injection vectors at the OS boundary.
            </p>
          </div>
          <div className="space-y-1.5">
            <h3 className="font-bold text-zinc-200 text-[13px]">Stateful Protocol Fuzzing</h3>
            <p className="text-zinc-500 leading-relaxed">
              State-machine fuzzer engines for analysing JWT signature bypasses and
              parameter data-flows in GraphQL, gRPC, and RESTful APIs.
            </p>
          </div>
          <div className="space-y-1.5">
            <h3 className="font-bold text-zinc-200 text-[13px]">High-Performance Gateways</h3>
            <p className="text-zinc-500 leading-relaxed">
              Low-latency reverse proxies and rate-limiters in Go/Rust with WASM plugin hooks,
              distributed session verification, and zero-overhead telemetry.
            </p>
          </div>
          <div className="space-y-1.5">
            <h3 className="font-bold text-zinc-200 text-[13px]">Application Sandboxing</h3>
            <p className="text-zinc-500 leading-relaxed">
              Runtime container isolation, namespace boundaries, and SELinux/AppArmor profiles
              enforcing strict execution filters on microservices.
            </p>
          </div>
        </div>
      </div>

      {/* ── Capabilities Matrix ─────────────────────────────────────────── */}
      <div className="space-y-5 border-t border-zinc-900 pt-10">
        <h2 className="font-mono text-[10px] tracking-[0.25em] text-zinc-600 uppercase font-bold">
          [ 03 // Capabilities Matrix ]
        </h2>
        <div className="space-y-0 font-mono text-[11px] text-zinc-400">
          {[
            ['LANGUAGES',        'Python (CPython internals), Go, C, WebAssembly, Rust, Shell'],
            ['FRAMEWORKS',       'Django, Django REST Framework, FastAPI, Celery, libbpf, bcc'],
            ['DATASTORES',       'PostgreSQL (query opt, replication), Redis (caching, Lua scripting)'],
            ['INFRA & ROUTING',  'Docker, Envoy Proxy, Nginx, WAF filtering, seccomp / syscall filters'],
            ['SECURITY TOOLS',   'Burp Suite, OWASP ZAP, Metasploit, Nmap, Wireshark, custom fuzzers'],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 border-b border-zinc-900/50 py-2.5"
            >
              <span className="w-36 text-zinc-600 font-bold shrink-0">{label}:</span>
              <span className="text-zinc-400">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Contact row ─────────────────────────────────────────────────── */}
      <div className="border-t border-zinc-900 pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <span className="font-mono text-[10px] tracking-[0.25em] text-zinc-600 uppercase font-bold">
          [ Open to work — Security audits, Backend architecture ]
        </span>
        <div className="flex items-center gap-3">
          {[
            { href: 'mailto:siyadhkc@gmail.com',          icon: <Mail className="w-3.5 h-3.5" />,     label: 'Email' },
            { href: 'https://github.com/siyadhkc',         icon: <Github className="w-3.5 h-3.5" />,   label: 'GitHub' },
            { href: 'https://linkedin.com/in/siyadhkc',    icon: <Linkedin className="w-3.5 h-3.5" />, label: 'LinkedIn' },
            { href: 'https://x.com/siyadhkc',              icon: <Twitter className="w-3.5 h-3.5" />,  label: 'X' },
          ].map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noreferrer"
              aria-label={label}
              className="flex items-center justify-center w-8 h-8 rounded border border-zinc-800 text-zinc-500 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
});

About.displayName = 'About';
export default About;
