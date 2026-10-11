import React from 'react';
import { ArrowLeft, ShieldCheck, UserCheck, KeyRound, Sparkles, Building2, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const WelcomePage: React.FC = () => {
  const { navigate, continueAsGuest, login } = useApp();

  const handleQuickDemoLogin = () => {
    login({
      name: 'أحمد محمود المنوفي',
      email: 'citizen@menoufia.demo',
      phone: '01012345678',
      city: 'شبين الكوم',
      nationalId: '29010101700123'
    });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center px-4 py-8 bg-gradient-to-b from-slate-50 via-emerald-50/30 to-slate-50">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden">
        
        {/* Visual Hero Header */}
        <div className="relative h-48 bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-900 p-6 flex flex-col justify-between text-white overflow-hidden">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="relative z-10 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-xs font-semibold text-amber-200 border border-white/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>النسخة التجريبية المستقلة</span>
            </span>
            <div className="flex items-center gap-1 text-xs text-emerald-200">
              <MapPin className="w-3.5 h-3.5" />
              <span>محافظة المنوفية</span>
            </div>
          </div>

          <div className="relative z-10">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              ابدأ رحلتك في المنوفية
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 mt-1">
              بوابة خدمات المواطنين الرقمية والدليل التفاعلي الشامل
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Quick Notice */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-start gap-3 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              هذا التطبيق نموذج تجريبي مستقل مستوحى من مراكز الخدمات التكنولوجية لتيسير الوصول إلى المعاملات والمواقع وأرقام الطوارئ.
            </p>
          </div>

          {/* Quick 1-Click Demo Login Bar */}
          <div className="bg-emerald-50/70 border border-emerald-200/90 rounded-2xl p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-emerald-700" />
                <span className="text-xs font-bold text-emerald-900">بيانات تجريبية للاختبار السريع:</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200">
                جاهز للمعاينة
              </span>
            </div>
            <p className="text-[11px] text-slate-600">
              يمكنك الدخول الفوري بحساب مواطن تجريبي معتمد مسبقاً دون إدخال بيانات:
            </p>
            <button
              onClick={handleQuickDemoLogin}
              className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm hover:shadow flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>دخول تجريبي سريع (حساب المواطن أحمد المنوفي)</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Core Action Buttons */}
          <div className="space-y-3 pt-1">
            <button
              onClick={() => navigate('login')}
              className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2"
            >
              <span>تسجيل الدخول</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('register')}
              className="w-full py-3 px-4 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <span>إنشاء حساب جديد</span>
            </button>

            <button
              onClick={continueAsGuest}
              className="w-full py-2.5 px-4 text-xs font-semibold text-slate-600 hover:text-emerald-800 transition-colors flex items-center justify-center gap-1.5"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>المتابعة كزائر دون تسجيل</span>
            </button>
          </div>

          {/* Bottom Footnote */}
          <div className="text-center pt-2 border-t border-slate-100">
            <span className="text-[11px] text-slate-400">
              لا نقوم بجمع أو مشاركة أي بيانات شخصية حقيقية أو طلب كلمات مرور بنكية.
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};
