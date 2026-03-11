"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import RippleButton from "./RippleButton";

const navLinks = [
  { label: "Platform", href: "#platform" },
  { label: "Diagnostics", href: "#diagnostics" },
  { label: "Pricing", href: "#pricing" },
  { label: "Labs", href: "#labs" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass py-3 shadow-[0_4px_30px_rgba(0,0,0,0.3)]" : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-purple flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(0,212,170,0.3)] transition-all duration-300">
            <span className="text-primary font-clash font-bold text-sm">N</span>
          </div>
          <span className="font-clash font-semibold text-lg text-white">
            NuGen<span className="text-accent">.</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-text-secondary hover:text-white transition-all duration-300 text-sm font-satoshi relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <RippleButton
            onClick={() => scrollTo("#waitlist")}
            variant="primary"
            className="px-5 py-2.5 text-sm"
          >
            Join Waitlist
          </RippleButton>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white hover:text-accent transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, height: "auto", filter: "blur(0px)" }}
            exit={{ opacity: 0, height: 0, filter: "blur(10px)" }}
            className="md:hidden glass mt-2 mx-4 rounded-xl overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-text-secondary hover:text-white transition-colors text-left font-satoshi"
                >
                  {link.label}
                </button>
              ))}
              <RippleButton
                onClick={() => scrollTo("#waitlist")}
                variant="primary"
                className="px-5 py-2.5 text-sm mt-2"
              >
                Join Waitlist
              </RippleButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
