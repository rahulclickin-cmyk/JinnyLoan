import React from 'react';
import { 
  Coins, 
  CreditCard, 
  Briefcase, 
  Home, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  Zap,
  Percent,
  Calculator,
  ChevronRight
} from 'lucide-react';
import { useRouter } from '../../context/RouterContext';
import { useSiteConfig } from '../../context/ConfigContext';

interface ServicesPageProps {
  onOpenApplyModal: (loanType?: string) => void;
  onOpenPartnerModal?: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onOpenApplyModal,
  onOpenPartnerModal
}) => {
  const { navigate } = useRouter();
  const { handleActionUrl } = useSiteConfig();

  const services = [
    {
      id: 'personal-loan',
      slug: '/personal-loan',
      title: 'Personal Loan',
      badge: 'Instant Cash Transfer',
      tagline: 'Instant Unsecured Cash Loans up to ₹40 Lakhs',
      description: 'Get rapid cash directly into your bank account with minimal documentation, zero collateral, and tenure ranging from 12 to 60 months.',
      startingRate: 'From 9.99% p.a.',
      maxAmount: 'Up to ₹40 Lakhs',
      turnaround: '24 Hours',
      accentColor: 'text-[#1e40af]',
      bgGradient: 'from-blue-900 via-blue-800 to-indigo-900',
      icon: Coins,
      directUrl: 'https://bitli.in/5OXZt6Z',
      features: [
        '100% paperless Aadhaar & PAN e-KYC',
        'Direct NEFT/IMPS credit within 24 hours',
        'No collateral, guarantor, or pledge required',
        'Transparent interest with zero hidden charges'
      ],
      popularFor: 'Medical emergencies, weddings, education, travel, or debt consolidation.'
    },
    {
      id: 'credit-card',
      slug: '/credit-card',
      title: 'Credit Cards',
      badge: 'Rewards & Lounge Access',
      tagline: 'Lifetime Free Cards & 5% Cashback on Every Spend',
      description: 'Compare handpicked credit cards from India’s top card issuers. Enjoy complimentary airport lounge access, dining rewards, and zero annual fee variants.',
      startingRate: '₹0 Joining Fee Offers',
      maxAmount: 'Credit Limit to ₹10 Lakhs',
      turnaround: 'Instant Online Issuance',
      accentColor: 'text-purple-600',
      bgGradient: 'from-slate-900 via-purple-950 to-black',
      icon: CreditCard,
      directUrl: 'https://bitli.in/I9ySv3I',
      features: [
        'Up to 5% unlimited cashback on top shopping apps',
        'Complimentary domestic & international airport lounge visits',
        '1% fuel surcharge waiver at all petrol stations nationwide',
        'Up to 50 days interest-free repayment liquidity'
      ],
      popularFor: 'Daily shopping, travel bookings, fuel savings, and building high CIBIL score.'
    },
    {
      id: 'business-loan',
      slug: '/business-loan',
      title: 'Business Loan',
      badge: 'MSME Growth Capital',
      tagline: 'Collateral-Free Business Loans up to ₹50 Lakhs',
      description: 'Accelerate your commercial enterprise with working capital, machinery financing, inventory expansion, and overdraft facilities for traders and manufacturers.',
      startingRate: 'From 12.5% p.a.',
      maxAmount: 'Up to ₹50 Lakhs',
      turnaround: '48 Hours',
      accentColor: 'text-emerald-600',
      bgGradient: 'from-emerald-950 via-teal-900 to-slate-900',
      icon: Briefcase,
      directUrl: 'https://bitli.in/H5QN6Tz',
      features: [
        'Zero collateral required on unsecured business loans',
        'Flexible overdraft & drop-line term limits',
        'Fast-track approval on GST returns and bank statements',
        'Interest rate tax deductions under business expenses'
      ],
      popularFor: 'Inventory stocking, equipment purchase, expansion, vendor payments.'
    },
    {
      id: 'home-loan',
      slug: '/home-loan',
      title: 'Home Loan',
      badge: 'Lowest Sovereign Rates',
      tagline: 'Prime Housing Finance Starting at 7.10% p.a.',
      description: 'Step into your dream home with low-interest home loans from SBI, HDFC, ICICI, and Axis Bank with repayment tenures up to 30 years.',
      startingRate: 'From 7.10% p.a.',
      maxAmount: 'Up to ₹10 Crores',
      turnaround: '3 to 5 Days',
      accentColor: 'text-[#E81E76]',
      bgGradient: 'from-[#830a38] via-[#a30948] to-slate-950',
      icon: Home,
      directUrl: '',
      features: [
        'Lowest government & institutional interest rates',
        'Repayment spread comfortably over up to 30 years',
        'Zero foreclosure & prepayment charges on floating rate loans',
        'Dedicated senior relationship manager for title scrutiny'
      ],
      popularFor: 'Ready-to-move flats, plot purchase, home construction, or balance transfer.'
    },
    {
      id: 'loan-agent',
      slug: '/loan-agent',
      title: 'Loan Agent / DSA Partner',
      badge: 'Zero Investment Business',
      tagline: 'Earn Up to 2.5% Commission & Build Your Loan Agency',
      description: 'Join JinnyLoan’s authorized DSA partner network. Distribute 100+ Banks and NBFCs loan products on a single partner code with dedicated CRM tracking and weekly payouts.',
      startingRate: 'Up to 2.5% Payout',
      maxAmount: 'Unlimited Earning',
      turnaround: 'Instant Activation',
      accentColor: 'text-amber-500',
      bgGradient: 'from-amber-950 via-emerald-950 to-slate-900',
      icon: Users,
      directUrl: '',
      features: [
        '100% free registration with zero joining fee or deposit',
        'Access to 100+ Banks & NBFCs on one single partner code',
        'Digital CRM portal to track leads, documentation, and approval',
        'Weekly direct bank account settlements with detailed slips'
      ],
      popularFor: 'Financial advisors, insurance agents, CAs, brokers, and working professionals.'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Top Header Breadcrumb */}
      <div className="bg-slate-900 text-white py-12 sm:py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E81E76]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
            <button 
              onClick={() => navigate('/')} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-[#E81E76] font-semibold">Services</span>
          </div>

          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 bg-white/10 text-pink-300 font-bold text-xs uppercase tracking-wider rounded-full border border-white/10 mb-3">
              Marketplace Portfolio
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight font-['Outfit',sans-serif]">
              Our Financial <span className="text-[#E81E76]">Services & Solutions</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
              Explore India’s trusted digital lending ecosystem. From instant paperless personal cash to sovereign home loans, lucrative reward credit cards, and our authorized DSA loan agent partnership program.
            </p>
          </div>

          {/* Quick Stat Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-slate-800">
            <div>
              <div className="text-xl sm:text-2xl font-black text-white font-['Outfit',sans-serif]">100+</div>
              <div className="text-xs text-slate-400">Partner Banks & NBFCs</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-yellow-400 font-['Outfit',sans-serif]">7.10%</div>
              <div className="text-xs text-slate-400">Lowest Interest Rate</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-emerald-400 font-['Outfit',sans-serif]">24 Hours</div>
              <div className="text-xs text-slate-400">Avg Disbursal Turnaround</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-[#E81E76] font-['Outfit',sans-serif]">100%</div>
              <div className="text-xs text-slate-400">Paperless e-KYC</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main 5 Core Services List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-['Outfit',sans-serif]">
            5 Comprehensive Services Designed for You
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2">
            Select a service below to view detailed interest rate charts, partner listings, eligibility guidelines, and apply directly.
          </p>
        </div>

        <div className="space-y-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isReversed = index % 2 === 1;

            return (
              <div 
                key={service.id}
                id={`service-card-${service.id}`}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all overflow-hidden"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 items-stretch ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                  
                  {/* Left Column: Visual Gradient Identity */}
                  <div className={`lg:col-span-4 bg-gradient-to-br ${service.bgGradient} p-6 sm:p-8 text-white flex flex-col justify-between relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
                    
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white border border-white/20">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-white backdrop-blur-xs">
                          {service.badge}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-black font-['Outfit',sans-serif] tracking-tight">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/80 font-medium mt-1">
                        {service.tagline}
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/20 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-white/70">Rate / Payout:</span>
                        <span className="font-bold text-yellow-300">{service.startingRate}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-white/70">Max Quantum:</span>
                        <span className="font-bold text-white">{service.maxAmount}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-white/70">Processing Speed:</span>
                        <span className="font-bold text-emerald-300">{service.turnaround}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Detailed Breakdown & Action Buttons */}
                  <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between bg-white">
                    <div>
                      <p className="text-slate-700 text-sm leading-relaxed mb-6 font-medium">
                        {service.description}
                      </p>

                      <div className="mb-6">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                          Key Service Highlights
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {service.features.map((feat, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-slate-800">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100 text-xs text-slate-600 mb-6">
                        <strong className="text-slate-800">Best Suited For:</strong> {service.popularFor}
                      </div>
                    </div>

                    {/* Dual Action Buttons */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
                      <button
                        onClick={() => navigate(service.slug)}
                        className="px-5 py-2.5 bg-slate-900 hover:bg-[#1e40af] text-white text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                      >
                        <span>View {service.title} Page</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      {service.id === 'loan-agent' ? (
                        <button
                          onClick={() => {
                            if (onOpenPartnerModal) {
                              onOpenPartnerModal();
                            } else {
                              onOpenApplyModal('Loan Agent');
                            }
                          }}
                          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <Users className="w-4 h-4" />
                          <span>Register as Partner (Free)</span>
                        </button>
                      ) : service.directUrl ? (
                        <button
                          onClick={() => handleActionUrl(service.directUrl, () => onOpenApplyModal(service.title))}
                          className="px-5 py-2.5 bg-[#E81E76] hover:bg-[#c2145e] text-white text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <span>Direct Apply Now</span>
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => onOpenApplyModal(service.title)}
                          className="px-5 py-2.5 bg-[#E81E76] hover:bg-[#c2145e] text-white text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <span>Request Expert Callback</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Services Comparison Table */}
        <div className="mt-16 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-xl sm:text-3xl font-black text-slate-900 font-['Outfit',sans-serif]">
              Quick Service Comparison Matrix
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Compare key metrics across our 5 primary offerings at a glance.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                  <th className="py-3 px-4 rounded-l-xl">Service Category</th>
                  <th className="py-3 px-4">Starting Rate / Payout</th>
                  <th className="py-3 px-4">Maximum Limit</th>
                  <th className="py-3 px-4">Tenure / Period</th>
                  <th className="py-3 px-4">Collateral Required</th>
                  <th className="py-3 px-4 rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                    <Coins className="w-4 h-4 text-[#1e40af]" />
                    <span>Personal Loan</span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-emerald-700">From 9.99% p.a.</td>
                  <td className="py-3 px-4 font-bold">₹40 Lakhs</td>
                  <td className="py-3 px-4">12 to 60 Months</td>
                  <td className="py-3 px-4 text-emerald-600 font-bold">No (Zero Collateral)</td>
                  <td className="py-3 px-4">
                    <button 
                      onClick={() => navigate('/personal-loan')}
                      className="text-[#E81E76] hover:underline font-bold"
                    >
                      View Details →
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-purple-600" />
                    <span>Credit Cards</span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-purple-700">₹0 Joining Fee</td>
                  <td className="py-3 px-4 font-bold">₹10 Lakhs Limit</td>
                  <td className="py-3 px-4">50 Days Free Credit</td>
                  <td className="py-3 px-4 text-emerald-600 font-bold">No (Zero Collateral)</td>
                  <td className="py-3 px-4">
                    <button 
                      onClick={() => navigate('/credit-card')}
                      className="text-[#E81E76] hover:underline font-bold"
                    >
                      Compare Cards →
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-blue-600" />
                    <span>Business Loan</span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-blue-700">From 12.5% p.a.</td>
                  <td className="py-3 px-4 font-bold">₹50 Lakhs</td>
                  <td className="py-3 px-4">12 to 60 Months</td>
                  <td className="py-3 px-4 text-emerald-600 font-bold">No (Unsecured)</td>
                  <td className="py-3 px-4">
                    <button 
                      onClick={() => navigate('/business-loan')}
                      className="text-[#E81E76] hover:underline font-bold"
                    >
                      View Details →
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                    <Home className="w-4 h-4 text-[#E81E76]" />
                    <span>Home Loan</span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-[#E81E76]">From 7.10% p.a.</td>
                  <td className="py-3 px-4 font-bold">₹10 Crores</td>
                  <td className="py-3 px-4">Up to 30 Years</td>
                  <td className="py-3 px-4 text-slate-700 font-medium">Property Mortgage</td>
                  <td className="py-3 px-4">
                    <button 
                      onClick={() => navigate('/home-loan')}
                      className="text-[#E81E76] hover:underline font-bold"
                    >
                      Check Rates →
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-600" />
                    <span>Loan Agent (DSA)</span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-emerald-700">Up to 2.5% Commission</td>
                  <td className="py-3 px-4 font-bold">Unlimited</td>
                  <td className="py-3 px-4">Lifetime Partner Code</td>
                  <td className="py-3 px-4 text-emerald-600 font-bold">Zero Investment</td>
                  <td className="py-3 px-4">
                    <button 
                      onClick={() => navigate('/loan-agent')}
                      className="text-[#E81E76] hover:underline font-bold"
                    >
                      Register Free →
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Why Choose JinnyLoan Services */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1e40af] flex items-center justify-center font-bold mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 font-['Outfit',sans-serif]">
              100% Institutional Transparency
            </h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              We exclusively partner with RBI-registered Banks and NBFCs. No predatory interest rates, hidden loan processing deductions, or advance upfront security charges.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-pink-100 text-[#E81E76] flex items-center justify-center font-bold mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 font-['Outfit',sans-serif]">
              Smart Multi-Lender Technology
            </h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Our automated matching system scans multiple underwriting criteria to connect you with the specific bank offering the lowest interest rate and fastest sanction turnaround.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 font-['Outfit',sans-serif]">
              Dedicated Channel Support
            </h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Every loan applicant and channel partner gets access to dedicated loan desks, document assistance, and continuous status tracking until final bank disbursal.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
