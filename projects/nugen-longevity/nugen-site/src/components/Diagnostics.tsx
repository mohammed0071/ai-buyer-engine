"use client";

import { motion } from "framer-motion";
import ScrollReveal, { staggerContainer, staggerItem } from "./ScrollReveal";
import { Droplets, Bug, Utensils, Dna, Clock, Flame, HeartPulse, FlaskConical } from "lucide-react";

const categories = [
  { icon: Droplets, title: "Blood Biomarkers", description: "Complete metabolic panels, inflammation markers, and longevity-specific blood tests." },
  { icon: Bug, title: "Gut Microbiome", description: "Deep sequencing of your gut bacteria to optimize digestion, immunity, and mental health." },
  { icon: Utensils, title: "Food Sensitivities", description: "Identify hidden intolerances that may be causing inflammation and hindering performance." },
  { icon: Dna, title: "Hormones & Genetics", description: "Full hormone panel and genetic analysis to understand your unique biology." },
  { icon: Clock, title: "Biological Age", description: "Epigenetic testing reveals your true biological age versus chronological age." },
  { icon: Flame, title: "Mitochondrial Health", description: "Assess cellular energy production and optimize mitochondrial function." },
  { icon: HeartPulse, title: "VO₂ Max & Performance", description: "Cardiovascular fitness testing to benchmark and improve your aerobic capacity." },
  { icon: FlaskConical, title: "Heavy Metals & Omega-3", description: "Detect toxic exposures and optimize essential fatty acid balance." },
];

export default function Diagnostics() {
  return (
    <section id="diagnostics" className="relative py-[100px] md:py-[140px] section-glow-teal dna-overlay">
      <div className="max-w-[1200px] mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-accent text-sm font-semibold tracking-[0.2em] uppercase font-satoshi">Diagnostics</span>
            <h2 className="font-clash font-bold text-[36px] md:text-[52px] lg:text-[56px] mt-3 mb-5">
              The Diagnostics <span className="gradient-text">Ecosystem</span>
            </h2>
            <p className="text-text-secondary text-lg md:text-xl max-w-[600px] mx-auto font-satoshi">
              A comprehensive suite of tests that paint a complete picture of your biology.
            </p>
          </div>
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((cat) => (
            <motion.div key={cat.title} variants={staggerItem}>
              <div className="glass glass-hover holo-shimmer gradient-border rounded-2xl p-6 transition-all duration-300 h-full noise-overlay group">
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/15 group-hover:shadow-[0_0_20px_rgba(0,212,170,0.12)] transition-all duration-300">
                    <cat.icon className="text-accent" size={22} />
                  </div>
                  <h3 className="font-clash font-semibold text-lg mb-2 group-hover:text-accent transition-colors duration-300">{cat.title}</h3>
                  <p className="text-text-secondary text-sm font-satoshi leading-relaxed">{cat.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
