import React from 'react';
import { Building2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { BankLogo } from './BankLogos';

interface OurPartnersSectionProps {
  onSelectBank?: (bankName: string) => void;
}

export const OurPartnersSection: React.FC<OurPartnersSectionProps> = ({
  onSelectBank
}) => {
  const partnerBanks = [
    { name: 'Axis Bank', type: 'Private Bank' },
    { name: 'HDFC Bank', type: 'Private Bank' },
    { name: 'ICICI Bank', type: 'Private Bank' },
    { name: 'State Bank of India', type: 'Public Sector' },
    { name: 'CreditSea', type: 'Digital Lending' },
    { name: 'Aditya Birla Capital', type: 'NBFC Partner' },
    { name: 'Kotak Mahindra Bank', type: 'Private Bank' },
    { name: 'Bank of Baroda', type: 'Public Sector' },
    { name: 'Canara Bank', type: 'Public Sector' },
    { name: 'Punjab National Bank', type: 'Public Sector' },
    { name: 'Growmysites', type: 'Technology Partner' },
    { name: 'Poonawalla Fincorp', type: 'NBFC Partner' },
    { name: 'Moneyview', type: 'Fintech Partner' },
    { name: 'KreditBee', type: 'Fintech Partner' },
    { name: 'Tata Capital', type: 'NBFC Partner' },
    { name: 'L&T Finance', type: 'NBFC Partner' },
  ];

  return (
    <section id="our-partners" className="py-6 sm:py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-8">
          <h2 className="text-lg sm:text-3xl lg:text-4xl font-extrabold text-[#1e3a8a] font-['Outfit',sans-serif] tracking-tight">
            Our Lending Partners
          </h2>
          <p className="text-[11px] sm:text-sm text-slate-500 mt-1">
            Partnered with 100+ RBI-licensed Scheduled Commercial Banks & NBFCs
          </p>
        </div>

        {/* Bank Logos Grid (Official SVG Logos for every single institution) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-6">
          {partnerBanks.map((bank, index) => (
            <div
              key={index}
              onClick={() => onSelectBank && onSelectBank(bank.name)}
              className="bg-slate-50/70 hover:bg-white border border-slate-200/80 hover:border-pink-300 rounded-xl sm:rounded-2xl p-2.5 sm:p-5 flex flex-col items-center justify-center text-center shadow-2xs hover:shadow-md transition-all cursor-pointer group"
              id={`partner-logo-${bank.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
            >
              <div className="w-full flex items-center justify-center h-9 sm:h-12">
                <BankLogo name={bank.name} size="sm" showText={true} />
              </div>
              <span className="text-[9px] sm:text-[10px] font-semibold text-slate-400 mt-1 sm:mt-2 group-hover:text-[#E81E76] transition-colors">
                {bank.type}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom Trust Banner */}
        <div className="mt-4 sm:mt-10 p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-2 sm:gap-4 text-[11px] sm:text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span className="font-semibold text-slate-800">100% Direct Bank Integration</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
            <span>Zero Brokerage & Markups</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-[#E81E76]">100+ Partners</span>
            <span>across 500+ cities</span>
          </div>
        </div>

      </div>
    </section>
  );
};
