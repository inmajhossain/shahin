"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
export function SmoothScroll({children}:{children:React.ReactNode}){
 useEffect(()=>{if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;const lenis=new Lenis({duration:1.05,smoothWheel:true});let frame=0;const raf=(time:number)=>{lenis.raf(time);frame=requestAnimationFrame(raf)};frame=requestAnimationFrame(raf);return()=>{cancelAnimationFrame(frame);lenis.destroy()}},[]);
 return <div className="noise overflow-clip">{children}</div>;
}
