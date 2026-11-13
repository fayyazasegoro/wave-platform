'use client';

import React from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { useSubscription } from '@/context/SubscriptionContext';
import { useProject } from '@/context/ProjectContext';
import { INITIAL_TRENDS, LIFECYCLE_BADGES } from '@/data/marketIntelligence';
import { DataLabelBadge } from '@/components/common/DataLabelBadge';
import {
  Compass,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Target,
  FolderKanban,
  AlertTriangle,
  Flame,
  CheckCircle2,
} from 'lucide-react';

export default function DashboardPage() {
  const { subscription, triggerUpgradePrompt } = useSubscription();
  const { projects, activeProject, setActiveProject } = useProject();

  const risingTrends = INITIAL_TRENDS.filter((t) => t.lifecycle === 'rising');
  const emergingTrends = INITIAL_TRENDS.filter((t) => t.lifecycle === 'emerging');
  const peakTrends = INITIAL_TRENDS.filter((t) => t.lifecycle === 'peak');

  return (
    <AppLayout>
      {/* Header Greeting */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            Pasar Indonesia • Live Intelligence
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Selamat Datang di Command Center WAVE
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Pantau pergerakan pasar hari ini, temukan celah bisnis, dan sinkronkan kemajuan proyek My Business Canvas Anda.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/radar"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-navy-900 border border-slate-700 hover:border-slate-600 text-slate-200 text-xs font-semibold transition-colors"
          >
            <Compass className="w-4 h-4 text-teal-400" />
            Buka WAVE Radar
          </Link>
          <Link
            href="/canvas"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-ocean-500 hover:from-teal-400 hover:to-ocean-400 text-navy-950 text-xs font-bold shadow-md shadow-teal-500/15 transition-all"
          >
            <FolderKanban className="w-4 h-4" />
            My Business Canvas
          </Link>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-navy-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Tren Sedang Naik</span>
            <Flame className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-black text-white">4 Kategori</div>
          <div className="text-[11px] text-teal-400 mt-1 flex items-center gap-1">
            <span>+38% momentum rata-rata</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-navy-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Peluang Sekunder</span>
            <Sparkles className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-black text-white">12 Konsep</div>
          <div className="text-[11px] text-slate-400 mt-1">
            Di Beyond the Wave
          </div>
        </div>

        <div className="p-4 rounded-xl bg-navy-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Proyek Aktif Anda</span>
            <FolderKanban className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white">{projects.length} Proyek</div>
          <div className="text-[11px] text-slate-400 mt-1">
            Di My Business Canvas
          </div>
        </div>

        <div className="p-4 rounded-xl bg-navy-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Kuota AI Digunakan</span>
            <Target className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-white">
            {subscription.aiQueriesUsedThisMonth}/{subscription.aiQueriesLimit}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 uppercase">
            Paket {subscription.plan}
          </div>
        </div>
      </div>

      {/* Main Grid: Rising Trends & Active Project */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Left Column: Today's Rising Trends (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-teal-400" />
              Tren Teratas Hari Ini (Today's Rising Trends)
            </h2>
            <Link href="/radar" className="text-xs text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1">
              Lihat Semua <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {risingTrends.map((trend) => {
              const badge = LIFECYCLE_BADGES[trend.lifecycle];
              return (
                <div
                  key={trend.id}
                  className="p-5 rounded-2xl bg-navy-900 border border-slate-800 hover:border-slate-700 transition-all shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-teal-400">
                        {trend.category}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge.color}`}>
                        {badge.label}
                      </span>
                    </div>
                    <DataLabelBadge label={trend.dataLabel} />
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">
                    {trend.name}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {trend.shortDescription}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 px-3.5 rounded-xl bg-navy-850 border border-slate-800/80 mb-4 text-xs">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase">Momentum</div>
                      <div className="font-bold text-teal-300">{trend.demandMomentum}/100</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase">Kompetisi</div>
                      <div className="font-bold text-amber-300">{trend.competitionLevel}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase">Opportunity Score</div>
                      <div className="font-extrabold text-white">{trend.opportunityScore}/100</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase">Rekomendasi</div>
                      <div className="font-bold text-emerald-400 text-[11px]">{trend.entryRecommendation}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
                    <span className="text-slate-400 text-[11px]">
                      Diperbarui: {trend.lastUpdated}
                    </span>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/forecast?trendId=${trend.id}`}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors"
                      >
                        Lihat Forecast
                      </Link>
                      <Link
                        href={`/beyond-the-wave?trendId=${trend.id}`}
                        className="px-3 py-1.5 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 font-semibold transition-colors"
                      >
                        Peluang Sekunder
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Canvas Project & Beyond Preview */}
        <div className="space-y-6">
          {/* Active Canvas Project Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-navy-900 to-navy-850 border border-slate-800 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                Proyek Canvas Aktif
              </span>
              <span className="text-xs font-bold text-slate-400">
                {activeProject?.progressPercentage || 0}% Selesai
              </span>
            </div>

            {activeProject ? (
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{activeProject.name}</h3>
                <span className="inline-block text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 mb-3 border border-slate-700">
                  {activeProject.category}
                </span>
                <p className="text-xs text-slate-400 mb-4 line-clamp-2">
                  {activeProject.description}
                </p>

                {/* Progress Bar */}
                <div className="w-full bg-slate-800 rounded-full h-2 mb-4 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-teal-400 to-ocean-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${activeProject.progressPercentage}%` }}
                  />
                </div>

                <div className="space-y-2 text-xs text-slate-300 mb-5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Ide Bisnis:</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Terisi
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Perencanaan Finansial:</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Terisi
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Roadmap Peluncuran:</span>
                    <span className="text-teal-400 font-semibold">10 Milestone</span>
                  </div>
                </div>

                <Link
                  href="/canvas"
                  className="w-full py-2.5 px-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-teal-500/15"
                >
                  Buka di My Business Canvas <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-xs text-slate-400 mb-3">Belum ada proyek yang dipilih.</p>
                <Link
                  href="/canvas"
                  className="px-4 py-2 rounded-xl bg-teal-500 text-navy-950 font-bold text-xs inline-block"
                >
                  Buat Proyek Pertama
                </Link>
              </div>
            )}
          </div>

          {/* Beyond the Wave Highlight Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-navy-900 to-navy-900 border border-indigo-500/30">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Beyond the Wave
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                PREMIUM
              </span>
            </div>
            <h3 className="font-bold text-white text-base mb-2">
              Peluang Sekunder di Balik Tren Utama
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Hindari pasar yang telah jenuh. Temukan bisnis penyedia perlengkapan, bahan baku artisan, atau agensi pendukung di sekeliling tren yang meledak.
            </p>
            {subscription.plan === 'free' ? (
              <button
                onClick={() => triggerUpgradePrompt('Beyond the Wave')}
                className="w-full py-2.5 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 font-bold text-xs transition-colors"
              >
                Buka Beyond the Wave dengan Premium
              </button>
            ) : (
              <Link
                href="/beyond-the-wave"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                Eksplorasi Peluang Sekunder <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
