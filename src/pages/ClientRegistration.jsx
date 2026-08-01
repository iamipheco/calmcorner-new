import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { Info, ChevronLeft, ChevronRight, Check } from 'lucide-react'
import logoIcon from '../assets/logo-icon.png'

const SECTIONS = [
  { key: 'personal', label: 'Personal Details' },
  { key: 'kin', label: 'Next-of-Kin' },
  { key: 'referral', label: 'Referral' },
  { key: 'declaration', label: 'Declaration' },
]

const ID_TYPES = ["National ID (NIN)", "Driver's License", "International Passport", "Voter's Card"]

function Field({ label, full, ...props }) {
  return (
    <div className={`field ${full ? 'sm:col-span-2' : ''}`}>
      <label>{label}</label>
      <input {...props} />
    </div>
  )
}

function SelectField({ label, options, full, ...props }) {
  return (
    <div className={`field ${full ? 'sm:col-span-2' : ''}`}>
      <label>{label}</label>
      <select {...props}>
        <option value="">Select</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}

export default function ClientRegistration() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [name] = useState(state?.name || '')
  const [step, setStep] = useState(0)
  const [agreed, setAgreed] = useState(false)

  const isLast = step === SECTIONS.length - 1

  function handleSubmit(e) {
    e.preventDefault()
    if (!isLast) {
      setStep((s) => s + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    // NOTE: no backend exists yet — nothing here is actually saved or
    // verified. This simulates the "KYC complete, account verified"
    // moment and sends the client to their dashboard.
    navigate('/portal/dashboard', { state: { name: name || 'there', userType: 'client', verified: true, justCompletedForm: true } })
  }

  function back() {
    setStep((s) => Math.max(0, s - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function goTo(i) {
    if (i <= step) setStep(i)
  }

  return (
    <section className="min-h-screen bg-stone py-8 md:py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-6 hover:opacity-80 transition-opacity">
          <img src={logoIcon} alt="" className="h-7 w-7" />
          <span className="font-display font-semibold text-ink text-sm">Calmcorner Portal</span>
        </Link>

        <p className="text-center text-sm font-semibold text-lime-deep mb-4">
          Kindly complete this form before proceeding
        </p>

        <div className="flex items-stretch rounded-lg overflow-hidden mb-6">
          <div className="flex-1 bg-ink px-5 py-3.5">
            <h1 className="text-white text-base sm:text-lg font-bold uppercase tracking-wide">Land Subscription Form</h1>
          </div>
          <div className="w-14 bg-lime shrink-0" />
        </div>

        <div className="flex items-start gap-3 rounded-xl border border-lime-deep/25 bg-lime-soft/50 p-4 mb-6">
          <Info className="w-4.5 h-4.5 text-lime-deep shrink-0 mt-0.5" />
          <p className="text-sm text-muted">
            <span className="font-bold text-ink">Complete your verification.</span> Welcome{name ? `, ${name}` : ''}!
            This short KYC form confirms who you are and unlocks full access to your account.
          </p>
        </div>

        {/* Step pills */}
        <div className="flex items-center gap-1.5 mb-4 overflow-x-auto pb-1">
          {SECTIONS.map((s, i) => (
            <button
              key={s.key}
              type="button"
              onClick={() => goTo(i)}
              className={`shrink-0 flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border transition-colors ${
                i === step
                  ? 'bg-ink text-white border-ink'
                  : i < step
                  ? 'bg-lime-soft text-lime-deep border-lime-deep/30'
                  : 'bg-white text-muted border-line'
              }`}
            >
              {i < step && <Check className="w-3 h-3" />}
              {s.label}
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div className="h-1.5 w-full rounded-full bg-white border border-line overflow-hidden mb-8">
          <div
            className="h-full bg-lime-deep rounded-full transition-all duration-300"
            style={{ width: `${((step + 1) / SECTIONS.length) * 100}%` }}
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white border border-line rounded-2xl p-6 sm:p-8 min-h-[420px] flex flex-col">
            <div className="flex items-stretch rounded-lg overflow-hidden mb-6">
              <div className="flex-1 bg-ink px-4 py-2.5">
                <h2 className="text-white text-sm sm:text-base font-bold uppercase tracking-wide">{SECTIONS[step].label}</h2>
              </div>
              <div className="w-8 bg-lime shrink-0" />
            </div>

            <div className="flex-1">
              {/* Personal Details */}
              <div className={`grid sm:grid-cols-2 gap-5 ${step === 0 ? '' : 'hidden'}`}>
                <Field label="First name" required={step === 0} defaultValue={name.split(' ')[0] || ''} />
                <Field label="Middle name" />
                <Field label="Surname" required={step === 0} defaultValue={name.split(' ').slice(1).join(' ')} />
                <Field label="Phone number" type="tel" placeholder="080..." required={step === 0} />
                <Field label="Address" full required={step === 0} />
                <Field label="WhatsApp line" type="tel" placeholder="080..." />
                <Field label="Email address" type="email" placeholder="you@email.com" required={step === 0} />
                <Field label="Date of birth" type="date" required={step === 0} />
                <SelectField label="Gender" options={['Male', 'Female']} required={step === 0} />
                <SelectField label="Marital status" options={['Single', 'Married', 'Divorced', 'Widowed']} />
                <Field label="Nationality" required={step === 0} />
                <Field label="Occupation" required={step === 0} />
                <Field label="Employer's name" />
                <Field label="Employer's number" type="tel" />
                <SelectField label="Type of ID" options={ID_TYPES} required={step === 0} />
                <Field label="ID number" required={step === 0} />
                <Field label="Date of issue" type="date" />
                <Field label="Date of expiry" type="date" />
              </div>

              {/* Next-of-Kin */}
              <div className={`grid sm:grid-cols-2 gap-5 ${step === 1 ? '' : 'hidden'}`}>
                <Field label="First name" required={step === 1} />
                <Field label="Middle name" />
                <Field label="Surname" required={step === 1} />
                <Field label="Relationship" required={step === 1} />
                <Field label="Phone number" type="tel" required={step === 1} />
                <Field label="Email address" type="email" />
                <Field label="Address" full required={step === 1} />
              </div>

              {/* Referral */}
              <div className={`grid sm:grid-cols-2 gap-5 ${step === 2 ? '' : 'hidden'}`}>
                <Field label="Referred by (optional)" />
                <Field label="Referral's email address (optional)" type="email" />
              </div>

              {/* Declaration */}
              <div className={step === 3 ? '' : 'hidden'}>
                <p className="text-muted mb-4">
                  I, <span className="font-semibold text-ink">{name || '[Full Name]'}</span>, hereby
                  declare that the information provided in this Subscription (KYC) Form is true and
                  accurate to the best of my knowledge. I guarantee the genuineness of the funds used
                  for this purchase. I consent to any legal use of the supplied information, and I
                  will abide by the Terms and Conditions of the estate, the property, and/or
                  Calmcorner Homes and Properties Ltd.
                </p>
                <label className="flex items-start gap-2.5 text-sm text-slate">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 accent-lime-deep"
                    required={step === 3}
                  />
                  I confirm the above declaration and agree to Calmcorner's terms.
                </label>
              </div>
            </div>

            <div className="mt-8 flex gap-3 pt-6 border-t border-line">
              {step > 0 && (
                <button type="button" onClick={back} className="btn btn-outline-dark" aria-label="Back">
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                disabled={isLast && !agreed}
                className="btn btn-lime justify-center flex-1 disabled:opacity-40 disabled:pointer-events-none"
              >
                {isLast ? 'Complete Verification' : 'Continue'}
                {!isLast && <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
