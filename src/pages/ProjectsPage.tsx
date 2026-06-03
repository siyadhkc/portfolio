import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Features } from '../components/Features';
import { FooterCTA } from '../components/FooterCTA';

const ProjectsPage = () => {
  return (
    <>
      <Helmet>
        <title>Projects — siyadhkc</title>
        <meta
          name="description"
          content="Explore the engineering projects, security fuzzers, and developer tools built by Siyadh KC."
        />
        <meta
          name="keywords"
          content="Siyadh KC, Projects, API Security, Django, Go, eBPF, Fuzzing, Software Engineering"
        />
        <link rel="canonical" href="https://siyadhkc.vercel.app/projects" />
      </Helmet>

      <main className="min-h-screen relative z-10 pt-12 bg-transparent">
        <Features />
        <FooterCTA />
      </main>
    </>
  );
};

export default ProjectsPage;
