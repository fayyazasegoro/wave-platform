'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSubscription } from '@/context/SubscriptionContext';
import {
  Compass,
  TrendingUp,
  LineChart,
  Network,
  Lightbulb,
  Target,
  Hammer,
  Rocket,
  LayoutGrid,
  CreditCard,
  Settings,
  Shield,
  Lock,
} from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: any;
  tier: string;
  locked?: boolean;
  badge?: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { subscription, triggerUpgradePrompt } = useSubscription();

  const isFree = subscription.plan === 'free';
  const isPremiumOrPro = subscription.plan === 'premium' || subscription.plan === 'pro';
  const isPro = subscription.plan === 'pro';

  const navGroups: NavGroup[] = [
    {
      title: 'OVERVIEW',
      items: [
        { label: 'Dashboard', href: '/dashboard', icon: LayoutGrid, tier: 'all' },
      ],
    },
    {
      title: 'DISCOVER',
      items: [
        { label: 'WAVE Radar', href: '/radar', icon: Compass, tier: 'all' },
        { label: 'WAVE Forecast', href: '/forecast', icon: LineChart, tier: 'all' },
      ],
    },
    {
      title: 'EXPLORE',
      items: [
        {
          label: 'Beyond the Wave',
          href: '/beyond-the-wave',
          icon: Network,
          tier: 'premium',
          locked: isFree,
          badge: 'PREMIUM',
        },
        {
          label: 'WAVE Innovate',
          href: '/innovate',
          icon: Lightbulb,
          tier: 'premium',
          locked: isFree,
          badge: 'PREMIUM',
        },
        {
          label: 'WAVE Opportunity',
          href: '/opportunity',
          icon: Target,
          tier: 'all',
          badge: isFree ? 'BASIC' : 'PRO',
        },
      ],
    },
    {
      title: 'BUILD',
      items: [
        {
          label: 'WAVE Builder',
          href: '/builder',
          icon: Hammer,
          tier: 'pro',
          locked: !isPro,
          badge: 'PRO',
        },
        {
          label: 'Business Launch',
          href: '/launch',
          icon: Rocket,
          tier: 'pro',
          locked: !isPro,
          badge: 'PRO',
        },
      ],
    },
    {
      title: 'WORKSPACE',
      items: [
        {
          label: 'My Business Canvas',
          href: '/canvas',
          icon: TrendingUp,
          tier: 'all',
          badge: 'CORE',
        },
      ],
    },
    {
      title: 'ACCOUNT',
      items: [
        { label: 'Subscription & Quota', href: '/subscription', icon: CreditCard, tier: 'all' },
        { label: 'Settings', href: '/settings', icon: Settings, tier: 'all' },
        { label: 'Admin Intelligence', href: '/admin', icon: Shield, tier: 'all' },
      ],
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-navy-950/80 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 bg-navy-950 border-r border-slate-800/80 flex flex-col justify-between overflow-y-auto transition-transform duration-200 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="py-4 px-3 space-y-6">
          {navGroups.map((group) => (
            <div key={group.title}>
              <div className="px-3 mb-2 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                {group.title}
              </div>
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;

                  if (item.locked) {
                    return (
                      <li key={item.href}>
                        <button
                          onClick={() => triggerUpgradePrompt(item.label)}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-navy-900/60 transition-colors group text-left"
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className="w-4 h-4 text-slate-500 group-hover:text-slate-300" />
                            <span>{item.label}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/50">
                              {item.badge}
                            </span>
                            <Lock className="w-3 h-3 text-slate-500" />
                          </div>
                        </button>
                      </li>
                    );
                  }

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                          isActive
                            ? 'bg-teal-500/10 text-teal-300 font-semibold border border-teal-500/30 shadow-sm shadow-teal-500/10'
                            : 'text-slate-300 hover:text-white hover:bg-navy-900'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon
                            className={`w-4 h-4 ${
                              isActive ? 'text-teal-400' : 'text-slate-400'
                            }`}
                          />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                              item.badge === 'CORE'
                                ? 'bg-teal-500/20 text-teal-300 border-teal-500/30'
                                : item.badge === 'PRO'
                                ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                                : 'bg-slate-800 text-slate-400 border-slate-700'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="p-3 m-3 rounded-xl bg-gradient-to-b from-navy-900 to-navy-850 border border-slate-800 text-xs">
          <div className="font-bold text-white mb-1 flex items-center justify-between">
            <span>Paket Anda: {subscription.plan.toUpperCase()}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <p className="text-[11px] text-slate-400 mb-3">
            {subscription.plan === 'pro'
              ? 'Akses penuh seluruh modul WAVE Builder & Launch.'
              : subscription.plan === 'premium'
              ? 'Diferensiasi & Celah Pasar Aktif.'
              : 'Eksplorasi tren pasar dasar aktif.'}
          </p>
          {subscription.plan !== 'pro' && (
            <button
              onClick={() => triggerUpgradePrompt('WAVE PRO')}
              className="w-full py-1.5 rounded-lg bg-teal-500/15 hover:bg-teal-500/25 border border-teal-500/30 text-teal-300 text-[11px] font-bold transition-all text-center"
            >
              Tingkatkan ke PRO
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
