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

      <main className="min-h-screen relative z-10 overflow-hidden ">
        <Articles />

        {/* Minimal Footer */}
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
      </main>
    </>
  );
};

export default ArticlesPage;
