import React, { useState } from 'react';
import { 
  CreditCard, 
  Sparkles, 
  Plus, 
  Edit3, 
  Gift, 
  Tag, 
  Check, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useSiteConfig } from '../../../context/ConfigContext';
import { CreditCardConfig } from '../../../config/siteConfig';

export const CreditCardsTab: React.FC = () => {
  const { config, updateCreditCard } = useSiteConfig();
  const [editingCard, setEditingCard] = useState<CreditCardConfig | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const cards = config.creditCards || [];

  const handleSaveCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCard) return;
    updateCreditCard(editingCard.id, {
      title: editingCard.title,
      bank: editingCard.bank,
      annualFee: editingCard.annualFee,
      benefitText: editingCard.benefitText,
      badge: editingCard.badge,
      bestFor: editingCard.bestFor,
      externalUrl: editingCard.externalUrl,
      active: editingCard.active
    });
    setToast(`${editingCard.title} saved successfully!`);
    setTimeout(() => setToast(null), 2500);
    setEditingCard(null);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-700 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
              Credit Cards & Rewards Manager
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#E81E76] text-white">
              {cards.length} Cards Catalogued
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage card issuers, lifetime free tags, annual fees, cashback rewards & direct application links.
          </p>
        </div>
      </div>

      {/* CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(card => (
          <div 
            key={card.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
          >
            {/* Card visual header */}
            <div className={`p-4 bg-gradient-to-r ${card.gradient || 'from-slate-900 to-slate-800'} text-white relative`}>
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-md">
                  {card.bank}
                </span>
                {card.badge && (
                  <span className="text-[10px] font-black bg-[#E81E76] text-white px-2 py-0.5 rounded-full">
                    {card.badge}
                  </span>
                )}
              </div>
              <h4 className="font-black text-base font-['Outfit',sans-serif] mt-1">{card.title}</h4>
              <p className="text-[11px] text-white/80 mt-1 line-clamp-1">{card.bestFor}</p>
            </div>

            {/* Card details body */}
            <div className="p-4 space-y-2 text-xs flex-1">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Annual Fee:</span>
                <span className="font-bold text-slate-900">{card.annualFee}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Network:</span>
                <span className="font-bold uppercase text-slate-700">{card.network || 'Visa'}</span>
              </div>
              <div className="pt-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold block mb-0.5">Key Benefit:</span>
                <p className="font-semibold text-slate-700 leading-snug">{card.benefitText}</p>
              </div>

              {card.externalUrl && (
                <div className="pt-1 flex items-center gap-1 text-[11px] text-blue-600 font-mono truncate">
                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{card.externalUrl}</span>
                </div>
              )}
            </div>

            {/* Footer actions */}
            <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  updateCreditCard(card.id, { active: !card.active });
                }}
                className={`text-[10px] font-bold px-2.5 py-1 rounded-full cursor-pointer ${
                  card.active !== false ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                }`}
              >
                {card.active !== false ? '● ACTIVE' : '○ DISABLED'}
              </button>

              <button
                onClick={() => setEditingCard(card)}
                className="px-3 py-1 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" />
                <span>Edit Card</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editingCard && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-100 relative">
            <h3 className="text-lg font-black text-slate-900 mb-1">
              Edit Credit Card: {editingCard.title}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Update fee structure, key benefits, and affiliate application destination.
            </p>

            <form onSubmit={handleSaveCard} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Card Title</label>
                <input
                  type="text"
                  required
                  value={editingCard.title}
                  onChange={e => setEditingCard({ ...editingCard, title: e.target.value })}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Bank Issuer</label>
                  <input
                    type="text"
                    required
                    value={editingCard.bank}
                    onChange={e => setEditingCard({ ...editingCard, bank: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Promo Badge</label>
                  <input
                    type="text"
                    value={editingCard.badge || ''}
                    placeholder="e.g. Lifetime Free"
                    onChange={e => setEditingCard({ ...editingCard, badge: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Annual Fee</label>
                  <input
                    type="text"
                    value={editingCard.annualFee}
                    onChange={e => setEditingCard({ ...editingCard, annualFee: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Best For</label>
                  <input
                    type="text"
                    value={editingCard.bestFor}
                    onChange={e => setEditingCard({ ...editingCard, bestFor: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Benefit Text</label>
                <textarea
                  rows={2}
                  value={editingCard.benefitText}
                  onChange={e => setEditingCard({ ...editingCard, benefitText: e.target.value })}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Direct Affiliate URL</label>
                <input
                  type="url"
                  placeholder="https://bank.com/apply-card"
                  value={editingCard.externalUrl || ''}
                  onChange={e => setEditingCard({ ...editingCard, externalUrl: e.target.value })}
                  className="w-full text-xs font-mono px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingCard(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#E81E76] hover:bg-[#d01566] text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
                >
                  Save Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
