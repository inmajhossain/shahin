"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="py-8 px-4 border-t border-primary/10"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-text-muted">
          &copy; {new Date().getFullYear()} Inmaj Hossain Shahin. All rights reserved.
        </p>
        <p className="text-xs text-text-muted/50">
          Built with Next.js, TypeScript &amp; Tailwind CSS
        </p>
      </div>
    </motion.footer>
  );
}
