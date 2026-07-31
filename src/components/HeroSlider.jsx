import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ShieldCheck, Headphones, FileCheck2, Wallet } from 'lucide-react'
import WaveDivider from './WaveDivider'
import TypewriterHeading from './TypewriterHeading'
import StatCard from './StatCard'
import { waLink } from '../siteConfig'

// Drop real photos into /public/images/hero/ named slide-1.jpg, slide-2.jpg,
// slide-3.jpg (see the README in that folder). Until then, each slide falls
// back to a brand-colored gradient so the layout still looks intentional.
const SLIDES = [
  {
    image: "/images/hero/slide-1.jpg",
    eyebrow: "Welcome to Calmcorner Homes & Properties Ltd",
    heading: "Secure Today. Build Tomorrow. Invest with Confidence.",
    lede:
      "Own genuine, strategically located land and premium real estate with complete peace of mind. We help individuals, families, and investors make smart property decisions backed by integrity, transparency, and lasting value.",
    primary: { label: "Explore Our Properties", to: "/properties" },
    secondary: { label: "Chat on WhatsApp", href: waLink() },
  },
  {
    image: "/images/hero/slide-2.jpg",
    eyebrow: "Our Signature Estate",
    heading: "Discover CalmVilla Residence, Atuma-Iga, Delta State.",
    lede:
      "Experience the future of modern community living in one of Delta State's fastest-growing locations. Secure your plot today and become part of a thriving neighbourhood positioned for long-term growth and excellent returns.",
    primary: { label: "View CalmVilla Residence", to: "/properties" },
    secondary: {
      label: "Make an Enquiry",
      href: waLink("Hello Calmcorner, I'm interested in CalmVilla Residence."),
    },
  },
  {
    image: "/images/hero/slide-3.jpg",
    eyebrow: "Beyond Land Sales",
    heading: "From Empty Land to Your Dream Property.",
    lede:
      "Whether you're building your family home, developing an investment property, or planning a commercial project, our experienced team provides end-to-end real estate solutions, from land acquisition and documentation to design, construction, and property development.",
    primary: { label: "Our Services", to: "/services" },
    secondary: { label: "Contact Us", to: "/contact" },
  },
];

const FALLBACK_GRADIENTS = [
  'bg-linear-to-br from-ink via-ink to-[#1c2b17]',
  'bg-linear-to-br from-ink via-[#16240f] to-ink-soft',
  'bg-linear-to-br from-ink-soft via-ink to-[#132018]',
]

export default function HeroSlider() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    if (paused) return undefined
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length)
    }, 7000)
    return () => clearInterval(timerRef.current)
  }, [paused])

  const slide = SLIDES[index]

  function goTo(i) {
    setIndex(i)
  }
  function prev() {
    setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length)
  }
  function next() {
    setIndex((i) => (i + 1) % SLIDES.length)
  }

  return (
    <section
      className="relative text-white overflow-hidden pt-16 md:pt-24 pb-24 min-h-screen flex items-end"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background image layer, crossfades between slides */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={`absolute inset-0 bg-cover bg-center ${FALLBACK_GRADIENTS[index]}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/70 to-ink/30" />
        <div className="absolute inset-0 bg-ink/20" />
      </div>

      <div className="container-custom relative z-10 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="max-w-2xl min-h-60 md:min-h-67.5"
          >
            <span className="eyebrow eyebrow-light text-[10px] md:text-xs">{slide.eyebrow}</span>
            <TypewriterHeading
              text={slide.heading}
              className="text-white mt-3 mb-5 text-4xl md:text-6xl leading-[1.1]"
            />
            <p className="text-white/70 md:text-lg mb-9 max-w-[58ch]">{slide.lede}</p>
            <div className="flex flex-wrap gap-4">
              {slide.primary.to ? (
                <Link to={slide.primary.to} className="btn btn-lime">{slide.primary.label}</Link>
              ) : (
                <a href={slide.primary.href} target="_blank" rel="noopener noreferrer" className="btn btn-lime">{slide.primary.label}</a>
              )}
              {slide.secondary.to ? (
                <Link to={slide.secondary.to} className="btn btn-outline-light">{slide.secondary.label}</Link>
              ) : (
                <a href={slide.secondary.href} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light">{slide.secondary.label}</a>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Arrows + dots */}
        <div className="flex items-center gap-5 mt-16 md:mt-20">
          <div className="flex gap-2">
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="w-9 h-9 rounded-full border border-white/25 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              className="w-9 h-9 rounded-full bg-ink flex items-center justify-center hover:bg-ink-soft transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" /></svg>
            </button>
          </div>
          <div className="flex items-center gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={s.heading}
                onClick={() => goTo(i)}
                aria-label={`Show slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? 'w-9 bg-lime' : 'w-2 bg-white/25 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stat strip — honest company facts, not tied to the slide rotation.
            (Swapped out for figures like "years in business" or "clients served"
            since the company only just launched — see chat for context.) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/15 mt-10 pt-9">
          <StatCard icon={ShieldCheck} value="100%" label="Verified Properties" />
          <StatCard icon={Headphones} value="24/7" label="Customer Support" />
          <StatCard icon={FileCheck2} value="End-to-End" label="Documentation" />
          <StatCard icon={Wallet} value="Flexible" label="Payment Plans" />
        </div>
      </div>

      <WaveDivider fill="#FFFFFF" />
    </section>
  )
}
