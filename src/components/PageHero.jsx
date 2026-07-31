import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import WaveDivider from './WaveDivider'
import logoIcon from '../assets/logo-icon.png'

/**
 * Shared hero for every internal page (About, Services, Properties,
 * Realtor Network, Contact, etc). Content is centered both ways within a
 * max-width column, with a large, near-invisible logo mark floating on
 * the right as a brand watermark — decorative only, never the focal point.
 *
 * Props:
 *  - eyebrow: small label above the title
 *  - title: the page's <h1>
 *  - description: optional supporting paragraph
 *  - tagline: optional italic slogan line, shown above the title (used by About)
 *  - cta: optional { label, to } (internal Link) or { label, href } (external <a>)
 *  - dividerFill: hex color of the section that follows, for the wave transition
 */
export default function PageHero({ eyebrow, title, description, tagline, cta, dividerFill = '#FFFFFF' }) {
  return (
    <section className="relative bg-ink text-white overflow-hidden min-h-[440px] md:min-h-[500px] flex items-center justify-center py-24">
      {/* Floating logo watermark — decorative brand mark, not the primary logo */}
      <div
        aria-hidden="true"
        className="hidden sm:block pointer-events-none absolute -right-20 md:-right-12 top-1/2 -translate-y-1/2 w-[340px] md:w-[460px] lg:w-[560px] z-0 opacity-[0.08] blur-[3px]"
        style={{
          maskImage: 'radial-gradient(circle at 60% 50%, black 35%, transparent 72%)',
          WebkitMaskImage: 'radial-gradient(circle at 60% 50%, black 35%, transparent 72%)',
        }}
      >
        <img src={logoIcon} alt="" className="w-full h-auto" />
      </div>

      <div className="container-custom relative z-10">
        <Reveal className="max-w-[760px] mx-auto text-center">
          <span className="eyebrow eyebrow-light justify-center">{eyebrow}</span>
          {tagline && <p className="italic text-lime font-display text-lg mt-3">&ldquo;{tagline}&rdquo;</p>}
          <h1 className="text-white mt-4 text-4xl md:text-5xl">{title}</h1>
          {description && <p className="text-white/70 mt-4 text-lg">{description}</p>}
          {cta && (
            cta.to ? (
              <Link to={cta.to} className="btn btn-lime mt-8 inline-flex">{cta.label}</Link>
            ) : (
              <a href={cta.href} target="_blank" rel="noopener noreferrer" className="btn btn-lime mt-8 inline-flex">{cta.label}</a>
            )
          )}
        </Reveal>
      </div>

      <WaveDivider fill={dividerFill} />
    </section>
  )
}
