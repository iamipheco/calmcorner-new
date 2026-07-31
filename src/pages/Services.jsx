import Reveal from '../components/Reveal'
import PageHero from '../components/PageHero'
import ServicesSection from '../components/ServicesSection'
import Testimonials from '../components/Testimonials'
import { waLink } from '../siteConfig'

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Your Property Journey starts here"
        description="Explore our complete range of real estate services, designed to help you buy, build, invest, and manage with confidence."
        dividerFill="#F6FAEF"
      />

      <ServicesSection />

      <Testimonials dividerFill="#8CD300" />

      <section className="bg-lime text-ink py-16 md:py-20">
        <div className="container-custom flex flex-wrap items-center justify-between gap-8">
          <Reveal>
            <h2 className="text-ink mb-1.5">Not sure which service fits?</h2>
            <p className="text-ink/75 font-semibold">Tell us what you&rsquo;re trying to do — we&rsquo;ll point you the right way.</p>
          </Reveal>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">Chat on WhatsApp</a>
        </div>
      </section>
    </>
  )
}
