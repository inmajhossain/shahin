import type { Metadata, Viewport } from "next";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  title: "Inmaj Hossain Shahin — Website Developer",
  description: "Full-stack developer in Dhaka crafting expressive, high-performance digital experiences.",
};
export const viewport: Viewport = { themeColor: "#08080a" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SmoothScroll>{children}</SmoothScroll></body></html>;
}
