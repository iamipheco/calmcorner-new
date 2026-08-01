import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  BadgeCheck,
  FileCheck2,
  Handshake,
  WalletCards,
  Building2,
  Headphones,
} from 'lucide-react'
import Reveal from './Reveal'
import WaveDivider from './WaveDivider'

const FEATURES = [
  {
    icon: BadgeCheck,
    label: '100% Verified Properties',
    //body: 'Every property is carefully verified through due diligence for safer, legally compliant investments.',
  },
  {
    icon: FileCheck2,
    label: 'Transparent Documentation',
    //body: 'Clear ownership records and complete documentation give you confidence at every stage.',
  },
  {
    icon: Handshake,
    label: 'Honest Transactions',
    //body: 'Open communication, fair dealings and no hidden costs throughout your property journey.',
  },
  {
    icon: WalletCards,
    label: 'Flexible Payment Plans',
    //body: 'Convenient payment options designed to make property ownership more accessible.',
  },
  {
    icon: Building2,
    label: 'Quality Development',
    //body: 'Modern, durable properties built with quality craftsmanship and long-term value in mind.',
  },
  {
    icon: Headphones,
    label: 'Dedicated Support',
    //body: 'Our relationship continues after the sale with dependable support whenever you need us.',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: index * 0.06,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

export default function WhyChooseCalmcorner({ dividerFill }) {
  return (
    <section className="relative overflow-hidden bg-ink text-white py-20 md:py-24 pb-28 md:pb-32">
      {/* Subtle background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-lime/5 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-lime/5 blur-3xl"
      />

      <div className="container-custom relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14 xl:gap-20">
          {/* Intro */}
          <Reveal>
            <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
              <span className="inline-flex items-center rounded-full border border-lime/25 bg-lime/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-lime">
                Why Choose Us
              </span>

              <h2 className="mt-5 text-3xl font-bold leading-[1.12] text-white sm:text-4xl lg:text-[2.6rem]">
                Property decisions should feel{' '}
                <span className="text-lime">clear and secure.</span>
              </h2>

              <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-white/65 sm:text-base lg:mx-0">
                From verification to documentation and after-sales support,
                Calmcorner gives you the clarity and guidance to make confident
                property decisions.
              </p>

              <div className="mt-8">
                <Link
                  to="/about"
                  className="btn btn-lime inline-flex items-center justify-center"
                >
                  Learn More About Us
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Feature cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
          >
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon

              return (
                <motion.article
                  key={feature.label}
                  custom={index}
                  variants={cardVariants}
                  whileHover={{ y: -5 }}
                  className="group relative min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-5 sm:p-6"
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-lime/[0.07] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative z-10">
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-lime/15 bg-lime/10 text-lime transition-all duration-300 group-hover:border-lime/30 group-hover:bg-lime group-hover:text-ink">
                      <Icon className="h-5 w-5" strokeWidth={1.9} />
                    </div>

                    <h3 className="mb-2.5 text-[1rem] font-semibold leading-snug text-white">
                      {feature.label}
                    </h3>

                    <p className="text-[0.84rem] leading-6 text-white/60">
                      {feature.body}
                    </p>
                  </div>

                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-lime transition-all duration-500 group-hover:w-full" />
                </motion.article>
              )
            })}
          </motion.div>
        </div>
      </div>

      {dividerFill && <WaveDivider fill={dividerFill} />}
    </section>
  )
}