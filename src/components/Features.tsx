import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Activity, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../lib/projects';
import { saveScroll, saveSection } from '../lib/scrollState';
import { ParallaxTilt } from './ParallaxTilt';

// ── Variant to glow-accent color mapping — for premium glow gradients ───────
const VARIANT_GLOW: Record<string, string> = {
  teal:   'rgba(56, 217, 245, 0.12)', // soft cyan glow
  indigo: 'rgba(99, 102, 241, 0.12)', // soft indigo glow
  sand:   'rgba(245, 158, 11, 0.10)',  // soft amber glow
  coral:  'rgba(244, 63, 94, 0.12)',  // soft rose glow
  blue:   'rgba(59, 130, 246, 0.12)',  // soft blue glow
};

const VARIANT_BORDER: Record<string, string> = {
  teal:   'group-hover:border-cyan-500/35 hover:shadow-[0_20px_50px_rgba(56,217,245,0.06)]',
  indigo: 'group-hover:border-indigo-500/35 hover:shadow-[0_20px_50px_rgba(99,102,241,0.06)]',
  sand:   'group-hover:border-amber-500/35 hover:shadow-[0_20px_50px_rgba(245,158,11,0.04)]',
  coral:  'group-hover:border-rose-500/35 hover:shadow-[0_20px_50px_rgba(244,63,94,0.06)]',
  blue:   'group-hover:border-blue-500/35 hover:shadow-[0_20px_50px_rgba(59,130,246,0.06)]',
};

const VARIANT_BG_GRADIENT: Record<string, string> = {
  teal:   'bg-gradient-to-br from-emerald-500/[0.06] via-white/30 to-green-500/[0.15] backdrop-blur-md',
  indigo: 'bg-gradient-to-br from-indigo-500/[0.03] via-white/30 to-indigo-500/[0.2] backdrop-blur-md',
  sand:   'bg-gradient-to-br from-amber-500/[0.02] via-white/30 to-amber-500/[0.2] backdrop-blur-md',
  coral:  'bg-gradient-to-br from-rose-500/[0.03] via-white/30 to-rose-500/[0.2] backdrop-blur-md',
  blue:   'bg-gradient-to-br from-blue-500/[0.03] via-white/30 to-blue-500/[0.2] backdrop-blur-md',
};

// ── High performance Spotlight Hover Position Tracker ────────────────────────
const handleSpotlightMouseMove = (e: React.MouseEvent<HTMLElement>) => {
  const { currentTarget, clientX, clientY } = e;
  const rect = currentTarget.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  currentTarget.style.setProperty('--mouse-x', `${x}px`);
  currentTarget.style.setProperty('--mouse-y', `${y}px`);
};

// ── Motion variants ──────────────────────────────────────────────────────────
const cardMotion = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' } as const,
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};

const stackCellMotion = (index: number) => ({
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' } as const,
  transition: { duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] as const },
});

// ── Sub-components memoized ───────────────────────────────────────────────────
interface StackCellProps {
  label: string;
  value: string;
  index: number;
  borderClasses: string;
}

const StackCell = memo(({ label, value, index, borderClasses }: StackCellProps) => (
  <ParallaxTilt maxTilt={3} className={`w-full h-full relative overflow-hidden flex flex-col bg-gradient-to-br from-white/35 via-white/20 to-white/10 hover:bg-white/50 backdrop-blur-md cursor-default border-white/45 shadow-[0_4px_24px_rgba(0,0,0,0.015)] transition-all duration-300 spotlight-card ${borderClasses}`}>
    <motion.div
      {...stackCellMotion(index)}
      onMouseMove={handleSpotlightMouseMove}
      className="p-8 md:p-10 flex flex-col justify-center w-full h-full relative overflow-hidden"
    >
      {/* Custom inner glow mask spotlight */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-slate-400 block mb-3 relative z-10 font-bold">{label}</span>
      <span className="text-slate-700 text-base md:text-[17px] leading-relaxed font-semibold block opacity-85 group-hover:opacity-100 transition-opacity relative z-10">{value}</span>
    </motion.div>
  </ParallaxTilt>
));
StackCell.displayName = 'StackCell';

interface FeatureCardProps {
  id: string;
  title: string;
  subtitle: string;
  variant: 'teal' | 'coral' | 'sand' | 'indigo' | 'blue';
  children?: React.ReactNode;
  tags: string[];
  className?: string;
}

const FeatureCard = memo(({ id, title, subtitle, variant, children, tags, className }: FeatureCardProps) => {
  const handleProjectClick = () => {
    saveScroll();
    saveSection("projects");
  };

  return (
    <Link
      to={`/projects/${id}`}
      onClick={handleProjectClick}
      data-cursor-label="view project"
      className="block w-full h-full"
    >
      <ParallaxTilt maxTilt={5} className="w-full h-full">
        <motion.div
          {...cardMotion}
          onMouseMove={handleSpotlightMouseMove}
          whileTap={{ scale: 0.995 }}
          style={{ transformStyle: 'preserve-3d' }}
          className={`group rounded-3xl p-5 md:p-10 relative overflow-hidden flex flex-col h-[440px] sm:h-[400px] md:h-[520px] ${VARIANT_BG_GRADIENT[variant] ?? 'bg-white/30'} transition-all duration-500 cursor-pointer will-change-transform spotlight-card ${VARIANT_BORDER[variant] ?? 'group-hover:border-white/80'} ${className ?? ''}`}
        >
          {/* Dynamic ambient spotlight colored glow behind card */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
            style={{
              background: `radial-gradient(450px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${VARIANT_GLOW[variant] ?? 'rgba(0,0,0,0.01)'}, transparent 55%)`
            }}
          />

          {/* Card header arrow */}
          <div className="flex justify-end items-start z-30 shrink-0" style={{ transform: 'translateZ(20px)' }}>
            <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 shadow-sm group-hover:border-white/80 group-hover:bg-white/40 transition-all duration-500">
              <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-slate-700 transition-transform duration-500 group-hover:scale-110 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>

          {/* Graphic Area (elevated Z depth perspective context) */}
          <div className="flex-1 w-full relative z-10 flex items-center justify-center -mt-8 sm:-mt-12 md:-mt-16" style={{ transformStyle: 'preserve-3d' }}>
            {children}
          </div>

          {/* Bottom Text Pill card layout */}
          <div 
            style={{ transform: 'translateZ(30px)' }}
            className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6 md:inset-x-8 md:bottom-8 bg-gradient-to-br from-white/85 to-white/60 backdrop-blur-xl p-5 md:p-8 rounded-2xl z-20 border border-white/40 shadow-[0_10px_30px_rgba(0,0,0,0.02)] transition-all duration-500 group-hover:border-white/85 flex flex-col gap-2.5 sm:gap-3"
          >
            <h3 className="font-bold text-[1.2rem] sm:text-[1.4rem] md:text-[1.6rem] lg:text-[1.8rem] text-slate-800 tracking-tight leading-[1.1]">{title}</h3>
            <p className="text-slate-600 text-[13px] sm:text-sm md:text-base font-semibold leading-relaxed line-clamp-2">{subtitle}</p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1 md:pt-2">
              {tags.map((tag) => (
                <span key={tag} className="font-mono text-[8px] md:text-[9px] text-slate-500 bg-white/40 border border-white/50 px-2.5 py-1 rounded-full tracking-widest uppercase font-bold">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </ParallaxTilt>
    </Link>
  );
});
FeatureCard.displayName = 'FeatureCard';

// ── Features page component ───────────────────────────────────────────────────
export const Features = () => {
  return (
    <div className="w-full relative z-10 mb-24">

      {/* STACK SECTION */}
      <section id="stack" style={{ scrollSnapAlign: 'start' }} className="pt-24 pb-16 md:pt-28 md:pb-20 px-4 md:px-8 w-full max-w-[1000px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-10 md:mb-14 text-center">
            <h2 className="font-black text-4xl sm:text-5xl lg:text-6xl lg:leading-[1.1] text-slate-800 tracking-tight leading-tight uppercase font-hero">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500">The Arsenal</span>
            </h2>
            <p className="text-slate-600 font-sans text-lg sm:text-xl mt-3 md:mt-4">The tools I actually use to get things done.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 border border-white/50 rounded-2xl overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.02)] bg-white/20 backdrop-blur-md">
            <StackCell index={0} label="Backend" value="Django · DRF · Django Channels · Celery · Redis · PostgreSQL · JWT" borderClasses="border-b border-white/40 sm:border-r" />
            <StackCell index={1} label="Frontend" value="React · TailwindCSS · JavaScript · Vite" borderClasses="border-b border-white/40" />
            <StackCell index={2} label="DevOps" value="Docker · Docker Compose · Nginx · Gunicorn · Linux · Git" borderClasses="border-b border-white/40 sm:border-r" />
            <StackCell index={3} label="Testing" value="Pytest · pytest-django · Factory Boy · Coverage" borderClasses="border-b border-white/40" />
            <StackCell index={4} label="Security" value="OWASP API Top 10 · Web Pentesting · API Vulnerability Research" borderClasses="border-b border-white/40 sm:border-b-0 sm:border-r" />
            <StackCell index={5} label="Networking" value="TCP/IP · Network Infrastructure · Enterprise Hardware · CCTV Systems" borderClasses="" />
          </div>
        </motion.div>
      </section>

      <div className="max-w-[1000px] mx-auto px-8 mb-5"><hr className="border-white/50" /></div>

      {/* PROJECTS SECTION */}
      <section id="projects" style={{ scrollSnapAlign: 'start' }} className="projects-gradient-bg py-16 md:py-24 px-4 md:px-8 w-full max-w-[1200px] mx-auto rounded-3xl">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="font-black text-4xl sm:text-5xl lg:text-6xl lg:leading-[1.1] text-slate-800 tracking-tight leading-tight uppercase font-hero">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500">What I've Built</span>
          </h2>
          <p className="text-slate-600 font-sans text-lg sm:text-xl mt-3 md:mt-4">Some of the things I've coded, hacked, or engineered.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Card 1: MockAPI Pro */}
          <FeatureCard id="mockapi-pro" title={projects[0].title} subtitle={projects[0].subtitle} tags={projects[0].tags} variant={projects[0].variant}>
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center px-4 md:px-10 sm:-mt-24 transition-all duration-700 group-hover:-translate-y-[52%]" style={{ transformStyle: 'preserve-3d' }}>
              <div className="relative w-full max-w-[480px] bg-white/40 backdrop-blur-md rounded-2xl shadow-[0_15px_45px_rgba(0,0,0,0.015)] overflow-hidden group-hover:shadow-[0_30px_60px_rgba(139,92,246,0.08)] transition-all duration-700" style={{ transform: 'translateZ(45px)' }}>
                {/* Minimal Browser Header */}
                <div className="h-6 bg-white/30 border-b border-white/30 flex items-center px-3 gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF5F56]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#27C93F]" />
                </div>
                {/* GIF Preview */}
                <div className="aspect-[16/10] relative bg-slate-50/50 overflow-hidden">
                  <img 
                    src="/project.gif" 
                    alt="MockAPI Pro Preview" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/90 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </FeatureCard>

          {/* Card 2: VulnAPI - Security HUD (Deep Technical Contrast Frame) */}
          <FeatureCard id="vulnapi" title={projects[1].title} subtitle={projects[1].subtitle} tags={projects[1].tags} variant={projects[1].variant}>
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center px-4 md:px-12 sm:-mt-24 transition-all duration-700 group-hover:-translate-y-[55%]" style={{ transformStyle: 'preserve-3d' }}>
              <div className="w-full max-w-[400px] bg-[#0c101d] rounded-2xl shadow-[0_25px_55px_rgba(0,0,0,0.12)] border border-white/10 overflow-hidden group-hover:shadow-[0_40px_80px_rgba(244,124,84,0.12)] group-hover:border-[#f47c54]/30 transition-all duration-700" style={{ transform: 'translateZ(50px)' }}>
                {/* Terminal Header */}
                <div className="h-6.5 bg-[#070a13] border-b border-white/[0.04] flex items-center px-3 justify-between">
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF5F56]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#27C93F]" />
                  </div>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FF5F56] opacity-70" />
                </div>
                {/* Scanning UI */}
                <div className="p-6 font-mono text-[10px] space-y-3.5 text-white/80">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-[#FF5F56] font-bold">SCANNING TARGET...</span>
                    <span className="text-white/40">v1.2.0</span>
                  </div>
                  <div className="space-y-1.5 font-semibold text-slate-300">
                    <div className="flex gap-2">
                      <span className="text-[#27C93F]">[OK]</span>
                      <span className="opacity-70">Endpoint: /api/v1/auth</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-[#FFBD2E]">[WARN]</span>
                      <span className="opacity-70">Sensitive data in URL params</span>
                    </div>
                    <div className="flex gap-2 animate-pulse">
                      <span className="text-[#FF5F56]">[TEST]</span>
                      <span className="opacity-70">Fuzzing: IDOR payloads...</span>
                    </div>
                  </div>
                  {/* Progress Bar */}
                  <div className="pt-2">
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: "30%" }}
                        whileInView={{ width: "75%" }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                        className="h-full bg-[#FF5F56]" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FeatureCard>

          {/* Card 3: django-secure - Security Shield */}
          <FeatureCard id="django-secure" title={projects[2].title} subtitle={projects[2].subtitle} tags={projects[2].tags} variant={projects[2].variant}>
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center px-4 md:px-10 sm:-mt-20 transition-all duration-700 group-hover:-translate-y-[53%]" style={{ transformStyle: 'preserve-3d' }}>
              <div className="relative w-full max-w-[420px] aspect-[16/9] bg-white/40 backdrop-blur-md rounded-2xl border border-white/50 shadow-[0_15px_45px_rgba(0,0,0,0.015)] flex items-center justify-center overflow-hidden group-hover:border-[#f59e0b]/40 group-hover:shadow-[0_30px_60px_rgba(245,158,11,0.06)] transition-all duration-700" style={{ transform: 'translateZ(40px)', transformStyle: 'preserve-3d' }}>
                {/* Shield Visual */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#f59e0b]/5 to-transparent" />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[200%] h-[200%] border-[0.5px] border-white/10 rounded-full"
                />
                <div className="relative flex flex-col items-center gap-4" style={{ transform: 'translateZ(25px)' }}>
                  <div className="w-16 h-16 rounded-3xl bg-white/10 border border-white/20 shadow-sm flex items-center justify-center group-hover:scale-110 group-hover:border-[#f59e0b]/40 transition-all duration-500">
                    <Lock className="w-7 h-7 text-[#f59e0b]" />
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-24 h-1.5 bg-[#f59e0b]/20 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-[#f59e0b] opacity-80 animate-pulse" />
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#f59e0b] font-bold">Shield Active</span>
                  </div>
                </div>
                {/* Floaties */}
                <div className="absolute top-4 right-4 w-12 h-2 bg-black/[0.03] rounded-full" />
                <div className="absolute bottom-6 left-6 w-8 h-8 rounded-full bg-black/[0.01] border border-black/5 shadow-sm" />
              </div>
            </div>
          </FeatureCard>

          {/* Card 4: Sentinel API - Monitoring HUD */}
          <FeatureCard id="sentinel-api" title={projects[3].title} subtitle={projects[3].subtitle} tags={projects[3].tags} variant={projects[3].variant}>
            <div className="absolute inset-0 flex items-center justify-center p-6 md:p-12 sm:-mt-24 transition-all duration-700 group-hover:-translate-y-4" style={{ transformStyle: 'preserve-3d' }}>
              <div className="w-full max-w-[340px] bg-white/40 backdrop-blur-md rounded-3xl shadow-[0_15px_45px_rgba(0,0,0,0.015)] border border-white/50 p-6 flex flex-col items-center gap-6 group-hover:shadow-[0_30px_60px_rgba(59,130,246,0.06)] group-hover:border-[#3b82f6]/35 transition-all duration-700" style={{ transform: 'translateZ(45px)', transformStyle: 'preserve-3d' }}>
                <div className="w-full flex justify-between items-center" style={{ transform: 'translateZ(10px)' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#3b82f6] animate-pulse" />
                    <span className="font-mono text-[10px] text-slate-500 uppercase tracking-tighter font-bold">Live Monitor</span>
                  </div>
                  <Activity className="w-4 h-4 text-[#3b82f6] opacity-70" />
                </div>
                {/* Heartbeat/Graph Visual */}
                <div className="w-full h-24 relative flex items-end justify-center gap-1.5" style={{ transform: 'translateZ(20px)' }}>
                  {[40, 70, 45, 90, 65, 80, 55, 95, 75, 85].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      transition={{ duration: 0.6, delay: i * 0.03, ease: 'easeOut' }}
                      className="w-full bg-gradient-to-t from-[#3b82f6]/10 to-[#3b82f6]/85 rounded-t-sm"
                    />
                  ))}
                </div>
                <div className="w-full grid grid-cols-2 gap-4 border-t border-white/30 pt-5" style={{ transform: 'translateZ(15px)' }}>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono font-bold">Latency</span>
                    <span className="text-lg font-bold text-slate-800">24ms</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono font-bold">Uptime</span>
                    <span className="text-lg font-bold text-slate-800">99.9%</span>
                  </div>
                </div>
              </div>
            </div>
          </FeatureCard>

        </div>
      </section>

    </div>
  );
};
