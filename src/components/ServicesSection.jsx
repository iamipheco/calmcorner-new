import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Reveal from "./Reveal";
import WaveDivider from "./WaveDivider";
import Watermark from "./Watermark";
import { SERVICES, SERVICES_INTRO } from "../data/services";
import servicesImg from "../assets/services.jpg";

export default function ServicesSection({
  showMoreLink = false,
  showRowCta = true,
  dividerFill,
}) {
  return (
    <section className="relative bg-mist py-24 md:py-28 overflow-hidden">
      <Watermark position="top-right" />
      <div className="container-custom relative z-10">
        {/* Image + text intro — same layout as the About page's "Our Story" */}
        <Reveal className="grid md:grid-cols-2 gap-14 md:gap-16 items-center mb-24 md:mb-28">
          <div className="relative rounded-2xl overflow-hidden border border-line shadow-xs h-90 md:h-130 bg-ink flex items-center justify-center">
            <img
              src={servicesImg}
              alt="Our Services"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="inline-block bg-lime text-ink text-xs font-bold uppercase tracking-wide px-4 py-2 rounded-full mb-5">
              Our Services
            </span>
            <h2 className="text-ink mb-5 text-2xl md:text-5xl">
              Real estate solutions built around you
            </h2>
            <p className="text-muted text-lg">{SERVICES_INTRO}</p>
          </div>
        </Reveal>

        <div className="grid gap-20 md:gap-28">
          {SERVICES.map((s, i) => {
            const reverse = i % 2 === 1;
            return (
              <div
                key={s.num}
                className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}
              >
                <Reveal>
                  <span className="eyebrow mb-4">
                    {s.num} {s.tag}
                  </span>
                  <h3 className="text-ink text-2xl md:text-3xl mb-4">
                    {s.title}
                  </h3>
                  <p className="text-muted text-lg mb-5">{s.body}</p>
                  {s.features && (
                    <ul className="grid gap-2.5 mb-6">
                      {s.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2.5 text-sm text-slate"
                        >
                          <CheckCircle2
                            className="w-4 h-4 text-lime-deep shrink-0 mt-0.5"
                            strokeWidth={2}
                          />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                  {showRowCta && (
                    <Link
                      to={s.cta.to}
                      className="inline-flex items-center gap-2 text-lime-deep font-bold text-sm hover:gap-3 transition-all"
                    >
                      {s.cta.label} <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </Reveal>
                <Reveal delay={0.1}>
                  <div className="group relative h-64 md:h-80 rounded-2xl overflow-hidden border border-line shadow-xs">
                    {s.image ? (
                      <img
                        src={s.image}
                        alt={s.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-lime-soft flex items-center justify-center">
                        <img
                          src={servicesImg}
                          alt="Our Services"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>

        {showMoreLink && (
          <Reveal className="text-center mt-20">
            <Link to="/services" className="btn btn-lime">
              More Services <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        )}
      </div>
      {dividerFill && <WaveDivider fill={dividerFill} />}
    </section>
  );
}
