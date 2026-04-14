import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Articles } from '../components/Articles';

const ArticlesPage = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      <main className="pt-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Articles />
        </motion.div>
      </main>
    </>
  );
};

export default ArticlesPage;
