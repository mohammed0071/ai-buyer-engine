"use client";

import { motion } from "framer-motion";
import ParticleField from "./ParticleField";
import FloatingShapes from "./FloatingShapes";
import RippleButton from "./RippleButton";

export default function Hero() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-gradient grid-pattern">
      {/* Particle canvas background */}
      <ParticleField />

      {/* Floating 3D shapes with parallax */}
      <FloatingShapes />

      {/* Animated orbs - more dramatic */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[700px] h-[700px] rounded-full bg-accent/8 blur-[150px]"
          animate={{
            x: [0, 120, -60, 0],
            y: [0, -100, 80, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: "5%", left: "5%" }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-accent-purple/8 blur-[150px]"
          animate={{
            x: [0, -100, 80, 0],
            y: [0, 80, -60, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: "25%", right: "5%" }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px]"
          animate={{
            x: [0, 60, -40, 0],
            y: [0, -40, 60, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{ bottom: "10%", left: "30%" }}
        />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass mb-8 border border-accent/10"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(0,212,170,0.6)]" />
          <span className="text-text-secondary text-sm font-satoshi">Coming Soon — Join the Waitlist</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-clash font-bold text-[44px] md:text-[64px] lg:text-[80px] leading-[1.05] mb-6 glow-text"
        >
          The Operating System for{" "}
          <span className="gradient-text">Human Longevity</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-text-secondary text-lg md:text-xl lg:text-2xl max-w-[700px] mx-auto mb-12 font-satoshi leading-relaxed"
        >
          Measure. Understand. Optimize. Transform your biology with AI-driven insights, advanced diagnostics, and personalized protocols.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <RippleButton onClick={() => scrollTo("#waitlist")} variant="primary">
            Join the Waitlist
          </RippleButton>
          <RippleButton onClick={() => scrollTo("#platform")} variant="glass">
            Explore Platform
          </RippleButton>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
    </section>
  );
}
