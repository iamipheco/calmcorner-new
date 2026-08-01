import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Home,
  Building2,
  KeyRound,
  Hammer,
  Lightbulb,
  Handshake,
  TrendingUp,
} from "lucide-react";
import Reveal from "./Reveal";
import WaveDivider from "./WaveDivider";
import Watermark from "./Watermark";
import { SERVICES, SERVICES_INTRO } from "../data/services";
import servicesImg from "../assets/services.jpg";

const ICONS = {
  home: Home,
  building: Building2,
  key: KeyRound,
  hammer: Hammer,
  lightbulb: Lightbulb,
  handshake: Handshake,
  trending: TrendingUp,
};

export default function ServicesSection({ showMoreLink = false, dividerFill }) {
  return (
    <section className="relative bg-mist py-24 md:py-28 overflow-hidden">
      <Watermark position="top-right" />
      <div className="container-custom relative z-10">
        {/* Image + text intro — same layout as the About page's "Our Story" */}
        <Reveal className="grid md:grid-cols-2 gap-14 md:gap-16 items-center mb-20 md:mb-24">
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

        {/* Service cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon];
            return (
              <Reveal delay={i * 0.06} key={s.title}>
                <div className="group relative flex h-full flex-col rounded-2xl border border-line bg-white p-7 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-lime-deep/40 hover:shadow-xl">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-13 w-13 items-center justify-center rounded-xl bg-lime-soft text-lime-deep transition-colors duration-300 group-hover:bg-lime group-hover:text-ink">
                      <Icon className="h-6 w-6" strokeWidth={1.8} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wide text-lime-deep">
                      {s.tag}
                    </span>
                  </div>

                  <h3 className="text-lg mb-2.5">{s.title}</h3>
                  <p className="text-muted text-sm mb-5">{s.description}</p>

                  <ul className="grid gap-2 mb-6">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-slate">
                        <CheckCircle2 className="w-3.5 h-3.5 text-lime-deep shrink-0 mt-0.5" strokeWidth={2} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={s.cta.to}
                    className="mt-auto inline-flex items-center gap-2 text-lime-deep font-bold text-sm hover:gap-3 transition-all"
                  >
                    {s.cta.label} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </Reveal>
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
