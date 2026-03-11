"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal, { staggerContainer, staggerItem } from "./ScrollReveal";
import { Check, Star } from "lucide-react";
import RippleButton from "./RippleButton";

interface Tier {
  name: string;
  monthlyPrice: number;
  priceNote?: string;
  features: string[];
  popular?: boolean;
  accent?: boolean;
}

const tiers: Tier[] = [
  {
    name: "Foundation",
    monthlyPrice: 47,
    features: [
      "Longevity Score",
      "Basic Blood Panel",
      "AI Coach",
      "Monthly Insights Report",
    ],
  },
  {
    name: "Optimize",
    monthlyPrice: 97,
    popular: true,
    features: [
      "Everything in Foundation",
      "Advanced Biomarkers",
      "Gut Microbiome Analysis",
      "Food Sensitivity Testing",
      "Quarterly Deep Dive",
    ],
  },
  {
    name: "Pro",
    monthlyPrice: 197,
    features: [
      "Everything in Optimize",
      "Full Genetic Panel",
      "Biological Age Testing",
      "Mitochondrial Score",
      "Monthly Coaching Calls",
    ],
  },
  {
    name: "Elite",
    monthlyPrice: 297,
    features: [
      "Everything in Pro",
      "All Testing Categories",
      "Priority Support",
      "Family Account (2 members)",
      "Supplement Protocol",
    ],
  },
  {
    name: "Black",
    monthlyPrice: 497,
    accent: true,
    features: [
      "Everything in Elite",
      "Quarterly In-Person Labs",
      "Unlimited Coaching",
      "White-Glove Concierge",
      "Dedicated Health Advisor",
    ],
  },
  {
    name: "Athlete",
    monthlyPrice: 397,
    features: [
      "VO₂ Max Testing",
      "Lactate Threshold",
      "DEXA Body Composition",
      "HRV Monitoring",
      "Performance Protocol",
    ],
  },
  {
    name: "Athlete Pro",
    monthlyPrice: 597,
    priceNote: "– £997",
    features: [
      "Full Athlete Tier",
      "Lab Access",
      "Real-time Monitoring",
      "Competition Prep Protocol",
      "Recovery Optimization",
    ],
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  const getPrice = (monthly: number) => {
    if (annual) return Math.round(monthly * 0.8);
    return monthly;
  };

  return (
    <section id="pricing" className="relative py-[100px] md:py-[140px] bg-secondary/30 section-glow-purple overflow-hidden">
      {/* Floating gradient orbs behind cards */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-accent/5 blur-[180px]"
        animate={{ x: [0, 80, -40, 0], y: [0, -60, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: "20%", left: "10%" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-accent-purple/5 blur-[160px]"
        animate={{ x: [0, -60, 40, 0], y: [0, 40, -60, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: "40%", right: "5%" }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full bg-accent/4 blur-[140px]"
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 50, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        style={{ bottom: "10%", left: "40%" }}
      />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-accent text-sm font-semibold tracking-[0.2em] uppercase font-satoshi">Pricing</span>
            <h2 className="font-clash font-bold text-[36px] md:text-[52px] lg:text-[56px] mt-3 mb-5">
              Subscription <span className="gradient-text">Tiers</span>
            </h2>
            <p className="text-text-secondary text-lg md:text-xl max-w-[550px] mx-auto mb-8 font-satoshi">
              Choose the plan that matches your optimization goals.
            </p>

            {/* Toggle */}
            <div className="inline-flex items-center gap-4 glass rounded-full px-2 py-1.5">
              <button
                onClick={() => setAnnual(false)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 font-satoshi ${
                  !annual ? "bg-accent text-primary shadow-[0_0_15px_rgba(0,212,170,0.3)]" : "text-text-secondary hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setAnnual(true)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 font-satoshi flex items-center gap-2 ${
                  annual ? "bg-accent text-primary shadow-[0_0_15px_rgba(0,212,170,0.3)]" : "text-text-secondary hover:text-white"
                }`}
              >
                Annual
                <span className={`text-xs px-2 py-0.5 rounded-full ${annual ? "bg-primary/20 text-primary" : "bg-accent/20 text-accent"}`}>
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {tiers.map((tier) => (
            <motion.div key={tier.name} variants={staggerItem}>
              <div
                className={`relative rounded-2xl p-6 transition-all duration-400 h-full flex flex-col group noise-overlay ${
                  tier.popular
                    ? "border-2 border-accent bg-accent/5 shadow-[0_0_50px_rgba(0,212,170,0.12)] hover:shadow-[0_0_70px_rgba(0,212,170,0.2)] hover:border-accent/80"
                    : tier.accent
                    ? "border border-accent-purple/30 bg-accent-purple/5 hover:border-accent-purple/50 hover:shadow-[0_0_50px_rgba(123,44,191,0.15)]"
                    : "glass glass-hover holo-shimmer gradient-border"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-accent text-primary px-4 py-1.5 rounded-full text-xs font-bold pulse-glow z-20">
                    <Star size={12} fill="currentColor" />
                    Popular
                  </div>
                )}

                <div className="relative z-10 flex flex-col h-full">
                  <h3 className="font-clash font-semibold text-xl mb-2 group-hover:text-accent transition-colors duration-300">{tier.name}</h3>

                  <div className="flex items-baseline gap-1 mb-6">
                    <motion.span
                      key={`${tier.name}-${annual}`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-clash font-bold text-4xl"
                    >
                      £{getPrice(tier.monthlyPrice)}
                    </motion.span>
                    {tier.priceNote && <span className="text-text-secondary text-lg font-satoshi">{tier.priceNote}</span>}
                    <span className="text-text-secondary text-sm font-satoshi">/mo</span>
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm font-satoshi">
                        <Check size={16} className="text-accent mt-0.5 shrink-0" />
                        <span className="text-text-secondary group-hover:text-white/80 transition-colors duration-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <RippleButton
                    variant={tier.popular ? "primary" : "glass"}
                    className="w-full py-3 text-sm"
                  >
                    Get Started
                  </RippleButton>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
