import { ShieldCheck, Headphones, FileCheck2, Wallet } from 'lucide-react'
import Reveal from './Reveal'

// Honest company facts, kept as a slim standalone strip rather than
// large stat cards — see chat history for why these specific facts were
// chosen (the company only just launched, so "years in business" /
// "clients served" style numbers would be fabricated).
const STATS = [
  { icon: ShieldCheck, value: '100%', label: 'Verified Properties' },
  { icon: Headphones, value: '24/7', label: 'Customer Support' },
  { icon: FileCheck2, value: 'End-to-End', label: 'Documentation' },
  { icon: Wallet, value: 'Flexible', label: 'Payment Plans' },
]

export default function StatsStrip() {
  return (
    <section className="bg-white border-b border-line py-4 sm:py-3">
      <Reveal className="container-custom">
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-8 sm:gap-y-0">
          {STATS.map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <s.icon className="w-4 h-4 text-lime-deep shrink-0" strokeWidth={2} />
              <span className="text-xs sm:text-sm leading-tight">
                <span className="font-bold text-ink">{s.value}</span>{' '}
                <span className="text-muted">{s.label}</span>
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
