"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const socialLinks = [
  { name: "GitHub", href: "https://github.com/", icon: "GH" },
  { name: "LinkedIn", href: "https://linkedin.com/", icon: "IN" },
  { name: "Twitter", href: "https://x.com/", icon: "X" },
  { name: "Email", href: "mailto:shahin@example.com", icon: "@" },
];

interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt?: string;
  updatedAt?: string;
}

export function Contacts() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("Submit error:", error);
      setStatus("error");
      setErrorMsg(error instanceof Error ? error.message : "Failed to send message");
      
      // Reset error after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section className="relative px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeading subtitle="Have a project in mind? Let&apos;s chat.">
          Get In Touch
        </SectionHeading>

        <div className="gap-12 lg:gap-16 grid lg:grid-cols-2">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h3 className="font-semibold text-text-heading text-2xl">
              Let&apos;s work together
            </h3>

            <p className="text-text-muted leading-relaxed">
              I&apos;m always open to discussing new projects, creative ideas,
              or opportunities to be part of your vision. Feel free to reach out
              through the form or connect with me on social media.
            </p>

            <div className="gap-4 grid grid-cols-2">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center gap-3 bg-surface p-4 border border-primary/10 hover:border-primary/30 rounded-xl transition-colors"
                >
                  <div className="flex justify-center items-center bg-gradient-primary opacity-80 group-hover:opacity-100 rounded-lg w-10 h-10 font-bold text-white text-sm transition-opacity">
                    {link.icon}
                  </div>

                  <span className="text-text-muted group-hover:text-text-heading text-sm transition-colors">
                    {link.name}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {status === "success" && (
                <div className="bg-green-500/10 p-4 border border-green-500/30 rounded-xl text-green-400">
                  Thanks for reaching out! I&apos;ll get back to you soon.
                </div>
              )}

              {status === "error" && errorMsg && (
                <div className="bg-red-500/10 p-4 border border-red-500/30 rounded-xl text-red-400">
                  {errorMsg}
                </div>
              )}

              <div>
                <label
                  className="block mb-2 text-text-muted text-sm"
                  htmlFor="name"
                >
                  Name
                </label>

                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Your Name"
                  className="bg-surface px-4 py-3 border border-primary/10 focus:border-primary/40 rounded-xl focus:outline-none w-full text-text placeholder:text-text-muted/50 transition-colors"
                />
              </div>

              <div>
                <label
                  className="block mb-2 text-text-muted text-sm"
                  htmlFor="email"
                >
                  Email
                </label>

                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="you@example.com"
                  className="bg-surface px-4 py-3 border border-primary/10 focus:border-primary/40 rounded-xl focus:outline-none w-full text-text placeholder:text-text-muted/50 transition-colors"
                />
              </div>

              <div>
                <label
                  className="block mb-2 text-text-muted text-sm"
                  htmlFor="message"
                >
                  Message
                </label>

                <motion.textarea
                  whileFocus={{ scale: 1.01 }}
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tell me about your project..."
                  className="bg-surface px-4 py-3 border border-primary/10 focus:border-primary/40 rounded-xl focus:outline-none w-full text-text placeholder:text-text-muted/50 transition-colors resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status === "loading"}
                className={`py-3 rounded-xl w-full font-semibold text-white transition-shadow ${
                  status === "loading"
                    ? "bg-primary/50 cursor-not-allowed"
                    : "bg-gradient-primary hover:shadow-lg hover:shadow-primary/30"
                }`}
              >
                {status === "loading" ? "Sending..." : "Send Message"} &#10148;
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}