import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, ShieldCheck, Database, Lock, Code, Layers, Zap, Activity } from 'lucide-react';
import { projects } from '../lib/projects';
import { Helmet } from 'react-helmet-async';
import { saveSection } from '../lib/scrollState';

const ICON_MAP: Record<string, React.ReactNode> = {
  'mockapi-pro':  <Database className="w-12 h-12" />,
  'vulnapi':      <ShieldCheck className="w-12 h-12" />,
  'django-secure': <Lock className="w-12 h-12" />,
  'sentinel-api': <Activity className="w-12 h-12" />,
};

const VARIANT_STYLES: Record<string, string> = {
  teal:   'from-purple-600/10 via-[#FAF9F6]/80 to-transparent text-purple-600 border-black/[0.04]',
  indigo: 'from-purple-600/10 via-[#FAF9F6]/80 to-transparent text-purple-600 border-black/[0.04]',
  sand:   'from-rose-500/10 via-[#FAF9F6]/80 to-transparent text-rose-600 border-black/[0.04]',
  coral:  'from-rose-500/10 via-[#FAF9F6]/80 to-transparent text-rose-600 border-black/[0.04]',
  blue:   'from-purple-600/10 via-[#FAF9F6]/80 to-transparent text-[#8b5cf6] border-black/[0.04]',
};

const DEFAULT_VARIANT = 'from-slate-100 via-[#FAF9F6]/80 to-transparent text-slate-800 border-black/[0.04]';

const featureMotion = (i: number) => ({
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
  transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
});

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const project = projects.find((p) => p.id === id);

  const handleBackClick = React.useCallback(() => {
    if (location.key !== 'default') {
      navigate(-1);
    } else {
      saveSection('projects');
      navigate('/');
    }
  }, [navigate, location.key]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF9F6] px-6 text-center">
        <h1 className="text-4xl font-serif mb-4 text-slate-800">Project Not Found</h1>
        <button onClick={handleBackClick} className="text-purple-600 hover:underline flex items-center gap-2 font-mono uppercase text-xs tracking-wider">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
      </div>
    );
  }

  const variantStyle = VARIANT_STYLES[project.variant] ?? DEFAULT_VARIANT;

  return (
    <>
      <Helmet>
        <title>{project.title} — siyadhkc</title>
        <meta name="description" content={project.subtitle} />
      </Helmet>

      <main className="min-h-screen pb-16 md:pb-24 relative overflow-hidden bg-[#FAF9F6]">
        {/* Glow backdrop decorative orb */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-purple-600/5 blur-[120px] pointer-events-none" />

        {/* Hero Section Container */}
        <div className={`w-full bg-gradient-to-b ${variantStyle} pt-28 sm:pt-32 md:pt-36 pb-14 sm:pb-16 md:pb-24 px-5 sm:px-6 md:px-12 relative overflow-hidden border-b border-black/[0.05]`}>
          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 sm:translate-x-1/4 opacity-[0.03] pointer-events-none text-slate-700">
            <div className="scale-[2.8] sm:scale-[3.5] md:scale-[5] select-none">
              {ICON_MAP[project.id] ?? <Code className="w-12 h-12" />}
            </div>
          </div>

          <div className="max-w-[1000px] mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <button
                onClick={handleBackClick}
                className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-mono uppercase tracking-[0.22em] text-slate-500 hover:text-slate-800 transition-colors mb-8 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform duration-300" /> Back to projects
              </button>
            </motion.div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-10">
              <div className="min-w-0">
                <motion.h1
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
                  className="font-hero font-bold tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight md:leading-[1.1] mb-5 sm:mb-6 text-slate-800 break-words"
                >
                  {project.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
                  className="text-base sm:text-lg md:text-xl text-slate-600 max-w-[650px] leading-relaxed font-semibold"
                >
                  {project.subtitle}
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
                className="grid grid-cols-2 sm:flex gap-3 sm:gap-4 w-full sm:w-auto z-20"
              >
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 sm:gap-3 bg-slate-900 text-white hover:bg-slate-800 px-5 sm:px-7 py-3 rounded-full font-bold shadow-[0_8px_24px_rgba(15,23,42,0.12)] transition-all text-sm whitespace-nowrap"
                >
                  <Github className="w-4.5 h-4.5" /> GitHub
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 sm:gap-3 bg-black/[0.02] backdrop-blur-xl text-slate-800 px-5 sm:px-7 py-3 rounded-full font-bold shadow-sm border border-black/[0.08] hover:bg-black/[0.05] hover:border-purple-600/25 transition-all text-sm whitespace-nowrap"
                >
                  <ExternalLink className="w-4.5 h-4.5 text-purple-600" /> Live Demo
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content Section Container */}
        <div className="max-w-[1000px] mx-auto px-5 sm:px-6 mt-12 sm:mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 relative z-10">
          <div className="md:col-span-2">
            <section className="mb-12 md:mb-16">
              <h2 className="font-bold text-2xl sm:text-3xl mb-5 sm:mb-6 flex items-center gap-3 text-slate-800">
                <Layers className="w-5 h-5 text-purple-600 shrink-0 animate-pulse" /> Project Overview
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 font-semibold">{project.description}</p>
            </section>

            <section>
              <h2 className="font-bold text-2xl sm:text-3xl mb-5 sm:mb-6 flex items-center gap-3 text-slate-800">
                <Zap className="w-5 h-5 text-rose-500 shrink-0" /> Key Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.features.map((feature, i) => (
                  <motion.div
                    key={i}
                    {...featureMotion(i)}
                    className="p-5 sm:p-6 bg-white/55 rounded-2xl border border-black/[0.04] shadow-[0_4px_16px_rgba(0,0,0,0.01)] hover:border-purple-600/20 transition-colors group"
                  >
                    <p className="text-slate-700 font-semibold leading-relaxed group-hover:text-slate-900 transition-colors">{feature}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* Right sidebar details */}
          <div className="space-y-8 sm:space-y-10 md:space-y-12">
            <section>
              <h3 className="font-bold text-xl sm:text-2xl text-slate-800 mb-5">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="px-4 py-2 bg-slate-100/50 border border-slate-200/40 rounded-full font-mono text-[10px] uppercase tracking-widest text-slate-500 font-bold shadow-sm">
                    {t}
                  </span>
                ))}
              </div>
            </section>

            <section className="p-6 sm:p-8 bg-white/55 rounded-3xl border border-black/[0.05] shadow-[0_15px_45px_rgba(0,0,0,0.02)]">
              <h3 className="font-bold text-xl leading-tight text-slate-800 mb-4">Want to know more?</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 font-semibold">
                If you're interested in the architecture or implementation details, drop me a line.
              </p>
              <a
                href="mailto:siyadhkc@gmail.com"
                className="w-full inline-flex items-center justify-center bg-slate-900 text-white hover:bg-slate-800 py-3 rounded-full font-bold transition-all shadow-[0_8px_24px_rgba(15,23,42,0.12)] text-sm"
              >
                Get in touch
              </a>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProjectDetails;
