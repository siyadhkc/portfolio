import React from 'react';
import { Helmet } from 'react-helmet-async';
import { About } from '../components/About';

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About — siyadhkc</title>
        <meta
          name="description"
          content="Siyadh KC — Python backend developer and security researcher. Philosophy, engineering focus areas, and capabilities."
        />
      </Helmet>

      <main className="min-h-screen bg-transparent">
        <About />
      </main>
    </>
  );
};

export default AboutPage;
