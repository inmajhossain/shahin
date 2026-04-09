"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with Next.js, Stripe integration, and real-time inventory management.",
    tags: ["Next.js", "Stripe", "PostgreSQL", "Tailwind"],
    color: "from-violet-500 to-purple-500",
  },
  {
    title: "AI Chat Application",
    description:
      "Real-time AI-powered chat application with streaming responses and multi-model support.",
    tags: ["React", "WebSocket", "OpenAI API", "Prisma"],
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Portfolio CMS",
    description:
      "Custom headless CMS for managing creative portfolios with visual editing capabilities.",
    tags: ["Next.js", "GraphQL", "MongoDB", "Sanity"],
    color: "from-amber-500 to-orange-500",
  },
  {
    title: "Task Management App",
    description:
      "Collaborative task management with drag-and-drop, real-time updates, and team analytics.",
    tags: ["TypeScript", "React", "Node.js", "Socket.io"],
    color: "from-emerald-500 to-green-500",
  },
  {
    title: "Weather Dashboard",
    description:
      "Interactive weather visualization with 7-day forecasts, maps, and location-based alerts.",
    tags: ["React", "D3.js", "Weather API", "Framer Motion"],
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "SaaS Analytics Tool",
    description:
      "Business analytics dashboard with custom charts, CSV exports, and automated reporting.",
    tags: ["Next.js", "Chart.js", "Tailwind", "Vercel"],
    color: "from-teal-500 to-cyan-500",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function Projects() {
  return (
    <section id="projects" className="py-20 sm:py-28 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeading subtitle="Some of the things I&apos;ve built and shipped.">
          Featured Projects
        </SectionHeading>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              variants={item}
              whileHover={{ y: -8 }}
              className="group relative p-6 rounded-2xl bg-surface border border-primary/10 hover:border-primary/30 transition-all duration-300 overflow-hidden"
            >
              {/* Gradient accent */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.color} opacity-50 group-hover:opacity-100 transition-opacity`}
              />

              {/* Decorative icon */}
              <div className="w-12 h-12 rounded-lg bg-surface-hover border border-primary/10 flex items-center justify-center mb-4 group-hover:border-primary/30 transition-colors">
                <span className="text-lg font-bold text-gradient">0{i + 1}</span>
              </div>

              <h3 className="text-xl font-semibold text-text-heading mb-2 group-hover:text-gradient transition-all">
                {project.title}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary-light border border-primary/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
