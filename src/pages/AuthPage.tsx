import React, { useState } from 'react';
import {
  Lock,
  Mail,
  User as UserIcon,
  Phone,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Building,
  KeyRound
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MENOUFIA_CITIES } from '../data/mockData';

interface AuthPageProps {
  initialMode?: 'login' | 'register' | 'forgot-password';
}

export const AuthPage: React.FC<AuthPageProps> = ({ initialMode = 'login' }) => {
  const { login, register, navigate } = useApp();
  const [mode, setMode] = useState<'login' | 'register' | 'forgot-password'>(initialMode);

  // Form states
  const [emailOrPhone, setEmailOrPhone] = useState('citizen@menoufia.demo');
  const [password, setPassword] = useState('demo123');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [city, setCity] = useState(MENOUFIA_CITIES[0]);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Reset password states
  const [resetStep, setResetStep] = useState<1 | 2 | 3>(1);
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Validation & feedback
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState('');

  const fillQuickDemoCredentials = () => {
    setEmailOrPhone('citizen@menoufia.demo');
    setPassword('demo123');
    setErrors({});
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!emailOrPhone.trim()) {
      newErrors.emailOrPhone = 'يرجى إدخال البريد الإلكتروني أو رقم الهاتف';
    }
    if (!password.trim()) {
      newErrors.password = 'يرجى إدخال كلمة المرور';
    } else if (password.length < 4) {
      newErrors.password = 'كلمة المرور يجب أن لا تقل عن 4 أحرف';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    login({
      name: emailOrPhone.includes('demo') ? 'أحمد محمود المنوفي' : 'مواطن مسجل',
      email: emailOrPhone.includes('@') ? emailOrPhone : `${emailOrPhone}@menoufia.demo`,
      phone: emailOrPhone.includes('@') ? '01012345678' : emailOrPhone,
      city: 'شبين الكوم'
    });
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim() || fullName.trim().length < 3) {
      newErrors.fullName = 'يرجى كتابة الاسم الثلاثي بالكامل';
    }
    if (!emailOrPhone.trim()) {
      newErrors.emailOrPhone = 'يرجى إدخال رقم الهاتف أو البريد';
    }
    if (!password || password.length < 6) {
      newErrors.password = 'كلمة المرور يجب ألا تقل عن 6 خانات';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'كلمتا المرور غير متطابقتين';
    }
    if (!termsAccepted) {
      newErrors.terms = 'يجب الموافقة على شروط الاستخدام التجريبي للمتابعة';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    register(fullName, emailOrPhone, city);
  };

  const handleForgotStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) {
      setErrors({ emailOrPhone: 'يرجى إدخال رقم الهاتف أو البريد المسجل' });
      return;
    }
    setErrors({});
    setResetStep(2);
  };

  const handleForgotStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode !== '1234' && verificationCode.length < 4) {
      setErrors({ code: 'رمز التحقق التجريبي هو 1234' });
      return;
    }
    setErrors({});
    setResetStep(3);
  };

  const handleForgotStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setErrors({ newPassword: 'كلمة المرور الجديدة يجب أن لا تقل عن 6 أحرف' });
      return;
    }
    setErrors({});
    setSuccessMessage('تم تحديث كلمة المرور التجريبية بنجاح! يمكنك الآن تسجيل الدخول.');
    setTimeout(() => {
      setMode('login');
      setPassword(newPassword);
      setSuccessMessage('');
      setResetStep(1);
    }, 1800);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-8 bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden">
        
        {/* Top Header Card */}
        <div className="p-6 bg-gradient-to-r from-emerald-800 to-emerald-700 text-white relative">
          <button
            onClick={() => navigate('welcome')}
            className="inline-flex items-center gap-1 text-xs text-emerald-200 hover:text-white mb-3"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة لشاشة البداية</span>
          </button>
          
          <h2 className="text-xl font-bold">
            {mode === 'login' && 'تسجيل الدخول إلى البوابة'}
            {mode === 'register' && 'إنشاء حساب مواطن جديد'}
            {mode === 'forgot-password' && 'استعادة كلمة المرور'}
          </h2>
          <p className="text-xs text-emerald-100 mt-1">
            {mode === 'login' && 'أدخل بياناتك التجريبية للمتابعة والوصول لكافة المعاملات'}
            {mode === 'register' && 'سجل حسابك المحلي لحفظ المعاملات ومتابعة الشكاوى'}
            {mode === 'forgot-password' && 'محاكاة استرجاع الحساب برمز التأكيد الاسترشادي'}
          </p>
        </div>

        {/* Demo Notice */}
        <div className="px-6 pt-4">
          <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>
              <strong>حساب تجريبي محلي:</strong> البيانات تُحفظ في متصفحك فقط ولا ترتبط بقاعدة بيانات حكومية مركزية.
            </span>
          </div>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="mx-6 mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Form Body */}
        <div className="p-6">
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              {/* Quick Fill Button */}
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs text-slate-500">للتجربة السريعة:</span>
                <button
                  type="button"
                  onClick={fillQuickDemoCredentials}
                  className="text-xs text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1 hover:underline"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>تعبئة بيانات التجربة</span>
                </button>
              </div>

              {/* Email / Phone Field */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  البريد الإلكتروني أو رقم الهاتف
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder="citizen@menoufia.demo أو 01012345678"
                    className={`w-full bg-slate-50 border ${
                      errors.emailOrPhone ? 'border-rose-400 ring-1 ring-rose-300' : 'border-slate-300'
                    } rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 pl-9`}
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
                {errors.emailOrPhone && (
                  <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.emailOrPhone}</span>
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700">كلمة المرور</label>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('forgot-password');
                      setErrors({});
                    }}
                    className="text-[11px] text-emerald-700 hover:underline"
                  >
                    نسيت كلمة المرور؟
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full bg-slate-50 border ${
                      errors.password ? 'border-rose-400 ring-1 ring-rose-300' : 'border-slate-300'
                    } rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 pl-9`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-2.5 text-slate-400 hover:text-slate-600"
                    aria-label="إظهار كلمة المرور"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.password}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
              >
                دخول إلى الحساب
              </button>

              {/* Switch to Register */}
              <div className="text-center pt-2">
                <span className="text-xs text-slate-500">ليس لديك حساب؟ </span>
                <button
                  type="button"
                  onClick={() => {
                    setMode('register');
                    setErrors({});
                  }}
                  className="text-xs font-bold text-emerald-800 hover:underline"
                >
                  إنشاء حساب تجريبي جديد
                </button>
              </div>

            </form>
          )}

          {mode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  الاسم الكامل (ثلاثي)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="مثال: محمد السيد الباجوري"
                    className={`w-full bg-slate-50 border ${
                      errors.fullName ? 'border-rose-400 ring-1 ring-rose-300' : 'border-slate-300'
                    } rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 pl-9`}
                  />
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
                {errors.fullName && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Email or Phone */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  رقم الهاتف أو البريد الإلكتروني
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder="010XXXXXXXX أو user@example.com"
                    className={`w-full bg-slate-50 border ${
                      errors.emailOrPhone ? 'border-rose-400 ring-1 ring-rose-300' : 'border-slate-300'
                    } rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 pl-9`}
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
                {errors.emailOrPhone && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.emailOrPhone}</p>
                )}
              </div>

              {/* City Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  المركز / المدينة بالمنوفية
                </label>
                <div className="relative">
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 pl-9"
                  >
                    {MENOUFIA_CITIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  كلمة المرور
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="6 أحرف أو أرقام على الأقل"
                    className={`w-full bg-slate-50 border ${
                      errors.password ? 'border-rose-400 ring-1 ring-rose-300' : 'border-slate-300'
                    } rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 pl-9`}
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
                {errors.password && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  تأكيد كلمة المرور
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="أعد كتابة كلمة المرور"
                  className={`w-full bg-slate-50 border ${
                    errors.confirmPassword ? 'border-rose-400 ring-1 ring-rose-300' : 'border-slate-300'
                  } rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600`}
                />
                {errors.confirmPassword && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2 cursor-pointer text-xs text-slate-600">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                  />
                  <span>
                    أوافق على حفظ بيانات الحساب محلياً في النموذج الاسترشادي والالتزام بشروط الاستخدام.
                  </span>
                </label>
                {errors.terms && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.terms}</p>
                )}
              </div>

              {/* Submit Register */}
              <button
                type="submit"
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
              >
                إنشاء الحساب والمتابعة
              </button>

              {/* Switch to Login */}
              <div className="text-center pt-2">
                <span className="text-xs text-slate-500">لديك حساب بالفعل؟ </span>
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setErrors({});
                  }}
                  className="text-xs font-bold text-emerald-800 hover:underline"
                >
                  تسجيل الدخول
                </button>
              </div>

            </form>
          )}

          {mode === 'forgot-password' && (
            <div className="space-y-4">
              {resetStep === 1 && (
                <form onSubmit={handleForgotStep1} className="space-y-3.5">
                  <p className="text-xs text-slate-600">
                    أدخل رقم الهاتف أو البريد الإلكتروني المسجل لإرسال رمز التحقق التجريبي:
                  </p>
                  <div>
                    <input
                      type="text"
                      value={emailOrPhone}
                      onChange={(e) => setEmailOrPhone(e.target.value)}
                      placeholder="citizen@menoufia.demo"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                    {errors.emailOrPhone && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.emailOrPhone}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    إرسال رمز التأكيد التجريبي
                  </button>
                </form>
              )}

              {resetStep === 2 && (
                <form onSubmit={handleForgotStep2} className="space-y-3.5">
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
                    <span>رمز التأكيد التجريبي للاختبار هو: </span>
                    <strong className="font-mono text-emerald-950 font-bold">1234</strong>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      أدخل رمز التأكيد المكون من 4 أرقام
                    </label>
                    <input
                      type="text"
                      maxLength={4}
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="1234"
                      className="w-full text-center tracking-widest font-mono text-base bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                    {errors.code && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.code}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    تأكيد الرمز
                  </button>
                </form>
              )}

              {resetStep === 3 && (
                <form onSubmit={handleForgotStep3} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      كلمة المرور الجديدة
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="6 أحرف على الأقل"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                    {errors.newPassword && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.newPassword}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    حفظ كلمة المرور الجديدة
                  </button>
                </form>
              )}

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-xs text-slate-600 hover:text-emerald-800 underline"
                >
                  العودة لتسجيل الدخول
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
