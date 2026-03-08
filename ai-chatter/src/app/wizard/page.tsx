"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const steps = [
  {
    question: "What's your primary use case?",
    options: [
      { label: "Customer Support", icon: "🎧", value: "support" },
      { label: "Sales & Lead Gen", icon: "💰", value: "sales" },
      { label: "Internal Help Desk", icon: "🏢", value: "internal" },
      { label: "E-commerce", icon: "🛒", value: "ecommerce" },
    ],
  },
  {
    question: "How many conversations per month?",
    options: [
      { label: "Under 500", icon: "🌱", value: "starter" },
      { label: "500 – 5,000", icon: "📈", value: "growth" },
      { label: "5,000 – 50,000", icon: "🚀", value: "scale" },
      { label: "50,000+", icon: "🏗️", value: "enterprise" },
    ],
  },
  {
    question: "Which channels do you need?",
    options: [
      { label: "Website Widget", icon: "🌐", value: "web" },
      { label: "WhatsApp & SMS", icon: "📱", value: "messaging" },
      { label: "Slack / Teams", icon: "💼", value: "workplace" },
      { label: "All of the Above", icon: "✨", value: "omni" },
    ],
  },
  {
    question: "What matters most to you?",
    options: [
      { label: "Easy Setup", icon: "⚡", value: "ease" },
      { label: "Advanced AI", icon: "🧠", value: "ai" },
      { label: "Integrations", icon: "🔗", value: "integrations" },
      { label: "Analytics", icon: "📊", value: "analytics" },
    ],
  },
];

export default function WizardPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleSelect = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Encode answers and go to results
      const params = new URLSearchParams({
        useCase: newAnswers[0],
        volume: newAnswers[1],
        channels: newAnswers[2],
        priority: newAnswers[3],
      });
      router.push(`/wizard/results?${params.toString()}`);
    }
  };

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <>
      {/* Hero */}
      <section className="hero-gradient pt-32 pb-12">
        <div className="relative z-10 mx-auto max-w-[1200px] px-6 text-center animate-fade-in-up">
          <span className="inline-block text-sm font-semibold text-blue-300 bg-blue-500/15 border border-blue-400/30 px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
            AI Wizard
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-[1.1] tracking-tight mb-4">
            Find your perfect
            <br />
            <span className="text-blue-400">AI setup</span>
          </h1>
          <p className="text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
            Answer 4 quick questions and we&apos;ll recommend the best tools and
            plan for your needs.
          </p>
        </div>
      </section>

      {/* Wizard Steps */}
      <section className="py-16 bg-white min-h-[60vh]">
        <div className="mx-auto max-w-[700px] px-6">
          {/* Progress bar */}
          <div className="mb-10">
            <div className="flex items-center justify-between text-sm text-muted mb-2">
              <span>
                Step {currentStep + 1} of {steps.length}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-section-alt rounded-full overflow-hidden">
              <div
                className="h-full bg-navy-600 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            {step.question}
          </h2>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {step.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className="card text-left cursor-pointer hover:border-navy-600 hover:shadow-[var(--shadow-card-hover)] transition-all group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl group-hover:scale-110 transition-transform">
                    {option.icon}
                  </span>
                  <span className="text-lg font-semibold text-navy-900">
                    {option.label}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Back button */}
          {currentStep > 0 && (
            <button
              onClick={() => {
                setCurrentStep(currentStep - 1);
                setAnswers(answers.slice(0, -1));
              }}
              className="btn-ghost mt-8 mx-auto block text-sm text-muted hover:text-navy-600"
            >
              ← Go Back
            </button>
          )}
        </div>
      </section>
    </>
  );
}
