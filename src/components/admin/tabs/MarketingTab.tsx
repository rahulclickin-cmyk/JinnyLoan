import React, { useState } from 'react';
import { 
  Megaphone, 
  ShieldCheck, 
  MessageSquare, 
  Sparkles, 
  CheckCircle2, 
  Save, 
  Eye,
  Sliders,
  BellRing
} from 'lucide-react';
import { useSiteConfig } from '../../../context/ConfigContext';

export const MarketingTab: React.FC = () => {
  const { config, updateHeroBanner } = useSiteConfig();
  const [toast, setToast] = useState<string | null>(null);

  const [tickerText, setTickerText] = useState('⚡ Lowest Rates Guaranteed: Personal Loan from 9.99% p.a. • Home Loan from 7.10% p.a. • Collateral-Free Business Loans up to ₹50 Lakhs • 5% Cashback Lifetime Free Credit Cards • 100+ RBI Regulated Partners');
  const [tickerActive, setTickerActive] = useState(true);
  const [welcomeModalActive, setWelcomeModalActive] = useState(true);
  const [supportPhone, setSupportPhone] = useState('8006488006');
  const [supportGreeting, setSupportGreeting] = useState('Hi JinnyLoan, I want to check my Loan Eligibility.');

  const handleSaveMarketing = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem('jinnyloan_marketing_config', JSON.stringify({
        tickerText,
        tickerActive,
        welcomeModalActive,
        supportPhone,
        supportGreeting
      }));
    } catch {}
    setToast('Marketing & promotional settings saved!');
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
              Banners, Marquee & Marketing Promos
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#E81E76] text-white">
              Live Promos
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure header offer tickers, fraud advisory notifications, and floating WhatsApp support channels.
          </p>
        </div>
      </div>

      <form onSubmit={handleSaveMarketing} className="space-y-5">
        
        {/* TICKER MARQUEE */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-[#E81E76]" />
              <h3 className="text-sm font-bold text-slate-900">
                Top Bar Loan Offers Marquee Ticker
              </h3>
            </div>
            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={tickerActive}
                onChange={e => setTickerActive(e.target.checked)}
                className="w-4 h-4 rounded text-[#E81E76]"
              />
              <span>Active</span>
            </label>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Marquee Announcement Text
            </label>
            <textarea
              rows={3}
              value={tickerText}
              onChange={e => setTickerText(e.target.value)}
              className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              Continuously loops across top bar above navigation on desktop and mobile.
            </p>
          </div>
        </div>

        {/* WELCOME POPUP & FRAUD NOTICE */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900">
                Welcome Offer & RBI Anti-Fraud Advisory Popup
              </h3>
            </div>
            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={welcomeModalActive}
                onChange={e => setWelcomeModalActive(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600"
              />
              <span>Enabled</span>
            </label>
          </div>

          <p className="text-xs text-slate-600">
            Advises prospective customers that JinnyLoan services are completely free, and protects against fraudulent agents requesting upfront advance processing fees.
          </p>

          <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 text-xs text-blue-900 space-y-1">
            <p className="font-bold">Notice Text Active:</p>
            <p className="text-[11px] text-blue-800">
              "Beware of unauthorized agents. JinnyLoan never charges any processing fee, security deposit, or file charge before loan disbursement. All payouts occur directly from RBI-licensed banks."
            </p>
          </div>
        </div>

        {/* WHATSAPP SUPPORT INTEGRATION */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900">
                Floating WhatsApp Support Desk
              </h3>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              Live Widget
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                WhatsApp Hotline Mobile Number
              </label>
              <div className="flex items-center">
                <span className="px-3 py-2 bg-slate-100 border border-r-0 border-slate-200 rounded-l-xl text-xs font-bold text-slate-600">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  value={supportPhone}
                  onChange={e => setSupportPhone(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-r-xl focus:outline-none font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Default Pre-filled Greeting
              </label>
              <input
                type="text"
                value={supportGreeting}
                onChange={e => setSupportGreeting(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#E81E76] hover:bg-[#d01566] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save Marketing Configurations</span>
          </button>
        </div>

      </form>
    </div>
  );
};
