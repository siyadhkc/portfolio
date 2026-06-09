import React, { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Navigation } from './components/Navigation'
import PageTransition from './components/PageTransition'
import { AnimatePresence } from 'framer-motion'

const Home = lazy(() => import('./pages/Home'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))
const ArticlesPage = lazy(() => import('./pages/ArticlesPage'))
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'))

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-zinc-950 font-mono text-[11px] tracking-[0.25em] text-zinc-500 uppercase font-semibold">
    [ loading... ]
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
    <div className="min-h-screen font-sans bg-transparent text-zinc-100 relative">
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
          <Route path="/about" element={<Navigate to="/" replace />} />
          <Route
            path="/projects"
            element={
              <Suspense fallback={<PageLoader />}>
                <PageTransition>
                  <ProjectsPage />
                </PageTransition>
              </Suspense>
            }
          />
          <Route
            path="/blog"
            element={
              <Suspense fallback={<PageLoader />}>
                <PageTransition>
                  <ArticlesPage />
                </PageTransition>
              </Suspense>
            }
          />
          <Route path="/articles" element={<Navigate to="/blog" replace />} />
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

import { ThemeProvider } from './components/ThemeContext'

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
