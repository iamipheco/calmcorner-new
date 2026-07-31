import { MessageCircle, ShieldCheck, FileSignature, KeyRound } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { HOW_WE_WORK } from '../data/about'

const ICONS = { message: MessageCircle, shield: ShieldCheck, file: FileSignature, key: KeyRound }

export default function HowWeWork() {
  return (
    <section className="py-24 md:py-28 bg-white">
      <div className="container-custom">
        <SectionHeading eyebrow="How we work" title="From first message to handover" center />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {HOW_WE_WORK.map((step, i) => {
            const Icon = ICONS[step.icon]
            return (
              <Reveal delay={i * 0.08} key={step.num}>
                <div className="relative text-center px-2">
                  {i < HOW_WE_WORK.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-1/2 w-full h-px bg-line -z-10" />
                  )}
                  <div className="w-16 h-16 rounded-full bg-lime-soft text-lime-deep flex items-center justify-center mx-auto mb-5 relative bg-white border border-line">
                    <Icon className="w-6 h-6" strokeWidth={1.8} />
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-ink text-white text-[0.68rem] font-bold flex items-center justify-center">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="text-lg mb-2.5">{step.title}</h3>
                  <p className="text-muted text-sm">{step.body}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
