"use client";

import { useState } from "react";
import Link from "next/link";

const steps = [
  {
    question: "What describes you best?",
    options: [
      { label: "Individual Investor", icon: "🏠", value: "retail" },
      { label: "Professional Investor", icon: "💼", value: "professional" },
      { label: "Property Owner / Developer", icon: "🏗️", value: "partner" },
      { label: "Institution / Fund", icon: "🏦", value: "institution" },
    ],
  },
  {
    question: "What are you most interested in?",
    options: [
      { label: "Learning about tokenization", icon: "📖", value: "learn" },
      { label: "Investing in property tokens", icon: "📈", value: "invest" },
      { label: "Tokenizing my property", icon: "🔗", value: "tokenize" },
      { label: "Understanding the $ESX token", icon: "⚡", value: "esx" },
    ],
  },
  {
    question: "What's your experience with digital assets?",
    options: [
      { label: "New to this", icon: "🌱", value: "beginner" },
      { label: "Some experience", icon: "📊", value: "intermediate" },
      { label: "Very experienced", icon: "🚀", value: "advanced" },
      { label: "Institutional level", icon: "🏛️", value: "institutional" },
    ],
  },
];

const results: Record<string, { title: string; description: string; link: string; linkText: string }> = {
  retail: {
    title: "Start with Education",
    description: "We recommend beginning with our Learn page to understand how tokenized real estate works, the risks involved, and how regulated access is structured.",
    link: "/retail",
    linkText: "Retail Investor Page →",
  },
  professional: {
    title: "Explore Professional Access",
    description: "As a professional investor, you may be eligible for priority access and enhanced features. Let's check your eligibility.",
    link: "/professional",
    linkText: "Professional Access →",
  },
  partner: {
    title: "Partnership Opportunities",
    description: "Learn how to tokenize and distribute your real estate assets through our regulated platform.",
    link: "/partnerships",
    linkText: "Partnerships Page →",
  },
  institution: {
    title: "Institutional Solutions",
    description: "White-label infrastructure, compliance frameworks, and distribution tools for institutional partners.",
    link: "/partnerships",
    linkText: "Contact Our Team →",
  },
};

export default function WizardPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);

  const handleSelect = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
    }
  };

  const result = results[answers[0]] || results.retail;

  return (
    <>
      <section className="hero-pale pt-32 pb-20 min-h-screen">
        <div className="relative z-10 mx-auto max-w-[700px] px-6">
          {!completed ? (
            <div className="animate-fade-in-up">
              {/* Progress */}
              <div className="flex items-center gap-2 mb-8">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-colors ${
                      i <= currentStep ? "bg-navy-600" : "bg-navy-100"
                    }`}
                  />
                ))}
              </div>

              <div className="text-center mb-10">
                <div className="hero-badge mx-auto">
                  <span className="w-2 h-2 rounded-full bg-accent-green inline-block"></span>
                  Step {currentStep + 1} of {steps.length}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mt-4">
                  {steps[currentStep].question}
                </h1>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {steps[currentStep].options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className="card text-center cursor-pointer hover:border-navy-600 transition-colors"
                  >
                    <span className="text-3xl block mb-3">{option.icon}</span>
                    <span className="font-semibold text-navy-900">{option.label}</span>
                  </button>
                ))}
              </div>

              {currentStep > 0 && (
                <button
                  onClick={() => {
                    setCurrentStep(currentStep - 1);
                    setAnswers(answers.slice(0, -1));
                  }}
                  className="btn-ghost mx-auto mt-6 block text-sm"
                >
                  ← Back
                </button>
              )}
            </div>
          ) : (
            <div className="animate-fade-in-up text-center">
              <div className="hero-badge mx-auto">
                <span className="w-2 h-2 rounded-full bg-accent-green inline-block"></span>
                Your Recommendation
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mt-4 mb-4">
                {result.title}
              </h1>
              <p className="text-lg text-body max-w-lg mx-auto mb-8 leading-relaxed">
                {result.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href={result.link} className="btn-cyan px-8 py-3.5 text-base">
                  {result.linkText}
                </Link>
                <Link href="/learn" className="btn-secondary px-8 py-3.5 text-base">
                  Learn the Model
                </Link>
              </div>
              <button
                onClick={() => {
                  setCurrentStep(0);
                  setAnswers([]);
                  setCompleted(false);
                }}
                className="btn-ghost mx-auto mt-6 block text-sm"
              >
                Start Over
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
