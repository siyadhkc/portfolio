import React, { memo } from 'react';
import { ShieldCheck, Lock, Activity, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../lib/projects';
import { saveScroll, saveSection } from '../lib/scrollState';



interface FeatureCardProps {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  children?: React.ReactNode;
}

const FeatureCard = memo(({ id, title, subtitle, tags, children }: FeatureCardProps) => {
  const handleProjectClick = () => {
    saveScroll();
    saveSection("projects");
  };

  return (
    <Link
      to={`/projects/${id}`}
      onClick={handleProjectClick}
      className="group block w-full h-full"
    >
      <div 
        className="rounded-2xl p-6 sm:p-8 bg-zinc-950/40 border border-zinc-800/80 hover:border-zinc-700/80 transition-colors duration-150 flex flex-col justify-between h-[420px] sm:h-[400px] md:h-[480px] relative overflow-hidden"
      >
        {/* Header elements */}
        <div className="flex justify-between items-start z-10 shrink-0">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 font-bold">PROJECT // {id.toUpperCase()}</span>
          </div>
          <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-850 flex items-center justify-center group-hover:border-zinc-650 transition-colors duration-150">
            <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-100 transition-colors" />
          </div>
        </div>

        {/* Technical mockup visualization area */}
        <div className="flex-1 w-full relative z-10 flex items-center justify-center mt-4 mb-4 overflow-hidden">
          {children}
        </div>

        {/* Footer contents */}
        <div className="z-10 mt-auto border-t border-zinc-900/60 pt-4 flex flex-col gap-2">
          <h3 className="font-bold text-[18px] text-zinc-100 tracking-tight leading-tight">{title}</h3>
          <p className="text-zinc-400 text-[13px] leading-relaxed line-clamp-2">{subtitle}</p>
          <div className="flex flex-wrap gap-2 pt-1.5">
            {tags.map((tag) => (
              <span key={tag} className="font-mono text-[9px] text-zinc-400 bg-zinc-900/60 border border-zinc-800 px-2 py-0.5 rounded tracking-wider uppercase font-bold">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
});
FeatureCard.displayName = 'FeatureCard';

// ── Features page component ───────────────────────────────────────────────────
export const Features = () => {
  return (
    <div className="w-full relative z-10 mb-20">



      {/* PROJECTS SECTION */}
      <section id="projects" className="py-16 px-4 md:px-8 w-full max-w-[1000px] mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-600 font-bold">
            [ Projects ]
          </span>
          <div className="flex-1 h-px bg-zinc-900" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Card 1: MockAPI Pro */}
          <FeatureCard id="mockapi-pro" title={projects[0].title} subtitle={projects[0].subtitle} tags={projects[0].tags}>
            <div className="relative w-full max-w-[340px] bg-zinc-950 border border-zinc-850 rounded-xl overflow-hidden shadow-2xl">
              {/* Minimal Terminal Header */}
              <div className="h-6 bg-zinc-900 border-b border-zinc-850 flex items-center px-3 gap-1.5 justify-between">
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-850" />
                </div>
                <span className="font-mono text-[8px] text-zinc-500 tracking-wider">HYPERMOCK.LOG</span>
              </div>
              <div className="p-4 font-mono text-[10px] space-y-2 text-zinc-400">
                <div className="flex justify-between items-center text-zinc-500 border-b border-zinc-900 pb-1.5">
                  <span>SPEC_COMPILE: OPENAPI_V3</span>
                  <span>VIRTUAL_NET: OK</span>
                </div>
                <div className="space-y-1">
                  <div className="flex gap-2">
                    <span className="text-cyan-400">[GET]</span>
                    <span className="text-zinc-500">/v1/users/info [DRIFT: 150ms]</span>
                    <span className="text-zinc-650 ml-auto">{"-> 200 OK"}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-amber-500">[POST]</span>
                    <span className="text-zinc-500">/v1/auth/session [JITTER: 25ms]</span>
                    <span className="text-zinc-650 ml-auto">{"-> 201 CREATED"}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-rose-400">[DROP]</span>
                    <span className="text-zinc-500">/v1/billing/logs [LOSS: 5%]</span>
                    <span className="text-zinc-650 ml-auto">{"-> TIMEOUT"}</span>
                  </div>
                </div>
              </div>
            </div>
          </FeatureCard>

          {/* Card 2: VulnAPI */}
          <FeatureCard id="vulnapi" title={projects[1].title} subtitle={projects[1].subtitle} tags={projects[1].tags}>
            <div className="w-full max-w-[340px] bg-zinc-950 border border-zinc-850 rounded-xl overflow-hidden shadow-2xl">
              {/* Terminal Header */}
              <div className="h-6 bg-zinc-900 border-b border-zinc-850 flex items-center px-3 justify-between">
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-850" />
                </div>
                <ShieldCheck className="w-3.5 h-3.5 text-rose-500 opacity-80" />
              </div>
              {/* Scanning UI */}
              <div className="p-4 font-mono text-[9px] space-y-2 text-zinc-400">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-1.5">
                  <span className="text-rose-500 font-bold tracking-wider">FUZZER: stateful_seq_generator</span>
                  <span className="text-zinc-650">v1.2</span>
                </div>
                <div className="space-y-1 text-zinc-400">
                  <div className="flex gap-2">
                    <span className="text-cyan-400">[FUZZ]</span>
                    <span className="text-zinc-500">testing alg=none bypass...</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-amber-500">[TNT]</span>
                    <span className="text-zinc-400">{"tainted input -> param 'uuid'"}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-rose-500">[VULN]</span>
                    <span className="text-zinc-300">IDOR verified on /v1/billing/logs</span>
                  </div>
                </div>
                <div className="pt-1.5 border-t border-zinc-900">
                  <div className="w-full h-1.5 bg-zinc-900 rounded overflow-hidden">
                    <div className="h-full bg-rose-500 w-[78%]" />
                  </div>
                </div>
              </div>
            </div>
          </FeatureCard>

          {/* Card 3: django-secure */}
          <FeatureCard id="django-secure" title={projects[2].title} subtitle={projects[2].subtitle} tags={projects[2].tags}>
            <div className="w-full max-w-[340px] bg-zinc-950 border border-zinc-850 rounded-xl p-4 flex items-center justify-between shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-violet-400" />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] text-zinc-300 font-bold tracking-wider">py-ebpf-guard</span>
                  <span className="font-mono text-[8px] text-zinc-500">KERNEL_SYS_HOOK_ACTIVE</span>
                </div>
              </div>
              <div className="font-mono text-[9px] text-violet-400 border border-violet-500/20 bg-violet-500/5 px-2 py-0.5 rounded">
                SYSCALLS: FILTERED
              </div>
            </div>
          </FeatureCard>

          {/* Card 4: Sentinel API */}
          <FeatureCard id="sentinel-api" title={projects[3].title} subtitle={projects[3].subtitle} tags={projects[3].tags}>
            <div className="w-full max-w-[340px] bg-zinc-950 border border-zinc-850 rounded-xl p-4 flex flex-col gap-4 shadow-2xl">
              <div className="w-full flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                  <span className="font-mono text-[9px] text-zinc-300 uppercase tracking-wider font-bold">WASM_GATEWAY_PROXY</span>
                </div>
                <Activity className="w-4 h-4 text-cyan-400" />
              </div>
              {/* Static hearts metric chart */}
              <div className="w-full h-12 flex items-end gap-1">
                {[30, 60, 40, 80, 50, 70, 45, 90, 80, 85].map((h, i) => (
                  <div 
                    key={i}
                    style={{ height: `${h}%` }}
                    className="w-full bg-zinc-800 rounded-t-sm"
                  />
                ))}
              </div>
              <div className="w-full grid grid-cols-2 gap-2 border-t border-zinc-900 pt-3">
                <div className="flex flex-col">
                  <span className="text-[8px] text-zinc-500 uppercase font-mono font-bold">LATENCY</span>
                  <span className="text-[12px] font-mono font-bold text-zinc-300">1.18ms</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] text-zinc-500 uppercase font-mono font-bold">THROUGHPUT</span>
                  <span className="text-[12px] font-mono font-bold text-zinc-300">105k rps</span>
                </div>
              </div>
            </div>
          </FeatureCard>

        </div>
      </section>

    </div>
  );
};
