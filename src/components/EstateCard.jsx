// EstateCard.jsx
import { Link } from 'react-router-dom'
import {
  Car,
  TrendingUp,
  FileCheck2,
  LandPlot,
  MapPin,
  ArrowRight
} from 'lucide-react'
import { CardRipples } from './Ripples'

const ICONS = {
  road: Car,
  investment: TrendingUp,
  legal: FileCheck2,
  dry: LandPlot,
}

const DEFAULT_BADGES = [
  { icon: 'road', label: 'Road Access' },
  { icon: 'legal', label: 'Verified Documents' },
  { icon: 'investment', label: 'Investment Ready' },
  { icon: 'dry', label: 'Dry Land' },
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
  blurb,
  tag='Coming Soon',
  image,
  gradientIndex=0,
  badges
}) {
  const items = badges || DEFAULT_BADGES

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <div className={`relative h-64 overflow-hidden bg-linear-to-br ${GRADIENTS[gradientIndex % GRADIENTS.length]}`}>
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <CardRipples className="absolute inset-0 h-full w-full opacity-60" />
        )}

        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent"/>

        <span className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-bold uppercase ${
          tag==='Now Selling' ? 'bg-lime text-ink':'bg-white text-ink'
        }`}>
          {tag}
        </span>

        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="mt-1 flex items-center gap-1 text-sm">
            <MapPin className="h-4 w-4"/>
            {location}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm text-muted">Starting From</span>
          <span className="font-bold text-lime-deep">{price}</span>
        </div>

        <p className="flex-1 text-sm leading-7 text-muted line-clamp-3">
          {blurb}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {items.slice(0,4).map((b)=>{
            const Icon=ICONS[b.icon]||FileCheck2
            return(
              <span key={b.label} className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-2 text-xs">
                <Icon className="h-3.5 w-3.5"/>
                {b.label}
              </span>
            )
          })}
        </div>

        <Link
          to={`/properties/${slug}`}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink-soft"
        >
          View Details
          <ArrowRight className="h-4 w-4"/>
        </Link>
      </div>
    </div>
  )
}
