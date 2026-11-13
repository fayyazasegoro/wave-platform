'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { INITIAL_TRENDS, LIFECYCLE_BADGES } from '@/data/marketIntelligence';
import { DataLabelBadge } from '@/components/common/DataLabelBadge';
import { useSubscription } from '@/context/SubscriptionContext';
import { useProject } from '@/context/ProjectContext';
import {
  Target,
  Download,
  FolderPlus,
  Sliders,
  CheckCircle2,
  Lock,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

function OpportunityContent() {
  const searchParams = useSearchParams();
  const initialTrendId = searchParams.get('trendId') || INITIAL_TRENDS[0].id;
  const [selectedTrendId, setSelectedTrendId] = useState(initialTrendId);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Configurable weights (default 25%, 20%, 20%, 20%, 15%)
  const [wDemand, setWDemand] = useState(25);
  const [wGrowth, setWGrowth] = useState(20);
  const [wComp, setWComp] = useState(20);
  const [wProfit, setWProfit] = useState(20);
  const [wEntry, setWEntry] = useState(15);

  const { subscription, triggerUpgradePrompt } = useSubscription();
  const { attachTrend } = useProject();

  const isFree = subscription.plan === 'free';
  const trend = INITIAL_TRENDS.find((t) => t.id === selectedTrendId) || INITIAL_TRENDS[0];
  const badge = LIFECYCLE_BADGES[trend.lifecycle];

  // Inverted competition score: lower competition = higher gap score
  const compGapScore = Math.max(10, 100 - trend.competitionScore);

  // Dynamic composite score based on current weights
  const totalWeight = wDemand + wGrowth + wComp + wProfit + wEntry;
  const computedScore = Math.round(
    (trend.demandMomentum * wDemand +
      trend.growthPotential * wGrowth +
      compGapScore * wComp +
      trend.profitabilityPotential * wProfit +
      trend.entryFeasibility * wEntry) /
      totalWeight
  );

  const handleSaveReport = () => {
    attachTrend(trend);
    setToastMessage(`Laporan Peluang "${trend.name}" berhasil dilampirkan ke My Business Canvas!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleExportReport = () => {
    if (isFree) {
      triggerUpgradePrompt('Ekspor Laporan PDF & Riset (Premium & Pro)');
      return;
    }
    window.print();
  };

  return (
    <AppLayout>
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-teal-500 text-navy-950 font-bold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <span>✓ {toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Target className="w-3.5 h-3.5" />
            MODULE 5 • WAVE OPPORTUNITY
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Is This Market Worth Entering?
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Evaluasi daya tarik dan kelayakan pasar berbasis model skoring 5 faktor transparan.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 shrink-0">Pilih Subjek:</span>
          <select
            value={selectedTrendId}
            onChange={(e) => setSelectedTrendId(e.target.value)}
            className="bg-navy-900 border border-slate-700 text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-teal-400 max-w-[280px] truncate"
          >
            {INITIAL_TRENDS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Overview Card with Dynamic Composite Score */}
      <div className="p-6 rounded-2xl bg-navy-900 border border-slate-800 mb-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
              {trend.category}
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge.color}`}>
              {badge.label}
            </span>
            <DataLabelBadge label={trend.dataLabel} />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportReport}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-navy-850 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Ekspor Laporan
            </button>
            <button
              onClick={handleSaveReport}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold text-xs shadow-md shadow-teal-500/15 transition-all"
            >
              <FolderPlus className="w-4 h-4" />
              Simpan ke Canvas
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">{trend.name}</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              {trend.shortDescription}
            </p>

            <div className="p-4 rounded-xl bg-navy-850 border border-slate-800 text-xs text-slate-300">
              <span className="font-bold text-slate-400 uppercase text-[10px] block mb-1">
                Rekomendasi Entry Timing:
              </span>
              <p className="font-semibold text-teal-300 mb-1">{trend.entryRecommendation}</p>
              <p>{trend.recommendationRationale}</p>
            </div>
          </div>

          {/* Big Score Gauge */}
          <div className="p-6 rounded-2xl bg-navy-950 border border-slate-800 text-center flex flex-col items-center justify-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              WAVE Opportunity Score
            </span>
            <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-ocean-400 my-2">
              {computedScore}
              <span className="text-xl text-slate-500 font-normal">/100</span>
            </div>
            <span className="text-xs font-semibold text-emerald-400">
              Tingkat Keyakinan Data: {trend.dataConfidence}%
            </span>
            <p className="text-[10px] text-slate-500 mt-2">
              Berdasarkan bobot komposit 5 parameter analitis
            </p>
          </div>
        </div>
      </div>

      {/* 5-Factor Scoring Model Transparency & Sliders */}
      <div className="p-6 rounded-2xl bg-navy-900 border border-slate-800 mb-8 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-teal-400" />
            <h3 className="text-base font-bold text-white">
              Metodologi & Pengaturan Bobot 5 Faktor
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Total Bobot: <span className="font-bold text-teal-300">{totalWeight}%</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Factor 1: Demand */}
          <div className="p-4 rounded-xl bg-navy-850 border border-slate-800 text-xs">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-white">Demand Momentum</span>
              <span className="font-extrabold text-teal-300">{trend.demandMomentum}/100</span>
            </div>
            <p className="text-[11px] text-slate-400 mb-3">Kecepatan laju pencarian dan atensi publik.</p>
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Bobot:</span>
              <span className="font-bold text-white">{wDemand}%</span>
            </div>
          </div>

          {/* Factor 2: Growth */}
          <div className="p-4 rounded-xl bg-navy-850 border border-slate-800 text-xs">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-white">Growth Potential</span>
              <span className="font-extrabold text-teal-300">{trend.growthPotential}/100</span>
            </div>
            <p className="text-[11px] text-slate-400 mb-3">Potensi ekspansi pasar 6-12 bulan.</p>
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Bobot:</span>
              <span className="font-bold text-white">{wGrowth}%</span>
            </div>
          </div>

          {/* Factor 3: Competition Gap */}
          <div className="p-4 rounded-xl bg-navy-850 border border-slate-800 text-xs">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-white">Competition Gap</span>
              <span className="font-extrabold text-teal-300">{compGapScore}/100</span>
            </div>
            <p className="text-[11px] text-slate-400 mb-3">Ruang bernapas sebelum pasar jenuh.</p>
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Bobot:</span>
              <span className="font-bold text-white">{wComp}%</span>
            </div>
          </div>

          {/* Factor 4: Profitability */}
          <div className="p-4 rounded-xl bg-navy-850 border border-slate-800 text-xs">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-white">Profit Potential</span>
              <span className="font-extrabold text-teal-300">{trend.profitabilityPotential}/100</span>
            </div>
            <p className="text-[11px] text-slate-400 mb-3">Margin kotor bahan baku dan repeat-order.</p>
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Bobot:</span>
              <span className="font-bold text-white">{wProfit}%</span>
            </div>
          </div>

          {/* Factor 5: Entry Feasibility */}
          <div className="p-4 rounded-xl bg-navy-850 border border-slate-800 text-xs">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-white">Entry Feasibility</span>
              <span className="font-extrabold text-teal-300">{trend.entryFeasibility}/100</span>
            </div>
            <p className="text-[11px] text-slate-400 mb-3">Kemudahan pengadaan vendor & perizinan.</p>
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Bobot:</span>
              <span className="font-bold text-white">{wEntry}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Structured 10-Section Opportunity Report View */}
      <div className="p-6 rounded-2xl bg-navy-900 border border-slate-800 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-white">
          Laporan Analisis Kelayakan Komprehensif (10 Bagian)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-navy-850 border border-slate-800">
            <span className="text-[10px] font-bold uppercase text-teal-400 block mb-1">1. Ikhtisar Peluang</span>
            <p className="text-slate-300">{trend.whyThisTrendMatters}</p>
          </div>

          <div className="p-4 rounded-xl bg-navy-850 border border-slate-800">
            <span className="text-[10px] font-bold uppercase text-teal-400 block mb-1">2. Analisis Permintaan</span>
            <p className="text-slate-300">Momentum terukur {trend.demandMomentum}/100 didukung pertumbuhan volume transaksi marketplace.</p>
          </div>

          <div className="p-4 rounded-xl bg-navy-850 border border-slate-800">
            <span className="text-[10px] font-bold uppercase text-teal-400 block mb-1">3. Siklus Hidup Tren</span>
            <p className="text-slate-300">Saat ini berada pada fase <strong>{trend.lifecycle.toUpperCase()}</strong> dengan adopsi urban yang cepat.</p>
          </div>

          <div className="p-4 rounded-xl bg-navy-850 border border-slate-800">
            <span className="text-[10px] font-bold uppercase text-teal-400 block mb-1">4. Analisis Kompetisi</span>
            <p className="text-slate-300">Tingkat persaingan: <strong>{trend.competitionLevel}</strong>. Belum ada pemain lokal dominan di segmen artisan terjangkau.</p>
          </div>

          <div className="p-4 rounded-xl bg-navy-850 border border-slate-800">
            <span className="text-[10px] font-bold uppercase text-teal-400 block mb-1">5. Celah Pasar (Gaps)</span>
            <p className="text-slate-300">Teridentifikasi {trend.marketGaps.length} celah pasar utama siap dieksploitasi sebagai nilai pembeda.</p>
          </div>

          <div className="p-4 rounded-xl bg-navy-850 border border-slate-800">
            <span className="text-[10px] font-bold uppercase text-teal-400 block mb-1">6. Risiko Kritis</span>
            <p className="text-slate-300">{trend.limitations}</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default function OpportunityPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Memuat WAVE Opportunity...</div>}>
      <OpportunityContent />
    </Suspense>
  );
}
