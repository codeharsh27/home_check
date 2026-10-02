// Architectural sketch row — 3 SVG outline illustrations
// matching Homera's pen-sketch building thumbnails

export function SketchRow() {
  return (
    <section className="bg-[#F4F1EC] py-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex justify-center gap-5">
        {/* Checklist sketch */}
        <div className="w-[120px] h-[96px] rounded-2xl bg-[#EDE9E1] border border-[#E0DCD2] flex items-center justify-center overflow-hidden">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" opacity="0.55">
            <rect x="10" y="8" width="44" height="48" rx="4" stroke="#2A5C2A" strokeWidth="1.5"/>
            <line x1="18" y1="20" x2="46" y2="20" stroke="#2A5C2A" strokeWidth="1.2"/>
            <line x1="18" y1="28" x2="40" y2="28" stroke="#2A5C2A" strokeWidth="1.2"/>
            <line x1="18" y1="36" x2="43" y2="36" stroke="#2A5C2A" strokeWidth="1.2"/>
            <line x1="18" y1="44" x2="36" y2="44" stroke="#2A5C2A" strokeWidth="1.2"/>
            <circle cx="14" cy="20" r="2" stroke="#2A5C2A" strokeWidth="1.2"/>
            <circle cx="14" cy="28" r="2" stroke="#2A5C2A" strokeWidth="1.2"/>
            <path d="M12 36L14 38L17 34" stroke="#2A5C2A" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Finance gap sketch */}
        <div className="w-[120px] h-[96px] rounded-2xl bg-[#EDE9E1] border border-[#E0DCD2] flex items-center justify-center overflow-hidden">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" opacity="0.55">
            <rect x="8" y="40" width="12" height="18" rx="2" stroke="#2A5C2A" strokeWidth="1.4"/>
            <rect x="26" y="28" width="12" height="30" rx="2" stroke="#2A5C2A" strokeWidth="1.4"/>
            <rect x="44" y="16" width="12" height="42" rx="2" stroke="#2A5C2A" strokeWidth="1.4"/>
            <path d="M14 38L32 26L50 14" stroke="#2A5C2A" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="3 2"/>
          </svg>
        </div>

        {/* Document/house sketch */}
        <div className="w-[120px] h-[96px] rounded-2xl bg-[#EDE9E1] border border-[#E0DCD2] flex items-center justify-center overflow-hidden">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" opacity="0.55">
            <path d="M32 8L10 24V58H54V24L32 8Z" stroke="#2A5C2A" strokeWidth="1.4" strokeLinejoin="round"/>
            <rect x="24" y="38" width="16" height="20" rx="2" stroke="#2A5C2A" strokeWidth="1.2"/>
            <rect x="18" y="28" width="10" height="8" rx="1.5" stroke="#2A5C2A" strokeWidth="1.2"/>
            <rect x="36" y="28" width="10" height="8" rx="1.5" stroke="#2A5C2A" strokeWidth="1.2"/>
          </svg>
        </div>
      </div>
    </section>
  );
}
