import { Link } from 'react-router-dom'
import logo from '../assets/logo-foot.png'
import Socials from './Socials'
import { SITE } from '../siteConfig'

export default function Footer() {
  return (
    <footer className="bg-ink text-white/70 pt-16 md:pt-20 pb-7">
      <div className="container-custom">
        <div className="grid md:grid-cols-[1.3fr_1fr_1fr_1.1fr] gap-10 pb-12 border-b border-white/10">
          <div>
            <img src={logo} alt={SITE.companyName} className="h-15 mb-4 brightness-0 invert" />
            <p className="text-sm max-w-[34ch] mb-6">
              We are client-focused real estate, helping individuals, families and investors secure valuable property with confidence.
            </p>
            <Socials />
          </div>
          <div>
            <h4 className="text-white text-xs font-bold tracking-wide uppercase mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-lime transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-lime transition-colors">Services</Link></li>
              <li><Link to="/properties" className="hover:text-lime transition-colors">Properties</Link></li>
              <li><Link to="/realtors" className="hover:text-lime transition-colors">Realtor Network</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-xs font-bold tracking-wide uppercase mb-4">Head Office</h4>
            <ul className="space-y-3 text-sm">
              <li>{SITE.address.line1}</li>
              <li>{SITE.address.line2}</li>
              <li>{SITE.address.line3}</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-xs font-bold tracking-wide uppercase mb-4">Get in touch</h4>
            <ul className="space-y-3 text-sm">
              {SITE.phones.map((p) => (
                <li key={p.href}><a href={`tel:${p.href}`} className="hover:text-lime transition-colors">{p.display}</a></li>
              ))}
              {SITE.emails.map((e) => (
                <li key={e}><a href={`mailto:${e}`} className="hover:text-lime transition-colors break-all">{e}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-3 pt-6 text-xs">
          <span>&copy; {new Date().getFullYear()} {SITE.companyName}. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}
