export type CategoryType = 'all' | 'psych' | 'body' | 'mind' | 'spirit';

export interface ArticleSection {
  type: 'heading' | 'paragraph' | 'list' | 'table' | 'note' | 'quote';
  title?: string;
  content?: string;
  items?: string[];
  tableData?: {
    headers: string[];
    rows: string[][];
  };
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  category: 'psych' | 'body' | 'mind' | 'spirit';
  categoryName: string;
  readTime: string;
  imageUrl: string;
  tags: string[];
  summary: string;
  sections: ArticleSection[];
  keyTakeaways: string[];
  isFeatured?: boolean;
  publishedDate?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  provider: 'google' | 'email';
  savedArticleIds: string[];
  isVerified?: boolean;
  joinedDate?: string;
  bio?: string;
  articlesReadCount?: number;
  audioMinutesListened?: number;
}

export interface Review {
  id: string;
  name: string;
  category: string;
  rating: number;
  comment: string;
  date: string;
}

export type Language = 'ar' | 'en';

export interface UserSettings {
  theme: 'light' | 'dark';
  language: Language;
  fontSize: 'normal' | 'large' | 'xlarge';
  defaultAudioSpeed: number;
  autoScrollAudio: boolean;
  ambientSoundVolume: number;
}
