/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoriesSection } from './components/CategoriesSection';
import { BreathingWidget } from './components/BreathingWidget';
import { ArticlesSection } from './components/ArticlesSection';
import { CommunitySection } from './components/CommunitySection';
import { SubmitArticleSection } from './components/SubmitArticleSection';
import { ContactSection } from './components/ContactSection';
import { AboutAndPoliciesSection } from './components/AboutAndPoliciesSection';
import { Footer } from './components/Footer';
import { ArticleDetailModal } from './components/ArticleDetailModal';
import { AuthModal } from './components/AuthModal';
import { UserProfileModal } from './components/UserProfileModal';
import { SettingsModal } from './components/SettingsModal';
import { FloatingActions } from './components/FloatingActions';

import { ARTICLES_DATA } from './data/articles';
import { Article, CategoryType, User, Language, UserSettings } from './types';
import { filterArticles } from './utils/readingTime';
import { getActiveSession, setActiveSession, syncUserBookmarks } from './utils/authService';

export default function App() {
  // Language state (Arabic / English)
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tawazon_lang');
      if (saved === 'ar' || saved === 'en') return saved;
    }
    return 'ar';
  });

  // Settings State
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [settings, setSettings] = useState<UserSettings>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('tawazon_settings');
        if (saved) return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      theme: 'light',
      language: 'ar',
      fontSize: 'normal',
      defaultAudioSpeed: 1,
      autoScrollAudio: true,
      ambientSoundVolume: 0.3,
    };
  });

  // Theme state synced with root html data-theme
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tawazon-theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('tawazon-theme', theme);
    } catch (e) {}
  }, [theme]);

  // Update HTML dir and lang on language change
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('lang', language);
    root.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    try {
      localStorage.setItem('tawazon_lang', language);
    } catch (e) {}
    setSettings((prev) => ({ ...prev, language }));
  }, [language]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      setSettings((s) => ({ ...s, theme: next }));
      return next;
    });
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleUpdateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      if (newSettings.language && newSettings.language !== language) {
        setLanguage(newSettings.language);
      }
      if (newSettings.theme && newSettings.theme !== theme) {
        setTheme(newSettings.theme);
      }
      try {
        localStorage.setItem('tawazon_settings', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  // User Authentication & Session state
  const [user, setUser] = useState<User | null>(() => {
    return getActiveSession();
  });

  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [profileModalOpen, setProfileModalOpen] = useState<boolean>(false);

  const handleLoginSuccess = (newUser: User) => {
    setUser(newUser);
    setActiveSession(newUser);
    // Sync bookmarks with user's saved list
    if (newUser.savedArticleIds && newUser.savedArticleIds.length > 0) {
      setSavedArticleIds((prev) => Array.from(new Set([...prev, ...newUser.savedArticleIds])));
    }
  };

  const handleLogout = () => {
    setUser(null);
    setActiveSession(null);
  };

  const handleUserUpdate = (updated: User) => {
    setUser(updated);
    setActiveSession(updated);
  };

  // Saved / Bookmarked articles state
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('tawazon_saved_articles');
        if (saved) return JSON.parse(saved);
      } catch (e) {}
    }
    return ['article-1', 'article-3'];
  });

  const handleToggleBookmark = (articleId: string) => {
    setSavedArticleIds((prev) => {
      const exists = prev.includes(articleId);
      const updated = exists ? prev.filter((id) => id !== articleId) : [...prev, articleId];
      try {
        localStorage.setItem('tawazon_saved_articles', JSON.stringify(updated));
      } catch (e) {}
      if (user) {
        syncUserBookmarks(user.id, updated);
      }
      return updated;
    });
  };

  // Filtering & Search state
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSavedOnly, setShowSavedOnly] = useState<boolean>(false);

  // Active modal article reader
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  // Filtered articles list
  const filteredArticles = useMemo(() => {
    let list = ARTICLES_DATA;

    if (showSavedOnly) {
      list = list.filter((a) => savedArticleIds.includes(a.id));
    }

    return filterArticles(list, searchQuery, selectedCategory);
  }, [searchQuery, selectedCategory, showSavedOnly, savedArticleIds]);

  const handleOpenSavedArticles = () => {
    setShowSavedOnly(true);
    setSelectedCategory('all');
    const el = document.getElementById('articles');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleResetSearch = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setShowSavedOnly(false);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200"
    >
      {/* Header with Language, Settings, Profile, Auth, and Blue Theme toggle */}
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        language={language}
        onToggleLanguage={toggleLanguage}
        onOpenSettings={() => setSettingsOpen(true)}
        onOpenProfile={() => setProfileModalOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q.trim()) {
            setShowSavedOnly(false);
          }
        }}
        user={user}
        onOpenAuthModal={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
        savedArticlesCount={savedArticleIds.length}
        onOpenSavedArticles={handleOpenSavedArticles}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section with Immersive Looping Blue Video Background & Particle Waves */}
        <Hero
          language={language}
          onExploreClick={() => scrollToSection('articles')}
          onSubmitArticleClick={() => scrollToSection('submit')}
          onBreathingClick={() => scrollToSection('breathing')}
        />

        {/* 4 Core Pillars Section with Curated Unique Blue Imagery */}
        <CategoriesSection
          language={language}
          activeCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setShowSavedOnly(false);
            scrollToSection('articles');
          }}
        />

        {/* Interactive Mindful Breathing Widget (Strict Blue theme) */}
        <div id="breathing">
          <BreathingWidget language={language} />
        </div>

        {/* Articles Section with Voice Audio Listen Feature and Filtering */}
        <ArticlesSection
          language={language}
          articles={filteredArticles}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setShowSavedOnly(false);
          }}
          onArticleClick={(article) => setActiveArticle(article)}
          savedArticleIds={savedArticleIds}
          onToggleBookmark={handleToggleBookmark}
          searchQuery={searchQuery}
          onResetSearch={handleResetSearch}
        />

        {/* Community Reviews and Visitor Testimonials */}
        <CommunitySection language={language} />

        {/* Submit Your Article Form */}
        <SubmitArticleSection language={language} />

        {/* Official Contact Channels (WhatsApp 0725968984 & YouTube @MadhaqTabiei) */}
        <ContactSection language={language} />

        {/* About Us, Policies, Terms, and Medical Disclaimer */}
        <AboutAndPoliciesSection language={language} />
      </main>

      {/* Footer with Brand Navigation and Policies */}
      <Footer language={language} />

      {/* Modals Suite */}
      {/* 1. Article Reader Modal with TTS Audio Player */}
      <ArticleDetailModal
        article={activeArticle}
        isOpen={!!activeArticle}
        onClose={() => setActiveArticle(null)}
        isBookmarked={activeArticle ? savedArticleIds.includes(activeArticle.id) : false}
        onToggleBookmark={handleToggleBookmark}
      />

      {/* 2. Authentication Modal (Register, Login, Password Reset, Demo Account) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        language={language}
      />

      {/* 3. User Profile Modal (View Info, Avatar Selection, Reading Stats, Password) */}
      <UserProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        user={user}
        onUserUpdate={handleUserUpdate}
        onLogout={handleLogout}
        onOpenSavedArticles={handleOpenSavedArticles}
        language={language}
      />

      {/* 4. Settings Modal (Theme, Language, Font Size, Audio Speed) */}
      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
      />

      {/* Floating Action Buttons (Audio quick controls & Instant WhatsApp) */}
      <FloatingActions 
        language={language} 
        onOpenBreathing={() => scrollToSection('breathing')}
      />
    </div>
  );
}
