// Properties.jsx
// Updated version based on the current project structure.
// Replace your existing src/pages/Properties.jsx with this file if desired.

import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import PageHero from '../components/PageHero'
import EstateCard from '../components/EstateCard'
import { OTHER_ESTATES } from '../data/estates'
import { waLink, SITE } from '../siteConfig'

export default function Properties() {
  return (
    <>
      <PageHero
        eyebrow="Our Estates"
        title="Explore Our Estates"
        description="Discover our flagship development and upcoming investment opportunities across Delta State."
        dividerFill="#FFFFFF"
      />

      <section className="py-24 md:py-28">
        <div className="container-custom">
          <Reveal>
            <div className="grid md:grid-cols-[1.1fr_1fr] overflow-hidden rounded-3xl border border-line bg-white shadow-xl">
              <div className="relative min-h-[420px] overflow-hidden">
                <img
                  src="/images/properties/calmvilla-flyer.jpg"
                  alt="CalmVilla Residence"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 to-transparent" />
                <span className="absolute left-6 top-6 rounded-full bg-lime px-4 py-2 text-xs font-bold uppercase">
                  Now Selling
                </span>
              </div>

              <div className="flex flex-col justify-center p-10 md:p-12">
                <span className="eyebrow">Atuma-Iga, Delta State</span>
                <h2 className="mt-3 text-3xl font-bold">CalmVilla Residence</h2>

                <p className="mt-5 text-muted text-lg">
                  Secure premium residential plots in one of Delta State's
                  fastest-growing investment corridors.
                </p>

                <ul className="feature-list mt-8 grid gap-3">
                  <li>Registered Survey</li>
                  <li>Deed of Assignment</li>
                  <li>Dry Land</li>
                  <li>Flexible Payment Plan</li>
                </ul>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href={waLink("Hello Calmcorner, I'm interested in CalmVilla Residence.")}
                    className="btn btn-whatsapp"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book Inspection
                  </a>

                  <a href="#enquire" className="btn btn-outline-dark">
                    Send an Enquiry
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
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

      <section id="enquire" className="bg-white py-24">
        <div className="container-custom">
          <Reveal>
            <h2>Need more information?</h2>
            <p className="mt-4 text-muted">
              Contact us directly on WhatsApp for current pricing,
              documentation and availability.
            </p>

            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp mt-8"
            >
              WhatsApp: {SITE.phones[0].display}
            </a>
          </Reveal>
        </div>
      </section>
    </>
  )
}
