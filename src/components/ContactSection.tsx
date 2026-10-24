import React, { useState } from 'react';
import { MessageCircle, Youtube, Mail, Phone, Copy, Check, Send, Sparkles, ExternalLink } from 'lucide-react';
import { formatWhatsAppUrl } from '../utils/readingTime';

interface ContactSectionProps {
  language?: 'ar' | 'en';
}

export const ContactSection: React.FC<ContactSectionProps> = ({ language = 'ar' }) => {
  const isAr = language === 'ar';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch (e) {}
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    const subject = encodeURIComponent(
      isAr ? `رسالة من موقع توازن - ${name}` : `Message from Tawazon - ${name}`
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:madhaqtabiei@gmail.com?subject=${subject}&body=${body}`;

    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      setName('');
      setEmail('');
      setMessage('');
    }, 4000);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-cyan-300 text-xs font-bold mb-3 border border-blue-200 dark:border-blue-800">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
            <span>{isAr ? 'قنوات التواصل الرسمية' : 'Official Channels'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
            {isAr ? 'تواصل معنا وتابع قنواتنا' : 'Connect With Us & Follow'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 font-medium">
            {isAr
              ? 'نسعد بالإجابة على استفساراتكم والتعاون في نشر المحتوى الصحي والتوعوي.'
              : 'We welcome your inquiries, feedback, and collaborations for mindful wellness.'}
          </p>
        </div>

        {/* Top Prominent Cards: WhatsApp 0725968984 & YouTube @MadhaqTabiei in Blue & White Palette */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* WhatsApp Card - Styled strictly in Royal Blue / Deep Navy */}
          <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-400/30 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 backdrop-blur-md flex items-center justify-center text-cyan-200">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/15 border border-white/25 text-cyan-200">
                  {isAr ? 'رد سريع ومباشر' : 'Direct Support'}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black mb-1">
                {isAr ? 'تواصل فوري عبر واتساب' : 'Direct Contact via WhatsApp'}
              </h3>
              <p className="text-blue-100/90 text-xs sm:text-sm mb-4 leading-relaxed">
                {isAr
                  ? 'راسل إدارة المنصة مباشرة لأي استفسار أو اقتراح أو طلب استشارة تثقيفية.'
                  : 'Message our team directly for inquiries, feedback, or mindful guidance.'}
              </p>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-black/25 border border-blue-400/30 mb-6">
                <Phone className="w-5 h-5 text-cyan-300 shrink-0" />
                <div className="dir-ltr text-left">
                  <span className="text-lg font-black tracking-wider text-white">0725968984</span>
                  <span className="block text-[11px] text-cyan-200">
                    {isAr ? 'الدولي: +212 725-968984' : 'Intl: +212 725-968984'}
                  </span>
                </div>
              </div>
            </div>

            <a
              href={formatWhatsAppUrl('0725968984', isAr ? 'السلام عليكم، أود التواصل مع إدارة موقع توازن' : 'Hello, I would like to connect with Tawazon platform')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 rounded-2xl bg-white hover:bg-cyan-50 text-blue-950 font-black text-sm shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 text-blue-700" />
              <span>{isAr ? 'فتح المحادثة على واتساب (0725968984)' : 'Chat on WhatsApp (0725968984)'}</span>
              <ExternalLink className="w-4 h-4 text-blue-700" />
            </a>
          </div>

          {/* YouTube Channel Card - Styled strictly in Navy / Deep Blue */}
          <div className="bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-500/30 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 backdrop-blur-md flex items-center justify-center text-cyan-200">
                  <Youtube className="w-7 h-7" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/15 border border-white/25 text-cyan-200">
                  {isAr ? 'قناة رسمية' : 'Official Channel'}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black mb-1">
                {isAr ? 'قناة مذاق طبيعي على يوتيوب' : 'Madhaq Tabiei YouTube Channel'}
              </h3>
              <p className="text-blue-100/90 text-xs sm:text-sm mb-4 leading-relaxed">
                {isAr
                  ? 'تابع مقاطع التغذية الطبيعية، وصفات الصحة الوقائية، وشروحات العناية بالجسد والنفس.'
                  : 'Watch video guides on natural wellness, holistic balance, and mindful lifestyle.'}
              </p>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-black/25 border border-blue-400/30 mb-6">
                <span className="text-base font-black text-white dir-ltr">@MadhaqTabiei</span>
                <span className="text-xs text-cyan-200">· {isAr ? 'شروحات مرئية هادفة' : 'Weekly Guides'}</span>
              </div>
            </div>

            <a
              href="https://www.youtube.com/@MadhaqTabiei"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 rounded-2xl bg-white hover:bg-cyan-50 text-blue-950 font-black text-sm shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <Youtube className="w-5 h-5 text-blue-900" />
              <span>{isAr ? 'زيارة القناة والاشتراك (@MadhaqTabiei)' : 'Visit & Subscribe (@MadhaqTabiei)'}</span>
              <ExternalLink className="w-4 h-4 text-blue-900" />
            </a>
          </div>
        </div>

        {/* Email & Form Section */}
        <div className="bg-slate-50 dark:bg-slate-800/80 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-blue-900/40 shadow-sm max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                {isAr ? 'نموذج المراسلة المباشرة' : 'Direct Message Form'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isAr ? 'البريد الإلكتروني المباشر:' : 'Direct Email:'}{' '}
                <span className="font-bold text-blue-600 dark:text-cyan-400">madhaqtabiei@gmail.com</span>
              </p>
            </div>

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-blue-50 transition-all cursor-pointer"
            >
              {copiedLink ? <Check className="w-4 h-4 text-cyan-400" /> : <Copy className="w-4 h-4 text-blue-600 dark:text-cyan-400" />}
              <span>{copiedLink ? (isAr ? 'تم نسخ رابط الموقع!' : 'Link copied!') : (isAr ? 'نسخ رابط الموقع' : 'Copy site link')}</span>
            </button>
          </div>

          {sentSuccess ? (
            <div className="p-5 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-cyan-200 text-center text-xs">
              <Check className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
              <span className="font-bold block text-sm">
                {isAr ? 'تم إعداد الرسالة بنجاح!' : 'Message prepared successfully!'}
              </span>
              {isAr ? 'سيتم فتح برنامج بريدك لإرسال الرسالة إلى فريق توازن.' : 'Your email client has been opened.'}
            </div>
          ) : (
            <form onSubmit={handleSendMessage} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'الاسم الكامل' : 'Full Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isAr ? 'أدخل اسمك الكريم' : 'Enter your name'}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'بريدك الإلكتروني' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isAr ? 'نص الرسالة أو الاستفسار' : 'Your Message'}
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    isAr
                      ? 'اكتب رسالتك، اقتراحك، أو استفسارك هنا...'
                      : 'Write your message or inquiry here...'
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                <Send className="w-4 h-4 text-cyan-200" />
                <span>{isAr ? 'إرسال الرسالة عبر البريد' : 'Send Message'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
