'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Radio, Search, Filter, Zap, ExternalLink, X, MessageSquare,
  Eye, ThumbsDown, ArrowUpRight, Linkedin, Twitter, Globe
} from 'lucide-react';
import { mockSignals } from '@/lib/mock-data';
import { Signal, SignalTier } from '@/types';

const tierColors = {
  hot: 'bg-red-500/10 text-red-400 border-red-500/20',
  warm: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  watching: 'bg-green-500/10 text-green-400 border-green-500/20',
  noise: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
};

const tierDots = {
  hot: 'bg-red-400',
  warm: 'bg-amber-400',
  watching: 'bg-green-400',
  noise: 'bg-zinc-400',
};

const platformConfig = {
  twitter: { icon: Twitter, label: 'X/Twitter', color: 'text-white', linkText: 'View on X' },
  linkedin: { icon: Linkedin, label: 'LinkedIn', color: 'text-blue-500', linkText: 'View on LinkedIn' },
  composite: { icon: Globe, label: 'Multi-platform', color: 'text-zinc-400', linkText: 'View' },
};

export default function SignalsPage() {
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [platformFilter, setPlatformFilter] = useState<string>('all');

  const filtered = mockSignals.filter((s) => {
    if (tierFilter !== 'all' && s.tier !== tierFilter) return false;
    if (typeFilter !== 'all' && s.signal_type !== typeFilter) return false;
    if (platformFilter !== 'all' && s.platform !== platformFilter) return false;
    if (search && !s.content_preview.toLowerCase().includes(search.toLowerCase()) &&
        !s.prospect?.name.toLowerCase().includes(search.toLowerCase())) return false;
    return !s.is_dismissed;
  });

  const hotCount = mockSignals.filter(s => s.tier === 'hot' && !s.is_dismissed).length;
  const warmCount = mockSignals.filter(s => s.tier === 'warm' && !s.is_dismissed).length;
  const twitterCount = mockSignals.filter(s => s.platform === 'twitter' && !s.is_dismissed).length;
  const linkedinCount = mockSignals.filter(s => s.platform === 'linkedin' && !s.is_dismissed).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Radio className="w-6 h-6 text-red-400" />
            Signal Feed
          </h1>
          <p className="text-zinc-400 mt-1">Real-time buyer intent signals from X/Twitter and LinkedIn</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="border-red-500/30 text-red-400 gap-1">
            <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            {hotCount} Hot
          </Badge>
          <Badge variant="outline" className="border-amber-500/30 text-amber-400 gap-1">
            {warmCount} Warm
          </Badge>
        </div>
      </div>

      {/* Platform Toggle Pills */}
      <div className="flex items-center gap-2">
        <Button
          variant={platformFilter === 'all' ? 'default' : 'outline'}
          size="sm"
          className={platformFilter === 'all'
            ? 'bg-blue-600 hover:bg-blue-500 text-white'
            : 'border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800'}
          onClick={() => setPlatformFilter('all')}
        >
          <Globe className="w-3.5 h-3.5 mr-1.5" />
          All Platforms
          <span className="ml-1.5 text-xs opacity-70">{mockSignals.filter(s => !s.is_dismissed).length}</span>
        </Button>
        <Button
          variant={platformFilter === 'twitter' ? 'default' : 'outline'}
          size="sm"
          className={platformFilter === 'twitter'
            ? 'bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-600'
            : 'border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800'}
          onClick={() => setPlatformFilter('twitter')}
        >
          <Twitter className="w-3.5 h-3.5 mr-1.5" />
          X / Twitter
          <span className="ml-1.5 text-xs opacity-70">{twitterCount}</span>
        </Button>
        <Button
          variant={platformFilter === 'linkedin' ? 'default' : 'outline'}
          size="sm"
          className={platformFilter === 'linkedin'
            ? 'bg-blue-700 hover:bg-blue-600 text-white'
            : 'border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800'}
          onClick={() => setPlatformFilter('linkedin')}
        >
          <Linkedin className="w-3.5 h-3.5 mr-1.5" />
          LinkedIn
          <span className="ml-1.5 text-xs opacity-70">{linkedinCount}</span>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <Input
            placeholder="Search signals..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
          />
        </div>
        <Select value={tierFilter} onValueChange={setTierFilter}>
          <SelectTrigger className="w-36 bg-zinc-900 border-zinc-700 text-zinc-300">
            <SelectValue placeholder="Tier" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-700">
            <SelectItem value="all">All Tiers</SelectItem>
            <SelectItem value="hot">🔴 Hot</SelectItem>
            <SelectItem value="warm">🟡 Warm</SelectItem>
            <SelectItem value="watching">🟢 Watching</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-48 bg-zinc-900 border-zinc-700 text-zinc-300">
            <SelectValue placeholder="Signal Type" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-700">
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="pain_point">Pain Point</SelectItem>
            <SelectItem value="buying_language">Buying Language</SelectItem>
            <SelectItem value="competitor_engagement">Competitor Engagement</SelectItem>
            <SelectItem value="competitor_follow">Competitor Follow</SelectItem>
            <SelectItem value="keyword_mention">Keyword Mention</SelectItem>
            <SelectItem value="hashtag_match">Hashtag Match</SelectItem>
            <SelectItem value="thread_participation">Thread Participation</SelectItem>
            <SelectItem value="post_engagement">Post Engagement</SelectItem>
            <SelectItem value="profile_view">Profile View</SelectItem>
            <SelectItem value="linkedin_engagement">LinkedIn Engagement</SelectItem>
            <SelectItem value="job_change">Job Change</SelectItem>
            <SelectItem value="company_growth">Company Growth</SelectItem>
            <SelectItem value="competitor_follower">Competitor Follower</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Signal List */}
      <div className="space-y-3">
        {filtered.map((signal) => {
          const pConfig = platformConfig[signal.platform] || platformConfig.composite;
          const PlatformIcon = pConfig.icon;
          const handle = signal.platform === 'linkedin'
            ? signal.prospect?.linkedin_url?.replace('https://linkedin.com/in/', '')
            : signal.prospect?.twitter_handle;
          
          return (
            <Card key={signal.id} className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-colors">
              <div className="p-5">
                <div className="flex items-start gap-4">
                  {/* Score indicator */}
                  <div className="flex flex-col items-center gap-1 pt-1">
                    <div className={`w-3 h-3 rounded-full ${tierDots[signal.tier]}`} />
                    <span className="text-lg font-bold text-white">{signal.score}</span>
                    <span className="text-[10px] text-zinc-500 uppercase">score</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-white text-sm font-medium">
                        {signal.prospect?.name?.charAt(0)}
                      </div>
                      <div>
                        <span className="font-medium text-white text-sm">{signal.prospect?.name}</span>
                        <span className="text-zinc-500 text-xs ml-2">{handle}</span>
                      </div>
                      <Badge variant="outline" className={`text-xs ml-1 ${tierColors[signal.tier]}`}>
                        {signal.tier.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-zinc-700 gap-1">
                        <PlatformIcon className={`w-3 h-3 ${pConfig.color}`} />
                        <span className="text-zinc-400">{signal.platform === 'twitter' ? 'X' : 'LI'}</span>
                      </Badge>
                      <span className="text-xs text-zinc-500">
                        {signal.prospect?.title} at {signal.prospect?.company}
                      </span>
                    </div>

                    <p className="text-sm text-zinc-300 leading-relaxed mb-3">
                      {signal.content_preview}
                    </p>

                    <div className="flex items-center gap-4">
                      <span className="text-xs text-zinc-500 flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        {signal.signal_type.replace(/_/g, ' ')}
                      </span>
                      <span className="text-xs text-zinc-500">
                        {new Date(signal.detected_at).toLocaleString()}
                      </span>
                      {signal.source_url && (
                        <a href={signal.source_url} target="_blank" rel="noopener noreferrer"
                          className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
                          <ExternalLink className="w-3 h-3" /> {pConfig.linkText}
                        </a>
                      )}
                      {signal.triggered_action && (
                        <Badge className="bg-blue-500/10 text-blue-400 border-0 text-xs">
                          <ArrowUpRight className="w-3 h-3 mr-1" />
                          {signal.triggered_action.replace(/_/g, ' ')}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white h-8 w-8 p-0" title="Start outreach">
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white h-8 w-8 p-0" title="View prospect">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-red-400 h-8 w-8 p-0" title="Dismiss">
                      <ThumbsDown className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Radio className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
            <p className="text-zinc-400 text-lg">No signals match your filters</p>
            <p className="text-zinc-500 text-sm mt-1">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
