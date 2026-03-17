import React from 'react'
import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'
import { Features } from './components/Features'
import { FooterCTA } from './components/FooterCTA'

function App() {
  return (
    <div className="min-h-screen font-sans bg-comet-cream text-comet-text">
      <Navigation />
      <Hero />
      <Features />
      <FooterCTA />
    </div>
  )
}

export default App
