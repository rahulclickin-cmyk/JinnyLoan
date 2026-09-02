import React from 'react';
import { Phone, Mail, MapPin, ChevronRight, ShieldCheck } from 'lucide-react';
import { JinnyLogo } from './JinnyLogo';

interface FooterProps {
  onOpenAboutModal: () => void;
  onOpenContactModal: () => void;
  onOpenApplyModal: () => void;
  onOpenPartnerModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAboutModal,
  onOpenContactModal,
  onOpenApplyModal,
  onOpenPartnerModal
}) => {
  return (
    <footer className="bg-[#0b0f19] text-slate-300">
      
      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 pb-24 md:pb-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12">
          
          {/* Column 1: Brand & Logo */}
          <div className="col-span-2 sm:col-span-1 space-y-3">
            <div className="bg-white p-2.5 rounded-xl inline-block shadow-md">
              <JinnyLogo size="md" variant="color" />
            </div>
            
            <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed max-w-xs">
              JinnyLoan is India's leading digital loan marketplace connecting borrowers with 100+ Banks and NBFCs for instant personal, business, home loans & credit cards.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-2.5 pt-1">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-7 h-7 rounded-full bg-slate-800 hover:bg-[#E81E76] text-white flex items-center justify-center transition-all text-[10px] font-bold"
                aria-label="Facebook"
              >
                f
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-7 h-7 rounded-full bg-slate-800 hover:bg-[#E81E76] text-white flex items-center justify-center transition-all text-[10px] font-bold"
                aria-label="Instagram"
              >
                ig
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-7 h-7 rounded-full bg-slate-800 hover:bg-[#E81E76] text-white flex items-center justify-center transition-all text-[10px] font-bold"
                aria-label="YouTube"
              >
                ▶
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-7 h-7 rounded-full bg-slate-800 hover:bg-[#E81E76] text-white flex items-center justify-center transition-all text-[10px] font-bold"
                aria-label="LinkedIn"
              >
                in
              </a>
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="space-y-3">
            <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider font-['Outfit',sans-serif]">
              Company
            </h3>
            <ul className="space-y-1.5 sm:space-y-2.5 text-[11px] sm:text-xs">
              <li>
                <a href="#" className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors">
                  <span className="text-[#E81E76] font-bold">›</span>
                  <span>Home</span>
                </a>
              </li>
              <li>
                <button onClick={onOpenAboutModal} className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer text-left">
                  <span className="text-[#E81E76] font-bold">›</span>
                  <span>About Us</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenContactModal} className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer text-left">
                  <span className="text-[#E81E76] font-bold">›</span>
                  <span>Contact Us</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenPartnerModal} className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer text-left">
                  <span className="text-[#E81E76] font-bold">›</span>
                  <span>Become Partner</span>
                </button>
              </li>
              <li>
                <a href="#loan-products" className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors">
                  <span className="text-[#E81E76] font-bold">›</span>
                  <span>Loan Products</span>
                </a>
              </li>
              <li>
                <a href="#trending-offers" className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors">
                  <span className="text-[#E81E76] font-bold">›</span>
                  <span>Trending Offers</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal Pages */}
          <div className="space-y-3">
            <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider font-['Outfit',sans-serif]">
              Legal Pages
            </h3>
            <ul className="space-y-1.5 sm:space-y-2.5 text-[11px] sm:text-xs">
              <li>
                <a href="#privacy" onClick={(e) => { e.preventDefault(); onOpenAboutModal(); }} className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors">
                  <span className="text-[#E81E76] font-bold">›</span>
                  <span>Privacy Policy</span>
                </a>
              </li>
              <li>
                <a href="#terms" onClick={(e) => { e.preventDefault(); onOpenAboutModal(); }} className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors">
                  <span className="text-[#E81E76] font-bold">›</span>
                  <span>Terms of Service</span>
                </a>
              </li>
              <li>
                <a href="#disclaimer" onClick={(e) => { e.preventDefault(); onOpenAboutModal(); }} className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors">
                  <span className="text-[#E81E76] font-bold">›</span>
                  <span>Disclaimers</span>
                </a>
              </li>
              <li>
                <a href="#security" onClick={(e) => { e.preventDefault(); onOpenAboutModal(); }} className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors">
                  <span className="text-[#E81E76] font-bold">›</span>
                  <span>Data Security</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="col-span-2 sm:col-span-1 space-y-3">
            <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider font-['Outfit',sans-serif]">
              Contact Us
            </h3>
            <div className="space-y-2 text-[11px] sm:text-xs">
              <a 
                href="tel:+918006488006" 
                className="flex items-start gap-2 text-slate-300 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#E81E76] flex-shrink-0 mt-0.5" />
                <span className="font-semibold">+91 8006488006</span>
              </a>

              <a 
                href="mailto:info@jinnyloan.com" 
                className="flex items-start gap-2 text-slate-300 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#E81E76] flex-shrink-0 mt-0.5" />
                <span>info@jinnyloan.com</span>
              </a>

              <div className="flex items-start gap-2 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-[#E81E76] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  R 123 Gali No 06 Laxminagar Delhi 110092
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Pink/Coral Copyright Bar matching Screenshot */}
      <div className="bg-[#E81E76] text-white text-xs py-3 px-4 text-center font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Copyright © 2026 Jinny24 All rights reserved.</span>
          <span className="text-pink-100 text-[11px]">
            JinnyLoan is a digital loan comparison marketplace. All loans are disbursed by RBI regulated partner banks & NBFCs.
          </span>
        </div>
      </div>

    </footer>
  );
};
