"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const projects = [
  ["Creative", "Creative studio experience", "https://creative-inmaj.vercel.app/", "creative.png"],
  ["Monsieng", "Luxury fashion storefront", "https://monsieng-inmaj.vercel.app/", "monsieng.png"],
  ["Runaway", "Editorial travel concept", "https://runaway-inmaj.vercel.app/", "runaway.png"],
  ["Mbrella", "Clean product experience", "https://mbrella-inmaj.vercel.app/", "mbrella.png"],
  ["Mukul", "Modern brand website", "https://mukul-inmaj.vercel.app/", "mukul.png"],
  ["Rio", "Vibrant web experience", "https://rio-inmaj.vercel.app/", "rio.png"],
  ["Inmaj Archive", "Portfolio archive", "https://inmaj.netlify.app/", "inmaj-netlify.png"],
  ["Nexus", "Future-facing interface", "https://nexus-inmaj.netlify.app/", "nexus.png"],
  ["Banquee", "Digital banking experience", "https://banquee-inmaj.vercel.app/", "banquee.png"],
  ["Lays", "Playful campaign concept", "https://lays-inmaj.netlify.app/", "lays.png"],
  ["Papaya", "Fresh brand landing page", "https://papaya-inmaj.netlify.app/", "papaya.png"],
  ["Endearing", "Warm editorial experience", "https://endearing-inmaj.netlify.app/", "endearing.png"],
  ["Movie", "Cinema discovery platform", "https://movie-inmaj.vercel.app/", "movie.png"],
  ["Web", "Digital showcase", "https://web-inmaj.netlify.app/", "web.png"],
] as const;

export function Projects() {
  return (
    <section id="projects" className="relative isolate z-0 px-3 py-28 sm:px-5 lg:px-8 lg:py-40">
      <div className="mx-auto max-w-[100rem]">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            index="02"
            subtitle="A selection of live interfaces, brand sites and product concepts. Scroll to reveal each experience."
          >
            Selected work
          </SectionHeading>
        </div>

        <div className="relative flex flex-col gap-10 sm:gap-14">
          {projects.map(([name, type, url, image], index) => (
            <motion.a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 150, scale: 0.96, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.12, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 0.995 }}
              style={{ zIndex: index + 1 }}
              className="group sticky top-20 block h-[calc(100vh-6rem)] min-h-[34rem] overflow-hidden rounded-[1.5rem] border border-white/10 bg-surface shadow-[0_-20px_70px_rgba(0,0,0,.45)] sm:top-24 sm:h-[calc(100vh-7rem)] sm:rounded-[2.25rem]"
            >
              <div className="absolute inset-0 overflow-hidden bg-surface-hover">
                <Image
                  src={`/projects/${image}`}
                  alt={`Homepage preview of the ${name} project`}
                  fill
                  sizes="100vw"
                  priority={index === 0}
                  className="object-cover object-top transition duration-1000 ease-out group-hover:scale-[1.025]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/5 to-black/10 opacity-80 transition duration-700 group-hover:opacity-65" />
              </div>

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-6 sm:p-10 lg:p-14">
                <div>
                  <span className="eyebrow text-primary">Project / {String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 text-4xl font-black tracking-[-.055em] text-white transition group-hover:text-primary sm:text-6xl lg:text-8xl">{name}</h3>
                  <p className="mt-2 text-sm text-white/70 sm:text-lg">{type}</p>
                </div>
                <span className="grid size-14 shrink-0 place-items-center rounded-full border border-white/25 bg-black/40 text-xl text-white backdrop-blur-md transition duration-500 group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary group-hover:text-black sm:size-20 sm:text-3xl">↗</span>
              </div>
            </motion.a>
          ))}
        </div>
        <div aria-hidden="true" className="h-[18vh]" />
      </div>
    </section>
  );
}
