import React, { useState } from 'react';
import { 
  CreditCard, 
  Plus, 
  Sparkles, 
  Percent, 
  Calendar, 
  Coins, 
  Edit3, 
  CheckCircle2, 
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Tag
} from 'lucide-react';
import { useSiteConfig } from '../../../context/ConfigContext';
import { BankLogo } from '../../BankLogos';
import { LoanOfferPartnerConfig } from '../../../config/siteConfig';

interface OffersTabProps {
  onEditOffer: (offer: LoanOfferPartnerConfig) => void;
}

export const OffersTab: React.FC<OffersTabProps> = ({ onEditOffer }) => {
  const { config, updateLoanOffer } = useSiteConfig();
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const offers = config.loanOffers || [];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
              Loan Products & Interest Rates Matrix
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#E81E76] text-white">
              {offers.length} Configured Offers
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure featured interest rates, maximum loan limits, tenure spans, and promotional badges displayed on borrower cards.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Real-time Rate Sync Active</span>
          </div>
        </div>
      </div>

      {/* Benchmark Rate Slabs Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="p-3 bg-pink-50/60 rounded-xl border border-pink-100">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Personal Loan</span>
          <p className="text-lg font-black text-[#E81E76] font-['Outfit',sans-serif]">From 9.99% p.a.</p>
          <span className="text-[10px] text-slate-500">Up to ₹40 Lakhs • 5 Yrs</span>
        </div>
        <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Home Loan</span>
          <p className="text-lg font-black text-blue-700 font-['Outfit',sans-serif]">From 7.10% p.a.</p>
          <span className="text-[10px] text-slate-500">Up to ₹10 Crores • 30 Yrs</span>
        </div>
        <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Loan Against Property</span>
          <p className="text-lg font-black text-purple-700 font-['Outfit',sans-serif]">From 8.75% p.a.</p>
          <span className="text-[10px] text-slate-500">Up to 75% LTV • 15 Yrs</span>
        </div>
        <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Business Loan (MSME)</span>
          <p className="text-lg font-black text-emerald-700 font-['Outfit',sans-serif]">From 11.25% p.a.</p>
          <span className="text-[10px] text-slate-500">Collateral Free • ₹50 Lakhs</span>
        </div>
      </div>

      {/* OFFERS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {offers.map(offer => (
          <div 
            key={offer.id}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 rounded-bl-full pointer-events-none" />

            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <BankLogo name={offer.lender} size="sm" showText={true} />
                <span className="text-[10px] font-black bg-pink-100 text-[#E81E76] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  <span>{offer.badge}</span>
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 mt-2 line-clamp-1">{offer.tagline}</h4>
              
              <div className="mt-4 p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs border border-slate-100">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Percent className="w-3 h-3 text-slate-400" /> Interest Rate:
                  </span>
                  <span className="font-extrabold text-[#E81E76] text-sm">{offer.interestRate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Coins className="w-3 h-3 text-slate-400" /> Max Quantum:
                  </span>
                  <span className="font-bold text-slate-800">{offer.amount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" /> Max Tenure:
                  </span>
                  <span className="font-bold text-slate-800">{offer.tenure}</span>
                </div>
              </div>

              {offer.externalUrl && (
                <div className="mt-3 flex items-center gap-1 text-[11px] text-blue-600 font-mono truncate">
                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{offer.externalUrl}</span>
                </div>
              )}
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
              <button
                onClick={() => onEditOffer(offer)}
                className="flex-1 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Offer & Rates</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
