import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Reveal from './Reveal'
import WaveDivider from './WaveDivider'
import { CardRipples } from './Ripples'
import { SERVICES, SERVICES_INTRO } from '../data/services'

export default function ServicesSection({ showMoreLink = false, showRowCta = true, dividerFill }) {
  return (
    <section className="relative bg-mist py-24 md:py-28 overflow-hidden">
      <div className="container-custom relative z-10">
        <Reveal className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="inline-block bg-lime text-ink text-xs font-bold uppercase tracking-wide px-4 py-2 rounded-full mb-5">
            Our Services
          </span>
          <p className="text-muted text-lg">{SERVICES_INTRO}</p>
        </Reveal>

        <div className="grid gap-20 md:gap-28">
          {SERVICES.map((s, i) => {
            const reverse = i % 2 === 1
            return (
              <div
                key={s.num}
                className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${reverse ? 'md:[&>*:first-child]:order-2' : ''}`}
              >
                <Reveal>
                  <span className="eyebrow mb-4">{s.num} {s.tag}</span>
                  <h3 className="text-ink text-2xl md:text-3xl mb-4">{s.title}</h3>
                  <p className="text-muted text-lg mb-6">{s.body}</p>
                  {showRowCta && (
                    <Link to={s.cta.to} className="inline-flex items-center gap-2 text-lime-deep font-bold text-sm hover:gap-3 transition-all">
                      {s.cta.label} <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </Reveal>
                <Reveal delay={0.1}>
                  <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden border border-line shadow-xs">
                    {s.image ? (
                      <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-lime-soft flex items-center justify-center">
                        <CardRipples className="w-3/4" />
                      </div>
                    )}
                  </div>
                </Reveal>
              </div>
            )
          })}
        </div>

        {showMoreLink && (
          <Reveal className="text-center mt-20">
            <Link to="/services" className="btn btn-lime">
              More Services <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        )}
      </div>
      {dividerFill && <WaveDivider fill={dividerFill} />}
    </section>
  )
}
