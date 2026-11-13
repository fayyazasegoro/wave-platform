'use client';

import React, { useState, useEffect } from 'react';
import { Storage } from '@/lib/storage';
import { TREND_CATEGORIES } from '@/data/marketIntelligence';
import { Sparkles, ArrowRight, X } from 'lucide-react';

export function OnboardingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);

  // Form states
  const [businessStatus, setBusinessStatus] = useState<'starting' | 'growing'>('starting');
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(['Food & Beverages', 'Health & Wellness']);
  const [capitalScale, setCapitalScale] = useState<string>('Kecil (Rp 5 - 25 Jt)');
  const [channelModel, setChannelModel] = useState<string>('hybrid');
  const [goalType, setGoalType] = useState<string>('long_term');

  useEffect(() => {
    const done = Storage.isOnboardingCompleted();
    if (!done) {
      setIsOpen(true);
    }
  }, []);

  const handleFinish = () => {
    Storage.setOnboardingCompleted(true);
    setIsOpen(false);
  };

  const toggleIndustry = (cat: string) => {
    if (selectedIndustries.includes(cat)) {
      setSelectedIndustries(selectedIndustries.filter((c) => c !== cat));
    } else {
      if (selectedIndustries.length < 4) {
        setSelectedIndustries([...selectedIndustries, cat]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-navy-900 border border-slate-700/60 rounded-2xl shadow-2xl p-6 md:p-8">
        <button
          onClick={handleFinish}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-lg"
          title="Lewati Onboarding"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-6">
          <div className={`h-1.5 rounded-full flex-1 transition-all ${step >= 1 ? 'bg-teal-400' : 'bg-slate-800'}`} />
          <div className={`h-1.5 rounded-full flex-1 transition-all ${step >= 2 ? 'bg-teal-400' : 'bg-slate-800'}`} />
          <div className={`h-1.5 rounded-full flex-1 transition-all ${step >= 3 ? 'bg-teal-400' : 'bg-slate-800'}`} />
        </div>

        {step === 1 && (
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Langkah 1 dari 3: Profil Wirausaha
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Selamat datang di WAVE. Apa misi bisnis Anda saat ini?
            </h2>
            <p className="text-slate-300 text-sm mb-6">
              Bantu kami mengkustomisasi radar tren dan rekomendasi peluang bisnis yang relevan untuk Anda.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <button
                type="button"
                onClick={() => setBusinessStatus('starting')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  businessStatus === 'starting'
                    ? 'border-teal-400 bg-teal-950/30 ring-1 ring-teal-400'
                    : 'border-slate-800 bg-navy-850 hover:border-slate-700'
                }`}
              >
                <div className="font-bold text-white mb-1">Membangun Bisnis Baru</div>
                <div className="text-xs text-slate-400">
                  Saya ingin mencari tren potensial, menemukan celah pasar yang belum jenuh, dan meluncurkan produk pertama.
                </div>
              </button>

              <button
                type="button"
                onClick={() => setBusinessStatus('growing')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  businessStatus === 'growing'
                    ? 'border-teal-400 bg-teal-950/30 ring-1 ring-teal-400'
                    : 'border-slate-800 bg-navy-850 hover:border-slate-700'
                }`}
              >
                <div className="font-bold text-white mb-1">Inovasi Bisnis yang Sudah Ada</div>
                <div className="text-xs text-slate-400">
                  Saya sudah memiliki usaha/toko dan ingin mendiversifikasi produk atau menciptakan diferensiasi kompetitif.
                </div>
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-bold uppercase text-slate-400 mb-2">
                Tujuan Usaha
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setGoalType('side_hustle')}
                  className={`py-2.5 px-3 rounded-lg text-xs font-semibold border ${
                    goalType === 'side_hustle'
                      ? 'border-teal-400 bg-teal-950/30 text-teal-300'
                      : 'border-slate-800 bg-navy-850 text-slate-400'
                  }`}
                >
                  Side Hustle (Penghasilan Tambahan)
                </button>
                <button
                  type="button"
                  onClick={() => setGoalType('long_term')}
                  className={`py-2.5 px-3 rounded-lg text-xs font-semibold border ${
                    goalType === 'long_term'
                      ? 'border-teal-400 bg-teal-950/30 text-teal-300'
                      : 'border-slate-800 bg-navy-850 text-slate-400'
                  }`}
                >
                  Venture Utama / Bisnis Jangka Panjang
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold text-sm"
              >
                Lanjutkan <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Langkah 2 dari 3: Minat Industri
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Industri mana yang ingin Anda pantau?
            </h2>
            <p className="text-slate-300 text-sm mb-5">
              Pilih hingga 4 kategori utama yang paling menarik perhatian Anda.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6 max-h-[45vh] overflow-y-auto pr-1">
              {TREND_CATEGORIES.map((cat) => {
                const isSelected = selectedIndustries.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => toggleIndustry(cat)}
                    className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                      isSelected
                        ? 'border-teal-400 bg-teal-950/40 text-teal-300'
                        : 'border-slate-800 bg-navy-850/60 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={() => setStep(1)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Kembali
              </button>
              <button
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold text-sm"
              >
                Lanjutkan <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Langkah 3 dari 3: Skala Modal & Saluran
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Kesiapan Modal & Model Distribusi
            </h2>
            <p className="text-slate-300 text-sm mb-6">
              Kami akan menyesuaikan kalkulasi finansial dan estimasi modal awal sesuai preferensi Anda.
            </p>

            <div className="mb-5">
              <label className="block text-xs font-bold uppercase text-slate-400 mb-2">
                Kisaran Modal Awal (Startup Capital)
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Mikro (< Rp 5 Jt)',
                  'Kecil (Rp 5 - 25 Jt)',
                  'Menengah (Rp 25 - 100 Jt)',
                  'Besar (> Rp 100 Jt)',
                ].map((cap) => (
                  <button
                    key={cap}
                    type="button"
                    onClick={() => setCapitalScale(cap)}
                    className={`py-3 px-3 rounded-xl border text-xs font-semibold transition-all ${
                      capitalScale === cap
                        ? 'border-teal-400 bg-teal-950/30 text-teal-300'
                        : 'border-slate-800 bg-navy-850 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {cap}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-bold uppercase text-slate-400 mb-2">
                Preferensi Saluran Penjualan
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'online', label: '100% Online (E-commerce / D2C)' },
                  { id: 'hybrid', label: 'Hybrid (Online & Konsinyasi)' },
                  { id: 'offline', label: 'Fisik / Gerai / Komunitas' },
                ].map((ch) => (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => setChannelModel(ch.id)}
                    className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                      channelModel === ch.id
                        ? 'border-teal-400 bg-teal-950/30 text-teal-300'
                        : 'border-slate-800 bg-navy-850 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {ch.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={() => setStep(2)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Kembali
              </button>
              <button
                onClick={handleFinish}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-ocean-500 hover:from-teal-400 hover:to-ocean-400 text-navy-950 font-bold text-sm shadow-lg shadow-teal-500/20"
              >
                Mulai Eksplorasi WAVE <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
