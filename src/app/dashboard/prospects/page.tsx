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
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Users, Search, Upload, Plus, ExternalLink, MoreHorizontal, Zap, Target } from 'lucide-react';
import { mockProspects } from '@/lib/mock-data';

const stageColors: Record<string, string> = {
  detected: 'bg-zinc-700/50 text-zinc-300 border-zinc-600',
  warming: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  engaged: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  booking: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  booked: 'bg-green-500/10 text-green-400 border-green-500/20',
  converted: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  lost: 'bg-red-500/10 text-red-400 border-red-500/20',
};

function ScoreBar({ score, color }: { score: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-xs text-zinc-400 font-medium">{score}</span>
    </div>
  );
}

export default function ProspectsPage() {
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState('all');

  const filtered = mockProspects.filter((p) => {
    if (stageFilter !== 'all' && p.stage !== stageFilter) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) &&
        !p.company?.toLowerCase().includes(search.toLowerCase()) &&
        !p.twitter_handle?.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-400" />
            Prospects
          </h1>
          <p className="text-zinc-400 mt-1">{mockProspects.length} prospects in your pipeline</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
            <Upload className="w-4 h-4 mr-2" /> Import CSV
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-500 text-white">
            <Plus className="w-4 h-4 mr-2" /> Add Prospect
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <Input
            placeholder="Search prospects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
          />
        </div>
        <Select value={stageFilter} onValueChange={setStageFilter}>
          <SelectTrigger className="w-40 bg-zinc-900 border-zinc-700 text-zinc-300">
            <SelectValue placeholder="Stage" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-700">
            <SelectItem value="all">All Stages</SelectItem>
            <SelectItem value="detected">Detected</SelectItem>
            <SelectItem value="warming">Warming</SelectItem>
            <SelectItem value="engaged">Engaged</SelectItem>
            <SelectItem value="booking">Booking</SelectItem>
            <SelectItem value="booked">Booked</SelectItem>
            <SelectItem value="converted">Converted</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card className="bg-zinc-900/50 border-zinc-800">
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-800 hover:bg-transparent">
              <TableHead className="text-zinc-400">Prospect</TableHead>
              <TableHead className="text-zinc-400">Company</TableHead>
              <TableHead className="text-zinc-400">Stage</TableHead>
              <TableHead className="text-zinc-400">ICP Match</TableHead>
              <TableHead className="text-zinc-400">Signal Score</TableHead>
              <TableHead className="text-zinc-400">Last Signal</TableHead>
              <TableHead className="text-zinc-400 w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((prospect) => (
              <TableRow key={prospect.id} className="border-zinc-800/50 hover:bg-zinc-800/30 cursor-pointer">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-white text-sm font-medium">
                      {prospect.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{prospect.name}</p>
                      <p className="text-xs text-zinc-500">{prospect.twitter_handle}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="text-sm text-zinc-300">{prospect.company}</p>
                    <p className="text-xs text-zinc-500">{prospect.title}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={`text-xs ${stageColors[prospect.stage]}`}>
                    {prospect.stage.charAt(0).toUpperCase() + prospect.stage.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <ScoreBar score={prospect.icp_match_score} color="bg-gradient-to-r from-blue-500 to-violet-500" />
                </TableCell>
                <TableCell>
                  <ScoreBar score={prospect.signal_score} color="bg-gradient-to-r from-orange-500 to-red-500" />
                </TableCell>
                <TableCell>
                  <span className="text-sm text-zinc-400">
                    {prospect.last_signal_at
                      ? new Date(prospect.last_signal_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                      : '-'}
                  </span>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white h-8 w-8 p-0">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
