import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "$ESX Token — EstateX",
  description:
    "$ESX is the gateway to fractionalized, blockchain-secured real estate investment. Live on HTX, MEXC, Uniswap and Raydium.",
};

const stats = [
  { label: "Exchanges", value: "2 CEX + 2 DEX" },
  { label: "Security", value: "CertIK Audited" },
  { label: "Chains", value: "Base + Solana" },
  { label: "Registration", value: "EU NL 83876243" },
];

const whyBuy = [
  {
    icon: "🏠",
    title: "Real Estate Backed",
    description:
      "Not another meme coin. $ESX is tied to the world's largest asset class.",
  },
  {
    icon: "🛡️",
    title: "CertIK Audited",
    description: "Smart contract security verified by CertIK.",
  },
  {
    icon: "⛓️",
    title: "Base Chain",
    description: "Live on Base and Solana.",
  },
  {
    icon: "💰",
    title: "Staking Rewards",
    description: "Hold $ESX and earn.",
  },
  {
    icon: "🌍",
    title: "Global Property Access",
    description: "Access tokenized real estate worldwide.",
  },
  {
    icon: "🇪🇺",
    title: "EU Regulated",
    description: "Registered with Netherlands Chamber of Commerce.",
  },
];

const buySteps = [
  {
    num: "01",
    title: "Choose Exchange",
    description:
      "HTX or MEXC for centralized exchange trading, or Uniswap (Base) and Raydium (Solana) for decentralized access.",
  },
  {
    num: "02",
    title: "Fund & Buy",
    description: "Deposit USD or USDT, then purchase ESX.",
  },
  {
    num: "03",
    title: "Hold, Stake, Engage",
    description: "Access rewards and opportunities within the EstateX ecosystem.",
  },
];

export default function TokenPage() {
  return (
    <>
      {/* Scrolling ticker */}
      <div className="bg-navy-900 text-white py-2 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap text-sm font-medium">
          <span className="mx-8">
            $ESX IS LIVE ⚡ HTX • MEXC • UNISWAP (BASE) • RAYDIUM (SOL) •
            CERTIK AUDITED • EU REGISTERED
          </span>
          <span className="mx-8">
            $ESX IS LIVE ⚡ HTX • MEXC • UNISWAP (BASE) • RAYDIUM (SOL) •
            CERTIK AUDITED • EU REGISTERED
          </span>
        </div>
      </div>

      {/* Hero — pale split layout */}
      <section className="hero-pale pt-32 pb-20">
        <div className="relative z-10 mx-auto max-w-[1200px] px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="hero-badge">
                <span className="w-2 h-2 rounded-full bg-accent-green inline-block"></span>
                $ESX Token
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-navy-900 leading-[1.1] tracking-tight mb-6">
                Own Real Estate.
                <br />
                <span className="text-navy-600">One Token at a Time.</span>
              </h1>
              <p className="text-lg text-body max-w-lg leading-relaxed mb-10">
                $ESX is the gateway to fractionalized, blockchain-secured real
                estate investment. Live on HTX, MEXC, Uniswap and Raydium. Audited
                by CertIK. Registered in the EU.
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-8">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="text-xl font-bold text-navy-900">{s.value}</div>
                    <div className="text-xs text-muted uppercase tracking-wider mt-0.5">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right illustration */}
            <div className="animate-fade-in-up animate-delay-200 hidden md:flex justify-center">
              <div className="hero-illustration animate-float max-w-sm w-full">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center gap-2 bg-accent-green/10 text-accent-green text-sm font-semibold px-4 py-2 rounded-full mb-4">
                    <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse"></span>
                    Live on Exchanges
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { name: "HTX", type: "CEX", status: "Active" },
                    { name: "MEXC", type: "CEX", status: "Active" },
                    { name: "Uniswap", type: "DEX (Base)", status: "Active" },
                    { name: "Raydium", type: "DEX (Solana)", status: "Active" },
                  ].map((exchange) => (
                    <div key={exchange.name} className="flex items-center justify-between p-3 bg-section-alt rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-navy-100 flex items-center justify-center text-xs font-bold text-navy-600">
                          {exchange.name[0]}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-navy-900">{exchange.name}</div>
                          <div className="text-xs text-muted">{exchange.type}</div>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-accent-green bg-accent-green/10 px-2.5 py-1 rounded-full">
                        {exchange.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Buy */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-tag">Why $ESX</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
              Why Buy $ESX?
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyBuy.map((item) => (
              <div key={item.title} className="card text-center">
                <div className="feature-icon-box mx-auto">{item.icon}</div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-body text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Buy */}
      <section className="py-20 bg-section-alt">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-tag">How to Buy</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
              Get $ESX in 3 Steps
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {buySteps.map((step) => (
              <div key={step.num} className="card text-center">
                <div className="w-12 h-12 rounded-full bg-navy-100 text-navy-600 flex items-center justify-center text-lg font-bold mx-auto mb-3">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-body text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contract Address */}
      <section className="py-12 bg-white border-y border-border">
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <p className="text-sm text-muted mb-2 uppercase tracking-wider font-medium">
            Contract Address (Base)
          </p>
          <code className="text-sm md:text-base font-mono text-navy-900 bg-section-alt px-4 py-2 rounded-lg inline-block break-all">
            0x6a72d3A87f97a0fEE2c2ee4233BdAEBc32813D7a
          </code>
        </div>
      </section>

      {/* Big Statement — split layout */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Real Estate is the World&apos;s Largest Asset Class.
              </h2>
              <p className="text-body text-xl leading-relaxed mb-8">
                $ESX gives you a seat at the table. No middlemen. No borders. No
                barriers.
              </p>
              <Link
                href="/professional"
                className="btn-link text-base"
              >
                Institutional investor or partner? Apply for concierge service <span>→</span>
              </Link>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="bg-navy-50 rounded-2xl p-8 max-w-sm w-full text-center">
                <div className="text-5xl mb-3">🏠</div>
                <div className="text-3xl font-bold text-navy-900 mb-1">$300T+</div>
                <div className="text-sm text-muted">Global Real Estate Market</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-section-alt border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6">
          <p className="text-xs text-muted leading-relaxed max-w-3xl mx-auto text-center">
            Cryptocurrency and digital asset investments are volatile and
            involve risk, including the potential loss of capital. Past
            performance is not indicative of future results. This page does not
            constitute financial, investment, or tax advice. Always conduct your
            own research and consult with a qualified professional before making
            any investment decisions.
          </p>
        </div>
      </section>

      {/* Footer info */}
      <section className="py-8 bg-navy-900">
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <p className="text-white/50 text-sm">
            Estate of Commerce: X · Netherlands Chamber 83876243 · EU Registered
          </p>
        </div>
      </section>
    </>
  );
}
