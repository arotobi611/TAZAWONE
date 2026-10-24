import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateReadingTimeMinutes, formatWhatsAppUrl, filterArticles, extractSpeechBlocks } from './readingTime';
import { Article } from '../types';

test('calculateReadingTimeMinutes returns at least 1 min for short or empty text', () => {
  assert.equal(calculateReadingTimeMinutes(''), 1);
  assert.equal(calculateReadingTimeMinutes('كلمة واحدة'), 1);
});

test('calculateReadingTimeMinutes calculates correct time for 300 words', () => {
  const words = Array(300).fill('كلمة').join(' ');
  assert.equal(calculateReadingTimeMinutes(words), 2);
});

test('formatWhatsAppUrl properly transforms 0725968984 into international 212725968984 format', () => {
  const url = formatWhatsAppUrl('0725968984');
  assert.ok(url.startsWith('https://wa.me/212725968984'));
  assert.ok(url.includes('text='));
});

test('extractSpeechBlocks retrieves titles, contents and list items', () => {
  const sampleArticle: Article = {
    id: 'test-1',
    title: 'عنوان المقال',
    subtitle: 'العنوان الفرعي',
    category: 'psych',
    categoryName: 'العلاج النفسي',
    readTime: '5 دقائق',
    imageUrl: 'https://example.com/img.jpg',
    tags: ['هدوء', 'سكينة'],
    summary: 'الملخص',
    sections: [
      { type: 'heading', title: 'مقدمة' },
      { type: 'paragraph', content: 'نص الفقرة الأولى' },
      { type: 'list', items: ['عنصر 1', 'عنصر 2'] }
    ],
    keyTakeaways: ['فائدة']
  };

  const blocks = extractSpeechBlocks(sampleArticle);
  assert.equal(blocks.length, 6);
  assert.equal(blocks[0], 'عنوان المقال');
  assert.equal(blocks[1], 'العنوان الفرعي');
  assert.equal(blocks[2], 'مقدمة');
  assert.equal(blocks[3], 'نص الفقرة الأولى');
  assert.equal(blocks[4], 'عنصر 1');
});

test('filterArticles filters accurately by category and search keyword', () => {
  const articles: Article[] = [
    {
      id: '1',
      title: 'تهدئة القلق',
      subtitle: 'تمارين التنفس',
      category: 'psych',
      categoryName: 'العلاج النفسي',
      readTime: '5 د',
      imageUrl: '',
      tags: ['قلق', 'تنفس'],
      summary: 'ملخص القلق',
      sections: [],
      keyTakeaways: []
    },
    {
      id: '2',
      title: 'التغذية المتوازنة',
      subtitle: 'شرب الماء',
      category: 'body',
      categoryName: 'العلاج الجسدي',
      readTime: '4 د',
      imageUrl: '',
      tags: ['ماء', 'تغذية'],
      summary: 'ملخص التغذية',
      sections: [],
      keyTakeaways: []
    }
  ];

  // Category filter
  const psychOnly = filterArticles(articles, '', 'psych');
  assert.equal(psychOnly.length, 1);
  assert.equal(psychOnly[0].id, '1');

  // Search keyword filter
  const searchResults = filterArticles(articles, 'الماء', 'all');
  assert.equal(searchResults.length, 1);
  assert.equal(searchResults[0].id, '2');
});
