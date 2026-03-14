import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional Investors — EstateX",
  description:
    "Structured access to tokenized real estate opportunities designed for qualified and professional participants.",
};

const advantages = [
  {
    icon: "⚡",
    title: "Priority Access",
    description:
      "Professional investors may access offerings and features before they become available to other participant types, reflecting regulatory frameworks that distinguish investor classifications.",
  },
  {
    icon: "📊",
    title: "Enhanced Reporting",
    description:
      "Detailed portfolio analytics, property performance data, and structured reporting designed for professional due diligence requirements.",
  },
  {
    icon: "🤝",
    title: "Concierge Service",
    description:
      "Dedicated relationship management for qualified participants. Direct access to our structuring and compliance teams for complex requirements.",
  },
  {
    icon: "🌐",
    title: "Multi-Jurisdiction Access",
    description:
      "Access to offerings across UK, EU, and international structures with compliance pathways designed for cross-border professional participation.",
  },
];

const eligibility = [
  {
    title: "FCA Professional Investor",
    description:
      "Meets the criteria for professional client classification under FCA rules, including elective professional client opt-in procedures.",
    jurisdiction: "UK",
  },
  {
    title: "MiFID II Professional Client",
    description:
      "Classified as a professional client under MiFID II, meeting specific financial thresholds and experience requirements.",
    jurisdiction: "EU",
  },
  {
    title: "Qualified Investor",
    description:
      "Meets applicable qualified investor criteria in relevant jurisdictions, including net worth and sophistication requirements.",
    jurisdiction: "International",
  },
];

const offerings = [
  {
    icon: "🏢",
    title: "Single-Asset PROPX Structures",
    description:
      "Direct tokenized exposure to individual institutional-grade properties with full structural documentation.",
  },
  {
    icon: "💎",
    title: "Premium Property Access",
    description:
      "Priority allocation on high-value property structures that may not be available to retail participants.",
  },
  {
    icon: "📈",
    title: "Staking & Yield Opportunities",
    description:
      "Enhanced platform engagement through ESX staking with professional-tier benefits and access features.",
  },
];

export default function ProfessionalPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-pale pt-32 pb-20">
        <div className="relative z-10 mx-auto max-w-[1200px] px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="hero-badge">
                <span className="w-2 h-2 rounded-full bg-accent-green inline-block"></span>
                Professional Investors
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-navy-900 leading-[1.1] tracking-tight mb-6">
                Structured Access for
                <br />
                <span className="text-navy-600">Qualified Participants</span>
              </h1>
              <p className="text-lg text-body max-w-lg leading-relaxed mb-8">
                Tokenized real estate opportunities designed for professional and
                institutional investors. Priority access, enhanced reporting, and
                dedicated support.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/contact" className="btn-cyan px-8 py-3.5 text-base">
                  Apply for Access
                </Link>
                <Link href="/learn" className="btn-secondary px-8 py-3.5 text-base">
                  Read the Model
                </Link>
              </div>
            </div>
            <div className="animate-fade-in-up animate-delay-200 hidden md:flex justify-center">
              <div className="hero-illustration animate-float max-w-sm w-full">
                <div className="text-center mb-5 pb-4 border-b border-border">
                  <div className="inline-flex items-center gap-2 bg-navy-100 text-navy-600 text-xs font-semibold px-4 py-2 rounded-full mb-3">
                    💼 Professional Tier
                  </div>
                  <div className="text-2xl font-bold text-navy-900">Enhanced Access</div>
                  <div className="text-xs text-muted mt-1">Priority · Reporting · Concierge</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Properties", value: "30+", color: "bg-blue-50 text-blue-600" },
                    { label: "Jurisdictions", value: "3+", color: "bg-green-50 text-green-600" },
                    { label: "Avg. Yield", value: "6-8%", color: "bg-violet-50 text-violet-600" },
                    { label: "Min. Entry", value: "Flexible", color: "bg-amber-50 text-amber-600" },
                  ].map((item) => (
                    <div key={item.label} className={`${item.color} rounded-xl p-3 text-center`}>
                      <div className="text-lg font-bold">{item.value}</div>
                      <div className="text-[10px] font-semibold mt-0.5 opacity-70">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-tag">Professional Advantages</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
              Built for Professional Standards
            </h2>
            <p className="text-body text-lg">
              Features and access levels designed to meet the expectations and
              requirements of qualified investors.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((a) => (
              <div key={a.title} className="card text-center">
                <div className="feature-icon-box mx-auto">{a.icon}</div>
                <h3 className="text-lg font-bold mb-2">{a.title}</h3>
                <p className="text-body text-sm leading-relaxed">{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-20 bg-section-alt">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-tag">Eligibility</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
              Who Qualifies?
            </h2>
            <p className="text-body text-lg">
              Professional investor status depends on jurisdiction and applicable
              regulations.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {eligibility.map((e) => (
              <div key={e.title} className="card">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-navy-100 text-navy-600">
                    {e.jurisdiction}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2">{e.title}</h3>
                <p className="text-body text-sm leading-relaxed">{e.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-tag">Offerings</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
                What&apos;s Available
              </h2>
              <div className="space-y-6">
                {offerings.map((o) => (
                  <div key={o.title} className="flex items-start gap-4">
                    <div className="feature-icon-box flex-shrink-0">{o.icon}</div>
                    <div>
                      <h3 className="font-bold text-navy-900 mb-1">{o.title}</h3>
                      <p className="text-body text-sm leading-relaxed">{o.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-section-alt rounded-2xl p-8 border border-border">
                <h3 className="font-bold text-navy-900 mb-6 text-center">Professional Dashboard Preview</h3>
                <div className="space-y-4">
                  {[
                    { label: "Active Holdings", value: "12 Properties", icon: "🏢" },
                    { label: "Portfolio Value", value: "£2.4M", icon: "💰" },
                    { label: "Weighted Yield", value: "6.8%", icon: "📈" },
                    { label: "Next Distribution", value: "Q2 2026", icon: "📅" },
                  ].map((m) => (
                    <div key={m.label} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{m.icon}</span>
                        <span className="text-sm font-medium text-navy-900">{m.label}</span>
                      </div>
                      <span className="text-sm font-bold text-navy-600">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-light py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-tag">Get Started</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
                Ready to Apply?
              </h2>
              <p className="text-lg text-body max-w-xl mb-8">
                Contact our team to discuss your eligibility and explore professional
                access to tokenized real estate on EstateX.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/contact" className="btn-cyan px-8 py-3.5 text-base">
                  Apply for Professional Access
                </Link>
                <Link href="/partnerships" className="btn-secondary px-8 py-3.5 text-base">
                  Partnership Enquiry
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-end">
              <Link href="/contact" className="btn-link text-lg">
                Get in touch <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
