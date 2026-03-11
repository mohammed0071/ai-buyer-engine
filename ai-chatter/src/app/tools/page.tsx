import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Token Architecture — EstateX",
  description:
    "Understand the multi-token architecture: PROPX property tokens, ESX platform utility, and EstateX NFTs.",
};

const tokens = [
  {
    icon: "🏠",
    title: "PROPX Tokens",
    description:
      "Property-linked security tokens. Each PROPX token represents defined rights linked to a specific real estate structure via a legal and compliance framework.",
    tag: "Property",
    features: ["Single-asset exposure", "Defined rights & limitations", "Jurisdiction-specific"],
  },
  {
    icon: "⚡",
    title: "ESX Token",
    description:
      "Platform utility token used for platform engagement, staking, and access features. Not designed as an investment product.",
    tag: "Utility",
    features: ["Platform engagement", "Staking rewards", "Access features"],
  },
  {
    icon: "🎨",
    title: "EstateX NFTs",
    description:
      "Digital collectibles and engagement tools. They do not represent ownership, equity, or any defined right in a property or legal structure.",
    tag: "Collectible",
    features: ["Digital collectibles", "Engagement tools", "Not ownership tokens"],
  },
];

export default function TokenArchitecturePage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-pale pt-32 pb-20">
        <div className="relative z-10 mx-auto max-w-[1200px] px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="hero-badge">
                <span className="w-2 h-2 rounded-full bg-accent-green inline-block"></span>
                Token Architecture
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-navy-900 leading-[1.1] tracking-tight mb-6">
                Multi-Token
                <br />
                <span className="text-navy-600">Architecture</span>
              </h1>
              <p className="text-lg text-body max-w-lg leading-relaxed mb-8">
                How EstateX separates property exposure, platform utility, and
                digital engagement through distinct token types with clearly
                defined purposes.
              </p>
              <Link href="#tokens" className="btn-link">
                Explore tokens <span>→</span>
              </Link>
            </div>
            <div className="animate-fade-in-up animate-delay-200 hidden md:flex justify-center">
              <div className="hero-illustration animate-float max-w-xs w-full p-6">
                <div className="space-y-3">
                  {tokens.map((t) => (
                    <div key={t.title} className="flex items-center gap-3 p-3 rounded-xl bg-section-alt">
                      <span className="text-xl">{t.icon}</span>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-navy-900">{t.title}</div>
                        <div className="text-xs text-muted">{t.tag}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Token Grid */}
      <section id="tokens" className="py-20 bg-white">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {tokens.map((token) => (
              <div key={token.title} className="card">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{token.icon}</span>
                  <span className="text-xs font-semibold text-navy-600 bg-navy-100 px-3 py-1 rounded-full uppercase tracking-wider">
                    {token.tag}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{token.title}</h3>
                <p className="text-body text-sm leading-relaxed mb-5">
                  {token.description}
                </p>
                <ul className="space-y-2">
                  {token.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-body">
                      <span className="text-accent-green mt-0.5 flex-shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-light py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-tag">Learn More</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
                Want the Full Picture?
              </h2>
              <p className="text-lg text-body max-w-xl mb-8">
                Read about how the tokenization model works, or explore the $ESX token in detail.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/learn" className="btn-cyan px-8 py-3.5 text-base">
                  Learn the Model
                </Link>
                <Link href="/token" className="btn-secondary px-8 py-3.5 text-base">
                  $ESX Token →
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-end">
              <Link href="/learn" className="btn-link text-lg">
                Learn more <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
