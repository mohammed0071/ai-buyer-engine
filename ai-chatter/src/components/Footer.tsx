import Link from "next/link";
import Logo from "./Logo";

const footerLinks = {
  Platform: [
    { label: "Retail Investors", href: "/retail" },
    { label: "Professional Investors", href: "/professional" },
    { label: "Partnerships", href: "/partnerships" },
    { label: "$ESX Token", href: "/token" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
  ],
  Learn: [
    { label: "How It Works", href: "/learn" },
    { label: "Tokenization", href: "/learn#what-is" },
    { label: "Risk Disclosure", href: "/learn#risks" },
    { label: "Blog Articles", href: "/blog" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Risk Warnings", href: "#" },
    { label: "Regulatory Info", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white/60 pt-16 pb-8">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand col */}
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-white/50 max-w-[220px]">
              Regulated tokenized real estate investment platform.
            </p>
            <p className="mt-3 text-xs text-white/30">
              EU Registered · NL 83876243
            </p>
          </div>

          {/* Link cols */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} EstateX. All rights reserved.
          </p>
          <p className="text-xs text-white/30 max-w-lg text-center md:text-right">
            EstateX does not provide financial, investment, or tax advice. Capital is at risk. Liquidity is not guaranteed.
          </p>
        </div>
      </div>
    </footer>
  );
}
