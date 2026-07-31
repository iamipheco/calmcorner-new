import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../assets/logo.png'

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/properties', label: 'Properties' },
  //{ to: '/realtors', label: 'Realtor Network' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `relative font-semibold text-sm py-1 transition-colors ${
      isActive ? 'text-ink' : 'text-slate hover:text-ink'
    } after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:bg-lime-deep after:transition-all after:duration-200 ${
      isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'
    }`

  return (
    <header className="sticky top-0 z-100 bg-white/90 backdrop-blur-md border-b border-line">
      <div className="container-custom flex items-center justify-between py-3.5">
        <NavLink to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src={logo} alt="Calmcorner Homes and Properties Ltd" className="h-14 md:h-18 w-auto" />
        </NavLink>

        <nav className="hidden lg:flex">
          <ul className="flex items-center gap-6">
            {LINKS.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.end} className={linkClass}>{l.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/portal?mode=signin"
            className="hidden lg:inline-flex font-semibold text-sm text-slate hover:text-ink"
          >
            Login
          </Link>
          <Link
            to="/portal"
            className="btn btn-lime hidden lg:inline-flex"
          >
            Get Started
          </Link>
          <button
            className="lg:hidden p-1.5"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span className={`block w-6 h-0.5 bg-ink mb-1.5 transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block w-6 h-0.5 bg-ink mb-1.5 transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-ink transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden border-t border-line bg-white"
          >
            <ul className="container-custom flex flex-col gap-5 py-6">
              {LINKS.map((l) => (
                <li key={l.to}>
                  <NavLink to={l.to} end={l.end} className={linkClass} onClick={() => setOpen(false)}>
                    {l.label}
                  </NavLink>
                </li>
              ))}
              <li>
                <Link to="/portal?mode=signin" onClick={() => setOpen(false)} className="btn btn-outline-dark w-full justify-center">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/portal" onClick={() => setOpen(false)} className="btn btn-lime w-full justify-center">
                  Get Started
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
