import React from 'react';
import { Button } from './button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center py-16 px-6 text-center space-y-4">
    {icon && (
      <div className="w-12 h-12 rounded-xl bg-[#181818] border border-[#252525] flex items-center justify-center text-[#666666]">
        {icon}
      </div>
    )}
    <div className="space-y-1">
      <h3 className="text-sm font-semibold text-[#EDEDED]">{title}</h3>
      <p className="text-xs text-[#888888] max-w-xs">{description}</p>
    </div>
    {action && (
      <Button size="sm" onClick={action.onClick}>{action.label}</Button>
    )}
  </div>
);
