import React from 'react';

interface BankLogoProps {
  name: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const BankLogo: React.FC<BankLogoProps> = ({
  name,
  className = '',
  size = 'md',
  showText = true,
}) => {
  const sizeClasses = {
    sm: 'h-7 max-w-[110px]',
    md: 'h-9 max-w-[140px]',
    lg: 'h-12 max-w-[180px]',
  };

  const key = name.toLowerCase().replace(/[^a-z0-9]/g, '');

  // Render authentic SVG based on bank name
  const renderLogo = () => {
    switch (true) {
      // 1. AXIS BANK
      case key.includes('axis'):
        return (
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 100 100" className="h-7 w-7 flex-shrink-0" fill="none">
              <path d="M 50 10 L 90 90 L 60 90 L 50 68 L 40 90 L 10 90 Z" fill="#97144D" />
              <path d="M 50 35 L 68 76 L 32 76 Z" fill="#ffffff" />
            </svg>
            {showText && (
              <span className="font-extrabold tracking-tight text-[#97144D] text-sm uppercase">
                AXIS BANK
              </span>
            )}
          </div>
        );

      // 2. HDFC BANK
      case key.includes('hdfc'):
        return (
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 bg-[#004c8f] flex items-center justify-center p-1 rounded-sm flex-shrink-0">
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="w-full h-1 bg-[#ed232a] absolute" />
                <div className="h-full w-1 bg-[#ed232a] absolute" />
                <div className="w-2.5 h-2.5 bg-[#004c8f] z-10" />
              </div>
            </div>
            {showText && (
              <div className="flex flex-col leading-tight">
                <span className="font-black text-[#004c8f] text-sm tracking-tight">HDFC BANK</span>
                <span className="text-[7px] text-slate-500 font-semibold uppercase">We understand your world</span>
              </div>
            )}
          </div>
        );

      // 3. ICICI BANK
      case key.includes('icici'):
        return (
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 100 100" className="h-7 w-7 flex-shrink-0" fill="none">
              <circle cx="50" cy="50" r="46" fill="#F37021" />
              <path d="M 42 22 C 30 22 25 35 25 50 C 25 65 30 78 42 78 C 50 78 54 72 54 72 L 54 62 C 54 62 49 68 42 68 C 34 68 34 58 34 50 C 34 42 34 32 42 32 C 49 32 54 38 54 38 L 54 28 C 54 28 50 22 42 22 Z" fill="#ffffff" />
              <circle cx="68" cy="30" r="6" fill="#A81C1E" />
              <path d="M 62 42 L 74 42 L 74 78 L 62 78 Z" fill="#A81C1E" />
            </svg>
            {showText && (
              <span className="font-black text-[#B02A30] text-sm tracking-tight">
                ICICI <span className="text-[#F37021]">Bank</span>
              </span>
            )}
          </div>
        );

      // 4. STATE BANK OF INDIA (SBI)
      case key.includes('sbi') || key.includes('statebank'):
        return (
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 100 100" className="h-7 w-7 flex-shrink-0" fill="none">
              <circle cx="50" cy="50" r="48" fill="#0080BD" />
              <circle cx="50" cy="40" r="16" fill="#ffffff" />
              <rect x="44" y="40" width="12" height="40" fill="#ffffff" rx="2" />
            </svg>
            {showText && (
              <span className="font-black text-[#0080BD] text-xs tracking-tight uppercase leading-tight">
                State Bank of India
              </span>
            )}
          </div>
        );

      // 5. CREDITSEA
      case key.includes('creditsea'):
        return (
          <div className="flex items-center gap-1.5">
            <svg viewBox="0 0 100 100" className="h-7 w-7 flex-shrink-0" fill="none">
              <rect width="100" height="100" rx="20" fill="#0284c7" />
              <path d="M 20 50 C 35 25 65 75 80 50 C 70 70 40 70 20 50 Z" fill="#ffffff" />
              <circle cx="50" cy="38" r="8" fill="#38bdf8" />
            </svg>
            {showText && (
              <span className="font-extrabold text-[#0284c7] text-sm tracking-tight">
                Credit<span className="text-emerald-500">Sea</span>
              </span>
            )}
          </div>
        );

      // 6. ADITYA BIRLA CAPITAL
      case key.includes('aditya') || key.includes('birla'):
        return (
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 100 100" className="h-7 w-7 flex-shrink-0" fill="none">
              <rect width="100" height="100" rx="16" fill="#88001b" />
              <path d="M 50 15 L 85 85 L 15 85 Z" fill="#f7941d" />
              <path d="M 50 35 L 72 80 L 28 80 Z" fill="#ffffff" />
            </svg>
            {showText && (
              <div className="flex flex-col leading-none">
                <span className="font-black text-[#88001b] text-[10px] tracking-wider uppercase">ADITYA BIRLA</span>
                <span className="font-bold text-[#f7941d] text-xs tracking-tight uppercase">CAPITAL</span>
              </div>
            )}
          </div>
        );

      // 7. KOTAK MAHINDRA BANK
      case key.includes('kotak'):
        return (
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 100 100" className="h-7 w-7 flex-shrink-0" fill="none">
              <rect width="100" height="100" rx="18" fill="#ED1C24" />
              <path d="M 25 50 C 25 35 40 35 50 50 C 60 65 75 65 75 50 C 75 35 60 35 50 50 C 40 65 25 65 25 50 Z" stroke="#ffffff" strokeWidth="8" fill="none" strokeLinecap="round" />
            </svg>
            {showText && (
              <span className="font-bold text-[#ED1C24] text-sm tracking-tight lowercase">
                kotak<span className="text-slate-800 font-semibold text-xs ml-0.5">Bank</span>
              </span>
            )}
          </div>
        );

      // 8. BANK OF BARODA
      case key.includes('baroda') || key.includes('bob'):
        return (
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 100 100" className="h-7 w-7 flex-shrink-0" fill="none">
              <rect width="100" height="100" rx="16" fill="#F37024" />
              <circle cx="50" cy="50" r="28" fill="#ffffff" />
              <circle cx="50" cy="50" r="16" fill="#F37024" />
              <path d="M 50 20 L 50 30 M 50 70 L 50 80 M 20 50 L 30 50 M 70 50 L 80 50" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
            </svg>
            {showText && (
              <div className="flex flex-col leading-none">
                <span className="font-extrabold text-[#F37024] text-xs uppercase tracking-tight">Bank of Baroda</span>
                <span className="text-[8px] text-slate-500 font-medium">India's International Bank</span>
              </div>
            )}
          </div>
        );

      // 9. CANARA BANK
      case key.includes('canara'):
        return (
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 100 100" className="h-7 w-7 flex-shrink-0" fill="none">
              <rect width="100" height="100" rx="16" fill="#0080c8" />
              <path d="M 25 25 L 75 75 M 25 75 L 75 25" stroke="#fec52e" strokeWidth="12" strokeLinecap="round" />
            </svg>
            {showText && (
              <span className="font-black text-[#0080c8] text-xs uppercase tracking-tight">
                Canara Bank
              </span>
            )}
          </div>
        );

      // 10. PUNJAB NATIONAL BANK (PNB)
      case key.includes('pnb') || key.includes('punjab'):
        return (
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 100 100" className="h-7 w-7 flex-shrink-0" fill="none">
              <circle cx="50" cy="50" r="46" fill="#990033" />
              <path d="M 30 30 L 70 30 C 80 30 80 50 70 50 L 50 50 L 50 75 L 30 75 Z" fill="#fcb040" />
            </svg>
            {showText && (
              <span className="font-black text-[#990033] text-xs uppercase tracking-tight">
                Punjab National Bank
              </span>
            )}
          </div>
        );

      // 11. GROWMYSITES
      case key.includes('grow'):
        return (
          <div className="flex items-center gap-1.5">
            <svg viewBox="0 0 100 100" className="h-7 w-7 flex-shrink-0" fill="none">
              <rect width="100" height="100" rx="16" fill="#10b981" />
              <path d="M 25 70 L 45 45 L 60 60 L 80 30" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 65 30 L 80 30 L 80 45" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {showText && (
              <span className="font-black text-[#10b981] text-xs uppercase tracking-tight">
                Growmysites
              </span>
            )}
          </div>
        );

      // 12. POONAWALLA FINCORP
      case key.includes('poonawalla'):
        return (
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 100 100" className="h-7 w-7 flex-shrink-0" fill="none">
              <rect width="100" height="100" rx="18" fill="#581c87" />
              <circle cx="50" cy="50" r="28" stroke="#a855f7" strokeWidth="6" fill="none" />
              <path d="M 40 35 L 60 50 L 40 65 Z" fill="#ffffff" />
            </svg>
            {showText && (
              <span className="font-extrabold text-[#581c87] text-xs uppercase tracking-tight">
                Poonawalla Fincorp
              </span>
            )}
          </div>
        );

      // 13. MONEYVIEW
      case key.includes('moneyview'):
        return (
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 100 100" className="h-7 w-7 flex-shrink-0" fill="none">
              <rect width="100" height="100" rx="18" fill="#059669" />
              <path d="M 25 70 L 25 30 L 50 55 L 75 30 L 75 70" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            {showText && (
              <span className="font-black text-[#059669] text-xs tracking-tight">
                money<span className="text-slate-800">view</span>
              </span>
            )}
          </div>
        );

      // 14. KREDITBEE
      case key.includes('kreditbee') || key.includes('kredit'):
        return (
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 100 100" className="h-7 w-7 flex-shrink-0" fill="none">
              <circle cx="50" cy="50" r="46" fill="#F7B928" />
              <path d="M 30 35 L 50 50 L 30 65 M 48 35 L 68 50 L 48 65" stroke="#1f2937" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            {showText && (
              <span className="font-extrabold text-slate-800 text-xs tracking-tight">
                Kredit<span className="text-[#F7B928]">Bee</span>
              </span>
            )}
          </div>
        );

      // 15. TATA CAPITAL
      case key.includes('tata'):
        return (
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 100 100" className="h-7 w-7 flex-shrink-0" fill="none">
              <circle cx="50" cy="50" r="46" fill="#00539B" />
              <path d="M 30 35 L 70 35 M 50 35 L 50 75" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" />
            </svg>
            {showText && (
              <div className="flex flex-col leading-none">
                <span className="font-black text-[#00539B] text-xs uppercase tracking-widest">TATA</span>
                <span className="font-bold text-slate-700 text-[9px] uppercase tracking-tight">CAPITAL</span>
              </div>
            )}
          </div>
        );

      // 16. L&T FINANCE
      case key.includes('l&t') || key.includes('lt'):
        return (
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 bg-[#003366] rounded flex items-center justify-center text-white font-black text-xs">
              L&T
            </div>
            {showText && (
              <span className="font-black text-[#003366] text-xs uppercase tracking-tight">
                L&T Finance
              </span>
            )}
          </div>
        );

      // Default fallback
      default:
        return (
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold text-xs">
              {name.substring(0, 2).toUpperCase()}
            </div>
            {showText && <span className="font-bold text-slate-800 text-xs">{name}</span>}
          </div>
        );
    }
  };

  return (
    <div className={`inline-flex items-center justify-center p-2 rounded-lg bg-white border border-slate-200/80 shadow-[0_2px_6px_rgba(0,0,0,0.04)] hover:shadow-md transition-all ${sizeClasses[size]} ${className}`}>
      {renderLogo()}
    </div>
  );
};
