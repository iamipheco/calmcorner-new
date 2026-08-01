import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Info, ChevronRight } from 'lucide-react'
import logoIcon from '../assets/logo-icon.png'

const SECTIONS = [
  { key: 'personal', label: 'Personal Details' },
  { key: 'kin', label: 'Next-of-Kin Details' },
  { key: 'referral', label: "Referral's Details" },
  { key: 'bank', label: 'Bank Account Details' },
  { key: 'declaration', label: "Subscriber's Declaration" },
]

function FormSection({ title, children }) {
  return (
    <div className="bg-white border border-line rounded-2xl p-6 sm:p-8">
      <h2 className="text-lg mb-6 pb-4 border-b border-line">{title}</h2>
      <div className="grid sm:grid-cols-2 gap-5">{children}</div>
    </div>
  )
}

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

export default function RealtorRegistration() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [name] = useState(state?.name || '')
  const [agreed, setAgreed] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    // NOTE: no backend exists yet — nothing here is actually saved or
    // verified. This just simulates the "registration complete, referral
    // link generated" moment and sends the realtor to their dashboard.
    navigate('/portal/realtor-dashboard', { state: { name: name || 'Realtor', justRegistered: true } })
  }

  return (
    <section className="min-h-screen bg-stone py-10 md:py-14 px-4">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-8 hover:opacity-80 transition-opacity">
          <img src={logoIcon} alt="" className="h-7 w-7" />
          <span className="font-display font-semibold text-ink text-sm">Calmcorner Portal</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-start gap-3.5 rounded-2xl border border-lime-deep/25 bg-lime-soft/50 p-5 mb-8"
        >
          <Info className="w-5 h-5 text-lime-deep shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-ink">Complete your registration</p>
            <p className="text-sm text-muted mt-1">
              Welcome{name ? `, ${name}` : ''}! To activate your realtor account and generate your
              referral link, please fill in the form below.
            </p>
          </div>
        </motion.div>

        {/* Section progress — display only, form scrolls as one page */}
        <div className="hidden sm:flex items-center gap-1 mb-8 overflow-x-auto">
          {SECTIONS.map((s, i) => (
            <div key={s.key} className="flex items-center shrink-0">
              <span className="text-xs font-bold text-muted px-3 py-1.5 rounded-full border border-line bg-white">
                {s.label}
              </span>
              {i < SECTIONS.length - 1 && <ChevronRight className="w-3.5 h-3.5 text-muted mx-1" />}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6">
          <FormSection title="Personal Details">
            <Field label="First name" required defaultValue={name.split(' ')[0] || ''} />
            <Field label="Last name" required defaultValue={name.split(' ').slice(1).join(' ')} />
            <Field label="Phone number" type="tel" placeholder="080..." required />
            <Field label="Email address" type="email" placeholder="you@email.com" required />
            <Field label="Residential address" full required />
            <Field label="City" required />
            <Field label="State" required />
            <SelectField label="Gender" options={['Male', 'Female']} required />
            <Field label="Date of birth" type="date" required />
            <Field label="Occupation" required />
          </FormSection>

          <FormSection title="Next-of-Kin Details">
            <Field label="Full name" required />
            <Field label="Relationship" required />
            <Field label="Phone number" type="tel" required />
            <Field label="Email address" type="email" />
            <Field label="Address" full required />
          </FormSection>

          <FormSection title="Referral's Details">
            <Field label="Referred by (optional)" />
            <Field label="Referral's phone number (optional)" type="tel" />
          </FormSection>

          <FormSection title="Bank Account Details">
            <Field label="Bank name" required />
            <Field label="Account number" required />
            <Field label="Account name" full required />
          </FormSection>

          <FormSection title="Subscriber's Declaration">
            <div className="sm:col-span-2">
              <p className="text-muted mb-4">
                I, <span className="font-semibold text-ink">{name || '[Full Name]'}</span>, hereby
                declare that the information stated above is true and accurate to the best of my
                knowledge.
              </p>
              <label className="flex items-start gap-2.5 text-sm text-slate">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 accent-lime-deep"
                  required
                />
                I confirm the above declaration and agree to Calmcorner's realtor terms.
              </label>
            </div>
          </FormSection>

          <button type="submit" disabled={!agreed} className="btn btn-lime justify-center disabled:opacity-40 disabled:pointer-events-none">
            Complete Registration &amp; Get My Referral Link
          </button>
        </form>
      </div>
    </section>
  )
}
