import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import WaveDivider from './WaveDivider'

export default function WhoWeAre({ dividerFill }) {
  return (
    <section className="relative py-16 pb-28 bg-ink overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-center">
          {/* Image */}
          <Reveal>
            <div className="relative rounded-2xl overflow-hidden border border-l-ink-soft shadow-xs h-90 md:h-110">
              <img
                src="/images/hero/slide-1.jpg"
                alt="A Calmcorner-guided home interior"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>

          {/* Content */}
          <Reveal delay={0.1}>
            <span className="eyebrow">Who We Are</span>

            <h2 className="mt-3.5 mb-5 text-3xl md:text-4xl text-white font-extrabold leading-tight">
              Proudly Nigerian real estate company built on trust
            </h2>

            <p className="text-neutral-400 md:text-lg mb-4">
              At Calmcorner Homes &amp; Properties Ltd, we believe that owning
              property should be a journey defined by confidence, clarity, and
              peace of mind. Every piece of land, every home, and every
              investment represents far more than a transaction, it represents a
              dream fulfilled and a future secured.
            </p>

            <p className="text-neutral-400 md:text-lg mb-7">
              We place integrity, due diligence, and legal compliance at the
              center of every transaction, ensuring every property we present is
              thoroughly verified and every client receives honest guidance from
              first consultation to completion.
            </p>

            <Link to="/about" className="btn btn-lime">
              More About Us
            </Link>
          </Reveal>
        </div>
      </div>

      {/* Bottom Wave Divider */}
      {dividerFill && <WaveDivider fill={dividerFill} />}
    </section>
  )
}