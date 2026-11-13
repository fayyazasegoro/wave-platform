'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { INITIAL_TRENDS, LIFECYCLE_BADGES } from '@/data/marketIntelligence';
import { DataLabelBadge } from '@/components/common/DataLabelBadge';
import { useProject } from '@/context/ProjectContext';
import { useSubscription } from '@/context/SubscriptionContext';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  ComposedChart,
} from 'recharts';
import {
  LineChart as LineChartIcon,
  Calendar,
  AlertCircle,
  FolderPlus,
  CheckCircle2,
  Lock,
} from 'lucide-react';

function ForecastContent() {
  const searchParams = useSearchParams();
  const initialTrendId = searchParams.get('trendId') || INITIAL_TRENDS[0].id;
  const [selectedTrendId, setSelectedTrendId] = useState(initialTrendId);
  const [horizon, setHorizon] = useState<'1_3_months' | '3_6_months' | '6_12_months'>('3_6_months');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { attachTrend } = useProject();
  const { subscription, triggerUpgradePrompt } = useSubscription();

  const trend = INITIAL_TRENDS.find((t) => t.id === selectedTrendId) || INITIAL_TRENDS[0];
  const badge = LIFECYCLE_BADGES[trend.lifecycle];

  // Prepare combined time-series data for chart
  const historical = trend.historicalData.map((d) => ({
    name: d.month,
    interest: d.interest,
    competition: d.competition,
    base: null,
    optimistic: null,
    pessimistic: null,
  }));

  const forecast = trend.forecastScenarios[horizon].map((f) => ({
    name: f.month,
    interest: null,
    competition: null,
    base: f.base,
    optimistic: f.optimistic,
    pessimistic: f.pessimistic,
  }));

  // Bridge the last historical point with forecast
  const lastHist = trend.historicalData[trend.historicalData.length - 1];
  const chartData = [
    ...historical.slice(0, -1),
    {
      name: lastHist.month,
      interest: lastHist.interest,
      competition: lastHist.competition,
      base: lastHist.interest,
      optimistic: lastHist.interest,
      pessimistic: lastHist.interest,
    },
    ...forecast,
  ];

  const handleSaveForecast = () => {
    attachTrend(trend);
    setToastMessage(`Forecast "${trend.name}" berhasil dilampirkan ke My Business Canvas!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const isPro = subscription.plan === 'pro';
  const isPremium = subscription.plan === 'premium' || isPro;

  return (
    <AppLayout>
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-soft-pistachio text-deep-sage font-bold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <span>✓ {toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-soft-pistachio/10 text-soft-pistachio text-xs font-semibold uppercase tracking-wider mb-2">
            <LineChartIcon className="w-3.5 h-3.5" />
            MODULE 2 • WAVE FORECAST
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Predict What's Next
          </h1>
          <p className="text-soft-pistachio text-xs sm:text-sm mt-1">
            Proyeksi momentum permintaan vs. kepadatan kompetisi berbasis model statistik dan skenario masa depan.
          </p>
        </div>

        {/* Trend Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-soft-pistachio shrink-0">Pilih Tren:</span>
          <select
            value={selectedTrendId}
            onChange={(e) => setSelectedTrendId(e.target.value)}
            className="bg-warm-ivory border border-soft-pistachio text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-teal-400 max-w-[280px] truncate"
          >
            {INITIAL_TRENDS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Overview Card */}
      <div className="p-6 rounded-2xl bg-warm-ivory border border-soft-pistachio mb-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-soft-pistachio uppercase tracking-wider">
              {trend.category}
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge.color}`}>
              {badge.label}
            </span>
            <DataLabelBadge label={trend.dataLabel} />
          </div>

          <button
            onClick={handleSaveForecast}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-soft-pistachio hover:bg-soft-pistachio text-deep-sage text-xs font-semibold transition-colors"
          >
            <FolderPlus className="w-4 h-4 text-soft-pistachio" />
            Lampirkan ke Canvas
          </button>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
          {trend.name}
        </h2>
        <p className="text-xs sm:text-sm text-deep-sage leading-relaxed mb-6">
          {trend.shortDescription}
        </p>

        {/* Entry Recommendation Banner */}
        <div className="p-4 rounded-xl bg-soft-pistachio border border-soft-pistachio/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-bold text-soft-pistachio uppercase mb-1">
              Rekomendasi Waktu Masuk Pasar
            </div>
            <p className="text-xs text-deep-sage max-w-2xl">
              {trend.recommendationRationale}
            </p>
          </div>

          <div className="shrink-0">
            <span className="inline-block px-4 py-2 rounded-xl bg-soft-pistachio/20 text-soft-pistachio border border-teal-500/40 text-xs sm:text-sm font-extrabold tracking-wide">
              {trend.entryRecommendation}
            </span>
          </div>
        </div>
      </div>

      {/* Forecast Chart Card */}
      <div className="p-6 rounded-2xl bg-warm-ivory border border-soft-pistachio mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-soft-pistachio" />
              Simulasi Proyeksi Permintaan & Kepadatan Kompetisi
            </h3>
            <p className="text-xs text-soft-pistachio mt-0.5">
              Data historis 7 bulan terakhir dilanjutkan simulasi skenario (Dasar, Optimis, Pesimis).
            </p>
          </div>

          {/* Horizon Controls */}
          <div className="flex items-center gap-1 bg-warm-ivory p-1 rounded-xl border border-soft-pistachio text-xs">
            <button
              onClick={() => setHorizon('1_3_months')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                horizon === '1_3_months'
                  ? 'bg-soft-pistachio text-deep-sage font-bold'
                  : 'text-soft-pistachio hover:text-white'
              }`}
            >
              1–3 Bulan
            </button>
            <button
              onClick={() => setHorizon('3_6_months')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                horizon === '3_6_months'
                  ? 'bg-soft-pistachio text-deep-sage font-bold'
                  : 'text-soft-pistachio hover:text-white'
              }`}
            >
              3–6 Bulan
            </button>
            <button
              onClick={() => {
                if (!isPremium) {
                  triggerUpgradePrompt('Horizon Proyeksi 6-12 Bulan (Premium/Pro)');
                  return;
                }
                setHorizon('6_12_months');
              }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1 ${
                horizon === '6_12_months'
                  ? 'bg-soft-pistachio text-deep-sage font-bold'
                  : 'text-soft-pistachio hover:text-white'
              }`}
            >
              <span>6–12 Bulan</span>
              {!isPremium && <Lock className="w-3 h-3 text-soft-pistachio" />}
            </button>
          </div>
        </div>

        {/* Recharts Container */}
        <div className="h-[360px] w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 10, right: 20, bottom: 20, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} domain={[0, 140]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0B132B',
                  borderColor: '#334155',
                  borderRadius: '12px',
                  fontSize: '12px',
                  color: '#F8FAFC',
                }}
              />
              <Legend wrapperStyle={{ paddingTop: '16px', fontSize: '11px' }} />

              {/* Historical interest */}
              <Line
                type="monotone"
                dataKey="interest"
                name="Permintaan Historis (0-100)"
                stroke="#14B8A6"
                strokeWidth={3}
                dot={{ r: 4, fill: '#14B8A6' }}
              />

              {/* Historical competition */}
              <Line
                type="monotone"
                dataKey="competition"
                name="Kepadatan Kompetitor"
                stroke="#F59E0B"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={{ r: 3, fill: '#F59E0B' }}
              />

              {/* Forecast scenarios */}
              <Line
                type="monotone"
                dataKey="base"
                name="Proyeksi Dasar (Base Case)"
                stroke="#38BDF8"
                strokeWidth={2.5}
                dot={{ r: 3, fill: '#38BDF8' }}
              />

              <Line
                type="monotone"
                dataKey="optimistic"
                name="Skenario Optimis"
                stroke="#10B981"
                strokeWidth={1.5}
                strokeDasharray="3 3"
                dot={false}
              />

              <Line
                type="monotone"
                dataKey="pessimistic"
                name="Skenario Pesimis"
                stroke="#F43F5E"
                strokeWidth={1.5}
                strokeDasharray="3 3"
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Explanatory notes */}
        <div className="mt-6 pt-4 border-t border-soft-pistachio flex flex-wrap items-center justify-between gap-4 text-xs text-soft-pistachio">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-soft-pistachio" />
            <span>
              Penting: Pasar <strong>Jenuh (Saturated)</strong> berbeda dengan <strong>Menurun (Declining)</strong>. Pasar jenuh tetap memiliki volume permintaan tinggi namun menuntut diferensiasi tajam.
            </span>
          </div>
          <span className="text-[11px] text-soft-pistachio">
            Data Sumber: {trend.dataSources.join(', ')}
          </span>
        </div>
      </div>
    </AppLayout>
  );
}

export default function ForecastPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-soft-pistachio">Memuat WAVE Forecast...</div>}>
      <ForecastContent />
    </Suspense>
  );
}
