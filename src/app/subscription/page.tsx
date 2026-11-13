'use client';

import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useSubscription } from '@/context/SubscriptionContext';
import { useProject } from '@/context/ProjectContext';
import { SubscriptionTier } from '@/types';
import {
  CreditCard,
  Check,
  ShieldCheck,
  Sparkles,
  Zap,
  ArrowRight,
  Info,
} from 'lucide-react';

export default function SubscriptionPage() {
  const { subscription, changeTier, tierConfig } = useSubscription();
  const { projects } = useProject();

  const tiers: SubscriptionTier[] = ['free', 'premium', 'pro'];

  return (
    <AppLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-soft-pistachio/10 text-soft-pistachio text-xs font-semibold uppercase tracking-wider mb-2">
            <CreditCard className="w-3.5 h-3.5" />
            PENGATURAN PAKET & KUOTA
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Langganan & Entitlement WAVE
          </h1>
          <p className="text-soft-pistachio text-xs sm:text-sm mt-1">
            Kelola paket langganan Anda, pantau kuota kueri kecerdasan buatan, dan uji coba fitur lanjutan.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-warm-ivory border border-soft-pistachio text-xs flex items-center gap-3">
          <div>
            <span className="text-[10px] text-soft-pistachio uppercase block">Paket Aktif:</span>
            <span className="font-extrabold text-white text-sm uppercase">{subscription.plan}</span>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-soft-pistachio animate-pulse" />
        </div>
      </div>

      {/* Quota Usage Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="p-5 rounded-2xl bg-warm-ivory border border-soft-pistachio">
          <div className="flex items-center justify-between text-soft-pistachio text-xs mb-2">
            <span>Kuota AI Digunakan</span>
            <Sparkles className="w-4 h-4 text-soft-pistachio" />
          </div>
          <div className="text-3xl font-black text-white">
            {subscription.aiQueriesUsedThisMonth}
            <span className="text-lg text-soft-pistachio font-normal"> / {subscription.aiQueriesLimit}</span>
          </div>
          <div className="w-full bg-soft-pistachio rounded-full h-1.5 mt-3 overflow-hidden">
            <div
              className="bg-soft-pistachio h-1.5 rounded-full"
              style={{
                width: `${Math.min(
                  100,
                  (subscription.aiQueriesUsedThisMonth / subscription.aiQueriesLimit) * 100
                )}%`,
              }}
            />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-warm-ivory border border-soft-pistachio">
          <div className="flex items-center justify-between text-soft-pistachio text-xs mb-2">
            <span>Kapasitas Proyek Canvas</span>
            <Zap className="w-4 h-4 text-muted-pistachio" />
          </div>
          <div className="text-3xl font-black text-white">
            {projects.length}
            <span className="text-lg text-soft-pistachio font-normal"> / {subscription.projectsLimit}</span>
          </div>
          <div className="w-full bg-soft-pistachio rounded-full h-1.5 mt-3 overflow-hidden">
            <div
              className="bg-muted-pistachio h-1.5 rounded-full"
              style={{
                width: `${Math.min(100, (projects.length / subscription.projectsLimit) * 100)}%`,
              }}
            />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-warm-ivory border border-soft-pistachio">
          <div className="flex items-center justify-between text-soft-pistachio text-xs mb-2">
            <span>Status Akun</span>
            <ShieldCheck className="w-4 h-4 text-soft-pistachio" />
          </div>
          <div className="text-xl font-bold text-soft-pistachio mt-1">Aktif & Terproteksi</div>
          <p className="text-[11px] text-soft-pistachio mt-2">
            Data My Business Canvas Anda tidak akan pernah dihapus.
          </p>
        </div>
      </div>

      {/* Subscription Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {tiers.map((tierKey) => {
          const config = tierConfig[tierKey];
          const isCurrent = subscription.plan === tierKey;
          const isPro = tierKey === 'pro';

          return (
            <div
              key={tierKey}
              className={`p-6 rounded-2xl border flex flex-col justify-between transition-all ${
                isCurrent
                  ? 'border-teal-500/80 bg-soft-pistachio/20 ring-1 ring-teal-500/50 shadow-xl shadow-teal-500/10'
                  : isPro
                  ? 'border-indigo-500/50 bg-warm-ivory'
                  : 'border-soft-pistachio bg-warm-ivory'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg text-white">{config.name}</h3>
                  {isCurrent && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-soft-pistachio/20 text-soft-pistachio border border-teal-500/30 uppercase">
                      Aktif
                    </span>
                  )}
                </div>
                <p className="text-xs text-soft-pistachio mb-6">{config.tagline}</p>
                <div className="text-3xl font-black text-white mb-6 pb-6 border-b border-soft-pistachio">
                  {config.priceFormatted}
                </div>

                <ul className="space-y-3 text-xs text-deep-sage mb-8">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-soft-pistachio" />
                    <span>{config.aiQueriesLimit} kueri AI / bulan</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-soft-pistachio" />
                    <span>Hingga {config.projectsLimit} proyek Canvas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-soft-pistachio" />
                    <span>WAVE Radar & Trend Explorer</span>
                  </li>
                  {tierKey !== 'free' && (
                    <>
                      <li className="flex items-center gap-2 text-soft-pistachio font-semibold">
                        <Check className="w-4 h-4 text-soft-pistachio" />
                        <span>Beyond the Wave (Peluang Sekunder)</span>
                      </li>
                      <li className="flex items-center gap-2 text-soft-pistachio font-semibold">
                        <Check className="w-4 h-4 text-soft-pistachio" />
                        <span>WAVE Innovate & Celah Pasar</span>
                      </li>
                    </>
                  )}
                  {isPro && (
                    <>
                      <li className="flex items-center gap-2 text-muted-pistachio font-semibold">
                        <Check className="w-4 h-4 text-muted-pistachio" />
                        <span>WAVE Builder & Finansial COGS/BEP</span>
                      </li>
                      <li className="flex items-center gap-2 text-muted-pistachio font-semibold">
                        <Check className="w-4 h-4 text-muted-pistachio" />
                        <span>Roadmap Peluncuran 12 Tahap</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>

              <button
                onClick={() => changeTier(tierKey)}
                disabled={isCurrent}
                className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all ${
                  isCurrent
                    ? 'bg-soft-pistachio text-soft-pistachio cursor-default'
                    : isPro
                    ? 'bg-gradient-to-r from-indigo-500 to-teal-500 text-white hover:from-indigo-600 hover:to-teal-600 shadow-md shadow-indigo-500/20'
                    : 'bg-soft-pistachio text-deep-sage hover:bg-soft-pistachio'
                }`}
              >
                {isCurrent ? 'Paket Aktif Saat Ini' : `Beralih ke ${config.name}`}
              </button>
            </div>
          );
        })}
      </div>

      {/* Payment Gateway Modular Disclosure */}
      <div className="p-6 rounded-2xl bg-warm-ivory border border-soft-pistachio text-xs text-soft-pistachio space-y-2">
        <div className="flex items-center gap-2 text-deep-sage font-bold text-sm">
          <Info className="w-4 h-4 text-soft-pistachio" />
          <span>Lingkungan Uji Coba & Arsitektur Gateway Pembayaran Modular</span>
        </div>
        <p>
          WAVE saat ini beroperasi dalam lingkungan uji coba langganan terintegrasi (Test Subscription Environment) yang memungkinkan Anda beralih paket secara instan untuk verifikasi fungsionalitas. Modul pembayaran dirancang siap dihubungkan dengan penyedia gateway berlisensi Bank Indonesia (Midtrans / Xendit) melalui webhook backend yang aman.
        </p>
      </div>
    </AppLayout>
  );
}
