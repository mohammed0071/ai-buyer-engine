import Link from "next/link";

const stats = [
  { number: "30+", label: "Properties" },
  { number: "32+", label: "Countries" },
  { number: "10K", label: "Community Members" },
];

const audienceCards = [
  {
    icon: "🏠",
    title: "Retail Investors",
    description:
      "Learn how tokenized real estate works, the risks involved, and how regulated property access is structured.",
    href: "/retail",
    cta: "Learn How It Works",
  },
  {
    icon: "💼",
    title: "Professional Investors",
    description:
      "Structured access to tokenized real estate opportunities designed for qualified participants.",
    href: "/professional",
    cta: "Check Eligibility",
  },
  {
    icon: "🤝",
    title: "Property Partners",
    description:
      "Tokenize and distribute real estate assets using a compliance-first digital platform.",
    href: "/partnerships",
    cta: "Tokenize Property",
  },
  {
    icon: "🔗",
    title: "Token Ecosystem",
    description:
      "Understand how ownership, platform access, and participation are separated within EstateX.",
    href: "/token",
    cta: "Understand the Tokens",
  },
];

const whyCards = [
  {
    icon: "🔒",
    title: "Security",
    description:
      "Institutional-grade security with blockchain-backed transparency. Every asset is independently verified and legally structured for your protection.",
  },
  {
    icon: "⚡",
    title: "Speed",
    description:
      "Access real estate opportunities in minutes, not months. Our digital infrastructure removes the friction from traditional property investment.",
  },
  {
    icon: "📊",
    title: "Diversification",
    description:
      "Spread your exposure across multiple properties, locations, and asset types — all from a single platform with flexible entry points.",
  },
  {
    icon: "🔎",
    title: "Transparency",
    description:
      "On-chain records, auditable structures, and clear disclosure on every offering. Full visibility into how your investment is structured and performing.",
  },
];

const properties = [
  {
    title: "London Residential Portfolio",
    location: "London, UK",
    type: "Residential",
    status: "Live",
    gradient: "from-blue-500 to-blue-600",
    icon: "🏠",
  },
  {
    title: "Barcelona Mixed-Use Complex",
    location: "Barcelona, Spain",
    type: "Mixed-Use",
    status: "Coming Soon",
    gradient: "from-violet-500 to-violet-600",
    icon: "🏢",
  },
  {
    title: "Amsterdam Commercial Hub",
    location: "Amsterdam, Netherlands",
    type: "Commercial",
    status: "Coming Soon",
    gradient: "from-emerald-500 to-emerald-600",
    icon: "🏗️",
  },
];

const platformFeatures = [
  {
    icon: "⚖️",
    title: "Regulated Framework",
    description:
      "Built within established legal frameworks. Every offering is structured with compliance at its core across multiple jurisdictions.",
  },
  {
    icon: "🔗",
    title: "Tokenized Access",
    description:
      "Fractional ownership through blockchain technology. Lower entry points, transparent records, and programmable asset management.",
  },
  {
    icon: "🌐",
    title: "Global Reach",
    description:
      "Access properties across the UK, EU, and beyond. Multi-jurisdiction design means opportunities aren't limited by geography.",
  },
  {
    icon: "📈",
    title: "Portfolio Dashboard",
    description:
      "Track your holdings, monitor performance, and manage your real estate portfolio — all from one intuitive dashboard.",
  },
];

const structuralPoints = [
  "Single-asset tokenization",
  "Asset-backed only",
  "No rehypothecation or re-bundling",
  "Clear separation of ownership, access, and participation",
  "Compliance defined before distribution",
];

export default function Home() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero-pale pt-32 pb-20">
        <div className="relative z-10 mx-auto max-w-[1200px] px-6">
          <div className="max-w-2xl animate-fade-in-up">
            <div className="hero-badge">
              <span className="w-2 h-2 rounded-full bg-accent-green inline-block"></span>
              Tokenized Real Estate
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-navy-900 leading-[1.1] tracking-tight mb-6">
              Real Estate Investment,
              <br />
              <span className="text-navy-600">Reimagined</span>
            </h1>

            <p className="text-lg text-body max-w-lg mb-8 leading-relaxed">
              Access institutional-grade property through regulated, tokenized
              structures. Built for transparency, designed for everyone.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-16">
              <Link href="/learn" className="btn-cyan px-8 py-3.5 text-base">
                Learn How It Works
              </Link>
              <Link
                href="/about"
                className="btn-secondary px-8 py-3.5 text-base"
              >
                About EstateX
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-12">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold text-navy-900">
                    {stat.number}
                  </div>
                  <div className="text-xs text-muted uppercase tracking-wider mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHO IS ESTATEX FOR ===== */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-tag">Who is EstateX for?</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
              Modern Real Estate Access, Built for Regulated Markets
            </h2>
            <p className="text-body text-lg">
              A compliance-first platform for accessing real-world property through
              tokenization — designed for education, transparency, and regulated
              participation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {audienceCards.map((card) => (
              <div key={card.title} className="card group hover:border-navy-200 transition-colors">
                <div className="feature-icon-box group-hover:bg-navy-100 transition-colors">{card.icon}</div>
                <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                <p className="text-body text-sm leading-relaxed mb-4">
                  {card.description}
                </p>
                <Link href={card.href} className="btn-link text-sm">
                  {card.cta} <span>→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY ESTATEX ===== */}
      <section className="py-20 bg-section-alt">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-tag">Why EstateX</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
                Why EstateX Is Built Differently
              </h2>
              <p className="text-body text-lg mb-8">
                EstateX is designed around structural decisions that align tokenized
                real estate with institutional standards and regulatory expectations.
              </p>
              <div className="space-y-3">
                {structuralPoints.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <span className="text-accent-green font-bold mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-body text-sm">{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {whyCards.map((card) => (
                <div key={card.title} className="bg-white rounded-2xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-2xl mb-3">{card.icon}</div>
                  <h3 className="text-sm font-bold mb-1">{card.title}</h3>
                  <p className="text-body text-xs leading-relaxed">
                    {card.description.split('.')[0]}.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROPERTIES ===== */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="max-w-2xl mb-16">
            <span className="section-tag">Properties</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
              Featured Properties
            </h2>
            <p className="text-body text-lg">
              Explore curated real estate opportunities across prime locations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div key={property.title} className="card group">
                {/* Property visual */}
                <div className={`bg-gradient-to-br ${property.gradient} rounded-xl h-48 mb-4 flex flex-col items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/5"></div>
                  <span className="text-5xl mb-2 relative z-10 group-hover:scale-110 transition-transform duration-300">{property.icon}</span>
                  <span className="text-white/80 text-xs font-medium relative z-10">{property.location}</span>
                  {/* Illustrative badge */}
                  <span className="absolute top-3 left-3 text-[10px] font-medium text-white/60 bg-white/15 backdrop-blur-sm px-2 py-0.5 rounded-full">
                    Illustrative Only
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      property.status === "Live"
                        ? "bg-green-50 text-green-600"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {property.status}
                  </span>
                  <span className="text-xs text-muted">{property.type}</span>
                  <span className="text-xs text-muted ml-auto">PROPX</span>
                </div>
                <h3 className="text-lg font-bold mb-1">{property.title}</h3>
                <p className="text-body text-sm">{property.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PLATFORM FEATURES (green background) ===== */}
      <section className="py-20" style={{ background: "linear-gradient(135deg, #065f46 0%, #047857 50%, #059669 100%)" }}>
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="max-w-2xl mb-16">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-emerald-200 mb-2">
              Platform
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4 text-white">
              Platform Features
            </h2>
            <p className="text-lg text-emerald-100">
              Everything you need to access, manage, and grow your real estate
              portfolio.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platformFeatures.map((feature) => (
              <div
                key={feature.title}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 hover:border-white/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-emerald-100 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COMPLIANCE STRIP ===== */}
      <section className="py-16 bg-section-alt border-y border-border">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "🌐", title: "Jurisdictional Availability", desc: "Access depends on local regulation, investor classification, and eligibility." },
              { icon: "📄", title: "Token Classification", desc: "PROPX — property-linked security tokens. ESX — platform utility token. EstateX NFTs — digital participation assets." },
              { icon: "🔒", title: "Custody & Segregation", desc: "Digital assets and records are maintained using segregated, institutional-grade infrastructure." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="feature-icon-box flex-shrink-0">{item.icon}</div>
                <div>
                  <h3 className="font-bold text-navy-900 mb-1">{item.title}</h3>
                  <p className="text-body text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta-light py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-tag">Get Started</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
                Ready to Explore?
              </h2>
              <p className="text-lg text-body max-w-xl mb-8">
                Start with education. Understand the model, the risks, and how
                regulated real estate access works on EstateX.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/learn" className="btn-cyan px-8 py-3.5 text-base">
                  Learn the Model
                </Link>
                <Link href="/contact" className="btn-secondary px-8 py-3.5 text-base">
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-end">
              <Link href="/learn" className="btn-link text-lg">
                Start learning <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
