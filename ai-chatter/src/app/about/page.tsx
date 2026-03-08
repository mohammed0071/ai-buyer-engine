import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — AI Chatter",
  description:
    "Learn about AI Chatter's mission to transform customer conversations with AI. Meet the team and our story.",
};

const team = [
  {
    name: "Alex Chen",
    role: "CEO & Co-Founder",
    initials: "AC",
    bio: "Former Head of AI at a Fortune 500. Passionate about making AI accessible.",
  },
  {
    name: "Maya Patel",
    role: "CTO & Co-Founder",
    initials: "MP",
    bio: "PhD in NLP from Stanford. Built conversation systems serving 100M+ users.",
  },
  {
    name: "James Wright",
    role: "Head of Product",
    initials: "JW",
    bio: "Ex-Stripe product lead. Obsessed with simple, elegant interfaces.",
  },
  {
    name: "Lena Sato",
    role: "VP Engineering",
    initials: "LS",
    bio: "Scaled infrastructure at Google Cloud. Keeps things running at 99.99%.",
  },
];

const values = [
  {
    icon: "🎯",
    title: "Customer Obsessed",
    description: "Every feature starts with a customer conversation. We build what matters.",
  },
  {
    icon: "🔬",
    title: "Research-Driven",
    description: "Our AI team publishes regularly and pushes the boundaries of NLP.",
  },
  {
    icon: "🤝",
    title: "Radically Transparent",
    description: "Open pricing, public roadmap, honest communication. Always.",
  },
  {
    icon: "🌱",
    title: "Responsible AI",
    description: "We build AI that's fair, explainable, and respects privacy by design.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-gradient pt-32 pb-20">
        <div className="relative z-10 mx-auto max-w-[1200px] px-6 text-center animate-fade-in-up">
          <span className="inline-block text-sm font-semibold text-blue-300 bg-blue-500/15 border border-blue-400/30 px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
            Our Story
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.1] tracking-tight mb-6">
            Making AI conversations
            <br />
            <span className="text-blue-400">feel human</span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            We started AI Chatter because we believed customer support could be
            better — faster, smarter, and more personal. Today, 10,000+ teams
            agree.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-tag">Our Mission</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
                Conversations that build relationships
              </h2>
              <p className="text-body text-lg leading-relaxed mb-6">
                Every day, millions of customers reach out to businesses with
                questions, problems, and ideas. Most get a ticket number. We
                think they deserve a conversation.
              </p>
              <p className="text-body text-lg leading-relaxed">
                AI Chatter combines cutting-edge natural language processing
                with deep business understanding to create conversations that
                feel genuine — because great support isn&apos;t about deflecting
                queries, it&apos;s about building trust.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="card text-center py-8">
                <div className="text-3xl font-bold text-navy-600">10K+</div>
                <div className="text-sm text-muted mt-1">Teams</div>
              </div>
              <div className="card text-center py-8">
                <div className="text-3xl font-bold text-navy-600">50M+</div>
                <div className="text-sm text-muted mt-1">Conversations</div>
              </div>
              <div className="card text-center py-8">
                <div className="text-3xl font-bold text-navy-600">160+</div>
                <div className="text-sm text-muted mt-1">Languages</div>
              </div>
              <div className="card text-center py-8">
                <div className="text-3xl font-bold text-navy-600">99.9%</div>
                <div className="text-sm text-muted mt-1">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-section-alt">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-tag">Our Values</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
              What drives us
            </h2>
            <p className="text-body text-lg">
              These aren&apos;t just words on a wall. They guide every decision we make.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="card text-center">
                <div className="text-3xl mb-4">{v.icon}</div>
                <h3 className="text-lg font-bold mb-2">{v.title}</h3>
                <p className="text-body text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-tag">Leadership</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
              Meet the team
            </h2>
            <p className="text-body text-lg">
              World-class talent building the future of customer conversations.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((person) => (
              <div key={person.name} className="card text-center">
                <div className="w-20 h-20 rounded-full bg-navy-600 text-white flex items-center justify-center font-bold text-xl mx-auto mb-4">
                  {person.initials}
                </div>
                <h3 className="font-bold text-lg">{person.name}</h3>
                <p className="text-navy-600 text-sm font-medium mb-3">
                  {person.role}
                </p>
                <p className="text-body text-sm">{person.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hero-gradient py-20">
        <div className="relative z-10 mx-auto max-w-[1200px] px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Want to join us?
          </h2>
          <p className="text-lg text-white/70 max-w-xl mx-auto mb-8">
            We&apos;re always looking for talented people who share our mission.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary px-8 py-3.5 text-base">
              Get In Touch
            </Link>
            <Link
              href="/"
              className="btn-secondary border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8 py-3.5 text-base"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
