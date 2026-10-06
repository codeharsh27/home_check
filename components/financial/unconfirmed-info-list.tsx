import React from 'react';
import { HelpCircle } from 'lucide-react';
import { StatusBadge } from '@/components/ui/badge';
import { PropertyDetails, BuyerContext } from '@/types';
import { calculateTransactionCosts, formatCurrency } from '@/lib/calculations';

interface UnconfirmedInfoListProps {
  property: PropertyDetails;
  context: BuyerContext;
}

export const UnconfirmedInfoList: React.FC<UnconfirmedInfoListProps> = ({ property, context }) => {
  const usesHomeLoan = context.expectedFinancing?.includes('Home loan') ?? false;
  const isUnderConstruction =
    property.possessionStatus === 'Under construction' ||
    property.possessionStatus === 'Pre-launch';
  const transactionCosts = calculateTransactionCosts(property.price);

  const items = [
    {
      show: usesHomeLoan,
      title: 'Bank Loan Sanction Letter & Exact Eligibility',
      description: 'Pre-sanctioned amount may differ based on income verification and CIBIL score.',
      who: 'Bank / Lender',
    },
    {
      show: property.price > 0,
      title: `Stamp Duty & Registration Costs (~${formatCurrency(transactionCosts)})`,
      description: `Typically 5-7% of property value. Estimate: ${formatCurrency(transactionCosts)} for this property.`,
      who: 'Registrar / Lawyer',
    },
    {
      show: !property.reraId || property.reraId === '',
      title: 'GST on Under-Construction Property (5%)',
      description: 'Applicable if property is under construction at time of agreement.',
      who: 'Developer / CA',
    },
    {
      show: true,
      title: 'Society Corpus Fund & One-Time Charges',
      description: 'Advance corpus, clubhouse membership, parking charges — often not in listing price.',
      who: 'Developer / Society',
    },
    {
      show: isUnderConstruction,
      title: 'Construction-Linked Payment Schedule',
      description: 'Slab-by-slab disbursement plan affects loan draw-down and rental planning.',
      who: 'Developer',
    },
  ].filter((i) => i.show);

  return (
    <div className="bg-white border border-stone-200/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
      <div className="flex items-center justify-between border-b border-stone-100 pb-3">
        <div>
          <h3 className="text-base font-semibold text-stone-900">Financial Items to Confirm</h3>
          <p className="text-xs text-stone-500">
            Verify these charges and conditions before paying token money
          </p>
        </div>
      </div>
      <div className="space-y-3.5">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-3 items-start p-3 rounded-xl bg-stone-50/60 border border-stone-200/60">
            <div className="mt-0.5">
              <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
            </div>
            <div className="space-y-0.5 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs sm:text-sm font-semibold text-stone-900">{item.title}</span>
                <span className="text-[10px] font-medium bg-white border border-stone-200 px-2 py-0.5 rounded text-stone-600 shadow-2xs">
                  {item.who}
                </span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-xs text-stone-500">No specific unconfirmed financial items at this time.</p>
        )}
      </div>
    </div>
  );
};
