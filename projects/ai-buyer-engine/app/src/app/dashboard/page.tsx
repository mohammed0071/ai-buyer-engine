'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Radio, Users, MessageSquare, Calendar, TrendingUp,
  ArrowUpRight, ArrowRight, Zap, Twitter, Linkedin, Loader2, RefreshCw
} from 'lucide-react';
import Link from 'next/link';
import type { Signal, Conversation, Meeting, AnalyticsOverview } from '@/types';

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
  const [signals, setSignals] = useState<Signal[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  const fetchData = async () => {
    try {
      const [signalsRes, convsRes, meetingsRes, analyticsRes] = await Promise.all([
        fetch('/api/signals?limit=6').then(r => r.json()),
        fetch('/api/outreach').then(r => r.json()),
        fetch('/api/meetings').then(r => r.json()),
        fetch('/api/analytics').then(r => r.json()),
      ]);

      setSignals(signalsRes.data || []);
      setConversations(convsRes.data || []);
      setMeetings(meetingsRes.data || []);
      setAnalytics(analyticsRes.data || null);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleGenerateSignals = async () => {
    setGenerating(true);
    try {
      const res = await fetch('/api/signals/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count: 5 }),
      });
      const result = await res.json();
      if (result.success) {
        await fetchData(); // Refresh
      }
    } catch (err) {
      console.error('Error generating signals:', err);
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
      </div>
    );
  }

  const todaySignals = analytics?.daily_metrics?.[analytics.daily_metrics.length - 1]?.signals_detected || 0;

  const stats = [
    {
      label: 'Signals Today',
      value: todaySignals,
      change: '+18%',
      icon: Radio,
      color: 'from-red-500 to-orange-500',
    },
    {
      label: 'Active Prospects',
      value: analytics?.total_prospects || 0,
      change: '+12%',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'Conversations',
      value: analytics?.active_conversations || 0,
      change: '+24%',
      icon: MessageSquare,
      color: 'from-violet-500 to-purple-500',
    },
    {
      label: 'Meetings Booked',
      value: analytics?.meetings_booked || 0,
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
          <Button
            variant="outline"
            size="sm"
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            onClick={handleGenerateSignals}
            disabled={generating}
          >
            {generating ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> : <RefreshCw className="w-3.5 h-3.5 mr-1" />}
            {generating ? 'Detecting...' : 'Detect Signals'}
          </Button>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-green-400 font-medium">Monitoring Active</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-800 border border-zinc-700">
            <Twitter className="w-3.5 h-3.5 text-white" />
            <span className="text-xs text-zinc-500">+</span>
            <Linkedin className="w-3.5 h-3.5 text-blue-500" />
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
              {signals.length === 0 ? (
                <div className="p-8 text-center">
                  <Radio className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
                  <p className="text-zinc-400 text-sm">No signals detected yet</p>
                  <p className="text-zinc-500 text-xs mt-1">Click &quot;Detect Signals&quot; to start finding buyers</p>
                </div>
              ) : (
                signals.map((signal) => (
                  <div key={signal.id} className="p-4 hover:bg-zinc-800/30 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-white text-sm font-medium shrink-0 mt-0.5">
                        {signal.prospect?.name?.charAt(0) || '?'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-white text-sm">
                            {signal.prospect?.name || 'Unknown'}
                          </span>
                          <span className="text-zinc-500 text-xs">
                            {signal.platform === 'linkedin'
                              ? signal.prospect?.linkedin_url?.replace('https://linkedin.com/in/', 'in/')
                              : signal.prospect?.twitter_handle}
                          </span>
                          {signal.platform === 'linkedin' ? (
                            <Linkedin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                          ) : (
                            <Twitter className="w-3.5 h-3.5 text-white shrink-0" />
                          )}
                          <Badge variant="outline" className={`text-xs ${tierColors[signal.tier as keyof typeof tierColors] || tierColors.warm}`}>
                            {signal.tier?.toUpperCase()}
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
                            {signal.signal_type?.replace(/_/g, ' ')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* Pipeline + Upcoming */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pipeline */}
          {analytics && (
            <Card className="bg-zinc-900/50 border-zinc-800 p-5">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                Pipeline
              </h2>
              <div className="space-y-3">
                {Object.entries(analytics.pipeline_stages)
                  .filter(([_, count]) => count > 0)
                  .map(([stage, count]) => (
                    <div key={stage} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className={`text-xs ${stageColors[stage] || 'bg-zinc-800 text-zinc-300'}`}>
                          {stage.charAt(0).toUpperCase() + stage.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 rounded-full bg-zinc-800 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
                            style={{ width: `${Math.min((count / Math.max(analytics.total_prospects, 1)) * 100, 100)}%` }}
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
                  <span className="font-medium text-green-400">{analytics.signal_to_meeting_rate}%</span>
                </div>
              </div>
            </Card>
          )}

          {/* Upcoming Meetings */}
          <Card className="bg-zinc-900/50 border-zinc-800 p-5">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-green-400" />
              Upcoming Meetings
            </h2>
            <div className="space-y-3">
              {meetings.length === 0 ? (
                <p className="text-sm text-zinc-500 text-center py-4">No upcoming meetings</p>
              ) : (
                meetings.slice(0, 3).map((meeting) => (
                  <div key={meeting.id} className="p-3 rounded-lg bg-zinc-800/30 border border-zinc-800">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-white">{meeting.prospect?.name || meeting.title}</p>
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
                ))
              )}
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
              {conversations.length === 0 ? (
                <p className="text-sm text-zinc-500 text-center py-4">No active conversations</p>
              ) : (
                conversations.slice(0, 3).map((conv) => (
                  <div key={conv.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-800/30 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-white text-xs font-medium">
                      {conv.prospect?.name?.charAt(0) || '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{conv.prospect?.name || 'Unknown'}</p>
                      <p className="text-xs text-zinc-500 truncate">
                        {Array.isArray(conv.messages) && conv.messages.length > 0
                          ? conv.messages[conv.messages.length - 1]?.content
                          : 'No messages'}
                      </p>
                    </div>
                    <Badge variant="outline" className={`text-xs ${
                      conv.status === 'booked' ? 'border-green-500/30 text-green-400' :
                      conv.status === 'active' ? 'border-blue-500/30 text-blue-400' :
                      'border-zinc-700 text-zinc-400'
                    }`}>
                      {conv.status}
                    </Badge>
                  </div>
                ))
              )}
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
