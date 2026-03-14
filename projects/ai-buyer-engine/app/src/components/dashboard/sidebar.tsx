'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/hooks/use-auth';
import {
  LayoutDashboard, Radio, Users, MessageSquare, Calendar,
  Target, Settings, BarChart3, Zap, LogOut
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/signals', label: 'Signals', icon: Radio },
  { href: '/dashboard/prospects', label: 'Prospects', icon: Users },
  { href: '/dashboard/outreach', label: 'Outreach', icon: MessageSquare },
  { href: '/dashboard/meetings', label: 'Meetings', icon: Calendar },
  { href: '/dashboard/icp', label: 'ICP Builder', icon: Target },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
];

const bottomNavItems = [
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, isDemo, signOut } = useAuth();

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Demo User';
  const displayEmail = user?.email || 'demo@buyerengine.ai';
  const initial = displayName.charAt(0).toUpperCase();

  const handleSignOut = () => {
    if (isDemo) {
      window.location.href = '/';
    } else {
      signOut();
    }
  };

  return (
    <aside className="w-64 h-screen bg-zinc-950 border-r border-zinc-800/50 flex flex-col fixed left-0 top-0 z-40">
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-zinc-800/50">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white">Buyer Engine</span>
        </Link>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-500/10 text-blue-400'
                  : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
              )}
            >
              <item.icon className="w-4.5 h-4.5" />
              {item.label}
              {item.label === 'Signals' && (
                <span className="ml-auto bg-red-500/20 text-red-400 text-xs px-2 py-0.5 rounded-full font-medium">
                  3
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Nav */}
      <div className="py-4 px-3 border-t border-zinc-800/50 space-y-1">
        {bottomNavItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-500/10 text-blue-400'
                  : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
              )}
            >
              <item.icon className="w-4.5 h-4.5" />
              {item.label}
            </Link>
          );
        })}

        {/* User */}
        <div className="flex items-center gap-3 px-3 py-2.5 mt-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-sm font-medium">
            {initial}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-zinc-200 truncate">{displayName}</p>
            <p className="text-xs text-zinc-500 truncate">{displayEmail}</p>
          </div>
          <button onClick={handleSignOut} className="text-zinc-500 hover:text-zinc-300" title="Sign out">
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        {isDemo && (
          <div className="mx-3 mt-1 px-2 py-1 rounded bg-amber-400/10 border border-amber-400/20">
            <p className="text-[10px] text-amber-400 text-center">Demo Mode — Mock Data</p>
          </div>
        )}
      </div>
    </aside>
  );
}
