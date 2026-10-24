import { Article, ArticleSection, CategoryType } from '../types';

/**
 * Extracts all readable speech blocks from article sections
 */
export function extractSpeechBlocks(article: Article): string[] {
  const blocks: string[] = [];
  
  if (article.title) blocks.push(article.title);
  if (article.subtitle) blocks.push(article.subtitle);

  for (const s of article.sections) {
    if (s.title) blocks.push(s.title);
    if (s.content) blocks.push(s.content);
    if (s.items && s.items.length > 0) {
      for (const item of s.items) {
        blocks.push(item);
      }
    }
  }

  return blocks;
}

/**
 * Calculates estimated reading time in minutes based on Arabic word count (~150 words/min)
 */
export function calculateReadingTimeMinutes(text: string): number {
  if (!text || !text.trim()) return 1;
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 150));
}

/**
 * Formats WhatsApp link cleanly ensuring Moroccan/international standard
 */
export function formatWhatsAppUrl(phone: string = '0725968984', message: string = 'مرحباً، أود الاستفسار من موقع توازن'): string {
  // Clean phone string
  const cleaned = phone.replace(/[^0-9]/g, '');
  // If Moroccan local format starting with 0, convert to 212
  let intlPhone = cleaned;
  if (cleaned.startsWith('0')) {
    intlPhone = '212' + cleaned.substring(1);
  } else if (!cleaned.startsWith('212')) {
    intlPhone = '212' + cleaned;
  }
  return `https://wa.me/${intlPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Filters articles by category and free text search
 */
export function filterArticles(articles: Article[], query: string, category: CategoryType): Article[] {
  const q = query.trim().toLowerCase();
  
  return articles.filter(article => {
    // Category check
    if (category !== 'all' && article.category !== category) {
      return false;
    }
    
    // Query check
    if (!q) return true;
    
    const titleMatch = article.title.toLowerCase().includes(q);
    const subtitleMatch = article.subtitle.toLowerCase().includes(q);
    const summaryMatch = article.summary.toLowerCase().includes(q);
    const tagMatch = article.tags.some(tag => tag.toLowerCase().includes(q));
    const sectionMatch = article.sections.some(s => 
      (s.title && s.title.toLowerCase().includes(q)) || 
      (s.content && s.content.toLowerCase().includes(q)) ||
      (s.items && s.items.some(it => it.toLowerCase().includes(q)))
    );

    return titleMatch || subtitleMatch || summaryMatch || tagMatch || sectionMatch;
  });
}
