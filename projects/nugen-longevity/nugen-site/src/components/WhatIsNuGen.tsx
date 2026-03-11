"use client";

import { motion } from "framer-motion";
import ScrollReveal, { staggerContainer, staggerItem } from "./ScrollReveal";
import { Brain, Dna, Activity, Shield } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Insights",
    description: "Advanced machine learning analyzes your biomarkers to generate personalized, actionable health recommendations.",
  },
  {
    icon: Dna,
    title: "Genetic Intelligence",
    description: "Decode your DNA to understand predispositions, optimize nutrition, and unlock your genetic potential.",
  },
  {
    icon: Activity,
    title: "Real-Time Monitoring",
    description: "Track your longevity score as it evolves, with continuous insights that adapt to your progress.",
  },
  {
    icon: Shield,
    title: "Personalized Protocols",
    description: "Science-backed protocols tailored to your unique biology — supplements, lifestyle, and performance optimization.",
  },
];

export default function WhatIsNuGen() {
  return (
    <section id="platform" className="relative py-[100px] md:py-[140px] section-glow-teal dna-overlay">
      <div className="max-w-[1200px] mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-accent text-sm font-semibold tracking-[0.2em] uppercase font-satoshi">The Platform</span>
            <h2 className="font-clash font-bold text-[36px] md:text-[52px] lg:text-[56px] mt-3 mb-5">
              What is <span className="gradient-text">NuGen</span>?
            </h2>
            <p className="text-text-secondary text-lg md:text-xl max-w-[600px] mx-auto font-satoshi">
              NuGen is a comprehensive longevity platform that combines cutting-edge diagnostics, 
              AI analytics, and personalized protocols to optimize your healthspan.
            </p>
          </div>
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-2 gap-8"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={staggerItem}>
              <div className="glass glass-hover holo-shimmer gradient-border rounded-2xl p-8 transition-all duration-400 h-full noise-overlay group">
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/15 group-hover:shadow-[0_0_20px_rgba(0,212,170,0.15)] transition-all duration-300">
                    <feature.icon className="text-accent" size={26} />
                  </div>
                  <h3 className="font-clash font-semibold text-xl mb-3 group-hover:text-accent transition-colors duration-300">{feature.title}</h3>
                  <p className="text-text-secondary font-satoshi leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
