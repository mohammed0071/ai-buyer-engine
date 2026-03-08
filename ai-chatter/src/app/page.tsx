const features = [
  {
    icon: "💬",
    title: "Smart Conversations",
    description:
      "AI-powered chat that understands context, remembers history, and responds naturally — like talking to your best team member.",
  },
  {
    icon: "⚡",
    title: "Instant Setup",
    description:
      "Go live in minutes, not months. Connect your knowledge base and start automating conversations with zero code required.",
  },
  {
    icon: "🌍",
    title: "160+ Languages",
    description:
      "Speak your customers' language. AI Chatter translates and responds fluently in over 160 languages, automatically.",
  },
  {
    icon: "🔒",
    title: "Enterprise Security",
    description:
      "SOC 2 compliant, end-to-end encrypted, and GDPR ready. Your data stays yours — always.",
  },
  {
    icon: "📊",
    title: "Deep Analytics",
    description:
      "Understand what your customers need. Real-time dashboards, sentiment analysis, and actionable insights at a glance.",
  },
  {
    icon: "🔗",
    title: "Seamless Integrations",
    description:
      "Connect with Slack, Teams, Zendesk, Salesforce, and 50+ tools your team already uses. One-click setup.",
  },
];

const stats = [
  { number: "10,000+", label: "Businesses" },
  { number: "50M+", label: "Conversations" },
  { number: "160+", label: "Languages" },
  { number: "99.9%", label: "Uptime" },
];

const testimonials = [
  {
    quote:
      "AI Chatter cut our response time by 80% and our customers love it. The setup was incredibly simple.",
    author: "Sarah Chen",
    role: "Head of Support, TechFlow",
    avatar: "SC",
  },
  {
    quote:
      "We went from 2-hour response times to instant. Our CSAT scores have never been higher.",
    author: "Marcus Rivera",
    role: "CTO, ScaleUp Labs",
    avatar: "MR",
  },
  {
    quote:
      "The multilingual support is a game changer. We serve 40 countries and AI Chatter handles them all flawlessly.",
    author: "Amara Osei",
    role: "VP Operations, GlobalReach",
    avatar: "AO",
  },
];

export default function Home() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero-gradient min-h-screen flex items-center pt-24 pb-20">
        <div className="relative z-10 mx-auto max-w-[1200px] px-6 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: copy */}
            <div className="animate-fade-in-up">
              <div className="inline-block text-sm font-semibold text-blue-300 bg-blue-500/15 border border-blue-400/30 px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
                AI-Powered Conversations
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.1] tracking-tight mb-6">
                Talk to your customers
                <br />
                <span className="text-blue-400">like never before</span>
              </h1>

              <p className="text-lg text-white/70 max-w-lg mb-8 leading-relaxed">
                Create intelligent chatbots that understand your business,
                delight your customers, and scale your support — all in minutes.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <a href="#cta" className="btn-primary px-8 py-3.5 text-base">
                  Start Free Trial
                </a>
                <a
                  href="#features"
                  className="btn-secondary border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8 py-3.5 text-base"
                >
                  See How It Works
                </a>
              </div>

              {/* Trust stats */}
              <div className="flex flex-wrap gap-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold text-white">
                      {stat.number}
                    </div>
                    <div className="text-xs text-white/50 uppercase tracking-wider mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: mockup placeholder */}
            <div className="animate-fade-in-up animate-delay-200 hidden md:flex items-center justify-center">
              <div className="w-full max-w-md bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-2xl">
                {/* Chat mockup */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
                    AI
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">
                      AI Chatter Bot
                    </div>
                    <div className="text-green-400 text-xs">● Online</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-end">
                    <div className="bg-blue-500 text-white text-sm px-4 py-2.5 rounded-2xl rounded-tr-md max-w-[80%]">
                      How do I upgrade my plan?
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-white/10 text-white/90 text-sm px-4 py-2.5 rounded-2xl rounded-tl-md max-w-[80%]">
                      Great question! You can upgrade anytime from Settings →
                      Billing. Would you like me to walk you through it? 🚀
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-blue-500 text-white text-sm px-4 py-2.5 rounded-2xl rounded-tr-md max-w-[80%]">
                      Yes please!
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-white/10 text-white/90 text-sm px-4 py-2.5 rounded-2xl rounded-tl-md max-w-[80%] flex items-center gap-2">
                      <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                      <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse [animation-delay:0.2s]" />
                      <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LOGOS / SOCIAL PROOF BAR ===== */}
      <section className="py-12 bg-section-alt border-y border-border">
        <div className="mx-auto max-w-[1200px] px-6">
          <p className="text-center text-sm text-muted font-medium mb-6 uppercase tracking-wider">
            Trusted by 10,000+ teams worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 opacity-40">
            {["TechFlow", "ScaleUp", "GlobalReach", "DataPrime", "CloudNine"].map(
              (name) => (
                <span
                  key={name}
                  className="text-lg font-bold text-navy-900 tracking-tight"
                >
                  {name}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" className="py-20 bg-white">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-tag">Features</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
              Everything you need to automate conversations
            </h2>
            <p className="text-body text-lg">
              Powerful features that scale with your business. No complexity, no
              compromises.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div key={feature.title} className="card">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-body text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section id="about" className="py-20 bg-section-alt">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-tag">What People Say</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
              Loved by teams everywhere
            </h2>
            <p className="text-body text-lg">
              See why thousands of companies trust AI Chatter for their customer
              conversations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.author} className="card">
                <div className="text-amber-400 text-sm mb-4 tracking-widest">
                  ★★★★★
                </div>
                <blockquote className="text-body text-sm leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-navy-600 text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-navy-900">
                      {t.author}
                    </div>
                    <div className="text-xs text-muted">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section id="pricing" className="py-20 bg-white">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-tag">Pricing</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-body text-lg">
              Start free. Scale when you&apos;re ready. No surprises.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Free */}
            <div className="card text-center">
              <h3 className="font-bold text-lg mb-2">Starter</h3>
              <div className="text-4xl font-bold text-navy-900 mb-1">Free</div>
              <p className="text-muted text-sm mb-6">Up to 100 conversations/mo</p>
              <ul className="text-sm text-body space-y-3 mb-8 text-left">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span> 1 chatbot
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span> Basic analytics
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span> Email support
                </li>
              </ul>
              <a href="#" className="btn-secondary w-full justify-center">
                Get Started
              </a>
            </div>

            {/* Pro */}
            <div className="card text-center border-navy-600 border-2 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-navy-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Most Popular
              </div>
              <h3 className="font-bold text-lg mb-2">Pro</h3>
              <div className="text-4xl font-bold text-navy-900 mb-1">
                $49<span className="text-lg font-normal text-muted">/mo</span>
              </div>
              <p className="text-muted text-sm mb-6">Up to 5,000 conversations/mo</p>
              <ul className="text-sm text-body space-y-3 mb-8 text-left">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span> 5 chatbots
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span> Advanced analytics
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span> Priority support
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span> Custom branding
                </li>
              </ul>
              <a href="#" className="btn-primary w-full justify-center">
                Start Free Trial
              </a>
            </div>

            {/* Enterprise */}
            <div className="card text-center">
              <h3 className="font-bold text-lg mb-2">Enterprise</h3>
              <div className="text-4xl font-bold text-navy-900 mb-1">Custom</div>
              <p className="text-muted text-sm mb-6">Unlimited conversations</p>
              <ul className="text-sm text-body space-y-3 mb-8 text-left">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span> Unlimited
                  chatbots
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span> SSO & SAML
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span> Dedicated
                  account manager
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span> Custom
                  integrations
                </li>
              </ul>
              <a href="#" className="btn-secondary w-full justify-center">
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section id="cta" className="hero-gradient py-20">
        <div className="relative z-10 mx-auto max-w-[1200px] px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to transform your customer conversations?
          </h2>
          <p className="text-lg text-white/70 max-w-xl mx-auto mb-8">
            Join 10,000+ businesses using AI Chatter. Start free — no credit
            card required.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="btn-primary px-8 py-3.5 text-base">
              Start Free Trial
            </a>
            <a
              href="#"
              className="btn-secondary border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8 py-3.5 text-base"
            >
              Book a Demo
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
