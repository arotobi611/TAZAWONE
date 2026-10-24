import React from 'react';
import { X, Settings, Globe, Moon, Sun, Type, FastForward, RotateCcw, Check } from 'lucide-react';
import { Language, UserSettings } from '../types';
import { TRANSLATIONS } from '../utils/translations';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: UserSettings;
  onUpdateSettings: (newSettings: Partial<UserSettings>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[settings.language];

  const handleReset = () => {
    onUpdateSettings({
      theme: 'light',
      language: 'ar',
      fontSize: 'normal',
      defaultAudioSpeed: 1,
      autoScrollAudio: true,
      ambientSoundVolume: 0.3
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-950/70 backdrop-blur-md animate-fade-in">
      <div 
        className="bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden relative"
        role="dialog"
        aria-modal="true"
      >
        {/* Header with strict blue/white gradient */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
            aria-label="إغلاق الإعدادات"
          >
            <X className="w-5 h-5 text-sky-200" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <Settings className="w-5 h-5 text-cyan-300" />
            <span className="text-xs font-bold uppercase tracking-wider text-sky-200">
              توازون · TAWAZONE
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            {t.settingsTitle}
          </h3>
          <p className="text-xs sm:text-sm text-sky-100/90 mt-1">
            خصص تجربة قراءتك واستماعك واللغة والمظهر اللوني الأزرق بالكامل.
          </p>
        </div>

        {/* Settings Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Language Selector */}
          <div>
            <label className="flex items-center gap-2 text-xs font-black text-blue-950 dark:text-sky-200 mb-2">
              <Globe className="w-4 h-4 text-sky-400" />
              <span>{t.settingsLanguage} (Language)</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => onUpdateSettings({ language: 'ar' })}
                className={`flex items-center justify-between p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                  settings.language === 'ar'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20'
                    : 'bg-blue-50/50 dark:bg-slate-800 text-blue-900 dark:text-sky-200 border-blue-200 dark:border-blue-900/60 hover:border-blue-400'
                }`}
              >
                <span>العربية (RTL)</span>
                {settings.language === 'ar' && <Check className="w-4 h-4 text-cyan-200" />}
              </button>

              <button
                type="button"
                onClick={() => onUpdateSettings({ language: 'en' })}
                className={`flex items-center justify-between p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                  settings.language === 'en'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20'
                    : 'bg-blue-50/50 dark:bg-slate-800 text-blue-900 dark:text-sky-200 border-blue-200 dark:border-blue-900/60 hover:border-blue-400'
                }`}
              >
                <span>English (LTR)</span>
                {settings.language === 'en' && <Check className="w-4 h-4 text-cyan-200" />}
              </button>
            </div>
          </div>

          {/* Theme Selector (Strictly Blue & White) */}
          <div>
            <label className="flex items-center gap-2 text-xs font-black text-blue-950 dark:text-sky-200 mb-2">
              <Sun className="w-4 h-4 text-sky-400" />
              <span>{t.settingsTheme}</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => onUpdateSettings({ theme: 'light' })}
                className={`flex items-center gap-2.5 p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                  settings.theme === 'light'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20'
                    : 'bg-blue-50/50 dark:bg-slate-800 text-blue-900 dark:text-sky-200 border-blue-200 dark:border-blue-900/60 hover:border-blue-400'
                }`}
              >
                <Sun className="w-4 h-4 text-sky-200" />
                <span>{t.themeLight}</span>
              </button>

              <button
                type="button"
                onClick={() => onUpdateSettings({ theme: 'dark' })}
                className={`flex items-center gap-2.5 p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                  settings.theme === 'dark'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20'
                    : 'bg-blue-50/50 dark:bg-slate-800 text-blue-900 dark:text-sky-200 border-blue-200 dark:border-blue-900/60 hover:border-blue-400'
                }`}
              >
                <Moon className="w-4 h-4 text-sky-200" />
                <span>{t.themeDark}</span>
              </button>
            </div>
          </div>

          {/* Reading Font Size */}
          <div>
            <label className="flex items-center gap-2 text-xs font-black text-blue-950 dark:text-sky-200 mb-2">
              <Type className="w-4 h-4 text-sky-400" />
              <span>{t.settingsFontSize}</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['normal', 'large', 'xlarge'] as const).map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => onUpdateSettings({ fontSize: sz })}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    settings.fontSize === sz
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-blue-50/50 dark:bg-slate-800 text-blue-900 dark:text-sky-200 border-blue-200 dark:border-blue-900/60'
                  }`}
                >
                  {sz === 'normal' ? t.fontSizeNormal : sz === 'large' ? t.fontSizeLarge : t.fontSizeXLarge}
                </button>
              ))}
            </div>
          </div>

          {/* Default Audio Speed */}
          <div>
            <label className="flex items-center gap-2 text-xs font-black text-blue-950 dark:text-sky-200 mb-2">
              <FastForward className="w-4 h-4 text-sky-400" />
              <span>{t.settingsAudioSpeed}</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[0.75, 1, 1.25, 1.5].map((spd) => (
                <button
                  key={spd}
                  type="button"
                  onClick={() => onUpdateSettings({ defaultAudioSpeed: spd })}
                  className={`py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    settings.defaultAudioSpeed === spd
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-blue-50/50 dark:bg-slate-800 text-blue-900 dark:text-sky-200 border-blue-200 dark:border-blue-900/60'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-blue-100 dark:border-blue-900/50">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-sky-300 hover:text-blue-800 font-bold cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>استعادة الإعدادات الافتراضية</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              {t.settingsSaveClose}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
