'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Calendar, Video, Clock, MapPin, FileText,
  ChevronDown, ChevronUp, ExternalLink, Plus, Link as LinkIcon
} from 'lucide-react';
import { mockMeetings } from '@/lib/mock-data';

const statusColors: Record<string, string> = {
  scheduled: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  confirmed: 'bg-green-500/10 text-green-400 border-green-500/20',
  completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  no_show: 'bg-red-500/10 text-red-400 border-red-500/20',
  cancelled: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
};

export default function MeetingsPage() {
  const [expandedMeeting, setExpandedMeeting] = useState<string | null>(mockMeetings[0]?.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-green-400" />
            Meetings
          </h1>
          <p className="text-zinc-400 mt-1">{mockMeetings.length} upcoming meetings</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
            <LinkIcon className="w-4 h-4 mr-2" /> Connect Calendar
          </Button>
          <Button className="bg-green-600 hover:bg-green-500 text-white">
            <Plus className="w-4 h-4 mr-2" /> Book Manually
          </Button>
        </div>
      </div>

      {/* Calendar Integration Status */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-zinc-900/50 border-zinc-800 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Google Calendar</p>
              <p className="text-xs text-zinc-500">Connect to check availability and create events</p>
            </div>
            <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
              Connect
            </Button>
          </div>
        </Card>
        <Card className="bg-zinc-900/50 border-zinc-800 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Calendly</p>
              <p className="text-xs text-zinc-500">Share booking links in conversations</p>
            </div>
            <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
              Connect
            </Button>
          </div>
        </Card>
      </div>

      {/* Meeting List */}
      <div className="space-y-4">
        {mockMeetings.map((meeting) => {
          const isExpanded = expandedMeeting === meeting.id;
          return (
            <Card key={meeting.id} className="bg-zinc-900/50 border-zinc-800 overflow-hidden">
              <div
                className="p-5 cursor-pointer hover:bg-zinc-800/30 transition-colors"
                onClick={() => setExpandedMeeting(isExpanded ? null : meeting.id)}
              >
                <div className="flex items-center gap-4">
                  {/* Date box */}
                  <div className="w-14 h-14 rounded-xl bg-zinc-800 flex flex-col items-center justify-center shrink-0">
                    <span className="text-[10px] text-zinc-500 uppercase">
                      {new Date(meeting.scheduled_at).toLocaleDateString('en-US', { weekday: 'short' })}
                    </span>
                    <span className="text-xl font-bold text-white">
                      {new Date(meeting.scheduled_at).getDate()}
                    </span>
                    <span className="text-[10px] text-zinc-500">
                      {new Date(meeting.scheduled_at).toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-medium text-white">{meeting.title}</h3>
                      <Badge variant="outline" className={`text-xs ${statusColors[meeting.status]}`}>
                        {meeting.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-1.5">
                      <span className="text-xs text-zinc-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(meeting.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        {' · '}{meeting.duration_min}min
                      </span>
                      <span className="text-xs text-zinc-400 flex items-center gap-1">
                        <Video className="w-3 h-3" />
                        {meeting.meeting_type.replace('_', ' ')}
                      </span>
                      {meeting.meeting_link && (
                        <a href={meeting.meeting_link} className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
                          <ExternalLink className="w-3 h-3" /> Join
                        </a>
                      )}
                    </div>
                  </div>

                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-zinc-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-zinc-400" />
                  )}
                </div>
              </div>

              {/* Expanded: Pre-Meeting Brief */}
              {isExpanded && meeting.pre_meeting_brief && (
                <div className="border-t border-zinc-800 p-5 bg-zinc-800/20">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-4 h-4 text-blue-400" />
                    <h4 className="text-sm font-semibold text-white">Pre-Meeting Brief</h4>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Prospect Summary</h5>
                      <p className="text-sm text-zinc-300 leading-relaxed">{meeting.pre_meeting_brief.prospect_summary}</p>

                      <h5 className="text-xs font-medium text-zinc-400 uppercase tracking-wider mt-4 mb-2">Recent Activity</h5>
                      <ul className="space-y-1">
                        {meeting.pre_meeting_brief.recent_activity.map((item, i) => (
                          <li key={i} className="text-sm text-zinc-400 flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Talking Points</h5>
                      <ul className="space-y-1">
                        {meeting.pre_meeting_brief.talking_points.map((item, i) => (
                          <li key={i} className="text-sm text-zinc-300 flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>

                      <h5 className="text-xs font-medium text-zinc-400 uppercase tracking-wider mt-4 mb-2">Signal History</h5>
                      <ul className="space-y-1">
                        {meeting.pre_meeting_brief.signal_history.map((item, i) => (
                          <li key={i} className="text-sm text-zinc-400 flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          );
        })}

        {mockMeetings.length === 0 && (
          <div className="text-center py-16">
            <Calendar className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
            <p className="text-zinc-400 text-lg">No meetings yet</p>
            <p className="text-zinc-500 text-sm mt-1">Meetings will appear here once prospects book them</p>
          </div>
        )}
      </div>
    </div>
  );
}
