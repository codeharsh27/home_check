"use client";
import { useState } from "react";
import { X } from "lucide-react";

export function TopBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-[#1A2318] text-[#E8E4DA] text-xs sm:text-sm px-4 py-2.5 flex items-center justify-center gap-2 relative">
      <span className="mr-1">🔍</span>
      <span>
        Free property evaluation workspace — No broker. No bias.{" "}
        <button
          onClick={() => {}}
          className="underline underline-offset-2 font-medium hover:text-white transition-colors"
        >
          Start now →
        </button>
      </span>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A8A49A] hover:text-white transition-colors"
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  );
}
