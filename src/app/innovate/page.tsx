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
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-soft-pistachio text-deep-sage font-bold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <span>✓ {toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-muted-pistachio/10 text-muted-pistachio text-xs font-semibold uppercase tracking-wider mb-2">
            <Lightbulb className="w-3.5 h-3.5" />
            MODULE 4 • WAVE INNOVATE
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Don't Just Follow. Reinvent.
          </h1>
          <p className="text-soft-pistachio text-xs sm:text-sm mt-1">
            Temukan celah pasar (market gaps), bedah kelemahan kompetitor, dan rumuskan inovasi 7 dimensi dengan USP berdaya tahan tinggi.
          </p>
        </div>

        {/* Trend Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-soft-pistachio shrink-0">Konteks Tren:</span>
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

      {/* Free Tier Upgrade Banner */}
      {isFree && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-navy-900 to-teal-950/40 border border-indigo-500/30 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-muted-pistachio/10 text-muted-pistachio shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm mb-0.5">
                WAVE Innovate & USP Generator Eksklusif untuk Premium & Pro
              </h3>
              <p className="text-xs text-deep-sage max-w-xl">
                Nikmati fitur Market Gap Finder, Intelijen Kompetitor, dan Generator Inovasi 7 Dimensi untuk menciptakan pembeda yang tidak mudah ditiru.
              </p>
            </div>
          </div>
          <button
            onClick={() => triggerUpgradePrompt('WAVE Innovate')}
            className="px-5 py-2.5 rounded-xl bg-muted-pistachio hover:bg-muted-pistachio text-white font-bold text-xs shrink-0 shadow-lg shadow-indigo-500/20"
          >
            Buka WAVE Innovate
          </button>
        </div>
      )}

      {/* Module Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-soft-pistachio pb-3 mb-6 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('innovations')}
          className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all ${
            activeTab === 'innovations'
              ? 'bg-muted-pistachio text-white shadow-md shadow-indigo-600/20'
              : 'bg-warm-ivory text-soft-pistachio hover:text-white border border-soft-pistachio'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Inovasi 7 Dimensi & USP ({trend.innovations.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('gaps')}
          className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all ${
            activeTab === 'gaps'
              ? 'bg-muted-pistachio text-white shadow-md shadow-indigo-600/20'
              : 'bg-warm-ivory text-soft-pistachio hover:text-white border border-soft-pistachio'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>Market Gap Finder ({trend.marketGaps.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('competitors')}
          className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all ${
            activeTab === 'competitors'
              ? 'bg-muted-pistachio text-white shadow-md shadow-indigo-600/20'
              : 'bg-warm-ivory text-soft-pistachio hover:text-white border border-soft-pistachio'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Intelijen Kompetitor ({trend.competitors.length})</span>
        </button>

        <div className="ml-auto">
          <button
            onClick={handleRunAiInnovation}
            disabled={isGeneratingAi}
            className="px-3.5 py-1.5 rounded-xl bg-soft-pistachio hover:bg-soft-pistachio text-deep-sage font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-teal-500/15"
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
              className="p-6 rounded-2xl bg-warm-ivory border border-soft-pistachio shadow-md space-y-6"
            >
              {/* Innovation Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-soft-pistachio">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold text-muted-pistachio uppercase tracking-wider">
                      {inno.dimension}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-soft-pistachio/10 text-soft-pistachio border border-teal-500/20">
                      {inno.classification}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white">{inno.title}</h3>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-[10px] uppercase text-soft-pistachio font-bold">Skor Kelayakan</div>
                    <div className="text-base font-extrabold text-soft-pistachio">{inno.feasibilityScore}/100</div>
                  </div>
                  <button
                    onClick={() => handleSaveInnovation(inno)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-soft-pistachio hover:bg-soft-pistachio text-deep-sage font-bold text-xs shadow-md shadow-teal-500/15 transition-all"
                  >
                    <FolderPlus className="w-4 h-4" />
                    Simpan Inovasi ke Canvas
                  </button>
                </div>
              </div>

              {/* Description & How It Works */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-soft-pistachio border border-soft-pistachio">
                  <div className="font-bold text-deep-sage uppercase text-[10px] mb-1">Deskripsi & Urgensi</div>
                  <p className="text-deep-sage mb-2 leading-relaxed">{inno.description}</p>
                  <p className="text-soft-pistachio font-medium">Mengapa penting: {inno.whyItMatters}</p>
                </div>
                <div className="p-4 rounded-xl bg-soft-pistachio border border-soft-pistachio">
                  <div className="font-bold text-deep-sage uppercase text-[10px] mb-1">Cara Kerja Teknis</div>
                  <p className="text-deep-sage leading-relaxed mb-2">{inno.howItWorks}</p>
                  <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-soft-pistachio text-deep-sage border border-soft-pistachio">
                    Estimasi Modal: {inno.costCategory}
                  </span>
                </div>
              </div>

              {/* USP Generator Breakdown Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-navy-950 to-navy-900 border border-indigo-500/30">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-muted-pistachio" />
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                    Struktur Unique Selling Proposition (USP)
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-soft-pistachio block text-[10px] uppercase font-bold">Value Proposition</span>
                    <p className="font-semibold text-white mt-0.5">{inno.usp.valueProposition}</p>
                  </div>
                  <div>
                    <span className="text-soft-pistachio block text-[10px] uppercase font-bold">Unique Selling Point (USP)</span>
                    <p className="font-semibold text-soft-pistachio mt-0.5">{inno.usp.uniqueSellingPoint}</p>
                  </div>
                  <div>
                    <span className="text-soft-pistachio block text-[10px] uppercase font-bold">Diferensiasi Utama</span>
                    <p className="text-deep-sage mt-0.5">{inno.usp.mainDifferentiator}</p>
                  </div>
                  <div>
                    <span className="text-soft-pistachio block text-[10px] uppercase font-bold">Masalah yang Diselesaikan</span>
                    <p className="text-deep-sage mt-0.5">{inno.usp.problemSolved}</p>
                  </div>
                  <div>
                    <span className="text-soft-pistachio block text-[10px] uppercase font-bold">Keunggulan Bersaing</span>
                    <p className="text-deep-sage mt-0.5">{inno.usp.competitiveAdvantage}</p>
                  </div>
                  <div>
                    <span className="text-soft-pistachio block text-[10px] uppercase font-bold">Defensibility (Daya Tahan Pembeda)</span>
                    <p className="text-deep-sage mt-0.5">{inno.usp.defensibility}</p>
                  </div>
                </div>
              </div>

              {/* Validation Steps */}
              <div className="p-4 rounded-xl bg-soft-pistachio/70 border border-soft-pistachio text-xs">
                <span className="font-bold text-deep-sage uppercase text-[10px] block mb-2">
                  Langkah Validasi Riil Sebelum Produksi Massal:
                </span>
                <ul className="list-disc list-inside space-y-1 text-deep-sage">
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
          <div className="p-4 rounded-xl bg-warm-ivory border border-soft-pistachio text-xs text-deep-sage">
            Celah pasar (market gaps) membedakan kebutuhan riil yang belum terlayani dari sekadar asumsi umum. Setiap celah di bawah telah diverifikasi dengan sinyal ulasan pembeli dan transaksi.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trend.marketGaps.map((gap) => (
              <div key={gap.id} className="p-5 rounded-2xl bg-warm-ivory border border-soft-pistachio shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase text-soft-apricot px-2 py-0.5 rounded bg-soft-apricot/10 border border-amber-500/20">
                    Tipe: {gap.type.replace('_', ' ')}
                  </span>
                  <DataLabelBadge label={gap.evidenceLabel} />
                </div>
                <h4 className="text-base font-bold text-white mb-2">{gap.title}</h4>
                <p className="text-xs text-deep-sage leading-relaxed mb-4">{gap.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-soft-pistachio text-xs">
                  <span className="text-soft-pistachio">Dampak Potensi Pasar:</span>
                  <span className="font-bold text-soft-pistachio">{gap.impactScore}/100</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Competitor Intelligence */}
      {activeTab === 'competitors' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-warm-ivory border border-soft-pistachio text-xs text-deep-sage">
            Intelijen kompetitor menyajikan data riil tanpa fabrikasi statistik penjualan atau ulasan palsu.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trend.competitors.map((comp, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-warm-ivory border border-soft-pistachio shadow-sm space-y-4 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-soft-pistachio">
                  <div>
                    <h4 className="font-bold text-white text-base">{comp.brandName}</h4>
                    <span className="text-[11px] text-soft-pistachio">{comp.category}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-soft-pistachio text-deep-sage border border-soft-pistachio">
                    {comp.priceRange}
                  </span>
                </div>

                <div>
                  <span className="text-soft-pistachio block text-[10px] uppercase font-bold">Positioning Pasar</span>
                  <p className="text-deep-sage mt-0.5">{comp.positioning}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-soft-pistachio border border-soft-pistachio">
                    <span className="text-soft-pistachio font-bold block mb-1">Kekuatan:</span>
                    <ul className="list-disc list-inside space-y-1 text-deep-sage text-[11px]">
                      {comp.strengths.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-3 rounded-xl bg-soft-pistachio border border-soft-pistachio">
                    <span className="text-soft-apricot font-bold block mb-1">Kelemahan:</span>
                    <ul className="list-disc list-inside space-y-1 text-deep-sage text-[11px]">
                      {comp.weaknesses.map((w, i) => (
                        <li key={i}>{w}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-muted-pistachio/20 border border-indigo-500/30">
                  <span className="text-muted-pistachio font-bold block mb-1">Peluang Diferensiasi Terbuka:</span>
                  <ul className="list-disc list-inside space-y-1 text-deep-sage text-[11px]">
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
    <Suspense fallback={<div className="p-8 text-center text-xs text-soft-pistachio">Memuat WAVE Innovate...</div>}>
      <InnovateContent />
    </Suspense>
  );
}
