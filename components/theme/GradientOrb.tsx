"use client";

import { motion } from "framer-motion";

export function GradientOrb({
  className,
  size = "md",
  delay = 0,
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  delay?: number;
}) {
  const sizes = {
    sm: "w-48 h-48",
    md: "w-72 h-72",
    lg: "w-96 h-96",
  };

  return (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-20 ${sizes[size]} bg-gradient-primary ${className}`}
      animate={{
        y: [0, -30, 15, 0],
        scale: [1, 1.1, 0.95, 1],
      }}
      transition={{
        duration: 10 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}
