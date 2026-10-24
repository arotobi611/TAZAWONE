import React, { useState } from 'react';
import { PenTool, CheckCircle, FileText, Send, Eye } from 'lucide-react';

interface SubmitArticleSectionProps {
  language?: 'ar' | 'en';
}

export const SubmitArticleSection: React.FC<SubmitArticleSectionProps> = ({ language = 'ar' }) => {
  const isAr = language === 'ar';
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms || !authorName || !title || !content) return;

    setIsSubmitted(true);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setAuthorName('');
    setAuthorEmail('');
    setTitle('');
    setCategory('');
    setContent('');
    setAgreeTerms(false);
  };

  return (
    <section id="submit" className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-900/40 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-cyan-300 text-xs font-bold mb-3 border border-blue-200 dark:border-blue-800">
            <PenTool className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
            <span>{isAr ? 'منصة النشر المفتوح للمختصين والباحثين' : 'Open Publication for Specialists'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
            {isAr ? 'اكتب وانشر مقالك على TAWAZONE' : 'Publish Your Article on TAWAZONE'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 font-medium">
            {isAr
              ? 'تُراجع كل المقالات بعناية لضمان سلامتها العلمية واللغوية وموافقتها لمعايير التثقيف الهادئ.'
              : 'All articles are thoughtfully reviewed for scientific rigor, clarity, and mindful depth.'}
          </p>
        </div>

        {/* Workflow indicator */}
        <div className="mb-8 p-4 rounded-2xl bg-blue-900 text-white shadow-md">
          <h4 className="text-xs font-bold text-cyan-300 mb-2">
            {isAr ? 'مراحل تدقيق المقال ونشره:' : 'Editorial Review Workflow:'}
          </h4>
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="flex items-center gap-1.5 font-bold text-white bg-blue-800 px-2.5 py-1 rounded-lg">
              {isAr ? '1. إرسال المسودة' : '1. Draft Submission'}
            </span>
            <span className="text-blue-400">←</span>
            <span className="flex items-center gap-1.5 text-blue-200">
              {isAr ? '2. المراجعة والتدقيق' : '2. Editorial Review'}
            </span>
            <span className="text-blue-400">←</span>
            <span className="flex items-center gap-1.5 text-blue-200">
              {isAr ? '3. الاعتماد والجدولة' : '3. Approval & Scheduling'}
            </span>
            <span className="text-blue-400">←</span>
            <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
              {isAr ? '4. النشر التفاعلي والصوتي' : '4. Interactive & Audio Publish'}
            </span>
          </div>
        </div>

        {isSubmitted ? (
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-blue-300 dark:border-blue-700 text-center shadow-lg animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-cyan-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-9 h-9" />
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">
              {isAr ? 'تم استلام مسودة مقالك بنجاح!' : 'Your article draft has been received!'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-6 leading-relaxed">
              {isAr
                ? 'يقوم فريق التحرير بمراجعة المحتوى وإشعارك بالبريد الإلكتروني بقرار النشر خلال 48 ساعة كحد أقصى.'
                : 'Our editorial team will review your submission and email you within 48 hours.'}
            </p>
            <button
              onClick={resetForm}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all cursor-pointer"
            >
              {isAr ? 'إرسال مقال آخر' : 'Submit Another Article'}
            </button>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-blue-900/40 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'اسم الكاتب / الباحث' : 'Author / Specialist Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder={isAr ? 'الاسم الكامل أو المستعار' : 'Your full name or pen name'}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'البريد الإلكتروني للمتابعة' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    required
                    value={authorEmail}
                    onChange={(e) => setAuthorEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'عنوان المقال' : 'Article Title'}
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={isAr ? 'مثال: كيف تبني روتيناً صباحياً هادئاً؟' : 'e.g. Building a Calming Morning Ritual'}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'قسم المقال' : 'Category'}
                  </label>
                  <select
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-white"
                  >
                    <option value="">{isAr ? 'اختر القسم...' : 'Select Category...'}</option>
                    <option value="psych">{isAr ? 'العلاج النفسي' : 'Psychological Healing'}</option>
                    <option value="body">{isAr ? 'العلاج الجسدي' : 'Physical Healing'}</option>
                    <option value="mind">{isAr ? 'العلاج العقلي' : 'Mental Healing'}</option>
                    <option value="spirit">{isAr ? 'العلاج الروحي' : 'Spiritual Healing'}</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isAr ? 'نص المقال الكامل' : 'Full Article Content'}
                  </label>
                  <span className="text-[11px] text-slate-400">
                    {content.trim() ? content.trim().split(/\s+/).length : 0} {isAr ? 'كلمة' : 'words'}
                  </span>
                </div>
                <textarea
                  required
                  rows={6}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={
                    isAr
                      ? 'اكتب المقال مع ذكر المصادر والتجارب بأسلوب هادئ وموثوق...'
                      : 'Write your mindful article with references and practical reflections...'
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-start gap-2 pt-2">
                <input
                  type="checkbox"
                  id="agree-terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1 accent-blue-600 rounded cursor-pointer"
                />
                <label htmlFor="agree-terms" className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed cursor-pointer">
                  {isAr
                    ? 'أقر بأن المقال غير منسوخ، وملتزم بمعايير التوعية الصحية العامة ولا يقدم وعوداً طبية غير مثبتة.'
                    : 'I confirm this content is original, scientifically sound, and intended for educational wellness.'}
                </label>
              </div>

              <button
                type="submit"
                disabled={!agreeTerms}
                className={`w-full py-3.5 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  agreeTerms
                    ? 'bg-blue-600 hover:bg-blue-500 text-white active:scale-95'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4 text-cyan-200" />
                <span>{isAr ? 'إرسال المقال للمراجعة والاعتماد' : 'Submit for Editorial Review'}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
