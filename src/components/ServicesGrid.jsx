import { Link } from 'react-router-dom'
import {
  Home as HomeIcon,
  Building2,
  Hammer,
  Handshake,
  ArrowRight,
} from 'lucide-react'
import Reveal from './Reveal'
import WaveDivider from './WaveDivider'
import ServiceCard from './ServiceCard'

const CARDS = [
  {
    icon: HomeIcon,
    title: 'Land & Property Sales',
    description:
      'Verified residential and investment properties tailored to your goals.',
    to: '/properties',
  },
  {
    icon: Building2,
    title: 'Property Development',
    description:
      'Transforming raw land into valuable residential and commercial developments.',
    to: '/services',
  },
  {
    icon: Hammer,
    title: 'Building & Construction',
    description:
      'Modern, durable homes built with quality craftsmanship and attention to detail.',
    to: '/services',
  },
  {
    icon: Handshake,
    title: 'Real Estate Consultancy',
    description:
      'Professional guidance to help you buy, invest and grow with confidence.',
    to: '/services',
  },
]

export default function ServicesGrid({ dividerFill }) {
  return (
    <section className="relative overflow-hidden bg-mist py-20 pb-28 md:py-24 md:pb-32">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-lime/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-lime/10 blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Heading */}
        <Reveal>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full bg-lime/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-lime-deep">
              What We Offer
            </span>

            <h2 className="mt-5 text-3xl font-bold leading-tight text-ink sm:text-4xl md:text-5xl">
              Everything You Need for a
              <span className="block text-lime-deep">
                Successful Property Journey
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted">
              Whether you're buying land, building your dream home, or investing
              in real estate, Calmcorner provides complete solutions designed
              around your future.
            </p>
          </div>
        </Reveal>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card, index) => (
            <Reveal key={card.title} delay={index * 0.08}>
              <ServiceCard {...card} />
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal delay={0.2}>
          <div className="mt-14 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-xl border border-lime-deep bg-white px-6 py-3.5 font-semibold text-lime-deep transition-all duration-300 hover:-translate-y-1 hover:bg-lime hover:text-ink hover:shadow-lg"
            >
              Explore All Services
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>

      {dividerFill && <WaveDivider fill={dividerFill} />}
    </section>
  )
}