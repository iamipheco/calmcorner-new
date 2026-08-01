import { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  UserRound,
  ShoppingCart,
  ClipboardList,
  CreditCard,
  FileCheck2,
  LifeBuoy,
  Building2,
  Search,
  LogOut,
  BadgeCheck,
  Trash2,
  Mail,
  MessageCircle,
  Handshake,
  Wallet,
  FileText,
  KeyRound,
} from 'lucide-react'
import logoIcon from '../assets/logo-icon.png'
import logoIconDark from '../assets/logo-icon-dark.png'
import { waLink } from '../siteConfig'

const NAV = [
  { key: 'profile', label: 'Profile', icon: UserRound },
  { key: 'checkout', label: 'Checkout Item', icon: ShoppingCart },
  { key: 'requests', label: 'Requests', icon: ClipboardList },
  { key: 'instalment', label: 'Instalment Plan', icon: CreditCard },
  { key: 'purchases', label: 'Completed Purchases', icon: FileCheck2 },
  { key: 'support', label: 'Support', icon: LifeBuoy },
  { key: 'estates', label: 'Estates', icon: Building2 },
]

// The purchase journey, shown as a stepper so a brand-new client sees the
// full path ahead instead of a blank dashboard. Every stage is honestly
// "not started" until a real purchase exists to track.
const JOURNEY = [
  { icon: MessageCircle, label: 'Enquiry' },
  { icon: Handshake, label: 'Reserved' },
  { icon: Wallet, label: 'Payment Plan' },
  { icon: FileText, label: 'Documentation' },
  { icon: KeyRound, label: 'Handover' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.06 } }),
}

function ComingSoon({ icon: Icon, title, body }) {
  return (
    <div className="bg-white border border-line rounded-2xl p-8 text-center">
      <Icon className="w-8 h-8 text-lime-deep mx-auto mb-3" strokeWidth={1.6} />
      <h2 className="text-lg mb-1.5">{title}</h2>
      <p className="text-muted text-sm max-w-sm mx-auto">{body}</p>
    </div>
  )
}

export default function PortalDashboard() {
  const { state } = useLocation()
  const name = state?.name || 'there'
  const email = state?.email || ''
  // NOTE: no backend exists yet, so there's no real way to persist
  // verification status. `verified` only reflects what was passed in via
  // this same-session navigation — refresh the page and it resets.
  const verified = Boolean(state?.verified)
  const [active, setActive] = useState('profile')

  return (
    <section className="min-h-screen bg-stone">
      <div className="container-custom py-8">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center justify-between mb-6">
          <Link to="/" className="group flex items-center gap-2.5">
            <img src={logoIcon} alt="" className="h-7 w-7" />
            <span className="font-display font-semibold text-ink text-sm group-hover:text-lime-deep transition-colors">Calmcorner Portal</span>
          </Link>
          <Link to="/portal" className="flex items-center gap-2 text-sm font-semibold text-muted hover:text-ink">
            <LogOut className="w-4 h-4" />
            Exit
          </Link>
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:flex flex-col">
            <Link to="/" className="group flex items-center gap-2.5 mb-6 px-2 hover:opacity-80 transition-opacity">
              <img src={logoIcon} alt="" className="h-6 w-6" />
              <span className="font-display font-semibold text-ink text-xs group-hover:text-lime-deep transition-colors">Calmcorner Portal</span>
            </Link>

            <div className="flex items-center gap-3 px-2 mb-5">
              <div className="w-11 h-11 rounded-full shrink-0 bg-linear-to-br from-lime via-lime-deep to-ink" />
              <div className="min-w-0">
                <p className="text-sm font-bold text-ink truncate">{name}</p>
                {email ? (
                  <p className="text-xs text-muted truncate">{email}</p>
                ) : (
                  <p className="text-xs text-muted">Client</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-2.5 mb-6 text-muted">
              <Search className="w-4 h-4 shrink-0" />
              <span className="text-sm flex-1">Search</span>
              <kbd className="hidden xl:inline-flex items-center rounded border border-line bg-stone px-1.5 py-0.5 text-[10px] font-bold">⌘K</kbd>
            </div>

            <nav className="grid gap-1">
              {NAV.map((n) => (
                <button
                  key={n.key}
                  onClick={() => setActive(n.key)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-left transition-colors ${
                    active === n.key ? 'bg-white shadow-xs text-ink' : 'text-muted hover:bg-white/60'
                  }`}
                >
                  <n.icon className="w-4 h-4" />
                  {n.label}
                </button>
              ))}
            </nav>

            <div className="mt-auto pt-6 flex items-center justify-between gap-3 border-t border-line">
              <div className="min-w-0">
                <p className="text-sm font-bold text-ink truncate">Calmcorner</p>
                <p className="text-xs text-muted truncate">Homes and Properties Ltd</p>
              </div>
              <Link to="/portal" className="btn btn-outline-dark text-xs py-2 px-3 shrink-0">
                Sign Out
              </Link>
            </div>
          </aside>

          {/* Main */}
          <div>
            {active === 'profile' && (
              <div className="grid gap-5">
                {/* Profile card */}
                <motion.div variants={fadeUp} initial="hidden" animate="show" className="relative bg-white border border-line rounded-2xl overflow-hidden">
                  <div className="relative h-32 bg-linear-to-br from-lime-soft via-mist to-lime-soft/60 overflow-hidden">
                    <img src={logoIconDark} alt="" aria-hidden="true" className="pointer-events-none absolute -right-6 -top-6 w-40 opacity-[0.08] rotate-12" />
                  </div>

                  <div className="px-6 sm:px-8 pb-8">
                    <div className="w-20 h-20 rounded-full border-4 border-white -mt-10 mb-4 bg-linear-to-br from-lime via-lime-deep to-ink shadow-lg" />

                    <div className="flex items-center gap-2 mb-3">
                      <h1 className="text-2xl">{name}</h1>
                      {verified && <BadgeCheck className="w-5 h-5 text-lime-deep" strokeWidth={2} />}
                    </div>

                    {verified ? (
                      <p className="text-muted mb-4">
                        You're a verified Calmcorner client. Track your purchase, documents, and
                        payments right here as they progress.
                      </p>
                    ) : (
                      <div className="text-muted mb-4 max-w-2xl">
                        <p className="mb-2">
                          Welcome! We're excited to have you on board as a potential{' '}
                          <span className="font-semibold text-ink">Client</span>. To complete your
                          onboarding and become a verified member of the Calmcorner community,
                          please take a moment to fill out a short verification form. This step
                          helps us ensure quality partnerships built on trust and transparency.
                        </p>
                        <p>
                          👉{' '}
                          <Link to="/portal/client-registration" state={{ name }} className="italic font-bold text-lime-deep hover:text-lime">
                            Click here to get verified
                          </Link>{' '}
                          and unlock full access to your account.
                        </p>
                      </div>
                    )}

                    {email && (
                      <div className="flex items-center gap-2.5 mb-6">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-lime-soft text-lime-deep">
                          <Mail className="w-3.5 h-3.5" />
                        </span>
                        <a href={`mailto:${email}`} className="text-sm font-semibold text-lime-deep hover:text-lime">{email}</a>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-3">
                      <Link to="/portal" className="btn btn-outline-dark">
                        Sign Out
                        <LogOut className="w-4 h-4" />
                      </Link>
                      <button type="button" disabled className="btn border border-line text-muted cursor-not-allowed">
                        Delete Account
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>

                {verified ? (
                  <>
                    {/* Purchase journey — storytelling instead of blank stat cards */}
                    <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1} className="rounded-2xl border border-line bg-white p-6">
                      <h3 className="text-base mb-6">Your Purchase Journey</h3>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 relative">
                        {JOURNEY.map((j, i) => (
                          <div key={j.label} className="relative text-center">
                            {i < JOURNEY.length - 1 && (
                              <span className="hidden sm:block absolute top-6 left-1/2 w-full h-px bg-line -z-0" />
                            )}
                            <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-stone text-muted mx-auto mb-3 border-4 border-white">
                              <j.icon className="w-5 h-5" strokeWidth={1.8} />
                            </span>
                            <p className="text-xs font-semibold text-muted">{j.label}</p>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-muted text-center mt-6">
                        Nothing in progress yet — this fills in once you start a purchase.
                      </p>
                    </motion.div>

                    <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2} className="grid sm:grid-cols-3 gap-4">
                      {['Purchase Status', 'Documents', 'Payments'].map((label) => (
                        <div key={label} className="bg-white border border-line rounded-2xl p-6">
                          <p className="text-xs font-bold uppercase tracking-wide text-muted mb-3">{label}</p>
                          <p className="text-sm text-muted">Coming soon</p>
                        </div>
                      ))}
                    </motion.div>
                  </>
                ) : (
                  <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1} className="bg-ink text-white rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div>
                      <h2 className="text-white text-lg mb-1.5">Prefer to talk to someone first?</h2>
                      <p className="text-white/70 text-sm max-w-md">
                        Our team can help you directly on WhatsApp — no forms required to just ask a question.
                      </p>
                    </div>
                    <a
                      href={waLink("Hello Calmcorner, I just signed up on the portal and have a question.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-lime shrink-0"
                    >
                      Chat on WhatsApp
                    </a>
                  </motion.div>
                )}
              </div>
            )}

            {active === 'checkout' && (
              <ComingSoon
                icon={ShoppingCart}
                title="No items in checkout"
                body="When you start a purchase, the property you're checking out will show up here."
              />
            )}

            {active === 'requests' && (
              <ComingSoon
                icon={ClipboardList}
                title="No requests yet"
                body="Any enquiries or requests you send our team will be tracked here."
              />
            )}

            {active === 'instalment' && (
              <ComingSoon
                icon={CreditCard}
                title="No instalment plan yet"
                body="If you choose a flexible payment plan on a property, you'll be able to track it here."
              />
            )}

            {active === 'purchases' && (
              <ComingSoon
                icon={FileCheck2}
                title="No completed purchases yet"
                body="Properties you've fully paid for and documentation will be listed here."
              />
            )}

            {active === 'support' && (
              <div className="bg-white border border-line rounded-2xl p-8 text-center">
                <LifeBuoy className="w-8 h-8 text-lime-deep mx-auto mb-3" strokeWidth={1.6} />
                <h2 className="text-lg mb-1.5">Need help?</h2>
                <p className="text-muted text-sm max-w-sm mx-auto mb-5">
                  Message our team directly on WhatsApp for anything about your account or a property.
                </p>
                <a
                  href={waLink("Hello Calmcorner, I have a question about my account.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  Chat on WhatsApp
                </a>
              </div>
            )}

            {active === 'estates' && (
              <div className="bg-white border border-line rounded-2xl p-8 text-center">
                <Building2 className="w-8 h-8 text-lime-deep mx-auto mb-3" strokeWidth={1.6} />
                <h2 className="text-lg mb-1.5">Browse available estates</h2>
                <p className="text-muted text-sm max-w-sm mx-auto mb-5">
                  See what's currently selling and find your next property.
                </p>
                <Link to="/properties" className="btn btn-lime">View Properties</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
