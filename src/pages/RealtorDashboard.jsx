import { useState, useMemo } from 'react'
import { useLocation, Link } from 'react-router-dom'
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
} from 'lucide-react'
import logoIcon from '../assets/logo-icon.png'
import { SITE, waLink } from '../siteConfig'

const NAV = [
  { key: 'overview', label: 'Overview', icon: Home },
  { key: 'referrals', label: 'Referrals', icon: Users },
  { key: 'rewards', label: 'Referral Rewards', icon: Trophy },
  { key: 'support', label: 'Support', icon: LifeBuoy },
  { key: 'estates', label: 'Estates', icon: Building2 },
  { key: 'profile', label: 'Profile', icon: UserRound },
]

function slugify(name) {
  return (name || 'realtor').toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0, 16)
}

function CopyLink({ label, link }) {
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
    <div>
      <p className="text-sm font-bold text-ink mb-2">{label}</p>
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          onClick={copy}
          className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold shrink-0 transition-colors ${
            copied ? 'bg-lime text-ink' : 'bg-ink text-white hover:bg-ink-soft'
          }`}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <div className="flex-1 overflow-x-auto rounded-lg border border-line bg-stone px-4 py-2.5">
          <code className="text-xs text-muted whitespace-nowrap">{link}</code>
        </div>
      </div>
    </div>
  )
}

function EmptyTable({ columns }) {
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
        <tbody>
          <tr>
            {columns.map((c) => (
              <td key={c} className="pt-4 text-muted">…</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

function StatCard({ label, value, hint }) {
  return (
    <div className="bg-white border border-line rounded-2xl p-6">
      <p className="text-xs font-bold uppercase tracking-wide text-muted mb-3">{label}</p>
      <p className="font-display text-2xl sm:text-3xl font-semibold text-ink">{value}</p>
      <p className="text-xs text-muted mt-1.5">{hint}</p>
    </div>
  )
}

export default function RealtorDashboard() {
  const { state } = useLocation()
  const name = state?.name || 'Realtor'
  const justRegistered = state?.justRegistered
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
              <div className="w-10 h-10 rounded-full bg-lime-soft text-lime-deep flex items-center justify-center shrink-0">
                <UserRound className="w-5 h-5" strokeWidth={1.8} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-ink truncate">{name}</p>
                <p className="text-xs text-muted">Realtor</p>
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

            {justRegistered && active === 'overview' && (
              <div className="flex items-start gap-3.5 rounded-2xl border border-lime-deep/25 bg-lime-soft/50 p-5 mb-6">
                <CheckCircle2 className="w-5 h-5 text-lime-deep shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-ink">Registration complete</p>
                  <p className="text-sm text-muted mt-1">
                    Your account is verified and your referral link is ready — find it under
                    "Referrals" in the sidebar.
                  </p>
                </div>
              </div>
            )}

            {active === 'overview' && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg">Overview</h2>
                  <button className="btn btn-outline-dark text-sm py-2.5 px-4">Request Payment</button>
                </div>
                <div className="grid sm:grid-cols-3 gap-4 mb-6">
                  <StatCard label="Total Commission" value="₦0.00" hint="Lifetime earnings" />
                  <StatCard label="Owed Commission" value="₦0.00" hint="Available for withdrawal" />
                  <StatCard label="Paid Commission" value="₦0.00" hint="Already received" />
                </div>
                <div className="bg-white border border-line rounded-2xl p-6">
                  <h3 className="text-base mb-4">Recent Commissions</h3>
                  <EmptyTable columns={['Amount', 'Date', 'Status']} />
                </div>
              </>
            )}

            {active === 'referrals' && (
              <div className="grid gap-6">
                <div className="bg-white border border-line rounded-2xl p-6">
                  <h2 className="text-lg mb-1.5">Your Referral Links</h2>
                  <p className="text-sm text-muted mb-6">
                    These links are unique to you. Share them so clients or fellow realtors can
                    sign up with you as their referrer.
                  </p>
                  <div className="grid gap-5">
                    <CopyLink label="Client invite link" link={clientLink} />
                    <CopyLink label="Realtor invite link" link={realtorLink} />
                  </div>
                </div>
                <div className="bg-white border border-line rounded-2xl p-6">
                  <h3 className="text-base mb-4">Client Referrals</h3>
                  <EmptyTable columns={['Client Name', 'Client ID', 'Client Email']} />
                </div>
                <div className="bg-white border border-line rounded-2xl p-6">
                  <h3 className="text-base mb-4">Realtor Referrals</h3>
                  <EmptyTable columns={['Realtor Name', 'Realtor ID', 'Realtor Email']} />
                </div>
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
          </div>
        </div>
      </div>
    </section>
  )
}
