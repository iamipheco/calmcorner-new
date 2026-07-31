import { useLocation, Link } from 'react-router-dom'
import { LayoutDashboard, FileText, CreditCard, Settings, LogOut, Sparkles } from 'lucide-react'
import logoIcon from '../assets/logo-icon.png'
import { waLink } from '../siteConfig'

const NAV = [
  { icon: LayoutDashboard, label: 'Overview', active: true },
  { icon: FileText, label: 'Documents' },
  { icon: CreditCard, label: 'Payments' },
  { icon: Settings, label: 'Settings' },
]

export default function PortalDashboard() {
  const { state } = useLocation()
  const name = state?.name || 'there'
  const userType = state?.userType || 'client'

  return (
    <section className="min-h-screen bg-stone">
      <div className="container-custom py-10">
        <div className="grid lg:grid-cols-[240px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="flex items-center gap-2.5 mb-8 px-2">
              <img src={logoIcon} alt="" className="h-7 w-7" />
              <span className="font-display font-semibold text-ink text-sm">Calmcorner Portal</span>
            </div>
            <nav className="grid gap-1">
              {NAV.map((n) => (
                <span
                  key={n.label}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold ${
                    n.active ? 'bg-ink text-white' : 'text-muted'
                  }`}
                >
                  <n.icon className="w-4 h-4" />
                  {n.label}
                </span>
              ))}
            </nav>
            <Link to="/portal" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-muted hover:text-ink mt-6">
              <LogOut className="w-4 h-4" />
              Exit preview
            </Link>
          </aside>

          {/* Main */}
          <div>
            <div className="bg-white border border-line rounded-2xl p-8 mb-6">
              <h1 className="text-2xl mb-1.5">Welcome, {name}!</h1>
              <p className="text-muted">
                You're signed in as a {userType === 'realtor' ? 'realtor' : 'client'}.
              </p>
            </div>

            <div className="bg-ink text-white rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lime/15 text-lime">
                  <Sparkles className="w-5 h-5" />
                </span>
                <div>
                  <h2 className="text-white text-lg mb-1.5">This dashboard is a preview</h2>
                  <p className="text-white/70 text-sm max-w-md">
                    You're looking at an early look at the Calmcorner Portal — tracking your
                    purchase, documents, and payments here is coming soon. For now, our team can
                    help you directly on WhatsApp.
                  </p>
                </div>
              </div>
              <a
                href={waLink("Hello Calmcorner, I just went through the portal preview and I'd like some help.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-lime shrink-0"
              >
                Chat on WhatsApp
              </a>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mt-6">
              {['Purchase Status', 'Documents', 'Payments'].map((label) => (
                <div key={label} className="bg-white border border-line rounded-2xl p-6">
                  <p className="text-xs font-bold uppercase tracking-wide text-muted mb-3">{label}</p>
                  <p className="text-sm text-muted">Coming soon</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
