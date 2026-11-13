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
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-soft-pistachio text-deep-sage font-bold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <span>✓ {toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-teal-500/10 to-indigo-500/10 text-soft-pistachio text-xs font-semibold uppercase tracking-wider mb-2">
            <Rocket className="w-3.5 h-3.5" />
            MODULE 6B • BUSINESS LAUNCH ROADMAP
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            12-Stage Actionable Launch Roadmap
          </h1>
          <p className="text-soft-pistachio text-xs sm:text-sm mt-1">
            Panduan eksekusi langkah demi langkah: dari validasi pasar, pengadaan pemasok, branding, kemasan, hingga peluncuran resmi.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/canvas"
            className="px-4 py-2 rounded-xl bg-warm-ivory border border-soft-pistachio hover:border-soft-pistachio text-deep-sage text-xs font-semibold"
          >
            Kembali ke Canvas
          </Link>
        </div>
      </div>

      {/* Non-Pro Upgrade Banner */}
      {!isPro && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-950/40 via-navy-900 to-indigo-950/40 border border-teal-500/30 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-soft-pistachio/20 text-soft-pistachio shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm mb-0.5">
                Business Launch Roadmap Eksklusif untuk Paket PRO
              </h3>
              <p className="text-xs text-deep-sage max-w-xl">
                Tingkatkan akun Anda ke Pro untuk mengubah dan menyimpan tugas peluncuran bisnis terarah, mengaitkan dependensi, dan memantau kemajuan milestone hingga hari peluncuran.
              </p>
            </div>
          </div>
          <button
            onClick={() => triggerUpgradePrompt('Business Launch (Paket Pro)')}
            className="px-5 py-2.5 rounded-xl bg-soft-pistachio hover:bg-soft-pistachio text-deep-sage font-bold text-xs shrink-0 shadow-lg shadow-teal-500/20"
          >
            Buka Peluncuran Pro
          </button>
        </div>
      )}

      {/* Progress & Milestone Summary */}
      <div className="p-6 rounded-2xl bg-warm-ivory border border-soft-pistachio mb-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-[11px] font-bold uppercase text-soft-pistachio block mb-1">
              Progres Peluncuran: {activeProject?.name || 'Proyek Bisnis'}
            </span>
            <div className="text-xl font-bold text-white">
              {completedCount} dari {tasks.length} Milestone Selesai
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-2xl font-black text-soft-pistachio">{progressPercent}%</span>
              <span className="text-[10px] text-soft-pistachio block">Kesiapan Rilis</span>
            </div>
            <div className="w-28 bg-soft-pistachio rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-teal-400 to-indigo-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* View and Status Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-soft-pistachio text-xs">
          <div className="flex items-center gap-1 bg-warm-ivory p-1 rounded-xl border border-soft-pistachio">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                filterStatus === 'all' ? 'bg-soft-pistachio text-deep-sage font-bold' : 'text-soft-pistachio'
              }`}
            >
              Semua ({tasks.length})
            </button>
            <button
              onClick={() => setFilterStatus('todo')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                filterStatus === 'todo' ? 'bg-soft-pistachio text-deep-sage font-bold' : 'text-soft-pistachio'
              }`}
            >
              Belum ({tasks.filter((t) => t.status === 'todo').length})
            </button>
            <button
              onClick={() => setFilterStatus('in_progress')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                filterStatus === 'in_progress' ? 'bg-soft-pistachio text-deep-sage font-bold' : 'text-soft-pistachio'
              }`}
            >
              Proses ({inProgressCount})
            </button>
            <button
              onClick={() => setFilterStatus('done')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                filterStatus === 'done' ? 'bg-soft-pistachio text-deep-sage font-bold' : 'text-soft-pistachio'
              }`}
            >
              Selesai ({completedCount})
            </button>
          </div>

          <div className="flex items-center gap-1 bg-warm-ivory p-1 rounded-xl border border-soft-pistachio">
            <button
              onClick={() => setViewMode('checklist')}
              className={`px-3 py-1 rounded-lg font-medium flex items-center gap-1.5 transition-colors ${
                viewMode === 'checklist' ? 'bg-muted-pistachio text-white font-bold' : 'text-soft-pistachio'
              }`}
            >
              <ListTodo className="w-3.5 h-3.5" /> Checklist
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-1 rounded-lg font-medium flex items-center gap-1.5 transition-colors ${
                viewMode === 'timeline' ? 'bg-muted-pistachio text-white font-bold' : 'text-soft-pistachio'
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
                  ? 'bg-warm-ivory/40 border-soft-pistachio/60 opacity-80'
                  : isInProgress
                  ? 'bg-warm-ivory border-teal-500/50 ring-1 ring-teal-500/30'
                  : 'bg-warm-ivory border-soft-pistachio'
              }`}
            >
              <div className="flex items-start gap-3.5">
                {/* Status Toggle Button */}
                <button
                  onClick={() => handleToggleTaskStatus(task.id)}
                  className={`mt-0.5 p-1 rounded-lg transition-colors ${
                    isDone
                      ? 'text-soft-pistachio hover:text-soft-pistachio'
                      : isInProgress
                      ? 'text-soft-pistachio hover:text-soft-pistachio'
                      : 'text-soft-pistachio hover:text-soft-pistachio'
                  }`}
                  title="Klik untuk mengubah status (Todo -> In Progress -> Done)"
                >
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 fill-emerald-500/20 text-soft-pistachio" />
                  ) : isInProgress ? (
                    <Clock className="w-5 h-5 text-soft-pistachio animate-spin" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>

                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase text-soft-pistachio px-2 py-0.5 rounded bg-soft-pistachio/10">
                      Tahap {task.stageIndex}: {task.stageName}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                        task.priority === 'High'
                          ? 'bg-soft-apricot/10 text-soft-apricot border border-rose-500/20'
                          : 'bg-soft-pistachio text-deep-sage'
                      }`}
                    >
                      Prioritas {task.priority}
                    </span>
                    <span className="text-[11px] text-soft-pistachio font-mono">
                      {task.estimatedTimeframe}
                    </span>
                  </div>

                  <h4 className={`text-sm font-bold ${isDone ? 'line-through text-soft-pistachio' : 'text-white'}`}>
                    {task.taskName}
                  </h4>
                  <p className="text-xs text-soft-pistachio mt-0.5">{task.description}</p>

                  {task.notes && (
                    <div className="mt-2 text-[11px] text-deep-sage bg-soft-pistachio p-2 rounded-lg border border-soft-pistachio">
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
                      ? 'bg-soft-pistachio/10 text-soft-pistachio border-emerald-500/30'
                      : isInProgress
                      ? 'bg-soft-pistachio/10 text-soft-pistachio border-teal-500/30'
                      : 'bg-soft-pistachio text-soft-pistachio border-soft-pistachio'
                  }`}
                >
                  {isDone ? 'Selesai' : isInProgress ? 'Sedang Dikerjakan' : 'Belum Mulai'}
                </span>
                {task.completionDate && (
                  <span className="text-[10px] text-soft-pistachio">
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
