import React, { useState } from 'react';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Search, 
  User as UserIcon, 
  LogOut, 
  Bookmark, 
  MessageCircle, 
  Youtube,
  Settings,
  Globe,
  ShieldCheck
} from 'lucide-react';
import { User, Language } from '../types';
import { formatWhatsAppUrl } from '../utils/readingTime';
import { TRANSLATIONS } from '../utils/translations';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  language: Language;
  onToggleLanguage: () => void;
  onOpenSettings: () => void;
  onOpenProfile: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  user: User | null;
  onOpenAuthModal: () => void;
  onLogout: () => void;
  savedArticlesCount: number;
  onOpenSavedArticles: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  language,
  onToggleLanguage,
  onOpenSettings,
  onOpenProfile,
  searchQuery,
  onSearchChange,
  user,
  onOpenAuthModal,
  onLogout,
  savedArticlesCount,
  onOpenSavedArticles,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const t = TRANSLATIONS[language];

  const navLinks = [
    { label: t.navHome, href: '#home' },
    { label: t.navPsych, href: '#psych' },
    { label: t.navBody, href: '#body' },
    { label: t.navMind, href: '#mind' },
    { label: t.navSpirit, href: '#spirit' },
    { label: t.navArticles, href: '#articles' },
    { label: t.navCommunity, href: '#community' },
    { label: t.navSubmit, href: '#submit' },
    { label: t.navAbout, href: '#about' },
    { label: t.navContact, href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-blue-100 dark:border-blue-900/40 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main top bar */}
        <div className="flex items-center justify-between h-20 gap-3">
          {/* Brand Logo - TAWAZONE */}
          <a href="#home" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <svg width="22" height="22" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="21" stroke="#fff" strokeWidth="3" opacity="0.4" />
                <path d="M10 27h28" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M24 13v14" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
                <circle cx="15" cy="33" r="4" fill="#67e8f9" />
                <circle cx="33" cy="33" r="4" fill="#67e8f9" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black text-blue-950 dark:text-white tracking-tight">
                  TAWAZONE
                </span>
                <span className="hidden sm:inline-block text-[10px] font-extrabold text-blue-700 dark:text-cyan-300 uppercase tracking-wider bg-blue-50 dark:bg-blue-950/70 px-2 py-0.5 rounded-md border border-blue-200 dark:border-blue-800">
                  توازون
                </span>
              </div>
              <p className="hidden md:block text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                {t.brandTagline}
              </p>
            </div>
          </a>

          {/* Search bar on desktop */}
          <div className="hidden lg:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-blue-600 dark:text-cyan-400 absolute right-3.5 top-3" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pr-10 pl-4 py-2.5 rounded-2xl bg-blue-50/60 dark:bg-slate-800/80 border border-blue-200/80 dark:border-blue-900/50 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute left-3 top-2.5 text-xs text-blue-400 hover:text-blue-600 cursor-pointer"
                >
                  {t.clearSearch}
                </button>
              )}
            </div>
          </div>

          {/* Social Badges in Strict Blue Theme (NO Red, NO Green!) */}
          <div className="hidden sm:flex items-center gap-2">
            <a
              href="https://www.youtube.com/@MadhaqTabiei"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-900/40 hover:bg-blue-900/70 text-sky-200 dark:bg-blue-950/60 dark:text-sky-300 dark:hover:bg-blue-900/60 text-xs font-bold transition-all border border-blue-700/40"
              title="قناة مذاق طبيعي على يوتيوب"
            >
              <Youtube className="w-4 h-4 text-cyan-300" />
              <span className="hidden md:inline">{t.youtubeBtn}</span>
            </a>

            <a
              href={formatWhatsAppUrl('0725968984', 'مرحباً، أود التواصل مع إدارة موقع TAWAZONE')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/15 hover:bg-blue-600/25 text-blue-800 dark:bg-blue-900/40 dark:text-cyan-300 dark:hover:bg-blue-800/50 text-xs font-bold transition-all border border-blue-300/80 dark:border-blue-700/60"
              title="تواصل عبر واتساب 0725968984"
            >
              <MessageCircle className="w-4 h-4 text-sky-400" />
              <span className="hidden md:inline">{t.whatsappBtn}</span>
            </a>
          </div>

          {/* Action buttons: Language + Settings + Theme + Auth */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Language Switcher */}
            <button
              onClick={onToggleLanguage}
              className="px-2.5 py-1.5 rounded-xl sm:rounded-2xl bg-blue-50 hover:bg-blue-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-blue-900/50 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
              aria-label="تغيير لغة الموقع"
              title="تغيير اللغة (Language)"
            >
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              <span>{language === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            {/* Settings button */}
            <button
              onClick={onOpenSettings}
              className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-blue-50 hover:bg-blue-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-blue-900/50 transition-all cursor-pointer"
              aria-label="إعدادات الموقع"
              title={t.navSettings}
            >
              <Settings className="w-4 h-4 text-sky-400" />
            </button>

            {/* Theme toggle: Sun icon is SKY-BLUE (Strictly NO Yellow!) */}
            <button
              onClick={onToggleTheme}
              className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-blue-50 hover:bg-blue-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-blue-900/50 transition-all cursor-pointer"
              aria-label={theme === 'dark' ? 'التبديل إلى الوضع الفاتح' : 'التبديل إلى الوضع الداكن'}
              title={theme === 'dark' ? 'الوضع الفاتح' : 'الوضع الداكن'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-cyan-300 animate-spin-slow" />
              ) : (
                <Moon className="w-4 h-4 text-blue-600" />
              )}
            </button>

            {/* User Account / Personalized Profile Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl sm:rounded-2xl bg-blue-50 dark:bg-slate-800 border border-blue-200 dark:border-blue-900/60 hover:border-blue-400 transition-all cursor-pointer"
                  aria-label="قائمة حساب الزائر"
                >
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100 max-w-[90px] truncate hidden sm:inline">
                    {user.name}
                  </span>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl object-cover ring-2 ring-blue-500/30"
                  />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-60 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-blue-100 dark:border-slate-700 p-2 z-50 animate-fade-in">
                    <div className="p-2.5 border-b border-slate-100 dark:border-slate-700 mb-1">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-black text-slate-900 dark:text-white truncate">
                          {user.name}
                        </p>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300">
                          {user.isVerified ? 'مفعل' : 'عضو'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate">
                        {user.email}
                      </p>
                    </div>

                    {/* Open Full Profile Modal */}
                    <button
                      onClick={() => {
                        onOpenProfile();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-700 transition-all cursor-pointer"
                    >
                      <UserIcon className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                      <span>{t.myProfile || 'الملف الشخصي والحساب'}</span>
                    </button>

                    {/* Bookmarked articles */}
                    <button
                      onClick={() => {
                        onOpenSavedArticles();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-700 transition-all cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <Bookmark className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                        <span>{t.mySavedArticles}</span>
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-cyan-300 font-bold text-[10px]">
                        {savedArticlesCount}
                      </span>
                    </button>

                    {/* Settings */}
                    <button
                      onClick={() => {
                        onOpenSettings();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-700 transition-all cursor-pointer"
                    >
                      <Settings className="w-4 h-4 text-sky-400" />
                      <span>{t.navSettings}</span>
                    </button>

                    {/* Logout */}
                    <button
                      onClick={() => {
                        onLogout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-blue-700 dark:text-sky-300 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-all cursor-pointer mt-1 border-t border-slate-100 dark:border-slate-700 pt-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{t.logoutBtn}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm shadow-md shadow-blue-600/20 active:scale-95 transition-all cursor-pointer"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.loginBtn}</span>
                <span className="sm:hidden">{t.loginCompact}</span>
              </button>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl sm:rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
              aria-label="القائمة الرئيسية"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center justify-start gap-1 py-2 border-t border-slate-100 dark:border-slate-800/80 overflow-x-auto text-xs font-bold text-slate-600 dark:text-slate-300">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="px-3 py-1.5 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile search bar */}
        <div className="lg:hidden py-2.5">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-blue-600 dark:text-cyan-400 absolute right-3.5 top-3" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pr-10 pl-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-xs focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-1.5 animate-fade-in shadow-xl">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600"
            >
              {link.label}
            </a>
          ))}

          {/* Mobile external links in Blue/Navy only */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
            <a
              href="https://www.youtube.com/@MadhaqTabiei"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-900 text-sky-200 font-bold text-xs"
            >
              <Youtube className="w-4 h-4 text-cyan-300" />
              <span>{t.youtubeBtn}</span>
            </a>
            <a
              href={formatWhatsAppUrl('0725968984', 'مرحباً، أود التواصل مع إدارة TAWAZONE')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
            >
              <MessageCircle className="w-4 h-4 text-sky-200" />
              <span>{t.whatsappBtn}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
