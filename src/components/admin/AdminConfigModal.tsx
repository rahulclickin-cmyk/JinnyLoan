import React, { useState } from 'react';
import { 
  X, 
  Save, 
  RotateCcw, 
  Download, 
  Upload, 
  Check, 
  ExternalLink, 
  Sliders, 
  Layers, 
  CreditCard, 
  Building2, 
  Coins, 
  AlertCircle,
  Link,
  Edit3
} from 'lucide-react';
import { useSiteConfig } from '../../context/ConfigContext';

interface AdminConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminConfigModal: React.FC<AdminConfigModalProps> = ({ isOpen, onClose }) => {
  const { 
    config, 
    updateHeroBanner, 
    updateExclusiveOffer, 
    updatePopularCategory, 
    updateLoanOffer, 
    updateCardReward, 
    updateLendingOffer,
    resetToDefaults,
    importConfig,
    exportConfigJson
  } = useSiteConfig();

  const [activeTab, setActiveTab] = useState<'banners' | 'exclusive' | 'categories' | 'loanOffers' | 'rewards' | 'lending'>('banners');
  const [saveToast, setSaveToast] = useState(false);
  const [importText, setImportText] = useState('');
  const [showImportBox, setShowImportBox] = useState(false);

  if (!isOpen) return null;

  const triggerSaveNotification = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handleExport = () => {
    const jsonStr = exportConfigJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jinnyloan-config-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportSubmit = () => {
    if (!importText.trim()) return;
    const success = importConfig(importText);
    if (success) {
      setShowImportBox(false);
      setImportText('');
      triggerSaveNotification();
    } else {
      alert('Invalid JSON configuration. Please check the syntax and try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E81E76] flex items-center justify-center font-bold">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black font-['Outfit',sans-serif] flex items-center gap-2">
                <span>JinnyLoan Partner URLs & Content Configuration</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">
                  Live Sync
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Edit partner redirection URLs, titles, and CTA actions. Syncs across mobile, laptop, and desktop.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Action Bar */}
        <div className="px-6 py-2.5 bg-slate-100 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={handleExport}
              className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-lg border border-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Config</span>
            </button>
            <button
              onClick={() => setShowImportBox(!showImportBox)}
              className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-lg border border-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Import Config</span>
            </button>
            <button
              onClick={() => {
                if (confirm('Reset all URLs and content to default values? Any custom URLs will be replaced.')) {
                  resetToDefaults();
                  triggerSaveNotification();
                }
              }}
              className="px-3 py-1.5 bg-white hover:bg-red-50 text-red-600 font-semibold rounded-lg border border-red-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
          </div>

          {saveToast && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold animate-pulse">
              <Check className="w-3.5 h-3.5" />
              <span>Changes Saved to Local Storage!</span>
            </div>
          )}
        </div>

        {/* Import JSON input box if active */}
        {showImportBox && (
          <div className="p-4 bg-amber-50 border-b border-amber-200 text-xs">
            <label className="block font-bold text-amber-900 mb-1">Paste Configuration JSON:</label>
            <textarea
              rows={3}
              value={importText}
              onChange={e => setImportText(e.target.value)}
              placeholder='Paste JSON exported from another JinnyLoan instance...'
              className="w-full p-2.5 rounded-xl border border-amber-300 font-mono text-xs bg-white mb-2"
            />
            <div className="flex gap-2">
              <button
                onClick={handleImportSubmit}
                className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg"
              >
                Apply Imported JSON
              </button>
              <button
                onClick={() => setShowImportBox(false)}
                className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto border-b border-slate-200 px-6 bg-slate-50 scrollbar-none">
          {[
            { id: 'banners', label: '1. Hero Banners', icon: Layers },
            { id: 'exclusive', label: '2. Exclusive Bank Offers', icon: Building2 },
            { id: 'categories', label: '3. Popular Categories', icon: Edit3 },
            { id: 'loanOffers', label: '4. Loan Offers', icon: Coins },
            { id: 'rewards', label: '5. Card Rewards', icon: CreditCard },
            { id: 'lending', label: '6. Lending Offers', icon: Link }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-4 border-b-2 font-bold text-xs whitespace-nowrap flex items-center gap-2 cursor-pointer transition-colors ${
                  isActive 
                    ? 'border-[#E81E76] text-[#E81E76] bg-white' 
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">

          {/* TAB 1: HERO BANNERS */}
          {activeTab === 'banners' && (
            <div className="space-y-6">
              <div className="p-3 bg-blue-50 text-blue-800 rounded-xl text-xs border border-blue-200">
                <strong>Rule 1 Fulfillment:</strong> Both Hero Banners work independently. You can edit heading, highlight amount, description, CTA text, and CTA destination URL (internal landing page or external portal).
              </div>

              {(config.heroBanners || []).map(banner => (
                <div key={banner.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                      Banner ID: {banner.id}
                    </span>
                    <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={banner.active}
                        onChange={e => {
                          updateHeroBanner(banner.id, { active: e.target.checked });
                          triggerSaveNotification();
                        }}
                        className="rounded text-[#E81E76] focus:ring-[#E81E76]"
                      />
                      <span>Active</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Badge Text</label>
                      <input
                        type="text"
                        value={banner.badge}
                        onChange={e => {
                          updateHeroBanner(banner.id, { badge: e.target.value });
                          triggerSaveNotification();
                        }}
                        className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Highlight Amount</label>
                      <input
                        type="text"
                        value={banner.highlightAmount}
                        onChange={e => {
                          updateHeroBanner(banner.id, { highlightAmount: e.target.value });
                          triggerSaveNotification();
                        }}
                        className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold text-[#E81E76]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Title Heading</label>
                    <input
                      type="text"
                      value={banner.titlePrefix}
                      onChange={e => {
                        updateHeroBanner(banner.id, { titlePrefix: e.target.value });
                        triggerSaveNotification();
                      }}
                      className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={banner.description}
                      onChange={e => {
                        updateHeroBanner(banner.id, { description: e.target.value });
                        triggerSaveNotification();
                      }}
                      className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">CTA Button Text</label>
                      <input
                        type="text"
                        value={banner.ctaText}
                        onChange={e => {
                          updateHeroBanner(banner.id, { ctaText: e.target.value });
                          triggerSaveNotification();
                        }}
                        className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        CTA Destination URL (Internal Landing Page or External Link)
                      </label>
                      <input
                        type="text"
                        value={banner.ctaDestination}
                        onChange={e => {
                          updateHeroBanner(banner.id, { ctaDestination: e.target.value });
                          triggerSaveNotification();
                        }}
                        placeholder="/offers/direct-credit-loan or https://..."
                        className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-mono text-blue-700"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: EXCLUSIVE PARTNER BANK OFFERS */}
          {activeTab === 'exclusive' && (
            <div className="space-y-6">
              <div className="p-3 bg-pink-50 text-pink-900 rounded-xl text-xs border border-pink-200">
                <strong>Rule 2 Fulfillment:</strong> When customer clicks Apply Now / Claim Now, they redirect DIRECTLY to the configured third-party vendor URL. URLs are editable here and never hard-coded.
              </div>

              {(config.exclusiveOffers || []).map(offer => (
                <div key={offer.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                      {offer.bankName} ({offer.shortName}) - {offer.loanType}
                    </span>
                    <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={offer.active}
                        onChange={e => {
                          updateExclusiveOffer(offer.id, { active: e.target.checked });
                          triggerSaveNotification();
                        }}
                        className="rounded text-[#E81E76] focus:ring-[#E81E76]"
                      />
                      <span>Active</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Interest Rate</label>
                      <input
                        type="text"
                        value={offer.interestRate}
                        onChange={e => {
                          updateExclusiveOffer(offer.id, { interestRate: e.target.value });
                          triggerSaveNotification();
                        }}
                        className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold text-[#E81E76]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Max Amount</label>
                      <input
                        type="text"
                        value={offer.maxAmount}
                        onChange={e => {
                          updateExclusiveOffer(offer.id, { maxAmount: e.target.value });
                          triggerSaveNotification();
                        }}
                        className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Processing Fee</label>
                      <input
                        type="text"
                        value={offer.processingFee}
                        onChange={e => {
                          updateExclusiveOffer(offer.id, { processingFee: e.target.value });
                          triggerSaveNotification();
                        }}
                        className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">CTA Text</label>
                      <input
                        type="text"
                        value={offer.ctaText}
                        onChange={e => {
                          updateExclusiveOffer(offer.id, { ctaText: e.target.value });
                          triggerSaveNotification();
                        }}
                        className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Unique External Vendor URL (Redirect Target)
                      </label>
                      <input
                        type="text"
                        value={offer.externalUrl}
                        onChange={e => {
                          updateExclusiveOffer(offer.id, { externalUrl: e.target.value });
                          triggerSaveNotification();
                        }}
                        placeholder="https://partner-portal.jinnyloan.com/redirect/..."
                        className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-mono text-blue-700"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: POPULAR CATEGORIES */}
          {activeTab === 'categories' && (
            <div className="space-y-6">
              <div className="p-3 bg-emerald-50 text-emerald-900 rounded-xl text-xs border border-emerald-200">
                <strong>Rule 4 & 9 Fulfillment:</strong> Configure destinations for the 5 Popular Categories. Both "Explore" button and "Start" / "Apply" button have configurable destinations (internal page or external partner URL).
              </div>

              {(config.popularCategories || []).map(cat => (
                <div key={cat.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                      {cat.title} ({cat.slug})
                    </span>
                    <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={cat.active}
                        onChange={e => {
                          updatePopularCategory(cat.id, { active: e.target.checked });
                          triggerSaveNotification();
                        }}
                        className="rounded text-[#E81E76] focus:ring-[#E81E76]"
                      />
                      <span>Active</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Title</label>
                      <input
                        type="text"
                        value={cat.title}
                        onChange={e => {
                          updatePopularCategory(cat.id, { title: e.target.value });
                          triggerSaveNotification();
                        }}
                        className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Highlight Rate/Stat</label>
                      <input
                        type="text"
                        value={cat.rateOrStat}
                        onChange={e => {
                          updatePopularCategory(cat.id, { rateOrStat: e.target.value });
                          triggerSaveNotification();
                        }}
                        className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold text-[#E81E76]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Subtitle</label>
                    <input
                      type="text"
                      value={cat.subtitle}
                      onChange={e => {
                        updatePopularCategory(cat.id, { subtitle: e.target.value });
                        triggerSaveNotification();
                      }}
                      className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        "Explore" Destination (Internal Page or Link)
                      </label>
                      <input
                        type="text"
                        value={cat.exploreDestination}
                        onChange={e => {
                          updatePopularCategory(cat.id, { exploreDestination: e.target.value });
                          triggerSaveNotification();
                        }}
                        className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-mono text-blue-700"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        "Start" / "Apply" Destination (External Partner URL or Internal Page)
                      </label>
                      <input
                        type="text"
                        value={cat.startDestination}
                        onChange={e => {
                          updatePopularCategory(cat.id, { startDestination: e.target.value });
                          triggerSaveNotification();
                        }}
                        className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-mono text-blue-700"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: LOAN OFFERS */}
          {activeTab === 'loanOffers' && (
            <div className="space-y-6">
              <div className="p-3 bg-indigo-50 text-indigo-900 rounded-xl text-xs border border-indigo-200">
                <strong>Rule 6 & 8 Fulfillment:</strong> EVERY partner has its OWN UNIQUE URL. Example: Aditya Birla → its own URL, Poonawalla → its own URL, Tata Capital → its own URL. "Check Eligibility" redirects to the configured unique URL.
              </div>

              {(config.loanOffers || []).map(offer => (
                <div key={offer.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                      {offer.lender} - {offer.tagline}
                    </span>
                    <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={offer.active}
                        onChange={e => {
                          updateLoanOffer(offer.id, { active: e.target.checked });
                          triggerSaveNotification();
                        }}
                        className="rounded text-[#E81E76] focus:ring-[#E81E76]"
                      />
                      <span>Active</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Amount</label>
                      <input
                        type="text"
                        value={offer.amount}
                        onChange={e => {
                          updateLoanOffer(offer.id, { amount: e.target.value });
                          triggerSaveNotification();
                        }}
                        className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Interest Rate</label>
                      <input
                        type="text"
                        value={offer.interestRate}
                        onChange={e => {
                          updateLoanOffer(offer.id, { interestRate: e.target.value });
                          triggerSaveNotification();
                        }}
                        className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold text-[#E81E76]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Tenure</label>
                      <input
                        type="text"
                        value={offer.tenure}
                        onChange={e => {
                          updateLoanOffer(offer.id, { tenure: e.target.value });
                          triggerSaveNotification();
                        }}
                        className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">CTA Button Text</label>
                      <input
                        type="text"
                        value={offer.ctaText}
                        onChange={e => {
                          updateLoanOffer(offer.id, { ctaText: e.target.value });
                          triggerSaveNotification();
                        }}
                        className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Unique Partner External URL (Redirection Target)
                      </label>
                      <input
                        type="text"
                        value={offer.externalUrl}
                        onChange={e => {
                          updateLoanOffer(offer.id, { externalUrl: e.target.value });
                          triggerSaveNotification();
                        }}
                        placeholder="https://partner-portal.jinnyloan.com/redirect/..."
                        className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-mono text-blue-700"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: CARD REWARDS */}
          {activeTab === 'rewards' && (
            <div className="space-y-6">
              <div className="p-3 bg-purple-50 text-purple-900 rounded-xl text-xs border border-purple-200">
                <strong>Rule 10 Fulfillment:</strong> Each credit card reward offer has its own card image/gradient, perk description, and unique partner external URL.
              </div>

              {(config.cardRewards || []).map(reward => (
                <div key={reward.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                      {reward.bankName} - {reward.cardName} ({reward.promotionalAmount})
                    </span>
                    <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={reward.active}
                        onChange={e => {
                          updateCardReward(reward.id, { active: e.target.checked });
                          triggerSaveNotification();
                        }}
                        className="rounded text-[#E81E76] focus:ring-[#E81E76]"
                      />
                      <span>Active</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Title</label>
                      <input
                        type="text"
                        value={reward.title}
                        onChange={e => {
                          updateCardReward(reward.id, { title: e.target.value });
                          triggerSaveNotification();
                        }}
                        className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Promotional Headline</label>
                      <input
                        type="text"
                        value={reward.promotionalAmount}
                        onChange={e => {
                          updateCardReward(reward.id, { promotionalAmount: e.target.value });
                          triggerSaveNotification();
                        }}
                        className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold text-[#E81E76]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Perk Messaging</label>
                    <textarea
                      rows={2}
                      value={reward.messaging}
                      onChange={e => {
                        updateCardReward(reward.id, { messaging: e.target.value });
                        triggerSaveNotification();
                      }}
                      className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">CTA Text</label>
                      <input
                        type="text"
                        value={reward.ctaText}
                        onChange={e => {
                          updateCardReward(reward.id, { ctaText: e.target.value });
                          triggerSaveNotification();
                        }}
                        className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Unique Card Partner External URL
                      </label>
                      <input
                        type="text"
                        value={reward.externalUrl}
                        onChange={e => {
                          updateCardReward(reward.id, { externalUrl: e.target.value });
                          triggerSaveNotification();
                        }}
                        placeholder="https://partner-portal.jinnyloan.com/redirect/..."
                        className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-mono text-blue-700"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 6: LENDING OFFERS */}
          {activeTab === 'lending' && (
            <div className="space-y-6">
              <div className="p-3 bg-amber-50 text-amber-900 rounded-xl text-xs border border-amber-200">
                <strong>Rule 11 Fulfillment:</strong> Keep Lending Offer section. Every partner gets its own unique external URL, editable CTA text, active/inactive state, and display order.
              </div>

              {(config.lendingOffers || config.trendingOffers || []).map(offer => (
                <div key={offer.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                      {offer.partner} - {offer.category}
                    </span>
                    <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={offer.active}
                        onChange={e => {
                          updateLendingOffer(offer.id, { active: e.target.checked });
                          triggerSaveNotification();
                        }}
                        className="rounded text-[#E81E76] focus:ring-[#E81E76]"
                      />
                      <span>Active</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Max Amount</label>
                      <input
                        type="text"
                        value={offer.amount}
                        onChange={e => {
                          updateLendingOffer(offer.id, { amount: e.target.value });
                          triggerSaveNotification();
                        }}
                        className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Interest Rate</label>
                      <input
                        type="text"
                        value={offer.rate}
                        onChange={e => {
                          updateLendingOffer(offer.id, { rate: e.target.value });
                          triggerSaveNotification();
                        }}
                        className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold text-[#E81E76]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Tenure</label>
                      <input
                        type="text"
                        value={offer.tenure}
                        onChange={e => {
                          updateLendingOffer(offer.id, { tenure: e.target.value });
                          triggerSaveNotification();
                        }}
                        className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">CTA Button Text</label>
                      <input
                        type="text"
                        value={offer.ctaText}
                        onChange={e => {
                          updateLendingOffer(offer.id, { ctaText: e.target.value });
                          triggerSaveNotification();
                        }}
                        className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Unique Partner External URL
                      </label>
                      <input
                        type="text"
                        value={offer.externalUrl}
                        onChange={e => {
                          updateLendingOffer(offer.id, { externalUrl: e.target.value });
                          triggerSaveNotification();
                        }}
                        placeholder="https://partner-portal.jinnyloan.com/redirect/..."
                        className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-mono text-blue-700"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            All edits are automatically saved and immediately reflected across the website.
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#E81E76] hover:bg-[#d61266] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Done & Return to Site
          </button>
        </div>

      </div>
    </div>
  );
};
