"use client";

import { Twitter, Linkedin, Instagram } from "lucide-react";

const footerLinks = [
  {
    title: "Platform",
    links: [
      { label: "How It Works", href: "#platform" },
      { label: "Diagnostics", href: "#diagnostics" },
      { label: "Pricing", href: "#pricing" },
      { label: "Performance Labs", href: "#labs" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-purple flex items-center justify-center">
                <span className="text-primary font-clash font-bold text-sm">N</span>
              </div>
              <span className="font-clash font-semibold text-lg text-white">
                NuGen<span className="text-accent">.</span>
              </span>
            </div>
            <p className="text-text-secondary text-sm font-satoshi leading-relaxed max-w-[300px] mb-6">
              The operating system for human longevity. Measure, understand, and optimize your biology with AI-driven insights.
            </p>
            <div className="flex items-center gap-3">
              {[Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-text-secondary hover:text-accent transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="font-clash font-semibold text-sm mb-4">{group.title}</h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-text-secondary text-sm font-satoshi hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-secondary text-sm font-satoshi">
            © {new Date().getFullYear()} NuGen Longevity. All rights reserved.
          </p>
          <p className="text-text-secondary/50 text-xs font-satoshi">
            Built for those who refuse to accept biological decline.
          </p>
        </div>
      </div>
    </footer>
  );
}
