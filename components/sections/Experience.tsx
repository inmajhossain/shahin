"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const experiences = [
  {
    role: "Senior Frontend Developer",
    company: "TechNova Ltd.",
    period: "2024 - Present",
    description:
      "Leading the frontend team in building scalable Next.js applications. Improved site performance by 40% through code splitting and caching strategies.",
  },
  {
    role: "Full-Stack Developer",
    company: "CloudSync Inc.",
    period: "2023 - 2024",
    description:
      "Developed and maintained RESTful APIs and React-based dashboards. Implemented real-time data sync using WebSockets and reduced API response times by 30%.",
  },
  {
    role: "Junior Developer",
    company: "WebCraft Studio",
    period: "2022 - 2023",
    description:
      "Built responsive websites and web applications for diverse clients. Gained hands-on experience with modern JavaScript frameworks and agile workflows.",
  },
  {
    role: "Freelance Developer",
    company: "Self-Employed",
    period: "2021 - 2022",
    description:
      "Delivered custom web solutions for startups and small businesses. Specialized in landing pages, e-commerce sites, and portfolio websites.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

export function Experience() {
  return (
    <section id="experience" className="py-20 sm:py-28 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionHeading subtitle="My professional journey so far.">
          Experience
        </SectionHeading>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Timeline line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-primary origin-top opacity-20"
          />

          <div className="relative space-y-8 sm:space-y-12">
            {experiences.map((exp, i) => (
              <motion.div key={i} variants={item} className="flex gap-4 sm:gap-8 ml-4 sm:ml-8 group">
                {/* Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.15 }}
                  className="relative mt-2"
                >
                  <div className="w-3 h-3 rounded-full bg-primary/60 group-hover:bg-primary transition-colors" />
                  <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping group-hover:animate-pulse" />
                </motion.div>

                {/* Card */}
                <div className="flex-1 p-6 rounded-xl bg-surface border border-primary/10 hover:border-primary/30 transition-colors mb-8">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-text-heading">
                      {exp.role}
                    </h3>
                    <span className="text-sm text-primary-light font-mono">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-primary/70 text-sm mb-3">{exp.company}</p>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
