import React, { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Navigation } from './components/Navigation'
import PageTransition from './components/PageTransition'
import { AnimatePresence } from 'framer-motion'
// import { getSection } from './lib/scrollState'

const Home = lazy(() => import('./pages/Home'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ArticlesPage = lazy(() => import('./pages/ArticlesPage'))
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'))

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-comet-cream">
    <div className="w-8 h-8 border-2 border-[#1D91A1]/20 border-t-[#1D91A1] rounded-full animate-spin" />
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
