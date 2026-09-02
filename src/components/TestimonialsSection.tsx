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
    <section id="testimonials" className="py-6 sm:py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-8">
          <h2 className="text-lg sm:text-3xl lg:text-4xl font-extrabold text-[#1e3a8a] font-['Outfit',sans-serif] tracking-tight">
            Customer Stories
          </h2>
          <p className="text-[11px] sm:text-sm text-slate-500 mt-1">
            Verified feedback from satisfied borrowers across India
          </p>
        </div>

        {/* 3 Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50/70 border border-slate-200 rounded-2xl p-3.5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative group hover:border-pink-200"
              id={`testimonial-card-${item.id}`}
            >
              <div>
                {/* Star Rating & Quote mark */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-pink-300 fill-pink-100 transform rotate-180" />
                </div>

                {/* Quote Text */}
                <p className="text-slate-700 text-xs sm:text-sm italic leading-relaxed mb-3 font-medium">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-2.5 border-t border-slate-200/80 flex items-center gap-2.5">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${item.avatarBg} text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-xs flex-shrink-0`}>
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                    {item.name}
                  </h4>
                  <div className="flex items-center gap-1 text-[10px] sm:text-xs text-slate-500">
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
