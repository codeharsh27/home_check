// 4-KPI stats row — exact Homera "12,000+ / 5,000+ / 30+ / 4.8/5" pattern

const STATS = [
  {
    icon: "🏠",
    number: "₹45L–₹2Cr",
    label: "Typical evaluated range",
  },
  {
    icon: "📋",
    number: "12+",
    label: "Verification checkpoints",
  },
  {
    icon: "✅",
    number: "100%",
    label: "Evidence-based analysis",
  },
  {
    icon: "⚖️",
    number: "Zero",
    label: "Broker bias or commission",
  },
];

export function StatsRow() {
  return (
    <section className="bg-[#F4F1EC] py-10">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <p className="text-center text-[13px] text-[#AAAAAA] font-medium uppercase tracking-widest mb-8">
          Our achievements are truly meaningful
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#DDD9D0]">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center py-6 px-4 gap-1"
            >
              <span className="text-xl mb-1">{s.icon}</span>
              <span className="text-[28px] font-bold text-[#111111] leading-none">
                {s.number}
              </span>
              <span className="text-[12px] text-[#888888] text-center leading-snug mt-1">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
