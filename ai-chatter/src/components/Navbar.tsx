"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";

const navLinks = [
  { label: "Tools", href: "/tools" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-[var(--shadow-nav)] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto max-w-[1200px] px-6 flex items-center justify-between">
        {/* Logo — left */}
        <Logo dark={scrolled} />

        {/* Nav links — center (desktop) */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  scrolled
                    ? "text-slate-600 hover:text-navy-600 hover:bg-navy-50"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTAs — right (desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/wizard"
            className={`btn-ghost text-sm ${
              scrolled ? "text-navy-900" : "text-white/90 hover:text-white"
            }`}
          >
            AI Wizard
          </Link>
          <Link href="/wizard" className="btn-primary text-sm px-6 py-2.5">
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col items-center justify-center gap-[5px] p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 rounded transition-all ${
              scrolled ? "bg-navy-900" : "bg-white"
            } ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 rounded transition-all ${
              scrolled ? "bg-navy-900" : "bg-white"
            } ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 rounded transition-all ${
              scrolled ? "bg-navy-900" : "bg-white"
            } ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-border px-6 py-4 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-3 text-slate-600 font-medium hover:text-navy-600"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-border">
            <Link
              href="/wizard"
              className="btn-ghost text-center"
              onClick={() => setMobileOpen(false)}
            >
              AI Wizard
            </Link>
            <Link
              href="/wizard"
              className="btn-primary text-center"
              onClick={() => setMobileOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
