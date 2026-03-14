'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  MessageSquare, Search, Send, Bot, User, Pause, Play,
  UserCheck, Clock, CheckCircle2, XCircle, Twitter, Linkedin, Globe
} from 'lucide-react';
import { mockConversations } from '@/lib/mock-data';
import { Conversation } from '@/types';

const statusColors: Record<string, string> = {
  warming: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  active: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  booked: 'bg-green-500/10 text-green-400 border-green-500/20',
  stalled: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
  dead: 'bg-red-500/10 text-red-400 border-red-500/20',
  paused: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
};

const platformIcons: Record<string, { icon: typeof Twitter; color: string; label: string }> = {
  twitter: { icon: Twitter, color: 'text-white', label: 'X' },
  linkedin: { icon: Linkedin, color: 'text-blue-500', label: 'LinkedIn' },
  email: { icon: MessageSquare, color: 'text-zinc-400', label: 'Email' },
};

export default function OutreachPage() {
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(mockConversations[0]);
  const [search, setSearch] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [platformFilter, setPlatformFilter] = useState<string>('all');

  const filtered = mockConversations.filter((c) => {
    if (search && !c.prospect?.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (platformFilter !== 'all' && c.platform !== platformFilter) return false;
    return true;
  });

  const twitterCount = mockConversations.filter(c => c.platform === 'twitter').length;
  const linkedinCount = mockConversations.filter(c => c.platform === 'linkedin').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-violet-400" />
            Outreach
          </h1>
          <p className="text-zinc-400 mt-1">Manage AI-driven conversations across X/Twitter and LinkedIn</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-zinc-700 text-zinc-300 gap-1.5">
            <Twitter className="w-3.5 h-3.5 text-white" /> {twitterCount}
          </Badge>
          <Badge variant="outline" className="border-zinc-700 text-zinc-300 gap-1.5">
            <Linkedin className="w-3.5 h-3.5 text-blue-500" /> {linkedinCount}
          </Badge>
        </div>
      </div>

      {/* Platform Filter */}
      <div className="flex items-center gap-2">
        <Button
          variant={platformFilter === 'all' ? 'default' : 'outline'}
          size="sm"
          className={platformFilter === 'all'
            ? 'bg-blue-600 hover:bg-blue-500 text-white'
            : 'border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800'}
          onClick={() => setPlatformFilter('all')}
        >
          <Globe className="w-3.5 h-3.5 mr-1.5" /> All
        </Button>
        <Button
          variant={platformFilter === 'twitter' ? 'default' : 'outline'}
          size="sm"
          className={platformFilter === 'twitter'
            ? 'bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-600'
            : 'border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800'}
          onClick={() => setPlatformFilter('twitter')}
        >
          <Twitter className="w-3.5 h-3.5 mr-1.5" /> X Only
        </Button>
        <Button
          variant={platformFilter === 'linkedin' ? 'default' : 'outline'}
          size="sm"
          className={platformFilter === 'linkedin'
            ? 'bg-blue-700 hover:bg-blue-600 text-white'
            : 'border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800'}
          onClick={() => setPlatformFilter('linkedin')}
        >
          <Linkedin className="w-3.5 h-3.5 mr-1.5" /> LinkedIn Only
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-0 h-[calc(100vh-280px)]">
        {/* Conversation List */}
        <Card className="bg-zinc-900/50 border-zinc-800 rounded-r-none lg:col-span-1 flex flex-col">
          <div className="p-3 border-b border-zinc-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <Input
                placeholder="Search conversations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 h-9"
              />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="divide-y divide-zinc-800/50">
              {filtered.map((conv) => {
                const pInfo = platformIcons[conv.platform] || platformIcons.twitter;
                const PIcon = pInfo.icon;
                return (
                  <div
                    key={conv.id}
                    className={`p-3 cursor-pointer transition-colors ${
                      selectedConv?.id === conv.id ? 'bg-blue-500/5 border-l-2 border-l-blue-500' : 'hover:bg-zinc-800/30 border-l-2 border-l-transparent'
                    }`}
                    onClick={() => setSelectedConv(conv)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-white text-sm font-medium">
                          {conv.prospect?.name?.charAt(0)}
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-zinc-900 flex items-center justify-center">
                          <PIcon className={`w-2.5 h-2.5 ${pInfo.color}`} />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-white truncate">{conv.prospect?.name}</span>
                          <span className="text-xs text-zinc-500">
                            {conv.last_message_at && new Date(conv.last_message_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${statusColors[conv.status]}`}>
                            {conv.status}
                          </Badge>
                          <span className="text-xs text-zinc-500 truncate">{conv.prospect?.company}</span>
                        </div>
                        <p className="text-xs text-zinc-500 truncate mt-1">
                          {conv.messages[conv.messages.length - 1]?.content}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </Card>

        {/* Conversation Detail */}
        <Card className="bg-zinc-900/50 border-zinc-800 border-l-0 rounded-l-none lg:col-span-2 flex flex-col">
          {selectedConv ? (
            <>
              {/* Header */}
              <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white text-sm font-medium">
                      {selectedConv.prospect?.name?.charAt(0)}
                    </div>
                    {(() => {
                      const pInfo = platformIcons[selectedConv.platform] || platformIcons.twitter;
                      const PIcon = pInfo.icon;
                      return (
                        <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-zinc-900 flex items-center justify-center">
                          <PIcon className={`w-3 h-3 ${pInfo.color}`} />
                        </div>
                      );
                    })()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white">{selectedConv.prospect?.name}</span>
                      <Badge variant="outline" className={`text-xs ${statusColors[selectedConv.status]}`}>
                        {selectedConv.status}
                      </Badge>
                      <Badge variant="outline" className="text-[10px] px-1.5 border-zinc-700 gap-1">
                        {(() => {
                          const pInfo = platformIcons[selectedConv.platform] || platformIcons.twitter;
                          const PIcon = pInfo.icon;
                          return <><PIcon className={`w-3 h-3 ${pInfo.color}`} /><span className="text-zinc-400">{pInfo.label}</span></>;
                        })()}
                      </Badge>
                    </div>
                    <p className="text-xs text-zinc-500">
                      {selectedConv.prospect?.title} at {selectedConv.prospect?.company}
                      {selectedConv.platform === 'twitter' && selectedConv.prospect?.twitter_handle && ` · ${selectedConv.prospect.twitter_handle}`}
                      {selectedConv.platform === 'linkedin' && selectedConv.prospect?.linkedin_url && ` · ${selectedConv.prospect.linkedin_url.replace('https://linkedin.com/in/', 'in/')}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {selectedConv.is_ai_managed && (
                    <Badge className="bg-violet-500/10 text-violet-400 border-0 text-xs gap-1">
                      <Bot className="w-3 h-3" /> AI Managed
                    </Badge>
                  )}
                  <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 h-8">
                    <UserCheck className="w-3.5 h-3.5 mr-1" /> Take Over
                  </Button>
                  <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 h-8">
                    <Pause className="w-3.5 h-3.5 mr-1" /> Pause
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4 max-w-2xl">
                  {/* Signal trigger context */}
                  <div className="text-center py-2">
                    <span className="text-xs text-zinc-500 bg-zinc-800/50 px-3 py-1 rounded-full">
                      {selectedConv.platform === 'linkedin' ? '🔗' : '𝕏'}{' '}
                      Conversation started from {selectedConv.context.signal_trigger?.toString().replace(/_/g, ' ')} signal
                      {selectedConv.platform === 'linkedin' ? ' on LinkedIn' : ' on X/Twitter'}
                    </span>
                  </div>

                  {selectedConv.messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === 'prospect' ? 'justify-start' : 'justify-end'}`}>
                      <div className={`max-w-[80%] ${
                        msg.role === 'prospect'
                          ? 'bg-zinc-800 rounded-2xl rounded-bl-sm'
                          : selectedConv.platform === 'linkedin'
                            ? 'bg-blue-700/20 rounded-2xl rounded-br-sm'
                            : 'bg-blue-600/20 rounded-2xl rounded-br-sm'
                      } p-3.5`}>
                        <div className="flex items-center gap-2 mb-1">
                          {msg.role === 'ai' ? (
                            <Bot className="w-3.5 h-3.5 text-violet-400" />
                          ) : msg.role === 'prospect' ? (
                            <User className="w-3.5 h-3.5 text-zinc-400" />
                          ) : (
                            <UserCheck className="w-3.5 h-3.5 text-green-400" />
                          )}
                          <span className="text-xs text-zinc-500">
                            {msg.role === 'ai' ? 'AI' : msg.role === 'prospect' ? selectedConv.prospect?.name : 'You'}
                            {' · '}
                            {new Date(msg.sent_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          {msg.status === 'delivered' && <CheckCircle2 className="w-3 h-3 text-blue-400 ml-auto" />}
                          {msg.status === 'read' && <CheckCircle2 className="w-3 h-3 text-green-400 ml-auto" />}
                        </div>
                        <p className="text-sm text-zinc-200 leading-relaxed">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="p-4 border-t border-zinc-800">
                <div className="flex items-end gap-2">
                  <Textarea
                    placeholder={`Type a message to take over on ${selectedConv.platform === 'linkedin' ? 'LinkedIn' : 'X/Twitter'}...`}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 min-h-[44px] max-h-32 resize-none"
                    rows={1}
                  />
                  <Button
                    className="bg-blue-600 hover:bg-blue-500 text-white h-[44px] px-4"
                    disabled={!newMessage.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
                <p className="text-zinc-400">Select a conversation to view</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
