"use client";

import { motion } from "framer-motion";
import ScrollReveal, { staggerContainer, staggerItem } from "./ScrollReveal";
import { Lock, Building2, Smartphone, CheckCircle, Users, Star } from "lucide-react";

const badges = [
  {
    icon: Lock,
    label: "Bank-Level Encryption",
    sublabel: "Secure & Private",
  },
  {
    icon: Building2,
    label: "Certified Partner Labs",
    sublabel: "CLIA & CAP accredited",
  },
  {
    icon: Smartphone,
    label: "Real-Time Data Sync",
    sublabel: "Always up to date",
  },
  {
    icon: CheckCircle,
    label: "Results-Backed Protocols",
    sublabel: "Evidence-based",
  },
  {
    icon: Users,
    label: "Expert Team",
    sublabel: "Specialists & coaches",
  },
  {
    icon: Star,
    label: "4.9/5 Average Rating",
    sublabel: "From early users",
  },
];

export default function TrustBadges() {
  return (
    <section className="relative py-12 md:py-16 border-b border-white/[0.04]">
      <div className="max-w-[1200px] mx-auto px-6">
        <ScrollReveal>
          <p className="text-center text-text-secondary/60 text-sm font-satoshi tracking-[0.15em] uppercase mb-8">
            Trusted & Secure
          </p>
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6"
        >
          {badges.map((badge) => (
            <motion.div
              key={badge.label}
              variants={staggerItem}
              className="group flex flex-col items-center text-center px-3 py-5 rounded-xl border border-transparent hover:border-white/[0.06] hover:bg-white/[0.02] transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/8 flex items-center justify-center mb-3 group-hover:bg-accent/12 group-hover:shadow-[0_0_16px_rgba(0,212,170,0.1)] transition-all duration-300">
                <badge.icon className="text-accent/70 group-hover:text-accent transition-colors duration-300" size={20} />
              </div>
              <span className="text-white/90 text-sm font-medium font-satoshi leading-tight mb-1">
                {badge.label}
              </span>
              <span className="text-text-secondary/50 text-xs font-satoshi">
                {badge.sublabel}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
