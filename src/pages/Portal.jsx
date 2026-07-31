import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Rocket,
  UserRound,
  Lock,
  Building2,
  Eye,
  EyeOff,
  ChevronLeft,
  Check,
} from 'lucide-react'
import logoIcon from '../assets/logo-icon.png'

const STEPS = [
  { key: 'welcome', label: 'Welcome', hint: "Let's get you started", icon: Rocket },
  { key: 'type', label: 'Account Type', hint: 'What best describes you', icon: UserRound },
  { key: 'auth', label: 'Your Account', hint: 'Sign in or create an account', icon: Lock },
]

function WelcomeImage() {
  const [errored, setErrored] = useState(false)
  if (errored) {
    return (
      <div className="w-full aspect-video rounded-2xl bg-linear-to-br from-ink to-ink-soft flex items-center justify-center">
        <img src={logoIcon} alt="" className="w-16 opacity-40" />
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

export default function Portal() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const startOnSignIn = searchParams.get('mode') === 'signin'
  const [stepIndex, setStepIndex] = useState(startOnSignIn ? 2 : 0)
  const [userType, setUserType] = useState(null)
  const [mode, setMode] = useState(startOnSignIn ? 'signin' : 'signup') // 'signup' | 'signin'
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
    setStepIndex(2)
  }
  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }
  function handleSubmit(e) {
    e.preventDefault()
    // NOTE: no backend/auth exists yet — this is a front-end preview of
    // the intended flow. Wire this up to real authentication later, then
    // send the user to /portal/dashboard on success.
    navigate('/portal/dashboard', { state: { name: form.name, userType, mode } })
  }

  return (
    <section className="relative min-h-screen bg-stone flex items-center py-16 md:py-20 overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-[280px_1fr] gap-10 lg:gap-16 max-w-5xl mx-auto">
          {/* Step sidebar */}
          <div className="hidden lg:block">
            <div className="flex items-center gap-2.5 mb-10">
              <img src={logoIcon} alt="" className="h-8 w-8" />
              <span className="font-display font-semibold text-ink">Calmcorner Portal</span>
            </div>
            <ol className="relative">
              {STEPS.map((s, i) => {
                const Icon = s.icon
                const active = i === stepIndex
                const done = i < stepIndex
                return (
                  <li key={s.key} className="relative pb-10 last:pb-0">
                    {i < STEPS.length - 1 && (
                      <span className="absolute left-[19px] top-10 w-px h-full bg-line" />
                    )}
                    <button
                      onClick={() => i <= stepIndex && goTo(i)}
                      className="relative flex items-start gap-3.5 text-left"
                    >
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors ${
                          active
                            ? 'bg-ink text-lime border-ink'
                            : done
                            ? 'bg-lime text-ink border-lime'
                            : 'bg-white text-muted border-line'
                        }`}
                      >
                        {done ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                      </span>
                      <span>
                        <span className={`block text-sm font-bold ${active || done ? 'text-ink' : 'text-muted'}`}>
                          {s.label}
                        </span>
                        <span className="block text-xs text-muted mt-0.5">{s.hint}</span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>
          </div>

          {/* Step content */}
          <div className="relative bg-white border border-line rounded-3xl shadow-xl overflow-hidden p-8 sm:p-12">
            {/* Watermark — brand logo, not the reference's decoration */}
            <img
              src={logoIcon}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 w-72 opacity-[0.05] rotate-12"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-24 bottom-0 w-72 h-72 rounded-full bg-lime/10 blur-3xl"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={stepIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                {/* Step 1: Welcome */}
                {stepIndex === 0 && (
                  <div className="text-center max-w-md mx-auto">
                    <div className="w-14 h-14 rounded-2xl bg-lime-soft text-lime-deep flex items-center justify-center mx-auto mb-6">
                      <Rocket className="w-6 h-6" strokeWidth={1.8} />
                    </div>
                    <h1 className="text-2xl sm:text-3xl mb-2">Welcome to the Calmcorner Portal</h1>
                    <p className="text-muted mb-8">
                      Track your property purchase, manage documentation, or list and follow up on
                      referrals as a realtor — all from one account.
                    </p>
                    <WelcomeImage />
                    <div className="mt-8 flex flex-col sm:flex-row gap-3">
                      <button onClick={next} className="btn btn-lime justify-center flex-1">Get Started</button>
                      <button onClick={startSignIn} className="btn btn-outline-dark justify-center flex-1">Login</button>
                    </div>
                  </div>
                )}

                {/* Step 2: Select user type */}
                {stepIndex === 1 && (
                  <div className="text-center max-w-md mx-auto">
                    <h1 className="text-2xl sm:text-3xl mb-2">What best describes you?</h1>
                    <p className="text-muted mb-8">This helps us set up the right account for you.</p>

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

                    <div className="mt-8 flex gap-3">
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
                {stepIndex === 2 && (
                  <div className="max-w-sm mx-auto">
                    <h1 className="text-2xl sm:text-3xl mb-2 text-center">
                      {mode === 'signin' ? 'Good to see you back' : 'Create your account'}
                    </h1>
                    <p className="text-muted mb-8 text-center">
                      {mode === 'signin'
                        ? 'Sign in with your email and password.'
                        : userType
                        ? `Setting up your ${userType === 'realtor' ? 'realtor' : 'client'} account.`
                        : 'Provide an email and password to get started.'}
                    </p>

                    <form onSubmit={handleSubmit} className="grid gap-4">
                      {mode === 'signup' && (
                        <div className="field">
                          <label htmlFor="name">Full name</label>
                          <input id="name" name="name" type="text" placeholder="Your full name" value={form.name} onChange={handleChange} required />
                        </div>
                      )}
                      <div className="field">
                        <label htmlFor="email">Email address</label>
                        <input id="email" name="email" type="email" placeholder="you@email.com" value={form.email} onChange={handleChange} required />
                      </div>
                      <div className="field relative">
                        <label htmlFor="password">Password</label>
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={form.password}
                          onChange={handleChange}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((s) => !s)}
                          className="absolute right-3.5 top-9 text-muted hover:text-ink"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>

                      {mode === 'signin' && (
                        <div className="flex items-center justify-between text-sm">
                          <label className="flex items-center gap-2 text-muted">
                            <input type="checkbox" defaultChecked className="accent-lime-deep" />
                            Remember me
                          </label>
                          <button type="button" className="font-semibold text-lime-deep hover:text-lime">
                            Forgot password?
                          </button>
                        </div>
                      )}

                      <div className="mt-2 flex gap-3">
                        {mode === 'signup' && (
                          <button type="button" onClick={back} className="btn btn-outline-dark" aria-label="Back">
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                        )}
                        <button type="submit" className="btn btn-lime justify-center flex-1">
                          {mode === 'signin' ? 'Sign In' : 'Create Account'}
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
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
