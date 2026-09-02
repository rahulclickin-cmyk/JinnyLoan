import React, { useState } from 'react';
import { X, Handshake, CheckCircle2, ArrowRight, Building, Phone, Mail, User, MapPin } from 'lucide-react';

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartnerModal: React.FC<PartnerModalProps> = ({ isOpen, onClose }) => {
  const [partnerType, setPartnerType] = useState<string>('DSA / Loan Agent');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [monthlyVolume, setMonthlyVolume] = useState('₹50 Lakhs - ₹1 Crore');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-100 shadow-2xl p-6 sm:p-8 relative max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
              Partner Request Received!
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Thank you, <strong>{name}</strong>. Our Channel Partnership Head will connect with you on <strong>{phone}</strong> within 2 business hours to activate your DSA dashboard & payout agreement.
            </p>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs text-slate-600 space-y-1.5">
              <div><strong>Partner Type:</strong> {partnerType}</div>
              <div><strong>Operating City:</strong> {city || 'Delhi NCR'}</div>
              <div><strong>Estimated Monthly Volume:</strong> {monthlyVolume}</div>
              <div><strong>Channel Support:</strong> partner@jinnyloan.com | +91 8006488006</div>
            </div>
            <button
              onClick={handleReset}
              className="w-full py-3 bg-[#E81E76] hover:bg-[#c2145e] text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer"
            >
              Done & Return to Homepage
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2">
                <Handshake className="w-3.5 h-3.5 text-blue-600" />
                <span>JinnyLoan Partner Network</span>
              </div>
              <h3 className="text-2xl font-extrabold text-[#1e3a8a] font-['Outfit',sans-serif]">
                Join as a Loan Partner
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Monetize your customer base. Get direct logins with 100+ Banks & NBFCs with highest slab payouts.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Partner Type */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  I am applying as a
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'DSA / Loan Agent',
                    'Real Estate Builder / Broker',
                    'Chartered Accountant (CA)',
                    'Digital Influencer / Fintech'
                  ].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setPartnerType(type)}
                      className={`p-2.5 text-xs font-bold rounded-xl border text-left transition-all ${
                        partnerType === type
                          ? 'border-[#E81E76] bg-pink-50 text-[#E81E76] shadow-2xs'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Full Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Contact Person Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs font-semibold pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#E81E76] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="10-digit phone"
                      pattern="[0-9]{10}"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="w-full text-xs font-semibold pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#E81E76] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Email & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Work Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs font-semibold pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#E81E76] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    City / Location *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Delhi, Mumbai, Pune"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full text-xs font-semibold pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#E81E76] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Monthly Volume */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Expected Monthly Disbursement Volume
                </label>
                <select
                  value={monthlyVolume}
                  onChange={(e) => setMonthlyVolume(e.target.value)}
                  className="w-full text-xs font-semibold px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#E81E76] focus:outline-none"
                >
                  <option value="Less than ₹25 Lakhs">Less than ₹25 Lakhs</option>
                  <option value="₹25 Lakhs - ₹50 Lakhs">₹25 Lakhs - ₹50 Lakhs</option>
                  <option value="₹50 Lakhs - ₹1 Crore">₹50 Lakhs - ₹1 Crore</option>
                  <option value="₹1 Crore - ₹5 Crores">₹1 Crore - ₹5 Crores</option>
                  <option value="₹5 Crores+">₹5 Crores+</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 bg-[#1e40af] hover:bg-[#1d4ed8] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                id="submit-partner-application-btn"
              >
                <span>Submit Partner Application</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
