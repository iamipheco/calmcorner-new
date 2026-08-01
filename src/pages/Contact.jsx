import { useState } from 'react'
import { MessageCircle, Phone, Mail, MapPin, Send } from 'lucide-react'
import Reveal from '../components/Reveal'
import PageHero from '../components/PageHero'
import Socials from '../components/Socials'
import CTABand from '../components/CTABand'
import Watermark from '../components/Watermark'
import { waLink, SITE } from '../siteConfig'

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Let's talk about your next property move"
        dividerFill="#FFFFFF"
      />

      <section className="relative py-20 md:py-24 overflow-hidden">
        <Watermark position="top-right" />
        <div className="container-custom">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-14">
            <Reveal className="grid gap-4 content-start">
              <InfoCard icon={MapPin} label="Head Office">
                {SITE.address.line1}, {SITE.address.line2}, {SITE.address.line3}.
              </InfoCard>

              <InfoCard icon={MessageCircle} label="WhatsApp">
                <a href={waLink()} target="_blank" rel="noopener noreferrer" className="font-bold text-ink hover:text-lime-deep">
                  {SITE.phones[0].display}
                </a>
              </InfoCard>

              <InfoCard icon={Phone} label="Call us">
                <span className="flex flex-wrap gap-x-4 gap-y-1">
                  {SITE.phones.map((p) => (
                    <a key={p.href} href={`tel:${p.href}`} className="font-bold text-ink hover:text-lime-deep">{p.display}</a>
                  ))}
                </span>
              </InfoCard>

              <InfoCard icon={Mail} label="Email">
                <span className="flex flex-col gap-0.5">
                  {SITE.emails.map((e) => (
                    <a key={e} href={`mailto:${e}`} className="font-bold text-ink hover:text-lime-deep">{e}</a>
                  ))}
                </span>
              </InfoCard>

              <div className="bg-white border border-line rounded-xl p-4 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wide text-muted">Follow us</span>
                <Socials variant="light" />
              </div>

              <div className="border border-line rounded-xl overflow-hidden h-52">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.3925428030075!2d6.6829718!3d6.2118477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1043ef12d26f020f%3A0x274422f964ee19ca!2sCalmcorner%20Homes%20%26%20Properties%20Ltd!5e0!3m2!1sen!2sng!4v1785454060726!5m2!1sen!2sng"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Calmcorner Homes and Properties Ltd office location"
                  className="w-full h-full border-0 block"
                ></iframe>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      <CTABand
        title="Prefer to talk it through?"
        subtitle="Message us on WhatsApp — it's the fastest way to reach the team."
      />
    </>
  )
}

function InfoCard({ icon: Icon, label, children }) {
  return (
    <div className="bg-white border border-line rounded-xl p-4 flex items-start gap-3.5">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-lime-soft text-lime-deep">
        <Icon className="w-4 h-4" strokeWidth={2} />
      </span>
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-muted mb-1">{label}</p>
        <div className="text-sm text-slate">{children}</div>
      </div>
    </div>
  )
}

const SERVICE_OPTIONS = [
  'Land & Property Sales',
  'Property Development',
  'Property Management',
  'Building & Home Construction',
  'Real Estate Consultancy & Advisory',
  'Real Estate Brokerage',
  'Real Estate Investment & Portfolio Management',
  'CalmVilla Residence enquiry',
  'Something else',
]

function ContactForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: SERVICE_OPTIONS[0], message: '' })

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    // No backend exists to receive and store leads server-side, so this
    // opens the visitor's own email client with the message pre-filled —
    // they still need to hit send on their end. For real server-side lead
    // capture (saved to a database, no click required from the visitor),
    // this would need a form backend service (e.g. Formspree) or a real
    // backend endpoint wired in here instead.
    const subject = `New enquiry from ${form.name || 'website visitor'} — ${form.service}`
    const body = [
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email || '—'}`,
      `Interested in: ${form.service}`,
      '',
      'Message:',
      form.message || '—',
    ].join('\n')
    window.location.href = `mailto:${SITE.emails[0]}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-line rounded-2xl shadow-xs p-6 sm:p-8 grid gap-5">
      <div>
        <span className="eyebrow">Send a message</span>
        <p className="text-muted text-sm mt-2">We'll open this as an email you can send straight from your inbox.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="field">
          <label htmlFor="c-name">Full name</label>
          <input type="text" id="c-name" name="name" placeholder="Your full name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="field">
          <label htmlFor="c-phone">Phone number</label>
          <input type="tel" id="c-phone" name="phone" placeholder="080..." value={form.phone} onChange={handleChange} required />
        </div>
      </div>

      <div className="field">
        <label htmlFor="c-email">Email address</label>
        <input type="email" id="c-email" name="email" placeholder="you@email.com" value={form.email} onChange={handleChange} />
      </div>

      <div className="field">
        <label htmlFor="c-service">What can we help with?</label>
        <select id="c-service" name="service" value={form.service} onChange={handleChange}>
          {SERVICE_OPTIONS.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="field">
        <label htmlFor="c-message">Message</label>
        <textarea id="c-message" name="message" placeholder="Tell us a bit about what you're looking for." value={form.message} onChange={handleChange} />
      </div>

      <button type="submit" className="btn btn-lime justify-center">
        Send Message
        <Send className="w-4 h-4" />
      </button>

      <p className="text-center text-xs text-muted -mt-1">
        Prefer WhatsApp? <a href={waLink("Hello Calmcorner, I'd like to get in touch.")} target="_blank" rel="noopener noreferrer" className="font-bold text-lime-deep hover:text-lime">Message us there instead</a>.
      </p>
    </form>
  )
}
