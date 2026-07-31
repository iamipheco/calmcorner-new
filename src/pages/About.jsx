import { Eye, Flag, Target, CheckCircle2, ShieldCheck, Headphones, FileCheck2, Wallet} from 'lucide-react'
import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import PageHero from '../components/PageHero'
import CTABand from '../components/CTABand'
import WaveDivider from '../components/WaveDivider'
import StatCard from '../components/StatCard'
import HowWeWork from '../components/HowWeWork'
import Testimonials from '../components/Testimonials'
import {
  OUR_STORY,
  PURPOSE_VISION_MISSION,
  CORE_VALUES,
  WHY_CHOOSE_INTRO,
  WHY_CHOOSE_REASONS,
} from '../data/about'

const PVM_ICONS = { target: Target, eye: Eye, flag: Flag }

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Building trust through real estate that puts people first."
        dividerFill="#FFFFFF"
      />

      {/* Our Story — split layout */}
      <section className="py-24 md:py-28 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-14 md:gap-16 items-center">
            <Reveal>
              <div className="relative rounded-2xl overflow-hidden border border-line shadow-xs h-90 md:h-130">
                <img src="/images/hero/slide-3.jpg" alt="Calmcorner" className="w-full h-full object-cover" />
              </div>
            </Reveal>
            <div>
              <Reveal>
                <span className="eyebrow">Our Story</span>
                <h2 className="mt-3.5 mb-8 text-4xl md:text-5xl">Three things worth knowing about us</h2>
              </Reveal>
              <div className="grid gap-8">
                {OUR_STORY.map((s, i) => (
                  <Reveal delay={0.06 + i * 0.08} key={s.title}>
                    <div className="pl-5 border-l-2 border-lime">
                      <h3 className="text-lg mb-2">{s.title}</h3>
                      <p className="text-muted">{s.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="relative py-20 md:py-24 bg-stone overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard dark={false} icon={ShieldCheck} value="100%" label="Verified Properties" />
            <StatCard dark={false} icon={Headphones} value="24/7" label="Customer Support" />
            <StatCard dark={false} icon={FileCheck2} value="End-to-End" label="Documentation" />
            <StatCard dark={false} icon={Wallet} value="Flexible" label="Payment Plans" />
          </div>
        </div>
        <WaveDivider fill="#0A1220" />
      </section>

      {/* Core Values — C.A.L.M.C.O.R.N.E.R */}
      <section className="relative bg-ink text-white py-8 md:py-12 pb-28 overflow-hidden">
        <div className="container-custom relative z-10">
          <SectionHeading eyebrow="Our core values" title="C.A.L.M.C.O.R.N.E.R" light center />
          <div className="grid sm:grid-cols-2 gap-5">
            {CORE_VALUES.map((v, i) => (
              <Reveal delay={i * 0.05} key={`${v.letter}-${v.word}`}>
                <div className="flex gap-5 p-6 rounded-xl border border-white/12 hover:border-lime/40 hover:bg-white/5 transition-colors h-full">
                  <span className="shrink-0 w-12 h-12 rounded-full bg-lime text-ink font-display font-bold text-xl flex items-center justify-center">
                    {v.letter}
                  </span>
                  <div>
                    <h3 className="text-white text-base mb-1.5">{v.word}</h3>
                    <p className="text-white/70 text-sm">{v.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <WaveDivider fill="#FFFFFF" />
      </section>

      {/* Vision / Mission / Purpose */}
      <section className="py-8 md:py-12 pb-20 bg-white">
        <div className="container-custom">
          <SectionHeading eyebrow="What drives us" title="Vision, Mission & Purpose" center />
          <div className="grid md:grid-cols-3 gap-6">
            {PURPOSE_VISION_MISSION.map((item, i) => {
              const Icon = PVM_ICONS[item.icon]
              return (
                <Reveal delay={i * 0.1} key={item.label}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="group bg-white border border-line rounded-2xl shadow-xs hover:shadow-xl hover:border-lime-deep/40 transition-shadow duration-300 p-8 h-full"
                  >
                    <motion.div
                      whileHover={{ scale: 1.12, rotate: -6 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                      className="w-11 h-11 rounded-lg bg-lime-soft text-lime-deep flex items-center justify-center mb-5 group-hover:bg-lime group-hover:text-ink transition-colors duration-300"
                    >
                      <Icon className="w-5 h-5" strokeWidth={2} />
                    </motion.div>
                    <h3 className="text-lg mb-3">{item.label}</h3>
                    <p className="text-muted text-[0.96rem]">{item.body}</p>
                    <div className="h-0.5 w-8 bg-lime-deep rounded-full mt-5 group-hover:w-16 transition-all duration-300" />
                  </motion.div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Calmcorner */}
      <section className="py-8 md:py-12 pb-20 bg-stone">
        <div className="container-custom">
          <SectionHeading eyebrow="Why choose Calmcorner" title="Your peaceful path to property ownership" lede={WHY_CHOOSE_INTRO} />
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-6">
            {WHY_CHOOSE_REASONS.map((r, i) => (
              <Reveal delay={i * 0.06} key={r.lead}>
                <div className="flex items-start gap-3.5">
                  <CheckCircle2 className="w-5 h-5 text-lime-deep shrink-0 mt-0.5" strokeWidth={2} />
                  <p className="text-slate"><span className="font-bold text-ink">{r.lead}</span> <span className="text-muted">{r.rest}</span></p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <HowWeWork />

      {/* Testimonials */}
      <Testimonials dividerFill="#8CD300" />

      {/* CTA */}
      <CTABand
        title="Have a question about a property?"
        subtitle="We're a message away on WhatsApp."
      />
    </>
  )
}
