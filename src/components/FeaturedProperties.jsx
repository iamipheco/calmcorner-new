import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FileCheck2,
  ScrollText,
  WalletCards,
  Mountain,
  Route,
  Droplets,
  Zap,
  ShieldCheck,
  Rocket,
  Hammer,
} from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import Watermark from "./Watermark";
import WaveDivider from "./WaveDivider";
import { FEATURED_ESTATES } from "../data/estates";
import { waLink } from "../siteConfig";

const icons = {
  survey: FileCheck2,
  deed: ScrollText,
  payment: WalletCards,
  land: Mountain,
  road: Route,
  water: Droplets,
  power: Zap,
  security: ShieldCheck,
  instant: Rocket,
  build: Hammer,
};

export default function FeaturedProperties({ dividerFill }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef();

  useEffect(() => {
    if (paused || FEATURED_ESTATES.length < 2) return;
    timer.current = setInterval(
      () => setActive((i) => (i + 1) % FEATURED_ESTATES.length),
      6000,
    );
    return () => clearInterval(timer.current);
  }, [paused]);

  const estate = FEATURED_ESTATES[active];
  const highlights = (estate.highlights || []).slice(0, 4);

  return (
    <section className="relative bg-white py-6 pb-20 lg:py-16 overflow-hidden">
      <Watermark position="top-right" />
      <div className="container-custom">
        <SectionHeading
          eyebrow="Featured Investment"
          title="Discover Our Latest Estates"
          lede="Discover secure property investments backed by transparency and peace of mind."
        />

        <div
          className="w-full lg:px-8 xl:px-16"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Reveal>
            <div className="overflow-hidden rounded-[30px] border border-line bg-white shadow-[0_25px_70px_rgba(0,0,0,.12)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={estate.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.45 }}
                  className="grid grid-cols-1 lg:grid-cols-[45%_55%]"
                >
                  <div className="relative h-72 sm:h-96 lg:h-180 overflow-hidden bg-neutral-100">
                    <img
                      src={estate.image}
                      alt={estate.name}
                      className="h-full w-full object-cover object-top transition duration-700 hover:scale-[1.02]"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-lime px-4 py-2 text-xs font-bold uppercase">
                      {estate.tag}
                    </span>
                  </div>
                  <div className="flex justify-center flex-col p-8 lg:p-16 bg-white lg:min-h-180">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-lime-deep">
                      {estate.area || estate.location}
                    </p>

                    <h2 className="mt-4 text-2xl sm:text-5xl lg:text-6xl font-bold">
                      {estate.name}
                    </h2>

                    <div className="mt-4 text-sm space-y-2">
                      {highlights.map((item) => {
                        const Icon = icons[item.icon] || FileCheck2;
                        return (
                          <div
                            key={item.label}
                            className="flex items-center gap-3"
                          >
                            <Icon className="h-5 w-5 text-lime" />
                            <span>{item.label}</span>
                          </div>
                        );
                      })}
                    </div>
                    {estate.price && (
                      <div className="mt-8 rounded-2xl border border-line bg-stone-50 p-6">
                        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
                          Starting Price
                        </span>

                        <div className="mt-3 flex flex-wrap items-end gap-4">
                          {estate.originalPrice && (
                            <span className="text-lg sm:text-2xl text-muted line-through">
                              {estate.originalPrice}
                            </span>
                          )}

                          <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-lime-deep">
                            {estate.price}
                          </span>
                        </div>

                        <p className="mt-3 text-sm text-muted">
                          Flexible payment plans available.
                        </p>
                      </div>
                    )}

                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                      <a
                        href={waLink(estate.whatsappMessage)}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-whatsapp w-full sm:w-auto"
                      >
                        Book Inspection
                      </a>

                      <Link
                        to={`/properties/${estate.slug}`}
                        className="btn btn-lime w-full sm:w-auto"
                      >
                        View Estate Details →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>

          <div className="mt-8 flex justify-center gap-3">
            {FEATURED_ESTATES.map((e, i) => (
              <button
                key={e.slug}
                onClick={() => setActive(i)}
                className={
                  i === active
                    ? "h-1.5 w-16 rounded-full bg-lime"
                    : "h-1.5 w-8 rounded-full bg-neutral-300"
                }
              />
            ))}
          </div>
        </div>
      </div>
      <WaveDivider fill={dividerFill} />
    </section>
  );
}
