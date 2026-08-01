import PageHero from '../components/PageHero'
import ServicesSection from '../components/ServicesSection'
import Testimonials from '../components/Testimonials'
import CTABand from '../components/CTABand'

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


      <CTABand
        title="Not sure which service fits?"
        subtitle="Tell us what you're trying to do — we'll point you the right way."
      />
    </>
  )
}
