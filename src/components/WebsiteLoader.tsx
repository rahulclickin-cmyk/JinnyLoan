import React, { useState, useEffect } from 'react';
import { JinnyLogo } from './JinnyLogo';
import { ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { FloatingPathsBackground } from './ui/floating-paths';

interface WebsiteLoaderProps {
  onLoaded?: () => void;
  minDurationMs?: number;
}

export const WebsiteLoader: React.FC<WebsiteLoaderProps> = ({ 
  onLoaded,
  minDurationMs = 1200 
}) => {
  const [progress, setProgress] = useState(15);
  const [statusText, setStatusText] = useState('Initializing secure portal...');
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Stage 1
    const t1 = setTimeout(() => {
      setProgress(48);
      setStatusText('Connecting 30+ RBI-regulated lenders...');
    }, minDurationMs * 0.25);

    // Stage 2
    const t2 = setTimeout(() => {
      setProgress(82);
      setStatusText('Verifying bank interest rates & instant approvals...');
    }, minDurationMs * 0.65);

    // Stage 3
    const t3 = setTimeout(() => {
      setProgress(100);
      setStatusText('Welcome to JinnyLoan Marketplace!');
    }, minDurationMs * 0.95);

    // Stage 4: Trigger fade out
    const t4 = setTimeout(() => {
      setIsFadingOut(true);
    }, minDurationMs + 200);

    // Stage 5: Unmount loader
    const t5 = setTimeout(() => {
      setIsVisible(false);
      if (onLoaded) onLoaded();
    }, minDurationMs + 650);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [minDurationMs, onLoaded]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950 transition-opacity duration-500 select-none overflow-hidden ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="Website Loading"
    >
      {/* Dynamic Animated Floating Paths Component in the Background */}
      <div className="absolute inset-0 opacity-40 text-blue-500 pointer-events-none">
        <FloatingPathsBackground position={1}>
          <div className="w-full h-full" />
        </FloatingPathsBackground>
      </div>

      {/* Ambient Gradient Glows */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#E81E76]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
        {/* Logo Container with Pulsing Halo */}
        <div className="relative mb-6">
          <div className="absolute -inset-4 bg-gradient-to-r from-[#E81E76] to-blue-600 rounded-full opacity-30 blur-xl animate-pulse" />
          <div className="relative bg-slate-900/90 border border-white/10 p-4 rounded-3xl shadow-2xl backdrop-blur-md">
            <JinnyLogo size="lg" variant="white" />
          </div>
        </div>

        {/* Status Line */}
        <div className="flex items-center gap-2 text-xs font-semibold text-pink-300 mb-4 h-5">
          {progress === 100 ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-bounce" />
          ) : (
            <Sparkles className="w-4 h-4 text-yellow-400 animate-spin" />
          )}
          <span className="tracking-wide">{statusText}</span>
        </div>

        {/* Progress Bar Container */}
        <div className="w-64 h-2 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/10 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-[#E81E76] via-purple-500 to-blue-500 rounded-full transition-all duration-300 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full" />
          </div>
        </div>

        {/* Percent & Trust Badges */}
        <div className="w-64 flex justify-between items-center text-[10px] text-slate-400 font-mono mt-2">
          <span>{progress}%</span>
          <span className="flex items-center gap-1 text-slate-400">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            256-Bit Encrypted
          </span>
        </div>
      </div>
    </div>
  );
};
