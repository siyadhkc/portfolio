import React, { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Navigation } from './components/Navigation'
import PageTransition from './components/PageTransition'
import { AnimatePresence, motion } from 'framer-motion'
// import { getSection } from './lib/scrollState'

const Home = lazy(() => import('./pages/Home'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ArticlesPage = lazy(() => import('./pages/ArticlesPage'))
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'))

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-comet-cream">
    <div className="relative w-12 h-12">
      <motion.svg
        viewBox="0 0 48 48"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="w-full h-full"
      >
        <motion.circle
          cx="24"
          cy="24"
          r="18"
          fill="none"
          stroke="#1D91A1"
          strokeWidth="4"
          strokeLinecap="round"
          animate={{ 
            pathLength: [0.05, 0.75, 0.05],
            rotate: [0, 270, 360]
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1]
          }}
        />
      </motion.svg>
    </div>
  </div>
)

/**
 * ScrollToTop - Resets scroll to top for non-Home pages.
 */
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Reset to top for ALL page changes.
    // This prevents landing at the bottom of the Home page when coming from long Articles/About pages.
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

import { GlobalBackground } from './components/GlobalBackground'

function AppContent() {
  const location = useLocation()

  return (
    <div className="min-h-screen font-sans bg-transparent text-comet-text selection:bg-[#1D91A1]/30 selection:text-[#1D91A1] relative">
      <GlobalBackground />
      <ScrollToTop />
      <Navigation />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <Suspense fallback={<PageLoader />}>
                <PageTransition>
                  <Home />
                </PageTransition>
              </Suspense>
            }
          />
          <Route
            path="/about"
            element={
              <Suspense fallback={<PageLoader />}>
                <PageTransition>
                  <AboutPage />
                </PageTransition>
              </Suspense>
            }
          />
          <Route
            path="/articles"
            element={
              <Suspense fallback={<PageLoader />}>
                <PageTransition>
                  <ArticlesPage />
                </PageTransition>
              </Suspense>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <Suspense fallback={<PageLoader />}>
                <PageTransition>
                  <ProjectDetails />
                </PageTransition>
              </Suspense>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <AppContent />
      </Router>
    </HelmetProvider>
  )
}

export default App
