// Properties.jsx
// Updated version based on the current project structure.
// Replace your existing src/pages/Properties.jsx with this file if desired.

import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import PageHero from '../components/PageHero'
import FeaturedProperties from '../components/FeaturedProperties'
import EstateCard from '../components/EstateCard'
import CTABand from '../components/CTABand'
import { OTHER_ESTATES } from '../data/estates'

export default function Properties() {
  return (
    <>
      <PageHero
        eyebrow="Our Estates"
        title="Explore Our Estates"
        description="Discover our flagship development and upcoming investment opportunities across Delta State."
        dividerFill="#FFFFFF"
      />

      <FeaturedProperties />

      <section className="relative pb-24 overflow-hidden">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Coming Next"
            title="More Estates on the Way"
            lede="More verified developments will be added as Calmcorner expands."
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {OTHER_ESTATES.map((estate, i) => (
              <Reveal key={estate.slug} delay={i * 0.08}>
                <EstateCard {...estate} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Need more information?"
        subtitle="Contact us directly on WhatsApp for current pricing, documentation and availability."
        whatsappMessage="Hello Calmcorner, I'd like more information on your available estates."
      />
    </>
  )
}
