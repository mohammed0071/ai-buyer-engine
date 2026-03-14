'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  Settings, User, CreditCard, Link, Bell, 
  Twitter, Linkedin, Calendar, Zap, ExternalLink,
  AlertTriangle, Loader2, CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner';

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  workspace_id: string;
  role: string;
  workspaces?: {
    id: string;
    name: string;
    plan: string;
    settings: any;
    stripe_customer_id?: string;
    subscription_status?: string;
  };
}

export default function SettingsPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [integrations, setIntegrations] = useState<any>(null);

  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [timezone, setTimezone] = useState('America/New_York');
  const [autoOutreach, setAutoOutreach] = useState(true);
  const [approvalMode, setApprovalMode] = useState(false);
  const [dailyLimit, setDailyLimit] = useState('25');
  const [notifyMeetings, setNotifyMeetings] = useState(true);
  const [notifyHotSignals, setNotifyHotSignals] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/profile').then(r => r.json()),
      fetch('/api/integrations/status').then(r => r.json()),
    ]).then(([profileRes, intRes]) => {
      const p = profileRes.data;
      setProfile(p);
      setFullName(p?.full_name || '');
      setCompany(p?.workspaces?.name || '');
      setTimezone(p?.workspaces?.settings?.timezone || 'America/New_York');
      setAutoOutreach(p?.workspaces?.settings?.auto_outreach ?? true);
      setApprovalMode(p?.workspaces?.settings?.approval_mode ?? false);
      setDailyLimit(String(p?.workspaces?.settings?.daily_outreach_limit || 25));
      setIntegrations(intRes);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'profile', data: { full_name: fullName } }),
      });
      toast.success('Profile updated');
    } catch {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSettings = async () => {
    try {
      await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'workspace_settings',
          data: {
            daily_outreach_limit: parseInt(dailyLimit),
            auto_outreach: autoOutreach,
            approval_mode: approvalMode,
            timezone,
          },
        }),
      });
      toast.success('Settings saved');
    } catch {
      toast.error('Failed to save settings');
    }
  };

  const handleCheckout = async (plan: string) => {
    try {
      const res = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, billing_period: 'monthly' }),
      });
      const data = await res.json();
      if (data.checkout_url && !data.demo) {
        window.location.href = data.checkout_url;
      } else {
        toast.info(data.message || 'Stripe not configured — billing in demo mode');
      }
    } catch {
      toast.error('Failed to create checkout session');
    }
  };

  const handleBillingPortal = async () => {
    try {
      const res = await fetch('/api/billing/portal', { method: 'POST' });
      const data = await res.json();
      if (data.url) {
        window.open(data.url, '_blank');
      } else {
        toast.info(data.message || 'Billing portal not available');
      }
    } catch {
      toast.error('Failed to open billing portal');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
      </div>
    );
  }

  const currentPlan = profile?.workspaces?.plan || 'starter';
  const subStatus = profile?.workspaces?.subscription_status || 'inactive';

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
            <Input value={fullName} onChange={(e) => setFullName(e.target.value)} className="bg-zinc-800/50 border-zinc-700 text-white" />
          </div>
          <div className="space-y-2">
            <Label className="text-zinc-300">Email</Label>
            <Input value={profile?.email || ''} className="bg-zinc-800/50 border-zinc-700 text-white" disabled />
          </div>
          <div className="space-y-2">
            <Label className="text-zinc-300">Workspace</Label>
            <Input value={company} onChange={(e) => setCompany(e.target.value)} className="bg-zinc-800/50 border-zinc-700 text-white" />
          </div>
          <div className="space-y-2">
            <Label className="text-zinc-300">Timezone</Label>
            <Input value={timezone} onChange={(e) => setTimezone(e.target.value)} className="bg-zinc-800/50 border-zinc-700 text-white" />
          </div>
        </div>
        <Button className="mt-4 bg-blue-600 hover:bg-blue-500 text-white" onClick={handleSaveProfile} disabled={saving}>
          {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
          Save Changes
        </Button>
      </Card>

      {/* Connected Accounts / Integrations */}
      <Card className="bg-zinc-900/50 border-zinc-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Link className="w-4 h-4 text-blue-400" /> Connected Accounts
        </h3>
        <div className="space-y-3">
          {/* Twitter */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-800/30 border border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                <Twitter className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">X / Twitter</p>
                <p className="text-xs text-zinc-500">
                  {integrations?.twitter?.configured ? 'Connected — live signal detection' : 'Using simulated signals'}
                </p>
              </div>
            </div>
            {integrations?.twitter?.configured ? (
              <Badge className="bg-green-500/10 text-green-400 border-0">
                <CheckCircle2 className="w-3 h-3 mr-1" /> Connected
              </Badge>
            ) : (
              <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">Connect</Button>
            )}
          </div>

          {/* LinkedIn */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-800/30 border border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                <Linkedin className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-white">LinkedIn</p>
                  <Badge className="bg-amber-500/10 text-amber-400 border-0 text-[10px]">Beta</Badge>
                </div>
                <p className="text-xs text-zinc-500">Profile views, job changes, engagement signals</p>
              </div>
            </div>
            <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">Connect</Button>
          </div>

          {/* GHL */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-800/30 border border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                <Zap className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">GoHighLevel</p>
                <p className="text-xs text-zinc-500">
                  {integrations?.ghl?.configured ? 'Connected — outreach automation active' : 'For outreach automation & meeting booking'}
                </p>
              </div>
            </div>
            {integrations?.ghl?.configured ? (
              <Badge className="bg-green-500/10 text-green-400 border-0">
                <CheckCircle2 className="w-3 h-3 mr-1" /> Connected
              </Badge>
            ) : (
              <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">Configure</Button>
            )}
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
            <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">Connect</Button>
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
        <Button className="mt-4 bg-blue-600 hover:bg-blue-500 text-white" onClick={handleSaveSettings}>
          Save Outreach Settings
        </Button>
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
            <p className="text-sm font-medium text-white">
              Current Plan: <span className="text-blue-400 capitalize">{currentPlan}</span>
            </p>
            <p className="text-xs text-zinc-500">
              {subStatus === 'active' ? 'Active subscription' : subStatus === 'trialing' ? 'Free trial' : 'No active subscription'}
            </p>
          </div>
          <Badge className={subStatus === 'active' ? 'bg-green-500/10 text-green-400 border-0' : 'bg-zinc-700/50 text-zinc-400 border-0'}>
            {subStatus === 'active' ? 'Active' : subStatus === 'trialing' ? 'Trial' : 'Inactive'}
          </Badge>
        </div>

        {/* Plan selection */}
        <div className="grid sm:grid-cols-3 gap-3 mb-4">
          {[
            { id: 'starter', name: 'Starter', price: '$99/mo', desc: '200 prospects' },
            { id: 'growth', name: 'Growth', price: '$399/mo', desc: '2,000 prospects' },
            { id: 'scale', name: 'Scale', price: '$899/mo', desc: '10,000 prospects' },
          ].map((plan) => (
            <button
              key={plan.id}
              onClick={() => handleCheckout(plan.id)}
              className={`p-3 rounded-lg border text-left transition-colors ${
                currentPlan === plan.id
                  ? 'border-blue-500/50 bg-blue-500/10'
                  : 'border-zinc-800 bg-zinc-800/30 hover:border-zinc-700'
              }`}
            >
              <p className="text-sm font-medium text-white">{plan.name}</p>
              <p className="text-xs text-blue-400 font-medium">{plan.price}</p>
              <p className="text-xs text-zinc-500 mt-1">{plan.desc}</p>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800" onClick={handleBillingPortal}>
            <ExternalLink className="w-4 h-4 mr-2" /> Billing Portal
          </Button>
        </div>

        {!integrations?.stripe?.configured && (
          <p className="text-xs text-amber-400 mt-3">
            ⚠️ Stripe not configured — billing is in demo mode. Set STRIPE_SECRET_KEY to enable payments.
          </p>
        )}
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
