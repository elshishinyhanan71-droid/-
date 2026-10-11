import React from 'react';
import {
  Settings,
  Eye,
  Type,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Globe,
  Heart,
  Bookmark,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SettingsPage: React.FC = () => {
  const {
    navigate,
    highContrast,
    setHighContrast,
    fontSize,
    setFontSize,
    favorites,
    resetDemoData
  } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('home')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-800 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة للرئيسية</span>
        </button>
        <span className="text-xs text-slate-400 font-mono">الإعدادات والتخصيص</span>
      </div>

      {/* Main Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
              تفضيلات التطبيق
            </span>
            <span className="text-xs text-slate-400">· دليل المنوفية</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-2">
            الإعدادات وسهولة القراءة والبيانات المحلية
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            خصص مظهر العرض، وتحكم في بيانات التخزين المؤقتة بالمتصفح
          </p>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
          <Settings className="w-6 h-6" />
        </div>
      </div>

      {/* Display and Accessibility Settings */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
        <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
          إعدادات العرض والخطوط
        </h2>

        {/* Font Sizing */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-800 flex items-center gap-2">
              <Type className="w-4 h-4 text-emerald-700" />
              <span>حجم الخط والنصوص</span>
            </span>
            <span className="text-slate-500 font-mono text-[11px]">
              {fontSize === 'normal' ? 'الحجم الطبيعي' : fontSize === 'large' ? 'خط كبير' : 'خط كبير جداً'}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFontSize('normal')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-colors ${
                fontSize === 'normal'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              عادي (100%)
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-colors ${
                fontSize === 'large'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              كبير (115%)
            </button>
            <button
              onClick={() => setFontSize('xlarge')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-colors ${
                fontSize === 'xlarge'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              أكبر (130%)
            </button>
          </div>
        </div>

        {/* High Contrast Mode */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-xs font-semibold text-slate-800 flex items-center gap-2">
              <Eye className="w-4 h-4 text-emerald-700" />
              <span>وضع التباين العالي (High Contrast)</span>
            </span>
            <p className="text-[11px] text-slate-500">
              رفع وضوح الخطوط وعناصر الإدخال لتسهيل الرؤية لضعاف البصر
            </p>
          </div>
          <button
            onClick={() => setHighContrast(!highContrast)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              highContrast
                ? 'bg-emerald-700 text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {highContrast ? 'مفعل' : 'معطل'}
          </button>
        </div>

        {/* Language Disclosure */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-xs font-semibold text-slate-800 flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-700" />
              <span>لغة الواجهة (Interface Language)</span>
            </span>
            <p className="text-[11px] text-slate-500">
              اللغة العربية هي اللغة المعتمدة والكاملة بالدليل حالياً.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
            العربية (مكتمل 100%)
          </span>
        </div>
      </div>

      {/* Saved Favorites Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-emerald-700" />
          <h2 className="text-base font-bold text-slate-900">
            المواقع والخدمات المحفوظة في المفضلة ({favorites.length})
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          المرافق التي قمت بتمييزها للوصول السريع إليها في أي وقت.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {favorites.map((favId) => (
            <span
              key={favId}
              className="text-xs font-medium bg-slate-100 text-slate-800 px-3 py-1 rounded-xl border border-slate-200 font-mono"
            >
              #{favId}
            </span>
          ))}
        </div>
      </div>

      {/* Prototype Reset Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-bold text-sm text-slate-900">
            إعادة تعيين البيانات التجريبية
          </h3>
          <p className="text-xs text-slate-500">
            مسح كافة السجلات والمواعيد والشكاوى التي تم إنشاؤها محلياً في المتصفح.
          </p>
        </div>
        <button
          onClick={() => {
            if (confirm('هل أنت متأكد من رغبتك في إعادة ضبط بيانات النموذج؟')) {
              resetDemoData();
            }
          }}
          className="py-2.5 px-5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2 shrink-0"
        >
          <RotateCcw className="w-4 h-4" />
          <span>إعادة ضبط البيانات</span>
        </button>
      </div>

      {/* About Prototype Card */}
      <div className="p-4 bg-slate-100 rounded-3xl border border-slate-200 text-xs text-slate-600 space-y-1">
        <div className="flex items-center gap-2 font-bold text-slate-900">
          <Info className="w-4 h-4 text-emerald-700" />
          <span>حول نموذج «دليل المنوفية» (الإصدار التجريبي 1.0)</span>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          تطبيق ويب تجريبي مستقل مستوحى من مراكز الخدمات التكنولوجية لتيسير وصول المواطنين للخدمات والمرافق في محافظة المنوفية. تم البناء باستخدام React وTypeScript وTailwind CSS بتصميم عربي RTL متكامل.
        </p>
      </div>

    </div>
  );
};
