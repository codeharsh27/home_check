'use client';

import React, { useEffect, useState } from 'react';

export function HydrationGuard({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="space-y-3 text-center">
          <div className="w-8 h-8 border-2 border-[#5B8BDF] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-[#666666] font-mono">Loading evaluation...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
