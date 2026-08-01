import { Link } from 'react-router-dom'
import {
  Car,
  TrendingUp,
  FileCheck2,
  LandPlot,
  MapPin,
  ArrowRight,
  ScrollText,
  WalletCards,
  Droplets,
  Zap,
  ShieldCheck,
} from 'lucide-react'
import { CardRipples } from './Ripples'

const ICONS = {
  road: Car,
  investment: TrendingUp,
  legal: FileCheck2,
  dry: LandPlot,
  survey: FileCheck2,
  deed: ScrollText,
  land: LandPlot,
  payment: WalletCards,
  water: Droplets,
  power: Zap,
  security: ShieldCheck,
}

// Default 4 badges shown when an estate doesn't specify its own — each
// with a short label that appears as a tooltip on hover.
const DEFAULT_BADGES = [
  { icon: 'road', label: 'On Tarred Road' },
  { icon: 'legal', label: '100% Legal Papers' },
  { icon: 'investment', label: 'Suitable For Investment' },
  { icon: 'dry', label: 'Fully Dry, Table Land' },
]

const GRADIENTS = [
  'from-ink to-[#1b2b1a]',
  'from-ink-soft to-ink',
  'from-[#16240f] to-ink',
]

export default function EstateCard({
  slug,
  name,
  location,
  price,
  originalPrice,
  blurb,
  tag = 'Coming Soon',
  image,
  gradientIndex = 0,
  badges,
}) {
  const items = (badges || DEFAULT_BADGES).slice(0, 4)

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {/* Image */}
      <div className={`relative h-56 overflow-hidden bg-linear-to-br ${GRADIENTS[gradientIndex % GRADIENTS.length]}`}>
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <CardRipples className="absolute inset-0 h-full w-full opacity-60" />
        )}
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-bold uppercase ${
            tag === 'Now Selling' ? 'bg-lime text-ink' : 'bg-white text-ink'
          }`}
        >
          {tag}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-1.5 flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold leading-snug">{name}</h3>
          <div className="shrink-0 text-right">
            {originalPrice && (
              <span className="block text-xs text-muted line-through">{originalPrice}</span>
            )}
            <span className="font-bold text-lime-deep">{price}</span>
          </div>
        </div>

        <p className="mb-4 flex items-center gap-1.5 text-sm text-muted">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          {location}
        </p>

        <p className="flex-1 text-sm leading-7 text-muted line-clamp-3">{blurb}</p>

        {/* Icon badges with hover tooltips */}
        <div className="mt-6 flex items-center gap-2">
          {items.map((b) => {
            const Icon = ICONS[b.icon] || FileCheck2
            return (
              <span key={b.label} className="group/tip relative">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors duration-200 hover:border-lime-deep hover:bg-lime-soft hover:text-lime-deep cursor-default">
                  <Icon className="h-4 w-4" strokeWidth={1.8} />
                </span>
                <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 scale-95 whitespace-nowrap rounded-md bg-ink px-2.5 py-1.5 text-xs font-semibold text-white opacity-0 transition-all duration-150 group-hover/tip:scale-100 group-hover/tip:opacity-100">
                  {b.label}
                  <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-ink" />
                </span>
              </span>
            )
          })}
        </div>

        <Link
          to={`/properties/${slug}`}
          className="mt-6 inline-flex items-center justify-center gap-2 self-end rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink-soft"
        >
          Explore
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
