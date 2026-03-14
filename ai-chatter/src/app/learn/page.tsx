import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn — EstateX",
  description:
    "Learn how tokenized real estate works. A clear, plain-language explanation of how real estate tokenization is structured.",
};

const keyPoints = [
  "No pooled or blended asset exposure",
  "Clear separation between ownership, platform access, and engagement",
  "Defined rights and limitations at the offering level",
  "Jurisdiction-specific eligibility and availability",
];

const steps = [
  {
    num: "01",
    title: "Property Structuring",
    description:
      "Each property is reviewed and placed into an appropriate legal structure.",
  },
  {
    num: "02",
    title: "Compliance & Eligibility",
    description:
      "Regulatory considerations, eligibility requirements, and jurisdictional availability are defined for each structure.",
  },
  {
    num: "03",
    title: "Token Issuance",
    description:
      "Digital tokens are issued in connection with the specific property structure.",
  },
  {
    num: "04",
    title: "Access (If Eligible)",
    description:
      "Eligible users may access tokens subject to applicable requirements.",
  },
  {
    num: "05",
    title: "Ongoing Operations",
    description:
      "Property operations are managed by designated third-party professionals.",
  },
];

const notList = [
  "Not a savings account",
  "Not a guaranteed-income product",
  "Not a pooled real estate fund",
  "Not a substitute for regulated savings or pension products",
  "Not financial, investment, or tax advice",
];

const risks = [
  "Capital is at risk",
  "Liquidity is not guaranteed",
  "Property performance may vary",
  "Regulatory treatment may change",
  "Secondary markets may be limited",
];

export default function LearnPage() {
  return (
    <>
      {/* Hero — pale split layout */}
      <section className="hero-pale pt-32 pb-20">
        <div className="relative z-10 mx-auto max-w-[1200px] px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="hero-badge">
                <span className="w-2 h-2 rounded-full bg-accent-green inline-block"></span>
                Education
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-navy-900 leading-[1.1] tracking-tight mb-6">
                Learn How Tokenized
                <br />
                <span className="text-navy-600">Real Estate Works</span>
              </h1>
              <p className="text-lg text-body max-w-lg leading-relaxed mb-8">
                A clear, plain-language explanation of how real estate tokenization
                is structured, how access is provided, and what risks and
                limitations participants should understand.
              </p>
              <Link href="#what-is" className="btn-link">
                Start reading <span>→</span>
              </Link>
            </div>
            <div className="animate-fade-in-up animate-delay-200 hidden md:flex justify-center">
              <div className="hero-illustration animate-float max-w-sm w-full">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-border">
                  <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center text-lg">🏠</div>
                  <div>
                    <div className="text-navy-900 font-semibold text-sm">Tokenized Property</div>
                    <div className="text-muted text-xs">Single-asset structure</div>
                  </div>
                </div>
                <div className="space-y-3">
                  {["Legal Structure", "Compliance Layer", "Token Issuance", "Investor Access", "Operations"].map((label, i) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-navy-100 text-navy-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="flex-1 h-2 bg-navy-100 rounded-full overflow-hidden">
                        <div className="h-full bg-navy-600 rounded-full" style={{ width: `${100 - i * 15}%` }}></div>
                      </div>
                      <span className="text-xs text-muted w-24 text-right">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro disclaimer */}
      <section className="py-12 bg-white border-b border-border">
        <div className="mx-auto max-w-[1200px] px-6">
          <p className="text-body text-sm leading-relaxed max-w-3xl mx-auto text-center italic">
            This page is designed to help users understand the mechanics of
            tokenized real estate before taking any further steps. It is
            educational in nature and does not constitute financial or investment
            advice.
          </p>
        </div>
      </section>

      {/* What Is */}
      <section id="what-is" className="py-20 bg-white">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="max-w-3xl mx-auto">
            <span className="section-tag">What Is It</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
              What Is Tokenized Real Estate?
            </h2>
            <p className="text-body text-lg leading-relaxed mb-6">
              Tokenized real estate uses digital tokens to represent defined
              rights linked to real-world property structures. Instead of
              purchasing an entire property directly, tokenization allows access
              to fractional exposure through tokens issued in connection with a
              specific legal structure.
            </p>
            <p className="text-body text-lg leading-relaxed mb-8">
              Each structure defines the rights, obligations, and limitations
              associated with participation. Tokenization does not change the
              underlying nature of real estate assets. It changes how access,
              record-keeping, and participation are managed using digital
              infrastructure.
            </p>

            {/* Key Points */}
            <div className="grid sm:grid-cols-2 gap-4">
              {keyPoints.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-3 bg-section-alt rounded-xl p-4"
                >
                  <span className="text-accent-green font-bold mt-0.5">✓</span>
                  <span className="text-body text-sm">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5 Steps */}
      <section className="py-20 bg-section-alt">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-tag">How It Works</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
              The Process: 5 Steps
            </h2>
          </div>
          <div className="grid md:grid-cols-5 gap-6">
            {steps.map((step) => (
              <div key={step.num} className="card text-center">
                <div className="w-12 h-12 rounded-full bg-navy-100 text-navy-600 flex items-center justify-center text-lg font-bold mx-auto mb-3">
                  {step.num}
                </div>
                <h3 className="text-base font-bold mb-2">{step.title}</h3>
                <p className="text-body text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What This Is NOT */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="max-w-3xl mx-auto">
            <span className="section-tag">Important</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
              What This Is Not
            </h2>
            <div className="space-y-3">
              {notList.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 bg-red-50 rounded-xl p-4 border border-red-100"
                >
                  <span className="text-red-500 font-bold mt-0.5">✗</span>
                  <span className="text-body text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="py-20 bg-section-alt">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="max-w-3xl mx-auto">
            <span className="section-tag">Security</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
              Security & Verification
            </h2>
            <p className="text-body text-lg leading-relaxed mb-4">
              Identity verification (KYC) is required for all participants
              before accessing any offering on the platform. This is a
              regulatory requirement and a core part of our commitment to
              operating within established legal frameworks.
            </p>
            <p className="text-body text-lg leading-relaxed">
              Digital records are maintained using secure, segregated
              infrastructure. All transaction records and ownership data are
              stored on-chain with additional off-chain backups for redundancy.
            </p>
          </div>
        </div>
      </section>

      {/* Risks */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="max-w-3xl mx-auto">
            <span className="section-tag">Risk Disclosure</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
              Risks You Should Understand
            </h2>
            <div className="space-y-3">
              {risks.map((risk) => (
                <div
                  key={risk}
                  className="flex items-start gap-3 bg-amber-50 rounded-xl p-4 border border-amber-100"
                >
                  <span className="text-amber-500 font-bold mt-0.5">⚠️</span>
                  <span className="text-body text-sm">{risk}</span>
                </div>
              ))}
            </div>
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
                Ready to Explore Further?
              </h2>
              <p className="text-lg text-body max-w-xl mb-8">
                Now that you understand how the model works, explore the platform or
                read our FAQ for more detail.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/faq" className="btn-cyan px-8 py-3.5 text-base">
                  Read the FAQ
                </Link>
                <Link
                  href="/about"
                  className="btn-secondary px-8 py-3.5 text-base"
                >
                  About Us
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-end">
              <Link href="/faq" className="btn-link text-lg">
                Learn more <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
