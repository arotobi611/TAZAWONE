import React from 'react';
import { Clock, Bookmark, Headphones, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';
import { Article, CategoryType } from '../types';

interface ArticlesSectionProps {
  articles: Article[];
  selectedCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
  onArticleClick: (article: Article) => void;
  savedArticleIds: string[];
  onToggleBookmark: (articleId: string) => void;
  searchQuery: string;
  onResetSearch: () => void;
  language?: 'ar' | 'en';
}

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({
  articles,
  selectedCategory,
  onSelectCategory,
  onArticleClick,
  savedArticleIds,
  onToggleBookmark,
  searchQuery,
  onResetSearch,
  language = 'ar',
}) => {
  const isAr = language === 'ar';

  const categoryTabs: { id: CategoryType; label: string }[] = isAr
    ? [
        { id: 'all', label: 'جميع المقالات' },
        { id: 'psych', label: 'العلاج النفسي' },
        { id: 'body', label: 'العلاج الجسدي' },
        { id: 'mind', label: 'العلاج العقلي' },
        { id: 'spirit', label: 'العلاج الروحي' },
      ]
    : [
        { id: 'all', label: 'All Articles' },
        { id: 'psych', label: 'Psychological' },
        { id: 'body', label: 'Physical' },
        { id: 'mind', label: 'Mental' },
        { id: 'spirit', label: 'Spiritual' },
      ];

  return (
    <section id="articles" className="py-16 sm:py-20 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-cyan-300 text-xs font-bold mb-3 border border-blue-200 dark:border-blue-800">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
              <span>{isAr ? 'مكتبة المقالات المتخصصة والمحدثة' : 'Curated Mindful Library'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
              {isAr ? 'المقالات والدراسات التوعوية' : 'Holistic Articles & Studies'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 font-medium">
              {isAr
                ? 'جميع المقالات مدعمة بخاصية الاستماع الصوتي الكامل وتوجيهات عملية قابلة للتطبيق.'
                : 'Every article features full voice audio narration and actionable mindful practices.'}
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {categoryTabs.map((tab) => {
              const active = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectCategory(tab.id)}
                  className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Status Notice */}
        {searchQuery && (
          <div className="mb-6 flex items-center justify-between p-3.5 rounded-2xl bg-blue-50 dark:bg-slate-800 border border-blue-200 dark:border-blue-900/40 text-xs sm:text-sm">
            <span className="text-blue-900 dark:text-blue-200">
              {isAr ? 'نتائج البحث عن:' : 'Search results for:'}{' '}
              <strong className="font-black text-blue-600 dark:text-cyan-400">"{searchQuery}"</strong>{' '}
              ({articles.length} {isAr ? 'مقالات' : 'articles'})
            </span>
            <button
              onClick={onResetSearch}
              className="text-xs text-blue-600 dark:text-cyan-400 hover:underline font-bold cursor-pointer"
            >
              {isAr ? 'إلغاء التصفية' : 'Clear Filter'}
            </button>
          </div>
        )}

        {/* Articles Cards Grid */}
        {articles.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
            <Headphones className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">
              {isAr ? 'لم نعثر على مقالات مطابقة' : 'No matching articles found'}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
              {isAr
                ? 'جرب البحث بكلمات أخرى أو اختر قسماً آخر من الأقسام الأربعة.'
                : 'Try searching with different terms or select another category.'}
            </p>
            <button
              onClick={onResetSearch}
              className="px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold cursor-pointer"
            >
              {isAr ? 'إعادة تعيين البحث' : 'Reset Search'}
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {articles.map((article) => {
              const isSaved = savedArticleIds.includes(article.id);

              return (
                <article
                  key={article.id}
                  className="group rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-blue-900/40 hover:border-blue-400 dark:hover:border-cyan-500 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Bluish Curated Image Container */}
                    <div className="relative aspect-[16/10] overflow-hidden cursor-pointer" onClick={() => onArticleClick(article)}>
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover filter brightness-95 saturate-95 group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                      {/* Category Badge */}
                      <div className="absolute top-3 right-3 flex items-center gap-1.5">
                        <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-blue-600/90 text-white shadow-sm backdrop-blur-md">
                          {article.categoryName}
                        </span>
                      </div>

                      {/* Bookmark icon button - strictly Blue/Cyan */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleBookmark(article.id);
                        }}
                        className={`absolute top-3 left-3 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                          isSaved
                            ? 'bg-blue-600 text-cyan-200 shadow-md border border-cyan-400/40'
                            : 'bg-slate-900/60 text-white hover:bg-slate-900/80'
                        }`}
                        aria-label={isSaved ? (isAr ? 'إزالة من المحفوظات' : 'Remove bookmark') : (isAr ? 'حفظ المقال' : 'Save article')}
                        title={isSaved ? (isAr ? 'مقال محفوظ' : 'Saved') : (isAr ? 'حفظ المقال' : 'Save')}
                      >
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                      </button>

                      {/* Audio listen preview chip */}
                      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-950/85 border border-cyan-400/40 text-cyan-200 text-[11px] font-bold backdrop-blur-md shadow-sm">
                        <Headphones className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
                        <span>{isAr ? 'متاح بالصوت' : 'Audio Available'}</span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 sm:p-6">
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                        <Clock className="w-3.5 h-3.5 text-blue-500 dark:text-cyan-400" />
                        <span>{article.readTime}</span>
                      </div>

                      <h3
                        onClick={() => onArticleClick(article)}
                        className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors cursor-pointer line-clamp-2 mb-2"
                      >
                        {article.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 mb-4">
                        {article.summary}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="px-5 sm:px-6 pb-5 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                    <button
                      onClick={() => onArticleClick(article)}
                      className="flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-600 dark:text-cyan-400 group-hover:text-blue-700 cursor-pointer"
                    >
                      <Headphones className="w-4 h-4" />
                      <span>{isAr ? 'قراءة واستماع المقال' : 'Read & Listen'}</span>
                      {isAr ? (
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                      ) : (
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      )}
                    </button>

                    <div className="flex items-center gap-1">
                      {article.tags.slice(0, 1).map((tag, idx) => (
                        <span key={idx} className="text-[10px] font-semibold text-slate-400">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
