import React from 'react';
import { Users, Landmark, MapPin, Award, CheckCircle, Star } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const stats = [
    {
      id: 'stat-customers',
      value: '10,000+',
      label: 'Happy Customers Assisted',
      description: 'First-time borrowers, business owners, and homeowners who secured instant approvals & lowest interest rates.',
      icon: Users,
      badge: '99.2% Sanction Rate',
      color: 'from-[#E81E76] to-[#f43f8e]',
      badgeBg: 'bg-pink-50 text-[#E81E76] border-pink-200'
    },
    {
      id: 'stat-disbursed',
      value: '₹5,500+ Cr',
      label: 'Loan Volume Disbursed',
      description: 'Facilitated nationwide loans through our network of 100+ RBI-regulated bank and NBFC partners.',
      icon: Landmark,
      badge: 'Zero Hidden Fees',
      color: 'from-[#1e40af] to-[#2563eb]',
      badgeBg: 'bg-blue-50 text-blue-800 border-blue-200'
    },
    {
      id: 'stat-cities',
      value: '500+ Cities',
      label: 'Pan-India Active Coverage',
      description: '100% digital KYC and doorstep verification across Delhi NCR, Mumbai, Bengaluru, Hyderabad, and all tier 1/2/3 cities.',
      icon: MapPin,
      badge: 'Pan-India Network',
      color: 'from-emerald-600 to-teal-600',
      badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200'
    }
  ];

  return (
    <section id="stats" className="py-12 sm:py-16 bg-white border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-[#E81E76] text-xs font-bold uppercase tracking-wider mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Proven Track Record</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1e3a8a] tracking-tight font-['Outfit',sans-serif]">
            Trusted by Thousands of Borrowers
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            We simplify complex banking paperwork to deliver maximum loan sanctions with minimal turnaround time.
          </p>
        </div>

        {/* 3 Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {stats.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                id={item.id}
                className="relative bg-slate-50/80 hover:bg-white rounded-2xl p-7 border border-slate-200 shadow-2xs hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-200`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${item.badgeBg}`}>
                      {item.badge}
                    </span>
                  </div>

                  <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-['Outfit',sans-serif]">
                    {item.value}
                  </div>

                  <h3 className="text-base font-bold text-slate-800 mt-1 mb-2">
                    {item.label}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-200/70 flex items-center gap-1.5 text-xs font-semibold text-[#E81E76]">
                  <CheckCircle className="w-4 h-4 text-[#E81E76]" />
                  <span>100% Free & Transparent Marketplace</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Badges Ribbon */}
        <div className="mt-10 p-4 rounded-2xl bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span className="text-xs sm:text-sm font-bold">
              4.9 / 5 Customer Rating across Google & Partner Portals
            </span>
          </div>
          <div className="text-xs text-pink-300 font-medium">
            100+ Banks & NBFCs Lending Marketplace
          </div>
        </div>

      </div>
    </section>
  );
};
