import Link from "next/link";

export function CtaSection() {
  return (
    <section className="bg-[#1A2318] relative overflow-hidden">
      {/* Dotted world-map pattern */}
      <div className="world-map-pattern absolute inset-0 opacity-100" />

      {/* Pin location icons scattered */}
      {[
        { top: "20%", left: "12%" },
        { top: "38%", left: "28%" },
        { top: "15%", left: "55%" },
        { top: "45%", left: "70%" },
        { top: "28%", left: "88%" },
        { top: "60%", left: "40%" },
        { top: "55%", left: "82%" },
      ].map((pos, i) => (
        <svg
          key={i}
          className="absolute opacity-30"
          style={{ top: pos.top, left: pos.left }}
          width="16"
          height="20"
          viewBox="0 0 16 20"
          fill="none"
        >
          <path
            d="M8 0C3.58 0 0 3.58 0 8c0 6 8 12 8 12s8-6 8-12c0-4.42-3.58-8-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z"
            fill="#A8C8A8"
          />
        </svg>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 pt-20 pb-0 text-center">
        <h2 className="text-[34px] sm:text-[44px] font-bold text-white leading-tight tracking-tight mb-4">
          Ready to Evaluate Your
          <br />
          Shortlisted Property?
        </h2>
        <p className="text-[15px] text-[#A8C0A8] leading-relaxed max-w-[480px] mx-auto mb-8">
          Start your structured due-diligence evaluation — financial clarity,
          evidence tracking, and professional review needs, all in one place.
        </p>
        <Link
          href="/evaluation/default/snapshot"
          className="inline-flex items-center gap-2 bg-white text-[#111111] text-[14px] font-semibold px-8 py-3.5 rounded-full hover:bg-[#F0EDE6] transition-colors"
        >
          Evaluate Property →
        </Link>
      </div>

      {/* House image peeking from bottom — like Homera */}
      <div className="relative z-10 flex justify-center mt-12">
        <div className="relative w-[340px] sm:w-[420px]">
          <img
            src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80"
            alt="Property"
            className="w-full h-[220px] object-cover object-center rounded-t-[20px] opacity-80"
          />
          {/* Subtle fade at bottom edge */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#1A2318] to-transparent" />
        </div>
      </div>
    </section>
  );
}
