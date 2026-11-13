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
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-soft-pistachio/10 text-soft-pistachio text-xs font-semibold uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-soft-pistachio animate-pulse" />
            Pasar Indonesia • Live Intelligence
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Selamat Datang di Command Center WAVE
          </h1>
          <p className="text-soft-pistachio text-xs sm:text-sm mt-1">
            Pantau pergerakan pasar hari ini, temukan celah bisnis, dan sinkronkan kemajuan proyek My Business Canvas Anda.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/radar"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-warm-ivory border border-soft-pistachio hover:border-soft-pistachio text-deep-sage text-xs font-semibold transition-colors"
          >
            <Compass className="w-4 h-4 text-soft-pistachio" />
            Buka WAVE Radar
          </Link>
          <Link
            href="/canvas"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-soft-pistachio to-soft-apricot hover:from-teal-400 hover:to-ocean-400 text-deep-sage text-xs font-bold shadow-md shadow-teal-500/15 transition-all"
          >
            <FolderKanban className="w-4 h-4" />
            My Business Canvas
          </Link>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-warm-ivory border border-soft-pistachio">
          <div className="flex items-center justify-between text-soft-pistachio text-xs mb-2">
            <span>Tren Sedang Naik</span>
            <Flame className="w-4 h-4 text-soft-apricot" />
          </div>
          <div className="text-2xl font-black text-white">4 Kategori</div>
          <div className="text-[11px] text-soft-pistachio mt-1 flex items-center gap-1">
            <span>+38% momentum rata-rata</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-warm-ivory border border-soft-pistachio">
          <div className="flex items-center justify-between text-soft-pistachio text-xs mb-2">
            <span>Peluang Sekunder</span>
            <Sparkles className="w-4 h-4 text-soft-pistachio" />
          </div>
          <div className="text-2xl font-black text-white">12 Konsep</div>
          <div className="text-[11px] text-soft-pistachio mt-1">
            Di Beyond the Wave
          </div>
        </div>

        <div className="p-4 rounded-xl bg-warm-ivory border border-soft-pistachio">
          <div className="flex items-center justify-between text-soft-pistachio text-xs mb-2">
            <span>Proyek Aktif Anda</span>
            <FolderKanban className="w-4 h-4 text-soft-apricot" />
          </div>
          <div className="text-2xl font-black text-white">{projects.length} Proyek</div>
          <div className="text-[11px] text-soft-pistachio mt-1">
            Di My Business Canvas
          </div>
        </div>

        <div className="p-4 rounded-xl bg-warm-ivory border border-soft-pistachio">
          <div className="flex items-center justify-between text-soft-pistachio text-xs mb-2">
            <span>Kuota AI Digunakan</span>
            <Target className="w-4 h-4 text-muted-pistachio" />
          </div>
          <div className="text-2xl font-black text-white">
            {subscription.aiQueriesUsedThisMonth}/{subscription.aiQueriesLimit}
          </div>
          <div className="text-[11px] text-soft-pistachio mt-1 uppercase">
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
              <TrendingUp className="w-5 h-5 text-soft-pistachio" />
              Tren Teratas Hari Ini (Today's Rising Trends)
            </h2>
            <Link href="/radar" className="text-xs text-soft-pistachio hover:text-soft-pistachio font-semibold flex items-center gap-1">
              Lihat Semua <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {risingTrends.map((trend) => {
              const badge = LIFECYCLE_BADGES[trend.lifecycle];
              return (
                <div
                  key={trend.id}
                  className="p-5 rounded-2xl bg-warm-ivory border border-soft-pistachio hover:border-soft-pistachio transition-all shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-soft-pistachio">
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
                  <p className="text-xs text-deep-sage leading-relaxed mb-4">
                    {trend.shortDescription}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 px-3.5 rounded-xl bg-soft-pistachio border border-soft-pistachio/80 mb-4 text-xs">
                    <div>
                      <div className="text-[10px] text-soft-pistachio uppercase">Momentum</div>
                      <div className="font-bold text-soft-pistachio">{trend.demandMomentum}/100</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-soft-pistachio uppercase">Kompetisi</div>
                      <div className="font-bold text-soft-apricot">{trend.competitionLevel}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-soft-pistachio uppercase">Opportunity Score</div>
                      <div className="font-extrabold text-white">{trend.opportunityScore}/100</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-soft-pistachio uppercase">Rekomendasi</div>
                      <div className="font-bold text-soft-pistachio text-[11px]">{trend.entryRecommendation}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
                    <span className="text-soft-pistachio text-[11px]">
                      Diperbarui: {trend.lastUpdated}
                    </span>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/forecast?trendId=${trend.id}`}
                        className="px-3 py-1.5 rounded-lg bg-soft-pistachio hover:bg-soft-pistachio text-deep-sage font-medium transition-colors"
                      >
                        Lihat Forecast
                      </Link>
                      <Link
                        href={`/beyond-the-wave?trendId=${trend.id}`}
                        className="px-3 py-1.5 rounded-lg bg-soft-pistachio/10 hover:bg-soft-pistachio/20 text-soft-pistachio border border-teal-500/30 font-semibold transition-colors"
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
          <div className="p-6 rounded-2xl bg-gradient-to-b from-navy-900 to-navy-850 border border-soft-pistachio shadow-md">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-soft-pistachio">
                Proyek Canvas Aktif
              </span>
              <span className="text-xs font-bold text-soft-pistachio">
                {activeProject?.progressPercentage || 0}% Selesai
              </span>
            </div>

            {activeProject ? (
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{activeProject.name}</h3>
                <span className="inline-block text-[11px] px-2 py-0.5 rounded bg-soft-pistachio text-deep-sage mb-3 border border-soft-pistachio">
                  {activeProject.category}
                </span>
                <p className="text-xs text-soft-pistachio mb-4 line-clamp-2">
                  {activeProject.description}
                </p>

                {/* Progress Bar */}
                <div className="w-full bg-soft-pistachio rounded-full h-2 mb-4 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-soft-pistachio to-soft-apricot h-2 rounded-full transition-all duration-500"
                    style={{ width: `${activeProject.progressPercentage}%` }}
                  />
                </div>

                <div className="space-y-2 text-xs text-deep-sage mb-5">
                  <div className="flex items-center justify-between">
                    <span className="text-soft-pistachio">Ide Bisnis:</span>
                    <span className="text-soft-pistachio flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Terisi
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-soft-pistachio">Perencanaan Finansial:</span>
                    <span className="text-soft-pistachio flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Terisi
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-soft-pistachio">Roadmap Peluncuran:</span>
                    <span className="text-soft-pistachio font-semibold">10 Milestone</span>
                  </div>
                </div>

                <Link
                  href="/canvas"
                  className="w-full py-2.5 px-4 rounded-xl bg-soft-pistachio hover:bg-soft-pistachio text-deep-sage font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-teal-500/15"
                >
                  Buka di My Business Canvas <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-xs text-soft-pistachio mb-3">Belum ada proyek yang dipilih.</p>
                <Link
                  href="/canvas"
                  className="px-4 py-2 rounded-xl bg-soft-pistachio text-deep-sage font-bold text-xs inline-block"
                >
                  Buat Proyek Pertama
                </Link>
              </div>
            )}
          </div>

          {/* Beyond the Wave Highlight Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-navy-900 to-navy-900 border border-indigo-500/30">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-pistachio">
                Beyond the Wave
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-muted-pistachio/20 text-muted-pistachio border border-indigo-500/40">
                PREMIUM
              </span>
            </div>
            <h3 className="font-bold text-white text-base mb-2">
              Peluang Sekunder di Balik Tren Utama
            </h3>
            <p className="text-xs text-deep-sage leading-relaxed mb-4">
              Hindari pasar yang telah jenuh. Temukan bisnis penyedia perlengkapan, bahan baku artisan, atau agensi pendukung di sekeliling tren yang meledak.
            </p>
            {subscription.plan === 'free' ? (
              <button
                onClick={() => triggerUpgradePrompt('Beyond the Wave')}
                className="w-full py-2.5 rounded-xl bg-muted-pistachio/20 hover:bg-muted-pistachio/30 text-muted-pistachio border border-indigo-500/40 font-bold text-xs transition-colors"
              >
                Buka Beyond the Wave dengan Premium
              </button>
            ) : (
              <Link
                href="/beyond-the-wave"
                className="w-full py-2.5 rounded-xl bg-muted-pistachio hover:bg-muted-pistachio text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
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
