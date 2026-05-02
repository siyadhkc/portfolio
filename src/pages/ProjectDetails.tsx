import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, ShieldCheck, Database, Lock, Code, Layers, Zap, Activity } from 'lucide-react';
import { projects } from '../lib/projects';
import { Helmet } from 'react-helmet-async';
import { saveSection } from '../lib/scrollState';

// ── Module-level constants — never recreated on re-render ─────────────────────

const ICON_MAP: Record<string, React.ReactNode> = {
  'mockapi-pro':  <Database className="w-12 h-12" />,
  'vulnapi':      <ShieldCheck className="w-12 h-12" />,
  'django-secure': <Lock className="w-12 h-12" />,
  'sentinel-api': <Activity className="w-12 h-12" />,
};

const VARIANT_STYLES: Record<string, string> = {
  teal:   'from-[#E1EFEB] to-[#CBDFDA] text-[#1D91A1]',
  coral:  'from-[#FCF9F7] to-[#F7EBE8] text-[#FF5F56]',
  sand:   'from-[#F7F3E9] to-[#EBE4D5] text-[#2B302F]',
  indigo: 'from-[#E9E9FC] to-[#D5D5F2] text-[#6366F1]',
  blue:   'from-[#E0F2FE] to-[#BAE6FD] text-[#007AFF]',
};

const DEFAULT_VARIANT = 'from-[#EFEEE7] to-[#DFDED7] text-[#131313]';

// ── Feature card motion — defined outside so it's never recreated ─────────────
const featureMotion = (i: number) => ({
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
  transition: { delay: i * 0.1 },
});

// ─────────────────────────────────────────────────────────────────────────────
const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const project = projects.find((p) => p.id === id);

  // UI "Back to projects" button.
  // If the user navigated here from Home, navigate(-1) goes back and
  // ScrollController in App.tsx will restore the saved scroll position.
  // If the user landed directly via URL (no history), navigate('/') pushes
  // home and ScrollController scrolls to the projects section.
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7F7F2] px-6">
        <h1 className="text-4xl font-serif mb-4">Project Not Found</h1>
        <button onClick={handleBackClick} className="text-[#1D91A1] hover:underline flex items-center gap-2">
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

      <main className="min-h-screen pb-16 md:pb-24">
        {/* Hero Section */}
        <div className={`w-full bg-gradient-to-br ${variantStyle} pt-28 sm:pt-32 md:pt-36 pb-14 sm:pb-16 md:pb-20 px-5 sm:px-6 md:px-12 relative overflow-hidden`}>
          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 sm:translate-x-1/4 opacity-10 pointer-events-none">
            <div className="scale-[2.8] sm:scale-[3.5] md:scale-[5]">
              {ICON_MAP[project.id] ?? <Code className="w-12 h-12" />}
            </div>
          </div>

          <div className="max-w-[1000px] mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <button
                onClick={handleBackClick}
                className="inline-flex items-center gap-2 text-[11px] sm:text-sm font-mono uppercase tracking-[0.22em] sm:tracking-widest opacity-60 hover:opacity-100 transition-opacity mb-7 sm:mb-8"
              >
                <ArrowLeft className="w-4 h-4" /> Back to projects
              </button>
            </motion.div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-10">
              <div className="min-w-0">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="font-sans font-medium tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight md:leading-[1.1] mb-5 sm:mb-6 text-[#1A1A1A] break-words"
                >
                  {project.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-base sm:text-lg md:text-xl text-[#3E4240] max-w-[600px] leading-relaxed"
                >
                  {project.subtitle}
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="grid grid-cols-2 sm:flex gap-3 sm:gap-4 w-full sm:w-auto"
              >
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 sm:gap-3 bg-black/80 backdrop-blur-xl text-white px-4 sm:px-6 py-3 rounded-full font-medium shadow-lg hover:bg-black transition-all text-sm sm:text-base whitespace-nowrap border border-white/10"
                >
                  <Github className="w-5 h-5" /> GitHub
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 sm:gap-3 bg-white/40 backdrop-blur-xl text-black px-4 sm:px-6 py-3 rounded-full font-medium shadow-md border border-white/60 hover:bg-white/80 transition-all text-sm sm:text-base whitespace-nowrap"
                >
                  <ExternalLink className="w-5 h-5" /> Live Demo
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-[1000px] mx-auto px-5 sm:px-6 mt-12 sm:mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          <div className="md:col-span-2">
            <section className="mb-12 md:mb-16">
              <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl mb-5 sm:mb-6 flex items-center gap-3 leading-tight">
                <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-[#1D91A1] shrink-0" /> Project Overview
              </h2>
              <p className="text-[#5B5F5D] text-base sm:text-lg leading-relaxed mb-8">{project.description}</p>
            </section>

            <section>
              <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl mb-5 sm:mb-6 flex items-center gap-3 leading-tight">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-[#1D91A1] shrink-0" /> Key Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.features.map((feature, i) => (
                  <motion.div
                    key={i}
                    {...featureMotion(i)}
                    className="p-5 sm:p-6 bg-white rounded-2xl border border-black/[0.03] shadow-sm hover:shadow-md transition-shadow"
                  >
                    <p className="text-[#3E4240] font-medium leading-relaxed">{feature}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-8 sm:space-y-10 md:space-y-12">
            <section>
              <h3 className="font-bold text-xl sm:text-2xl mb-5 sm:mb-6">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="px-4 py-2 bg-black/5 rounded-full font-mono text-[11px] uppercase tracking-widest text-[#6C6C6C]">
                    {t}
                  </span>
                ))}
              </div>
            </section>

            <section className="p-6 sm:p-8 bg-white rounded-2xl sm:rounded-3xl border border-black/[0.03] shadow-sm">
              <h3 className="font-bold text-xl sm:text-2xl leading-tight mb-4">Want to know more?</h3>
              <p className="text-[#6C6C6C] text-sm leading-relaxed mb-6">
                If you're interested in the architecture or implementation details, drop me a line.
              </p>
              <a
                href="mailto:siyadhkc@gmail.com"
                className="w-full inline-flex items-center justify-center bg-[#E1EFEB]/70 backdrop-blur-md text-[#1D91A1] py-3 rounded-full font-medium hover:bg-[#D1E6E4] border border-white/40 transition-all"
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
