'use client';

import React, { useEffect, useState } from 'react';

export function HydrationGuard({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <div className="space-y-3 text-center">
          <div className="w-8 h-8 border-2 border-stone-800 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-stone-500 font-medium">Loading evaluation...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
