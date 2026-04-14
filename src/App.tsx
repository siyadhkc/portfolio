import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'
import { Navigation } from './components/Navigation'
import { Home } from './pages/Home'
import { ArticlesPage } from './pages/ArticlesPage'

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <Router>
        <div className="min-h-screen font-sans bg-comet-cream text-comet-text selection:bg-[#1D91A1]/30 selection:text-[#1D91A1]">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<ArticlesPage />} />
          </Routes>
        </div>
      </Router>
    </ReactLenis>
  )
}

export default App
