"use client";

import { useState } from "react";
import Link from "next/link";

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FaqItem[] = [
  {
    category: "General",
    question: "What is EstateX?",
    answer:
      "EstateX is a digital platform designed to provide access to real-world real estate structures using tokenization technology. It combines regulatory compliance, digital infrastructure, and property expertise to create structured, transparent access pathways for eligible participants.",
  },
  {
    category: "General",
    question: "What is tokenized real estate?",
    answer:
      "Tokenized real estate uses digital tokens to represent defined rights linked to a specific real-world property structure. Instead of purchasing an entire property directly, tokenization allows access to fractional exposure through tokens issued in connection with a specific legal structure.",
  },
  {
    category: "General",
    question: "Do PROPX tokens represent real property exposure?",
    answer:
      "PROPX tokens represent defined, fractional exposure to a specific real estate structure. Each PROPX token is linked to a single property via a defined legal and compliance framework. The rights, obligations, and limitations are set out in the offering documentation for each structure.",
  },
  {
    category: "Risk & Capital",
    question: "Is my capital guaranteed?",
    answer:
      "No. Tokenized real estate involves risk, including the potential loss of capital. Property values can go down as well as up, rental income is not guaranteed, and market conditions can change. You should only participate with capital you can afford to lose.",
  },
  {
    category: "Risk & Capital",
    question: "Is liquidity guaranteed?",
    answer:
      "No. Liquidity is not guaranteed. While EstateX may facilitate secondary trading in the future, there is no assurance that you will be able to sell your tokens at any given time or at a price that reflects the underlying asset value.",
  },
  {
    category: "Risk & Capital",
    question: "Can I sell my tokens at any time?",
    answer:
      "Not necessarily. Token transferability depends on the specific structure, applicable regulations, and whether a secondary market is available. Some tokens may be subject to lock-up periods or transfer restrictions.",
  },
  {
    category: "Access & Eligibility",
    question: "Why do I need identity verification?",
    answer:
      "Identity verification is required to comply with legal and regulatory obligations, including anti-money laundering (AML) and know-your-customer (KYC) requirements. This applies to all users before they can access any offering on the platform.",
  },
  {
    category: "Access & Eligibility",
    question: "How much does it cost?",
    answer:
      "Costs, fees, and expenses vary by structure and are disclosed in the offering documentation for each property. There may be platform fees, management fees, and transaction costs. Full fee breakdowns are provided before any participation decision.",
  },
  {
    category: "Access & Eligibility",
    question: "Is EstateX suitable for everyone?",
    answer:
      "No. EstateX may not be suitable for all users. Eligibility depends on jurisdiction, investor classification, and individual circumstances. Some offerings may only be available to professional or qualified investors.",
  },
  {
    category: "Access & Eligibility",
    question: "Who qualifies as a professional investor?",
    answer:
      "Professional investor status depends on jurisdiction and applicable regulations. In some markets, this may require meeting specific financial thresholds, experience requirements, or formal opt-in procedures. Details are provided during the onboarding process.",
  },
  {
    category: "Platform",
    question: "Does EstateX provide investment advice?",
    answer:
      "No. EstateX does not provide investment advice, financial advice, or personal recommendations. The platform provides information and access to structured offerings. Users should seek independent professional advice before making any investment decisions.",
  },
  {
    category: "Platform",
    question: "How are offerings structured?",
    answer:
      "Each property structure is reviewed and documented individually. Offerings include detailed information about the property, the legal structure, rights and obligations, fees, risks, and jurisdictional availability.",
  },
  {
    category: "Platform",
    question: "Are offerings pooled?",
    answer:
      "No. EstateX follows a single-asset, structure-by-structure approach. Each offering relates to a specific property with its own legal structure, economics, and risk profile. There is no pooling or blending of assets.",
  },
  {
    category: "Platform",
    question: "How is compliance handled?",
    answer:
      "EstateX is designed with a compliance-first approach. Regulatory considerations are built into every stage of the process, from property structuring through token issuance and ongoing operations. The platform works within established legal frameworks across multiple jurisdictions.",
  },
  {
    category: "Access & Eligibility",
    question: "Can professionals access earlier?",
    answer:
      "In some cases, professional investors may have access to offerings or features before they become available to other participant types. This reflects regulatory frameworks that distinguish between investor classifications.",
  },
  {
    category: "Partners",
    question: "Who can partner with EstateX?",
    answer:
      "EstateX works with property owners, developers, and distribution partners who meet the platform's due diligence and compliance requirements. Partners must align with EstateX's standards for transparency, regulatory compliance, and operational quality.",
  },
  {
    category: "Partners",
    question: "What does EstateX provide to partners?",
    answer:
      "Digital infrastructure, tokenization tooling, and access to a regulated platform designed for real estate tokenization. Partners benefit from compliance frameworks, investor access pathways, and operational support.",
  },
  {
    category: "Partners",
    question: "Does EstateX manage properties?",
    answer:
      "No. Property operations are handled by designated third-party professionals. EstateX provides the digital infrastructure and compliance framework, while property management, maintenance, and operational decisions are managed by qualified external parties.",
  },
  {
    category: "Partners",
    question: "How long does tokenization take?",
    answer:
      "Timelines vary depending on asset complexity, jurisdiction, legal structuring requirements, and compliance considerations. Each property goes through a thorough review process before tokens are issued.",
  },
  {
    category: "Partners",
    question: "Does EstateX guarantee demand?",
    answer:
      "No. EstateX does not guarantee investor participation, demand, or fundraising outcomes for any offering. The platform provides access infrastructure, but participation depends on market conditions and investor interest.",
  },
  {
    category: "Tokens",
    question: "What is the difference between PROPX and ESX?",
    answer:
      "PROPX is for property exposure -- each PROPX token represents defined rights linked to a specific real estate structure. ESX is a platform utility token used for platform engagement, staking, and access features. They serve fundamentally different purposes.",
  },
  {
    category: "Tokens",
    question: "Is ESX an investment?",
    answer:
      "No. ESX is a platform utility token designed for use within the EstateX ecosystem. It is not designed or intended as an investment product, and its value is not linked to any specific property or guaranteed return.",
  },
  {
    category: "Tokens",
    question: "Do NFTs represent ownership?",
    answer:
      "No. EstateX NFTs are digital collectibles and engagement tools. They do not represent ownership, equity, or any defined right in a property or legal structure. NFTs are separate from PROPX and ESX tokens.",
  },
  {
    category: "Tokens",
    question: "How does EstateX separate ownership and access?",
    answer:
      "Multi-token architecture. PROPX tokens provide defined property exposure, ESX tokens provide platform utility and access, and NFTs serve as collectibles and engagement tools. Each token type has distinct rights, limitations, and purposes clearly defined in platform documentation.",
  },
];

const categories = [
  "All",
  "General",
  "Risk & Capital",
  "Access & Eligibility",
  "Platform",
  "Partners",
  "Tokens",
];

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? faqs
      : faqs.filter((f) => f.category === activeCategory);

  return (
    <>
      {/* Hero — pale split layout */}
      <section className="hero-pale pt-32 pb-20">
        <div className="relative z-10 mx-auto max-w-[1200px] px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="hero-badge">
                <span className="w-2 h-2 rounded-full bg-accent-green inline-block"></span>
                FAQ
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-navy-900 leading-[1.1] tracking-tight mb-6">
                Frequently Asked
                <br />
                <span className="text-navy-600">Questions</span>
              </h1>
              <p className="text-lg text-body max-w-lg leading-relaxed">
                Everything you need to know about EstateX, tokenized real estate,
                and how the platform works.
              </p>
            </div>
            <div className="animate-fade-in-up animate-delay-200 hidden md:flex justify-center">
              <div className="hero-illustration animate-float max-w-xs w-full p-6">
                <div className="space-y-3">
                  {["General", "Risk & Capital", "Access", "Platform", "Tokens"].map((cat, i) => (
                    <div key={cat} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-section-alt transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-navy-100 text-navy-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {String(i + 1)}
                      </div>
                      <span className="text-sm font-medium text-navy-900">{cat}</span>
                      <span className="ml-auto text-muted text-xs">→</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 bg-section-alt border-b border-border sticky top-[72px] z-30 backdrop-blur-md bg-section-alt/95">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenIndex(null);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-navy-600 text-white"
                    : "bg-white text-body border border-border hover:border-navy-600 hover:text-navy-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-[800px] px-6">
          <div className="space-y-3">
            {filtered.map((faq, i) => (
              <div
                key={faq.question}
                className="border border-border rounded-2xl overflow-hidden transition-shadow hover:shadow-md"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-semibold text-navy-900 text-sm md:text-base">
                    {faq.question}
                  </span>
                  <span
                    className={`text-navy-600 text-xl flex-shrink-0 transition-transform ${
                      openIndex === i ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {openIndex === i && (
                  <div className="px-6 pb-5">
                    <p className="text-body text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
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
              <span className="section-tag">Need Help?</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
                Still Have Questions?
              </h2>
              <p className="text-lg text-body max-w-xl mb-8">
                Contact our team, or register to explore the platform yourself.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="btn-cyan px-8 py-3.5 text-base"
                >
                  Contact Us
                </Link>
                <Link
                  href="/learn"
                  className="btn-secondary px-8 py-3.5 text-base"
                >
                  Learn More
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
