import { useState, useMemo } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  UserRound,
  Users,
  Trophy,
  LifeBuoy,
  Building2,
  Home,
  LogOut,
  Copy,
  Check,
  CheckCircle2,
  Link2,
  UserPlus,
  Handshake,
  Wallet,
  ArrowUpRight,
  Inbox,
} from 'lucide-react'
import logoIcon from '../assets/logo-icon.png'
import logoIconDark from '../assets/logo-icon-dark.png'
import { SITE, waLink } from '../siteConfig'

const NAV = [
  { key: 'overview', label: 'Overview', icon: Home },
  { key: 'referrals', label: 'Referrals', icon: Users },
  { key: 'rewards', label: 'Referral Rewards', icon: Trophy },
  { key: 'support', label: 'Support', icon: LifeBuoy },
  { key: 'estates', label: 'Estates', icon: Building2 },
  { key: 'profile', label: 'Profile', icon: UserRound },
]

// The referral journey — shown as a funnel instead of a blank table, so a
// brand-new account with zero activity still reads as "here's how this
// works" rather than an empty screen. Every stage is honestly at 0 until
// real referral tracking exists.
const JOURNEY = [
  { icon: Link2, label: 'Links Shared', value: 0 },
  { icon: UserPlus, label: 'Sign-ups', value: 0 },
  { icon: Handshake, label: 'Conversions', value: 0 },
  { icon: Wallet, label: 'Commission Earned', value: '₦0.00' },
]

function slugify(name) {
  return (name || 'realtor').toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0, 16)
}

function CopyLink({ label, link, icon: Icon }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard access can fail (permissions, older browsers) — fine to
      // silently no-op, the link is still visible to copy manually.
    }
  }

  return (
    <div className="rounded-2xl border border-line bg-white p-5">
      <div className="flex items-center gap-2.5 mb-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime-soft text-lime-deep">
          <Icon className="w-4 h-4" strokeWidth={2} />
        </span>
        <p className="text-sm font-bold text-ink">{label}</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1 overflow-x-auto rounded-lg bg-stone px-3.5 py-2.5">
          <code className="text-xs text-muted whitespace-nowrap">{link}</code>
        </div>
        <button
          onClick={copy}
          className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold shrink-0 transition-colors ${
            copied ? 'bg-lime text-ink' : 'bg-ink text-white hover:bg-ink-soft'
          }`}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  )
}

function EmptyState({ icon: Icon, text }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2.5 py-10 text-center">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-stone text-muted">
        <Icon className="w-5 h-5" strokeWidth={1.8} />
      </span>
      <p className="text-sm text-muted">{text}</p>
    </div>
  )
}

function ReferralTable({ columns, emptyText }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-line">
            {columns.map((c) => (
              <th key={c} className="pb-3 pr-6 text-xs font-bold uppercase tracking-wide text-muted whitespace-nowrap">{c}</th>
            ))}
          </tr>
        </thead>
      </table>
      <EmptyState icon={Inbox} text={emptyText} />
    </div>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.06 } }),
}

export default function RealtorDashboard() {
  const { state } = useLocation()
  const name = state?.name || 'Realtor'
  const verified = Boolean(state?.verified)
  const justCompletedForm = Boolean(state?.justCompletedForm)
  const [active, setActive] = useState('overview')

  const refCode = useMemo(() => `${slugify(name)}${Math.random().toString(36).slice(2, 8)}`, [name])
  const clientLink = `${SITE.domain}/portal?ref=${refCode}`
  const realtorLink = `${SITE.domain}/portal?mode=signin&as=realtor&ref=${refCode}`

  const greeting = (() => {
    const h = new Date().getHours()
    if (h < 12) return 'Good Morning'
    if (h < 17) return 'Good Afternoon'
    return 'Good Evening'
  })()

  return (
    <section className="min-h-screen bg-stone">
      <div className="container-custom py-8">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center justify-between mb-6">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={logoIcon} alt="" className="h-7 w-7" />
            <span className="font-display font-semibold text-ink text-sm">Calmcorner Portal</span>
          </Link>
          <Link to="/portal" className="flex items-center gap-2 text-sm font-semibold text-muted hover:text-ink">
            <LogOut className="w-4 h-4" />
            Exit
          </Link>
        </div>

        <div className="grid lg:grid-cols-[240px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:flex flex-col">
            <div className="flex items-center gap-2.5 mb-8 px-2">
              <img src={logoIcon} alt="" className="h-7 w-7" />
              <span className="font-display font-semibold text-ink text-sm">Calmcorner Portal</span>
            </div>

            <div className="flex items-center gap-3 px-2 mb-6 pb-6 border-b border-line">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-lime via-lime-deep to-ink shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-bold text-ink truncate">{name}</p>
                <p className="text-xs text-muted">Realtor · CCHP/RTR/001</p>
              </div>
            </div>

            <nav className="grid gap-1">
              {NAV.map((n) => (
                <button
                  key={n.key}
                  onClick={() => setActive(n.key)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-left transition-colors ${
                    active === n.key ? 'bg-ink text-white' : 'text-muted hover:bg-white'
                  }`}
                >
                  <n.icon className="w-4 h-4" />
                  {n.label}
                </button>
              ))}
            </nav>

            <Link to="/portal" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-muted hover:text-ink mt-auto pt-6">
              <LogOut className="w-4 h-4" />
              Sign Out
            </Link>
          </aside>

          {/* Main */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl">{greeting}, {name.split(' ')[0]}!</h1>
                <p className="text-muted text-sm mt-1">
                  {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
              <Link to="/" className="hidden sm:flex items-center justify-center w-10 h-10 rounded-lg border border-line bg-white hover:bg-stone">
                <Home className="w-4 h-4" />
              </Link>
            </div>

            {!verified ? (
              <motion.div variants={fadeUp} initial="hidden" animate="show" className="bg-white border border-line rounded-2xl p-8 max-w-2xl">
                <div className="w-14 h-14 rounded-full bg-lime-soft text-lime-deep flex items-center justify-center mb-5">
                  <UserRound className="w-6 h-6" strokeWidth={1.8} />
                </div>
                <p className="text-muted mb-2">
                  Welcome! We're excited to have you on board as a potential{' '}
                  <span className="font-semibold text-ink">Realtor</span>. To activate your account,
                  become verified, and generate your referral link, please take a moment to
                  complete your realtor registration. This step helps us ensure quality
                  partnerships built on trust and transparency.
                </p>
                <p className="mb-6">
                  👉{' '}
                  <Link to="/portal/realtor-registration" state={{ name }} className="italic font-bold text-lime-deep hover:text-lime">
                    Click here to get verified
                  </Link>{' '}
                  and unlock full access to your dashboard.
                </p>
                <a
                  href={waLink("Hello Calmcorner, I just signed up as a realtor and have a question.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-dark"
                >
                  Or ask us a question on WhatsApp
                </a>
              </motion.div>
            ) : (
              <>
                {active === 'overview' && (
                  <div className="grid gap-5">
                    {justCompletedForm && (
                      <motion.div variants={fadeUp} initial="hidden" animate="show" className="flex items-start gap-3.5 rounded-2xl border border-lime-deep/25 bg-lime-soft/50 p-5">
                        <CheckCircle2 className="w-5 h-5 text-lime-deep shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-ink">Registration complete</p>
                          <p className="text-sm text-muted mt-1">
                            Your account is verified and your referral link is ready — find it under
                            "Referrals" in the sidebar. Your Realtor ID is <span className="font-semibold text-ink">CCHP/RTR/001</span>.
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {/* North-star metric + secondary stats */}
                    <div className="grid lg:grid-cols-[1.3fr_1fr] gap-5">
                      <motion.div
                        variants={fadeUp} initial="hidden" animate="show" custom={1}
                        className="relative overflow-hidden rounded-3xl bg-linear-to-br from-ink to-ink-soft text-white p-8 flex flex-col justify-between"
                      >
                        <img src={logoIconDark} alt="" aria-hidden="true" className="pointer-events-none absolute -right-10 -bottom-10 w-56 opacity-[0.06] rotate-12" />
                        <div className="relative z-10">
                          <p className="text-xs font-bold uppercase tracking-wide text-white/50 mb-3">Total Commission · Lifetime</p>
                          <p className="font-display text-5xl font-semibold mb-2">₦0.00</p>
                          <p className="text-white/60 text-sm max-w-sm">
                            Your earnings will show up here as your referred clients complete purchases.
                          </p>
                        </div>
                        <button className="relative z-10 btn btn-lime text-sm mt-6 self-start">
                          Request Payment
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </motion.div>

                      <div className="grid gap-5">
                        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2} className="rounded-2xl border border-line bg-white p-6 flex-1">
                          <p className="text-xs font-bold uppercase tracking-wide text-muted mb-2">Owed Commission</p>
                          <p className="font-display text-2xl font-semibold text-ink">₦0.00</p>
                          <p className="text-xs text-muted mt-1">Available for withdrawal</p>
                        </motion.div>
                        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="rounded-2xl border border-line bg-white p-6 flex-1">
                          <p className="text-xs font-bold uppercase tracking-wide text-muted mb-2">Paid Commission</p>
                          <p className="font-display text-2xl font-semibold text-ink">₦0.00</p>
                          <p className="text-xs text-muted mt-1">Already received</p>
                        </motion.div>
                      </div>
                    </div>

                    {/* Referral journey — storytelling instead of an empty table */}
                    <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4} className="rounded-2xl border border-line bg-white p-6">
                      <h3 className="text-base mb-6">Your Referral Journey</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative">
                        {JOURNEY.map((j, i) => (
                          <div key={j.label} className="relative text-center">
                            {i < JOURNEY.length - 1 && (
                              <span className="hidden sm:block absolute top-6 left-1/2 w-full h-px bg-line -z-0" />
                            )}
                            <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-lime-soft text-lime-deep mx-auto mb-3 border-4 border-white">
                              <j.icon className="w-5 h-5" strokeWidth={1.8} />
                            </span>
                            <p className="font-display text-xl font-semibold text-ink">{j.value}</p>
                            <p className="text-xs text-muted mt-0.5">{j.label}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div variants={fadeUp} initial="hidden" animate="show" custom={5} className="rounded-2xl border border-line bg-white p-6">
                      <h3 className="text-base mb-2">Recent Commissions</h3>
                      <ReferralTable columns={['Amount', 'Date', 'Status']} emptyText="Commissions from converted referrals will appear here." />
                    </motion.div>
                  </div>
                )}

                {active === 'referrals' && (
                  <div className="grid gap-5">
                    <motion.div variants={fadeUp} initial="hidden" animate="show" className="rounded-2xl border border-line bg-white p-6">
                      <h2 className="text-lg mb-1.5">Your Referral Links</h2>
                      <p className="text-sm text-muted mb-6">
                        These links are unique to you. Share them so clients or fellow realtors can
                        sign up with you as their referrer.
                      </p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <CopyLink label="Client invite link" link={clientLink} icon={UserPlus} />
                        <CopyLink label="Realtor invite link" link={realtorLink} icon={Handshake} />
                      </div>
                    </motion.div>
                    <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1} className="rounded-2xl border border-line bg-white p-6">
                      <h3 className="text-base mb-2">Client Referrals</h3>
                      <ReferralTable columns={['Client Name', 'Client ID', 'Client Email']} emptyText="Clients who sign up through your link will show up here." />
                    </motion.div>
                    <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2} className="rounded-2xl border border-line bg-white p-6">
                      <h3 className="text-base mb-2">Realtor Referrals</h3>
                      <ReferralTable columns={['Realtor Name', 'Realtor ID', 'Realtor Email']} emptyText="Realtors who join through your link will show up here." />
                    </motion.div>
                  </div>
                )}

                {active === 'rewards' && (
                  <div className="bg-white border border-line rounded-2xl p-8 text-center">
                    <Trophy className="w-8 h-8 text-lime-deep mx-auto mb-3" strokeWidth={1.6} />
                    <h2 className="text-lg mb-1.5">Referral rewards are coming soon</h2>
                    <p className="text-muted text-sm max-w-sm mx-auto">
                      Bonus tiers and milestones for top-performing realtors will show up here.
                    </p>
                  </div>
                )}

                {active === 'estates' && (
                  <div className="bg-white border border-line rounded-2xl p-8 text-center">
                    <Building2 className="w-8 h-8 text-lime-deep mx-auto mb-3" strokeWidth={1.6} />
                    <h2 className="text-lg mb-1.5">Browse available estates</h2>
                    <p className="text-muted text-sm max-w-sm mx-auto mb-5">
                      See what's currently selling so you know exactly what you're referring clients to.
                    </p>
                    <Link to="/properties" className="btn btn-lime">View Properties</Link>
                  </div>
                )}

                {active === 'profile' && (
                  <div className="bg-white border border-line rounded-2xl p-8">
                    <h2 className="text-lg mb-6">Profile</h2>
                    <div className="grid sm:grid-cols-2 gap-5 max-w-lg">
                      <div className="field">
                        <label>Full name</label>
                        <input defaultValue={name} disabled />
                      </div>
                      <div className="field">
                        <label>Role</label>
                        <input defaultValue="Realtor" disabled />
                      </div>
                      <div className="field">
                        <label>Realtor ID</label>
                        <input defaultValue="CCHP/RTR/001" disabled />
                      </div>
                    </div>
                    <p className="text-sm text-muted mt-5">Editing your profile is coming soon.</p>
                  </div>
                )}

                {active === 'support' && (
                  <div className="bg-white border border-line rounded-2xl p-8 text-center">
                    <LifeBuoy className="w-8 h-8 text-lime-deep mx-auto mb-3" strokeWidth={1.6} />
                    <h2 className="text-lg mb-1.5">Need help?</h2>
                    <p className="text-muted text-sm max-w-sm mx-auto mb-5">
                      Message our team directly on WhatsApp for anything referral or account related.
                    </p>
                    <a
                      href={waLink("Hello Calmcorner, I'm a realtor and I need help with my account.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp"
                    >
                      Chat on WhatsApp
                    </a>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
