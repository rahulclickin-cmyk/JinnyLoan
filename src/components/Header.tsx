import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  Menu, 
  X, 
  MessageSquare, 
  ChevronRight,
  Calculator,
  Home as HomeIcon,
  CreditCard,
  Briefcase,
  UserCheck,
  Building,
  HelpCircle,
  BarChart3
} from 'lucide-react';
import { JinnyLogo } from './JinnyLogo';

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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Quick category sub-bar links placed cleanly below header
  const categoryLinks = [
    { label: 'Personal Loan', href: '#loan-products', icon: UserCheck },
    { label: 'Credit Cards', href: '#loan-products', icon: CreditCard },
    { label: 'Business Loan', href: '#loan-products', icon: Briefcase },
    { label: 'Home Loan', href: '#home-loan-details', icon: HomeIcon },
    { label: 'Loan Against Property', href: '#loan-products', icon: Building },
    { label: 'EMI Calculator', href: '#calculator', icon: Calculator },
    { label: 'Trending Offers', href: '#trending-offers', icon: BarChart3 },
    { label: 'Our Partners', href: '#our-partners', icon: Building },
    { label: 'FAQ', href: '#faq', icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-40 w-full shadow-sm">
      {/* Top Pink/Coral Utility Strip (Matches screenshot #FF4B6E / #E81E76) */}
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
            {/* Facebook */}
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer" 
              className="w-6 h-6 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#E81E76] flex items-center justify-center transition-all text-xs font-bold"
              aria-label="Facebook"
            >
              f
            </a>
            {/* Instagram */}
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer" 
              className="w-6 h-6 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#E81E76] flex items-center justify-center transition-all text-xs font-bold"
              aria-label="Instagram"
            >
              ig
            </a>
            {/* LinkedIn */}
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer" 
              className="w-6 h-6 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#E81E76] flex items-center justify-center transition-all text-xs font-bold"
              aria-label="LinkedIn"
            >
              in
            </a>
            {/* YouTube */}
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noreferrer" 
              className="w-6 h-6 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#E81E76] flex items-center justify-center transition-all text-xs font-bold"
              aria-label="YouTube"
            >
              ▶
            </a>
          </div>
        </div>
      </div>

      {/* Main Header (Clean White Bar with Authentic Logo, Simple Menu & Loan Inquiry Button) */}
      <div className={`w-full bg-white transition-all duration-200 ${
        isScrolled ? 'py-3 shadow-md' : 'py-3.5 border-b border-slate-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Authentic JinnyLoan Logo (Without extra buttons) */}
          <a href="#" className="flex items-center group focus:outline-none" id="brand-logo" aria-label="JinnyLoan Home">
            <JinnyLogo size="md" />
          </a>

          {/* Clean Primary Desktop Menu: Home, About Us, Contact Us */}
          <div className="hidden md:flex items-center gap-8 font-semibold text-sm text-slate-700">
            <a 
              href="#" 
              className="text-[#E81E76] hover:text-[#c2145e] transition-colors font-bold"
              id="nav-home"
            >
              Home
            </a>
            <button 
              onClick={onOpenAboutModal}
              className="text-slate-700 hover:text-[#E81E76] transition-colors cursor-pointer"
              id="nav-about-us"
            >
              About Us
            </button>
            <button 
              onClick={onOpenContactModal}
              className="text-slate-700 hover:text-[#E81E76] transition-colors cursor-pointer"
              id="nav-contact-us"
            >
              Contact Us
            </button>
          </div>

          {/* Action: Loan Inquiry (Green Pill Button matching WhatsApp / Inquiry in screenshot) */}
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

          {/* Mobile Menu Toggle */}
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
              className="p-2 text-slate-700 hover:text-[#E81E76] rounded-lg focus:outline-none"
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
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 transition-all font-semibold"
                  id={`cat-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <Icon className="w-3.5 h-3.5 text-[#E81E76]" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-5 pt-4 pb-6 space-y-4 shadow-xl">
          <div className="flex flex-col gap-2 pb-3 border-b border-slate-100">
            <a 
              href="#" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-bold text-[#E81E76] bg-pink-50 rounded-lg"
            >
              Home
            </a>
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

          <div className="space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-1">
              Loan Services
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {categoryLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 p-2 text-xs font-semibold text-slate-700 hover:text-[#E81E76] hover:bg-pink-50/50 rounded-lg"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#E81E76]" />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>
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

