import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Database, ShieldCheck, Lock, Activity, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../lib/projects';
import { saveScroll, saveSection } from '../lib/scrollState';

// ── Variant → className lookup — O(1), never recreated ───────────────────────
const VARIANT_CLASS: Record<string, string> = {
  teal:   'bg-gradient-to-br from-[#E1EFEB] to-[#CBDFDA]',
  indigo: 'bg-gradient-to-br from-[#E9E9FC] to-[#D5D5F2]',
  sand:   'bg-gradient-to-br from-[#F7F3E9] to-[#EBE4D5]',
  coral:  'bg-gradient-to-br from-[#FCF9F7] to-[#F7EBE8]',
  blue:   'bg-gradient-to-br from-[#E0F2FE] to-[#BAE6FD]',
};

// ── Motion variants — defined outside so they're never recreated ─────────────
const cardMotion = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' } as const,
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

const stackCellMotion = (index: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' } as const,
  transition: { duration: 0.5, delay: index * 0.1, ease: 'easeOut' as const },
  whileHover: { backgroundColor: 'rgba(255,255,255,0.8)', transition: { duration: 0.3 } },
});

// ── Sub-components memoized ───────────────────────────────────────────────────
interface StackCellProps {
  label: string;
  value: string;
  index: number;
  borderClasses: string;
}

const StackCell = memo(({ label, value, index, borderClasses }: StackCellProps) => (
  <motion.div
    {...stackCellMotion(index)}
    className={`group p-8 md:p-10 flex flex-col justify-center bg-white/30 cursor-default relative overflow-hidden transition-all duration-300 ${borderClasses}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-[#1D91A1]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#8A8A85] group-hover:text-[#1D91A1] transition-colors duration-300 block mb-3">{label}</span>
    <span className="text-[#131313] text-base md:text-[17px] leading-relaxed font-medium block opacity-90 group-hover:opacity-100 transition-opacity">{value}</span>
  </motion.div>
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
      className="block w-full"
    >
    <motion.div
      {...cardMotion}
      whileTap={{ scale: 0.99 }}
      className={`group rounded-2xl md:rounded-3xl p-5 md:p-10 relative overflow-hidden flex flex-col h-[420px] sm:h-[380px] md:h-[500px] shadow-sm hover:shadow-xl transition-all duration-500 border border-black/[0.03] cursor-pointer will-change-transform ${VARIANT_CLASS[variant] ?? 'bg-[#EFEEE7]'} ${className ?? ''}`}
    >
      <div className="flex justify-end items-start z-30 shrink-0">
        <div className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center border border-white/50 shadow-sm group-hover:border-black/20 group-hover:bg-white/80 transition-all duration-500">
          <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-[#1A1A1A] transition-transform duration-500 group-hover:scale-110 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      <div className="flex-1 w-full relative z-10 flex items-center justify-center -mt-8 sm:-mt-12 md:-mt-16">
        {children}
      </div>

      <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6 md:inset-x-8 md:bottom-8 bg-white/70 sm:bg-white/80 backdrop-blur-md sm:backdrop-blur-xl p-5 md:p-8 rounded-xl md:rounded-2xl z-20 border border-white/50 shadow-lg transition-all duration-500 group-hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] flex flex-col gap-2.5 sm:gap-3">
        <h3 className="font-bold text-[1.2rem] sm:text-[1.4rem] md:text-[1.6rem] lg:text-[1.85rem] text-[#1A1A1A] tracking-tight transition-colors leading-[1.1]">{title}</h3>
        <p className="text-[#3E4240] text-[13px] sm:text-sm md:text-base lg:text-lg font-medium leading-relaxed opacity-90 line-clamp-2">{subtitle}</p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1 md:pt-2">
          {tags.map((tag) => (
            <span key={tag} className="font-mono text-[8px] md:text-[10px] text-[#8A8A85] bg-black/[0.03] border border-black/[0.05] px-2 md:px-2.5 py-0.5 md:py-1 rounded-full tracking-widest uppercase">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
    </Link>
  );
});
FeatureCard.displayName = 'FeatureCard';

// ── Features page component ───────────────────────────────────────────────────
export const Features = () => {
  return (
    <div className="w-full relative z-10 mb-20">

      {/* STACK SECTION */}
      <section id="stack" style={{ scrollSnapAlign: 'start' }} className="pt-20 pb-16 md:pt-24 md:pb-20 px-4 md:px-8 w-full max-w-[1000px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8 md:mb-12 text-center">
            <h2 className="font-black text-4xl sm:text-5xl lg:text-6xl lg:leading-[1.1] text-[#131313] tracking-tight leading-tight">The Arsenal</h2>
            <p className="text-[#6C6C6C] font-sans text-lg sm:text-xl mt-3 md:mt-4">The tools I actually use to get things done.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 border border-[#E8E8E3] rounded-xl md:rounded-2xl overflow-hidden shadow-sm">
            <StackCell index={0} label="Backend" value="Django · DRF · Django Channels · Celery · Redis · PostgreSQL · JWT" borderClasses="border-b border-[#E8E8E3] sm:border-r" />
            <StackCell index={1} label="Frontend" value="React · TailwindCSS · JavaScript · Vite" borderClasses="border-b border-[#E8E8E3]" />
            <StackCell index={2} label="DevOps" value="Docker · Docker Compose · Nginx · Gunicorn · Linux · Git" borderClasses="border-b border-[#E8E8E3] sm:border-r" />
            <StackCell index={3} label="Testing" value="Pytest · pytest-django · Factory Boy · Coverage" borderClasses="border-b border-[#E8E8E3]" />
            <StackCell index={4} label="Security" value="OWASP API Top 10 · Web Pentesting · API Vulnerability Research" borderClasses="border-b border-[#E8E8E3] sm:border-b-0 sm:border-r" />
            <StackCell index={5} label="Networking" value="TCP/IP · Network Infrastructure · Enterprise Hardware · CCTV Systems" borderClasses="" />
          </div>
        </motion.div>
      </section>

      <div className="max-w-[1200px] mx-auto px-8 mb-5"><hr className="border-[#E8E8E3]" /></div>

      {/* PROJECTS SECTION */}
      <section id="projects" style={{ scrollSnapAlign: 'start' }} className="py-16 md:py-24 px-4 md:px-8 w-full max-w-[1200px] mx-auto">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="font-black text-4xl sm:text-5xl lg:text-6xl lg:leading-[1.1] text-[#131313] tracking-tight leading-tight">What I've Built</h2>
          <p className="text-[#6C6C6C] font-sans text-lg sm:text-xl mt-3 md:mt-4">Some of the things I've coded, hacked, or engineered.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Card 1: MockAPI Pro */}
          <FeatureCard id="mockapi-pro" title={projects[0].title} subtitle={projects[0].subtitle} tags={projects[0].tags} variant={projects[0].variant}>
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center px-4 md:px-10 sm:-mt-24 transition-all duration-700 group-hover:-translate-y-[52%]">
              <div className="relative w-full max-w-[480px] bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-black/[0.05] overflow-hidden group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.18)] transition-all duration-700">
                {/* Minimal Browser Header */}
                <div className="h-5 sm:h-6 bg-[#F9F9F7] border-b border-black/[0.03] flex items-center px-3 gap-1.5">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#FF5F56]/20" />
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#FFBD2E]/20" />
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#27C93F]/20" />
                </div>
                {/* GIF Preview */}
                <div className="aspect-[16/10] relative bg-[#F2F2EC] overflow-hidden">
                  <img 
                    src="/project.gif" 
                    alt="MockAPI Pro Preview" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </FeatureCard>

          {/* Card 2: VulnAPI - Security HUD */}
          <FeatureCard id="vulnapi" title={projects[1].title} subtitle={projects[1].subtitle} tags={projects[1].tags} variant={projects[1].variant}>
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center px-4 md:px-12 sm:-mt-24 transition-all duration-700 group-hover:-translate-y-[55%]">
              <div className="w-full max-w-[400px] bg-[#1A1A1A] rounded-xl shadow-2xl border border-white/10 overflow-hidden group-hover:shadow-[#FF5F56]/10 transition-all duration-700">
                {/* Terminal Header */}
                <div className="h-6 bg-[#2D2D2D] border-b border-white/5 flex items-center px-3 justify-between">
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF5F56]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#27C93F]" />
                  </div>
                  <ShieldCheck className="w-3 h-3 text-[#FF5F56] opacity-50" />
                </div>
                {/* Scanning UI */}
                <div className="p-5 font-mono text-[10px] space-y-3 text-white/80">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-[#FF5F56]">SCANNING TARGET...</span>
                    <span className="text-white/40">v1.2.0</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex gap-2">
                      <span className="text-[#27C93F]">[OK]</span>
                      <span className="opacity-60">Endpoint: /api/v1/auth</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-[#FFBD2E]">[WARN]</span>
                      <span className="opacity-60">Sensitive data in URL params</span>
                    </div>
                    <div className="flex gap-2 animate-pulse">
                      <span className="text-[#FF5F56]">[TEST]</span>
                      <span className="opacity-60">Fuzzing: IDOR payloads...</span>
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
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center px-4 md:px-10 sm:-mt-20 transition-all duration-700 group-hover:-translate-y-[53%]">
              <div className="relative w-full max-w-[420px] aspect-[16/9] bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] flex items-center justify-center overflow-hidden group-hover:bg-white/60 transition-all duration-700">
                {/* Shield Visual */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#1D91A1]/5 to-transparent" />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[200%] h-[200%] border-[0.5px] border-[#1D91A1]/10 rounded-full"
                />
                <div className="relative flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-3xl bg-white shadow-xl flex items-center justify-center border border-black/5 group-hover:scale-110 transition-transform duration-500">
                    <Lock className="w-7 h-7 text-[#1A1A1A]" />
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-24 h-2 bg-[#1D91A1]/20 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-[#1D91A1] opacity-60" />
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#1D91A1]">Shield Active</span>
                  </div>
                </div>
                {/* Floaties */}
                <div className="absolute top-4 right-4 w-12 h-2 bg-black/5 rounded-full" />
                <div className="absolute bottom-6 left-6 w-8 h-8 rounded-full bg-white/40 border border-white/60 shadow-sm" />
              </div>
            </div>
          </FeatureCard>

          {/* Card 4: Sentinel API - Monitoring HUD */}
          <FeatureCard id="sentinel-api" title={projects[3].title} subtitle={projects[3].subtitle} tags={projects[3].tags} variant={projects[3].variant}>
            <div className="absolute inset-0 flex items-center justify-center p-6 md:p-12 sm:-mt-24 transition-all duration-700 group-hover:-translate-y-4">
              <div className="w-full max-w-[340px] bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-black/[0.03] p-6 flex flex-col items-center gap-6 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.15)] transition-all duration-700">
                <div className="w-full flex justify-between items-center">
                   <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-[#007AFF] animate-pulse" />
                     <span className="font-mono text-[10px] text-[#8A8A85] uppercase tracking-tighter">Live Monitor</span>
                   </div>
                   <Activity className="w-4 h-4 text-[#007AFF] opacity-40" />
                </div>
                {/* Heartbeat/Graph Visual */}
                <div className="w-full h-24 relative flex items-end justify-center gap-1.5">
                  {[40, 70, 45, 90, 65, 80, 55, 95, 75, 85].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                      className="w-full bg-gradient-to-t from-[#007AFF]/20 to-[#007AFF]/60 rounded-t-sm"
                    />
                  ))}
                </div>
                <div className="w-full grid grid-cols-2 gap-4 border-t border-black/[0.03] pt-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-[#8A8A85] uppercase">Latency</span>
                    <span className="text-lg font-bold text-[#1A1A1A]">24ms</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-[#8A8A85] uppercase">Uptime</span>
                    <span className="text-lg font-bold text-[#1A1A1A]">99.9%</span>
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
