import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#FAF8F5] border-t border-stone-200/80 py-16 text-stone-600 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-200/60">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-3">
            <Link href="/" className="inline-block">
              <span className="text-xl font-extrabold tracking-tight text-stone-900">
                HomeCheck<span className="text-blue-600">.</span>
              </span>
            </Link>
            <p className="text-xs text-stone-500 leading-relaxed max-w-sm font-normal">
              Property evaluation for buyers who want to understand before they commit.
            </p>
          </div>

          {/* Column 1: PRODUCT */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-stone-900 uppercase tracking-wider">PRODUCT</p>
            <ul className="space-y-2 text-stone-500">
              <li><a href="#how-it-works" className="hover:text-blue-600 transition-colors">How It Works</a></li>
              <li><a href="#hero-intake" className="hover:text-blue-600 transition-colors">Evaluations</a></li>
              <li><a href="#what-we-check" className="hover:text-blue-600 transition-colors">What We Check</a></li>
              <li><a href="#faq" className="hover:text-blue-600 transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Column 2: RESOURCES */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-stone-900 uppercase tracking-wider">RESOURCES</p>
            <ul className="space-y-2 text-stone-500">
              <li><a href="#sample-evaluation" className="hover:text-blue-600 transition-colors">Sample Evaluation</a></li>
              <li><a href="#what-we-check" className="hover:text-blue-600 transition-colors">Property Checks</a></li>
            </ul>
          </div>

          {/* Column 3: COMPANY */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-stone-900 uppercase tracking-wider">COMPANY</p>
            <ul className="space-y-2 text-stone-500">
              <li><a href="#" className="hover:text-blue-600 transition-colors">About</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Contact</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Sub-Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-xs">
          <p>© 2026 HomeCheck</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-stone-700 transition-colors cursor-pointer">Privacy</span>
            <span>·</span>
            <span className="hover:text-stone-700 transition-colors cursor-pointer">Terms</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
