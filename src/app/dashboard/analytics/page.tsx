'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  BarChart3, TrendingUp, ArrowUpRight, ArrowDownRight,
  Radio, MessageSquare, Calendar, Target, Zap
} from 'lucide-react';
import { mockAnalytics, mockDailyMetrics } from '@/lib/mock-data';

function MiniChart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data, 1);
  const height = 40;
  return (
    <div className="flex items-end gap-1 h-10">
      {data.map((val, i) => (
        <div
          key={i}
          className={`w-3 rounded-t ${color}`}
          style={{ height: `${(val / max) * height}px`, minHeight: val > 0 ? 3 : 0 }}
        />
      ))}
    </div>
  );
}

export default function AnalyticsPage() {
  const signalsData = mockDailyMetrics.map(d => d.signals_detected);
  const outreachData = mockDailyMetrics.map(d => d.outreach_sent);
  const responsesData = mockDailyMetrics.map(d => d.responses_received);
  const meetingsData = mockDailyMetrics.map(d => d.meetings_booked);

  const totalSignals = signalsData.reduce((a, b) => a + b, 0);
  const totalOutreach = outreachData.reduce((a, b) => a + b, 0);
  const totalResponses = responsesData.reduce((a, b) => a + b, 0);
  const totalMeetings = meetingsData.reduce((a, b) => a + b, 0);
  const responseRate = totalOutreach > 0 ? ((totalResponses / totalOutreach) * 100).toFixed(1) : '0';
  const meetingRate = totalOutreach > 0 ? ((totalMeetings / totalOutreach) * 100).toFixed(1) : '0';

  const stageOrder = ['detected', 'warming', 'engaged', 'booking', 'booked', 'converted'] as const;
  const stageColors: Record<string, string> = {
    detected: 'bg-zinc-600',
    warming: 'bg-amber-500',
    engaged: 'bg-blue-500',
    booking: 'bg-violet-500',
    booked: 'bg-green-500',
    converted: 'bg-emerald-500',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-violet-400" />
          Analytics
        </h1>
        <p className="text-zinc-400 mt-1">Performance metrics for the last 7 days</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Signals Detected', value: totalSignals, data: signalsData, color: 'bg-red-400', change: '+18%', up: true },
          { label: 'Outreach Sent', value: totalOutreach, data: outreachData, color: 'bg-blue-400', change: '+32%', up: true },
          { label: 'Responses', value: totalResponses, data: responsesData, color: 'bg-violet-400', change: '+25%', up: true },
          { label: 'Meetings Booked', value: totalMeetings, data: meetingsData, color: 'bg-green-400', change: '+60%', up: true },
        ].map((metric) => (
          <Card key={metric.label} className="bg-zinc-900/50 border-zinc-800 p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm text-zinc-400">{metric.label}</p>
                <p className="text-2xl font-bold text-white mt-1">{metric.value}</p>
              </div>
              <div className="flex items-center gap-1">
                {metric.up ? (
                  <ArrowUpRight className="w-3.5 h-3.5 text-green-400" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5 text-red-400" />
                )}
                <span className={`text-xs font-medium ${metric.up ? 'text-green-400' : 'text-red-400'}`}>
                  {metric.change}
                </span>
              </div>
            </div>
            <MiniChart data={metric.data} color={metric.color} />
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Conversion Funnel */}
        <Card className="bg-zinc-900/50 border-zinc-800 p-5">
          <h3 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            Conversion Funnel
          </h3>
          <p className="text-sm text-zinc-500 mb-4">Prospect progression through stages</p>
          <div className="space-y-3">
            {stageOrder.map((stage, index) => {
              const count = mockAnalytics.pipeline_stages[stage] || 0;
              const maxCount = Math.max(...Object.values(mockAnalytics.pipeline_stages));
              const width = maxCount > 0 ? (count / maxCount) * 100 : 0;
              const convRate = index > 0 ? (
                (count / (mockAnalytics.pipeline_stages[stageOrder[index - 1]] || 1)) * 100
              ).toFixed(0) : null;

              return (
                <div key={stage}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-zinc-300 capitalize w-20">{stage}</span>
                      {convRate && (
                        <span className="text-xs text-zinc-500">({convRate}% from prev)</span>
                      )}
                    </div>
                    <span className="text-sm font-medium text-white">{count}</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-zinc-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${stageColors[stage]} transition-all duration-500`}
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Key Rates */}
        <Card className="bg-zinc-900/50 border-zinc-800 p-5">
          <h3 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
            <Target className="w-4 h-4 text-amber-400" />
            Key Performance Rates
          </h3>
          <p className="text-sm text-zinc-500 mb-4">Efficiency metrics for your outreach engine</p>
          <div className="space-y-4">
            {[
              { label: 'Response Rate', value: `${responseRate}%`, target: '50%', desc: 'Outreach → Response', color: 'from-blue-500 to-cyan-500' },
              { label: 'Meeting Booking Rate', value: `${meetingRate}%`, target: '15%', desc: 'Outreach → Meeting', color: 'from-violet-500 to-purple-500' },
              { label: 'Signal-to-Meeting Rate', value: `${mockAnalytics.signal_to_meeting_rate}%`, target: '5%', desc: 'Signal → Meeting', color: 'from-amber-500 to-orange-500' },
              { label: 'Show Rate', value: '82%', target: '80%', desc: 'Booked → Attended', color: 'from-green-500 to-emerald-500' },
              { label: 'Avg Time to Meeting', value: '5.2 days', target: '7 days', desc: 'Signal → Booked', color: 'from-pink-500 to-rose-500' },
            ].map((rate) => (
              <div key={rate.label} className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/30">
                <div>
                  <p className="text-sm font-medium text-white">{rate.label}</p>
                  <p className="text-xs text-zinc-500">{rate.desc}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-white">{rate.value}</p>
                  <p className="text-xs text-zinc-500">target: {rate.target}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Daily Breakdown */}
        <Card className="bg-zinc-900/50 border-zinc-800 p-5 lg:col-span-2">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-violet-400" />
            Daily Breakdown
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-zinc-500 border-b border-zinc-800">
                  <th className="text-left py-2 pr-4">Date</th>
                  <th className="text-right py-2 px-3">Signals</th>
                  <th className="text-right py-2 px-3">Outreach</th>
                  <th className="text-right py-2 px-3">Responses</th>
                  <th className="text-right py-2 px-3">Meetings</th>
                  <th className="text-right py-2 px-3">Completed</th>
                </tr>
              </thead>
              <tbody>
                {mockDailyMetrics.map((day) => (
                  <tr key={day.date} className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                    <td className="py-2.5 pr-4 text-zinc-300">
                      {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="text-right py-2.5 px-3 text-white font-medium">{day.signals_detected}</td>
                    <td className="text-right py-2.5 px-3 text-zinc-300">{day.outreach_sent}</td>
                    <td className="text-right py-2.5 px-3 text-zinc-300">{day.responses_received}</td>
                    <td className="text-right py-2.5 px-3">
                      {day.meetings_booked > 0 ? (
                        <span className="text-green-400 font-medium">{day.meetings_booked}</span>
                      ) : (
                        <span className="text-zinc-500">0</span>
                      )}
                    </td>
                    <td className="text-right py-2.5 px-3">
                      {day.meetings_completed > 0 ? (
                        <span className="text-emerald-400 font-medium">{day.meetings_completed}</span>
                      ) : (
                        <span className="text-zinc-500">0</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-zinc-700 font-medium">
                  <td className="py-2.5 pr-4 text-zinc-300">Total</td>
                  <td className="text-right py-2.5 px-3 text-white">{totalSignals}</td>
                  <td className="text-right py-2.5 px-3 text-white">{totalOutreach}</td>
                  <td className="text-right py-2.5 px-3 text-white">{totalResponses}</td>
                  <td className="text-right py-2.5 px-3 text-green-400">{totalMeetings}</td>
                  <td className="text-right py-2.5 px-3 text-emerald-400">
                    {mockDailyMetrics.reduce((a, b) => a + b.meetings_completed, 0)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
