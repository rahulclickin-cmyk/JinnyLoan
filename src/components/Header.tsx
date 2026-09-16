import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  Mail, 
  Menu, 
  X, 
  MessageSquare, 
  ChevronRight,
  ChevronDown,
  Calculator,
  Home as HomeIcon,
  CreditCard,
  Briefcase,
  UserCheck,
  Building,
  HelpCircle,
  Coins,
  Users,
  Zap,
  Gift,
  Flame,
  Layers
} from 'lucide-react';
import { JinnyLogo } from './JinnyLogo';
import { useRouter } from '../context/RouterContext';
import { LoanOffersTicker } from './LoanOffersTicker';

interface HeaderProps {
  onOpenApplyModal: (loanType?: string) => void;
  onOpenContactModal: () => void;
  onOpenAboutModal: () => void;
  onOpenPartnerModal?: () => void;
  onOpenCalculator?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenApplyModal,
  onOpenContactModal,
  onOpenAboutModal,
  onOpenPartnerModal,
  onOpenCalculator
}) => {
  const { navigate, currentPath } = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMobileServicesExpanded, setIsMobileServicesExpanded] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 5 Dedicated Core Service Pages
  const coreServices = [
    { 
      name: 'Personal Loan', 
      slug: '/personal-loan', 
      icon: Coins, 
      color: 'text-[#1e40af]',
      bgColor: 'bg-blue-50',
      badge: 'Instant Cash',
      desc: 'Up to ₹40 Lakhs with same-day transfer' 
    },
    { 
      name: 'Credit Cards', 
      slug: '/credit-card', 
      icon: CreditCard, 
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      badge: '5% Cashback',
      desc: 'Lifetime free cards & lounge access' 
    },
    { 
      name: 'Business Loan', 
      slug: '/business-loan', 
      icon: Briefcase, 
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      badge: 'MSME Capital',
      desc: 'Collateral-free funding up to ₹50 Lakhs' 
    },
    { 
      name: 'Home Loan', 
      slug: '/home-loan', 
      icon: HomeIcon, 
      color: 'text-[#E81E76]',
      bgColor: 'bg-pink-50',
      badge: '7.10% p.a.',
      desc: 'Lowest sovereign rate housing finance' 
    },
    { 
      name: 'Loan Agent', 
      slug: '/loan-agent', 
      icon: Users, 
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      badge: 'DSA Partner',
      desc: 'Earn up to 2.5% commission payouts' 
    },
  ];

  // Quick category sub-bar links placed below header
  const categoryLinks = [
    { label: 'All Services', path: '/services', icon: Layers },
    { label: 'Personal Loan', path: '/personal-loan', icon: Coins },
    { label: 'Credit Cards', path: '/credit-card', icon: CreditCard },
    { label: 'Business Loan', path: '/business-loan', icon: Briefcase },
    { label: 'Home Loan', path: '/home-loan', icon: HomeIcon },
    { label: 'Loan Agent', path: '/loan-agent', icon: Users },
    { label: 'EMI Calculator', path: '#calculator', icon: Calculator },
    { label: 'Bank Offers', path: '#bank-offers', icon: Zap },
    { label: 'FAQ', path: '#faq', icon: HelpCircle },
  ];

  const handleNavClick = (path: string) => {
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
    if (path.startsWith('#')) {
      if (currentPath !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.querySelector(path);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.querySelector(path);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  const isServicesActive = currentPath === '/services' || coreServices.some(s => s.slug === currentPath);

  return (
    <header className="sticky top-0 z-40 w-full shadow-sm">
      {/* Top Loan Offers Text Slider (All Loan Offers Rotating) */}
      <LoanOffersTicker onOpenApplyModal={onOpenApplyModal} />

      {/* Top Pink/Coral Utility Strip */}
      <div className="bg-[#E81E76] text-white text-xs py-2 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Left: Phone & Email */}
          <div className="flex items-center gap-5 sm:gap-8 font-medium">
            <a 
              href="tel:+918006488006" 
              className="flex items-center gap-2 hover:text-pink-100 transition-colors"
              id="header-top-phone"
            >
              <Phone className="w-3.5 h-3.5 fill-current" />
              <span className="tracking-wide">+91 8006488006</span>
            </a>
            <a 
              href="mailto:info@jinnyloan.com" 
              className="flex items-center gap-2 hover:text-pink-100 transition-colors"
              id="header-top-email"
            >
              <Mail className="w-3.5 h-3.5" />
              <span className="tracking-wide">info@jinnyloan.com</span>
            </a>
          </div>

          {/* Right: Social Media Circle Icons */}
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] text-pink-100 hidden md:inline font-medium">Follow us:</span>
            {['f', 'ig', 'in', '▶'].map((icon, idx) => (
              <span 
                key={idx}
                className="w-6 h-6 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#E81E76] flex items-center justify-center transition-all text-xs font-bold cursor-pointer"
              >
                {icon}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className={`w-full bg-white transition-all duration-200 ${
        isScrolled ? 'py-2.5 shadow-md' : 'py-3.5 border-b border-slate-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <a 
            href="#/" 
            onClick={(e) => { e.preventDefault(); navigate('/'); }}
            className="flex items-center group focus:outline-none cursor-pointer" 
            id="brand-logo" 
            aria-label="JinnyLoan Home"
          >
            <JinnyLogo size="md" />
          </a>

          {/* Desktop Navigation Menu */}
          <nav className="hidden md:flex items-center gap-7 font-semibold text-sm text-slate-700">
            {/* Home */}
            <button 
              onClick={() => navigate('/')}
              className={`transition-colors cursor-pointer ${
                currentPath === '/' || currentPath === ''
                  ? 'text-[#E81E76] font-bold'
                  : 'text-slate-700 hover:text-[#E81E76]'
              }`}
              id="nav-home"
            >
              Home
            </button>

            {/* Services with Dropdown containing the 5 core pages */}
            <div 
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setIsServicesDropdownOpen(true)}
              onMouseLeave={() => setIsServicesDropdownOpen(false)}
            >
              <button
                onClick={() => {
                  setIsServicesDropdownOpen(!isServicesDropdownOpen);
                  navigate('/services');
                }}
                className={`flex items-center gap-1 py-1.5 transition-colors cursor-pointer ${
                  isServicesActive
                    ? 'text-[#E81E76] font-bold'
                    : 'text-slate-700 hover:text-[#E81E76]'
                }`}
                id="nav-services"
                aria-expanded={isServicesDropdownOpen}
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isServicesDropdownOpen ? 'rotate-180 text-[#E81E76]' : 'text-slate-400'}`} />
              </button>

              {/* Services Dropdown Menu */}
              {isServicesDropdownOpen && (
                <div 
                  className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                      Our 5 Core Services
                    </span>
                    <button
                      onClick={() => {
                        setIsServicesDropdownOpen(false);
                        navigate('/services');
                      }}
                      className="text-xs font-bold text-[#E81E76] hover:underline"
                    >
                      View All →
                    </button>
                  </div>

                  <div className="py-1 space-y-1">
                    {coreServices.map((service) => {
                      const Icon = service.icon;
                      const isActive = currentPath === service.slug;

                      return (
                        <button
                          key={service.slug}
                          onClick={() => {
                            setIsServicesDropdownOpen(false);
                            navigate(service.slug);
                          }}
                          className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-3 cursor-pointer ${
                            isActive
                              ? 'bg-pink-50/80 border border-pink-100'
                              : 'hover:bg-slate-50 border border-transparent'
                          }`}
                        >
                          <div className={`w-9 h-9 rounded-xl ${service.bgColor} ${service.color} flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-900 truncate">
                                {service.name}
                              </span>
                              <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600">
                                {service.badge}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                              {service.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Dropdown Footer */}
                  <div className="pt-2 border-t border-slate-100 px-2 pb-1">
                    <button
                      onClick={() => {
                        setIsServicesDropdownOpen(false);
                        navigate('/services');
                      }}
                      className="w-full py-2 bg-slate-900 hover:bg-[#1e40af] text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Explore Services Overview Page</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* About Us */}
            <button 
              onClick={onOpenAboutModal}
              className="text-slate-700 hover:text-[#E81E76] transition-colors cursor-pointer"
              id="nav-about-us"
            >
              About Us
            </button>

            {/* Contact Us */}
            <button 
              onClick={onOpenContactModal}
              className="text-slate-700 hover:text-[#E81E76] transition-colors cursor-pointer"
              id="nav-contact-us"
            >
              Contact Us
            </button>
          </nav>

          {/* Action Button: Loan Inquiry */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => onOpenApplyModal('General Inquiry')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#22c55e] hover:bg-[#16a34a] rounded-full shadow-md shadow-green-500/20 hover:shadow-green-500/35 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              id="header-loan-inquiry-btn"
            >
              <MessageSquare className="w-4 h-4 fill-white/20" />
              <span>Loan Inquiry</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => onOpenApplyModal('General Inquiry')}
              className="px-3 py-1.5 text-xs font-bold text-white bg-[#22c55e] hover:bg-[#16a34a] rounded-full"
              id="mobile-inquiry-btn"
            >
              Inquiry
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#E81E76] rounded-lg focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation"
              id="header-mobile-toggle"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Category Navigation Strip Placed Below Header */}
      <div className="w-full bg-slate-900 text-slate-200 border-t border-slate-800 hidden lg:block overflow-x-auto shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-1 py-2 text-xs font-medium whitespace-nowrap">
            {categoryLinks.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.path)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all font-semibold cursor-pointer ${
                    isActive
                      ? 'bg-[#E81E76] text-white shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                  id={`cat-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#E81E76]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-5 pt-4 pb-6 space-y-4 shadow-xl max-h-[85vh] overflow-y-auto">
          {/* Main Top Navigation Items */}
          <div className="flex flex-col gap-1 pb-3 border-b border-slate-100">
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate('/');
              }}
              className={`text-left px-3 py-2 text-sm font-bold rounded-lg ${
                currentPath === '/' ? 'text-[#E81E76] bg-pink-50' : 'text-slate-700'
              }`}
            >
              Home
            </button>

            {/* Services with Accordion */}
            <div>
              <div className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate('/services');
                  }}
                  className={`text-sm font-bold text-left flex-1 ${
                    isServicesActive ? 'text-[#E81E76]' : 'text-slate-700'
                  }`}
                >
                  Services Page
                </button>
                <button
                  onClick={() => setIsMobileServicesExpanded(!isMobileServicesExpanded)}
                  className="p-1 text-slate-400 hover:text-slate-700"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform ${isMobileServicesExpanded ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Sub-services list */}
              {isMobileServicesExpanded && (
                <div className="pl-3 pr-1 py-1 space-y-1 bg-slate-50/70 rounded-xl my-1 border border-slate-100">
                  {coreServices.map((service) => {
                    const Icon = service.icon;
                    return (
                      <button
                        key={service.slug}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          navigate(service.slug);
                        }}
                        className="w-full text-left flex items-center justify-between p-2 rounded-lg text-xs font-semibold text-slate-700 hover:text-[#E81E76] hover:bg-white"
                      >
                        <div className="flex items-center gap-2">
                          <Icon className={`w-3.5 h-3.5 ${service.color}`} />
                          <span>{service.name}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-normal">{service.badge}</span>
                      </button>
                    );
                  })}
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate('/services');
                    }}
                    className="w-full text-left p-2 text-xs font-bold text-[#E81E76] hover:underline"
                  >
                    View All Services Overview →
                  </button>
                </div>
              )}
            </div>

            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenAboutModal();
              }}
              className="text-left px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              About Us
            </button>
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenContactModal();
              }}
              className="text-left px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              Contact Us
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenApplyModal('Mobile Inquiry');
              }}
              className="w-full py-3 text-sm font-bold text-white bg-[#22c55e] hover:bg-[#16a34a] rounded-xl shadow-md flex items-center justify-center gap-2"
              id="mobile-drawer-inquiry"
            >
              <MessageSquare className="w-4 h-4 fill-white/20" />
              <span>Loan Inquiry</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
