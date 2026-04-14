import React from 'react';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { FooterCTA } from '../components/FooterCTA';

export const Home = () => {
  return (
    <main>
      <Hero />
      <Features />
      <FooterCTA />
    </main>
  );
};
