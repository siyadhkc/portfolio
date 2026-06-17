import React, { memo, useState } from 'react';
import { ShieldCheck, Lock, Activity, ArrowUpRight, ChevronDown, Network, Database } from 'lucide-react';
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
        className="rounded-2xl p-6 sm:p-8 bg-[#FBFBF7]/55 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-400 dark:hover:border-zinc-700/80 transition-colors duration-150 flex flex-col justify-between h-[420px] sm:h-[400px] md:h-[480px] relative overflow-hidden"
      >
        {/* Header elements */}
        <div className="flex justify-between items-start z-10 shrink-0">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 dark:text-zinc-500 font-bold">PROJECT // {id.toUpperCase()}</span>
          </div>
          <div className="w-8 h-8 rounded-lg bg-[#FBFBF7] dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:border-zinc-400 dark:group-hover:border-zinc-600 transition-colors duration-150">
            <ArrowUpRight className="w-4 h-4 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors" />
          </div>
        </div>

        {/* Technical mockup visualization area */}
        <div className="flex-1 w-full relative z-10 flex items-center justify-center mt-4 mb-4 overflow-hidden">
          {children}
        </div>

        {/* Footer contents */}
        <div className="z-10 mt-auto border-t border-zinc-200 dark:border-zinc-900/60 pt-4 flex flex-col gap-2">
          <h3 className="font-bold text-[18px] text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight">{title}</h3>
          <p className="text-zinc-600 dark:text-zinc-400 text-[13px] leading-relaxed line-clamp-2">{subtitle}</p>
          <div className="flex flex-wrap gap-2 pt-1.5">
            {tags.map((tag) => (
              <span key={tag} className="font-mono text-[9px] text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 px-2 py-0.5 rounded tracking-wider uppercase font-bold">
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
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full relative z-10 mb-20">

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-16 px-4 md:px-8 w-full max-w-[1000px] mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-500 dark:text-zinc-600 font-bold">
            [ Projects ]
          </span>
          <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-900" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Card 1: MockAPI Pro */}
          <FeatureCard id="mockapi-pro" title={projects[0].title} subtitle={projects[0].subtitle} tags={projects[0].tags}>
            <div className="relative w-full max-w-[340px] bg-[#FBFBF7] dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-xl dark:shadow-2xl">
              {/* Minimal Terminal Header */}
              <div className="h-6 bg-[#FCFDF6] dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center px-3 gap-1.5 justify-between">
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-800" />
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                </div>
                <span className="font-mono text-[8px] text-zinc-500 dark:text-zinc-500 tracking-wider">HYPERMOCK.LOG</span>
              </div>
              <div className="p-4 font-mono text-[10px] space-y-2 text-zinc-600 dark:text-zinc-400">
                <div className="flex justify-between items-center text-zinc-500 dark:text-zinc-500 border-b border-zinc-200 dark:border-zinc-900 pb-1.5">
                  <span>SPEC_COMPILE: OPENAPI_V3</span>
                  <span>VIRTUAL_NET: OK</span>
                </div>
                <div className="space-y-1">
                  <div className="flex gap-2">
                    <span className="text-cyan-600 dark:text-cyan-400">[GET]</span>
                    <span className="text-zinc-500">/v1/users/info [DRIFT: 150ms]</span>
                    <span className="text-zinc-500 dark:text-zinc-400 ml-auto">{"--> 200 OK"}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-amber-600 dark:text-amber-500">[POST]</span>
                    <span className="text-zinc-500">/v1/auth/session [JITTER: 25ms]</span>
                    <span className="text-zinc-500 dark:text-zinc-400 ml-auto">{"--> 201 CREATED"}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-rose-600 dark:text-rose-400">[DROP]</span>
                    <span className="text-zinc-500">/v1/billing/logs [LOSS: 5%]</span>
                    <span className="text-zinc-400 dark:text-zinc-500 ml-auto">{"--> TIMEOUT"}</span>
                  </div>
                </div>
              </div>
            </div>
          </FeatureCard>

          {/* Card 2: Env-Guard */}
          <FeatureCard id="env-guard" title={projects[1].title} subtitle={projects[1].subtitle} tags={projects[1].tags}>
            <div className="w-full max-w-[340px] bg-[#FBFBF7] dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-xl dark:shadow-2xl">
              {/* Terminal Header */}
              <div className="h-6 bg-[#FCFDF6] dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center px-3 justify-between">
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-800" />
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                </div>
                <Lock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500 opacity-80" />
              </div>
              {/* Secret Scanning UI */}
              <div className="p-4 font-mono text-[9px] space-y-2 text-zinc-600 dark:text-zinc-400">
                <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-900 pb-1.5">
                  <span className="text-amber-600 dark:text-amber-500 font-bold tracking-wider">SECRET_SCAN: ACTIVE</span>
                  <span className="text-zinc-400 dark:text-zinc-400">3 files</span>
                </div>
                <div className="space-y-1 text-zinc-600 dark:text-zinc-400">
                  <div className="flex gap-2">
                    <span className="text-rose-600 dark:text-rose-500">[FOUND]</span>
                    <span className="text-zinc-500">AWS_SECRET_ACCESS_KEY</span>
                    <span className="text-rose-600 dark:text-rose-500 ml-auto">BLOCKED</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-rose-600 dark:text-rose-500">[FOUND]</span>
                    <span className="text-zinc-500">DATABASE_PASSWORD</span>
                    <span className="text-rose-600 dark:text-rose-500 ml-auto">BLOCKED</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-amber-600 dark:text-amber-500">[WARN]</span>
                    <span className="text-zinc-500">PRIVATE_API_KEY</span>
                    <span className="text-amber-600 dark:text-amber-500 ml-auto">DETECTED</span>
                  </div>
                </div>
                <div className="pt-1.5 border-t border-zinc-200 dark:border-zinc-900">
                  <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-900 rounded overflow-hidden">
                    <div className="h-full bg-rose-500 w-[33%]" />
                  </div>
                </div>
              </div>
            </div>
          </FeatureCard>

          {/* Card 3: Savor */}
          <FeatureCard id="savor" title={projects[2].title} subtitle={projects[2].subtitle} tags={projects[2].tags}>
            <div className="w-full max-w-[340px] bg-gradient-to-br from-amber-50 to-orange-50 dark:from-orange-950/30 dark:to-red-950/30 rounded-xl p-6 flex flex-col items-center justify-center shadow-xl dark:shadow-2xl">
              <div className="text-center space-y-3">
                <div className="text-4xl font-bold text-orange-600 dark:text-orange-400">12</div>
                <span className="font-mono text-[10px] text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">Active Deliveries</span>
                <div className="flex justify-center gap-2 pt-2">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-xs">4</div>
                  <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-xs">6</div>
                  <div className="w-8 h-8 rounded-full bg-zinc-400 flex items-center justify-center text-white font-bold text-xs">2</div>
                </div>
                <div className="text-[8px] text-zinc-600 dark:text-zinc-400 pt-1">On Route • In Prep • Scheduled</div>
              </div>
            </div>
          </FeatureCard>

          {/* Card 4: HireFlow */}
          <FeatureCard id="hireflow" title={projects[3].title} subtitle={projects[3].subtitle} tags={projects[3].tags}>
            <div className="w-full max-w-[340px] bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 rounded-xl p-6 flex flex-col justify-center shadow-xl dark:shadow-2xl">
              <div className="flex justify-between items-end gap-2 h-32">
                {[
                  { label: 'Applied', value: 128, color: 'from-blue-500 to-cyan-500' },
                  { label: 'Screen', value: 42, color: 'from-cyan-500 to-teal-500' },
                  { label: 'Interview', value: 12, color: 'from-emerald-500 to-green-500' },
                  { label: 'Offer', value: 3, color: 'from-green-500 to-lime-500' },
                ].map(({ label, value, color }) => (
                  <div key={label} className="flex-1 flex flex-col items-center gap-1">
                    <div className={`w-full rounded-t-lg bg-gradient-to-t ${color}`} style={{ height: `${(value / 128) * 100}%` }} />
                    <span className="font-mono text-[7px] text-zinc-600 dark:text-zinc-400 uppercase text-center">{label}</span>
                    <span className="font-mono text-[9px] font-bold text-zinc-900 dark:text-zinc-100">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </FeatureCard>

          {/* ── Expanded cards — shown only when isExpanded is true ── */}
          {isExpanded && (
            <>
              {/* Card 5: JRay */}
              <FeatureCard id="jray" title={projects[4].title} subtitle={projects[4].subtitle} tags={projects[4].tags}>
                <div className="w-full max-w-[340px] bg-gradient-to-br from-slate-900 to-slate-950 rounded-xl p-4 flex flex-col gap-3 shadow-xl dark:shadow-2xl">
                  <div className="space-y-2">
                    <div className="text-cyan-400 font-mono text-[9px]">INPUT</div>
                    <div className="bg-slate-800 rounded p-2 font-mono text-[8px] text-slate-300">{`[{"id": 1}, {"id": 2}, {"id": 3}]`}</div>
                  </div>
                  <div className="border-t border-slate-700 pt-2">
                    <div className="text-amber-400 font-mono text-[9px] mb-2">TRANSFORM</div>
                    <div className="bg-slate-800 rounded p-2 font-mono text-[8px] text-slate-300">{`.[] | .id * 2`}</div>
                  </div>
                  <div className="border-t border-slate-700 pt-2">
                    <div className="text-green-400 font-mono text-[9px] mb-2">OUTPUT</div>
                    <div className="bg-slate-800 rounded p-2 font-mono text-[8px] text-slate-300">2, 4, 6</div>
                  </div>
                </div>
              </FeatureCard>

              {/* Card 6: DJForge */}
              <FeatureCard id="djforge" title={projects[5].title} subtitle={projects[5].subtitle} tags={projects[5].tags}>
                <div className="w-full max-w-[340px] bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-xl p-5 flex flex-col gap-3 shadow-xl dark:shadow-2xl">
                  <div className="space-y-2.5">
                    {[
                      { step: 'Project Setup', done: true },
                      { step: 'Models & DB', done: true },
                      { step: 'API Routes', done: true },
                      { step: 'Auth Config', done: false },
                    ].map(({ step, done }) => (
                      <div key={step} className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold ${
                          done 
                            ? 'bg-emerald-500 text-white' 
                            : 'bg-zinc-300 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400'
                        }`}>
                          {done ? '✓' : '○'}
                        </div>
                        <span className={`font-mono text-[9px] ${
                          done 
                            ? 'text-emerald-700 dark:text-emerald-400' 
                            : 'text-zinc-700 dark:text-zinc-400'
                        }`}>{step}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-emerald-200 dark:border-emerald-900/40">
                    <div className="w-full h-1.5 bg-emerald-200 dark:bg-emerald-900/50 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 w-3/4" />
                    </div>
                  </div>
                </div>
              </FeatureCard>
            </>
          )}

        </div>

        {/* ── Load More / Show Less toggle ─────────────────────────────────── */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setIsExpanded((v) => !v)}
            className="group flex items-center gap-2.5 px-6 py-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-900/60 hover:bg-zinc-200 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 font-mono text-[11px] uppercase tracking-wider font-bold transition-all duration-200"
          >
            <span>{isExpanded ? 'Show Less' : 'Load More'}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

      </section>

    </div>
  );
};
export default Features;
