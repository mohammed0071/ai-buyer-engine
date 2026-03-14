'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  Settings, User, CreditCard, Link, Bell, Shield,
  Twitter, Calendar, Zap, CheckCircle2, ExternalLink,
  AlertTriangle
} from 'lucide-react';

export default function SettingsPage() {
  const [autoOutreach, setAutoOutreach] = useState(true);
  const [approvalMode, setApprovalMode] = useState(false);
  const [dailyLimit, setDailyLimit] = useState('25');
  const [notifyMeetings, setNotifyMeetings] = useState(true);
  const [notifyHotSignals, setNotifyHotSignals] = useState(true);

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-zinc-400" />
          Settings
        </h1>
        <p className="text-zinc-400 mt-1">Manage your account, integrations, and preferences</p>
      </div>

      {/* Profile */}
      <Card className="bg-zinc-900/50 border-zinc-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <User className="w-4 h-4 text-zinc-400" /> Profile
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-zinc-300">Full Name</Label>
            <Input defaultValue="Demo User" className="bg-zinc-800/50 border-zinc-700 text-white" />
          </div>
          <div className="space-y-2">
            <Label className="text-zinc-300">Email</Label>
            <Input defaultValue="demo@buyerengine.ai" className="bg-zinc-800/50 border-zinc-700 text-white" disabled />
          </div>
          <div className="space-y-2">
            <Label className="text-zinc-300">Company</Label>
            <Input defaultValue="Acme Corp" className="bg-zinc-800/50 border-zinc-700 text-white" />
          </div>
          <div className="space-y-2">
            <Label className="text-zinc-300">Timezone</Label>
            <Input defaultValue="America/New_York" className="bg-zinc-800/50 border-zinc-700 text-white" />
          </div>
        </div>
        <Button className="mt-4 bg-blue-600 hover:bg-blue-500 text-white">Save Changes</Button>
      </Card>

      {/* Connected Accounts */}
      <Card className="bg-zinc-900/50 border-zinc-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Link className="w-4 h-4 text-blue-400" /> Connected Accounts
        </h3>
        <div className="space-y-3">
          {/* X/Twitter */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-800/30 border border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                <Twitter className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">X / Twitter</p>
                <p className="text-xs text-zinc-500">Required for signal detection and outreach</p>
              </div>
            </div>
            <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
              Connect
            </Button>
          </div>

          {/* Google Calendar */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-800/30 border border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Google Calendar</p>
                <p className="text-xs text-zinc-500">For availability checking and meeting creation</p>
              </div>
            </div>
            <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
              Connect
            </Button>
          </div>

          {/* Calendly */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-800/30 border border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Calendly</p>
                <p className="text-xs text-zinc-500">Share booking links in DM conversations</p>
              </div>
            </div>
            <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
              Connect
            </Button>
          </div>
        </div>
      </Card>

      {/* Outreach Settings */}
      <Card className="bg-zinc-900/50 border-zinc-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" /> Outreach Settings
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Auto Outreach</p>
              <p className="text-xs text-zinc-500">Automatically engage hot signals without manual approval</p>
            </div>
            <Switch checked={autoOutreach} onCheckedChange={setAutoOutreach} />
          </div>
          <Separator className="bg-zinc-800" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Approval Mode</p>
              <p className="text-xs text-zinc-500">Review AI-generated messages before they&apos;re sent</p>
            </div>
            <Switch checked={approvalMode} onCheckedChange={setApprovalMode} />
          </div>
          <Separator className="bg-zinc-800" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Daily Outreach Limit</p>
              <p className="text-xs text-zinc-500">Maximum DMs and engagements per day</p>
            </div>
            <Input
              type="number"
              value={dailyLimit}
              onChange={(e) => setDailyLimit(e.target.value)}
              className="w-20 bg-zinc-800/50 border-zinc-700 text-white text-center"
            />
          </div>
        </div>
      </Card>

      {/* Notifications */}
      <Card className="bg-zinc-900/50 border-zinc-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Bell className="w-4 h-4 text-violet-400" /> Notifications
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Meeting Booked</p>
              <p className="text-xs text-zinc-500">Get notified when a meeting is booked</p>
            </div>
            <Switch checked={notifyMeetings} onCheckedChange={setNotifyMeetings} />
          </div>
          <Separator className="bg-zinc-800" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Hot Signals</p>
              <p className="text-xs text-zinc-500">Alert when a high-score signal is detected</p>
            </div>
            <Switch checked={notifyHotSignals} onCheckedChange={setNotifyHotSignals} />
          </div>
        </div>
      </Card>

      {/* Billing */}
      <Card className="bg-zinc-900/50 border-zinc-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-green-400" /> Billing
        </h3>
        <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-800/30 border border-zinc-800 mb-4">
          <div>
            <p className="text-sm font-medium text-white">Current Plan: <span className="text-blue-400">Growth</span></p>
            <p className="text-xs text-zinc-500">$399/mo · 2,000 prospects · 1,000 AI messages</p>
          </div>
          <Badge className="bg-green-500/10 text-green-400 border-0">Active</Badge>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
              <span>AI Messages Used</span>
              <span>342 / 1,000</span>
            </div>
            <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500" style={{ width: '34.2%' }} />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
            Manage Subscription
          </Button>
          <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
            <ExternalLink className="w-4 h-4 mr-2" /> Billing Portal
          </Button>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="bg-zinc-900/50 border-red-500/20 p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-400" /> Danger Zone
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-white">Delete Account</p>
            <p className="text-xs text-zinc-500">Permanently delete your account and all data</p>
          </div>
          <Button variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/10">
            Delete Account
          </Button>
        </div>
      </Card>
    </div>
  );
}
