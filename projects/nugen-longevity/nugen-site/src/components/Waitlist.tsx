"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import RippleButton from "./RippleButton";
import { ArrowRight, CheckCircle, AlertCircle } from "lucide-react";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus("error");
      setErrorMsg("Please enter your email address.");
      return;
    }

    if (!validateEmail(email)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    const waitlist = JSON.parse(localStorage.getItem("nugen-waitlist") || "[]");
    waitlist.push({ email, timestamp: new Date().toISOString() });
    localStorage.setItem("nugen-waitlist", JSON.stringify(waitlist));

    setStatus("success");
    setEmail("");
  };

  return (
    <section id="waitlist" className="relative py-[100px] md:py-[140px] bg-secondary/30 section-glow-teal overflow-hidden">
      {/* Floating orbs */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-accent/6 blur-[160px]"
        animate={{ x: [0, 50, -30, 0], y: [0, -40, 30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: "10%", right: "10%" }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full bg-accent-purple/6 blur-[140px]"
        animate={{ x: [0, -40, 20, 0], y: [0, 30, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ bottom: "10%", left: "10%" }}
      />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="max-w-[600px] mx-auto text-center">
          <ScrollReveal>
            <span className="text-accent text-sm font-semibold tracking-[0.2em] uppercase font-satoshi">Early Access</span>
            <h2 className="font-clash font-bold text-[36px] md:text-[52px] lg:text-[56px] mt-3 mb-5">
              Join the <span className="gradient-text">Waitlist</span>
            </h2>
            <p className="text-text-secondary text-lg md:text-xl mb-10 font-satoshi">
              Be among the first to access NuGen Longevity. Early members receive priority access and exclusive pricing.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  className="glass rounded-2xl p-8 flex flex-col items-center gap-4 noise-overlay"
                >
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center animate-pulse-glow">
                    <CheckCircle className="text-accent" size={32} />
                  </div>
                  <h3 className="font-clash font-semibold text-xl">You&apos;re on the list!</h3>
                  <p className="text-text-secondary font-satoshi">
                    We&apos;ll be in touch soon with early access details.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <div className="flex-grow relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === "error") setStatus("idle");
                      }}
                      placeholder="Enter your email"
                      className={`w-full glass rounded-xl px-5 py-4 text-white placeholder:text-text-secondary/60 font-satoshi focus:outline-none focus:border-accent/40 focus:shadow-[0_0_20px_rgba(0,212,170,0.1)] transition-all duration-300 ${
                        status === "error" ? "border-red-500/50" : ""
                      }`}
                    />
                    <AnimatePresence>
                      {status === "error" && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="absolute -bottom-7 left-0 text-red-400 text-sm flex items-center gap-1 font-satoshi"
                        >
                          <AlertCircle size={14} />
                          {errorMsg}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  <RippleButton type="submit" variant="primary" className="px-8 py-4 shrink-0">
                    Join Now
                    <ArrowRight size={18} />
                  </RippleButton>
                </motion.form>
              )}
            </AnimatePresence>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
