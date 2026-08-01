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

      <section className="relative py-24 md:py-28 overflow-hidden">
        <Watermark position="top-right" />
        <div className="container-custom">
          <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-16">
            <Reveal>
              <div className="py-6 border-t border-line">
                <span className="eyebrow mb-2.5">Head Office</span>
                <p className="mt-2.5">{SITE.address.line1}, {SITE.address.line2}, {SITE.address.line3}.</p>
              </div>
              <div className="py-6 border-t border-line">
                <span className="eyebrow mb-2.5">WhatsApp</span>
                <p className="mt-2.5"><a href={waLink()} target="_blank" rel="noopener noreferrer" className="font-bold text-ink">{SITE.phones[0].display}</a></p>
              </div>
              <div className="py-6 border-t border-line">
                <span className="eyebrow mb-2.5">Call us</span>
                <p className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1">
                  {SITE.phones.map((p) => (
                    <a key={p.href} href={`tel:${p.href}`} className="font-bold text-ink">{p.display}</a>
                  ))}
                </p>
              </div>
              <div className="py-6 border-t border-line">
                <span className="eyebrow mb-2.5">Email</span>
                <p className="mt-2.5 flex flex-col gap-1">
                  {SITE.emails.map((e) => (
                    <a key={e} href={`mailto:${e}`} className="font-bold text-ink">{e}</a>
                  ))}
                </p>
              </div>
              <div className="py-6 border-t border-line">
                <span className="eyebrow mb-2.5">Follow us</span>
                <div className="mt-3"><Socials variant="light" /></div>
              </div>
              <div className="py-6 border-t border-b border-line">
                <span className="eyebrow mb-2.5">Services</span>
                <p className="mt-2.5">Land &amp; Property Sales &middot; Property Development & Management &middot; Building &amp; Home Construction &middot; Real Estate Consultancy &amp; Brokerage</p>
              </div>

              <div className="mt-8 border border-line rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.3925428030075!2d6.6829718!3d6.2118477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1043ef12d26f020f%3A0x274422f964ee19ca!2sCalmcorner%20Homes%20%26%20Properties%20Ltd!5e0!3m2!1sen!2sng!4v1785454060726!5m2!1sen!2sng"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Calmcorner Homes and Properties Ltd office location"
                  className="w-full h-[340px] border-0 block"
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

function ContactForm() {
  return (
    <form className="bg-white border border-line rounded-xl shadow-xs p-8 md:p-10 grid gap-5" onSubmit={(e) => e.preventDefault()}>
      <span className="eyebrow">Send a message</span>
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="field">
          <label htmlFor="c-name">Full name</label>
          <input type="text" id="c-name" name="name" placeholder="Your full name" required />
        </div>
        <div className="field">
          <label htmlFor="c-phone">Phone number</label>
          <input type="tel" id="c-phone" name="phone" placeholder="080..." required />
        </div>
      </div>
      <div className="field">
        <label htmlFor="c-email">Email address</label>
        <input type="email" id="c-email" name="email" placeholder="you@email.com" />
      </div>
      <div className="field">
        <label htmlFor="c-service">What can we help with?</label>
        <select id="c-service" name="service">
          <option>Land &amp; Property Sales</option>
          <option>Property Development & Management</option>
          <option>Building &amp; Home Construction</option>
          <option>Real Estate Consultancy &amp; Brokerage</option>
          <option>CalmVilla Residence enquiry</option>
          <option>Something else</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="c-message">Message</label>
        <textarea id="c-message" name="message" placeholder="Tell us a bit about what you're looking for." />
      </div>
      <a
        href={waLink("Hello Calmcorner, I'd like to get in touch.")}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-whatsapp justify-center"
      >
        Send via WhatsApp
      </a>
    </form>
  )
}
