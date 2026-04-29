import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { FooterCTA } from '../components/FooterCTA';
import { useLenis } from 'lenis/react';
import { getScrollTarget, clearScrollTarget } from '../lib/scrollTarget';

const Home = () => {
  const lenis = useLenis();

  // Runs on every mount — when navigating TO '/' from any page
  React.useEffect(() => {
    const targetId = getScrollTarget();
    if (!targetId) return;

    // Clear immediately so back-nav doesn't re-trigger
    clearScrollTarget();

    let attempts = 0;
    let timerId: number;

    const tryScroll = () => {
      const el = document.getElementById(targetId);
      attempts += 1;

      if (!el) {
        if (attempts < 20) timerId = window.setTimeout(tryScroll, 80);
        return;
      }

      if (lenis) {
        lenis.scrollTo(el, { offset: -120, duration: 1.2, immediate: false });
      } else {
        const top = el.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    };

    // Small delay — let the page paint before animating scroll
    timerId = window.setTimeout(tryScroll, 100);
    return () => window.clearTimeout(timerId);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
