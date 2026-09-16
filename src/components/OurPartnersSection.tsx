import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { BankLogo } from './BankLogos';
import { useSiteConfig } from '../context/ConfigContext';

interface OurPartnersSectionProps {
  onOpenApplyModal?: (bankName?: string) => void;
  onSelectBank?: (bankName: string) => void;
}

interface PartnerItem {
  id: string;
  name: string;
  partnerUrl?: string;
}

export const OurPartnersSection: React.FC<OurPartnersSectionProps> = ({
  onOpenApplyModal,
  onSelectBank
}) => {
  const { handleActionUrl } = useSiteConfig();

  // Row 1 Partners (from screenshot: mPokket, Hero FINCORP, Poonawalla Fincorp, plus top leaders)
  // Slides towards the RIGHT
  const row1Partners: PartnerItem[] = [
    { id: 'r1-1', name: 'mPokket', partnerUrl: '' },
    { id: 'r1-2', name: 'Hero FINCORP', partnerUrl: '' },
    { id: 'r1-3', name: 'Poonawalla Fincorp', partnerUrl: 'https://bitli.in/VqSU8fF' },
    { id: 'r1-4', name: 'Moneyview', partnerUrl: 'https://moneyview.in' },
    { id: 'r1-5', name: 'Tata Capital', partnerUrl: '' },
    { id: 'r1-6', name: 'Axis Bank', partnerUrl: '' },
    { id: 'r1-7', name: 'Bajaj Finserv', partnerUrl: '' },
  ];

  // Row 2 Partners (from screenshot: TrustPaisa, lendingplate, FDPL Finance Pvt. Ltd., plus top leaders)
  // Slides towards the LEFT
  const row2Partners: PartnerItem[] = [
    { id: 'r2-1', name: 'TrustPaisa', partnerUrl: '' },
    { id: 'r2-2', name: 'lendingplate', partnerUrl: '' },
    { id: 'r2-3', name: 'FDPL Finance Pvt. Ltd.', partnerUrl: '' },
    { id: 'r2-4', name: 'KreditBee', partnerUrl: 'https://kreditbee.in' },
    { id: 'r2-5', name: 'L&T Finance', partnerUrl: '' },
    { id: 'r2-6', name: 'HDFC Bank', partnerUrl: '' },
    { id: 'r2-7', name: 'CASHe', partnerUrl: '' },
  ];

  // Row 3 Partners (from screenshot: TezCredit, Cashvia, branch, plus top leaders)
  // Slides towards the RIGHT
  const row3Partners: PartnerItem[] = [
    { id: 'r3-1', name: 'TezCredit', partnerUrl: '' },
    { id: 'r3-2', name: 'Cashvia', partnerUrl: '' },
    { id: 'r3-3', name: 'branch', partnerUrl: '' },
    { id: 'r3-4', name: 'Fibe', partnerUrl: '' },
    { id: 'r3-5', name: 'ICICI Bank', partnerUrl: '' },
    { id: 'r3-6', name: 'Muthoot Finance', partnerUrl: '' },
    { id: 'r3-7', name: 'Aditya Birla Capital', partnerUrl: 'https://bitli.in/5OXZt6Z' },
  ];

  const handlePartnerClick = (bank: PartnerItem) => {
    if (bank.partnerUrl) {
      handleActionUrl(bank.partnerUrl, () => {
        if (onOpenApplyModal) onOpenApplyModal(bank.name);
        else if (onSelectBank) onSelectBank(bank.name);
      });
    } else {
      if (onOpenApplyModal) onOpenApplyModal(bank.name);
      else if (onSelectBank) onSelectBank(bank.name);
    }
  };

  const renderCard = (partner: PartnerItem, uniqueKey: string) => (
    <div
      key={uniqueKey}
      onClick={() => handlePartnerClick(partner)}
      className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md px-3.5 sm:px-4 py-1.5 sm:py-2 flex items-center justify-center min-w-[150px] sm:min-w-[180px] h-[48px] sm:h-[54px] mx-1.5 sm:mx-2 transition-all hover:scale-105 cursor-pointer flex-shrink-0 select-none group"
      id={`partner-card-${partner.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${uniqueKey}`}
    >
      <div className="w-full flex items-center justify-center pointer-events-none">
        <BankLogo name={partner.name} size="md" showText={true} />
      </div>
    </div>
  );

  return (
    <section id="our-partners" className="py-8 sm:py-16 bg-[#fafafa] border-b border-slate-200/80 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit',sans-serif] tracking-tight">
            Our Lending Partners
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Empowered by India’s top RBI-approved lending institutions & digital NBFCs
          </p>
        </div>

        {/* 3 Horizontal Sliding Rows Container with Left & Right Gradient Shadows */}
        <div className="relative w-full space-y-3 sm:space-y-4">
          
          {/* Subtle Left & Right Edge Fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-28 bg-gradient-to-r from-[#fafafa] to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-28 bg-gradient-to-l from-[#fafafa] to-transparent z-20" />

          {/* Line 1: Top Row (Slides towards RIGHT) */}
          <div className="overflow-hidden w-full flex">
            <div className="animate-marquee-right">
              {[...row1Partners, ...row1Partners, ...row1Partners].map((partner, idx) =>
                renderCard(partner, `r1-${idx}`)
              )}
            </div>
          </div>

          {/* Line 2: Middle Row (Slides towards LEFT) */}
          <div className="overflow-hidden w-full flex">
            <div className="animate-marquee-left">
              {[...row2Partners, ...row2Partners, ...row2Partners].map((partner, idx) =>
                renderCard(partner, `r2-${idx}`)
              )}
            </div>
          </div>

          {/* Line 3: Bottom Row (Slides towards RIGHT) */}
          <div className="overflow-hidden w-full flex">
            <div className="animate-marquee-right">
              {[...row3Partners, ...row3Partners, ...row3Partners].map((partner, idx) =>
                renderCard(partner, `r3-${idx}`)
              )}
            </div>
          </div>

        </div>

        {/* Trust Badges Bar */}
        <div className="mt-8 sm:mt-12 p-3 sm:p-4 bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 max-w-4xl mx-auto">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="font-semibold text-slate-800">100% Direct RBI-Regulated Partners</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#1e40af] flex-shrink-0" />
            <span>Zero Brokerage or Processing Surcharges</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-[#E81E76]">100+ Lenders</span>
            <span>Across 500+ Indian Cities</span>
          </div>
        </div>

      </div>
    </section>
  );
};
