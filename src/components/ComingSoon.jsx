import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageHero from './PageHero'
import Reveal from './Reveal'
import { waLink } from '../siteConfig'

/**
 * Reusable "coming soon" page shell with a waitlist form.
 * NOTE: there is no backend yet, so submitting the form only
 * shows a confirmation state locally — nothing is sent or stored.
 * Wire the onSubmit handler up to a real API once one exists.
 */
export default function ComingSoon({ eyebrow, title, lede, roleOptions, whatsappMessage, children }) {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '', role: roleOptions ? roleOptions[0] : '' })

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: replace with a real API call once the backend exists.
    setSubmitted(true)
  }

  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={lede} dividerFill="#FFFFFF" />

      <section className="py-20 md:py-24">
        <div className="container-custom">
          <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-14">
            <Reveal>
              <div>{children}</div>
              <a
                href={waLink(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp mt-7 inline-flex"
              >
                Ask us on WhatsApp
              </a>
            </Reveal>

            <Reveal delay={0.1}>
              <form
                onSubmit={handleSubmit}
                className="bg-white border border-line p-8 md:p-10 rounded-xl shadow-xs grid gap-5"
              >
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="done"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <span className="eyebrow">You&rsquo;re on the list</span>
                      <h3 className="mt-3.5">Thanks, {form.name || 'friend'}.</h3>
                      <p className="text-muted mt-2.5">
                        We&rsquo;ll reach out as soon as this is ready. In the meantime, feel free to message us on WhatsApp with any questions.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div key="form" exit={{ opacity: 0 }} className="grid gap-5">
                      <span className="eyebrow">Join the waitlist</span>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div className="field">
                          <label htmlFor="name">Full name</label>
                          <input id="name" name="name" type="text" placeholder="Your full name" value={form.name} onChange={handleChange} required />
                        </div>
                        <div className="field">
                          <label htmlFor="phone">Phone number</label>
                          <input id="phone" name="phone" type="tel" placeholder="080..." value={form.phone} onChange={handleChange} required />
                        </div>
                      </div>
                      <div className="field">
                        <label htmlFor="email">Email address</label>
                        <input id="email" name="email" type="email" placeholder="you@email.com" value={form.email} onChange={handleChange} />
                      </div>
                      {roleOptions && (
                        <div className="field">
                          <label htmlFor="role">I am a</label>
                          <select id="role" name="role" value={form.role} onChange={handleChange}>
                            {roleOptions.map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        </div>
                      )}
                      <button type="submit" className="btn btn-lime justify-center">Join the waitlist</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
