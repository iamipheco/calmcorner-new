import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  ShoppingBag,
  Car,
  TrendingUp,
  FileCheck2,
  LandPlot,
  ScrollText,
  WalletCards,
  Droplets,
  Zap,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react'
import Reveal from '../components/Reveal'
import CTABand from '../components/CTABand'
import { CardRipples } from '../components/Ripples'
import { FEATURED_ESTATES, OTHER_ESTATES } from '../data/estates'
import { waLink, SITE } from '../siteConfig'

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

const GRADIENTS = [
  'from-ink to-[#1b2b1a]',
  'from-ink-soft to-ink',
  'from-[#16240f] to-ink',
]

// Normalizes every estate's "list of good things about it" into one
// consistent shape — { icon, label } — regardless of whether the source
// data called it `highlights` (object array), `badges` (object array),
// or `features` (plain string array).
function getHighlights(estate) {
  const raw = estate.highlights || estate.badges || estate.features || []
  return raw.map((item) =>
    typeof item === 'string' ? { icon: null, label: item } : item
  )
}

const ALL_ESTATES = [
  ...FEATURED_ESTATES.map((e, i) => ({
    ...e,
    price: e.price || 'Price on Request',
    mapQuery: e.mapQuery || e.location,
    images: e.images && e.images.length ? e.images : e.image ? [e.image] : [],
    gradientIndex: e.gradientIndex ?? i,
  })),
  ...OTHER_ESTATES.map((e, i) => ({
    ...e,
    images: e.images && e.images.length ? e.images : e.image ? [e.image] : [],
    gradientIndex: e.gradientIndex ?? i,
  })),
]

export default function EstateDetail() {
  const { slug } = useParams()
  const estate = ALL_ESTATES.find((e) => e.slug === slug)
  const [index, setIndex] = useState(0)
  const [plotIndex, setPlotIndex] = useState(0)

  if (!estate) return <Navigate to="/properties" replace />

  const images = estate.images || []
  const hasGallery = images.length > 1
  const highlights = getHighlights(estate)
  const plotSizes = estate.plotSizes || []
  const selected = plotSizes[plotIndex]
  const displayPrice = selected ? selected.price : estate.price
  const displayOriginalPrice = selected ? selected.originalPrice : estate.originalPrice
  const gradient = GRADIENTS[estate.gradientIndex % GRADIENTS.length]

  return (
    <>
      {/* Hero: gallery + key details */}
      <section className="py-16 md:py-20">
        <div className="container-custom">
          <Reveal>
            <Link to="/properties" className="mb-8 inline-flex items-center gap-2 text-muted hover:text-ink">
              <ChevronLeft className="w-4 h-4" />Back to Properties
            </Link>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Image */}
              <div>
                <div className={`relative aspect-[761/1080] max-h-[640px] overflow-hidden rounded-3xl bg-linear-to-br ${gradient}`}>
                  {images.length ? (
                    <img src={images[index]} alt={estate.name} className="w-full h-full object-contain" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <CardRipples className="w-3/4 opacity-60" />
                    </div>
                  )}

                  <span
                    className={`absolute top-5 left-5 rounded-full px-4 py-2 text-xs font-bold uppercase ${
                      estate.tag === 'Now Selling' ? 'bg-lime text-ink' : 'bg-white text-ink'
                    }`}
                  >
                    {estate.tag}
                  </span>

                  {hasGallery && (
                    <>
                      <button
                        onClick={() => setIndex((index - 1 + images.length) % images.length)}
                        aria-label="Previous photo"
                        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 hover:bg-white transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setIndex((index + 1) % images.length)}
                        aria-label="Next photo"
                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 hover:bg-white transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnail strip — only when there's more than one photo */}
                {hasGallery && (
                  <div className="mt-4 grid grid-cols-5 gap-3">
                    {images.map((img, i) => (
                      <button
                        key={img}
                        onClick={() => setIndex(i)}
                        className={`h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                          i === index ? 'border-lime-deep' : 'border-transparent'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}

                {/* More photos/videos — links to the Facebook post about this
                    estate once one is set in the data; falls back to the
                    main Calmcorner Facebook page otherwise. */}
                <a
                  href={estate.facebookUrl || SITE.socials.find((s) => s.name === 'Facebook')?.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-line py-3 text-sm font-semibold text-ink hover:border-lime-deep hover:bg-lime-soft transition-colors"
                >
                  More Images/Videos
                </a>
              </div>

              {/* Key details */}
              <div className="flex flex-col justify-center">
                <span className="eyebrow">{estate.location}</span>
                <h1 className="mt-3 text-3xl md:text-4xl font-bold">{estate.name}</h1>

                <p className="mt-3 flex items-center gap-2 text-muted">
                  <MapPin className="w-4 h-4" />
                  {estate.location}
                </p>

                {estate.landmarks && estate.landmarks.length > 0 && (
                  <div className="mt-6">
                    <span className="text-xs font-bold uppercase tracking-wide text-muted">Nearby Landmarks</span>
                    <ul className="feature-list mt-3 grid gap-2.5">
                      {estate.landmarks.map((l) => <li key={l}>{l}</li>)}
                    </ul>
                  </div>
                )}

                <div className="mt-8 border-t border-line pt-6">
                  <div>
                    {displayOriginalPrice && (
                      <span className="block text-sm text-muted line-through">{displayOriginalPrice}</span>
                    )}
                    <span className="font-display text-2xl md:text-3xl font-semibold text-ink">{displayPrice}</span>
                  </div>

                  {plotSizes.length > 0 && (
                    <select
                      value={plotIndex}
                      onChange={(e) => setPlotIndex(Number(e.target.value))}
                      className="mt-4 w-full max-w-xs rounded-lg border border-line bg-white px-3.5 py-3 text-sm font-semibold text-slate focus:border-lime-deep focus:outline-none"
                    >
                      {plotSizes.map((p, i) => (
                        <option key={p.size} value={i}>
                          {p.size} — {p.price}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href={waLink(
                      selected
                        ? `Hello Calmcorner, I'm interested in ${estate.name} (${selected.size} — ${selected.price}). Please book an inspection.`
                        : estate.whatsappMessage || `Hello Calmcorner, I'm interested in ${estate.name}.`
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-whatsapp"
                  >
                    Book Inspection
                  </a>
                  <Link to="/portal" className="btn btn-outline-dark">
                    <ShoppingBag className="w-4 h-4" />
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Property highlights */}
      {highlights.length > 0 && (
        <section className="py-20 md:py-24 bg-stone">
          <div className="container-custom">
            <Reveal>
              <span className="eyebrow">What's included</span>
              <h2 className="mt-3.5 mb-10 text-3xl md:text-4xl">Property Highlights</h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {highlights.map((h, i) => {
                const Icon = ICONS[h.icon] || CheckCircle2
                return (
                  <Reveal delay={i * 0.05} key={h.label}>
                    <div className="flex items-center gap-3 rounded-xl border border-line bg-white p-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-lime-soft text-lime-deep">
                        <Icon className="h-5 w-5" strokeWidth={1.8} />
                      </span>
                      <span className="text-sm font-semibold text-ink">{h.label}</span>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* About this estate + map */}
      <section className="py-20 md:py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <Reveal>
              <span className="eyebrow">About this estate</span>
              <h2 className="mt-3.5 mb-5 text-3xl md:text-4xl">Why {estate.name}?</h2>
              <p className="text-muted text-lg mb-6">{estate.description || estate.blurb}</p>
              <a
                href={waLink(estate.whatsappMessage || `Hello Calmcorner, I'd like more details on ${estate.name}.`)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-bold text-lime-deep hover:text-lime transition-colors"
              >
                Ask us anything on WhatsApp →
              </a>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-2xl border border-line h-80">
                <iframe
                  title="map"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(estate.mapQuery)}&output=embed`}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CTABand
        title={`Ready to make ${estate.name} yours?`}
        subtitle="Talk to our team on WhatsApp — no pressure, just clarity."
        whatsappMessage={estate.whatsappMessage || `Hello Calmcorner, I'm interested in ${estate.name}. Please send me more information.`}
      />
    </>
  )
}
