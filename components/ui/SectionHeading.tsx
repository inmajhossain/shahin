"use client";
import {motion} from "framer-motion"; import type{ReactNode}from "react";
export function SectionHeading({children,subtitle,index="02"}:{children:string;subtitle?:ReactNode;index?:string}){
 return <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-80px"}} transition={{duration:.7}} className="mb-12 grid gap-5 border-t border-white/10 pt-6 md:grid-cols-[1fr_1.3fr] md:items-end">
  <div><span className="eyebrow text-primary">({index})</span><h2 className="mt-3 text-4xl font-black tracking-[-.055em] text-text-heading sm:text-6xl">{children}</h2></div>
  {subtitle&&<p className="max-w-xl text-base leading-relaxed text-text-muted md:justify-self-end md:text-lg">{subtitle}</p>}
 </motion.div>
}
