import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User as UserIcon, 
  ShieldCheck, 
  ArrowRight, 
  KeyRound, 
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { User, Language } from '../types';
import { 
  registerUser, 
  loginUser, 
  requestPasswordReset, 
  resetPasswordWithCode 
} from '../utils/authService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
  language?: Language;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  language = 'ar',
}) => {
  const isAr = language === 'ar';
  const [tab, setTab] = useState<'login' | 'register' | 'forgot'>('login');
  
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  // Forgot password flow
  const [resetStep, setResetStep] = useState<1 | 2>(1);
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const resetAllFields = () => {
    setEmail('');
    setPassword('');
    setName('');
    setResetCode('');
    setNewPassword('');
    setErrorMessage('');
    setSuccessMessage('');
    setResetStep(1);
  };

  const handleQuickDemoLogin = async () => {
    setIsLoading(true);
    setErrorMessage('');
    const res = await loginUser('visitor@tawazone.com', 'tawazone2026');
    setIsLoading(false);
    if (res.success && res.user) {
      onLoginSuccess(res.user);
      onClose();
    } else {
      setErrorMessage(res.error || 'تعذر تسجيل الدخول التجريبي');
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !password) {
      setErrorMessage(isAr ? 'يرجى إدخال البريد الإلكتروني وكلمة المرور' : 'Please provide both email and password');
      return;
    }

    setIsLoading(true);
    const res = await loginUser(email, password);
    setIsLoading(false);

    if (res.success && res.user) {
      onLoginSuccess(res.user);
      onClose();
    } else {
      setErrorMessage(res.error || (isAr ? 'بيانات الدخول غير صحيحة' : 'Invalid email or password'));
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!name.trim()) {
      setErrorMessage(isAr ? 'يرجى إدخال اسمك الكريم' : 'Please provide your full name');
      return;
    }
    if (!email.trim() || !password) {
      setErrorMessage(isAr ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please complete all required fields');
      return;
    }
    if (password.length < 6) {
      setErrorMessage(isAr ? 'كلمة المرور يجب أن تكون 6 أحرف أو أرقام على الأقل' : 'Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    const res = await registerUser({
      name: name.trim(),
      email: email.trim(),
      password,
    });
    setIsLoading(false);

    if (res.success && res.user) {
      setSuccessMessage(isAr ? 'تم إنشاء الحساب وتفعيله بنجاح! مرحباً بك في TAWAZONE.' : 'Account created and verified! Welcome to TAWAZONE.');
      setTimeout(() => {
        onLoginSuccess(res.user!);
        onClose();
      }, 900);
    } else {
      setErrorMessage(res.error || (isAr ? 'حدث خطأ أثناء إنشاء الحساب' : 'Registration failed'));
    }
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (resetStep === 1) {
      if (!email.trim()) {
        setErrorMessage(isAr ? 'يرجى إدخال بريدك الإلكتروني المسجل' : 'Please enter your registered email');
        return;
      }
      setIsLoading(true);
      const res = await requestPasswordReset(email);
      setIsLoading(false);

      if (res.success) {
        setResetStep(2);
        setSuccessMessage(
          isAr
            ? `تم إرسال رمز التحقق الأمني: ${res.resetCode} (محدد للعرض السريع)`
            : `Security verification code sent: ${res.resetCode}`
        );
      } else {
        setErrorMessage(res.error || (isAr ? 'لم يتم العثور على الحساب' : 'Account not found'));
      }
    } else {
      if (!resetCode.trim() || !newPassword) {
        setErrorMessage(isAr ? 'يرجى إدخال رمز التحقق وكلمة المرور الجديدة' : 'Please provide code and new password');
        return;
      }
      setIsLoading(true);
      const res = await resetPasswordWithCode(email, resetCode, newPassword);
      setIsLoading(false);

      if (res.success) {
        setSuccessMessage(isAr ? 'تم إعادة تعيين كلمة المرور بنجاح! يمكنك الآن تسجيل الدخول.' : 'Password reset successfully! You can now log in.');
        setTimeout(() => {
          setTab('login');
          setResetStep(1);
          setSuccessMessage('');
        }, 1500);
      } else {
        setErrorMessage(res.error || (isAr ? 'رمز التحقق غير صحيح' : 'Invalid code'));
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fade-in">
      <div 
        className="bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900/50 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden relative"
        role="dialog"
        aria-modal="true"
      >
        {/* Header with Deep Blue Gradient */}
        <div className="bg-gradient-to-r from-blue-800 via-blue-700 to-indigo-900 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-300"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-200">
              TAWAZONE · منصة العافية
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black">
            {tab === 'login' && (isAr ? 'مرحباً بعودتك إلى واحتك' : 'Welcome Back to TAWAZONE')}
            {tab === 'register' && (isAr ? 'انضم إلى مجتمع TAWAZONE' : 'Join TAWAZONE Community')}
            {tab === 'forgot' && (isAr ? 'استعادة كلمة المرور' : 'Reset Your Password')}
          </h3>
          <p className="text-xs sm:text-sm text-blue-100/90 mt-1">
            {tab === 'login' && (isAr ? 'سجّل دخولك لمتابعة مقالاتك المحفوظة ومسار قراءاتك.' : 'Log in to access your saved articles and reading progress.')}
            {tab === 'register' && (isAr ? 'أنشئ حسابك الشخصي مجاناً في ثوانٍ للاستفادة من كامل المزايا.' : 'Create your free account in seconds to unlock all wellness features.')}
            {tab === 'forgot' && (isAr ? 'أدخل بريدك الإلكتروني لاسترداد حسابك وتعيين كلمة مرور جديدة.' : 'Enter your email to recover your account securely.')}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* Quick Demo Login Option */}
          <button
            onClick={handleQuickDemoLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-between py-2.5 px-4 mb-4 rounded-2xl bg-blue-50 hover:bg-blue-100/80 dark:bg-blue-950/40 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800/80 text-blue-900 dark:text-cyan-200 text-xs font-bold transition-all active:scale-[0.99] cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-500" />
              <span>{isAr ? 'دخول سريع بحساب تجريبي تجربة بنقرة واحدة' : '1-Click Quick Demo Login'}</span>
            </span>
            <span className="text-[11px] text-blue-600 dark:text-cyan-400 font-extrabold">
              {isAr ? 'تجربة ←' : 'Try →'}
            </span>
          </button>

          {/* Navigation Tabs */}
          <div className="flex rounded-2xl bg-slate-100 dark:bg-slate-800 p-1 mb-5">
            <button
              onClick={() => { setTab('login'); resetAllFields(); }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                tab === 'login'
                  ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-cyan-300 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              {isAr ? 'تسجيل الدخول' : 'Sign In'}
            </button>
            <button
              onClick={() => { setTab('register'); resetAllFields(); }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                tab === 'register'
                  ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-cyan-300 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              {isAr ? 'إنشاء حساب جديد' : 'Register'}
            </button>
          </div>

          {/* Error Message Alert */}
          {errorMessage && (
            <div className="p-3 mb-4 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-cyan-200 text-xs font-bold border border-blue-300 dark:border-blue-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success Message Alert */}
          {successMessage && (
            <div className="p-3 mb-4 rounded-xl bg-cyan-50 dark:bg-cyan-950/50 text-cyan-900 dark:text-cyan-200 text-xs font-bold border border-cyan-300 dark:border-cyan-700 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Login Form */}
          {tab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isAr ? 'البريد الإلكتروني' : 'Email Address'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isAr ? 'كلمة المرور' : 'Password'}
                  </label>
                  <button
                    type="button"
                    onClick={() => { setTab('forgot'); resetAllFields(); }}
                    className="text-[11px] font-bold text-blue-600 dark:text-cyan-400 hover:underline cursor-pointer"
                  >
                    {isAr ? 'نسيت كلمة المرور؟' : 'Forgot Password?'}
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm shadow-md transition-all active:scale-[0.98] cursor-pointer mt-2 disabled:opacity-50"
              >
                {isLoading ? (isAr ? 'جارٍ التحقق...' : 'Verifying...') : (isAr ? 'تسجيل الدخول' : 'Sign In')}
              </button>
            </form>
          )}

          {/* Registration Form */}
          {tab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isAr ? 'الاسم الكامل أو اللقب' : 'Full Name'}
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isAr ? 'مثال: يوسف المنصوري' : 'e.g. Alex Morgan'}
                    className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isAr ? 'البريد الإلكتروني' : 'Email Address'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isAr ? 'كلمة المرور (6 أحرف أو أكثر)' : 'Password (6+ chars)'}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm shadow-md transition-all active:scale-[0.98] cursor-pointer mt-2 disabled:opacity-50"
              >
                {isLoading ? (isAr ? 'جارٍ إنشاء الحساب...' : 'Creating Account...') : (isAr ? 'إنشاء حساب وتأكيده' : 'Register & Verify')}
              </button>
            </form>
          )}

          {/* Forgot Password Form */}
          {tab === 'forgot' && (
            <form onSubmit={handleForgotPasswordSubmit} className="space-y-3.5">
              {resetStep === 1 ? (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'أدخل بريدك الإلكتروني المسجل' : 'Registered Email'}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {isAr ? 'رمز التحقق (6 أرقام)' : 'Verification Code (6 digits)'}
                    </label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                      <input
                        type="text"
                        required
                        value={resetCode}
                        onChange={(e) => setResetCode(e.target.value)}
                        placeholder="123456"
                        className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-center tracking-widest font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {isAr ? 'كلمة المرور الجديدة' : 'New Password'}
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                      <input
                        type="password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  {isLoading
                    ? (isAr ? 'جارٍ المعالجة...' : 'Processing...')
                    : resetStep === 1
                    ? (isAr ? 'إرسال رمز الاستعادة' : 'Send Reset Code')
                    : (isAr ? 'تأكيد وحفظ كلمة المرور' : 'Confirm New Password')}
                </button>
                <button
                  type="button"
                  onClick={() => { setTab('login'); resetAllFields(); }}
                  className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 cursor-pointer"
                >
                  {isAr ? 'رجوع' : 'Back'}
                </button>
              </div>
            </form>
          )}

          {/* Privacy and Encryption Badge */}
          <div className="mt-5 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-500 dark:text-cyan-400" />
            <span>{isAr ? 'بياناتك مشفرة ومحمية وفق أعلى معايير أمان الويب' : 'Encrypted with SHA-256 Web Crypto standard'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
