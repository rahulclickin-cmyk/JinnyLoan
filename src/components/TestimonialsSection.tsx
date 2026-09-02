import React from 'react';
import { Star, Quote, CheckCircle2, User } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      quote: "Applying for a personal loan with jinny24 was seamless. The team provided great support.",
      name: "Aman Kumar",
      location: "Delhi, India",
      loanType: "Personal Loan",
      rating: 5,
      avatarBg: "bg-blue-600"
    },
    {
      id: 2,
      quote: "I needed funds for a home renovation project, & jinny24 provided personalized loan options.",
      name: "Abhijit Singh",
      location: "Noida, UP",
      loanType: "Home Renovation Loan",
      rating: 5,
      avatarBg: "bg-[#E81E76]"
    },
    {
      id: 3,
      quote: "Thanks to jinnyLoan. I was able to consolidate my debt and lower my monthly payments.",
      name: "Ritik Kumar",
      location: "Gurugram, Haryana",
      loanType: "Debt Consolidation",
      rating: 5,
      avatarBg: "bg-emerald-600"
    }
  ];

  return (
    <section id="testimonials" className="py-14 sm:py-18 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1e3a8a] font-['Outfit',sans-serif] tracking-tight">
            Testimonials
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
            Real stories and verified feedback from thousands of satisfied borrowers across India
          </p>
        </div>

        {/* 3 Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50/70 border border-slate-200 rounded-3xl p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative group hover:border-pink-200"
              id={`testimonial-card-${item.id}`}
            >
              {/* Quote mark icon */}
              <div className="mb-4">
                <Quote className="w-8 h-8 text-pink-300 fill-pink-100 transform rotate-180" />
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-3">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Quote Text */}
              <p className="text-slate-700 text-sm sm:text-base italic leading-relaxed mb-6 font-medium">
                "{item.quote}"
              </p>

              {/* Author Info */}
              <div className="pt-4 border-t border-slate-200/80 flex items-center gap-3">
                <div className={`w-11 h-11 rounded-full ${item.avatarBg} text-white flex items-center justify-center font-bold text-sm shadow-xs`}>
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {item.name}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <span>{item.location}</span>
                    <span>•</span>
                    <span className="text-[#E81E76] font-semibold">{item.loanType}</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
