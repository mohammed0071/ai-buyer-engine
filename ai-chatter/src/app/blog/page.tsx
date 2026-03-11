import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — EstateX",
  description:
    "Articles and insights on tokenized real estate, compliance, and the future of property investment.",
};

interface BlogPost {
  title: string;
  category: string;
  excerpt: string;
}

const posts: BlogPost[] = [
  // Pillar Articles
  {
    category: "Pillar Articles",
    title: "What Is Tokenized Real Estate and How Does It Work?",
    excerpt:
      "A comprehensive overview of real estate tokenization, from the basics of digital tokens to how property structures are created and managed.",
  },
  {
    category: "Pillar Articles",
    title: "The EstateX Model: How We Structure Real Estate Access",
    excerpt:
      "An in-depth look at how EstateX approaches property structuring, compliance, and investor access across jurisdictions.",
  },
  {
    category: "Pillar Articles",
    title: "Why Compliance Comes First in Real Estate Tokenization",
    excerpt:
      "How EstateX builds regulatory clarity into every stage of the tokenization process -- and why it matters.",
  },

  // Mechanics & Process
  {
    category: "Mechanics & Process",
    title: "How a Property Goes from Bricks to Tokens",
    excerpt:
      "The step-by-step process of structuring a real estate asset for tokenization, from due diligence to token issuance.",
  },
  {
    category: "Mechanics & Process",
    title: "Understanding KYC and Eligibility Requirements",
    excerpt:
      "Why identity verification is required, how it works, and what participants need to know before accessing offerings.",
  },
  {
    category: "Mechanics & Process",
    title: "How Property Operations Work After Tokenization",
    excerpt:
      "What happens after tokens are issued: property management, reporting, and ongoing obligations explained.",
  },

  // Definition & Rights
  {
    category: "Definition & Rights",
    title: "What Rights Do PROPX Tokens Actually Represent?",
    excerpt:
      "A clear explanation of the defined rights, obligations, and limitations associated with PROPX property tokens.",
  },
  {
    category: "Definition & Rights",
    title: "ESX vs PROPX: Understanding the Multi-Token Architecture",
    excerpt:
      "How EstateX separates platform utility from property exposure using distinct token types.",
  },
  {
    category: "Definition & Rights",
    title: "NFTs on EstateX: What They Are and What They Aren't",
    excerpt:
      "EstateX NFTs are digital collectibles -- not ownership instruments. Here's what that means.",
  },

  // Risks & Limitations
  {
    category: "Risks & Limitations",
    title: "Capital Risk in Tokenized Real Estate: What You Need to Know",
    excerpt:
      "An honest look at the risks involved in tokenized real estate, including capital loss, liquidity limitations, and market variability.",
  },
  {
    category: "Risks & Limitations",
    title: "Why Liquidity Is Not Guaranteed",
    excerpt:
      "Understanding the difference between tokenization and instant liquidity -- and why secondary markets may be limited.",
  },
  {
    category: "Risks & Limitations",
    title: "Regulatory Risk: How Changing Rules Could Affect Tokenized Assets",
    excerpt:
      "What happens if regulations change? How EstateX approaches regulatory uncertainty and jurisdictional variation.",
  },

  // Comparisons & Misconceptions
  {
    category: "Comparisons & Misconceptions",
    title: "Tokenized Real Estate vs REITs: Key Differences",
    excerpt:
      "How single-asset tokenized structures differ from pooled real estate investment trusts in rights, risk, and access.",
  },
  {
    category: "Comparisons & Misconceptions",
    title: "Is Tokenized Real Estate Just Another Crypto Product?",
    excerpt:
      "Why EstateX is built by real estate professionals, not a crypto project that discovered property.",
  },
  {
    category: "Comparisons & Misconceptions",
    title: "Common Misconceptions About Real Estate Tokenization",
    excerpt:
      "Addressing the most frequent misunderstandings -- from guaranteed returns to instant liquidity.",
  },
];

const categories = [
  "All",
  "Pillar Articles",
  "Mechanics & Process",
  "Definition & Rights",
  "Risks & Limitations",
  "Comparisons & Misconceptions",
];

const categoryColors: Record<string, string> = {
  "Pillar Articles": "bg-blue-100 text-blue-700",
  "Mechanics & Process": "bg-green-100 text-green-700",
  "Definition & Rights": "bg-violet-100 text-violet-700",
  "Risks & Limitations": "bg-amber-100 text-amber-700",
  "Comparisons & Misconceptions": "bg-rose-100 text-rose-700",
};

export default function BlogPage() {
  return (
    <>
      {/* Hero — pale split layout */}
      <section className="hero-pale pt-32 pb-20">
        <div className="relative z-10 mx-auto max-w-[1200px] px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="hero-badge">
                <span className="w-2 h-2 rounded-full bg-accent-green inline-block"></span>
                Blog
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-navy-900 leading-[1.1] tracking-tight mb-6">
                Insights &<br />
                <span className="text-navy-600">Education</span>
              </h1>
              <p className="text-lg text-body max-w-lg leading-relaxed">
                Articles on tokenized real estate, compliance, risk, and how the
                EstateX model works.
              </p>
            </div>
            <div className="animate-fade-in-up animate-delay-200 hidden md:flex justify-center">
              <div className="hero-illustration animate-float max-w-xs w-full p-6">
                <div className="space-y-3">
                  {[
                    { cat: "Pillar Articles", color: "bg-blue-100 text-blue-700", count: 3 },
                    { cat: "Mechanics", color: "bg-green-100 text-green-700", count: 3 },
                    { cat: "Rights", color: "bg-violet-100 text-violet-700", count: 3 },
                    { cat: "Risks", color: "bg-amber-100 text-amber-700", count: 3 },
                  ].map((item) => (
                    <div key={item.cat} className="flex items-center justify-between p-2.5 rounded-lg bg-section-alt">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${item.color}`}>{item.cat}</span>
                      <span className="text-xs text-muted">{item.count} articles</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Listing */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-[1200px] px-6">
          {categories
            .filter((c) => c !== "All")
            .map((category) => {
              const catPosts = posts.filter((p) => p.category === category);
              return (
                <div key={category} className="mb-16 last:mb-0">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        categoryColors[category] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {category}
                    </span>
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {catPosts.map((post) => (
                      <article key={post.title} className="card">
                        <span
                          className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${
                            categoryColors[post.category] ||
                            "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {post.category}
                        </span>
                        <h3 className="text-lg font-bold mb-2 text-navy-900">
                          {post.title}
                        </h3>
                        <p className="text-body text-sm leading-relaxed">
                          {post.excerpt}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      </section>

      {/* CTA — light split layout */}
      <section className="cta-light py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-tag">Go Deeper</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
                Want to Go Deeper?
              </h2>
              <p className="text-lg text-body max-w-xl mb-8">
                Start with our Learn page for a structured overview, or check the
                FAQ for specific questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/learn" className="btn-cyan px-8 py-3.5 text-base">
                  Learn the Model
                </Link>
                <Link
                  href="/faq"
                  className="btn-secondary px-8 py-3.5 text-base"
                >
                  Read the FAQ
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
