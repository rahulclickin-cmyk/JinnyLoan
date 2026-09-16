import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { BankOffersSlider } from './components/BankOffersSlider';
import { StatsSection } from './components/StatsSection';
import { LoanProductsGrid } from './components/LoanProductsGrid';
import { LoanOffersSection } from './components/LoanOffersSection';
import { ExploreCreditCardsSection } from './components/ExploreCreditCardsSection';
import { MoreRewardsOnCardsSection } from './components/MoreRewardsOnCardsSection';
import { TrendingOffersSection } from './components/TrendingOffersSection';
import { CalculatorSection } from './components/CalculatorSection';
import { OurPartnersSection } from './components/OurPartnersSection';
import { PartnerWithUsBanner } from './components/PartnerWithUsBanner';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { ApplyModal } from './components/ApplyModal';
import { AboutModal } from './components/AboutModal';
import { ContactModal } from './components/ContactModal';
import { PartnerModal } from './components/PartnerModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { MessageSquare } from 'lucide-react';
import { useRouter } from './context/RouterContext';
import { ProductPage } from './components/pages/ProductPage';
import { PRODUCT_PAGES_DATA } from './data/productPagesData';
import { AdminConfigModal } from './components/admin/AdminConfigModal';

export function App() {
  const { currentPath, navigate, isHome } = useRouter();

  // Modal states
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Prefilled parameters for Apply Modal
  const [selectedBank, setSelectedBank] = useState<string | undefined>(undefined);
  const [selectedAmount, setSelectedAmount] = useState<number | undefined>(undefined);
  const [selectedTenure, setSelectedTenure] = useState<number | undefined>(undefined);

  // Keyboard shortcut listener for Admin modal (Ctrl + Shift + A or Alt + Shift + A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey || e.altKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsAdminModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Listen to #/admin or /admin path
  useEffect(() => {
    if (currentPath === '/admin') {
      setIsAdminModalOpen(true);
    }
  }, [currentPath]);

  const handleOpenApplyModal = (bankName?: string) => {
    setSelectedBank(bankName);
    setIsApplyModalOpen(true);
  };

  const handleOpenApplyWithCalculatorDetails = (amount: number, tenureYears: number, bank?: string) => {
    setSelectedAmount(amount);
    setSelectedTenure(tenureYears);
    setSelectedBank(bank || 'Any Top Bank');
    setIsApplyModalOpen(true);
  };

  const scrollToCalculator = () => {
    const el = document.getElementById('calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Determine if current path is a product page
  const normalizedPath = currentPath.startsWith('/') ? currentPath : `/${currentPath}`;
  const productData = PRODUCT_PAGES_DATA[normalizedPath];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-['Plus_Jakarta_Sans',sans-serif] flex flex-col selection:bg-[#E81E76] selection:text-white pb-16 md:pb-0">
      
      {/* 1. Global Header with Contact Bar & Sticky Navigation */}
      <Header
        onOpenApplyModal={handleOpenApplyModal}
        onOpenContactModal={() => setIsContactModalOpen(true)}
        onOpenAboutModal={() => setIsAboutModalOpen(true)}
        onOpenPartnerModal={() => setIsPartnerModalOpen(true)}
      />

      {/* Main Content Sections: Product Page or Main Landing Page */}
      <main className="flex-grow">
        {productData ? (
          <ProductPage 
            data={productData} 
            onOpenApplyModal={handleOpenApplyModal} 
          />
        ) : (
          <>
            {/* SECTION 1: Hero / Banner */}
            <HeroSection
              onOpenApplyModal={handleOpenApplyModal}
              onNavigateToCalculator={scrollToCalculator}
            />

            {/* SECTION 2: Live Bank Offers Slider (Gently & Slowly Sliding Bank Deals) */}
            <BankOffersSlider
              onOpenApplyModal={handleOpenApplyModal}
            />

            {/* SECTION 3: Trusted by Thousands (Stats cards) */}
            <StatsSection />

            {/* SECTION 4: Explore Loan Products Grid */}
            <LoanProductsGrid
              onOpenApplyModal={handleOpenApplyModal}
            />

            {/* SECTION 5A: Loan Offers (Horizontal Instant Sanction Cards) */}
            <LoanOffersSection
              onOpenApplyModal={handleOpenApplyModal}
            />

            {/* SECTION 5B: Explore Credit Cards (Cashback & Reward Cards) */}
            <ExploreCreditCardsSection
              onOpenApplyModal={handleOpenApplyModal}
            />

            {/* SECTION 5C: More Rewards on Cards (Promotional Reward Banners) */}
            <MoreRewardsOnCardsSection
              onOpenApplyModal={handleOpenApplyModal}
            />

            {/* SECTION 5D: Trending Loan Offers & Curated Deals (Horizontal Left-to-Right Slider) */}
            <TrendingOffersSection
              onOpenApplyModal={handleOpenApplyModal}
            />

            {/* SECTION 6: Home Loan Calculator (Interactive inputs, EMI/totals, schedule) */}
            <CalculatorSection
              onOpenApplyModalWithDetails={handleOpenApplyWithCalculatorDetails}
            />

            {/* SECTION 7: 100+ Partner Lending Institutions */}
            <OurPartnersSection
              onOpenApplyModal={handleOpenApplyModal}
            />

            {/* SECTION 14: Partner With Us / DSA Connector Banner */}
            <PartnerWithUsBanner
              onOpenPartnerModal={() => setIsPartnerModalOpen(true)}
            />

            {/* SECTION 15: Real Stories from Real Borrowers (Testimonials) */}
            <TestimonialsSection />

            {/* SECTION 16: Frequently Asked Questions (Accordion) */}
            <FaqSection
              onOpenContactModal={() => setIsContactModalOpen(true)}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenApplyModal={() => handleOpenApplyModal()}
        onOpenAboutModal={() => setIsAboutModalOpen(true)}
        onOpenContactModal={() => setIsContactModalOpen(true)}
        onOpenPartnerModal={() => setIsPartnerModalOpen(true)}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
      />

      {/* Floating Desktop WhatsApp Button */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-2.5">
        <a
          href="https://wa.me/918006488006?text=Hi%20JinnyLoan,%20I%20want%20to%20check%20my%20Loan%20Eligibility."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-full shadow-xl shadow-emerald-900/30 hover:shadow-2xl transition-all transform hover:scale-105 group cursor-pointer"
          id="floating-whatsapp-btn"
          aria-label="WhatsApp Support"
        >
          <MessageSquare className="w-5 h-5 fill-white/20" />
          <span className="text-xs font-bold">WhatsApp Help (+91 8006488006)</span>
        </a>
      </div>

      {/* Native App-Style Mobile Bottom Navigation Dock */}
      <MobileBottomNav
        onOpenApplyModal={handleOpenApplyModal}
        onOpenContactModal={() => setIsContactModalOpen(true)}
        onOpenAboutModal={() => setIsAboutModalOpen(true)}
      />

      {/* Interactive Application Modal */}
      <ApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        defaultBank={selectedBank}
        defaultAmount={selectedAmount}
        defaultTenureYears={selectedTenure}
      />

      {/* About Us Modal */}
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
        onOpenApplyModal={() => {
          setIsAboutModalOpen(false);
          handleOpenApplyModal();
        }}
      />

      {/* Contact Us Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      {/* Partner / DSA Registration Modal */}
      <PartnerModal
        isOpen={isPartnerModalOpen}
        onClose={() => setIsPartnerModalOpen(false)}
      />

      {/* Admin Partner & Content Configuration Modal */}
      <AdminConfigModal
        isOpen={isAdminModalOpen}
        onClose={() => {
          setIsAdminModalOpen(false);
          if (currentPath === '/admin') {
            navigate('/');
          }
        }}
      />

    </div>
  );
}

export default App;
