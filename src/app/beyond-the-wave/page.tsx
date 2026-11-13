'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { INITIAL_TRENDS, LIFECYCLE_BADGES } from '@/data/marketIntelligence';
import { SecondaryOpportunity } from '@/types';
import { DataLabelBadge } from '@/components/common/DataLabelBadge';
import { useSubscription } from '@/context/SubscriptionContext';
import { useProject } from '@/context/ProjectContext';
import {
  Network,
  Sparkles,
  FolderPlus,
  ArrowRight,
  ShieldAlert,
  Lock,
  Layers,
  ChevronRight,
} from 'lucide-react';

function BeyondTheWaveContent() {
  const searchParams = useSearchParams();
  const initialTrendId = searchParams.get('trendId') || INITIAL_TRENDS[0].id;
  const [selectedTrendId, setSelectedTrendId] = useState(initialTrendId);
  const [selectedOpp, setSelectedOpp] = useState<SecondaryOpportunity | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { subscription, triggerUpgradePrompt } = useSubscription();
  const { attachOpportunity } = useProject();

  const isFree = subscription.plan === 'free';
  const trend = INITIAL_TRENDS.find((t) => t.id === selectedTrendId) || INITIAL_TRENDS[0];
  const opportunities = trend.secondaryOpportunities;

  const handleSaveOpp = (opp: SecondaryOpportunity) => {
    attachOpportunity(opp);
    setToastMessage(`Peluang "${opp.productIdea}" berhasil disimpan ke My Business Canvas!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

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
            <Network className="w-3.5 h-3.5" />
            MODULE 3 • BEYOND THE WAVE
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Discover Opportunities Behind the Trends
          </h1>
          <p className="text-soft-pistachio text-xs sm:text-sm mt-1">
            Ekosistem peluang sekunder. Jangan hanya bertarung di tren utama yang padat modal; temukan produk & jasa pendukung dengan margin tinggi.
          </p>
        </div>

        {/* Trend Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-soft-pistachio shrink-0">Tren Induk:</span>
          <select
            value={selectedTrendId}
            onChange={(e) => {
              setSelectedTrendId(e.target.value);
              setSelectedOpp(null);
            }}
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

      {/* Free Tier Contextual Upgrade Banner */}
      {isFree && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-950/40 via-navy-900 to-indigo-950/40 border border-teal-500/30 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-soft-pistachio/10 text-soft-pistachio shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm mb-0.5">
                Beyond the Wave adalah Fitur Premium
              </h3>
              <p className="text-xs text-deep-sage max-w-xl">
                Anda sedang melihat preview interaktif. Buka akses penuh untuk menyimpan seluruh peluang sekunder, melihat peta relasi interaktif, dan memasukkannya ke My Business Canvas.
              </p>
            </div>
          </div>
          <button
            onClick={() => triggerUpgradePrompt('Beyond the Wave (Premium & Pro)')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-soft-pistachio to-soft-apricot hover:from-teal-400 hover:to-ocean-400 text-deep-sage font-bold text-xs shrink-0 shadow-lg shadow-teal-500/20"
          >
            Buka Beyond the Wave dengan Premium
          </button>
        </div>
      )}

      {/* Interactive Opportunity Relationship Map */}
      <div className="p-6 rounded-2xl bg-warm-ivory border border-soft-pistachio mb-8 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-soft-pistachio" />
            <h3 className="text-base font-bold text-white">
              Peta Relasi Peluang (Opportunity Relationship Map)
            </h3>
          </div>
          <span className="text-xs text-soft-pistachio font-mono">
            {opportunities.length} Cabang Sekunder Terhubung
          </span>
        </div>

        {/* Visual flow chart */}
        <div className="p-4 rounded-xl bg-warm-ivory border border-soft-pistachio/80 overflow-x-auto">
          <div className="min-w-[680px] flex items-center justify-between gap-3 text-xs">
            {/* Level 1: Main Trend */}
            <div className="p-3 rounded-xl bg-warm-ivory border border-teal-500/50 text-center w-52 shrink-0">
              <span className="text-[10px] font-bold uppercase text-soft-pistachio block mb-1">Tren Induk</span>
              <div className="font-bold text-white text-xs truncate" title={trend.name}>{trend.name}</div>
              <span className="text-[10px] text-soft-pistachio block mt-1">Lifecycle: {trend.lifecycle}</span>
            </div>

            <ChevronRight className="w-5 h-5 text-teal-500/60 shrink-0" />

            {/* Level 2: Secondary Markets */}
            <div className="space-y-2 shrink-0 w-56">
              {opportunities.map((opp) => (
                <div
                  key={opp.id}
                  onClick={() => setSelectedOpp(opp)}
                  className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                    selectedOpp?.id === opp.id
                      ? 'border-teal-400 bg-soft-pistachio/40 text-soft-pistachio'
                      : 'border-soft-pistachio bg-warm-ivory text-deep-sage hover:border-soft-pistachio'
                  }`}
                >
                  <div className="text-[10px] text-soft-pistachio font-bold uppercase">{opp.category}</div>
                  <div className="font-semibold text-xs truncate">{opp.businessConcept}</div>
                </div>
              ))}
            </div>

            <ChevronRight className="w-5 h-5 text-teal-500/60 shrink-0" />

            {/* Level 3: Product Opportunity & Canvas Action */}
            <div className="p-3 rounded-xl bg-warm-ivory border border-indigo-500/40 text-center w-56 shrink-0">
              <span className="text-[10px] font-bold uppercase text-muted-pistachio block mb-1">Peluang Produk & Jasa</span>
              <div className="font-bold text-white text-xs mb-2">
                {selectedOpp ? selectedOpp.productIdea : 'Klik peluang di samping untuk melihat rincian'}
              </div>
              {selectedOpp && (
                <button
                  onClick={() => handleSaveOpp(selectedOpp)}
                  className="px-3 py-1 rounded-lg bg-soft-pistachio text-deep-sage font-bold text-[11px] hover:bg-soft-pistachio transition-colors"
                >
                  Simpan ke Canvas
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Secondary Opportunity Cards */}
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-soft-pistachio" />
          Rincian Peluang Sekunder Mandiri
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {opportunities.map((opp) => {
            const badge = LIFECYCLE_BADGES[opp.lifecycleStage];
            return (
              <div
                key={opp.id}
                className="p-6 rounded-2xl bg-warm-ivory border border-soft-pistachio hover:border-soft-pistachio transition-all flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold text-soft-pistachio uppercase tracking-wider">
                      {opp.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge.color}`}>
                        {badge.label}
                      </span>
                      <DataLabelBadge label={opp.dataLabel} />
                    </div>
                  </div>

                  <h4 className="text-base font-bold text-white mb-1">
                    {opp.businessConcept}
                  </h4>
                  <p className="text-xs font-semibold text-deep-sage mb-4">
                    Produk: {opp.productIdea}
                  </p>

                  {/* Why it exists */}
                  <div className="p-3.5 rounded-xl bg-soft-pistachio border border-soft-pistachio text-xs mb-4">
                    <span className="text-[10px] font-bold uppercase text-soft-pistachio block mb-1">
                      Mengapa Peluang Ini Muncul:
                    </span>
                    <p className="text-deep-sage leading-relaxed">
                      {opp.whyItExists}
                    </p>
                  </div>

                  {/* Target Audience & Needs */}
                  <div className="space-y-2 text-xs mb-4">
                    <div>
                      <span className="text-soft-pistachio font-medium">Target Pelanggan:</span>{' '}
                      <span className="text-deep-sage">{opp.targetCustomer}</span>
                    </div>
                    <div>
                      <span className="text-soft-pistachio font-medium">Kebutuhan Utama:</span>
                      <ul className="list-disc list-inside text-deep-sage mt-1 space-y-0.5">
                        {opp.customerNeeds.map((need, i) => (
                          <li key={i}>{need}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Metrics Table */}
                  <div className="grid grid-cols-4 gap-2 p-3 rounded-xl bg-warm-ivory border border-soft-pistachio/80 mb-4 text-center text-xs">
                    <div>
                      <div className="text-[9px] uppercase text-soft-pistachio font-bold">Modal</div>
                      <div className="font-bold text-soft-pistachio text-[11px] truncate">{opp.capitalScale}</div>
                    </div>
                    <div>
                      <div className="text-[9px] uppercase text-soft-pistachio font-bold">Barrier</div>
                      <div className="font-bold text-deep-sage">{opp.entryBarriers}</div>
                    </div>
                    <div>
                      <div className="text-[9px] uppercase text-soft-pistachio font-bold">Kompetisi</div>
                      <div className="font-bold text-soft-apricot">{opp.competitionLevel}</div>
                    </div>
                    <div>
                      <div className="text-[9px] uppercase text-soft-pistachio font-bold">Skor Peluang</div>
                      <div className="font-extrabold text-white">{opp.opportunityScore}/100</div>
                    </div>
                  </div>

                  {/* Risks */}
                  <div className="text-xs text-soft-apricot/80 bg-soft-apricot/20 p-2.5 rounded-lg border border-rose-900/40 mb-4 flex items-start gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-soft-apricot shrink-0 mt-0.5" />
                    <span>Risiko: {opp.risks.join('; ')}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-soft-pistachio flex items-center justify-between">
                  <button
                    onClick={() => handleSaveOpp(opp)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-soft-pistachio hover:bg-soft-pistachio text-deep-sage font-bold text-xs transition-colors shadow-sm"
                  >
                    <FolderPlus className="w-4 h-4" />
                    Simpan ke My Business Canvas
                  </button>

                  <button
                    onClick={() => setSelectedOpp(opp)}
                    className="text-xs text-soft-pistachio hover:text-soft-pistachio font-semibold"
                  >
                    Fokus di Peta Relasi →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}

export default function BeyondTheWavePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-soft-pistachio">Memuat Beyond the Wave...</div>}>
      <BeyondTheWaveContent />
    </Suspense>
  );
}
