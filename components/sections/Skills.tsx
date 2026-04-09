"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const skills = [
  { name: "React / Next.js", level: 90, icon: "&#9883;" },
  { name: "TypeScript", level: 88, icon: "&#9881;" },
  { name: "Tailwind CSS", level: 92, icon: "&#9830;" },
  { name: "Node.js", level: 85, icon: "&#9670;" },
  { name: "Python", level: 80, icon: "&#9679;" },
  { name: "PostgreSQL / MongoDB", level: 78, icon: "&#9832;" },
  { name: "Docker / DevOps", level: 72, icon: "&#9776;" },
  { name: "Figma / UI Design", level: 75, icon: "&#9824;" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const ProgressBar = ({ level, delay }: { level: number; delay: number }) => (
  <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: `${level}%` }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay, ease: "easeOut" }}
      className="h-full rounded-full bg-gradient-primary"
    />
  </div>
);

export function Skills() {
  return (
    <section id="skills" className="py-20 sm:py-28 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionHeading subtitle="Technologies and tools I work with.">
          Skills &amp; Tools
        </SectionHeading>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
        >
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              variants={item}
              whileHover={{ scale: 1.03, y: -4 }}
              className="p-5 rounded-xl bg-surface border border-primary/10 hover:border-primary/30 transition-colors group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span
                    className="text-xl opacity-60 group-hover:opacity-100 group-hover:text-primary-light transition-all"
                    dangerouslySetInnerHTML={{ __html: skill.icon }}
                  />
                  <span className="font-medium text-text-heading group-hover:text-gradient transition-all">
                    {skill.name}
                  </span>
                </div>
                <motion.span
                  className="text-sm font-mono text-primary-light"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                >
                  {skill.level}%
                </motion.span>
              </div>
              <ProgressBar level={skill.level} delay={0.2 + i * 0.1} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
