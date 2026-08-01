import { motion } from "framer-motion";
import {
  MessagesSquare,
  MapPinned,
  BadgeCheck,
  CreditCard,
  KeyRound,
} from "lucide-react";

import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { HOW_WE_WORK } from "../data/about";

const ICONS = {
  message: MessagesSquare,
  map: MapPinned,
  shield: BadgeCheck,
  wallet: CreditCard,
  key: KeyRound,
};

export default function HowWeWork() {
  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-28">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Our Property Purchase Process"
          title="Buying Property Made Simple"
          lede="From your first consultation to property allocation, we guide you through every step with transparency, expert advice, and complete peace of mind."
          center
        />

        {/* Desktop */}

        <div className="relative mt-20 hidden xl:block">
          {/* Connecting Line */}

          <div className="absolute left-0 right-0 top-[74px] h-[2px] bg-gradient-to-r from-lime/30 via-lime to-lime/30" />

          <div className="grid grid-cols-5 gap-6">
            {HOW_WE_WORK.map((step, index) => {
              const Icon = ICONS[step.icon];

              return (
                <Reveal key={step.num} delay={index * 0.08}>
                  <motion.div
                    whileHover={{
                      y: -10,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 18,
                    }}
                    className="
                      group
                      relative
                      rounded-3xl
                      border
                      border-line
                      bg-white
                      p-7
                      shadow-sm
                      transition-all
                      duration-300
                      hover:border-lime
                      hover:shadow-2xl
                    "
                  >
                    {/* Step Number */}

                    <div
                      className="
                        absolute
                        right-6
                        top-5
                        text-6xl
                        font-black
                        leading-none
                        text-slate-100
                        select-none
                      "
                    >
                      {step.num}
                    </div>

                    {/* Icon */}

                    <div
                      className="
                        relative
                        z-10
                        mb-6
                        flex
                        h-16
                        w-16
                        items-center
                        justify-center
                        rounded-2xl
                        bg-lime-soft
                        text-lime-deep
                        transition-all
                        duration-300
                        group-hover:bg-lime
                        group-hover:text-ink
                        group-hover:scale-110
                      "
                    >
                      <Icon className="h-8 w-8" />
                    </div>

                    <h3 className="relative z-10 text-xl font-bold">
                      {step.title}
                    </h3>

                    <p className="relative z-10 mt-4 text-sm leading-7 text-muted">
                      {step.body}
                    </p>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Mobile starts in Part 2 */}
        {/* Mobile Timeline */}

        <div className="relative mt-14 xl:hidden">
          {/* Vertical Line */}

          <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-linear-to-b from-lime via-lime/60 to-lime/20" />

          <div className="space-y-8">
            {HOW_WE_WORK.map((step, index) => {
              const Icon = ICONS[step.icon];

              return (
                <Reveal key={step.num} delay={index * 0.08}>
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    whileHover={{ y: -4 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 18,
                    }}
                    className="
                      relative
                      ml-5
                      flex
                      gap-5
                    "
                  >
                    {/* Timeline Node */}

                    <div className="relative z-20 shrink-0">
                      <div
                        className="
                          flex
                          h-16
                          w-16
                          items-center
                          justify-center
                          rounded-2xl
                          border
                          border-line
                          bg-white
                          shadow-lg
                          transition-all
                          duration-300
                        "
                      >
                        <Icon className="h-7 w-7 text-lime-deep" />
                      </div>

                      {/* Number */}

                      <div
                        className="
                          absolute
                          -right-2
                          -top-2
                          flex
                          h-7
                          w-7
                          items-center
                          justify-center
                          rounded-full
                          bg-lime
                          text-xs
                          font-bold
                          text-ink
                          shadow
                        "
                      >
                        {step.num}
                      </div>
                    </div>

                    {/* Card */}

                    <motion.div
                      whileHover={{
                        y: -4,
                      }}
                      className="
                        group
                        relative
                        flex-1
                        rounded-3xl
                        border
                        border-line
                        bg-white
                        p-6
                        shadow-sm
                        transition-all
                        duration-300
                        hover:border-lime
                        hover:shadow-xl
                      "
                    >
                      {/* Background Number */}

                      <div
                        className="
                          absolute
                          right-5
                          top-3
                          text-5xl
                          font-black
                          leading-none
                          text-slate-100
                          select-none
                        "
                      >
                        {step.num}
                      </div>

                      <h3 className="relative z-10 text-lg font-bold">
                        {step.title}
                      </h3>

                      <p className="relative z-10 mt-3 text-sm leading-7 text-muted">
                        {step.body}
                      </p>
                    </motion.div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
        {/* Decorative Background */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="
              absolute
              -top-40
              -right-40
              h-96
              w-96
              rounded-full
              bg-lime/5
              blur-3xl
            "
          />

          <div
            className="
              absolute
              -bottom-48
              -left-48
              h-112
              w-md
              rounded-full
              bg-lime/5
              blur-3xl
            "
          />
        </div>
      </div>
    </section>
  );
}
