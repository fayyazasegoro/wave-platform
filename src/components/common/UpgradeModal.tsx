'use client';

import React from 'react';
import { useSubscription } from '@/context/SubscriptionContext';
import { Check, Sparkles, X, ShieldCheck } from 'lucide-react';
import { SubscriptionTier } from '@/types';

export function UpgradeModal() {
  const {
    upgradeModalOpen,
    setUpgradeModalOpen,
    upgradeModalFeature,
    subscription,
    changeTier,
    tierConfig,
  } = useSubscription();

  if (!upgradeModalOpen) return null;

  const tiers: SubscriptionTier[] = ['free', 'premium', 'pro'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-warm-ivory/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-warm-ivory border border-soft-pistachio/60 rounded-2xl shadow-2xl p-6 md:p-8 overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={() => setUpgradeModalOpen(false)}
          className="absolute top-5 right-5 p-2 text-soft-pistachio hover:text-white rounded-lg hover:bg-soft-pistachio/60 transition-colors"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-soft-pistachio/10 border border-teal-500/20 text-soft-pistachio text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Buka Potensi Penuh WAVE
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Akses {upgradeModalFeature}
          </h2>
          <p className="text-deep-sage text-sm md:text-base">
            Tingkatkan paket Anda untuk menemukan celah pasar tersembunyi, merancang diferensiasi produk, dan menyusun rencana bisnis yang siap dieksekusi.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tierKey) => {
            const config = tierConfig[tierKey];
            const isCurrent = subscription.plan === tierKey;
            const isPro = tierKey === 'pro';
            const isPremium = tierKey === 'premium';

            return (
              <div
                key={tierKey}
                className={`relative rounded-xl p-5 flex flex-col justify-between border transition-all ${
                  isCurrent
                    ? 'border-teal-500/80 bg-soft-pistachio/20 ring-1 ring-teal-500/50'
                    : isPro
                    ? 'border-indigo-500/60 bg-muted-pistachio/20 hover:border-indigo-400'
                    : 'border-soft-pistachio bg-soft-pistachio/50 hover:border-soft-pistachio'
                }`}
              >
                {isPro && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-gradient-to-r from-indigo-500 to-teal-400 text-white shadow-md">
                    Paling Populer
                  </span>
                )}

                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-white">{config.name}</h3>
                    {isCurrent && (
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-soft-pistachio/20 text-soft-pistachio border border-teal-500/30">
                        Aktif
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-soft-pistachio mb-4">{config.tagline}</p>
                  
                  <div className="mb-5 pb-5 border-b border-soft-pistachio">
                    <span className="text-2xl font-extrabold text-white">
                      {config.priceFormatted}
                    </span>
                    {config.priceMonthly > 0 && (
                      <span className="text-xs text-soft-pistachio block mt-0.5">
                        Dapat dibatalkan kapan saja
                      </span>
                    )}
                  </div>

                  <ul className="space-y-2.5 text-xs text-deep-sage mb-6">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-soft-pistachio shrink-0 mt-0.5" />
                      <span>{config.aiQueriesLimit} kuota kueri AI per bulan</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-soft-pistachio shrink-0 mt-0.5" />
                      <span>Hingga {config.projectsLimit} proyek My Business Canvas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-soft-pistachio shrink-0 mt-0.5" />
                      <span>WAVE Radar & Trend Explorer</span>
                    </li>
                    {isPremium && (
                      <>
                        <li className="flex items-start gap-2 text-soft-pistachio font-medium">
                          <Check className="w-4 h-4 text-soft-pistachio shrink-0 mt-0.5" />
                          <span>Beyond the Wave (Peluang Sekunder)</span>
                        </li>
                        <li className="flex items-start gap-2 text-soft-pistachio font-medium">
                          <Check className="w-4 h-4 text-soft-pistachio shrink-0 mt-0.5" />
                          <span>WAVE Innovate & 7D Inovasi</span>
                        </li>
                        <li className="flex items-start gap-2 text-soft-pistachio font-medium">
                          <Check className="w-4 h-4 text-soft-pistachio shrink-0 mt-0.5" />
                          <span>Intelijen Kompetitor & Market Gap</span>
                        </li>
                      </>
                    )}
                    {isPro && (
                      <>
                        <li className="flex items-start gap-2 text-muted-pistachio font-medium">
                          <Check className="w-4 h-4 text-muted-pistachio shrink-0 mt-0.5" />
                          <span>Semua Fitur Premium</span>
                        </li>
                        <li className="flex items-start gap-2 text-muted-pistachio font-medium">
                          <Check className="w-4 h-4 text-muted-pistachio shrink-0 mt-0.5" />
                          <span>WAVE Builder (Perencana Bisnis Lengkap)</span>
                        </li>
                        <li className="flex items-start gap-2 text-muted-pistachio font-medium">
                          <Check className="w-4 h-4 text-muted-pistachio shrink-0 mt-0.5" />
                          <span>Roadmap Peluncuran 12 Tahap</span>
                        </li>
                        <li className="flex items-start gap-2 text-muted-pistachio font-medium">
                          <Check className="w-4 h-4 text-muted-pistachio shrink-0 mt-0.5" />
                          <span>Kalkulator Finansial COGS & BEP Interaktif</span>
                        </li>
                        <li className="flex items-start gap-2 text-muted-pistachio font-medium">
                          <Check className="w-4 h-4 text-muted-pistachio shrink-0 mt-0.5" />
                          <span>Regulasi Indonesia (BPOM/Halal/PIRT)</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                <button
                  onClick={() => changeTier(tierKey)}
                  disabled={isCurrent}
                  className={`w-full py-2.5 px-4 rounded-xl font-semibold text-xs transition-all ${
                    isCurrent
                      ? 'bg-soft-pistachio text-soft-pistachio cursor-default'
                      : isPro
                      ? 'bg-gradient-to-r from-indigo-500 to-teal-500 text-white hover:from-indigo-600 hover:to-teal-600 shadow-lg shadow-indigo-500/20'
                      : 'bg-soft-pistachio text-deep-sage font-bold hover:bg-soft-pistachio'
                  }`}
                >
                  {isCurrent ? 'Paket Aktif Anda' : `Pilih ${config.name}`}
                </button>
              </div>
            );
          })}
        </div>

        {/* Assurance footer */}
        <div className="mt-8 pt-6 border-t border-soft-pistachio flex flex-wrap items-center justify-between gap-4 text-xs text-soft-pistachio">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-soft-pistachio" />
            <span>Data My Business Canvas Anda tidak akan pernah dihapus jika langganan berakhir.</span>
          </div>
          <span className="text-soft-pistachio">
            Lingkungan Uji Coba Langganan WAVE (Instant Upgrade Mode)
          </span>
        </div>
      </div>
    </div>
  );
}
