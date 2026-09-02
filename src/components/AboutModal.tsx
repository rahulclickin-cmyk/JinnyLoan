import React from 'react';
import { 
  X, 
  ShieldCheck, 
  Award, 
  Users, 
  Landmark, 
  MapPin, 
  CheckCircle2, 
  Phone, 
  Mail,
  HeartHandshake
} from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApplyModal: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, onOpenApplyModal }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-[#E81E76] text-white p-6 sm:p-8 rounded-t-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-pink-200 text-xs font-bold uppercase tracking-wider mb-2 backdrop-blur-xs">
            <HeartHandshake className="w-3.5 h-3.5 text-pink-200" />
            <span>About JinnyLoan</span>
          </div>
          <h3 className="text-2xl font-black font-['Outfit',sans-serif]">
            Making Loans Accessible & Fast Across India
          </h3>
          <p className="text-xs sm:text-sm text-blue-100 mt-1">
            Empowering thousands with transparent comparisons, lowest interest rates, and seamless doorstep banking.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          
          <div>
            <h4 className="text-base font-bold text-slate-900 mb-2 font-['Outfit',sans-serif]">
              Who We Are
            </h4>
            <p>
              <strong>JinnyLoan.com</strong> is a premier fintech lending marketplace providing accessible financial services to all. We leverage cutting-edge technology and deep banking relationships to offer tailored Home Loans, Personal Loans, Business Loans, and Loan Against Property through 100+ top RBI-regulated banks, NBFCs, and digital lenders.
            </p>
          </div>

          {/* 3 Value Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-4 bg-pink-50/70 border border-pink-100 rounded-2xl">
              <ShieldCheck className="w-6 h-6 text-[#E81E76] mb-2" />
              <h5 className="font-bold text-slate-900 text-xs sm:text-sm">100% Transparency</h5>
              <p className="text-[11px] text-slate-600 mt-1">
                Zero hidden charges, zero markup on bank interest rates, and complete fee clarity.
              </p>
            </div>

            <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-2xl">
              <Landmark className="w-6 h-6 text-[#1e40af] mb-2" />
              <h5 className="font-bold text-slate-900 text-xs sm:text-sm">100+ Lending Partners</h5>
              <p className="text-[11px] text-slate-600 mt-1">
                Direct official partnerships with Axis, SBI, HDFC, ICICI, Kotak, Aditya Birla & top fintechs.
              </p>
            </div>

            <div className="p-4 bg-emerald-50/70 border border-emerald-100 rounded-2xl">
              <Users className="w-6 h-6 text-emerald-600 mb-2" />
              <h5 className="font-bold text-slate-900 text-xs sm:text-sm">10,000+ Happy Borrowers</h5>
              <p className="text-[11px] text-slate-600 mt-1">
                Over ₹5,500+ Crores facilitated with an average customer rating of 4.9 / 5.
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-base font-bold text-slate-900 mb-2 font-['Outfit',sans-serif]">
              Our Mission & Promise
            </h4>
            <p>
              To democratize access to credit for every Indian family and business owner by eliminating paperwork bottlenecks, high fees, and lengthy branch visits. Our expert team handles every step from digital comparison to doorstep documentation and quick bank disbursal.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-0.5 text-center sm:text-left">
              <span className="text-xs font-bold text-slate-900">Registered Office</span>
              <p className="text-xs text-slate-500">R 123 Gali No 06 Laxminagar Delhi 110092</p>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenApplyModal();
              }}
              className="px-5 py-2.5 bg-[#E81E76] hover:bg-[#c2145e] text-white font-bold text-xs rounded-xl shadow-md cursor-pointer whitespace-nowrap"
            >
              Apply Online Today
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
