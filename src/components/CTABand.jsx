import Reveal from './Reveal'
import { waLink } from '../siteConfig'

/**
 * The bold, boxed CTA band — a lime section with an inset frosted card
 * containing the heading/subtext and a button. Used at the bottom of
 * every page for a consistent, high-contrast final call to action.
 *
 * Props:
 *  - title: the bold heading
 *  - subtitle: supporting line under the heading
 *  - buttonLabel: button text (defaults to "Chat on WhatsApp")
 *  - whatsappMessage: optional pre-filled WhatsApp message
 *  - to: optional internal link — if provided, the button links there
 *    instead of opening WhatsApp
 */
export default function CTABand({
  title = 'Ready to secure your next property?',
  subtitle = "Let's help you find the perfect property with confidence.",
  buttonLabel = 'Chat on WhatsApp',
  whatsappMessage,
  to,
}) {
  return (
    <section className="bg-lime py-16 md:py-20">
      <div className="container-custom">
        <Reveal>
          <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-white/20 bg-white/10 px-8 py-10 text-center backdrop-blur-sm md:flex-row md:text-left">
            <div>
              <h2 className="text-3xl font-bold text-ink md:text-4xl">{title}</h2>
              <p className="mt-2 text-ink/75">{subtitle}</p>
            </div>

            {to ? (
              <a href={to} className="btn btn-whatsapp shrink-0">{buttonLabel}</a>
            ) : (
              <a
                href={waLink(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp shrink-0"
              >
                {buttonLabel}
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
