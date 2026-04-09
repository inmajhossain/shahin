"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const stats = [
  { label: "Years Experience", value: "3+" },
  { label: "Projects Completed", value: "15+" },
  { label: "Happy Clients", value: "10+" },
  { label: "Technologies", value: "20+" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function About() {
  return (
    <section id="about" className="py-20 sm:py-28 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeading subtitle="Get to know me a little better.">
          About Me
        </SectionHeading>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Image */}
          <motion.div
            variants={item}
            className="relative flex justify-center"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80">
              <div className="absolute inset-0 rounded-2xl bg-gradient-primary blur-xl opacity-30 animate-pulse-glow" />
              <div className="relative w-full h-full rounded-2xl bg-surface border border-primary/20 flex items-center justify-center overflow-hidden">
                <span className="text-7xl sm:text-8xl font-bold text-gradient-shimmer select-none">
                  IHS
                </span>
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div variants={item} className="space-y-4 sm:space-y-6">
            <p className="text-text-muted leading-relaxed text-base sm:text-lg">
              I&apos;m <span className="text-text-heading font-medium">Inmaj Hossain Shahin</span>, a passionate full-stack
              developer based in Bangladesh. I love creating digital experiences that are
              not only functional but also visually stunning and intuitive.
            </p>
            <p className="text-text-muted leading-relaxed text-base sm:text-lg">
              My journey in web development started with a curiosity about how websites
              work, and it quickly turned into a career where I work with technologies
              like Next.js, React, TypeScript, Node.js, and more.
            </p>
            <p className="text-text-muted leading-relaxed text-base sm:text-lg">
              When I&apos;m not coding, you&apos;ll find me exploring new tech trends,
              contributing to open source, or enjoying a good cup of coffee while sketching
              UI ideas.
            </p>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-16 sm:mt-20"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-xl bg-surface border border-primary/10 text-center group hover:border-primary/30 transition-colors"
            >
              <div className="text-3xl sm:text-4xl font-bold text-gradient-shimmer mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-text-muted">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
