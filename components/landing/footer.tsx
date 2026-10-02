export function LandingFooter() {
  return (
    <footer className="bg-[#1A2318] border-t border-[#243022] py-8">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#3D7A3D] flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 1L1.5 5.5V13H5.5V9H8.5V13H12.5V5.5L7 1Z"
                fill="white"
              />
            </svg>
          </div>
          <span className="font-semibold text-[14px] text-white">
            homecheck
          </span>
        </div>

        <p className="text-[12px] text-[#6A8A6A] text-center">
          Property evaluation workspace for India · No broker. No bias.
        </p>

        <p className="text-[12px] text-[#4A6A4A]">© 2026 HomeCheck</p>
      </div>
    </footer>
  );
}
