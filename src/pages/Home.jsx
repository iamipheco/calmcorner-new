import HeroSlider from '../components/HeroSlider'
import WhoWeAre from '../components/WhoWeAre'
import MissionVision from '../components/MissionVision'
import Leadership from '../components/Leadership'
import ServicesGrid from '../components/ServicesGrid'
import WhyChooseCalmcorner from '../components/WhyChooseCalmcorner'
import FeaturedProperties from '../components/FeaturedProperties'
import Testimonials from '../components/Testimonials'
import Reveal from '../components/Reveal'
import { waLink } from '../siteConfig'

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
      <WhyChooseCalmcorner />

      {/* 8. Testimonials */}
      <Testimonials dividerFill="#8CD300" />

      {/* 9. Call to Action */}
      <section className="bg-lime py-16 md:py-20">
        <div className="container-custom">
          <Reveal>
            <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-white/20 bg-white/10 px-8 py-10 text-center backdrop-blur-sm md:flex-row md:text-left">
              <div>
                <h2 className="text-3xl font-bold text-ink md:text-4xl">
                  Ready to secure your next property?
                </h2>
                <p className="mt-2 text-ink/75">
                  Let's help you find the perfect property with confidence.
                </p>
              </div>

              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp shrink-0"
              >
                Chat on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 10. Footer is global — rendered by App.jsx */}
    </>
  )
}
