import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — EstateX",
  description:
    "Who we are and why we're building the infrastructure for regulated real estate access.",
};

const pillars = [
  {
    icon: "⚖️",
    title: "Compliance First",
    description:
      "Every decision starts with regulatory clarity. We're not trying to move fast and fix it later -- we're building the right way from the ground up, across multiple jurisdictions.",
  },
  {
    icon: "📖",
    title: "Education Before Investment",
    description:
      "We believe informed participants make better decisions and create a healthier market. Our job right now is to help you understand exactly what tokenized real estate is, how it works, and what the risks are.",
  },
  {
    icon: "📈",
    title: "Structured Access",
    description:
      "Not open to everyone immediately -- and that's intentional. Eligibility, jurisdiction, and investor classification all matter. We're designing access pathways that are appropriate for each participant type.",
  },
  {
    icon: "🔎",
    title: "Full Transparency",
    description:
      "On-chain records, auditable structures, and clear disclosure on every offering. If you can't see exactly what you're investing in and how the economics work, you shouldn't invest. We agree.",
  },
];

const trackRecord = [
  {
    icon: "🏠",
    title: "Real Estate Track Record",
    description:
      "Institutional-grade property acquisition, management, and disposition across UK and European markets.",
  },
  {
    icon: "⚖️",
    title: "Regulated Markets Expertise",
    description:
      "Experience navigating FCA, MiCA, and cross-jurisdictional compliance frameworks for digital asset structures.",
  },
  {
    icon: "🔗",
    title: "Digital Infrastructure",
    description:
      "Built from the ground up with tokenization-native architecture -- not a legacy system retrofitted for blockchain.",
  },
  {
    icon: "🌐",
    title: "Multi-Jurisdiction Design",
    description:
      "Legal structures and compliance pathways designed for UK, EU, and international investor participation from day one.",
  },
];

const team = [
  { name: "CEO", role: "Chief Executive Officer", initials: "CE" },
  { name: "COO", role: "Chief Operating Officer", initials: "CO" },
  { name: "CTO", role: "Chief Technology Officer", initials: "CT" },
  {
    name: "Head of Compliance",
    role: "Regulatory & Compliance",
    initials: "HC",
  },
  {
    name: "Head of Real Estate",
    role: "Property & Acquisitions",
    initials: "HR",
  },
  {
    name: "Head of Partnerships",
    role: "Strategic Partnerships",
    initials: "HP",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero — pale split layout */}
      <section className="hero-pale pt-32 pb-20">
        <div className="relative z-10 mx-auto max-w-[1200px] px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="hero-badge">
                <span className="w-2 h-2 rounded-full bg-accent-green inline-block"></span>
                About EstateX
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-navy-900 leading-[1.1] tracking-tight mb-6">
                Building Infrastructure for
                <br />
                <span className="text-navy-600">Regulated Real Estate Access</span>
              </h1>
              <p className="text-lg text-body max-w-lg leading-relaxed mb-8">
                Real estate has always been one of the most reliable wealth-building
                tools available. We&apos;re working to make structured, compliant
                access to it available to more people.
              </p>
              <Link href="#problem" className="btn-link">
                Read our story <span>→</span>
              </Link>
            </div>
            <div className="animate-fade-in-up animate-delay-200 hidden md:flex justify-center">
              <div className="hero-illustration animate-float max-w-sm w-full">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Compliance", icon: "⚖️", color: "bg-blue-50 text-blue-600" },
                    { label: "Education", icon: "📖", color: "bg-green-50 text-green-600" },
                    { label: "Transparency", icon: "🔎", color: "bg-violet-50 text-violet-600" },
                    { label: "Access", icon: "📈", color: "bg-amber-50 text-amber-600" },
                  ].map((item) => (
                    <div key={item.label} className={`${item.color} rounded-xl p-4 text-center`}>
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <div className="text-xs font-semibold">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem — split content block */}
      <section id="problem" className="py-20 bg-white">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-tag">The Problem</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
                Real Estate Wealth Has Always Favoured Those Who Already Have It
              </h2>
              <p className="text-body text-lg leading-relaxed">
                To invest in institutional-grade property, you&apos;ve
                historically needed significant capital, the right connections, and
                access to markets that weren&apos;t designed for most people.
                Tokenization changes the structural economics of this. We&apos;re
                building the compliance and infrastructure layer that makes
                responsible, regulated access possible.
              </p>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="bg-section-alt rounded-2xl p-8 max-w-sm w-full">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <span className="text-body text-sm">High capital requirements</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <span className="text-body text-sm">Exclusive networks needed</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <span className="text-body text-sm">Opaque market access</span>
                  </div>
                  <div className="border-t border-border my-4"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-accent-green"></div>
                    <span className="text-navy-900 text-sm font-semibold">Tokenization changes this</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars */}
      <section className="py-20 bg-section-alt">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-tag">Our Approach</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
              Four Pillars That Guide Everything We Do
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p) => (
              <div key={p.title} className="card text-center">
                <div className="feature-icon-box mx-auto">{p.icon}</div>
                <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                <p className="text-body text-sm leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Background — split content */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 hidden md:flex justify-center">
              <div className="bg-navy-50 rounded-2xl p-8 max-w-sm w-full">
                <div className="text-center mb-4">
                  <div className="text-5xl font-bold text-navy-600 mb-1">10+</div>
                  <div className="text-sm text-muted uppercase tracking-wider">Years Combined Experience</div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-white rounded-xl p-3">
                    <div className="text-lg font-bold text-navy-900">UK</div>
                    <div className="text-xs text-muted">Primary Market</div>
                  </div>
                  <div className="bg-white rounded-xl p-3">
                    <div className="text-lg font-bold text-navy-900">EU</div>
                    <div className="text-xs text-muted">Expansion</div>
                  </div>
                  <div className="bg-white rounded-xl p-3">
                    <div className="text-lg font-bold text-navy-900">FCA</div>
                    <div className="text-xs text-muted">Compliance</div>
                  </div>
                  <div className="bg-white rounded-xl p-3">
                    <div className="text-lg font-bold text-navy-900">MiCA</div>
                    <div className="text-xs text-muted">Framework</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <span className="section-tag">Our Background</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
                Decades of Real Estate. Built for What&apos;s Coming Next.
              </h2>
              <p className="text-body text-lg leading-relaxed mb-6">
                The EstateX leadership team brings together experience from across
                regulated financial markets, institutional real estate, digital
                infrastructure, and compliance. We&apos;ve seen what works and
                what doesn&apos;t at the intersection of property and capital
                markets.
              </p>
              <p className="text-body text-lg leading-relaxed mb-8">
                We&apos;re not a crypto project that discovered real estate.
                We&apos;re real estate and financial markets professionals who have
                been building toward a regulated tokenization model for years.
              </p>
              <Link
                href="/learn"
                className="btn-link text-base"
              >
                Read: The Model <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Track Record Grid */}
      <section className="py-20 bg-section-alt">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-tag">Track Record</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
              What We Bring to the Table
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trackRecord.map((t) => (
              <div key={t.title} className="card text-center">
                <div className="feature-icon-box mx-auto">{t.icon}</div>
                <h3 className="text-lg font-bold mb-2">{t.title}</h3>
                <p className="text-body text-sm leading-relaxed">
                  {t.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-tag">Leadership</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
              The Team
            </h2>
            <p className="text-body text-lg">
              Experienced operators from real estate, financial services,
              compliance, and digital infrastructure.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((person) => (
              <div key={person.role} className="card text-center">
                <div className="w-20 h-20 rounded-full bg-navy-50 text-navy-600 flex items-center justify-center font-bold text-xl mx-auto mb-4 border-2 border-navy-100">
                  {person.initials}
                </div>
                <h3 className="font-bold text-lg">{person.name}</h3>
                <p className="text-navy-600 text-sm font-medium">
                  {person.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — light split layout */}
      <section className="cta-light py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-tag">Next Steps</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
                Want to Know More Before You Register?
              </h2>
              <p className="text-lg text-body max-w-xl mb-8">
                That&apos;s exactly the right instinct. Start with The Model — a
                plain-English explanation of how the platform works.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/learn"
                  className="btn-cyan px-8 py-3.5 text-base"
                >
                  Read: The Model →
                </Link>
                <Link
                  href="/"
                  className="btn-secondary px-8 py-3.5 text-base"
                >
                  Back to Home
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
