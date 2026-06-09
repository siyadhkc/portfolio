import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Articles } from '../components/Articles';
import { FooterCTA } from '../components/FooterCTA';

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
        <FooterCTA />
      </main>
    </>
  );
};

export default ArticlesPage;
