import Link from "next/link";

interface SplitHeroProps {
  badge: string;
  headline: string;
  highlightedText?: string;
  body: string;
  ctaText: string;
  ctaHref: string;
  /** Optional secondary CTA */
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  /** The mockup content to render on the right side */
  mockup?: React.ReactNode;
}

export default function SplitHero({
  badge,
  headline,
  highlightedText,
  body,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  mockup,
}: SplitHeroProps) {
  return (
    <section className="bg-[#f8fafc] pt-32 pb-20 overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text content */}
          <div className="animate-fade-in-up">
            <span className="inline-block text-sm font-semibold text-navy-600 bg-navy-100 px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
              {badge}
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-navy-900 leading-[1.1] tracking-tight mb-6">
              {headline}
              {highlightedText && (
                <>
                  <br />
                  <span className="text-navy-600">{highlightedText}</span>
                </>
              )}
            </h1>

            <p className="text-lg text-body max-w-lg mb-8 leading-relaxed">
              {body}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href={ctaHref} className="btn-cyan px-8 py-3.5 text-base">
                {ctaText}
              </Link>
              {secondaryCtaText && secondaryCtaHref && (
                <Link
                  href={secondaryCtaHref}
                  className="btn-secondary px-8 py-3.5 text-base"
                >
                  {secondaryCtaText}
                </Link>
              )}
            </div>
          </div>

          {/* Right: Mockup / Visual */}
          <div className="animate-fade-in-up animate-delay-200 hidden md:flex items-center justify-center">
            {mockup || <DefaultPhoneMockup />}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Default phone mockup showing a real estate dashboard */
function DefaultPhoneMockup() {
  return (
    <div className="relative">
      {/* Subtle glow behind the phone */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-600/10 via-accent-violet/10 to-transparent rounded-full blur-3xl scale-125" />

      {/* Phone frame */}
      <div className="relative w-[280px] mx-auto">
        {/* Phone body */}
        <div className="bg-navy-900 rounded-[2.5rem] p-3 shadow-2xl border border-navy-700/50">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-navy-900 rounded-b-2xl z-10" />

          {/* Screen */}
          <div className="bg-white rounded-[2rem] overflow-hidden">
            {/* Status bar */}
            <div className="bg-navy-900 text-white px-5 pt-8 pb-4">
              <div className="flex items-center justify-between text-[10px] mb-3 opacity-60">
                <span>9:41</span>
                <div className="flex items-center gap-1">
                  <span>●●●●</span>
                  <span>🔋</span>
                </div>
              </div>
              <p className="text-[10px] opacity-60 mb-0.5">Welcome back</p>
              <p className="text-sm font-bold">Property Dashboard</p>
            </div>

            {/* Portfolio summary */}
            <div className="px-4 py-3">
              <div className="bg-gradient-to-r from-navy-600 to-navy-500 rounded-xl p-3 text-white mb-3">
                <p className="text-[9px] opacity-70 uppercase tracking-wider mb-0.5">
                  Portfolio Value
                </p>
                <p className="text-xl font-bold">£247,500</p>
                <p className="text-[10px] text-green-300 font-medium mt-0.5">
                  ↑ 8.3% this year
                </p>
              </div>

              {/* Property cards */}
              <p className="text-[9px] text-muted uppercase tracking-wider font-semibold mb-2">
                Active Holdings
              </p>

              {[
                {
                  name: "Manchester Residential",
                  tokens: "250 PROPX",
                  value: "£125,000",
                  yield: "6.2%",
                },
                {
                  name: "London Commercial",
                  tokens: "180 PROPX",
                  value: "£122,500",
                  yield: "5.8%",
                },
              ].map((prop) => (
                <div
                  key={prop.name}
                  className="flex items-center gap-2.5 py-2 border-b border-border last:border-0"
                >
                  <div className="w-8 h-8 rounded-lg bg-navy-50 flex items-center justify-center text-sm flex-shrink-0">
                    🏢
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-semibold text-navy-900 truncate">
                      {prop.name}
                    </p>
                    <p className="text-[8px] text-muted">{prop.tokens}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-semibold text-navy-900">
                      {prop.value}
                    </p>
                    <p className="text-[8px] text-green-600 font-medium">
                      {prop.yield} yield
                    </p>
                  </div>
                </div>
              ))}

              {/* Quick actions */}
              <div className="flex gap-2 mt-3">
                <div className="flex-1 bg-navy-50 rounded-lg py-1.5 text-center">
                  <p className="text-[8px] font-semibold text-navy-600">
                    Browse Properties
                  </p>
                </div>
                <div className="flex-1 bg-navy-50 rounded-lg py-1.5 text-center">
                  <p className="text-[8px] font-semibold text-navy-600">
                    View Reports
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
