'use client';

import React from 'react';
import Link from 'next/link';
import { useSubscription } from '@/context/SubscriptionContext';
import { useProject } from '@/context/ProjectContext';
import { Sparkles, Layers, ArrowUpRight, FolderPlus } from 'lucide-react';

export function Navbar({ onMobileMenuToggle }: { onMobileMenuToggle?: () => void }) {
  const { subscription, triggerUpgradePrompt } = useSubscription();
  const { projects, activeProject, setActiveProject, createProject } = useProject();

  const handleCreateQuickProject = () => {
    const title = prompt('Nama Proyek Bisnis Baru:', 'Proyek Bisnis Inovatif');
    if (title) {
      createProject(title, 'Food & Beverages', 'Inisiasi proyek baru dari My Business Canvas.');
    }
  };

  const tierColors = {
    free: 'bg-slate-800 text-slate-300 border-slate-700',
    premium: 'bg-teal-500/10 text-teal-300 border-teal-500/30',
    pro: 'bg-gradient-to-r from-indigo-500/20 to-teal-500/20 text-indigo-300 border-indigo-500/40',
  };

  return (
    <header className="sticky top-0 z-40 w-full h-16 bg-navy-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-6 flex items-center justify-between">
      {/* Left side: Brand & Mobile Menu */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          aria-label="Buka Navigasi"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-ocean-600 flex items-center justify-center font-black text-navy-950 text-base shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
            W
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-wider text-white">WAVE</span>
            <span className="hidden sm:inline-block ml-2 text-[10px] font-medium text-teal-400/90 tracking-widest uppercase">
              Trend Intelligence
            </span>
          </div>
        </Link>
      </div>

      {/* Middle: Active Project Selector */}
      <div className="hidden md:flex items-center gap-2 max-w-sm">
        <Layers className="w-4 h-4 text-teal-400 shrink-0" />
        <span className="text-xs text-slate-400 shrink-0">Proyek Aktif:</span>
        <select
          value={activeProject?.id || ''}
          onChange={(e) => {
            const chosen = projects.find((p) => p.id === e.target.value);
            if (chosen) setActiveProject(chosen);
          }}
          className="bg-navy-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-teal-400 max-w-[200px] truncate"
        >
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} ({p.progressPercentage}%)
            </option>
          ))}
        </select>

        <button
          onClick={handleCreateQuickProject}
          title="Buat Proyek Baru di Canvas"
          className="p-1.5 rounded-lg text-slate-400 hover:text-teal-300 hover:bg-navy-850 transition-colors"
        >
          <FolderPlus className="w-4 h-4" />
        </button>
      </div>

      {/* Right side: Subscription Pill, AI Quota & CTA */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* AI Quota pill */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-navy-900 border border-slate-800 text-xs text-slate-300">
          <Sparkles className="w-3.5 h-3.5 text-teal-400" />
          <span>
            {subscription.aiQueriesUsedThisMonth}/{subscription.aiQueriesLimit} AI
          </span>
        </div>

        {/* Tier indicator */}
        <div
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
            tierColors[subscription.plan]
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-teal-400" />
          <span className="uppercase text-[11px] font-bold">
            {subscription.plan}
          </span>
        </div>

        {subscription.plan !== 'pro' ? (
          <button
            onClick={() => triggerUpgradePrompt(subscription.plan === 'free' ? 'WAVE Premium & Pro' : 'WAVE Pro')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-teal-500 to-ocean-500 text-navy-950 hover:from-teal-400 hover:to-ocean-400 text-xs font-bold shadow-md shadow-teal-500/15 transition-all"
          >
            Upgrade <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <span className="hidden sm:inline-flex text-[11px] font-bold px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
            PRO UNLOCKED
          </span>
        )}
      </div>
    </header>
  );
}
