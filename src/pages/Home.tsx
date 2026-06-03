import React from 'react';
import { Helmet } from 'react-helmet-async';
import { About } from '../components/About';
import { FooterCTA } from '../components/FooterCTA';
import HomeScrollRestorer from '../lib/HomeScrollRestorer';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>siyadhkc — Backend Developer & Security Researcher</title>
        <meta
          name="description"
          content="Siyadh KC — Backend Developer specialised in Django, zero-trust API security, and systems-level security research."
        />
        <meta
          name="keywords"
          content="Backend Engineer, Django, Python, API Security, OWASP, eBPF, Web Pentesting, Security Research"
        />
        <link rel="canonical" href="https://siyadhkc.vercel.app/" />
      </Helmet>

      {/* Hybrid Scroll Restoration Logic */}
      <HomeScrollRestorer />

      <main>
        <About />
        <FooterCTA />
      </main>
    </>
  );
};

export default Home;
