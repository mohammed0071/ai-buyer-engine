import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Retail Investors — EstateX",
  description:
    "Learn how tokenized real estate works, the risks involved, and how regulated property access is structured for retail investors.",
};

const benefits = [
  {
    icon: "🏠",
    title: "Fractional Property Access",
    description:
      "Access real estate exposure without needing hundreds of thousands in capital. Tokenization enables fractional participation in institutional-grade property structures.",
  },
  {
    icon: "📖",
    title: "Education First",
    description:
      "We believe you should understand exactly what you're participating in before you commit any capital. Our Learn section covers everything in plain language.",
  },
  {
    icon: "⚖️",
    title: "Regulated Framework",
    description:
      "Every offering is structured within established legal frameworks. Compliance isn't an afterthought — it's the foundation of every property listing.",
  },
  {
    icon: "🔎",
    title: "Full Transparency",
    description:
      "On-chain records, clear fee structures, and detailed offering documentation. You'll know exactly what you're investing in and how it's structured.",
  },
];

const howItWorks = [
  {
    num: "01",
    title: "Learn",
    description:
      "Start by understanding how tokenized real estate works, what the risks are, and how EstateX structures access.",
  },
  {
    num: "02",
    title: "Verify Identity",
    description:
      "Complete KYC verification to meet regulatory requirements. This is required before accessing any offering.",
  },
  {
    num: "03",
    title: "Browse Properties",
    description:
      "Explore available property offerings with full documentation, risk disclosure, and structure details.",
  },
  {
    num: "04",
    title: "Participate",
    description:
      "Access eligible offerings and manage your portfolio through the EstateX dashboard.",
  },
];

const faqs = [
  {
    q: "How much do I need to get started?",
    a: "Entry points vary by offering. Tokenization enables lower minimums than traditional property investment, but specific amounts depend on each structure.",
  },
  {
    q: "Is my money safe?",
    a: "Capital is at risk. Property values can go down as well as up, and liquidity is not guaranteed. You should only participate with capital you can afford to lose.",
  },
  {
    q: "Can I sell my tokens?",
    a: "Transferability depends on the specific structure and applicable regulations. Secondary markets may be limited, and lock-up periods may apply.",
  },
];

export default function RetailPage() {
  return (
    <>
      {/* Hero — pale split layout */}
      <section className="hero-pale pt-32 pb-20">
        <div className="relative z-10 mx-auto max-w-[1200px] px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="hero-badge">
                <span className="w-2 h-2 rounded-full bg-accent-green inline-block"></span>
                Retail Investors
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-navy-900 leading-[1.1] tracking-tight mb-6">
                Real Estate Access,
                <br />
                <span className="text-navy-600">Simplified</span>
              </h1>
              <p className="text-lg text-body max-w-lg leading-relaxed mb-8">
                Learn how tokenized real estate works, understand the risks, and
                explore regulated property access designed with transparency at
                its core.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/learn" className="btn-cyan px-8 py-3.5 text-base">
                  Learn How It Works
                </Link>
                <Link href="/faq" className="btn-secondary px-8 py-3.5 text-base">
                  Read the FAQ
                </Link>
              </div>
            </div>
            <div className="animate-fade-in-up animate-delay-200 hidden md:flex justify-center">
              <div className="hero-illustration animate-float max-w-sm w-full">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-border">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-lg">🏠</div>
                  <div>
                    <div className="text-navy-900 font-semibold text-sm">Your Property Portfolio</div>
                    <div className="text-muted text-xs">Fractional access to real estate</div>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "London Residential", value: "250 PROPX", color: "bg-blue-50" },
                    { label: "Barcelona Mixed-Use", value: "180 PROPX", color: "bg-green-50" },
                    { label: "Amsterdam Commercial", value: "120 PROPX", color: "bg-violet-50" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between p-3 rounded-xl bg-section-alt">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center text-sm`}>🏢</div>
                        <span className="text-sm font-medium text-navy-900">{item.label}</span>
                      </div>
                      <span className="text-xs text-muted font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-tag">Why EstateX</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
              Built for Individual Investors
            </h2>
            <p className="text-body text-lg">
              Access property markets that were previously reserved for
              institutional players — with education and transparency at every step.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="card text-center">
                <div className="feature-icon-box mx-auto">{b.icon}</div>
                <h3 className="text-lg font-bold mb-2">{b.title}</h3>
                <p className="text-body text-sm leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-section-alt">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-tag">Getting Started</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
              How It Works for You
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step) => (
              <div key={step.num} className="card text-center">
                <div className="w-12 h-12 rounded-full bg-navy-100 text-navy-600 flex items-center justify-center text-lg font-bold mx-auto mb-3">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-body text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Risk Notice */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-[800px] px-6">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <span className="text-2xl flex-shrink-0">⚠️</span>
              <div>
                <h3 className="text-lg font-bold text-navy-900 mb-2">Important Risk Information</h3>
                <p className="text-body text-sm leading-relaxed mb-3">
                  Tokenized real estate involves risk, including the potential loss of capital. Property values can go down as well as up, rental income is not guaranteed, and market conditions can change.
                </p>
                <p className="text-body text-sm leading-relaxed">
                  You should only participate with capital you can afford to lose. EstateX does not provide financial, investment, or tax advice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick FAQs */}
      <section className="py-20 bg-section-alt">
        <div className="mx-auto max-w-[800px] px-6">
          <div className="text-center mb-12">
            <span className="section-tag">Common Questions</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
              Quick Answers
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="card">
                <h3 className="font-bold text-navy-900 mb-2">{faq.q}</h3>
                <p className="text-body text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/faq" className="btn-link text-base">
              View all FAQs <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-light py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-tag">Next Steps</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
                Start With Education
              </h2>
              <p className="text-lg text-body max-w-xl mb-8">
                The best investment decision starts with understanding. Read our
                Learn page for a complete overview of how tokenized real estate works.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/learn" className="btn-cyan px-8 py-3.5 text-base">
                  Learn the Model
                </Link>
                <Link href="/about" className="btn-secondary px-8 py-3.5 text-base">
                  About EstateX
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
