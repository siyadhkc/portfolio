import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Terminal, ShieldCheck, Coffee, Code2 } from 'lucide-react';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

// ── High performance Spotlight Hover Tracker ─────────────────────────────────
const handleSpotlightMouseMove = (e: React.MouseEvent<HTMLElement>) => {
  const { currentTarget, clientX, clientY } = e;
  const rect = currentTarget.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  currentTarget.style.setProperty('--mouse-x', `${x}px`);
  currentTarget.style.setProperty('--mouse-y', `${y}px`);
};

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About — siyadhkc</title>
        <meta name="description" content="About Siyadh, a Python Full-Stack Developer & Security Specialist." />
      </Helmet>
      
      <main id="about" style={{ scrollSnapAlign: 'start' }} className="min-h-screen relative overflow-hidden flex flex-col px-6 md:px-10 bg-transparent">
        <div className="max-w-[860px] w-full mx-auto relative z-10 flex flex-col gap-16">
          
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6 pt-28 mt-12"
          >
            <h1 className="font-bold text-[4rem] md:text-[5.5rem] text-slate-800 leading-[0.95] tracking-tight">
              Hello. I'm Siyadh.
            </h1>
            <p className="font-sans text-xl md:text-[2.2rem] text-slate-600 leading-[1.4] text-balance font-light max-w-[900px] mt-2">
              I'm a Python full-stack developer with a heavy focus on <span className="font-semibold text-[#A88438]">web application security and pentesting</span>.
            </p>
          </motion.div>

          {/* Grid Layout (Showcase Vibe with mouse-spotlight cards) */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.12 } }
            }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6"
          >
            {/* Card 1: What I Do */}
            <motion.div 
              variants={cardVariants}
              onMouseMove={handleSpotlightMouseMove}
              className="md:col-span-8 p-8 md:p-10 rounded-[2rem] flex flex-col gap-6 group transition-all duration-500 bg-white/30 backdrop-blur-md border border-white/50 hover:border-[#A88438]/45 relative overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.01)] spotlight-card"
            >
              {/* Dynamic spotlight colored glow behind card */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
                style={{ background: 'radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(168, 132, 56, 0.08), transparent 55%)' }}
              />
              <div className="w-12 h-12 rounded-2xl bg-[#A88438]/10 border border-[#A88438]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative z-10 animate-pulse">
                <Terminal className="w-6 h-6 text-[#A88438]" />
              </div>
              <div className="relative z-10">
                <h3 className="font-sans font-bold text-2xl text-slate-800 mb-3">What I Do</h3>
                <p className="font-sans text-[17px] text-slate-600 leading-relaxed font-semibold">
                  I spend my time building applications and then figuring out how to break them. For me, development and cybersecurity aren't two separate fields. You can't build a robust backend or API if you don't know exactly how an attacker would try to exploit it.
                </p>
              </div>
            </motion.div>

            {/* Card 2: Small stat/focus */}
            <motion.div 
              variants={cardVariants}
              onMouseMove={handleSpotlightMouseMove}
              className="md:col-span-4 p-8 md:p-10 rounded-[2rem] flex flex-col justify-between group transition-all duration-500 bg-white/30 backdrop-blur-md border border-white/50 hover:border-rose-500/45 relative overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.01)] spotlight-card"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
                style={{ background: 'radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(244, 63, 94, 0.08), transparent 55%)' }}
              />
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative z-10">
                <ShieldCheck className="w-6 h-6 text-rose-500" />
              </div>
              <div className="mt-8 relative z-10">
                <h3 className="font-mono text-[10px] uppercase tracking-widest text-slate-400 mb-2 font-bold">Core Focus</h3>
                <p className="font-semibold text-2xl text-slate-800 leading-tight">
                  Zero-trust architecture & API Defense.
                </p>
              </div>
            </motion.div>

            {/* Card 3: Specialty */}
            <motion.div 
              variants={cardVariants}
              onMouseMove={handleSpotlightMouseMove}
              className="md:col-span-6 p-8 md:p-10 rounded-[2rem] flex flex-col gap-6 group transition-all duration-500 bg-white/30 backdrop-blur-md border border-white/50 hover:border-[#A88438]/45 relative overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.01)] spotlight-card"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
                style={{ background: 'radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(168, 132, 56, 0.08), transparent 55%)' }}
              />
              <div className="w-12 h-12 rounded-2xl bg-[#A88438]/10 border border-[#A88438]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative z-10">
                <Code2 className="w-6 h-6 text-[#A88438]" />
              </div>
              <div className="flex flex-col h-full justify-between gap-8 relative z-10">
                <div>
                  <h3 className="font-sans font-bold text-2xl text-slate-800 mb-3">The Specialty</h3>
                  <p className="font-sans text-[17px] text-slate-600 leading-relaxed font-semibold mb-6">
                    While I write a lot of Python and Django, my real specialty is API and web app security. I do web pentesting, patch vulnerabilities, and write code that actually holds up in the wild. Security isn't just a checklist for me—it's step zero.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'Django', 'Web Pentesting', 'API Security'].map(tech => (
                    <span key={tech} className="px-4 py-2 bg-white/40 border border-white/50 rounded-full font-mono text-[9px] uppercase tracking-wider text-slate-500 font-bold shadow-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Card 4: Off the clock */}
            <motion.div 
              variants={cardVariants}
              onMouseMove={handleSpotlightMouseMove}
              className="md:col-span-6 p-8 md:p-10 rounded-[2rem] flex flex-col gap-6 group transition-all duration-500 bg-white/30 backdrop-blur-md border border-white/50 hover:border-rose-500/45 relative overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.01)] spotlight-card"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
                style={{ background: 'radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(244, 63, 94, 0.08), transparent 55%)' }}
              />
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative z-10">
                <Coffee className="w-6 h-6 text-rose-500" />
              </div>
              <div className="relative z-10">
                <h3 className="font-sans font-bold text-2xl text-slate-800 mb-3">Off the Clock</h3>
                <p className="font-sans text-[17px] text-slate-600 leading-relaxed font-semibold">
                  When I'm not writing Python or auditing a codebase, I'm usually researching new attack vectors, tinkering with my local setup, or trying to strip the noise out of my workflow. I like things that are clean, simple, and functional.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Glowing Call-To-Action panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 md:mt-20 p-10 md:p-16 rounded-[2.5rem] bg-white/30 backdrop-blur-md border border-white/50 shadow-[0_15px_45px_rgba(0,0,0,0.01)] relative overflow-hidden group mb-28"
          >
             {/* Animated linear hover backdrop gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#A88438]/0 via-[#A88438]/[0.02] to-[#A88438]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
              <div className="max-w-[500px]">
                <h2 className="font-bold text-[3rem] md:text-[4rem] text-slate-800 leading-[1.1] tracking-tight mb-4 select-none">
                  Want to talk <span className="italic text-[#A88438]">code?</span>
                </h2>
                <p className="font-sans text-lg text-slate-600 font-semibold">
                  I'm always open to discussing web security, Python, or interesting architectural problems. Feel free to reach out.
                </p>
              </div>
              
              <a 
                href="mailto:siyadhkc@gmail.com"
                className="group/btn relative inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white hover:bg-slate-800 rounded-full font-mono text-[11px] uppercase tracking-widest overflow-hidden transition-all duration-300 font-bold shadow-[0_8px_24px_rgba(15,23,42,0.12)]"
              >
                <span className="relative z-10 flex items-center gap-3">
                  siyadhkc@gmail.com <span className="text-lg leading-none group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
                </span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Minimal Footer */}
        <div className="relative z-10 w-full mt-auto">
          <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-[860px] mx-auto px-6 md:px-8 py-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-black/[0.06]"
          >
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-2.5 font-mono text-[9px] tracking-[0.35em] text-slate-400 uppercase font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A88438]/40 inline-block animate-pulse"></span>
                © 2026 SIYADHKC
              </span>
              <span className="hidden sm:block w-px h-3 bg-black/[0.06]"></span>
              <span className="hidden sm:block font-mono text-[9px] tracking-[0.2em] text-slate-400 uppercase font-bold">Developer / Researcher</span>
            </div>

            <div className="flex items-center gap-7">
              <Link
                to="/"
                className="font-mono text-[9px] tracking-[0.2em] text-slate-400 hover:text-slate-800 uppercase transition-colors duration-200 font-bold"
              >
                Home
              </Link>
              {[
                { label: 'GitHub', href: 'https://github.com/siyadhkc' },
                { label: 'LinkedIn', href: 'https://linkedin.com/in/siyadhkc' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[9px] tracking-[0.2em] text-slate-400 hover:text-slate-800 uppercase transition-colors duration-200 font-bold"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.footer>
        </div>
      </main>
    </>
  );
};

export default AboutPage;
