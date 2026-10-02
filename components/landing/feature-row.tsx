import { CheckCircle, FileSearch, Compass } from "lucide-react";

const FEATURES = [
  {
    icon: FileSearch,
    title: "Evidence-Based Analysis",
    description:
      "Every field is tagged with its source — verified, estimated, or missing — so you always know what's real.",
  },
  {
    icon: CheckCircle,
    title: "Stage-Aware Checklist",
    description:
      "Pre-negotiation, pre-token, and pre-registration checklists built for Indian real estate norms.",
  },
  {
    icon: Compass,
    title: "Next-Action Engine",
    description:
      "Automatically surfaces what you must do next based on your funding gap, documents, and timeline.",
  },
];

export function FeatureRow() {
  return (
    <section className="bg-[#F4F1EC] py-12 border-t border-[#E8E4DA]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="flex items-start gap-4">
                {/* Icon box */}
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-white shadow-sm border border-[#E8E4DA] flex items-center justify-center">
                  <Icon size={18} className="text-[#2A5C2A]" />
                </div>
                <div>
                  <h3 className="text-[14px] font-semibold text-[#111111] mb-1">
                    {f.title}
                  </h3>
                  <p className="text-[13px] text-[#888888] leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
