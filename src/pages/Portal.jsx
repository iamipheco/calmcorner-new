import { useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShieldCheck,
  UserRound,
  Building2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ChevronLeft,
  ArrowRight,
} from 'lucide-react'
import logoIcon from '../assets/logo-icon.png'
import logoIconDark from '../assets/logo-icon-dark.png'
import fullLogo from '../assets/logo.png'

// Team/site-visit photo used as the left panel background — swap the file
// at public/images/portal/sidebar-bg.jpg to change it.
const SIDEBAR_BG = '/images/portal/sidebar-bg.jpg'

// Office photo used for the thin decorative right-hand strip — swap the
// file at public/images/portal/office-strip.jpg to change it.
const OFFICE_STRIP = '/images/portal/office-strip.jpg'

const STEPS = [
  { label: 'Welcome', hint: "Let's get you started" },
  { label: 'Account Type', hint: 'What best describes you' },
  { label: 'Your Account', hint: 'Sign in or create an account' },
  { label: 'Verify Email', hint: 'Confirm your email address' },
]

function DotGrid({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(10,18,32,0.14) 1px, transparent 1px)',
        backgroundSize: '14px 14px',
        maskImage: 'radial-gradient(circle, black, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(circle, black, transparent 75%)',
      }}
    />
  )
}

function WelcomeImage() {
  const [errored, setErrored] = useState(false)
  if (errored) {
    return (
      <div className="w-full aspect-video rounded-2xl bg-linear-to-br from-ink to-ink-soft flex items-center justify-center">
        <img src={logoIconDark} alt="" className="w-16 opacity-40" />
      </div>
    )
  }
  return (
    <img
      src="/images/portal/welcome.jpg"
      alt="Calmcorner"
      onError={() => setErrored(true)}
      className="w-full aspect-video rounded-2xl object-cover"
    />
  )
}

function IconField({ icon: Icon, type = 'text', ...props }) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
      <input
        type={type}
        {...props}
        className="w-full rounded-lg border border-line bg-white pl-10 pr-3.5 py-3 text-base font-body text-slate transition-colors focus:border-lime-deep focus:outline-none"
      />
    </div>
  )
}

function ForgotPassword({ onBack }) {
  const [sent, setSent] = useState(false)
  const [email, setEmail] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    // NOTE: no backend exists yet — this only shows a confirmation state.
    // Wire this up to a real password-reset email once auth is built.
    setSent(true)
  }

  if (sent) {
    return (
      <div className="text-center">
        <div className="w-14 h-14 rounded-2xl bg-lime-soft flex items-center justify-center mx-auto mb-6">
          <Mail className="w-6 h-6 text-lime-deep" strokeWidth={1.8} />
        </div>
        <h1 className="text-2xl sm:text-3xl mb-2">Check your email</h1>
        <p className="text-muted mb-8">
          If an account exists for <span className="font-semibold text-ink">{email}</span>, a
          password reset link is on its way.
        </p>
        <button onClick={onBack} className="btn btn-outline-dark justify-center w-full">
          <ChevronLeft className="w-4 h-4" />
          Back to sign in
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="w-14 h-14 rounded-2xl bg-lime-soft flex items-center justify-center mx-auto mb-6">
        <Lock className="w-6 h-6 text-lime-deep" strokeWidth={1.8} />
      </div>
      <h1 className="text-2xl sm:text-3xl mb-2 text-center">Reset your password</h1>
      <p className="text-muted mb-6 text-center">
        Enter your email and we'll send you a link to reset it.
      </p>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-muted">Email address</label>
          <IconField icon={Mail} type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mt-2 flex gap-3">
          <button type="button" onClick={onBack} className="btn btn-outline-dark" aria-label="Back">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button type="submit" className="btn btn-lime justify-center flex-1">
            Send reset link
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  )
}

export default function Portal() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  // "Login" should land on Account Type (not skip straight to the form) —
  // a returning user still needs to confirm which kind of account this is.
  const startOnSignIn = searchParams.get('mode') === 'signin'
  const [stepIndex, setStepIndex] = useState(startOnSignIn ? 1 : 0)
  const [userType, setUserType] = useState(null)
  const [mode, setMode] = useState(startOnSignIn ? 'signin' : 'signup')
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  function goTo(i) {
    setStepIndex(i)
  }
  function next() {
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1))
  }
  function back() {
    setStepIndex((i) => Math.max(i - 1, 0))
  }
  function startSignIn() {
    setMode('signin')
    setStepIndex(1)
  }
  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }
  function handleSubmit(e) {
    e.preventDefault()
    if (mode === 'signup') {
      // New accounts see an email verification step before landing on
      // their dashboard. Returning users (sign in) skip straight through
      // since they're already verified.
      setStepIndex(3)
      return
    }
    completeOnboarding()
  }
  function completeOnboarding() {
    // NOTE: no backend/auth exists yet — this is a front-end preview of
    // the intended flow. Wire this up to real authentication (and a real
    // verification email) later. A returning user (sign in) is treated
    // as already verified, since there's no way to persist that state
    // without a backend. A brand-new signup is NOT verified yet — their
    // dashboard will prompt them to complete the Realtor Registration
    // form or the Client KYC form before unlocking full access.
    const verified = mode === 'signin'
    if (userType === 'realtor') {
      navigate('/portal/realtor-dashboard', { state: { name: form.name || 'Realtor', email: form.email, verified } })
    } else {
      navigate('/portal/dashboard', { state: { name: form.name, email: form.email, userType, verified } })
    }
  }

  return (
    <section className="min-h-screen grid lg:grid-cols-[3fr_6fr_1fr]">
      {/* Left — steps / branding panel, full height, 50% width on desktop */}
      <div className="hidden lg:flex flex-col justify-between relative overflow-hidden p-7 xl:p-10">
        <img src={SIDEBAR_BG} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-b from-ink/85 via-ink/80 to-ink/90" />

        <div className="relative z-10">
          <Link to="/" className="inline-flex mb-10 hover:opacity-80 transition-opacity">
            <img src={fullLogo} alt="Calmcorner Homes and Properties Ltd" className="h-16 w-auto brightness-0 invert" />
          </Link>

          <ol>
            {STEPS.map((s, i) => {
              const active = i === stepIndex
              const done = i < stepIndex
              return (
                <li key={s.label} className="relative pb-6 last:pb-0">
                  {i < STEPS.length - 1 && (
                    <span className="absolute left-5 top-10 bottom-0 border-l-2 border-dashed border-white/25" />
                  )}
                  <button
                    onClick={() => i <= stepIndex && goTo(i)}
                    className="relative flex items-start gap-3.5 text-left"
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors ${
                        active || done ? 'bg-lime border-lime text-ink' : 'bg-white/10 border-white/30 text-white/70'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>
                      <span className={`block text-sm font-bold ${active || done ? 'text-white' : 'text-white/60'}`}>
                        {s.label}
                      </span>
                      <span className="block text-xs text-white/50 mt-0.5">{s.hint}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>
        </div>

        <div className="relative z-10 flex items-start gap-3 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm p-4 max-w-sm">
          <ShieldCheck className="w-5 h-5 text-lime shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-white">Safe. Secure. Trusted.</p>
            <p className="text-xs text-white/60 mt-1">
              Your information is handled with care and used only to set up your account.
            </p>
          </div>
        </div>
      </div>

      {/* Right — step content, full height, 50% width on desktop (full width on mobile) */}
      <div className="relative flex flex-col bg-white overflow-hidden px-6 py-8 sm:px-10 sm:py-10">
        <DotGrid className="right-0 top-0 w-48 h-48" />
        <img
          src={logoIconDark}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 w-250 opacity-[0.03] rotate-15"
        />

        {/* Mobile-only logo bar — left panel (which normally holds this) is desktop-only */}
        <Link to="/" className="lg:hidden relative z-10 inline-flex mb-6 hover:opacity-80 transition-opacity">
          <img src={fullLogo} alt="Calmcorner Homes and Properties Ltd" className="h-13 w-auto" />
        </Link>

        <div className="relative z-10 flex-1 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={stepIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md"
            >
              {/* Step 1: Welcome */}
              {stepIndex === 0 && (
                <div className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-lime-soft flex items-center justify-center mx-auto mb-6">
                    <img src={logoIconDark} alt="" className="w-7 h-7" />
                  </div>
                  <h1 className="text-2xl sm:text-3xl mb-2">Welcome to C.H.P Portal</h1>
                  <p className="text-muted mb-6">
                    Track your property purchase, manage documentation, or list and follow up
                    on referrals as a realtor, all from one account.
                  </p>
                  <WelcomeImage />
                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <button onClick={next} className="btn btn-lime justify-center flex-1">Get Started</button>
                    <button onClick={startSignIn} className="btn btn-outline-dark justify-center flex-1">Login</button>
                  </div>
                </div>
              )}

              {/* Step 2: Select user type */}
              {stepIndex === 1 && (
                <div className="text-center">
                  <h1 className="text-2xl sm:text-3xl mb-2">What best describes you?</h1>
                  <p className="text-muted mb-6">This helps us set up the right account for you.</p>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setUserType('client')}
                      className={`flex flex-col items-center gap-3 rounded-2xl border-2 p-6 transition-colors ${
                        userType === 'client' ? 'border-lime-deep bg-lime-soft' : 'border-line hover:border-lime-deep/40'
                      }`}
                    >
                      <UserRound className="w-7 h-7 text-ink" strokeWidth={1.6} />
                      <span className="font-bold text-sm">Client</span>
                    </button>
                    <button
                      onClick={() => setUserType('realtor')}
                      className={`flex flex-col items-center gap-3 rounded-2xl border-2 p-6 transition-colors ${
                        userType === 'realtor' ? 'border-lime-deep bg-lime-soft' : 'border-line hover:border-lime-deep/40'
                      }`}
                    >
                      <Building2 className="w-7 h-7 text-ink" strokeWidth={1.6} />
                      <span className="font-bold text-sm">Realtor</span>
                    </button>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button onClick={back} className="btn btn-outline-dark" aria-label="Back">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={next}
                      disabled={!userType}
                      className="btn btn-lime justify-center flex-1 disabled:opacity-40 disabled:pointer-events-none"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Sign in / create account */}
              {stepIndex === 2 && mode !== 'forgot' && (
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-lime-soft flex items-center justify-center mx-auto mb-6">
                    <img src={logoIconDark} alt="" className="w-7 h-7" />
                  </div>
                  <h1 className="text-2xl sm:text-3xl mb-2 text-center">
                    {mode === 'signin' ? 'Good to see you back' : 'Create your account'}
                  </h1>
                  <p className="text-muted mb-6 text-center">
                    {mode === 'signin'
                      ? 'Sign in with your email and password.'
                      : userType
                      ? `Setting up your ${userType === 'realtor' ? 'realtor' : 'client'} account.`
                      : 'Provide an email and password to get started.'}
                  </p>

                  <form onSubmit={handleSubmit} className="grid gap-4">
                    {mode === 'signup' && (
                      <div>
                        <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-muted">Full name</label>
                        <IconField icon={UserRound} name="name" placeholder="Your full name" value={form.name} onChange={handleChange} required />
                      </div>
                    )}
                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-muted">Email address</label>
                      <IconField icon={Mail} type="email" name="email" placeholder="you@email.com" value={form.email} onChange={handleChange} required />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-muted">Password</label>
                      <div className="relative">
                        <IconField
                          icon={Lock}
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          placeholder="••••••••"
                          value={form.password}
                          onChange={handleChange}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((s) => !s)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {mode === 'signin' && (
                      <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 text-muted">
                          <input type="checkbox" defaultChecked className="accent-lime-deep" />
                          Remember me
                        </label>
                        <button type="button" onClick={() => setMode('forgot')} className="font-semibold text-lime-deep hover:text-lime">
                          Forgot password?
                        </button>
                      </div>
                    )}

                    <div className="mt-2 flex gap-3">
                      <button type="button" onClick={back} className="btn btn-outline-dark" aria-label="Back">
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button type="submit" className="btn btn-lime justify-center flex-1">
                        {mode === 'signin' ? 'Sign In' : 'Create Account'}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>

                  <p className="text-center text-sm text-muted mt-6">
                    {mode === 'signin' ? (
                      <>Not a user yet?{' '}
                        <button onClick={() => setMode('signup')} className="font-bold text-ink hover:text-lime-deep">
                          Register
                        </button>
                      </>
                    ) : (
                      <>Already have an account?{' '}
                        <button onClick={() => setMode('signin')} className="font-bold text-ink hover:text-lime-deep">
                          Sign in
                        </button>
                      </>
                    )}
                  </p>
                </div>
              )}

              {stepIndex === 2 && mode === 'forgot' && (
                <ForgotPassword onBack={() => setMode('signin')} />
              )}

              {/* Step 4: Verify email (signup only) */}
              {stepIndex === 3 && (
                <div className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-lime-soft flex items-center justify-center mx-auto mb-6">
                    <Mail className="w-6 h-6 text-lime-deep" strokeWidth={1.8} />
                  </div>
                  <h1 className="text-2xl sm:text-3xl mb-2">Verify your email</h1>
                  <p className="text-muted mb-2">
                    We've sent a verification link to{' '}
                    <span className="font-semibold text-ink">{form.email || 'your email address'}</span>.
                  </p>
                  <p className="text-muted mb-6 text-sm">
                    Click the link in that email to confirm it's really you, then continue below.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button onClick={back} className="btn btn-outline-dark justify-center" aria-label="Back">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button onClick={completeOnboarding} className="btn btn-lime justify-center flex-1">
                      I've verified my email
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-muted mt-6">
                    Didn't get it? Check your spam folder, or{' '}
                    <button type="button" className="font-bold text-lime-deep hover:text-lime">resend the email</button>.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Right — thin decorative office-photo strip, matching the sketch's 10% column */}
      <div className="hidden lg:block relative overflow-hidden">
        <img src={OFFICE_STRIP} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-r from-white via-white/10 to-transparent" />
      </div>
    </section>
  )
}
