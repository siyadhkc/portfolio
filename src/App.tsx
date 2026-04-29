import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'
import { HelmetProvider } from 'react-helmet-async'
import { Navigation } from './components/Navigation'
import PageTransition from './components/PageTransition'
import { useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

const Home = lazy(() => import('./pages/Home'))
const ArticlesPage = lazy(() => import('./pages/ArticlesPage'))

function App() {
  return (
    <HelmetProvider>
      <ReactLenis root options={{ 
        lerp: 0.1, 
        duration: 1.2, 
        smoothWheel: true,
        touchMultiplier: 1.8, // More responsive on touch
        infinite: false 
      }}>
        <Router>
          <AppContent />
        </Router>
      </ReactLenis>
    </HelmetProvider>
  )
}

function AppContent() {
  const location = useLocation();

  return (
    <div className="min-h-screen font-sans bg-comet-cream text-comet-text selection:bg-[#1D91A1]/30 selection:text-[#1D91A1]">
      <Navigation />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-comet-cream">
          <div className="w-12 h-12 border-2 border-[#1D91A1]/20 border-t-[#1D91A1] rounded-full animate-spin"></div>
        </div>
      }>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <PageTransition>
                <Home />
              </PageTransition>
            } />
            <Route path="/articles" element={
              <PageTransition>
                <ArticlesPage />
              </PageTransition>
            } />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </div>
  );
}

export default App
