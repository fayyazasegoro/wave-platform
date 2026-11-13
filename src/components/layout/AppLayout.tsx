'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { UpgradeModal } from '@/components/common/UpgradeModal';
import { OnboardingModal } from '@/components/common/OnboardingModal';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-warm-ivory text-deep-sage flex flex-col font-sans selection:bg-soft-pistachio selection:text-deep-sage">
      <Navbar onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
      
      <div className="flex flex-1 pt-0">
        <Sidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
        
        <main className="flex-1 lg:pl-64 min-w-0 transition-all">
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>

      <UpgradeModal />
      <OnboardingModal />
    </div>
  );
}
