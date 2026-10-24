import React, { useState, useEffect } from 'react';
import { MessageCircle, Youtube, ArrowUp, Wind } from 'lucide-react';
import { formatWhatsAppUrl } from '../utils/readingTime';

interface FloatingActionsProps {
  onOpenBreathing?: () => void;
  language?: 'ar' | 'en';
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenBreathing, language = 'ar' }) => {
  const isAr = language === 'ar';
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Scroll to top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="pointer-events-auto p-3 rounded-2xl bg-white dark:bg-slate-800 text-blue-600 dark:text-cyan-400 shadow-xl border border-blue-200 dark:border-blue-900/50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          aria-label={isAr ? 'العودة لأعلى الصفحة' : 'Scroll to top'}
          title={isAr ? 'أعلى الصفحة' : 'Top'}
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Floating Breathing Tool Quick Launcher */}
      <button
        onClick={onOpenBreathing}
        className="pointer-events-auto p-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer group relative border border-blue-400/30"
        aria-label={isAr ? 'تمرين التنفس السريع' : 'Breathing Exercise'}
        title={isAr ? 'تمرين التنفس' : 'Breathing'}
      >
        <Wind className="w-5 h-5 animate-pulse text-cyan-200" />
        <span className="absolute right-14 top-2 bg-blue-950 text-cyan-200 text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg border border-blue-400/20">
          {isAr ? 'تمرين التنفس والسكينة' : 'Breathing Exercise'}
        </span>
      </button>

      {/* Floating YouTube Button - Deep Navy and Cyan Accent */}
      <a
        href="https://www.youtube.com/@MadhaqTabiei"
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto p-3 rounded-2xl bg-gradient-to-tr from-blue-900 via-indigo-950 to-slate-950 hover:from-blue-800 hover:to-indigo-900 text-cyan-200 shadow-xl border border-blue-400/30 hover:scale-105 active:scale-95 transition-all cursor-pointer group relative"
        aria-label="YouTube @MadhaqTabiei"
        title="YouTube @MadhaqTabiei"
      >
        <Youtube className="w-5 h-5" />
        <span className="absolute right-14 top-2 bg-blue-950 text-cyan-200 text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg border border-blue-400/20">
          {isAr ? 'قناة مذاق طبيعي (@MadhaqTabiei)' : 'YouTube (@MadhaqTabiei)'}
        </span>
      </a>

      {/* Floating WhatsApp Quick Chat Button - Blue & Cyan Gradient */}
      <a
        href={formatWhatsAppUrl('0725968984', isAr ? 'السلام عليكم، أود التواصل مع إدارة TAWAZONE' : 'Hello, I would like to connect with TAWAZONE platform')}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 hover:from-blue-600 hover:to-cyan-500 text-white shadow-2xl border border-cyan-400/30 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
        aria-label="WhatsApp 0725968984"
        title="WhatsApp 0725968984"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 text-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-300 rounded-full animate-ping" />
        </div>
        <span className="text-xs font-extrabold hidden sm:inline text-white">
          {isAr ? 'واتساب: 0725968984' : 'WhatsApp: 0725968984'}
        </span>
      </a>
    </div>
  );
};
