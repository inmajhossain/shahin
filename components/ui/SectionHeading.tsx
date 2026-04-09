"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function SectionHeading({
  children,
  subtitle,
}: {
  children: string;
  subtitle?: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12 sm:mb-16"
    >
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-text-heading">
        {children}
      </h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-20 h-1 mx-auto rounded-full bg-gradient-primary"
      />
      {subtitle && <p className="mt-4 text-text-muted max-w-2xl mx-auto">{subtitle}</p>}
    </motion.div>
  );
}
