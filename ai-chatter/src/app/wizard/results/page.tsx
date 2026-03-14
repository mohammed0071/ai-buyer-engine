import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started — EstateX",
  description: "Find the right path for you on EstateX.",
};

const paths = [
  {
    icon: "🏠",
    title: "Retail Investors",
    description: "Start with education, then explore regulated property access.",
    href: "/retail",
    cta: "Get Started",
  },
  {
    icon: "💼",
    title: "Professional Investors",
    description: "Priority access, enhanced reporting, concierge service.",
    href: "/professional",
    cta: "Check Eligibility",
  },
  {
    icon: "🤝",
    title: "Partners",
    description: "Tokenize your properties through our regulated platform.",
    href: "/partnerships",
    cta: "Explore Partnerships",
  },
];

export default function ResultsPage() {
  return (
    <>
      <section className="hero-pale pt-32 pb-20">
        <div className="relative z-10 mx-auto max-w-[1200px] px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in-up">
            <div className="hero-badge mx-auto">
              <span className="w-2 h-2 rounded-full bg-accent-green inline-block"></span>
              Choose Your Path
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mt-4 mb-4">
              Find the Right Path
            </h1>
            <p className="text-lg text-body">
              Select the option that best matches your needs.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {paths.map((p) => (
              <div key={p.title} className="card text-center">
                <span className="text-4xl block mb-4">{p.icon}</span>
                <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                <p className="text-body text-sm mb-6">{p.description}</p>
                <Link href={p.href} className="btn-cyan text-sm px-6 py-2.5 w-full">
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
