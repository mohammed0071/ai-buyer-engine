"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal, { staggerContainer, staggerItem } from "./ScrollReveal";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How does NuGen work?",
    answer:
      "NuGen combines advanced blood diagnostics, genetic analysis, and wearable data into a single platform. Our AI engine processes your biomarkers and generates personalized longevity protocols — covering supplements, nutrition, exercise, and lifestyle — that adapt as your data evolves.",
  },
  {
    question: "What testing options are available?",
    answer:
      "We offer three tiers of testing: Essential (50+ biomarkers covering metabolic, hormonal, and inflammatory markers), Advanced (100+ biomarkers with genetic insights), and Elite (comprehensive panel with epigenetic age testing, microbiome analysis, and quarterly retesting). All tests are processed through CLIA-certified partner labs.",
  },
  {
    question: "How long until I see results?",
    answer:
      "Your initial biomarker results and personalized protocol are delivered within 5–7 business days of your blood draw. Most members report noticeable improvements in energy, sleep, and cognitive function within 4–8 weeks of following their protocols. Measurable biomarker improvements are typically seen at the 90-day retest.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We use bank-level AES-256 encryption for all data at rest and in transit. Your health data is never sold to third parties. We are SOC 2 Type II compliant, and you retain full ownership and control of your data — including the right to delete it at any time.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. All NuGen memberships are month-to-month with no long-term contracts. You can cancel or pause your subscription at any time from your dashboard. If you cancel, you retain access to your data and past reports indefinitely.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a full refund within 30 days of your first subscription payment if you haven't yet completed your initial blood draw. After testing has been initiated, we provide prorated refunds on a case-by-case basis. Contact our support team for assistance.",
  },
];

function FAQItem({ question, answer, isOpen, onToggle }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      variants={staggerItem}
      className="glass rounded-xl overflow-hidden border border-white/[0.04] hover:border-accent/15 transition-colors duration-300"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left group"
      >
        <span className="font-clash font-medium text-[16px] md:text-[18px] text-white/90 group-hover:text-white transition-colors duration-200 pr-4">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="shrink-0"
        >
          <ChevronDown
            size={20}
            className={`transition-colors duration-200 ${
              isOpen ? "text-accent" : "text-text-secondary/50 group-hover:text-text-secondary"
            }`}
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 border-t border-white/[0.04]">
              <p className="text-text-secondary font-satoshi leading-relaxed pt-4 text-[15px]">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-[100px] md:py-[140px] section-glow-teal">
      <div className="max-w-[800px] mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-accent text-sm font-semibold tracking-[0.2em] uppercase font-satoshi">
              FAQ
            </span>
            <h2 className="font-clash font-bold text-[36px] md:text-[52px] lg:text-[56px] mt-3 mb-5">
              Common <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-text-secondary text-lg md:text-xl max-w-[500px] mx-auto font-satoshi">
              Everything you need to know about NuGen Longevity.
            </p>
          </div>
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col gap-3"
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
