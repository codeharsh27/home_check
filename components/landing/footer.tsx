import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#FAF8F5] border-t border-stone-200/80 py-16 text-stone-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-200/60">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-xl font-bold tracking-tight text-stone-900">
                HomeCheck<span className="text-blue-600">.</span>
              </span>
            </Link>
            <p className="text-xs text-stone-500 leading-relaxed max-w-sm font-normal">
              An unbiased due-diligence workspace for Indian real estate buyers. Analyze funding gaps, verify builder title chains, and enforce RERA compliance before paying booking deposits.
            </p>
            <div className="pt-2 text-[11px] text-stone-400 font-medium">
              Maharashtra · Karnataka · Tamil Nadu · Delhi NCR · Telangana
            </div>
          </div>

          {/* Column 1: Due Diligence */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-stone-900 uppercase tracking-wider">Due Diligence</p>
            <ul className="space-y-2 text-stone-500">
              <li><a href="#categories" className="hover:text-blue-600 transition-colors">Apartment Audit</a></li>
              <li><a href="#categories" className="hover:text-blue-600 transition-colors">Villa Sanction Check</a></li>
              <li><a href="#categories" className="hover:text-blue-600 transition-colors">Plot 7/12 &amp; NA Clearances</a></li>
              <li><a href="#smart-tools" className="hover:text-blue-600 transition-colors">80% LTV Loan Calculator</a></li>
              <li><a href="#smart-tools" className="hover:text-blue-600 transition-colors">7% Stamp Duty Engine</a></li>
            </ul>
          </div>

          {/* Column 2: Key Metros */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-stone-900 uppercase tracking-wider">Major Markets</p>
            <ul className="space-y-2 text-stone-500">
              <li><span className="hover:text-stone-800 transition-colors">Pune (MahaRERA)</span></li>
              <li><span className="hover:text-stone-800 transition-colors">Mumbai &amp; Thane (MahaRERA)</span></li>
              <li><span className="hover:text-stone-800 transition-colors">Bengaluru (K-RERA)</span></li>
              <li><span className="hover:text-stone-800 transition-colors">Hyderabad (TG-RERA)</span></li>
              <li><span className="hover:text-stone-800 transition-colors">Delhi NCR (HRERA &amp; UP-RERA)</span></li>
            </ul>
          </div>

          {/* Column 3: Platform & Recruiter */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-stone-900 uppercase tracking-wider">Platform</p>
            <ul className="space-y-2 text-stone-500">
              <li><a href="#faq" className="hover:text-blue-600 transition-colors">Frequently Asked Questions</a></li>
              <li><a href="#featured-properties" className="hover:text-blue-600 transition-colors">Sample Due Diligence Files</a></li>
              <li>
                <Link href="/admin" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                  PM &amp; Founder Console
                </Link>
              </li>
              <li><span className="text-stone-400">Zero Commission Policy</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Sub-Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-400 text-xs">
          <p>© 2026 HomeCheck Technologies. Built for Indian Home Buyers.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-stone-600 transition-colors">Privacy Principles</span>
            <span>·</span>
            <span className="hover:text-stone-600 transition-colors">Terms of Verification</span>
            <span>·</span>
            <Link href="/admin" className="hover:text-stone-700 transition-colors">Recruiter Demo</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
