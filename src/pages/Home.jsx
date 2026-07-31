import HeroSlider from '../components/HeroSlider'
import WhoWeAre from '../components/WhoWeAre'
import MissionVision from '../components/MissionVision'
import Leadership from '../components/Leadership'
import ServicesGrid from '../components/ServicesGrid'
import WhyChooseCalmcorner from '../components/WhyChooseCalmcorner'
import FeaturedProperties from '../components/FeaturedProperties'
import Testimonials from '../components/Testimonials'
import CTABand from '../components/CTABand'

export default function Home() {
  return (
    <>
      {/* 1. Hero Slides — full-screen image + company stats (HeroSlider.jsx) */}
      <HeroSlider />

      {/* 2. Our Featured Properties */}
      <FeaturedProperties dividerFill="#0A1220" />

      {/* 3. Who We Are — 2-column image + text */}
      <WhoWeAre dividerFill="#F4F4F1" />

      {/* 4. Mission & Vision — two cards side by side */}
      <MissionVision dividerFill="#0A1220" />

      {/* 5. Leadership — alternating photo/text rows */}
      <Leadership dividerFill="#F6FAEF" />

      {/* 6. Our Services — light mint background, simple icon cards */}
      <ServicesGrid dividerFill="#0A1220" />

      {/* 7. Why Choose Calmcorner — dark, gold icon cards */}
      <WhyChooseCalmcorner dividerFill="#F7F4EF" />

      {/* 8. Testimonials */}
      <Testimonials dividerFill="#8CD300" />

      {/* 9. Call to Action */}
      <CTABand />

      {/* 10. Footer is global — rendered by App.jsx */}
    </>
  )
}
