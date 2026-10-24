import React, { useState } from 'react';
import { 
  X, 
  User as UserIcon, 
  Mail, 
  Calendar, 
  ShieldCheck, 
  Bookmark, 
  Headphones, 
  Check, 
  Edit3, 
  Lock, 
  LogOut,
  Sparkles
} from 'lucide-react';
import { User, Language } from '../types';
import { updateUserProfile, hashPassword, getStoredAccounts, saveStoredAccounts } from '../utils/authService';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onUserUpdate: (updatedUser: User) => void;
  onLogout: () => void;
  onOpenSavedArticles: () => void;
  language?: Language;
}

const AVATAR_OPTIONS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=250&q=80',
];

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onUserUpdate,
  onLogout,
  onOpenSavedArticles,
  language = 'ar',
}) => {
  if (!isOpen || !user) return null;

  const isAr = language === 'ar';
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio || 'قارئ مستمر في منصة TAWAZONE');
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Change password sub-flow
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const updated = updateUserProfile(user.id, {
      name: name.trim(),
      bio: bio.trim(),
      avatar: selectedAvatar,
    });

    if (updated) {
      onUserUpdate(updated);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setIsEditing(false);
      }, 1500);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setPasswordMsg({ type: 'error', text: isAr ? 'يجب أن تكون كلمة المرور 6 أحرف على الأقل.' : 'Password must be at least 6 characters.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: 'error', text: isAr ? 'كلمتا المرور غير متطابقتين.' : 'Passwords do not match.' });
      return;
    }

    const accounts = getStoredAccounts();
    const target = accounts.find((a) => a.id === user.id);
    if (target) {
      target.passwordHash = await hashPassword(newPassword);
      saveStoredAccounts(accounts);
      setPasswordMsg({ type: 'success', text: isAr ? 'تم تحديث كلمة المرور بنجاح!' : 'Password updated successfully!' });
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setPasswordMsg(null);
        setShowPasswordSection(false);
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fade-in">
      <div 
        className="bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900/50 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Banner with Deep Blue Waves */}
        <div className="bg-gradient-to-r from-blue-800 via-blue-700 to-indigo-900 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
            aria-label="إغلاق الملف الشخصي"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-300"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-200">
              {isAr ? 'حساب الزائر · TAWAZONE' : 'Visitor Account · TAWAZONE'}
            </span>
          </div>

          <div className="flex items-center gap-4 mt-3">
            <div className="relative group">
              <img
                src={selectedAvatar}
                alt={user.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-cyan-400/40 shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-blue-600 text-white shadow-md border border-white/40">
                <ShieldCheck className="w-4 h-4 text-cyan-300" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {user.name}
                </h3>
                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-cyan-400/20 text-cyan-200 text-[10px] font-extrabold border border-cyan-400/30">
                  {isAr ? 'حساب مفعل' : 'Verified'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-blue-100/80 font-medium">
                {user.email}
              </p>
              <div className="flex items-center gap-2 text-[11px] text-cyan-200/70 mt-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{isAr ? 'تاريخ الانضمام:' : 'Joined:'} {user.joinedDate || '2026-10-01'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-blue-50/80 dark:bg-slate-800 border border-blue-100 dark:border-blue-900/40 text-center">
              <Bookmark className="w-4 h-4 text-blue-600 dark:text-cyan-400 mx-auto mb-1" />
              <div className="text-lg font-black text-blue-950 dark:text-white">
                {user.savedArticleIds?.length || 0}
              </div>
              <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                {isAr ? 'مقالات محفوظة' : 'Saved Articles'}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50/80 dark:bg-slate-800 border border-blue-100 dark:border-blue-900/40 text-center">
              <Headphones className="w-4 h-4 text-blue-600 dark:text-cyan-400 mx-auto mb-1" />
              <div className="text-lg font-black text-blue-950 dark:text-white">
                {user.audioMinutesListened || 45} د
              </div>
              <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                {isAr ? 'دقائق الاستماع' : 'Audio Minutes'}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50/80 dark:bg-slate-800 border border-blue-100 dark:border-blue-900/40 text-center">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-cyan-400 mx-auto mb-1" />
              <div className="text-lg font-black text-blue-950 dark:text-white">
                {user.articlesReadCount || 8}
              </div>
              <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                {isAr ? 'مقالات مقروءة' : 'Articles Read'}
              </div>
            </div>
          </div>

          {/* Quick Action: Open Saved Articles */}
          <button
            onClick={() => {
              onOpenSavedArticles();
              onClose();
            }}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-blue-950/40 border border-blue-200 dark:border-blue-800 hover:border-blue-400 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                <Bookmark className="w-4 h-4 text-cyan-200" />
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  {isAr ? 'تصفح قائمة مقالاتي المحفوظة' : 'View Saved Articles List'}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {user.savedArticleIds?.length || 0} {isAr ? 'مقالات مسجلة للعودة إليها' : 'articles bookmarked for later'}
                </div>
              </div>
            </div>
            <span className="text-xs font-bold text-blue-600 dark:text-cyan-400">
              {isAr ? 'عرض ←' : 'Open →'}
            </span>
          </button>

          {/* Edit Profile Form */}
          {isEditing ? (
            <form onSubmit={handleSaveProfile} className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-black text-blue-900 dark:text-cyan-300">
                {isAr ? 'تعديل البيانات الشخصية' : 'Edit Personal Info'}
              </h4>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isAr ? 'اختر صورة الرمز الشخصي' : 'Select Avatar'}
                </label>
                <div className="flex items-center gap-2 overflow-x-auto py-1">
                  {AVATAR_OPTIONS.map((av, idx) => (
                    <img
                      key={idx}
                      src={av}
                      alt="avatar option"
                      onClick={() => setSelectedAvatar(av)}
                      className={`w-11 h-11 rounded-xl object-cover cursor-pointer transition-all ${
                        selectedAvatar === av
                          ? 'ring-3 ring-blue-600 scale-105'
                          : 'opacity-60 hover:opacity-100'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isAr ? 'الاسم الكامل' : 'Full Name'}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isAr ? 'نبذة قصيرة أو الاهتمامات' : 'Bio / Interests'}
                </label>
                <input
                  type="text"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder={isAr ? 'مثال: مهتم بالصحة النفسية والنوم' : 'e.g. Passionate about wellness & meditation'}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  {saveSuccess ? (isAr ? 'تم الحفظ بنجاح!' : 'Saved!') : (isAr ? 'حفظ التعديلات' : 'Save Changes')}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 cursor-pointer"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    {isAr ? 'النبذة التعريفية' : 'Bio'}
                  </h4>
                  <p className="text-xs text-slate-800 dark:text-slate-200 font-medium mt-0.5">
                    {user.bio || (isAr ? 'عضو في منصة TAWAZONE للصحة والسكينة' : 'Member of TAWAZONE Wellness Platform')}
                  </p>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-cyan-300 border border-blue-200 dark:border-blue-900/50 text-xs font-bold hover:bg-blue-100 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isAr ? 'تعديل' : 'Edit'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Change Password Flow */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            {showPasswordSection ? (
              <form onSubmit={handleUpdatePassword} className="space-y-3 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h4 className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                  <span>{isAr ? 'تغيير كلمة المرور' : 'Change Password'}</span>
                </h4>

                {passwordMsg && (
                  <div className={`p-2.5 rounded-xl text-xs font-bold ${
                    passwordMsg.type === 'error'
                      ? 'bg-blue-100 text-blue-900 border border-blue-300'
                      : 'bg-cyan-100 text-cyan-900 border border-cyan-300'
                  }`}>
                    {passwordMsg.text}
                  </div>
                )}

                <div>
                  <input
                    type="password"
                    required
                    placeholder={isAr ? 'كلمة المرور الجديدة (6 أحرف فأكثر)' : 'New password (6+ chars)'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                  />
                </div>

                <div>
                  <input
                    type="password"
                    required
                    placeholder={isAr ? 'تأكيد كلمة المرور الجديدة' : 'Confirm new password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
                  >
                    {isAr ? 'تحديث كلمة المرور' : 'Update Password'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPasswordSection(false)}
                    className="px-3 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold"
                  >
                    {isAr ? 'إلغاء' : 'Cancel'}
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setShowPasswordSection(true)}
                className="w-full flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 py-1 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-blue-500 dark:text-cyan-400" />
                  <span>{isAr ? 'تغيير كلمة المرور الخاصة بحسابي' : 'Change Account Password'}</span>
                </span>
                <span>←</span>
              </button>
            )}
          </div>

          {/* Logout Action */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full py-3 rounded-2xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/60 text-blue-700 dark:text-cyan-300 font-bold text-xs flex items-center justify-center gap-2 border border-blue-200 dark:border-blue-900/60 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>{isAr ? 'تسجيل الخروج من الحساب' : 'Sign Out of Account'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
