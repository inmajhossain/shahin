"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const stats = [
  ["12+", "Live projects"],
  ["03+", "Years crafting"],
  ["100%", "Responsive"],
  ["Dhaka", "Based in"],
];

export function About() {
  return (
    <section id="about" className="relative px-5 py-28 lg:px-8 lg:py-40">
      <motion.aside
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Section 1 of 4"
        className="pointer-events-none absolute right-1 top-1/2 z-20 hidden -translate-y-1/2 md:flex lg:right-4 xl:right-6"
      >
        <div className="flex h-72 w-12 flex-col items-center rounded-full border border-white/15 bg-black/90 py-4 shadow-[0_18px_60px_rgba(0,0,0,.7)] backdrop-blur-xl lg:h-80 lg:w-14 lg:py-5">
          <span className="font-mono text-[11px] font-bold tracking-wider text-primary">01</span>
          <div className="relative my-3 h-24 w-px overflow-hidden bg-white/10 lg:my-4 lg:h-28">
            <motion.span
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="absolute inset-x-0 top-0 h-1/3 origin-top bg-gradient-to-b from-primary to-primary/20"
            />
          </div>
          <div className="flex flex-col items-center gap-4" aria-hidden="true">
            <span className="relative size-3 rounded-full bg-primary shadow-[0_0_18px_5px_rgba(200,255,61,.3)]">
              <span className="absolute -inset-2 animate-pulse rounded-full border border-primary/25" />
            </span>
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
          </div>
          <span className="mt-auto font-mono text-[10px] tracking-wider text-white/30">04</span>
        </div>
      </motion.aside>
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="01"
          subtitle="I combine clean engineering with a designer's eye—building products that feel effortless, communicate clearly and perform beautifully."
        >
          Beyond the code
        </SectionHeading>

        <div className="grid items-center gap-12 lg:grid-cols-[.85fr_1.15fr]">
          <motion.figure
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="group mx-auto flex w-full max-w-[32rem] flex-col items-center"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-full border-[10px] border-white bg-white shadow-[0_0_0_1px_rgba(255,255,255,.18),0_30px_90px_rgba(139,92,246,.22)] sm:border-[14px]">
              <Image
                src="https://res.cloudinary.com/vlnohbva/image/upload/f_auto,q_auto,w_1200/v1787634765/Cp-74706_copy.jpg"
                alt="Portrait of Inmaj Hossain Shahin"
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-contain object-bottom transition duration-700 ease-out group-hover:scale-[1.025]"
              />
              <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-t from-black/10 via-transparent to-white/10" />
            </div>

            <figcaption className="mt-7 flex w-full items-center justify-between gap-4 px-3">
              <div>
                <span className="eyebrow text-primary">Design × Development</span>
                <div className="mt-2 text-3xl font-black tracking-[-.05em]">Inmaj Shahin</div>
              </div>
              <span className="grid size-12 shrink-0 place-items-center rounded-full border border-white/20 bg-white/5 text-lg">↗</span>
            </figcaption>
          </motion.figure>

          <div>
            <p className="text-2xl font-medium leading-snug tracking-tight text-text-heading sm:text-4xl">
              I create digital experiences where strong visual direction meets reliable, maintainable technology.
            </p>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-text-muted">
              From concept and interface design to frontend motion and backend systems, I care about every detail that makes a product feel intentional.
            </p>
            <div className="mt-12 grid grid-cols-2 border-l border-t border-white/10">
              {stats.map(([value, label]) => (
                <div key={label} className="border-b border-r border-white/10 p-5 sm:p-7">
                  <strong className="block text-3xl text-primary sm:text-4xl">{value}</strong>
                  <span className="mt-2 block text-sm text-text-muted">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
