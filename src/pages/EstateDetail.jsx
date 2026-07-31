// EstateDetail.jsx
import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, MapPin, ShoppingBag, CheckCircle2 } from 'lucide-react'
import Reveal from '../components/Reveal'
import { CardRipples } from '../components/Ripples'
import { FEATURED_ESTATES, OTHER_ESTATES } from '../data/estates'
import { waLink } from '../siteConfig'

const ALL_ESTATES = [
  ...FEATURED_ESTATES.map(e => ({
    ...e,
    price: e.price || 'Price on Request',
    features: e.highlights || e.bullets || [],
    mapQuery: e.mapQuery || e.location,
    images: e.images || (e.image ? [e.image] : [])
  })),
  ...OTHER_ESTATES
]

export default function EstateDetail() {
  const { slug } = useParams()
  const estate = ALL_ESTATES.find(e => e.slug === slug)

  const [index, setIndex] = useState(0)

  if (!estate) return <Navigate to="/properties" replace />

  const images = estate.images || []
  const hasGallery = images.length > 1

  return (
    <>
      <section className="py-16 md:py-20">
        <div className="container-custom">
          <Reveal>
            <Link to="/properties" className="inline-flex items-center gap-2 mb-8 text-muted hover:text-ink">
              <ChevronLeft className="w-4 h-4"/>Back to Properties
            </Link>

            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <div className="relative overflow-hidden rounded-3xl h-[480px] bg-neutral-100">
                  {images.length ? (
                    <img src={images[index]} alt={estate.name} className="w-full h-full object-cover"/>
                  ) : (
                    <CardRipples className="w-full h-full opacity-60"/>
                  )}

                  <span className="absolute top-5 left-5 rounded-full bg-lime px-4 py-2 text-xs font-bold">
                    {estate.tag}
                  </span>

                  {hasGallery && (
                    <>
                      <button onClick={()=>setIndex((index-1+images.length)%images.length)} className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-2">
                        <ChevronLeft/>
                      </button>
                      <button onClick={()=>setIndex((index+1)%images.length)} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-2">
                        <ChevronRight/>
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <h1 className="text-4xl font-bold">{estate.name}</h1>

                <p className="mt-3 flex items-center gap-2 text-muted">
                  <MapPin className="w-4 h-4"/>
                  {estate.location}
                </p>

                <p className="mt-6 text-lg text-muted">
                  {estate.description || estate.blurb}
                </p>

                <div className="mt-8 grid gap-3">
                  {(estate.features||[]).map(item=>(
                    <div key={item} className="flex items-center gap-2 rounded-xl border border-line p-3">
                      <CheckCircle2 className="w-5 h-5 text-lime"/>
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href={waLink(estate.whatsappMessage || `Hello Calmcorner, I'm interested in ${estate.name}.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-whatsapp"
                  >
                    Book Inspection
                  </a>

                  <Link to="/portal" className="btn btn-outline-dark">
                    <ShoppingBag className="w-4 h-4"/>
                    Buy Now
                  </Link>
                </div>

                <div className="mt-10 overflow-hidden rounded-2xl border border-line h-72">
                  <iframe
                    title="map"
                    className="w-full h-full border-0"
                    loading="lazy"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(estate.mapQuery)}&output=embed`}
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
