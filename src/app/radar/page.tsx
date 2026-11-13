'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { INITIAL_TRENDS, TREND_CATEGORIES, LIFECYCLE_BADGES } from '@/data/marketIntelligence';
import { Trend, TrendCategory, TrendLifecycle } from '@/types';
import { DataLabelBadge } from '@/components/common/DataLabelBadge';
import { useProject } from '@/context/ProjectContext';
import { Storage } from '@/lib/storage';
import {
  Compass,
  Filter,
  Search,
  Bookmark,
  BookmarkCheck,
  FolderPlus,
  ArrowRight,
  TrendingUp,
  X,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';

export default function RadarPage() {
  const { attachTrend } = useProject();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedLifecycle, setSelectedLifecycle] = useState<string>('ALL');
  const [minOpportunityScore, setMinOpportunityScore] = useState<number>(0);
  const [selectedTrendModal, setSelectedTrendModal] = useState<Trend | null>(null);
  const [watchlist, setWatchlist] = useState<string[]>(Storage.getWatchlist());
  const [notification, setNotification] = useState<string | null>(null);

  const toggleWatch = (id: string) => {
    const updated = Storage.toggleWatchlist(id);
    setWatchlist(updated);
  };

  const handleAttachTrend = (trend: Trend) => {
    attachTrend(trend);
    setNotification(`Tren "${trend.name}" berhasil dihubungkan ke My Business Canvas!`);
    setTimeout(() => setNotification(null), 4000);
  };

  const filteredTrends = INITIAL_TRENDS.filter((trend) => {
    if (selectedCategory !== 'ALL' && trend.category !== selectedCategory) return false;
    if (selectedLifecycle !== 'ALL' && trend.lifecycle !== selectedLifecycle) return false;
    if (trend.opportunityScore < minOpportunityScore) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = trend.name.toLowerCase().includes(q);
      const matchDesc = trend.shortDescription.toLowerCase().includes(q);
      const matchCat = trend.category.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchCat) return false;
    }
    return true;
  });

  return (
    <AppLayout>
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-soft-pistachio text-deep-sage font-bold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <span>✓ {notification}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-soft-pistachio/10 text-soft-pistachio text-xs font-semibold uppercase tracking-wider mb-2">
            <Compass className="w-3.5 h-3.5" />
            MODULE 1 • WAVE RADAR
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Discover What's Rising
          </h1>
          <p className="text-soft-pistachio text-xs sm:text-sm mt-1">
            Identifikasi pergerakan tren pasar di 12 kategori industri sebelum momentum mencapai puncaknya.
          </p>
        </div>

        <div className="text-xs text-soft-pistachio bg-warm-ivory border border-soft-pistachio px-3 py-2 rounded-xl">
          Menampilkan <span className="font-bold text-soft-pistachio">{filteredTrends.length}</span> dari {INITIAL_TRENDS.length} tren aktif
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="p-4 rounded-2xl bg-warm-ivory border border-soft-pistachio mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-soft-pistachio absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari tren, kata kunci produk, atau kategori..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-soft-pistachio border border-soft-pistachio/80 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 transition-colors"
            />
          </div>

          {/* Lifecycle Filter */}
          <select
            value={selectedLifecycle}
            onChange={(e) => setSelectedLifecycle(e.target.value)}
            className="bg-soft-pistachio border border-soft-pistachio/80 rounded-xl px-3 py-2 text-xs text-deep-sage focus:outline-none focus:border-teal-400"
          >
            <option value="ALL">Semua Fase Siklus Hidup</option>
            <option value="emerging">Emerging (Muncul)</option>
            <option value="rising">Rising (Sedang Naik Cepat)</option>
            <option value="peak">Peak (Mendekati Puncak)</option>
            <option value="saturated">Saturated (Pasar Jenuh)</option>
            <option value="declining">Declining (Menurun)</option>
            <option value="evergreen">Evergreen (Stabil Abadi)</option>
          </select>

          {/* Min Opportunity Score Slider */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-soft-pistachio border border-soft-pistachio/80 text-xs">
            <span className="text-soft-pistachio text-[11px] shrink-0">Min Skor:</span>
            <input
              type="range"
              min="0"
              max="95"
              step="5"
              value={minOpportunityScore}
              onChange={(e) => setMinOpportunityScore(Number(e.target.value))}
              className="w-20 accent-teal-400"
            />
            <span className="font-bold text-soft-pistachio w-6 text-right">{minOpportunityScore}</span>
          </div>
        </div>

        {/* Category Pills Slider */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
              selectedCategory === 'ALL'
                ? 'bg-soft-pistachio text-deep-sage font-bold'
                : 'bg-soft-pistachio text-soft-pistachio hover:text-white border border-soft-pistachio'
            }`}
          >
            Semua Industri ({INITIAL_TRENDS.length})
          </button>
          {TREND_CATEGORIES.map((cat) => {
            const count = INITIAL_TRENDS.filter((t) => t.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-soft-pistachio text-deep-sage font-bold'
                    : 'bg-soft-pistachio text-soft-pistachio hover:text-white border border-soft-pistachio'
                }`}
              >
                {cat} {count > 0 && `(${count})`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Trends Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTrends.map((trend) => {
          const badge = LIFECYCLE_BADGES[trend.lifecycle];
          const isWatched = watchlist.includes(trend.id);

          return (
            <div
              key={trend.id}
              className="p-6 rounded-2xl bg-warm-ivory border border-soft-pistachio hover:border-soft-pistachio transition-all flex flex-col justify-between shadow-sm group"
            >
              <div>
                {/* Card Top: Category, Lifecycle & Watchlist */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-bold text-soft-pistachio uppercase tracking-wider">
                      {trend.category}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge.color}`}>
                      {badge.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <DataLabelBadge label={trend.dataLabel} />
                    <button
                      onClick={() => toggleWatch(trend.id)}
                      className="p-1.5 rounded-lg text-soft-pistachio hover:text-soft-pistachio hover:bg-soft-pistachio transition-colors"
                      title={isWatched ? 'Hapus dari Watchlist' : 'Tambah ke Watchlist'}
                    >
                      {isWatched ? (
                        <BookmarkCheck className="w-4 h-4 text-soft-pistachio" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Trend Title & Description */}
                <h3
                  onClick={() => setSelectedTrendModal(trend)}
                  className="text-lg font-bold text-white mb-2 group-hover:text-soft-pistachio cursor-pointer transition-colors"
                >
                  {trend.name}
                </h3>
                <p className="text-xs text-deep-sage leading-relaxed mb-4 line-clamp-3">
                  {trend.shortDescription}
                </p>

                {/* Why this trend matters */}
                <div className="p-3 rounded-xl bg-soft-pistachio/80 border border-soft-pistachio/80 text-xs mb-4">
                  <span className="font-bold text-soft-pistachio block text-[10px] uppercase mb-1">
                    Mengapa Tren Ini Berarti:
                  </span>
                  <p className="text-deep-sage text-[11px] leading-relaxed">
                    {trend.whyThisTrendMatters}
                  </p>
                </div>

                {/* Metrics 4-Box */}
                <div className="grid grid-cols-4 gap-2 p-3 rounded-xl bg-warm-ivory/60 border border-soft-pistachio mb-4 text-center">
                  <div>
                    <div className="text-[9px] uppercase text-soft-pistachio font-bold">Momentum</div>
                    <div className="text-sm font-extrabold text-soft-pistachio">{trend.demandMomentum}/100</div>
                  </div>
                  <div>
                    <div className="text-[9px] uppercase text-soft-pistachio font-bold">Kompetisi</div>
                    <div className="text-sm font-bold text-soft-apricot">{trend.competitionLevel}</div>
                  </div>
                  <div>
                    <div className="text-[9px] uppercase text-soft-pistachio font-bold">Peluang</div>
                    <div className="text-sm font-black text-white">{trend.opportunityScore}</div>
                  </div>
                  <div>
                    <div className="text-[9px] uppercase text-soft-pistachio font-bold">Keyakinan</div>
                    <div className="text-sm font-bold text-deep-sage">{trend.dataConfidence}%</div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-soft-pistachio flex flex-wrap items-center justify-between gap-2">
                <button
                  onClick={() => handleAttachTrend(trend)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-soft-pistachio hover:bg-soft-pistachio text-deep-sage text-xs font-semibold transition-colors"
                  title="Lampirkan tren ini ke proyek My Business Canvas aktif Anda"
                >
                  <FolderPlus className="w-3.5 h-3.5 text-soft-pistachio" />
                  Simpan ke Canvas
                </button>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/forecast?trendId=${trend.id}`}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-soft-pistachio hover:text-white transition-colors"
                  >
                    Forecast
                  </Link>
                  <button
                    onClick={() => setSelectedTrendModal(trend)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-soft-pistachio/15 hover:bg-soft-pistachio/25 border border-teal-500/30 text-soft-pistachio text-xs font-bold transition-all"
                  >
                    Detail Analisis <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comprehensive Trend Detail Modal */}
      {selectedTrendModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-warm-ivory/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-warm-ivory border border-soft-pistachio/80 rounded-2xl shadow-2xl p-6 md:p-8 overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedTrendModal(null)}
              className="absolute top-5 right-5 text-soft-pistachio hover:text-white p-2 rounded-lg hover:bg-soft-pistachio"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-bold text-soft-pistachio uppercase tracking-wider">
                {selectedTrendModal.category}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${LIFECYCLE_BADGES[selectedTrendModal.lifecycle].color}`}>
                {LIFECYCLE_BADGES[selectedTrendModal.lifecycle].label}
              </span>
              <DataLabelBadge label={selectedTrendModal.dataLabel} />
            </div>

            <h2 className="text-2xl font-bold text-white mb-3">
              {selectedTrendModal.name}
            </h2>

            <div className="p-4 rounded-xl bg-soft-pistachio border border-soft-pistachio mb-6 text-xs text-deep-sage leading-relaxed">
              <h4 className="text-[11px] font-bold uppercase text-soft-pistachio mb-2">Analisis Mendalam Pasar</h4>
              <p>{selectedTrendModal.fullAnalysis}</p>
            </div>

            {/* Entry Recommendation Callout */}
            <div className="p-4 rounded-xl bg-soft-pistachio/30 border border-teal-500/40 mb-6">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-soft-pistachio uppercase">
                  Rekomendasi Waktu Masuk Pasar
                </span>
                <span className="font-extrabold text-sm text-soft-pistachio bg-soft-pistachio/10 px-2.5 py-0.5 rounded-full border border-teal-500/20">
                  {selectedTrendModal.entryRecommendation}
                </span>
              </div>
              <p className="text-xs text-deep-sage">
                {selectedTrendModal.recommendationRationale}
              </p>
            </div>

            {/* Regulatory Guidance if present */}
            {selectedTrendModal.regulatoryConsiderations && (
              <div className="p-4 rounded-xl bg-soft-apricot/20 border border-amber-500/30 mb-6">
                <div className="flex items-center gap-2 text-soft-apricot font-bold text-xs mb-2">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Pertimbangan Regulasi Indonesia ({selectedTrendModal.regulatoryConsiderations.agency})</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-xs text-deep-sage mb-2">
                  {selectedTrendModal.regulatoryConsiderations.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
                <p className="text-[11px] text-soft-apricot/80 italic">
                  * {selectedTrendModal.regulatoryConsiderations.advisoryNotice}
                </p>
              </div>
            )}

            {/* Data Sources & Limitations */}
            <div className="p-4 rounded-xl bg-warm-ivory border border-soft-pistachio mb-6 text-xs">
              <div className="text-[10px] font-bold uppercase text-soft-pistachio mb-2">Sumber Data & Batasan</div>
              <ul className="list-disc list-inside text-deep-sage space-y-1 mb-2">
                {selectedTrendModal.dataSources.map((ds, idx) => (
                  <li key={idx}>{ds}</li>
                ))}
              </ul>
              <p className="text-[11px] text-soft-pistachio italic">
                Batasan: {selectedTrendModal.limitations}
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-soft-pistachio">
              <button
                onClick={() => {
                  handleAttachTrend(selectedTrendModal);
                  setSelectedTrendModal(null);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-soft-pistachio hover:bg-soft-pistachio text-deep-sage font-bold text-xs shadow-md shadow-teal-500/15"
              >
                <FolderPlus className="w-4 h-4" />
                Simpan ke My Business Canvas
              </button>

              <div className="flex items-center gap-2">
                <Link
                  href={`/beyond-the-wave?trendId=${selectedTrendModal.id}`}
                  className="px-4 py-2.5 rounded-xl bg-soft-pistachio hover:bg-soft-pistachio text-deep-sage text-xs font-semibold"
                >
                  Lihat Peluang Sekunder
                </Link>
                <Link
                  href={`/forecast?trendId=${selectedTrendModal.id}`}
                  className="px-4 py-2.5 rounded-xl bg-muted-pistachio hover:bg-muted-pistachio text-white text-xs font-semibold"
                >
                  Buka WAVE Forecast
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
