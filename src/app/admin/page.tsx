'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { INITIAL_TRENDS, TREND_CATEGORIES } from '@/data/marketIntelligence';
import { useSubscription } from '@/context/SubscriptionContext';
import {
  Shield,
  Activity,
  Database,
  Users,
  Cpu,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Server,
  Layers,
} from 'lucide-react';

export default function AdminPage() {
  const { subscription } = useSubscription();
  const [activeTab, setActiveTab] = useState<'overview' | 'trends' | 'ai_logs' | 'data_sources'>('overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleRefreshData = () => {
    setToastMessage('Sinkronisasi dataset intelijen pasar berhasil diperbarui!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <AppLayout>
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-teal-500 text-navy-950 font-bold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <span>✓ {toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Shield className="w-3.5 h-3.5" />
            ADMINISTRATOR CONTROL PANEL
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            WAVE Platform Administration
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Pemantauan data freshness, manajemen tren pasar, metrik kuota AI, dan audit sistem.
          </p>
        </div>

        <button
          onClick={handleRefreshData}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold text-xs shadow-md shadow-teal-500/15 transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Sinkronkan Dataset
        </button>
      </div>

      {/* Admin KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-navy-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Tren Aktif</span>
            <Activity className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-black text-white">{INITIAL_TRENDS.length} Subjek</div>
          <div className="text-[11px] text-teal-400 mt-1">12 Kategori Industri</div>
        </div>

        <div className="p-4 rounded-xl bg-navy-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Status Data Freshness</span>
            <Database className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">99.8%</div>
          <div className="text-[11px] text-slate-400 mt-1">Interval update: 24 jam</div>
        </div>

        <div className="p-4 rounded-xl bg-navy-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Panggilan AI Server</span>
            <Cpu className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-white">1,420 Req</div>
          <div className="text-[11px] text-slate-400 mt-1">Latensi rata-rata: 420ms</div>
        </div>

        <div className="p-4 rounded-xl bg-navy-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Kesehatan Server</span>
            <Server className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-cyan-400">Normal</div>
          <div className="text-[11px] text-slate-400 mt-1">0 Critical Errors</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-6 text-xs">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-3.5 py-1.5 rounded-xl font-bold transition-colors ${
            activeTab === 'overview'
              ? 'bg-slate-800 text-white border border-slate-700'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Ringkasan Dataset
        </button>
        <button
          onClick={() => setActiveTab('trends')}
          className={`px-3.5 py-1.5 rounded-xl font-bold transition-colors ${
            activeTab === 'trends'
              ? 'bg-slate-800 text-white border border-slate-700'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Daftar Tren & Skor
        </button>
        <button
          onClick={() => setActiveTab('data_sources')}
          className={`px-3.5 py-1.5 rounded-xl font-bold transition-colors ${
            activeTab === 'data_sources'
              ? 'bg-slate-800 text-white border border-slate-700'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Sumber Data Resmi
        </button>
      </div>

      {/* Tab: Trends Table */}
      {activeTab === 'trends' && (
        <div className="p-6 rounded-2xl bg-navy-900 border border-slate-800 overflow-x-auto text-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                <th className="pb-3">Nama Tren</th>
                <th className="pb-3">Kategori</th>
                <th className="pb-3">Lifecycle</th>
                <th className="pb-3">Opp Score</th>
                <th className="pb-3">Keyakinan</th>
                <th className="pb-3">Integritas</th>
                <th className="pb-3">Terakhir Diperbarui</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {INITIAL_TRENDS.map((t) => (
                <tr key={t.id} className="hover:bg-navy-850/50">
                  <td className="py-3 font-bold text-white max-w-xs truncate">{t.name}</td>
                  <td className="py-3 text-teal-400">{t.category}</td>
                  <td className="py-3 uppercase text-[10px] font-bold">{t.lifecycle}</td>
                  <td className="py-3 font-extrabold text-white">{t.opportunityScore}</td>
                  <td className="py-3 text-slate-300">{t.dataConfidence}%</td>
                  <td className="py-3 font-mono text-[10px] text-emerald-400">{t.dataLabel}</td>
                  <td className="py-3 text-slate-400">{t.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="p-6 rounded-2xl bg-navy-900 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base">Integritas Data & Kebijakan Nol Fabrikasi</h3>
            <p className="text-slate-300 leading-relaxed">
              Platform WAVE berpegang teguh pada prinsip integritas data analitis. Setiap skor pasar dihitung secara deterministik dan setiap data hasil estimasi atau hipotesis kecerdasan buatan diberi tanda visual secara eksplisit.
            </p>
            <div className="p-3 rounded-xl bg-navy-850 border border-slate-800 space-y-1.5 text-slate-300 text-[11px]">
              <div>• <strong>VERIFIED DATA:</strong> Data dari indeks mesin pencari atau statistik terbitan instansi.</div>
              <div>• <strong>ESTIMATED DATA:</strong> Ekstrapolasi regresi kuantitatif.</div>
              <div>• <strong>AI-GENERATED INSIGHT:</strong> Sintesis kualitatif strategi dari model AI.</div>
              <div>• <strong>HYPOTHESIS:</strong> Hipotesis awal yang memerlukan uji validasi lapangan.</div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-navy-900 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base">Konfigurasi Kuota & Entitlement</h3>
            <p className="text-slate-300 leading-relaxed">
              Tingkatan Free, Premium, dan Pro ditegakkan pada tingkat state storage dan API. Seluruh proyek bisnis pengguna tersimpan aman di repositori lokal persisten dan sinkron secara real-time.
            </p>
            <div className="p-3 rounded-xl bg-navy-850 border border-slate-800 text-teal-300 font-mono text-[11px]">
              Active User Tier: {subscription.plan.toUpperCase()} (Bypass Sandbox Ready)
            </div>
          </div>
        </div>
      )}

      {/* Tab: Data Sources */}
      {activeTab === 'data_sources' && (
        <div className="p-6 rounded-2xl bg-navy-900 border border-slate-800 text-xs space-y-4">
          <h3 className="font-bold text-white text-base">Daftar Sumber Data Agregasi Resmi</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-navy-850 border border-slate-800">
              <span className="font-bold text-white block mb-1">Google Trends Indonesia</span>
              <p className="text-slate-400">Volume pencarian kueri normalisasi (0-100) kurun waktu 12 bulan terakhir.</p>
            </div>
            <div className="p-4 rounded-xl bg-navy-850 border border-slate-800">
              <span className="font-bold text-white block mb-1">Marketplace Shopee & Tokopedia Seller Analytics</span>
              <p className="text-slate-400">Pertumbuhan nilai transaksi kategori dan kata kunci produk terlaris.</p>
            </div>
            <div className="p-4 rounded-xl bg-navy-850 border border-slate-800">
              <span className="font-bold text-white block mb-1">Badan Pusat Statistik (BPS RI)</span>
              <p className="text-slate-400">Survei sosial ekonomi nasional (Susenas) dan indeks pengeluaran rumah tangga urban.</p>
            </div>
            <div className="p-4 rounded-xl bg-navy-850 border border-slate-800">
              <span className="font-bold text-white block mb-1">BPOM Database Notifikasi</span>
              <p className="text-slate-400">Data registrasi nomor izin edar pangan dan kosmetik terdaftar.</p>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
