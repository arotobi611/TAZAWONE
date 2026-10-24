import React, { useState, useEffect } from 'react';
import { X, Bookmark, Share2, Clock, Calendar, Check, BookOpen, AlertCircle, Sparkles, MessageCircle } from 'lucide-react';
import { Article } from '../types';
import { AudioPlayer } from './AudioPlayer';
import { extractSpeechBlocks, formatWhatsAppUrl } from '../utils/readingTime';

interface ArticleDetailModalProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  article,
  isOpen,
  onClose,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [fontSizeLevel, setFontSizeLevel] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [currentBlockIndex, setCurrentBlockIndex] = useState<number>(0);

  useEffect(() => {
    // Reset state on open
    setCurrentBlockIndex(0);
    setCopiedLink(false);
  }, [article?.id]);

  if (!isOpen || !article) return null;

  const speechBlocks = extractSpeechBlocks(article);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch (e) {
      // Fallback
    }
  };

  const shareViaWhatsApp = () => {
    const text = `أرشح لك قراءة هذا المقال المميز في منصة TAWAZONE: "${article.title}"\n${window.location.href}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const getFontSizeClass = () => {
    switch (fontSizeLevel) {
      case 'large':
        return 'text-lg leading-relaxed';
      case 'xlarge':
        return 'text-xl leading-loose';
      default:
        return 'text-base leading-relaxed';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-900/50 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto relative animate-fade-in"
        role="dialog"
        aria-modal="true"
      >
        {/* Sticky Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-5 py-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 truncate">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              {article.categoryName}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              <span>{article.readTime}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Font Size controls */}
            <div className="hidden sm:flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-1 text-xs">
              <button
                onClick={() => setFontSizeLevel('normal')}
                className={`px-2 py-1 rounded-lg font-bold transition-all ${
                  fontSizeLevel === 'normal' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-xs' : 'text-slate-500'
                }`}
                title="حجم خط عادي"
              >
                أ
              </button>
              <button
                onClick={() => setFontSizeLevel('large')}
                className={`px-2 py-1 rounded-lg font-bold transition-all text-sm ${
                  fontSizeLevel === 'large' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-xs' : 'text-slate-500'
                }`}
                title="حجم خط كبير"
              >
                أ+
              </button>
              <button
                onClick={() => setFontSizeLevel('xlarge')}
                className={`px-2 py-1 rounded-lg font-bold transition-all text-base ${
                  fontSizeLevel === 'xlarge' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-xs' : 'text-slate-500'
                }`}
                title="حجم خط أكبر"
              >
                أ++
              </button>
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                isBookmarked
                  ? 'bg-cyan-500/15 border-cyan-400/40 text-cyan-600 dark:text-cyan-300 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
              aria-label={isBookmarked ? 'إزالة من المحفوظات' : 'حفظ المقال في المفضلة'}
              title={isBookmarked ? 'مقال محفوظ' : 'حفظ في المفضلة'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            {/* Share via WhatsApp */}
            <button
              onClick={shareViaWhatsApp}
              className="p-2.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-700 dark:text-cyan-300 border border-blue-400/30 transition-all cursor-pointer"
              aria-label="مشاركة عبر واتساب"
              title="مشاركة عبر واتساب"
            >
              <MessageCircle className="w-4 h-4" />
            </button>

            {/* Copy link */}
            <button
              onClick={handleCopyLink}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer relative"
              aria-label="نسخ رابط المقال"
              title="نسخ الرابط"
            >
              {copiedLink ? <Check className="w-4 h-4 text-cyan-500" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Close modal */}
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-slate-600 dark:text-slate-300 transition-all cursor-pointer mr-1"
              aria-label="إغلاق المقال"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-10 py-6 space-y-6">
          {/* Article Banner Image with Blue Aesthetic */}
          <div className="relative rounded-2xl overflow-hidden aspect-[21/9] sm:aspect-[2.4/1] shadow-md border border-blue-200 dark:border-blue-900/50">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover filter brightness-95 saturate-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent flex items-end p-4 sm:p-6">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-600/90 text-white mb-2 shadow-sm">
                  {article.categoryName}
                </span>
                <h1 className="text-xl sm:text-3xl font-black text-white leading-tight">
                  {article.title}
                </h1>
              </div>
            </div>
          </div>

          {/* Subtitle & Meta */}
          <p className="text-sm sm:text-base font-semibold text-blue-600 dark:text-blue-400">
            {article.subtitle}
          </p>

          {/* Prominent Audio Player (Requested feature) */}
          <AudioPlayer
            title={article.title}
            blocks={speechBlocks}
            currentBlockIndex={currentBlockIndex}
            onBlockChange={(idx) => setCurrentBlockIndex(idx)}
          />

          {/* Key Takeaways Card */}
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50/70 dark:from-blue-950/40 dark:to-slate-800/60 rounded-2xl p-5 border border-blue-200/80 dark:border-blue-800/40">
              <div className="flex items-center gap-2 mb-3 text-blue-800 dark:text-blue-300 font-extrabold text-sm sm:text-base">
                <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>خلاصة المقال وأهم الأفكار الجوهرية:</span>
              </div>
              <ul className="space-y-2">
                {article.keyTakeaways.map((point, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-blue-600/10 dark:bg-blue-400/20 text-blue-600 dark:text-blue-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Article Sections */}
          <div className={`space-y-6 text-slate-800 dark:text-slate-200 ${getFontSizeClass()}`}>
            {article.sections.map((section, idx) => {
              if (section.type === 'heading') {
                return (
                  <h2
                    key={idx}
                    className="text-lg sm:text-2xl font-black text-blue-900 dark:text-blue-200 pt-4 pb-1 border-b border-blue-100 dark:border-blue-900/40 flex items-center gap-2"
                  >
                    <span className="w-2 h-5 rounded-full bg-blue-600 inline-block"></span>
                    <span>{section.title}</span>
                  </h2>
                );
              }

              if (section.type === 'paragraph') {
                return (
                  <p key={idx} className="text-slate-700 dark:text-slate-300">
                    {section.content}
                  </p>
                );
              }

              if (section.type === 'list' && section.items) {
                return (
                  <ul key={idx} className="space-y-2.5 pr-2">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2.5 text-slate-700 dark:text-slate-300">
                        <span className="w-2 h-2 rounded-full bg-blue-500 mt-2.5 shrink-0"></span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              }

              if (section.type === 'table' && section.tableData) {
                return (
                  <div key={idx} className="overflow-x-auto rounded-2xl border border-blue-200 dark:border-blue-900/50 shadow-sm my-4">
                    <table className="w-full text-right text-xs sm:text-sm">
                      <thead className="bg-blue-100/70 dark:bg-blue-950/70 text-blue-950 dark:text-blue-200 font-bold border-b border-blue-200 dark:border-blue-900">
                        <tr>
                          {section.tableData.headers.map((h, hIdx) => (
                            <th key={hIdx} className="py-3 px-4 font-extrabold">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-blue-100 dark:divide-blue-900/30">
                        {section.tableData.rows.map((row, rIdx) => (
                          <tr
                            key={rIdx}
                            className={rIdx % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-blue-50/30 dark:bg-slate-850'}
                          >
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="py-3 px-4 text-slate-700 dark:text-slate-300">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              }

              if (section.type === 'note') {
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-blue-50/80 dark:bg-blue-950/50 border-r-4 border-cyan-400 text-blue-950 dark:text-cyan-100 text-xs sm:text-sm flex items-start gap-3 my-4"
                  >
                    <AlertCircle className="w-5 h-5 text-cyan-500 dark:text-cyan-400 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">{section.content}</p>
                  </div>
                );
              }

              return null;
            })}
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400">الكلمات المفتاحية:</span>
            {article.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/40"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Legal/Health Disclaimer Footer */}
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            <strong>إخلاء مسؤولية:</strong> محتوى هذا المقال مقدم لأغراض التثقيف والتوعية العامة فقط، ولا يمثل تشخيصاً طبياً أو نفسياً ولا يغني عن استشارة طبيب أو معالج نفسي معتمد. في حالات الطوارئ يرجى الاتصال بأرقام الإسعاف في بلدك فوراً.
          </div>
        </div>
      </div>
    </div>
  );
};
