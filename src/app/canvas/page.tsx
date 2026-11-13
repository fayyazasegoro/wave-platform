'use client';

import React, { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useProject } from '@/context/ProjectContext';
import { useSubscription } from '@/context/SubscriptionContext';
import { BusinessCanvasProject, TrendCategory } from '@/types';
import { TREND_CATEGORIES } from '@/data/marketIntelligence';
import {
  FolderKanban,
  Plus,
  Save,
  CheckCircle2,
  Clock,
  Edit3,
  Trash2,
  FileText,
  Sparkles,
  Link as LinkIcon,
  Layers,
  ArrowRight,
  Calculator,
  ChevronDown,
} from 'lucide-react';

export default function CanvasPage() {
  const {
    projects,
    activeProject,
    setActiveProject,
    createProject,
    updateActiveProject,
    deleteProject,
    lastSavedTime,
  } = useProject();
  const { subscription, triggerUpgradePrompt } = useSubscription();

  const [isEditingSection, setIsEditingSection] = useState<string | null>(null);
  const [sectionContentInput, setSectionContentInput] = useState<string>('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectCategory, setNewProjectCategory] = useState<TrendCategory>('Food & Beverages');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync section input when active section changes
  const handleStartEdit = (key: string, currentContent: string) => {
    setIsEditingSection(key);
    setSectionContentInput(currentContent);
  };

  const handleSaveSection = (key: keyof BusinessCanvasProject['sections']) => {
    if (!activeProject) return;
    const updated = { ...activeProject };
    (updated.sections as any)[key] = {
      ...(updated.sections as any)[key],
      content: sectionContentInput,
      status: sectionContentInput.trim().length > 0 ? 'completed' : 'draft',
    };
    updateActiveProject(updated);
    setIsEditingSection(null);
    setToastMessage('Bagian kanvas berhasil disimpan otomatis!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateNewProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;

    if (projects.length >= subscription.projectsLimit) {
      triggerUpgradePrompt(`Batas Proyek Tercapai (Maksimal ${subscription.projectsLimit} di paket ${subscription.plan.toUpperCase()})`);
      return;
    }

    const created = createProject(newProjectName, newProjectCategory, newProjectDesc);
    setShowCreateModal(false);
    setNewProjectName('');
    setNewProjectDesc('');
    setToastMessage(`Proyek "${created.name}" berhasil dibuat!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const canvasSectionsList: {
    key: keyof BusinessCanvasProject['sections'];
    title: string;
    description: string;
  }[] = [
    { key: 'businessIdea', title: '1. Ide & Konsep Bisnis', description: 'Gagasan inti, nama merek tentatif, dan tujuan bisnis.' },
    { key: 'marketResearch', title: '2. Riset Pasar & Tren', description: 'Data pertumbuhan, momentum pencarian, dan lifecycle dari WAVE Radar.' },
    { key: 'targetCustomer', title: '3. Target Pelanggan', description: 'Karakter demografis, gaya hidup, dan profil persona ideal.' },
    { key: 'customerProblem', title: '4. Masalah Pelanggan (Pain Points)', description: 'Keluhan utama konsumen terhadap solusi yang ada saat ini.' },
    { key: 'valueProposition', title: '5. Value Proposition', description: 'Nilai manfaat utama yang dijanjikan kepada pembeli.' },
    { key: 'productServiceConcept', title: '6. Konsep Produk / Jasa', description: 'Spesifikasi fisik, rasa/fungsi, dan format kemasan produk.' },
    { key: 'productInnovation', title: '7. Inovasi Produk (7 Dimensi)', description: 'Diferensiasi formulasi, packaging, atau model bisnis dari WAVE Innovate.' },
    { key: 'competitorAnalysis', title: '8. Analisis Kompetitor', description: 'Kelemahan dan celah kompetitor dominan di pasar.' },
    { key: 'uspDifferentiation', title: '9. USP & Keunggulan Pembeda', description: 'Alasan mengapa konsumen harus memilih Anda dibanding opsi lain.' },
    { key: 'businessModel', title: '10. Model Bisnis & Distribusi', description: 'Saluran penjualan (D2C, marketplace, konsinyasi, langganan).' },
    { key: 'pricingStrategy', title: '11. Strategi Penetapan Harga', description: 'Harga eceran tertinggi (HET), diskon grosir, dan struktur margin.' },
    { key: 'financialPlanning', title: '12. Perencanaan Finansial & BEP', description: 'Kalkulasi COGS/HPP, target unit bulanan, dan proyeksi balik modal.' },
    { key: 'marketingStrategy', title: '13. Strategi Pemasaran & Seeding', description: 'Kanal akuisisi (TikTok/Instagram), endorsement KOL, dan kampanye.' },
    { key: 'operationalPlanning', title: '14. Perencanaan Operasional & Maklon', description: 'Vendor bahan baku, pabrik maklon ber-BPOM, dan SOP produksi.' },
    { key: 'launchRoadmap', title: '15. Roadmap Peluncuran 12 Tahap', description: 'Daftar milestone dan checklist tugas menuju rilis komersial.' },
  ];

  return (
    <AppLayout>
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-teal-500 text-navy-950 font-bold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <span>✓ {toastMessage}</span>
        </div>
      )}

      {/* Header & Project Command Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <FolderKanban className="w-3.5 h-3.5" />
            MY WORKSPACE • MY BUSINESS CANVAS (ALL PLANS)
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Pusat Komando Bisnis Anda
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Simpan, kelola, dan hubungkan wawasan tren pasar ke dalam 15 bagian kanvas bisnis terpadu.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {lastSavedTime && (
            <span className="text-[11px] text-teal-400/90 flex items-center gap-1 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" /> Tersimpan: {lastSavedTime}
            </span>
          )}
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-ocean-500 hover:from-teal-400 hover:to-ocean-400 text-navy-950 font-bold text-xs shadow-md shadow-teal-500/15 transition-all"
          >
            <Plus className="w-4 h-4" /> Proyek Baru
          </button>
        </div>
      </div>

      {/* Project Switcher & Statistics Bar */}
      <div className="p-4 rounded-2xl bg-navy-900 border border-slate-800 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 overflow-x-auto pb-1 max-w-full">
          <span className="text-xs text-slate-400 font-semibold shrink-0">Proyek:</span>
          {projects.map((proj) => {
            const isActive = activeProject?.id === proj.id;
            return (
              <button
                key={proj.id}
                onClick={() => setActiveProject(proj)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all flex items-center gap-2 border ${
                  isActive
                    ? 'border-teal-400 bg-teal-950/40 text-teal-300 shadow-sm'
                    : 'border-slate-800 bg-navy-850 text-slate-400 hover:text-white'
                }`}
              >
                <span>{proj.name}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300">
                  {proj.progressPercentage}%
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-400 shrink-0">
          <span>Total: <strong className="text-white">{projects.length}</strong> / {subscription.projectsLimit}</span>
          <span className="text-slate-600">•</span>
          <span>Tahap: <strong className="text-teal-300 uppercase">{activeProject?.stage || 'Draft'}</strong></span>
        </div>
      </div>

      {/* Active Project Meta & Linked Insights */}
      {activeProject && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-slate-800 mb-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-4">
            <div>
              <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider block mb-1">
                {activeProject.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                {activeProject.name}
              </h2>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                {activeProject.description}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-2xl font-black text-teal-300">
                  {activeProject.progressPercentage}%
                </span>
                <span className="text-[10px] text-slate-400 block">Kelengkapan Kanvas</span>
              </div>
              <button
                onClick={() => {
                  if (confirm(`Hapus proyek "${activeProject.name}"?`)) {
                    deleteProject(activeProject.id);
                  }
                }}
                className="p-2 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                title="Hapus Proyek"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Linked WAVE Insights Pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-semibold flex items-center gap-1.5">
              <LinkIcon className="w-3.5 h-3.5 text-teal-400" />
              Wawasan Tertaut:
            </span>
            {activeProject.linkedTrendName && (
              <span className="px-2.5 py-1 rounded-lg bg-teal-500/10 text-teal-300 border border-teal-500/30 text-[11px] font-medium">
                Tren: {activeProject.linkedTrendName}
              </span>
            )}
            {activeProject.linkedOpportunityName && (
              <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 text-[11px] font-medium">
                Peluang: {activeProject.linkedOpportunityName}
              </span>
            )}
            {!activeProject.linkedTrendName && !activeProject.linkedOpportunityName && (
              <span className="text-slate-500 italic text-[11px]">
                Belum ada tren yang ditautkan. Hubungkan tren dari WAVE Radar atau Beyond the Wave.
              </span>
            )}
          </div>
        </div>
      )}

      {/* 15 Structured Canvas Sections Grid */}
      {activeProject && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {canvasSectionsList.map((sec) => {
            const secData = activeProject.sections[sec.key];
            const isEditing = isEditingSection === sec.key;
            const hasContent = secData && secData.content && secData.content.trim().length > 0;

            return (
              <div
                key={sec.key}
                className="p-5 rounded-2xl bg-navy-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-white text-sm">{sec.title}</h3>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                        hasContent
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {hasContent ? 'Terisi' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mb-3">{sec.description}</p>

                  {/* Section Content View / Edit Mode */}
                  {isEditing ? (
                    <div className="space-y-3">
                      <textarea
                        rows={5}
                        value={sectionContentInput}
                        onChange={(e) => setSectionContentInput(e.target.value)}
                        className="w-full bg-navy-850 border border-teal-400 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none"
                        placeholder="Tuliskan catatan dan strategi untuk bagian ini..."
                      />
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setIsEditingSection(null)}
                          className="px-3 py-1 rounded-lg text-xs text-slate-400 hover:text-white"
                        >
                          Batal
                        </button>
                        <button
                          onClick={() => handleSaveSection(sec.key)}
                          className="px-3.5 py-1 rounded-lg bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold text-xs shadow-sm"
                        >
                          Simpan
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => handleStartEdit(sec.key, secData?.content || '')}
                      className="p-3.5 rounded-xl bg-navy-850/80 border border-slate-800/80 text-xs text-slate-300 min-h-[100px] cursor-pointer hover:border-slate-700 transition-colors whitespace-pre-wrap leading-relaxed"
                    >
                      {hasContent ? (
                        secData.content
                      ) : (
                        <span className="text-slate-500 italic">
                          Klik untuk menambahkan catatan atau menghubungkan wawasan dari modul WAVE...
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Section Footer */}
                <div className="pt-3 mt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                  <button
                    onClick={() => handleStartEdit(sec.key, secData?.content || '')}
                    className="text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1"
                  >
                    <Edit3 className="w-3 h-3" /> Edit Bagian
                  </button>

                  {sec.key === 'financialPlanning' && (
                    <button
                      onClick={() => {
                        window.location.href = '/builder';
                      }}
                      className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                    >
                      <Calculator className="w-3 h-3" /> Buka Kalkulator
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-navy-900 border border-slate-700 rounded-2xl shadow-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-2">Buat Proyek Bisnis Baru</h3>
            <p className="text-xs text-slate-400 mb-6">
              Inisiasi proyek baru di My Business Canvas untuk menyusun rencana bisnis terstruktur.
            </p>

            <form onSubmit={handleCreateNewProject} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Nama Bisnis / Usaha:</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Artisan Cold Brew Can"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="w-full bg-navy-850 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Kategori Industri:</label>
                <select
                  value={newProjectCategory}
                  onChange={(e) => setNewProjectCategory(e.target.value as TrendCategory)}
                  className="w-full bg-navy-850 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-teal-400"
                >
                  {TREND_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Deskripsi Ringkas:</label>
                <textarea
                  rows={3}
                  placeholder="Ringkasan konsep ide bisnis..."
                  value={newProjectDesc}
                  onChange={(e) => setNewProjectDesc(e.target.value)}
                  className="w-full bg-navy-850 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-teal-400"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold shadow-md shadow-teal-500/20"
                >
                  Buat Proyek
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
