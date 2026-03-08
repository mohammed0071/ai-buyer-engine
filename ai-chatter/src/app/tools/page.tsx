import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Tools — AI Chatter",
  description:
    "Explore AI Chatter's powerful suite of AI-powered tools for customer conversations, analytics, and automation.",
};

const tools = [
  {
    icon: "💬",
    title: "Smart Chatbot Builder",
    description:
      "Build intelligent chatbots with a visual drag-and-drop editor. No coding required — just connect your knowledge base and go live.",
    tag: "Core",
  },
  {
    icon: "🧠",
    title: "Intent Recognition",
    description:
      "Advanced NLP that understands what your customers actually mean, not just what they say. 95%+ accuracy out of the box.",
    tag: "AI",
  },
  {
    icon: "📊",
    title: "Conversation Analytics",
    description:
      "Real-time dashboards with sentiment analysis, topic clustering, and actionable insights. Know your customers better.",
    tag: "Analytics",
  },
  {
    icon: "🌍",
    title: "Auto Translation",
    description:
      "Serve customers in 160+ languages with real-time translation. Responses feel native, not robotic.",
    tag: "Global",
  },
  {
    icon: "🔗",
    title: "Integration Hub",
    description:
      "One-click connections to Slack, Teams, Zendesk, Salesforce, WhatsApp, and 50+ more tools your team already uses.",
    tag: "Connect",
  },
  {
    icon: "🤖",
    title: "AI Agent Handoff",
    description:
      "Seamlessly escalate complex queries to human agents with full conversation context. No repetition needed.",
    tag: "Hybrid",
  },
  {
    icon: "📝",
    title: "Knowledge Base Manager",
    description:
      "Import docs, FAQs, and help articles. AI Chatter learns from your content and keeps answers up to date automatically.",
    tag: "Content",
  },
  {
    icon: "⚡",
    title: "Workflow Automations",
    description:
      "Trigger actions based on conversation events — update CRMs, send emails, create tickets, all automatically.",
    tag: "Automation",
  },
  {
    icon: "🛡️",
    title: "Security & Compliance",
    description:
      "SOC 2 Type II, GDPR, HIPAA ready. End-to-end encryption, data residency options, and audit logs included.",
    tag: "Enterprise",
  },
];

export default function ToolsPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-gradient pt-32 pb-20">
        <div className="relative z-10 mx-auto max-w-[1200px] px-6 text-center animate-fade-in-up">
          <span className="inline-block text-sm font-semibold text-blue-300 bg-blue-500/15 border border-blue-400/30 px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
            Our Toolkit
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.1] tracking-tight mb-6">
            Powerful AI tools for
            <br />
            <span className="text-blue-400">every conversation</span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Everything you need to build, manage, and optimize AI-powered
            customer interactions — all in one platform.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <div key={tool.title} className="card group">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{tool.icon}</span>
                  <span className="text-xs font-semibold text-navy-600 bg-navy-100 px-3 py-1 rounded-full uppercase tracking-wider">
                    {tool.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2">{tool.title}</h3>
                <p className="text-body text-sm leading-relaxed">
                  {tool.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hero-gradient py-20">
        <div className="relative z-10 mx-auto max-w-[1200px] px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to explore the full toolkit?
          </h2>
          <p className="text-lg text-white/70 max-w-xl mx-auto mb-8">
            Try our AI Wizard to find the perfect tools for your use case.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/wizard" className="btn-primary px-8 py-3.5 text-base">
              Launch AI Wizard
            </Link>
            <Link
              href="/contact"
              className="btn-secondary border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8 py-3.5 text-base"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
