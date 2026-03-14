"use client";

import { motion } from "framer-motion";
import ScrollReveal, { staggerContainer, staggerItem } from "./ScrollReveal";
import { TestTubes, BarChart3, Zap } from "lucide-react";

const steps = [
  {
    icon: TestTubes,
    step: "01",
    title: "Test",
    description: "Comprehensive biomarker, genetic, and performance testing through our curated diagnostics ecosystem.",
  },
  {
    icon: BarChart3,
    step: "02",
    title: "Analyze",
    description: "AI processes your data across hundreds of markers to generate actionable insights and your Longevity Score.",
  },
  {
    icon: Zap,
    step: "03",
    title: "Optimize",
    description: "Personalized protocols — supplements, lifestyle, nutrition — designed to improve your longevity score over time.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-[100px] md:py-[140px] bg-secondary/30 section-glow-purple grid-pattern">
      <div className="max-w-[1200px] mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-accent text-sm font-semibold tracking-[0.2em] uppercase font-satoshi">The Process</span>
            <h2 className="font-clash font-bold text-[36px] md:text-[52px] lg:text-[56px] mt-3 mb-5">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-text-secondary text-lg md:text-xl max-w-[550px] mx-auto font-satoshi">
              Three simple steps to transform your biology and extend your healthspan.
            </p>
          </div>
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {steps.map((step) => (
            <motion.div key={step.title} variants={staggerItem}>
              <div className="glass glass-hover holo-shimmer gradient-border rounded-2xl p-8 transition-all duration-300 text-center relative h-full noise-overlay group">
                <div className="relative z-10">
                  <span className="absolute top-0 right-0 text-accent/10 font-clash font-bold text-6xl group-hover:text-accent/20 transition-colors duration-300">
                    {step.step}
                  </span>
                  <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center mb-6 mx-auto group-hover:bg-accent/15 group-hover:shadow-[0_0_25px_rgba(0,212,170,0.15)] transition-all duration-300">
                    <step.icon className="text-accent" size={30} />
                  </div>
                  <h3 className="font-clash font-semibold text-2xl mb-3 group-hover:text-accent transition-colors duration-300">{step.title}</h3>
                  <p className="text-text-secondary font-satoshi leading-relaxed">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
