'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Storage } from '@/lib/storage';
import { useProject } from '@/context/ProjectContext';
import {
  Settings as SettingsIcon,
  User,
  Shield,
  Download,
  RotateCcw,
  Sparkles,
  Check,
} from 'lucide-react';

export default function SettingsPage() {
  const { projects } = useProject();
  const [userName, setUserName] = useState('Founder WAVE');
  const [userEmail, setUserEmail] = useState('founder@wave.business');
  const [apiKeyNotice, setApiKeyNotice] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleExportData = () => {
    const data = {
      subscription: Storage.getSubscription(),
      projects: Storage.getProjects(),
      watchlist: Storage.getWatchlist(),
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wave_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setToastMessage('Data proyek berhasil diunduh dalam format JSON!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleResetOnboarding = () => {
    Storage.setOnboardingCompleted(false);
    window.location.reload();
  };

  return (
    <AppLayout>
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-soft-pistachio text-deep-sage font-bold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <span>✓ {toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-soft-pistachio/10 text-soft-pistachio text-xs font-semibold uppercase tracking-wider mb-2">
          <SettingsIcon className="w-3.5 h-3.5" />
          PENGATURAN & PREFERENSI
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Pengaturan Akun & Konfigurasi Sistem
        </h1>
        <p className="text-soft-pistachio text-xs sm:text-sm mt-1">
          Kelola profil pengguna, backup data proyek, dan konfigurasi integrasi AI WAVE.
        </p>
      </div>

      <div className="max-w-4xl space-y-6">
        {/* Profile Card */}
        <div className="p-6 rounded-2xl bg-warm-ivory border border-soft-pistachio space-y-4 text-xs">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <User className="w-4 h-4 text-soft-pistachio" />
            <span>Profil Pengguna</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-soft-pistachio mb-1">Nama Lengkap / Brand:</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full bg-soft-pistachio border border-soft-pistachio rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-teal-400"
              />
            </div>
            <div>
              <label className="block text-soft-pistachio mb-1">Alamat Email:</label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full bg-soft-pistachio border border-soft-pistachio rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-teal-400"
              />
            </div>
          </div>
        </div>

        {/* AI Engine Status */}
        <div className="p-6 rounded-2xl bg-warm-ivory border border-soft-pistachio space-y-3 text-xs">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Sparkles className="w-4 h-4 text-soft-pistachio" />
            <span>Integrasi Server-Side Gemini AI</span>
          </div>
          <p className="text-deep-sage leading-relaxed">
            WAVE menggunakan arsitektur server-side yang aman untuk seluruh panggilan AI. Kunci API tidak pernah diekspos ke client-side. Sistem secara otomatis menggunakan model inferensi intelijen terkalibrasi Indonesia jika variabel lingkungan <code>GEMINI_API_KEY</code> belum disetel.
          </p>
          <div className="p-3 rounded-xl bg-soft-pistachio border border-soft-pistachio text-[11px] text-soft-pistachio font-mono">
            Status Engine: SIAP (Secure Server-Side Route /api/ai/generate aktif)
          </div>
        </div>

        {/* Backup & Onboarding */}
        <div className="p-6 rounded-2xl bg-warm-ivory border border-soft-pistachio space-y-4 text-xs">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Shield className="w-4 h-4 text-soft-pistachio" />
            <span>Manajemen Data & Onboarding</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={handleExportData}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-soft-pistachio hover:bg-soft-pistachio text-white font-semibold transition-colors"
            >
              <Download className="w-4 h-4 text-soft-pistachio" />
              Unduh Seluruh Data Proyek (JSON)
            </button>

            <button
              onClick={handleResetOnboarding}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-soft-pistachio border border-soft-pistachio hover:border-soft-pistachio text-deep-sage hover:text-white font-semibold transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Buka Kembali Panduan Onboarding
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
