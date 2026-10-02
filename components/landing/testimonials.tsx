"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Riya Sharma",
    role: "First-time Buyer",
    quote:
      '"I finally understood my funding gap before paying the token amount. HomeCheck gave me confidence I\'d never had — I knew exactly what was verified and what was missing."',
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80",
    avatar: "RS",
    avatarColor: "#3B82F6",
  },
  {
    name: "Aditya Mehta",
    role: "Home Buyer",
    quote:
      '"The investigation checklist showed me exactly what to ask the developer. I got the EC and RERA documents in the same week. This platform really saved me time."',
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
    avatar: "AM",
    avatarColor: "#10B981",
  },
  {
    name: "Priya Kulkarni",
    role: "Property Investor",
    quote:
      '"Clear evidence tracking. No guessing about what\'s verified vs. what\'s missing. HomeCheck made property evaluation feel organised and professional for the first time."',
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
    avatar: "PK",
    avatarColor: "#F59E0B",
  },
];

export function TestimonialsSection() {
  const [startIndex, setStartIndex] = useState(0);

  const prev = () =>
    setStartIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () =>
    setStartIndex((i) => (i + 1) % TESTIMONIALS.length);

  // Show 3 (or fewer on mobile)
  const visible = [0, 1, 2].map(
    (offset) => TESTIMONIALS[(startIndex + offset) % TESTIMONIALS.length]
  );

  return (
    <section className="bg-[#F4F1EC] py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-[32px] sm:text-[38px] font-bold text-[#111111] tracking-tight mb-2">
              What Property Buyers
              <br />
              Say About HomeCheck
            </h2>
            <p className="text-[14px] text-[#888888]">
              Real experiences from first-time property buyers across India.
            </p>
            {/* Trustpilot row */}
            <div className="flex items-center gap-2 mt-3">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="#00B67A">
                <path d="M7 0L8.57 5.18H14L9.71 8.38L11.28 13.56L7 10.36L2.72 13.56L4.29 8.38L0 5.18H5.43L7 0Z" />
              </svg>
              <span className="text-[13px] font-semibold text-[#111111]">
                Trustpilot
              </span>
              <span className="text-amber-500 text-[13px]">★★★★★</span>
              <span className="text-[13px] text-[#888888]">4.8/5</span>
            </div>
          </div>

          {/* Nav arrows */}
          <div className="flex gap-2">
            <button
              onClick={prev}
              className="w-9 h-9 rounded-full border border-[#D4CFC6] flex items-center justify-center hover:bg-white transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft size={16} className="text-[#555555]" />
            </button>
            <button
              onClick={next}
              className="w-9 h-9 rounded-full border border-[#D4CFC6] flex items-center justify-center hover:bg-white transition-colors"
              aria-label="Next"
            >
              <ChevronRight size={16} className="text-[#555555]" />
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {visible.map((t, i) => (
            <div
              key={t.name + i}
              className="relative rounded-[20px] overflow-hidden h-[320px] group"
            >
              {/* Background photo */}
              <img
                src={t.image}
                alt={t.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
              />
              {/* Gradient overlay */}
              <div className="testimonial-card-overlay absolute inset-0" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                {/* Avatar + name */}
                <div className="flex items-center gap-2.5 mb-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold border-2 border-white/40"
                    style={{ backgroundColor: t.avatarColor }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white text-[13px] font-semibold leading-none">
                      {t.name}
                    </p>
                    <p className="text-white/60 text-[11px] leading-none mt-0.5">
                      {t.role}
                    </p>
                  </div>
                </div>

                {/* Quote */}
                <p className="text-white/90 text-[13px] leading-relaxed">
                  {t.quote}
                </p>

                {/* Read Story link */}
                <button className="mt-3 text-left text-[12px] text-white/60 hover:text-white transition-colors font-medium">
                  Read Story ↗
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
