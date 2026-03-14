'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Target, MessageSquare, Calendar, BarChart3, Shield } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Nav */}
      <nav className="border-b border-zinc-800/50 backdrop-blur-sm sticky top-0 z-50 bg-zinc-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">AI Buyer Engine</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-zinc-400 hover:text-white">Log in</Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white border-0">
                Get Started <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-8">
            <Zap className="w-3.5 h-3.5" /> Signal-Driven Sales Automation
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6">
            Detect buyers.{' '}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Engage instantly.
            </span>{' '}
            Book meetings.
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            AI Buyer Engine monitors X/Twitter AND LinkedIn for real-time buying signals, warms up prospects with intelligent engagement across both platforms, and books qualified meetings - all on autopilot.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white border-0 text-lg px-8 py-6 h-auto">
                Start Free Trial <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-lg px-8 py-6 h-auto">
                View Demo Dashboard
              </Button>
            </Link>
          </div>
          <p className="text-sm text-zinc-500 mt-4">No credit card required · 14-day free trial</p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-zinc-800/50">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '3.3%', label: 'Signal-to-Meeting Rate' },
            { value: '< 7 days', label: 'Avg Time to Meeting' },
            { value: '3x', label: 'vs Cold Outbound' },
            { value: '82%', label: 'Show Rate' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-zinc-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              The complete signal-driven sales engine
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              From signal detection to booked meeting - fully automated, intelligently orchestrated.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Target,
                title: 'Signal Detection',
                description: 'Monitor X/Twitter AND LinkedIn for buyer intent signals - job changes, pain points, competitor engagement, buying language, and more.',
                color: 'from-red-500 to-orange-500',
              },
              {
                icon: MessageSquare,
                title: 'Multi-Platform Outreach',
                description: 'Warm up prospects on X and LinkedIn with intelligent engagement, then send personalized DMs that feel genuinely human.',
                color: 'from-blue-500 to-cyan-500',
              },
              {
                icon: Calendar,
                title: 'Meeting Booking',
                description: 'AI handles the entire conversation from first touch to booked meeting with calendar integration.',
                color: 'from-green-500 to-emerald-500',
              },
              {
                icon: BarChart3,
                title: 'Pipeline Analytics',
                description: 'Track signals, conversions, and meetings in real-time. Know exactly what\'s working.',
                color: 'from-violet-500 to-purple-500',
              },
              {
                icon: Zap,
                title: 'ICP Targeting',
                description: 'Define your ideal customer profile and let AI find buyers that match - automatically.',
                color: 'from-yellow-500 to-amber-500',
              },
              {
                icon: Shield,
                title: 'Smart Rate Limiting',
                description: 'Human-like timing, platform compliance, and intelligent scheduling to keep accounts safe.',
                color: 'from-pink-500 to-rose-500',
              },
            ].map((feature) => (
              <div key={feature.title} className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 transition-colors group">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-800/50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Simple, transparent pricing</h2>
          <p className="text-lg text-zinc-400 mb-12">Start free. Scale as you grow.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Starter', price: '$149', desc: '500 prospects · 200 AI messages', features: ['X/Twitter signals', '1 connected account', 'Google Calendar', 'Email support'] },
              { name: 'Growth', price: '$399', desc: '2,000 prospects · 1,000 AI messages', popular: true, features: ['X + LinkedIn signals', '3 connected accounts', '+ Calendly integration', 'Priority support'] },
              { name: 'Scale', price: '$899', desc: '5,000 prospects · 3,000 AI messages', features: ['Everything in Growth', '5 connected accounts', 'All integrations', 'Advanced analytics'] },
            ].map((plan) => (
              <div key={plan.name} className={`p-6 rounded-xl border ${plan.popular ? 'border-blue-500 bg-blue-500/5' : 'border-zinc-800 bg-zinc-900/50'} relative`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-blue-500 text-white text-xs font-medium rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-zinc-500">/mo</span>
                </div>
                <p className="text-sm text-zinc-400 mb-6">{plan.desc}</p>
                <ul className="space-y-2 text-sm text-zinc-400 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/auth/signup">
                  <Button className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-zinc-800 hover:bg-zinc-700 text-white'}`}>
                    Get Started
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to stop guessing and start booking?
          </h2>
          <p className="text-lg text-zinc-400 mb-8">
            Join the signal-driven outbound revolution. Your first meeting is a few clicks away.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white border-0 text-lg px-10 py-6 h-auto">
              Start Your Free Trial <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-medium text-zinc-400">AI Buyer Engine</span>
          </div>
          <p className="text-sm text-zinc-500">© 2026 AI Buyer Engine. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
