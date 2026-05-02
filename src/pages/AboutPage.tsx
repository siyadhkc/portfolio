import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// import { Footer} from '../components/Footer';
import { Terminal, ShieldCheck, Coffee, Code2 } from 'lucide-react';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About — siyadhkc</title>
        <meta name="description" content="About Siyadh, a Python Full-Stack Developer & Security Specialist." />
      </Helmet>
      
      <main className="min-h-screen relative overflow-hidden flex flex-col px-6 md:px-10">
        <div className="max-w-[860px] w-full mx-auto relative z-10 flex flex-col gap-16">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6 pt-28 mt-12"
          >
           
            
            <h1 className="font-bold text-[4rem] md:text-[5.5rem] text-comet-text leading-[0.95] tracking-tight">
              Hello. I'm Siyadh.
            </h1>
            <p className="font-sans text-xl md:text-[2.2rem] text-comet-text/80 leading-[1.4] text-balance font-light max-w-[900px] mt-2">
              I'm a Python full-stack developer with a heavy focus on <span className="font-medium text-comet-teal">web application security and pentesting</span>.
              
            </p>
          </motion.div>

          {/* Grid Layout (Portfolio Vibe) */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.15 } }
            }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6"
          >
            {/* Card 1: What I Do */}
            <motion.div variants={cardVariants} className="md:col-span-8 p-8 md:p-10 rounded-[2rem] glass-panel flex flex-col gap-6 group hover:border-comet-teal/20 hover:shadow-lg transition-all duration-500 bg-white/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-comet-teal/5 via-transparent to-comet-teal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="w-12 h-12 rounded-2xl bg-comet-teal/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative z-10">
                <Terminal className="w-6 h-6 text-comet-teal" />
              </div>
              <div className="relative z-10">
                <h3 className="font-serif text-2xl text-comet-text mb-3">What I Do</h3>
                <p className="font-sans text-[17px] text-comet-text/70 leading-relaxed font-light">
                  I spend my time building applications and then figuring out how to break them. For me, development and cybersecurity aren't two separate fields. You can't build a robust backend or API if you don't know exactly how an attacker would try to exploit it.
                </p>
              </div>
            </motion.div>

            {/* Card 2: Small stat/focus */}
            <motion.div variants={cardVariants} className="md:col-span-4 p-8 md:p-10 rounded-[2rem] glass-panel flex flex-col justify-between group hover:border-amber-500/20 hover:shadow-lg transition-all duration-500 bg-white/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-bl from-amber-500/5 via-transparent to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative z-10">
                <ShieldCheck className="w-6 h-6 text-amber-500" />
              </div>
              <div className="mt-8 relative z-10">
                <h3 className="font-mono text-[10px] uppercase tracking-widest text-comet-muted mb-2">Core Focus</h3>
                <p className="font-semibold text-2xl text-comet-text leading-tight">
                  Zero-trust architecture & API Defense.
                </p>
              </div>
            </motion.div>

            {/* Card 3: Specialty */}
            <motion.div variants={cardVariants} className="md:col-span-6 p-8 md:p-10 rounded-[2rem] glass-panel flex flex-col gap-6 hover:border-comet-teal/10 hover:shadow-lg transition-all duration-500 bg-white/30 group relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-comet-teal/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
               <div className="w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative z-10">
                <Code2 className="w-6 h-6 text-comet-text/70" />
              </div>
              <div className="flex flex-col h-full justify-between gap-8 relative z-10">
                <div>
                  <h3 className="font-semibold text-2xl text-comet-text mb-3">The Specialty</h3>
                  <p className="font-sans text-[17px] text-comet-text/70 leading-relaxed font-light mb-6">
                    While I write a lot of Python and Django, my real specialty is API and web app security. I do web pentesting, patch vulnerabilities, and write code that actually holds up in the wild. Security isn't just a checklist for me—it's step zero.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'Django', 'Web Pentesting', 'API Security'].map(tech => (
                    <span key={tech} className="px-4 py-2 bg-white/60 border border-black/5 rounded-full font-mono text-[10px] uppercase tracking-wider text-comet-text/80 shadow-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Card 4: Off the clock */}
            <motion.div variants={cardVariants} className="md:col-span-6 p-8 md:p-10 rounded-[2rem] glass-panel flex flex-col gap-6 hover:border-amber-500/10 hover:shadow-lg transition-all duration-500 bg-white/30 group relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tl from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
               <div className="w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative z-10">
                <Coffee className="w-6 h-6 text-comet-text/70" />
              </div>
              <div className="relative z-10">
                <h3 className="font-semibold text-2xl text-comet-text mb-3">Off the Clock</h3>
                <p className="font-sans text-[17px] text-comet-text/70 leading-relaxed font-light">
                  When I'm not writing Python or auditing a codebase, I'm usually researching new attack vectors, tinkering with my local setup, or trying to strip the noise out of my workflow. I like things that are clean, simple, and functional.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Cool Footer CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 md:mt-20 p-10 md:p-16 rounded-[2rem] glass-panel bg-white/40 border border-white/60 relative overflow-hidden group mb-28"
          >
            {/* Subtle inner gradient hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-comet-teal/0 via-amber-500/5 to-comet-teal/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
              <div className="max-w-[500px]">
                <h2 className="font-bold text-[3rem] md:text-[4rem] text-comet-text leading-[1.1] tracking-tight mb-4">
                  Want to talk <span className="italic">code?</span>
                </h2>
                <p className="font-sans text-lg text-comet-text/70 font-light">
                  I'm always open to discussing web security, Python, or interesting architectural problems. Feel free to reach out.
                </p>
              </div>
              
              <a 
                href="mailto:siyadhkc@gmail.com"
                className="group/btn relative inline-flex items-center justify-center px-8 py-4 bg-[#1a1a1a] text-white rounded-full font-mono text-[11px] uppercase tracking-widest overflow-hidden transition-transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-comet-teal to-amber-500 opacity-0 group-hover/btn:opacity-20 transition-opacity duration-500" />
                <span className="relative z-10 flex items-center gap-3">
                  siyadhkc@gmail.com <span className="text-lg leading-none group-hover/btn:translate-x-1 transition-transform">→</span>
                </span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Organic Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          
          {/* Top Right Amber Orb */}
          <motion.div 
            animate={{ 
              x: [0, -20, 0],
              y: [0, 30, 0],
              scale: [1, 1.05, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-to-bl from-amber-500/10 to-transparent blur-[120px]" 
          />

          {/* Center Left Teal Orb */}
          <motion.div 
            animate={{ 
              x: [0, 30, 0],
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.4, 0.3]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-[30%] left-[-15%] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full bg-gradient-to-tr from-comet-teal/10 to-transparent blur-[120px]" 
          />

          {/* Bottom Right Mixed Orb */}
          <motion.div 
            animate={{ 
              x: [0, -40, 0],
              y: [0, -40, 0],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[-10%] right-[-5%] w-[70vw] h-[70vw] max-w-[1000px] max-h-[1000px] rounded-full bg-gradient-to-tl from-comet-teal/15 via-amber-500/5 to-transparent blur-[120px]" 
          />
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
              <span className="flex items-center gap-2.5 font-mono text-[9px] tracking-[0.35em] text-[#ABABAB] uppercase">
                <span className="w-1 h-1 rounded-full bg-[#1D91A1]/40 inline-block"></span>
                © 2026 SIYADHKC
              </span>
              <span className="hidden sm:block w-px h-3 bg-black/[0.06]"></span>
              <span className="hidden sm:block font-mono text-[9px] tracking-[0.2em] text-[#ABABAB] uppercase">Developer / Researcher</span>
            </div>

            <div className="flex items-center gap-7">
              <Link
                to="/"
                className="font-mono text-[9px] tracking-[0.2em] text-[#ABABAB] hover:text-[#1A1A1A] uppercase transition-colors duration-200"
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
                  className="font-mono text-[9px] tracking-[0.2em] text-[#ABABAB] hover:text-[#1A1A1A] uppercase transition-colors duration-200"
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
