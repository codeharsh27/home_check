import Link from "next/link";

const STEPS = [
  {
    step: "01",
    title: "Import Your Property",
    description:
      "Paste the listing URL from MagicBricks, 99acres, or NoBroker. Or upload the sales brochure PDF. HomeCheck extracts all available details automatically.",
    tag: "Evidence capture",
    bgClass: "bg-[#E8F0E8]",
  },
  {
    step: "02",
    title: "Map Your Financial Picture",
    description:
      "Enter your savings, loan eligibility, and income. HomeCheck calculates your funding gap, EMI obligation, and flags hidden costs like registration, stamp duty, and GST.",
    tag: "Financial clarity",
    bgClass: "bg-[#EEE8F0]",
  },
  {
    step: "03",
    title: "Run the Investigation Plan",
    description:
      "Work through a stage-aware due diligence checklist. Track RERA registration, EC, OC, title deed status — and attach documents as you collect them.",
    tag: "Due diligence",
    bgClass: "bg-[#F0EEE8]",
  },
  {
    step: "04",
    title: "Read Your Decision Dashboard",
    description:
      "See a final readiness score across financial, property info, and legal checks. Know exactly what's done, what's pending, and when you're ready to proceed.",
    tag: "Readiness score",
    bgClass: "bg-[#E8EEF0]",
  },
];

export function HowItWorksSection() {
  return (
    <section className="bg-[#F4F1EC] py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-[34px] sm:text-[40px] font-bold text-[#111111] tracking-tight mb-3">
            How HomeCheck Works
          </h2>
          <p className="text-[15px] text-[#888888] max-w-[480px] mx-auto leading-relaxed">
            From listing URL to decision-readiness dashboard — structured,
            evidence-based, in one place.
          </p>
        </div>

        {/* Step cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {STEPS.map((s) => (
            <div
              key={s.step}
              className="bg-white rounded-[20px] border border-[#EEEAE2] p-7 flex flex-col gap-4 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-start justify-between">
                <span className="text-[11px] font-bold text-[#BBBBBB] tracking-[0.12em] uppercase">
                  Step {s.step}
                </span>
                <span
                  className={`text-[11px] font-semibold text-[#2A5C2A] ${s.bgClass} px-3 py-1 rounded-full`}
                >
                  {s.tag}
                </span>
              </div>
              <h3 className="text-[18px] font-bold text-[#111111] leading-snug">
                {s.title}
              </h3>
              <p className="text-[13px] text-[#777777] leading-relaxed flex-1">
                {s.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA below */}
        <div className="mt-10 text-center">
          <Link
            href="/evaluation/default/snapshot"
            className="inline-flex items-center gap-2 bg-[#111111] text-white text-[14px] font-semibold px-7 py-3.5 rounded-full hover:bg-[#333333] transition-colors"
          >
            Start Your Evaluation →
          </Link>
        </div>
      </div>
    </section>
  );
}
