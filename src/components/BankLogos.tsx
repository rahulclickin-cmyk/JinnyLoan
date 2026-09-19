import React from 'react';

interface BankLogoProps {
  name?: string;
  bankName?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const BankLogo: React.FC<BankLogoProps> = ({
  name = '',
  bankName = '',
  className = '',
  size = 'md',
  showText = true,
}) => {
  const actualName = name || bankName || '';
  const sizeClasses = {
    sm: 'h-7',
    md: 'h-9',
    lg: 'h-12',
  };

  const key = actualName.toLowerCase().replace(/[^a-z0-9]/g, '');

  // Render authentic SVG based on bank name
  const renderLogo = () => {
    switch (true) {
      // 1. AXIS BANK
      case key.includes('axis'):
        return (
          <div className="flex items-center gap-2 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="h-7 w-7 flex-shrink-0" fill="none">
              <path d="M 50 10 L 90 90 L 60 90 L 50 68 L 40 90 L 10 90 Z" fill="#97144D" />
              <path d="M 50 35 L 68 76 L 32 76 Z" fill="#ffffff" />
            </svg>
            {showText && (
              <span className="font-extrabold tracking-tight text-[#97144D] text-sm uppercase whitespace-nowrap">
                AXIS BANK
              </span>
            )}
          </div>
        );

      // 2. HDFC BANK
      case key.includes('hdfc'):
        return (
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="h-7 w-7 bg-[#004c8f] flex items-center justify-center p-1 rounded-sm flex-shrink-0">
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="w-full h-1 bg-[#ed232a] absolute" />
                <div className="h-full w-1 bg-[#ed232a] absolute" />
                <div className="w-2.5 h-2.5 bg-[#004c8f] z-10" />
              </div>
            </div>
            {showText && (
              <div className="flex flex-col leading-tight whitespace-nowrap">
                <span className="font-black text-[#004c8f] text-sm tracking-tight">HDFC BANK</span>
                <span className="text-[7px] text-slate-500 font-semibold uppercase">We understand your world</span>
              </div>
            )}
          </div>
        );

      // 3. ICICI BANK
      case key.includes('icici'):
        return (
          <div className="flex items-center gap-2 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="h-7 w-7 flex-shrink-0" fill="none">
              <circle cx="50" cy="50" r="46" fill="#F37021" />
              <path d="M 42 22 C 30 22 25 35 25 50 C 25 65 30 78 42 78 C 50 78 54 72 54 72 L 54 62 C 54 62 49 68 42 68 C 34 68 34 58 34 50 C 34 42 34 32 42 32 C 49 32 54 38 54 38 L 54 28 C 54 28 50 22 42 22 Z" fill="#ffffff" />
              <circle cx="68" cy="30" r="6" fill="#A81C1E" />
              <path d="M 62 42 L 74 42 L 74 78 L 62 78 Z" fill="#A81C1E" />
            </svg>
            {showText && (
              <span className="font-black text-[#B02A30] text-sm tracking-tight whitespace-nowrap">
                ICICI <span className="text-[#F37021]">Bank</span>
              </span>
            )}
          </div>
        );

      // 4. STATE BANK OF INDIA (SBI)
      case key.includes('sbi') || key.includes('statebank'):
        return (
          <div className="flex items-center gap-2 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="h-7 w-7 flex-shrink-0" fill="none">
              <circle cx="50" cy="50" r="48" fill="#0080BD" />
              <circle cx="50" cy="38" r="15" fill="#ffffff" />
              <rect x="44" y="38" width="12" height="42" fill="#ffffff" rx="2" />
            </svg>
            {showText && (
              <span className="font-black text-[#0080BD] text-xs tracking-tight uppercase leading-tight whitespace-nowrap">
                State Bank of India
              </span>
            )}
          </div>
        );

      // 5. CREDITSEA
      case key.includes('creditsea'):
        return (
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="h-7 w-7 flex-shrink-0" fill="none">
              <rect width="100" height="100" rx="20" fill="#0284c7" />
              <path d="M 20 50 C 35 25 65 75 80 50 C 70 70 40 70 20 50 Z" fill="#ffffff" />
              <circle cx="50" cy="38" r="8" fill="#38bdf8" />
            </svg>
            {showText && (
              <span className="font-extrabold text-[#0284c7] text-sm tracking-tight whitespace-nowrap">
                Credit<span className="text-emerald-500">Sea</span>
              </span>
            )}
          </div>
        );

      // 6. ADITYA BIRLA CAPITAL
      case key.includes('aditya') || key.includes('birla'):
        return (
          <div className="flex items-center gap-2 flex-nowrap flex-shrink-0">
            <svg viewBox="0 0 100 100" className="h-7 w-7 flex-shrink-0" fill="none">
              <rect width="100" height="100" rx="16" fill="#88001b" />
              <path d="M 50 15 L 85 85 L 15 85 Z" fill="#f7941d" />
              <path d="M 50 35 L 72 80 L 28 80 Z" fill="#ffffff" />
            </svg>
            {showText && (
              <div className="flex flex-col justify-center leading-tight whitespace-nowrap">
                <span className="font-black text-[#88001b] text-[11px] tracking-wide uppercase whitespace-nowrap">
                  ADITYA BIRLA
                </span>
                <span className="font-extrabold text-[#d9531e] text-[9.5px] tracking-widest uppercase whitespace-nowrap">
                  CAPITAL
                </span>
              </div>
            )}
          </div>
        );

      // 7. KOTAK MAHINDRA BANK
      case key.includes('kotak'):
        return (
          <div className="flex items-center gap-2 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="h-7 w-7 flex-shrink-0" fill="none">
              <rect width="100" height="100" rx="18" fill="#ED1C24" />
              <path d="M 28 50 C 28 36 42 36 50 50 C 58 64 72 64 72 50 C 72 36 58 36 50 50 C 42 64 28 64 28 50 Z" stroke="#ffffff" strokeWidth="8" fill="none" strokeLinecap="round" />
            </svg>
            {showText && (
              <span className="font-bold text-[#ED1C24] text-sm tracking-tight lowercase whitespace-nowrap">
                kotak<span className="text-slate-800 font-semibold text-xs ml-0.5">Bank</span>
              </span>
            )}
          </div>
        );

      // 8. BANK OF BARODA
      case key.includes('baroda') || key.includes('bob'):
        return (
          <div className="flex items-center gap-2 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="h-7 w-7 flex-shrink-0" fill="none">
              <rect width="100" height="100" rx="16" fill="#F37024" />
              <circle cx="50" cy="50" r="28" fill="#ffffff" />
              <circle cx="50" cy="50" r="16" fill="#F37024" />
              <path d="M 50 20 L 50 30 M 50 70 L 50 80 M 20 50 L 30 50 M 70 50 L 80 50" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
            </svg>
            {showText && (
              <div className="flex flex-col leading-none whitespace-nowrap">
                <span className="font-extrabold text-[#F37024] text-xs uppercase tracking-tight">Bank of Baroda</span>
                <span className="text-[8px] text-slate-500 font-medium">India's International Bank</span>
              </div>
            )}
          </div>
        );

      // 9. CANARA BANK
      case key.includes('canara'):
        return (
          <div className="flex items-center gap-2 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="h-7 w-7 flex-shrink-0" fill="none">
              <rect width="100" height="100" rx="16" fill="#0080c8" />
              <path d="M 25 25 L 75 75 M 25 75 L 75 25" stroke="#fec52e" strokeWidth="12" strokeLinecap="round" />
            </svg>
            {showText && (
              <span className="font-black text-[#0080c8] text-xs uppercase tracking-tight whitespace-nowrap">
                Canara Bank
              </span>
            )}
          </div>
        );

      // 10. PUNJAB NATIONAL BANK (PNB)
      case key.includes('pnb') || key.includes('punjab'):
        return (
          <div className="flex items-center gap-2 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="h-7 w-7 flex-shrink-0" fill="none">
              <circle cx="50" cy="50" r="46" fill="#990033" />
              <path d="M 32 28 L 68 28 C 80 28 80 52 68 52 L 52 52 L 52 76 L 32 76 Z" fill="#fcb040" />
            </svg>
            {showText && (
              <span className="font-black text-[#990033] text-xs uppercase tracking-tight whitespace-nowrap">
                Punjab National Bank
              </span>
            )}
          </div>
        );

      // 11. UNION BANK OF INDIA
      case key.includes('union'):
        return (
          <div className="flex items-center gap-2 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="h-7 w-7 flex-shrink-0" fill="none">
              <rect width="100" height="100" rx="18" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
              <path d="M 30 25 L 30 55 C 30 68 40 75 50 75 C 60 75 70 68 70 55 L 70 25" stroke="#d62828" strokeWidth="10" strokeLinecap="round" fill="none" />
              <path d="M 40 25 L 40 55 C 40 62 45 66 50 66 C 55 66 60 62 60 55 L 60 25" stroke="#003049" strokeWidth="6" strokeLinecap="round" fill="none" />
            </svg>
            {showText && (
              <span className="font-black text-[#d62828] text-xs uppercase tracking-tight whitespace-nowrap">
                Union Bank
              </span>
            )}
          </div>
        );

      // 12. INDUSIND BANK
      case key.includes('indusind') || key.includes('indus'):
        return (
          <div className="flex items-center gap-2 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="h-7 w-7 flex-shrink-0" fill="none">
              <rect width="100" height="100" rx="18" fill="#990000" />
              <path d="M 25 65 C 25 45 40 30 55 35 C 70 40 80 55 75 70 C 65 72 45 72 25 65 Z" fill="#ffffff" />
              <circle cx="62" cy="45" r="3" fill="#990000" />
              <path d="M 50 25 C 55 32 65 30 70 25" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
            </svg>
            {showText && (
              <span className="font-black text-[#990000] text-xs uppercase tracking-tight whitespace-nowrap">
                IndusInd Bank
              </span>
            )}
          </div>
        );

      // 13. IDFC FIRST BANK
      case key.includes('idfc'):
        return (
          <div className="flex items-center gap-2 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="h-7 w-7 flex-shrink-0" fill="none">
              <rect width="100" height="100" rx="18" fill="#9c122d" />
              <path d="M 28 30 L 72 30 C 72 48 55 48 55 68 L 28 68 Z" fill="#ffffff" />
              <circle cx="62" cy="62" r="8" fill="#d82348" />
            </svg>
            {showText && (
              <span className="font-black text-[#9c122d] text-xs uppercase tracking-tight whitespace-nowrap">
                IDFC FIRST Bank
              </span>
            )}
          </div>
        );

      // 14. YES BANK
      case key.includes('yes'):
        return (
          <div className="flex items-center gap-2 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="h-7 w-7 flex-shrink-0" fill="none">
              <rect width="100" height="100" rx="18" fill="#003874" />
              <path d="M 25 48 L 42 66 L 78 28" stroke="#ed1c24" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M 32 48 L 44 60 L 70 34" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            {showText && (
              <span className="font-black text-[#003874] text-xs uppercase tracking-tight whitespace-nowrap">
                YES BANK
              </span>
            )}
          </div>
        );

      // 15. BAJAJ FINSERV / BAJAJ FINANCE
      case key.includes('bajaj'):
        return (
          <div className="flex items-center gap-2 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="h-7 w-7 flex-shrink-0" fill="none">
              <rect width="100" height="100" rx="18" fill="#004890" />
              <path d="M 32 25 L 55 25 C 68 25 68 45 55 45 C 70 45 70 75 52 75 L 32 75 Z" fill="#ffffff" />
              <circle cx="45" cy="35" r="4" fill="#004890" />
              <circle cx="45" cy="60" r="5" fill="#004890" />
            </svg>
            {showText && (
              <span className="font-black text-[#004890] text-xs uppercase tracking-tight whitespace-nowrap">
                Bajaj Finserv
              </span>
            )}
          </div>
        );

      // 16. POONAWALLA FINCORP
      case key.includes('poonawalla'):
        return (
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="h-7 w-7 bg-[#1e2e60] rounded-lg flex items-center justify-center text-white font-serif font-black text-lg shadow-xs flex-shrink-0">
              P
            </div>
            {showText && (
              <div className="flex flex-col leading-none text-left whitespace-nowrap">
                <span className="font-extrabold text-[#1e2e60] text-xs sm:text-[13px] tracking-wider uppercase">POONAWALLA</span>
                <span className="font-bold text-[#1e2e60] text-[9px] sm:text-[10px] tracking-widest uppercase mt-0.5">FINCORP</span>
              </div>
            )}
          </div>
        );

      // 17. MPOKKET
      case key.includes('mpokket') || key.includes('pokket'):
        return (
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shadow-xs flex-shrink-0">
              <span className="text-lg font-black leading-none flex items-center">
                <span className="text-[#f59e0b]">m</span>
                <span className="w-2 h-2 rounded-full bg-[#0284c7] -ml-0.5" />
              </span>
            </div>
            {showText && (
              <span className="font-black text-[#0284c7] text-base sm:text-lg tracking-tight font-['Outfit',sans-serif] whitespace-nowrap">
                mPokket
              </span>
            )}
          </div>
        );

      // 18. HERO FINCORP
      case key.includes('hero'):
        return (
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-7 h-7 bg-[#024927] rounded-lg flex items-center justify-center p-1 shadow-xs flex-shrink-0">
              <div className="w-4 h-4 bg-[#00a843] rounded-xs flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-xs" />
              </div>
            </div>
            {showText && (
              <div className="flex flex-col leading-none text-left whitespace-nowrap">
                <span className="font-black text-[#024927] text-xs sm:text-sm tracking-tight">Hero</span>
                <span className="font-bold text-slate-600 text-[8px] sm:text-[9px] tracking-widest uppercase mt-0.5">FINCORP</span>
              </div>
            )}
          </div>
        );

      // 19. TATA CAPITAL
      case key.includes('tata'):
        return (
          <div className="flex items-center gap-2 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="h-7 w-7 flex-shrink-0" fill="none">
              <circle cx="50" cy="50" r="46" fill="#00539B" />
              <path d="M 30 35 L 70 35 M 50 35 L 50 75" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" />
            </svg>
            {showText && (
              <div className="flex flex-col leading-none whitespace-nowrap">
                <span className="font-black text-[#00539B] text-xs uppercase tracking-widest">TATA</span>
                <span className="font-bold text-slate-700 text-[9px] uppercase tracking-tight">CAPITAL</span>
              </div>
            )}
          </div>
        );

      // 20. L&T FINANCE
      case key.includes('l&t') || key.includes('lt'):
        return (
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="h-7 w-7 bg-[#003366] rounded-lg flex items-center justify-center text-white font-black text-xs shadow-xs flex-shrink-0">
              L&T
            </div>
            {showText && (
              <span className="font-black text-[#003366] text-xs uppercase tracking-tight whitespace-nowrap">
                L&T Finance
              </span>
            )}
          </div>
        );

      // 21. PIRAMAL FINANCE
      case key.includes('piramal'):
        return (
          <div className="flex items-center gap-2 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="h-7 w-7 flex-shrink-0" fill="none">
              <rect width="100" height="100" rx="18" fill="#005f5f" />
              <path d="M 30 75 L 50 25 L 70 75 Z" fill="#f39c12" />
              <circle cx="50" cy="55" r="8" fill="#ffffff" />
            </svg>
            {showText && (
              <span className="font-black text-[#005f5f] text-xs uppercase tracking-tight whitespace-nowrap">
                Piramal Finance
              </span>
            )}
          </div>
        );

      // 22. MUTHOOT FINANCE
      case key.includes('muthoot'):
        return (
          <div className="flex items-center gap-2 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="h-7 w-7 flex-shrink-0" fill="none">
              <rect width="100" height="100" rx="18" fill="#d90429" />
              <circle cx="50" cy="50" r="32" fill="#ffd166" />
              <path d="M 35 50 C 35 40 65 40 65 50 L 65 65 L 35 65 Z" fill="#d90429" />
              <circle cx="44" cy="48" r="3" fill="#ffffff" />
              <circle cx="56" cy="48" r="3" fill="#ffffff" />
            </svg>
            {showText && (
              <span className="font-black text-[#d90429] text-xs uppercase tracking-tight whitespace-nowrap">
                Muthoot Finance
              </span>
            )}
          </div>
        );

      // 23. KREDITBEE
      case key.includes('kreditbee') || key.includes('kredit'):
        return (
          <div className="flex items-center gap-2 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="h-7 w-7 flex-shrink-0" fill="none">
              <circle cx="50" cy="50" r="46" fill="#F7B928" />
              <path d="M 30 35 L 50 50 L 30 65 M 48 35 L 68 50 L 48 65" stroke="#1f2937" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            {showText && (
              <span className="font-extrabold text-slate-800 text-xs tracking-tight whitespace-nowrap">
                Kredit<span className="text-[#F7B928]">Bee</span>
              </span>
            )}
          </div>
        );

      // 24. MONEYVIEW
      case key.includes('moneyview'):
        return (
          <div className="flex items-center gap-2 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="h-7 w-7 flex-shrink-0" fill="none">
              <rect width="100" height="100" rx="18" fill="#059669" />
              <path d="M 25 70 L 25 30 L 50 55 L 75 30 L 75 70" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            {showText && (
              <span className="font-black text-[#059669] text-xs tracking-tight whitespace-nowrap">
                money<span className="text-slate-800">view</span>
              </span>
            )}
          </div>
        );

      // 25. NAVI
      case key.includes('navi'):
        return (
          <div className="flex items-center gap-2 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="h-7 w-7 flex-shrink-0" fill="none">
              <rect width="100" height="100" rx="18" fill="#030822" />
              <circle cx="50" cy="50" r="30" fill="#00d084" />
              <path d="M 38 62 L 38 38 L 48 52 L 58 38 L 58 62" stroke="#030822" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            {showText && (
              <span className="font-black text-[#030822] text-xs uppercase tracking-tight whitespace-nowrap">
                Navi
              </span>
            )}
          </div>
        );

      // 26. FEDERAL BANK
      case key.includes('federal'):
        return (
          <div className="flex items-center gap-2 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="h-7 w-7 flex-shrink-0" fill="none">
              <circle cx="50" cy="50" r="46" fill="#003b71" />
              <path d="M 30 30 L 70 30 L 70 45 L 48 45 L 48 55 L 65 55 L 65 70 L 48 70 L 48 80 L 30 80 Z" fill="#ff7a00" />
            </svg>
            {showText && (
              <span className="font-black text-[#003b71] text-xs uppercase tracking-tight whitespace-nowrap">
                Federal Bank
              </span>
            )}
          </div>
        );

      // 27. RBL BANK
      case key.includes('rbl'):
        return (
          <div className="flex items-center gap-2 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="h-7 w-7 flex-shrink-0" fill="none">
              <circle cx="50" cy="50" r="46" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
              <path d="M 50 15 L 78 50 L 50 50 Z" fill="#004b87" />
              <path d="M 50 50 L 78 50 L 50 85 Z" fill="#e31b23" />
              <path d="M 50 15 L 50 85 L 22 50 Z" fill="#fdb913" />
            </svg>
            {showText && (
              <span className="font-black text-[#004b87] text-xs uppercase tracking-tight whitespace-nowrap">
                RBL Bank
              </span>
            )}
          </div>
        );

      // 28. STANDARD CHARTERED
      case key.includes('standard') || key.includes('chartered') || key.includes('scb'):
        return (
          <div className="flex items-center gap-2 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="h-7 w-7 flex-shrink-0" fill="none">
              <rect width="100" height="100" rx="18" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
              <path d="M 30 45 C 30 25 55 25 60 40 C 65 55 45 75 70 75" stroke="#0099ff" strokeWidth="12" strokeLinecap="round" fill="none" />
              <path d="M 70 55 C 70 75 45 75 40 60 C 35 45 55 25 30 25" stroke="#00aa4f" strokeWidth="12" strokeLinecap="round" fill="none" />
            </svg>
            {showText && (
              <span className="font-bold text-[#0099ff] text-xs uppercase tracking-tight whitespace-nowrap">
                Standard Chartered
              </span>
            )}
          </div>
        );

      // 29. HSBC
      case key.includes('hsbc'):
        return (
          <div className="flex items-center gap-2 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="h-7 w-7 flex-shrink-0" fill="none">
              <rect width="100" height="100" rx="18" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
              <polygon points="50,15 80,50 50,85 20,50" fill="#ffffff" stroke="#db0011" strokeWidth="2" />
              <polygon points="50,50 20,50 35,32.5" fill="#db0011" />
              <polygon points="50,50 80,50 65,32.5" fill="#db0011" />
              <polygon points="50,50 20,50 35,67.5" fill="#db0011" />
              <polygon points="50,50 80,50 65,67.5" fill="#db0011" />
            </svg>
            {showText && (
              <span className="font-black text-[#db0011] text-xs uppercase tracking-tight whitespace-nowrap">
                HSBC
              </span>
            )}
          </div>
        );

      // 30. CITIBANK
      case key.includes('citi'):
        return (
          <div className="flex items-center gap-2 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="h-7 w-7 flex-shrink-0" fill="none">
              <rect width="100" height="100" rx="18" fill="#003b70" />
              <path d="M 35 35 C 50 22 65 22 75 35" stroke="#ee1c25" strokeWidth="8" strokeLinecap="round" fill="none" />
              <text x="50" y="68" textAnchor="middle" fill="#ffffff" fontSize="36" fontWeight="bold" fontFamily="sans-serif">citi</text>
            </svg>
            {showText && (
              <span className="font-black text-[#003b70] text-xs uppercase tracking-tight whitespace-nowrap">
                Citibank
              </span>
            )}
          </div>
        );

      // 31. TRUSTPAISA
      case key.includes('trustpaisa') || key.includes('trust'):
        return (
          <div className="flex items-center gap-2 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="w-7 h-7 flex-shrink-0" fill="none">
              <circle cx="50" cy="50" r="44" fill="#e76943" opacity="0.2" />
              <path d="M 35 65 C 30 50 40 35 55 35 C 70 35 75 50 65 65 Z" fill="#e76943" />
              <circle cx="50" cy="48" r="9" fill="#ffffff" />
            </svg>
            {showText && (
              <span className="font-black text-slate-900 text-base sm:text-lg tracking-tight font-['Outfit',sans-serif] whitespace-nowrap">
                TrustPaisa
              </span>
            )}
          </div>
        );

      // 32. LENDINGPLATE
      case key.includes('lendingplate') || key.includes('plate'):
        return (
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-7 h-7 rounded-full border-2 border-slate-900 flex items-center justify-center p-0.5 relative flex-shrink-0">
              <div className="flex gap-0.5 items-end justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ec4899]" />
                <span className="w-2 h-2 rounded-full bg-[#3b82f6]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#eab308]" />
              </div>
            </div>
            {showText && (
              <div className="flex flex-col leading-none text-left whitespace-nowrap">
                <span className="font-bold text-slate-900 text-sm sm:text-base tracking-tight font-['Outfit',sans-serif]">lendingplate</span>
                <span className="text-[8px] text-slate-500 font-medium italic mt-0.5">best way to borrow</span>
              </div>
            )}
          </div>
        );

      // 33. FDPL
      case key.includes('fdpl'):
        return (
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="flex items-end gap-0.5 h-6 w-5 pb-0.5 flex-shrink-0">
              <span className="w-1.5 h-2.5 bg-[#311b92] rounded-xs" />
              <span className="w-1.5 h-4 bg-[#512da8] rounded-xs" />
              <span className="w-1.5 h-5 bg-[#7e57c2] rounded-xs" />
              <span className="w-1.5 h-6 bg-[#f59e0b] rounded-xs" />
            </div>
            {showText && (
              <div className="flex flex-col leading-none text-left whitespace-nowrap">
                <span className="font-black text-[#311b92] text-base sm:text-lg tracking-tight font-['Outfit',sans-serif]">FDPL</span>
                <span className="text-[8px] text-slate-600 font-bold uppercase tracking-wider mt-0.5">Finance Pvt. Ltd.</span>
              </div>
            )}
          </div>
        );

      // 34. TEZCREDIT
      case key.includes('tezcredit') || key.includes('tez'):
        return (
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-7 h-7 rounded-lg bg-[#1e40af] flex items-center justify-center text-white relative shadow-xs flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-emerald-400 stroke-white stroke-1">
                <path d="M13 2L3 14h7v8l10-12h-7l3-8z" />
              </svg>
            </div>
            {showText && (
              <span className="font-black text-[#1e3a8a] text-base sm:text-lg tracking-tight font-['Outfit',sans-serif] whitespace-nowrap">
                Tez<span className="text-[#0284c7]">Credit</span>
              </span>
            )}
          </div>
        );

      // 35. BRANCH
      case key.includes('branch'):
        return (
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="flex items-center justify-center gap-1 text-[#06b6d4] flex-shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#06b6d4]" />
              <span className="w-0.5 h-5 bg-[#06b6d4]" />
              <span className="w-2 h-2 rounded-full bg-[#06b6d4]" />
            </div>
            {showText && (
              <span className="font-black text-slate-800 text-base sm:text-lg lowercase tracking-tight font-['Outfit',sans-serif] whitespace-nowrap">
                branch
              </span>
            )}
          </div>
        );

      // Default fallback
      default:
        return (
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="h-7 w-7 rounded-lg bg-pink-100 flex items-center justify-center text-[#E81E76] font-black text-xs flex-shrink-0">
              {actualName.substring(0, 2).toUpperCase() || 'BK'}
            </div>
            {showText && <span className="font-bold text-slate-800 text-xs whitespace-nowrap">{actualName}</span>}
          </div>
        );
    }
  };

  return (
    <div className={`inline-flex items-center justify-center transition-all ${sizeClasses[size]} ${className}`}>
      {renderLogo()}
    </div>
  );
};
