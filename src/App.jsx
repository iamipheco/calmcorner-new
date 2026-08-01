import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Properties from './pages/Properties'
import EstateDetail from './pages/EstateDetail'
import Portal from './pages/Portal'
import PortalDashboard from './pages/PortalDashboard'
import RealtorRegistration from './pages/RealtorRegistration'
import RealtorDashboard from './pages/RealtorDashboard'
import Contact from './pages/Contact'
import Realtors from './pages/Realtors'
import NotFound from './pages/NotFound'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      let attempts = 0
      const interval = setInterval(() => {
        const el = document.getElementById(id)
        attempts += 1
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          clearInterval(interval)
        } else if (attempts > 15) {
          // Gave up looking (~1.5s) — target genuinely isn't on this page.
          window.scrollTo(0, 0)
          clearInterval(interval)
        }
      }, 100)
      return () => clearInterval(interval)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:slug" element={<EstateDetail />} />
          <Route path="/portal" element={<Portal />} />
          <Route path="/portal/dashboard" element={<PortalDashboard />} />
          <Route path="/portal/realtor-registration" element={<RealtorRegistration />} />
          <Route path="/portal/realtor-dashboard" element={<RealtorDashboard />} />
          <Route path="/realtors" element={<Realtors />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  const location = useLocation()
  const isPortal = location.pathname.startsWith('/portal')

  return (
    <>
      <ScrollToTop />
      {!isPortal && <Header />}
      <main>
        <AnimatedRoutes />
      </main>
      {!isPortal && <Footer />}
      {!isPortal && <WhatsAppFloat />}
    </>
  )
}
