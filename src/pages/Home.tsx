import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { FooterCTA } from '../components/FooterCTA';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>siyadhkc — Backend Engineer</title>
        <meta
          name="description"
          content="Portfolio of siyadhkc, a Backend Engineer specialized in Django, Security, and Cloud Architectures."
        />
        <meta
          name="keywords"
          content="Backend Engineer, Django, Python, API Security, OWASP, Web Development, Software Engineer, Web Pentesting"
        />
        <link rel="canonical" href="https://siyadhkc.vercel.app/" />
      </Helmet>
      <main>
        <Hero />
        <Features />
        <FooterCTA />
      </main>
    </>
  );
};

export default Home;
