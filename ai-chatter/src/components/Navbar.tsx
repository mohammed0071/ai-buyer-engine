"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Learn", href: "/learn" },
  { label: "Retail", href: "/retail" },
  { label: "Professional", href: "/professional" },
  { label: "Partnerships", href: "/partnerships" },
  { label: "Token", href: "/token" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
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
          : "bg-white/0 backdrop-blur-[2px] py-5"
      }`}
    >
      <div className="mx-auto max-w-[1200px] px-6 flex items-center justify-between">
        {/* Logo — left */}
        <Logo dark={true} />

        {/* Nav links — center (desktop) */}
        <ul className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  scrolled
                    ? "text-slate-600 hover:text-navy-600 hover:bg-navy-50"
                    : "text-slate-600 hover:text-navy-600 hover:bg-navy-50/50"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTAs — right (desktop) */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/contact" className="btn-cyan text-sm px-6 py-2.5">
            Contact Us
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col items-center justify-center gap-[5px] p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 rounded transition-all bg-navy-900 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 rounded transition-all bg-navy-900 ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 rounded transition-all bg-navy-900 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-border px-6 py-4 shadow-lg">
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
              href="/contact"
              className="btn-cyan text-center"
              onClick={() => setMobileOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
