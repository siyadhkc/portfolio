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
      className={`group rounded-xl md:rounded-2xl p-6 md:p-10 relative overflow-hidden flex flex-col h-auto sm:h-[320px] md:h-[480px] min-h-[240px] shadow-sm hover:shadow-md transition-shadow duration-500 border border-black/[0.03] cursor-pointer ${VARIANT_CLASS[variant] ?? 'bg-[#EFEEE7]'} ${className ?? ''}`}
    >
      <div className="flex justify-between items-start z-20 shrink-0 mb-4 sm:mb-0">
        <h3 className="font-serif text-[28px] md:text-[32px] text-[#1A1A1A] tracking-tight group-hover:text-[#1D91A1] transition-colors leading-tight">{title}</h3>
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/50 backdrop-blur-md flex items-center justify-center border border-white/50 shadow-sm group-hover:bg-[#1D91A1] group-hover:text-white group-hover:border-[#1D91A1] transition-all duration-500">
          <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      <div className="flex-1 w-full relative z-0 min-h-[180px] sm:min-h-0">
        {children}
      </div>

      <div className="relative sm:absolute sm:inset-x-6 md:inset-x-8 sm:bottom-6 md:bottom-8 bg-[#FDFDFC]/80 backdrop-blur-xl p-6 md:p-8 rounded-xl md:rounded-2xl z-20 border border-white/50 shadow-sm transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] flex flex-col gap-4 mt-auto sm:mt-0">
        <p className="text-[#3E4240] text-sm md:text-[16px] font-medium leading-relaxed opacity-90">{subtitle}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="font-mono text-[9px] md:text-[10px] text-[#8A8A85] bg-black/[0.03] border border-black/[0.05] px-2.5 py-1 rounded-full tracking-widest uppercase">
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
    <div className="w-full relative z-10 bg-[#F7F7F2]">

      {/* STACK SECTION */}
      <section id="stack" className="pt-20 pb-16 md:pt-24 md:pb-20 px-4 md:px-8 w-full max-w-[1000px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8 md:mb-12 text-center">
            <h2 className="font-serif text-[2.5rem] md:text-[4rem] text-[#131313] tracking-tight leading-tight">Technical Stack</h2>
            <p className="text-[#6C6C6C] font-sans text-base md:text-lg mt-2">Tools I use to build robust architectures.</p>
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

      <div className="max-w-[1200px] mx-auto px-8"><hr className="border-[#E8E8E3]" /></div>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-16 md:py-24 px-4 md:px-8 w-full max-w-[1200px] mx-auto">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="font-serif text-[2.5rem] md:text-[5rem] text-[#131313] tracking-tight leading-tight">Selected Projects</h2>
          <p className="text-[#6C6C6C] font-sans text-lg md:text-xl mt-3 md:mt-4">Open source and private engineering work.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Card 1: MockAPI Pro */}
          <FeatureCard id="mockapi-pro" title={projects[0].title} subtitle={projects[0].subtitle} tags={projects[0].tags} variant={projects[0].variant}>
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pl-6 pr-6 md:pl-10 sm:-mt-24">
              <div className="w-full bg-white/70 backdrop-blur-md rounded-md shadow-lg border border-black/5 p-4 flex flex-col overflow-hidden relative group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-shadow">
                <Database className="w-6 h-6 text-[#1D91A1] mb-4 opacity-50" />
                <div className="w-[85%] h-4 bg-black/5 rounded-full mb-3" />
                <div className="w-[60%] h-4 bg-[#E1EFEB] rounded-full mb-6" />
                <div className="flex gap-2 mb-2">
                  <div className="w-12 h-6 bg-[#27C93F]/20 rounded text-[10px] font-mono text-[#1AAB29] flex items-center justify-center">GET</div>
                  <div className="flex-1 h-6 bg-black/5 rounded" />
                </div>
                <div className="flex gap-2">
                  <div className="w-12 h-6 bg-[#FFBD2E]/20 rounded text-[10px] font-mono text-[#DEA123] flex items-center justify-center">POST</div>
                  <div className="flex-1 h-6 bg-black/5 rounded" />
                </div>
              </div>
            </div>
          </FeatureCard>

          {/* Card 2: VulnAPI */}
          <FeatureCard id="vulnapi" title={projects[1].title} subtitle={projects[1].subtitle} tags={projects[1].tags} variant={projects[1].variant}>
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center sm:-mt-24">
              <div className="w-[75%] bg-white rounded-lg shadow-sm border border-[#E8E8E3] p-6 flex flex-col relative group-hover:shadow-md transition-shadow">
                <ShieldCheck className="w-8 h-8 text-[#FF5F56] absolute top-6 right-6 opacity-30 group-hover:opacity-60 transition-opacity" />
                <h4 className="font-mono text-[11px] text-[#A1A1A1] uppercase tracking-widest mb-6">Scan Progress</h4>
                <div className="w-full h-2 bg-black/5 rounded-full mb-4 overflow-hidden">
                  <div className="w-[65%] h-full bg-[#1D91A1]" />
                </div>
                <div className="flex justify-between items-center text-[12px] font-mono text-[#6C6C6C]">
                  <span>Injecting Payloads...</span>
                  <span>65%</span>
                </div>
              </div>
            </div>
          </FeatureCard>

          {/* Card 3: django-secure */}
          <FeatureCard id="django-secure" title={projects[2].title} subtitle={projects[2].subtitle} tags={projects[2].tags} variant={projects[2].variant}>
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center px-4 md:px-10 sm:-mt-20">
              <div className="w-[90%] md:w-full max-w-[600px] bg-white rounded-md shadow-sm border border-black/5 p-4 flex items-center gap-3 md:gap-4 group-hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] transition-shadow">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#F2F2EC] flex items-center justify-center shrink-0">
                  <Lock className="w-4 h-4 md:w-5 md:h-5 text-[#2B302F]" />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <div className="w-[40%] h-2.5 md:h-3 bg-black/10 rounded-full" />
                  <div className="w-[70%] h-2.5 md:h-3 bg-black/5 rounded-full" />
                </div>
                <div className="hidden sm:block w-16 md:w-20 h-6 md:h-8 rounded-full bg-[#E0DFD8] opacity-50" />
              </div>
            </div>
          </FeatureCard>

          {/* Card 4: Sentinel API */}
          <FeatureCard id="sentinel-api" title={projects[3].title} subtitle={projects[3].subtitle} tags={projects[3].tags} variant={projects[3].variant}>
            <div className="absolute inset-0 flex items-center justify-center p-8 sm:-mt-24">
              <div className="w-full max-w-[320px] bg-white/70 backdrop-blur-md rounded-lg shadow-lg border border-black/5 p-6 flex flex-col items-center group-hover:scale-105 transition-transform">
                <Activity className="w-12 h-12 text-[#007AFF] mb-4" />
                <div className="w-full space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <div className="flex-1 h-2 bg-black/5 rounded-full" />
                  </div>
                  <div className="w-[80%] h-2 bg-black/5 rounded-full mx-auto" />
                </div>
              </div>
            </div>
          </FeatureCard>

        </div>
      </section>

    </div>
  );
};
