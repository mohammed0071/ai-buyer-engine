"use client";

import { motion } from "framer-motion";
import ScrollReveal, { staggerContainer, staggerItem } from "./ScrollReveal";
import { MapPin, Microscope, Users } from "lucide-react";

export default function PerformanceLabs() {
  return (
    <section id="labs" className="relative py-[100px] md:py-[140px] section-glow-teal">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="glass rounded-3xl p-8 md:p-16 relative overflow-hidden noise-overlay">
          {/* Background glows */}
          <motion.div
            className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-accent-purple/12 blur-[120px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-accent/12 blur-[120px]"
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10 text-center">
            <ScrollReveal>
              <span className="text-accent-purple text-sm font-semibold tracking-[0.2em] uppercase font-satoshi">Coming Soon</span>
              <h2 className="font-clash font-bold text-[36px] md:text-[52px] lg:text-[56px] mt-3 mb-5">
                Performance <span className="gradient-text">Labs</span>
              </h2>
              <p className="text-text-secondary text-lg md:text-xl max-w-[600px] mx-auto mb-12 font-satoshi">
                Physical locations where you can access advanced diagnostics, coaching, and 
                cutting-edge longevity treatments — all under one roof.
              </p>
            </ScrollReveal>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="grid md:grid-cols-3 gap-8"
            >
              {[
                { icon: Microscope, title: "Advanced Testing", description: "In-person labs with hospital-grade equipment for comprehensive diagnostics." },
                { icon: Users, title: "Expert Coaches", description: "Work face-to-face with longevity specialists, nutritionists, and performance coaches." },
                { icon: MapPin, title: "Premium Locations", description: "Starting in London, expanding to major cities across the UK and beyond." },
              ].map((item) => (
                <motion.div key={item.title} variants={staggerItem}>
                  <div className="flex flex-col items-center group">
                    <div className="w-16 h-16 rounded-xl bg-accent-purple/10 flex items-center justify-center mb-5 group-hover:bg-accent-purple/20 group-hover:shadow-[0_0_25px_rgba(123,44,191,0.2)] transition-all duration-300">
                      <item.icon className="text-accent-purple" size={30} />
                    </div>
                    <h3 className="font-clash font-semibold text-xl mb-2 group-hover:text-accent-purple transition-colors duration-300">{item.title}</h3>
                    <p className="text-text-secondary text-sm font-satoshi">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
