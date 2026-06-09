import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Articles } from '../components/Articles';

const ArticlesPage = () => {
  return (
    <>
      <Helmet>
        <title>Articles — siyadhkc</title>
        <meta
          name="description"
          content="Read articles by siyadhkc on backend development, security, Django, and web technologies."
        />
        <meta
          name="keywords"
          content="Backend Articles, Django Tutorials, Security Blog, Web Development Articles"
        />
        <link rel="canonical" href="https://siyadhkc.vercel.app/articles" />
      </Helmet>

      <main className="min-h-screen relative z-10 overflow-hidden">
        <Articles />

        {/* Minimal Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[860px] mx-auto px-6 md:px-8 py-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-zinc-200 dark:border-zinc-900"
        >
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-2.5 font-mono text-[9px] tracking-[0.35em] text-zinc-500 dark:text-zinc-600 uppercase font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500/40 inline-block animate-pulse"></span>
              © 2026 SIYADHKC
            </span>
            <span className="hidden sm:block w-px h-3 bg-zinc-200 dark:bg-zinc-800"></span>
            <span className="hidden sm:block font-mono text-[9px] tracking-[0.2em] text-zinc-500 dark:text-zinc-600 uppercase font-semibold">Developer / Researcher</span>
          </div>

          <div className="flex items-center gap-7">
            <Link
              to="/"
              className="font-mono text-[9px] tracking-[0.2em] text-zinc-500 dark:text-zinc-600 hover:text-cyan-600 dark:hover:text-cyan-400 uppercase transition-colors duration-200 font-semibold"
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
                className="font-mono text-[9px] tracking-[0.2em] text-zinc-500 dark:text-zinc-600 hover:text-cyan-600 dark:hover:text-cyan-400 uppercase transition-colors duration-200 font-semibold"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.footer>
      </main>
    </>
  );
};

export default ArticlesPage;
