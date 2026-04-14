import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'
import { HelmetProvider } from 'react-helmet-async'
import { Navigation } from './components/Navigation'

const Home = lazy(() => import('./pages/Home'))
const ArticlesPage = lazy(() => import('./pages/ArticlesPage'))

function App() {
  return (
    <HelmetProvider>
      <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
        <Router>
          <div className="min-h-screen font-sans bg-comet-cream text-comet-text selection:bg-[#1D91A1]/30 selection:text-[#1D91A1]">
            <Navigation />
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#1D91A1]"></div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/articles" element={<ArticlesPage />} />
              </Routes>
            </Suspense>
          </div>
        </Router>
      </ReactLenis>
    </HelmetProvider>
  )
}

export default App
