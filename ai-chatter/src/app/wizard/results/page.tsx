"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

const planMap: Record<string, { name: string; price: string; desc: string }> = {
  starter: { name: "Starter", price: "Free", desc: "Perfect for getting started with AI conversations" },
  growth: { name: "Pro", price: "$49/mo", desc: "Best for growing teams with moderate volume" },
  scale: { name: "Pro", price: "$49/mo", desc: "Powerful features for high-volume operations" },
  enterprise: { name: "Enterprise", price: "Custom", desc: "Tailored solutions for large organizations" },
};

const useCaseTools: Record<string, string[]> = {
  support: ["Smart Chatbot Builder", "AI Agent Handoff", "Knowledge Base Manager", "Conversation Analytics"],
  sales: ["Smart Chatbot Builder", "Workflow Automations", "Integration Hub", "Conversation Analytics"],
  internal: ["Knowledge Base Manager", "Smart Chatbot Builder", "Integration Hub", "Security & Compliance"],
  ecommerce: ["Smart Chatbot Builder", "Auto Translation", "Workflow Automations", "Conversation Analytics"],
};

const channelInfo: Record<string, string> = {
  web: "Website Widget — embed on your site in minutes",
  messaging: "WhatsApp & SMS — reach customers where they are",
  workplace: "Slack & Teams — perfect for internal use",
  omni: "Omnichannel — all platforms, one dashboard",
};

const priorityTips: Record<string, string> = {
  ease: "We'll set up a guided onboarding flow with templates and pre-built bots to get you live fast.",
  ai: "Your plan includes advanced NLP, custom training, and fine-tuning capabilities.",
  integrations: "We'll pre-configure connections to your existing tools during setup.",
  analytics: "Your dashboard will include sentiment analysis, topic clustering, and custom reports.",
};

function WizardResultsContent() {
  const searchParams = useSearchParams();
  const useCase = searchParams.get("useCase") || "support";
  const volume = searchParams.get("volume") || "starter";
  const channels = searchParams.get("channels") || "web";
  const priority = searchParams.get("priority") || "ease";

  const plan = planMap[volume] || planMap.starter;
  const tools = useCaseTools[useCase] || useCaseTools.support;
  const channel = channelInfo[channels] || channelInfo.web;
  const tip = priorityTips[priority] || priorityTips.ease;

  return (
    <>
      {/* Hero */}
      <section className="hero-gradient pt-32 pb-20">
        <div className="relative z-10 mx-auto max-w-[1200px] px-6 text-center animate-fade-in-up">
          <span className="inline-block text-sm font-semibold text-blue-300 bg-blue-500/15 border border-blue-400/30 px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
            Your Results
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-[1.1] tracking-tight mb-6">
            Here&apos;s your perfect
            <br />
            <span className="text-blue-400">AI game plan</span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Based on your answers, we&apos;ve put together a personalized
            recommendation just for you.
          </p>
        </div>
      </section>

      {/* Results */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-[900px] px-6 space-y-8">
          {/* Recommended Plan */}
          <div className="card border-navy-600 border-2 relative">
            <div className="absolute -top-3 left-6 bg-navy-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Recommended Plan
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-navy-900">{plan.name}</h3>
                <p className="text-body mt-1">{plan.desc}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-navy-600">{plan.price}</div>
                {plan.price !== "Free" && plan.price !== "Custom" && (
                  <div className="text-sm text-muted">billed monthly</div>
                )}
              </div>
            </div>
          </div>

          {/* Recommended Tools */}
          <div>
            <h2 className="text-2xl font-bold mb-6">🛠️ Recommended Tools</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {tools.map((tool) => (
                <div key={tool} className="card flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-navy-100 flex items-center justify-center text-navy-600 font-bold flex-shrink-0">
                    ✓
                  </div>
                  <span className="font-semibold text-navy-900">{tool}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Channel */}
          <div>
            <h2 className="text-2xl font-bold mb-4">📡 Channel Setup</h2>
            <div className="card">
              <p className="text-body text-lg">{channel}</p>
            </div>
          </div>

          {/* Priority Tip */}
          <div>
            <h2 className="text-2xl font-bold mb-4">💡 Personalized Tip</h2>
            <div className="card bg-navy-50 border-navy-100">
              <p className="text-body text-lg">{tip}</p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/contact" className="btn-primary px-8 py-3.5 text-base">
              Get Started Now
            </Link>
            <Link href="/tools" className="btn-secondary px-8 py-3.5 text-base">
              Explore All Tools
            </Link>
            <Link href="/wizard" className="btn-ghost text-base">
              ← Retake Quiz
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default function WizardResultsPage() {
  return (
    <Suspense
      fallback={
        <section className="hero-gradient pt-32 pb-20 min-h-screen">
          <div className="relative z-10 mx-auto max-w-[1200px] px-6 text-center">
            <h1 className="text-4xl font-bold text-white">Loading results...</h1>
          </div>
        </section>
      }
    >
      <WizardResultsContent />
    </Suspense>
  );
}
