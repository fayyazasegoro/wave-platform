'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserSubscription, SubscriptionTier } from '@/types';
import { Storage, DEFAULT_SUBSCRIPTION, SUBSCRIPTION_TIERS_CONFIG } from '@/lib/storage';

interface SubscriptionContextType {
  subscription: UserSubscription;
  changeTier: (tier: SubscriptionTier) => void;
  canAccess: (feature: keyof UserSubscription['features']) => boolean;
  consumeAiQuota: () => boolean;
  upgradeModalOpen: boolean;
  setUpgradeModalOpen: (open: boolean) => void;
  upgradeModalFeature: string;
  triggerUpgradePrompt: (featureName: string) => void;
  tierConfig: typeof SUBSCRIPTION_TIERS_CONFIG;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [subscription, setSubscription] = useState<UserSubscription>(DEFAULT_SUBSCRIPTION);
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [upgradeModalFeature, setUpgradeModalFeature] = useState('Fitur Premium');

  useEffect(() => {
    setSubscription(Storage.getSubscription());
  }, []);

  const changeTier = (tier: SubscriptionTier) => {
    const updated = Storage.setSubscriptionTier(tier);
    setSubscription(updated);
    setUpgradeModalOpen(false);
  };

  const canAccess = (feature: keyof UserSubscription['features']): boolean => {
    return Boolean(subscription.features && subscription.features[feature]);
  };

  const consumeAiQuota = (): boolean => {
    const ok = Storage.decrementAiQuota();
    if (!ok) {
      triggerUpgradePrompt('Kuota Analisis AI Bulanan Telah Habis');
      return false;
    }
    setSubscription(Storage.getSubscription());
    return true;
  };

  const triggerUpgradePrompt = (featureName: string) => {
    setUpgradeModalFeature(featureName);
    setUpgradeModalOpen(true);
  };

  return (
    <SubscriptionContext.Provider
      value={{
        subscription,
        changeTier,
        canAccess,
        consumeAiQuota,
        upgradeModalOpen,
        setUpgradeModalOpen,
        upgradeModalFeature,
        triggerUpgradePrompt,
        tierConfig: SUBSCRIPTION_TIERS_CONFIG,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}
