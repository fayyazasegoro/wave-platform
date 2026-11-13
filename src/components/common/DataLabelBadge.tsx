import React from 'react';
import { DataLabel } from '@/types';
import { DATA_LABEL_STYLES } from '@/data/marketIntelligence';

interface Props {
  label: DataLabel;
  className?: string;
}

export function DataLabelBadge({ label, className = '' }: Props) {
  const style = DATA_LABEL_STYLES[label] || 'bg-soft-pistachio text-deep-sage border-soft-pistachio';

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase border ${style} ${className}`}
      title={`Tingkat Integritas Data: ${label}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse opacity-80" />
      {label}
    </span>
  );
}
