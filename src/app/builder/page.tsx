'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { useSubscription } from '@/context/SubscriptionContext';
import { useProject } from '@/context/ProjectContext';
import { INITIAL_TRENDS } from '@/data/marketIntelligence';
import {
  Hammer,
  Sparkles,
  Calculator,
  ShieldCheck,
  FolderPlus,
  ArrowRight,
  Lock,
  Layers,
  Coins,
  FileText,
  Rocket,
  CheckCircle2,
} from 'lucide-react';

export default function BuilderPage() {
  const { subscription, triggerUpgradePrompt, consumeAiQuota } = useSubscription();
  const { activeProject, updateActiveProject } = useProject();

  const isPro = subscription.plan === 'pro';

  // Financial Planner interactive states
  const [sellingPrice, setSellingPrice] = useState<number>(
    activeProject?.sections.financialPlanning.data?.sellingPrice || 45000
  );
  const [cogs, setCogs] = useState<number>(
    activeProject?.sections.financialPlanning.data?.cogs || 16000
  );
  const [targetUnits, setTargetUnits] = useState<number>(
    activeProject?.sections.financialPlanning.data?.monthlyTargetUnits || 2500
  );
  const [fixedCosts, setFixedCosts] = useState<number>(
    activeProject?.sections.financialPlanning.data?.fixedMonthlyCosts || 15000000
  );
  const [marketingBudget, setMarketingBudget] = useState<number>(
    activeProject?.sections.financialPlanning.data?.marketingBudget || 8000000
  );
  const [initialInvestment, setInitialInvestment] = useState<number>(
    activeProject?.sections.financialPlanning.data?.initialInvestment || 50000000
  );

  const [activeTab, setActiveTab] = useState<'financials' | 'concept' | 'regulatory' | 'marketing'>('financials');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Financial calculations
  const unitProfit = Math.max(0, sellingPrice - cogs);
  const grossMarginPercent = sellingPrice > 0 ? Math.round((unitProfit / sellingPrice) * 100) : 0;
  const monthlyRevenue = sellingPrice * targetUnits;
  const monthlyGrossProfit = unitProfit * targetUnits;
  const totalMonthlyExpenses = fixedCosts + marketingBudget;
  const netMonthlyProfit = monthlyGrossProfit - totalMonthlyExpenses;
  const breakEvenUnits = unitProfit > 0 ? Math.ceil(totalMonthlyExpenses / unitProfit) : 0;
  const breakEvenMonths = netMonthlyProfit > 0 ? Number((initialInvestment / netMonthlyProfit).toFixed(1)) : 99;

  const handleSaveFinancialsToCanvas = () => {
    if (!activeProject) return;
    const updated = { ...activeProject };
    updated.sections.financialPlanning.data = {
      sellingPrice,
      cogs,
      grossMarginPercent,
      monthlyTargetUnits: targetUnits,
      fixedMonthlyCosts: fixedCosts,
      marketingBudget,
      initialInvestment,
      workingCapital: fixedCosts * 2,
      breakEvenUnits,
      breakEvenMonths,
      projectedMonthlyRevenue: monthlyRevenue,
      projectedMonthlyProfit: netMonthlyProfit,
      assumptions: [
        `HET Rp ${sellingPrice.toLocaleString('id-ID')} dengan HPP/COGS Rp ${cogs.toLocaleString('id-ID')}`,
        `Target volume ${targetUnits.toLocaleString('id-ID')} unit/bulan`,
        `Biaya tetap operasional Rp ${fixedCosts.toLocaleString('id-ID')} & pemasaran Rp ${marketingBudget.toLocaleString('id-ID')}`,
      ],
    };
    updated.sections.financialPlanning.content = `Simulasi Finansial Terverifikasi: Gross Margin ${grossMarginPercent}%, BEP tercapai pada ${breakEvenUnits} unit/bulan (${breakEvenMonths} bulan balik modal).`;
    updated.sections.financialPlanning.status = 'completed';
    updateActiveProject(updated);

    setToastMessage('Rencana finansial berhasil disimpan ke My Business Canvas!');
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleGenerateAiModel = async () => {
    if (!consumeAiQuota()) return;
    setIsGeneratingAi(true);
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'business_model_generation',
          contextData: {
            trendName: activeProject?.name || 'Inovasi Produk Baru',
            category: activeProject?.category || 'Food & Beverages',
          },
        }),
      });
      const data = await res.json();
      setToastMessage('Model bisnis berhasil dibuat oleh WAVE AI!');
    } catch {
      setToastMessage('Gagal menghubungi mesin AI.');
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
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-indigo-500/10 to-teal-500/10 text-muted-pistachio text-xs font-semibold uppercase tracking-wider mb-2">
            <Hammer className="w-3.5 h-3.5" />
            MODULE 6 • WAVE BUILDER (PRO)
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Turn Ideas Into Structured Businesses
          </h1>
          <p className="text-soft-pistachio text-xs sm:text-sm mt-1">
            Transformasi ide menjadi bisnis yang siap dieksekusi: perencanaan finansial COGS & BEP, konsep produk, persona, hingga kepatuhan regulasi BPOM & Halal.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/launch"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-teal-500 hover:from-indigo-500 hover:to-teal-400 text-white font-bold text-xs shadow-md shadow-indigo-500/20"
          >
            <Rocket className="w-4 h-4" />
            Lanjut ke Business Launch
          </Link>
        </div>
      </div>

      {/* Non-Pro Upgrade Banner */}
      {!isPro && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/50 via-navy-900 to-teal-950/50 border border-indigo-500/40 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-muted-pistachio/20 text-muted-pistachio shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm mb-0.5">
                WAVE Builder adalah Modul Eksklusif Paket PRO
              </h3>
              <p className="text-xs text-deep-sage max-w-xl">
                Buka akses kalkulator finansial interaktif, generator persona pelanggan, perencanaan rantai pasok, dan modul kepatuhan regulasi Indonesia dengan beralih ke WAVE Pro.
              </p>
            </div>
          </div>
          <button
            onClick={() => triggerUpgradePrompt('WAVE Builder (Paket Pro)')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-teal-400 text-white font-bold text-xs shrink-0 shadow-lg shadow-indigo-500/25"
          >
            Aktifkan WAVE Pro
          </button>
        </div>
      )}

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-soft-pistachio pb-3 mb-6 text-xs overflow-x-auto">
        <button
          onClick={() => setActiveTab('financials')}
          className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all ${
            activeTab === 'financials'
              ? 'bg-gradient-to-r from-indigo-600 to-teal-600 text-white'
              : 'bg-warm-ivory text-soft-pistachio hover:text-white border border-soft-pistachio'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>Kalkulator Finansial, COGS & BEP</span>
        </button>

        <button
          onClick={() => setActiveTab('concept')}
          className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all ${
            activeTab === 'concept'
              ? 'bg-gradient-to-r from-indigo-600 to-teal-600 text-white'
              : 'bg-warm-ivory text-soft-pistachio hover:text-white border border-soft-pistachio'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Konsep Produk & Target Persona</span>
        </button>

        <button
          onClick={() => setActiveTab('regulatory')}
          className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all ${
            activeTab === 'regulatory'
              ? 'bg-gradient-to-r from-indigo-600 to-teal-600 text-white'
              : 'bg-warm-ivory text-soft-pistachio hover:text-white border border-soft-pistachio'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Panduan Regulasi Indonesia (BPOM & Halal)</span>
        </button>
      </div>

      {/* Tab 1: Financial & Pricing Planner */}
      {activeTab === 'financials' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Cols: Editable Sliders and Assumptions */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-warm-ivory border border-soft-pistachio space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <Coins className="w-4 h-4 text-soft-pistachio" />
                  Asumsi Finansial & Parameter Unit Economics
                </h3>
                <span className="text-xs text-soft-pistachio">Interaktif & Live Re-calculation</span>
              </div>

              {/* Sliders Grid */}
              <div className="space-y-5 text-xs">
                {/* Selling Price */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-deep-sage font-semibold">Harga Jual Konsumen (HET):</span>
                    <span className="font-bold text-soft-pistachio text-sm">
                      Rp {sellingPrice.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="500000"
                    step="5000"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(Number(e.target.value))}
                    className="w-full accent-teal-400"
                  />
                </div>

                {/* COGS */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-deep-sage font-semibold">Harga Pokok Produksi (COGS / HPP):</span>
                    <span className="font-bold text-soft-apricot text-sm">
                      Rp {cogs.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2000"
                    max="250000"
                    step="1000"
                    value={cogs}
                    onChange={(e) => setCogs(Number(e.target.value))}
                    className="w-full accent-amber-400"
                  />
                  <span className="text-[10px] text-soft-pistachio mt-0.5 block">
                    Mencakup bahan baku, botol/kemasan, dan upah maklon per unit.
                  </span>
                </div>

                {/* Target Volume */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-deep-sage font-semibold">Target Penjualan Bulanan:</span>
                    <span className="font-bold text-white text-sm">
                      {targetUnits.toLocaleString('id-ID')} Unit
                    </span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="20000"
                    step="100"
                    value={targetUnits}
                    onChange={(e) => setTargetUnits(Number(e.target.value))}
                    className="w-full accent-indigo-400"
                  />
                </div>

                {/* Fixed Costs */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-deep-sage font-semibold">Biaya Operasional Tetap (Sewa & Gaji):</span>
                    <span className="font-bold text-white text-sm">
                      Rp {fixedCosts.toLocaleString('id-ID')} / bln
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2000000"
                    max="100000000"
                    step="1000000"
                    value={fixedCosts}
                    onChange={(e) => setFixedCosts(Number(e.target.value))}
                    className="w-full accent-slate-400"
                  />
                </div>

                {/* Marketing Budget */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-deep-sage font-semibold">Anggaran Pemasaran & Ads:</span>
                    <span className="font-bold text-white text-sm">
                      Rp {marketingBudget.toLocaleString('id-ID')} / bln
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1000000"
                    max="50000000"
                    step="1000000"
                    value={marketingBudget}
                    onChange={(e) => setMarketingBudget(Number(e.target.value))}
                    className="w-full accent-slate-400"
                  />
                </div>

                {/* Initial Capital */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-deep-sage font-semibold">Estimasi Modal Awal (Startup Capital):</span>
                    <span className="font-bold text-white text-sm">
                      Rp {initialInvestment.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5000000"
                    max="200000000"
                    step="5000000"
                    value={initialInvestment}
                    onChange={(e) => setInitialInvestment(Number(e.target.value))}
                    className="w-full accent-slate-400"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-soft-pistachio flex justify-end">
                <button
                  onClick={handleSaveFinancialsToCanvas}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-soft-pistachio hover:bg-soft-pistachio text-deep-sage font-bold text-xs shadow-md shadow-teal-500/15"
                >
                  <FolderPlus className="w-4 h-4" />
                  Simpan Simulasi Finansial ke Canvas
                </button>
              </div>
            </div>

            {/* Right Column: Financial Outputs Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-navy-900 to-navy-850 border border-teal-500/40 shadow-xl space-y-6">
              <h3 className="font-bold text-white text-base">Hasil Kalkulasi Unit Economics</h3>

              <div className="space-y-4 text-xs">
                {/* Gross Margin */}
                <div className="p-3.5 rounded-xl bg-warm-ivory border border-soft-pistachio">
                  <div className="text-soft-pistachio text-[10px] uppercase font-bold">Gross Profit Margin</div>
                  <div className="text-2xl font-black text-soft-pistachio mt-1">
                    {grossMarginPercent}%
                  </div>
                  <span className="text-[11px] text-soft-pistachio">
                    Laba kotor Rp {unitProfit.toLocaleString('id-ID')} per unit terjual
                  </span>
                </div>

                {/* Break-even point */}
                <div className="p-3.5 rounded-xl bg-warm-ivory border border-soft-pistachio">
                  <div className="text-soft-pistachio text-[10px] uppercase font-bold">Titik Impas (BEP Bulanan)</div>
                  <div className="text-2xl font-black text-soft-apricot mt-1">
                    {breakEvenUnits.toLocaleString('id-ID')} Unit
                  </div>
                  <span className="text-[11px] text-soft-pistachio">
                    Target omzet BEP: Rp {(breakEvenUnits * sellingPrice).toLocaleString('id-ID')}
                  </span>
                </div>

                {/* Net monthly profit */}
                <div className="p-3.5 rounded-xl bg-warm-ivory border border-soft-pistachio">
                  <div className="text-soft-pistachio text-[10px] uppercase font-bold">Proyeksi Laba Bersih Operasional</div>
                  <div className={`text-2xl font-black mt-1 ${netMonthlyProfit >= 0 ? 'text-soft-pistachio' : 'text-soft-apricot'}`}>
                    Rp {netMonthlyProfit.toLocaleString('id-ID')}
                  </div>
                  <span className="text-[11px] text-soft-pistachio">
                    Dari proyeksi omzet Rp {monthlyRevenue.toLocaleString('id-ID')}
                  </span>
                </div>

                {/* Payback period */}
                <div className="p-3.5 rounded-xl bg-warm-ivory border border-soft-pistachio">
                  <div className="text-soft-pistachio text-[10px] uppercase font-bold">Estimasi Balik Modal (Payback)</div>
                  <div className="text-2xl font-black text-muted-pistachio mt-1">
                    {netMonthlyProfit > 0 ? `${breakEvenMonths} Bulan` : 'Tidak tercapai (Rugi)'}
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-soft-pistachio/60 border border-soft-pistachio text-[10px] text-soft-pistachio leading-snug">
                * Catatan: Proyeksi ini merupakan estimasi rasional dan belum memperhitungkan retur barang, diskon promosi marketplace, atau pajak PPh final UMKM 0,5%.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Concept & Persona */}
      {activeTab === 'concept' && (
        <div className="p-6 rounded-2xl bg-warm-ivory border border-soft-pistachio space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base">Konsep Produk & Persona Pelanggan Ideal</h3>
            <button
              onClick={handleGenerateAiModel}
              disabled={isGeneratingAi}
              className="px-3.5 py-1.5 rounded-xl bg-soft-pistachio hover:bg-soft-pistachio text-deep-sage font-bold text-xs"
            >
              {isGeneratingAi ? 'Menganalisis...' : 'Sintesis Persona AI'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-4 rounded-xl bg-soft-pistachio border border-soft-pistachio space-y-3">
              <span className="font-bold text-soft-pistachio uppercase text-[11px]">Profil Persona Utama</span>
              <div>
                <span className="text-soft-pistachio block font-semibold">Nama Persona Archetype:</span>
                <span className="font-bold text-white">"Andi, The Health-Conscious Urban Tech Worker" (Usia 28)</span>
              </div>
              <div>
                <span className="text-soft-pistachio block font-semibold">Karakter & Rutinitas:</span>
                <p className="text-deep-sage mt-0.5">Bekerja hybrid di SCBD Jakarta, berolahraga padel/gym 3x seminggu, sering memesan minuman lewat delivery aplikasi saat jam 14:00.</p>
              </div>
              <div>
                <span className="text-soft-pistachio block font-semibold">Pain Point Utama:</span>
                <p className="text-deep-sage mt-0.5">Asam lambung sering kambuh jika minum es kopi susu gula aren setiap hari; ingin asupan antioksidan yang menyegarkan tanpa gula tambahan.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-soft-pistachio border border-soft-pistachio space-y-3">
              <span className="font-bold text-muted-pistachio uppercase text-[11px]">Customer Journey (Alur Pembelian)</span>
              <ul className="space-y-2 text-deep-sage">
                <li><strong>Awareness:</strong> Melihat review honest di TikTok dari kreator gaya hidup sehat.</li>
                <li><strong>Consideration:</strong> Memeriksa label nutrisi, izin BPOM, dan sertifikasi Halal.</li>
                <li><strong>Purchase:</strong> Membeli paket bundle starter kit (isi 6 kaleng) via e-commerce dengan gratis ongkir.</li>
                <li><strong>Retention:</strong> Menjadi langganan rutin mingguan (repeat-order).</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Indonesian Regulatory Guidance */}
      {activeTab === 'regulatory' && (
        <div className="p-6 rounded-2xl bg-warm-ivory border border-soft-pistachio space-y-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-soft-pistachio" />
            <h3 className="font-bold text-white text-base">
              Panduan Kepatuhan Regulasi Bisnis di Indonesia
            </h3>
          </div>

          <p className="text-xs text-deep-sage leading-relaxed">
            Menjalankan usaha di Indonesia menuntut kepatuhan perizinan resmi agar produk aman dari penyitaan hukum dan membangun kepercayaan tinggi di mata konsumen.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-soft-pistachio border border-soft-pistachio space-y-2">
              <span className="text-[11px] font-bold uppercase text-soft-pistachio">1. Izin Edar Makanan & Minuman</span>
              <p className="text-deep-sage"><strong>PIRT vs BPOM MD:</strong> Produk rumahan berisiko rendah dapat menggunakan SPP-PIRT Dinas Kesehatan. Produk bertekanan, kaleng, susu, atau maklon wajib izin BPOM MD.</p>
            </div>

            <div className="p-4 rounded-xl bg-soft-pistachio border border-soft-pistachio space-y-2">
              <span className="text-[11px] font-bold uppercase text-soft-pistachio">2. Sertifikasi Halal (BPJPH)</span>
              <p className="text-deep-sage">Wajib bagi produk pangan dan kosmetik sesuai UU Jaminan Produk Halal. Pastikan bahan baku impor memiliki sertifikat halal yang diakui saling-terima (MRA).</p>
            </div>

            <div className="p-4 rounded-xl bg-soft-pistachio border border-soft-pistachio space-y-2">
              <span className="text-[11px] font-bold uppercase text-soft-pistachio">3. Notifikasi Kosmetik (BPOM NA)</span>
              <p className="text-deep-sage">Untuk produk perawatan kulit/skincare, wajib diproduksi di pabrik bersertifikat CPKB A atau maklon berizin resmi dengan nomor notifikasi NA sebelum boleh dijual.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-soft-apricot/20 border border-amber-500/30 text-xs text-soft-apricot/90 leading-relaxed">
            <strong>Pemberitahuan Resmi:</strong> WAVE adalah perangkat intelijen bisnis dan perencanaan strategis. Selalu konsultasikan spesifikasi teknis produk Anda dengan instansi resmi (BPOM RI, BPJPH, atau Dinas Perindustrian/Kesehatan daerah Anda) sebelum peluncuran komersial.
          </div>
        </div>
      )}
    </AppLayout>
  );
}
