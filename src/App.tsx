import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { BankOffersSlider } from './components/BankOffersSlider';
import { StatsSection } from './components/StatsSection';
import { LoanProductsGrid } from './components/LoanProductsGrid';
import { TrendingOffersSection } from './components/TrendingOffersSection';
import { CalculatorSection } from './components/CalculatorSection';
import { BenefitsSection } from './components/BenefitsSection';
import { EligibilitySection } from './components/EligibilitySection';
import { ChargesSection } from './components/ChargesSection';
import { DocumentsSection } from './components/DocumentsSection';
import { StepsSection } from './components/StepsSection';
import { BankComparisonSection } from './components/BankComparisonSection';
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

export function App() {
  // Modal states
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);

  // Prefilled parameters for Apply Modal
  const [selectedBank, setSelectedBank] = useState<string | undefined>(undefined);
  const [selectedAmount, setSelectedAmount] = useState<number | undefined>(undefined);
  const [selectedTenure, setSelectedTenure] = useState<number | undefined>(undefined);

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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-['Plus_Jakarta_Sans',sans-serif] flex flex-col selection:bg-[#E81E76] selection:text-white pb-16 md:pb-0">
      
      {/* 1. Global Header with Contact Bar & Sticky Navigation */}
      <Header
        onOpenApplyModal={handleOpenApplyModal}
        onOpenContactModal={() => setIsContactModalOpen(true)}
        onOpenAboutModal={() => setIsAboutModalOpen(true)}
        onOpenPartnerModal={() => setIsPartnerModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        
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

        {/* SECTION 5: Trending Loan Offers & Curated Deals */}
        <TrendingOffersSection
          onOpenApplyModal={handleOpenApplyModal}
        />

        {/* SECTION 6: Home Loan Calculator (Interactive inputs, EMI/totals, schedule) */}
        <CalculatorSection
          onOpenApplyModalWithDetails={handleOpenApplyWithCalculatorDetails}
        />

        {/* SECTION 7: Benefits of a Loan through JinnyLoan */}
        <BenefitsSection
          onOpenApplyModal={() => handleOpenApplyModal()}
        />

        {/* SECTION 8: Eligibility Criteria for Loans (Salaried vs Self-Employed + Estimator) */}
        <EligibilitySection
          onOpenApplyModal={() => handleOpenApplyModal()}
        />

        {/* SECTION 9: What are the Charges (Table & transparent breakdown) */}
        <ChargesSection
          onOpenApplyModal={() => handleOpenApplyModal()}
        />

        {/* SECTION 10: List of Documents Needed (Interactive checklist & download) */}
        <DocumentsSection />

        {/* SECTION 11: Steps to Apply for a Loan through JinnyLoan (4 numbered steps) */}
        <StepsSection
          onOpenApplyModal={() => handleOpenApplyModal()}
        />

        {/* SECTION 12: Compare Loan Interest Rates from 100+ Top Banks */}
        <BankComparisonSection
          onOpenApplyModal={handleOpenApplyModal}
        />

        {/* SECTION 13: 100+ Partner Lending Institutions */}
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

      </main>

      {/* Footer */}
      <Footer
        onOpenApplyModal={() => handleOpenApplyModal()}
        onOpenAboutModal={() => setIsAboutModalOpen(true)}
        onOpenContactModal={() => setIsContactModalOpen(true)}
        onOpenPartnerModal={() => setIsPartnerModalOpen(true)}
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

    </div>
  );
}

export default App;
