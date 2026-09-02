import React from 'react';
import { ArrowRight, CheckCircle2, Flame, Percent, Clock, IndianRupee } from 'lucide-react';
import { BankLogo } from './BankLogos';

interface TrendingOffersSectionProps {
  onOpenApplyModal: (offerName?: string) => void;
}

export const TrendingOffersSection: React.FC<TrendingOffersSectionProps> = ({
  onOpenApplyModal
}) => {
  const offers = [
    {
      id: 'offer-creditsea',
      partner: 'CreditSea',
      tagline: 'Lending Genie - Always Ready to Help!',
      amount: 'Upto 1 Lakhs',
      rate: 'From 2.00% pm',
      tenure: 'Upto 60 M',
      badge: 'Instant Sanction',
      category: 'Micro Cash & Quick Loan',
      color: 'border-sky-200'
    },
    {
      id: 'offer-aditya-birla',
      partner: 'Aditya Birla Capital',
      tagline: 'Lending Genie - Always Ready to Help!',
      amount: 'Upto 5 Lakhs',
      rate: 'From 10.49% pa',
      tenure: 'Upto 60 M',
      badge: 'Pre-Approved',
      category: 'Express Personal Loan',
      color: 'border-red-200'
    },
    {
      id: 'offer-sbi',
      partner: 'State Bank of India',
      tagline: 'India\'s Most Trusted Housing Finance',
      amount: 'Upto 5 Crores',
      rate: 'From 7.35% pa',
      tenure: 'Upto 360 M',
      badge: 'Zero Prepayment Fee',
      category: 'Regular Home Loan',
      color: 'border-blue-200'
    },
    {
      id: 'offer-hdfc',
      partner: 'HDFC Bank',
      tagline: 'Special Festive Discount on Processing Fee',
      amount: 'Upto 10 Crores',
      rate: 'From 7.35% pa',
      tenure: 'Upto 360 M',
      badge: 'Instant In-Principle',
      category: 'Reach Home Loan',
      color: 'border-indigo-200'
    },
    {
      id: 'offer-icici',
      partner: 'ICICI Bank',
      tagline: 'Speedy Disbursal with Minimal Paperwork',
      amount: 'Upto 5 Crores',
      rate: 'From 7.50% pa',
      tenure: 'Upto 360 M',
      badge: 'Digital Sanction',
      category: 'Home Loan & LAP',
      color: 'border-orange-200'
    },
    {
      id: 'offer-kotak',
      partner: 'Kotak Mahindra Bank',
      tagline: 'Special Concession for Salaried Women Borrowers',
      amount: 'Upto 7.5 Crores',
      rate: 'From 7.40% pa',
      tenure: 'Upto 300 M',
      badge: '0.05% Women Rebate',
      category: 'Custom Mortgage Plan',
      color: 'border-red-200'
    }
  ];

  return (
    <section id="trending-offers" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-[#E81E76] text-xs font-extrabold uppercase tracking-wider mb-2">
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>Exclusive Deals</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1e3a8a] font-['Outfit',sans-serif] tracking-tight">
            Trending Offers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
            Hand-picked special rate offerings and instant digital approvals from our top lending partners
          </p>
        </div>

        {/* 2-Column Grid of 6 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className={`bg-white rounded-2xl border-2 ${offer.color} p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between`}
              id={offer.id}
            >
              {/* Card Header with Partner Logo */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="flex-1">
                  <span className="text-[11px] font-bold text-[#E81E76] block">
                    {offer.tagline}
                  </span>
                  <div className="mt-1">
                    <BankLogo name={offer.partner} size="sm" />
                  </div>
                </div>
                <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200 flex-shrink-0">
                  {offer.badge}
                </span>
              </div>

              {/* 3 Metric Columns: Amount, Int. Rate, Tenure */}
              <div className="grid grid-cols-3 gap-3 py-4 my-1 text-center bg-slate-50/80 rounded-xl px-2">
                <div className="border-r border-slate-200/80">
                  <span className="text-[10px] font-semibold text-slate-500 block uppercase">Amount</span>
                  <span className="text-xs sm:text-sm font-black text-slate-900 font-['Outfit',sans-serif]">
                    {offer.amount}
                  </span>
                </div>

                <div className="border-r border-slate-200/80">
                  <span className="text-[10px] font-semibold text-slate-500 block uppercase">Int. Rate</span>
                  <span className="text-xs sm:text-sm font-black text-[#E81E76] font-['Outfit',sans-serif]">
                    {offer.rate}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-semibold text-slate-500 block uppercase">Tenure</span>
                  <span className="text-xs sm:text-sm font-black text-slate-900 font-['Outfit',sans-serif]">
                    {offer.tenure}
                  </span>
                </div>
              </div>

              {/* Action Bottom */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <span className="text-[11px] font-medium text-slate-500">
                  {offer.category}
                </span>
                <button
                  onClick={() => onOpenApplyModal(`${offer.partner} - ${offer.category}`)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1e40af] hover:bg-[#1d4ed8] text-white text-xs font-bold rounded-xl shadow-sm transition-all transform hover:-translate-y-0.5 cursor-pointer"
                  id={`apply-btn-${offer.id}`}
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
