'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { useSubscription } from '@/context/SubscriptionContext';
import { useProject } from '@/context/ProjectContext';
import { RoadmapTask } from '@/types';
import {
  Rocket,
  CheckCircle2,
  Clock,
  Circle,
  Plus,
  Lock,
  Calendar,
  ListTodo,
  Check,
  AlertCircle,
  ChevronRight,
} from 'lucide-react';

export default function LaunchPage() {
  const { subscription, triggerUpgradePrompt } = useSubscription();
  const { activeProject, updateActiveProject } = useProject();

  const isPro = subscription.plan === 'pro';
  const [viewMode, setViewMode] = useState<'timeline' | 'checklist'>('checklist');
  const [filterStatus, setFilterStatus] = useState<'all' | 'todo' | 'in_progress' | 'done'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const tasks: RoadmapTask[] = activeProject?.sections.launchRoadmap.tasks || [];

  const handleToggleTaskStatus = (taskId: string) => {
    if (!activeProject) return;
    const updated = { ...activeProject };
    const taskList = [...updated.sections.launchRoadmap.tasks];
    const taskIndex = taskList.findIndex((t) => t.id === taskId);
    if (taskIndex < 0) return;

    const currentStatus = taskList[taskIndex].status;
    let nextStatus: RoadmapTask['status'] = 'in_progress';
    if (currentStatus === 'todo') nextStatus = 'in_progress';
    else if (currentStatus === 'in_progress') nextStatus = 'done';
    else nextStatus = 'todo';

    taskList[taskIndex] = {
      ...taskList[taskIndex],
      status: nextStatus,
      completionDate: nextStatus === 'done' ? new Date().toLocaleDateString('id-ID') : undefined,
    };

    updated.sections.launchRoadmap.tasks = taskList;
    updateActiveProject(updated);

    setToastMessage(`Status tugas diubah menjadi ${nextStatus.toUpperCase()}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const completedCount = tasks.filter((t) => t.status === 'done').length;
  const inProgressCount = tasks.filter((t) => t.status === 'in_progress').length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const filteredTasks = tasks.filter((t) => {
    if (filterStatus !== 'all' && t.status !== filterStatus) return false;
    return true;
  });

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
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-teal-500/10 to-indigo-500/10 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Rocket className="w-3.5 h-3.5" />
            MODULE 6B • BUSINESS LAUNCH ROADMAP
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            12-Stage Actionable Launch Roadmap
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Panduan eksekusi langkah demi langkah: dari validasi pasar, pengadaan pemasok, branding, kemasan, hingga peluncuran resmi.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/canvas"
            className="px-4 py-2 rounded-xl bg-navy-900 border border-slate-700 hover:border-slate-600 text-slate-200 text-xs font-semibold"
          >
            Kembali ke Canvas
          </Link>
        </div>
      </div>

      {/* Non-Pro Upgrade Banner */}
      {!isPro && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-950/40 via-navy-900 to-indigo-950/40 border border-teal-500/30 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-teal-500/20 text-teal-300 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm mb-0.5">
                Business Launch Roadmap Eksklusif untuk Paket PRO
              </h3>
              <p className="text-xs text-slate-300 max-w-xl">
                Tingkatkan akun Anda ke Pro untuk mengubah dan menyimpan tugas peluncuran bisnis terarah, mengaitkan dependensi, dan memantau kemajuan milestone hingga hari peluncuran.
              </p>
            </div>
          </div>
          <button
            onClick={() => triggerUpgradePrompt('Business Launch (Paket Pro)')}
            className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold text-xs shrink-0 shadow-lg shadow-teal-500/20"
          >
            Buka Peluncuran Pro
          </button>
        </div>
      )}

      {/* Progress & Milestone Summary */}
      <div className="p-6 rounded-2xl bg-navy-900 border border-slate-800 mb-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-[11px] font-bold uppercase text-teal-400 block mb-1">
              Progres Peluncuran: {activeProject?.name || 'Proyek Bisnis'}
            </span>
            <div className="text-xl font-bold text-white">
              {completedCount} dari {tasks.length} Milestone Selesai
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-2xl font-black text-teal-300">{progressPercent}%</span>
              <span className="text-[10px] text-slate-400 block">Kesiapan Rilis</span>
            </div>
            <div className="w-28 bg-slate-800 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-teal-400 to-indigo-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* View and Status Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800 text-xs">
          <div className="flex items-center gap-1 bg-navy-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                filterStatus === 'all' ? 'bg-teal-500 text-navy-950 font-bold' : 'text-slate-400'
              }`}
            >
              Semua ({tasks.length})
            </button>
            <button
              onClick={() => setFilterStatus('todo')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                filterStatus === 'todo' ? 'bg-teal-500 text-navy-950 font-bold' : 'text-slate-400'
              }`}
            >
              Belum ({tasks.filter((t) => t.status === 'todo').length})
            </button>
            <button
              onClick={() => setFilterStatus('in_progress')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                filterStatus === 'in_progress' ? 'bg-teal-500 text-navy-950 font-bold' : 'text-slate-400'
              }`}
            >
              Proses ({inProgressCount})
            </button>
            <button
              onClick={() => setFilterStatus('done')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                filterStatus === 'done' ? 'bg-teal-500 text-navy-950 font-bold' : 'text-slate-400'
              }`}
            >
              Selesai ({completedCount})
            </button>
          </div>

          <div className="flex items-center gap-1 bg-navy-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode('checklist')}
              className={`px-3 py-1 rounded-lg font-medium flex items-center gap-1.5 transition-colors ${
                viewMode === 'checklist' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400'
              }`}
            >
              <ListTodo className="w-3.5 h-3.5" /> Checklist
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-1 rounded-lg font-medium flex items-center gap-1.5 transition-colors ${
                viewMode === 'timeline' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" /> Timeline
            </button>
          </div>
        </div>
      </div>

      {/* Task List / Checklist View */}
      <div className="space-y-3">
        {filteredTasks.map((task) => {
          const isDone = task.status === 'done';
          const isInProgress = task.status === 'in_progress';

          return (
            <div
              key={task.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isDone
                  ? 'bg-navy-900/40 border-slate-800/60 opacity-80'
                  : isInProgress
                  ? 'bg-navy-900 border-teal-500/50 ring-1 ring-teal-500/30'
                  : 'bg-navy-900 border-slate-800'
              }`}
            >
              <div className="flex items-start gap-3.5">
                {/* Status Toggle Button */}
                <button
                  onClick={() => handleToggleTaskStatus(task.id)}
                  className={`mt-0.5 p-1 rounded-lg transition-colors ${
                    isDone
                      ? 'text-emerald-400 hover:text-slate-400'
                      : isInProgress
                      ? 'text-teal-400 hover:text-emerald-400'
                      : 'text-slate-500 hover:text-teal-400'
                  }`}
                  title="Klik untuk mengubah status (Todo -> In Progress -> Done)"
                >
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 fill-emerald-500/20 text-emerald-400" />
                  ) : isInProgress ? (
                    <Clock className="w-5 h-5 text-teal-400 animate-spin" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>

                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase text-teal-400 px-2 py-0.5 rounded bg-teal-500/10">
                      Tahap {task.stageIndex}: {task.stageName}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                        task.priority === 'High'
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      Prioritas {task.priority}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {task.estimatedTimeframe}
                    </span>
                  </div>

                  <h4 className={`text-sm font-bold ${isDone ? 'line-through text-slate-400' : 'text-white'}`}>
                    {task.taskName}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">{task.description}</p>

                  {task.notes && (
                    <div className="mt-2 text-[11px] text-slate-300 bg-navy-850 p-2 rounded-lg border border-slate-800">
                      Catatan: {task.notes}
                    </div>
                  )}
                </div>
              </div>

              {/* Status Badge */}
              <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between gap-2">
                <span
                  className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border ${
                    isDone
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : isInProgress
                      ? 'bg-teal-500/10 text-teal-300 border-teal-500/30'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {isDone ? 'Selesai' : isInProgress ? 'Sedang Dikerjakan' : 'Belum Mulai'}
                </span>
                {task.completionDate && (
                  <span className="text-[10px] text-slate-500">
                    Selesai: {task.completionDate}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </AppLayout>
  );
}
