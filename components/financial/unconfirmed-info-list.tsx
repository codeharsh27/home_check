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
    <div className="bg-[#121212] border border-[#252525] rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-[#202020] pb-3">
        <div>
          <h3 className="text-base font-semibold text-[#EDEDED]">Unconfirmed Financial Information</h3>
          <p className="text-xs text-[#888888]">
            Items to verify before committing
          </p>
        </div>
      </div>
      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-3">
            <div className="mt-0.5"><HelpCircle className="w-4 h-4 text-[#D4A017]" /></div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-[#EDEDED]">{item.title}</span>
                <span className="text-[10px] bg-[#181818] border border-[#252525] px-1.5 py-0.5 rounded text-[#888888]">{item.who}</span>
              </div>
              <p className="text-xs text-[#888888] mt-0.5">{item.description}</p>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-xs text-[#888888]">No specific unconfirmed financial items at this time.</p>
        )}
      </div>
    </div>
  );
};
