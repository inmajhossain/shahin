"use client";

import { motion } from "framer-motion";
import { GradientOrb } from "@/components/theme/GradientOrb";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4"
    >
      <GradientOrb className="-top-20 -left-20" size="lg" delay={0} />
      <GradientOrb className="bottom-20 right-0" size="md" delay={2} />
      <GradientOrb className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size="sm" delay={4} />

      {/* Floating particles */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/40"
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.8, 0],
            x: [0, (i % 2 === 0 ? 1 : -1) * 20],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8,
          }}
          style={{
            left: `${15 + ((i * 17) % 70)}%`,
            top: `${50 + ((i * 13) % 30)}%`,
          }}
        />
      ))}

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center max-w-4xl mx-auto"
      >
        {/* Greeting */}
        <motion.div variants={item} className="mb-4">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm bg-primary/10 text-primary-light border border-primary/20 font-medium">
            &#128075; Hello, I&apos;m
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={item}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
        >
          <span className="text-gradient-shimmer">Inmaj</span>{" "}
          <span className="text-text-heading">Hossain</span>{" "}
          <span className="text-gradient-shimmer">Shahin</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={item}
          className="text-lg sm:text-xl lg:text-2xl text-text-muted max-w-2xl mx-auto mb-4"
        >
          Full-Stack Developer &amp; Creative Technologist
        </motion.p>

        <motion.p
          variants={item}
          className="text-base sm:text-lg text-text-muted/70 max-w-xl mx-auto mb-10"
        >
          I build beautiful, performant web experiences with modern technologies.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full bg-gradient-primary text-white font-semibold text-glow-primary transition-shadow hover:shadow-lg hover:shadow-primary/30"
          >
            View My Work
          </motion.a>
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full border border-primary/30 text-text-heading font-semibold hover:bg-primary/10 transition-colors"
          >
            Get In Touch
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={item}
          className="absolute bottom-[-80px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-text-muted text-sm">Scroll</span>
          <motion.div
            className="w-5 h-8 rounded-full border-2 border-text-muted/30 flex items-start justify-center p-1"
            animate={{ y: [0, 4, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="w-1 h-2 rounded-full bg-primary animate-scroll-indicator"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
