import React, { useState } from 'react';
import { Star, MessageSquare, CheckCircle2, User, Sparkles } from 'lucide-react';
import { Review } from '../types';

interface CommunitySectionProps {
  language?: 'ar' | 'en';
}

export const CommunitySection: React.FC<CommunitySectionProps> = ({ language = 'ar' }) => {
  const isAr = language === 'ar';

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 'rev-1',
      name: isAr ? 'سارة المنصوري' : 'Sarah Al-Mansouri',
      category: isAr ? 'العلاج النفسي' : 'Psychological Healing',
      rating: 5,
      comment: isAr
        ? 'ميزة الاستماع الصوتي للمقالات مدهشة جداً! أستمع لها أثناء طريقي للعمل في الصباح وأشعر بطمأنينة وسكينة حقيقية بدلاً من ضغط الزحام.'
        : 'The audio listening feature for articles is wonderful! I listen on my morning commute and feel genuine calm instead of traffic stress.',
      date: isAr ? 'منذ يومين' : '2 days ago'
    },
    {
      id: 'rev-2',
      name: isAr ? 'د. يونس التازي' : 'Dr. Younes Tazi',
      category: isAr ? 'العلاج الجسدي' : 'Physical Healing',
      rating: 5,
      comment: isAr
        ? 'محتوى متزن علمياً وبعيد عن الإثارة التجارية الرخيصة. مقال الترطيب ومحور الأمعاء والمخ مكتوب بلغة رصينة ومفهومة للجميع.'
        : 'Scientifically sound content without gimmicks. The cellular hydration and gut-brain axis articles are clearly articulated.',
      date: isAr ? 'منذ 5 أيام' : '5 days ago'
    },
    {
      id: 'rev-3',
      name: isAr ? 'فاطمة الزهراء' : 'Fatima Al-Zahra',
      category: isAr ? 'العلاج الروحي' : 'Spiritual Healing',
      rating: 5,
      comment: isAr
        ? 'تمرين التنفس 4-7-8 ساعدني كثيراً في التغلب على نوبات القلق قبل النوم. جزاكم الله خيراً على هذا العمل النبيل والمتقن.'
        : 'The 4-7-8 breathing exercise helped me tremendously with bedtime anxiety. Heartfelt thanks for this noble and elegant work.',
      date: isAr ? 'منذ أسبوع' : '1 week ago'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [rating, setRating] = useState(5);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment || !name || !selectedCategory) return;

    const newRev: Review = {
      id: 'rev-' + Date.now(),
      name,
      category: selectedCategory,
      rating,
      comment,
      date: isAr ? 'الآن' : 'Just now'
    };

    setReviews([newRev, ...reviews]);
    setSubmitted(true);
    setName('');
    setComment('');
    setSelectedCategory('');

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section id="community" className="py-16 sm:py-20 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-cyan-300 text-xs font-bold mb-3 border border-blue-200 dark:border-blue-800">
            <MessageSquare className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
            <span>{isAr ? 'تجارب القراء والزوار' : 'Reader & Visitor Experiences'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
            {isAr ? 'مجتمع توازن وآراء الزوار' : 'Tawazon Community Reviews'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 font-medium">
            {isAr
              ? 'قيّم المنصة وشاركنا أثر القراءات والتمارين في حياتك اليومية. الآراء تجارب شخصية تثقيفية وليست وعوداً علاجية.'
              : 'Share your reflections and experience with our mindful readings. Educational experiences for mindful living.'}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Rating Form Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-blue-50/70 to-indigo-50/50 dark:from-slate-800 dark:to-slate-850 p-6 sm:p-8 rounded-3xl border border-blue-200/80 dark:border-blue-900/50 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">
              {isAr ? 'أضف تقييمك ورأيك' : 'Submit Your Review'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              {isAr
                ? 'رأيك الصادق يساعدنا في تطوير المحتوى وتوسيع دائرة النفع.'
                : 'Your thoughtful feedback helps improve our mindful sanctuary.'}
            </p>

            {submitted ? (
              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-cyan-200 text-xs text-center">
                <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-cyan-500 dark:text-cyan-400" />
                <span className="font-bold block text-sm">
                  {isAr ? 'شكراً لمشاركتك الكريمة!' : 'Thank you for your feedback!'}
                </span>
                {isAr ? 'تمت إضافة رأيك بنجاح في مجتمع توازن.' : 'Your review was published successfully.'}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'اسمك أو لقبك' : 'Your Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isAr ? 'مثال: عبد الرحيم - قارئ وفي' : 'e.g. Alex - Mindful Reader'}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'القسم المعني بالتقييم' : 'Category'}
                  </label>
                  <select
                    required
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">{isAr ? 'اختر القسم...' : 'Select Category...'}</option>
                    <option value={isAr ? 'العلاج النفسي' : 'Psychological Healing'}>
                      {isAr ? 'العلاج النفسي' : 'Psychological Healing'}
                    </option>
                    <option value={isAr ? 'العلاج الجسدي' : 'Physical Healing'}>
                      {isAr ? 'العلاج الجسدي' : 'Physical Healing'}
                    </option>
                    <option value={isAr ? 'العلاج العقلي' : 'Mental Healing'}>
                      {isAr ? 'العلاج العقلي' : 'Mental Healing'}
                    </option>
                    <option value={isAr ? 'العلاج الروحي' : 'Spiritual Healing'}>
                      {isAr ? 'العلاج الروحي' : 'Spiritual Healing'}
                    </option>
                    <option value={isAr ? 'الموقع بشكل عام' : 'General Platform'}>
                      {isAr ? 'الموقع بشكل عام' : 'General Platform'}
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'التقييم بالنجوم' : 'Star Rating'}
                  </label>
                  <div className="flex items-center gap-2 py-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 focus:outline-none cursor-pointer"
                        aria-label={`${star} stars`}
                      >
                        <Star
                          className={`w-6 h-6 transition-all ${
                            star <= rating
                              ? 'text-cyan-400 fill-cyan-400 scale-110 drop-shadow-sm'
                              : 'text-slate-300 dark:text-slate-600'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-cyan-600 dark:text-cyan-300 mr-2">
                      {rating} / 5
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'رسالتك أو تجربتك' : 'Your Review'}
                  </label>
                  <textarea
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    maxLength={600}
                    rows={4}
                    placeholder={
                      isAr
                        ? 'اكتب تجربتك الشخصية أو اقتراحك لتحسين الموقع...'
                        : 'Share your personal experience or suggestions...'
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  {isAr ? 'نشر التقييم في المجتمع' : 'Publish Review'}
                </button>
              </form>
            )}
          </div>

          {/* Testimonial Cards List */}
          <div className="lg:col-span-7 space-y-4">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-slate-50 dark:bg-slate-800/80 p-5 rounded-3xl border border-slate-200/80 dark:border-blue-900/40 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 dark:text-cyan-400 flex items-center justify-center font-bold text-sm">
                        {rev.name[0] || 'T'}
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-slate-900 dark:text-white">
                          {rev.name}
                        </h4>
                        <span className="text-[11px] font-semibold text-blue-600 dark:text-cyan-400">
                          {rev.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[10px] text-slate-400">
                  <span>{isAr ? 'تجربة موثقة' : 'Verified Experience'}</span>
                  <span>{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
