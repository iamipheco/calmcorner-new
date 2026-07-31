import { Eye, Flag } from "lucide-react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import WaveDivider from "./WaveDivider";

const CARDS = [
  {
    icon: Flag,
    label: "Our Mission",
    body:
      "To provide trusted, transparent, and value-driven real estate solutions that empower individuals, families, businesses, and investors to achieve their property goals with confidence, through integrity, innovation, and customer-focused service at every step.",
  },
  {
    icon: Eye,
    label: "Our Vision",
    body:
      "To become one of Nigeria's most trusted, innovative, and respected real estate companies, recognized for delivering excellence in property sales, development, construction, consultancy, and investment solutions.",
  },
];

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
  },
  show: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: i * 0.15,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function MissionVision({ dividerFill }) {
  return (
    <section className="relative overflow-hidden bg-stone py-20 pb-32">

      <div className="absolute -top-20 left-0 w-80 h-80 rounded-full bg-lime-300/15 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-lime-200/15 blur-[150px]" />

      <div className="container-custom relative z-10">

        <SectionHeading
          eyebrow="What drives us"
          title="Mission & Vision"
          center
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid gap-8 mt-14 max-w-5xl mx-auto md:grid-cols-2"
        >
          {CARDS.map((card, i) => (
            <motion.div
              key={card.label}
              custom={i}
              variants={cardVariants}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
              className="group relative overflow-hidden rounded-3xl border border-line bg-white p-10 shadow-sm transition-all duration-500 hover:border-lime-300 hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-lime-50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <motion.div
                whileHover={{
                  rotate: 10,
                  scale: 1.12,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                }}
                className="relative z-10 mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-lime-soft text-lime-deep"
              >
                <card.icon
                  className="h-7 w-7"
                  strokeWidth={1.8}
                />
              </motion.div>

              <h3 className="relative z-10 mb-5 text-center text-2xl font-semibold">
                {card.label}
              </h3>

              <p className="relative z-10 text-center leading-8 text-muted">
                {card.body}
              </p>

              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 90 }}
                transition={{
                  delay: 0.5 + i * 0.2,
                  duration: 0.8,
                }}
                className="mx-auto mt-8 h-1 rounded-full bg-lime-500"
              />
            </motion.div>
          ))}
        </motion.div>

      </div>

      {dividerFill && <WaveDivider fill={dividerFill} />}
    </section>
  );
}