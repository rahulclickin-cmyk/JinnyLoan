import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, Mail, MessageSquare } from 'lucide-react';

interface FaqSectionProps {
  onOpenContactModal?: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  onOpenContactModal
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item expanded by default as in screenshot

  const faqs = [
    {
      question: 'Q. What is JinnyLoan.com ?',
      answer: 'JinnyLoan is a digital platform providing accessible financial services to all. It leverages technology to offer customized financial products like Personal loans, Business Loan, Home Loan & Credit Cards through its lending partners. we have tie-up more than 100 + Banks and NBFCs.'
    },
    {
      question: 'Q. What are the features & benefits of JinnyLoan digital lending platform ?',
      answer: 'JinnyLoan offers 100% digital paperless processing, instant pre-approval, zero hidden charges, comparison across 100+ Banks & NBFCs, lowest interest rate guarantee, and dedicated relationship manager support until final disbursement.'
    },
    {
      question: 'Q. What are the documents required to apply for a loan ?',
      answer: 'Basic KYC documents including PAN Card, Aadhaar Card / Voter ID, last 3 to 6 months bank account statements, salary slips (for salaried borrowers) or ITR with balance sheet (for self-employed / business applicants).'
    },
    {
      question: 'Q. Can I borrow any amount that I required up till Rs.10lakh ?',
      answer: 'Yes, you can borrow any required amount starting from ₹25,000 up to ₹10 Lakh for personal/unsecured loans, and up to ₹10 Crore+ for Home Loans and Loan Against Property based on your income eligibility and credit profile.'
    },
    {
      question: 'Q. What is the minimum credit score requirement to avail the loan ?',
      answer: 'A CIBIL credit score of 700 or above is ideal to get the lowest interest rates and highest sanction amounts. However, we also have lending partners who consider applicants with lower or new-to-credit (NTC) scores.'
    },
    {
      question: 'Q. How Contact JinnyLoan if I can face any issue with the website ?',
      answer: 'You can contact our customer support team directly at +91 8006488006 or email us at info@jinnyloan.com (Monday to Saturday, 10:00 AM to 7:00 PM). You can also click on the "Loan Inquiry" button on the website for instant assistance.'
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-14 sm:py-18 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1e3a8a] font-['Outfit',sans-serif] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
            Everything you need to know about loan eligibility, process, documents, and verification
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`border rounded-2xl overflow-hidden transition-all ${
                  isOpen 
                    ? 'border-[#1e3a8a]/30 bg-blue-50/20 shadow-sm' 
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
                id={`faq-item-${index}`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left py-4 px-5 sm:px-6 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className={`${isOpen ? 'text-[#1e3a8a]' : 'text-slate-800'}`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? 'bg-[#1e3a8a] text-white rotate-180' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Contact Help Box */}
        <div className="mt-10 p-6 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-pink-100 text-[#E81E76] flex items-center justify-center flex-shrink-0">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Have more questions?</h4>
              <p className="text-xs text-slate-500">Our loan specialists are ready to help you 6 days a week.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:+918006488006"
              className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs rounded-xl shadow-2xs flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#E81E76]" />
              <span>+91 8006488006</span>
            </a>
            {onOpenContactModal && (
              <button
                onClick={onOpenContactModal}
                className="px-4 py-2 bg-[#E81E76] hover:bg-[#c2145e] text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
              >
                Contact Us
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
