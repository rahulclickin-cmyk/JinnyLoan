import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  SiteConfig, 
  INITIAL_SITE_CONFIG, 
  HeroBannerConfig, 
  ExclusivePartnerOfferConfig, 
  PopularCategoryConfig, 
  LoanOfferPartnerConfig, 
  CreditCardConfig,
  CardRewardOfferConfig, 
  LendingOfferConfig,
  LendingPartnerConfig,
  TestimonialConfig,
  FaqConfig,
  LapCalculatorConfig,
  LandingPageContentConfig 
} from '../config/siteConfig';

const STORAGE_KEY = 'jinnyloan_site_config_v4';

interface ConfigContextType {
  config: SiteConfig;
  updateHeroBanner: (id: string, updates: Partial<HeroBannerConfig>) => void;
  updateExclusiveOffer: (id: string, updates: Partial<ExclusivePartnerOfferConfig>) => void;
  updatePopularCategory: (id: string, updates: Partial<PopularCategoryConfig>) => void;
  updateLoanOffer: (id: string, updates: Partial<LoanOfferPartnerConfig>) => void;
  updateCreditCard: (id: string, updates: Partial<CreditCardConfig>) => void;
  updateCardReward: (id: string, updates: Partial<CardRewardOfferConfig>) => void;
  updateLendingOffer: (id: string, updates: Partial<LendingOfferConfig>) => void;
  updateLendingPartner: (id: string, updates: Partial<LendingPartnerConfig>) => void;
  updateTestimonial: (id: string, updates: Partial<TestimonialConfig>) => void;
  updateFaq: (id: string, updates: Partial<FaqConfig>) => void;
  updateLapCalculator: (updates: Partial<LapCalculatorConfig>) => void;
  updateLandingPage: (slug: string, updates: Partial<LandingPageContentConfig>) => void;
  resetToDefaults: () => void;
  importConfig: (jsonString: string) => boolean;
  exportConfigJson: () => string;
  handleActionUrl: (urlOrPath: string, fallbackAction?: () => void) => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Deep merge and ensure all array properties are defined arrays
        const heroBanners = Array.isArray(parsed.heroBanners) ? parsed.heroBanners : INITIAL_SITE_CONFIG.heroBanners;
        const exclusiveOffers = Array.isArray(parsed.exclusiveOffers) ? parsed.exclusiveOffers : INITIAL_SITE_CONFIG.exclusiveOffers;
        const popularCategories = Array.isArray(parsed.popularCategories) ? parsed.popularCategories : INITIAL_SITE_CONFIG.popularCategories;
        const loanOffers = Array.isArray(parsed.loanOffers) ? parsed.loanOffers : INITIAL_SITE_CONFIG.loanOffers;
        const creditCards = Array.isArray(parsed.creditCards) ? parsed.creditCards : INITIAL_SITE_CONFIG.creditCards;
        const cardRewards = Array.isArray(parsed.cardRewards) ? parsed.cardRewards : INITIAL_SITE_CONFIG.cardRewards;
        const lendingOffers = Array.isArray(parsed.lendingOffers) ? parsed.lendingOffers : (Array.isArray(parsed.trendingOffers) ? parsed.trendingOffers : INITIAL_SITE_CONFIG.lendingOffers);
        const trendingOffers = Array.isArray(parsed.trendingOffers) ? parsed.trendingOffers : lendingOffers;
        const lendingPartners = Array.isArray(parsed.lendingPartners) ? parsed.lendingPartners : INITIAL_SITE_CONFIG.lendingPartners;
        const testimonials = Array.isArray(parsed.testimonials) ? parsed.testimonials : INITIAL_SITE_CONFIG.testimonials;
        const faqs = Array.isArray(parsed.faqs) ? parsed.faqs : INITIAL_SITE_CONFIG.faqs;
        const lapCalculatorConfig = parsed.lapCalculatorConfig ? { ...INITIAL_SITE_CONFIG.lapCalculatorConfig, ...parsed.lapCalculatorConfig } : INITIAL_SITE_CONFIG.lapCalculatorConfig;

        return {
          heroBanners,
          exclusiveOffers,
          popularCategories,
          loanOffers,
          creditCards,
          cardRewards,
          lendingOffers,
          trendingOffers,
          lendingPartners,
          testimonials,
          faqs,
          lapCalculatorConfig,
          landingPages: { ...INITIAL_SITE_CONFIG.landingPages, ...(parsed.landingPages || {}) }
        };
      }
    } catch (e) {
      console.warn('Failed to load saved configuration, using defaults', e);
    }
    return INITIAL_SITE_CONFIG;
  });

  // Save to localStorage whenever config changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (e) {
      console.error('Failed to save configuration to localStorage', e);
    }
  }, [config]);

  const updateHeroBanner = (id: string, updates: Partial<HeroBannerConfig>) => {
    setConfig(prev => ({
      ...prev,
      heroBanners: (prev.heroBanners || []).map(item => item.id === id ? { ...item, ...updates } : item)
    }));
  };

  const updateExclusiveOffer = (id: string, updates: Partial<ExclusivePartnerOfferConfig>) => {
    setConfig(prev => ({
      ...prev,
      exclusiveOffers: (prev.exclusiveOffers || []).map(item => item.id === id ? { ...item, ...updates } : item)
    }));
  };

  const updatePopularCategory = (id: string, updates: Partial<PopularCategoryConfig>) => {
    setConfig(prev => ({
      ...prev,
      popularCategories: (prev.popularCategories || []).map(item => item.id === id ? { ...item, ...updates } : item)
    }));
  };

  const updateLoanOffer = (id: string, updates: Partial<LoanOfferPartnerConfig>) => {
    setConfig(prev => ({
      ...prev,
      loanOffers: (prev.loanOffers || []).map(item => item.id === id ? { ...item, ...updates } : item)
    }));
  };

  const updateCreditCard = (id: string, updates: Partial<CreditCardConfig>) => {
    setConfig(prev => ({
      ...prev,
      creditCards: (prev.creditCards || []).map(item => item.id === id ? { ...item, ...updates } : item)
    }));
  };

  const updateCardReward = (id: string, updates: Partial<CardRewardOfferConfig>) => {
    setConfig(prev => ({
      ...prev,
      cardRewards: (prev.cardRewards || []).map(item => item.id === id ? { ...item, ...updates } : item)
    }));
  };

  const updateLendingOffer = (id: string, updates: Partial<LendingOfferConfig>) => {
    setConfig(prev => {
      const updatedLending = (prev.lendingOffers || []).map(item => item.id === id ? { ...item, ...updates } : item);
      return {
        ...prev,
        lendingOffers: updatedLending,
        trendingOffers: updatedLending
      };
    });
  };

  const updateLendingPartner = (id: string, updates: Partial<LendingPartnerConfig>) => {
    setConfig(prev => ({
      ...prev,
      lendingPartners: (prev.lendingPartners || []).map(item => item.id === id ? { ...item, ...updates } : item)
    }));
  };

  const updateTestimonial = (id: string, updates: Partial<TestimonialConfig>) => {
    setConfig(prev => ({
      ...prev,
      testimonials: (prev.testimonials || []).map(item => item.id === id ? { ...item, ...updates } : item)
    }));
  };

  const updateFaq = (id: string, updates: Partial<FaqConfig>) => {
    setConfig(prev => ({
      ...prev,
      faqs: (prev.faqs || []).map(item => item.id === id ? { ...item, ...updates } : item)
    }));
  };

  const updateLapCalculator = (updates: Partial<LapCalculatorConfig>) => {
    setConfig(prev => ({
      ...prev,
      lapCalculatorConfig: {
        ...prev.lapCalculatorConfig,
        ...updates
      }
    }));
  };

  const updateLandingPage = (slug: string, updates: Partial<LandingPageContentConfig>) => {
    setConfig(prev => ({
      ...prev,
      landingPages: {
        ...prev.landingPages,
        [slug]: {
          ...(prev.landingPages[slug] || INITIAL_SITE_CONFIG.landingPages[slug] || {}),
          ...updates
        }
      }
    }));
  };

  const resetToDefaults = () => {
    setConfig(INITIAL_SITE_CONFIG);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn(e);
    }
  };

  const importConfig = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && typeof parsed === 'object') {
        const heroBanners = Array.isArray(parsed.heroBanners) ? parsed.heroBanners : INITIAL_SITE_CONFIG.heroBanners;
        const exclusiveOffers = Array.isArray(parsed.exclusiveOffers) ? parsed.exclusiveOffers : INITIAL_SITE_CONFIG.exclusiveOffers;
        const popularCategories = Array.isArray(parsed.popularCategories) ? parsed.popularCategories : INITIAL_SITE_CONFIG.popularCategories;
        const loanOffers = Array.isArray(parsed.loanOffers) ? parsed.loanOffers : INITIAL_SITE_CONFIG.loanOffers;
        const creditCards = Array.isArray(parsed.creditCards) ? parsed.creditCards : INITIAL_SITE_CONFIG.creditCards;
        const cardRewards = Array.isArray(parsed.cardRewards) ? parsed.cardRewards : INITIAL_SITE_CONFIG.cardRewards;
        const lendingOffers = Array.isArray(parsed.lendingOffers) ? parsed.lendingOffers : (Array.isArray(parsed.trendingOffers) ? parsed.trendingOffers : INITIAL_SITE_CONFIG.lendingOffers);
        const trendingOffers = Array.isArray(parsed.trendingOffers) ? parsed.trendingOffers : lendingOffers;

        setConfig({
          heroBanners,
          exclusiveOffers,
          popularCategories,
          loanOffers,
          creditCards,
          cardRewards,
          lendingOffers,
          trendingOffers,
          landingPages: { ...INITIAL_SITE_CONFIG.landingPages, ...(parsed.landingPages || {}) }
        });
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON configuration', e);
    }
    return false;
  };

  const exportConfigJson = (): string => {
    return JSON.stringify(config, null, 2);
  };

  // Safe handler to redirect to third-party vendor URL or internal page
  const handleActionUrl = (urlOrPath: string, fallbackAction?: () => void) => {
    if (!urlOrPath) {
      if (fallbackAction) fallbackAction();
      return;
    }

    const trimmed = urlOrPath.trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      // External vendor URL redirect
      window.open(trimmed, '_blank', 'noopener,noreferrer');
    } else if (trimmed.startsWith('/') || trimmed.startsWith('#')) {
      // Internal route or anchor
      if (window.dispatchEvent) {
        // Dispatch custom navigation event or change hash
        window.location.hash = trimmed.startsWith('/') ? `#${trimmed}` : trimmed;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      if (fallbackAction) fallbackAction();
    }
  };

  return (
    <ConfigContext.Provider
      value={{
        config,
        updateHeroBanner,
        updateExclusiveOffer,
        updatePopularCategory,
        updateLoanOffer,
        updateCreditCard,
        updateCardReward,
        updateLendingOffer,
        updateLendingPartner,
        updateTestimonial,
        updateFaq,
        updateLapCalculator,
        updateLandingPage,
        resetToDefaults,
        importConfig,
        exportConfigJson,
        handleActionUrl
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useSiteConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useSiteConfig must be used within a ConfigProvider');
  }
  return context;
};
