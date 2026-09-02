import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Search, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  ShieldCheck, 
  Eye, 
  X,
  TrendingDown,
  Building
} from 'lucide-react';
import { BANK_OFFERS } from '../data/mockData';
import { BankOffer } from '../types';
import { BankLogo } from './BankLogos';

interface BankComparisonSectionProps {
  onOpenApplyModal: (bankName?: string) => void;
}

export const BankComparisonSection: React.FC<BankComparisonSectionProps> = ({
  onOpenApplyModal
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'rate' | 'rating' | 'name'>('rate');
  const [selectedBankForDetails, setSelectedBankForDetails] = useState<BankOffer | null>(null);

  const filteredBanks = useMemo(() => {
    let list = [...BANK_OFFERS].filter(b => 
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.specialFeature.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortBy === 'rate') {
      list.sort((a, b) => a.minRateNumber - b.minRateNumber);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [searchQuery, sortBy]);

  return (
    <section id="bank-comparison" className="py-6 sm:py-14 bg-slate-50 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-100 text-[#E81E76] text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1.5">
            <Building2 className="w-3 h-3" />
            <span>Bank Rates Comparison</span>
          </div>
          <h2 className="text-lg sm:text-3xl lg:text-4xl font-extrabold text-[#1e3a8a] tracking-tight font-['Outfit',sans-serif]">
            Compare Home Loan Interest Rates & Charges
          </h2>
          <p className="mt-1 text-[11px] sm:text-sm text-slate-600 leading-relaxed">
            Real-time interest rates & waivers from India's leading banking institutions
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200 shadow-xs mb-4 sm:mb-6 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4">
          
          {/* Search Bar */}
          <div className="relative w-full sm:w-80">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search bank (SBI, HDFC, ICICI)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs font-semibold pl-8 sm:pl-10 pr-3 py-1.5 sm:py-2.5 bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E81E76] text-slate-800 placeholder-slate-400"
              id="bank-search-input"
            />
          </div>

          {/* Sort Controls */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end">
            <span className="text-xs font-semibold text-slate-500 hidden sm:inline">Sort:</span>
            <div className="flex gap-1 p-0.5 sm:p-1 bg-slate-100 rounded-lg sm:rounded-xl w-full sm:w-auto justify-between">
              <button
                onClick={() => setSortBy('rate')}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold rounded-md sm:rounded-lg transition-all ${
                  sortBy === 'rate'
                    ? 'bg-[#1e40af] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Lowest Rate
              </button>
              <button
                onClick={() => setSortBy('rating')}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold rounded-md sm:rounded-lg transition-all ${
                  sortBy === 'rating'
                    ? 'bg-[#1e40af] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Top Rated
              </button>
              <button
                onClick={() => setSortBy('name')}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold rounded-md sm:rounded-lg transition-all ${
                  sortBy === 'name'
                    ? 'bg-[#1e40af] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Name A-Z
              </button>
            </div>
          </div>

        </div>

        {/* Desktop Bank Comparison Table with Official Bank SVG Logos */}
        <div className="hidden lg:block bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white text-xs uppercase font-bold tracking-wider">
                <th className="py-4 px-6">Official Bank Partner</th>
                <th className="py-4 px-6">Interest Rate</th>
                <th className="py-4 px-6">Max Tenure</th>
                <th className="py-4 px-6">Processing Fee</th>
                <th className="py-4 px-6">Key Feature</th>
                <th className="py-4 px-6 text-center">Apply Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {filteredBanks.map((bank) => (
                <tr 
                  key={bank.id}
                  className="hover:bg-pink-50/40 transition-colors group cursor-pointer"
                  onClick={() => setSelectedBankForDetails(bank)}
                  id={`bank-row-${bank.id}`}
                >
                  {/* Bank Official Logo + Name + Rating */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <BankLogo name={bank.name} size="sm" showText={false} />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 group-hover:text-[#E81E76] transition-colors">
                            {bank.name}
                          </span>
                          {bank.popularTag && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-100 text-[#E81E76]">
                              {bank.popularTag}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                          <div className="flex items-center text-amber-500">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span className="ml-1 font-semibold text-slate-700">{bank.rating}</span>
                          </div>
                          <span>•</span>
                          <span>{bank.reviewsCount} reviews</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Rate */}
                  <td className="py-4 px-6">
                    <span className="font-black text-[#E81E76] text-base font-['Outfit',sans-serif]">
                      {bank.rate}
                    </span>
                  </td>

                  {/* Tenure */}
                  <td className="py-4 px-6 font-semibold text-slate-700">
                    {bank.tenure}
                  </td>

                  {/* Processing Fee */}
                  <td className="py-4 px-6 text-xs text-slate-600 font-medium">
                    {bank.processingFee}
                  </td>

                  {/* Special Feature */}
                  <td className="py-4 px-6 text-xs text-slate-600 max-w-xs">
                    <span className="line-clamp-2">{bank.specialFeature}</span>
                  </td>

                  {/* Action */}
                  <td className="py-4 px-6 text-center" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setSelectedBankForDetails(bank)}
                        className="p-2 rounded-xl text-slate-500 hover:text-[#E81E76] hover:bg-pink-50 transition-colors cursor-pointer"
                        title="View Full Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onOpenApplyModal(bank.name)}
                        className="px-4 py-2 bg-[#1e40af] hover:bg-[#1d4ed8] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                        id={`bank-apply-btn-${bank.id}`}
                      >
                        <span>Apply</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Bank Cards Grid: 2 columns on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:hidden gap-2 sm:gap-4">
          {filteredBanks.map((bank) => (
            <div
              key={bank.id}
              className="bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-5 border border-slate-200 shadow-xs flex flex-col justify-between hover:border-pink-300 transition-all cursor-pointer"
              onClick={() => setSelectedBankForDetails(bank)}
              id={`bank-card-${bank.id}`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-1">
                  <BankLogo name={bank.name} size="sm" showText={false} />
                  <span className="text-[11px] sm:text-base font-black text-[#E81E76] font-['Outfit',sans-serif]">
                    {bank.rate}
                  </span>
                </div>
                
                <div>
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1">
                    {bank.name}
                  </h3>
                  {bank.popularTag && (
                    <span className="inline-block text-[8px] sm:text-[10px] font-bold px-1.5 py-0.2 rounded bg-pink-100 text-[#E81E76] line-clamp-1">
                      {bank.popularTag}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-1 text-[9px] sm:text-xs py-1 px-1.5 sm:px-2 bg-slate-50 rounded-lg">
                  <div>
                    <span className="text-slate-400 block text-[8px]">Tenure</span>
                    <span className="font-bold text-slate-800">{bank.tenure}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[8px]">Funding</span>
                    <span className="font-bold text-slate-800">{bank.maxLTV}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between gap-1" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setSelectedBankForDetails(bank)}
                  className="text-[10px] sm:text-xs font-semibold text-[#1e40af] hover:text-[#E81E76] flex items-center gap-0.5"
                >
                  <Eye className="w-3 h-3" />
                  <span>Info</span>
                </button>

                <button
                  onClick={() => onOpenApplyModal(bank.name)}
                  className="px-2.5 sm:px-4 py-1 sm:py-2 bg-[#1e40af] hover:bg-[#1d4ed8] text-white font-bold text-[10px] sm:text-xs rounded-lg sm:rounded-xl shadow-xs flex items-center gap-1"
                >
                  <span>Apply</span>
                  <ArrowRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Bank Details Modal */}
      {selectedBankForDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-100 shadow-2xl p-6 sm:p-8 space-y-6 relative">
            
            <button
              onClick={() => setSelectedBankForDetails(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <BankLogo name={selectedBankForDetails.name} size="md" />
                {selectedBankForDetails.popularTag && (
                  <span className="text-xs font-bold uppercase tracking-wider text-[#E81E76] bg-pink-100 px-2.5 py-0.5 rounded-full">
                    {selectedBankForDetails.popularTag}
                  </span>
                )}
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
                {selectedBankForDetails.name} Home Loan
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {selectedBankForDetails.description}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 bg-pink-50/80 border border-pink-200 rounded-xl">
                <span className="text-[10px] font-bold text-[#E81E76] uppercase">Interest Rate</span>
                <div className="text-lg font-black text-[#E81E76] mt-0.5 font-['Outfit',sans-serif]">
                  {selectedBankForDetails.rate}
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Max Tenure</span>
                <div className="text-lg font-black text-slate-900 mt-0.5 font-['Outfit',sans-serif]">
                  {selectedBankForDetails.tenure}
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Max Funding</span>
                <div className="text-lg font-black text-slate-900 mt-0.5 font-['Outfit',sans-serif]">
                  {selectedBankForDetails.maxLTV}
                </div>
              </div>

              <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl">
                <span className="text-[10px] font-bold text-blue-800 uppercase">Processing Fee</span>
                <div className="text-xs font-bold text-blue-950 mt-1">
                  {selectedBankForDetails.processingFee}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Key Perks & Advantages
              </h4>
              <div className="space-y-2">
                {selectedBankForDetails.perks.map((perk, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Eligibility Guidelines
              </h4>
              <div className="space-y-2">
                {selectedBankForDetails.eligibility.map((el, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <ShieldCheck className="w-4 h-4 text-[#1e40af] flex-shrink-0" />
                    <span>{el}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedBankForDetails(null)}
                className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Close
              </button>

              <button
                onClick={() => {
                  const bName = selectedBankForDetails.name;
                  setSelectedBankForDetails(null);
                  onOpenApplyModal(bName);
                }}
                className="px-6 py-3 bg-[#1e40af] hover:bg-[#1d4ed8] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md flex items-center gap-2 cursor-pointer"
                id="modal-apply-for-selected-bank"
              >
                <span>Apply for {selectedBankForDetails.shortName} Home Loan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
