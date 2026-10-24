import React from 'react';
import { Youtube, MessageCircle, Mail, ArrowUp } from 'lucide-react';
import { formatWhatsAppUrl } from '../utils/readingTime';

interface FooterProps {
  language?: 'ar' | 'en';
}

export const Footer: React.FC<FooterProps> = ({ language = 'ar' }) => {
  const isAr = language === 'ar';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-blue-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-blue-950">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md">
                <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
                  <path d="M10 27h28" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
                  <path d="M24 13v14" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
                  <circle cx="15" cy="33" r="4" fill="#67e8f9" />
                  <circle cx="33" cy="33" r="4" fill="#67e8f9" />
                </svg>
              </div>
              <span className="text-xl font-black text-white">TAWAZONE</span>
            </div>
            <p className="text-xs sm:text-sm text-blue-200/70 leading-relaxed">
              {isAr
                ? 'مساحة هادئة لتحسين جودة حياتك: عقل متزن، وجسد نشيط، ونفس مطمئنة، وروح ساكنة. مقالات تثقيفية موثوقة مع قارئ صوتي متقدم وفيديو أمواج السكينة.'
                : 'A serene sanctuary for holistic wellness: balanced mind, vital body, tranquil heart, and peaceful spirit. Featuring advanced voice narration.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-extrabold text-cyan-200 mb-4">
              {isAr ? 'الأركان والمقالات' : 'Pillars & Articles'}
            </h4>
            <ul className="space-y-2 text-xs text-blue-200/60">
              <li><a href="#psych" className="hover:text-cyan-300 transition-colors">{isAr ? 'العلاج النفسي والسكينة' : 'Psychological Healing'}</a></li>
              <li><a href="#body" className="hover:text-cyan-300 transition-colors">{isAr ? 'العلاج الجسدي والتغذية' : 'Physical Healing'}</a></li>
              <li><a href="#mind" className="hover:text-cyan-300 transition-colors">{isAr ? 'العلاج العقلي والتركيز' : 'Mental Healing'}</a></li>
              <li><a href="#spirit" className="hover:text-cyan-300 transition-colors">{isAr ? 'العلاج الروحي والامتنان' : 'Spiritual Healing'}</a></li>
              <li><a href="#articles" className="hover:text-cyan-300 transition-colors">{isAr ? 'المقالات الصوتية المكتملة' : 'Audio Articles'}</a></li>
              <li><a href="#community" className="hover:text-cyan-300 transition-colors">{isAr ? 'مجتمع الزوار والآراء' : 'Community Reviews'}</a></li>
            </ul>
          </div>

          {/* Official Channels - Styled Strictly Blue & Cyan */}
          <div>
            <h4 className="text-sm font-extrabold text-cyan-200 mb-4">
              {isAr ? 'قنواتنا المعتمدة' : 'Official Channels'}
            </h4>
            <div className="space-y-2.5">
              <a
                href={formatWhatsAppUrl('0725968984', isAr ? 'السلام عليكم، أود التواصل مع إدارة TAWAZONE' : 'Hello, connecting with TAWAZONE')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-blue-950/70 border border-blue-700/50 text-cyan-200 hover:bg-blue-900/60 text-xs font-bold transition-all"
              >
                <MessageCircle className="w-4 h-4 text-cyan-400" />
                <span>{isAr ? 'واتساب: 0725968984' : 'WhatsApp: 0725968984'}</span>
              </a>

              <a
                href="https://www.youtube.com/@MadhaqTabiei"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-blue-950/80 border border-blue-700/50 text-cyan-200 hover:bg-blue-900/60 text-xs font-bold transition-all"
              >
                <Youtube className="w-4 h-4 text-cyan-400" />
                <span>{isAr ? 'يوتيوب: @MadhaqTabiei' : 'YouTube: @MadhaqTabiei'}</span>
              </a>

              <a
                href="mailto:madhaqtabiei@gmail.com"
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-blue-950/60 border border-blue-800/40 text-blue-300 hover:bg-blue-900/60 text-xs font-bold transition-all"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>madhaqtabiei@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Legal and Safety */}
          <div>
            <h4 className="text-sm font-extrabold text-cyan-200 mb-4">
              {isAr ? 'السياسات والأمان' : 'Policies & Safety'}
            </h4>
            <ul className="space-y-2 text-xs text-blue-200/60 mb-4">
              <li><a href="#policies" className="hover:text-cyan-300 transition-colors">{isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}</a></li>
              <li><a href="#policies" className="hover:text-cyan-300 transition-colors">{isAr ? 'شروط الاستخدام' : 'Terms of Use'}</a></li>
              <li><a href="#policies" className="hover:text-cyan-300 transition-colors">{isAr ? 'إخلاء المسؤولية الطبية' : 'Medical Disclaimer'}</a></li>
              <li><a href="#submit" className="hover:text-cyan-300 transition-colors">{isAr ? 'سياسة نشر المقالات' : 'Publication Policy'}</a></li>
            </ul>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
              <span>{isAr ? 'العودة إلى أعلى الصفحة' : 'Scroll to top'}</span>
            </button>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-200/50">
          <p>© {new Date().getFullYear()} {isAr ? 'منصة TAWAZONE. جميع الحقوق محفوظة.' : 'TAWAZONE Platform. All rights reserved.'}</p>
          <p className="text-center sm:text-left text-[11px] text-blue-200/50 max-w-md">
            {isAr
              ? 'المحتوى تثقيفي وتوعوي ولا يحل محل استشارة طبيب أو مختص نفسي مرخص.'
              : 'Educational content for wellness guidance; not a substitute for clinical medical advice.'}
          </p>
        </div>
      </div>
    </footer>
  );
};
