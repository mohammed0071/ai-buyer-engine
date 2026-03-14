'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Radio, Users, MessageSquare, Calendar, TrendingUp,
  ArrowUpRight, ArrowRight, Zap, Eye
} from 'lucide-react';
import { mockSignals, mockAnalytics, mockConversations, mockMeetings, mockProspects } from '@/lib/mock-data';
import Link from 'next/link';

const tierColors = {
  hot: 'bg-red-500/10 text-red-400 border-red-500/20',
  warm: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  watching: 'bg-green-500/10 text-green-400 border-green-500/20',
  noise: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
};

const stageColors: Record<string, string> = {
  detected: 'bg-zinc-800 text-zinc-300',
  warming: 'bg-amber-500/10 text-amber-400',
  engaged: 'bg-blue-500/10 text-blue-400',
  booking: 'bg-violet-500/10 text-violet-400',
  booked: 'bg-green-500/10 text-green-400',
  converted: 'bg-emerald-500/10 text-emerald-400',
  lost: 'bg-red-500/10 text-red-400',
};

export default function DashboardPage() {
  const stats = [
    {
      label: 'Signals Today',
      value: mockAnalytics.daily_metrics[mockAnalytics.daily_metrics.length - 1].signals_detected,
      change: '+18%',
      icon: Radio,
      color: 'from-red-500 to-orange-500',
    },
    {
      label: 'Active Prospects',
      value: mockAnalytics.total_prospects,
      change: '+12%',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'Conversations',
      value: mockAnalytics.active_conversations,
      change: '+24%',
      icon: MessageSquare,
      color: 'from-violet-500 to-purple-500',
    },
    {
      label: 'Meetings Booked',
      value: mockAnalytics.meetings_booked,
      change: '+40%',
      icon: Calendar,
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-zinc-400 mt-1">Your signal-driven sales engine at a glance</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-green-400 font-medium">Monitoring Active</span>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-zinc-900/50 border-zinc-800 p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-zinc-400">{stat.label}</p>
                <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUpRight className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-sm text-green-400 font-medium">{stat.change}</span>
                  <span className="text-xs text-zinc-500">vs last week</span>
                </div>
              </div>
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Signal Feed */}
        <div className="lg:col-span-3">
          <Card className="bg-zinc-900/50 border-zinc-800">
            <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-red-400" />
                <h2 className="text-lg font-semibold text-white">Recent Signals</h2>
              </div>
              <Link href="/dashboard/signals">
                <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                  View All <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="divide-y divide-zinc-800/50">
              {mockSignals.slice(0, 5).map((signal) => (
                <div key={signal.id} className="p-4 hover:bg-zinc-800/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-white text-sm font-medium shrink-0 mt-0.5">
                      {signal.prospect?.name?.charAt(0) || '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-white text-sm">
                          {signal.prospect?.name}
                        </span>
                        <span className="text-zinc-500 text-xs">
                          {signal.prospect?.twitter_handle}
                        </span>
                        <Badge variant="outline" className={`text-xs ${tierColors[signal.tier]}`}>
                          {signal.tier.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-zinc-500 ml-auto">
                          {new Date(signal.detected_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-400 line-clamp-2">{signal.content_preview}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-zinc-500 flex items-center gap-1">
                          <Zap className="w-3 h-3" /> Score: {signal.score}
                        </span>
                        <span className="text-xs text-zinc-500">
                          {signal.signal_type.replace(/_/g, ' ')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Pipeline + Upcoming */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pipeline */}
          <Card className="bg-zinc-900/50 border-zinc-800 p-5">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              Pipeline
            </h2>
            <div className="space-y-3">
              {Object.entries(mockAnalytics.pipeline_stages)
                .filter(([_, count]) => count > 0)
                .map(([stage, count]) => (
                  <div key={stage} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className={`text-xs ${stageColors[stage]}`}>
                        {stage.charAt(0).toUpperCase() + stage.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 rounded-full bg-zinc-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
                          style={{ width: `${(count / mockAnalytics.total_prospects) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-white w-6 text-right">{count}</span>
                    </div>
                  </div>
                ))}
            </div>
            <div className="mt-4 pt-4 border-t border-zinc-800">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Signal → Meeting Rate</span>
                <span className="font-medium text-green-400">{mockAnalytics.signal_to_meeting_rate}%</span>
              </div>
            </div>
          </Card>

          {/* Upcoming Meetings */}
          <Card className="bg-zinc-900/50 border-zinc-800 p-5">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-green-400" />
              Upcoming Meetings
            </h2>
            <div className="space-y-3">
              {mockMeetings.map((meeting) => (
                <div key={meeting.id} className="p-3 rounded-lg bg-zinc-800/30 border border-zinc-800">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">{meeting.prospect?.name}</p>
                      <p className="text-xs text-zinc-400">{meeting.prospect?.company} · {meeting.meeting_type}</p>
                    </div>
                    <Badge variant="outline" className={meeting.status === 'confirmed' ? 'border-green-500/30 text-green-400' : 'border-blue-500/30 text-blue-400'}>
                      {meeting.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-zinc-500">
                    <Calendar className="w-3 h-3" />
                    {new Date(meeting.scheduled_at).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    {' · '}
                    {new Date(meeting.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    {' · '}
                    {meeting.duration_min}min
                  </div>
                </div>
              ))}
            </div>
            <Link href="/dashboard/meetings">
              <Button variant="ghost" size="sm" className="w-full mt-3 text-zinc-400 hover:text-white">
                View All Meetings <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </Card>

          {/* Active Conversations */}
          <Card className="bg-zinc-900/50 border-zinc-800 p-5">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-violet-400" />
              Active Conversations
            </h2>
            <div className="space-y-3">
              {mockConversations.slice(0, 3).map((conv) => (
                <div key={conv.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-800/30 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-white text-xs font-medium">
                    {conv.prospect?.name?.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{conv.prospect?.name}</p>
                    <p className="text-xs text-zinc-500 truncate">{conv.messages[conv.messages.length - 1]?.content}</p>
                  </div>
                  <Badge variant="outline" className={`text-xs ${
                    conv.status === 'booked' ? 'border-green-500/30 text-green-400' :
                    conv.status === 'active' ? 'border-blue-500/30 text-blue-400' :
                    'border-zinc-700 text-zinc-400'
                  }`}>
                    {conv.status}
                  </Badge>
                </div>
              ))}
            </div>
            <Link href="/dashboard/outreach">
              <Button variant="ghost" size="sm" className="w-full mt-3 text-zinc-400 hover:text-white">
                View All Conversations <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
