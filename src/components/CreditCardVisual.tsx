import React from 'react';
import { Wifi } from 'lucide-react';

interface CreditCardVisualProps {
  cardName: string;
  bankName: string;
  network?: 'visa' | 'mastercard' | 'rupay';
  gradient: string;
  chipColor?: string;
  accentTextColor?: string;
  className?: string;
}

export const CreditCardVisual: React.FC<CreditCardVisualProps> = ({
  cardName,
  bankName,
  network = 'visa',
  gradient,
  chipColor = '#e5c07b',
  accentTextColor = 'text-white',
  className = ''
}) => {
  return (
    <div 
      className={`relative rounded-xl sm:rounded-2xl p-3 sm:p-4 text-white shadow-md overflow-hidden aspect-[1.58/1] flex flex-col justify-between ${gradient} ${className}`}
    >
      {/* Background Holographic / Wave Accent */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-white/10 pointer-events-none" />
      <div className="absolute -right-8 -bottom-8 w-28 h-28 rounded-full bg-white/10 blur-xl pointer-events-none" />
      
      {/* Card Top: Bank Name & Contactless Wave */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider opacity-90 drop-shadow-xs">
          {bankName}
        </span>
        <div className="flex items-center gap-1 opacity-80">
          <Wifi className="w-3 h-3 sm:w-3.5 sm:h-3.5 rotate-90" />
        </div>
      </div>

      {/* Card Middle: EMV Chip */}
      <div className="relative z-10 flex items-center gap-2">
        <div 
          className="w-7 h-5 sm:w-8 sm:h-6 rounded-md border border-black/20 shadow-inner flex flex-col justify-around p-0.5"
          style={{ backgroundColor: chipColor }}
        >
          <div className="w-full h-px bg-black/30" />
          <div className="w-full h-px bg-black/30" />
        </div>
        <span className="text-[8px] sm:text-[9px] font-mono tracking-widest text-white/70">
          •••• 4920
        </span>
      </div>

      {/* Card Bottom: Card Title & Network Logo */}
      <div className="relative z-10 flex items-end justify-between">
        <div className="min-w-0 pr-2">
          <span className="block text-[9px] sm:text-[11px] font-bold tracking-tight truncate drop-shadow-xs">
            {cardName}
          </span>
          <span className="block text-[7px] sm:text-[8px] font-medium text-white/75 uppercase tracking-wider">
            Platinum Card
          </span>
        </div>

        {/* Network Logo */}
        <div className="flex-shrink-0">
          {network === 'visa' && (
            <span className="font-black italic text-xs sm:text-sm tracking-tighter text-white drop-shadow-xs">
              VISA
            </span>
          )}
          {network === 'mastercard' && (
            <div className="flex -space-x-1.5 opacity-90">
              <div className="w-4 h-4 rounded-full bg-red-500" />
              <div className="w-4 h-4 rounded-full bg-amber-400 opacity-90" />
            </div>
          )}
          {network === 'rupay' && (
            <div className="flex items-center font-black text-[9px] sm:text-[10px] tracking-tight">
              <span className="text-white">Ru</span>
              <span className="text-emerald-300">Pay</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
