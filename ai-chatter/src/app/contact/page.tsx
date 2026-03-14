"use client";

import { useState } from "react";

const contactMethods = [
  {
    icon: "📧",
    title: "Email Us",
    description: "For general inquiries and support",
    detail: "hello@estatex.eu",
  },
  {
    icon: "💬",
    title: "Live Chat",
    description: "Talk to our team in real-time",
    detail: "Available during business hours",
  },
  {
    icon: "📍",
    title: "Registered Office",
    description: "EU Registered Entity",
    detail: "Netherlands · NL 83876243",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      {/* Hero — pale split layout */}
      <section className="hero-pale pt-32 pb-20">
        <div className="relative z-10 mx-auto max-w-[1200px] px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="hero-badge">
                <span className="w-2 h-2 rounded-full bg-accent-green inline-block"></span>
                Contact
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-navy-900 leading-[1.1] tracking-tight mb-6">
                Let&apos;s start a
                <br />
                <span className="text-navy-600">conversation</span>
              </h1>
              <p className="text-lg text-body max-w-lg leading-relaxed">
                Have a question about tokenized real estate, or want to explore how
                EstateX can work for you? We&apos;d love to hear from you.
              </p>
            </div>
            <div className="animate-fade-in-up animate-delay-200 hidden md:flex justify-center">
              <div className="hero-illustration animate-float max-w-xs w-full p-6">
                <div className="space-y-4">
                  {contactMethods.map((method) => (
                    <div key={method.title} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center text-lg flex-shrink-0">
                        {method.icon}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-navy-900">{method.title}</div>
                        <div className="text-xs text-muted">{method.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-section-alt border-b border-border">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method) => (
              <div key={method.title} className="card text-center">
                <div className="text-3xl mb-4">{method.icon}</div>
                <h3 className="text-lg font-bold mb-1">{method.title}</h3>
                <p className="text-body text-sm mb-2">{method.description}</p>
                <p className="text-navy-600 font-semibold text-sm">
                  {method.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-[700px] px-6">
          <div className="text-center mb-12">
            <span className="section-tag">Send a Message</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
              Drop us a line
            </h2>
            <p className="text-body text-lg">
              Fill out the form below and we&apos;ll get back to you within 24 hours.
            </p>
          </div>

          {submitted ? (
            <div className="card text-center py-12">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
              <p className="text-body">
                Thanks for reaching out. We&apos;ll be in touch soon.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-navy-900 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-border bg-white text-navy-900 text-sm focus:outline-none focus:ring-2 focus:ring-navy-600/30 focus:border-navy-600 transition-all"
                    placeholder="Jane"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy-900 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-border bg-white text-navy-900 text-sm focus:outline-none focus:ring-2 focus:ring-navy-600/30 focus:border-navy-600 transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-2">
                  Work Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-white text-navy-900 text-sm focus:outline-none focus:ring-2 focus:ring-navy-600/30 focus:border-navy-600 transition-all"
                  placeholder="jane@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-white text-navy-900 text-sm focus:outline-none focus:ring-2 focus:ring-navy-600/30 focus:border-navy-600 transition-all"
                  placeholder="Acme Inc."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-2">
                  How can we help?
                </label>
                <textarea
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-white text-navy-900 text-sm focus:outline-none focus:ring-2 focus:ring-navy-600/30 focus:border-navy-600 transition-all resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>
              <button type="submit" className="btn-cyan w-full py-3.5 text-base">
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
