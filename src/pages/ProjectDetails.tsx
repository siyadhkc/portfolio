import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, ShieldCheck, Database, Lock, Code, Layers, Zap, Activity, Network } from 'lucide-react';
import { projects } from '../lib/projects';
import { Helmet } from 'react-helmet-async';

const ICON_MAP: Record<string, React.ReactNode> = {
  'mockapi-pro':   <Database className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
  'vulnapi':       <ShieldCheck className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
  'django-secure': <Lock className="w-5 h-5 text-violet-600 dark:text-violet-400" />,
  'sentinel-api':  <Activity className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
  'packet-sentry': <Network className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
  'nebula-db':     <Database className="w-5 h-5 text-violet-600 dark:text-violet-400" />,
};

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const project = projects.find((p) => p.id === id);

  const handleBackClick = React.useCallback(() => {
    if (location.key !== 'default') {
      navigate(-1);
    } else {
      navigate('/projects');
    }
  }, [navigate, location.key]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-[#09090b] px-6 text-center text-zinc-900 dark:text-zinc-100">
        <h1 className="text-2xl font-mono mb-4 text-zinc-700 dark:text-zinc-300">PROJECT_NOT_FOUND</h1>
        <button onClick={handleBackClick} className="text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-2 font-mono uppercase text-xs tracking-wider">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{project.title} — siyadhkc</title>
        <meta name="description" content={project.subtitle} />
      </Helmet>

      <main className="min-h-screen pb-16 relative overflow-hidden bg-transparent">
        {/* Header Block with Clean border */}
        <div className="w-full pt-24 pb-8 sm:pb-12 px-4 sm:px-6 border-b border-zinc-200 dark:border-zinc-900 bg-zinc-100/30 dark:bg-zinc-950/20 md:pt-28">
          <div className="max-w-[1000px] mx-auto">
            {/* Back Button */}
            <button
              onClick={handleBackClick}
              className="inline-flex items-center gap-2.5 text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to inventory
            </button>

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  {ICON_MAP[project.id] ?? <Code className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />}
                  <span className="font-mono text-[10px] tracking-widest text-zinc-500 dark:text-zinc-500 uppercase font-bold">{"// SPECIFICATION_REPORT"}</span>
                </div>
                <h1 className="font-sans font-extrabold tracking-tight text-3xl sm:text-4xl md:text-5xl text-zinc-900 dark:text-zinc-100 mb-4 leading-none">
                  {project.title}
                </h1>
                <p className="text-base sm:text-[17px] text-zinc-600 dark:text-zinc-400 max-w-[650px] leading-relaxed">
                  {project.subtitle}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-gradient-to-r from-violet-700 to-cyan-700 hover:from-violet-600 hover:to-cyan-600 dark:from-violet-500 dark:to-cyan-500 dark:hover:from-violet-400 dark:hover:to-cyan-400 text-white px-6 py-2.5 rounded-lg font-mono text-[12px] font-bold uppercase tracking-wider shadow-[0_2px_16px_rgba(109,40,217,0.25)] hover:shadow-[0_4px_24px_rgba(6,182,212,0.35)] transition-all duration-300"
                >
                  <Github className="w-4 h-4" /> GitHub
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 px-6 py-2.5 rounded-lg font-mono text-[12px] font-bold uppercase tracking-wider transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section Container */}
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          <div className="md:col-span-2 space-y-6 md:space-y-10">
            {/* Overview */}
            <section className="bg-white/40 dark:bg-zinc-950/40 p-5 sm:p-8 border border-zinc-200 dark:border-zinc-800/80 rounded-xl">
              <h2 className="font-sans font-bold text-lg mb-4 text-zinc-800 dark:text-zinc-200 flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Overview
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">{project.description}</p>
            </section>

            {/* Features */}
            <section className="bg-white/40 dark:bg-zinc-950/40 p-5 sm:p-8 border border-zinc-200 dark:border-zinc-800/80 rounded-xl">
              <h2 className="font-sans font-bold text-lg mb-4 text-zinc-800 dark:text-zinc-200 flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-violet-600 dark:text-violet-400" /> Key Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feature, i) => (
                  <div
                    key={i}
                    className="p-4 bg-zinc-100 dark:bg-zinc-900/60 rounded-lg border border-zinc-200 dark:border-zinc-800/80 text-zinc-700 dark:text-zinc-300 font-mono text-[11px] leading-relaxed flex gap-2.5 items-start"
                  >
                    <span className="text-violet-600 dark:text-violet-400 mt-0.5">•</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Sidebar Details */}
          <div className="space-y-6">
            {/* Technologies */}
            <section className="bg-white/40 dark:bg-zinc-950/40 p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800/80 rounded-xl">
              <h3 className="font-sans font-bold text-base text-zinc-800 dark:text-zinc-200 mb-4">Technologies</h3>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span key={t} className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded font-mono text-[9px] uppercase tracking-wider text-zinc-600 dark:text-zinc-400 font-bold">
                    {t}
                  </span>
                ))}
              </div>
            </section>

            {/* Contact */}
            <section className="bg-white/40 dark:bg-zinc-950/40 p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800/80 rounded-xl">
              <span className="font-mono text-[9px] tracking-[0.2em] text-zinc-500 dark:text-zinc-600 uppercase font-bold block mb-3">Contact</span>
              <a
                href="mailto:siyadhkc@gmail.com"
                className="w-full inline-flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-cyan-600 dark:hover:text-cyan-400 py-2.5 rounded-lg font-mono text-[11px] font-bold uppercase tracking-wider transition-colors"
              >
                siyadhkc@gmail.com
              </a>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProjectDetails;
