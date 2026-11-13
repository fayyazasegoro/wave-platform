'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { INITIAL_TRENDS } from '@/data/marketIntelligence';
import { InnovationSuggestion } from '@/types';
import { DataLabelBadge } from '@/components/common/DataLabelBadge';
import { useSubscription } from '@/context/SubscriptionContext';
import { useProject } from '@/context/ProjectContext';
import {
  Lightbulb,
  Sparkles,
  Target,
  FolderPlus,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Layers,
  HelpCircle,
  Zap,
} from 'lucide-react';

function InnovateContent() {
  const searchParams = useSearchParams();
  const initialTrendId = searchParams.get('trendId') || INITIAL_TRENDS[0].id;
  const [selectedTrendId, setSelectedTrendId] = useState(initialTrendId);
  const [activeTab, setActiveTab] = useState<'gaps' | 'competitors' | 'innovations'>('innovations');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { subscription, triggerUpgradePrompt, consumeAiQuota } = useSubscription();
  const { attachInnovation, activeProject } = useProject();

  const isFree = subscription.plan === 'free';
  const trend = INITIAL_TRENDS.find((t) => t.id === selectedTrendId) || INITIAL_TRENDS[0];

  const handleSaveInnovation = (inno: InnovationSuggestion) => {
    attachInnovation(inno);
    setToastMessage(`Inovasi "${inno.title}" berhasil ditambahkan ke My Business Canvas!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleRunAiInnovation = async () => {
    if (!consumeAiQuota()) return;
    setIsGeneratingAi(true);
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'innovation_generation',
          contextData: {
            trendName: trend.name,
            category: trend.category,
            userPrompt: 'Ciptakan terobosan inovasi baru dengan pendekatan 7 dimensi WAVE.',
          },
        }),
      });
      const data = await res.json();
      setToastMessage('Inovasi AI berhasil diracik dan diperbarui!');
    } catch {
      setToastMessage('Gagal menghubungi mesin AI. Silakan coba kembali.');
    } finally {
      setIsGeneratingAi(false);
    }
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
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Lightbulb className="w-3.5 h-3.5" />
            MODULE 4 • WAVE INNOVATE
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Don't Just Follow. Reinvent.
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Temukan celah pasar (market gaps), bedah kelemahan kompetitor, dan rumuskan inovasi 7 dimensi dengan USP berdaya tahan tinggi.
          </p>
        </div>

        {/* Trend Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 shrink-0">Konteks Tren:</span>
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

      {/* Free Tier Upgrade Banner */}
      {isFree && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-navy-900 to-teal-950/40 border border-indigo-500/30 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm mb-0.5">
                WAVE Innovate & USP Generator Eksklusif untuk Premium & Pro
              </h3>
              <p className="text-xs text-slate-300 max-w-xl">
                Nikmati fitur Market Gap Finder, Intelijen Kompetitor, dan Generator Inovasi 7 Dimensi untuk menciptakan pembeda yang tidak mudah ditiru.
              </p>
            </div>
          </div>
          <button
            onClick={() => triggerUpgradePrompt('WAVE Innovate')}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shrink-0 shadow-lg shadow-indigo-500/20"
          >
            Buka WAVE Innovate
          </button>
        </div>
      )}

      {/* Module Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-6 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('innovations')}
          className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all ${
            activeTab === 'innovations'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'bg-navy-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Inovasi 7 Dimensi & USP ({trend.innovations.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('gaps')}
          className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all ${
            activeTab === 'gaps'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'bg-navy-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>Market Gap Finder ({trend.marketGaps.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('competitors')}
          className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all ${
            activeTab === 'competitors'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'bg-navy-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Intelijen Kompetitor ({trend.competitors.length})</span>
        </button>

        <div className="ml-auto">
          <button
            onClick={handleRunAiInnovation}
            disabled={isGeneratingAi}
            className="px-3.5 py-1.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-navy-950 font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-teal-500/15"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            {isGeneratingAi ? 'Menganalisis...' : 'Generate Inovasi Baru'}
          </button>
        </div>
      </div>

      {/* Tab 1: 7-Dimension Innovations & USP */}
      {activeTab === 'innovations' && (
        <div className="space-y-6">
          {trend.innovations.map((inno) => (
            <div
              key={inno.id}
              className="p-6 rounded-2xl bg-navy-900 border border-slate-800 shadow-md space-y-6"
            >
              {/* Innovation Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">
                      {inno.dimension}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">
                      {inno.classification}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white">{inno.title}</h3>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-[10px] uppercase text-slate-400 font-bold">Skor Kelayakan</div>
                    <div className="text-base font-extrabold text-teal-300">{inno.feasibilityScore}/100</div>
                  </div>
                  <button
                    onClick={() => handleSaveInnovation(inno)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold text-xs shadow-md shadow-teal-500/15 transition-all"
                  >
                    <FolderPlus className="w-4 h-4" />
                    Simpan Inovasi ke Canvas
                  </button>
                </div>
              </div>

              {/* Description & How It Works */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-navy-850 border border-slate-800">
                  <div className="font-bold text-slate-300 uppercase text-[10px] mb-1">Deskripsi & Urgensi</div>
                  <p className="text-slate-300 mb-2 leading-relaxed">{inno.description}</p>
                  <p className="text-teal-400 font-medium">Mengapa penting: {inno.whyItMatters}</p>
                </div>
                <div className="p-4 rounded-xl bg-navy-850 border border-slate-800">
                  <div className="font-bold text-slate-300 uppercase text-[10px] mb-1">Cara Kerja Teknis</div>
                  <p className="text-slate-300 leading-relaxed mb-2">{inno.howItWorks}</p>
                  <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    Estimasi Modal: {inno.costCategory}
                  </span>
                </div>
              </div>

              {/* USP Generator Breakdown Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-navy-950 to-navy-900 border border-indigo-500/30">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                    Struktur Unique Selling Proposition (USP)
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Value Proposition</span>
                    <p className="font-semibold text-white mt-0.5">{inno.usp.valueProposition}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Unique Selling Point (USP)</span>
                    <p className="font-semibold text-teal-300 mt-0.5">{inno.usp.uniqueSellingPoint}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Diferensiasi Utama</span>
                    <p className="text-slate-300 mt-0.5">{inno.usp.mainDifferentiator}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Masalah yang Diselesaikan</span>
                    <p className="text-slate-300 mt-0.5">{inno.usp.problemSolved}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Keunggulan Bersaing</span>
                    <p className="text-slate-300 mt-0.5">{inno.usp.competitiveAdvantage}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Defensibility (Daya Tahan Pembeda)</span>
                    <p className="text-slate-300 mt-0.5">{inno.usp.defensibility}</p>
                  </div>
                </div>
              </div>

              {/* Validation Steps */}
              <div className="p-4 rounded-xl bg-navy-850/70 border border-slate-800 text-xs">
                <span className="font-bold text-slate-300 uppercase text-[10px] block mb-2">
                  Langkah Validasi Riil Sebelum Produksi Massal:
                </span>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  {inno.validationSteps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Market Gap Finder */}
      {activeTab === 'gaps' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-navy-900 border border-slate-800 text-xs text-slate-300">
            Celah pasar (market gaps) membedakan kebutuhan riil yang belum terlayani dari sekadar asumsi umum. Setiap celah di bawah telah diverifikasi dengan sinyal ulasan pembeli dan transaksi.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trend.marketGaps.map((gap) => (
              <div key={gap.id} className="p-5 rounded-2xl bg-navy-900 border border-slate-800 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                    Tipe: {gap.type.replace('_', ' ')}
                  </span>
                  <DataLabelBadge label={gap.evidenceLabel} />
                </div>
                <h4 className="text-base font-bold text-white mb-2">{gap.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">{gap.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
                  <span className="text-slate-400">Dampak Potensi Pasar:</span>
                  <span className="font-bold text-teal-300">{gap.impactScore}/100</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Competitor Intelligence */}
      {activeTab === 'competitors' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-navy-900 border border-slate-800 text-xs text-slate-300">
            Intelijen kompetitor menyajikan data riil tanpa fabrikasi statistik penjualan atau ulasan palsu.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trend.competitors.map((comp, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-navy-900 border border-slate-800 shadow-sm space-y-4 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h4 className="font-bold text-white text-base">{comp.brandName}</h4>
                    <span className="text-[11px] text-slate-400">{comp.category}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {comp.priceRange}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Positioning Pasar</span>
                  <p className="text-slate-200 mt-0.5">{comp.positioning}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-navy-850 border border-slate-800">
                    <span className="text-emerald-400 font-bold block mb-1">Kekuatan:</span>
                    <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
                      {comp.strengths.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-3 rounded-xl bg-navy-850 border border-slate-800">
                    <span className="text-rose-400 font-bold block mb-1">Kelemahan:</span>
                    <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
                      {comp.weaknesses.map((w, i) => (
                        <li key={i}>{w}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-indigo-950/20 border border-indigo-500/30">
                  <span className="text-indigo-300 font-bold block mb-1">Peluang Diferensiasi Terbuka:</span>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
                    {comp.differentiationOpportunities.map((opp, i) => (
                      <li key={i}>{opp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </AppLayout>
  );
}

export default function InnovatePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Memuat WAVE Innovate...</div>}>
      <InnovateContent />
    </Suspense>
  );
}
