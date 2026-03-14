import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partnerships — EstateX",
  description:
    "List your properties on EstateX and unlock new capital through regulated tokenization infrastructure.",
};

const partnerTypes = [
  {
    icon: "🏢",
    title: "Property Owners",
    description:
      "List your properties on a regulated tokenization platform. Access a new class of investors and unlock liquidity without selling outright.",
    features: [
      "Fractional ownership structure",
      "Retain management control",
      "Access global investor base",
      "Transparent on-chain records",
    ],
  },
  {
    icon: "🏗️",
    title: "Developers",
    description:
      "Fund new developments through tokenized capital raises. Reach investors earlier in the cycle with compliant, structured offerings.",
    features: [
      "Pre-development capital access",
      "Regulatory-ready structuring",
      "Investor communication tools",
      "Milestone-based disbursement",
    ],
  },
  {
    icon: "🏦",
    title: "Institutions",
    description:
      "Distribute real estate exposure to your clients through our regulated infrastructure. White-label solutions available.",
    features: [
      "White-label platform access",
      "Compliance framework included",
      "Multi-jurisdiction support",
      "API-first integration",
    ],
  },
];

const process = [
  {
    step: "01",
    title: "Initial Conversation",
    description:
      "We learn about your assets, goals, and jurisdictional requirements. No commitment — just a conversation to see if there's a fit.",
  },
  {
    step: "02",
    title: "Due Diligence & Structuring",
    description:
      "Our compliance and legal teams review the asset and design an appropriate legal and tokenization structure for your property.",
  },
  {
    step: "03",
    title: "Token Issuance",
    description:
      "PROPX tokens are created and linked to the specific property structure. Full documentation is prepared for eligible investors.",
  },
  {
    step: "04",
    title: "Go Live & Distribution",
    description:
      "Your property listing goes live on EstateX. Eligible investors can participate, and you gain access to new capital pathways.",
  },
];

const stats = [
  { value: "£50M+", label: "Assets in Pipeline" },
  { value: "3", label: "Jurisdictions" },
  { value: "100%", label: "Compliance Coverage" },
  { value: "24/7", label: "Platform Availability" },
];

export default function PartnershipsPage() {
  return (
    <>
      {/* ===== SPLIT HERO ===== */}
      <section className="hero-pale pt-32 pb-20 overflow-hidden">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text content */}
            <div className="animate-fade-in-up">
              <div className="hero-badge">
                <span className="w-2 h-2 rounded-full bg-accent-green inline-block"></span>
                Property Owners & Institutions
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-navy-900 leading-[1.1] tracking-tight mb-6">
                Expand Your <br />
                <span className="text-navy-600">Reach</span>
              </h1>

              <p className="text-lg text-body max-w-lg mb-8 leading-relaxed">
                List your properties on EstateX and unlock access to a global network of eligible investors. Our regulated tokenization infrastructure handles compliance, structuring, and distribution.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="#how-it-works" className="btn-cyan px-8 py-3.5 text-base">
                  Learn More
                </Link>
                <Link href="/contact" className="btn-secondary px-8 py-3.5 text-base">
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Right: Mockup */}
            <div className="animate-fade-in-up animate-delay-200 hidden md:flex items-center justify-center">
              <div className="hero-illustration animate-float max-w-xs w-full p-6">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: "🏢", label: "Owners" },
                    { icon: "🏗️", label: "Developers" },
                    { icon: "🏦", label: "Institutions" },
                    { icon: "⚖️", label: "Compliance" },
                    { icon: "🌐", label: "Global" },
                    { icon: "📈", label: "Growth" },
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col items-center gap-1 p-3 rounded-xl bg-section-alt">
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-[10px] text-muted font-medium text-center leading-tight">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="py-12 bg-white border-b border-border">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-navy-900">
                  {stat.value}
                </div>
                <div className="text-sm text-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PARTNER TYPES ===== */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-tag">Who We Work With</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
              Partnership Pathways
            </h2>
            <p className="text-body text-lg">
              Whether you own a single property or manage a portfolio of
              hundreds, EstateX provides the infrastructure to tokenize and
              distribute real estate exposure.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {partnerTypes.map((type) => (
              <div key={type.title} className="card">
                <div className="text-3xl mb-4">{type.icon}</div>
                <h3 className="text-xl font-bold mb-3">{type.title}</h3>
                <p className="text-body text-sm leading-relaxed mb-5">
                  {type.description}
                </p>
                <ul className="space-y-2">
                  {type.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-body"
                    >
                      <span className="text-green-500 mt-0.5 flex-shrink-0">
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="py-20 bg-section-alt">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-tag">How It Works</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
              From Property to Platform in Four Steps
            </h2>
            <p className="text-body text-lg">
              A clear, structured process designed for transparency and
              compliance at every stage.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step) => (
              <div key={step.step} className="card relative">
                <div className="text-4xl font-bold text-navy-100 absolute top-4 right-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold mb-3 mt-2">{step.title}</h3>
                <p className="text-body text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHAT WE PROVIDE ===== */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="section-tag">What You Get</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
                Everything You Need to Tokenize
              </h2>
              <div className="space-y-5">
                {[
                  {
                    title: "Compliance Framework",
                    desc: "Multi-jurisdiction regulatory coverage including FCA and MiCA readiness.",
                  },
                  {
                    title: "Legal Structuring",
                    desc: "Purpose-built legal frameworks for each property offering.",
                  },
                  {
                    title: "Tokenization Infrastructure",
                    desc: "End-to-end digital infrastructure from token creation to investor onboarding.",
                  },
                  {
                    title: "Investor Access",
                    desc: "Distribution to a growing network of verified, eligible investors.",
                  },
                  {
                    title: "Ongoing Support",
                    desc: "Reporting, investor communications, and operational support post-launch.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-navy-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-navy-600 text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy-900">
                        {item.title}
                      </h4>
                      <p className="text-body text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side visual */}
            <div className="hidden md:block">
              <div className="bg-section-alt rounded-2xl p-8 border border-border">
                <div className="space-y-4">
                  {[
                    { label: "Properties Onboarded", value: "12", trend: "+3 this quarter" },
                    { label: "Total Tokens Issued", value: "45,000+", trend: "PROPX" },
                    { label: "Investor Participants", value: "2,400+", trend: "Across 3 jurisdictions" },
                    { label: "Average Time to Launch", value: "8 weeks", trend: "From initial review" },
                  ].map((metric) => (
                    <div
                      key={metric.label}
                      className="flex items-center justify-between py-3 border-b border-border last:border-0"
                    >
                      <div>
                        <p className="text-sm font-semibold text-navy-900">
                          {metric.label}
                        </p>
                        <p className="text-xs text-muted">{metric.trend}</p>
                      </div>
                      <div className="text-xl font-bold text-navy-600">
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — light split layout */}
      <section className="cta-light py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-tag">Get In Touch</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
                Ready to Explore a Partnership?
              </h2>
              <p className="text-lg text-body max-w-xl mb-8">
                Whether you&apos;re a property owner, developer, or institution —
                we&apos;d like to hear from you. No commitment required.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="btn-cyan px-8 py-3.5 text-base"
                >
                  Start a Conversation
                </Link>
                <Link
                  href="/learn"
                  className="btn-secondary px-8 py-3.5 text-base"
                >
                  Read: The Model →
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-end">
              <Link href="/contact" className="btn-link text-lg">
                Contact us <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
