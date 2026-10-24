import React, { useState } from 'react';
import { ShieldCheck, FileText, AlertCircle, Info } from 'lucide-react';

interface AboutAndPoliciesSectionProps {
  language?: 'ar' | 'en';
}

export const AboutAndPoliciesSection: React.FC<AboutAndPoliciesSectionProps> = ({ language = 'ar' }) => {
  const isAr = language === 'ar';
  const [activeTab, setActiveTab] = useState<'about' | 'privacy' | 'terms' | 'disclaimer'>('about');

  return (
    <section id="about" className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-900/60 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-cyan-300 text-xs font-bold mb-3 border border-blue-200 dark:border-blue-800">
            <Info className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
            <span>{isAr ? 'الشفافية والمسؤولية' : 'Transparency & Policies'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
            {isAr ? 'من نحن والسياسات القانونية' : 'About Us & Policies'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 font-medium">
            {isAr
              ? 'توازن منصة عربية مستقلة تقدم محتوى رصيناً ومسؤولاً للصحة المتكاملة.'
              : 'Tawazon is a dedicated sanctuary providing holistic health and mindful wellness content.'}
          </p>
        </div>

        {/* Tab selection */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8" id="policies">
          <button
            onClick={() => setActiveTab('about')}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'about'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {isAr ? 'من نحن ورؤيتنا' : 'About Us'}
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'privacy'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'terms'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {isAr ? 'شروط الاستخدام' : 'Terms of Use'}
          </button>
          <button
            onClick={() => setActiveTab('disclaimer')}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'disclaimer'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {isAr ? 'إخلاء المسؤولية الطبية' : 'Medical Disclaimer'}
          </button>
        </div>

        {/* Tab Content Box */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-blue-900/40 shadow-sm leading-relaxed text-sm sm:text-base text-slate-700 dark:text-slate-300">
          {activeTab === 'about' && (
            <div className="space-y-4">
              <h3 className="text-xl font-black text-blue-900 dark:text-cyan-300 mb-2">
                {isAr ? 'عن منصة توازون (TAWAZONE)' : 'About TAWAZONE Platform'}
              </h3>
              <p>
                {isAr
                  ? 'منصة TAWAZONE موقع عربي رائد تأسس لتقديم محتوى تثقيفي منظم وعلمي عن الصحة النفسية، والجسدية، والعقلية، والروحية. نهدف إلى مد جسور المعرفة الهادئة بعيداً عن التهويل التجاري، والتشخيصات العشوائية، والوعود الزائفة.'
                  : 'TAWAZONE is an independent sanctuary established to share structured, scientifically grounded articles covering psychological, physical, mental, and spiritual wellness without commercial sensationalism.'}
              </p>
              <p>
                {isAr
                  ? 'نؤمن بأن الإنسان كلٌّ لا يتجزأ: فالقلق في النفس يؤثر على الجهاز الهضمي، ونوعية الغذاء تنعكس على صفاء التفكير، والسكينة الروحية تمنح العقل والجسد درعاً من الرضا والمرونة في مواجهة تقلبات الحياة.'
                  : 'We view human wellbeing holistically: emotional anxiety impacts the physical body, nutrition influences cognitive clarity, and spiritual tranquility fosters resilience through life.'}
              </p>
              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-slate-750 border border-blue-100 dark:border-slate-700">
                  <h4 className="font-extrabold text-blue-800 dark:text-cyan-300 text-sm mb-1">
                    {isAr ? 'رسالتنا' : 'Our Mission'}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {isAr
                      ? 'تمكين القارئ من فهم جسده ونفسه وتطوير عادات يومية تمنحه هدوءاً واستقراراً مستداماً.'
                      : 'Empowering individuals to understand body and mind, nurturing calming, restorative habits.'}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-slate-750 border border-blue-100 dark:border-slate-700">
                  <h4 className="font-extrabold text-blue-800 dark:text-cyan-300 text-sm mb-1">
                    {isAr ? 'قيمنا الجوهرية' : 'Core Values'}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {isAr
                      ? 'الأمانة العلمية، والاعتدال، والوضوح، والحرص على الصحة العامة والسكينة الداخلية.'
                      : 'Scientific integrity, moderation, mindful clarity, and dedication to inner serenity.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h3 className="text-xl font-black text-blue-900 dark:text-cyan-300 mb-2 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <span>{isAr ? 'سياسة الخصوصية وحماية البيانات' : 'Privacy & Data Protection'}</span>
              </h3>
              <p>
                {isAr
                  ? 'نولي خصوصيتك في TAWAZONE أعلى درجات الأهمية والاحترام. هذه النسخة من الموقع لا تجمع بيانات شخصية حساسة بدون إذنك الصريح، ولا تستخدم ملفات تتبع تجارية مزعجة.'
                  : 'We hold your privacy in the highest regard at TAWAZONE. We do not harvest personal data without explicit intent or use intrusive trackers.'}
              </p>
              <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <li>
                  {isAr
                    ? 'يتم حفظ تفضيل الوضع الليلي ومقالاتك المفضلة وبيانات الحساب محلياً بأمان على جهازك (Local Storage).'
                    : 'Theme preferences, bookmarks, and account credentials are stored securely and locally in your browser.'}
                </li>
                <li>
                  {isAr
                    ? 'عند التواصل عبر واتساب أو نموذج البريد، تتم المراسلة مباشرة عبر حسابك الشخصي ولا يتم تخزين الرسائل على خوادم وسيطة غير آمنة.'
                    : 'Direct messages via WhatsApp and email open directly in your own applications.'}
                </li>
                <li>
                  {isAr
                    ? 'لا نقوم ببيع أو تأجير أو مشاركة أي بيانات اتصال مع أطراف دعائية إعلانية على الإطلاق.'
                    : 'We never sell, rent, or share user contacts with commercial advertisers.'}
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h3 className="text-xl font-black text-blue-900 dark:text-cyan-300 mb-2 flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                <span>{isAr ? 'شروط الاستخدام وحقوق النشر' : 'Terms of Use & Copyright'}</span>
              </h3>
              <p>
                {isAr
                  ? 'المحتوى المنشور على منصة "TAWAZONE" متاح للتثقيف الشخصي والتوعية العامة. يحظر نسخ المقالات أو إعادة نشرها تجارياً دون ذكر المصدر برابط مباشر واضح إلى الموقع.'
                  : 'All publications on TAWAZONE are provided for mindful reflection and educational reading. Attribution is required for any quotations.'}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                {isAr
                  ? 'أي مشاركة أو مقال يتم إرساله عبر نموذج "اكتب معنا" يخضع للمراجعة والتدقيق، ويحتفظ الموقع بحق رفض أي مادة تتضمن ادعاءات مضللة أو تشخيصات طبية قاطعة أو روابط مخالفة.'
                  : 'Submissions through open publication undergo editorial review to safeguard community standards.'}
              </p>
            </div>
          )}

          {activeTab === 'disclaimer' && (
            <div className="space-y-4">
              <h3 className="text-xl font-black text-blue-900 dark:text-cyan-300 mb-2 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-cyan-400" />
                <span>{isAr ? 'إخلاء المسؤولية الطبية والنفسية' : 'Medical & Psychological Disclaimer'}</span>
              </h3>
              <div className="p-4 rounded-2xl bg-blue-950/40 dark:bg-blue-950/60 border border-blue-400/40 text-xs sm:text-sm text-cyan-100 leading-relaxed space-y-2">
                <p>
                  <strong>{isAr ? 'تنبيه هام ومسؤول:' : 'Important Notice:'}</strong>{' '}
                  {isAr
                    ? 'جميع المقالات والتمارين والنصائح المنشورة على موقع TAWAZONE هي مواد تثقيفية عامة، ولا يمكن اعتبارها بأي حال من الأحوال تشخيصاً طبياً، أو وصفة علاجية، أو بديلاً عن استشارة الطبيب البشري أو المعالج النفسي المرخص.'
                    : 'All articles, breathing exercises, and educational materials are intended for general wellbeing and information only. They are not medical diagnoses or clinical prescriptions.'}
                </p>
                <p>
                  {isAr
                    ? 'لا توقف أو تعدل جرعة أي دواء نفسي أو جسدي بناءً على قراءتك لأي مقال دون استشارة طبيبك المباشر.'
                    : 'Do not adjust or cease any prescribed medication without direct guidance from your medical doctor.'}
                </p>
                <p>
                  {isAr
                    ? 'إذا كنت تعاني من أعراض اكتئاب حاد أو تراودك أفكار بإيذاء النفس، فيرجى التوجه إلى أقرب مستشفى أو الاتصال بخطوط المساعدة النفسية والطوارئ المعتمدة في بلدك فوراً.'
                    : 'In case of severe crises or emergencies, please reach out immediately to your local emergency medical services.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
