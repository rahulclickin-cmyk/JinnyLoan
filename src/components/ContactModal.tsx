import React, { useState } from 'react';
import { 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare
} from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    loanType: 'Home Loan',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      loanType: 'Home Loan',
      message: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-slate-200 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-[#E81E76] text-white p-6 sm:p-8 rounded-t-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-pink-200 text-xs font-bold uppercase tracking-wider mb-2 backdrop-blur-xs">
            <Phone className="w-3.5 h-3.5 text-pink-200" />
            <span>Contact Us</span>
          </div>
          <h3 className="text-2xl font-black font-['Outfit',sans-serif]">
            Get In Touch with JinnyLoan
          </h3>
          <p className="text-xs sm:text-sm text-blue-100 mt-1">
            Have questions about your loan application, interest rates, or documentation? We are here to help.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Quick Contact Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href="tel:+918006488006"
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-pink-300 hover:bg-pink-50/50 transition-colors group block"
            >
              <div className="w-9 h-9 rounded-xl bg-pink-100 text-[#E81E76] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <Phone className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-slate-500 block uppercase">Call Us Directly</span>
              <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#E81E76] mt-0.5 block">
                +91 8006488006
              </span>
            </a>

            <a
              href="mailto:info@jinnyloan.com"
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-colors group block"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#1e40af] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <Mail className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-slate-500 block uppercase">Email Support</span>
              <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#1e40af] mt-0.5 block">
                info@jinnyloan.com
              </span>
            </a>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-9 h-9 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center mb-2">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-slate-500 block uppercase">Working Hours</span>
              <span className="text-xs font-bold text-slate-900 mt-0.5 block">
                10 AM - 7 PM (Mon-Sat)
              </span>
            </div>
          </div>

          {/* Office Address Bar */}
          <div className="p-4 bg-pink-50/60 border border-pink-200 rounded-2xl flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[#E81E76] flex-shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-slate-900 block">Registered Office Address:</span>
              <span className="text-slate-700">R 123 Gali No 06 Laxminagar Delhi 110092, India</span>
            </div>
          </div>

          {/* Contact Inquiry Form */}
          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="text-lg font-bold text-slate-900">Message Received!</h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Thank you, <strong>{formData.name}</strong>. Our loan advisory desk will contact you at <strong>{formData.phone}</strong> shortly.
              </p>
              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-[#E81E76] text-white font-bold text-xs rounded-xl shadow-xs hover:bg-[#c2145e] transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900">
                Send a Direct Message
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-xs font-semibold px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#E81E76] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    maxLength={10}
                    placeholder="10-digit number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs font-semibold px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#E81E76] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full text-xs font-semibold px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#E81E76] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Message or Loan Requirement</label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your loan query or requirement..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full text-xs font-semibold px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#E81E76] focus:outline-none"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-[#1e40af] hover:bg-[#1d4ed8] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Loan Desk</span>
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
